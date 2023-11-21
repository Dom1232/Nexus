import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/router'
import apiService from './api/apiService';

const app = createApp(App);
app.use(router);
app.config.globalProperties.$apiService = apiService;
app.mount('#app');
