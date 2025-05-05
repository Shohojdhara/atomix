const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const packageJson = require('./package.json');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const fs = require('fs');

/**
 * Custom plugin to create unminified CSS files
 */
class UnminifiedCssPlugin {
  constructor(options = {}) {
    this.options = Object.assign({
      // Default options
      minFilePattern: /\.min\.css$/,
      removeMinSuffix: true,
    }, options);
  }

  // Simple CSS beautifier
  beautifyCss(css) {
    // Add newlines after closing braces
    css = css.replace(/}/g, '}\n');
    
    // Add newlines after semicolons
    css = css.replace(/;/g, ';\n  ');
    
    // Add newlines after opening braces and add indentation
    css = css.replace(/{/g, '{\n  ');
    
    // Clean up multiple newlines
    css = css.replace(/\n\s*\n/g, '\n');
    
    // Fix media queries and other special cases
    css = css.replace(/@media[^{]+{/g, match => match.replace(/\n\s*/g, ' '));
    
    return css;
  }

  apply(compiler) {
    // Hook into the 'afterEmit' event to process files after they're written
    compiler.hooks.afterEmit.tapAsync('UnminifiedCssPlugin', (compilation, callback) => {
      const outputPath = compilation.outputOptions.path;
      
      // Find all minified CSS files
      const cssFiles = Object.keys(compilation.assets).filter(asset => 
        asset.endsWith('.min.css')
      );
      
      // For each minified CSS file, create an unminified version
      for (const cssFile of cssFiles) {
        const filePath = path.join(outputPath, cssFile);
        
        // Skip if the file doesn't exist or doesn't match our pattern
        if (!fs.existsSync(filePath) || !this.options.minFilePattern.test(cssFile)) {
          continue;
        }
        
        try {
          // Read the minified content
          const content = fs.readFileSync(filePath, 'utf8');
          
          // Beautify the CSS
          const beautifiedContent = this.beautifyCss(content);
          
          // Get the name for the unminified file
          let unminifiedName = cssFile;
          if (this.options.removeMinSuffix) {
            unminifiedName = cssFile.replace('.min.css', '.css');
          }
          
          // Write the unminified file
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
      // Default options
      cssEntries: ['styles'],
    }, options);
  }

  apply(compiler) {
    // Hook into the 'afterEmit' event to process files after they're written
    compiler.hooks.afterEmit.tapAsync('RemoveCssJsPlugin', (compilation, callback) => {
      const outputPath = compilation.outputOptions.path;
      const name = this.options.name || '';
      const version = this.options.version || '';
      
      // Remove JS files for CSS-only entries
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
 * Get component build configuration
 * For building vanilla JS components
 */
const getComponentConfig = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const version = packageJson.version;
  const name = packageJson.name;
  
  return {
    mode: isProduction ? 'production' : 'development',
    entry: {
      // Main bundle with vanilla JS components
      'main': './src/main.ts',
      // CSS only bundle
      'styles': './src/styles/index.scss',
    },
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    output: {
      path: path.resolve(__dirname, 'dist/'),
      filename: `js/${name}-${version}.[name].js`,
      assetModuleFilename: 'assets/[hash][ext][query]',
      clean: true,
      publicPath: isProduction ? './' : '/',
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
            { 
              loader: MiniCssExtractPlugin.loader,
              options: { publicPath: '../' }
            },
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
        },
        // Video files handling
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          type: 'asset/resource',
          generator: {
            filename: 'videos/[name]-[hash][ext]'
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
      }),
      // Add our custom unminified CSS plugin in production mode
      ...(isProduction ? [
        new UnminifiedCssPlugin(),
        new RemoveCssJsPlugin({ cssEntries: ['styles'], name, version })
      ] : [])
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
  };
};

/**
 * Get documentation preview configuration
 * For building React documentation site
 */
const getDocsConfig = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const version = packageJson.version;
  const name = packageJson.name;
  
  return {
    mode: isProduction ? 'production' : 'development',
    entry: {
      // Documentation app
      'docs': './src/main.tsx',
    },
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    output: {
      path: path.resolve(__dirname, 'deploy/docs'),
      filename: `js/[name].js`,
      assetModuleFilename: 'assets/[hash][ext][query]',
      clean: true,
      publicPath: isProduction ? './' : '/',
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
            { 
              loader: MiniCssExtractPlugin.loader,
              options: { publicPath: '../' }
            },
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
        },
        // Video files handling
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          type: 'asset/resource',
          generator: {
            filename: 'videos/[name]-[hash][ext]'
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
          ? `css/[name].min.css`
          : `css/[name].css`,
        chunkFilename: isProduction 
          ? 'css/[id].[contenthash].min.css'
          : 'css/[id].[contenthash].css',
      }),
      // Add HTML webpack plugin for documentation site
      new HtmlWebpackPlugin({
        template: './index.html',
        filename: 'index.html',
        inject: true,
      }),
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
        chunks: 'all',
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
        directory: path.join(__dirname, 'deploy/docs'),
      },
      compress: true,
      port: 3000,
      hot: true,
      open: true,
      historyApiFallback: true, // For single page applications
    },
  };
};

/**
 * Export webpack configuration based on the target
 */
module.exports = (env, argv) => {
  // Check if target is specified
  const target = env.target || 'docs';
  
  // Return the appropriate configuration
  if (target === 'components') {
    return getComponentConfig(env, argv);
  }
  
  return getDocsConfig(env, argv);
};
