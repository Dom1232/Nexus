<template>
    <div>
      <h2>Create Post</h2>
  
      <textarea v-model="postBody" @input="updateCharacterCount"></textarea>
  
      <div class="character-count">{{ characterCount }}/250</div>
  
      <div>
        <button class="delete" @click="discardPost">Discard</button>
        <button @click="postToDatabase" :disabled="postBody.length === 0 || postBody.length > 250">Post</button>
      </div>
    </div>
</template>
  
<script>
  export default {
    data() {
      return {
        postBody: "",
        characterCount: 0,
      };
    },
    methods: { 
      async postToDatabase() {
        const token = localStorage.getItem('token');
        const returnData = await this.$authService.decodeToken(token);
        this.id = returnData.id;
        this.$postService.makePost(token, this.id, this.postBody)
          .catch(error => {
            console.error('Error creating post:', error);
          });
        this.$router.push("/timeline");
      },
      updateCharacterCount() {
        this.characterCount = this.postBody.length;
      },
      discardPost() {
        this.$router.push("/timeline");
      },
    },
  };
</script>
  
<style scoped>
  textarea {
    width: 100%;
    height: 100px;
    max-width: 400px;
    resize: none;
    border-radius: 5px;
  }
  
  .character-count {
    margin-top: 5px;
    color: #777;
  }
  
  button {
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

  .delete{
    background-color: #e74c3c;
    margin-right: 15px;
  }

  .delete:hover {
  background-color: #c0392b;
  }
  
  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
</style>