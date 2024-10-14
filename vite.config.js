/* eslint-disable no-undef */
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';
import fixReactVirtualized from 'esbuild-plugin-react-virtualized';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
 const env = loadEnv(mode, process.cwd(), 'WENXT_');
 const __urlport = env.WENXT_PORT;

 return {
  plugins: [react()],
  envPrefix: 'WENXT_',
  worker: {
   enabled: true,
  },
  server: {
   port: __urlport,
   strictPort: true,
  },
  resolve: {
   alias: {
    '@float-Input': path.resolve(__dirname, 'src/components/floatingLabelFields/FLFieldsExports'),
   },
  },
  build: {
   minify: 'esbuild',
   sourcemap: true,
   rollupOptions: {
    // external: ['apexcharts'],
    output: {
     chunkFileNames: 'chunks/[name]-[hash].js',
     manualChunks: id => {
      if (id.includes('node_modules')) {
       return 'vendor';
      }
     },
    },
   },
   cacheDir: 'node_modules/.vite_cache',
  },
  optimizeDeps: {
   esbuildOptions: {
    plugins: [fixReactVirtualized],
   },
   include: ['react', 'react-dom'],
   //    include: ['react', 'react-dom', 'antd'],
  },
 };
});
