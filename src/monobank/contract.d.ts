declare global {
  // Available currency is more than that, you can check it all from
  // origin server response by ISO number https://index.minfin.com.ua/reference/currency/code/
  export type IMB_AVAILABLE_CURRENCY = 'USD' | 'EUR'; 

  export interface IMB_Rate {
    currencyCodeA: number; // The account currency code is ISO 4217
    currencyCodeB: number ; // The account currency code is ISO 4217 -> to what currency the exchange rate
    date: number; // Course time in seconds in Unix time format
    rateSell: number; // Float
    rateBuy: number; // Float
    rateCross: number // Float
  }

  export interface IMB_ServerResponse {
    data: IMB_Rate[];
  }
}

export {}
