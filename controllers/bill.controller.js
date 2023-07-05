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
            billModel.find({}).then(data => {
                res.send(data);
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
                                    // res.send(farmerData);
                                    let billdata = {
                                        'customer_name': req.body.customer_name,
                                        'customer_id': req.body.customer_id,
                                        'farmer_name': req.body.farmer_name,
                                        'farmer_id': req.body.farmer_id,
                                        'vegetable_id': req.body.vegetable_id,
                                        'vegetable_name': req.body.vegetable_name
                                    };
                                    console.log('\n bill create req body ', JSON.stringify(req.body), '\n');
                                    billModel.findOne(billdata).then(data => {
                                        if (!data) {
                                            if (req.body.unit_wise) {
                                                req.body['total_amount'] = req.body.rate;
                                            } else if (!req.body.unit_wise) {
                                                req.body['total_amount'] = req.body.rate * 10;
                                            }
                                            const bill = new billModel(req.body);
                                            bill.save(bill)
                                            .then(newbilldata => {
                                                res.send(newbilldata);
                                            })
                                            .catch(err => {
                                                res.status(500).send({
                                                    message: err.message || 'Save operation is not occured'
                                                });
                                            })
                                        } else {
                                            res.status(403).send({
                                                message: 'Bill already exist'
                                            });
                                        }
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