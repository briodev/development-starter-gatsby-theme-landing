import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import { Styled } from 'theme-ui'
import {Container} from 'theme-ui'

import SEO from './seo'

export default (props) => {
  const pages = props.pages
  return (
      <>
        <SEO title="Landing" />
        <Container>
            <h1>Landing Pages</h1>
            {pages ? pages.map(({ node }) => (
              <div key={node.id}>
                <Styled.a as={Link} to={`${node.slug}`}>
                  <MarkerHeader>{node.title} </MarkerHeader>
                </Styled.a>
                <div>
                  <ArticleDate>{node.date}</ArticleDate>
                  <ReadingTime>&nbsp;-&nbsp;{node.timeToRead}&nbsp;min read</ReadingTime>
                </div>
                <Excerpt>{node.excerpt}</Excerpt>
              </div>
            )): null }
          </Container>
      </>
  )
}

const ArticleDate = styled.h5`
  display: inline;
  color: #606060;
  margin-bottom: 10px;
`

const MarkerHeader = styled.h3`
  display: inline;
  border-radius: 1em 0 1em 0;
  margin-bottom: 10px;
`

const ReadingTime = styled.h5`
  display: inline;
  color: #606060;
  margin-bottom: 1em;
  margin-left: .5em;
`

const Excerpt = styled.div`
    margin: 1em 0 2em 0;
    font-family: -apple-system, BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
`