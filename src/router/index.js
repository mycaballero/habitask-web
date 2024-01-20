import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '@/components/private/auth/Login.vue'
import Register from '@/components/private/auth/Register.vue'
import NotFound from '../pages/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        layout: 'AppLayout',
        title: 'home'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => Login,
      meta: {
        layout: 'GuestLayout',
        title: 'login'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => Register,
      meta: {
        layout: 'GuestLayout',
        title: 'register'
      }
    },
    {
      name: 'not-found',
      path: '/:pathMatch(.*)*',
      component: () => NotFound,
      meta: {
        layout: 'GuestLayout',
        title: 'not_found'
      }
    }
  ]
})

export default router
