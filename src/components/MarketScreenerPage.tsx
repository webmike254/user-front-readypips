import React, { useState, useMemo, Suspense, lazy } from "react";
import { 
  Search, 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  SlidersHorizontal,
  ChevronDown,
  Star,
  Activity,
  DollarSign,
  Building2,
  Globe,
  Hash,
  Percent
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  useLiveGainers,
  useLiveLosers,
  useLiveMostActive,
  useLiveSectorPerformance,
  useLiveForex,
  useLiveCrypto,
  useStockSearch,
} from "@/hooks/useMarketData";
import { SimpleBarChart, MultiLineChart } from "@/components/Charts";
import { useToast } from "@/components/ToasterProvider";
import { ListItemSkeleton, StatSkeleton } from "@/components/Skeletons";

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

function MarketTable({ data, title, icon: Icon, loading }: { data: any[]; title: string; icon: any; loading: boolean }) {
  if (loading) {
    return (
      <Card className="rounded-[18px] border-border shadow-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
            <Icon className="w-4 h-4 text-primary" /> {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => <ListItemSkeleton key={i} />)}
        </CardContent>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card className="rounded-[18px] border-border shadow-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
            <Icon className="w-4 h-4 text-primary" /> {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 text-center">
          <p className="text-[13px] text-text-muted">No data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-[18px] border-border shadow-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
          <Icon className="w-4 h-4 text-primary" /> {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-2 text-text-muted font-medium">Symbol</th>
                <th className="text-left py-2 px-2 text-text-muted font-medium">Name</th>
                <th className="text-right py-2 px-2 text-text-muted font-medium">Price</th>
                <th className="text-right py-2 px-2 text-text-muted font-medium">Change</th>
                <th className="text-right py-2 px-2 text-text-muted font-medium">% Change</th>
              </tr>
            </thead>
            <tbody>
              {data.slice(0, 15).map((item) => {
                const isUp = (item.changesPercentage || item.change || 0) >= 0;
                return (
                  <tr key={item.symbol} className="border-b border-border/50 hover:bg-bg transition-colors cursor-pointer">
                    <td className="py-2 px-2 font-semibold text-text-primary">{item.symbol}</td>
                    <td className="py-2 px-2 text-text-secondary truncate max-w-[150px]">{item.name}</td>
                    <td className="py-2 px-2 text-right text-text-primary">{formatPrice(item.price)}</td>
                    <td className={cn("py-2 px-2 text-right font-medium", isUp ? "text-success" : "text-danger")}>
                      {isUp ? "+" : ""}{formatPrice(item.change || 0)}
                    </td>
                    <td className={cn("py-2 px-2 text-right font-medium", isUp ? "text-success" : "text-danger")}>
                      <span className={cn("inline-flex items-center gap-0.5 px-2 py-0.5 rounded-button text-[11px]", isUp ? "bg-success/10" : "bg-danger/10")}>
                        {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {isUp ? "+" : ""}{(item.changesPercentage || 0).toFixed(2)}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

function ForexTable() {
  const { data: forex, loading } = useLiveForex();

  if (loading) {
    return (
      <Card className="rounded-[18px] border-border shadow-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
            <Globe className="w-4 h-4 text-primary" /> Forex Pairs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => <ListItemSkeleton key={i} />)}
        </CardContent>
      </Card>
    );
  }

  if (!forex || forex.length === 0) {
    return (
      <Card className="rounded-[18px] border-border shadow-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
            <Globe className="w-4 h-4 text-primary" /> Forex Pairs
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 text-center">
          <p className="text-[13px] text-text-muted">No forex data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-[18px] border-border shadow-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
          <Globe className="w-4 h-4 text-primary" /> Forex Pairs
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-2 text-text-muted font-medium">Pair</th>
                <th className="text-right py-2 px-2 text-text-muted font-medium">Bid</th>
                <th className="text-right py-2 px-2 text-text-muted font-medium">Ask</th>
                <th className="text-right py-2 px-2 text-text-muted font-medium">Change</th>
                <th className="text-right py-2 px-2 text-text-muted font-medium">High</th>
                <th className="text-right py-2 px-2 text-text-muted font-medium">Low</th>
              </tr>
            </thead>
            <tbody>
              {forex.slice(0, 15).map((item) => {
                const change = parseFloat(item.changes?.toString() || "0");
                const isUp = change >= 0;
                return (
                  <tr key={item.ticker} className="border-b border-border/50 hover:bg-bg transition-colors cursor-pointer">
                    <td className="py-2 px-2 font-semibold text-text-primary">{item.ticker}</td>
                    <td className="py-2 px-2 text-right text-text-primary">{parseFloat(item.bid).toFixed(4)}</td>
                    <td className="py-2 px-2 text-right text-text-primary">{parseFloat(item.ask).toFixed(4)}</td>
                    <td className={cn("py-2 px-2 text-right font-medium", isUp ? "text-success" : "text-danger")}>
                      {isUp ? "+" : ""}{change.toFixed(4)}
                    </td>
                    <td className="py-2 px-2 text-right text-text-muted">{parseFloat(item.high).toFixed(4)}</td>
                    <td className="py-2 px-2 text-right text-text-muted">{parseFloat(item.low).toFixed(4)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

function CryptoTable() {
  const { data: crypto, loading } = useLiveCrypto();

  if (loading) {
    return (
      <Card className="rounded-[18px] border-border shadow-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-warning" /> Cryptocurrency
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => <ListItemSkeleton key={i} />)}
        </CardContent>
      </Card>
    );
  }

  if (!crypto || crypto.length === 0) {
    return (
      <Card className="rounded-[18px] border-border shadow-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-warning" /> Cryptocurrency
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 text-center">
          <p className="text-[13px] text-text-muted">No crypto data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-[18px] border-border shadow-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-warning" /> Cryptocurrency
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-2 text-text-muted font-medium">Symbol</th>
                <th className="text-left py-2 px-2 text-text-muted font-medium">Name</th>
                <th className="text-right py-2 px-2 text-text-muted font-medium">Price</th>
                <th className="text-right py-2 px-2 text-text-muted font-medium">Change</th>
                <th className="text-right py-2 px-2 text-text-muted font-medium">Volume</th>
                <th className="text-right py-2 px-2 text-text-muted font-medium">Market Cap</th>
              </tr>
            </thead>
            <tbody>
              {crypto.slice(0, 15).map((item) => {
                const isUp = (item.changesPercentage || 0) >= 0;
                return (
                  <tr key={item.symbol} className="border-b border-border/50 hover:bg-bg transition-colors cursor-pointer">
                    <td className="py-2 px-2 font-semibold text-text-primary">{item.symbol.replace("USD", "")}</td>
                    <td className="py-2 px-2 text-text-secondary truncate max-w-[150px]">{item.name}</td>
                    <td className="py-2 px-2 text-right text-text-primary">${formatPrice(item.price)}</td>
                    <td className={cn("py-2 px-2 text-right font-medium", isUp ? "text-success" : "text-danger")}>
                      {isUp ? "+" : ""}{item.changesPercentage?.toFixed(2)}%
                    </td>
                    <td className="py-2 px-2 text-right text-text-muted">{formatCompact(item.volume)}</td>
                    <td className="py-2 px-2 text-right text-text-muted">{formatCompact(item.marketCap)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

function SectorChart() {
  const { data: sectors, loading } = useLiveSectorPerformance();

  const chartData = useMemo(() => {
    if (!sectors || sectors.length === 0) {
      // Generate mock sector data as fallback
      return [
        { label: "Technology", value: 2.5, color: "#22C55E" },
        { label: "Healthcare", value: 1.2, color: "#22C55E" },
        { label: "Finance", value: -0.8, color: "#EF4444" },
        { label: "Energy", value: 3.1, color: "#22C55E" },
        { label: "Consumer", value: -1.5, color: "#EF4444" },
        { label: "Industrials", value: 0.9, color: "#22C55E" },
        { label: "Utilities", value: -0.3, color: "#EF4444" },
      ];
    }
    return sectors.map((s) => ({
      label: s.sector.length > 15 ? s.sector.slice(0, 15) + "..." : s.sector,
      value: parseFloat(s.changesPercentage) || 0,
      color: parseFloat(s.changesPercentage) >= 0 ? "#22C55E" : "#EF4444",
    }));
  }, [sectors]);

  if (loading) {
    return (
      <Card className="rounded-[18px] border-border shadow-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" /> Sector Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="animate-pulse h-48 bg-border/60 rounded-[18px]" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-[18px] border-border shadow-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary" /> Sector Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <SimpleBarChart data={chartData} height={300} />
      </CardContent>
    </Card>
  );
}

export function MarketScreenerPage() {
  const [activeTab, setActiveTab] = useState("stocks");
  const { data: gainers, loading: gainersLoading } = useLiveGainers();
  const { data: losers, loading: losersLoading } = useLiveLosers();
  const { data: mostActive, loading: activeLoading } = useLiveMostActive();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: searchResults, loading: searchLoading } = useStockSearch(searchQuery);
  const { add } = useToast();

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Market Screener</h1>
          <p className="text-text-secondary text-[14px] mt-1">Real-time market data, gainers, losers, forex, and crypto.</p>
        </div>
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stocks..."
            className="pl-10 rounded-button border-border h-9 text-[13px]"
          />
          {searchQuery.length >= 2 && searchResults && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-[18px] shadow-card z-50 max-h-72 overflow-y-auto">
              {searchResults.map((result) => (
                <button
                  key={result.symbol}
                  onClick={() => { add(`Selected ${result.symbol}`, "info"); setSearchQuery(""); }}
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
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="rounded-button bg-bg p-1 mb-4 flex-wrap">
          <TabsTrigger value="stocks" className="rounded-button text-[13px] data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">Stocks</TabsTrigger>
          <TabsTrigger value="forex" className="rounded-button text-[13px] data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">Forex</TabsTrigger>
          <TabsTrigger value="crypto" className="rounded-button text-[13px] data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">Crypto</TabsTrigger>
          <TabsTrigger value="sectors" className="rounded-button text-[13px] data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">Sectors</TabsTrigger>
        </TabsList>

        <TabsContent value="stocks" className="mt-0 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <MarketTable data={gainers || []} title="Top Gainers" icon={TrendingUp} loading={gainersLoading} />
            <MarketTable data={losers || []} title="Top Losers" icon={TrendingDown} loading={losersLoading} />
            <MarketTable data={mostActive || []} title="Most Active" icon={Activity} loading={activeLoading} />
          </div>
        </TabsContent>

        <TabsContent value="forex" className="mt-0 space-y-6">
          <ForexTable />
        </TabsContent>

        <TabsContent value="crypto" className="mt-0 space-y-6">
          <CryptoTable />
        </TabsContent>

        <TabsContent value="sectors" className="mt-0 space-y-6">
          <SectorChart />
        </TabsContent>
      </Tabs>
    </div>
  );
}
