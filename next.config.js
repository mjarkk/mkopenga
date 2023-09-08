const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/,
    options: {
      remarkPlugins: [],
      rehypePlugins: [],
      // If you use `MDXProvider`, uncomment the following line.
      // providerImportSource: "@mdx-js/react",
    },
  })

  /** @type {import('next').NextConfig} */
  const nextConfig = {
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    reactStrictMode: true,
  }

  // Merge MDX config with Next.js config
  module.exports = withMDX(nextConfig)
