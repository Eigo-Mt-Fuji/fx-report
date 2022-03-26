import {FxTransactionDataRecord} from '../../types';

export default function getOpenInterestRecord(buffer: any[]) : FxTransactionDataRecord|null {
    
    const result = buffer.filter( (item) => {

        return item.buysell == '新規売' || item.buysell == '新規買';
    });
    if ( result ) {

        return result[0];  
    }
    console.log('ERROR: found multi OpenInterestRecords');
    console.log(JSON.stringify(buffer));
    return null;
}
