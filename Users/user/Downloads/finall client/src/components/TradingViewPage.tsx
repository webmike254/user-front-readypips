import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Maximize2,
  Camera,
  Star,
  Plus,
  ExternalLink,
  Save,
  Share2,
  TrendingUp,
  MousePointer2,
  Square,
  Ruler,
  BarChart3,
  Type,
  ArrowRight,
  Activity,
  Eraser,
  Layers,
  LineChart,
  AreaChart,
  CandlestickChart,
  Settings2,
  Clock,
  Globe,
  Zap,
  BookOpen,
  Download,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  ComposedChart,
  Area,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const markets = ["Forex", "Crypto", "Gold", "Indices", "Stocks", "Commodities", "Favorites"];
const timeframes = ["1m", "5m", "15m", "30m", "1H", "4H", "D", "W", "M"];

const popularPairs = [
  { pair: "EUR/USD", price: "1.0845", change: "+0.12%", bullish: true, spark: [1.08, 1.082, 1.081, 1.083, 1.0845] },
  { pair: "GBP/USD", price: "1.2678", change: "-0.05%", bullish: false, spark: [1.27, 1.269, 1.268, 1.267, 1.2678] },
  { pair: "USD/JPY", price: "151.42", change: "+0.23%", bullish: true, spark: [151, 151.1, 151.2, 151.3, 151.42] },
  { pair: "AUD/USD", price: "0.6543", change: "+0.08%", bullish: true, spark: [0.65, 0.651, 0.652, 0.653, 0.6543] },
  { pair: "USD/CAD", price: "1.3567", change: "-0.11%", bullish: false, spark: [1.36, 1.358, 1.357, 1.356, 1.3567] },
  { pair: "XAU/USD", price: "2,385.60", change: "+0.45%", bullish: true, spark: [2370, 2375, 2380, 2382, 2385.6] },
  { pair: "BTC/USD", price: "67,420", change: "+1.20%", bullish: true, spark: [66000, 66500, 66800, 67000, 67420] },
  { pair: "ETH/USD", price: "3,245", change: "+0.85%", bullish: true, spark: [3200, 3220, 3230, 3240, 3245] },
];

const watchlist = [
  { pair: "EUR/USD", price: "1.0845", change: "+0.12%", open: true },
  { pair: "GBP/USD", price: "1.2678", change: "-0.05%", open: true },
  { pair: "USD/JPY", price: "151.42", change: "+0.23%", open: true },
  { pair: "XAU/USD", price: "2,385.60", change: "+0.45%", open: true },
  { pair: "BTC/USD", price: "67,420", change: "+1.20%", open: true },
  { pair: "NAS100", price: "18,245", change: "+0.34%", open: false },
];

const tradeIdeas = [
  {
    title: "EUR/USD Bullish Continuation",
    pair: "EUR/USD",
    direction: "Buy",
    entry: "1.0820 - 1.0835",
    stop: "1.0780",
    take: "1.0920",
    rr: "1:2.5",
    instructor: "Mark Thompson",
    date: "Today, 09:30 AM",
    image: "https://images.unsplash.com/photo-1611974765270-ca1258634369?w=400&h=250&fit=crop",
  },
];

const sessions = [
  { name: "Sydney", open: false, time: "Closed", pairs: "AUD/NZD, AUD/JPY" },
  { name: "Tokyo", open: false, time: "Closed", pairs: "USD/JPY, GBP/JPY" },
  { name: "London", open: true, time: "Open - 4h 12m left", pairs: "EUR/USD, GBP/USD" },
  { name: "New York", open: false, time: "Opens in 2h 30m", pairs: "US30, NAS100" },
];

const economicEvents = [
  { time: "08:30", currency: "USD", impact: "High", event: "Non-Farm Payrolls", forecast: "185K", previous: "175K", actual: "-" },
  { time: "10:00", currency: "EUR", impact: "Medium", event: "ECB Press Conference", forecast: "-", previous: "-", actual: "-" },
  { time: "14:00", currency: "USD", impact: "Low", event: "Factory Orders", forecast: "0.5%", previous: "0.3%", actual: "-" },
];

const news = [
  { headline: "Fed signals potential rate cuts in Q3", time: "2h ago", category: "Central Banks" },
  { headline: "Gold breaks above $2,400 resistance", time: "4h ago", category: "Commodities" },
  { headline: "Bitcoin ETF inflows hit weekly high", time: "5h ago", category: "Crypto" },
];

const drawingTools = [
  { icon: TrendingUp, label: "Trend" },
  { icon: MousePointer2, label: "Horizontal" },
  { icon: Square, label: "Rect" },
  { icon: Ruler, label: "Fibo" },
  { icon: BarChart3, label: "R/R" },
  { icon: Type, label: "Text" },
  { icon: ArrowRight, label: "Arrow" },
  { icon: Activity, label: "Brush" },
  { icon: Eraser, label: "Erase" },
  { icon: Layers, label: "Measure" },
];

function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end]);
  return <span>{count}{suffix}</span>;
}

function generateChartData(symbol: string, points = 90) {
  const basePrices: Record<string, number> = {
    "FX:EURUSD": 1.084,
    "FX:GBPUSD": 1.268,
    "FX:USDJPY": 151.4,
    "FX:AUDUSD": 0.654,
    "FX:USDCAD": 1.357,
    "TVC:GOLD": 2385,
    "BINANCE:BTCUSDT": 67420,
    "BINANCE:ETHUSDT": 3245,
    "CME_MINI:NQ1!": 18245,
    "CME_MINI:YM1!": 39200,
  };
  let price = basePrices[symbol] || 1.084;
  const data = [];
  for (let i = 0; i < points; i++) {
    const change = (Math.random() - 0.48) * price * 0.0015;
    price += change;
    const high = price + Math.random() * price * 0.0008;
    const low = price - Math.random() * price * 0.0008;
    const open = price - (Math.random() - 0.5) * price * 0.0005;
    const close = price + (Math.random() - 0.5) * price * 0.0005;
    data.push({
      time: `${9 + Math.floor(i / 12)}:${((i % 12) * 5).toString().padStart(2, "0")}`,
      price,
      open,
      high,
      low,
      close,
      volume: Math.floor(Math.random() * 2000) + 800,
    });
  }
  return data;
}

function calculateSMA(data: any[], period: number, key: string) {
  return data.map((item, index) => {
    if (index < period - 1) return { ...item, sma: null };
    const sum = data.slice(index - period + 1, index + 1).reduce((a, b) => a + b[key], 0);
    return { ...item, sma: sum / period };
  });
}

function calculateEMA(data: any[], period: number, key: string) {
  const k = 2 / (period + 1);
  const result: any[] = [];
  data.forEach((item, index) => {
    if (index === 0) {
      result.push({ ...item, ema: item[key] });
    } else {
      const prevEma = result[index - 1].ema;
      const ema = item[key] * k + prevEma * (1 - k);
      result.push({ ...item, ema });
    }
  });
  return result;
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null;
  const item = payload[0].payload;
  return (
    <div className="bg-white border border-[#ECECEC] rounded-xl shadow-lg p-3 text-xs">
      <p className="font-semibold text-[#111827] mb-1">{label}</p>
      <div className="space-y-1">
        <p className="text-[#5B3DF5]">Price: {item.price.toFixed(item.price > 1000 ? 2 : 5)}</p>
        {item.sma && <p className="text-green-600">SMA 20: {item.sma.toFixed(item.price > 1000 ? 2 : 5)}</p>}
        {item.ema && <p className="text-amber-500">EMA 12: {item.ema.toFixed(item.price > 1000 ? 2 : 5)}</p>}
        <p className="text-[#6B7280]">Volume: {item.volume.toLocaleString()}</p>
      </div>
    </div>
  );
}

export function TradingViewPage() {
  const [activeMarket, setActiveMarket] = useState("Forex");
  const [symbol, setSymbol] = useState("FX:EURUSD");
  const [timeframe, setTimeframe] = useState("15m");
  const [chartType, setChartType] = useState<"area" | "line">("area");
  const [search, setSearch] = useState("");
  const [showSMA, setShowSMA] = useState(true);
  const [showEMA, setShowEMA] = useState(true);
  const [showVolume, setShowVolume] = useState(true);

  const chartData = useMemo(() => {
    const raw = generateChartData(symbol);
    const withSMA = calculateSMA(raw, 20, "price");
    return calculateEMA(withSMA, 12, "price");
  }, [symbol]);

  const currentPrice = chartData[chartData.length - 1]?.price || 0;
  const prevPrice = chartData[chartData.length - 2]?.price || currentPrice;
  const priceChange = currentPrice - prevPrice;
  const priceChangePct = (priceChange / prevPrice) * 100;

  const handlePairClick = (pair: string) => {
    const mapping: Record<string, string> = {
      "EUR/USD": "FX:EURUSD",
      "GBP/USD": "FX:GBPUSD",
      "USD/JPY": "FX:USDJPY",
      "AUD/USD": "FX:AUDUSD",
      "USD/CAD": "FX:USDCAD",
      "XAU/USD": "TVC:GOLD",
      "BTC/USD": "BINANCE:BTCUSDT",
      "ETH/USD": "BINANCE:ETHUSDT",
      "NAS100": "CME_MINI:NQ1!",
      "US30": "CME_MINI:YM1!",
    };
    setSymbol(mapping[pair] || `FX:${pair.replace("/", "")}`);
  };

  const formatPrice = (price: number) => {
    if (price > 1000) return price.toFixed(2);
    return price.toFixed(5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 pb-8"
    >
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-[#111827]">TradingView</h1>
          <p className="text-[#6B7280] mt-1 max-w-2xl">
            Analyze the markets, follow expert trade ideas, practice chart analysis, and improve your trading decisions.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl border-[#ECECEC] text-[#111827] hover:bg-[#F3F0FF] hover:text-[#5B3DF5]">
            <ExternalLink className="w-4 h-4 mr-2" /> Open Full TradingView
          </Button>
          <Button variant="outline" className="rounded-xl border-[#ECECEC] text-[#111827] hover:bg-[#F3F0FF] hover:text-[#5B3DF5]">
            <Save className="w-4 h-4 mr-2" /> Save Workspace
          </Button>
          <Button className="bg-gradient-to-r from-[#5B3DF5] to-[#7C5CFF] hover:from-[#4c32d4] hover:to-[#6a4ce8] text-white rounded-xl shadow-md hover:shadow-lg transition-all">
            <Share2 className="w-4 h-4 mr-2" /> Share Analysis
          </Button>
        </div>
      </div>

      {/* Market Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {markets.map((m) => (
          <button
            key={m}
            onClick={() => setActiveMarket(m)}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200",
              activeMarket === m
                ? "bg-[#5B3DF5] text-white shadow-md"
                : "bg-white text-[#6B7280] hover:bg-[#F3F0FF] hover:text-[#5B3DF5] border border-transparent hover:border-[#ECECEC]"
            )}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Main Workspace */}
      <div className="flex flex-col xl:flex-row gap-6">
        {/* Chart Area */}
        <div className="flex-1 min-w-0 space-y-4">
          <Card className="rounded-3xl border-[#ECECEC] shadow-md overflow-hidden">
            {/* Chart Header */}
            <CardHeader className="pb-0">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
                    <Input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search symbol..."
                      className="pl-9 w-48 rounded-xl border-[#ECECEC] bg-[#F8F9FC] focus:bg-white"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-[#F3F0FF] text-[#5B3DF5] rounded-lg font-semibold">
                        {symbol}
                      </Badge>
                      <span className={cn("text-sm font-semibold", priceChange >= 0 ? "text-green-600" : "text-red-600")}>
                        {formatPrice(currentPrice)}
                      </span>
                      <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", priceChange >= 0 ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600")}>
                        {priceChange >= 0 ? "+" : ""}{priceChangePct.toFixed(2)}%
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
                        "px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors",
                        timeframe === tf
                          ? "bg-[#5B3DF5] text-white"
                          : "bg-[#F8F9FC] text-[#6B7280] hover:bg-[#F3F0FF] hover:text-[#5B3DF5]"
                      )}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>
            </CardHeader>

            {/* Chart Toolbar */}
            <CardContent className="px-4 py-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#ECECEC]">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setChartType("area")}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                      chartType === "area" ? "bg-[#F3F0FF] text-[#5B3DF5]" : "text-[#6B7280] hover:bg-[#F8F9FC]"
                    )}
                  >
                    <AreaChart className="w-3.5 h-3.5" /> Area
                  </button>
                  <button
                    onClick={() => setChartType("line")}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                      chartType === "line" ? "bg-[#F3F0FF] text-[#5B3DF5]" : "text-[#6B7280] hover:bg-[#F8F9FC]"
                    )}
                  >
                    <LineChart className="w-3.5 h-3.5" /> Line
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#6B7280] hover:bg-[#F8F9FC] transition-colors">
                    <CandlestickChart className="w-3.5 h-3.5" /> Candle
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="sma" checked={showSMA} onCheckedChange={setShowSMA} />
                      <Label htmlFor="sma" className="text-xs text-[#6B7280] cursor-pointer">SMA 20</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="ema" checked={showEMA} onCheckedChange={setShowEMA} />
                      <Label htmlFor="ema" className="text-xs text-[#6B7280] cursor-pointer">EMA 12</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="vol" checked={showVolume} onCheckedChange={setShowVolume} />
                      <Label htmlFor="vol" className="text-xs text-[#6B7280] cursor-pointer">Volume</Label>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg text-[#6B7280] hover:text-[#5B3DF5] hover:bg-[#F3F0FF]">
                      <Settings2 className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg text-[#6B7280] hover:text-[#5B3DF5] hover:bg-[#F3F0FF]">
                      <Camera className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg text-[#6B7280] hover:text-[#5B3DF5] hover:bg-[#F3F0FF]">
                      <Maximize2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>

            {/* Chart */}
            <CardContent className="p-4 pt-0">
              <div className="relative rounded-2xl overflow-hidden border border-[#ECECEC] bg-white" style={{ height: "520px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#5B3DF5" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#5B3DF5" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />
                    <XAxis dataKey="time" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} minTickGap={30} />
                    <YAxis
                      domain={["auto", "auto"]}
                      tick={{ fontSize: 11, fill: "#9CA3AF" }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v) => formatPrice(v)}
                      width={60}
                    />
                    {showVolume && (
                      <YAxis yAxisId="volume" orientation="right" hide domain={[0, "auto"]} />
                    )}
                    <Tooltip content={<CustomTooltip />} />
                    <ReferenceLine y={currentPrice} stroke="#5B3DF5" strokeDasharray="4 4" strokeOpacity={0.5} />
                    {chartType === "area" ? (
                      <Area type="monotone" dataKey="price" stroke="#5B3DF5" strokeWidth={2} fill="url(#priceGradient)" />
                    ) : (
                      <Line type="monotone" dataKey="price" stroke="#5B3DF5" strokeWidth={2} dot={false} />
                    )}
                    {showSMA && <Line type="monotone" dataKey="sma" stroke="#22C55E" strokeWidth={1.5} dot={false} />}
                    {showEMA && <Line type="monotone" dataKey="ema" stroke="#F59E0B" strokeWidth={1.5} dot={false} />}
                    {showVolume && (
                      <Bar dataKey="volume" yAxisId="volume" fill="#E5E7EB" radius={[2, 2, 0, 0]} barSize={6} />
                    )}
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Drawing Tools */}
          <Card className="rounded-3xl border-[#ECECEC] shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 overflow-x-auto">
                {drawingTools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <button
                      key={tool.label}
                      className="flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-[#5B3DF5] hover:text-white text-[#6B7280] transition-colors min-w-16"
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-[10px] font-medium">{tool.label}</span>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Popular Pairs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularPairs.map((p) => (
              <motion.div
                key={p.pair}
                whileHover={{ y: -4, boxShadow: "0 16px 32px -12px rgba(91,61,245,0.15)" }}
                onClick={() => handlePairClick(p.pair)}
                className="bg-white rounded-2xl border border-[#ECECEC] p-4 shadow-sm cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-[#111827]">{p.pair}</span>
                  <span className={cn("text-xs font-semibold", p.bullish ? "text-green-600" : "text-red-600")}>
                    {p.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-[#111827] mb-3">{p.price}</p>
                <div className="flex items-end gap-0.5 h-8">
                  {p.spark.map((v, i) => {
                    const min = Math.min(...p.spark);
                    const max = Math.max(...p.spark);
                    const h = ((v - min) / (max - min || 1)) * 100;
                    return (
                      <div
                        key={i}
                        className={cn("flex-1 rounded-sm", p.bullish ? "bg-green-500" : "bg-red-500")}
                        style={{ height: `${Math.max(10, h)}%`, opacity: 0.5 + (i / p.spark.length) * 0.5 }}
                      />
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Economic Calendar & News */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="rounded-3xl border-[#ECECEC] shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-[#111827] flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#5B3DF5]" /> Economic Calendar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {economicEvents.map((e, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[#F8F9FC] hover:bg-[#F3F0FF] transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-medium text-[#6B7280]">{e.time}</span>
                      <Badge
                        className={cn(
                          "rounded-md text-white",
                          e.impact === "High" ? "bg-red-500" : e.impact === "Medium" ? "bg-orange-500" : "bg-green-500"
                        )}
                      >
                        {e.impact}
                      </Badge>
                      <span className="text-sm font-medium text-[#111827]">{e.event}</span>
                    </div>
                    <span className="text-xs text-[#6B7280]">{e.forecast}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-[#ECECEC] shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-[#111827] flex items-center gap-2">
                  <Globe className="w-5 h-5 text-[#5B3DF5]" /> Market News
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {news.map((n, i) => (
                  <div key={i} className="p-3 rounded-xl hover:bg-[#F8F9FC] transition-colors cursor-pointer group">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary" className="bg-[#F3F0FF] text-[#5B3DF5] rounded-md">
                        {n.category}
                      </Badge>
                      <span className="text-xs text-[#6B7280]">{n.time}</span>
                    </div>
                    <p className="text-sm font-medium text-[#111827] group-hover:text-[#5B3DF5] transition-colors">{n.headline}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Analysis Panel */}
        <div className="w-full xl:w-96 space-y-6">
          {/* Watchlist */}
          <Card className="rounded-3xl border-[#ECECEC] shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold text-[#111827] flex items-center gap-2">
                <Star className="w-5 h-5 text-[#F59E0B]" /> Watchlist
              </CardTitle>
              <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg hover:bg-[#F3F0FF]">
                <Plus className="w-4 h-4 text-[#5B3DF5]" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-2">
              {watchlist.map((w) => (
                <div
                  key={w.pair}
                  onClick={() => handlePairClick(w.pair)}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all",
                    symbol.includes(w.pair.replace("/", "")) ? "bg-[#F3F0FF] border border-[#5B3DF5]/20" : "hover:bg-[#F3F0FF] border border-transparent"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Star className={cn("w-4 h-4", symbol.includes(w.pair.replace("/", "")) ? "text-[#5B3DF5]" : "text-[#F59E0B]")} />
                    <div>
                      <p className="text-sm font-semibold text-[#111827]">{w.pair}</p>
                      <p className="text-xs text-[#6B7280]">{w.open ? "Market Open" : "Market Closed"}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-[#111827]">{w.price}</p>
                    <p className={cn("text-xs font-medium", w.change.startsWith("+") ? "text-green-600" : "text-red-600")}>
                      {w.change}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Instructor Trade Ideas */}
          <Card className="rounded-3xl border-[#ECECEC] shadow-sm overflow-hidden">
            <div className="relative">
              <img
                src={tradeIdeas[0].image}
                alt="Trade idea"
                className="w-full h-40 object-cover"
              />
              <div className="absolute top-3 left-3">
                <Badge className="bg-green-500 text-white rounded-md">Buy Signal</Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-[#111827] mb-1">{tradeIdeas[0].title}</h3>
              <p className="text-xs text-[#6B7280] mb-3">By {tradeIdeas[0].instructor} • {tradeIdeas[0].date}</p>
              <div className="space-y-2 text-xs mb-4 bg-[#F8F9FC] rounded-xl p-3">
                <div className="flex justify-between"><span className="text-[#6B7280]">Entry Zone</span><span className="font-medium text-[#111827]">{tradeIdeas[0].entry}</span></div>
                <div className="flex justify-between"><span className="text-[#6B7280]">Stop Loss</span><span className="font-medium text-red-600">{tradeIdeas[0].stop}</span></div>
                <div className="flex justify-between"><span className="text-[#6B7280]">Take Profit</span><span className="font-medium text-green-600">{tradeIdeas[0].take}</span></div>
                <div className="flex justify-between"><span className="text-[#6B7280]">Risk:Reward</span><span className="font-medium text-[#111827]">{tradeIdeas[0].rr}</span></div>
              </div>
              <Button className="w-full bg-gradient-to-r from-[#5B3DF5] to-[#7C5CFF] hover:from-[#4c32d4] hover:to-[#6a4ce8] text-white rounded-xl">
                View Full Analysis <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardContent>
          </Card>

          {/* Trading Sessions */}
          <Card className="rounded-3xl border-[#ECECEC] shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[#111827] flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#F59E0B]" /> Trading Sessions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {sessions.map((s) => (
                <div key={s.name} className="flex items-center justify-between p-3 rounded-xl bg-[#F8F9FC] hover:bg-[#F3F0FF] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-2.5 h-2.5 rounded-full", s.open ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" : "bg-gray-300")} />
                    <div>
                      <p className="text-sm font-semibold text-[#111827]">{s.name}</p>
                      <p className="text-xs text-[#6B7280]">{s.pairs}</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-[#6B7280]">{s.time}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Charts Saved", value: 24, icon: Save },
              { label: "Ideas Viewed", value: 138, icon: TrendingUp },
              { label: "Practice Sessions", value: 42, icon: Activity },
              { label: "Journal Entries", value: 18, icon: BookOpen },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label} className="rounded-2xl border-[#ECECEC] shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <Icon className="w-5 h-5 text-[#5B3DF5] mb-2" />
                    <p className="text-2xl font-bold text-[#111827]">
                      <CountUp end={stat.value} />
                    </p>
                    <p className="text-xs text-[#6B7280] mt-1">{stat.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Resources */}
          <Card className="rounded-3xl border-[#ECECEC] shadow-sm bg-gradient-to-br from-[#F3F0FF] to-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[#111827] flex items-center gap-2">
                <Download className="w-5 h-5 text-[#5B3DF5]" /> Trading Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                "Trading Checklist",
                "Risk Calculator",
                "Position Size Calculator",
                "Smart Money Cheat Sheet",
              ].map((resource) => (
                <button key={resource} className="w-full flex items-center justify-between p-3 rounded-xl bg-white hover:bg-[#F8F9FC] transition-colors text-left">
                  <span className="text-sm font-medium text-[#111827]">{resource}</span>
                  <Download className="w-4 h-4 text-[#6B7280]" />
                </button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}