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
            hmr: {
                overlay: false, // Disable the HMR error overlay
            },
        },
        resolve: {
            alias: {
                '@float-Input': path.resolve(__dirname, 'src/components/floatingLabelFields/FLFieldsExports'),
            },
        },
        build: {
            minify: 'esbuild',
            sourcemap: false, // true
            // chunkSizeWarningLimit: 1000, // Size in KB
            target: 'esnext', // Generate code for modern browsers
            emptyOutDir: true, // Clean output directory before build
            cssCodeSplit: true, // Split CSS into chunks

            // rollupOptions: {
            //     // external: ['apexcharts'],
            //     output: {
            //         chunkFileNames: 'chunks/[name]-[hash].js',
            //         manualChunks: id => {
            //             if (id.includes('node_modules')) {
            //                 return 'vendor';
            //             }
            //         },
            //     },
            // },

            rollupOptions: {
                output: {
                    manualChunks: {
                        'react-vendor': ['react', 'react-dom'],
                        'antd-vendor': ['antd'],
                        // Add more as needed
                    },
                },
            },

            cacheDir: 'node_modules/.vite_cache',
        },
        optimizeDeps: {
            esbuildOptions: {
                plugins: [fixReactVirtualized],
            },
            // include: ['react', 'react-dom'],
            include: ['react', 'react-dom', 'antd'],
        },
    };
});

// if vite throw this error

// 10:50:56 am [vite] error while updating dependencies:
// Error: EPERM: operation not permitted, rename 'D:\AIC\node_modules\.vite\deps_temp_8b17f62f' -> 'D:\AIC\node_modules\.vite\deps'

// Then run "npm update vite"
