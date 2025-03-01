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
            let queryString = {};
            // if (req.body.collection_date) {
            //     queryString['collection_date'] = req.body.collection_date;
            // }
            collectionModel.count().then(count => {
                var query = collectionModel.find(queryString).sort({'modified_at': -1}).skip(skip * limit).limit(limit);
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
                success: false,
                code: 1000,
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
            req.body['created_by'] = user.username;
            customerModel.findOne({'_id': collectiondata.customer_id}).then(customer_data => {
                if (customer_data) {
                    if (customer_data.balance_amount > 0 || customer_data.last_amount_updated > 0) {
                        let customer_pending_balance = customer_data.balance_amount + customer_data.last_amount_updated;
                        req.body['customer_balance'] = customer_pending_balance - req.body.amount;
                        const collection = new collectionModel(req.body);
                        collection.save(collection)
                        .then(newbilldata => {
                            const amount = customer_pending_balance - req.body.amount;
                            const collected_amount = customer_data.collected_amount + req.body.amount;
                            const update_amount = { 
                                'balance_amount': amount,
                                'collected_amount': collected_amount,
                                'last_amount_updated': 0
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
            collectionModel.findOne({'_id': id}).then(collection_data => {
                let collectionData = collection_data;

                customerModel.findOne({'_id': collectionData.customer_id}).then(customer_data => {
                    let customerData = customer_data;
                    const balance_amount = customerData.balance_amount + collectionData.amount;
                    const update_amount = { 
                        'balance_amount': balance_amount,
                        'last_amount_updated': 0,
                        'modified_at': new Date(),
                        'collected_amount': customerData.collected_amount - collectionData.amount
                    };
                    customerModel.updateOne({ '_id': collectionData.customer_id }, update_amount).then(updateddata => {
                        if (updateddata) {
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
                        message: err.message || 'delete operation is not occured'
                    });
                })
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
                success: false,
                code: 1000,
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

exports.getRecentCollections = (customer_id) => {
    var query = collectionModel.find({ 'customer_id': customer_id }).sort({'created_at': -1}).skip(0 * 2).limit(2);
    query.exec().then(collectionsData => {
        return collectionsData;
    })
    .catch(err => {
        return [];
    })
}

// Get Collection Amount By user
exports.getCollectionAmountByUser = (req, res) => {
    if (req.body && (!req.body.userId && !req.body.sessionId)) {
        return res.status(400).send({message: 'userid & sessionid is required'});
    }
    const userreq = {
        'userId': req.body.userId,
        'sessionId': req.body.sessionId
    }
    userModel.findOne(userreq).then(user => {
        if (user) {
            var query = collectionModel.find({ 'collected_user_id': userreq.userId, 'collection_date': req.body.collection_date });
            query.exec().then(collectionsData => {
                let collectedAmount = 0;
                collectionsData.forEach(collection => {
                    collectedAmount = collectedAmount + collection.amount;
                })
                res.send({'collectedAmount': collectedAmount});
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || 'Not able to fetch the collections'
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
            message: err.message || 'Not able to fetch the collections'
        })
    })
}

function getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
}

// Get Collections by User
exports.getCollectionsByUser = (req, res) => {
    if (req.body && (!req.body.userId && !req.body.sessionId)) {
        return res.status(400).send({message: 'userid & sessionid is required'});
    }
    const userreq = {
        'userId': req.body.userId,
        'sessionId': req.body.sessionId
    }
    userModel.findOne(userreq).then(user => {
        if (user) {
            let finalQuery = {};
            if (req.body.user_id) {
                finalQuery['collected_user_id'] = req.body.user_id;
            }
            if (req.body.collection_date) {
                finalQuery['collection_date'] = req.body.collection_date;
            }
            var query = collectionModel.find(finalQuery);
            query.exec().then(collectionsData => {
                let users = [];
                collectionsData.forEach(c => {
                    users.push({
                        collected_user_name: c.collected_user_name,
                        collected_user_id: c.collected_user_id,
                        collected_name: c.collected_name,
                        collections: [],
                        collectedAmount: 0
                    })
                });
                let uniqueusers = getUniqueListBy(users, 'collected_user_name');
                collectionsData.forEach(c => {
                    const findIndex = uniqueusers.findIndex(uc => uc.collected_user_name === c.collected_user_name);
                    if (findIndex !== -1) {
                        uniqueusers[findIndex].collections.push(c)
                        uniqueusers[findIndex].collectedAmount = uniqueusers[findIndex].collectedAmount + c.amount;
                    }
                });
                res.send(uniqueusers);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || 'Not able to fetch the collections'
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
            message: err.message || 'Not able to fetch the collections'
        })
    })
}
