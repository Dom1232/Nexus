import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue'
import signUp from '../components/signUp.vue'
import signIn from '../components/signIn.vue'
import timeLine from '../components/timeLine.vue'
import profile from '../components/myProfile.vue'
import {pageVerify} from '../api/pageProtect';

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
      {
        path: '/timeline',
        name: 'timeline',
        component: timeLine,
        beforeEnter: pageVerify,
      },
      {
        path: '/profile',
        name: 'profile',
        component: profile,
        beforeEnter: pageVerify,
      }   
    ],
});

export default router;