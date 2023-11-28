<template>
  <div>
    <nav>
      <dropdown v-if="!isAuthenticated"></dropdown>
      <router-link v-if="!isAuthenticated" to="/signup" :class="{ 'active-link': isRouteActive(!isAuthenticated ? '/signup' : '/') }">Sign Up</router-link>
      <router-link v-if="!isAuthenticated" to="/signin" :class="{ 'active-link': isRouteActive(!isAuthenticated ? '/signin' : '/timeline') }">Sign In</router-link>
      <router-link class="center" v-if="isAuthenticated" to="/timeline" :class="{ 'active-link': isRouteActive('/timeline') }">Timeline</router-link>
      <router-link class="right" v-if="isAuthenticated"  to="/" @click="clearToken">Sign Out</router-link>
      <router-link class="right" v-if="isAuthenticated" to="/profile" :class="{ 'active-link': isRouteActive('/profile') }">My Profile</router-link>
    </nav>
    <router-view @user-signed-in="updateAuthenticationStatus"/>
  </div>
</template>

<script>
import auth from './api/auth-help';
import Dropdown from '@/components/userDropdown.vue';

export default {
  name: 'App',
  components: {
    Dropdown
  },
  data() {
    return {
      isAuthenticated: auth.isAuthenticated()
    }
  },
  methods: {
    clearToken() {
      auth.clearToken();
      this.isAuthenticated = auth.isAuthenticated();
    },
    updateAuthenticationStatus(isAuthenticated) {
      this.isAuthenticated = isAuthenticated;
    },
    isRouteActive(route) {
      return this.$route.path === route;
    },
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
  padding: 8px;
  padding-top: 20px;
  padding-bottom: 20px;
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

body {
  background-color: rgb(203, 83, 224);
}

.right{
  float: right;
}

.center{
  margin-right: -190px;
}

.active-link {
  color: red;
}
</style>
