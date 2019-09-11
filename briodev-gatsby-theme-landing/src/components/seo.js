import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { StaticQuery, graphql } from "gatsby"

function SEO({ 
  canonical,
  slug,
  meta, 
  title, 
  description, 
  keywords,
  image,
  lang, 
  article,
  twitterCreator,
}) {

  return (
    <StaticQuery
      query={detailsQuery}
      render={ data => {
 
        const metaDescription = description || data.site.siteMetadata.description
        const metaTitle = title || data.site.siteMetadata.title
        const metaKeywords = keywords || data.site.siteMetadata.keywords

        // Determine what canonical url to use
        let url = ''
        if(canonical) {
          url = canonical
        }else{
          if(slug) {
            url = `${data.site.siteMetadata.siteUrl}${data.sitePlugin.pluginOptions.basePath}${slug}`
          }else{
            url = `${data.site.siteMetadata.siteUrl}${data.sitePlugin.pluginOptions.basePath}`
          }
        }

        return (
            <Helmet
              htmlAttributes={{
                lang,
              }}
              title={title}
              link={[{ rel: 'canonical', href: url }]}

              meta={[
                {
                  name: `description`,
                  content: metaDescription,
                },
                {
                  name: `keywords`,
                  content: metaKeywords.join(`, `)
                },
                {
                  property: `og:url`,
                  content: url,
                },
                {
                  property: `og:title`,
                  content: metaTitle,
                },
                {
                  property: `og:description`,
                  content: metaDescription,
                },
                {
                  property: `og:type`,
                  content: article ? 'article' : 'website',
                },
                // Twitter section
                {
                  name: `twitter:card`,
                  content: image ? 'summary_large_image' : 'summary',
                },
                {
                  name: `twitter:site`,
                  content: data.site.siteMetadata.twitter.site,
                },
                {
                  name: `twitter:creator`,
                  content: twitterCreator ? twitterCreator : data.site.siteMetadata.twitter.creator,
                },
                {
                  name: `twitter:title`,
                  content: metaTitle,
                },
                {
                  name: `twitter:description`,
                  content: metaDescription,
                }
              ]
                .concat(meta)}
            />
        )
      }}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  image: {},
}

SEO.propTypes = {
  canonical: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  image: PropTypes.object,
  article: PropTypes.bool,
  lang: PropTypes.string,
  twitterCreator: PropTypes.string
}

export default SEO

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        siteUrl
        title
        description
        keywords,
        author
        twitter {
          site
          creator
        }
      }
    }
    sitePlugin(name: {eq: "briodev-gatsby-theme-landing"}) {
      pluginOptions {
        basePath
      }
    }
  }
`
