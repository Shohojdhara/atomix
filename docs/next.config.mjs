/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Exclude all .d.ts files from being processed
    config.module.rules.push({
      test: /\.d\.ts$/,
      loader: 'ignore-loader',
    });

    // Add an alias to bypass the problematic declaration files
    config.resolve.alias = {
      ...config.resolve.alias,
      '@shohojdhara/atomix': '@shohojdhara/atomix/dist/js/atomix.react.esm.js',
    };

    return config;
  },
};

export default nextConfig;
