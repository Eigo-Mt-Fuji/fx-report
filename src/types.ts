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

  // ????????????
  date:string;

  // ????????????(??????)
  profitUnitMin:number;
  // ????????????(??????)
  profitUnitMid:number;
  // ????????????(??????)
  profitUnitAvg:number;
  // ????????????(??????)
  profitUnitMax:number;

  // ??????????????????????????????????????????(??????)
  timeMin:number;
  // ??????????????????????????????????????????(??????)
  timeMid:number;
  // ??????????????????????????????????????????(??????)
  timeAvg:number;
  // ??????????????????????????????????????????(??????)
  timeMax:number;

  // ????????????(1????????????????????????)
  tradeCount:number;

  // ????????????(1????????????????????????????????????)
  tradeCountPositive:number;

  // ????????????(1???????????????????????????????????????)
  tradeCountNegative:number;

  // ??????????????????
  firstTradeTimestamp: number;
  // ??????????????????
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
  
// ???????????????????????????

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