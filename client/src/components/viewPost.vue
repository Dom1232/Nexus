<template>
    <div v-if="post">
        <div class="post">
            <div class="post-header">
                <img src="../assets/logo.png" alt="User Avatar" class="avatar" />
                <div class="position">
                    <strong>{{ post.poster.name }}</strong>
                </div>
                <div  class="dropdown">
                    <i v-if="post.poster._id === keyUser" @click="changeDropdown" class="fas fa-ellipsis-h"></i>
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
            </div>
        </div>


        <div class="comment-section">
            <div v-for="comment in post.comments" :key="comment._id" class="comment">
                <div class="comment-dropdown">
                    <i v-if="comment.poster._id === keyUser" @click="changeCommentDropdown" class="fas fa-ellipsis-h"></i>
                    <div v-if="showCommentDropdown" class="comment-dropdown-content">
                        <a @click="deleteComment(comment._id)">Delete Comment</a>
                    </div>
                </div>
                <div class="comment-body">
                    <strong>{{ comment.poster.name }}:</strong> {{ comment.body }}
                </div>
            <div>
                <span class="comment-timestamp">{{ formatDateTime(comment.created) }}</span>
            </div>
            </div>
            
            <form @submit.prevent="addComment">
            <textarea v-model="newComment" placeholder="Add a comment..." rows="3" @input="updateCharacterCount"></textarea>
            <div class="character-count">{{ characterCount }}/250</div>
            <button type="submit" :disabled="newComment.length === 0 || newComment.length > 250">Post Comment</button>
            </form>
        </div>
    </div>
</template>

<script>

  export default {
    emits: ['user-signed-in'],
    data() {
      return {
        post: null,
        showDropdown: false,
        showCommentDropdown: false,
        keyUser: '',
        newComment: '',
        characterCount: 0,
      };
    },
    created() {
    this.fetchPostDetails();
    },
    methods: {
      async fetchPostDetails() {
      try {
        const postId = this.$route.params.postId;
        const token = localStorage.getItem("token");
        const returnData = await this.$authService.decodeToken(token);
        this.keyUser = returnData.id;
        const postDetails = await this.$postService.getPostDetails(token, postId);
        this.post = postDetails;
        } catch (error) {
            console.error('Error fetching post details:', error);
        }
      },
      updateCharacterCount() {
        this.characterCount = this.newComment.length;
      },
      async addComment() {
      try {
        const token = localStorage.getItem('token');
        const postId = this.$route.params.postId;

        const updatedPost = await this.$postService.addComment(token, postId, this.keyUser, this.newComment);
        this.post = updatedPost;
        this.newComment = '';
        this.fetchPostDetails();
        } catch (error) {
            console.error('Error adding comment:', error);
        }
      },
      async deletePost(postId) {
        const token = localStorage.getItem('token');
        await this.$postService.deletePost(token, this.keyUser, postId);
        this.$router.push('/timeline');
      },
      async deleteComment(commentId) {
        const token = localStorage.getItem('token');
        await this.$postService.deleteComment(token, this.keyUser, commentId);
        this.fetchPostDetails();
      },
      changeDropdown() {
        this.showDropdown = !this.showDropdown;
      },
      changeCommentDropdown() {
        this.showCommentDropdown = !this.showCommentDropdown;
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
  margin-top: 50px;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 5px;
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

.post-button {
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

.comment-dropdown {
  position: relative;
  display: inline-block;
  cursor: pointer;
  max-width: 10px;
}

.comment-dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.comment-dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.comment-dropdown-content a:hover {
  background-color: #f1f1f1;
}

.comment-dropdown:hover .comment-dropdown-content {
  display: block;
}



.comment-section {
  margin-top: 5px;
}

.comment {
  background-color: #fff;
  margin-bottom: 3px;
  padding: 10px;
  border-radius: 16px;
  max-width: 480px;
  margin-left : auto;
  margin-right : auto;
}

.comment-header {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.comment-timestamp {
  color: #777;
  font-size: 12px;
}

.comment-body {
  line-height: 1.6;
  word-break: break-all;
  max-width: 80%;
  margin-left: auto;
  margin-right: auto;
}

form {
  margin-top: 20px;
}

textarea {
  width: 480px;
  resize: none;
}

.comment-dropdown {
  position: relative;
  float: right;
  margin-right: 10px;
}

button {
    margin-top: 5px;
    min-width: 70px;
    padding: 10px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #2980b9;
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');
</style>