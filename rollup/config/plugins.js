import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { external } from './constants.js';

/**
 * Common plugins used across multiple builds
 */
export const commonPlugins = [
  peerDepsExternal(),
  resolve({
    browser: true,
    preferBuiltins: false,
  }),
  commonjs(),
];

/**
 * Creates TypeScript plugin configuration
 * @param {object} options - TypeScript plugin options
 * @returns {object} TypeScript plugin instance
 */
export const createTypeScriptPlugin = (options = {}) =>
  typescript({
    tsconfig: './tsconfig.build.json',
    declaration: false,
    declarationMap: false,
    ...options,
  });

/**
 * Creates Babel plugin configuration
 * @param {string} envName - Babel environment name (e.g., 'cjs', 'production')
 * @returns {object} Babel plugin instance
 */
export const createBabelPlugin = (envName) =>
  babel({
    babelHelpers: 'runtime',
    exclude: 'node_modules/**',
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    configFile: './babel.config.js',
    ...(envName && { envName }),
  });

/**
 * Gets external dependencies for a build
 * @param {string[]} additionalExternals - Additional external dependencies
 * @returns {string[]} Array of external dependency names
 */
export const getExternal = (additionalExternals = []) => [
  ...external,
  ...additionalExternals,
];

