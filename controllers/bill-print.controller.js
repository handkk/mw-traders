'use strict';
var userModel = require('../models/user.model');
var billPrintModel = require('../models/bill_print.model');
var collectionModel = require('../models/collection.model');
var customerModel = require('../models/customer.model');
var breakCount = 9;

// Get Bill Prints
exports.getBillPrints = (req, res) => {
    try {
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
                    let bills_data = billsData;
                    let customerIds = [];
                    let billprintData = {
                        'bills': [],
                        'collections': []
                    };
                    let lastcollection = [];
                    if (bills_data && bills_data.length > 0) {
                        bills_data.forEach(async bill => {
                            customerIds.push(bill.customer_id)
                        });
                        let customer_balance = await customerModel.find({ '_id': { $in: customerIds } });
                        let col = await collectionModel.find({ 'customer_id': { $in: customerIds } }).sort({'modified_at': -1});
    
                        const processedBillsData = await maxRecordsCount(bills_data);
                        billprintData['bills'] = processedBillsData;
                        await billprintData.bills.forEach(bills => {
                            bills.collectionData = [];
                            if (customer_balance && customer_balance.length > 0) {
                                const index = customer_balance.findIndex(cus => cus.name === bills['name'])
                                if (index >= 0) {
                                    bills['balance_amount'] = customer_balance[index].balance_amount;
                                }
                            }
                            if (col && col.length > 0) {
                                lastcollection.push(col[0]);
                                if (col.length > 2 || col.length == 2) {
                                    lastcollection.push(col[1]);
                                }
                                const collectionInd = lastcollection.findIndex(coll=> coll.customer_name === bills['name']);
                                if (collectionInd >= 0) {
                                    bills.collectionData = col[collectionInd];
                                }
                            }
                        })
                    }
                    res.send(billprintData['bills']);
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
    } catch (e) {
        console.log('get bill print catch block ', e);
    }
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
        firstData['balance_amount'] = dataObject.balance_amount;
        let secondData = { ...dataObject }
        secondData.items = secondPart;
        secondData['bill_date'] = dataObject.bill_date;
        secondData['name'] = dataObject.name;
        secondData['phone_number'] = dataObject.phone_number;
        secondData['balance_amount'] = dataObject.balance_amount;
        // secondData.total_bill = returnSum(secondData.items);
        // firstData.total_bill = returnSum(firstData.items);
        firstData.bill_amount = returnSum(firstData.items);
        secondData.bill_amount = returnSum(secondData.items);
        filteredArray.push(firstData);
        filteredArray.push(secondData);
      } else {
        // let total_amount = 0;
        // dataObject.items.forEach(async obj => {
        //     total_amount = total_amount + obj.total_amount;
        // })
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
                let finalStatement= {
                    'statement': [],
                    'total_bill_amount': 0,
                    'total_collected_amount': 0,
                    'open_balance': 0
                };
                if (statement && (Array.isArray(statement) && statement.length > 0)) {
                    let total_bill_amount = 0;
                    statement.forEach((state, index) => {
                        state['bill_amount'] = returnSum(state.items);
                        total_bill_amount = total_bill_amount + state['bill_amount']
                    })
                    finalStatement['open_balance'] = statement[0].balance_amount > 0 ? (statement[0].balance_amount - statement[0].bill_amount) : 0;
                    finalStatement['total_bill_amount'] = total_bill_amount;
                    finalStatement['statement'] = statement;
                }
                collectionModel.find({ 'customer_id': req.body.customer_id, 'collection_date': { $gte: fromDate, $lte: toDate } }).then(collections => {
                    let finalResult = [];
                    finalResult = finalStatement['statement'];
                    if (collections && (Array.isArray(collections) && collections.length > 0)) {
                        let total_collected_amount = 0;
                        collections.forEach(col => {
                            const collection = {
                                'bill_date': col.collection_date,
                                'type': 'collection',
                                'collected_amount': col.amount,
                                'customer_balance': col.customer_balance
                            }
                            total_collected_amount = total_collected_amount + col.amount;
                            finalResult.push(collection);
                        })
                        finalResult = finalResult.sort(function(a, b){return a.bill_date - b.bill_date});
                        finalStatement['statement'] = finalResult;
                        finalStatement['total_collected_amount'] = total_collected_amount;
                        res.send(finalStatement);
                    } else {
                        finalStatement['statement'] = finalResult;
                        res.send(finalStatement);
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

// Day Collections of Customer
exports.dayBills = (req, res) => {
    try {
        const userid = req.body.userId;
        const sessionId = req.body.sessionId;
        const userreq = {
            'userId': userid,
            'sessionId': sessionId
        }
        const billDate = req.body.bill_date + 'T00:00:00.000+00:00';
        userModel.findOne(userreq).then(user => {
            if (user) {
                billPrintModel.find({ 'bill_date': billDate }).then(all_bills => {
                    let all_bills_data = all_bills;
                    if (all_bills_data && all_bills_data.length > 0) {
                        res.send(all_bills_data);
                    } else {
                        res.send([]);
                    }
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || 'Bills not found'
                    });
                });
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
    } catch (e) {
        console.log('day Bills catch block ', e);
    }
}
