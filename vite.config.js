import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    port:8000,
    strictPort: true,
  },
  server: {
    host: true,
    port:8000,
    strictPort: true
  }
})
