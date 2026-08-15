<template>
  <div>
    <div class="flex items-center justify-between gap-3 mb-6">
      <h1 class="text-xl sm:text-2xl font-semibold text-admin-ink">{{ title }}</h1>
      <button type="button" class="admin-btn-primary shrink-0" @click="openCreate">
        <AdminIcon name="plus" cls="w-4 h-4" />
        <span class="hidden sm:inline">New</span>
      </button>
    </div>

    <p v-if="error" class="text-sm text-admin-danger bg-admin-danger-surface border border-red-200 rounded-lg px-3 py-2 mb-4">
      {{ error }}
    </p>

    <div v-if="loading" class="admin-card divide-y divide-admin-line">
      <div v-for="i in 3" :key="i" class="flex items-center gap-3 px-4 py-3.5 animate-pulse">
        <div class="w-11 h-11 rounded-lg bg-admin-canvas shrink-0" />
        <div class="flex-1 h-4 rounded bg-admin-canvas" />
      </div>
    </div>

    <div v-else-if="items.length === 0" class="admin-card flex flex-col items-center text-center px-6 py-14">
      <div class="w-12 h-12 rounded-full bg-admin-canvas flex items-center justify-center mb-3">
        <AdminIcon name="plus" cls="w-6 h-6 text-admin-subtle" />
      </div>
      <p class="text-sm text-admin-muted mb-4">Nothing here yet.</p>
      <button type="button" class="admin-btn-secondary" @click="openCreate">Add the first one</button>
    </div>

    <ul v-else class="admin-card divide-y divide-admin-line overflow-hidden">
      <li
        v-for="(item, index) in items"
        :key="item.id"
        class="flex flex-wrap items-center gap-3 px-4 py-3.5 hover:bg-admin-canvas/60 transition-colors"
      >
        <img
          v-if="thumbnailUrl(item)"
          :src="thumbnailUrl(item)"
          class="w-11 h-11 rounded-lg object-cover shrink-0 border border-admin-line"
        />
        <div class="flex-1 min-w-0 basis-40">
          <div class="font-medium text-admin-ink truncate">{{ itemLabel(item) }}</div>
          <div v-if="item.isActive === false" class="text-xs text-amber-600 mt-0.5">Hidden from public site</div>
        </div>

        <div class="flex items-center gap-1.5 shrink-0 w-full justify-end pt-1 border-t border-admin-line -mx-4 px-4 sm:w-auto sm:ml-auto sm:pt-0 sm:border-0 sm:mx-0 sm:px-0">
          <button
            type="button"
            class="admin-btn-icon"
            :disabled="index === 0"
            title="Move up"
            @click="move(item, index, -1)"
          >
            <AdminIcon name="chevron-up" cls="w-4 h-4" />
          </button>
          <button
            type="button"
            class="admin-btn-icon"
            :disabled="index === items.length - 1"
            title="Move down"
            @click="move(item, index, 1)"
          >
            <AdminIcon name="chevron-down" cls="w-4 h-4" />
          </button>
          <slot name="item-actions" :item="item" />
          <button type="button" class="admin-btn-secondary !px-2.5" @click="openEdit(item)">
            <AdminIcon name="pencil" cls="w-4 h-4" />
            <span class="hidden sm:inline">Edit</span>
          </button>
          <button type="button" class="admin-btn-danger !px-2.5" @click="handleDelete(item)">
            <AdminIcon name="trash" cls="w-4 h-4" />
            <span class="hidden sm:inline">Delete</span>
          </button>
        </div>
      </li>
    </ul>

    <AdminModal v-if="editing" :title="editing.id ? `Edit ${itemNoun}` : `New ${itemNoun}`" @close="editing = null">
      <form class="flex flex-col gap-4" @submit.prevent="handleSave">
        <AdminFieldInput
          v-for="field in fields"
          :key="field.key"
          :field="field"
          v-model="form[field.key]"
        />

        <p v-if="formError" class="text-sm text-admin-danger">{{ formError }}</p>

        <div class="flex justify-end gap-2 pt-2">
          <button type="button" class="admin-btn-secondary" @click="editing = null">Cancel</button>
          <button type="submit" :disabled="saving" class="admin-btn-primary">
            {{ saving ? 'Saving…' : 'Save' }}
          </button>
        </div>
      </form>
    </AdminModal>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { adminApi } from '@/lib/adminApi'
import { useMediaLibrary } from '@/composables/useMediaLibrary'
import { confirmDialog } from '@/composables/useConfirm'
import AdminModal from '@/components/admin/AdminModal.vue'
import AdminFieldInput from '@/components/admin/AdminFieldInput.vue'
import AdminIcon from '@/components/admin/AdminIcon.vue'

const props = defineProps({
  resource: { type: String, required: true },
  title: { type: String, required: true },
  fields: { type: Array, required: true },
  // Which field to show as each row's title. Defaults to name/title/slug.
  labelKey: { type: String, default: null },
  // Singular noun for the create/edit modal title ("New Branch" rather
  // than "New Branches"). Falls back to `title` as-is if not given.
  itemNoun: { type: String, default: null }
})
const itemNoun = computed(() => props.itemNoun || props.title)

const items = ref([])
const loading = ref(true)
const error = ref('')
const editing = ref(null)
const form = ref({})
const formError = ref('')
const saving = ref(false)

const { items: mediaItems } = useMediaLibrary()

const listFields = computed(() => props.fields)

function itemLabel(item) {
  const key = props.labelKey || ['name', 'title', 'slug'].find((k) => item[k])
  return item[key] || `#${item.id}`
}

function thumbnailUrl(item) {
  const imageField = props.fields.find((f) => f.type === 'media-image')
  if (!imageField) return null
  const mediaId = item[imageField.key]
  return mediaItems.value.find((m) => m.id === mediaId)?.blobUrl || null
}

async function load() {
  loading.value = true
  error.value = ''
  try {
    items.value = await adminApi.list(props.resource)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
load()

function emptyForm() {
  const out = {}
  for (const field of listFields.value) {
    if (field.type === 'boolean') out[field.key] = field.default ?? true
    else if (field.type === 'string-list') out[field.key] = ''
    else out[field.key] = field.default ?? null
  }
  return out
}

function openCreate() {
  formError.value = ''
  form.value = emptyForm()
  editing.value = { id: null }
}

function openEdit(item) {
  formError.value = ''
  const out = {}
  for (const field of listFields.value) {
    if (field.type === 'string-list') out[field.key] = (item[field.key] || []).join('\n')
    else out[field.key] = item[field.key]
  }
  form.value = out
  editing.value = item
}

function serializeForm() {
  const out = {}
  for (const field of listFields.value) {
    if (field.type === 'string-list') {
      out[field.key] = form.value[field.key]
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean)
    } else {
      out[field.key] = form.value[field.key]
    }
  }
  return out
}

async function handleSave() {
  formError.value = ''
  saving.value = true
  try {
    const data = serializeForm()
    if (editing.value.id) {
      await adminApi.update(props.resource, editing.value.id, data)
    } else {
      // Every table defaults sortOrder to 0, so without this every new row
      // would tie with existing ones and the up/down buttons would do
      // nothing (swapping two equal sortOrders is a no-op).
      const maxSortOrder = items.value.reduce((max, i) => Math.max(max, i.sortOrder ?? 0), -1)
      await adminApi.create(props.resource, { ...data, sortOrder: maxSortOrder + 1 })
    }
    editing.value = null
    await load()
  } catch (err) {
    formError.value = err.message
  } finally {
    saving.value = false
  }
}

async function handleDelete(item) {
  const ok = await confirmDialog(`Delete "${itemLabel(item)}"? This can't be undone.`)
  if (!ok) return
  try {
    await adminApi.remove(props.resource, item.id)
    await load()
  } catch (err) {
    error.value = err.message
  }
}

async function move(item, index, direction) {
  const other = items.value[index + direction]
  if (!other) return
  try {
    await Promise.all([
      adminApi.update(props.resource, item.id, { sortOrder: other.sortOrder }),
      adminApi.update(props.resource, other.id, { sortOrder: item.sortOrder })
    ])
    await load()
  } catch (err) {
    error.value = err.message
  }
}

watch(() => props.resource, load)
</script>
