import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  base: './', // relative paths
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
      },
    },
  },
})