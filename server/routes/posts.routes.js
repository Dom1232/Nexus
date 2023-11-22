const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts.controller');
const authController = require('../controllers/auth.controller');

router.post('/postmake', authController.requireSignin, postsController.makePost);
router.get('/postlist', authController.requireSignin, postsController.getAllPosts);

module.exports = router;