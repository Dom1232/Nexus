import axios from 'axios';


export default {
  signout: async () => {
    try {
      let response = await axios.get(`/auth/signOut`);
      console.log(response.data);
      } catch(err) { 
      console.log(err)
      } 
  },

  decodeToken: async (token) => {
    try {
      let response = await axios.post(`/auth/decode`, {token}, {
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