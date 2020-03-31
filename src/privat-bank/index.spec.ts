import { PrivatBank } from "./index";
import { AVAILABLE_CURRENCYCURRENCY_NAME } from '../models/currency.model';
import { Rate } from '../models/rate.model';

const mockDataApi = [
  {ccy: "USD", base_ccy: "UAH", buy: "27.45000", sale: "28.20000"},
  {ccy: "EUR", base_ccy: "UAH", buy: "27.45000", sale: "28.20000"},
  {ccy: "RUR", base_ccy: "UAH", buy: "27.45000", sale: "28.20000"},
  {ccy: "BTC", base_ccy: "UAH", buy: "27.45000", sale: "28.20000"},
]

describe('PrivatBank', () => {
  let PB: PrivatBank;
  let slectedCurrency: AVAILABLE_CURRENCYCURRENCY_NAME[]
  let axiosSpy: jest.SpyInstance;

  beforeEach(() => {
    slectedCurrency = ['USD', 'EUR'];
    PB = new PrivatBank(slectedCurrency);

    axiosSpy = jest.spyOn(PB, 'fetchData');
    axiosSpy.mockImplementation(() => Promise.resolve(mockDataApi));
  });
  
  it('new PrivatBank() => should create', () => {
    expect(PB).toBeTruthy();
  });

  it('fetchData() => calling mocked data instead of real', async () => {
    const data = await PB.fetchData();
    
    expect(axiosSpy).toHaveBeenCalled();
    expect(data).toEqual(mockDataApi);
  });

  it('filterToAvailable() => return only avaliable currency', async () => {
    const res = PB.filterToAvailable(mockDataApi);
    const currencyCodes = res.map(currency => currency.ccy);

    expect(res.length).toEqual(2);
    expect(currencyCodes).toEqual(slectedCurrency)
  });

  it('convertToRate() => return only avaliable currency', async () => {
    const mockOne = mockDataApi[0];
    const res = PB.convertToRate([mockOne]);
    const expectedRes = new Rate(mockOne.ccy, Number(mockOne.buy), Number(mockOne.sale));

    expect(res.shift()).toEqual(expectedRes);
  });

  it('getRate() => return only avaliable currency', async () => {
    const rate = await PB.getRate();

    expect(rate.length).toEqual(2);
  });
});
