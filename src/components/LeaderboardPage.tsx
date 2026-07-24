import { motion } from "framer-motion";
import { Trophy, Medal, TrendingUp, Users, Award, Star, Crown, Flame, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const leaderboard = [
  { rank: 1, name: "Alex Mwangi", profit: "+156.8%", trades: 342, winRate: "78%", avatar: "AM", color: "bg-yellow-500", prize: "KSh 50,000" },
  { rank: 2, name: "Sarah Kimani", profit: "+132.4%", trades: 256, winRate: "74%", avatar: "SK", color: "bg-gray-400", prize: "KSh 30,000" },
  { rank: 3, name: "James Ochieng", profit: "+98.2%", trades: 189, winRate: "71%", avatar: "JO", color: "bg-amber-700", prize: "KSh 20,000" },
  { rank: 4, name: "Grace Wanjiku", profit: "+85.7%", trades: 156, winRate: "69%", avatar: "GW", color: "bg-primary" },
  { rank: 5, name: "Peter Kamau", profit: "+72.3%", trades: 134, winRate: "67%", avatar: "PK", color: "bg-success" },
  { rank: 6, name: "Faith Nyambura", profit: "+65.9%", trades: 112, winRate: "65%", avatar: "FN", color: "bg-warning" },
  { rank: 7, name: "David Muthama", profit: "+58.4%", trades: 98, winRate: "63%", avatar: "DM", color: "bg-danger" },
  { rank: 8, name: "Esther Wambui", profit: "+52.1%", trades: 87, winRate: "61%", avatar: "EW", color: "bg-purple-500" },
];

export function LeaderboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Leaderboard</h1>
        <p className="text-[14px] text-text-muted mt-1">Top traders this month</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Top Prize", value: "KSh 50,000", icon: Trophy, color: "text-yellow-500" },
          { label: "Total Traders", value: "1,247", icon: Users, color: "text-primary" },
          { label: "Avg Win Rate", value: "68.5%", icon: TrendingUp, color: "text-success" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="rounded-[18px] border-border shadow-card">
              <CardContent className="p-4 flex items-center gap-3">
                <div className={cn("w-10 h-10 rounded-[12px] flex items-center justify-center", stat.color.replace("text-", "bg-") + "/10")}>
                  <stat.icon className={cn("w-5 h-5", stat.color)} />
                </div>
                <div>
                  <p className="text-[18px] font-bold text-text-primary">{stat.value}</p>
                  <p className="text-[12px] text-text-muted">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="rounded-[18px] border-border shadow-card overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-text-primary flex items-center gap-2">
            <Crown className="w-4 h-4 text-yellow-500" />
            Monthly Rankings
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {leaderboard.map((trader, i) => (
            <motion.div
              key={trader.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className={cn(
                "flex items-center justify-between px-5 py-3.5 border-b border-border/50 last:border-0 hover:bg-bg/50 transition-colors",
                i < 3 && "bg-primary/[0.02]"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold",
                  i === 0 ? "bg-yellow-500 text-white" : i === 1 ? "bg-gray-400 text-white" : i === 2 ? "bg-amber-700 text-white" : "bg-bg text-text-muted"
                )}>
                  {trader.rank}
                </div>
                <Avatar className="w-9 h-9">
                  <AvatarFallback className={cn(trader.color, "text-white text-[11px]")}>{trader.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-[14px] font-semibold text-text-primary">{trader.name}</p>
                  <p className="text-[11px] text-text-muted">{trader.trades} trades · {trader.winRate} win rate</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[14px] font-bold text-success">{trader.profit}</p>
                {i < 3 && (
                  <Badge className="bg-primary/8 text-primary hover:bg-primary/8 rounded text-[10px] mt-0.5">
                    {trader.prize}
                  </Badge>
                )}
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}