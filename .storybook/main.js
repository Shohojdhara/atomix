const path = require('path');

module.exports = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    '@storybook/addon-links', 
    '@storybook/addon-docs',
    {
      name: '@storybook/addon-styling-webpack',
      options: {
        rules: [
          // Handle SCSS files
          {
            test: /\.scss$/,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 2,
                  modules: {
                    auto: true,
                    localIdentName: '[name]__[local]--[hash:base64:5]',
                  },
                  sourceMap: true,
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    config: path.resolve(__dirname, '../postcss.config.js'),
                  },
                  sourceMap: true,
                },
              },
              {
                loader: 'resolve-url-loader',
                options: {
                  sourceMap: true,
                },
              },
              {
                loader: 'sass-loader',
                options: {
                  implementation: require('sass'),
                  api: 'modern', // Align with Rollup PostCSS config
                  sassOptions: {
                    includePaths: [path.resolve(__dirname, '../src/styles')],
                    silenceDeprecations: ['legacy-js-api'], // Align with Rollup
                  },
                  sourceMap: true,
                },
              },
            ],
          },
          // Handle CSS files
          {
            test: /\.css$/,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                  modules: {
                    auto: true,
                    localIdentName: '[name]__[local]--[hash:base64:5]',
                  },
                  sourceMap: true,
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    config: path.resolve(__dirname, '../postcss.config.js'),
                  },
                  sourceMap: true,
                },
              },
            ],
          },
        ],
      },
    },
    "@storybook/addon-webpack5-compiler-swc",
  ],

  framework: {
    name: '@storybook/react-webpack5',
    options: {
      builder: {
        useSWC: true,
      },
    },
  },

  // Serve the entire source directory as static files
  staticDirs: ['../src'],

  webpackFinal: async config => {
    if (!config.resolve) config.resolve = {};
    if (!config.resolve.alias) config.resolve.alias = {};

    // Add path aliases
    config.resolve.alias['@'] = path.resolve(__dirname, '../src');

    // Make sure we have a module and rules
    if (!config.module) config.module = { rules: [] };
    if (!config.module.rules) config.module.rules = [];

    // Exclude .d.ts files from all loaders (react-docgen, swc, babel, etc.)
    config.module.rules.forEach(rule => {
      // Skip rules that don't have a test property
      if (!rule.test) return;
      
      // Add exclusions for .d.ts files to rules that might process TypeScript files
      if (rule.test.toString().includes('ts') || rule.test.toString().includes('js')) {
        if (!rule.exclude) rule.exclude = [];
        if (Array.isArray(rule.exclude)) {
          if (!rule.exclude.some(ex => ex.toString().includes('\.d\.ts'))) {
            rule.exclude.push(/\.d\.ts$/);
          }
        } else {
          rule.exclude = [rule.exclude, /\.d\.ts$/];
        }
      }
    });

    // Set target and output configuration to fix chunk format error
    config.target = 'web';
    if (!config.output) config.output = {};
    config.output.chunkFormat = 'array-push';

    // Handle TypeScript and JavaScript files - align with Rollup Babel config
    config.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: [
          [
            '@babel/preset-env',
            {
              targets: 'last 2 versions, not dead, not IE 11, > 1%', // Align with babel.config.js
              modules: false,
            },
          ],
          '@babel/preset-typescript',
          ['@babel/preset-react', { runtime: 'automatic' }],
        ],
        plugins: [
          [
            '@babel/plugin-transform-runtime',
            {
              corejs: 3,
              helpers: true,
              regenerator: true,
              useESModules: true, // Align with Rollup config
            },
          ],
        ],
      },
    });

    // Handle image files
    config.module.rules.push({
      test: /\.(png|svg|jpg|jpeg|gif)$/i,
      type: 'asset/resource',
    });

    // Handle font files
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'fonts/[hash][ext][query]',
      },
    });

    // Ensure TypeScript file extensions are handled
    if (!config.resolve.extensions) {
      config.resolve.extensions = ['.js', '.jsx'];
    }
    config.resolve.extensions.push('.ts', '.tsx');

    // Exclude .d.ts, .html, and test files from babel-loader
    const babelRule = config.module.rules.find(rule => rule.loader === 'babel-loader');
    if (babelRule) {
      babelRule.test = /\.(js|jsx|ts|tsx)$/;
      babelRule.exclude = [/node_modules/, /\.d\.ts$/, /\.html$/, /\.test\.tsx$/];
    }

    // Add rule for HTML files
    config.module.rules.push({
      test: /\.html$/,
      use: 'raw-loader',
    });

    return config;
  },

  core: {
    disableWhatsNewNotifications: true
  }
};
