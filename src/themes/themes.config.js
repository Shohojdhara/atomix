/**
 * Theme Configuration
 *
 * This file is auto-generated from atomix.config.ts
 * DO NOT EDIT MANUALLY - Edit atomix.config.ts instead
 * Run 'npm run sync:config' to regenerate
 * 
 * Generated on: 2025-12-23T05:07:00.046Z
 */

export const themesConfig = {
  // CSS variable prefix (from atomix.config.ts)
  prefix: 'atomix',
  
  // Theme metadata
  metadata: {},

  // Build configuration
  build: {
    output: {
      directory: 'dist/themes',
      formats: {
        expanded: '.css',
        compressed: '.min.css'
      }
    },
    sass: {
      style: 'expanded',
      sourceMap: true,
      loadPaths: [
        'src'
      ]
    }
  },

  // Export configuration for package.json
  exports: {
    './themes/*': './dist/themes/*.css',
    './themes/*.min': './dist/themes/*.min.css',
  },

  // Theme integration settings
  integration: {
    cssVariables: {
      colorMode: '--color-mode'
    },
    classNames: {
      theme: 'data-theme',
      colorMode: 'data-color-mode'
    }
  },

  // Runtime theme loading configuration
  runtime: {
    basePath: '/themes',
    cdnPath: null,
    preload: [],
    lazy: false,
    defaultTheme: null,
    storageKey: 'atomix-theme',
    dataAttribute: 'data-atomix-theme',
    enablePersistence: true,
    useMinified: false
  },

  // Theme dependencies (if a theme requires another theme to be loaded)
  dependencies: {},
};