import { readFileSync } from 'fs';

/**
 * Build system constants and configuration
 */

// Read package.json for dynamic values
const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));

// External dependencies (not bundled)
export const external = [
  ...Object.keys(pkg.peerDependencies || {}),
  'react/jsx-runtime',
  'react/jsx-dev-runtime',
  '@babel/runtime',
  '@babel/runtime-corejs3',
  'fs',
  'path',
  // Add Node.js modules that should not be bundled
  'crypto',
  'stream',
  'util',
  'events',
  'buffer',
  // Config loader modules that should not be bundled in browser builds
  '../../config/loader',
  '../config/loader',
  '../config/configLoader',
  '../../config/configLoader',
  '@shohojdhara/atomix/config',
  '@shohojdhara/atomix/config/loader',
  '@shohojdhara/atomix/theme/config',
  '@shohojdhara/atomix/theme/config/configLoader',
];

// Output directories
export const OUTPUT_DIRS = {
  dist: 'dist',
  storybook: 'storybook-static',
};

// Input files
export const INPUT_FILES = {
  main: 'src/index.ts',
  types: 'src/index-dts.ts',
  styles: 'src/styles/index.scss',
  // Entry points for code-split chunks
  theme: 'src/entries/theme.ts',
  charts: 'src/entries/charts.ts',
  forms: 'src/entries/forms.ts',
  layout: 'src/entries/layout.ts',
  heavy: 'src/entries/heavy.ts',
  core: 'src/entries/core.ts',
};

// Output files from package.json
export const OUTPUT_FILES = {
  esm: pkg.module,
  cjs: pkg.main,
  types: pkg.types,
  styles: 'dist/atomix.css',
  stylesMin: 'dist/atomix.min.css',
  minified: 'dist/index.min.js',
};

// Theme directories removed