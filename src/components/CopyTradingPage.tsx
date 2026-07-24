import { motion } from "framer-motion";
import { Users, TrendingUp, Star, Copy, Activity, Shield, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const topTraders = [
  { name: "Alex Mwangi", profit: "+45.2%", followers: 1234, rating: 4.9, trades: 342, avatar: "AM", color: "bg-primary" },
  { name: "Sarah Kimani", profit: "+38.7%", followers: 892, rating: 4.8, trades: 256, avatar: "SK", color: "bg-success" },
  { name: "James Ochieng", profit: "+32.1%", followers: 567, rating: 4.7, trades: 189, avatar: "JO", color: "bg-warning" },
  { name: "Grace Wanjiku", profit: "+28.4%", followers: 345, rating: 4.6, trades: 156, avatar: "GW", color: "bg-danger" },
];

export function CopyTradingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Copy Trading</h1>
        <p className="text-[14px] text-text-muted mt-1">Copy top traders and earn profits automatically</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Copiers", value: "3,842", icon: Users, change: "+12%", positive: true },
          { label: "Avg. Return", value: "24.6%", icon: TrendingUp, change: "+3.2%", positive: true },
          { label: "Top Trader ROI", value: "45.2%", icon: Star, change: "+8.1%", positive: true },
          { label: "Active Strategies", value: "156", icon: Activity, change: "+5%", positive: true },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="rounded-[18px] border-border shadow-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-9 h-9 rounded-[10px] bg-primary/8 flex items-center justify-center">
                    <stat.icon className="w-4 h-4 text-primary" />
                  </div>
                  <Badge className={cn("rounded text-[10px]", stat.positive ? "bg-success/10 text-success" : "bg-danger/10 text-danger")}>
                    {stat.change}
                  </Badge>
                </div>
                <p className="text-[20px] font-bold text-text-primary">{stat.value}</p>
                <p className="text-[12px] text-text-muted">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="rounded-[18px] border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-text-primary flex items-center gap-2">
            <Star className="w-4 h-4 text-primary" />
            Top Traders
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {topTraders.map((trader, i) => (
            <motion.div
              key={trader.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between p-3 rounded-[14px] hover:bg-bg transition-colors cursor-pointer border border-border/50"
            >
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className={cn(trader.color, "text-white text-xs")}>{trader.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-[14px] font-semibold text-text-primary">{trader.name}</p>
                  <p className="text-[12px] text-text-muted">{trader.followers.toLocaleString()} followers · {trader.trades} trades</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[14px] font-bold text-success">{trader.profit}</p>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-warning fill-warning" />
                  <span className="text-[12px] text-text-muted">{trader.rating}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      <Card className="rounded-[18px] border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-text-primary flex items-center gap-2">
            <Copy className="w-4 h-4 text-primary" />
            My Copy Trading
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-8 text-center">
            <Shield className="w-12 h-12 text-text-muted mx-auto mb-3" />
            <p className="text-[14px] text-text-muted">You are not copying any traders yet</p>
            <Button className="mt-3 rounded-[12px]">Start Copy Trading</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}