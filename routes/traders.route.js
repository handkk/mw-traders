var express = require('express');
var userController = require('../controllers/user.controller');

module.exports.apis = (() => {
    var router = express.Router();

    router.get('/users', userController.getUsers);
    router.post('/user', userController.createUser);
});