import axios from 'axios';

const API_URL = 'http://localhost:3000';

export default {
  
    createUser: async (userData) => {
      try {
        const response = await axios.post(`${API_URL}/api/users`, userData);
        console.log('Response:', response.data);
      } catch (error) {
        console.error('Error creating Account:', error);
        throw error;
      }
    },

    fetchProfile: async (token, id) => {
        try {
            const response = await axios.get(`${API_URL}/api/users/${id}`, {
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

    updateProfile: async (token, id, name, email, password) => {
        try {
            const response = await axios.put(`${API_URL}/api/users/${id}`, {name, email, password}, {
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

    deleteProfile: async (token, id) => {
        try {
            await axios.delete(`${API_URL}/api/users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        } catch (error) {
          console.error('Error creating Account:', error);
          throw error;
        }
    },
};