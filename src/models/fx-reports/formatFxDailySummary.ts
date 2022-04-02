import {FxDailySummaryContext,FxTransactionsDataRecord,FxTransactionsData, FxDailySummaryContextData} from '../../types'
import moment from 'moment';
import formatFxDurationMap from './formatFxDurationMap';
import getOpenInterestRecord from './getOpenInterestRecord';
import getSettlementOrderRecords from './getSettlementOrderRecords';

export default function formatFxDailySummary(month: string, data: FxTransactionsData) : FxDailySummaryContext[]|null {


  // 取引明細(node items)から新規建玉注文と決済注文のペアを抽出
  let buffer: any[] = [];
  const transactionContexts: FxDailySummaryContextData[] = [];
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
            const openInterestRecord: FxTransactionsDataRecord|null = getOpenInterestRecord(buffer);
            if (openInterestRecord) {

                // 決済取引レコードを探す
                const settlementOrderRecords: FxTransactionsDataRecord[] = getSettlementOrderRecords(buffer);

                const contexts: FxDailySummaryContextData[] = settlementOrderRecords.filter( (record: FxTransactionsDataRecord) => { 
                    // see https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/filter#parameters
                    return record.date.startsWith(month);
                }).map( (record: FxTransactionsDataRecord) => {
                    const date: string = record.date.split(' ')[0];
                    // see https://momentjs.com/docs/#/parsing/string-format/
                    const aggregateKey: string = moment(date, 'YYYY/MM/DD').format('MM/DD');
                    const timestamp = moment(record.date, 'YYYY/MM/DD HH:mm:SS').valueOf();
                    // 建玉売買注文〜決済注文までの秒数
                    const duration = moment(record.date, 'YYYY/MM/DD HH:mm:SS').diff( moment(openInterestRecord.date, 'YYYY/MM/DD HH:mm:SS'), 'seconds');

                    return {
                        date,
                        timestamp,
                        totalPl: record.total_pl,
                        duration
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

  // 日別取引実績を集計(新規建玉注文と決済注文のペアを元に集計)
  const summaries: FxDailySummaryContext[] = Object.values(transactionContexts.reduce( (accumulator: any, current) => {
      const date: string = current.date;
      if ( date in accumulator === false) {

        accumulator[date] = {
          // 日付
          date,
          // 取引回数
          count: 0,
          countPositive: 0,
          countNegative: 0, 
          // 取引単価(リスト)
          totalPls: [],
          // 取引時刻(リスト)
          timestamps: [],
          // 取引時間間隔
          durations: []
        };
      }

      // 取引回数
      accumulator[date].count = accumulator[date].count + 1;
      const totalPl = parseInt(current.totalPl);
      // 利益確定回数(損失確定回数)
      if (totalPl >= 0) {
        
        // 利益が出ている(もしくは0円=一応マイナスではない)回数
        accumulator[date].countPositive = accumulator[date].countPositive + 1;
      } else {
        
        accumulator[date].countNegative = accumulator[date].countNegative + 1;
      }

      // 取引時刻
      accumulator[date].timestamps.push(current.timestamp);

      // 取引単価(リスト)
      accumulator[date].totalPls.push(totalPl);

      // 新規取引 - 決済までの経過時間(秒)
      accumulator[date].durations.push(current.duration);

      return accumulator;
  }, {})).map( (record: any) => {

    const date = record.date;

    const totalPls = record.totalPls;
    const timestamps = record.timestamps;
    const durations = record.durations;

    if (record.count !== 1) {

      // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
      totalPls.sort( (a: number, b:number) => {
        if (a === b) {
          return 0;
        }
        return a > b ? 1 : -1;
      });
      durations.sort( (a: number, b:number) => {
        if (a === b) {
          return 0;
        }
        return a > b ? 1 : -1;
      });

      // TODO: Math.floorとは?        
      const midIndex = Math.floor(record.count / 2);

      const summary: FxDailySummaryContext = {
        date: date,

        // 損益の最大・最小・平均・中央の単価を計算
        profitUnitMax: Math.max(...totalPls),
        profitUnitMin: Math.min(...totalPls),
        profitUnitAvg: (totalPls.reduce( (acc: number, cur: number) => acc + cur, 0)) / record.count,
        profitUnitMid: (totalPls.length % 2 == 1) ? totalPls[midIndex] : (totalPls[midIndex - 1] + totalPls[midIndex]) / 2,

        // 取引回数
        tradeCount: record.count,
        // 取引回数内訳(利益確定回数(利益0円を含む)=positive、損失確定回数=negative)
        tradeCountPositive: record.countPositive,
        tradeCountNegative: record.countNegative,
        
        // 取引時間(新規建玉売買〜決済注文までの時間)の最大・最小・平均・中央
        timeMax: Math.max(...durations),
        timeMin: Math.min(...durations),
        timeAvg: (durations.reduce( (acc: number, cur: number) => acc + cur, 0)) / record.count,
        timeMid: durations.length % 2 == 1 ? durations[midIndex] : (durations[midIndex - 1] + durations[midIndex]) / 2,

        // 初回取引時刻(取引時刻タイムスタンプの最小値)
        firstTradeTimestamp: Math.min(...timestamps),
        
        // 初回取引時刻(取引時刻タイムスタンプの最大値)
        lastTradeTimestamp: Math.max(...timestamps),

        // 取引回数集計
        // 取引時間(新規建玉売買〜決済注文までの時間)ごと( 1分/5分/15分/1時間/1日/1週間/それ以上ごと)に回数集計する
        durationsCountMap: formatFxDurationMap(durations),
      };
      return summary;
    }

    // シンプルに0番目の値を応答（1日に1回のトレードしかしていない場合）
    return {
      date: date,
      profitUnitMin: totalPls[0],
      profitUnitMid: totalPls[0],
      profitUnitAvg: totalPls[0],
      profitUnitMax: totalPls[0],
      timeMin: durations[0],
      timeMid: durations[0],
      timeAvg: durations[0],
      timeMax: durations[0],
      tradeCount: record.count,
      tradeCountPositive: record.countPositive,
      tradeCountNegative: record.countNegative,
      firstTradeTimestamp: timestamps[0],
      lastTradeTimestamp: timestamps[0],
      durationsCountMap: formatFxDurationMap(durations),
    };
  });

  summaries.sort((first: FxDailySummaryContext, second: FxDailySummaryContext) => {

      const date1 = Date.parse(first.date);
      const date2 = Date.parse(second.date);
    
      if (date1 > date2) return 1;
      if (date1 < date2) return -1;
      return 0; 
  });

  return summaries;
}
