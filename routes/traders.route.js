const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const farmerController = require('../controllers/farmer.controller');

// User apis
router.get('/users', userController.getUsers);
router.post('/user', userController.createUser);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

// Farmer apis
router.get('/farmers', farmerController.getFarmers);
router.post('/farmer', farmerController.createFarmer);
router.put('/farmer/:id', farmerController.updateFarmer);
router.delete('/farmer/:id', farmerController.deleteFarmer);

module.exports = router;