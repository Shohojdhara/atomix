import terser from '@rollup/plugin-terser';
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';
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

/**
 * JavaScript/TypeScript build configurations
 */

/**
 * ES Modules build configuration
 */
export const esmBuild = {
  input: INPUT_FILES.main,
  output: {
    file: OUTPUT_FILES.esm,
    format: 'esm',
    sourcemap: true,
    inlineDynamicImports: true,
    generatedCode: 'es2015',
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
    file: 'dist/.atomix.css.tmp.js',
    format: 'es',
  },
  plugins: [
    postcss(createStylesPostcssConfig(OUTPUT_FILES.styles, false)),
    cleanup('dist/.atomix.css.tmp.js'),
  ],
};

/**
 * Main styles build (minified)
 */
export const stylesMinifiedBuild = {
  input: INPUT_FILES.styles,
  output: {
    file: 'dist/.atomix.min.css.tmp.js',
    format: 'es',
  },
  plugins: [
    postcss(createStylesPostcssConfig(OUTPUT_FILES.stylesMin, true)),
    cleanup('dist/.atomix.min.css.tmp.js'),
  ],
};

/**
 * All JavaScript/TypeScript builds
 */
export const jsBuilds = [esmBuild, cjsBuild, minifiedBuild, typesBuild];

/**
 * All styles builds
 */
export const stylesBuilds = [stylesBuild, stylesMinifiedBuild];

/**
 * All builds combined
 */
export const allBuilds = [...jsBuilds, ...stylesBuilds];

