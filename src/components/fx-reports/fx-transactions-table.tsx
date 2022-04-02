import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Alert } from 'react-bootstrap';

import formatFxProfitLossYen from '../../models/fx-reports/formatFxProfitLossYen';
import {FxTransactionsTableProps} from '../../types';

const FxTransactionsTable: (props: FxTransactionsTableProps) => any = (props: FxTransactionsTableProps) => {

    const renderRow = (d: any) => {
        
        return (
            <Row key={d.name}>
                <Col>{d.name}</Col>
                <Col>{formatFxProfitLossYen(d.profit)}</Col>
            </Row>
        );
    };
    return (
        <>
            <Alert key="info" variant="info">
                {props.month}の取引明細
            </Alert>
            <Container>
                {props.data.map( (d) => renderRow(d) )}
            </Container>
        </>
    );
};

export default FxTransactionsTable;
