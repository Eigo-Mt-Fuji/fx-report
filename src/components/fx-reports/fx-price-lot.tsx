import React from 'react';
import calculateFxLot from '../../models/fx-reports/calculateFxLot';
import {FxPriceLotProps} from '../../types';

const FxPriceLot: (props: FxPriceLotProps) => any = (props: FxPriceLotProps) => {
    
    const lot = calculateFxLot(props.money_jpy, props.rate, 10000, 25);

    return (
        <div>ロット数: {lot}</div>
    );
}

export default FxPriceLot;