const path = require('path');

/**
 * Sample Webpack Configuration for consuming @shohojdhara/atomix
 * 
 * This is a reference configuration that shows how to properly set up
 * webpack to work with Atomix components and handle CSS imports correctly.
 * 
 * Note: This config is not used by the main build process (which uses Rollup)
 * or by Storybook (which has its own configuration).
 */

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    mode: isProduction ? 'production' : 'development',
    entry: './src/index.ts',
    
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? '[name].[contenthash].js' : '[name].js',
      clean: true,
    },

    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },

    module: {
      rules: [
        // TypeScript/JavaScript files - align with Rollup Babel config
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env', 
                  { 
                    targets: 'last 2 versions, not dead, not IE 11, > 1%', // Align with babel.config.js
                    modules: false,
                  }
                ],
                ['@babel/preset-react', { runtime: 'automatic' }],
                '@babel/preset-typescript',
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
          },
        },

        // SCSS files with CSS modules support - align with Rollup PostCSS
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
                  localIdentName: isProduction 
                    ? '[hash:base64:8]' 
                    : '[name]__[local]--[hash:base64:5]',
                },
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  config: path.resolve(__dirname, 'postcss.config.js'),
                },
              },
            },
            {
              loader: 'sass-loader',
              options: {
                implementation: require('sass'),
                api: 'modern', // Align with Rollup PostCSS config
                sassOptions: {
                  includePaths: [path.resolve(__dirname, 'src/styles')],
                  silenceDeprecations: ['legacy-js-api'], // Align with Rollup
                },
              },
            },
          ],
        },

        // CSS files with CSS modules support
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
                  localIdentName: isProduction 
                    ? '[hash:base64:8]' 
                    : '[name]__[local]--[hash:base64:5]',
                },
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  config: path.resolve(__dirname, 'postcss.config.js'),
                },
              },
            },
          ],
        },

        // Asset files (fonts, images, etc.)
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[hash][ext][query]',
          },
        },

        {
          test: /\.(png|jpg|jpeg|gif|svg)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[hash][ext][query]',
          },
        },
      ],
    },

    // Development server configuration
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      compress: true,
      port: 3000,
      hot: true,
      open: true,
    },

    // Source maps for development
    devtool: isProduction ? 'source-map' : 'eval-source-map',
  };
};