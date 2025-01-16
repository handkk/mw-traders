'use strict';
var userModel = require('../models/user.model');
var collectionReportModel = require('../models/collection-report.model');
var collectionModel = require('../models/collection.model');

// Create Collection record
exports.createCollectionReport = (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).send({ message: 'Request payload can not be empty' });
        }
        if (req.body && (!req.body.userId && !req.body.sessionId)) {
            return res.status(400).send({message: 'userid & sessionid is required'});
        }
        if (req.body && (!req.body.date)) {
            return res.status(400).send({message: 'Bill Date is required'});
        }
        const userreq = {
            'userId': req.body.userId,
            'sessionId': req.body.sessionId
        }
        userModel.findOne(userreq).then(user => {
            if (user) {
                collectionReportModel.findOne({ 'date': req.body.date, 'created_by': req.body.username }).then(report => {
                    if (!report) {
                        // Find the collections Amount by User Start
                        collectionModel.find({ 'collected_user_id': userreq.userId, 'collection_date': req.body.date })
                        .then(collectionsData => {
                            let collectedAmount = 0;
                            collectionsData.forEach(collection => {
                                collectedAmount = collectedAmount + collection.amount;
                            })
                            if (collectedAmount > 0 && collectedAmount === req.body.amount && req.body.spent_amount === 0) {
                                const save_data = {
                                    date: req.body.date,
                                    farmer_id: req.body.farmer_id ? req.body.farmer_id : '',
                                    amount: req.body.amount,
                                    spent_reasons: req.body.spent_reasons ? req.body.spent_reasons : [],
                                    notes: req.body.notes,
                                    created_by: req.body.created_by,
                                    created_name: user.name,
                                    created_at: new Date(),
                                    modified_at: new Date()
                                };
                                const reportData = new collectionReportModel(save_data);
                                reportData.save(reportData)
                                .then(new_collection_report => {
                                    res.status(200).send({
                                        statusCode: 200,
                                        message: 'Collection Submitted Successfully'
                                    })
                                })
                                .catch(err => {
                                    res.status(500).send({
                                        message: err.message || 'Not able to save collection report'
                                    })
                                })
                            }
                            if (collectedAmount > 0 && collectedAmount !== req.body.amount && req.body.spent_amount === 0) {
                                res.status(403).send({
                                    statusCode: 403,
                                    message: 'Entered amount is not matching with today collection amount'
                                })
                            }
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: err.message || 'Not able to fetch the collections'
                            })
                        })
                    } else {
                        res.status(400).send({
                            message: 'Report is already submitted'
                        })
                    }
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || 'Not able to fetch collection report'
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
    } catch (e) {
        console.log('create collection report catch block ', e);
    }
}

// Get Collection Reports
exports.getCollectionReports = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: 'Data to update can not be empty' });
    }
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
            let dateQuery = {};
            if (req.body.date) {
                dateQuery['date'] = req.body.date;
            }
            if (req.body.username) {
                dateQuery['created_by'] = req.body.username;
            }
            var query = collectionReportModel.find(dateQuery).sort({ 'modified_at': -1 }).skip(skip * limit).limit(limit);
                query.exec().then(reportsData => {
                    res.send(reportsData);
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
