/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    LITE_THINKING_API: 'https://litethinkingapi.azurewebsites.net'
  },
}

module.exports = nextConfig
