const Post = require('../models/posts');

exports.makePost = async (req, res) => {
    try {
      const { poster, body} = req.body;

      const newPost = new Post({ poster, body});

      const savedPost = await newPost.save();

      const populatedPost = await Post.findById(savedPost._id).populate('poster', 'name');
      res.status(201).json({ message: 'Post created successfully', post: populatedPost });
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ message: 'Required fields Missing' });
    }
};

exports.getAllPosts = async (req, res) => {
    try {
      const posts = await Post.find().populate('poster', 'name').exec();
      res.status(200).json(posts);
    } catch (error) {
      console.error('Error getting users:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
};