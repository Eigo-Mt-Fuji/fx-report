import {
    FxTransactionsData, 
    FxMonthlyTransactionsResponse, 
    FxMonthlyTransactionsDataEntry, 
    FxMonthlyTransactionsProfitKey,
    FxTransactionDataRecord
} from '../../types';
import getOpenInterestRecord from './getOpenInterestRecord';
import getSettlementOrderRecords from './getSettlementOrderRecords';
const _ = require('lodash');

/**
 * FX月次実績データ整形処理(積み上げ棒グラフ用)
 * @param data SBI証券 FX取引明細データ
 * @param year 対象年(yyyy)
 * @param dream 目標金額(単位: 円)
 * @returns FxMonthlyTransactionsResponse
 */
export default function formatFxMonthlyTransactionsStacked(data:FxTransactionsData, year: string, dream:number) : FxMonthlyTransactionsResponse {

    const profitKeySuffix = '月';

    let buffer: any[] = [];
    const transactionContexts: any[] = [];
    // 取引実績データCSVの決済取引行(偶数行)だけ処理する
    data.allFxTransactionsData.nodes.reduce( (acc:any[], val: any[]) => {

        return [...acc, ...val];
    }, []).forEach( (item:any) => {

        buffer.push(item);
        if (item.buysell === '新規売' || item.buysell === '新規買') {

            const openInterestRecord: FxTransactionDataRecord|null = getOpenInterestRecord(buffer);
            if (openInterestRecord != null) {

                const settlementOrderRecords: FxTransactionDataRecord[] = getSettlementOrderRecords(buffer).filter( (record) => {
                    const date = record.date.split(' ')[0];
                    return date.startsWith(year);
                });
                if (settlementOrderRecords.length !== 0) {

                    const contexts = settlementOrderRecords.map( (record: FxTransactionDataRecord) => {
                        const date = record.date.split(' ')[0];
                        const month = date.substring(5, 7);
                        const sign: number = openInterestRecord?.buysell === '新規買' ? 1 : -1;
                        const pips: number = sign * Math.round( 100 * record.price - openInterestRecord.price);

                        return {
                            month,
                            date,
                            name: `${month}${profitKeySuffix}`,
                            pips,
                            profit: record.total_pl
                        };
                    });

                    transactionContexts.push(...contexts);
                }
            }
            
            buffer = [];
        }
    });

    // 01月...12月まで実績を初期化
    const aggregates: FxMonthlyTransactionsDataEntry = {
        year: parseInt(year)
    };
    const profitKeys: FxMonthlyTransactionsProfitKey[] = [];
    for(let i = 1; i <= 12; i++) {
        const month = ('0' + i).slice(-2);
        const profitKey = `${month}${profitKeySuffix}`;
        aggregates[profitKey] = 0;
        profitKeys.push({key: profitKey, actual: true});
    }
    transactionContexts.sort( (a, b) => {
        if (a.date === b.date) return 0;
        return a.date > b.date ? 1 : -1;
    } );

    // 最終取引日テキスト
    const lastTransactionDateComment: string = !_.isEmpty(transactionContexts) ? `${transactionContexts[0].date.split(' ')[0]}時点` : '':  

    // 月次の損益実績を集計
    const monthlyProfits = transactionContexts.reduce( (accumulator, current) => {
        if (current.name in accumulator === false) {
            accumulator[current.name] = current.profit;
            return accumulator;
        }
        accumulator[current.name] += current.profit;
        return accumulator;
    }, {});
        
    // 月次損益実績の合計を算出
    const actualSum: number = profitKeys
        .map( (target) => monthlyProfits[target.key] )
        .reduce((accumulator, current) => accumulator + current, 0);

    // 目標までの残金を末尾に追加
    aggregates['目標まで'] = dream - actualSum;
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

