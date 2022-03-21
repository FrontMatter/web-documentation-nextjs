/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: '/docs/content-types',
        destination: '/docs/content-creation',
        permanent: true
      },
    ]
  }
}
