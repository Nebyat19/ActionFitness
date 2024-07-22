import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import defaultLayout from '../layouts/defaultLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: defaultLayout,
      children: [
        {
          path: '/',
          component: HomeView
        }
      ]
    }
  ]
})

export default router
