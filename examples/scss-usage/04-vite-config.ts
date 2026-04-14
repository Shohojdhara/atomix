// 04-vite-config.ts
// ─────────────────────────────────────────────────────────────────────────────
// Vite configuration for projects using Atomix SCSS.
// Adds a path alias so you can write:
//   @use '@atomix/scss/...' instead of '@shohojdhara/atomix/src/styles/...'
// ─────────────────────────────────────────────────────────────────────────────
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      // Shorthand alias for Atomix SCSS layers
      '@atomix/scss': path.resolve(__dirname, 'node_modules/@shohojdhara/atomix/src/styles'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Inject token overrides into every SCSS file automatically.
        // Variables declared here override Atomix !default values.
        additionalData: `
          $primary: #6366f1;
          $font-family-base: 'Inter', sans-serif;
        `,
      },
    },
  },
});

// ─── Usage in your SCSS files after this config ───────────────────────────────
//
// @use '@atomix/scss/01-settings/index' as *;
// @use '@atomix/scss/02-tools/index' as *;
// @use '@atomix/scss/06-components/components.button' as *;
