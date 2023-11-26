const Post = require('../models/posts');

exports.makePost = async (req, res) => {
    try {
      const { poster, body } = req.body;

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

exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const deletedPost = await Post.findByIdAndDelete(postId);
        if (!deletedPost) {
          return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted successfully', user: deletedPost });
      } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
};