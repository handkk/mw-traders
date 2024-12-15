'use strict';
var userModel = require('../models/user.model');
var collectionReportModel = require('../models/collection-report.model');

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
                        const collection_report = new collectionReportModel({
                            date: req.body.date,
                            reason_type: req.body.reason_type,
                            farmer_id: req.body.farmer_id ? req.body.farmer_id : '',
                            amount: req.body.amount,
                            spent_amount: req.body.spent_amount,
                            notes: req.body.notes,
                            created_by: req.body.created_by,
                            created_name: user.name,
                            created_at: new Date(),
                            modified_at: new Date()
                        });
                        collection_report.save().then(new_collection_report => {
                            res.status(200).send({
                                message: 'Collection Submitted Successfully'
                            })
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: err.message || 'Not able to save collection report'
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
            if (req.body.bill_date) {
                dateQuery['bill_date'] = req.body.bill_date;
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
