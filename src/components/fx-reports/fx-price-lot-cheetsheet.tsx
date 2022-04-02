import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { request } from 'graphql-request';
import moment from 'moment';

import exchangeRatesApi from '../../models/fx-reports/exchangeRatesApi';
import calculateFxLotEstimate from '../../models/fx-reports/calculateFxLotEstimate';
import formatFxProfitLossYen from '../../models/fx-reports/formatFxProfitLossYen';
import FxPriceLot from './fx-price-lot';
import FxCurrentStateForm from './fx-current-state-form';

// TODO: gatsby graphql, gatsby-source-graphcms, graphql-request, jdbc connectの違いと、graphqlのクエリ実行をするのに一番適した方法を知りたい
const FxPriceLotCheetSheet = () => {
    const [latestRate, setLatestRate] = useState<any>(null);
    // 予算で購入可能なロット数の範囲で、現在のポジション状況を踏まえて預託保証金率を計算・許容範囲の判定
    const [currentState, setCurrentState]  = useState<any>(null);
    const budget: number = 100000;
    const allowedDepositRate = 180;
    const handleCurrentStateChange = (state: any) => {
        console.log(state);
        setCurrentState(state);
    };

    const renderEstimateLotResults = (results: any[]) => {
        return results.map( (result: any, index: number) => {
            // TODO: control col hidden on small devices
            return (
                <Row key={`estimateLotPattern${index}`}>
                    <Col>ロット数: {result.lot}</Col>
                    <Col>追証: {result.additionalRequiredDeposit}</Col>
                    <Col>保証金率: {result.estimateRate}</Col>
                    <Col>許容: {result.isAllowed ? 'OK' : 'NG'}</Col>
                    <Col>合計ポジション: 買{result.positionForecast.buy}, 売:{result.positionForecast.sell}</Col>                    
                </Row>
            );
        });
    };

    useEffect(() => {
        async function fetchLatestFxState(endpoint: string) {
            const data = await request(
                endpoint,
                `
                query LatestFxState {
                    fxCurrentStates(orderBy : timestamp_DESC, first: 1) {
                      id
                      deposit
                      valuationGainLoss
                      requiredDeposit
                      buyPosition
                      sellPosition
                      timestamp
                    }
                  }          
            `
            );
        
            setCurrentState(data.fxCurrentStates[0]);
        }
        async function fetchLatestRate() {

            const response = await exchangeRatesApi('http://api.exchangeratesapi.io', '/v1/latest', 'USD');
            setLatestRate(response);
        }
        if (!latestRate) {
            
            fetchLatestRate();
        }
        if (!currentState) {
            
            const endpoint: string|undefined = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
            if (endpoint) {
                fetchLatestFxState(endpoint);
            }
        }
    });
    
    if (!latestRate || !currentState) {

        return (<div style={{width: '500px', height: '500px'}}>ロード中...</div>);
    }
    const rate = Math.floor(latestRate.rates.JPY * 1000) / 1000;

    const estimateResults: any[] = calculateFxLotEstimate(
        rate, 
        currentState,
        budget, 
        10000, 
        25, 
        allowedDepositRate
    );
    console.log(estimateResults);
    return (
        <div style={{width: '100%', marginBottom: '20px'}}>
            <Container style={{marginTop:'20px', paddingTop: '5px'}}>
                <Row key="lotEstimateTableTitle">
                    <Col><p>現在の取引状況と、購入可能なロット数＋預託保証金率の早見表です。</p></Col>
                </Row>
                <Row key="lotEstimateTableDescription">
                    <Col>
                        <p style={{fontSize: '14px', marginBottom: '5px'}}>※ロット数...予備の予算{formatFxProfitLossYen(`${budget}`)}で追加購入可能なロット数を5ロット単位で計算しています。</p>
                        <p style={{fontSize: '14px', marginBottom: '5px'}}>※許容OK/NG... 預託保証金率 {allowedDepositRate}% に収まるか為替レートから自動計算しています。</p>
                        <p style={{fontSize: '14px', marginBottom: '5px'}}>※{latestRate.date}時点為替レート 1USD={rate}円 を元に算出しています。</p>
                        <p style={{fontSize: '14px', marginBottom: '5px'}}>※現在取引状況のフォームには {moment(currentState.timestamp).format('YYYY-MM-DD')}時点の取引状況を初期表示しています。</p>
                    </Col>
                </Row>
            </Container>
            <FxCurrentStateForm 
                deposit={currentState.deposit} 
                valuationGainLoss={currentState.valuationGainLoss} 
                requiredDeposit={currentState.requiredDeposit} 
                buyPosition={currentState.buyPosition} 
                sellPosition={currentState.sellPosition} 
                timestamp={currentState.timestamp} 
                handleChangeCallback={handleCurrentStateChange}></FxCurrentStateForm>
            <Container style={{marginTop:'20px', paddingTop: '5px'}}>
              {renderEstimateLotResults(estimateResults)}
            </Container>

            <Alert variant="info">短期トレードの利益で追加取引可能なロット数の参考値です。</Alert>
            <Container>
                <Row  key="pattern1">
                    <Col>25万円(2週間の利益目標)</Col>
                    <Col><FxPriceLot money_jpy="250000" rate={`${rate}`} /></Col>
                </Row>
                <Row key="pattern3">
                    <Col>50万円(1ヶ月分の利益目標)</Col>
                    <Col><FxPriceLot money_jpy="500000" rate={`${rate}`} /></Col>
                </Row>
            </Container>
        </div>
    )
};

export default FxPriceLotCheetSheet;