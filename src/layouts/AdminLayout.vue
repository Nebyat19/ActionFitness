<template>
  <div class="admin-shell min-h-screen bg-admin-canvas text-admin-ink">
    <!-- Mobile topbar -->
    <div class="lg:hidden sticky top-0 z-30 flex items-center justify-between gap-3 bg-admin-sidebar px-4 py-3">
      <button
        type="button"
        class="p-2 -ml-2 rounded-lg text-white hover:bg-admin-sidebar-hover"
        aria-label="Open menu"
        @click="drawerOpen = true"
      >
        <AdminIcon name="menu" cls="w-6 h-6" />
      </button>
      <span class="text-white font-semibold tracking-tight">Action Fitness Admin</span>
      <div class="w-10" aria-hidden="true" />
    </div>

    <!-- Mobile drawer overlay -->
    <Transition name="fade">
      <div
        v-if="drawerOpen"
        class="fixed inset-0 z-40 bg-black/50 lg:hidden"
        @click="drawerOpen = false"
      />
    </Transition>

    <div class="flex">
      <!-- Sidebar: static on desktop, off-canvas drawer on mobile -->
      <Transition name="slide">
        <aside
          v-if="drawerOpen || isDesktop"
          class="fixed lg:sticky top-0 left-0 z-50 lg:z-auto h-screen w-72 lg:w-64 shrink-0 bg-admin-sidebar flex flex-col"
        >
          <div class="flex items-center justify-between px-5 py-5 border-b border-admin-sidebar-line">
            <RouterLink
              to="/admin"
              active-class=""
              exact-active-class=""
              class="text-white font-semibold tracking-tight"
              @click="drawerOpen = false"
            >
              Action Fitness <span class="text-admin-accent">Admin</span>
            </RouterLink>
            <button
              type="button"
              class="lg:hidden p-1 -mr-1 rounded text-admin-sidebar-text hover:text-white"
              aria-label="Close menu"
              @click="drawerOpen = false"
            >
              <AdminIcon name="close" cls="w-5 h-5" />
            </button>
          </div>

          <nav class="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-1">
            <AdminNavLink to="/admin" label="Dashboard" icon="dashboard" exact @navigate="drawerOpen = false" />
            <AdminNavLink to="/admin/branches" label="Branches" icon="map-pin" @navigate="drawerOpen = false" />
            <AdminNavLink to="/admin/services" label="Services" icon="bolt" @navigate="drawerOpen = false" />
            <AdminNavLink to="/admin/trainers" label="Trainers" icon="users" @navigate="drawerOpen = false" />
            <AdminNavLink to="/admin/gallery" label="Gallery" icon="image" @navigate="drawerOpen = false" />
            <AdminNavLink to="/admin/certificates" label="Certificates" icon="badge" @navigate="drawerOpen = false" />
            <AdminNavLink to="/admin/transformations" label="Transformations" icon="refresh" @navigate="drawerOpen = false" />
            <AdminNavLink to="/admin/site-content" label="Site Text" icon="document" @navigate="drawerOpen = false" />
            <AdminNavLink to="/admin/site-images" label="Site Images" icon="landscape" @navigate="drawerOpen = false" />
            <AdminNavLink to="/admin/media" label="Media Library" icon="photo" @navigate="drawerOpen = false" />
          </nav>

          <div class="px-3 py-4 border-t border-admin-sidebar-line">
            <div class="px-3 py-2 mb-1 text-xs text-admin-sidebar-text truncate">{{ auth.user?.email }}</div>
            <button
              type="button"
              class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-admin-sidebar-text hover:bg-admin-sidebar-hover hover:text-white transition-colors"
              @click="handleLogout"
            >
              <AdminIcon name="logout" cls="w-5 h-5" />
              Log out
            </button>
          </div>
        </aside>
      </Transition>

      <main class="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 max-w-6xl">
        <RouterView />
      </main>
    </div>

    <AdminConfirmDialog />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AdminNavLink from '@/components/admin/AdminNavLink.vue'
import AdminIcon from '@/components/admin/AdminIcon.vue'
import AdminConfirmDialog from '@/components/admin/AdminConfirmDialog.vue'

const auth = useAuthStore()
const router = useRouter()

const drawerOpen = ref(false)
const isDesktop = ref(window.matchMedia('(min-width: 1024px)').matches)

let mql
function handleMqlChange(e) {
  isDesktop.value = e.matches
}
onMounted(() => {
  mql = window.matchMedia('(min-width: 1024px)')
  mql.addEventListener('change', handleMqlChange)
})
onUnmounted(() => {
  mql?.removeEventListener('change', handleMqlChange)
})

async function handleLogout() {
  await auth.logout()
  router.push('/admin/login')
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.25s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
@media (min-width: 1024px) {
  .slide-enter-active,
  .slide-leave-active {
    transition: none;
  }
}
</style>
