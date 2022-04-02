import React from 'react'
import SEO from './seo';
import Header from './header'

interface LayoutProps {

  children: any;
}
const Layout = ({ children } : LayoutProps) => {

  return (
    <>
      <Header siteTitle='Title'>
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
          <SEO  title='portfolio-2021' description='経営管理特設サイト ジャリンジャリン稼ぐぜ' />
          {children}
        </main>
        <footer
          style={{
            marginTop: '2rem',
          }}
        >
          © {new Date().getFullYear()},fujio
        </footer>
      </div>
    </>
  )
}

export default Layout
