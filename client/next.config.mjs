/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: [
        "res.cloudinary.com", // Only Cloudinary domain
      ],
    },
  };
  
  export default nextConfig;
  