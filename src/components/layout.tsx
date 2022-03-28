/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import SEO from './seo';
import Header from './header'
import './layout.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './neumorphism.css';

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
          author
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || 'Title'}>
      </Header>
      <div
        style={{
          margin: '0 auto',
          maxWidth: 960,
          width: '100vw',
          padding: '0 1.0875rem 1.45rem',
        }}
      >
        <main>
          <SEO 
             title={data.site.siteMetadata?.title||'portfolio-2021'}
             description={data.site.siteMetadata?.description||'経営管理特設サイト ジャリンジャリン稼ぐぜ'}
          />
          {children}
        </main>
        <footer
          style={{
            marginTop: '2rem',
          }}
        >
          © {new Date().getFullYear()}, {data.site.siteMetadata?.author ||'fujio'}
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
