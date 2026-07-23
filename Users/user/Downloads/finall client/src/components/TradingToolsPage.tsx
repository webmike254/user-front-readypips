import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Wrench,
  Calculator,
  TrendingUp,
  DollarSign,
  Percent,
  BarChart3,
  ChevronRight,
  ArrowRightLeft,
  RefreshCcw,
  Copy,
  CheckCircle2,
  Wallet,
  Target,
  Hash,
  PiggyBank,
  Shield,
  SlidersHorizontal,
  TrendingDown,
  Grid3X3,
  CircleDashed,
  Sigma,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ToasterProvider";
import { SimpleBarChart, MultiLineChart } from "@/components/Charts";

// ---- Position Size / Risk Calculator ----
function RiskCalculator() {
  const [account, setAccount] = useState("5000");
  const [riskPct, setRiskPct] = useState("1");
  const [slPips, setSlPips] = useState("50");
  const [pair, setPair] = useState("EURUSD");
  const { add } = useToast();

  const result = useMemo(() => {
    const acc = parseFloat(account) || 0;
    const risk = parseFloat(riskPct) || 0;
    const pips = parseFloat(slPips) || 1;
    const riskAmount = acc * (risk / 100);
    const pipValue = pair.includes("JPY") ? 0.0065 : 0.0001;
    const positionSize = riskAmount / (pips * 10 * pipValue * 100000);
    const lots = Math.max(0, Math.min(positionSize, acc / 100));
    return {
      riskAmount: riskAmount.toFixed(2),
      lots: lots.toFixed(2),
      units: (lots * 100000).toFixed(0),
    };
  }, [account, riskPct, slPips, pair]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => add("Copied to clipboard", "success"));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-1.5"><Label className="text-[13px] text-text-primary">Account Balance ($)</Label><Input value={account} onChange={(e) => setAccount(e.target.value)} type="number" className="rounded-button border-border h-9 text-[13px]" /></div>
        <div className="space-y-1.5"><Label className="text-[13px] text-text-primary">Risk Per Trade (%)</Label><Input value={riskPct} onChange={(e) => setRiskPct(e.target.value)} type="number" className="rounded-button border-border h-9 text-[13px]" /></div>
        <div className="space-y-1.5"><Label className="text-[13px] text-text-primary">Stop Loss (pips)</Label><Input value={slPips} onChange={(e) => setSlPips(e.target.value)} type="number" className="rounded-button border-border h-9 text-[13px]" /></div>
        <div className="space-y-1.5"><Label className="text-[13px] text-text-primary">Currency Pair</Label><Input value={pair} onChange={(e) => setPair(e.target.value.toUpperCase())} className="rounded-button border-border h-9 text-[13px] uppercase" /></div>
      </div>
      <Card className="rounded-[18px] border-border shadow-card">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-[18px] bg-bg">
              <p className="text-[13px] text-text-muted mb-1">Risk Amount</p>
              <p className="text-2xl font-semibold text-text-primary">${result.riskAmount}</p>
            </div>
            <div className="text-center p-4 rounded-[18px] bg-bg">
              <p className="text-[13px] text-text-muted mb-1">Position Size</p>
              <p className="text-2xl font-semibold text-text-primary">{result.lots} lots</p>
            </div>
            <div className="text-center p-4 rounded-[18px] bg-bg">
              <p className="text-[13px] text-text-muted mb-1">Units</p>
              <p className="text-2xl font-semibold text-text-primary">{result.units}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <Button variant="outline" className="rounded-button border-border text-[13px] h-8" onClick={() => copyToClipboard(result.lots)}><Copy className="w-3.5 h-3.5 mr-1.5" /> Copy Lots</Button>
            <Button variant="outline" className="rounded-button border-border text-[13px] h-8" onClick={() => copyToClipboard(result.units)}><Copy className="w-3.5 h-3.5 mr-1.5" /> Copy Units</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ---- Pip Calculator ----
function PipCalculator() {
  const [lotSize, setLotSize] = useState("1");
  const [pipCount, setPipCount] = useState("50");
  const [pair, setPair] = useState("EURUSD");
  const { add } = useToast();

  const result = useMemo(() => {
    const lots = parseFloat(lotSize) || 0;
    const pips = parseFloat(pipCount) || 0;
    const pipValue = pair.includes("JPY") ? 0.65 : 10;
    const value = lots * pips * pipValue;
    return { pipValue: pipValue.toFixed(2), value: value.toFixed(2) };
  }, [lotSize, pipCount, pair]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1.5"><Label className="text-[13px] text-text-primary">Lot Size</Label><Input value={lotSize} onChange={(e) => setLotSize(e.target.value)} type="number" className="rounded-button border-border h-9 text-[13px]" /></div>
        <div className="space-y-1.5"><Label className="text-[13px] text-text-primary">Pip Count</Label><Input value={pipCount} onChange={(e) => setPipCount(e.target.value)} type="number" className="rounded-button border-border h-9 text-[13px]" /></div>
        <div className="space-y-1.5"><Label className="text-[13px] text-text-primary">Currency Pair</Label><Input value={pair} onChange={(e) => setPair(e.target.value.toUpperCase())} className="rounded-button border-border h-9 text-[13px] uppercase" /></div>
      </div>
      <Card className="rounded-[18px] border-border shadow-card">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="text-center p-4 rounded-[18px] bg-bg">
              <p className="text-[13px] text-text-muted mb-1">Pip Value / Lot</p>
              <p className="text-2xl font-semibold text-text-primary">${result.pipValue}</p>
            </div>
            <div className="text-center p-4 rounded-[18px] bg-bg">
              <p className="text-[13px] text-text-muted mb-1">Total Pip Value</p>
              <p className="text-2xl font-semibold text-text-primary">${result.value}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ---- Profit Calculator ----
function ProfitCalculator() {
  const [entry, setEntry] = useState("1.0850");
  const [exit, setExit] = useState("1.0950");
  const [lots, setLots] = useState("1");
  const [pair, setPair] = useState("EURUSD");

  const result = useMemo(() => {
    const e = parseFloat(entry) || 0;
    const x = parseFloat(exit) || 0;
    const l = parseFloat(lots) || 0;
    const pipSize = pair.includes("JPY") ? 0.01 : 0.0001;
    const pips = (x - e) / pipSize;
    const pipValue = pair.includes("JPY") ? 0.65 : 10;
    const profit = pips * l * pipValue;
    return { pips: pips.toFixed(1), profit: profit.toFixed(2) };
  }, [entry, exit, lots, pair]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-1.5"><Label className="text-[13px] text-text-primary">Entry Price</Label><Input value={entry} onChange={(e) => setEntry(e.target.value)} type="number" className="rounded-button border-border h-9 text-[13px]" /></div>
        <div className="space-y-1.5"><Label className="text-[13px] text-text-primary">Exit Price</Label><Input value={exit} onChange={(e) => setExit(e.target.value)} type="number" className="rounded-button border-border h-9 text-[13px]" /></div>
        <div className="space-y-1.5"><Label className="text-[13px] text-text-primary">Lot Size</Label><Input value={lots} onChange={(e) => setLots(e.target.value)} type="number" className="rounded-button border-border h-9 text-[13px]" /></div>
        <div className="space-y-1.5"><Label className="text-[13px] text-text-primary">Currency Pair</Label><Input value={pair} onChange={(e) => setPair(e.target.value.toUpperCase())} className="rounded-button border-border h-9 text-[13px] uppercase" /></div>
      </div>
      <Card className="rounded-[18px] border-border shadow-card">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="text-center p-4 rounded-[18px] bg-bg">
              <p className="text-[13px] text-text-muted mb-1">Pips Gained</p>
              <p className={cn("text-2xl font-semibold", parseFloat(result.pips) >= 0 ? "text-success" : "text-danger")}>{result.pips} pips</p>
            </div>
            <div className="text-center p-4 rounded-[18px] bg-bg">
              <p className="text-[13px] text-text-muted mb-1">Profit / Loss</p>
              <p className={cn("text-2xl font-semibold", parseFloat(result.profit) >= 0 ? "text-success" : "text-danger")}>${result.profit}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ---- Compound Calculator ----
function CompoundCalculator() {
  const [principal, setPrincipal] = useState("5000");
  const [monthlyReturn, setMonthlyReturn] = useState("5");
  const [months, setMonths] = useState("12");
  const [monthlyAdd, setMonthlyAdd] = useState("500");

  const result = useMemo(() => {
    const p = parseFloat(principal) || 0;
    const r = (parseFloat(monthlyReturn) || 0) / 100;
    const m = parseInt(months) || 0;
    const add = parseFloat(monthlyAdd) || 0;
    let total = p;
    const history = [];
    for (let i = 1; i <= m; i++) {
      total = total * (1 + r) + add;
      history.push({ month: i, balance: total });
    }
    return { total: total.toFixed(2), history };
  }, [principal, monthlyReturn, months, monthlyAdd]);

  const chartData = useMemo(() => {
    return result.history.map((h) => ({ date: `M${h.month}`, balance: h.balance }));
  }, [result.history]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-1.5"><Label className="text-[13px] text-text-primary">Initial Capital ($)</Label><Input value={principal} onChange={(e) => setPrincipal(e.target.value)} type="number" className="rounded-button border-border h-9 text-[13px]" /></div>
        <div className="space-y-1.5"><Label className="text-[13px] text-text-primary">Monthly Return (%)</Label><Input value={monthlyReturn} onChange={(e) => setMonthlyReturn(e.target.value)} type="number" className="rounded-button border-border h-9 text-[13px]" /></div>
        <div className="space-y-1.5"><Label className="text-[13px] text-text-primary">Months</Label><Input value={months} onChange={(e) => setMonths(e.target.value)} type="number" className="rounded-button border-border h-9 text-[13px]" /></div>
        <div className="space-y-1.5"><Label className="text-[13px] text-text-primary">Monthly Deposit ($)</Label><Input value={monthlyAdd} onChange={(e) => setMonthlyAdd(e.target.value)} type="number" className="rounded-button border-border h-9 text-[13px]" /></div>
      </div>
      <Card className="rounded-[18px] border-border shadow-card">
        <CardContent className="p-6">
          <div className="text-center p-4 rounded-[18px] bg-bg mb-4">
            <p className="text-[13px] text-text-muted mb-1">Projected Balance</p>
            <p className="text-3xl font-semibold text-text-primary">${result.total}</p>
          </div>
          {chartData.length > 0 && (
            <div className="mb-4">
              <MultiLineChart
                data={chartData}
                lines={[{ key: "balance", color: "#5B3DF5", name: "Balance" }]}
                height={200}
              />
            </div>
          )}
          <div className="max-h-48 overflow-y-auto space-y-1.5 no-scrollbar">
            {result.history.map((h) => (
              <div key={h.month} className="flex items-center justify-between p-2.5 rounded-button bg-bg">
                <span className="text-[13px] text-text-muted">Month {h.month}</span>
                <span className="text-[13px] font-medium text-text-primary">${h.balance.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ---- Margin Calculator ----
function MarginCalculator() {
  const [pair, setPair] = useState("EURUSD");
  const [lots, setLots] = useState("1");
  const [leverage, setLeverage] = useState("100");

  const result = useMemo(() => {
    const l = parseFloat(lots) || 0;
    const lev = parseFloat(leverage) || 1;
    const contract = l * 100000;
    const margin = contract / lev;
    const price = pair.includes("JPY") ? 151.0 : 1.085;
    const required = pair.includes("JPY") ? margin * price : margin * price;
    return { contract: contract.toFixed(0), margin: required.toFixed(2) };
  }, [pair, lots, leverage]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1.5"><Label className="text-[13px] text-text-primary">Currency Pair</Label><Input value={pair} onChange={(e) => setPair(e.target.value.toUpperCase())} className="rounded-button border-border h-9 text-[13px] uppercase" /></div>
        <div className="space-y-1.5"><Label className="text-[13px] text-text-primary">Lot Size</Label><Input value={lots} onChange={(e) => setLots(e.target.value)} type="number" className="rounded-button border-border h-9 text-[13px]" /></div>
        <div className="space-y-1.5"><Label className="text-[13px] text-text-primary">Leverage (1:)</Label><Input value={leverage} onChange={(e) => setLeverage(e.target.value)} type="number" className="rounded-button border-border h-9 text-[13px]" /></div>
      </div>
      <Card className="rounded-[18px] border-border shadow-card">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="text-center p-4 rounded-[18px] bg-bg">
              <p className="text-[13px] text-text-muted mb-1">Contract Size</p>
              <p className="text-2xl font-semibold text-text-primary">{result.contract}</p>
            </div>
            <div className="text-center p-4 rounded-[18px] bg-bg">
              <p className="text-[13px] text-text-muted mb-1">Required Margin</p>
              <p className="text-2xl font-semibold text-text-primary">${result.margin}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ---- RR Calculator ----
function RRCalculator() {
  const [entry, setEntry] = useState("1.0850");
  const [sl, setSl] = useState("1.0800");
  const [tp, setTp] = useState("1.1000");
  const [pair, setPair] = useState("EURUSD");

  const result = useMemo(() => {
    const e = parseFloat(entry) || 0;
    const s = parseFloat(sl) || 0;
    const t = parseFloat(tp) || 0;
    const pipSize = pair.includes("JPY") ? 0.01 : 0.0001;
    const riskPips = Math.abs(e - s) / pipSize;
    const rewardPips = Math.abs(t - e) / pipSize;
    const rr = riskPips > 0 ? (rewardPips / riskPips).toFixed(2) : "0";
    return { riskPips: riskPips.toFixed(1), rewardPips: rewardPips.toFixed(1), rr };
  }, [entry, sl, tp, pair]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-1.5"><Label className="text-[13px] text-text-primary">Entry Price</Label><Input value={entry} onChange={(e) => setEntry(e.target.value)} type="number" className="rounded-button border-border h-9 text-[13px]" /></div>
        <div className="space-y-1.5"><Label className="text-[13px] text-text-primary">Stop Loss</Label><Input value={sl} onChange={(e) => setSl(e.target.value)} type="number" className="rounded-button border-border h-9 text-[13px]" /></div>
        <div className="space-y-1.5"><Label className="text-[13px] text-text-primary">Take Profit</Label><Input value={tp} onChange={(e) => setTp(e.target.value)} type="number" className="rounded-button border-border h-9 text-[13px]" /></div>
        <div className="space-y-1.5"><Label className="text-[13px] text-text-primary">Currency Pair</Label><Input value={pair} onChange={(e) => setPair(e.target.value.toUpperCase())} className="rounded-button border-border h-9 text-[13px] uppercase" /></div>
      </div>
      <Card className="rounded-[18px] border-border shadow-card">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-[18px] bg-bg">
              <p className="text-[13px] text-text-muted mb-1">Risk (pips)</p>
              <p className="text-2xl font-semibold text-danger">{result.riskPips}</p>
            </div>
            <div className="text-center p-4 rounded-[18px] bg-bg">
              <p className="text-[13px] text-text-muted mb-1">Reward (pips)</p>
              <p className="text-2xl font-semibold text-success">{result.rewardPips}</p>
            </div>
            <div className="text-center p-4 rounded-[18px] bg-bg">
              <p className="text-[13px] text-text-muted mb-1">Risk:Reward</p>
              <p className="text-2xl font-semibold text-primary">1:{result.rr}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ---- Fibonacci Calculator ----
function FibonacciCalculator() {
  const [high, setHigh] = useState("1.1000");
  const [low, setLow] = useState("1.0800");
  const [trend, setTrend] = useState<"up" | "down">("up");

  const levels = useMemo(() => {
    const h = parseFloat(high) || 0;
    const l = parseFloat(low) || 0;
    const diff = h - l;
    const fibs = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1];
    return fibs.map((f) => {
      const price = trend === "up" ? l + diff * f : h - diff * f;
      return { level: `${(f * 100).toFixed(1)}%`, price: price.toFixed(5), color: f === 0.5 ? "#5B3DF5" : f === 0.618 ? "#F59E0B" : f === 0.382 ? "#22C55E" : "#9A9A9A" };
    });
  }, [high, low, trend]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1.5"><Label className="text-[13px] text-text-primary">High Price</Label><Input value={high} onChange={(e) => setHigh(e.target.value)} type="number" className="rounded-button border-border h-9 text-[13px]" /></div>
        <div className="space-y-1.5"><Label className="text-[13px] text-text-primary">Low Price</Label><Input value={low} onChange={(e) => setLow(e.target.value)} type="number" className="rounded-button border-border h-9 text-[13px]" /></div>
        <div className="space-y-1.5"><Label className="text-[13px] text-text-primary">Trend Direction</Label>
          <div className="flex gap-2">
            <button onClick={() => setTrend("up")} className={cn("flex-1 rounded-button h-9 text-[13px] font-medium transition-all", trend === "up" ? "bg-success text-white" : "bg-bg text-text-muted hover:bg-primary/5")}>
              <TrendingUp className="w-4 h-4 inline mr-1" /> Up
            </button>
            <button onClick={() => setTrend("down")} className={cn("flex-1 rounded-button h-9 text-[13px] font-medium transition-all", trend === "down" ? "bg-danger text-white" : "bg-bg text-text-muted hover:bg-primary/5")}>
              <TrendingDown className="w-4 h-4 inline mr-1" /> Down
            </button>
          </div>
        </div>
      </div>
      <Card className="rounded-[18px] border-border shadow-card">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {levels.map((l) => (
              <div key={l.level} className="text-center p-3 rounded-[18px] bg-bg">
                <p className="text-[11px] text-text-muted mb-1">{l.level}</p>
                <p className="text-lg font-semibold text-text-primary" style={{ color: l.color }}>{l.price}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ---- Pivot Points Calculator ----
function PivotCalculator() {
  const [high, setHigh] = useState("1.1000");
  const [low, setLow] = useState("1.0800");
  const [close, setClose] = useState("1.0900");

  const result = useMemo(() => {
    const h = parseFloat(high) || 0;
    const l = parseFloat(low) || 0;
    const c = parseFloat(close) || 0;
    const pp = (h + l + c) / 3;
    const r1 = 2 * pp - l;
    const s1 = 2 * pp - h;
    const r2 = pp + (h - l);
    const s2 = pp - (h - l);
    const r3 = h + 2 * (pp - l);
    const s3 = l - 2 * (h - pp);
    return { pp: pp.toFixed(5), r1: r1.toFixed(5), s1: s1.toFixed(5), r2: r2.toFixed(5), s2: s2.toFixed(5), r3: r3.toFixed(5), s3: s3.toFixed(5) };
  }, [high, low, close]);

  const rows = [
    { label: "R3", value: result.r3, color: "text-danger" },
    { label: "R2", value: result.r2, color: "text-danger" },
    { label: "R1", value: result.r1, color: "text-danger" },
    { label: "Pivot (PP)", value: result.pp, color: "text-primary font-bold" },
    { label: "S1", value: result.s1, color: "text-success" },
    { label: "S2", value: result.s2, color: "text-success" },
    { label: "S3", value: result.s3, color: "text-success" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1.5"><Label className="text-[13px] text-text-primary">High</Label><Input value={high} onChange={(e) => setHigh(e.target.value)} type="number" className="rounded-button border-border h-9 text-[13px]" /></div>
        <div className="space-y-1.5"><Label className="text-[13px] text-text-primary">Low</Label><Input value={low} onChange={(e) => setLow(e.target.value)} type="number" className="rounded-button border-border h-9 text-[13px]" /></div>
        <div className="space-y-1.5"><Label className="text-[13px] text-text-primary">Close</Label><Input value={close} onChange={(e) => setClose(e.target.value)} type="number" className="rounded-button border-border h-9 text-[13px]" /></div>
      </div>
      <Card className="rounded-[18px] border-border shadow-card">
        <CardContent className="p-6">
          <div className="space-y-2">
            {rows.map((r) => (
              <div key={r.label} className="flex items-center justify-between p-3 rounded-[18px] bg-bg">
                <span className={cn("text-[13px] font-medium", r.color)}>{r.label}</span>
                <span className={cn("text-[13px] font-semibold", r.color)}>{r.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ---- Correlation Calculator ----
function CorrelationCalculator() {
  const [data1, setData1] = useState("1.0850, 1.0900, 1.0880, 1.0950, 1.0920, 1.0980, 1.0940, 1.1000, 1.0970, 1.1020");
  const [data2, setData2] = useState("1.2650, 1.2700, 1.2680, 1.2750, 1.2720, 1.2780, 1.2740, 1.2800, 1.2770, 1.2820");

  const result = useMemo(() => {
    const x = data1.split(",").map((s) => parseFloat(s.trim())).filter((n) => !isNaN(n));
    const y = data2.split(",").map((s) => parseFloat(s.trim())).filter((n) => !isNaN(n));
    if (x.length < 2 || y.length < 2 || x.length !== y.length) return { valid: false, correlation: 0, count: Math.min(x.length, y.length) };

    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
    const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);
    const sumY2 = y.reduce((sum, yi) => sum + yi * yi, 0);

    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
    const correlation = denominator === 0 ? 0 : numerator / denominator;

    return { valid: true, correlation, count: n };
  }, [data1, data2]);

  const chartData = useMemo(() => {
    const x = data1.split(",").map((s) => parseFloat(s.trim())).filter((n) => !isNaN(n));
    const y = data2.split(",").map((s) => parseFloat(s.trim())).filter((n) => !isNaN(n));
    return x.map((xi, i) => ({ date: `D${i + 1}`, series1: xi, series2: y[i] || 0 }));
  }, [data1, data2]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-[13px] text-text-primary">Series 1 (comma separated)</Label>
          <textarea
            value={data1}
            onChange={(e) => setData1(e.target.value)}
            className="w-full rounded-button border border-border h-24 p-3 text-[13px] font-mono resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-[13px] text-text-primary">Series 2 (comma separated)</Label>
          <textarea
            value={data2}
            onChange={(e) => setData2(e.target.value)}
            className="w-full rounded-button border border-border h-24 p-3 text-[13px] font-mono resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>
      <Card className="rounded-[18px] border-border shadow-card">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="text-center p-4 rounded-[18px] bg-bg">
              <p className="text-[13px] text-text-muted mb-1">Correlation Coefficient</p>
              <p className={cn("text-3xl font-semibold", result.valid ? (result.correlation >= 0.7 ? "text-success" : result.correlation <= -0.7 ? "text-danger" : "text-primary") : "text-text-muted")}>
                {result.valid ? result.correlation.toFixed(4) : "Invalid"}
              </p>
              <p className="text-[11px] text-text-muted mt-1">{result.valid ? `${result.count} data points` : "Need equal series of at least 2 points"}</p>
            </div>
            <div className="text-center p-4 rounded-[18px] bg-bg">
              <p className="text-[13px] text-text-muted mb-1">Interpretation</p>
              <p className="text-2xl font-semibold text-text-primary">
                {result.valid
                  ? Math.abs(result.correlation) >= 0.9 ? "Very Strong"
                  : Math.abs(result.correlation) >= 0.7 ? "Strong"
                  : Math.abs(result.correlation) >= 0.5 ? "Moderate"
                  : Math.abs(result.correlation) >= 0.3 ? "Weak"
                  : "Very Weak"
                  : "-"}
              </p>
              <p className="text-[11px] text-text-muted mt-1">
                {result.valid ? (result.correlation > 0 ? "Positive correlation" : "Negative correlation") : ""}
              </p>
            </div>
          </div>
          {chartData.length > 0 && (
            <div className="mt-4">
              <MultiLineChart
                data={chartData}
                lines={[
                  { key: "series1", color: "#5B3DF5", name: "Series 1" },
                  { key: "series2", color: "#22C55E", name: "Series 2" },
                ]}
                height={200}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

const tools = [
  { id: "risk", label: "Risk / Position", icon: Shield, description: "Calculate position size based on account risk and stop loss distance." },
  { id: "pip", label: "Pip Value", icon: Hash, description: "Calculate the monetary value of pips for any currency pair and lot size." },
  { id: "profit", label: "Profit / Loss", icon: DollarSign, description: "Estimate profit or loss for a trade based on entry, exit, and lot size." },
  { id: "compound", label: "Compound", icon: PiggyBank, description: "Project account growth with compound interest and monthly deposits." },
  { id: "margin", label: "Margin", icon: Wallet, description: "Calculate required margin for a trade based on leverage and lot size." },
  { id: "rr", label: "Risk:Reward", icon: Target, description: "Calculate the risk-to-reward ratio for any trade setup." },
  { id: "fibonacci", label: "Fibonacci", icon: Activity, description: "Calculate Fibonacci retracement and extension levels." },
  { id: "pivot", label: "Pivot Points", icon: Grid3X3, description: "Calculate classic pivot points with support and resistance levels." },
  { id: "correlation", label: "Correlation", icon: CircleDashed, description: "Calculate correlation between two price series." },
];

export function TradingToolsPage() {
  const [active, setActive] = useState("risk");
  const { add } = useToast();

  const activeTool = tools.find((t) => t.id === active);

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15 }} className="space-y-10 pb-8">
      <div>
        <h1 className="text-[40px] font-bold text-text-primary">Trading Tools</h1>
        <p className="text-text-secondary text-[15px] mt-1">Professional trading calculators for precise risk management and trade planning.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9 gap-3">
        {tools.map((t) => {
          const Icon = t.icon;
          const isActive = active === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-[18px] border text-center transition-all duration-150",
                isActive
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border bg-white shadow-card text-text-secondary hover:border-primary/30 hover:shadow-card-hover"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-text-muted")} />
              <span className="text-[13px] font-medium">{t.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 min-w-0">
          <Card className="rounded-[18px] border-border shadow-card">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                {activeTool && <activeTool.icon className="w-5 h-5 text-primary" />}
                <CardTitle className="text-lg font-semibold text-text-primary">{activeTool?.label} Calculator</CardTitle>
              </div>
              <CardDescription className="text-[13px] text-text-muted">{activeTool?.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-2">
              {active === "risk" && <RiskCalculator />}
              {active === "pip" && <PipCalculator />}
              {active === "profit" && <ProfitCalculator />}
              {active === "compound" && <CompoundCalculator />}
              {active === "margin" && <MarginCalculator />}
              {active === "rr" && <RRCalculator />}
              {active === "fibonacci" && <FibonacciCalculator />}
              {active === "pivot" && <PivotCalculator />}
              {active === "correlation" && <CorrelationCalculator />}
            </CardContent>
          </Card>
        </div>

        <div className="w-full lg:w-80 space-y-6">
          <Card className="rounded-[18px] border-border shadow-card">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-text-primary flex items-center gap-2"><SlidersHorizontal className="w-4 h-4 text-primary" /> Quick Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 rounded-[18px] bg-bg">
                <p className="text-[13px] font-medium text-text-primary">Default Account</p>
                <p className="text-[11px] text-text-muted">$5,000 USD</p>
              </div>
              <div className="p-3 rounded-[18px] bg-bg">
                <p className="text-[13px] font-medium text-text-primary">Default Leverage</p>
                <p className="text-[11px] text-text-muted">1:100</p>
              </div>
              <div className="p-3 rounded-[18px] bg-bg">
                <p className="text-[13px] font-medium text-text-primary">Default Risk</p>
                <p className="text-[11px] text-text-muted">1% per trade</p>
              </div>
              <Button className="w-full bg-primary hover:bg-primary-hover text-white rounded-button h-9 text-[13px] font-medium transition-all duration-150 hover:-translate-y-px">
                <RefreshCcw className="w-4 h-4 mr-1.5" /> Reset Defaults
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-[18px] border-border shadow-card">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-text-primary">Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-[13px] text-text-secondary">
              <div className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" /> Never risk more than 2% per trade</div>
              <div className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" /> Aim for minimum 1:2 risk-reward</div>
              <div className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" /> Always account for spread costs</div>
              <div className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" /> Use the compound calculator for projections</div>
              <div className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" /> Fibonacci 61.8% is a key reversal zone</div>
              <div className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" /> Pivot points work best in ranging markets</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
