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
        },
        {
          path: '/trainers',
          name: 'trainers',
          component: import('@/views/TrainersView.vue')
        },
        {
          path: '/about-us',
          name: 'about',
          component: import('@/views/AboutView.vue')
        },

        {
          path: '/gallery',
          name: 'gallery',
          component: () => import('@/views/GalleryListView.vue')
        },
        {
          path: '/gallery/:name',
          name: 'gallery-detail',
          component: () => import('@/views/GalleryDetailView.vue'),
          props: true
        }
      ]
    }, //error page
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      redirect: '/'
    }
  ]
})

export default router
