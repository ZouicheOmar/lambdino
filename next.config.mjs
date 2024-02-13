/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_AWS_BUCKET_URL,
        pathname: "/media/**",
      },
    ],
  },
  reactStrictMode: false,
}

export default nextConfig
