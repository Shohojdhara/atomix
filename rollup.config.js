import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
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
  'react',
  'react-dom',
  '@phosphor-icons/react',
  'classnames',
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

export default [
  // ES Modules build
  {
    input: 'src/index.ts',
    output: {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
      inlineDynamicImports: true,
      generatedCode: 'es2015',
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
              modules: false,
              targets: {
                esmodules: true,
              },
            }
          ],
          [
            '@babel/preset-react', 
            {
              runtime: 'automatic',
            }
          ],
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
      interop: 'compat',
    },
    external,
    plugins: [
      ...commonPlugins,
      postcss({
        ...mainPostcssConfig,
        extract: false, // Don't extract CSS in CJS build
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
          [
            '@babel/preset-env',
            {
              modules: false, // Keep false for Rollup to handle module conversion
              targets: {
                node: '16',
              },
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
      terser({
        compress: {
          drop_console: true,
        },
        mangle: {},
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
