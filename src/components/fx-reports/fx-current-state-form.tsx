import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Form } from 'react-bootstrap';
import {FxCurrentStateHookContext, FxCurrentStateFormProps} from '../../types';
import useFxCurrentState from '../../hooks/fx-reports/fx-current-state-form-hooks';

const FxCurrentStateForm = (props: FxCurrentStateFormProps) => {

    const {
        currentState,
        onChangeDeposit,
        onChangeValuationGainLoss,
        onChangeBuyPosition,
        onChangeSellPosition,
        onChangeRequiredDeposit
    }: FxCurrentStateHookContext = useFxCurrentState(props);

    const handleChangeCallback = props.handleChangeCallback;
    useEffect( () => {
        handleChangeCallback(currentState);
    }, [currentState, handleChangeCallback]);

    return (
        <Form>
            <Form.Group as={Row} controlId="deposit" key="deposit">
                <Form.Label column sm={2}>
                預託保証金(円)
                </Form.Label>
                <Col sm={2}>
                    <Form.Control type="number" placeholder="預託保証金" value={props.deposit} onChange={onChangeDeposit}/>
                </Col>
                <Form.Label column sm={2}>
                評価損益(円)
                </Form.Label>
                <Col sm={2}>
                    <Form.Control type="number" placeholder="評価損益" value={props.valuationGainLoss} onChange={onChangeValuationGainLoss}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="position" key="position">
                <Form.Label column sm={2}>
                買い
                </Form.Label>
                <Col sm={2}>
                    <Form.Control type="number" placeholder="買いポジション" value={props.buyPosition} onChange={onChangeBuyPosition} />
                </Col>
                <Form.Label column sm={2}>
                売り
                </Form.Label>
                <Col sm={2}>
                    <Form.Control type="number" placeholder="売りポジション" value={props.sellPosition} onChange={onChangeSellPosition} />
                </Col>
                <Form.Label column sm={2}>
                必要保証金
                </Form.Label>
                <Col sm={2}>
                    <Form.Control type="number" placeholder="必要保証金" value={props.requiredDeposit} onChange={onChangeRequiredDeposit}/>
                </Col>
            </Form.Group>
        </Form>
    );
};

export default FxCurrentStateForm;