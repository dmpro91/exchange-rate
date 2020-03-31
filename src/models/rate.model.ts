import { AVAILABLE_CURRENCYCURRENCY_NAME } from './currency.model';

export class Rate {
  constructor(
    public name: string,
    public buy: number,
    public sale: number
  ) {}
}
