/** @type {import('next').NextConfig} */
const nextConfig = {
  // APIルートが正しく処理されるように設定
  experimental: {
    // App Routerを使用
    appDir: true,
  },
  // Vercel環境で正しく動作するように
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
