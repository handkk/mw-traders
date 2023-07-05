'use strict';
var farmerModel = require('../models/farmer.model');

// Get Farmers
exports.getFarmers = (req, res) => {
    farmerModel.find({}).then(farmerData => {
        res.send(farmerData);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Not able to fetch the farmers'
        })
    })
}

// Create New Farmer
exports.createFarmer = (req, res) => {
    // console.log('create user enters body ', JSON.stringify(req.body), '\n');
    if (!req.body) {
        res.status(400).send({message: 'payload is required'});
        return;
    }

    const farmer = new farmerModel(req.body);
    farmer.save(farmer)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Save operation is not occured'
        });
    })
}

// Update Farmer Info
exports.updateFarmer = (req, res) => {
    // console.log('update user enters body ', JSON.stringify(req.body), '\n');
    if (!req.body) {
        return res.status(400).send({message: 'Data to update can not be empty'});
    }
    const id = req.params.id;
    // console.log('update user id ', userid, '\n');

    farmerModel.findOneAndUpdate({'_id': id}, req.body, { returnDocument: "after" })
    .then(updatedFarmerData => {
        if (!updatedFarmerData) {
            res.status(404).send({
                message: `Cannot update farmer with id ${id}`
            });
        } else {
            res.send(updatedFarmerData);
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Update operation is not occured'
        });
    })
}

// Delete Farmer
exports.deleteFarmer = (req, res) => {
    if (!req.params.id) {
        return res.status(400).send({message: 'Farmer id param is required'});
    }
    const id = req.params.id;
    // console.log('update user id ', userid, '\n');

    farmerModel.findOneAndRemove({'_id': id})
    .then(data => {
        if (!data) {
            res.status(404).send({
                message: `Cannot delete user with id ${id}`
            });
        } else {
            res.send({ success: true, message: "Farmer Deleted Successfully" });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'delete operation is not occured'
        });
    })   
}