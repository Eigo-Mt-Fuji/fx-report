const _ = require('lodash');

export default function formatFxProfitTickLabel(value: string) : string{
    const intValue = parseInt(value, 10);

    // ±1万円以上は万単位の表記を返却
    if (Math.abs(intValue) >= 10000) {

        const yukichi = _.round(_.divide(intValue, 10000), 0);
        return `${yukichi.toLocaleString('en-US', { minimumFractionDigits: 0 })}万円`;
    }

    // 円単位の表記を返却(100円未満は切り捨て)
    const charin = _.floor(intValue / 100.0) * 100;

    return `${charin.toLocaleString('en-US')}円`;


}
