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
};