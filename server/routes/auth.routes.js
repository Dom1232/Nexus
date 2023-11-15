const express = require('express');
const router = express.Router();
const userController = require('../controllers/auth.controller');

//User Sign-In
router.post('/signin', userController.signIn);
router.get('/signout', userController.signOut);

module.exports = router;