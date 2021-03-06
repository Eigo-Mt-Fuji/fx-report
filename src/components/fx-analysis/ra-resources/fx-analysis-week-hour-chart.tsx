import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const _ = require('lodash');

// TODO: @emotion/cssを使ったclassNames定義方法は、できる限りnext.jsでは基本的にやらないほうがよい。@emotion/reactのClassNamesコンポーネントを使って置き換える
import { css, cx } from '@emotion/css'
const classes = {
    chartDescription: css`
        font-size: 13px;
    `,
    chartTitle: css`
        font-size: 25px;
        color: #ff0000;
    `
};

// TODO: @emotion/styledを使ってスタイル定義するのは推奨されてるのでやっても問題はないけど、@emotion/reactでも同じことができるので、どちらかに寄せたほうが良い
// whatis @emotion/styled: https://emotion.sh/docs/styled
import styled from '@emotion/styled'
const Button = styled.button`
  color: ${ (props:any) => props.hoge ? 'blue' : 'turquoise'};
`

const MyResourcerContainer = styled.div( (props:any) => ({
  display: 'block',
  width: '100%',
  height: 800,
}))

const CustomizedDot = (props: any) => {
    const { cx, cy, stroke, payload, value } = props;
    
    // 曜日ごとにマーカースタイルを変える https://recharts.org/en-US/examples/CustomizedDotLineChart
    return (
        <svg x={cx - 10} y={cy - 10} width={15} height={15} fill={stroke} viewBox="0 0 1024 1024">
          <path d="M512 1009.984c-274.912 0-497.76-222.848-497.76-497.76s222.848-497.76 497.76-497.76c274.912 0 497.76 222.848 497.76 497.76s-222.848 497.76-497.76 497.76zM340.768 295.936c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM686.176 296.704c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM772.928 555.392c-18.752-8.864-40.928-0.576-49.632 18.528-40.224 88.576-120.256 143.552-208.832 143.552-85.952 0-164.864-52.64-205.952-137.376-9.184-18.912-31.648-26.592-50.08-17.28-18.464 9.408-21.216 21.472-15.936 32.64 52.8 111.424 155.232 186.784 269.76 186.784 117.984 0 217.12-70.944 269.76-186.784 8.672-19.136 9.568-31.2-9.12-40.096z" />
        </svg>
    );
  };

  
const FxAnalysisWeekHourChart = (props: any) => {

    const dayOfWeeks = [ 

        {
            name: "月",
            color: "#ffa000"
        },
        {
            name: "火",
            color: "#ffe000"
        },
        {
            name: "水",
            color: "#008400"
        },
        {
            name: "木",
            color: "#0062b8"
        },
        {
            name: "金",
            color: "#0090ff"
        },
    ]

    const series = dayOfWeeks.map( (context) => {

        return {
            name: context.name,
            data: _.range(0, 23).map( 
                (val: number) => {
                    const formalHour = `${val}`.padStart(2, '0');
                    return { 
                        time: `${formalHour}:00`, value: Math.random() 
                    };
                }
            ),
            strokeColor: context.color
        };
    });
    // TODO: how to expand LineChart to fill the screen? now LineChart width is fixed as 508px(why..?)
    return (
        <>
            <MyResourcerContainer>
                <div className={classes.chartTitle}>曜日別・時間帯別 損益</div>
                <p className={classes.chartDescription}>※2022年3月28日までの実績をもとに集計しています。</p>
                <Button onClick={() => {alert('Yes!');}}>詳細</Button>

                <ResponsiveContainer width="100%" height="100%">
                    <LineChart height={550}>
                    <CartesianGrid strokeDasharray="5 5" />
                    <XAxis dataKey="time" type="category" allowDuplicatedCategory={false} />
                    <YAxis dataKey="value" />
                    <Tooltip />
                    <Legend />
                    {series.map((s) => (
                        <Line 
                            stroke={s.strokeColor} 
                            strokeWidth={1} 
                            dataKey="value" 
                            data={s.data} 
                            name={s.name} 
                            key={s.name} 
                            dot={CustomizedDot}/>
                    ))}
                    </LineChart>
                </ResponsiveContainer>
            </MyResourcerContainer>
        </>
    );
}
export default FxAnalysisWeekHourChart;