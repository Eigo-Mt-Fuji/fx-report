import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import { useStaticQuery, graphql } from 'gatsby'

import Table from 'react-bootstrap/Table';
import formatFxDailySummary from '../../models/fx-reports/formatFxDailySummary';
import {FxDailySummaryContext, FxSummaryViewProps} from '../../types';

import FxSummaryViewDurationBarChart from './fx-summary-view-duration-barchart'
/*
 * * 1日の取引のサマリーを一覧化する(テーブル) ※改善に活用する。 + 自分が一番稼げている取引時間帯を知りたい、 取引時間帯を制限した場合の収益影響を知りたい
 *   * 最小単価
 *   * 平均単価
 *   * 中央単価
 *   * 最大単価
 *   * 取引回数
 *   * 取引回数(プラス)
 *   * 取引回数(マイナス)
 *   * 最初の取引時刻
 *   * 最後の取引時刻
 * * 取引所要時間間隔分布(日毎の積み上げ棒グラフ)
 *   * 個別の取引について、新規取引〜決済売買までの経過時間を算出し、６つの尺に当てはめる。
 *     * 〜1分 〜5分 〜15分 〜1時間 〜1日 1日以上
 *   * 日単位で、６つの尺それぞれの取引回数を集計し、月別の棒グラフにまとめて表示表示
 *
**/
const FxSummaryView = (props: FxSummaryViewProps) => {

    const transactions = useStaticQuery(graphql`{
        allFxTransactionsData {
            nodes {
                items {
                    date
                    buysell
                    price
                    total_pl
                }
            }
        }
    }`)
    const summaries = formatFxDailySummary(props.month, transactions);
    
    if (summaries === null) {

      return (
        <div>ロード中...</div>
      );
    }

    const renderFxDailySummaryRow = (item: FxDailySummaryContext, index: number) => {

      return (
        <tr key={`fx-daily-summary-row${index+1}`}>
          <td>{moment(item.date, 'YYYY/MM/DD').format('MM/DD')}</td>
          <td>{item.tradeCount}</td>
          <td>{item.profitUnitMin}</td>
          <td>{item.profitUnitMid}</td>
          <td>{item.profitUnitAvg}</td>
          <td>{item.profitUnitMax}</td>
          <td>{moment(item.firstTradeTimestamp).format('HH:mm:SS')}</td>
          <td>{moment(item.lastTradeTimestamp).format('HH:mm:SS')}</td>
        </tr>
      )
    };

    return (
      <div>

        <Table responsive> 
          <thead>
            <tr>
              <th key="date">取引日</th>
              <th key="tradeCount">取引回数</th>
              <th key="profitUnitMin">損益(最小)</th>
              <th key="profitUnitMid">損益(中央)</th>
              <th key="profitUnitAvg">損益(平均)</th>
              <th key="profitUnitMax">損益(最大)</th>
              <th key="firstTradeTimestamp">初回取引時刻</th>
              <th key="lastTradeTimestamp">最終取引時刻</th>
            </tr>
          </thead>
          <tbody>
            {summaries.map(renderFxDailySummaryRow)}
          </tbody>
        </Table>
        <div>Chart</div>
        <div style={{width: '100%', height: '500px'}}>
          <FxSummaryViewDurationBarChart month={props.month} data={summaries}></FxSummaryViewDurationBarChart>
        </div>      
      </div>
    );
};

export default FxSummaryView;
