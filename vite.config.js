import { resolve } from 'path'
import { defineConfig } from 'vite'

// Custom local plugin to handle clean URLs on localhost
const cleanUrlsPlugin = () => ({
  name: 'clean-urls',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      // If the request doesn't have an extension, try matching it to an HTML file
      if (req.url && !req.url.includes('.') && req.url !== '/') {
        req.url += '.html';
      }
      next();
    });
  }
});

export default defineConfig({
  base: './', // relative paths
  plugins: [cleanUrlsPlugin()], // Enables localhost clean URLs
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        about: resolve(import.meta.dirname, 'about.html'),
        funwattle: resolve(import.meta.dirname, 'funwattle.html'),
        thdr: resolve(import.meta.dirname, 'thdr.html'),
        misc: resolve(import.meta.dirname, 'misc.html'),
        projects: resolve(import.meta.dirname, 'projects.html'),
        cookieCrufts: resolve(import.meta.dirname, 'cookie-crufts.html'),
        rubberDucky: resolve(import.meta.dirname, 'rubber-ducky.html'),
        billionaireBBQProject: resolve(import.meta.dirname, 'billionaire-bbq-project.html'),
        billionaireBBQ: resolve(import.meta.dirname, 'billionaireBBQ.html'),
        freelance: resolve(import.meta.dirname, 'freelance.html'), 
        yunay: resolve(import.meta.dirname, 'yunay.html'), 
      },
    },
  },
})
