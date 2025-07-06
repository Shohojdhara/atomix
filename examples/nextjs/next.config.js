/**
 * Sample Next.js Configuration for consuming @shohojdhara/atomix
 *
 * This configuration shows how to properly set up Next.js to work with Atomix
 * components, handle CSS imports, and optimize for SSR.
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features for better ESM support
  experimental: {
    // Enable ESM externals for better tree-shaking
    esmExternals: true,
    // Enable server components (if using Next.js 13+)
    serverComponentsExternalPackages: ['@shohojdhara/atomix'],
  },

  // Webpack configuration
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Enable exportsFields for proper module resolution
    config.resolve.exportsFields = ['exports'];

    // Prefer ESM modules when available
    config.resolve.mainFields = ['module', 'main'];

    // Handle CSS imports from Atomix
    config.module.rules.push({
      test: /\.css$/,
      include: /node_modules\/@shohojdhara\/atomix/,
      use: [
        defaultLoaders.babel,
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: {
              auto: true,
              localIdentName: dev ? '[name]__[local]--[hash:base64:5]' : '[hash:base64:8]',
            },
          },
        },
      ],
    });

    // Handle SCSS imports from Atomix (if needed)
    config.module.rules.push({
      test: /\.scss$/,
      include: /node_modules\/@shohojdhara\/atomix/,
      use: [
        defaultLoaders.babel,
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
            modules: {
              auto: true,
              localIdentName: dev ? '[name]__[local]--[hash:base64:5]' : '[hash:base64:8]',
            },
          },
        },
        'postcss-loader',
        {
          loader: 'sass-loader',
          options: {
            api: 'modern',
            implementation: 'sass-embedded',
            sassOptions: {
              outputStyle: dev ? 'expanded' : 'compressed',
            },
          },
        },
      ],
    });

    // Optimize bundle splitting for Atomix
    if (!isServer) {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        atomix: {
          test: /[\\/]node_modules[\\/]@shohojdhara[\\/]atomix[\\/]/,
          name: 'atomix',
          chunks: 'all',
          priority: 10,
        },
      };
    }

    return config;
  },

  // CSS configuration
  cssLoaderOptions: {
    importLoaders: 1,
    modules: {
      auto: true,
      localIdentName: '[name]__[local]--[hash:base64:5]',
    },
  },

  // Transpile Atomix package for better compatibility
  transpilePackages: ['@shohojdhara/atomix'],

  // Image optimization
  images: {
    domains: [],
    formats: ['image/webp', 'image/avif'],
  },

  // Compiler options
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Environment variables
  env: {
    CUSTOM_KEY: 'my-value',
  },

  // Headers for better caching
  async headers() {
    return [
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
