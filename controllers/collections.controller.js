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
            collectionModel.find({}).then(data => {
                res.send(data);
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

// Create New Collection
exports.createCollection = (req, res) => {
    console.log('create user enters body ', JSON.stringify(req.body), '\n');
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
            const collection = new collectionModel(req.body);
            collection.save(collection)
            .then(newbilldata => {
                res.send(newbilldata);
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