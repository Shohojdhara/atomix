/**
 * Vitest Configuration for CLI Tests
 */

import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./scripts/cli/__tests__/test-setup.js'],
    include: [
      'scripts/cli/__tests__/**/*.test.js',
      'scripts/cli/__tests__/**/*.test.ts'
    ],
    exclude: [
      'node_modules',
      'dist',
      '**/*.d.ts'
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.test.js',
        '**/*.test.ts',
        '**/__tests__/**'
      ],
      include: [
        'scripts/cli/**/*.js',
        'scripts/atomix-cli.js'
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        }
      }
    },
    testTimeout: 10000,
    hookTimeout: 10000,
    threads: false
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@cli': resolve(__dirname, './scripts/cli')
    }
  }
});
