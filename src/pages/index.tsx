// import { NextPage } from 'next';
// import {useState} from 'react';
// import {Card, Button, Container, Row, Col} from 'react-bootstrap';

// const _ = require('lodash');

// import Layout from '../components/layout';
// import * as gtag from '../components/gtag'
// import { GaEvent } from '../types';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import styles from '../styles/Home.module.css'
// import moment from 'moment';
// // import Holder from 'react-holder';
// // import JavaScript modules dynamically and work with them. They also work with SSR. only load the module dynamically in the browser 
// // after the user types in the search input https://nextjs.org/docs/advanced-features/dynamic-import
// import dynamic from 'next/dynamic'
// const Holder = dynamic(() => import('react-holder'),   { ssr: false });

// const Home: NextPage = () => {

//     // whatis Record ? object type whose property keys are Keys and whose property values are Type https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type
//     const [message, setMessage] = useState<Record<string, string|number|boolean>>({ 'awesome_attribute': 'hoge'});

//     const handleSubmit = (e: any) => {
//       e.preventDefault()
//       if (!_.isEmpty(message)) {

//         // GAイベントを発火させるevent関数を実行
//         const dummyEvent: GaEvent = {
//           action: 'submit_form',
//           category: 'contact',
//           label: message,
//         };

//         gtag.event(dummyEvent);

//         // clear
//         setMessage({});

//       }
//      };
//   return (
//     <Layout meta={{
//       author: 'EikichiEngineer',
//       title: '経営管理特設サイト ジャリンジャリン稼ぐぜ',
//       date: moment().format('YYYY-MM-DD'),
//       description: '経営管理特設サイト ジャリンジャリン稼ぐぜ'
//     }}>
//       <div className={styles.container}>
//         <h1>サイトマップ</h1>
//         <Container>
//             <Row key="sitemapRow">
//                 <Col sm="auto">
//                   <Card style={{ width: '18rem' }}>
//                     <Card.Header>FXレポート</Card.Header>
//                     <Card.Body>
//                       <Card.Text>ちゃりんちゃりん稼ぐぜ。</Card.Text>
//                       <Button variant="primary" href="/fx-reports/">Open</Button>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//             </Row>
//             <Row key="sitemapRow">
//                 <Col sm="auto">
//                   <Card style={{ width: '18rem' }}>
//                     <Card.Header>なんちゃってFX分析</Card.Header>
//                     <Card.Body>
//                       <Card.Text>分析するぜ</Card.Text>
//                       <Button variant="primary" href="/fx-analysis">Open</Button>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//             </Row>
//         </Container>
//         <form onSubmit={handleSubmit}>
//           <Holder width="100%" height="200px" updateOnResize={true} className={'my-custom-class'} />
//           <button type="submit">submit</button>
//         </form>
//       </div>
//     </Layout>
//   )
// };

// export default Home;

import Head from "next/head";
import { useState } from "react";
import Web3 from "web3";
import Navbar from "../components/Navbar";
import { useData } from "../contexts/DataContext";

export default function Home() {
  const { account, loadWallet, sendPayment, balance } = useData();

  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [button, setButton] = useState("Send");

  return (
    <div className="flex flex-col min-h-screen justify-start bg-gradient-to-b from-gray-800  to-gray-500">
      <Head>
        <title>Peer-to-Peer Payment dApp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <main className="mt-36 flex justify-center items-start">
        <div className="w-full md:w-2/6 bg-gray-800 rounded-3xl p-4 mx-3">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-full flex flex-row justify-between">
              <span className="text-white text-lg text-start">Send Token</span>
              <span className="text-white text-base text-start font-bold font-inconsolata">
                {balance &&
                  `Balance: ${Web3.utils.fromWei(
                    balance.toString(),
                    "ether"
                  )} PAY`}
              </span>
            </div>
            <div className="bg-gray-700 h-20 w-full my-1 border border-gray-600 rounded-3xl flex flex-row justify-between items-center px-4">
              <div className="flex flex-row items-center space-x-2">
                <div className="px-3 py-2 bg-gray-800 rounded-2xl flex flex-row items-center">
                  <span className="text-white text-lg font-bold">
                    PAY Token
                  </span>
                </div>
                <span
                  className="text-white text-base font-bold font-inconsolata cursor-pointer"
                  onClick={() => {
                    setAmount(
                      Web3.utils.fromWei(balance.toString(), "ether").toString()
                    );
                  }}
                >
                  MAX
                </span>
              </div>
              <input
                className="font-inconsolata text-3xl text-white bg-transparent w-2/4 text-right outline-none"
                placeholder="0.0"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#fff"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
              />
            </svg>
            <div className="bg-gray-700 h-20 w-full my-1 border border-gray-600 rounded-3xl flex flex-row justify-between items-center px-3">
              <input
                className="w-full font-inconsolata text-xl text-white bg-transparent outline-none"
                placeholder="Destination Address"
                value={toAddress}
                onChange={(e) => {
                  setToAddress(e.target.value);
                }}
              />
            </div>
            <div className="h-4" />
            <div
              className="h-16 w-full rounded-3xl flex justify-center items-center cursor-pointer"
              style={{ backgroundColor: "#214770" }}
              onClick={async () => {
                setError("");
                if (!account) {
                  setError("Please connect your wallet");
                } else if (amount === "") {
                  setError("Please set amount");
                } else if (toAddress === "") {
                  setError("Please set destination address");
                } else {
                  setButton("Sending...");
                  var msg = await sendPayment({ amount, toAddress });
                  if ((await msg) === "Payment success") {
                    setAmount("");
                    setToAddress("");
                    setButton("Payment Success");
                    setTimeout(() => {
                      setButton("Send");
                    }, 1000);
                    setError("");
                  } else {
                    setError(msg);
                  }
                }
              }}
            >
              <span className="font-semibold text-xl text-blue-300">
                {button}
              </span>
            </div>
            {error && <span className="text-red-600 font-bold">*{error}</span>}
          </div>
        </div>
      </main>
    </div>
  );
}

