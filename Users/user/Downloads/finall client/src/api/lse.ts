const LSE_API_KEY = "lse_live_a6c76690665f24ba1f64754404597fd3";
const LSE_BASE_URL = "https://londonstrategicedge.com/data";

async function lseFetch<T>(endpoint: string): Promise<T> {
  const url = `${LSE_BASE_URL}${endpoint}${endpoint.includes("?") ? "&" : "?"}apikey=${LSE_API_KEY}`;
  try {
    const response = await fetch(url, { method: "GET" });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`LSE API error (${endpoint}):`, error);
    throw error;
  }
}

export interface LSEQuote {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
  timestamp: string;
}

export interface LSEMarketOverview {
  indices: {
    name: string;
    symbol: string;
    price: number;
    change: number;
    changePercent: number;
  }[];
  topGainers: LSEQuote[];
  topLosers: LSEQuote[];
  mostActive: LSEQuote[];
}

export interface LSEHistoricalData {
  symbol: string;
  data: {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  }[];
}

export interface LSEStockSearch {
  symbol: string;
  name: string;
  exchange: string;
  type: string;
}

export interface LSESectorData {
  sector: string;
  performance: number;
  topStocks: LSEQuote[];
}

export interface LSEEconomicCalendar {
  events: {
    date: string;
    time: string;
    country: string;
    event: string;
    impact: "high" | "medium" | "low";
    actual: string;
    forecast: string;
    previous: string;
  }[];
}

export interface LSEForexPair {
  pair: string;
  bid: number;
  ask: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
}

export const lseApi = {
  search: (query: string): Promise<LSEStockSearch[]> =>
    lseFetch(`/search?query=${encodeURIComponent(query)}`),

  quote: (symbol: string): Promise<LSEQuote> =>
    lseFetch(`/quote?symbol=${encodeURIComponent(symbol)}`),

  batchQuotes: (symbols: string[]): Promise<LSEQuote[]> =>
    lseFetch(`/batch-quote?symbols=${symbols.join(",")}`),

  historical: (symbol: string, period: string = "1m"): Promise<LSEHistoricalData> =>
    lseFetch(`/historical?symbol=${encodeURIComponent(symbol)}&period=${period}`),

  marketOverview: (): Promise<LSEMarketOverview> =>
    lseFetch(`/market-overview`),

  indices: (): Promise<LSEQuote[]> =>
    lseFetch(`/indices`),

  sectors: (): Promise<LSESectorData[]> =>
    lseFetch(`/sectors`),

  economicCalendar: (): Promise<LSEEconomicCalendar> =>
    lseFetch(`/economic-calendar`),

  forex: (): Promise<LSEForexPair[]> =>
    lseFetch(`/forex`),

  topGainers: (): Promise<LSEQuote[]> =>
    lseFetch(`/top-gainers`),

  topLosers: (): Promise<LSEQuote[]> =>
    lseFetch(`/top-losers`),
};

export default lseApi;
