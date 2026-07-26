import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  base: './', // relative paths
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        funwattle: resolve(__dirname, 'funwattle.html'),
        thdr: resolve(__dirname, 'thdr.html'),
        misc: resolve(__dirname, 'misc.html'),
        projects: resolve(__dirname, 'projects.html'),
        cookieCrufts: resolve(__dirname, 'cookie-crufts.html'),
        rubberDucky: resolve(__dirname, 'rubber-ducky.html'),
      },
    },
  },
})