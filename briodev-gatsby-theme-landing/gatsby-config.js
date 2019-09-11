const withDefaults = require(`./utils/default-options`)

module.exports = themeOptions => {
  const options = withDefaults(themeOptions)
  const { mdx = true } = themeOptions
  
  return {
    siteMetadata: {
      title: `BrioDev Starter Theme`,
      description: `A simple starter blog with image and SEO`,
      keywords: ['BrioDev', 'Gatsby Blog', 'Gatsby Theme' ],
      siteUrl: 'https://brio.dev',
      social: [
        {
          name: `Twitter`,
          url: `https://twitter.com/briodev`,
        },
        {
          name: `GitHub`,
          url: `https://github.com/briodev`,
        },
      ],
      twitter: {
        site: '@briodev',
        creator: '@briodev' //This can be overwritten in SEO by the author twitter account
      },
      author: `BrioDev - https://brio.dev`,
    },
    plugins: [
      `gatsby-plugin-react-helmet`,
      "gatsby-plugin-theme-ui",
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: options.contentPath || `src/content/posts`,
          path: options.contentPath || `src/content/posts`,
        },
      },
      'gatsby-plugin-sharp',
      'gatsby-transformer-sharp',
      {
        resolve: `gatsby-transformer-remark`,
        options: {
          plugins: [ `gatsby-remark-images` ],
        },
      },
      {
        resolve: `gatsby-plugin-mdx`,
        options: {
          extensions: [`.mdx`, `.md`],
          gatsbyRemarkPlugins: [
            {
              resolve: `gatsby-remark-images`,
              options: {
                maxWidth: 1090,
              },
            },
          ],
          defaultLayouts: {
            posts: require.resolve("./src/templates/page-list-template.js"),
            default: require.resolve("./src/layouts/default-page-layout.js"),
          },
        },
      },
    ],
  }
}