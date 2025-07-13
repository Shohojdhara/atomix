import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import { readFileSync } from 'fs';
import dts from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

// Read package.json to get external dependencies
const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
  'react/jsx-runtime',
  'react/jsx-dev-runtime',
];

const commonPlugins = [
  peerDepsExternal(),
  resolve({
    browser: true,
    preferBuiltins: false,
  }),
  commonjs(),
];

// PostCSS configuration for main build
const mainPostcssConfig = {
  extract: true,
  minimize: true,
  use: {
    sass: {
      api: 'modern',
      silenceDeprecations: ['legacy-js-api'],
    },
  },
  extensions: ['.css', '.scss', '.sass'],
};

// PostCSS configuration for theme-optimized build
const themePostcssConfig = {
  extract: 'index.themes.css',
  minimize: true,
  use: {
    sass: {
      api: 'modern',
      silenceDeprecations: ['legacy-js-api'],
      // Include theme-specific optimizations
      includePaths: ['src/styles/themes'],
    },
  },
  extensions: ['.css', '.scss', '.sass'],
  // Optimize CSS custom properties for themes
  plugins: [
    autoprefixer,
    cssnano({
      preset: [
        'default',
        {
          // Preserve CSS custom properties for theme switching
          normalizeWhitespace: false,
          discardComments: { removeAll: true },
          reduceIdents: false,
          mergeIdents: false,
          discardUnused: false,
        },
      ],
    }),
  ],
};

export default [
  // ES Modules build
  {
    input: 'src/index.ts',
    output: {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
      inlineDynamicImports: true,
    },
    external,
    plugins: [
      ...commonPlugins,
      postcss(mainPostcssConfig),
      typescript({
        tsconfig: './tsconfig.build.json',
        declaration: false,
        declarationMap: false,
      }),
      babel({
        babelHelpers: 'runtime',
        exclude: 'node_modules/**',
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        presets: [
          ['@babel/preset-env', { modules: false }],
          '@babel/preset-react',
          '@babel/preset-typescript',
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
      }),
    ],
  },
  // CommonJS build
  {
    input: 'src/index.ts',
    output: {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
      inlineDynamicImports: true,
    },
    external,
    plugins: [
      ...commonPlugins,
      postcss(mainPostcssConfig),
      typescript({
        tsconfig: './tsconfig.build.json',
        declaration: false,
        declarationMap: false,
      }),
      babel({
        babelHelpers: 'runtime',
        exclude: 'node_modules/**',
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        presets: [
          [
            '@babel/preset-env',
            {
              modules: false, // Keep ES modules for Rollup, it will handle the CJS conversion
            },
          ],
          '@babel/preset-react',
          '@babel/preset-typescript',
        ],
        plugins: [
          [
            '@babel/plugin-transform-runtime',
            {
              corejs: 3,
              helpers: true,
              regenerator: true,
              useESModules: false,
            },
          ],
        ],
      }),
    ],
  },
  // Minified ES build for production
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.min.js',
      format: 'esm',
      sourcemap: true,
      inlineDynamicImports: true,
    },
    external,
    plugins: [
      ...commonPlugins,
      postcss({
        ...themePostcssConfig,
        extract: 'index.min.css',
      }),
      typescript({
        tsconfig: './tsconfig.build.json',
        declaration: false,
        declarationMap: false,
      }),
      babel({
        babelHelpers: 'runtime',
        exclude: 'node_modules/**',
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        presets: [
          ['@babel/preset-env', { modules: false }],
          '@babel/preset-react',
          '@babel/preset-typescript',
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
      }),
      terser({
        compress: {
          drop_console: true,
          // Preserve theme-related function names for debugging
          keep_fnames: /theme|Theme/,
        },
        mangle: {
          // Preserve theme-related properties
          reserved: ['theme', 'Theme', 'themeManager', 'ThemeManager'],
        },
      }),
    ],
  },
  // TypeScript declarations
  {
    input: 'src/index-dts.ts',
    output: {
      file: pkg.types,
      format: 'esm',
    },
    external,
    plugins: [
      dts({
        tsconfig: './tsconfig.dts.json',
      }),
    ],
  },
];
