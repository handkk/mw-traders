const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const farmerController = require('../controllers/farmer.controller');
const customerController = require('../controllers/customer.controller');

// User apis
router.get('/users', userController.getUsers);
router.post('/user', userController.createUser);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);
router.get('/user/:id', userController.getUserInfo);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

// Farmer apis
router.get('/farmers', farmerController.getFarmers);
router.post('/farmer', farmerController.createFarmer);
router.put('/farmer/:id', farmerController.updateFarmer);
router.delete('/farmer/:id', farmerController.deleteFarmer);

// Customer apis
router.get('/customers', customerController.getCustomers);
router.post('/customer', customerController.createCustomer);
router.put('/customer/:id', customerController.updateCustomer);
router.delete('/customer/:id', customerController.deleteCustomer);

module.exports = router;