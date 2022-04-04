import React from 'react';
import calculateFxLot from '../../models/fx-reports/calculate-fx-lot';
import {FxPriceLotProps} from '../../types';

const FxPriceLot: (props: FxPriceLotProps) => any = (props: FxPriceLotProps) => {
    
    const lot = calculateFxLot(parseInt(props.money_jpy), parseFloat(props.rate), 10000, 25);

    return (
        <div>ロット数: {lot}</div>
    );
}

export default FxPriceLot;