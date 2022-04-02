/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.mdx/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: '@mdx-js/loader',
          options: { remarkPlugins: [gfm] }
        },
      ],
    })

    return config
  },
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
