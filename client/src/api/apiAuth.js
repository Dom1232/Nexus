import axios from 'axios';

const API_URL = 'http://localhost:3000';

export default {
  signout: async () => {
    try {
      let response = await axios.get(`${API_URL}/auth/signOut`);
      console.log(response.data);
      } catch(err) { 
      console.log(err)
      } 
  }
};