const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    poster: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    body: {
      type: String,
      required: true,
    },
    created: {
      type: Date,
      default: Date.now
    },
  });

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;