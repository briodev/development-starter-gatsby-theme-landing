module.exports = {
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
      {
        resolve: "briodev-gatsby-theme-landing",
        options: {
          contentPath: "content/landing-pages",
          basePath: "/landing-pages",
        }
      },

    ]
}