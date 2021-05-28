import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import Task from '../views/Task.vue'
import Starter from '../views/Starter.vue'
import Conf from '../views/Conf.vue'
import Tool from '../views/Tool.vue'
import Watcher from '../views/Watcher.vue'

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
    path: '/',
    name: 'main',
    component: Main
  },
  {
    path: '/task',
    name: 'task',
    component: Task
  },
  {
    path: '/starter',
    name: 'starter',
    component: Starter
  },
  {
    path: '/conf',
    name: 'conf',
    component: Conf
  },
  {
    path: '/tool',
    name: 'tool',
    component: Tool
  },
  {
    path: '/watcher',
    name: 'watcher',
    component: Watcher
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
