export default function calculateFxLot(money_jpy: number, rate: number, trade_unit: number, leverage: number) {

    // ロット数を単純計算
    const price_per_lot = rate * (trade_unit / leverage);

    // 資金 / 1ロットあたりの必要金額(元金)
    return Math.floor(money_jpy / price_per_lot);
}