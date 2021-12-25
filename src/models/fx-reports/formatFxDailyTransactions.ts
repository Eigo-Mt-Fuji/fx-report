import moment from 'moment';
import { FxTransactionsData } from '../../types';

function formatFxTransactions(data: FxTransactionsData, month: string) : any[] {

    const res = data.allFxTransactionsData.nodes.map( (node) => {
        const results: any = {};

        for( let i = 0; i < node.items.length; i+= 2) {
            const date = node.items[i].date.split(' ')[0];
            if ( !date.startsWith(month) ) {
                continue;
            }

            const aggregateKey = moment(date, 'YYYY/MM/DD').format('MM/DD');

            const profit = node.items[i].total_pl;
            const buysell = node.items[i].buysell;
            const pips = Math.round(100 * (buysell === '決済売' ? node.items[i].price - node.items[i + 1].price : node.items[i + 1].price - node.items[i].price), 1);

            if(results[aggregateKey] === undefined) {

                results[aggregateKey] = {
                    name: aggregateKey,
                    profit: parseInt(profit),
                    pips: pips
                };
            } else {

                results[aggregateKey].profit += parseInt(profit);
                results[aggregateKey].pips += pips;
            }
        }

        return Object.values(results);
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
