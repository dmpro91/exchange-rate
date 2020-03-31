import Axios from 'axios';

import { IBank } from '../models/bank.model';
import { Rate } from '../models/rate.model';
import { AVAILABLE_CURRENCYCURRENCY_NAME, CURRENCY, AVAILABLE_CURRENCY_NUMBERS, UAH_ISO4217 } from '../models/currency.model';

type AlloweData = Record<number, IMB_Rate>;

const fixRate = (rate: number) => Number(Number(rate).toFixed( 2 ));

export type MonobankKey = 'mono';

export class Monobank extends IBank {
  private API_URL = 'https://api.monobank.ua/bank/currency';
  public selectedCurrency: AVAILABLE_CURRENCYCURRENCY_NAME[];

  constructor(selectedCurrency: IMB_AVAILABLE_CURRENCY[]) {
    super();
    this.selectedCurrency = selectedCurrency;
  }

  public convertToRate(data: AlloweData): Rate[] {
    return Object.values(data).map(mdata => {
      const name = CURRENCY[mdata.currencyCodeA].code;
      return new Rate(name, fixRate(mdata.rateBuy), fixRate(mdata.rateSell));
    });
  }

  public getAvailableCurrency(data: IMB_Rate[]): AlloweData {
    const allowedData: AlloweData = {};
    const currencyToUah = data.filter(mbRate => UAH_ISO4217.number === mbRate.currencyCodeB);

    currencyToUah.map(mbdata => {
      if (AVAILABLE_CURRENCY_NUMBERS.includes(mbdata.currencyCodeA)) {
        allowedData[mbdata.currencyCodeA] = mbdata;
      }
    });

    return allowedData;
  }

  public async fetchData(): Promise<IMB_Rate[]> {
    const { data }: IMB_ServerResponse = await Axios.get<IMB_Rate[]>(this.API_URL);
    return data;
  }

  public async getRate(): Promise<Rate[]> {
    try {
      const data = await this.fetchData();
      const availableData = await this.getAvailableCurrency(data);
      const rate: Rate[] = this.convertToRate(availableData);
      
      return this.filterToEnable(rate);
    } catch (error) {
      throw new Error(error);
    }
  }
}
