import React, {useEffect} from 'react'

import Layout from '../components/layout'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Carousel, Card, Button, Container, Row, Col} from 'react-bootstrap';
import { run as runHolder } from 'holderjs/holder';
import MyPlaygroundMap from '../components/my-playgrounds/my-playground-map';

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
                  <Col sm="auto">
                    <Card style={{ width: '18rem' }}>
                      <Card.Header>プレイグラウンド</Card.Header>
                      <Card.Body>
                        <Card.Text>ちゃらんぽらん遊ぶぜ</Card.Text>
                        <Button variant="primary" href="/my-playgrounds/">Open</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col sm="auto">
                    <Card style={{ width: '18rem' }}>
                      <Card.Header>所持品</Card.Header>
                      <Card.Body>
                        <Card.Text>倒すと手に入ります</Card.Text>
                        <Button variant="primary" href="/my-bags/">Open</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col sm="auto">
                    <Card style={{ width: '18rem' }}>
                      <Card.Header>お気に入り</Card.Header>
                      <Card.Body>
                        <Card.Text>QRコードのデジタルサイネージ</Card.Text>
                        <Button variant="primary" href="/digital-signages/">Open</Button>
                      </Card.Body>
                    </Card>
                  </Col>
              </Row>
          </Container>
        </section>
        <section>
          <h1>スポット</h1>
          <Carousel style={{width: '100%'}}>
            <Carousel.Item>
                <img className="d-block w-100" src="holder.js/300x500?text=*&bg=cccccc" alt="202011"/>
                <Carousel.Caption>
                    <MyPlaygroundMap zoom={15} width={250} height={250} latitude={35.69591109932402} longitude={139.7013029029837}>焼肉 にくの音<br/>(2020.11)</MyPlaygroundMap>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src="holder.js/300x500?text=*&bg=cccccc" alt="202102"/>
                <Carousel.Caption as="div">
                  <MyPlaygroundMap zoom={15} width={250} height={250} latitude={35.697976} longitude={139.704339}>焼肉ますお<br/>(2021.02)</MyPlaygroundMap>
                </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </section>

      </Layout>
    )
}

export default IndexPage
