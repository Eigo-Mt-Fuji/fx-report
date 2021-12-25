export default async function exchangeRatesApi(base_url: string, path: string, base: string) : Promise<any> {
    
    // const response = await fetch(
    //     `${base_url}${path}?base=${base}&access_key=${process.env.GATSBY_EXCHANGERATES_API_ACCESS_TOKEN}`,
    //     {
    //         mode:'cors', 
    //         referrerPolicy: 'strict-origin-when-cross-origin'
    //     }
    // );
    
    // return response.json();
    return new Promise( (resolve, _reject) => {

        resolve({
            date: '2021-04-02',
            rates: {
                'JPY': 110.688,
            }
        });
    });
}