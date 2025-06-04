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
}

module.exports = nextConfig