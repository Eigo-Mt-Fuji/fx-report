import type { NextPage } from 'next'
import {useEffect} from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Button, Container, Row, Col} from 'react-bootstrap';
import { run as runHolder } from 'holderjs/holder';

const Home: NextPage = () => {
  useEffect( () => {

    runHolder('d-block');
  }); 
  return (
    <div className={styles.container}>
      <Head style={{
        background: 'rebeccapurple',
        marginBottom: '1.45rem',
      }}
        <div
          style={{
            margin: '0 auto',
            maxWidth: 960,
            padding: '1.45rem 1.0875rem',
          }}
        >
          <h1 style={{ margin: 0 }}>
            <!-- TODO: replace code using nextjs component or plain html -->
            <Link
              to="/"
              style={{
                color: 'white',
                textDecoration: 'none',
              }}
            >fx-report
            </Link>
          </h1>
        </div>
      </Head>

      <div style={{marginTop: '20px', marginBottom: '20px'}}>
        <Nav className="justify-content-end" activeKey="/">
          <Nav.Item>
            <Nav.Link href="/">HOME</Nav.Link>
          </Nav.Item>
        </Nav>
      <main className={styles.main}>
        <h1>サイトマップ</h1>
        <Container>
            <Row key="sitemapRow">
                <Col sm="auto">
                  <Card style={{ width: '18rem' }}>
                    <Card.Header>FXレポート</Card.Header>
                    <Card.Body>
                      <Card.Text>ちゃりんちゃりん稼ぐぜ。</Card.Text>
                      <Button variant="primary" href="/fx-reports/">Open</Button>
                    </Card.Body>
                  </Card>
                </Col>
            </Row>
        </Container>
      </main>

      <footer className={styles.footer}>
        <!-- TODO: replace using nextjs component or plain html component -->
        © {new Date().getFullYear()}, {data.site.siteMetadata?.author ||'fujio'}
      </footer>
    </div>
q  )
}

export default Home
