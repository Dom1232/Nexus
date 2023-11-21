<template>
    <div>
      <h2>Sign Up</h2>
      <form @submit.prevent="submitForm">

        <label for="name">Username:</label>
        <input type="text" id="name" v-model="userData.name" required>

        <label for="email">Email:</label>
        <input type="text" id="email" v-model="userData.email" required>

        <label for="password">Password:</label>
        <input type="text" id="password" v-model="userData.password" required>

        <router-link to="/">
          <button>Cancel</button>
        </router-link>
        <button type="submit">Submit</button>
      </form>
    </div>
</template>
  
<script>
export default {
    data() {
    return {
      userData: {
        name: '',
        email: '',
        password: '',
      },
    };
    },
    methods: {
      submitForm() {
        this.$apiService.createUser(this.userData)
          .then(response => {
            console.log('User created successfully:', response);
            this.$router.push({ name: 'home' });
          })
          .catch(error => {
            console.error('Error creating user:', error);
          });
      },
    },
  };
</script>

<style scoped>
  h2 {
    color: #333;
    text-align: center;
  }

  form {
    max-width: 400px;
    margin: 0 auto;
  }

  label {
    display: block;
    margin-top: 10px;
    font-weight: bold;
  }

  input {
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