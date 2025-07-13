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
    themes: path.resolve(__dirname, 'src/styles/themes'),
    components: path.resolve(__dirname, 'src/components'),
    lib: path.resolve(__dirname, 'src/lib'),
  },

  // Theme configuration
  themes: {
    // Available themes
    variants: [
      'shaj-default',
      'shaj-ocean',
      'shaj-sunset',
      'shaj-forest',
      'shaj-midnight',
      'shaj-pastel',
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
      generateWebp: false, // Not needed for design system
    },
  },

  // Output configuration
  output: {
    // Main builds
    builds: [
      {
        name: 'esm',
        format: 'esm',
        file: 'index.esm.js',
        sourcemap: true,
      },
      {
        name: 'cjs',
        format: 'cjs',
        file: 'index.js',
        sourcemap: true,
      },
      {
        name: 'min',
        format: 'esm',
        file: 'index.min.js',
        sourcemap: true,
        minify: true,
      },
    ],

    // CSS builds
    css: [
      {
        name: 'main',
        file: 'index.css',
        minify: false,
        includeThemes: true,
      },
      {
        name: 'min',
        file: 'index.min.css',
        minify: true,
        includeThemes: true,
      },
    ],

    // TypeScript declarations
    types: {
      file: 'index.d.ts',
      includeInternal: false,
      generateDocs: true,
    },
  },

  // Development configuration
  development: {
    // Hot reload settings
    hotReload: {
      enabled: true,
      themes: true,
      components: true,
    },

    // Development server
    server: {
      port: 6006,
      host: 'localhost',
      open: false,
    },

    // Source maps
    sourceMaps: {
      enabled: true,
      detailed: true,
    },
  },

  // Performance budgets
  performance: {
    // Size limits
    limits: {
      jsBundle: 500 * 1024, // 500KB
      cssBundle: 200 * 1024, // 200KB
      totalAssets: 1024 * 1024, // 1MB
    },

    // Performance metrics
    metrics: {
      firstContentfulPaint: 1500, // ms
      largestContentfulPaint: 2500, // ms
      cumulativeLayoutShift: 0.1,
    },

    // Monitoring
    monitoring: {
      enabled: true,
      generateReport: true,
      failOnBudgetExceeded: false,
    },
  },

  // Quality assurance
  quality: {
    // Linting
    linting: {
      typescript: true,
      eslint: true,
      stylelint: true,
    },

    // Testing
    testing: {
      unit: true,
      integration: true,
      visual: false, // Handled by Storybook
      accessibility: true,
    },

    // Validation
    validation: {
      themes: true,
      accessibility: true,
      performance: true,
      exports: true,
    },
  },

  // Plugin configuration
  plugins: {
    // Rollup plugins
    rollup: {
      resolve: {
        browser: true,
        preferBuiltins: false,
      },
      commonjs: {
        include: ['node_modules/**'],
      },
      typescript: {
        tsconfig: './tsconfig.build.json',
        declaration: false,
        declarationMap: false,
      },
      babel: {
        babelHelpers: 'runtime',
        exclude: 'node_modules/**',
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      postcss: {
        extract: true,
        minimize: true,
        use: {
          sass: {
            api: 'modern',
            silenceDeprecations: ['legacy-js-api'],
          },
        },
        extensions: ['.css', '.scss', '.sass'],
      },
    },

    // PostCSS plugins (will be dynamically imported in build process)
    postcss: [
      'autoprefixer',
      [
        'cssnano',
        {
          preset: [
            'default',
            {
              normalizeWhitespace: false,
              discardComments: { removeAll: true },
              reduceIdents: false,
              mergeIdents: false,
              discardUnused: false,
            },
          ],
        },
      ],
    ],
  },

  // Environment-specific overrides
  environments: {
    development: {
      optimization: {
        code: {
          minify: false,
          removeDeadCode: false,
        },
      },
      output: {
        css: [
          {
            name: 'dev',
            file: 'index.css',
            minify: false,
            includeThemes: true,
          },
        ],
      },
    },

    production: {
      optimization: {
        code: {
          minify: true,
          removeDeadCode: true,
        },
      },
      performance: {
        monitoring: {
          failOnBudgetExceeded: true,
        },
      },
    },

    test: {
      optimization: {
        code: {
          minify: false,
          sourceMaps: true,
        },
      },
      quality: {
        validation: {
          themes: true,
          accessibility: true,
        },
      },
    },
  },
};

// Utility functions
const utils = {
  /**
   * Get configuration for specific environment
   */
  getConfig(env = 'production') {
    const base = { ...buildConfig };
    const envConfig = buildConfig.environments[env] || {};

    // Deep merge environment-specific config
    return this.deepMerge(base, envConfig);
  },

  /**
   * Deep merge two objects
   */
  deepMerge(target, source) {
    const result = { ...target };

    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = this.deepMerge(result[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    }

    return result;
  },

  /**
   * Validate configuration
   */
  validateConfig(config) {
    const errors = [];

    // Check required directories
    if (!config.dirs?.src || !config.dirs?.dist) {
      errors.push('Missing required directories configuration');
    }

    // Check theme configuration
    if (!config.themes?.variants || config.themes.variants.length === 0) {
      errors.push('No theme variants configured');
    }

    // Check output configuration
    if (!config.output?.builds || config.output.builds.length === 0) {
      errors.push('No build outputs configured');
    }

    if (errors.length > 0) {
      throw new Error(`Configuration validation failed:\n${errors.join('\n')}`);
    }

    return true;
  },

  /**
   * Get theme-specific configuration
   */
  getThemeConfig(themeName) {
    const config = this.getConfig();

    return {
      name: themeName,
      file: `${themeName}.scss`,
      path: path.join(config.dirs.themes, `${themeName}.scss`),
      cssFile: `${themeName}.css`,
      optimization: config.themes.optimization,
      accessibility: config.themes.accessibility,
    };
  },
};

export { buildConfig, utils };

// Export specific configurations
export const getConfig = utils.getConfig.bind(utils);
export const validateConfig = utils.validateConfig.bind(utils);
export const getThemeConfig = utils.getThemeConfig.bind(utils);
