import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import * as sass from 'sass-embedded';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
        includePaths: [
          'node_modules',
          path.resolve(__dirname, './src/styles')
        ]
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    }
  }
});
