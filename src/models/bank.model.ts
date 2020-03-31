import { Rate } from './rate.model';
import { AVAILABLE_CURRENCYCURRENCY_NAME } from './currency.model';


export interface IBank {
  selectedCurrency: AVAILABLE_CURRENCYCURRENCY_NAME[];
  getRate(): Promise<Rate[]>;
}

export abstract class IBank implements IBank {
  protected filterToEnable(data: Rate[]): Rate[] {
    return data.filter(rate =>  this.selectedCurrency.includes(rate.name as AVAILABLE_CURRENCYCURRENCY_NAME));
  }
}