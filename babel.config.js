export default {
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
        modules: false,
        debug: process.env.NODE_ENV === 'development',
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
  env: {
    production: {
      compact: true,
      comments: false,
      minified: true,
    },
    cjs: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: { node: '18' },
            modules: false,
            useBuiltIns: 'usage',
            corejs: 3,
          },
        ],
        [
          '@babel/preset-react',
          {
            runtime: 'automatic',
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
    },
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: { node: 'current' },
            modules: 'commonjs',
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
            useESModules: false,
          },
        ],
      ],
    },
  },
  ignore: ['**/*.d.ts', '**/*.test.ts', '**/*.test.tsx', 'node_modules'],
};
