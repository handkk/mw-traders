'use strict';
var vegetableModel = require('../models/vegetable.model');
var userModel = require('../models/user.model');
var billModel = require('../models/bill.model');
var farmerModel = require('../models/farmer.model');
var customerModel = require('../models/customer.model');
const moment = require('moment');
const lodash = require('lodash');

// Get Bills
exports.getBills = (req, res) => {
    const userreq = {
        'userId': req.body.userId,
        'sessionId': req.body.sessionId
    }
    userModel.findOne(userreq).then(user => {
        if (user) {
            const limit = req.body.limit ? req.body.limit : 1000;
            const skip = req.body.skip ? (req.body.skip - 1) : 0;
            let dateQuery = {};
            if (req.body.bill_date) {
                dateQuery['bill_date'] = req.body.bill_date + 'T00:00:00.000Z';
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
        res.status(400).send({ message: 'payload is required' });
        return;
    }
    const name = req.body.name;
    const userreq = {
        'userId': req.body.userId,
        'sessionId': req.body.sessionId
    }
    userModel.findOne(userreq).then(user => {
        if (user) {
            vegetableModel.findOne({
                '_id': req.body.vegetable_id, 'name': req.body.vegetable_name
            }).then(vegetableData => {
                if (vegetableData) {
                    farmerModel.findOne({
                        'name': req.body.farmer_name, '_id': req.body.farmer_id
                    })
                        .then(farmerData => {
                            if (farmerData) {
                                customerModel.findOne({
                                    'name': req.body.customer_name, '_id': req.body.customer_id
                                })
                                    .then(customerData => {
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
                                            let customer_balance_amount = customerData['balance_amount'] + req.body['total_amount'];
                                            req.body['created_at'] = new Date();
                                            req.body['modified_at'] = new Date();
                                            const date = req.body['bill_date'];
                                            req.body['bill_date'] = moment(date).format('YYYY-MM-DD') + 'T00:00:00.000Z';
                                            const bill = new billModel(req.body);
                                            bill.save(bill)
                                                .then(newbilldata => {
                                                    const existingCollection = customerData.customerCollection.find(collection => collection.bill_date === req.body['bill_date']);
                                                    customerData['balance_amount'] = customer_balance_amount;
                                                    if (existingCollection) {
                                                        existingCollection.records.push({ ...req.body, billId: newbilldata['_id'] });
                                                    } else {
                                                        // Create a new collection with the provided bill date
                                                        customerData.customerCollection.push({
                                                            bill_date: req.body['bill_date'],
                                                            customer_name: req.body.customer_name,
                                                            customer_id: req.body.customer_id,
                                                            records: [{ ...req.body, billId: newbilldata['_id'] }],
                                                        });
                                                    }
                                                    customerModel.findOneAndUpdate({ '_id': req.body.customer_id }, { ...customerData }, { returnDocument: "after" })
                                                        .then(cus => {
                                                            res.send(newbilldata);
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
                        message: err.message || 'Save operation is not occured'
                    });
                })
        } else {
            res.status(500).send({
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
                            const deductableAmount = customer.balance_amount - data.total_amount;
                            let customer_bills = customer;
                            const billDate = moment(bill_date).format('YYYY-MM-DD') + 'T00:00:00.000Z';
                            customer_bills['balance_amount'] = deductableAmount;
                            let existingCollectionsIndex;
                            existingCollectionsIndex = customer_bills.customerCollection.findIndex(collection => collection.bill_date === billDate);
                            const billInd = customer_bills.customerCollection[existingCollectionsIndex].records.findIndex(b => b.billId === id);
                            customer_bills.customerCollection[existingCollectionsIndex].records.splice(billInd, 1);
                            if (customer_bills.customerCollection[existingCollectionsIndex].records.length === 0) {
                                customer_bills.customerCollection.splice(existingCollectionsIndex, 1);
                            }
                            customerModel.findOneAndUpdate({ '_id': customerId }, { ...customer_bills }, { returnDocument: "after" })
                                .then(cus => {
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
   if(updatedBillData){
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
    obj['created_at'] =updatedBillData['created_at']
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
        let tmpList=[]
        tmpList.push(obj)
        editedData.customerCollection.push({
            bill_date: req.body['bill_date'],
            customer_name: req.body.customer_name,
            customer_id: req.body.customer_id,
            records:tmpList,
        });
    }

    return editedData;
}
// Update Bill
exports.updateBill = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: 'Data to update can not be empty' });
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