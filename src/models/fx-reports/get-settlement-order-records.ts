import {FxTransactionsDataRecord} from '../../types';

export default function getSettlementOrderRecords(buffer: any[]) : FxTransactionsDataRecord[] {

    return buffer.filter( (item) => {

        return item.buysell == '決済売' || item.buysell == '決済買';
    });
}