<template>
    <div class="dropdown">
      <button @click="toggleDropdown">Users<i class="fas fa-caret-down"></i></button>
      <div v-if="showDropdown" class="dropdown-content">
        <router-link v-for="user in users" :key="user._id" :to="'/user/' + user._id">
          {{ user.name }}
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showDropdown: false,
        users: [] 
      };
    },
    created() {
    this.getAllUsers();
    },
    methods: {
      toggleDropdown() {
        this.showDropdown = !this.showDropdown;
      },
      async getAllUsers() {
        try {
          this.users = await this.$apiService.getAllUsers();
        } catch (error) {
          console.error('Error getting users:', error);
        }
      },
    }
  };
  </script>
  
  <style scoped>
  
  button {
    background-color: rgb(109, 7, 128);
    color: white;
    border: none;
    padding: 8px;
    cursor: pointer;
    font-size: 16px;
  }

  .dropdown {
  position: relative;
  display: inline-block;
  cursor: pointer;
  left: -300px;
  margin-right: -80px;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>