/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups", // Fix for Google OAuth popups
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp", // Ensures security but allows popups
          },
        ],
      },
    ];
  },
  // output: "export",
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
