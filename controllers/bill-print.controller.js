'use strict';
var userModel = require('../models/user.model');
var billPrintModel = require('../models/bill_print.model');
var collectionModel = require('../models/collection.model');
var breakCount = 10;

// Get Bill Prints
exports.getBillPrints = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: 'Request payload can not be empty' });
    }
    if (req.body && (!req.body.userId && !req.body.sessionId)) {
        return res.status(400).send({message: 'userid & sessionid is required'});
    }
    if (req.body && (!req.body.bill_date)) {
        return res.status(400).send({message: 'Bill Date is required'});
    }
    const userreq = {
        'userId': req.body.userId,
        'sessionId': req.body.sessionId
    }
    userModel.findOne(userreq).then(user => {
        if (user) {
            let dateQuery = {};
            if (req.body.bill_date) {
                dateQuery['bill_date'] = req.body.bill_date + 'T00:00:00.000+00:00';
            }
            var query = billPrintModel.find(dateQuery);
            query.exec().then(async billsData => {
                // billsData.map(item => item.items = maxRecordsCount(billsData))
                const processedBillsData = await maxRecordsCount(billsData);
                res.send(processedBillsData);
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

function maxRecordsCount(customerData) {
    let finalArray = [];
    let filteredArray = [];
    customerData.forEach((dataObject, index) => {
      dataObject.items.forEach((re, ind) => {
        re['no'] = ind + 1;
      })
      if (dataObject.items.length > breakCount + 1) {
        let firstPart = dataObject.items.slice(0, breakCount)
        let secondPart = dataObject.items.slice(breakCount)
        let firstData = { ...dataObject }
        firstData.items = firstPart;
        firstData['bill_date'] = dataObject.bill_date;
        firstData['name'] = dataObject.name;
        firstData['phone_number'] = dataObject.phone_number;
        let secondData = { ...dataObject }
        secondData.items = secondPart;
        secondData['bill_date'] = dataObject.bill_date;
        secondData['name'] = dataObject.name;
        secondData['phone_number'] = dataObject.phone_number;
        secondData.total_amount = returnSum(secondData.items);
        firstData.total_amount = returnSum(firstData.items);
        filteredArray.push(firstData);
        filteredArray.push(secondData);
      } else {
        dataObject['total_amount'] = returnSum(dataObject.items);
        filteredArray.push(dataObject)
      }
    })
    
    let hasCollectionExceedingLimit = filteredArray.some((item) => item.items.length > breakCount + 1);
    if (hasCollectionExceedingLimit) {
      return maxRecordsCount(filteredArray)
    } else {
        filteredArray.forEach((f, inde) => {
            if ((inde) === 0) {
                f['continue'] = 'Continue...';
            } else if (inde === 1) {
                f['second'] = '(ii)';
            } else if (inde === 2) {
                f['third'] = '(iii)';
            } else if (inde === 3) {
                f['end'] = 'End...';
            }
        })
        finalArray = filteredArray;
    }
    return finalArray
  }

  function returnSum(customerData) {
    return customerData.reduce((count, item) => {
      return item.total_amount + count;
    }, 0)
  }

  // Balance Statement
exports.customerStatement = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: 'Request body can not be empty' });
    }
    if (req.body && (!req.body.userId && !req.body.sessionId)) {
        return res.status(400).send({message: 'userid & sessionid is required'});
    }
    if (req.body && (!req.body.customer_id)) {
        return res.status(400).send({message: 'Customer Id is required'});
    }
    if (req.body && (!req.body.from_date)) {
        return res.status(400).send({message: 'Start Date is required'});
    }
    if (req.body && (!req.body.to_date)) {
        return res.status(400).send({message: 'End Date is required'});
    }
    const userid = req.body.userId;
    const sessionId = req.body.sessionId;
    const userreq = {
        'userId': userid,
        'sessionId': sessionId
    }

    userModel.findOne(userreq).then(user => {
        if (user) {
            const fromDate = req.body.from_date + 'T00:00:00.000+00:00';
            const toDate = req.body.to_date + 'T00:00:00.000+00:00';
            billPrintModel.find({ 'customer_id': req.body.customer_id, 'bill_date': { $gte: fromDate, $lte: toDate } }).then(bills => {
                let statement = bills;
                if (statement && (Array.isArray(statement) && statement.length > 0)) {
                    statement.forEach(state => {
                        state['bill_amount'] = returnSum(state.items);
                    })
                }
                collectionModel.find({ 'customer_id': req.body.customer_id, 'collection_date': { $gte: fromDate, $lte: toDate } }).then(collections => {
                    let finalResult = [];
                    finalResult = statement;
                    if (collections && (Array.isArray(collections) && collections.length > 0)) {
                        collections.forEach(col => {
                            const collection = {
                                'bill_date': col.collection_date,
                                'type': 'collection',
                                'collected_amount': col.amount
                            }
                            finalResult.push(collection);
                        })
                        finalResult = finalResult.sort(function(a, b){return a.bill_date - b.bill_date});
                        res.send(finalResult);
                    } else {
                        res.send(finalResult);
                    }
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || 'collections not found'
                    });
                })
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || 'transactions not found'
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
            message: err.message || 'User not found'
        });
    });
}
