import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Activity, LineChart, Sigma, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const indicators = [
  { name: "RSI (14)", value: "62.4", signal: "Neutral", color: "text-warning" },
  { name: "MACD", value: "Bullish", signal: "Buy", color: "text-success" },
  { name: "Moving Avg (50)", value: "1.2345", signal: "Above", color: "text-success" },
  { name: "Bollinger Bands", value: "Mid Band", signal: "Neutral", color: "text-warning" },
  { name: "Stochastic", value: "78.2", signal: "Overbought", color: "text-danger" },
  { name: "ATR (14)", value: "0.0023", signal: "Low Vol", color: "text-text-muted" },
];

export function StrategyIndicatorsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Strategy Indicators</h1>
        <p className="text-[14px] text-text-muted mt-1">Technical analysis indicators for your trading strategies</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {indicators.map((ind, i) => (
          <motion.div
            key={ind.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="rounded-[18px] border-border shadow-card hover:shadow-card-hover transition-all duration-200">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-[12px] bg-primary/8 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-primary" />
                  </div>
                  <Badge className={cn("rounded text-[10px]", ind.color.replace("text-", "bg-") + "/10 " + ind.color)}>
                    {ind.signal}
                  </Badge>
                </div>
                <h3 className="text-[14px] font-semibold text-text-primary mb-1">{ind.name}</h3>
                <p className="text-[20px] font-bold text-text-primary">{ind.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="rounded-[18px] border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-text-primary flex items-center gap-2">
            <LineChart className="w-4 h-4 text-primary" />
            Strategy Builder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-8 text-center">
            <Sigma className="w-12 h-12 text-text-muted mx-auto mb-3" />
            <p className="text-[14px] text-text-muted">Build custom strategies by combining indicators</p>
            <p className="text-[12px] text-text-muted mt-1">Coming soon</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}