import React from 'react';
// TODO: replace using nextjs component or plain html component
import { useStaticQuery, graphql } from 'gatsby';
import formatFxMonthlyTransactionsStacked from '../../models/fx-reports/formatFxMonthlyTransactionsStacked';
import formatFxProfitLossYen from '../../models/fx-reports/formatFxProfitLossYen';
import PropTypes from 'prop-types'
import {
    FxTransactionsData, 
    FxMonthlyTransactionsResponse, 
    FxAnnualChartProps,
} from '../../types';
import FxAnnualStackedBarChart from './fx-annual-stacked-barchart';

const FxAnnualReport = (props: FxAnnualChartProps) => {
    
    // TODO: replace using nextjs component or plain html component
    const transactions:FxTransactionsData = useStaticQuery(graphql`{
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
    const res: FxMonthlyTransactionsResponse = formatFxMonthlyTransactionsStacked(transactions, props.year, props.dream);
    
    const actualSum: number  = res.actualSum;
    const lastTransactionDateComment: string = res.lastTransactionDateComment;
    const ticks =  [0, props.dream / 4, props.dream / 2, 3 * props.dream / 4, props.dream]
    return (
        <div>
            <div>目標: <span style={{'fontSize':'25px', 'fontWeight': 'bold'}}>{formatFxProfitLossYen(props.dream)}</span></div>
            <div>実績: <span style={{'fontSize':'25px', 'fontWeight': 'bold'}}>{formatFxProfitLossYen(actualSum)}</span><span>{lastTransactionDateComment}</span></div>
            <div style={{ width: '100%', height: 500 }}>
                <FxAnnualStackedBarChart data={res.data[0]} profitKeys={res.profitKeys} ticks={ticks} />
            </div>
        </div>
    );
};

FxAnnualReport.propTypes = {
    year: PropTypes.string.isRequired,
    dream: PropTypes.number.isRequired,
};
export default FxAnnualReport;