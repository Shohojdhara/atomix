const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const packageJson = require('./package.json');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

/**
 * Atomix Design System Webpack Configuration
 * Optimized for building design system assets (CSS and JS)
 */
module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const version = packageJson.version;
  const name = packageJson.name;
  
  // Define multiple entry points for more flexibility
  const entries = {
    // Main bundle with everything
    'main': './src/main.ts',
    // CSS only bundle
    'styles': './src/styles/index.scss',
  };

  return {
    mode: isProduction ? 'production' : 'development',
    entry: entries,
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: `js/${name}-${version}.[name].js`,
      assetModuleFilename: 'assets/[hash][ext][query]',
      clean: true,
      publicPath: '/'
    },
    module: {
      rules: [
        // JavaScript/TypeScript processing
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            }
          }
        },
        // SCSS/CSS processing with optimizations
        {
          test: /\.s?css$/,
          use: [
            isProduction 
              ? { 
                  loader: MiniCssExtractPlugin.loader,
                  options: { publicPath: '../' } // Fixes asset URL paths in CSS
                } 
              : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                importLoaders: 2
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                postcssOptions: {
                  plugins: [
                    autoprefixer(),
                    ...(isProduction ? [cssnano({ preset: 'default' })] : [])
                  ]
                }
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                sassOptions: {
                  outputStyle: 'expanded',
                  includePaths: [path.resolve(__dirname, 'src/styles')]
                }
              }
            }
          ]
        },
        // Images handling
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[name]-[hash][ext]'
          }
        },
        // Fonts handling
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name]-[hash][ext]'
          }
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.css'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@icons': path.resolve(__dirname, 'src/icons')
      }
    },
    plugins: [
      // Extract CSS into separate files in production
      new MiniCssExtractPlugin({
        filename: isProduction 
          ? `css/${name}-${version}.[name].min.css`
          : `css/${name}-${version}.[name].css`,
        chunkFilename: isProduction 
          ? 'css/[id].[contenthash].min.css'
          : 'css/[id].[contenthash].css',
      })
    ],
    optimization: {
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          terserOptions: {
            format: {
              comments: false,
            },
            compress: {
              drop_console: isProduction,
              drop_debugger: isProduction
            }
          }
        }),
        new CssMinimizerPlugin({
          minimizerOptions: {
            preset: [
              'default',
              { discardComments: { removeAll: true } }
            ],
          },
        }),
      ],
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
      runtimeChunk: 'single',
    },
    performance: {
      hints: isProduction ? 'warning' : false,
      maxAssetSize: 512000,
      maxEntrypointSize: 512000,
    },
    // Development server configuration
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      hot: true,
      port: 8080,
      open: true,
    },
  };
};
