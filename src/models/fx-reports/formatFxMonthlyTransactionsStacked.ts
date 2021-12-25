import {
    FxTransactionsData, 
    FxMonthlyTransactionsResponse, 
    FxMonthlyTransactionsDataEntry, 
    FxMonthlyTransactionsProfitKey
} from '../../types';

/**
 * FX月次実績データ整形処理(積み上げ棒グラフ用)
 * @param data SBI証券 FX取引明細データ
 * @param year 対象年(yyyy)
 * @param dream 目標金額(単位: 円)
 * @returns FxMonthlyTransactionsResponse
 */
function formatFxMonthlyTransactionsStacked(data:FxTransactionsData, year: string, dream:number) : FxMonthlyTransactionsResponse {
    const aggregates: FxMonthlyTransactionsDataEntry = {
        year: parseInt(year)
    };

    const profitKeySuffix = '月';
    const profitKeys: FxMonthlyTransactionsProfitKey[] = [];

    // 01月...12月まで実績を初期化
    for(let i = 1; i <= 12; i++) {
        const month = ('0' + i).slice(-2);
        const profitKey = `${month}${profitKeySuffix}`;
        aggregates[profitKey] = 0;
        profitKeys.push({key: profitKey, actual: true});
    }

    let lastTransactionDate: string|undefined;
    let sum = 0;

    // 取引実績データCSVの決済取引行(偶数行)だけ処理する
    data.allFxTransactionsData.nodes.forEach( (node:any) => {
        for( let i = 0; i < node.items.length; i+= 2) {
            //
            const date = node.items[i].date.split(' ')[0];

            // 対象年以外はskip
            if ( !date.startsWith(year) ) continue;

            if (lastTransactionDate == null || lastTransactionDate < date) {
                // 最終取引日を更新
                lastTransactionDate = date;
             }
            // 月ごとに集計
            const month = date.substring(5, 7);
            const profit = node.items[i].total_pl;
            sum += parseInt(profit);
            aggregates[`${month}${profitKeySuffix}`] += parseInt(profit);
        }
    });

    // 実績集計
    const actualSum: number = profitKeys.map( (target) => aggregates[target.key] ).reduce( (previous, current) => previous + current, 0);

    // 最終取引日テキスト
    const lastTransactionDateComment: string = lastTransactionDate ? `※${lastTransactionDate}時点` : '';

    // 目標までの残金を末尾に追加
    aggregates['目標まで'] = dream - sum;
    profitKeys.push({key:'目標まで', actual: false});

    return {
        data: [
            aggregates
        ],
        profitKeys,
        actualSum,
        lastTransactionDateComment
    };
}

export default formatFxMonthlyTransactionsStacked;
