import auth from '@/middleware/auth.js'
import Callback from '@/components/public/Callback.vue'
import { createRouter, createWebHistory } from 'vue-router'
import guest from '@/middleware/guest.js'
import HomeView from '../views/HomeView.vue'
import Login from '@/components/public/auth/Login.vue'
import middlewarePipeline from '../middleware/middlewarePipeline.js'
import NotFound from '../pages/NotFound.vue'
import Register from '@/components/public/auth/Register.vue'
import Tasks from '@/components/private/tasks/index.vue'
import {useAuthStore} from '@/stores/auth.store.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        middleware: [
          auth
        ],
        layout: 'AppLayout',
        title: 'Inicio'
      }
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: Tasks,
      meta: {
        middleware: [
          auth
        ],
        layout: 'AppLayout',
        title: 'Tareas'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => Login,
      meta: {
        middleware: [
          guest
        ],
        layout: 'GuestLayout',
        title: 'login'
      }
    },
    {
      name: 'auth-callback',
      path: '/auth/callback',
      component: () => Callback,
      meta: {
        middleware: [
          guest
        ],
        layout: 'GuestLayout',
        title: 'redirecting'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => Register,
      meta: {
        middleware: [
          guest
        ],
        layout: 'GuestLayout',
        title: 'Registro'
      }
    },
    {
      name: 'not-found',
      path: '/:pathMatch(.*)*',
      component: () => NotFound,
      meta: {
        layout: 'GuestLayout',
        title: 'No encontrado'
      }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware;
  const context = {
    to,
    from,
    next,
    store: useAuthStore()
  }

  document.title = to.meta.title ? to.meta.title : 'habitask'

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })
})

export default router
