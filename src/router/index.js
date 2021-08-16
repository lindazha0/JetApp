import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/try',
    name: 'Try',
    component: () => import('../views/try.vue')
  },
  {
    path: '/slider',
    name: 'Slider',
    component: () => import('../views/slider.vue')
  },
  {
    path: '/birth',
    name: 'Birthday',
    component: () => import('../views/birth.vue')
  },
  {
    path: '/face_reco',
    name: 'Singin',
    component: () => import('../views/face.vue')
  },
  {
    path: '/doc',
    name: 'Doc',
    component: () => import('../views/docs.vue')
  },
  {
    path: '/snacks',
    name: 'Snacks',
    component: () => import('../views/snack.vue')
  },
  {
    path: '/:pathMatch(.*)',
    name: 'NotFind',
    component: () => import('../views/error.vue')
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
