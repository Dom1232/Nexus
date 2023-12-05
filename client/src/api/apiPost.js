import axios from 'axios';

export default {
    getAllPosts: async (token) => {
      try {
        const response = await axios.get(`/posts/postlist`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
      } catch (error) {
        console.error('Error getting posts:', error);
        throw error;
      }
    },

    makePost: async (token, poster, body) => {
        try {
          await axios.post(`/posts/postmake`, {poster, body}, {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          });
        } catch (error) {
          console.error('Error creating Post:', error);
          throw error;
        }
    },

    deletePost: async (token, userId, postId) => {
        try {
            await axios.delete(`/posts/postdelete/${postId}/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        } catch (error) {
          console.error('Error deleting Post:', error);
          throw error;
        }
    },

    getPostDetails: async (token, id) => {
      try {
          const response = await axios.get(`/posts/post/${id}`, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
        return response.data;
      } catch (error) {
        console.error('Error getting Post:', error);
        throw error;
      }
    },

    addComment: async (token, postID, poster, body) => {
      try {
        await axios.post(`/comment/${postID}/comments`, {poster, body}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
      } catch (error) {
        console.error('Error creating Post:', error);
        throw error;
      }
    },

    deleteComment: async (token, userId, commentId) => {
      try {
          await axios.delete(`/comment/commentdelete/${commentId}/${userId}`, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      } catch (error) {
        console.error('Error deleting Post:', error);
        throw error;
      }
    },

    getPostsByUser: async (token, userId) => {
      try {
        const response = await axios.get(`/posts/userposts/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
      } catch (error) {
        console.error('Error Getting User posts:', error);
        throw error;
      }
    }
}; 