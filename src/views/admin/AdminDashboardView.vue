<template>
  <div>
    <h1 class="text-xl sm:text-2xl font-semibold text-admin-ink mb-1">Dashboard</h1>
    <p class="text-admin-muted mb-6">Manage everything shown on the public site from here.</p>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <RouterLink
        v-for="tile in tiles"
        :key="tile.to"
        :to="tile.to"
        active-class=""
        exact-active-class=""
        class="admin-card flex items-start gap-4 p-5 hover:shadow-md hover:border-admin-accent/40 transition-all"
      >
        <div class="w-10 h-10 rounded-lg bg-admin-accent/10 text-admin-accent-dark flex items-center justify-center shrink-0">
          <AdminIcon :name="tile.icon" cls="w-5 h-5" />
        </div>
        <div class="min-w-0">
          <div class="font-medium text-admin-ink">{{ tile.label }}</div>
          <div class="text-sm text-admin-muted mt-0.5">{{ tile.description }}</div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import AdminIcon from '@/components/admin/AdminIcon.vue'

const tiles = [
  { to: '/admin/branches', label: 'Branches', description: 'Gym locations, addresses, hours', icon: 'map-pin' },
  { to: '/admin/services', label: 'Services', description: 'What the gym offers', icon: 'bolt' },
  { to: '/admin/trainers', label: 'Trainers', description: 'Trainer profiles & certifications', icon: 'users' },
  { to: '/admin/gallery', label: 'Gallery', description: 'Photo collections', icon: 'image' },
  { to: '/admin/certificates', label: 'Certificates', description: 'Certificate images', icon: 'badge' },
  { to: '/admin/transformations', label: 'Transformations', description: 'Before/after videos & photos', icon: 'refresh' },
  { to: '/admin/site-content', label: 'Site Text', description: 'Gym info & founder bio', icon: 'document' },
  { to: '/admin/media', label: 'Media Library', description: 'All uploaded photos & videos', icon: 'photo' },
  { to: '/admin/users', label: 'Users', description: 'Who can log into this dashboard', icon: 'users' }
]
</script>
