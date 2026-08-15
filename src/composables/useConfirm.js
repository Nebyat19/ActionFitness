// Shared state for a single global confirm dialog (mounted once in
// AdminLayout.vue) so destructive actions get a styled dialog instead of
// the browser's native confirm() popup, consistent with the rest of the
// dashboard's look.
import { reactive } from 'vue'

const state = reactive({
  open: false,
  title: 'Are you sure?',
  message: '',
  confirmLabel: 'Delete',
  danger: true,
  resolve: null
})

export function useConfirmState() {
  return state
}

export function confirmDialog(message, opts = {}) {
  state.message = message
  state.title = opts.title || 'Are you sure?'
  state.confirmLabel = opts.confirmLabel || 'Delete'
  state.danger = opts.danger ?? true
  state.open = true
  return new Promise((resolve) => {
    state.resolve = resolve
  })
}

export function resolveConfirm(value) {
  state.open = false
  state.resolve?.(value)
  state.resolve = null
}
