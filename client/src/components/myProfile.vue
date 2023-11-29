<template>
  <div class="profile-container">
    <h2 class="profile-heading">User Profile</h2>
    <div>     
      <div class="profile-info">
        <form @submit.prevent="updateUser">
          <div class="info-item">  
            <span class="info-label">Name:</span>
            <input v-model="name" type="text" class="info-value" required/>
          </div>
          <div class="info-item">
            <label class="info-label">Email:</label>
            <input type="email" v-model="email" class="info-value" required/>
          </div>
          <div class="info-item">
            <span class="info-label">Password:</span>
            <input v-model="password" class="info-value" />
          </div>

          <div class="profile-actions">
            <button type="submit" class="action-button">
              <i class="fas fa-edit"></i> Update
            </button>
            <button @click.prevent="deleteUser" class="action-button delete-button">
              <i class="fas fa-trash-alt"></i> Delete
            </button>
          </div>   
        </form>
      </div>
      <transition name="fade">
        <h4 v-if="message" class="success-message">
          Profile Successfully Updated
        </h4>
      </transition>
    </div>
  </div>
  <div>

  </div>
</template>

<script>

export default {
  emits: ['user-signed-in'],
    data() {
      return {
        name: '',
        email: '',
        password: '',
        id: '',
        message: null,
        isAuthenticated: this.$auth.isAuthenticated()
    };
    },
    created() {
    this.fetchCurrentUser();
    },
    methods: {
    async fetchCurrentUser() {
      try {
        const token = localStorage.getItem('token')
        const returnData = await this.$authService.decodeToken(token);
        this.id = returnData.id;
        const user = await this.$apiService.fetchProfile(token, this.id);
        this.name = user.name;
        this.email = user.email;
        
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    },
    async updateUser() {
      try {
        const token = localStorage.getItem('token')
        const returnData = await this.$apiService.updateProfile(token, this.id, this.name, this.email, this.password);
        this.name = returnData.user.name;
        this.email = returnData.user.email;
        this.password = '';
        this.message = true;
        setTimeout(() => {
          this.message = false;
        }, 3000);
      } catch (error) {
        console.error('Error updating user details:', error);
        
      }
    },
    async deleteUser() {
      try {
        const confirmed = window.confirm('Are you sure you want to delete your profile? This action is irreversible.');
        if (confirmed) {
          const token = localStorage.getItem('token');
          await this.$apiService.deleteProfile(token, this.id);
          this.$auth.clearToken();
          this.$emit('user-signed-in', false);  
          this.$router.push({ name: 'home' });
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    },
  },
};
</script>

<style scoped>
.profile-container {
  max-width: 480px;
  margin: 0 auto;
}

.profile-heading {
  text-align: center;
  color: black;
  font-size: 28px;
  margin-bottom: 20px;
}

.profile-info {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.info-item {
  margin-bottom: 15px;
}

.info-label {
  font-weight: bold;
  color: #2c3e50;
}

.info-value {
  margin-left: 10px;
  color: #7f8c8d;
}

.profile-actions {
  margin-top: 20px;
  
}

.action-button {
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.action-button:hover {
  background-color: #2980b9;
}

.delete-button {
  background-color: #e74c3c;
  margin-left: 20px;
}

.delete-button:hover {
  background-color: #c0392b;
}

.error-message {
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