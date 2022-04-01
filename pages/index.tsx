import type { NextPage } from 'next'
import {useState, useEffect} from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

import 'bootstrap/dist/css/bootstrap.min.css';
import {Nav, Card, Button, Container, Row, Col} from 'react-bootstrap';
import { run as runHolder } from 'holderjs/holder';

import * as gtag from '../components/gtag'
import { GaEvent } from '../types';
const _ = require('lodash');

const Home: NextPage = () => {

    // whatis Record ? object type whose property keys are Keys and whose property values are Type https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type
    const [message, setMessage] = useState<Record<string, string|number|boolean>>({ 'awesome_attribute': 'hoge'});

    const handleSubmit = (e: any) => {
      e.preventDefault()
      if (!_.isEmpty(message)) {

        // GAイベントを発火させるevent関数を実行
        const dummyEvent: GaEvent = {
          action: 'submit_form',
          category: 'contact',
          label: message,
        };

        gtag.event(dummyEvent);

        // clear
        setMessage('');

      }
    };
  useEffect( () => {

    runHolder('d-block');
  }); 
  return (
    <div className={styles.container}>
      <Head style={{ background: 'rebeccapurple', marginBottom: '1.45rem'}}>
        <div style={{margin: '0 auto', maxWidth: 960, padding: '1.45rem 1.0875rem',}}>
          <h1 style={{ margin: 0 }}>
            <Link href="/"><a>Home</a></Link>
          </h1>
        </div>
      </Head>

      <div style={{marginTop: '20px', marginBottom: '20px'}}>
        <Nav className="justify-content-end" activeKey="/">
          <Nav.Item>
            <Nav.Link href="/">HOME</Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
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
        <form onSubmit={handleSubmit}>
          <button type="submit">submit</button>
        </form>
      </main>

      <footer className={styles.footer}>
        © {new Date().getFullYear()}, {'fujio'}
      </footer>
    </div>
  )
}

export default Home
