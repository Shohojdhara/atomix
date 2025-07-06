import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';
import { readFileSync } from 'fs';

// Read package.json to get external dependencies
const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
  'react/jsx-runtime',
  'react/jsx-dev-runtime'
];

const commonPlugins = [
  peerDepsExternal(),
  resolve({
    browser: true,
    preferBuiltins: false,
  }),
  commonjs(),
  postcss({
    extract: true,
    minimize: true,
    use: ['sass'],
    extensions: ['.css', '.scss', '.sass'],
  }),
];

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
          ['@babel/plugin-transform-runtime', {
            corejs: 3,
            helpers: true,
            regenerator: true,
            useESModules: true,
          }],
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
          ['@babel/preset-env', { 
            modules: false // Keep ES modules for Rollup, it will handle the CJS conversion
          }],
          '@babel/preset-react',
          '@babel/preset-typescript',
        ],
        plugins: [
          ['@babel/plugin-transform-runtime', {
            corejs: 3,
            helpers: true,
            regenerator: true,
            useESModules: false,
          }],
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
          ['@babel/plugin-transform-runtime', {
            corejs: 3,
            helpers: true,
            regenerator: true,
            useESModules: true,
          }],
        ],
      }),
      terser({
        compress: {
          drop_console: true,
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