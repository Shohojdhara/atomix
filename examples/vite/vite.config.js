/**
 * Sample Vite Configuration for consuming @shohojdhara/atomix
 *
 * This configuration shows how to properly set up Vite to work with Atomix
 * components and handle CSS imports correctly.
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react({
      // Use automatic JSX runtime
      jsxRuntime: 'automatic',
    }),
  ],

  // Resolve configuration
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
    // Prefer ESM modules when available
    mainFields: ['module', 'main'],
  },

  // CSS configuration
  css: {
    modules: {
      // Enable CSS modules for .module.css files
      localsConvention: 'camelCaseOnly',
      generateScopedName: '[name]__[local]--[hash:base64:5]',
    },
    preprocessorOptions: {
      scss: {
        // Additional SCSS options if needed
        additionalData: `@import "@shohojdhara/atomix/scss/modern";`,
      },
    },
    devSourcemap: true,
    // Use modern Sass API
    sass: {
      api: 'modern',
      implementation: 'sass-embedded',
    },
  },

  // Build configuration
  build: {
    // Target modern browsers for better performance
    target: 'es2020',

    // Rollup options for better bundle optimization
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          // Separate Atomix into its own chunk
          atomix: ['@shohojdhara/atomix'],
          // React libraries
          react: ['react', 'react-dom'],
          // Other vendor libraries
          vendor: ['react-router-dom'],
        },
      },
    },

    // Source maps for production debugging
    sourcemap: true,

    // Minification options
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },

  // Development server configuration
  server: {
    port: 3000,
    open: true,
    cors: true,
  },

  // Preview server configuration
  preview: {
    port: 4173,
    open: true,
  },

  // Dependency optimization
  optimizeDeps: {
    include: ['@shohojdhara/atomix', 'react', 'react-dom', 'react-router-dom'],
    // Force pre-bundling of Atomix for faster dev server startup
    force: true,
  },

  // Define global constants
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
  },
});
