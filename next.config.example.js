/**
 * Next.js Configuration Example for @shohojdhara/atomix
 * 
 * Copy this configuration to your Next.js project's next.config.js file
 * and modify as needed for your specific requirements.
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable SWC transpilation for better performance
  swcMinify: true,

  // Configure experimental features
  experimental: {
    // Enable external directory imports for package development
    externalDir: true,
  },

  // Configure webpack for proper module resolution
  webpack: (config, { isServer }) => {
    // Handle CSS files from npm packages
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    });

    // Handle SCSS files from npm packages
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            api: 'modern-compiler',
            sassOptions: {
              includePaths: ['node_modules'],
            },
          },
        },
      ],
    });

    // Resolve modules properly
    config.resolve.alias = {
      ...config.resolve.alias,
    };

    // Handle ES modules from @shohojdhara/atomix
    config.resolve.extensionAlias = {
      '.js': ['.js', '.ts', '.tsx'],
      '.jsx': ['.jsx', '.tsx'],
    };

    // Ensure proper module resolution for React in SSR
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        'react': 'React',
        'react-dom': 'ReactDOM',
      });
    }

    return config;
  },

  // Configure transpilation for specific packages
  transpilePackages: [
    '@shohojdhara/atomix',
  ],

  // Enable styled-jsx for CSS-in-JS compatibility
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
