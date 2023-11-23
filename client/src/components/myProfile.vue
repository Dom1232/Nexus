<template>
  <div class="profile-container">
    <h2 class="profile-heading">User Profile</h2>
    <div v-if="currentUser">
      <div class="profile-info">
        <div class="info-item">
          <span class="info-label">Name:</span>
          <span class="info-value">{{ currentUser.name }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Email:</span>
          <span class="info-value">{{ currentUser.email }}</span>
        </div>

        <div class="profile-actions">
          <button @click="updateProfile" class="action-button">
            <i class="fas fa-edit"></i> Update
          </button>
          <button @click="deleteProfile" class="action-button delete-button">
            <i class="fas fa-trash-alt"></i> Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
    data() {
      return {
        currentUser: null,
        id: '',
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
            this.currentUser = user;
        } catch (error) {
        console.error('Error fetching user details:', error);
      }
    },
  },
};
</script>

<style scoped>
.profile-container {
  max-width: 600px;
  margin: 0 auto;
}

.profile-heading {
  text-align: center;
  color: #3498db;
  font-size: 28px;
  margin-bottom: 20px;
}

.profile-info {
  background-color: #ecf0f1;
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
</style>