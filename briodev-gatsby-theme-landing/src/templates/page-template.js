import React from "react"
import { graphql } from "gatsby"
import MDXRenderer from "gatsby-plugin-mdx/mdx-renderer"
import { MDXProvider } from "@mdx-js/react"
import styled from '@emotion/styled'
import Img from 'gatsby-image'
import Layout from '../layouts/default-page-layout'
import PreviousNext from '../components/previousNext'
import SEO from '../components/seo'

import Box from '../components/shortcodes/ui-test'
import Title from '../components/shortcodes/title'
import ContactFull from '../components/shortcodes/contact-full'

const shortcodes = { Box, Title, ContactFull}


export default ({data}) => {

  const page = data.mdxLandingPage
  const site = data.site.siteMetadata


  const image = page.headerImage ? page.headerImage.childImageSharp.fluid : null
  const description = page.description || site.description
  const keywords = page.keywords || site.keywords
  const canonical = page.canonical ? `${page.canonical}` : `${site.siteUrl}${page.slug}` || site.siteMetadata.siteUrl
  const twitterCreator = page.twitterCreator || site.twitter.creator

  const previous = data.previous
  const next = data.next
  
  const isArticle = page.article || false

  return (
    <>
      <SEO 
        canonical={canonical}
        title = {page.title}
        description = {description}
        keywords = {keywords}
        image = {image}
        twitterCreator = {twitterCreator}
        slug = {page.slug}
      />
      <Layout>
        <HeaderImage>{ image ? (<Img fluid={image} />):null }</HeaderImage>
        <PostWrapper>
          <Heading>{page.title}</Heading>

          <Body>
            <MDXProvider components={shortcodes}>
              <MDXRenderer>{page.body}</MDXRenderer>
            </MDXProvider>
          </Body>

        </PostWrapper>
        <PreviousNext previous={previous} next={next} />
      </Layout>
    </>
  )
}

export const pageQuery = graphql`
  query LandingPageQuery($id: String!, $previousId: String, $nextId: String) {
    site {
      siteMetadata {
        siteUrl
        title
        description
        keywords
        twitter {
          creator
        }
      }
    }
    mdxLandingPage(id: { eq: $id }) {
      id
      excerpt
      body
      slug
      title
      description
      headerImage {
          childImageSharp {
            fluid(maxWidth: 1920, quality: 90) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      tags
      keywords
      canonical
      date(formatString: "MMMM DD, YYYY")
    }
    previous: mdxLandingPage(id: { eq: $previousId }) {
      id
      excerpt
      slug
      title
      date(formatString: "MMMM DD, YYYY")
    }
    next: mdxLandingPage(id: { eq: $nextId }) {
      id
      excerpt
      slug
      title
      date(formatString: "MMMM DD, YYYY")
    }
    
  }
`

const PostWrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(1.2rem, 1fr) minmax(auto, 3fr) minmax(1.2rem, 1fr);
`

const Heading = styled.h1`
  grid-column: 2;
`

const Body = styled.article`
  font-family: -apple-system, BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  grid-column: 2;
`


const HeaderImage = styled.div`
  grid-column: 1 / 4;
  width: 100%;
  max-width: 100vw;
  justify-self: center;
`