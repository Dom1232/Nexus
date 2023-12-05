import axios from 'axios';

const API_URL = 'https://nexus-11h5.onrender.com';

export default {
    getAllPosts: async (token) => {
      try {
        const response = await axios.get(`${API_URL}/posts/postlist`, {
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
          await axios.post(`${API_URL}/posts/postmake`, {poster, body}, {
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
            await axios.delete(`${API_URL}/posts/postdelete/${postId}/${userId}`, {
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
          const response = await axios.get(`${API_URL}/posts/post/${id}`, {
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
        await axios.post(`${API_URL}/comment/${postID}/comments`, {poster, body}, {
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
          await axios.delete(`${API_URL}/comment/commentdelete/${commentId}/${userId}`, {
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
        const response = await axios.get(`${API_URL}/posts/userposts/${userId}`, {
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