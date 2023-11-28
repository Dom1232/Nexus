const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts.controller');
const authController = require('../controllers/auth.controller');

//Make Post
router.post('/postmake/', authController.requireSignin, postsController.makePost);

//List all Posts
router.get('/postlist', authController.requireSignin, postsController.getAllPosts);

//Delete Post
router.delete('/postdelete/:postId/:userId', authController.requireSignin, authController.isAuthorized, postsController.deletePost);

//Get Post by ID
router.get('/post/:postId', authController.requireSignin, postsController.getPostById);

module.exports = router;