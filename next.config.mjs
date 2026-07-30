import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Static export for GitHub Pages hosting.
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
};

export default withMDX(config);
