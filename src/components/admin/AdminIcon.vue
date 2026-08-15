<template>
  <svg
    :class="cls"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.75"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path v-for="(d, i) in paths[name] || paths.dashboard" :key="i" :d="d" />
  </svg>
</template>

<script setup>
defineProps({
  name: { type: String, required: true },
  cls: { type: String, default: 'w-5 h-5' }
})

// Compact Heroicons-style (outline, 24x24, MIT-licensed) path set — kept
// inline rather than adding an icon library dependency for a handful of
// glyphs.
const paths = {
  dashboard: ['M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10M9 21h6'],
  'map-pin': ['M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z', 'M15 11a3 3 0 11-6 0 3 3 0 016 0z'],
  bolt: ['M13 10V3L4 14h7v7l9-11h-7z'],
  users: ['M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'],
  image: ['M4 5a2 2 0 012-2h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5z', 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16', 'M14 14l1.586-1.586a2 2 0 012.828 0L20 14'],
  badge: ['M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'],
  refresh: ['M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'],
  document: ['M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'],
  photo: ['M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z', 'M12 17a4 4 0 100-8 4 4 0 000 8z'],
  logout: ['M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'],
  menu: ['M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5'],
  close: ['M6 18L18 6M6 6l12 12'],
  plus: ['M12 4.5v15m7.5-7.5h-15'],
  pencil: ['M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'],
  trash: ['M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9.5 4h5a1 1 0 011 1v2H8.5V5a1 1 0 011-1z'],
  'chevron-up': ['M4.5 15.75l7.5-7.5 7.5 7.5'],
  'chevron-down': ['M19.5 8.25l-7.5 7.5-7.5-7.5'],
  spinner: ['M12 4V2m0 20v-2m8-8h2M2 12h2m14.36-6.36l1.42-1.42M4.22 19.78l1.42-1.42m0-12.72L4.22 4.22m14.14 14.14l1.42 1.42']
}
</script>
