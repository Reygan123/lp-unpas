import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import viteCompression from 'vite-plugin-compression'

export default defineConfig(({ mode }) => ({
  plugins: [
    vue(),
    mode === 'development' ? vueDevTools() : null,

    {
      name: 'primeicons-font-display-swap',
      transform(code: string, id: string) {
        if (id.includes('primeicons.css')) {
          return code.replace('font-display: block;', 'font-display: swap;')
        }
      }
    },
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024,
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    cssCodeSplit: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2,
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('primeicons') || id.includes('primevue')) {
              return 'vendor-primevue'
            }
            if (id.includes('vue') || id.includes('vue-router') || id.includes('pinia')) {
              return 'vendor-vue'
            }
            if (id.includes('swiper')) {
              return 'vendor-swiper'
            }
            if (id.includes('sweetalert2')) {
              return 'vendor-sweetalert'
            }
            if (id.includes('vue3-toastify')) {
              return 'vendor-toastify'
            }
            if (id.includes('dompurify')) {
              return 'vendor-dompurify'
            }
            if (id.includes('axios')) {
              return 'vendor-axios'
            }
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
}))