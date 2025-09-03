require('dotenv').config();
const headers = require('./headers');

module.exports = {
  env: {
    FONT_AWESOME_KEY: process.env.FONT_AWESOME_KEY,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers,
      },
    ];
  },
  generateEtags: false,
  poweredByHeader: false,
  compiler: {
    styledComponents: true,
  },
  devIndicators: false,
};
