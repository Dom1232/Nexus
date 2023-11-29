<template>
    <div>
        <h2>{{ user.name }}'s Posts</h2>
        <div v-if="userPosts">
            <div v-for="post in userPosts" :key="post._id" class="post">
                <div class="post-header">
                    <img src="../assets/logo.png" alt="User Avatar" class="avatar" />
                    <div class="position">
                        <strong>{{ post.poster.name }}</strong>
                    </div>
                    <div class="dropdown">
                        <i v-if="post.poster._id === keyUser" @click="toggleDropdown" class="fas fa-ellipsis-h"></i>
                        <div v-if="showDropdown" class="dropdown-content">
                        <a @click="deletePost(post._id)">Delete Post</a>
                        </div>
                    </div>
                </div>
                <div class="post-body">
                    {{ post.body }}
                </div>
                <div class="post-footer">
                    <span class="timestamp">{{ formatDateTime(post.created) }}</span>
                    <div class="footer-item">
                        {{ post.comments.length }}<RouterLink :to="'/viewPost/' + post._id"><i class="fas fa-comment"></i></RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        user: '',
        userPosts: [],
        keyUser: '',
        showDropdown: false,
      };
    },
    watch: {
    $route(to, from) {
        const toUserId = to.params.userId;
        const fromUserId = from.params.userId;

        if (toUserId !== fromUserId) {
            if (toUserId) {
                this.userId = toUserId;
                this.fetchUserPosts();
            }   
        }
    },
    },
    created() {
      this.fetchUserPosts();
    },
    methods: {
        async fetchUserPosts() {
        try {
          const userId = this.$route.params.userId;
          const token = localStorage.getItem("token");
          const returnData = await this.$authService.decodeToken(token);
          this.keyUser = returnData.id;
          this.user = await this.$apiService.fetchProfile(token, userId);
          this.userPosts = await this.$postService.getPostsByUser(token, userId);
        } catch (error) {
          console.error('Error getting user posts:', error);
        }
        },
        async deletePost(postId) {
            const token = localStorage.getItem('token');
            await this.$postService.deletePost(token, this.keyUser, postId);
            window.location.reload();
        },
        toggleDropdown() {
            this.showDropdown = !this.showDropdown;
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
    word-break: break-all;
    max-width: 80%;
    margin-left: auto;
    margin-right: auto;
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

  .dropdown {
  position: relative;
  display: inline-block;
  cursor: pointer;
  max-width: 10px;
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

@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');
</style>