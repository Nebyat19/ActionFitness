<template>
  <div>
    <label class="block text-sm font-medium text-admin-ink mb-1.5">
      {{ field.label }}<span v-if="field.required" class="text-admin-danger"> *</span>
    </label>

    <textarea
      v-if="field.type === 'textarea' || field.type === 'string-list'"
      :value="modelValue"
      :required="field.required"
      :placeholder="field.type === 'string-list' ? 'One per line' : field.placeholder"
      rows="4"
      class="admin-input resize-y"
      @input="$emit('update:modelValue', $event.target.value)"
    />

    <input
      v-else-if="field.type === 'number'"
      :value="modelValue"
      type="number"
      :required="field.required"
      class="admin-input"
      @input="$emit('update:modelValue', $event.target.valueAsNumber)"
    />

    <label v-else-if="field.type === 'boolean'" class="flex items-center gap-2.5 py-1">
      <input
        :checked="modelValue"
        type="checkbox"
        class="w-4 h-4 rounded border-admin-line text-admin-accent focus:ring-admin-accent focus:ring-offset-0"
        @change="$emit('update:modelValue', $event.target.checked)"
      />
      <span class="text-sm text-admin-muted">{{ field.checkboxLabel || 'Enabled' }}</span>
    </label>

    <MediaPicker
      v-else-if="field.type === 'media-image'"
      :model-value="modelValue"
      kind="image"
      @update:model-value="$emit('update:modelValue', $event)"
    />
    <MediaPicker
      v-else-if="field.type === 'media-video'"
      :model-value="modelValue"
      kind="video"
      @update:model-value="$emit('update:modelValue', $event)"
    />

    <input
      v-else
      :value="modelValue"
      type="text"
      :required="field.required"
      :placeholder="field.placeholder"
      class="admin-input"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup>
import MediaPicker from '@/components/admin/MediaPicker.vue'

defineProps({
  field: { type: Object, required: true },
  modelValue: { default: null }
})
defineEmits(['update:modelValue'])
</script>
