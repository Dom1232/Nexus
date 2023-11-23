const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

//User Sign-In
router.post('/signin', authController.signIn);
router.get('/signout', authController.signOut);
router.post('/decode', authController.requireSignin, authController.decode);

module.exports = router;