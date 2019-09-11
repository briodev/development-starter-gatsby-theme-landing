import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Layout from '../layouts/default-page-layout';
import PageList from '../components/page-list';

const PagesTemplate = (path) => {
  const data = useStaticQuery(graphql`
    query LandingPagesQuery {
      site {
        siteMetadata {
          title
          social {
            name
            url
          }
        }
      }
      allLandingPage(sort: { fields: [date, title], order: DESC }, limit: 1000) {
        edges {
          node {
            id
            excerpt
            slug
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  `)

  const pages = data.allLandingPage.edges
  return (
    <Layout>
      {/* { JSON.stringify(pages, null, 2) } */}
      <PageList pages={pages}/>
    </Layout>
  )
}

export default PagesTemplate
