export type AVAILABLE_CURRENCYCURRENCY_NAME = 'USD' | 'EUR';

export interface ISO4217 {
  code: string,
  number: number
}

export const UAH_ISO4217: ISO4217 = { code: 'UAH', number: 980 };

export const CURRENCY: Record<ISO4217['number'], ISO4217> = {
  840: { code: 'USD', number: 840 },
  978: { code:  'EUR', number: 978},
  980: UAH_ISO4217
}

export const AVAILABLE_CURRENCY_NUMBERS = Object.values(CURRENCY).map(iso => iso.number);
export const AVAILABLE_CURRENCY_CODE = Object.values(CURRENCY).map(iso => iso.code);
