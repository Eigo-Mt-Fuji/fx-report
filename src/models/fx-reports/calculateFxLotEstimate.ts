import calculateFxLot from './calculateFxLot';
import formatFxProfitLossYen from './formatFxProfitLossYen';

/**
 * calculateFxLotEstimate
 * @param {*} rate 為替レート(USD/JPY)
 * @param {*} currentState 現在取引ステータス  {deposit: 5777440,valuationGainLoss: -2232785 ,requiredDeposit: 3374240, sellPositiont: 80,buyPosition: 60}
 * @param {*} budget 予算(単位: 円) 5000000
 * @param {*} tradeUnit  通貨単位 (10000)
 * @param {*} leverage レバレッジ(25)
 * @param {*} allowedDepositRate (許容 預託保証金率(%)) 120
 */
export default function calculateFxLotEstimate(rate: number, currentState: any, budget: number, tradeUnit: number, leverage: number, allowedDepositRate: number) : any[] {
    // 最大ロット数を計算
    const maxTradableLotCount = calculateFxLot(budget + currentState.deposit + currentState.valuationGainLoss - currentState.requiredDeposit, rate, tradeUnit, leverage);

    const results = [];

    // 1〜最大ロット数まで、現在の状態 + 追加購入分のロットと為替から、預託保証金率を計算
    for (let i = 5; i <= maxTradableLotCount; i+=5) {
        const additionalRequiredDeposit = rate * i * tradeUnit / leverage;
        const estimateRate = Math.round( 1000 * (budget + currentState.deposit + currentState.valuationGainLoss)  / (currentState.requiredDeposit + additionalRequiredDeposit) ) / 10;
        results.push({
            lot: i,
            positionForecast: {
                sell: currentState.sellPosition + i,
                buy: currentState.buyPosition + i
            },
            additionalRequiredDeposit: formatFxProfitLossYen(`${additionalRequiredDeposit}`),
            estimateRate,
            isAllowed: allowedDepositRate <= estimateRate ? true : false
        })
    }

    return results;
}

