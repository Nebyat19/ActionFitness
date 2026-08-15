<template>
  <div>
    <RouterLink
      to="/admin/gallery"
      active-class=""
      exact-active-class=""
      class="text-sm text-admin-muted hover:text-admin-ink inline-flex items-center gap-1"
    >
      &larr; Gallery collections
    </RouterLink>
    <div class="flex items-center justify-between gap-3 mt-1 mb-6">
      <h1 class="text-xl sm:text-2xl font-semibold text-admin-ink truncate">{{ collection?.title || 'Collection' }}</h1>
      <button type="button" class="admin-btn-primary shrink-0" @click="pickerOpen = true">
        <AdminIcon name="plus" cls="w-4 h-4" />
        <span class="hidden sm:inline">Add photos</span>
      </button>
    </div>

    <p v-if="error" class="text-sm text-admin-danger bg-admin-danger-surface border border-red-200 rounded-lg px-3 py-2 mb-4">
      {{ error }}
    </p>
    <p v-if="loading" class="text-sm text-admin-muted">Loading…</p>

    <template v-else>
      <div v-if="collectionItems.length === 0" class="admin-card flex flex-col items-center text-center px-6 py-14">
        <div class="w-12 h-12 rounded-full bg-admin-canvas flex items-center justify-center mb-3">
          <AdminIcon name="image" cls="w-6 h-6 text-admin-subtle" />
        </div>
        <p class="text-sm text-admin-muted">No photos in this collection yet.</p>
      </div>

      <ul v-else class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <li v-for="(item, index) in collectionItems" :key="item.id" class="admin-card overflow-hidden">
          <div class="aspect-square bg-admin-canvas">
            <img v-if="mediaFor(item)?.kind === 'image'" :src="mediaFor(item)?.blobUrl" class="w-full h-full object-cover" />
            <video v-else :src="mediaFor(item)?.blobUrl" class="w-full h-full object-cover" muted />
          </div>
          <div class="flex items-center justify-between p-2 gap-1">
            <div class="flex gap-1">
              <button type="button" class="admin-btn-icon !w-6 !h-6" :disabled="index === 0" @click="move(item, index, -1)">
                <AdminIcon name="chevron-up" cls="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                class="admin-btn-icon !w-6 !h-6"
                :disabled="index === collectionItems.length - 1"
                @click="move(item, index, 1)"
              >
                <AdminIcon name="chevron-down" cls="w-3.5 h-3.5" />
              </button>
            </div>
            <button type="button" class="text-admin-subtle hover:text-admin-danger" title="Remove" @click="removeItem(item)">
              <AdminIcon name="trash" cls="w-4 h-4" />
            </button>
          </div>
        </li>
      </ul>
    </template>

    <AdminModal v-if="pickerOpen" title="Add to collection" @close="pickerOpen = false">
      <div class="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-96 overflow-y-auto">
        <button
          v-for="media in mediaItems"
          :key="media.id"
          type="button"
          class="border rounded-lg overflow-hidden aspect-square relative"
          :class="isInCollection(media.id) ? 'ring-2 ring-admin-accent border-transparent' : 'border-admin-line'"
          @click="toggleMedia(media)"
        >
          <img v-if="media.kind === 'image'" :src="media.blobUrl" class="w-full h-full object-cover" />
          <video v-else :src="media.blobUrl" class="w-full h-full object-cover" muted />
          <span
            v-if="isInCollection(media.id)"
            class="absolute inset-0 bg-black/40 text-white flex items-center justify-center text-lg"
          >
            ✓
          </span>
        </button>
      </div>
      <p v-if="mediaItems.length === 0" class="text-sm text-admin-muted mt-2">
        No media uploaded yet — add some in the Media Library first.
      </p>
    </AdminModal>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { adminApi } from '@/lib/adminApi'
import { useMediaLibrary } from '@/composables/useMediaLibrary'
import { confirmDialog } from '@/composables/useConfirm'
import AdminModal from '@/components/admin/AdminModal.vue'
import AdminIcon from '@/components/admin/AdminIcon.vue'

const route = useRoute()
const collectionId = computed(() => Number(route.params.collectionId))

const collection = ref(null)
const allItems = ref([])
const loading = ref(true)
const error = ref('')
const pickerOpen = ref(false)

const { items: mediaItems } = useMediaLibrary()

const collectionItems = computed(() =>
  allItems.value
    .filter((i) => i.collectionId === collectionId.value)
    .sort((a, b) => a.sortOrder - b.sortOrder || a.id - b.id)
)

function mediaFor(item) {
  return mediaItems.value.find((m) => m.id === item.mediaId)
}

function isInCollection(mediaId) {
  return collectionItems.value.some((i) => i.mediaId === mediaId)
}

async function load() {
  loading.value = true
  error.value = ''
  try {
    const [c, items] = await Promise.all([
      adminApi.get('gallery-collections', collectionId.value),
      adminApi.list('gallery-items')
    ])
    collection.value = c
    allItems.value = items
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
load()
watch(collectionId, load)

async function toggleMedia(media) {
  const existing = collectionItems.value.find((i) => i.mediaId === media.id)
  try {
    if (existing) {
      await adminApi.remove('gallery-items', existing.id)
    } else {
      const maxSortOrder = collectionItems.value.reduce((max, i) => Math.max(max, i.sortOrder ?? 0), -1)
      await adminApi.create('gallery-items', {
        collectionId: collectionId.value,
        mediaId: media.id,
        sortOrder: maxSortOrder + 1
      })
    }
    await load()
  } catch (err) {
    error.value = err.message
  }
}

async function removeItem(item) {
  const ok = await confirmDialog('Remove this photo from the collection? (The file itself stays in the Media Library.)', {
    confirmLabel: 'Remove'
  })
  if (!ok) return
  try {
    await adminApi.remove('gallery-items', item.id)
    await load()
  } catch (err) {
    error.value = err.message
  }
}

async function move(item, index, direction) {
  const other = collectionItems.value[index + direction]
  if (!other) return
  try {
    await Promise.all([
      adminApi.update('gallery-items', item.id, { sortOrder: other.sortOrder }),
      adminApi.update('gallery-items', other.id, { sortOrder: item.sortOrder })
    ])
    await load()
  } catch (err) {
    error.value = err.message
  }
}
</script>
