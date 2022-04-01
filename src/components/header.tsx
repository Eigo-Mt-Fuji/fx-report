// TODO: how to customize https://nextjs.org/docs/api-reference/next/link
import Link from 'next/link'
import PropTypes from 'prop-types'
import React from 'react'

import {Nav} from 'react-bootstrap';

const Header = ({ siteTitle }: any) => (
  <>

      <header
        style={{
          background: 'rebeccapurple',
          marginBottom: '1.45rem',
        }}
      >
        <div
          style={{
            margin: '0 auto',
            maxWidth: 960,
            padding: '1.45rem 1.0875rem',
          }}
        >
          <h1 style={{ margin: 0 }}>
            <Link href="/">
              {siteTitle}
            </Link>
          </h1>
        </div>
      </header>
      <div style={{marginTop: '20px', marginBottom: '20px'}}>
        <Nav className="justify-content-end" activeKey="/">
          <Nav.Item>
            <Nav.Link href="/">HOME</Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    </>

)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: '',
}

export default Header
