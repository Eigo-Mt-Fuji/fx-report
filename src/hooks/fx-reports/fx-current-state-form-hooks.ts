import {useState} from 'react';
import {FxCurrentState, FxCurrentStateHookContext} from '../../types';

export default function useFxCurrentState(defaultState: FxCurrentState) : FxCurrentStateHookContext {

    const [currentState, setCurrentState] = useState<FxCurrentState>(defaultState);

    const onChangeDeposit = (e:any) => {
        console.log(e.target.value);
        const copyState = { ...currentState};
        copyState.deposit = parseInt(e.target.value);
        setCurrentState(copyState);
    };

    const onChangeValuationGainLoss = (e:any) => {
        console.log(e.target.value);
        const copyState = { ...currentState};
        copyState.valuationGainLoss = parseInt(e.target.value);
        setCurrentState(copyState);
    };
    const onChangeBuyPosition = (e:any) => {
        const copyState = { ...currentState};
        copyState.buyPosition = parseInt(e.target.value);
        setCurrentState(copyState);
    };
    const onChangeSellPosition = (e:any) => {
        const copyState = { ...currentState};
        copyState.sellPosition = parseInt(e.target.value);
        setCurrentState(copyState);
    };
    const onChangeRequiredDeposit = (e:any) => {
        const copyState = { ...currentState};
        copyState.requiredDeposit = parseInt(e.target.value);
        setCurrentState(copyState);
    };

    return {
        currentState,
        onChangeDeposit,
        onChangeValuationGainLoss,
        onChangeBuyPosition,
        onChangeSellPosition,
        onChangeRequiredDeposit
    };
}
