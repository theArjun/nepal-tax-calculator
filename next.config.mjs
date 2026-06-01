/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export — deploys as plain files to GitHub Pages (same as the old static site).
  output: "export",
  // Served at the root of a custom domain, so no basePath/assetPrefix.
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
