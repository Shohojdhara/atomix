/**
 * Atomix Build Configuration
 *
 * Centralized configuration for building the Atomix Design System
 * with optimized theme support and performance settings.
 */

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Build configuration
const buildConfig = {
  // Directories
  dirs: {
    src: path.resolve(__dirname, 'src'),
    dist: path.resolve(__dirname, 'dist'),
    themes: path.resolve(__dirname, 'src/themes'),
    components: path.resolve(__dirname, 'src/components'),
    lib: path.resolve(__dirname, 'src/lib'),
  },

  // Theme configuration
  themes: {
    // Available themes
    variants: [
      'shaj-default',
      'boomdevs',
      'esrar',
      'mashroom',
      'yabai',
    ],

    // Theme optimization settings
    optimization: {
      // CSS custom properties optimization
      cssVariables: {
        maxCount: 500,
        preserveUnused: false,
        optimizeOrder: true,
        groupByPrefix: true,
      },

      // CSS output optimization
      css: {
        minify: true,
        autoprefixer: true,
        removeComments: true,
        mergeDuplicates: true,
        optimizeSelectors: true,
      },

      // Runtime performance
      runtime: {
        lazyLoadThemes: true,
        cacheThemes: true,
        preloadDefault: true,
        enableTransitions: true,
      },
    },

    // Accessibility settings
    accessibility: {
      enforceContrast: true,
      minContrastRatio: 4.5,
      minLargeTextRatio: 3.0,
      validateColors: true,
      generateA11yReport: true,
    },
  },

  // Styles configuration
  styles: {
    // Main styles configuration
    main: {
      entry: path.resolve(__dirname, 'src/styles/index.scss'),
      output: {
        css: path.resolve(__dirname, 'dist/atomix.css'),
        minCss: path.resolve(__dirname, 'dist/atomix.min.css'),
      },
      sass: {
        style: 'expanded',
        sourceMap: true,
        loadPaths: [path.resolve(__dirname, 'src')],
      },
      minified: {
        style: 'compressed',
        sourceMap: false,
        loadPaths: [path.resolve(__dirname, 'src')],
      }
    },

    // Optimization settings
    optimization: {
      autoprefixer: true,
      removeComments: true,
      mergeDuplicates: true,
      optimizeSelectors: true,
    },
  },

  // Build optimization
  optimization: {
    // Bundle splitting
    splitting: {
      themes: true,
      components: true,
      utilities: true,
    },

    // Tree shaking
    treeShaking: {
      enabled: true,
      sideEffects: false,
      unusedExports: true,
    },

    // Code optimization
    code: {
      minify: true,
      sourceMaps: true,
      removeDeadCode: true,
      optimizeImports: true,
    },

    // Asset optimization
    assets: {
      compressImages: true,
      optimizeFonts: true,
      inlineSmallAssets: true,
      assetSizeLimit: 8192, // 8KB
    },
  },

  // Output formats
  formats: {
    js: {
      esm: 'dist/index.esm.js',
      cjs: 'dist/index.js',
      min: 'dist/index.min.js',
    },
    css: {
      expanded: 'dist/atomix.css',
      compressed: 'dist/atomix.min.css',
    },
    types: 'dist/index.d.ts',
  },

  // Development settings
  dev: {
    sourceMaps: true,
    watch: true,
    hotReload: true,
  },
};

export default buildConfig;
