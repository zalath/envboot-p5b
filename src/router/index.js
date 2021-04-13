import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import Task from '../views/Task.vue'

const routes = [
  {
    path: '/home',
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
    path: '/main',
    name: 'main',
    component: Main
  },
  {
    path: '/',
    name: 'task',
    component: Task
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
