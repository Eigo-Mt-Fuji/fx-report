import moment from 'moment';
import { FxTransactionsData, FxTransactionDataRecord } from '../../types';

function getOpenInterestRecord(buffer: any[]) : FxTransactionDataRecord {
    
    return buffer.filter( (item) => {

        return item.buysell == '新規売' || item.buysell == '新規買';
    });
}
function getSettlementOrderRecords(buffer: any[]) : FxTransactionDataRecord[] {

    return buffer.filter( (item) => {

        return item.buysell == '決済売' || item.buysell == '決済買';
    });
}

/**
 * 決済売買の日付を元に日毎の取引実績を集計する
 */
function processTransactionBuffer(buffer: any[]) {

    // 建玉の新規売買取引レコードを探す
    const openInterestRecord: FxTransactionDataRecord = getOpenInterestRecord(buffer);

    // 決済取引レコードを探す
    const settlementOrderRecords: FxTransactionDataRecord[] = getSettlementOrderRecords(buffer);
    
    return settlementOrderRecords.map( (record: FxTransactionDataRecord) => {
        const date: string = record.date.split(' ')[0];
        // see https://momentjs.com/docs/#/parsing/string-format/
        const aggregateKey: string = moment(date, 'YYYY/MM/DD').format('MM/DD');

        // 獲得利益(損失)は、決済レコードのtotal_pl列を参照
        const profit =  record.total_pl;

        // see https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Math/round
        // pipsは売買の種別ごとに計算 (決済売の場合、決済時の為替 - 買建時の為替が利益になる(マイナスの場合は損失))
        const sign: number = record.buysell === '決済売' ? 1 : -1;
        const pips = sign * Math.round(100 * (record.price - openInterestRecord.price);

        return {
            name: aggregateKey,
            profit: parseInt(profit),
            pips: pips
        };
    });
}

function formatFxTransactions(data: FxTransactionsData, month: string) : any[] {

    const res = data.allFxTransactionsData.nodes.map( (node) => {
        const results: any[] = [];
        const transactionContexts: any[] = []

        let buffer: any[] = [];
        // node itemsを順次処理 ( "決済売,新規買" または "決済売,決済売,...,新規買" または "決済買,新規売" または "決済買,決済買,...,新規売"
        node.items.forEach( (item) => { 
            // 
            buffer.push(item);
            // 建玉の新規売買のレコードの場合
            if (item.buysell === '新規売' || item.buysell === '新規買') { 

                // 取引を１セット分処理する
                const context = processTransactionBuffer(buffer);
                transactionContexts.push(context);

                // バッファクリア
                buffer = [];
            }
        });

        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/groupBy#examples
        const groupedTransactionContexts = transactionContexts.groupBy( (context) => context.name );
        
        // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/entries#try_it
        for (const [aggregateKey, contexts] of Object.entries(groupedTransactionContexts)) {
            
            // 要素数が１の場合以外は、損益とpips値を集計
            // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/length#try_it
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce#syntax
            const aggregatedContext = contexts.length === 1 ? contexts[0] : contexts.reduce( (previousValue, currentValue) => {
                if (empty(previousValue)) {
                    return currentValue;
                }
                // 集約
                previousValue.profit += currentValue.profit; 
                previousValue.pips += currentValue.pips;

                return previousValue;
            }, {});
            results.push(aggregatedContext);
        }
        return results;
    }).reduce( (acc: any[], val: any[]) => {

        return [...acc, ...val];
    }, []);

    res.sort((first: any, second: any) => {

        const date1 = Date.parse(first.name);
        const date2 = Date.parse(second.name);
      
        if (date1 > date2) return 1;
        if (date1 < date2) return -1;
        return 0; 
    });

    return res;
}

export default formatFxTransactions;
