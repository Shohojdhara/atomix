/**
 * Sample Webpack Configuration for consuming @shohojdhara/atomix
 *
 * This configuration shows how to properly set up webpack to work with Atomix
 * components and handle CSS imports correctly.
 */

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    mode: isProduction ? 'production' : 'development',
    entry: './src/index.js', // Your app entry point

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? '[name].[contenthash].js' : '[name].js',
      clean: true,
    },

    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      // Important: Enable exportsFields for proper module resolution
      exportsFields: ['exports'],
      // Prefer ESM modules when available
      mainFields: ['module', 'main'],
    },

    module: {
      rules: [
        // TypeScript/JavaScript files
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: 'defaults' }],
                ['@babel/preset-react', { runtime: 'automatic' }],
                '@babel/preset-typescript',
              ],
            },
          },
        },

        // CSS files (including Atomix styles)
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                // Enable CSS modules for .module.css files
                modules: {
                  auto: true,
                  localIdentName: isProduction
                    ? '[hash:base64:8]'
                    : '[name]__[local]--[hash:base64:5]',
                },
              },
            },
            'postcss-loader',
          ],
        },

        // SCSS files (if you want to import Atomix SCSS directly)
        {
          test: /\.scss$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
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
            'postcss-loader',
            'sass-loader',
          ],
        },

        // Asset files
        {
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf|otf)$/,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 8 * 1024, // 8kb
            },
          },
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),

      ...(isProduction
        ? [
            new MiniCssExtractPlugin({
              filename: '[name].[contenthash].css',
            }),
          ]
        : []),
    ],

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

    // Optimization for production
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          // Separate Atomix into its own chunk for better caching
          atomix: {
            test: /[\\/]node_modules[\\/]@shohojdhara[\\/]atomix[\\/]/,
            name: 'atomix',
            chunks: 'all',
            priority: 10,
          },
          // Other vendor libraries
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 5,
          },
        },
      },
    },

    // Source maps for development
    devtool: isProduction ? 'source-map' : 'eval-source-map',
  };
};
