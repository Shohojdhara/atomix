import terser from '@rollup/plugin-terser';
import { dts } from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';
import { visualizer } from 'rollup-plugin-visualizer';
import { INPUT_FILES, OUTPUT_FILES } from './constants.js';
import {
  getExternal,
  commonPlugins,
  createTypeScriptPlugin,
  createBabelPlugin,
} from './plugins.js';
import {
  jsPostcssConfig,
  createStylesPostcssConfig,
} from './postcss.js';
import { terserConfigNonMinified, terserConfigMinified } from './terser.js';
import { cleanup } from '../plugins/cleanup.js';
// Theme builds removed - import kept for compatibility
import generateThemeBuilds from './themes.js';

/**
 * JavaScript/TypeScript build configurations
 */

/**
 * ES Modules build configuration
 * Note: Using single-file output for backward compatibility
 * For code-split builds, use esmBuildChunked
 */
export const esmBuild = {
  input: INPUT_FILES.main,
  output: {
    file: OUTPUT_FILES.esm,
    format: 'esm',
    sourcemap: true,
    inlineDynamicImports: true, // Kept for single-file output compatibility
    generatedCode: 'es2015',
  },
  external: getExternal(),
  plugins: [
    ...commonPlugins,
    postcss(jsPostcssConfig),
    createTypeScriptPlugin(),
    createBabelPlugin(),
    terser(terserConfigNonMinified),
    // Bundle analyzer - only when ANALYZE env var is set
    ...(process.env.ANALYZE
      ? [
          visualizer({
            filename: 'dist/stats.html',
            open: true,
            gzipSize: true,
            brotliSize: true,
          }),
        ]
      : []),
  ],
};

/**
 * CommonJS build configuration
 */
export const cjsBuild = {
  input: INPUT_FILES.main,
  output: {
    file: OUTPUT_FILES.cjs,
    format: 'cjs',
    sourcemap: true,
    exports: 'named',
    inlineDynamicImports: true,
    interop: 'compat',
  },
  external: getExternal(),
  plugins: [
    ...commonPlugins,
    postcss(jsPostcssConfig),
    createTypeScriptPlugin(),
    createBabelPlugin('cjs'),
    terser(terserConfigNonMinified),
  ],
};

/**
 * Minified ES build for production
 */
export const minifiedBuild = {
  input: INPUT_FILES.main,
  output: {
    file: OUTPUT_FILES.minified,
    format: 'esm',
    sourcemap: true,
    inlineDynamicImports: true,
  },
  external: getExternal(),
  plugins: [
    ...commonPlugins,
    postcss(jsPostcssConfig),
    createTypeScriptPlugin(),
    createBabelPlugin('production'),
    terser(terserConfigMinified),
  ],
};

/**
 * TypeScript declarations build
 */
export const typesBuild = {
  input: INPUT_FILES.types,
  output: {
    file: OUTPUT_FILES.types,
    format: 'esm',
  },
  external: getExternal(),
  plugins: [
    dts({
      tsconfig: './tsconfig.dts.json',
    }),
  ],
};

/**
 * Styles build configurations
 */

/**
 * Main styles build (non-minified)
 */
export const stylesBuild = {
  input: INPUT_FILES.styles,
  output: {
    file: '.atomix.css.tmp.js',
    format: 'es',
  },
  plugins: [
    postcss(createStylesPostcssConfig(OUTPUT_FILES.styles, false)),
    cleanup('.atomix.css.tmp.js'),
  ],
};

/**
 * Main styles build (minified)
 */
export const stylesMinifiedBuild = {
  input: INPUT_FILES.styles,
  output: {
    file: '.atomix.min.css.tmp.js',
    format: 'es',
  },
  plugins: [
    postcss(createStylesPostcssConfig(OUTPUT_FILES.stylesMin, true)),
    cleanup('.atomix.min.css.tmp.js'),
  ],
};

/**
 * All JavaScript/TypeScript builds (single-file)
 * For code-split builds, use jsBuildsWithChunks
 */
export const jsBuilds = [esmBuild, cjsBuild, minifiedBuild, typesBuild];

/**
 * All styles builds
 */
export const stylesBuilds = [stylesBuild, stylesMinifiedBuild];

/**
 * Helper function to create entry point builds
 * Creates ESM entry points for code-split chunks
 */
const createEntryBuild = (name, input) => [
  // JavaScript build
  {
    input,
    output: {
      file: `dist/${name}.js`,
      format: 'esm',
      sourcemap: true,
      inlineDynamicImports: true, // Required for single-file output
      generatedCode: 'es2015',
    },
    external: getExternal(),
    plugins: [
      ...commonPlugins,
      createTypeScriptPlugin(),
      createBabelPlugin(),
      terser(terserConfigNonMinified),
    ],
  },
  // Types build
  {
    input,
    output: {
      file: `dist/${name}.d.ts`,
      format: 'esm',
    },
    external: getExternal(),
    plugins: [
      ...commonPlugins,
      dts({
        respectExternal: true,
        compilerOptions: {
          preserveSymlinks: false,
        },
      }),
    ],
  },
];

/**
 * Entry point builds for code-split chunks
 * These provide stable import paths for users
 */
export const entryBuilds = [
  ...createEntryBuild('theme', INPUT_FILES.theme),
  ...createEntryBuild('charts', INPUT_FILES.charts),
  ...createEntryBuild('forms', INPUT_FILES.forms),
  ...createEntryBuild('layout', INPUT_FILES.layout),
  ...createEntryBuild('heavy', INPUT_FILES.heavy),
  ...createEntryBuild('core', INPUT_FILES.core),
];

/**
 * JavaScript-only entry point builds (for parallel builds)
 * Excludes type definitions
 */
export const entryJsBuilds = [
  ...createEntryBuild('theme', INPUT_FILES.theme),
  ...createEntryBuild('charts', INPUT_FILES.charts),
  ...createEntryBuild('forms', INPUT_FILES.forms),
  ...createEntryBuild('layout', INPUT_FILES.layout),
  ...createEntryBuild('heavy', INPUT_FILES.heavy),
  ...createEntryBuild('core', INPUT_FILES.core),
].filter(build => build.output.file.endsWith('.js'));

/**
 * Type definition entry point builds (for parallel builds)
 * Excludes JavaScript builds
 */
export const entryTypesBuilds = [
  ...createEntryBuild('theme', INPUT_FILES.theme),
  ...createEntryBuild('charts', INPUT_FILES.charts),
  ...createEntryBuild('forms', INPUT_FILES.forms),
  ...createEntryBuild('layout', INPUT_FILES.layout),
  ...createEntryBuild('heavy', INPUT_FILES.heavy),
  ...createEntryBuild('core', INPUT_FILES.core),
].filter(build => build.output.file.endsWith('.d.ts'));

/**
 * Code-split ES Modules build with manual chunks
 * Uses directory output for proper code splitting
 */
export const esmBuildChunked = {
  input: INPUT_FILES.main,
  output: {
    dir: 'dist',
    format: 'esm',
    sourcemap: true,
    entryFileNames: 'chunks/[name].js',
    chunkFileNames: 'chunks/[name]-[hash].js',
    generatedCode: 'es2015',
    manualChunks: (id) => {
      // Vendor chunk for React and React DOM
      if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
        return 'vendor-react';
      }
      
      // Theme system chunk (large optional feature)
      if (id.includes('/lib/theme/')) {
        return 'theme';
      }
      
      // Charts chunk
      if (id.includes('/components/Chart/') || id.includes('/entries/charts')) {
        return 'charts';
      }
      
      // Forms chunk
      if (id.includes('/components/Form/') || id.includes('/entries/forms')) {
        return 'forms';
      }
      
      // Layout chunk
      if (id.includes('/layouts/') || id.includes('/entries/layout')) {
        return 'layout';
      }
      
      // Heavy components chunk
      if (
        id.includes('/components/AtomixGlass') ||
        id.includes('/components/VideoPlayer') ||
        id.includes('/components/PhotoViewer') ||
        id.includes('/components/Slider') ||
        id.includes('/entries/heavy')
      ) {
        return 'heavy';
      }
      
      // Utils chunk
      if (id.includes('/lib/utils/')) {
        return 'utils';
      }
      
      // Default chunk for everything else
      return 'main';
    },
  },
  external: getExternal(),
  plugins: [
    ...commonPlugins,
    postcss(jsPostcssConfig),
    createTypeScriptPlugin(),
    createBabelPlugin(),
    terser(terserConfigNonMinified),
  ],
};

/**
 * All JavaScript/TypeScript builds (including chunked)
 * Note: esmBuildChunked is kept for optional use but not included in default builds
 * to avoid duplicate chunks with entryBuilds
 */
export const jsBuildsWithChunks = [...jsBuilds, esmBuildChunked];

/**
 * All builds combined (default - single-file builds)
 * Use allBuildsWithChunks for code-split builds following performance audit recommendations
 */
export const allBuilds = [...jsBuilds, ...stylesBuilds];

/**
 * Theme builds
 * Themes have been removed - returns empty array
 */
export const themeBuilds = generateThemeBuilds();

/**
 * All builds with hybrid strategy (recommended for production)
 * 
 * Hybrid Build Strategy:
 * - Single-file ESM/CJS/minified builds for main entry point (index.js, index.esm.js, index.min.js)
 * - Separate entry point builds for code organization (theme.js, charts.js, forms.js, etc.)
 * - Theme builds removed
 * - No automatic chunking to avoid duplicate chunks
 * 
 * This approach:
 * - Maintains stable import paths via entry points
 * - Avoids duplicate chunks that were created by esmBuildChunked
 * - Reduces bundle size while keeping build output clean
 * - Follows performance audit recommendations for bundle size optimization
 * - Enables individual theme CSS imports
 * 
 * Note: esmBuildChunked is available but not included by default to prevent duplicates.
 * If you need automatic code splitting, use it separately.
 */
export const allBuildsWithChunks = [...jsBuilds, ...stylesBuilds, ...entryBuilds, ...themeBuilds];

