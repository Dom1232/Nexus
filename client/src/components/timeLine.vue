<template>
    <div>
        <h2 class="heading">Posts</h2>
        <div>
            <div v-for="post in reversedPosts" :key="post._id" class="post">
                <div class="post-header">
                    <img src="../assets/logo.png" alt="User Avatar" class="avatar" />
                    <div class="position">
                        <strong>{{ post.poster.name }}</strong>
                    </div>
                </div>
                <div class="post-body">
                    {{ post.body }}
                </div>
                <div class="post-footer">
                    <span class="timestamp">{{ formatDateTime(post.created) }}</span>
                    <div class="footer-item">
                        <i class="fas fa-comment"></i>
                    </div>
                </div>
            </div>
        </div>
        <button @click="navigateToNewPage" class="new-page-button">
            <i class="fas fa-plus"></i>
        </button>
    </div>
</template>
  
  
  <script>
import auth from '@/api/auth-help';

  export default {
    data() {
      return {
        posts: [],
      };
    },
    created() {
      auth.isAuthenticated();
      this.getAllPosts();
    },
    computed: {
        reversedPosts() {
        return this.posts.slice().reverse();
        },
    },
    methods: {
      async getAllPosts() {
        try {
          const token = localStorage.getItem('token')
          this.posts = await this.$postService.getAllPosts(token);
        } catch (error) {
          console.error('Error getting posts:', error);
        }
      },
      formatDateTime(dateTimeString) {
        const options = {
        hour: 'numeric',
        minute: 'numeric',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        };
        return new Date(dateTimeString).toLocaleString('en-US', options);
      },
      async navigateToNewPage() {
        this.$router.push('/makePost');
      },
    },
  };
  </script>

<style scoped>
.post {
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  padding: 20px;
  max-width: 480px;
  margin-left : auto;
  margin-right : auto;
}

.heading {
  text-align: center;
  color: black;
  font-size: 28px;
  margin-bottom: 20px;
}
.post-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.position {
  margin-left: -50px;
}

.avatar {
  border-radius: 50%;
  margin-right: 10px;
  width: 40px;
  height: 40px;
  object-fit: cover;
}

.post-header div {
  flex-grow: 1;
}

.post-header strong {
  font-size: 18px;
  display: block;
}

.post-header .username {
  color: #777;
}

.post-body {
  margin-bottom: 15px;
  line-height: 1.6;
}

.post-footer {
  position: relative;
  display: flex;
  color: #777;
  font-size: 12px;
  justify-content: space-between;
  align-items: flex-end;
}

.timestamp {
  font-weight: bold;
}

.footer-item i {
  margin-right: 5px;
  margin-left: 10px;
  font-size: 20px;
  justify-content: space-between;
}

.new-page-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 10px;
    background-color: #82cdff;
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 25px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');
</style>