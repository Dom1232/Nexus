const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');

// Create a new user
router.post('/users', userController.createUser);

// Get all users
router.get('/users', userController.getAllUsers);

// Get a user by ID
router.get('/users/:userId', authController.requireSignin, userController.getUserById);

// Update a user by ID
router.put('/users/:userId', authController.requireSignin, authController.isAuthorized, userController.updateUserById);

// Delete a user by ID
router.delete('/users/:userId', authController.requireSignin, authController.isAuthorized, userController.deleteUserById);

module.exports = router;