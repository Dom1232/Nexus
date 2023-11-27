<template>
    <div v-if="!isAuthenticated">
        <form @submit.prevent="signIn">
            <h2>Sign In</h2>
            <label>Email:</label>
            <input v-model="email" required/>
            <br />
        
            <label>Password:</label>
            <input v-model="password" required/>
            <br />
            <router-link to="/">
              <button>Cancel</button>
            </router-link>
            <button>Sign In</button>
            <transition name="fade">
            <h4 v-if="signInError" class="error-message">Error signing in. Please check your credentials.</h4>
            </transition>
            <transition name="fade">
            <h4 v-if="Error" class="error-message">Email or Username Already Exists</h4>
            </transition>
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
        isAuthenticated: false,
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
          this.$emit('user-signed-in', true);   
          this.$router.push({ name: 'timeline' });
        } else {
          console.error('Error signing in:', response.data.message);
          this.signInError = true;
          setTimeout(() => {
          this.signInError = false;
          }, 3000);
        }
      } catch (error) {
        console.error('Error signing in:', error);
        this.signInError = true;
        setTimeout(() => {
          this.signInError = false;
        }, 3000);
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
  .signed-in-container {
  position: relative;
  }
.overlay-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: rgb(0, 0, 0); 
    font-size: 35px; 
    cursor: pointer;
}

img {
    cursor: pointer;
}

.success-message {
  opacity: 1;
  transition: opacity 2.5s ease-in-out;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>