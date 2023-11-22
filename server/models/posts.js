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
  });

const Post = mongoose.model('Posts', postsSchema);

module.exports = Post;