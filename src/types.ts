export interface FxMonthlyTransactionsProfitKey {
    key:string;
    actual: boolean;
}

export interface FxMonthlyTransactionsDataEntry {
    [key: string]: number;
}

export interface FxMonthlyTransactionsResponse {
    data: FxMonthlyTransactionsDataEntry[];
    profitKeys: FxMonthlyTransactionsProfitKey[];
    lastTransactionDateComment: string;
    actualSum: number;
}

export interface FxAnnualChartProps {
    year: string;
    data: FxTransactionsData;
    dream: number;
}

export interface FxAnnualStackedBarChartProps {
    data: FxMonthlyTransactionsDataEntry;
    profitKeys: FxMonthlyTransactionsProfitKey[];
    ticks: any[];
}
export interface FxMonthlyComopsedChartProps {
    data: any[];
    ticks: any[];

}
export interface FxTransactionsDataCsvItem {
    order_no: string;
    date: string;
    lot_number: string;
    currency: string;
    buysell: string;
    amount: string;
    price: string;  
    rate: string;
    fee: string;
    swap: string;
    pl: string;
    total_pl: string;
}
export interface FxTransactionsDataNode {

    items: FxTransactionsDataCsvItem[];
}
export interface FxTransactionsDataRecord {
    date: string;
    total_pl: string;
    buysell: string;
    price: number;
} 
export interface FxTransactionsDataNodeWrapper {

    nodes: FxTransactionsDataNode[];
}
export interface FxTransactionsData {
    allFxTransactionsData: FxTransactionsDataNodeWrapper;
}

export interface FxCurrentState {
    deposit: number;
    valuationGainLoss: number;
    buyPosition: number;
    sellPosition: number;
    requiredDeposit: number;
    timestamp: string;
}
// https://www.typescripttutorial.net/typescript-tutorial/typescript-extend-interface/
export interface FxCurrentStateFormProps extends FxCurrentState {
    handleChangeCallback: (currentState: any) => void;     // see https://www.typescriptlang.org/docs/handbook/functions.html
}

export interface FxCurrentStateHookContext {

    currentState: FxCurrentState;
    onChangeDeposit : (e:any)=>void;
    onChangeValuationGainLoss: (e:any)=>void;
    onChangeBuyPosition : (e:any)=>void;
    onChangeSellPosition : (e:any)=>void;
    onChangeRequiredDeposit : (e:any)=>void;
}

export interface FxMonthlyReportProps {
    month: string;
    data: FxTransactionsData;
    aggregate:string;
}

export interface FxPriceLotProps {
    money_jpy: string;
    rate: string;
}

export interface FxProfitLossLabelProps {
    x: number;
    y: number;
    fill: string;
    value: string;
}

export interface FxTransactionsTableProps {
    month: string;
    data: any[];
}

export interface MyPlayGroundMapProps {
    zoom: number;
    width: number;
    height: number;
    latitude: number;
    longitude: number;
    geocoder: any;
    children: any;
}

export interface FxSummaryViewProps {
    month: string;
    data: FxTransactionsData;
}
export interface FxDailySummaryDurationCountEntry {
    [key: string]: number;

}
export interface FxDailySummaryContext {

  // 対象日付
  date:string;

  // 損益単価(最小)
  profitUnitMin:number;
  // 損益単価(中央)
  profitUnitMid:number;
  // 損益単価(平均)
  profitUnitAvg:number;
  // 損益単価(最大)
  profitUnitMax:number;

  // 新規売買〜決済までの所要時間(最小)
  timeMin:number;
  // 新規売買〜決済までの所要時間(中央)
  timeMid:number;
  // 新規売買〜決済までの所要時間(平均)
  timeAvg:number;
  // 新規売買〜決済までの所要時間(最大)
  timeMax:number;

  // 取引回数(1日のトータル回数)
  tradeCount:number;

  // 取引回数(1日の利益が出た取引の回数)
  tradeCountPositive:number;

  // 取引回数(1日の損失を出した取引の回数)
  tradeCountNegative:number;

  // 初回取引日時
  firstTradeTimestamp: number;
  // 最終取引日時
  lastTradeTimestamp: number;

  durationsCountMap: FxDailySummaryDurationCountEntry
}

export interface FxSummaryViewDurationBarChartProps {
    month: string;
    data: FxDailySummaryContext[];
}

export interface DigitalSignageListProps {
    title: string;
}

export interface FxDailySummaryContextData {
    date: string;
    totalPl: string;
    timestamp: number;
    duration: number;
}
  
// イベントを型で管理

// Type alias https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases
export type ContactEvent = {
    // means category only takes the value of 'contract'
    category: 'contact'

    // means action attribute only takes the value of 'submit_form'
    action: 'submit_form'
}
  
export type ClickEvent = {
    category: 'other'
    action: 'click'
}
export type GaEvent = (ContactEvent | ClickEvent) & {
    // whatis Record ? object type whose property keys are Keys and whose property values are Type https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type
    label?: Record<string, string | number | boolean>
    value?: string
}