import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import { ThemeProvider } from 'theme-ui'
import Prism from '@theme-ui/prism'
import theme from '../gatsby-plugin-theme-ui/index'

import Header from "../components/header"
import "./layout.css"

const components = {
  pre: ({ children }) => <>{children}</>,
  code: Prism,
}

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <ThemeProvider theme={theme} components={components}>
        <Header siteTitle={data.site.siteMetadata.title}/>
        {children}
      </ThemeProvider>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
