'use strict';
var vegetableModel = require('../models/vegetable.model');
var userModel = require('../models/user.model');
var billModel = require('../models/bill.model');
var farmerModel = require('../models/farmer.model');
var customerModel = require('../models/customer.model');

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
            billModel.count().then(count => {
                var query = billModel.find({}).sort({'modified_at': -1}).skip(skip * limit).limit(limit);
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
    console.log('create user enters body ', JSON.stringify(req.body), '\n');
    if (!req.body) {
        res.status(400).send({message: 'payload is required'});
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
                    console.log('\n vegetableData ', JSON.stringify(vegetableData), '\n');
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
                                    // console.log('\n bill create req body ', JSON.stringify(req.body), '\n');
                                    
                                    if (req.body.unit_wise) {
                                        req.body['total_amount'] = req.body.rate;
                                    } else if (!req.body.unit_wise) {
                                        req.body['total_amount'] = req.body.rate * parseInt(req.body.quantity);
                                    }
                                    req.body['created_at'] = new Date();
                                    req.body['modified_at'] = new Date();
                                    const bill = new billModel(req.body);
                                    bill.save(bill)
                                    .then(newbilldata => {
                                        customerModel.findOne({'_id': billdata.customer_id}).then(customer_data => {
                                            if (customer_data) {
                                                console.log('\n customer data === ', JSON.stringify(customer_data), '\n');
                                                const amount = customer_data.balance_amount + req.body.total_amount;
                                                const balance_amount = { 'balance_amount': amount };
                                                customerModel.updateOne({'_id': billdata.customer_id}, balance_amount).then(updateddata => {
                                                    if (updateddata) {
                                                        res.send(newbilldata);
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
                                    })
                                    .catch(err => {
                                        res.status(500).send({
                                            message: err.message || 'Save operation is not occured'
                                        });
                                    })
                                } else {
                                    res.status(403).send({message: `Customer details not found`});
                                }
                            })
                            .catch(err => {
                                res.status(500).send({
                                    message: err.message || 'Save operation is not occured'
                                });
                            })

                        } else {
                            res.status(403).send({message: `Farmer details not found`})
                        }
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || 'Save operation is not occured'
                        });
                    })
                } else {
                    res.status(403).send({message: `Vegetable details not found`})
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
        return res.status(400).send({message: 'Bill id param is required'});
    }
    const userid = req.body.userId;
    const sessionId = req.body.sessionId;
    const userreq = {
        'userId': userid,
        'sessionId': sessionId
    }
    const id = req.params.id;
    userModel.findOne(userreq).then(user => {
        if (user) {
            billModel.findOneAndRemove({'_id': id})
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        message: `Cannot delete user with id ${id}`
                    });
                } else {
                    res.send({ success: true, message: "Bill Deleted Successfully" });
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
        return res.status(400).send({message: 'Data to update can not be empty'});
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
            let billReqBody = req.body;
            billReqBody['modified_at'] = new Date();
            billModel.findOneAndUpdate({'_id': id}, billReqBody, { returnDocument: "after" })
            .then(updatedBillData => {
                if (!updatedBillData) {
                    res.status(404).send({
                        message: `Cannot update bill with id ${id}`
                    });
                } else {
                    res.send(updatedBillData);
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