'use strict';
var vegetableModel = require('../models/vegetable.model');
var userModel = require('../models/user.model');

// Get Vegetables
exports.getVegetables = (req, res) => {
    const userreq = {
        'userId': req.body.userId,
        'sessionId': req.body.sessionId
    }
    const limit = req.body.limit ? req.body.limit : 100;
    const skip = req.body.skip ? (req.body.skip - 1) : 0;
    userModel.findOne(userreq).then(user => {
        if (user) {
            vegetableModel.count().then(count => {
                var query = vegetableModel.find({}).sort({'modified_at': -1}).skip(skip * limit).limit(limit);
                query.exec().then(vegetableData => {
                    const result = {
                        'data': vegetableData,
                        'total': count
                    };
                    res.send(result);
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || 'Not able to fetch the vegetables'
                    })
                })
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || 'Not able to fetch the vegetables count'
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
            message: err.message || 'Not able to fetch the vegetables'
        })
    })
}

// Create New Vegetable
exports.createVegetable = (req, res) => {
    if (!req.body) {
        res.status(400).send({message: 'payload is required'});
        return;
    }
    if (req.body && !req.body.name) {
        res.status(400).send({message: 'vegetable name is required'});
        return;
    }
    const name = req.body.name;
    const userreq = {
        'userId': req.body.userId,
        'sessionId': req.body.sessionId
    }
    req.body['created_at'] = new Date();
    req.body['modified_at'] = new Date();
    userModel.findOne(userreq).then(user => {
        if (user) {
            vegetableModel.findOne({ 'name': req.body.name }).then(vegetableData => {
                if (!vegetableData) {
                    vegetableModel.count().then(count => {
                        req.body['number'] = count + 1;
                        const vegetable = new vegetableModel(req.body);
                        vegetable.save(vegetable)
                        .then(data => {
                            res.send(data);
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
                    res.status(403).send({message: `${name} Vegetable already exist`})
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

// Update Vegetable Info
exports.updateVegetable = (req, res) => {
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
            let vegetableReqBody;
            vegetableReqBody = {
                'name': req.body.name
            };
            if (req.body.number) {
                vegetableReqBody['number'] = req.body.number;
            }
            if (req.body.notes) {
                vegetableReqBody['notes'] = req.body.notes;
            }
            vegetableReqBody['modified_at'] = new Date();
            vegetableModel.findOneAndUpdate({'_id': id}, vegetableReqBody, { returnDocument: "after" })
            .then(updatedVegetableData => {
                if (!updatedVegetableData) {
                    res.status(404).send({
                        message: `Cannot update vegetable with id ${id}`
                    });
                } else {
                    res.send(updatedVegetableData);
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

// Delete Vegetable
exports.deleteVegetable = (req, res) => {
    if (!req.params.id) {
        return res.status(400).send({message: 'Vegetable id param is required'});
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
            vegetableModel.findOneAndRemove({'_id': id})
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        message: `Cannot delete user with id ${id}`
                    });
                } else {
                    res.send({ success: true, message: "Vegetable Deleted Successfully" });
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