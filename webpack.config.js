const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

// Version for output filenames
const version = require('./package.json').version;

// Shared rules for all builds
const sharedRules = [
  {
    test: /\.(ts|tsx)$/,
    exclude: /node_modules/,
    use: 'babel-loader',
  },
  {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource',
    generator: {
      filename: 'fonts/[hash][ext][query]'
    }
  },
  {
    test: /\.(png|jpg|jpeg|gif|svg)$/i,
    type: 'asset/resource',
    generator: {
      filename: 'images/[hash][ext][query]'
    }
  }
];

// Base webpack configuration
const baseConfig = {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: sharedRules,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          format: {
            comments: false,
          },
          compress: {
            drop_console: true,
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
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
        assetModuleFilename: 'assets/[hash][ext][query]', // Default for other assets
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
                  sourceMap: true,
                  importLoaders: 2,
                },
              },
              'postcss-loader',
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                  implementation: require('sass-embedded'),
                },
              },
            ],
          },
          ...sharedRules,
        ],
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: (pathData) => {
            return pathData.chunk.name === 'minified'
              ? `css/atomix-${version}.min.css`
              : `css/atomix-${version}.css`;
          },
        }),
        ...(analyze ? [new BundleAnalyzerPlugin()] : []),
      ],
    };
  }
  
  // Component builds (React only)
  const configs = [];
  
  // React components
  if (format === 'all' || format === 'esm') {
    configs.push({
      ...baseConfig,
      name: 'react-esm',
      entry: './src/index.ts',
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: `js/atomix-${version}.react.esm.js`,
        library: {
          type: 'module',
        },
        environment: { module: true },
        assetModuleFilename: 'assets/[hash][ext][query]', // Default for other assets
      },
      experiments: {
        outputModule: true,
      },
      externals: [
        nodeExternals(),
        /\.scss$/,
        /\.css$/,
      ],
      plugins: analyze ? [new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: 'reports/react-esm.html',
        openAnalyzer: false,
      })] : [],
    });
  }
  
  if (format === 'all' || format === 'cjs') {
    configs.push({
      ...baseConfig,
      name: 'react-cjs',
      entry: './src/index.ts',
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: `js/atomix-${version}.react.cjs.js`,
        library: {
          type: 'commonjs2',
        },
        assetModuleFilename: 'assets/[hash][ext][query]', // Default for other assets
      },
      externals: [
        nodeExternals(),
        /\.scss$/,
        /\.css$/,
      ],
      plugins: analyze ? [new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: 'reports/react-cjs.html',
        openAnalyzer: false,
      })] : [],
    });
  }
  
  if (format === 'all' || format === 'umd') {
    configs.push({
      ...baseConfig,
      name: 'react-umd',
      entry: './src/index.ts',
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: `js/atomix-${version}.react.js`,
        library: {
          name: 'Atomix',
          type: 'umd',
          umdNamedDefine: true,
        },
        globalObject: 'this',
        assetModuleFilename: 'assets/[hash][ext][query]', // Default for other assets
      },
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