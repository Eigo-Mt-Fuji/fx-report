/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx']
}

const withMDX = require('@next/mdx')({
  // .md or .mdx
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    // use `MDXProvider` https://mdxjs.com/docs/using-mdx/    
    // providerImportSource: "@mdx-js/react",
  }
});
module.exports = withMDX(nextConfig);
