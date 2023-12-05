import axios from 'axios';

const API_URL = 'https://nexus-11h5.onrender.com';

export default {
  signout: async () => {
    try {
      let response = await axios.get(`${API_URL}/auth/signOut`);
      console.log(response.data);
      } catch(err) { 
      console.log(err)
      } 
  },

  decodeToken: async (token) => {
    try {
      let response = await axios.post(`${API_URL}/auth/decode`, {token}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
      return response.data;
      } catch(err) { 
      console.log(err)
      } 
  }
};