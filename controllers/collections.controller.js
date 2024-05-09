'use strict';
var userModel = require('../models/user.model');
var customerModel = require('../models/customer.model');
var collectionModel = require('../models/collection.model');

// Get Collections
exports.getCollections = (req, res) => {
    if (req.body && (!req.body.userId && !req.body.sessionId)) {
        return res.status(400).send({message: 'userid & sessionid is required'});
    }
    const userreq = {
        'userId': req.body.userId,
        'sessionId': req.body.sessionId
    }
    userModel.findOne(userreq).then(user => {
        if (user) {
            const limit = req.body.limit ? req.body.limit : 10000;
            const skip = req.body.skip ? (req.body.skip - 1) : 0;
            collectionModel.count().then(count => {
                var query = collectionModel.find({}).sort({'modified_at': -1}).skip(skip * limit).limit(limit);
                query.exec().then(collectionsData => {
                    const result = {
                        'data': collectionsData,
                        'total': count
                    };
                    res.send(result);
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || 'Not able to fetch the collections'
                    })
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
            message: err.message || 'Not able to fetch the collections'
        })
    })
}

// Create New Collection
exports.createCollection = (req, res) => {
    if (!req.body) {
        return res.status(400).send({message: 'payload is required'});
    } else if (req.body && !req.body.userId) {
        return res.status(400).send({message: 'userid is required'});
    } else if (req.body && !req.body.sessionId) {
        return res.status(400).send({message: 'sessionid is required'});
    }
    const userreq = {
        'userId': req.body.userId,
        'sessionId': req.body.sessionId
    }
    userModel.findOne(userreq).then(user => {
        if (user) {
            let collectiondata = {
                'customer_name': req.body.customer_name,
                'customer_id': req.body.customer_id
            };
            req.body['created_at'] = new Date();
            req.body['modified_at'] = new Date();
            req.body['collected_name'] = user['name'];
            req.body['collected_user_name'] = user['username'];
            req.body['collected_user_id'] = user['userId'];
            customerModel.findOne({'_id': collectiondata.customer_id}).then(customer_data => {
                if (customer_data) {
                    if (customer_data.balance_amount > 0) {
                        const collection = new collectionModel(req.body);
                        collection.save(collection)
                        .then(newbilldata => {
                            const amount = customer_data.balance_amount - req.body.amount;
                            const collected_amount = customer_data.collected_amount + req.body.amount;
                            const update_amount = { 
                                'balance_amount': amount,
                                'collected_amount': collected_amount,
                                'last_amount_updated': req.body.amount
                            };
                            customerModel.updateOne({'_id': collectiondata.customer_id}, update_amount).then(updateddata => {
                                if (updateddata) {
                                    res.send(newbilldata);
                                } else {
                                    res.status(403).send({
                                        message: 'Customer details not updated'
                                    });
                                }
                            })
                            .catch(err => {
                                res.status(500).send({
                                    message: err.message || 'Update operation is not occured'
                                });
                            })
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: err.message || 'Save operation is not occured'
                            });
                        })
                    }
                    
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

// Delete Collection
exports.deleteCollection = (req, res) => {
    if (!req.params.id) {
        return res.status(400).send({message: 'Collection id param is required'});
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
            collectionModel.findOneAndRemove({'_id': id})
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        message: `Cannot delete user with id ${id}`
                    });
                } else {
                    res.send({ success: true, message: "Collection Deleted Successfully" });
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

// Get Collections by Customer
exports.getCollectionsByCustomer = (req, res) => {
    if (req.body && (!req.body.userId && !req.body.sessionId)) {
        return res.status(400).send({message: 'userid & sessionid is required'});
    }
    const userreq = {
        'userId': req.body.userId,
        'sessionId': req.body.sessionId
    }
    userModel.findOne(userreq).then(user => {
        if (user) {
            var query = collectionModel.find({ 'customer_id': req.body['customer_id'] });
            query.exec().then(collectionsData => {
                res.send(collectionsData);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || 'Not able to fetch the collections'
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
            message: err.message || 'Not able to fetch the collections'
        })
    })
}