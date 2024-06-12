import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
 plugins: [react()],
 worker: {
  enabled: true,
  // maxNumberOfWorkers: 4,
 },
 server: {
  port: 3001,
  strictPort: true,
 },
 build: {
  minify: 'esbuild', // Use esbuild for minification
  rollupOptions: {
   output: {
    chunkFileNames: 'chunks/[name]-[hash].js',
    manualChunks: {
     vendor: ['react', 'react-dom'],
    },
   },
  },
  cacheDir: 'node_modules/.vite_cache', // Set a custom cache directory
 },
});
