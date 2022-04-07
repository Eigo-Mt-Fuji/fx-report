import React, { useState, useEffect, useCallback, CSSProperties } from 'react';
import { Record, useDataProvider, useVersion, Datagrid, DateField, TextField, List, useResourceContext } from 'react-admin';
import FxAnalysisWeekHourChart from '../ra-resources/fx-analysis-week-hour-chart';
import FxAnalysisWeekHourTable from '../ra-resources/fx-analysis-week-hour-table';

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

const Spacer = () => <span style={{ width: '1em' }} />;

const ResourceName = () => {
    // to read the current resource name
    const { resource } : any = useResourceContext();
    return <>{resource}</>
};

const MyDashboard = (_props: any) => {
    const [state, setState] = useState<State>({});

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
            <div style={styles.leftCol}>
                <div style={styles.flex}>
                    <FxAnalysisWeekHourChart data={analysis} />
                    <Spacer />
                    <FxAnalysisWeekHourTable data={analysis} />
                </div>
            </div>
        </div>
    )    
}

export default MyDashboard;