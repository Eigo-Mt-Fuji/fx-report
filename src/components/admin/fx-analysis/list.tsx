import * as React from 'react';
import { Datagrid, DateField, TextField, List, useResourceContext } from 'react-admin';

const ResourceName = () => {
    const { resource }: any = useResourceContext();
    return <>{resource}</>;
}

const FxAnalysisList = (props: any) => (
    <List {...props}>
        <>
            <ResourceName /> {/* renders 'fx-analysis' */}
            <Datagrid>
                <TextField source="order_no" />
                <DateField source="date" />
                <TextField source="lot_number" />
                <TextField source="currency" />
                <TextField source="buysell" />
                <TextField source="amount" />
                <TextField source="price" />
                <TextField source="rate" />
                <TextField source="fee" />
                <TextField source="swap" />
                <TextField source="pl" />
                <TextField source="total_pl" />
            </Datagrid>
        </>
    </List>
)

export default FxAnalysisList;