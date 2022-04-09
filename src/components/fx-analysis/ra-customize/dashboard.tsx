import React, { useState, useEffect, useCallback } from 'react';
import { Record, useDataProvider, useVersion } from 'react-admin';
import FxAnalysisWeekHourChart from '../ra-resources/fx-analysis-week-hour-chart';
import FxAnalysisWeekHourTable from '../ra-resources/fx-analysis-week-hour-table';
// https://mui.com/material-ui/react-use-media-query/
import useMediaQuery from '@mui/material/useMediaQuery';

// @emotion/react is better than @emotion/css for next.js SSR https://emotion.sh/docs/@emotion/react
// @emotion <ClassNames> component allows to create css className like vanilla Emotion(@emotion/css) https://emotion.sh/docs/class-names
// workaround: use @jsxImportSource(instead of jsx) https://github.com/emotion-js/emotion/issues/2041
import { jsx, css } from '@emotion/react'

// media queryを使って レスポンシブレイアウト
// https://github.com/marmelab/react-admin/blob/master/examples/demo/src/dashboard/Dashboard.tsx
// type ThemeName = 'light' | 'dark';
// useMediaQuery: rendering of components based on whether the query matches or not
// import { useMediaQuery, Theme } from '@material-ui/core';
interface State {
    analysis?: any;
}

interface FxRecord extends Record {
    order_no: string;
    date: string;
    lot_number: string;
    currency: string;
    buysell: string;
    amount: string;
    price: string;  
    rate: string;
    fee: string;
    swap: string;
    pl: string;
    total_pl: string;
}


const styles = {
    flex: { display: 'flex' },
    flexColumn: { display: 'flex', flexDirection: 'column' },
    leftCol: { flex: 1, marginRight: '0.5em' },
    rightCol: { flex: 1, marginLeft: '0.5em' },
    singleCol: { marginTop: '1em', marginBottom: '1em' },
};

const MyDashboard = (_props: any) => {
    // TODO: MediaQueryの一般的な使い分けについて調査
    // <span>{`(min-width:600px) matches: ${matches}`}</span>
    const matches = useMediaQuery('(min-width:600px)');
    const [state, setState] = useState<State>({});

    // TODO: dataProviderの仕組みをおさらいしておく。特にversionの用途、fetchFxAnalysisがいつ実行されるかを見ておく
    const dataProvider = useDataProvider();
    const version = useVersion();

    const fetchFxAnalysis = useCallback(async () => {
        const { data: analysis } = await dataProvider.getList<FxRecord>(
            'fx-analysis',
            {
                filter: { status: 'pending' },
                sort: { field: 'date', order: 'DESC' },
                pagination: { page: 1, perPage: 100 },
            }
        );
        setState(state => ({ ...state, analysis }));
    }, [dataProvider]);
    useEffect(() => {
        fetchFxAnalysis();
    }, [version, fetchFxAnalysis]);
    const {
        analysis,
    } = state;
    return (
        <div style={styles.flex}>
            <div css={css`
                    font-size: 25px;
                    color: #FF0000
                `}>hoge</div>
            <div style={styles.leftCol}>
                <div style={styles.flex}>
                    <FxAnalysisWeekHourChart data={analysis} />
                </div>
                <div>
                    <FxAnalysisWeekHourTable data={analysis} />
                </div>
            </div>
        </div>
    )    
}

export default MyDashboard;