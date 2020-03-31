import { Rate } from './models/rate.model';
import { AVAILABLE_CURRENCYCURRENCY_NAME } from './models/currency.model';

import { PrivatBank, PrivatBankKey } from './privat-bank';
import { Monobank, MonobankKey } from './monobank';

namespace ExchangeRate {
  export type BankKey = PrivatBankKey | MonobankKey;
  export type RateAll = Record<BankKey, Rate[]>;

  export interface IExchangeRate {
    showAll(cerrency?: AVAILABLE_CURRENCYCURRENCY_NAME[]): Promise<RateAll>;
    showFrom(bank: ExchangeRate.BankKey, cerrency?: AVAILABLE_CURRENCYCURRENCY_NAME[]): Promise<Rate[]>;
  }
}

export default class ExchangeRate implements ExchangeRate.IExchangeRate {
  public selectedCerrency: AVAILABLE_CURRENCYCURRENCY_NAME[] = ['USD', 'EUR'];

  public async showAll(selectedCerrency?: ExchangeRate['selectedCerrency']): Promise<ExchangeRate.RateAll> {
    return {
      mono: await new Monobank(selectedCerrency || this.selectedCerrency).getRate(),
      privat: await new PrivatBank(selectedCerrency || this.selectedCerrency).getRate()
    };
  }

  public async showFrom(
    bank: ExchangeRate.BankKey,
    selectedCerrency?: ExchangeRate['selectedCerrency']
  ): Promise<Rate[]> {
    switch (bank) {
      case 'mono':
        return await new Monobank(selectedCerrency || this.selectedCerrency).getRate();
      case 'privat':
        return await new PrivatBank(selectedCerrency || this.selectedCerrency).getRate();
    }
  }
}
