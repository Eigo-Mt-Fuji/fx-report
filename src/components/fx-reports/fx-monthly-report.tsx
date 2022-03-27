import React, {useState} from 'react';
import { useStaticQuery, graphql } from 'gatsby'

import PropTypes from 'prop-types'

import {Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import formatFxDailyTransactions from '../../models/fx-reports/formatFxDailyTransactions';
import formatFxWeeklyTransactions from '../../models/fx-reports/formatFxWeeklyTransactions';
import calculateFxProfitLossTicks from '../../models/fx-reports/calculateFxProfitLossTicks';

import FxMonthlyComopsedChart from './fx-monthly-composed-chart';
import FxTransactionsTable from './fx-transactions-table';
import {FxMonthlyReportProps} from '../../types';

const FxMonthlyReport = (props: FxMonthlyReportProps) => {

    const [aggregate, setAggregate] = useState<string|null>(props.aggregate);

    const transactions = useStaticQuery(graphql`{
        allFxTransactionsData {
            nodes {
                items {
                    date
                    buysell
                    price
                    total_pl
                }
            }
        }
    }`)
    const daily = formatFxDailyTransactions(transactions, props.month);
    const data = aggregate === 'weekly' ? formatFxWeeklyTransactions(transactions, props.month) : daily;
    const ticks = calculateFxProfitLossTicks(data, 4);

    return (
        <>
            <Nav variant="pills" defaultActiveKey={aggregate} onSelect={ (eventKey: string|null, _event) => { setAggregate(eventKey) }}>
                <Nav.Item>
                    <Nav.Link eventKey="weekly">週足</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="daily">日足</Nav.Link>
                </Nav.Item>
            </Nav>
            <div style={{ width: '100%', height: 500 }}>
                <FxMonthlyComopsedChart data={data} ticks={ticks}></FxMonthlyComopsedChart>
            </div>
           <FxTransactionsTable month={props.month} data={daily}></FxTransactionsTable>
        </>
    );
}

FxMonthlyReport.propTypes = {
    aggregate: PropTypes.string.isRequired,
    month: PropTypes.string.isRequired,
};

export default FxMonthlyReport
