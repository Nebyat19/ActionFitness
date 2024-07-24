import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import defaultLayout from '../layouts/defaultLayout.vue'
import TrainesView from '@/views/TrainersView.vue'
import GalleryListView from '@/views/GalleryListView.vue'
import GalleryDetailView from '@/views/GalleryDetailView.vue'

import ServiceListView from '@/views/ServiceListView.vue'
import ServiceDetailView from '@/views/ServiceDetailView.vue'
import AboutView from '@/views/AboutView.vue'
import ConatctusView from '@/views/ContactusView.vue'
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
          component: TrainesView
        },
        {
          path: '/about-us',
          name: 'about',
          component: AboutView 
        },

        {
          path: '/gallery',
          name: 'gallery',
          component: GalleryListView
        },
        {
          path: '/gallery/:name',
          name: 'gallery-detail',
          component: GalleryDetailView,
          props: true
        },
        {
          path:'/services',
          name:'services',
          component:ServiceListView
        },
        {
          path:'/services/:name',
          name:'service-detail',
          component:ServiceDetailView,
          props:true
        },
        {
          path: '/contact',
          name: 'contact-us',
          component: ConatctusView
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
