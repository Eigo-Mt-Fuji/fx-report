
export default function calculateFxProfitLossTicks(data, profitTicksNum = 4) {
    const ticks = [];
    const profits = data.map( (value) => parseInt(value.profit));

    const maxProfit = Math.max(...profits);
    const minProfit = Math.min(...profits);

    if (minProfit < 0) {
        
        ticks.push(-10000 * Math.pow(10, Math.floor(Math.log10(Math.abs(minProfit)) - 4)));
    }

    ticks.push(0);
    
    const ticksMaxValue = 10000 * Math.pow(10, Math.max(Math.ceil(Math.log10(maxProfit) - 4), 1));

    for (let i = 1; i < profitTicksNum - 1; i++) {
        ticks.push( (i / profitTicksNum ) * ticksMaxValue);
    }

    ticks.push(ticksMaxValue);

    return ticks;
}