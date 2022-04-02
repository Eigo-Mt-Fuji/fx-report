import { FxTransactionsDataCsvItem, FxTransactionsDataNode, FxTransactionsDataNodeWrapper, FxTransactionsData } from "../../types";
// https://nodejs.org/api/fs.html#filehandlecreatereadstreamoptions
// FYI Streams compatibility with async generators and async iterators  https://nodejs.org/api/stream.html#streams-compatibility-with-async-generators-and-async-iterators
const fs = require("fs");
const readline = require("readline");
const glob = require( 'glob' );
const path = require( 'path' );

function findAllFxTransactionCsvFiles() : string[] {
    const results: string[] = [];

    glob.sync( './src/data/fx_transactions/*.csv' ).forEach( function( file: string ) {
        // resolves a sequence of paths or path segments into an absolute path https://nodejs.org/api/path.html#pathresolvepaths
        const csvAbsolutePath = path.resolve( file );
        console.log(csvAbsolutePath);
        results.push(csvAbsolutePath);
    });
    return results;
}

async function loadFxTransactionCsv(csvAbsolutePath: string) : Promise<FxTransactionsDataCsvItem[]> {
    
    return new Promise((resolve, reject) => { 
        const stream = fs.createReadStream(csvAbsolutePath);
        const reader = readline.createInterface({ input: stream });
        const arr: FxTransactionsDataCsvItem[] = [];
    
        reader.on("line", (row: string) => { 
            const columns: string[] = row.split(",");
            const obj: FxTransactionsDataCsvItem = {
                order_no: columns[0],
                date: columns[1],
                lot_number: columns[2],
                currency: columns[3],
                buysell: columns[4],
                amount: columns[5],
                price: columns[6],
                rate: columns[7],
                fee: columns[8],
                swap: columns[9],
                pl: columns[10],
                total_pl: columns[11],
            };
            arr.push(obj);
        });
    
        reader.on('close', function () {
            console.log('closed!!');
            resolve(arr);
        });    
    });
}
export default async function loadFxTransactionsAll()  {

    const pathArray = findAllFxTransactionCsvFiles();
    // use async/await with array map https://stackoverflow.com/questions/40140149/use-async-await-with-array-map
    const nodes: FxTransactionsDataNode[]  = await Promise.all(pathArray.map( async (csvPath: string) => {
        const items: FxTransactionsDataCsvItem[] = await loadFxTransactionCsv(csvPath);

        return {
            items
        }
    }));
    const result = {
        allFxTransactionsData: {
            nodes: nodes
        } as FxTransactionsDataNodeWrapper
    };

    return result;
}