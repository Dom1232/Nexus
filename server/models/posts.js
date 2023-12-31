const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
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
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    }],
  });

const Post = mongoose.model('Posts', postsSchema);

module.exports = Post;