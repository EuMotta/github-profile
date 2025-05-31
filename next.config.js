/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // API_URL: process.env.API_URL,
    // PUBLIC_URL: process.env.PUBLIC_URL,
    // NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  },
  images: {
    domains: ['i.pravatar.cc'],
  },
};

module.exports = nextConfig;
