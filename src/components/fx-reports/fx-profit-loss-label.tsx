import React from 'react';
import formatFxProfitLossYen from '../../models/fx-reports/format-fx-profit-loss-yen';
import {FxProfitLossLabelProps} from '../../types';

const FxProfitLossLabel = (props: any) => {

    const {x, y, fill, value} = props;

    const labelText = formatFxProfitLossYen(value);

    if (parseInt(value) < -10000 || parseInt(value) > 50000) {

        const dy = parseInt(value) > 0 ? -30 : 15;
        return <text 
            x={x} 
            y={y+dy} 
            fontSize='16' 
            fontFamily='sans-serif'
            fill={fill}
            textAnchor="center">{labelText}</text>
    }
    return null;
}

export default FxProfitLossLabel; 