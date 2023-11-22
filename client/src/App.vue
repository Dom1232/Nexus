<template>
  <div>
    <nav>
      <router-link v-if="!isAuthenticated" to="/signup">Sign Up</router-link>
      <router-link v-if="!isAuthenticated" to="/signin">Sign In</router-link>
      <router-link v-if="isAuthenticated"  to="/" @click="clearToken">Sign Out</router-link>
      <router-link v-if="isAuthenticated" to="/timeline">Timeline</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import auth from './api/auth-help';

export default {
  name: 'App',
  data() {
    return {
      isAuthenticated: auth.isAuthenticated()
    }
  },
  methods: {
    clearToken() {
      auth.clearToken();
      this.isAuthenticated = auth.isAuthenticated();
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  background-color: #333;
  padding: 20px;
  color: white;
  width: 100%;
  margin-left: -8px;
  margin-top: -8px;
}

nav a {
  color: white;
  margin: 0 20px;
  text-decoration: none;
}

nav a:hover {
  text-decoration: underline;
}

</style>
