/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // experimental: { esmExternals: true },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // externals configuration option provides a way of excluding dependencies from the output bundles
    config.externals.push('canvas');
    config.externals.push('commonjs');
    // IgnorePlugin prevents the generation of modules for import or require calls matching the regular expressions or filter functions:
    config.plugins.push(new webpack.IgnorePlugin({ resourceRegExp: /holderjs/ }));
    // whatis webpack null-loader: webpack loader that returns an empty module 
    // whatis webpack module.rules: An array of Rules which are matched to requests when modules are created.
    // These rules can modify how the module is created. They can apply loaders to the module, or modify the parser 
    config.module.rules.push(
      {
          test: /holderjs/,
          loader: 'null-loader',
      }
    );
    return config
  },
}

const withMDX = require('@next/mdx')({
  // .md or .mdx
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  }
});
module.exports = withMDX(nextConfig);
