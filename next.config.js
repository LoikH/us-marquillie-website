/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'healing-passion-14af921bbf.media.strapiapp.com',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
