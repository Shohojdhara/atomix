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
export const createBabelPlugin = (envName) => {
  const baseOptions = {
    babelHelpers: 'runtime',
    exclude: 'node_modules/**',
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  };

  // For CJS builds, use inline config with modules: false
  // Rollup will handle the CommonJS conversion, not Babel
  if (envName === 'cjs') {
    return babel({
      ...baseOptions,
      // Disable config file discovery completely
      babelrc: false,
      configFile: false,
      // Explicitly set presets with modules: false
      // Rollup will convert to CommonJS format, not Babel
      presets: [
        [
          '@babel/preset-env',
          {
            targets: { node: '18' },
            useBuiltIns: 'usage',
            corejs: 3,
            bugfixes: true,
            loose: false,
            modules: false, // CRITICAL: Must be false - Rollup handles CJS conversion
          },
        ],
        [
          '@babel/preset-react',
          {
            runtime: 'automatic',
            development: process.env.NODE_ENV === 'development',
            importSource: 'react',
          },
        ],
        [
          '@babel/preset-typescript',
          {
            isTSX: true,
            allExtensions: true,
            allowDeclareFields: true,
            allowNamespaces: true,
            optimizeConstEnums: true,
          },
        ],
      ],
      plugins: [
        [
          '@babel/plugin-transform-runtime',
          {
            corejs: 3,
            helpers: true,
            regenerator: true,
            useESModules: false, // Use CommonJS for runtime helpers in CJS build
          },
        ],
      ],
    });
  }

  // For ESM builds (no envName, 'production', or undefined)
  // Use inline config to ensure modules: false is explicitly set
  // This bypasses any potential config file issues
  return babel({
    ...baseOptions,
    // Disable config file discovery completely
    babelrc: false,
    configFile: false,
    // Explicitly set presets with modules: false
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            browsers: ['last 2 versions', 'not dead', 'not IE 11', '> 1%'],
            node: '18',
          },
          useBuiltIns: 'usage',
          corejs: 3,
          bugfixes: true,
          loose: false,
          modules: false, // CRITICAL: Must be false for Rollup ESM builds
        },
      ],
      [
        '@babel/preset-react',
        {
          runtime: 'automatic',
          development: process.env.NODE_ENV === 'development',
          importSource: 'react',
        },
      ],
      [
        '@babel/preset-typescript',
        {
          isTSX: true,
          allExtensions: true,
          allowDeclareFields: true,
          allowNamespaces: true,
          optimizeConstEnums: true,
        },
      ],
    ],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          corejs: 3,
          helpers: true,
          regenerator: true,
          useESModules: true,
        },
      ],
    ],
  });
};

/**
 * Gets external dependencies for a build
 * @param {string[]} additionalExternals - Additional external dependencies
 * @returns {string[]} Array of external dependency names
 */
export const getExternal = (additionalExternals = []) => [
  ...external,
  ...additionalExternals,
];

