const path = require('path');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const packageJson = require('./package.json');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const fs = require('fs');
const nodeExternals = require('webpack-node-externals');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// Use dynamic version from environment or package.json
const version = process.env.VERSION || packageJson.version;

/**
 * Custom plugin to create unminified CSS files
 */
class UnminifiedCssPlugin {
  constructor(options = {}) {
    this.options = Object.assign({
      minFilePattern: /\.min\.css$/,
      removeMinSuffix: true,
    }, options);
  }

  beautifyCss(css) {
    css = css.replace(/}/g, '}\n');
    css = css.replace(/;/g, ';\n  ');
    css = css.replace(/{/g, '{\n  ');
    css = css.replace(/\n\s*\n/g, '\n');
    css = css.replace(/@media[^{]+{/g, match => match.replace(/\n\s*/g, ' '));
    return css;
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tapAsync('UnminifiedCssPlugin', (compilation, callback) => {
      const outputPath = compilation.outputOptions.path;
      const cssFiles = Object.keys(compilation.assets).filter(asset => 
        asset.endsWith('.min.css') && this.options.minFilePattern.test(asset)
      );
      
      for (const cssFile of cssFiles) {
        const filePath = path.join(outputPath, cssFile);
        if (!fs.existsSync(filePath)) continue;
        
        try {
          const content = fs.readFileSync(filePath, 'utf8');
          const beautifiedContent = this.beautifyCss(content);
          let unminifiedName = cssFile;
          if (this.options.removeMinSuffix) {
            unminifiedName = cssFile.replace('.min.css', '.css');
          }
          fs.writeFileSync(path.join(outputPath, unminifiedName), beautifiedContent);
          console.log(`Created unminified version: ${unminifiedName}`);
        } catch (err) {
          console.error(`Error processing ${cssFile}:`, err);
        }
      }
      callback();
    });
  }
}

/**
 * Custom plugin to remove JS files created for CSS-only entries
 */
class RemoveCssJsPlugin {
  constructor(options = {}) {
    this.options = Object.assign({
      cssEntries: ['styles'],
    }, options);
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tapAsync('RemoveCssJsPlugin', (compilation, callback) => {
      const outputPath = compilation.outputOptions.path;
      const name = this.options.name || '';
      const version = this.options.version || '';
      
      for (const cssEntry of this.options.cssEntries) {
        const jsFilePath = path.join(outputPath, `js/${name}-${version}.${cssEntry}.js`);
        const mapFilePath = path.join(outputPath, `js/${name}-${version}.${cssEntry}.js.map`);
        
        if (fs.existsSync(jsFilePath)) {
          fs.unlinkSync(jsFilePath);
          console.log(`Removed unnecessary JS file: js/${name}-${version}.${cssEntry}.js`);
        }
        if (fs.existsSync(mapFilePath)) {
          fs.unlinkSync(mapFilePath);
          console.log(`Removed map file: js/${name}-${version}.${cssEntry}.js.map`);
        }
      }
      callback();
    });
  }
}

/**
 * Get base webpack configuration
 * @param {boolean} isProduction - Whether to build for production
 * @param {string} name - Package name
 * @param {string} version - Package version
 * @param {Object} options - Additional options
 * @returns {Object} Webpack configuration object
 */
const getBaseConfig = (isProduction, name, version, options = {}) => ({
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? 'source-map' : 'eval-source-map',
  stats: {
    assets: true,
    colors: true,
    errors: true,
    errorDetails: true,
    modules: false,
    performance: true,
    hash: false,
    version: false,
    timings: true,
    warnings: true,
    children: false,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { 
            cacheDirectory: true,
            // Use the project's babel config
            configFile: path.resolve(__dirname, 'babel.config.js'),
            // Apply different settings based on the target environment
            presets: [
              ['@babel/preset-env', {
                modules: options.outputFormat === 'esm' ? false : 'auto',
                targets: options.targets || (isProduction ? { browsers: '> 0.25%, not dead' } : { node: 'current' }),
                useBuiltIns: options.useBuiltIns || false,
                corejs: options.useBuiltIns ? { version: 3, proposals: true } : undefined,
              }],
            ],
          },
        },
      },
      {
        test: /\.s?css$/,
        use: [
          { 
            loader: MiniCssExtractPlugin.loader,
            options: { 
              publicPath: '../',
              esModule: options.outputFormat === 'esm',
            },
          },
          {
            loader: 'css-loader',
            options: { 
              sourceMap: true, 
              importLoaders: 2,
              modules: {
                auto: true,
                localIdentName: isProduction ? '[hash:base64:8]' : '[name]__[local]--[hash:base64:5]',
              },
              esModule: options.outputFormat === 'esm',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: [
                  autoprefixer(),
                  ...(isProduction ? [cssnano({ 
                    preset: ['default', { 
                      discardComments: { removeAll: true },
                      normalizeWhitespace: true,
                    }] 
                  })] : []),
                ],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sassOptions: {
                outputStyle: 'expanded',
                includePaths: [path.resolve(__dirname, 'src/styles')],
                precision: 8,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: { filename: 'images/[name]-[hash][ext]' },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: { filename: 'fonts/[name]-[hash][ext]' },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: 'asset/resource',
        generator: { filename: 'videos/[name]-[hash][ext]' },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.css', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@icons': path.resolve(__dirname, 'src/icons'),
      '@lib': path.resolve(__dirname, 'src/lib'),
    },
    // Prefer ESM modules when available
    mainFields: options.outputFormat === 'esm' 
      ? ['module', 'browser', 'main']
      : ['browser', 'module', 'main'],
    // Ensure we're resolving package.json for proper tree-shaking
    conditionNames: ['import', 'require', 'node', 'default'],
  },
  optimization: {
    minimize: isProduction,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        parallel: true,
        terserOptions: {
          ecma: 2020,
          format: { comments: false },
          compress: { 
            drop_console: isProduction, 
            drop_debugger: isProduction,
            pure_getters: isProduction,
            unsafe: isProduction,
            unsafe_comps: isProduction,
            passes: 2,
          },
          mangle: isProduction,
        },
      }),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
        parallel: true,
      }),
    ],
    // Enable tree-shaking for npm package
    usedExports: true,
    sideEffects: true,
    // Ensure proper code splitting
    splitChunks: options.splitChunks || false,
  },
  performance: {
    hints: isProduction ? 'warning' : false,
    maxAssetSize: 512000,
    maxEntrypointSize: 512000,
  },
  // Add bundle analyzer in analyze mode
  plugins: [
    ...(options.analyze ? [new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: `report-${name}-${version}.html`,
      openAnalyzer: false,
    })] : []),
  ],
});

/**
 * Get vanilla JS component build configuration
 * @param {Object} env - Environment variables
 * @param {Object} argv - CLI arguments
 * @returns {Object} Webpack configuration for vanilla JS build
 */
const getVanillaComponentConfig = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const name = packageJson.name;
  const format = env.format || 'umd'; // 'umd', 'cjs', or 'esm'
  
  // Get base config with appropriate options
  const baseConfig = getBaseConfig(isProduction, name, version, {
    outputFormat: format,
    analyze: env.analyze,
    splitChunks: format === 'umd', // Only use code splitting for UMD builds
  });

  const vanillaConfig = {
    entry: {
      vanilla: './src/htmlComponentsEntry.ts',
      styles: './src/styles/index.scss',
    },
    output: {
      path: path.resolve(__dirname, 'dist/'),
      filename: `js/${name}-${version}.[name]${format !== 'umd' ? `.${format}` : ''}.js`,
      assetModuleFilename: 'assets/[hash][ext][query]',
      clean: isProduction && env.target === 'vanilla-only',
      publicPath: isProduction ? './' : '/',
      library: format === 'esm' ? undefined : {
        name: 'Atomix',
        type: format === 'cjs' ? 'commonjs' : format, // Fix for CJS format
        export: 'default',
      },
      // Set module type for ESM output
      ...(format === 'esm' ? { module: true, chunkFormat: 'module' } : {}),
      // Ensure global variable doesn't conflict
      globalObject: format === 'umd' ? 'this' : undefined,
    },
    experiments: {
      // Enable outputModule for ESM
      outputModule: format === 'esm',
    },
    externals: format !== 'umd' ? [
      // Don't bundle dependencies for CJS/ESM builds
      nodeExternals({
        // Except CSS files which should be processed
        allowlist: [/\.css$/, /\.scss$/],
      }),
    ] : undefined,
    plugins: [
      new MiniCssExtractPlugin({
        filename: isProduction 
          ? `css/${name}-${version}.[name].min.css`
          : `css/${name}-${version}.[name].css`,
        chunkFilename: isProduction 
          ? 'css/[id].[contenthash].min.css'
          : 'css/[id].[contenthash].css',
      }),
      ...(isProduction ? [
        new UnminifiedCssPlugin(),
        new RemoveCssJsPlugin({ cssEntries: ['styles'], name, version }),
      ] : []),
    ],
    optimization: {
      // Only use code splitting for UMD builds
      ...(format === 'umd' ? {
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
      } : {}),
    },
  };
  return merge(baseConfig, vanillaConfig);
};

/**
 * Get React component build configuration
 * @param {Object} env - Environment variables
 * @param {Object} argv - CLI arguments
 * @returns {Object} Webpack configuration for React build
 */
const getReactComponentConfig = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const name = packageJson.name;
  const format = env.format || 'umd'; // 'umd', 'cjs', or 'esm'
  
  // Get base config with appropriate options
  const baseConfig = getBaseConfig(isProduction, name, version, {
    outputFormat: format,
    analyze: env.analyze,
    // React-specific settings
    targets: { browsers: ['last 2 versions', 'not dead', '> 0.5%'] },
  });

  const reactConfig = {
    entry: {
      react: './src/index.ts',
    },
    output: {
      path: path.resolve(__dirname, 'dist/'),
      filename: `js/${name}-${version}.[name]${format !== 'umd' ? `.${format}` : ''}.js`,
      assetModuleFilename: 'assets/[hash][ext][query]',
      clean: isProduction && env.target === 'react-only',
      publicPath: isProduction ? './' : '/',
      library: format === 'esm' ? undefined : {
        name: 'AtomixReact',
        type: format === 'cjs' ? 'commonjs' : format, // Fix for CJS format
        export: 'default',
      },
      // Set module type for ESM output
      ...(format === 'esm' ? { module: true, chunkFormat: 'module' } : {}),
      // Ensure global variable doesn't conflict
      globalObject: format === 'umd' ? 'this' : undefined,
    },
    experiments: {
      // Enable outputModule for ESM
      outputModule: format === 'esm',
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: isProduction 
          ? `css/${name}-${version}.react.min.css`
          : `css/${name}-${version}.react.css`,
        chunkFilename: isProduction 
          ? 'css/[id].[contenthash].min.css'
          : 'css/[id].[contenthash].css',
      }),
      ...(isProduction ? [new UnminifiedCssPlugin()] : []),
    ],
    externals: format === 'umd' 
      ? {
          // For UMD builds, only mark React and ReactDOM as external
          react: 'React',
          'react-dom': 'ReactDOM',
        }
      : [
          // For CJS/ESM builds, don't bundle any dependencies
          nodeExternals({
            // Except CSS files which should be processed
            allowlist: [/\.css$/, /\.scss$/],
          }),
        ],
    // Ensure React components are properly tree-shakable
    optimization: {
      usedExports: true,
      sideEffects: true,
    },
  };
  return merge(baseConfig, reactConfig);
};

/**
 * Export webpack configuration based on the target and format
 * @param {Object} env - Environment variables
 * @param {Object} argv - CLI arguments
 * @returns {Object|Array} Webpack configuration(s)
 */
module.exports = (env = {}, argv = {}) => {
  const target = env.target || 'docs'; // Default to 'docs' if not specified
  const format = env.format || 'umd'; // Default to 'umd' if not specified
  const analyze = Boolean(env.analyze); // Enable bundle analysis if requested
  
  // Validate format
  if (format && !['umd', 'cjs', 'esm', 'all'].includes(format)) {
    console.error(`Invalid format '${format}'. Must be one of: umd, cjs, esm, all`);
    process.exit(1);
  }
  
  // Build configurations based on target
  if (target === 'vanilla') {
    return getVanillaComponentConfig({ ...env, format, analyze }, argv);
  }
  
  if (target === 'react') {
    return getReactComponentConfig({ ...env, format, analyze }, argv);
  }
  
  if (target === 'components') {
    // For 'all' format, build all format types
    if (format === 'all') {
      return [
        // UMD builds
        getVanillaComponentConfig({ ...env, format: 'umd', analyze }, argv),
        getReactComponentConfig({ ...env, format: 'umd', analyze }, argv),
        // CommonJS builds
        getVanillaComponentConfig({ ...env, format: 'cjs', analyze }, argv),
        getReactComponentConfig({ ...env, format: 'cjs', analyze }, argv),
        // ESM builds
        getVanillaComponentConfig({ ...env, format: 'esm', analyze }, argv),
        getReactComponentConfig({ ...env, format: 'esm', analyze }, argv),
      ];
    }
    
    // Build both vanilla and react with the specified format
    return [
      getVanillaComponentConfig({ ...env, format, analyze }, argv),
      getReactComponentConfig({ ...env, format, analyze }, argv),
    ];
  }
  
  // If target is 'docs' or any other unspecified target
  console.warn(`Webpack target '${target}' not explicitly handled. No configuration returned.`);
  return undefined; 
};
