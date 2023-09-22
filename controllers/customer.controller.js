'use strict';
var customerModel = require('../models/customer.model');
var userModel = require('../models/user.model');
var billModel = require('../models/bill.model');

// Get Customers
exports.getCustomers = (req, res) => {
    const limit = req.body.limit ? req.body.limit : 1000;
    const skip = req.body.skip ? (req.body.skip - 1) : 0;
    customerModel.count().then(count => {
        var query = customerModel.find({}).sort({'modified_at': -1}).skip(skip * limit).limit(limit);
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
exports.createCustomer = (req, res) => {
    if (!req.body) {
        res.status(400).send({message: 'payload is required'});
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
        return res.status(400).send({message: 'Data to update can not be empty'});
    }
    const customerid = req.params.id;
    req.body['modified_at'] = new Date();

    customerModel.findOneAndUpdate({'_id': customerid}, req.body, { returnDocument: "after" })
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
        return res.status(400).send({message: 'Customer id param is required'});
    }
    const customerid = req.params.id;

    customerModel.findOneAndRemove({'_id': customerid})
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
    // const billdate = '2023-09-20' + 'T00:00:00.000Z';
    userModel.findOne(userreq).then(user => {
        if (user) {
            billModel.find({ 'bill_date': billdate }).then(bills => {
                if (bills) {
                    res.send(bills);
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
            console.log('\n user found === ', JSON.stringify(user), '\n');
            customerModel.find({}).then(customers => {
                const cust = customers;
                console.log('\n customers found === ', JSON.stringify(cust), '\n');
                if (cust) {
                    var table_data = "<table><thead><tr><th>Name</th><th>Balance Amount</th><th>Paid Amount</th></tr></thead><tbody>";
                    cust.forEach(c => {
                        table_data += "<tr><td>" + c.name+ "</td><td>" + c.balance_amount + "</td><td>" + c.collected_amount + "</td></tr>";
                    });
                    table_data += "</tbody></table>";
                    console.log('\n table_data is === ', table_data, '\n');
                    res.send({table: table_data});
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