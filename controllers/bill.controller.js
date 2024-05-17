'use strict';
var vegetableModel = require('../models/vegetable.model');
var userModel = require('../models/user.model');
var billModel = require('../models/bill.model');
var farmerModel = require('../models/farmer.model');
var customerModel = require('../models/customer.model');
const moment = require('moment');
var customerController = require('../controllers/customer.controller');
var billPrintModel = require('../models/bill_print.model');

// Print Bills
exports.printBills = (req, res) => {
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
            customerModel.find({}).then(customers => {
                res.send(customers);
                // var query = billModel.find(dateQuery).sort({'modified_at': -1}).skip(skip * limit).limit(limit);
                // query.exec().then(billsData => {
                //     const result = {
                //         'data': billsData,
                //         'total': count
                //     };
                //     res.send(result);
                // })
                // .catch(err => {
                //     res.status(500).send({
                //         message: err.message || 'Not able to fetch the bills'
                //     })
                // })
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
                                            req.body['customer_balance_amount'] = customer_balance_amount;
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
                                            // console.log('customer', customer)
                                            // const customer = customerModel.findById({ '_id': req.body.customer_id });
                                            // .then(custData=>{
                                            //     console.log('custData', custData)
                                            //     const customer =  customerModel.findById({'_id': req.body.customer_id});
                                            //     console.log('customer', customer)
                                            //     const existingCollection = customer.customerCollection.find(collection => collection.bill_date.toString() ===  req.body['bill_date']);
                                            //     console.log('existingCollection', existingCollection)
                                            // })
                                            // .then(newbilldata => {
                                            //     const balance_amount = { 'balance_amount': customer_balance_amount, $push: { 'bills': req.body } };
                                            //     customerModel.findOneAndUpdate({'_id': billdata.customer_id}, balance_amount, { returnDocument: "after" }).then(customer_data => {
                                            //         if (customer_data) {
                                            //             res.send(newbilldata);
                                            //             const request_body = {
                                            //                 'bill_date': date,
                                            //                 'name': customer_data.name,
                                            //                 'phone_number': customer_data.phone_number,
                                            //                 'address': customer_data.address,
                                            //                 'notes': customer_data.notes,
                                            //                 'last_amount_updated': customer_data.last_amount_updated,
                                            //                 'balance_amount': customer_data.balance_amount,
                                            //                 'collected_amount': customer_data.collected_amount,
                                            //                 'bills': [newbilldata],
                                            //                 'cusomer_id': customer_data._id
                                            //             }
                                            //             var bill_Prints = customerController.createBillPrint(request_body, res);
                                            //         } else {
                                            //             res.status(403).send({
                                            //                 message: 'Customer not found'
                                            //             });
                                            //         }
                                            //     })
                                            //     .catch(err => {
                                            //         res.status(500).send({
                                            //             message: err.message || 'Save operation is not occured'
                                            //         });
                                            //     })
                                            // })
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
                                                        let amount;
                                                        if (customer_data.last_amount_updated > billReqBody.total_amount) {
                                                            const tmp_amount1 = customer_data.last_amount_updated - billReqBody.total_amount;
                                                            amount = customer_data.balance_amount - tmp_amount1;
                                                        }
                                                        if (customer_data.last_amount_updated < billReqBody.total_amount) {
                                                            const tmp_amount2 = billReqBody.total_amount - customer_data.last_amount_updated;
                                                            amount = customer_data.balance_amount + tmp_amount2;
                                                        }
                                                        if (customer_data.last_amount_updated === billReqBody.total_amount) {
                                                            amount = customer_data.balance_amount;
                                                        }
                                                        // const amount = customer_data.balance_amount + (req.body.total_amount - customer_data.last_amount_updated);
                                                        const balance_amount = { 'balance_amount': amount };
                                                        customerModel.updateOne({ '_id': billdata.customer_id }, balance_amount).then(updateddata => {
                                                            if (updateddata) {
                                                                res.send(updatedBillData);
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