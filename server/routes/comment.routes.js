const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');
const authController = require('../controllers/auth.controller');

//Post Comment
router.post('/:postId/comments', authController.requireSignin ,commentController.addComment);

//Delete Comment
router.delete('/commentdelete/:commentId/:userId', authController.requireSignin, authController.isAuthorized, commentController.deleteComment);

module.exports = router;