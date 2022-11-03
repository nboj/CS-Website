/** @type {{reactStrictMode: boolean, swcMinify: boolean, experimental: {styledComponents: boolean}}} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localist-images.azureedge.net', 'fastly.4sqi.net', 's3-external-1.amazonaws.com']
  },
  experimental: {
    styledComponents: true,
  }
}

module.exports = nextConfig
