/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/atomix-docs' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/atomix-docs' : '',
  images: {
    unoptimized: true,
  },
  sassOptions: {
    includePaths: ['./src/styles'],
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(ttf|otf|eot|woff|woff2)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      ],
    });
    // Exclude .map files from being processed by loaders
    config.module.rules.push({
      test: /\.map$/,
      loader: 'ignore-loader',
    });
    return config;
  },
}

module.exports = nextConfig