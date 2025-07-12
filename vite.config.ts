import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@shohojdhara/atomix': path.resolve(__dirname, './src/index.ts'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
}); 