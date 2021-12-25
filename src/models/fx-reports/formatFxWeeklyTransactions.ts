import moment from 'moment';
import { FxTransactionsData } from '../../types';

function formatFxWeeklyTransactions(data: FxTransactionsData, month: string) : any[] {
    // const today = moment();

    const convertToWeek = (date: Date) => {
        const monthStartDay = moment(month, 'YYYY/MM').startOf('month');
        const monthEndDay = moment(month, 'YYYY/MM').endOf('month');
        const weekStartDay = date.startOf('week');
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
    // const thisWeek = convertToWeek(today);

    const res = data.allFxTransactionsData.nodes.map( (node) => {
        const results = {};

        for( let i = 0; i < node.items.length; i+= 2) {
            const date = node.items[i].date.split(' ')[0];
            if ( !date.startsWith(month) ) {
                continue;
            }
            
            const aggregateKey = convertToWeek(moment(date, 'YYYY/MM/DD'));
            // const aggregateKey = week !== thisWeek ? week : moment(date, "YYYY/MM/DD").format("MM/DD");

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
    }).reduce( (acc, val) => {

        return [...acc, ...val];
    }, []);

    res.sort();

    return res.reverse();
}

export default formatFxWeeklyTransactions;
