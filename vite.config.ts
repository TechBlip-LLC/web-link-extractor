import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/mailpit': {
        target: 'http://localhost:8025',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mailpit/, ''),
      },
    },
  },
});