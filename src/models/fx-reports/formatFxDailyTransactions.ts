import moment from 'moment';
import { FxTransactionsData, FxTransactionsDataRecord } from '../../types';
const _ = require('lodash');

import getOpenInterestRecord from './getOpenInterestRecord';

import getSettlementOrderRecords from './getSettlementOrderRecords';

/**
 * 決済売買の日付を元に日毎の取引実績を集計する
 */
function processTransactionBuffer(month: string, buffer: any[]) {

    // 建玉の新規売買取引レコードを探す
    const openInterestRecord: any = getOpenInterestRecord(buffer);

    // 決済取引レコードを探す
    const settlementOrderRecords: FxTransactionsDataRecord[] = getSettlementOrderRecords(buffer);
    return settlementOrderRecords.filter( (record: FxTransactionsDataRecord) => { 
        // see https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/filter#parameters
        return record.date.startsWith(month);
    }).map( (record: FxTransactionsDataRecord) => {
        const date: string = record.date.split(' ')[0];
        // see https://momentjs.com/docs/#/parsing/string-format/
        const aggregateKey: string = moment(date, 'YYYY/MM/DD').format('MM/DD');

        // 獲得利益(損失)は、決済レコードのtotal_pl列を参照
        const profit =  record.total_pl;

        // see https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Math/round
        // see https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Math/abs
        // pipsは絶対値を計算
        const pips = Math.abs( Math.round(100 * (record.price - openInterestRecord.price)) ) ;

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

            // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/push
            buffer.push(item);

            // 建玉の新規売買のレコードの場合
            if (item.buysell === '新規売' || item.buysell === '新規買') { 

                // 取引を１セット分処理する
                const contexts = processTransactionBuffer(month, buffer);
                if (contexts.length > 0) {
                    // 
                    // スプレッド構文 https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Spread_syntax
                    transactionContexts.push(...contexts);
                }

                // バッファクリア
                buffer = [];
            }
        });

        // Array#groupByはexperimentalなのでnodejsでは3/24時点で使えない https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/groupBy#examples
        // 代わりにreduce
        const groupedTransactionContexts: any = transactionContexts.reduce( (previous, current) => {
            const aggregateKey: string = current.name;
            if (aggregateKey in previous) {

                previous[aggregateKey].push(current);
            }else {
                
                previous[aggregateKey] = [];
                previous[aggregateKey].push(current);
            }
            return previous;
        }, {});
        // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/entries#try_it
        Object.values(groupedTransactionContexts).forEach( (contexts: any, index: number) => {


            // 要素数が１の場合以外は、損益とpips値を集計
            // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/length#try_it
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce#syntax
            const aggregatedContext = contexts.length === 1 ? contexts[0] : contexts.reduce( (accumulator: any, current: any) => {
                // https://lodash.com/docs/#isEmpty
                if (_.isEmpty(accumulator)) {
                    return current;
                }
                // 集約
                accumulator.profit += current.profit; 
                accumulator.pips += current.pips;

                return accumulator;
            }, {});
            results.push(aggregatedContext);
        });
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
