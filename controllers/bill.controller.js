'use strict';
var vegetableModel = require('../models/vegetable.model');
var userModel = require('../models/user.model');
var billModel = require('../models/bill.model');
var farmerModel = require('../models/farmer.model');
var customerModel = require('../models/customer.model');
const moment = require('moment');
const lodash = require('lodash');
var billPrintModel = require('../models/bill_print.model');
var farmerBillModel = require('../models/farmer_bill.model');

// Get Bills
exports.getBills = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: 'Data to update can not be empty' });
    }
    if (req.body && (!req.body.userId && !req.body.sessionId)) {
        return res.status(400).send({ message: 'userid & sessionid is required' });
    }
    const userreq = {
        'userId': req.body.userId,
        'sessionId': req.body.sessionId
    }
    userModel.findOne(userreq).then(user => {
        if (user) {
            const limit = req.body.limit ? req.body.limit : 10000;
            const skip = req.body.skip ? (req.body.skip - 1) : 0;
            let dateQuery = {};
            if (req.body.bill_date) {
                dateQuery['bill_date'] = req.body.bill_date;
            }
            billModel.count().then(count => {
                var query = billModel.find(dateQuery).sort({ 'modified_at': -1 }).skip(skip * limit).limit(limit);
                query.exec().then(billsData => {
                    const result = {
                        'data': billsData,
                        'total': count
                    };
                    res.send(result);
                })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || 'Not able to fetch the bills'
                        })
                    })
            })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || 'Not able to fetch the bills'
                    })
                })
        } else {
            res.status(500).send({
                success: false,
                code: 1000,
                message: 'User session ended, Please login again'
            })
        }
    })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Not able to fetch the bills'
            })
        })
}

// Create New Bill
exports.createBill = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: 'Data to update can not be empty' });
    }
    if (req.body && (!req.body.userId && !req.body.sessionId)) {
        return res.status(400).send({ message: 'userid & sessionid is required' });
    }
    const name = req.body.name;
    const userreq = {
        'userId': req.body.userId,
        'sessionId': req.body.sessionId
    }
    userModel.findOne(userreq).then(user => {
        if (user) {
            customerModel.findOne({
                'name': req.body.customer_name, '_id': req.body.customer_id
            })
                .then(async customerData => {
                    if (customerData) {
                        if (!req.body.unit_wise) {
                            req.body['total_amount'] = (req.body.rate / 10) * req.body.quantity;
                        } else if (req.body.unit_wise) {
                            req.body['total_amount'] = req.body.rate * req.body.quantity;
                        }
                        let item_amount = req.body['total_amount'];
                        req.body['created_at'] = new Date();
                        req.body['modified_at'] = new Date();
                        req.body['created_by'] = user.username;
                        const todayBillfound = await billModel.find({ 'bill_date': req.body['bill_date'], 'customer_id': req.body.customer_id })
                        let newbal = 0;
                        let last_amount_updated = customerData['last_amount_updated'];
                        let balance_amount = customerData['balance_amount'];
                        if (todayBillfound.length === 0 && last_amount_updated > 0) {
                            newbal = balance_amount + last_amount_updated;
                            customerData['last_amount_updated'] = item_amount;
                            customerData['balance_amount'] = newbal;
                        } else {
                            customerData['last_amount_updated'] = last_amount_updated + item_amount;
                        }
                        const bill = new billModel(req.body);
                        bill.save(bill)
                            .then(async newbilldata => {
                                res.send(newbilldata);
                                let farmerBill = await farmerBillModel.findOne({ 'farmer_id': req.body.farmer_id, 'date': req.body['bill_date'] });
                                if (farmerBill) {
                                    let updateFarmer = farmerBill;
                                    const vegetableInd = updateFarmer.vegetables.findIndex(veg => (veg.name === req.body.vegetable_name && veg.rate === req.body.rate));
                                    if (vegetableInd !== -1) {
                                        const rate = updateFarmer.vegetables[vegetableInd].rate;
                                        const quantity = updateFarmer.vegetables[vegetableInd].quantity;
                                        const amount = updateFarmer.vegetables[vegetableInd].amount;
                                        updateFarmer.vegetables.splice(vegetableInd, 1);
                                        if (updateFarmer.vegetables.length > 0) {
                                            updateFarmer.vegetables.push({
                                                'name': req.body.vegetable_name,
                                                'id': req.body.vegetable_id,
                                                'rate': req.body.rate,
                                                'quantity': quantity + req.body.quantity,
                                                'amount': amount + req.body['total_amount'],
                                                'date': req.body['bill_date'],
                                                'created_by': user.username
                                            })
                                        } else {
                                            updateFarmer.vegetables.push({
                                                'name': req.body.vegetable_name,
                                                'id': req.body.vegetable_id,
                                                'rate': req.body.rate,
                                                'quantity': quantity + req.body.quantity,
                                                'amount': amount + req.body['total_amount'],
                                                'date': req.body['bill_date'],
                                                'created_by': user.username
                                            })
                                        }
                                    } else {
                                        updateFarmer.vegetables.push({
                                            'name': req.body.vegetable_name,
                                            'id': req.body.vegetable_id,
                                            'rate': req.body.rate,
                                            'quantity': req.body.quantity,
                                            'amount': req.body['total_amount'],
                                            'date': req.body['bill_date'],
                                            'created_by': user.username
                                        })
                                    }
                                    let farmerBillUpdate = await farmerBillModel.findOneAndUpdate({ 'farmer_id': req.body.farmer_id, 'date': req.body['bill_date'] }, {
                                        'balance': updateFarmer.balance + req.body['total_amount'],
                                        'balance_amount': updateFarmer.balance_amount + req.body['total_amount'],
                                        'vegetables': updateFarmer.vegetables,
                                        'modified_at': new Date()
                                    }, { returnDocument: "after" });
                                    if (farmerBillUpdate) {
                                        // console.log('\n farmerBillUpdate updated');
                                    } else {
                                        // console.log('\n farmerBillUpdate not updated');
                                    }
                                } else {
                                    const vegetable = {
                                        'name': req.body.vegetable_name,
                                        'id': req.body.vegetable_id,
                                        'rate': req.body.rate,
                                        'quantity': req.body.quantity,
                                        'amount': req.body['total_amount'],
                                        'date': req.body['bill_date'],
                                        'created_by': user.username
                                    }
                                    const farmerBody = {
                                        'farmer_id': req.body.farmer_id,
                                        'farmer_name': req.body.farmer_name,
                                        'date': req.body['bill_date'],
                                        'balance': req.body['total_amount'],
                                        'vegetables': [vegetable],
                                        'created_by': user.username,
                                        'balance_amount': req.body['total_amount'],
                                        'created_at': new Date(),
                                        'modified_at': new Date()
                                    };
                                    let farmerBillInsert = await farmerBillModel.create(farmerBody);
                                    if (farmerBillInsert) {
                                        // console.log('\n farmerBillInsert ', farmerBillInsert);
                                    } else {
                                        // console.log('\n farmerBillInsert faile ', farmerBillInsert);
                                    }
                                }


                                customerModel.findOneAndUpdate({ '_id': req.body.customer_id }, { ...customerData }, { returnDocument: "after" })
                                    .then(cus => {
                                        billPrintModel.findOne({ 'bill_date': req.body['bill_date'], 'customer_id': req.body.customer_id })
                                            .then(bill_print => {
                                                if (!bill_print) {
                                                    const billPrintBody = {
                                                        'bill_date': req.body['bill_date'],
                                                        'customer_id': req.body.customer_id,
                                                        'name': cus.name,
                                                        'phone_number': cus.phone_number,
                                                        'items': [{ ...req.body, billId: newbilldata['_id'] }],
                                                        'created_by': user.username,
                                                        'created_at': new Date(),
                                                        'modified_at': new Date(),
                                                        'balance_amount': cus.balance_amount,
                                                        'bill_amount': req.body['total_amount'],
                                                        'total_balance': cus.balance_amount + req.body['total_amount']
                                                    }
                                                    const billPrint = new billPrintModel(billPrintBody);
                                                    billPrint.save(billPrint).then(billprint => {
                                                        // res.send(newbilldata);
                                                    })
                                                        .catch(err => {
                                                            res.status(500).send({
                                                                message: err.message || 'Save operation is not occured'
                                                            });
                                                        })
                                                } else {
                                                    req.body['billId'] = newbilldata['_id'];
                                                    bill_print['items'].push({ ...req.body })
                                                    bill_print['modified_at'] = new Date()
                                                    bill_print['balance_amount'] = bill_print['balance_amount']
                                                    bill_print['bill_amount'] = bill_print['bill_amount'] + req.body['total_amount'];
                                                    bill_print['total_balance'] = bill_print['balance_amount'] + bill_print['bill_amount']
                                                    billPrintModel.findOneAndUpdate({ '_id': bill_print._id }, { ...bill_print }, { returnDocument: "after" })
                                                        .then(bill_print_updated => {
                                                            // res.send(newbilldata);
                                                        })
                                                        .catch(err => {
                                                            res.status(500).send({
                                                                message: err.message || 'Save operation is not occured'
                                                            });
                                                        })
                                                }
                                            })
                                            .catch(err => {
                                                res.status(500).send({
                                                    message: err.message || 'Save operation is not occured'
                                                });
                                            })
                                    })
                                    .catch(err => {
                                        res.status(500).send({
                                            message: err.message || 'Save operation is not occured'
                                        });
                                    })
                            })
                            .catch(err => {
                                res.status(500).send({
                                    message: err.message || 'Save operation is not occured'
                                });
                            })
                    } else {
                        res.status(403).send({ message: `Customer details not found` });
                    }
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || 'Save operation is not occured'
                    });
                })
        } else {
            res.status(500).send({
                success: false,
                code: 1000,
                message: 'User session ended, Please login again'
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Please login'
        });
    })
}

// Delete Bill
exports.deleteBill = (req, res) => {
    if (!req.params.id) {
        return res.status(400).send({ message: 'Bill id param is required' });
    }
    if (!req.body) {
        return res.status(400).send({ message: 'Data to update can not be empty' });
    }
    if (req.body && (!req.body.userId && !req.body.sessionId)) {
        return res.status(400).send({ message: 'userid & sessionid is required' });
    }
    const userid = req.body.userId;
    const sessionId = req.body.sessionId;
    const userreq = {
        'userId': userid,
        'sessionId': sessionId
    }
    const id = req.params.id;
    let customerId, bill_date;
    userModel.findOne(userreq).then(user => {
        if (user) {
            billModel.findOne({ '_id': id })
                .then(data => {
                    if (!data) {
                        res.status(404).send({
                            message: `Cannot delete user with id ${id}`
                        });
                    } else {
                        customerId = data.customer_id;
                        bill_date = data.bill_date;
                        customerModel.findOne({ '_id': customerId }).then(customer => {
                            const deductableAmount = customer.last_amount_updated - data.total_amount;
                            let customer_bills = customer;
                            customer_bills['last_amount_updated'] = deductableAmount;
                            customerModel.findOneAndUpdate({ '_id': customerId }, { ...customer_bills }, { returnDocument: "after" })
                                .then(cus => {
                                    billPrintModel.findOne({ 'bill_date': bill_date, 'customer_id': customerId })
                                        .then(async billprint => {
                                            let new_bill_print = billprint;
                                            let existingCollectionsIndex;
                                            existingCollectionsIndex = new_bill_print.items.findIndex(item => item.billId === id);
                                            new_bill_print.items.splice(existingCollectionsIndex, 1);
                                            let farmerBill_delete = await farmerBillModel.findOne({ 'farmer_id': data.farmer_id, 'date': data['bill_date'] });
                                            if (farmerBill_delete) {
                                                let updateFarmer_del = farmerBill_delete;
                                                const vegetableInd = updateFarmer_del.vegetables.findIndex(veg => (veg.name === data.vegetable_name && veg.rate === data.rate));
                                                if (vegetableInd !== -1) {
                                                    const quantity = updateFarmer_del.vegetables[vegetableInd].quantity - data.quantity;
                                                    const amount = updateFarmer_del.vegetables[vegetableInd].amount - data.total_amount;
                                                    if (quantity > 0) {
                                                        updateFarmer_del.vegetables[vegetableInd].quantity = quantity;
                                                        updateFarmer_del.vegetables[vegetableInd].amount = amount;
                                                    } else if (quantity === 0) {
                                                        updateFarmer_del.vegetables.splice(vegetableInd, 1);
                                                    }
                                                    let farmerBillUpdate = await farmerBillModel.findOneAndUpdate({ 'farmer_id': data.farmer_id, 'date': data['bill_date'] }, {
                                                        'balance': updateFarmer_del.balance - data['total_amount'],
                                                        'balance_amount': updateFarmer_del.balance_amount - data['total_amount'],
                                                        'vegetables': updateFarmer_del.vegetables,
                                                        'modified_at': new Date()
                                                    }, { returnDocument: "after" });
                                                    if (farmerBillUpdate) {
                                                        // console.log('\n farmerBillUpdate updated');
                                                    } else {
                                                        // console.log('\n farmerBillUpdate not updated');
                                                    }
                                                }
                                            }
                                            if (new_bill_print.items && new_bill_print.items.length > 0) {
                                                new_bill_print['bill_amount'] = new_bill_print['bill_amount'] - data.total_amount;
                                                new_bill_print['total_balance'] = new_bill_print['total_balance'] - data.total_amount;
                                                billPrintModel.findOneAndUpdate({ 'bill_date': bill_date, 'customer_id': customerId }, { ...new_bill_print }, { returnDocument: "after" }).then(update_billprint => {

                                                    // Delete Bill
                                                    billModel.findOneAndRemove({ '_id': id }).then(billRemoved => {
                                                        res.send({ success: true, message: "Bill Deleted Successfully" });
                                                    })
                                                        .catch(err => {
                                                            res.status(500).send({
                                                                message: err.message || 'bill not removed'
                                                            });
                                                        })
                                                })
                                                    .catch(err => {
                                                        res.status(500).send({
                                                            message: err.message || 'bill print not updated'
                                                        });
                                                    })
                                            } else if (new_bill_print.items && new_bill_print.items.length === 0) {
                                                try {
                                                    const delete_bill_print = await billPrintModel.findOneAndDelete({ 'bill_date': bill_date, 'customer_id': customerId })
                                                    // Delete Bill
                                                    billModel.findOneAndDelete({ '_id': id }).then(billRemoved => {
                                                        res.send({ success: true, message: "Bill Deleted Successfully" });
                                                    })
                                                        .catch(err => {
                                                            res.status(500).send({
                                                                message: err.message || 'bill not removed'
                                                            });
                                                        })
                                                } catch (e) {
                                                    res.status(500).send({
                                                        message: err.message || 'bill not removed'
                                                    })
                                                }
                                            }
                                        })
                                        .catch(err => {
                                            res.status(500).send({
                                                message: err.message || 'bill not found'
                                            });
                                        })
                                })
                                .catch(err => {
                                    res.status(500).send({
                                        message: err.message || 'Save operation is not occured'
                                    });
                                })
                        })
                            .catch(err => {
                                res.status(500).send({
                                    message: err.message || 'customer not found'
                                });
                            })
                    }
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || 'delete operation is not occured'
                    });
                })
        } else {
            res.status(500).send({
                success: false,
                code: 1000,
                message: 'User session ended, Please login again'
            })
        }
    })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'delete operation is not occured'
            });
        });
}

function onReturnRecords(customerData) {
    let customerTotalAmount = 0;
    let collection;
    collection = customerData;
    collection.customerCollection.forEach(col => {
        col.records.reduce((count, item) => {
            customerTotalAmount = count + item.total_amount;
        }, 0);
    });
    return customerTotalAmount;
}

function onFindIndexByBIllId(customerData, billId, req, isDeleteRecord, updatedBillData) {
    let obj = {}
    if (updatedBillData) {
        obj['bill_date'] = updatedBillData['bill_date']
        obj['billId'] = billId
        obj['customer_name'] = updatedBillData['customer_name']
        obj['customer_id'] = updatedBillData['customer_id']
        obj['vegetable_name'] = updatedBillData['vegetable_name']
        obj['vegetable_id'] = updatedBillData['vegetable_id']
        obj['rate'] = updatedBillData['rate']
        obj['quantity'] = updatedBillData['quantity']
        obj['farmer_name'] = updatedBillData['farmer_name']
        obj['farmer_id'] = updatedBillData['farmer_id']
        obj['unit_wise'] = updatedBillData['unit_wise']
        obj['notes'] = updatedBillData['notes']
        obj['total_amount'] = updatedBillData['total_amount']
        obj['modified_at'] = updatedBillData['modified_at']
        obj['userId'] = req.body['userId']
        obj['created_at'] = updatedBillData['created_at']
    }
    let editedData = lodash.cloneDeep(customerData)
    if (editedData.customerCollection && editedData.customerCollection.length > 0) {
        const existingCollection = editedData.customerCollection.find(collection => collection.bill_date === req.body['bill_date']);
        if (existingCollection) {
            let recordedIndex = existingCollection.records.findIndex((item) => item.billId == billId)

            if (recordedIndex != -1) {
                if (isDeleteRecord) {
                    existingCollection.records.splice(recordedIndex)
                } else {
                    existingCollection.records[recordedIndex] = obj


                }
            } else {


                existingCollection.records.push(obj)

            }
        } else {


        }
    }
    else {
        // customer changed ( changed customer doen'nt have any collection up to now)
        let tmpList = []
        tmpList.push(obj)
        editedData.customerCollection.push({
            bill_date: req.body['bill_date'],
            customer_name: req.body.customer_name,
            customer_id: req.body.customer_id,
            records: tmpList,
        });
    }

    return editedData;
}
// Update Bill
exports.updateBill = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: 'Data to update can not be empty' });
    }
    if (req.body && (!req.body.userId && !req.body.sessionId)) {
        return res.status(400).send({ message: 'userid & sessionid is required' });
    }
    const id = req.params.id;
    const userid = req.body.userId;
    const sessionId = req.body.sessionId;
    const userreq = {
        'userId': userid,
        'sessionId': sessionId
    }
    delete req.body['userId'];
    delete req.body['sessionId'];
    let balanceAmount = 0;
    userModel.findOne(userreq).then(user => {
        if (user) {
            vegetableModel.findOne({
                '_id': req.body.vegetable_id, 'name': req.body.vegetable_name
            }).then(vegetableData => {
                if (vegetableData) {
                    farmerModel.findOne({
                        'name': req.body.farmer_name, '_id': req.body.farmer_id
                    }).then(farmerData => {
                        if (farmerData) {
                            customerModel.findOne({
                                'name': req.body.customer_name, '_id': req.body.customer_id
                            }).then(customerData => {
                                if (customerData) {
                                    let billdata = {
                                        'customer_name': req.body.customer_name,
                                        'customer_id': req.body.customer_id,
                                        'farmer_name': req.body.farmer_name,
                                        'farmer_id': req.body.farmer_id,
                                        'vegetable_id': req.body.vegetable_id,
                                        'vegetable_name': req.body.vegetable_name
                                    };
                                    if (!req.body.unit_wise) {
                                        req.body['total_amount'] = (req.body.rate / 10) * req.body.quantity;
                                    } else if (req.body.unit_wise) {
                                        req.body['total_amount'] = req.body.rate * req.body.quantity;
                                    }
                                    let billReqBody = req.body;
                                    billReqBody['modified_at'] = new Date();
                                    billModel.findOneAndUpdate({ '_id': id }, billReqBody, { returnDocument: "after" })
                                        .then(updatedBillData => {
                                            if (!updatedBillData) {
                                                res.status(404).send({
                                                    message: `Cannot update bill with id ${id}`
                                                });
                                            } else {
                                                customerModel.findOne({ '_id': billdata.customer_id }).then(customer_data => {
                                                    if (customer_data) {

                                                        // 
                                                        // let balance_amount = 2300;
                                                        // let last_amount_updated = 400;
                                                        // let total_amount = 40;
                                                        // let new_amount = 0;
                                                        if (req.body['isCustEdited'] == true) {
                                                            customerModel.findOne({ '_id': req.body['oldCustId'] }).then(oldCustData => {
                                                                oldCustData['balance_amount'] = oldCustData['balance_amount'] - billReqBody.total_amount;
                                                                let preCustDetails = onFindIndexByBIllId(oldCustData, id, req, true)

                                                                customerModel.findOneAndUpdate({ '_id': req.body['oldCustId'] }, preCustDetails).then(preCustupdateddata => {
                                                                    if (preCustupdateddata) {
                                                                        // res.send(preCustupdateddata);
                                                                        customerModel.findOne({ '_id': req.body['customer_id'] }).then(newCustData => {
                                                                            newCustData['balance_amount'] = newCustData['balance_amount'] + billReqBody.total_amount;
                                                                            let currentCustDetails = onFindIndexByBIllId(newCustData, id, req, false, updatedBillData)

                                                                            customerModel.findOneAndUpdate({ '_id': req.body['customer_id'] }, currentCustDetails).then(currentCustDetails => {
                                                                                if (currentCustDetails) {
                                                                                    res.send(currentCustDetails);
                                                                                } else {
                                                                                    res.status(403).send({
                                                                                        message: 'Customer not found'
                                                                                    });
                                                                                }
                                                                            })


                                                                        })
                                                                    } else {
                                                                        res.status(403).send({
                                                                            message: 'Customer not found'
                                                                        });
                                                                    }
                                                                })


                                                            })


                                                        }
                                                        if (req.body['isCustEdited'] == false) {

                                                            // cust not edited
                                                            // let amount;
                                                            // if (customer_data.last_amount_updated > billReqBody.total_amount) {
                                                            //     const tmp_amount1 = customer_data.last_amount_updated - billReqBody.total_amount;
                                                            //     amount = customer_data.balance_amount - tmp_amount1;
                                                            // }
                                                            // if (customer_data.last_amount_updated < billReqBody.total_amount) {
                                                            //     const tmp_amount2 = billReqBody.total_amount - customer_data.last_amount_updated;
                                                            //     amount = customer_data.balance_amount + tmp_amount2;
                                                            // }
                                                            // if (customer_data.last_amount_updated === billReqBody.total_amount) {
                                                            //     amount = customer_data.balance_amount;
                                                            // }
                                                            // if (customerData.customerCollection && customerData.customerCollection.length > 0) {
                                                            //     const existingCollection = customerData.customerCollection.find(collection => collection.bill_date === req.body['bill_date']);
                                                            //     if (existingCollection) {
                                                            //         let recordedIndex = existingCollection.records.findIndex((item) => item.billId == id)
                                                            //         console.log('recordedIndex', recordedIndex)
                                                            //         if (recordedIndex != -1) {




                                                            //         } else {

                                                            //             existingCollection.records.push(updatedBillData)
                                                            //         }
                                                            //     } else {


                                                            //     }




                                                            // } else {
                                                            //     // customer changed ( changed customer doen'nt have any collection up to now)
                                                            //     customerData.customerCollection.push({
                                                            //         bill_date: req.body['bill_date'],
                                                            //         customer_name: req.body.customer_name,
                                                            //         customer_id: req.body.customer_id,
                                                            //         records: [{ ...req.body, billId: id }],
                                                            //     });
                                                            // }
                                                            let editedObj = onFindIndexByBIllId(customerData, id, req, false, updatedBillData)
                                                            customerModel.findOneAndUpdate({ '_id': billdata.customer_id }, editedObj, { returnDocument: "after" }).then(updateddata => {
                                                                if (updateddata) {
                                                                    const existingCollection = updateddata.customerCollection;
                                                                    if (existingCollection && existingCollection.length > 0) {
                                                                        existingCollection.forEach(col => {
                                                                            col.records.forEach(re => {
                                                                                balanceAmount = balanceAmount + re.total_amount;
                                                                            });
                                                                        });
                                                                    }
                                                                    const amount = { 'balance_amount': balanceAmount };
                                                                    // update customer balance amount
                                                                    customerModel.findOneAndUpdate({ '_id': billdata.customer_id }, amount).then(amount_updated => {
                                                                        if (amount_updated) {
                                                                            res.send(editedObj);
                                                                        } else {
                                                                            res.status(403).send({
                                                                                message: 'Customer not found'
                                                                            });
                                                                        }
                                                                    })
                                                                        .catch(err => {
                                                                            res.status(500).send({
                                                                                message: err.message || 'Save operation is not occured'
                                                                            });
                                                                        })
                                                                } else {
                                                                    res.status(403).send({
                                                                        message: 'Customer not found'
                                                                    });
                                                                }
                                                            })
                                                                .catch(err => {
                                                                    res.status(500).send({
                                                                        message: err.message || 'Save operation is not occured'
                                                                    });
                                                                })
                                                        }


                                                        // const amount = customer_data.balance_amount + (req.body.total_amount - customer_data.last_amount_updated);

                                                    } else {
                                                        res.status(403).send({
                                                            message: 'Customer not found'
                                                        });
                                                    }
                                                })
                                                    .catch(err => {
                                                        res.status(500).send({
                                                            message: err.message || 'Save operation is not occured'
                                                        });
                                                    })
                                            }
                                        })
                                        .catch(err => {
                                            res.status(500).send({
                                                message: err.message || 'Update operation is not occured'
                                            });
                                        })
                                } else {
                                    res.status(403).send({ message: `Customer details not found` });
                                }
                            })
                                .catch(err => {
                                    res.status(500).send({
                                        message: err.message || 'Save operation is not occured'
                                    });
                                })
                        } else {
                            res.status(403).send({ message: `Farmer details not found` })
                        }
                    })
                        .catch(err => {
                            res.status(500).send({
                                message: err.message || 'Save operation is not occured'
                            });
                        })
                } else {
                    res.status(403).send({ message: `Vegetable details not found` })
                }
            })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || 'Update operation is not occured'
                    });
                })
        } else {
            res.status(500).send({
                success: false,
                code: 1000,
                message: 'User session ended, Please login again'
            })
        }
    })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Update operation is not occured'
            });
        })
}