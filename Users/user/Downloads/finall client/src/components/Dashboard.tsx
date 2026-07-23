import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { BookOpen, Video, BarChart3, Users, Headphones, Flame, Calendar, Clock, ChevronRight, Bell, Download, Award, TrendingUp, TrendingDown, Activity, ArrowUpRight, ArrowDownRight, RefreshCw, Newspaper, Globe, Zap, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLiveMarketOverview,
  useLiveGainers,
  useLiveLosers,
  useLiveMostActive,
  useLiveSectorPerformance,
  useLiveEconomicCalendar,
  useLiveNews,
  useLiveForex,
  useLiveCrypto,
  useLiveQuotes,
} from "@/hooks/useMarketData";
import { MiniChart, SimpleBarChart, type ChartDataPoint } from "@/components/Charts";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

function Countdown() {
  const [t, setT] = useState({ h: "07", m: "38", s: "03" });
  useEffect(() => {
    const end = new Date();
    end.setHours(end.getHours() + 7, end.getMinutes() + 38, end.getSeconds() + 3);
    const i = setInterval(() => {
      const d = Math.max(end.getTime() - Date.now(), 0);
      setT({ h: String(Math.floor(d / 3600000)).padStart(2, "0"), m: String(Math.floor((d % 3600000) / 60000)).padStart(2, "0"), s: String(Math.floor((d % 60000) / 1000)).padStart(2, "0") });
    }, 1000);
    return () => clearInterval(i);
  }, []);
  return <div className="flex items-center gap-1.5 font-mono text-2xl font-semibold text-text-primary tracking-wide"><span>{t.h}</span><span className="text-text-muted">:</span><span>{t.m}</span><span className="text-text-muted">:</span><span>{t.s}</span></div>;
}

function Circle({ value, size = 120, stroke = 8 }: { value: number; size?: number; stroke?: number }) {
  const r = (size - stroke) / 2, c = 2 * Math.PI * r, dash = (value / 100) * c;
  return <svg width={size} height={size} className="-rotate-90"><circle cx={size / 2} cy={size / 2} r={r} stroke="#E9E9EC" strokeWidth={stroke} fill="none" /><circle cx={size / 2} cy={size / 2} r={r} stroke="#5B3DF5" strokeWidth={stroke} fill="none" strokeDasharray={`${dash} ${c - dash}`} strokeLinecap="round" /></svg>;
}

function MarketTicker() {
  const { data: marketOverview, loading, error } = useLiveMarketOverview();

  const indices = marketOverview?.indices?.slice(0, 5) || [
    { symbol: "AAPL", name: "Apple Inc.", price: 234.50, change: 1.25, changePercent: 0.53 },
    { symbol: "MSFT", name: "Microsoft", price: 432.10, change: -2.40, changePercent: -0.55 },
    { symbol: "GOOGL", name: "Alphabet", price: 178.90, change: 3.10, changePercent: 1.76 },
    { symbol: "TSLA", name: "Tesla", price: 245.30, change: -5.20, changePercent: -2.08 },
    { symbol: "AMZN", name: "Amazon", price: 198.40, change: 1.80, changePercent: 0.91 },
  ];

  if (loading) {
    return (
      <Card className="rounded-[18px] border-border shadow-card overflow-hidden">
        <CardContent className="p-4">
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2 shrink-0">
                <div className="w-8 h-4 rounded bg-border/60 animate-pulse" />
                <div className="w-16 h-4 rounded bg-border/60 animate-pulse" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="rounded-[18px] border-border shadow-card overflow-hidden">
        <CardContent className="p-4 flex items-center gap-2">
          <Activity className="w-4 h-4 text-text-muted" />
          <span className="text-[13px] text-text-muted">Market data unavailable</span>
          <button className="text-[13px] text-primary hover:underline ml-auto">Retry</button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-[18px] border-border shadow-card overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 shrink-0 text-[13px] font-medium text-text-primary">
            <Activity className="w-4 h-4 text-primary" />
            Market Overview
          </div>
          {indices.map((idx) => {
            const isPositive = (idx.changePercent || 0) >= 0;
            return (
              <div key={idx.symbol} className="flex items-center gap-2 shrink-0 cursor-pointer hover:bg-bg rounded-button px-2 py-1 transition-colors">
                <span className="text-[13px] font-semibold text-text-primary">{idx.symbol}</span>
                <span className="text-[13px] text-text-secondary">{idx.price.toFixed(2)}</span>
                <span className={cn("flex items-center gap-0.5 text-[11px] font-medium", isPositive ? "text-success" : "text-danger")}>
                  {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {isPositive ? "+" : ""}{idx.changePercent?.toFixed(2)}%
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function TopMovers() {
  const { data: gainers } = useLiveGainers();
  const { data: losers } = useLiveLosers();

  const formatPrice = (p: number) => p >= 1 ? p.toFixed(2) : p.toFixed(4);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="rounded-[18px] border-border shadow-card hover:shadow-card-hover transition-shadow duration-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-success" /> Top Gainers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {gainers?.slice(0, 5).map((g) => (
            <div key={g.symbol} className="flex items-center justify-between p-2.5 rounded-button hover:bg-primary/5 transition-colors cursor-pointer">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-button bg-success/10 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-success" />
                </div>
                <div>
                  <p className="text-[13px] font-medium text-text-primary">{g.symbol}</p>
                  <p className="text-[11px] text-text-muted">{g.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[13px] font-medium text-text-primary">{formatPrice(g.price)}</p>
                <p className="text-[11px] text-success font-medium">+{g.changesPercentage.toFixed(2)}%</p>
              </div>
            </div>
          ))}
          {!gainers && (
            <div className="p-4 text-center">
              <p className="text-[13px] text-text-muted">Loading gainers...</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="rounded-[18px] border-border shadow-card hover:shadow-card-hover transition-shadow duration-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-danger" /> Top Losers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {losers?.slice(0, 5).map((l) => (
            <div key={l.symbol} className="flex items-center justify-between p-2.5 rounded-button hover:bg-primary/5 transition-colors cursor-pointer">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-button bg-danger/10 flex items-center justify-center">
                  <TrendingDown className="w-4 h-4 text-danger" />
                </div>
                <div>
                  <p className="text-[13px] font-medium text-text-primary">{l.symbol}</p>
                  <p className="text-[11px] text-text-muted">{l.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[13px] font-medium text-text-primary">{formatPrice(l.price)}</p>
                <p className="text-[11px] text-danger font-medium">{l.changesPercentage.toFixed(2)}%</p>
              </div>
            </div>
          ))}
          {!losers && (
            <div className="p-4 text-center">
              <p className="text-[13px] text-text-muted">Loading losers...</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function SectorPerformance() {
  const { data: sectors } = useLiveSectorPerformance();

  const sectorData = useMemo(() => {
    if (!sectors) return [];
    return sectors.map((s) => ({
      label: s.sector,
      value: parseFloat(s.changesPercentage) || 0,
      color: parseFloat(s.changesPercentage) >= 0 ? "#22C55E" : "#EF4444",
    }));
  }, [sectors]);

  return (
    <Card className="rounded-[18px] border-border shadow-card hover:shadow-card-hover transition-shadow duration-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" /> Sector Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        {sectorData.length > 0 ? (
          <div className="space-y-3">
            {sectorData.map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <span className="text-[13px] text-text-primary w-32 truncate">{s.label}</span>
                <div className="flex-1 h-2 bg-bg rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(Math.abs(s.value) * 2, 100)}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: s.color }}
                  />
                </div>
                <span className={cn("text-[13px] font-medium w-16 text-right", s.value >= 0 ? "text-success" : "text-danger")}>
                  {s.value >= 0 ? "+" : ""}{s.value.toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center">
            <p className="text-[13px] text-text-muted">Loading sector data...</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function EconomicCalendarWidget() {
  const { data: events } = useLiveEconomicCalendar();

  return (
    <Card className="rounded-[18px] border-border shadow-card hover:shadow-card-hover transition-shadow duration-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary" /> Economic Calendar
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 max-h-80 overflow-y-auto no-scrollbar">
        {events?.slice(0, 8).map((e, i) => (
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
              <span className="text-[11px] text-text-muted ml-auto">{e.date}</span>
            </div>
            <p className="text-[13px] font-medium text-text-primary">{e.event}</p>
            <div className="flex items-center gap-3 mt-1 text-[11px] text-text-muted">
              <span>Actual: {e.actual || "-"}</span>
              <span>Est: {e.estimate || "-"}</span>
              <span>Prev: {e.previous || "-"}</span>
            </div>
          </div>
        ))}
        {!events && (
          <div className="p-4 text-center">
            <p className="text-[13px] text-text-muted">Loading economic calendar...</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function NewsWidget() {
  const { data: news } = useLiveNews(undefined, 6);

  return (
    <Card className="rounded-[18px] border-border shadow-card hover:shadow-card-hover transition-shadow duration-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
          <Newspaper className="w-4 h-4 text-primary" /> Market News
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 max-h-80 overflow-y-auto no-scrollbar">
        {news?.map((n, i) => (
          <a
            key={i}
            href={n.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-3 rounded-[18px] bg-bg hover:bg-primary/5 transition-colors"
          >
            <div className="flex items-start gap-2.5">
              {n.image && (
                <img src={n.image} alt="" className="w-12 h-12 rounded-button object-cover shrink-0" />
              )}
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-text-primary line-clamp-2">{n.title}</p>
                <p className="text-[11px] text-text-muted mt-0.5">{n.site} · {n.publishedDate}</p>
              </div>
            </div>
          </a>
        ))}
        {!news && (
          <div className="p-4 text-center">
            <p className="text-[13px] text-text-muted">Loading news...</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ForexWidget() {
  const { data: forex } = useLiveForex();

  const pairs = forex?.slice(0, 6) || [];

  return (
    <Card className="rounded-[18px] border-border shadow-card hover:shadow-card-hover transition-shadow duration-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
          <Globe className="w-4 h-4 text-primary" /> Forex
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {pairs.map((pair) => {
            const change = parseFloat(pair.changes?.toString() || "0");
            const isUp = change >= 0;
            return (
              <div key={pair.ticker} className="p-3 rounded-[18px] bg-bg hover:bg-primary/5 transition-colors cursor-pointer">
                <p className="text-[13px] font-semibold text-text-primary">{pair.ticker}</p>
                <p className="text-[13px] text-text-primary">{parseFloat(pair.bid).toFixed(4)}</p>
                <p className={cn("text-[11px] font-medium", isUp ? "text-success" : "text-danger")}>
                  {isUp ? "+" : ""}{change.toFixed(4)}
                </p>
              </div>
            );
          })}
        </div>
        {pairs.length === 0 && (
          <div className="p-4 text-center">
            <p className="text-[13px] text-text-muted">Loading forex data...</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function CryptoWidget() {
  const { data: crypto } = useLiveCrypto();

  const coins = crypto?.slice(0, 6) || [];

  return (
    <Card className="rounded-[18px] border-border shadow-card hover:shadow-card-hover transition-shadow duration-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
          <Zap className="w-4 h-4 text-warning" /> Crypto
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {coins.map((c) => {
            const isUp = (c.changesPercentage || 0) >= 0;
            return (
              <div key={c.symbol} className="p-3 rounded-[18px] bg-bg hover:bg-primary/5 transition-colors cursor-pointer">
                <p className="text-[13px] font-semibold text-text-primary">{c.symbol.replace("USD", "")}</p>
                <p className="text-[13px] text-text-primary">${c.price.toFixed(2)}</p>
                <p className={cn("text-[11px] font-medium", isUp ? "text-success" : "text-danger")}>
                  {isUp ? "+" : ""}{c.changesPercentage.toFixed(2)}%
                </p>
              </div>
            );
          })}
        </div>
        {coins.length === 0 && (
          <div className="p-4 text-center">
            <p className="text-[13px] text-text-muted">Loading crypto data...</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

const actions = [
  { icon: BookOpen, label: "My Courses", key: "courses" },
  { icon: Video, label: "Live Classes", key: "live" },
  { icon: BarChart3, label: "TradingView", key: "tradingview" },
  { icon: Users, label: "Community", key: "community" },
  { icon: Headphones, label: "Support", key: "settings" },
];

const courses = [
  { title: "Forex Fundamentals", difficulty: "Beginner", progress: 75, image: "/funding_pips_picture_2.jpg" },
  { title: "Advanced Price Action", difficulty: "Advanced", progress: 42, image: "/funding_pips_picture_2.jpg" },
  { title: "Risk Management Masterclass", difficulty: "Intermediate", progress: 30, image: "/funding_pips_picture_2.jpg" },
];

const announcements = [
  { title: "New Live Session This Week", time: "2 hours ago" },
  { title: "Platform Maintenance", time: "1 day ago" },
  { title: "October Challenge Results", time: "3 days ago" },
];

export function Dashboard() {
  const navigate = useNavigate();
  const streak = [true, true, true, true, true, false, false];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const handleNavigate = (page: string) => {
    navigate(`/${page}`);
  };

  return (
    <div className="flex flex-col xl:flex-row gap-10">
      <div className="flex-1 min-w-0 space-y-10">
        <Card className="rounded-[18px] border-border shadow-card overflow-hidden hover:shadow-card-hover transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-8 rounded-full bg-primary" />
                  <h1 className="text-[40px] font-bold text-text-primary leading-tight">Welcome back, Mike</h1>
                </div>
                <p className="text-text-secondary text-[15px]">Keep learning, keep growing, and become a consistent trader.</p>
                <div className="pt-2">
                  <p className="text-[13px] text-text-muted mb-1.5">Time left before next live class</p>
                  <Countdown />
                </div>
                <Button
                  className="btn-gradient-animated rounded-button h-9 px-5 text-[13px] font-medium transition-all duration-150 hover:-translate-y-px"
                  onClick={() => handleNavigate("live")}
                >
                  Join Live Class
                </Button>
              </div>
              <div className="hidden lg:block w-[280px] h-[180px] rounded-[18px] overflow-hidden">
                <img src="/funding_pips_picture_4.jpg" alt="Trading" className="w-full h-full object-cover" />
              </div>
            </div>
          </CardContent>
        </Card>

        <MarketTicker />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Balance", value: "$12,840", change: "+8.2%", icon: DollarSign, color: "text-success" },
            { label: "Open Trades", value: "3", change: "2 P&L", icon: Activity, color: "text-primary" },
            { label: "Win Rate", value: "68%", change: "+4%", icon: TrendingUp, color: "text-success" },
            { label: "This Month", value: "+$1,240", change: "+12%", icon: Zap, color: "text-warning" },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.2 }}
              >
                <Card className="rounded-[18px] border-border shadow-card hover:shadow-card-hover transition-shadow duration-200">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-button bg-primary/8 flex items-center justify-center">
                        <Icon className={cn("w-4 h-4", s.color)} />
                      </div>
                      <span className={cn("text-[11px] font-semibold", s.color)}>{s.change}</span>
                    </div>
                    <p className="text-2xl font-bold text-text-primary">{s.value}</p>
                    <p className="text-[12px] text-text-muted mt-0.5">{s.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {actions.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.div
                key={a.label}
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.06, duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                whileHover={{ y: -3, scale: 1.02, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleNavigate(a.key)}
                className="bg-white rounded-[18px] border border-border shadow-card p-5 cursor-pointer hover:border-primary/30 transition-all duration-200"
              >
                <div className="w-9 h-9 rounded-button bg-primary/8 flex items-center justify-center mb-3">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <p className="font-medium text-text-primary text-[13px]">{a.label}</p>
              </motion.div>
            );
          })}
        </div>

        <Card className="rounded-[18px] border-border shadow-card hover:shadow-card-hover transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold text-text-primary">My Courses</CardTitle>
            <Button
              variant="ghost"
              className="text-primary hover:text-primary-hover hover:bg-primary/5 rounded-button text-[13px]"
              onClick={() => handleNavigate("courses")}
            >
              View All <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {courses.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, duration: 0.2 }}
                whileHover={{ x: 2, borderColor: "rgba(91, 61, 245, 0.3)" }}
                onClick={() => handleNavigate("courses")}
                className="flex items-center gap-4 p-3 rounded-button border border-border hover:border-primary/30 transition-all duration-200 cursor-pointer"
              >
                <img src={c.image} alt={c.title} className="w-24 h-16 object-cover rounded-button" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-text-primary text-[15px] truncate">{c.title}</h4>
                  <Badge variant="secondary" className="mt-1 text-[10px] bg-primary/8 text-primary hover:bg-primary/8 rounded border-0">{c.difficulty}</Badge>
                </div>
                <div className="w-32">
                  <div className="flex justify-between text-[13px] mb-1">
                    <span className="text-text-muted">Progress</span>
                    <span className="font-medium text-text-primary">{c.progress}%</span>
                  </div>
                  <Progress value={c.progress} className="h-1.5" />
                </div>
                <Button className="btn-gradient-animated rounded-button h-8 px-4 text-[13px] font-medium transition-all duration-150 hover:-translate-y-px">Continue</Button>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        <TopMovers />

        <Card className="rounded-[18px] border-border shadow-card hover:shadow-card-hover transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-9 h-9 rounded-button bg-warning/10 flex items-center justify-center"><Flame className="w-4 h-4 text-warning" /></div>
              <div><p className="text-xl font-semibold text-text-primary">5 <span className="text-text-secondary text-sm font-normal">days</span></p><p className="text-[13px] text-text-muted">You're on fire. Keep the momentum going.</p></div>
            </div>
            <div className="flex items-center justify-between">
              {days.map((day, i) => (
                <motion.div
                  key={day}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                  className="flex flex-col items-center gap-1.5"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-medium transition-colors duration-150 ${streak[i] ? "bg-success text-white" : "bg-bg text-text-muted border border-border"}`}>
                    {streak[i] ? "✓" : i + 1}
                  </div>
                  <span className="text-[10px] text-text-muted">{day}</span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SectorPerformance />
          <EconomicCalendarWidget />
        </div>

        <NewsWidget />
      </div>

      <div className="w-full xl:w-80 space-y-6">
        <Card className="rounded-[18px] border-border shadow-card hover:shadow-card-hover transition-shadow duration-200">
          <CardHeader><CardTitle className="text-base font-semibold text-text-primary">Course Progress</CardTitle></CardHeader>
          <CardContent className="flex flex-col items-center">
            <Circle value={58} size={120} stroke={8} />
            <p className="text-xl font-semibold text-text-primary mt-3">58%</p>
            <p className="text-[13px] text-text-muted mb-3">Overall completion</p>
            <div className="w-full space-y-2">
              <div className="flex items-center justify-between text-[13px]"><span className="flex items-center gap-2 text-text-secondary"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Completed</span><span className="font-medium text-text-primary">3</span></div>
              <div className="flex items-center justify-between text-[13px]"><span className="flex items-center gap-2 text-text-secondary"><span className="w-1.5 h-1.5 rounded-full bg-success" /> In Progress</span><span className="font-medium text-text-primary">4</span></div>
              <div className="flex items-center justify-between text-[13px]"><span className="flex items-center gap-2 text-text-secondary"><span className="w-1.5 h-1.5 rounded-full bg-border" /> Remaining</span><span className="font-medium text-text-primary">5</span></div>
            </div>
          </CardContent>
        </Card>

        <ForexWidget />
        <CryptoWidget />

        <Card className="rounded-[18px] border-border shadow-card overflow-hidden hover:shadow-card-hover transition-shadow duration-200 cursor-pointer" onClick={() => handleNavigate("live")}>
          <div className="h-32 relative">
            <img src="/funding_pips_picture_3.png" alt="Live class" className="w-full h-full object-cover" />
            <Badge className="absolute top-3 left-3 bg-danger text-white hover:bg-danger rounded text-[10px]">LIVE</Badge>
          </div>
          <CardContent className="p-4">
            <h4 className="font-medium text-text-primary text-[15px] mb-0.5">Live Market Analysis</h4>
            <p className="text-[13px] text-text-muted flex items-center gap-1"><Clock className="w-3 h-3" /> Today, 2:00 PM</p>
            <Button className="w-full btn-gradient-animated rounded-button h-9 mt-3 text-[13px] font-medium transition-all duration-150 hover:-translate-y-px">Join Now</Button>
          </CardContent>
        </Card>

        <Card className="rounded-[18px] border-border shadow-card hover:shadow-card-hover transition-shadow duration-200">
          <CardHeader className="pb-1"><CardTitle className="text-base font-semibold text-text-primary flex items-center gap-2"><Bell className="w-4 h-4 text-primary" /> Announcements</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {announcements.map((a) => (
              <div key={a.title} className="flex items-start gap-2.5 p-2 rounded-button hover:bg-primary/5 transition-colors duration-150 cursor-pointer">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                <div>
                  <p className="text-[13px] font-medium text-text-primary">{a.title}</p>
                  <p className="text-[11px] text-text-muted">{a.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid grid-cols-3 gap-3">
          {[{ label: "Enrolled", value: "7" }, { label: "Hours", value: "48" }, { label: "Certs", value: "1" }].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.2 }}
            >
              <Card className="rounded-button border-border shadow-card text-center p-3 hover:shadow-card-hover transition-shadow duration-150 cursor-pointer">
                <p className="text-lg font-semibold text-text-primary">{s.value}</p>
                <p className="text-[11px] text-text-muted">{s.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
