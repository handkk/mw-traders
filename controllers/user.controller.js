'use strict';
var userModel = require('../models/user.model');

const createUser = async (req, res) => {
    const name = req.body.name;
    const user = await getUser(name);
    if (user) {
        // updateuser
    }
    const new_user = await userModel.create(req.body);
    res.status(201).json(new_user);
};

const getUser = async (name) => {
    const user = await userModel.findOne({'name': name});
    return user;
};

const getUsers = async (req, res) => {
    console.log('\n get users call === \n');
    const users = await userModel.find({});
    res.status(200).json({data: users});
};

module.exports = {
    getUsers,
    createUser,
    getUser
}
