const FMP_API_KEY = "1yRR1vSS2j2PDdVNYpyqoNCyNr8DMxUW";
const FMP_BASE_URL = "https://financialmodelingprep.com/stable";

async function fmpFetch<T>(endpoint: string): Promise<T> {
  const url = `${FMP_BASE_URL}${endpoint}${endpoint.includes("?") ? "&" : "?"}apikey=${FMP_API_KEY}`;
  try {
    const response = await fetch(url, { method: "GET" });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`FMP API error (${endpoint}):`, error);
    throw error;
  }
}

export interface StockSearchResult {
  symbol: string;
  name: string;
  currency: string;
  stockExchange: string;
  exchangeShortName: string;
}

export interface StockQuote {
  symbol: string;
  name: string;
  price: number;
  changesPercentage: number;
  change: number;
  dayLow: number;
  dayHigh: number;
  yearHigh: number;
  yearLow: number;
  marketCap: number;
  volume: number;
  avgVolume: number;
  exchangeShortName: string;
  open: number;
  previousClose: number;
  eps: number;
  pe: number;
  earningsAnnouncement: string;
  sharesOutstanding: number;
  timestamp: number;
}

export interface HistoricalPrice {
  symbol: string;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  adjClose: number;
  volume: number;
  unadjustedVolume: number;
  change: number;
  changePercent: number;
  vwap: number;
  label: string;
  changeOverTime: number;
}

export interface CompanyProfile {
  symbol: string;
  price: number;
  beta: number;
  volAvg: number;
  mktCap: number;
  lastDiv: number;
  range: string;
  changes: number;
  companyName: string;
  currency: string;
  cik: string;
  isin: string;
  cusip: string;
  exchange: string;
  exchangeShortName: string;
  industry: string;
  website: string;
  description: string;
  ceo: string;
  sector: string;
  country: string;
  fullTimeEmployees: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  dcfDiff: number;
  dcf: number;
  image: string;
  ipoDate: string;
  defaultImage: boolean;
  isEtf: boolean;
  isActivelyTrading: boolean;
  isAdr: boolean;
  isFund: boolean;
}

export interface EconomicEvent {
  event: string;
  date: string;
  country: string;
  currency: string;
  actual: string;
  previous: string;
  estimate: string;
  impact: string;
  change: string;
  changePercentage: string;
}

export interface StockListItem {
  symbol: string;
  name: string;
  currency: string;
  stockExchange: string;
  exchangeShortName: string;
}

export interface IncomeStatement {
  date: string;
  symbol: string;
  reportedCurrency: string;
  cik: string;
  fillingDate: string;
  acceptedDate: string;
  calendarYear: string;
  period: string;
  revenue: number;
  costOfRevenue: number;
  grossProfit: number;
  grossProfitRatio: number;
  researchAndDevelopmentExpenses: number;
  generalAndAdministrativeExpenses: number;
  sellingAndMarketingExpenses: number;
  sellingGeneralAndAdministrativeExpenses: number;
  otherExpenses: number;
  operatingExpenses: number;
  costAndExpenses: number;
  interestIncome: number;
  interestExpense: number;
  depreciationAndAmortization: number;
  ebitda: number;
  ebitdaratio: number;
  operatingIncome: number;
  operatingIncomeRatio: number;
  totalOtherIncomeExpensesNet: number;
  incomeBeforeTax: number;
  incomeBeforeTaxRatio: number;
  incomeTaxExpense: number;
  netIncome: number;
  netIncomeRatio: number;
  eps: number;
  epsdiluted: number;
  weightedAverageShsOut: number;
  weightedAverageShsOutDil: number;
  link: string;
  finalLink: string;
}

export interface SectorPerformance {
  sector: string;
  changesPercentage: string;
}

export interface MarketMover {
  symbol: string;
  name: string;
  change: number;
  price: number;
  changesPercentage: number;
}

export interface ForexQuote {
  ticker: string;
  bid: string;
  ask: string;
  open: string;
  low: string;
  high: string;
  changes: number;
  date: string;
}

export interface CryptoQuote {
  symbol: string;
  name: string;
  price: number;
  changesPercentage: number;
  change: number;
  dayLow: number;
  dayHigh: number;
  volume: number;
  marketCap: number;
}

export interface NewsItem {
  symbol: string;
  publishedDate: string;
  title: string;
  image: string;
  site: string;
  text: string;
  url: string;
}

export interface BalanceSheet {
  date: string;
  symbol: string;
  totalAssets: number;
  totalLiabilities: number;
  totalStockholdersEquity: number;
  totalDebt: number;
  netDebt: number;
  cashAndCashEquivalents: number;
  longTermDebt: number;
  shortTermDebt: number;
}

export interface CashFlow {
  date: string;
  symbol: string;
  operatingCashFlow: number;
  capitalExpenditure: number;
  freeCashFlow: number;
  netIncome: number;
  depreciationAndAmortization: number;
  stockBasedCompensation: number;
}

export const fmpApi = {
  search: (query: string): Promise<StockSearchResult[]> =>
    fmpFetch(`/search-name?query=${encodeURIComponent(query)}`),

  searchSymbol: (query: string): Promise<StockSearchResult[]> =>
    fmpFetch(`/search-symbol?query=${encodeURIComponent(query)}`),

  stockList: (): Promise<StockListItem[]> =>
    fmpFetch(`/stock-list`),

  quote: (symbol: string): Promise<StockQuote[]> =>
    fmpFetch(`/quote?symbol=${encodeURIComponent(symbol)}`),

  batchQuote: (symbols: string[]): Promise<StockQuote[]> =>
    fmpFetch(`/quote?symbol=${symbols.join(",")}`),

  historicalPrices: (symbol: string, from?: string, to?: string): Promise<HistoricalPrice[]> =>
    fmpFetch(`/historical-price-eod/full?symbol=${encodeURIComponent(symbol)}${from ? `&from=${from}` : ""}${to ? `&to=${to}` : ""}`),

  intraday: (symbol: string, interval: string = "1min"): Promise<any[]> =>
    fmpFetch(`/historical-chart/${interval}?symbol=${encodeURIComponent(symbol)}`),

  profile: (symbol: string): Promise<CompanyProfile[]> =>
    fmpFetch(`/profile?symbol=${encodeURIComponent(symbol)}`),

  incomeStatement: (symbol: string, period: string = "annual"): Promise<IncomeStatement[]> =>
    fmpFetch(`/income-statement?symbol=${encodeURIComponent(symbol)}&period=${period}`),

  balanceSheet: (symbol: string, period: string = "annual"): Promise<BalanceSheet[]> =>
    fmpFetch(`/balance-sheet-statement?symbol=${encodeURIComponent(symbol)}&period=${period}`),

  cashFlow: (symbol: string, period: string = "annual"): Promise<CashFlow[]> =>
    fmpFetch(`/cash-flow-statement?symbol=${encodeURIComponent(symbol)}&period=${period}`),

  economicCalendar: (from?: string, to?: string): Promise<EconomicEvent[]> =>
    fmpFetch(`/economic-calendar?${from ? `from=${from}&` : ""}${to ? `to=${to}&` : ""}`),

  sectorPerformance: (): Promise<SectorPerformance[]> =>
    fmpFetch(`/sector-performance`),

  gainers: (): Promise<MarketMover[]> =>
    fmpFetch(`/stock_market/gainers`),

  losers: (): Promise<MarketMover[]> =>
    fmpFetch(`/stock_market/losers`),

  mostActive: (): Promise<MarketMover[]> =>
    fmpFetch(`/stock_market/actives`),

  forex: (): Promise<ForexQuote[]> =>
    fmpFetch(`/forex`),

  crypto: (): Promise<CryptoQuote[]> =>
    fmpFetch(`/cryptocurrency`),

  news: (symbol: string, limit: number = 10): Promise<NewsItem[]> =>
    fmpFetch(`/stock-news?tickers=${encodeURIComponent(symbol)}&limit=${limit}`),

  marketNews: (limit: number = 20): Promise<NewsItem[]> =>
    fmpFetch(`/stock-news?limit=${limit}`),
};

export default fmpApi;
