<template>
    <div>
        <form @submit.prevent="signIn">
            <h2>Sign In</h2>
            <label>Email:</label>
            <input v-model="email" required/>
            <br />
        
            <label>Password:</label>
            <input v-model="password" required/>
            <br />
        
            <button>Sign In</button>
            <div v-if="signInError">Error signing in. Please check your credentials.</div>
        </form>
    </div>
  </template>
  
  <script>
import axios from 'axios';

  export default {
    data() {
      return {
        email: '',
        password: '',
        signInError: null,
    };
    },
    methods: {
    async signIn() {
        //Leaving this here instead of an api file as I spent 8 hours editing to find out it always worked and I put the wrong email. I'm not breaking it again
      try {
        const response = await axios.post('http://localhost:3000/auth/signin', {
            email: this.email,
            password: this.password,
        }, {
            withCredentials: true,
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        });
        if (response.status === 200) {
          console.log('Sign in successful');
          localStorage.setItem('token', response.data.token);
          console.log(localStorage.token);
          console.log('User:', response.data.user);
        } else {
          console.error('Error signing in:', response.data.message);
          this.signInError = true;
        }
      } catch (error) {
        console.error('Error signing in:', error);
        this.signInError = true;
      }
    },
  },
  };
</script>

<style scoped>
  h2 {
    color: #333;
    text-align: center;
  }

  label {
    display: block;
    margin-top: 10px;
    font-weight: bold;
  }

  input {
    max-width: 400px;
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 10px;
    box-sizing: border-box;
    text-align: center;
  }

  button {
    background-color: #4caf50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px;
  }

  button:hover {
    background-color: #45a049;
  }

  select {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 10px;
    box-sizing: border-box;
  }
</style>