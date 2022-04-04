import React from 'react'
import SEO from './seo';
import Header from './header'

interface LayoutMetaData {
  title: string;
  description: string;
  author: string;
  date: string;
}
interface LayoutProps {

  children: any;
  meta: LayoutMetaData;
}
const Layout = ({ children, meta } : LayoutProps) => {

  return (
    <>
      <Header siteTitle={meta.title}>
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
          <SEO  title={meta.title} description={meta.description} />
          {children}
        </main>
        <footer
          style={{
            marginTop: '2rem',
          }}
        >
          © {meta.date},{meta.author}
        </footer>
      </div>
    </>
  )
}

export default Layout
