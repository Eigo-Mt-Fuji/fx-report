import React, {useEffect} from 'react'

import Layout from '../components/layout'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Carousel, Card, Button, Container, Row, Col} from 'react-bootstrap';
import { run as runHolder } from 'holderjs/holder';

const IndexPage: () => any = ()=> {
  
  useEffect( () => {

    runHolder('d-block');
  }); 
  return (
      <Layout>
        <section>
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
        </section>
      </Layout>
    )
}

export default IndexPage
