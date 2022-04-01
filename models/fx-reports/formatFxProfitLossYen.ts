const _ = require('lodash');

export default function formatFxProfitLossYen(value: string) : string {

    const intValue = parseInt(value, 10);

    const sign = intValue >= 0 ? '+' : '';

    // ±1万円以上は万単位の表記を返却
    if (Math.abs(intValue) >= 10000) {

        const yukichi = _.round(_.divide(intValue, 10000), 1);
        return `${sign}${yukichi.toLocaleString('en-US', { minimumFractionDigits: 1 })}万円`;
    }

    // 円単位の表記を返却(100円未満は切り捨て)
    const charin = _.floor(intValue / 100.0) * 100;

    return `${sign}${charin.toLocaleString('en-US')}円`;
}
