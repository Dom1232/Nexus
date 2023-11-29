const Post = require('../models/posts');
const Comment = require('../models/comment');

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
        await Comment.deleteMany({ _id: { $in: (await Post.findById(postId)).comments } });
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

exports.getPostById = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId).populate('poster', 'name').populate({
      path: 'comments',
      populate: {
        path: 'poster',
        select: 'name', 
      }
    }).exec();
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error('Error getting post by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAllUserPosts = async (req, res) => {
  try {
    const userId = req.params.userId;
    const posts = await Post.find({poster: userId}).populate('poster', 'name').exec();
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error getting posts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};