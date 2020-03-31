declare global {
  export type IPB_AVAILABLE_CURRENCY = 'USD' | 'EUR';

  export interface IPB_Rate {
    ccy: 'USD' | 'EUR' | 'RUR'; // Currency code (Code)
    base_ccy: 'UAH' | 'USD'; // National currency code
    buy: string; // Purchase rate
    sale: string; // Selling rate
  }

  export interface IPB_ServerResponse {
    data: IPB_Rate[];
  }
}

export {}
