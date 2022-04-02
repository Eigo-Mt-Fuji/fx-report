import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Label, Legend } from 'recharts';
import {FxSummaryViewDurationBarChartProps, FxDailySummaryContext} from '../../types';

const FxSummaryViewDurationBarChart = (props: FxSummaryViewDurationBarChartProps) => {

    const data = props.data.map( (item: FxDailySummaryContext) => {
        
        const durationsCountMap = item.durationsCountMap;
    
        const res = {
            date: item.date, 
            ...durationsCountMap
        };

        if (item.date=='2021/09/01') {

            console.log(res);
        }

        return res;
    });
    const colors = [
        // red: 1 minutes
        '#ff0000',
        // orange: 5 minutes
        '#ffa500',
        // yellow: 15 minutes
        '#ffff00',
        // green: 1 hour
        '#008000',
        // blue: 1 day
        '#0000ff',
        // indigo: 1 week
        '#4b0082',
        // violet: 1 week over
        '#ee82ee',
    ];

    const renderBars = (data: any[]) => {
        
        return Object.keys(data[0]).filter( (key) => key != 'date').map( 
            (key, index) => {
                return (<Bar 
                    yAxisId={0} 
                    stackId={'a'} 
                    dataKey={key} 
                    key={key}
                    fill={ colors[index]}></Bar>)
            }
        );
    };
    const legendItem = data[0];
    const legendPayload: any[] = Object.keys(legendItem).filter( (key) => key !== 'date').map( (key, index) => {
            return { 
                value: key, type: 'rect', id: key, color: colors[index] 
            };
        });

    return (
        <ResponsiveContainer width={'100%'} >
            <BarChart data={data} margin={{top: 25, bottom: 25, left: 50, right: 50}}>
                <CartesianGrid strokeDasharray="2 2" />
                <XAxis dataKey="date" padding={{left: 30, right: 30}}/>
                <YAxis yAxisId={0} type="number" padding={{top: 20, bottom: 20}}>
                    <Label value="単位:取引回数" offset={0} position="top"></Label>
                </YAxis>
                <Legend payload={legendPayload}/>
                {renderBars(data)}
            </BarChart>
        </ResponsiveContainer>
    );
};

export default FxSummaryViewDurationBarChart;
