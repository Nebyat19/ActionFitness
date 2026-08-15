<template>
  <div>
    <div class="flex items-center justify-between gap-3 mb-6">
      <h1 class="text-xl sm:text-2xl font-semibold text-admin-ink">Media Library</h1>
      <label class="admin-btn-primary cursor-pointer shrink-0">
        <AdminIcon v-if="!uploading" name="plus" cls="w-4 h-4" />
        <AdminIcon v-else name="spinner" cls="w-4 h-4 animate-spin" />
        <span>{{ uploading ? `${uploadPercent}%` : 'Upload' }}</span>
        <input type="file" accept="image/*,video/*" class="hidden" :disabled="uploading" @change="handleUpload" />
      </label>
    </div>

    <p v-if="error" class="text-sm text-admin-danger bg-admin-danger-surface border border-red-200 rounded-lg px-3 py-2 mb-4">
      {{ error }}
    </p>

    <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
      <div v-for="i in 6" :key="i" class="admin-card aspect-square animate-pulse bg-admin-canvas" />
    </div>

    <div v-else-if="items.length === 0" class="admin-card flex flex-col items-center text-center px-6 py-14">
      <div class="w-12 h-12 rounded-full bg-admin-canvas flex items-center justify-center mb-3">
        <AdminIcon name="photo" cls="w-6 h-6 text-admin-subtle" />
      </div>
      <p class="text-sm text-admin-muted">No media uploaded yet.</p>
    </div>

    <ul v-else class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
      <li v-for="item in items" :key="item.id" class="admin-card overflow-hidden group">
        <div class="aspect-square bg-admin-canvas">
          <img v-if="item.kind === 'image'" :src="item.blobUrl" class="w-full h-full object-cover" />
          <video v-else :src="item.blobUrl" class="w-full h-full object-cover" muted controls />
        </div>
        <div class="flex items-center justify-between gap-2 p-2">
          <div class="text-xs text-admin-subtle truncate">{{ item.blobPathname.split('/').pop() }}</div>
          <button type="button" class="text-admin-subtle hover:text-admin-danger shrink-0" title="Delete" @click="handleDelete(item)">
            <AdminIcon name="trash" cls="w-4 h-4" />
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useMediaLibrary } from '@/composables/useMediaLibrary'
import { confirmDialog } from '@/composables/useConfirm'
import AdminIcon from '@/components/admin/AdminIcon.vue'

const { items, loading, upload, remove } = useMediaLibrary()
const error = ref('')
const uploading = ref(false)
const uploadPercent = ref(0)

async function handleUpload(event) {
  const file = event.target.files[0]
  if (!file) return
  error.value = ''
  uploading.value = true
  uploadPercent.value = 0
  try {
    await upload(file, {
      onUploadProgress: (p) => {
        uploadPercent.value = Math.round((p.loaded / p.total) * 100)
      }
    })
  } catch (err) {
    error.value = err.message
  } finally {
    uploading.value = false
    event.target.value = ''
  }
}

async function handleDelete(item) {
  const ok = await confirmDialog('Delete this file? This cannot be undone.')
  if (!ok) return
  try {
    await remove(item.id)
  } catch (err) {
    error.value = err.message
  }
}
</script>
