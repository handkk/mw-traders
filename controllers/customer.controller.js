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

// Get Customers
exports.getCustomers = (req, res) => {
    const limit = req.body.limit ? req.body.limit : 1000;
    const skip = req.body.skip ? (req.body.skip - 1) : 0;
    customerModel.count().then(count => {
        var query = customerModel.find({}).sort({ 'modified_at': -1 }).skip(skip * limit).limit(limit);
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

    req.body['created_at'] = new Date();
    req.body['modified_at'] = new Date();
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
}

// Update Customer Info
exports.updateCustomer = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: 'Data to update can not be empty' });
    }
    const customerid = req.params.id;
    req.body['modified_at'] = new Date();

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
}

// Delete Customer
exports.deleteCustomer = (req, res) => {
    if (!req.params.id) {
        return res.status(400).send({ message: 'Customer id param is required' });
    }
    const customerid = req.params.id;

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

// Day Collections of Customer
exports.dayBills = (req, res) => {
    const userid = req.body.userId;
    const sessionId = req.body.sessionId;
    const userreq = {
        'userId': userid,
        'sessionId': sessionId
    }
    const billdate = req.body.bill_date + 'T00:00:00.000Z';
    userModel.findOne(userreq).then(user => {
        if (user) {
            billModel.find({ 'bill_date': billdate }).then(bills => {
                if (bills) {
                    res.send(bills);
                    // let tmpcustomers = [];
                    // let customers = [];
                    // let tmpcustomerids = [];
                    // let allBillsData = bills;
                    // allBillsData.forEach(bill => {
                    //     tmpcustomers.push({
                    //         'customer_name': bill.customer_name,
                    //         'customer_id': bill.customer_id
                    //     });
                    // })
                    // customers = tmpcustomers.filter((obj, index) => {
                    //     return index === tmpcustomers.findIndex(o => obj.customer_id === o.customer_id);
                    // });
                    // customers.forEach(c1 => {
                    //     tmpcustomerids.push(c1.customer_id);
                    // });
                    // customerModel.find({'_id': tmpcustomerids}).then(customer => {
                    //     let allcustomer = customer;
                    //     allBillsData.forEach((b, i) => {
                    //         let indexCustomer = -1;
                    //         indexCustomer = allcustomer.findIndex(ac => ac['_id'].toString() === b['customer_id']);
                    //         if (indexCustomer !== -1) {
                    //             b["customer_balance_amount"] = allcustomer[indexCustomer]["balance_amount"];
                    //         }
                    //     })
                    //     res.send(allBillsData);
                    // })
                    // .catch(err => {
                    //     res.status(500).send({
                    //         message: err.message || 'Customers not found'
                    //     });
                    // });
                    // init document
                    // let doc = new PDFDocument({ margin: 30, size: 'A4' });
                    // save document
                    // console.log('\n 1 === ');
                    // doc.pipe(fs.createWriteStream("document.pdf"));
                    // console.log('\n 2 === ');
                    // table
                    // const table = { 
                    //     title: '',
                    //     headers: [
                    //         { label: "Customer Name", property: 'customer_name', width: 60, renderer: null },
                    //         { label: "Today Bill", property: 'total_amount', width: 150, renderer: null }, 
                    //         { label: "Balance", property: 'rate', width: 100, renderer: null } 
                    //         // { label: "Paid", property: 'price2', width: 100, renderer: null }
                    //     ],
                    //     datas: bills
                    // };
                    // console.log('\n 3 table: === ', JSON.stringify(table));
                    // doc.table(table);
                    // res.setHeader('Content-Type', 'application/pdf');
                    // res.setHeader('Content-Disposition', 'attachment; filename=document.pdf');
                    // doc.pipe(res);
                    // console.log('\n 6 === ');
                    // doc.end();
                    // await res.send(doc);
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

// Balance Statement
exports.customerBalanceStatement = (req, res) => {
    const userid = req.body.userId;
    const sessionId = req.body.sessionId;
    const userreq = {
        'userId': userid,
        'sessionId': sessionId
    }

    userModel.findOne(userreq).then(user => {
        if (user) {
            customerModel.find({}).then(customers => {
                const cust = customers;
                if (cust) {
                    var table_data = "<table><thead><tr><th>Name</th><th>Balance Amount</th><th>Paid Amount</th></tr></thead><tbody>";
                    cust.forEach(c => {
                        table_data += "<tr><td>" + c.name + "</td><td>" + c.balance_amount + "</td><td>" + c.collected_amount + "</td></tr>";
                    });
                    table_data += "</tbody></table>";
                    res.send({ table: table_data });
                }
            })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || 'customers not found'
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
                message: err.message || 'User not found'
            });
        });
}
function filterCustomerCollectionByDate(customerData, passedDate) {
    let filteredData = []

    for (const dataObject of customerData) {
        // console.log('dataObject', dataObject)
        // Check if customerCollection exists within the current data object
        if (dataObject.customerCollection) {
            // Filter the customerCollection of the current data object
           let filteredCollection = dataObject.customerCollection.filter(collection => {
            console.log('collection: ', collection);
            let totalAmount;
            if (collection.records) {
                let vegetables = [];
                vegetables = collection.records;
                totalAmount = vegetables.reduce((count, item) => {
                    return item.total_amount + count;
                }, 0)
            }
            collection['total_amount'] = totalAmount;
                // Direct string comparison between bill date and passed date
                return collection.bill_date == passedDate
            });

            // Add the filtered collection to the final result
            filteredData.push(...filteredCollection);
        }
    }




    return filteredData;
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
                    dateQuery['bill_date'] = req.body.bill_date + 'T00:00:00.000Z';
                }


                var query = customerModel.find({}).sort({ 'modified_at': -1 });
                query.exec().then(customersData => {
                    let data = filterCustomerCollectionByDate(customersData, req.body.bill_date + 'T00:00:00.000Z')
                    if (data) {}
                    res.send(data);
                    console.log('data', data)
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
        console.log('\n');
        console.log('createBillPrint req: ', JSON.stringify(req));
        console.log('\n');
        const date1 = moment(req['bill_date']).format('YYYY-MM-DD') + 'T00:00:00.000Z';
        bill_printModel.findOne({ 'bill_date': date1, 'cusomer_id': req['cusomer_id'] }).then(data => {
            console.log('\n');
            console.log('createBillPrint res data: ', JSON.stringify(data));
            console.log('\n');
            if (!data) {
                req['created_at'] = new Date();
                req['modified_at'] = new Date();
                const date = req['bill_date'];
                req['bill_date'] = moment(date).format('YYYY-MM-DD') + 'T00:00:00.000Z';
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
