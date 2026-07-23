import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Wrench,
  Calculator,
  TrendingUp,
  DollarSign,
  Percent,
  Scale,
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

const tools = [
  { id: "risk", label: "Risk / Position", icon: Shield, description: "Calculate position size based on account risk and stop loss distance." },
  { id: "pip", label: "Pip Value", icon: Hash, description: "Calculate the monetary value of pips for any currency pair and lot size." },
  { id: "profit", label: "Profit / Loss", icon: DollarSign, description: "Estimate profit or loss for a trade based on entry, exit, and lot size." },
  { id: "compound", label: "Compound", icon: PiggyBank, description: "Project account growth with compound interest and monthly deposits." },
  { id: "margin", label: "Margin", icon: Wallet, description: "Calculate required margin for a trade based on leverage and lot size." },
  { id: "rr", label: "Risk:Reward", icon: Target, description: "Calculate the risk-to-reward ratio for any trade setup." },
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

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
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
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
