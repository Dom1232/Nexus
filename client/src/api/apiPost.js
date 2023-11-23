import axios from 'axios';

const API_URL = 'http://localhost:3000';

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
        console.error('Error creating Account:', error);
        throw error;
      }
    },
    
    deleteUserPosts: async (token) => {
        try {
          const response = await axios.get(`${API_URL}/posts/postlist`, {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          });
          return response.data;
        } catch (error) {
          console.error('Error creating Account:', error);
          throw error;
        }
      },
};