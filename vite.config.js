import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// base: './' keeps asset paths relative so the built app works from any
// sub-path or when opened as a static bundle.
export default defineConfig({
  base: './',
  plugins: [vue()]
})
