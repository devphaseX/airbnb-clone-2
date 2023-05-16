/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    if (process.env.NODE_ENV === 'development') {
      config.optimization.splitChunks = {
        cacheGroups: {
          framework: {
            chunks: 'all',
            test: /[\\/]node_modules[\\/]/,
            name: 'framework',
            enforce: true,
          },
        },
      };
    }
    return config;
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
};

module.exports = nextConfig;
