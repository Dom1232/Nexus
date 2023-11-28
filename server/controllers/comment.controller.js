const Comment = require('../models/comment');
const Post = require('../models/posts');

exports.addComment = async (req, res) => {
    try {
      const { postId } = req.params;
      const { poster, body } = req.body;

      const comment = new Comment({
        poster,
        body,
      });
  
      await comment.save();
  
      const post = await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } },{ new: true });

      res.json(post);
    } catch (error) {
      console.error('Error adding comment:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const deletedComment = await Comment.findByIdAndDelete(commentId);
        if (!deletedComment) {
          return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json({ message: 'Comment deleted successfully', user: deletedComment });
      } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
};