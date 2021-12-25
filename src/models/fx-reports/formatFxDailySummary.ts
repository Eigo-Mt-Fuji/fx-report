import {FxDailySummaryContext,FxTransactionsData} from '../../types'
import moment from 'moment';
import formatFxDurationMap from './formatFxDurationMap';
const formatFxDailySummary : (month: string, data: FxTransactionsData) => FxDailySummaryContext[]|null = (month: string, data: FxTransactionsData) => {

  const items = data.allFxTransactionsData.nodes.reduce( (accumulator, currentValue) => {
    const items = currentValue.items;
    return [...accumulator, ...items];
  }, []);

  const aggregates: any = {};

  for( let i = 0; i < items.length; i+= 2) {
    const date = items[i].date.split(' ')[0];

    if ( !date.startsWith(month) ) continue;

    const timestamp = moment(items[i].date, 'YYYY/MM/DD HH:mm:SS').valueOf();
    const totalPl = parseInt(items[i].total_pl);
    const duration = moment(items[i].date, 'YYYY/MM/DD HH:mm:SS').diff(moment(items[i + 1].date, 'YYYY/MM/DD HH:mm:SS'), 'seconds');

    if (aggregates[date] == null) {
      aggregates[date] = {
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
    aggregates[date].count = aggregates[date].count + 1;

    if (totalPl > 0 || totalPl == 0) {

      // 利益が出ている(もしくは0円=一応マイナスではない)回数
      aggregates[date].countPositive = aggregates[date].countPositive + 1;
    } else {
      
      aggregates[date].countNegative = aggregates[date].countNegative + 1;
    }
  
    // 取引時刻
    aggregates[date].timestamps.push(timestamp);

    // 取引単価(リスト)
    aggregates[date].totalPls.push(totalPl);

    // 新規取引 - 決済までの経過時間(秒)
    aggregates[date].durations.push(duration);
  }

  const summaries: FxDailySummaryContext[] = Object.keys(aggregates).map( (date: string) => {

    const record = aggregates[date];

    // 最小・平均・中央・最大の単価を計算
    const totalPls = record.totalPls;
    const timestamps = record.timestamps;
    const durations = record.durations;
    let summary: FxDailySummaryContext;

    if (record.count == 1) {

      summary = {
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

        // 初回取引日時
        firstTradeTimestamp: timestamps[0],
        lastTradeTimestamp: timestamps[0],

        durationsCountMap: formatFxDurationMap(durations),
      };
    
    } else {

      totalPls.sort();
      durations.sort();
      
      const midIndex = Math.floor(record.count / 2);

      summary = {
        date: date,

        profitUnitMax: Math.max(...totalPls),
        profitUnitMin: Math.min(...totalPls),
        profitUnitAvg: (totalPls.reduce( (acc: number, cur: number) => acc + cur, 0)) / record.count,
        profitUnitMid: (totalPls.length % 2 == 1) ? totalPls[midIndex] : (totalPls[midIndex - 1] + totalPls[midIndex]) / 2,
  
        tradeCount: record.count,
        tradeCountPositive: record.countPositive,
        tradeCountNegative: record.countNegative,
        
        timeMin: Math.min(...durations),
        timeMax: Math.max(...durations),
        timeAvg: (durations.reduce( (acc: number, cur: number) => acc + cur, 0)) / record.count,
        timeMid: durations.length % 2 == 1 ? durations[midIndex] : (durations[midIndex - 1] + durations[midIndex]) / 2,

        firstTradeTimestamp: Math.min(...timestamps),
        lastTradeTimestamp: Math.max(...timestamps),
  
        durationsCountMap: formatFxDurationMap(durations),
      };
    }

    return summary;
  });
  summaries.sort((first: any, second: any) => {

    const date1 = Date.parse(first.date);
    const date2 = Date.parse(second.date);
  
    if (date1 > date2) return 1;
    if (date1 < date2) return -1;
    return 0; 
});

  return summaries;
};

export default formatFxDailySummary;
