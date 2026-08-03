import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  // server: {
  //   port: 5174,        // Memaksa project berjalan di port 5174
  //   strictPort: true,  // Jika port 5174 terpakai, Vite akan memberi peringatan (tidak asal lompat ke 5175)
  //   host: true,        // Membuka akses jaringan lokal
  //   allowedHosts: [
  //     '.devtunnels.ms' // Wildcard agar aman jika dipasang Dev Tunnels
  //   ]
  // }
})