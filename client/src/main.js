import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/router'
import apiService from './api/apiService';
import authService from './api/apiAuth';
import auth from './api/auth-help';

const app = createApp(App);
app.use(router);
app.config.globalProperties.$apiService = apiService;
app.config.globalProperties.$authService = authService;
app.config.globalProperties.$auth = auth;
app.mount('#app');
