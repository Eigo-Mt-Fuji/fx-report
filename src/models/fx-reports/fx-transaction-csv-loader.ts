import { FxTransactionDataCsvItem, FxTransactionsDataNode, FxTransactionDataNodeWrapper, FxTransactionsData } from "../../types";
// https://nodejs.org/api/fs.html#filehandlecreatereadstreamoptions
// FYI Streams compatibility with async generators and async iterators  https://nodejs.org/api/stream.html#streams-compatibility-with-async-generators-and-async-iterators
const fs = require("fs");
const readline = require("readline");
const glob = require( 'glob' );
const path = require( 'path' );

function findAllFxTransactionCsvFiles() : string[] {
    const results: string[] = [];

    glob.sync( './src/data/fx_transactions/*.csv' ).forEach( function( file ) {
        // resolves a sequence of paths or path segments into an absolute path https://nodejs.org/api/path.html#pathresolvepaths
        const csvAbsolutePath = path.resolve( file );

        results.push(csvAbsolutePath);
    });
    return results;
}

function loadFxTransactionCsv(csvAbsolutePath: string) : FxTransactionDataCsvItem[] {
        
    const stream = fs.createReadStream(csvAbsolutePath);
    const reader = readline.createInterface({ input: stream }):
    const arr: FxTransactionDataCsvItem[] = [];

    reader.on("line", (row: string) => { 
        const columns: string[] = row.split(",");
        const obj: FxTransactionDataCsvItem = {
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
    return arr;
}
export function loadFxTransactionsAll() : FxTransactionsData {
    const pathArray = findAllFxTransactionCsvFiles();
    const nodes: FxTransactionsDataNode[]  = pathArray.map( (csvPath: string) => {
        const items: FxTransactionDataCsvItem[] = loadFxTransactionCsv(csvPath);

        return {
            items
        }
    });

    return {
        allFxTransactionsData: {
            nodes: nodes
        } as FxTransactionDataNodeWrapper
    }
}