import Axios from 'axios';

import { Rate } from '../models/rate.model';
import { IBank } from '../models/bank.model';
import { AVAILABLE_CURRENCYCURRENCY_NAME, AVAILABLE_CURRENCY_CODE } from '../models/currency.model';

export type PrivatBankKey = 'privat';

export class PrivatBank extends IBank {
  private API_URL = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';
  public selectedCurrency: AVAILABLE_CURRENCYCURRENCY_NAME[];

  constructor(selectedCurrency: IPB_AVAILABLE_CURRENCY[]) {
    super();
    this.selectedCurrency = selectedCurrency;
  }

  public convertToRate(data: IPB_Rate[]): Rate[] {
    return data.map(pbdata => {
      return new Rate(pbdata.ccy as AVAILABLE_CURRENCYCURRENCY_NAME, Number(pbdata.buy), Number(pbdata.sale));
    });
  }

  public filterToAvailable(data: IPB_Rate[]): IPB_Rate[] {
    return data.filter(pbdata => AVAILABLE_CURRENCY_CODE.includes(pbdata.ccy as any))
  }

  public async fetchData(): Promise<IPB_Rate[]> {
    const { data }: IPB_ServerResponse = await Axios.get<IPB_Rate[]>(this.API_URL);
    return data;
  }

  public async getRate(): Promise<Rate[]> {
    try {
      const data = await this.fetchData();
      const availableData = await this.filterToAvailable(data);
      const rate: Rate[] = this.convertToRate(availableData);
      return this.filterToEnable(rate);
    } catch (error) {
      throw new Error(error);
    }
  }
}
