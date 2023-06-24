'use strict';
var userModel = require('../models/user.model');

// Get Users
exports.getUsers = (req, res) => {
    userModel.find({}).then(usersData => {
        res.send(usersData);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Not able to fetch the users'
        })
    })
}

// Create New User
exports.createUser = (req, res) => {
    console.log('create user enters body ', JSON.stringify(req.body), '\n');
    if (!req.body) {
        res.status(400).send({message: 'payload is required'});
        return;
    }

    const user = new userModel(req.body);
    user.save(user)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Save operation is not occured'
        });
    })
}

// Update User Info
exports.updateUser = (req, res) => {
    console.log('update user enters body ', JSON.stringify(req.body), '\n');
    if (!req.body) {
        return res.status(400).send({message: 'Data to update can not be empty'});
    }
    const userid = req.params.id;
    console.log('update user id ', userid, '\n');

    userModel.findOneAndUpdate({'_id': userid}, req.body)
    .then(updatedUserData => {
        if (!updatedUserData) {
            res.status(404).send({
                message: `Cannot update user with id ${userid}`
            });
        } else {
            res.send(updatedUserData);
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Update operation is not occured'
        });
    })
}

// Delete User
exports.deleteUser = (req, res) => {
    if (!req.params.id) {
        return res.status(400).send({message: 'User id param is required'});
    }
    const userid = req.params.id;
    console.log('update user id ', userid, '\n');

    userModel.findOneAndRemove({'_id': userid})
    .then(removedUser => {
        if (!removedUser) {
            res.status(404).send({
                message: `Cannot delete user with id ${userid}`
            });
        } else {
            res.send(removedUser);
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'delete operation is not occured'
        });
    })   
}