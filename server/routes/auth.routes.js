const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

//User Sign-In
router.post('/signin', authController.signIn);

//User Sign Out
router.get('/signout', authController.signOut);

//Decode Token
router.post('/decode', authController.requireSignin, authController.decode);

module.exports = router;