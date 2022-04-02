import React, {useState} from 'react';
import {
  Bar,
  Cell,
  CartesianGrid,
  Label,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ComposedChart,
  ResponsiveContainer,
} from 'recharts';
import { FxMonthlyComopsedChartProps } from '../../types';

import FxProfitLossLabel from './fx-profit-loss-label';

const FxMonthlyComopsedChart = (props: FxMonthlyComopsedChartProps) => {
    const data = props.data;
    const ticks = props.ticks;
    const colorsList = [
        [ '#0000FF', '#FF0000' ], 
        [ '#00FF00', '#FF4500' ]
    ];

    return (
        <ResponsiveContainer width={'100%'} >
            <ComposedChart data={data} margin={{top: 25, bottom: 25, left: 40, right: 20}}>
                <CartesianGrid strokeDasharray="2 2" />
                <XAxis dataKey="name" padding={{left: 30, right: 30}} />
                <YAxis yAxisId={0} ticks={ticks} type="number" domain={[10, 'dataMax - 300']} padding={{top: 20, bottom: 20}}>
                    <Label value="単位:円" offset={0} position="top"></Label>
                </YAxis>
                <YAxis yAxisId={1} orientation="right" type="number" padding={{top: 20, bottom: 20}}>
                    <Label value="pips" offset={0} position="top"></Label>
                </YAxis>
                <Tooltip />
                <Legend />
                <Line 
                    yAxisId={1} 
                    type="monotone" 
                    dataKey="pips" 
                    strokeWidth="2" 
                    stroke={colorsList[1][0]} />
                <Bar barSize={40} yAxisId={0} 
                    dataKey={'profit'}
                    key={'bar_1'}
                    label={<FxProfitLossLabel/>}
                    
                    fill={colorsList[0][0]}>

                    {data.map((d,index) => (
                        <Cell key={'cell-' + index} fill={ d.profit > 0 ? colorsList[0][0] : colorsList[0][1] } />     ))
                    }
                </Bar>

            </ComposedChart>
        </ResponsiveContainer>
    );
};

export default FxMonthlyComopsedChart;
