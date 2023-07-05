import bundleAnalyzer from '@next/bundle-analyzer'
import nextMDX from '@next/mdx'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'

const isProduction = process.env.NODE_ENV === 'production'

const pageExtensions = ['ts', 'tsx', 'js', 'jsx'].reduce((acc, ext) => {
  if (!isProduction) {
    acc.push(`dev.${ext}`)
  }
  acc.push(ext)
  return acc
}, [])

const withBundleAnalyzer = isProduction
  ? bundleAnalyzer({
      enabled: process.env.ANALYZE === 'true',
    })
  : config => config

/**
 * MDX Configuration
 * We are using you use remark-gfm, you'll need to use next.config.mjs
 * @see {https://nextjs.org/docs/advanced-features/using-mdx}
 * @see {https://mdxjs.com/docs/}
 */
const withMDX = nextMDX({
  extension: /\.(md|mdx)$/,
  options: {
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure pageExtensions to include md and mdx
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}
// End MDX configuration

const defaultConfig = {
  pageExtensions,
  images: {
    domains: ['lh3.googleusercontent.com', 'storage.googleapis.com'],
  },
  compiler: {
    styledComponents: true,
  },
  ...withMDX(nextConfig),
}

export default withBundleAnalyzer(defaultConfig)
