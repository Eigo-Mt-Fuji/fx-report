import { NextPage } from 'next';
import {useState} from 'react';
import {Card, Button, Container, Row, Col} from 'react-bootstrap';

const _ = require('lodash');

import Layout from '../components/layout';
import * as gtag from '../components/gtag'
import { GaEvent } from '../types';

import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/Home.module.css'
import moment from 'moment';
// import Holder from 'react-holder';
// import JavaScript modules dynamically and work with them. They also work with SSR. only load the module dynamically in the browser 
// after the user types in the search input https://nextjs.org/docs/advanced-features/dynamic-import
import dynamic from 'next/dynamic'
const Holder = dynamic(() => import('react-holder'),   { ssr: false });

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
        setMessage({});

      }
     };
  return (
    <Layout meta={{
      author: 'EikichiEngineer',
      title: '経営管理特設サイト ジャリンジャリン稼ぐぜ',
      date: moment().format('YYYY-MM-DD'),
      description: '経営管理特設サイト ジャリンジャリン稼ぐぜ'
    }}>
      <div className={styles.container}>
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
            <Row key="sitemapRow">
                <Col sm="auto">
                  <Card style={{ width: '18rem' }}>
                    <Card.Header>なんちゃってFX分析</Card.Header>
                    <Card.Body>
                      <Card.Text>分析するぜ</Card.Text>
                      <Button variant="primary" href="/fx-analysis">Open</Button>
                    </Card.Body>
                  </Card>
                </Col>
            </Row>
        </Container>
        <form onSubmit={handleSubmit}>
          <Holder width="100%" height="200px" updateOnResize={true} className={'my-custom-class'} />
          <button type="submit">submit</button>
        </form>
      </div>
    </Layout>
  )
};

export default Home;
