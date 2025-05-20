import { defineConfig } from 'vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  // CSS is handled by PostCSS CLI separately
  build: {
    outDir: path.resolve(__dirname, '_site/assets/js'), // Output to _site/assets/js
    emptyOutDir: false, // Don't remove CSS files
    manifest: true, // Generate manifest.json
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/assets/js/main.js'), // Entry point
      },
      output: {
        entryFileNames: '[name]-[hash].js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
