/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@clerk/nextjs"], // Helps Clerk work with App Router + Edge Middleware
  experimental: {
    runtime: "edge", // Ensures Edge-compatible modules
  },
  images: {
    domains: ["images.clerk.dev", "lh3.googleusercontent.com"], // Optional: Clerk avatar/image support
  },
};

export default nextConfig;
