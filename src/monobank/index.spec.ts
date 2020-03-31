import { Monobank } from "./index";
import { AVAILABLE_CURRENCYCURRENCY_NAME, CURRENCY } from '../models/currency.model';
import { Rate } from '../models/rate.model';

const mockDataApi = [
  {currencyCodeA: 978, currencyCodeB: 980, rateBuy: 30.1, rateSell: 30.8499},
  {currencyCodeA: 840, currencyCodeB: 980, rateBuy: 30.1, rateSell: 30.8499},
  {currencyCodeA: 156, currencyCodeB: 980, rateBuy: 30.1, rateSell: 30.8499},
  {currencyCodeA: 32, currencyCodeB: 980, rateBuy: 30.1, rateSell: 30.8499},
  {currencyCodeA: 50, currencyCodeB: 980, rateBuy: 30.1, rateSell: 30.8499},
];

describe('Monobank', () => {
  let Mono: Monobank;
  let slectedCurrency: AVAILABLE_CURRENCYCURRENCY_NAME[]
  let axiosSpy: jest.SpyInstance;

  beforeEach(() => {
    slectedCurrency = ['USD', 'EUR'];
    Mono = new Monobank(slectedCurrency);

    axiosSpy = jest.spyOn(Mono, 'fetchData');
    axiosSpy.mockImplementation(() => Promise.resolve(mockDataApi));
  });
  
  it('new Monobank() => should create', () => {
    expect(Mono).toBeTruthy();
  });

  it('fetchData() => calling mocked data instead of real', async () => {
    const data = await Mono.fetchData();
    
    expect(axiosSpy).toHaveBeenCalled();
    expect(data).toEqual(mockDataApi);
  });

  it('getAvailableCurrency() => return only avaliable currency', async () => {
    const res = Mono.getAvailableCurrency(mockDataApi);

    expect(Object.keys(res).length).toEqual(2);
    expect(res['840']).toEqual(mockDataApi[1]);
    expect(res['978']).toEqual(mockDataApi[0]);
  });

  it('convertToRate() => return only avaliable currency', async () => {
    const mockOne = mockDataApi[0];
    const name = CURRENCY[mockOne.currencyCodeA].code;
    const expectedRes = new Rate(name, Number(Number(mockOne.rateBuy).toFixed( 2 )), Number(Number(mockOne.rateSell).toFixed( 2 )));
    const res = Mono.convertToRate([mockOne]);

    expect(res.shift()).toEqual(expectedRes);
  });

  it('getRate() => return only avaliable currency', async () => {
    const rate = await Mono.getRate();

    expect(rate.length).toEqual(2);
  });
});
