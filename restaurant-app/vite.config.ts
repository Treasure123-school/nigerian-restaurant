import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: true,
    proxy: {
      '/sanity-api': {
        target: 'https://zrej33jn.apicdn.sanity.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/sanity-api/, ''),
        secure: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          query: ['@tanstack/react-query'],
          sanity: ['@sanity/client', '@sanity/image-url'],
        },
      },
    },
  },
})
