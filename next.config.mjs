/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "burst.shopifycdn.com",
      "plus.unsplash.com",
      "images.unsplash.com",
    ], // Înlocuiește "example.com" cu domeniul real dacă este diferit
  },
};

export default nextConfig;
