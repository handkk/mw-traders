const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const farmerController = require('../controllers/farmer.controller');
const customerController = require('../controllers/customer.controller');
const vegetableController = require('../controllers/vegetable.controller');
const billController = require('../controllers/bill.controller');
const collectionController = require('../controllers/collections.controller');

// User apis
router.get('/users', userController.getUsers);
router.post('/user', userController.createUser);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);
router.get('/user/:id', userController.getUserInfo);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

// Farmer apis
router.post('/farmers', farmerController.getFarmers);
router.post('/farmer', farmerController.createFarmer);
router.put('/farmer/:id', farmerController.updateFarmer);
router.delete('/farmer/:id', farmerController.deleteFarmer);

// Customer apis
router.post('/customers', customerController.getCustomers);
router.post('/customer', customerController.createCustomer);
router.put('/customer/:id', customerController.updateCustomer);
router.delete('/customer/:id', customerController.deleteCustomer);

// Vegetable apis
router.post('/vegetable', vegetableController.createVegetable);
router.post('/vegetables', vegetableController.getVegetables);
router.put('/vegetable/:id', vegetableController.updateVegetable);
router.delete('/vegetable/:id', vegetableController.deleteVegetable);

// Bills apis
router.post('/bills', billController.getBills);
router.post('/new-bill', billController.createBill);
router.delete('/bill/:id', billController.deleteBill);

// Collection apis
router.post('/new-collection', collectionController.createCollection);
router.post('/collections', collectionController.getCollections);
router.delete('/collection/:id', collectionController.deleteCollection);

module.exports = router;