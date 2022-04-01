export default function calculateFxLot(money_jpy, rate, trade_unit, leverage) {

    // ロット数を単純計算
    const price_per_lot = rate * (trade_unit / leverage);

    // 資金 / 1ロットあたりの必要金額(元金)
    return Math.floor(money_jpy / price_per_lot);
}