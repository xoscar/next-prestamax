/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  secret: 'TEST-SECRET',
  webpack: (config) => {
    config.experiments = { topLevelAwait: true };
    return config;
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
      },
    ];
  },
};
