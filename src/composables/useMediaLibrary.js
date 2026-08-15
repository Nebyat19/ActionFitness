// Shared reactive media list so MediaPicker instances (a form can have
// several — e.g. a service's image AND video picker) and the Media Library
// page all stay in sync without each re-fetching independently.
import { ref } from 'vue'
import { adminApi, uploadMedia } from '@/lib/adminApi'

const items = ref([])
const loaded = ref(false)
const loading = ref(false)

async function refresh() {
  loading.value = true
  try {
    items.value = await adminApi.media.list()
    loaded.value = true
  } finally {
    loading.value = false
  }
}

async function upload(file, opts) {
  const row = await uploadMedia(file, opts)
  items.value = [row, ...items.value]
  return row
}

async function remove(id) {
  await adminApi.media.remove(id)
  items.value = items.value.filter((m) => m.id !== id)
}

export function useMediaLibrary() {
  if (!loaded.value && !loading.value) refresh()
  return { items, loading, refresh, upload, remove }
}
