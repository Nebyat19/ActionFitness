import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),

    }
  },
  server: {
    // Proxies to scripts/dev-api-server.mjs (run via `npm run dev:api`) so
    // the SPA can call /api/* during local dev without needing `vercel dev`
    // (which requires an interactive `vercel login`). Production doesn't go
    // through this — Vercel runs api/**/*.js natively on deploy.
    proxy: {
      // changeOrigin: false keeps the Host header as the browser sent it
      // (localhost:5173) instead of rewriting it to the proxy target
      // (localhost:3001) — needed so requireSameOrigin's Origin-vs-Host
      // check (api/_lib/auth.js) agrees in dev the same way it naturally
      // does in production, where Vercel serves the API from the same
      // origin as the site instead of proxying to a different local port.
      '/api': { target: 'http://localhost:3001', changeOrigin: false }
    }
  }
})
