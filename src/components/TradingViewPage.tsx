import { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Star,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Layers,
  ChevronRight,
  RefreshCw,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  X,
  Building2,
  DollarSign,
  Percent,
  Activity,
  Globe,
  Calendar,
  BookOpen,
  LineChart as LineChartIcon,
  CandlestickChart,
  Hash,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  useStockQuote,
  useHistoricalPrices,
  useStockSearch,
  useCompanyProfile,
  useEconomicCalendar,
  useLSEMarketOverview,
  useIncomeStatement,
  useBalanceSheet,
  useCashFlow,
  useLiveQuotes,
  useNews,
} from "@/hooks/useMarketData";
import { useToast } from "@/components/ToasterProvider";
import { ChartSkeleton, StatSkeleton, ListItemSkeleton, CardSkeleton } from "@/components/Skeletons";
import { CandlestickChart as CandleChartComponent, PriceAreaChart, MultiLineChart, type ChartDataPoint } from "@/components/Charts";
import type { StockSearchResult, StockQuote, HistoricalPrice, CompanyProfile, EconomicEvent, IncomeStatement, BalanceSheet, CashFlow, NewsItem } from "@/api/fmp";

const timeframes = ["1D", "5D", "1M", "3M", "6M", "1Y", "YTD"];

function formatPrice(price: number) {
  if (price >= 10000) return price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (price >= 1000) return price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (price >= 1) return price.toFixed(2);
  return price.toFixed(4);
}

function formatCompact(num: number) {
  if (num >= 1e12) return (num / 1e12).toFixed(1) + "T";
  if (num >= 1e9) return (num / 1e9).toFixed(1) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
  return num.toString();
}

function getPeriodFromTf(tf: string) {
  const now = new Date();
  const from = new Date(now);
  switch (tf) {
    case "1D": from.setDate(now.getDate() - 1); break;
    case "5D": from.setDate(now.getDate() - 5); break;
    case "1M": from.setMonth(now.getMonth() - 1); break;
    case "3M": from.setMonth(now.getMonth() - 3); break;
    case "6M": from.setMonth(now.getMonth() - 6); break;
    case "1Y": from.setFullYear(now.getFullYear() - 1); break;
    case "YTD": from.setMonth(0); from.setDate(1); break;
    default: from.setMonth(now.getMonth() - 1); break;
  }
  return { from: from.toISOString().split("T")[0], to: now.toISOString().split("T")[0] };
}

function FinancialsTable({ data, title, fields }: { data: any[] | null; title: string; fields: { key: string; label: string; format?: (v: number) => string }[] }) {
  if (!data || data.length === 0) return null;

  return (
    <Card className="rounded-[18px] border-border shadow-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-text-primary flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" /> {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-3 text-text-muted font-medium">Period</th>
                {fields.map((f) => (
                  <th key={f.key} className="text-right py-2 px-3 text-text-muted font-medium">{f.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.slice(0, 4).map((row, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-bg transition-colors">
                  <td className="py-2 px-3 text-text-primary font-medium">{row.date} ({row.period})</td>
                  {fields.map((f) => (
                    <td key={f.key} className="text-right py-2 px-3 text-text-secondary">
                      {f.format ? f.format(row[f.key]) : row[f.key]?.toLocaleString() || "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

export function TradingViewPage() {
  const [symbol, setSymbol] = useState("AAPL");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [timeframe, setTimeframe] = useState("1M");
  const [chartType, setChartType] = useState<"area" | "candle">("candle");
  const [watchlist, setWatchlist] = useState<string[]>(["AAPL", "MSFT", "GOOGL", "TSLA", "AMZN", "META", "NVDA", "AMD"]);
  const [showIndicators, setShowIndicators] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const { add } = useToast();

  const { data: quoteData, loading: quoteLoading, error: quoteError } = useStockQuote(symbol);
  const { from, to } = useMemo(() => getPeriodFromTf(timeframe), [timeframe]);
  const { data: histData, loading: histLoading, error: histError } = useHistoricalPrices(symbol, from, to);
  const { data: searchResults, loading: searchLoading } = useStockSearch(searchQuery);
  const { data: profileData, loading: profileLoading } = useCompanyProfile(symbol);
  const { data: marketOverview, loading: marketLoading } = useLSEMarketOverview();
  const { data: ecoCalendar, loading: ecoLoading } = useEconomicCalendar();
  const { data: incomeData, loading: incomeLoading } = useIncomeStatement(symbol, "annual");
  const { data: balanceData, loading: balanceLoading } = useBalanceSheet(symbol, "annual");
  const { data: cashFlowData, loading: cashFlowLoading } = useCashFlow(symbol, "annual");
  const { data: liveQuotes } = useLiveQuotes(watchlist);

  const quote = quoteData?.[0];
  const profile = profileData?.[0];

  const chartData: ChartDataPoint[] = useMemo(() => {
    if (!histData || histData.length === 0) {
      // Generate mock chart data as fallback
      const mockData: ChartDataPoint[] = [];
      const basePrice = 100 + Math.random() * 200;
      for (let i = 30; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const open = basePrice + (Math.random() - 0.5) * 10;
        const close = open + (Math.random() - 0.5) * 5;
        mockData.push({
          date: date.toISOString().split("T")[0],
          open,
          high: Math.max(open, close) + Math.random() * 3,
          low: Math.min(open, close) - Math.random() * 3,
          close,
          volume: Math.floor(Math.random() * 1000000),
        });
      }
      return mockData;
    }
    return histData.map((d) => ({
      date: d.date,
      open: d.open,
      high: d.high,
      low: d.low,
      close: d.close,
      volume: d.volume,
    }));
  }, [histData]);

  const currentPrice = quote?.price || 0;
  const prevPrice = quote?.previousClose || currentPrice;
  const priceChange = currentPrice - prevPrice;
  const priceChangePct = prevPrice ? (priceChange / prevPrice) * 100 : 0;
  const isBullish = priceChange >= 0;

  const handleSelectSymbol = useCallback((s: string) => {
    setSymbol(s);
    setSearchQuery("");
    setShowSearchResults(false);
    add(`Selected ${s}`, "info");
  }, [add]);

  const addToWatchlist = useCallback(() => {
    if (!watchlist.includes(symbol)) {
      setWatchlist((prev) => [symbol, ...prev].slice(0, 12));
      add(`${symbol} added to watchlist`, "success");
    }
  }, [symbol, watchlist, add]);

  const removeFromWatchlist = useCallback((s: string) => {
    setWatchlist((prev) => prev.filter((x) => x !== s));
  }, []);

  const financialChartData = useMemo(() => {
    if (!incomeData) return [];
    return [...incomeData].reverse().slice(0, 5).map((d) => ({
      date: d.date,
      Revenue: d.revenue / 1e9,
      "Gross Profit": d.grossProfit / 1e9,
      "Net Income": d.netIncome / 1e9,
      EBITDA: d.ebitda / 1e9,
    }));
  }, [incomeData]);

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15 }} className="space-y-10 pb-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-[40px] font-bold text-text-primary">TradingView</h1>
          <p className="text-text-secondary text-[15px] mt-1">Real-time market data, analysis, and trading insights powered by FMP & LSE.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="rounded-button border-border text-text-secondary hover:bg-primary/5 hover:text-primary text-[13px] h-9" onClick={() => { setSymbol("AAPL"); setSearchQuery(""); }}>
            <RefreshCw className="w-4 h-4 mr-1.5" /> Refresh
          </Button>
          <Button className="btn-gradient-animated rounded-button h-9 text-[13px] font-medium transition-all duration-150 hover:-translate-y-px" onClick={addToWatchlist}>
            <Star className="w-4 h-4 mr-1.5" /> Add to Watchlist
          </Button>
        </div>
      </div>
      <div className="rounded-3xl overflow-hidden relative h-[220px] md:h-[280px]">
        <img src="/funding_pips_picture_4.jpg" alt="Analytics" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
        <Input
          value={searchQuery}
          onChange={(e) => { setSearchQuery(e.target.value); setShowSearchResults(true); }}
          onFocus={() => setShowSearchResults(true)}
          placeholder="Search stocks, ETFs, indices..."
          className="pl-10 rounded-button border-border h-9 text-[13px]"
        />
        {showSearchResults && searchQuery.length >= 2 && searchResults && searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-[18px] shadow-card z-50 max-h-72 overflow-y-auto">
            {searchResults.map((result) => (
              <button
                key={result.symbol}
                onClick={() => handleSelectSymbol(result.symbol)}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-primary/5 transition-colors first:rounded-t-[18px] last:rounded-b-[18px]"
              >
                <div className="w-8 h-8 rounded-button bg-primary/8 flex items-center justify-center shrink-0">
                  <BarChart3 className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-text-primary">{result.name}</p>
                  <p className="text-[11px] text-text-muted">{result.symbol} · {result.exchangeShortName}</p>
                </div>
                <Badge className="bg-primary/8 text-primary hover:bg-primary/8 rounded text-[10px] border-0">{result.currency}</Badge>
              </button>
            ))}
          </div>
        )}
        {showSearchResults && searchQuery.length >= 2 && searchResults && searchResults.length === 0 && !searchLoading && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-[18px] shadow-card z-50 p-4 text-center">
            <p className="text-[13px] text-text-muted">No results found</p>
          </div>
        )}
        {showSearchResults && (searchQuery.length < 2 || !searchResults) && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-[18px] shadow-card z-50 p-4 text-center">
            <p className="text-[13px] text-text-muted">Type at least 2 characters</p>
          </div>
        )}
      </div>

      {/* Quote Header */}
      {quoteLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => <StatSkeleton key={i} />)}
        </div>
      ) : quoteError ? (
        <Card className="rounded-[18px] border-border shadow-card p-6">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-danger" />
            <div className="flex-1">
              <p className="text-[13px] font-medium text-text-primary">Unable to load market data</p>
              <p className="text-[11px] text-text-muted">{quoteError}</p>
            </div>
            <Button variant="outline" className="rounded-button border-border text-[13px] h-8" onClick={() => window.location.reload()}>
              <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Retry
            </Button>
          </div>
        </Card>
      ) : quote ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="rounded-[18px] border-border shadow-card">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-4 h-4 text-text-muted" />
                <p className="text-[13px] text-text-muted">Symbol</p>
              </div>
              <p className="text-2xl font-semibold text-text-primary">{quote.symbol}</p>
              <p className="text-[11px] text-text-muted truncate">{quote.name}</p>
            </CardContent>
          </Card>
          <Card className="rounded-[18px] border-border shadow-card">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-text-muted" />
                <p className="text-[13px] text-text-muted">Price</p>
              </div>
              <p className="text-2xl font-semibold text-text-primary">{formatPrice(quote.price)}</p>
              <p className={cn("text-[11px] font-medium flex items-center gap-1", isBullish ? "text-success" : "text-danger")}>
                {isBullish ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {formatPrice(Math.abs(priceChange))} ({priceChangePct.toFixed(2)}%)
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-[18px] border-border shadow-card">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-text-muted" />
                <p className="text-[13px] text-text-muted">Volume</p>
              </div>
              <p className="text-2xl font-semibold text-text-primary">{formatCompact(quote.volume)}</p>
              <p className="text-[11px] text-text-muted">Avg: {formatCompact(quote.avgVolume)}</p>
            </CardContent>
          </Card>
          <Card className="rounded-[18px] border-border shadow-card">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-4 h-4 text-text-muted" />
                <p className="text-[13px] text-text-muted">Market Cap</p>
              </div>
              <p className="text-2xl font-semibold text-text-primary">{formatCompact(quote.marketCap)}</p>
              <p className="text-[11px] text-text-muted">{quote.exchangeShortName || "NYSE"}</p>
            </CardContent>
          </Card>
        </div>
      ) : null}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="rounded-button bg-bg p-1 mb-4">
          <TabsTrigger value="overview" className="rounded-button text-[13px] data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">Overview</TabsTrigger>
          <TabsTrigger value="financials" className="rounded-button text-[13px] data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">Financials</TabsTrigger>
          <TabsTrigger value="news" className="rounded-button text-[13px] data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">News</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-0">
          <div className="flex flex-col xl:flex-row gap-6">
            <div className="flex-1 min-w-0 space-y-4">
              {/* Chart Card */}
              <Card className={cn("rounded-[18px] border-border shadow-card overflow-hidden", fullscreen && "fixed inset-4 z-50 bg-white")}>
                <CardHeader className="pb-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="bg-primary/8 text-primary rounded-button font-semibold text-[13px] border-0">
                            {symbol}
                          </Badge>
                          <span className={cn("text-sm font-semibold", isBullish ? "text-success" : "text-danger")}>
                            {formatPrice(currentPrice)}
                          </span>
                          <span className={cn("text-xs font-medium px-2 py-0.5 rounded-button", isBullish ? "bg-success/10 text-success" : "bg-danger/10 text-danger")}>
                            {isBullish ? "+" : ""}{priceChangePct.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {timeframes.map((tf) => (
                        <button
                          key={tf}
                          onClick={() => setTimeframe(tf)}
                          className={cn(
                            "px-3 py-1.5 rounded-button text-[13px] font-medium transition-all duration-150",
                            timeframe === tf
                              ? "bg-primary text-white"
                              : "bg-bg text-text-muted hover:bg-primary/5 hover:text-text-primary"
                          )}
                        >
                          {tf}
                        </button>
                      ))}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="px-4 py-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setChartType("candle")}
                        className={cn(
                          "flex items-center gap-1.5 px-3 py-1.5 rounded-button text-[13px] font-medium transition-all duration-150",
                          chartType === "candle" ? "bg-primary/5 text-primary" : "text-text-muted hover:bg-bg"
                        )}
                      >
                        <CandlestickChart className="w-3.5 h-3.5" /> Candle
                      </button>
                      <button
                        onClick={() => setChartType("area")}
                        className={cn(
                          "flex items-center gap-1.5 px-3 py-1.5 rounded-button text-[13px] font-medium transition-all duration-150",
                          chartType === "area" ? "bg-primary/5 text-primary" : "text-text-muted hover:bg-bg"
                        )}
                      >
                        <LineChartIcon className="w-3.5 h-3.5" /> Area
                      </button>
                      <button
                        onClick={() => setShowIndicators(!showIndicators)}
                        className={cn(
                          "flex items-center gap-1.5 px-3 py-1.5 rounded-button text-[13px] font-medium transition-all duration-150",
                          showIndicators ? "bg-primary/5 text-primary" : "text-text-muted hover:bg-bg"
                        )}
                      >
                        <Activity className="w-3.5 h-3.5" /> Indicators
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setFullscreen(!fullscreen)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-button text-[13px] font-medium text-text-muted hover:bg-bg transition-all"
                      >
                        {fullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                        {fullscreen ? "Exit" : "Fullscreen"}
                      </button>
                    </div>
                  </div>
                </CardContent>

                <CardContent className="p-4 pt-0">
                  {histLoading ? (
                    <ChartSkeleton className={cn("h-[400px]", fullscreen && "h-[calc(100vh-200px)]")} />
                  ) : histError ? (
                    <div className={cn("flex items-center justify-center", fullscreen ? "h-[calc(100vh-200px)]" : "h-[400px]")}>
                      <div className="text-center">
                        <AlertCircle className="w-8 h-8 text-danger mx-auto mb-2" />
                        <p className="text-[13px] text-text-muted">{histError}</p>
                        <Button variant="outline" className="rounded-button border-border text-[13px] h-8 mt-3" onClick={() => window.location.reload()}>
                          <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Retry
                        </Button>
                      </div>
                    </div>
                  ) : chartData.length > 0 ? (
                    chartType === "candle" ? (
                      <CandleChartComponent
                        data={chartData}
                        height={fullscreen ? window.innerHeight - 220 : 400}
                        showSMA={showIndicators}
                        showEMA={showIndicators}
                        showVolume={true}
                        showReference={true}
                        currentPrice={currentPrice}
                      />
                    ) : (
                      <PriceAreaChart
                        data={chartData}
                        height={fullscreen ? window.innerHeight - 220 : 400}
                        showVolume={true}
                        showReference={true}
                        currentPrice={currentPrice}
                      />
                    )
                  ) : (
                    <div className={cn("flex items-center justify-center", fullscreen ? "h-[calc(100vh-200px)]" : "h-[400px]")}>
                      <p className="text-[13px] text-text-muted">No historical data available</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Company Profile */}
              {profileLoading ? (
                <CardSkeleton />
              ) : profile ? (
                <Card className="rounded-[18px] border-border shadow-card">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-text-primary flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-primary" /> Company Profile
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-[18px] bg-primary/8 flex items-center justify-center shrink-0">
                        <Building2 className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-text-primary text-[15px]">{profile.companyName}</h3>
                        <p className="text-[13px] text-text-muted">{profile.industry} · {profile.sector}</p>
                        <p className="text-[11px] text-text-muted">{profile.country} · {profile.exchangeShortName}</p>
                      </div>
                    </div>
                    <p className="text-[13px] text-text-secondary leading-relaxed line-clamp-3">{profile.description}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="p-3 rounded-[18px] bg-bg">
                        <p className="text-[11px] text-text-muted mb-0.5">CEO</p>
                        <p className="text-[13px] font-medium text-text-primary">{profile.ceo}</p>
                      </div>
                      <div className="p-3 rounded-[18px] bg-bg">
                        <p className="text-[11px] text-text-muted mb-0.5">Employees</p>
                        <p className="text-[13px] font-medium text-text-primary">{formatCompact(parseInt(profile.fullTimeEmployees || "0"))}</p>
                      </div>
                      <div className="p-3 rounded-[18px] bg-bg">
                        <p className="text-[11px] text-text-muted mb-0.5">IPO Date</p>
                        <p className="text-[13px] font-medium text-text-primary">{profile.ipoDate}</p>
                      </div>
                      <div className="p-3 rounded-[18px] bg-bg">
                        <p className="text-[11px] text-text-muted mb-0.5">Website</p>
                        <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-[13px] font-medium text-primary hover:underline truncate block">
                          Visit
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : null}

              {/* Popular Pairs / Market Data */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {marketLoading ? (
                  Array.from({ length: 4 }).map((_, i) => <StatSkeleton key={i} />)
                ) : marketOverview?.indices?.slice(0, 4).map((idx) => (
                  <motion.div
                    key={idx.symbol}
                    whileHover={{ y: -2 }}
                    className="bg-white rounded-[18px] border border-border p-4 shadow-card cursor-pointer transition-shadow duration-150 hover:shadow-card-hover"
                    onClick={() => handleSelectSymbol(idx.symbol)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-[13px] text-text-primary">{idx.symbol}</span>
                      <span className={cn("text-xs font-semibold", (idx.changePercent || 0) >= 0 ? "text-success" : "text-danger")}>
                        {(idx.changePercent || 0) >= 0 ? "+" : ""}{(idx.changePercent || 0).toFixed(2)}%
                      </span>
                    </div>
                    <p className="text-xl font-bold text-text-primary">{formatPrice(idx.price)}</p>
                    <p className="text-[11px] text-text-muted">{idx.name}</p>
                  </motion.div>
                ))}
                {!marketLoading && !marketOverview?.indices && [
                  { pair: "EURUSD", name: "EUR/USD", price: 1.0845, change: 0.12 },
                  { pair: "GBPUSD", name: "GBP/USD", price: 1.2678, change: -0.05 },
                  { pair: "USDJPY", name: "USD/JPY", price: 151.42, change: 0.23 },
                  { pair: "XAUUSD", name: "Gold", price: 2385.6, change: 0.45 },
                ].map((idx) => (
                  <motion.div
                    key={idx.pair}
                    whileHover={{ y: -2 }}
                    className="bg-white rounded-[18px] border border-border p-4 shadow-card cursor-pointer transition-shadow duration-150 hover:shadow-card-hover"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-[13px] text-text-primary">{idx.pair}</span>
                      <span className={cn("text-xs font-semibold", idx.change >= 0 ? "text-success" : "text-danger")}>
                        {idx.change >= 0 ? "+" : ""}{idx.change.toFixed(2)}%
                      </span>
                    </div>
                    <p className="text-xl font-bold text-text-primary">{formatPrice(idx.price)}</p>
                    <p className="text-[11px] text-text-muted">{idx.name}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="w-full xl:w-80 space-y-6">
              {/* Watchlist */}
              <Card className="rounded-[18px] border-border shadow-card">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-base font-semibold text-text-primary flex items-center gap-2">
                    <Star className="w-4 h-4 text-warning" /> Watchlist
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 max-h-96 overflow-y-auto no-scrollbar">
                  {watchlist.map((s) => {
                    const liveQuote = liveQuotes?.find((q) => q.symbol === s);
                    const isUp = (liveQuote?.change || 0) >= 0;
                    return (
                      <div
                        key={s}
                        onClick={() => handleSelectSymbol(s)}
                        className={cn(
                          "flex items-center justify-between p-3 rounded-button cursor-pointer transition-all duration-150",
                          symbol === s ? "bg-primary/5 border border-primary/20" : "hover:bg-primary/5 border border-transparent"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Star className={cn("w-4 h-4", symbol === s ? "text-primary" : "text-text-muted")} />
                          <div>
                            <p className="text-[13px] font-semibold text-text-primary">{s}</p>
                            {liveQuote && (
                              <p className={cn("text-[11px] font-medium", isUp ? "text-success" : "text-danger")}>
                                {liveQuote.price?.toFixed(2)} ({isUp ? "+" : ""}{liveQuote.changesPercentage?.toFixed(2)}%)
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => { e.stopPropagation(); removeFromWatchlist(s); }}
                            className="p-1 rounded hover:bg-danger/5 text-text-muted hover:text-danger transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  {watchlist.length === 0 && (
                    <div className="p-4 text-center">
                      <p className="text-[13px] text-text-muted">Your watchlist is empty</p>
                      <p className="text-[11px] text-text-muted">Search and add stocks to track</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Market Overview */}
              <Card className="rounded-[18px] border-border shadow-card">
                <CardHeader>
                  <CardTitle className="text-base font-semibold text-text-primary flex items-center gap-2">
                    <Globe className="w-4 h-4 text-primary" /> Market Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {marketLoading ? (
                    Array.from({ length: 3 }).map((_, i) => <ListItemSkeleton key={i} />)
                  ) : marketOverview?.topGainers?.slice(0, 5).map((g) => (
                    <div key={g.symbol} className="flex items-center justify-between p-2.5 rounded-button hover:bg-primary/5 transition-colors cursor-pointer" onClick={() => handleSelectSymbol(g.symbol)}>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-success" />
                        <div>
                          <p className="text-[13px] font-medium text-text-primary">{g.symbol}</p>
                          <p className="text-[11px] text-text-muted">{g.name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[13px] font-medium text-text-primary">{formatPrice(g.price)}</p>
                        <p className="text-[11px] text-success font-medium">+{g.changePercent.toFixed(2)}%</p>
                      </div>
                    </div>
                  ))}
                  {!marketLoading && !marketOverview?.topGainers && (
                    <div className="p-4 text-center">
                      <p className="text-[13px] text-text-muted">Market data unavailable</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Economic Calendar */}
              <Card className="rounded-[18px] border-border shadow-card">
                <CardHeader>
                  <CardTitle className="text-base font-semibold text-text-primary flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" /> Economic Calendar
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {ecoLoading ? (
                    Array.from({ length: 4 }).map((_, i) => <ListItemSkeleton key={i} />)
                  ) : ecoCalendar?.slice(0, 5).map((e, i) => (
                    <div key={i} className="p-3 rounded-[18px] bg-bg hover:bg-primary/5 transition-colors cursor-pointer">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className={cn(
                          "rounded text-[10px] border-0",
                          e.impact?.toLowerCase().includes("high") ? "bg-danger/10 text-danger" :
                          e.impact?.toLowerCase().includes("medium") ? "bg-warning/10 text-warning" :
                          "bg-success/10 text-success"
                        )}>
                          {e.impact || "Low"}
                        </Badge>
                        <span className="text-[11px] text-text-muted">{e.country}</span>
                      </div>
                      <p className="text-[13px] font-medium text-text-primary">{e.event}</p>
                      <div className="flex items-center gap-3 mt-1 text-[11px] text-text-muted">
                        <span>Actual: {e.actual || "-"}</span>
                        <span>Est: {e.estimate || "-"}</span>
                        <span>Prev: {e.previous || "-"}</span>
                      </div>
                    </div>
                  ))}
                  {!ecoLoading && (!ecoCalendar || ecoCalendar.length === 0) && (
                    <div className="p-4 text-center">
                      <p className="text-[13px] text-text-muted">No economic events</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Day High", value: quote ? formatPrice(quote.dayHigh) : "-" },
                  { label: "Day Low", value: quote ? formatPrice(quote.dayLow) : "-" },
                  { label: "Open", value: quote ? formatPrice(quote.open) : "-" },
                  { label: "Prev Close", value: quote ? formatPrice(quote.previousClose) : "-" },
                  { label: "52W High", value: quote ? formatPrice(quote.yearHigh) : "-" },
                  { label: "52W Low", value: quote ? formatPrice(quote.yearLow) : "-" },
                  { label: "P/E Ratio", value: quote ? quote.pe?.toFixed(2) : "-" },
                  { label: "EPS", value: quote ? quote.eps?.toFixed(2) : "-" },
                ].map((stat) => (
                  <Card key={stat.label} className="rounded-[18px] border-border shadow-card">
                    <CardContent className="p-4">
                      <p className="text-[11px] text-text-muted mb-1">{stat.label}</p>
                      <p className="text-lg font-semibold text-text-primary">{stat.value}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="financials" className="mt-0 space-y-6">
          {financialChartData.length > 0 && (
            <Card className="rounded-[18px] border-border shadow-card">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-text-primary flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" /> Revenue & Income Trend (B USD)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <MultiLineChart
                  data={financialChartData}
                  lines={[
                    { key: "Revenue", color: "#5B3DF5", name: "Revenue" },
                    { key: "Gross Profit", color: "#22C55E", name: "Gross Profit" },
                    { key: "Net Income", color: "#EF4444", name: "Net Income" },
                    { key: "EBITDA", color: "#F59E0B", name: "EBITDA" },
                  ]}
                  height={300}
                />
              </CardContent>
            </Card>
          )}

          <FinancialsTable
            data={incomeData}
            title="Income Statement"
            fields={[
              { key: "revenue", label: "Revenue", format: (v) => `$${(v / 1e9).toFixed(1)}B` },
              { key: "grossProfit", label: "Gross Profit", format: (v) => `$${(v / 1e9).toFixed(1)}B` },
              { key: "operatingIncome", label: "Operating Income", format: (v) => `$${(v / 1e9).toFixed(1)}B` },
              { key: "netIncome", label: "Net Income", format: (v) => `$${(v / 1e9).toFixed(1)}B` },
              { key: "eps", label: "EPS" },
            ]}
          />

          <FinancialsTable
            data={balanceData}
            title="Balance Sheet"
            fields={[
              { key: "totalAssets", label: "Total Assets", format: (v) => `$${(v / 1e9).toFixed(1)}B` },
              { key: "totalLiabilities", label: "Liabilities", format: (v) => `$${(v / 1e9).toFixed(1)}B` },
              { key: "totalStockholdersEquity", label: "Equity", format: (v) => `$${(v / 1e9).toFixed(1)}B` },
              { key: "totalDebt", label: "Total Debt", format: (v) => `$${(v / 1e9).toFixed(1)}B` },
              { key: "cashAndCashEquivalents", label: "Cash", format: (v) => `$${(v / 1e9).toFixed(1)}B` },
            ]}
          />

          <FinancialsTable
            data={cashFlowData}
            title="Cash Flow"
            fields={[
              { key: "operatingCashFlow", label: "Operating CF", format: (v) => `$${(v / 1e9).toFixed(1)}B` },
              { key: "capitalExpenditure", label: "CapEx", format: (v) => `$${(Math.abs(v) / 1e9).toFixed(1)}B` },
              { key: "freeCashFlow", label: "Free Cash Flow", format: (v) => `$${(v / 1e9).toFixed(1)}B` },
              { key: "netIncome", label: "Net Income", format: (v) => `$${(v / 1e9).toFixed(1)}B` },
              { key: "depreciationAndAmortization", label: "D&A", format: (v) => `$${(v / 1e9).toFixed(1)}B` },
            ]}
          />
        </TabsContent>

        <TabsContent value="news" className="mt-0">
          <NewsSection symbol={symbol} />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}

function NewsSection({ symbol }: { symbol: string }) {
  const { data: news, loading } = useNews(symbol, 10);

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => <ListItemSkeleton key={i} />)}
      </div>
    );
  }

  if (!news || news.length === 0) {
    return (
      <Card className="rounded-[18px] border-border shadow-card p-8 text-center">
        <p className="text-[13px] text-text-muted">No news available for {symbol}</p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {news.map((n: NewsItem, i: number) => (
        <a
          key={i}
          href={n.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-[18px] border border-border bg-white shadow-card hover:shadow-card-hover transition-shadow p-4"
        >
          <div className="flex items-start gap-3">
            {n.image && (
              <img src={n.image} alt="" className="w-20 h-20 rounded-button object-cover shrink-0" />
            )}
            <div className="min-w-0">
              <p className="text-[13px] font-medium text-text-primary line-clamp-2 mb-1">{n.title}</p>
              <p className="text-[11px] text-text-muted">{n.site} · {n.publishedDate}</p>
              <p className="text-[11px] text-text-secondary line-clamp-2 mt-1">{n.text.slice(0, 120)}...</p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
