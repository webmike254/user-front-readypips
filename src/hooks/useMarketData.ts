import { useState, useEffect, useCallback, useRef } from "react";
import fmpApi, {
  type StockQuote,
  type HistoricalPrice,
  type StockSearchResult,
  type EconomicEvent,
  type CompanyProfile,
  type SectorPerformance,
  type MarketMover,
  type ForexQuote,
  type CryptoQuote,
  type NewsItem,
  type IncomeStatement,
  type BalanceSheet,
  type CashFlow,
} from "@/api/fmp";
import lseApi, {
  type LSEQuote,
  type LSEMarketOverview,
  type LSEHistoricalData,
  type LSEEconomicCalendar,
  type LSEForexPair,
} from "@/api/lse";

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useAsyncState<T>(): AsyncState<T> & {
  setLoading: () => void;
  setData: (data: T) => void;
  setError: (error: string) => void;
} {
  const [state, setState] = useState<AsyncState<T>>({ data: null, loading: false, error: null });
  return {
    ...state,
    setLoading: () => setState({ data: null, loading: true, error: null }),
    setData: (data: T) => setState({ data, loading: false, error: null }),
    setError: (error: string) => setState({ data: null, loading: false, error }),
  };
}

export function useStockQuote(symbol: string) {
  const state = useAsyncState<StockQuote[]>();

  useEffect(() => {
    if (!symbol) return;
    let cancelled = false;
    state.setLoading();

    fmpApi
      .quote(symbol)
      .then((data) => { if (!cancelled) state.setData(data); })
      .catch((err) => { if (!cancelled) state.setError(err.message || "Failed to fetch quote"); });

    return () => { cancelled = true; };
  }, [symbol]);

  return state;
}

export function useBatchQuotes(symbols: string[]) {
  const state = useAsyncState<StockQuote[]>();

  useEffect(() => {
    if (!symbols.length) return;
    let cancelled = false;
    state.setLoading();

    fmpApi
      .batchQuote(symbols)
      .then((data) => { if (!cancelled) state.setData(data); })
      .catch((err) => { if (!cancelled) state.setError(err.message || "Failed to fetch quotes"); });

    return () => { cancelled = true; };
  }, [symbols.join(",")]);

  return state;
}

export function useHistoricalPrices(symbol: string, from?: string, to?: string) {
  const state = useAsyncState<HistoricalPrice[]>();

  useEffect(() => {
    if (!symbol) return;
    let cancelled = false;
    state.setLoading();

    fmpApi
      .historicalPrices(symbol, from, to)
      .then((data) => { if (!cancelled) state.setData(data); })
      .catch((err) => { if (!cancelled) state.setError(err.message || "Failed to fetch historical data"); });

    return () => { cancelled = true; };
  }, [symbol, from, to]);

  return state;
}

export function useIntraday(symbol: string, interval: string = "1min") {
  const state = useAsyncState<any[]>();

  useEffect(() => {
    if (!symbol) return;
    let cancelled = false;
    state.setLoading();

    fmpApi
      .intraday(symbol, interval)
      .then((data) => { if (!cancelled) state.setData(data); })
      .catch((err) => { if (!cancelled) state.setError(err.message || "Failed to fetch intraday data"); });

    return () => { cancelled = true; };
  }, [symbol, interval]);

  return state;
}

export function useStockSearch(query: string, debounceMs = 300) {
  const state = useAsyncState<StockSearchResult[]>();
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!query || query.length < 2) {
      state.setData([]);
      return;
    }
    let cancelled = false;
    clearTimeout(timerRef.current);
    state.setLoading();

    timerRef.current = setTimeout(() => {
      fmpApi
        .search(query)
        .then((data) => { if (!cancelled) state.setData(data.slice(0, 10)); })
        .catch((err) => { if (!cancelled) state.setError(err.message || "Failed to search"); });
    }, debounceMs);

    return () => { cancelled = true; clearTimeout(timerRef.current); };
  }, [query, debounceMs]);

  return state;
}

export function useEconomicCalendar(from?: string, to?: string) {
  const state = useAsyncState<EconomicEvent[]>();

  useEffect(() => {
    let cancelled = false;
    state.setLoading();

    fmpApi
      .economicCalendar(from, to)
      .then((data) => { if (!cancelled) state.setData(data.slice(0, 50)); })
      .catch((err) => { if (!cancelled) state.setError(err.message || "Failed to fetch economic calendar"); });

    return () => { cancelled = true; };
  }, [from, to]);

  return state;
}

export function useCompanyProfile(symbol: string) {
  const state = useAsyncState<CompanyProfile[]>();

  useEffect(() => {
    if (!symbol) return;
    let cancelled = false;
    state.setLoading();

    fmpApi
      .profile(symbol)
      .then((data) => { if (!cancelled) state.setData(data); })
      .catch((err) => { if (!cancelled) state.setError(err.message || "Failed to fetch profile"); });

    return () => { cancelled = true; };
  }, [symbol]);

  return state;
}

export function useIncomeStatement(symbol: string, period: string = "annual") {
  const state = useAsyncState<IncomeStatement[]>();

  useEffect(() => {
    if (!symbol) return;
    let cancelled = false;
    state.setLoading();

    fmpApi
      .incomeStatement(symbol, period)
      .then((data) => { if (!cancelled) state.setData(data); })
      .catch((err) => { if (!cancelled) state.setError(err.message || "Failed to fetch income statement"); });

    return () => { cancelled = true; };
  }, [symbol, period]);

  return state;
}

export function useBalanceSheet(symbol: string, period: string = "annual") {
  const state = useAsyncState<BalanceSheet[]>();

  useEffect(() => {
    if (!symbol) return;
    let cancelled = false;
    state.setLoading();

    fmpApi
      .balanceSheet(symbol, period)
      .then((data) => { if (!cancelled) state.setData(data); })
      .catch((err) => { if (!cancelled) state.setError(err.message || "Failed to fetch balance sheet"); });

    return () => { cancelled = true; };
  }, [symbol, period]);

  return state;
}

export function useCashFlow(symbol: string, period: string = "annual") {
  const state = useAsyncState<CashFlow[]>();

  useEffect(() => {
    if (!symbol) return;
    let cancelled = false;
    state.setLoading();

    fmpApi
      .cashFlow(symbol, period)
      .then((data) => { if (!cancelled) state.setData(data); })
      .catch((err) => { if (!cancelled) state.setError(err.message || "Failed to fetch cash flow"); });

    return () => { cancelled = true; };
  }, [symbol, period]);

  return state;
}

export function useSectorPerformance() {
  const state = useAsyncState<SectorPerformance[]>();

  useEffect(() => {
    let cancelled = false;
    state.setLoading();

    fmpApi
      .sectorPerformance()
      .then((data) => { if (!cancelled) state.setData(data); })
      .catch((err) => { if (!cancelled) state.setError(err.message || "Failed to fetch sector performance"); });

    return () => { cancelled = true; };
  }, []);

  return state;
}

export function useMarketGainers() {
  const state = useAsyncState<MarketMover[]>();

  useEffect(() => {
    let cancelled = false;
    state.setLoading();

    fmpApi
      .gainers()
      .then((data) => { if (!cancelled) state.setData(data.slice(0, 10)); })
      .catch((err) => { if (!cancelled) state.setError(err.message || "Failed to fetch gainers"); });

    return () => { cancelled = true; };
  }, []);

  return state;
}

export function useMarketLosers() {
  const state = useAsyncState<MarketMover[]>();

  useEffect(() => {
    let cancelled = false;
    state.setLoading();

    fmpApi
      .losers()
      .then((data) => { if (!cancelled) state.setData(data.slice(0, 10)); })
      .catch((err) => { if (!cancelled) state.setError(err.message || "Failed to fetch losers"); });

    return () => { cancelled = true; };
  }, []);

  return state;
}

export function useMostActive() {
  const state = useAsyncState<MarketMover[]>();

  useEffect(() => {
    let cancelled = false;
    state.setLoading();

    fmpApi
      .mostActive()
      .then((data) => { if (!cancelled) state.setData(data.slice(0, 10)); })
      .catch((err) => { if (!cancelled) state.setError(err.message || "Failed to fetch most active"); });

    return () => { cancelled = true; };
  }, []);

  return state;
}

export function useForex() {
  const state = useAsyncState<ForexQuote[]>();

  useEffect(() => {
    let cancelled = false;
    state.setLoading();

    fmpApi
      .forex()
      .then((data) => { if (!cancelled) state.setData(data.slice(0, 20)); })
      .catch((err) => { if (!cancelled) state.setError(err.message || "Failed to fetch forex"); });

    return () => { cancelled = true; };
  }, []);

  return state;
}

export function useCrypto() {
  const state = useAsyncState<CryptoQuote[]>();

  useEffect(() => {
    let cancelled = false;
    state.setLoading();

    fmpApi
      .crypto()
      .then((data) => { if (!cancelled) state.setData(data.slice(0, 20)); })
      .catch((err) => { if (!cancelled) state.setError(err.message || "Failed to fetch crypto"); });

    return () => { cancelled = true; };
  }, []);

  return state;
}

export function useNews(symbol?: string, limit: number = 10) {
  const state = useAsyncState<NewsItem[]>();

  useEffect(() => {
    let cancelled = false;
    state.setLoading();

    const fetcher = symbol ? fmpApi.news(symbol, limit) : fmpApi.marketNews(limit);
    fetcher
      .then((data) => { if (!cancelled) state.setData(data); })
      .catch((err) => { if (!cancelled) state.setError(err.message || "Failed to fetch news"); });

    return () => { cancelled = true; };
  }, [symbol, limit]);

  return state;
}

export function useLSEMarketOverview() {
  const state = useAsyncState<LSEMarketOverview>();

  useEffect(() => {
    let cancelled = false;
    state.setLoading();

    lseApi
      .marketOverview()
      .then((data) => { if (!cancelled) state.setData(data); })
      .catch((err) => { if (!cancelled) state.setError(err.message || "Failed to fetch market overview"); });

    return () => { cancelled = true; };
  }, []);

  return state;
}

export function useLSEQuote(symbol: string) {
  const state = useAsyncState<LSEQuote>();

  useEffect(() => {
    if (!symbol) return;
    let cancelled = false;
    state.setLoading();

    lseApi
      .quote(symbol)
      .then((data) => { if (!cancelled) state.setData(data); })
      .catch((err) => { if (!cancelled) state.setError(err.message || "Failed to fetch LSE quote"); });

    return () => { cancelled = true; };
  }, [symbol]);

  return state;
}

export function useLSEHistorical(symbol: string, period: string = "1m") {
  const state = useAsyncState<LSEHistoricalData>();

  useEffect(() => {
    if (!symbol) return;
    let cancelled = false;
    state.setLoading();

    lseApi
      .historical(symbol, period)
      .then((data) => { if (!cancelled) state.setData(data); })
      .catch((err) => { if (!cancelled) state.setError(err.message || "Failed to fetch LSE historical data"); });

    return () => { cancelled = true; };
  }, [symbol, period]);

  return state;
}

export function useLSEForex() {
  const state = useAsyncState<LSEForexPair[]>();

  useEffect(() => {
    let cancelled = false;
    state.setLoading();

    lseApi
      .forex()
      .then((data) => { if (!cancelled) state.setData(data); })
      .catch((err) => { if (!cancelled) state.setError(err.message || "Failed to fetch LSE forex"); });

    return () => { cancelled = true; };
  }, []);

  return state;
}

export function useLSEEconomicCalendar() {
  const state = useAsyncState<LSEEconomicCalendar>();

  useEffect(() => {
    let cancelled = false;
    state.setLoading();

    lseApi
      .economicCalendar()
      .then((data) => { if (!cancelled) state.setData(data); })
      .catch((err) => { if (!cancelled) state.setError(err.message || "Failed to fetch LSE economic calendar"); });

    return () => { cancelled = true; };
  }, []);

  return state;
}

export function useAutoRefresh<T>(fetchFn: () => Promise<T>, intervalMs = 60000) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(() => {
    setLoading(true);
    fetchFn()
      .then((result) => { setData(result); setError(null); })
      .catch((err) => setError(err.message || "Refresh failed"))
      .finally(() => setLoading(false));
  }, [fetchFn]);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, intervalMs);
    return () => clearInterval(interval);
  }, [refresh, intervalMs]);

  return { data, loading, error, refresh };
}

export function useLiveMarketOverview() {
  return useAutoRefresh(() => lseApi.marketOverview(), 30000);
}

export function useLiveQuotes(symbols: string[]) {
  return useAutoRefresh(() => fmpApi.batchQuote(symbols), 30000);
}

export function useLiveForex() {
  return useAutoRefresh(() => fmpApi.forex().then(d => d.slice(0, 20)), 60000);
}

export function useLiveCrypto() {
  return useAutoRefresh(() => fmpApi.crypto().then(d => d.slice(0, 20)), 60000);
}

export function useLiveGainers() {
  return useAutoRefresh(() => fmpApi.gainers().then(d => d.slice(0, 10)), 60000);
}

export function useLiveLosers() {
  return useAutoRefresh(() => fmpApi.losers().then(d => d.slice(0, 10)), 60000);
}

export function useLiveMostActive() {
  return useAutoRefresh(() => fmpApi.mostActive().then(d => d.slice(0, 10)), 60000);
}

export function useLiveSectorPerformance() {
  return useAutoRefresh(() => fmpApi.sectorPerformance(), 300000);
}

export function useLiveEconomicCalendar() {
  return useAutoRefresh(() => fmpApi.economicCalendar().then(d => d.slice(0, 20)), 300000);
}

export function useLiveNews(symbol?: string, limit: number = 10) {
  return useAutoRefresh(
    () => (symbol ? fmpApi.news(symbol, limit) : fmpApi.marketNews(limit)),
    300000
  );
}
