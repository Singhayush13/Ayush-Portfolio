import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    historyApiFallback: true, // ✅ Fix for local dev routing
  },
  preview: {
    historyApiFallback: true, // ✅ Fix for preview build (vite preview)
  },
  build: {
    outDir: 'dist',
  },
})
