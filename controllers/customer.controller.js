'use strict';
var customerModel = require('../models/customer.model');

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