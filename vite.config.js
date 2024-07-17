import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
 resolve: {
  alias: {
   '@float-Input': path.resolve(
    __dirname,
    'src/components/floatingLabelFields/FLFieldsExports',
   ),
  },
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
