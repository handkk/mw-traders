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
                    dateQuery['bill_date'] = req.body.bill_date;
                }
                var query = billPrintModel.find(dateQuery);
                query.exec().then(async billsData => {
                    let bills_data = billsData;
                    let billprintData = {
                        'bills': [],
                        'collections': []
                    };
                    if (bills_data && bills_data.length > 0) {
                        const processedBillsData = await processBills(bills_data);
                        billprintData['bills'] = processedBillsData;
                        res.send(billprintData['bills']);
                    } else {
                        res.send(billprintData['bills']);
                    }
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

const processBills = (bills) => {
    return bills.map(bill => {
        const {items, bill_date, name, phone_number, bill_amount, balance_amount, total_balance} = bill;
        const maxItemsPerBill = 9;
        const splitBillsData = [];
        let sequenceNumber = 1;

        for (let i = 0; i < items.length; i += maxItemsPerBill) {
            const chunk = items.slice(i, i + maxItemsPerBill).map(item => ({
                ...item,
                no: sequenceNumber++
            }));
            const newBill = {
                name,
                bill_date,
                phone_number,
                items: chunk,
                continue: 'Continue...'
            }

            if (i + maxItemsPerBill >= items.length) {
                newBill.bill_amount = bill_amount;
                newBill.balance_amount = balance_amount;
                newBill.total_balance = total_balance;
                delete newBill.continue;
            }
            splitBillsData.push(newBill);
        }
        return splitBillsData;
    }).flat();
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
            const fromDate = req.body.from_date;
            const toDate = req.body.to_date;
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
        const billDate = req.body.bill_date;
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
