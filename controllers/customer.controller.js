'use strict';
var customerModel = require('../models/customer.model');
var userModel = require('../models/user.model');
var billModel = require('../models/bill.model');
const fs = require("fs");
const PDFDocument = require("pdfkit-table");
var bill_printModel = require('../models/bill_print.model');
const moment = require('moment');
var collectionsModel = require('../models/collection.model');
var collectionsController = require('../controllers/collections.controller');
var maxcount=3
// Get Customers
exports.getCustomers = (req, res) => {
    const limit = req.body.limit ? req.body.limit : 10000;
    const skip = req.body.skip ? (req.body.skip - 1) : 0;
    let searchquery = {};
    if (req.body.name) {
        searchquery = {'name': {$regex: `^${req.body.name}`, $options: 'i'}}
    }
    customerModel.count().then(count => {
        var query = customerModel.find(searchquery).sort({ 'modified_at': -1 }).skip(skip * limit).limit(limit);
        query.exec().then(customersData => {
            const result = {
                'data': customersData,
                'total': count
            };
            res.send(result);
        })
            .catch(err => {
                res.status(500).send({
                    message: err.message || 'Not able to fetch the customers'
                })
            })
    })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Not able to fetch the customers'
            })
        })
}

// Create New Customer

/*
{
  "name": "Raju",
  "phone_number": "9999999999",
  "address": "HYD",
  "notes": null,
  "userId": "6497d8551ca77b54add93167",
  "sessionId": "c1635099-fbee-4926-a8e5-0982f49021fd"
}
*/
exports.createCustomer = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: 'payload is required' });
        return;
    }
    if (req.body && (!req.body.userId && !req.body.sessionId)) {
        return res.status(400).send({message: 'userid & sessionid is required'});
    }
    const userreq = {
        'userId': req.body.userId,
        'sessionId': req.body.sessionId
    }
    userModel.findOne(userreq).then(async user => {
        if (user) {
            req.body['created_at'] = new Date();
            req.body['modified_at'] = new Date();
            req.body['created_by'] = user.username;
            try {
                const customer_name = req.body.name ? req.body.name : '';
                if (customer_name.trim() === '') {
                    return res.status(500).send({
                        message: `Customer name required`
                    })
                }
                const exists_customer = await customerModel.find({name: customer_name});
                if (exists_customer && exists_customer.length > 0) {
                    return res.status(500).send({
                        message: `${req.body.name} Customer already exists`
                    })
                }
            } catch(e) {
                return res.status(500).send({
                    message: e.message || 'Error while creating customer'
                });
            }
            const customer = new customerModel(req.body);
            customer.save(customer)
                .then(data => {
                    res.send(data);
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
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Please login'
        });
    })
}

// Update Customer Info
exports.updateCustomer = (req, res) => {
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
    const customerid = req.params.id;
    req.body['modified_at'] = new Date();
    userModel.findOne(userreq).then(user => {
        if (user) {
            customerModel.findOneAndUpdate({ '_id': customerid }, req.body, { returnDocument: "after" })
            .then(updatedCustomerData => {
                if (!updatedCustomerData) {
                    res.status(404).send({
                        message: `Cannot update customer with id ${customerid}`
                    });
                } else {
                    res.send(updatedCustomerData);
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || 'Update operation is not occured'
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
            message: err.message || 'Please login'
        });
    })
}

// Delete Customer
exports.deleteCustomer = (req, res) => {
    if (!req.params.id) {
        return res.status(400).send({ message: 'Customer id param is required' });
    }
    if (!req.body) {
        return res.status(400).send({ message: 'Data to update can not be empty' });
    }
    if (req.body && (!req.body.userId && !req.body.sessionId)) {
        return res.status(400).send({message: 'userid & sessionid is required'});
    }
    const userid = req.body.userId;
    const sessionId = req.body.sessionId;
    const userreq = {
        'userId': userid,
        'sessionId': sessionId
    }
    const customerid = req.params.id;
    userModel.findOne(userreq).then(user => {
        if (user) {
            customerModel.findOne({ '_id': customerid })
            .then(customer => {
                if (customer) {
                    const customerData = customer;
                    if (customerData.balance_amount !== 0) {
                        const msg = "Customer Balance amount is " + customerData.balance_amount
                        res.send({ success: false, message: msg });
                    } else if (customerData.balance_amount === 0) {
                        billModel.find({ 'customer_id': customerid })
                        .then(bill => {
                            if (bill && bill.length > 0) {
                                let billIds = [];
                                bill.forEach(b => {
                                    billIds.push(b._id);
                                });
                                billModel.deleteMany({ '_id': { '$in': billIds } })
                                .then(removed_bills => {
                                    collectionsModel.find({ 'customer_id': customerid })
                                    .then(collection => {
                                        if (collection && collection.length > 0) {
                                            let collectionIds = [];
                                            collection.forEach(c => {
                                                collectionIds.push(c._id);
                                            });
                                            collectionsModel.deleteMany({ '_id': { '$in': collectionIds } })
                                            .then(removed_collection => {
                                                customerModel.findOneAndRemove({ '_id': customerid })
                                                .then(removedCustomer => {
                                                    if (!removedCustomer) {
                                                        res.status(404).send({
                                                            message: `Cannot delete customer with id ${customerid}`
                                                        });
                                                    } else {
                                                        res.send({ success: true, message: "Customer Deleted Successfully" });
                                                    }
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
                                        } else if (collection.length === 0) {
                                            customerModel.findOneAndRemove({ '_id': customerid })
                                            .then(removedCustomer => {
                                                if (!removedCustomer) {
                                                    res.status(404).send({
                                                        message: `Cannot delete customer with id ${customerid}`
                                                    });
                                                } else {
                                                    res.send({ success: true, message: "Customer Deleted Successfully" });
                                                }
                                            })
                                            .catch(err => {
                                                res.status(500).send({
                                                    message: err.message || 'delete operation is not occured'
                                                });
                                            })
                                        }
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
                            } else if (bill.length === 0) {
                                customerModel.findOneAndRemove({ '_id': customerid })
                                .then(removedCustomer => {
                                    if (!removedCustomer) {
                                        res.status(404).send({
                                            message: `Cannot delete customer with id ${customerid}`
                                        });
                                    } else {
                                        res.send({ success: true, message: "Customer Deleted Successfully" });
                                    }
                                })
                                .catch(err => {
                                    res.status(500).send({
                                        message: err.message || 'delete operation is not occured'
                                    });
                                })
                            }
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: err.message || 'delete operation is not occured'
                            });
                        })
                    }
                }
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
    })
    
}

function filterCustomerCollectionByDate(customerData, passedDate) {
    let filteredData = []

    for (const dataObject of customerData) {
        // console.log('dataObject', dataObject)
        // Check if customerCollection exists within the current data object
        if (dataObject.customerCollection) {
            // Filter the customerCollection of the current data object
           let filteredCollection = dataObject.customerCollection.filter(collection => {
            // console.log('collection: ', collection);
            let totalAmount;
            let recordsCount;
            // if (collection.records) {
            //     let vegetables = [];
            //     vegetables = collection.records;
            //     totalAmount = vegetables.reduce((count, item) => {
            //         return item.total_amount + count;
            //     }, 0)
            // }
            // collection['total_amount'] = totalAmount;
                // Direct string comparison between bill date and passed date
                return collection.bill_date == passedDate
            });
            // recordsCount = collection.records.length;
            //     if (recordsCount > 2) {

            //     }

            // Add the filtered collection to the final result
            filteredData.push(...filteredCollection);
        }
    }




    return filteredData;
}

function returnSum(customerData) {
    return customerData.reduce((count, item) => {
        return item.total_amount + count;
    }, 0)
}

function maxRecordsCount(customerData) {
    let filteredArray = [];
    for (const dataObject of customerData) {
        if (dataObject.records.length > maxcount+1) {
            let firstPart = dataObject.records.slice(0, maxcount)
            // console.log('firstPart: ', firstPart);
            let secondPart = dataObject.records.slice(maxcount)
            // console.log('secondPart: ', secondPart);
            let firstData = {...dataObject}
            firstData.records = firstPart;
            let secondData = {...dataObject}
            secondData.records = secondPart;
            secondData.total_amount = returnSum(secondData.records);
            firstData.total_amount = returnSum(firstData.records);
            // firstData['collections'] = await collectionsController.getRecentCollections(firstData.customer_id);
            firstData['collections'] = [];
            secondData['collections'] = [];
            filteredArray.push(firstData);
            filteredArray.push(secondData);
        } else {
            dataObject['total_amount'] = returnSum(dataObject.records);
            dataObject['collections'] = [];
            // dataObject['collections'] = await collectionsController.getRecentCollections(dataObject.customer_id);
            filteredArray.push(dataObject)
        }
    }
    let hasCollectionExceedingLimit = filteredArray.some((item) => item.records.length > maxcount+1);
    if (hasCollectionExceedingLimit) {
        maxRecordsCount(filteredArray)
    }else{

        // console.log('filteredArray', filteredArray)
        // res.send(filteredArray)
        return filteredArray
    //   console.log('filteredArray >>>>>', filteredArray)

    }
   
    // console.log('filteredArray: ', filteredArray);
}

// Print Bills
exports.customerBills = (req, res) => {
    try {
        const userreq = {
            'userId': req.body.userId,
            'sessionId': req.body.sessionId
        }
        userModel.findOne(userreq).then(user => {
            if (user) {
                const limit = req.body.limit ? req.body.limit : 1000;
                const skip = req.body.skip ? (req.body.skip - 1) : 0;
                let dateQuery = {};
                if (req.body.bill_date) {
                    dateQuery['bill_date'] = req.body.bill_date;
                }


                var query = customerModel.find({}).sort({ 'modified_at': -1 });
                query.exec().then(async customersData => {
                    let data = filterCustomerCollectionByDate(customersData, req.body.bill_date)
                    if(data){

                        res.send(data);
                    }else{
                        res.send([])
                    }
                    // console.log('finsssal', final)

                    // if (data) {
                    //     let final = maxRecordsCount(data,res);
                    //     console.log('final', final)
                    //     // for (let item of final){
                    //     //     if(item.records.length>maxcount){

                    //     //     }
                    //     // }
                    //     // res.send(final);
                    //     // res.send(data);
                    // }
                    // console.log('data', data)
                })
                // console.log('customers', customers)
                // bill_printModel.find(dateQuery).then(async (customers) => {
                //     let all_customers = customers;
                //     all_customers.forEach(async (c) => {
                //         c['balance'] = c['collected_amount'] - c['last_amount_updated'];
                //         c['bill_amount'] = 0;
                //         c['collections'] = [];
                //         c.bills.forEach(b => {
                //             c['bill_amount'] = c['bill_amount'] + b['total_amount']
                //         });
                //         var collections = await getCollectionsByCustomer(c['customer_id']);
                //         console.log('\n');
                //         console.log('collections: ', JSON.stringify(collections));
                //         console.log('\n');
                //         c['collections'] = collections;
                //     });
                //     res.send(all_customers);
                // })
                // .catch(err => {
                //     res.status(500).send({
                //         message: err.message || 'Not able to fetch the bills'
                //     })
                // })
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
        console.log('customer Bills catch block ', e);
    }
}


// async function getBillsByCustomer(bill_date, customer_ids) {
//     billModel.find({
//         'bill_date': bill_date + 'T00:00:00.000Z',
//         'customer_id': { $in: customer_ids }
//     }).then(bills => {
//         let all_bills = bills;
//         console.log('\n all_bills: ', JSON.stringify(all_bills));
//         return all_bills;
//     })
//     .catch(err => {
//         return err;
//     });
// }

// Bill Print Create
exports.createBillPrint = (req, res) => {
    try {
        const date1 = req['bill_date'];
        bill_printModel.findOne({ 'bill_date': date1, 'cusomer_id': req['cusomer_id'] }).then(data => {
            if (!data) {
                req['created_at'] = new Date();
                req['modified_at'] = new Date();
                const bill_print = new bill_printModel(req);
                bill_print.save(bill_print)
                    .then(bill_printdata => {
                        res.send(bill_printdata);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || 'Save operation is not occured'
                        });
                    })
            } else if (data) {
                const update_request_body = {
                    'notes': req.notes,
                    'last_amount_updated': req.last_amount_updated,
                    'balance_amount': req.balance_amount,
                    'collected_amount': req.collected_amount,
                    $push: { 'bills': req.bills[0] },
                    'modified_at': new Date()
                }
                bill_printModel.findOneAndUpdate({ '_id': data._id }, update_request_body, { returnDocument: "after" }).then(update_bill_print => {
                    res.send(update_bill_print);
                })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || 'Save operation is not occured'
                        });
                    })
            }
        })
            .catch(err => {
                return err;
            });
    } catch (e) {
        console.log('create Bill Print catch block ', e);
    }
}

function getCollectionsByCustomer(customer_id) {
    var query = collectionsModel.find({ 'customer_id': customer_id });
    query.exec().then(collectionsData => {
        return collectionsData;
    })
        .catch(err => {
            return [];
        })
}

exports.setBalancezero = (req, res) => {
    const name = req.body.name;
    customerModel.updateMany({balance_amount: 0, collected_amount: 0, last_amount_updated: 0, modified_at: new Date(), customerCollection: []})
        // customerModel.findOneAndUpdate({'name': name}, {balance_amount: 0, collected_amount: 0, last_amount_updated: 0, modified_at: new Date(),
        //     customerCollection: []
        // }, { returnDocument: "after" })
        .then(customersData => {
            res.send(customersData);
        })
            .catch(err => {
                res.status(500).send({
                    message: err.message || 'Not able to update customer'
                })
            })
}
