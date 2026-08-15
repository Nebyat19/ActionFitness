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
import { useAuthStore } from '@/stores/auth'

const routes = [
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
        path: '/services',
        name: 'services',
        component: ServiceListView
      },
      {
        path: '/services/:name',
        name: 'service-detail',
        component: ServiceDetailView,
        props: true
      },
      {
        path: '/contact',
        name: 'contact-us',
        component: ConatctusView
      },
      {
        path: '/branches',
        name: 'branches',
        component: () => import('@/views/BranchesView.vue')
      }
    ]
  },
  {
    path: '/admin/login',
    name: 'admin-login',
    component: () => import('@/views/admin/AdminLoginView.vue')
  },
  {
    path: '/admin',
    component: () => import('@/layouts/AdminLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'admin-dashboard', component: () => import('@/views/admin/AdminDashboardView.vue') },
      { path: 'branches', name: 'admin-branches', component: () => import('@/views/admin/AdminBranchesView.vue') },
      { path: 'services', name: 'admin-services', component: () => import('@/views/admin/AdminServicesView.vue') },
      { path: 'trainers', name: 'admin-trainers', component: () => import('@/views/admin/AdminTrainersView.vue') },
      { path: 'gallery', name: 'admin-gallery', component: () => import('@/views/admin/AdminGalleryView.vue') },
      {
        path: 'gallery/:collectionId',
        name: 'admin-gallery-items',
        component: () => import('@/views/admin/AdminGalleryItemsView.vue'),
        props: true
      },
      {
        path: 'certificates',
        name: 'admin-certificates',
        component: () => import('@/views/admin/AdminCertificatesView.vue')
      },
      {
        path: 'transformations',
        name: 'admin-transformations',
        component: () => import('@/views/admin/AdminTransformationsView.vue')
      },
      {
        path: 'site-content',
        name: 'admin-site-content',
        component: () => import('@/views/admin/AdminSiteContentView.vue')
      },
      { path: 'media', name: 'admin-media', component: () => import('@/views/admin/AdminMediaView.vue') },
      { path: 'users', name: 'admin-users', component: () => import('@/views/admin/AdminUsersView.vue') }
    ]
  },
  //error page
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    redirect: '/'
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  routes
})

// Client-side gate for /admin/* — convenience only. Every /api/admin/*
// request independently re-verifies the session server-side regardless.
router.beforeEach(async (to) => {
  if (!to.matched.some((r) => r.meta.requiresAuth)) return true

  const auth = useAuthStore()
  if (!auth.checked) await auth.checkSession()
  if (!auth.isAuthenticated) {
    return { path: '/admin/login', query: { redirect: to.fullPath } }
  }
  return true
})

export default router
