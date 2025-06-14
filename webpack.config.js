const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// Version for output filenames
const version = require('./package.json').version;

// Shared rules for all builds
const sharedRules = [
  {
    test: /\.(ts|tsx)$/,
    exclude: [/node_modules/, /\.d\.ts$/],
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true, // Enable caching for faster builds
        presets: [
          ['@babel/preset-env', { 
            modules: false, // Let webpack handle modules
            targets: '> 0.25%, not dead',
            bugfixes: true, // Apply bugfixes for smaller output
            useBuiltIns: 'usage', // Only include polyfills that are used
            corejs: 3 // Use core-js v3
          }],
          ['@babel/preset-react', { 
            runtime: 'automatic' // Use new JSX transform
          }],
          ['@babel/preset-typescript', {
            isTSX: true, // Handle TSX files
            allExtensions: true, // Process all extensions
            allowDeclareFields: true // Allow declare fields
          }]
        ],
      },
    },
  },
  {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset',
    parser: {
      dataUrlCondition: {
        maxSize: 8 * 1024 // 8kb - inline if smaller than this
      }
    },
    generator: {
      filename: 'fonts/[name].[contenthash][ext]'
    }
  },
  {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset',
    parser: {
      dataUrlCondition: {
        maxSize: 4 * 1024 // 4kb - inline if smaller than this
      }
    },
    generator: {
      filename: 'images/[name].[contenthash][ext]'
    }
  },
  {
    test: /\.svg$/i,
    type: 'asset',
    parser: {
      dataUrlCondition: {
        maxSize: 4 * 1024 // 4kb - inline if smaller than this
      }
    },
    generator: {
      filename: 'images/[name].[contenthash][ext]'
    }
  }
];

// Base webpack configuration
const baseConfig = {
  mode: 'production',
  devtool: false, // Disable source maps for production builds
  module: {
    rules: sharedRules,
  },
  resolve: {
     symlinks: true,
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    // Prefer ESM modules when available
    mainFields: ['module', 'main'],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        parallel: true, // Use multi-process parallel running
        terserOptions: {
          ecma: 2020, // Use ES2020 syntax
          format: {
            comments: false,
          },
          compress: {
            drop_console: true,
            pure_getters: true,
            unsafe: true,
            unsafe_comps: true,
            passes: 2, // Run optimization passes twice
            warnings: false,
          },
          mangle: {
            safari10: true,
          },
        },
      }),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
              normalizeWhitespace: true,
            },
          ],
        },
        parallel: true, // Use multi-process parallel running
      }),
    ],
    // Enable better tree shaking
    usedExports: true,
    sideEffects: false,
    // Split chunks for better caching
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendors: {
          test: /[\\]node_modules[\\]/,
          name(module) {
            // Get the name of the npm package
            const packageName = module.context.match(/[\\]node_modules[\\](.+?)([\\]|$)/)[1];
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },
  performance: {
    hints: 'warning',
    maxAssetSize: 100000, // 100kb
    maxEntrypointSize: 250000, // 250kb
  },
  stats: {
    assets: true,
    colors: true,
    errors: true,
    errorDetails: true,
    modules: false,
    performance: true,
    hash: false,
  },
};

// Create configuration based on environment variables
module.exports = (env = {}) => {
  const target = env.target || 'components';
  const format = env.format || 'all';
  const analyze = env.analyze === 'true' || env.analyze === true;
  
  // CSS/Styles build configuration
  if (target === 'styles') {
    return {
      ...baseConfig,
      name: 'styles',
      entry: {
        'main': './src/styles/index.scss',
        'minified': './src/styles/index.scss',
      },
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js', // Not used but required
        assetModuleFilename: 'assets/[name].[contenthash][ext]',
        clean: true, // Clean dist folder
        chunkFormat: 'array-push', // Specify chunk format to fix the error
      },
      module: {
        rules: [
          {
            test: /\.(scss|css)$/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false, // Disable source maps for production
                  importLoaders: 2,
                  modules: {
                    auto: true, // Enable CSS modules for .module.scss files
                    localIdentName: '[local]--[hash:base64:5]', // Format for CSS module class names
                  },
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false, // Disable source maps for production
                  postcssOptions: {
                    plugins: [
                      'autoprefixer',
                      ['cssnano', {
                        preset: ['default', { discardComments: { removeAll: true } }]
                      }],
                    ],
                  },
                },
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false, // Disable source maps for production
                  implementation: require('sass-embedded'),
                  sassOptions: {
                    outputStyle: 'expanded', // Let cssnano handle minification
                    precision: 8, // Precision for calculations
                  },
                },
              },
            ],
          },
          ...sharedRules,
        ],
      },
      plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
          filename: (pathData) => {
            return pathData.chunk.name === 'minified'
              ? `css/atomix.min.css`
              : `css/atomix.css`;
          },
        }),
        ...(analyze ? [new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: 'reports/styles.html',
          openAnalyzer: false,
        })] : []),
      ],
    };
  }
  
  // Component builds (React only)
  const configs = [];
  
  // ESM build - Modern bundlers and tree-shaking
  if (format === 'all' || format === 'esm') {
    configs.push({
      ...baseConfig,
      name: 'react-esm',
      entry: {
        'atomix.react.esm': './src/index.ts'
      },
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: `js/[name].js`,
        library: {
          type: 'module',
        },
        environment: { 
          module: true,
          arrowFunction: true,
          const: true,
          destructuring: true,
          dynamicImport: true, // Support dynamic imports
        },
        assetModuleFilename: 'assets/[name].[contenthash][ext]',
        clean: false, // Don't clean on individual builds
        chunkFilename: 'js/chunks/esm/[name].[contenthash].js', // Named chunks for better caching with unique path
      },
      experiments: {
        outputModule: true,
      },
      externals: [
        // More specific externals for better control
        {
          'react': 'react',
          'react-dom': 'react-dom',
          'react-router-dom': 'react-router-dom',
          'classnames': 'classnames',
          'phosphor-react': 'phosphor-react',
          'prism-react-renderer': 'prism-react-renderer',
        },
        // Exclude CSS/SCSS/TypeScript declaration files
        /\.(scss|css|d\.ts)$/,
      ],
      plugins: [
        // Clean the dist directory only on the first build, but preserve CSS files
        format === 'all' ? new CleanWebpackPlugin({
          cleanOnceBeforeBuildPatterns: ['**/*', '!css/**', '!fonts/**']
        }) : null,
        ...(analyze ? [new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: 'reports/react-esm.html',
          openAnalyzer: false,
        })] : []),
      ].filter(Boolean), // Filter out null values
    });
  }
  
  // CommonJS build - Node.js compatibility
  if (format === 'all' || format === 'cjs') {
    configs.push({
      ...baseConfig,
      name: 'react-cjs',
      entry: {
        'atomix.react.cjs': './src/index.ts'
      },
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: `js/[name].js`,
        library: {
          type: 'commonjs2',
        },
        assetModuleFilename: 'assets/[name].[contenthash][ext]',
        clean: false,
        chunkFilename: 'js/chunks/cjs/[name].[contenthash].js', // Named chunks for better caching with unique path
      },
      externals: [
        {
          'react': 'react',
          'react-dom': 'react-dom',
          'react-router-dom': 'react-router-dom',
          'classnames': 'classnames',
          'phosphor-react': 'phosphor-react',
          'prism-react-renderer': 'prism-react-renderer',
        },
        /\.(scss|css|d\.ts)$/,
      ],
      plugins: analyze ? [new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: 'reports/react-cjs.html',
        openAnalyzer: false,
      })] : [],
      // Optimize for Node.js environment
      target: 'node',
      node: {
        __dirname: false,
        __filename: false,
      },
    });
  }
  
  // UMD build - Browser compatibility
  if (format === 'all' || format === 'umd') {
    configs.push({
      ...baseConfig,
      name: 'react-umd',
      entry: {
        'atomix.react.umd': './src/index.ts'
      },
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: `js/[name].js`,
        library: {
          name: 'Atomix',
          type: 'umd',
          umdNamedDefine: true,
        },
        globalObject: 'this',
        assetModuleFilename: 'assets/[name].[contenthash][ext]',
        clean: false,
        chunkFilename: 'js/chunks/umd/[name].[contenthash].js', // Named chunks for better caching with unique path
      },
      // Optimize for browser environment
      target: 'web',
      externals: {
        react: {
          root: 'React',
          commonjs2: 'react',
          commonjs: 'react',
          amd: 'react',
        },
        'react-dom': {
          root: 'ReactDOM',
          commonjs2: 'react-dom',
          commonjs: 'react-dom',
          amd: 'react-dom',
        },
        'react-router-dom': {
          root: 'ReactRouterDOM',
          commonjs2: 'react-router-dom',
          commonjs: 'react-router-dom',
          amd: 'react-router-dom',
        },
        'classnames': {
          root: 'classNames',
          commonjs2: 'classnames',
          commonjs: 'classnames',
          amd: 'classnames',
        },
        'phosphor-react': {
          root: 'PhosphorReact',
          commonjs2: 'phosphor-react',
          commonjs: 'phosphor-react',
          amd: 'phosphor-react',
        },
      },
      plugins: analyze ? [new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: 'reports/react-umd.html',
        openAnalyzer: false,
      })] : [],
    });
  }
  
  return configs.length === 1 ? configs[0] : configs;
};