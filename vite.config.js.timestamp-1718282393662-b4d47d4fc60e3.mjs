// vite.config.js
import { defineConfig } from "file:///D:/AIC/node_modules/vite/dist/node/index.js";
import react from "file:///D:/AIC/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()],
  worker: {
    enabled: true
    // maxNumberOfWorkers: 4,
  },
  server: {
    port: 3001,
    strictPort: true
  },
  build: {
    minify: "esbuild",
    // Use esbuild for minification
    rollupOptions: {
      output: {
        chunkFileNames: "chunks/[name]-[hash].js",
        manualChunks: {
          vendor: ["react", "react-dom"]
        }
      }
    },
    cacheDir: "node_modules/.vite_cache"
    // Set a custom cache directory
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxBSUNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXEFJQ1xcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovQUlDL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gd29ya2VyOiB7XG4gIGVuYWJsZWQ6IHRydWUsXG4gIC8vIG1heE51bWJlck9mV29ya2VyczogNCxcbiB9LFxuIHNlcnZlcjoge1xuICBwb3J0OiAzMDAxLFxuICBzdHJpY3RQb3J0OiB0cnVlLFxuIH0sXG4gYnVpbGQ6IHtcbiAgbWluaWZ5OiAnZXNidWlsZCcsIC8vIFVzZSBlc2J1aWxkIGZvciBtaW5pZmljYXRpb25cbiAgcm9sbHVwT3B0aW9uczoge1xuICAgb3V0cHV0OiB7XG4gICAgY2h1bmtGaWxlTmFtZXM6ICdjaHVua3MvW25hbWVdLVtoYXNoXS5qcycsXG4gICAgbWFudWFsQ2h1bmtzOiB7XG4gICAgIHZlbmRvcjogWydyZWFjdCcsICdyZWFjdC1kb20nXSxcbiAgICB9LFxuICAgfSxcbiAgfSxcbiAgY2FjaGVEaXI6ICdub2RlX21vZHVsZXMvLnZpdGVfY2FjaGUnLCAvLyBTZXQgYSBjdXN0b20gY2FjaGUgZGlyZWN0b3J5XG4gfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF3TSxTQUFTLG9CQUFvQjtBQUNyTyxPQUFPLFdBQVc7QUFHbEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDM0IsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLEVBQ2pCLFFBQVE7QUFBQSxJQUNQLFNBQVM7QUFBQTtBQUFBLEVBRVY7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQSxFQUNiO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTixRQUFRO0FBQUE7QUFBQSxJQUNSLGVBQWU7QUFBQSxNQUNkLFFBQVE7QUFBQSxRQUNQLGdCQUFnQjtBQUFBLFFBQ2hCLGNBQWM7QUFBQSxVQUNiLFFBQVEsQ0FBQyxTQUFTLFdBQVc7QUFBQSxRQUM5QjtBQUFBLE1BQ0Q7QUFBQSxJQUNEO0FBQUEsSUFDQSxVQUFVO0FBQUE7QUFBQSxFQUNYO0FBQ0QsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
