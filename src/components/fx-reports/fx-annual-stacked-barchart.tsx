import React from 'react';
import PropTypes from 'prop-types'

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { FxMonthlyTransactionsProfitKey, FxMonthlyTransactionsDataEntry, FxAnnualStackedBarChartProps } from '../../types';
import formatFxProfitTickLabel from '../../models/fx-reports/format-fx-profit-tick-label';

import FxProfitLossLabel from './fx-profit-loss-label';

const colors = [
    [
        '#0000FF',
        '#0000F0',
        '#0000E0',
        '#0000D0',
        '#0000C0',
        '#0000B0',
        '#0000A0',
        '#000090',
        '#000080',
        '#000070',
        '#000060',
        '#000050',
        '#0000cc'
    ],
    [
        '#FF0000',
        '#F00000',
        '#EF0000',
        '#E00000',
        '#DF0000',
        '#D00000',
        '#CF0000',
        '#C00000',
        '#BF0000',
        '#B00000',
        '#AF0000',
        '#A00000',
        '#0000cc',
    ],
];

const renderFxStackedBars = (data: FxMonthlyTransactionsDataEntry, profitKeys: FxMonthlyTransactionsProfitKey[]) => {
    return profitKeys.sort().map((target: any, index: number) => {
        /* tslint:disable */
        return (
            <Bar
                yAxisId={0} 
                stackId="profit" 
                dataKey={target.key} 
                key={target.key}
                label={ (target.actual === false || index + 1 === 12) ? <FxProfitLossLabel /> : undefined}
                barSize={150}
                strokeWidth={'2'}
                strokeDashoffset={'20'}
                strokeDasharray={"20 20"}
                stroke={colors[0][index]}
                strokeOpacity={target.actual ? 0 : 1}
                fillOpacity={target.actual ? 1 : 0}
                fill={ data[target.key] > 0 ? colors[0][index] : colors[1][index] }>
            </Bar>
        );
        /* tslint:enable */
    });
};


const FxAnnualStackedBarChart = (props: FxAnnualStackedBarChartProps) => {
    const data = props.data;
    const profitKeys = props.profitKeys;
    const ticks = props.ticks;

    return (
        <ResponsiveContainer width="100%">
            <BarChart data={[data]} margin={{top: 25, bottom: 25, left: 50, right: 50}}>
                <CartesianGrid strokeDasharray="2 2" />
                <XAxis interval={0} dataKey="year" padding={{left: 30, right: 30}}/>
                <YAxis tickFormatter={formatFxProfitTickLabel} ticks={ticks} yAxisId={0} type="number" padding={{top: 20, bottom: 20}}/>
                <Tooltip ></Tooltip>
                {renderFxStackedBars(data, profitKeys)}
            </BarChart>                    
        </ResponsiveContainer>
    );
};

FxAnnualStackedBarChart.propTypes = {
    data: PropTypes.object.isRequired,
    profitKeys: PropTypes.array.isRequired,
    ticks: PropTypes.array.isRequired,
};

export default FxAnnualStackedBarChart;
