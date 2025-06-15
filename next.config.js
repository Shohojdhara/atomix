/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features for better compatibility
  experimental: {
    // Enable CSS-in-JS support
    esmExternals: true,
  },
  
  // Configure webpack for Atomix components
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Handle SCSS files from Atomix
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            implementation: require('sass-embedded'),
            sassOptions: {
              outputStyle: 'expanded',
              precision: 8,
            },
          },
        },
      ],
    });

    // Handle font files
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'static/fonts/[name].[hash][ext]'
      }
    });

    // Handle image files
    config.module.rules.push({
      test: /\.(png|jpg|jpeg|gif|svg)$/i,
      type: 'asset',
      parser: {
        dataUrlCondition: {
          maxSize: 4 * 1024 // 4kb
        }
      },
      generator: {
        filename: 'static/images/[name].[hash][ext]'
      }
    });

    // Handle TypeScript declaration files
    config.module.rules.push({
      test: /\.d\.ts$/,
      exclude: /node_modules/,
      use: [{ loader: 'ignore-loader' }]
    });

    // Add fallbacks for Node.js core modules
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: false, // Provide empty mock for crypto
      };
    }

    return config;
  },

  // Configure CSS handling
  cssLoaderOptions: {
    importLoaders: 1,
    modules: {
      auto: true,
      localIdentName: '[local]--[hash:base64:5]',
    },
  },

  // Transpile Atomix package
  transpilePackages: ['@shohojdhara/atomix'],
};

module.exports = nextConfig;