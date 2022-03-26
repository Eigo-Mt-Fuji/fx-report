const _ = require('lodash');

import moment from 'moment';
import { FxTransactionsData, FxTransactionDataRecord } from '../../types';

import getOpenInterestRecord from './getOpenInterestRecord';
import getSettlementOrderRecords from './getSettlementOrderRecords';

const convertToWeek = (month: string, date: string) => {

    const monthStartDay = moment(month, 'YYYY/MM').startOf('month');
    const monthEndDay = moment(month, 'YYYY/MM').endOf('month');
    const weekStartDay = moment(date, 'YYYY/MM/DD').startOf('week');
    let result = null;

    // 月初
    if ( weekStartDay.isBefore(monthStartDay) ) {
        
        result = monthStartDay;
    // 月末
    }else if(weekStartDay.isSame(monthEndDay)) {
        
        result = monthEndDay;
    // 毎週月曜基準
    }else {

        result = weekStartDay.add(1, 'days');
    }

    return result.format('MM/DD〜');
};

export default function formatFxWeeklyTransactions(data: FxTransactionsData, month: string) : any[] {

    let buffer: any[] = [];
    const transactionContexts: any[] = [];
  
    data.allFxTransactionsData.nodes.reduce( (accumulator: any[], currentValue: any) => {
        const items = currentValue.items;
        return [...accumulator, ...items];
    }, []).forEach( (item: any) => { 
        // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/push
        buffer.push(item);

        // 建玉の新規売買のレコードの場合
        if (item.buysell === '新規売' || item.buysell === '新規買') { 

            // 取引を１セット分処理する
            // 建玉の新規売買取引レコードを探す
            const openInterestRecord: FxTransactionDataRecord|null = getOpenInterestRecord(buffer);
            if (openInterestRecord) {

                // 決済取引レコードを探す
                const settlementOrderRecords: FxTransactionDataRecord[] = getSettlementOrderRecords(buffer);

                const contexts: any[] = settlementOrderRecords.filter( (record: FxTransactionDataRecord) => { 
                    // see https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/filter#parameters
                    return record.date.startsWith(month);
                }).map( (record: FxTransactionDataRecord) => {

                    const week = convertToWeek(month, record.date);
        
                    const profit = parseInt(record.total_pl);
                    const sign: number = record.buysell === '決済売' ? 1 : -1;
                    const pips = sign * Math.round(100 * (record.price - openInterestRecord.price));        

                    return {
                        name: week,
                        profit,
                        pips
                    };
                });

                if (contexts.length > 0) {

                    // スプレッド構文 https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Spread_syntax
                    transactionContexts.push(...contexts);
                }  
            }

            // バッファクリア
            buffer = [];
        }

    });
    transactionContexts.reduce( (previous, current) => {
        const aggregateKey: string = current.name;
        if (aggregateKey in previous) {

            previous[aggregateKey].push(current);
        }else {
            
            previous[aggregateKey] = [];
            previous[aggregateKey].push(current);
        }
        return previous;
    }, {});

    const groupedTransactionContexts = transactionContexts.reduce( (accumulator, current) => {
        const aggregateKey: string = current.name;
        if (aggregateKey in accumulator) {

            accumulator[aggregateKey].push(current);
        }else {
            
            accumulator[aggregateKey] = [];
            accumulator[aggregateKey].push(current);
        }
        return accumulator;
    }, {});
    // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/entries#try_it
    const results = Object.values(groupedTransactionContexts).map( (contexts: any) => {

        return contexts.length === 1 ? contexts[0] : contexts.reduce( (accumulator: any, current: any) => {
            // https://lodash.com/docs/#isEmpty
            if (_.isEmpty(accumulator)) {
                return current;
            }
            // 集約
            accumulator.profit += current.profit; 
            accumulator.pips += current.pips;

            return accumulator;
        }, {});
    });
    // ソートして返却
    results.sort( (a, b) => {

        if (a.name == b.name) return 0;

        return a.name < b.name ? 1 : -1;
    });
    return results;

}
