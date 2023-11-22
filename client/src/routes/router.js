import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue'
import signUp from '../components/signUp.vue'
import signIn from '../components/signIn.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        name: 'home',
        component: Home,
      },
      {
        path: '/signup',
        name: 'signup',
        component: signUp,
      },
      {
        path: '/signin',
        name: 'signin',
        component: signIn,
      },
    ],
});

export default router;