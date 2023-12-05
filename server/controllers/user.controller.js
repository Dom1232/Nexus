const User = require('../models/user');
const Post = require('../models/posts');
const Comment = require('../models/comment');
const bcrypt = require('bcrypt');

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    const savedUser = await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: savedUser });
  } catch (error) {
    //For duplicate emails
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    console.error('Error creating user:', error);
    //For missing fields
    res.status(500).json({ message: 'Required fields Missing' });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error getting user by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a user by ID
exports.updateUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { name, email, password } = req.body;
    //Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    //Update user fields except for created time
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { name, email, password: hashedPassword, updated: new Date() } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a user by ID
exports.deleteUserById = async (req, res) => {
  try {
    const userId = req.params.userId;

    const userPosts = await Post.find({ poster: userId });
    const userComments = await Comment.find({ poster: userId });

    for (const post of userPosts) {
      await Comment.deleteMany({ _id: { $in: post.comments } });
      console.log("Deleted Other User Comment")
    }

    await Comment.deleteMany({ poster: userId });
    await Post.deleteMany({ poster: userId });
    
    for (const comment of userComments) {
      console.log(comment)
      const post = await Post.findOne({ comments: comment._id });
        if (!post) {
          return res.status(404).json({ message: 'Post not found' });
        }

        post.comments = post.comments.filter(commentId => commentId.toString() !== comment._id.toString());
        await post.save();
    }

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
  } catch (error) {
    console.error('Error deleting user and data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

