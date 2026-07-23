import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Medal,
  Crown,
  TrendingUp,
  Users,
  Clock,
  Calendar,
  DollarSign,
  Target,
  Flame,
  ArrowRight,
  ChevronRight,
  Star,
  Award,
  Zap,
  BarChart3,
  CheckCircle2,
  Lock,
  Play,
  Rocket,
  Gift,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const COMPETITIONS = [
  {
    id: 1,
    title: "Beginner Challenge",
    tier: "Bronze",
    entryFee: 42.99,
    prizePool: 250,
    participants: 48,
    maxParticipants: 100,
    duration: "7 Days",
    startDate: "Every Monday",
    profitTarget: "10%",
    maxLoss: "5%",
    description: "Perfect for new traders. Start with a $8,598 virtual account and hit 10% profit.",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    icon: Medal,
  },
  {
    id: 2,
    title: "Intermediate Challenge",
    tier: "Silver",
    entryFee: 42.99,
    prizePool: 750,
    participants: 32,
    maxParticipants: 50,
    duration: "7 Days",
    startDate: "Every Monday",
    profitTarget: "10%",
    maxLoss: "5%",
    description: "Step up your game. $8,598 virtual account with stricter rules.",
    color: "text-slate-500",
    bgColor: "bg-slate-50",
    borderColor: "border-slate-200",
    icon: Target,
  },
  {
    id: 3,
    title: "Advanced Challenge",
    tier: "Gold",
    entryFee: 42.99,
    prizePool: 1500,
    participants: 18,
    maxParticipants: 40,
    duration: "14 Days",
    startDate: "1st of each month",
    profitTarget: "10%",
    maxLoss: "5%",
    description: "For experienced traders. $8,598 virtual account with advanced requirements.",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    icon: Trophy,
  },
  {
    id: 4,
    title: "Pro Challenge",
    tier: "Platinum",
    entryFee: 42.99,
    prizePool: 4000,
    participants: 12,
    maxParticipants: 30,
    duration: "14 Days",
    startDate: "1st of each month",
    profitTarget: "10%",
    maxLoss: "5%",
    description: "Elite competition for top traders. $8,598 virtual account.",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
    icon: Crown,
  },
  {
    id: 5,
    title: "Grand Championship",
    tier: "Diamond",
    entryFee: 42.99,
    prizePool: 7500,
    participants: 8,
    maxParticipants: 20,
    duration: "30 Days",
    startDate: "1st of each month",
    profitTarget: "15%",
    maxLoss: "4%",
    description: "The ultimate test. $8,598 virtual account. Top 3 split the prize pool.",
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
    borderColor: "border-cyan-200",
    icon: Rocket,
  },
];

const LEADERBOARD = [
  { rank: 1, name: "James K.", country: "🇰🇪", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face", pnl: 18.4, winRate: 72, trades: 24, prize: "$150", badge: Crown },
  { rank: 2, name: "Sarah M.", country: "🇬🇧", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face", pnl: 15.2, winRate: 68, trades: 19, prize: "$75", badge: Medal },
  { rank: 3, name: "Ahmed B.", country: "🇦🇪", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face", pnl: 12.8, winRate: 65, trades: 21, prize: "$25", badge: Award },
  { rank: 4, name: "Linda O.", country: "🇳🇬", avatar: "https://images.unsplash.com/photo-1534528741775-53994a67daeb?w=80&h=80&fit=crop&crop=face", pnl: 11.5, winRate: 61, trades: 18, prize: null, badge: null },
  { rank: 5, name: "Carlos R.", country: "🇧🇷", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face", pnl: 10.3, winRate: 58, trades: 22, prize: null, badge: null },
  { rank: 6, name: "Fatima Z.", country: "🇵🇰", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face", pnl: 9.1, winRate: 55, trades: 16, prize: null, badge: null },
  { rank: 7, name: "Daniel W.", country: "🇺🇸", avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=80&h=80&fit=crop&crop=face", pnl: 8.7, winRate: 54, trades: 20, prize: null, badge: null },
  { rank: 8, name: "Yuki T.", country: "🇯🇵", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop&crop=face", pnl: 7.2, winRate: 50, trades: 14, prize: null, badge: null },
  { rank: 9, name: "Maria L.", country: "🇵🇭", avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&h=80&fit=crop&crop=face", pnl: 6.5, winRate: 48, trades: 17, prize: null, badge: null },
  { rank: 10, name: "Omar F.", country: "🇪🇬", avatar: "https://images.unsplash.com/photo-1463453091185-6158ee4435d5?w=80&h=80&fit=crop&crop=face", pnl: 5.8, winRate: 46, trades: 15, prize: null, badge: null },
];

const PAST_WINNERS = [
  { month: "June 2026", winner: "James K.", pnl: 22.1, prize: "$150", tier: "Beginner" },
  { month: "May 2026", winner: "Sarah M.", pnl: 19.4, prize: "$750", tier: "Intermediate" },
  { month: "April 2026", winner: "Ahmed B.", pnl: 16.8, prize: "$1,500", tier: "Advanced" },
  { month: "March 2026", winner: "Carlos R.", pnl: 14.2, prize: "$4,000", tier: "Pro" },
];

const MY_STATS = [
  { label: "Current Rank", value: "#3", icon: Trophy, color: "text-warning" },
  { label: "Best P&L", value: "+12.8%", icon: TrendingUp, color: "text-success" },
  { label: "Win Rate", value: "65%", icon: Target, color: "text-primary" },
  { label: "Competitions Won", value: "2", icon: Crown, color: "text-warning" },
];

export function CompetitionPage() {
  const navigate = useNavigate();
  const [selectedComp, setSelectedComp] = useState<number | null>(null);
  const [joined, setJoined] = useState<number[]>([]);

  const handleJoin = (id: number) => {
    if (!joined.includes(id)) {
      setJoined([...joined, id]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Trading Competitions</h1>
        <p className="text-[14px] text-text-secondary mt-1">Compete with traders worldwide. Join monthly competitions, climb the leaderboard, and win prizes.</p>
      </div>

      {/* My Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {MY_STATS.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="rounded-[16px] border-border shadow-card">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-9 h-9 rounded-[10px] bg-primary/8 flex items-center justify-center">
                      <Icon className={cn("w-4 h-4", s.color)} />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-text-primary">{s.value}</p>
                  <p className="text-[12px] text-text-muted mt-0.5">{s.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <Tabs defaultValue="competitions" className="w-full">
        <TabsList className="rounded-[12px] bg-bg p-1 mb-4">
          <TabsTrigger value="competitions" className="rounded-[10px] text-[13px] data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">Competitions</TabsTrigger>
          <TabsTrigger value="leaderboard" className="rounded-[10px] text-[13px] data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">Leaderboard</TabsTrigger>
          <TabsTrigger value="winners" className="rounded-[10px] text-[13px] data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">Past Winners</TabsTrigger>
        </TabsList>

        {/* Competitions Tab */}
        <TabsContent value="competitions" className="mt-0 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {COMPETITIONS.map((comp, i) => {
              const Icon = comp.icon;
              const isJoined = joined.includes(comp.id);
              return (
                <motion.div
                  key={comp.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Card className={cn("rounded-[16px] border-2 shadow-card overflow-hidden transition-all hover:shadow-card-hover", comp.borderColor)}>
                    {/* Tier header */}
                    <div className={cn("px-5 py-4 flex items-center justify-between", comp.bgColor)}>
                      <div className="flex items-center gap-2">
                        <div className={cn("w-9 h-9 rounded-[10px] bg-white flex items-center justify-center")}>
                          <Icon className={cn("w-5 h-5", comp.color)} />
                        </div>
                        <div>
                          <p className="text-[14px] font-bold text-text-primary">{comp.title}</p>
                          <p className={cn("text-[11px] font-semibold", comp.color)}>{comp.tier} Tier</p>
                        </div>
                      </div>
                      {isJoined && (
                        <Badge className="bg-success/10 text-success border-0 rounded-full px-2 py-1 text-[10px] font-semibold">
                          <CheckCircle2 className="w-3 h-3 mr-1" /> Joined
                        </Badge>
                      )}
                    </div>

                    <CardContent className="p-5">
                      <p className="text-[13px] text-text-secondary leading-relaxed mb-4">{comp.description}</p>

                      {/* Entry fee + Prize */}
                      <div className="flex items-center justify-between mb-4 p-3 rounded-[12px] bg-bg">
                        <div>
                          <p className="text-[11px] text-text-muted">Entry Fee</p>
                          <p className="text-xl font-bold text-text-primary">${comp.entryFee}</p>
                        </div>
                        <div className="w-px h-10 bg-border" />
                        <div className="text-right">
                          <p className="text-[11px] text-text-muted">Prize Pool</p>
                          <p className="text-xl font-bold text-success">${comp.prizePool.toLocaleString()}</p>
                        </div>
                      </div>

                      {/* Specs */}
                      <div className="space-y-2 mb-4">
                        <SpecRow icon={DollarSign} label="Virtual Account" value={`$${(comp.entryFee * 200).toLocaleString()}`} />
                        <SpecRow icon={Target} label="Profit Target" value={comp.profitTarget} />
                        <SpecRow icon={TrendingUp} label="Max Loss" value={comp.maxLoss} />
                        <SpecRow icon={Clock} label="Duration" value={comp.duration} />
                        <SpecRow icon={Calendar} label="Starts" value={comp.startDate} />
                      </div>

                      {/* Participants */}
                      <div className="mb-4">
                        <div className="flex justify-between text-[12px] mb-1.5">
                          <span className="text-text-muted flex items-center gap-1"><Users className="w-3 h-3" /> {comp.participants}/{comp.maxParticipants} joined</span>
                          <span className="font-medium text-text-primary">{Math.round((comp.participants / comp.maxParticipants) * 100)}%</span>
                        </div>
                        <Progress value={(comp.participants / comp.maxParticipants) * 100} className="h-1.5" />
                      </div>

                      <Button
                        onClick={() => handleJoin(comp.id)}
                        disabled={isJoined}
                        className={cn(
                          "w-full rounded-[12px] h-10 text-[13px] font-semibold transition-all",
                          isJoined
                            ? "bg-success/10 text-success hover:bg-success/10"
                            : "btn-gradient-animated"
                        )}
                      >
                        {isJoined ? (
                          <><CheckCircle2 className="w-4 h-4 mr-1.5" /> Joined - Get Ready!</>
                        ) : (
                          <><Rocket className="w-4 h-4 mr-1.5" /> Join for ${comp.entryFee}</>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </TabsContent>

        {/* Leaderboard Tab */}
        <TabsContent value="leaderboard" className="mt-0">
          <Card className="rounded-[16px] border-border shadow-card overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[15px] font-semibold text-text-primary flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-warning" /> Monthly Leaderboard
                </CardTitle>
                <Badge className="bg-bg text-text-secondary border border-border rounded-full px-3 py-1 text-[11px]">
                  <Calendar className="w-3 h-3 mr-1" /> July 2026
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {/* Top 3 Podium */}
              <div className="grid grid-cols-3 gap-3 p-5 border-b border-border">
                {LEADERBOARD.slice(0, 3).map((p, i) => {
                  const podiumColors = [
                    "from-amber-400 to-amber-600",
                    "from-slate-300 to-slate-500",
                    "from-orange-300 to-orange-500",
                  ];
                  const heights = ["h-28", "h-24", "h-20"];
                  return (
                    <motion.div
                      key={p.rank}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex flex-col items-center"
                    >
                      <Avatar className={cn("w-14 h-14 mb-2 border-4 border-white shadow-md", i === 0 && "ring-2 ring-amber-400")}>
                        <AvatarImage src={p.avatar} />
                        <AvatarFallback>{p.name[0]}</AvatarFallback>
                      </Avatar>
                      <p className="text-[13px] font-semibold text-text-primary text-center">{p.name}</p>
                      <p className="text-[11px] text-text-muted">{p.country}</p>
                      <p className="text-[14px] font-bold text-success mt-1">+{p.pnl}%</p>
                      <div className={cn("mt-2 w-full rounded-t-[12px] bg-gradient-to-b flex items-start justify-center pt-2", podiumColors[i], heights[i])}>
                        <span className="text-white font-bold text-lg">{p.rank}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Full table */}
              <div className="overflow-x-auto">
                <table className="w-full text-[13px]">
                  <thead>
                    <tr className="border-b border-border bg-bg">
                      <th className="text-left py-3 px-4 text-text-muted font-medium">Rank</th>
                      <th className="text-left py-3 px-4 text-text-muted font-medium">Trader</th>
                      <th className="text-right py-3 px-4 text-text-muted font-medium">P&L</th>
                      <th className="text-right py-3 px-4 text-text-muted font-medium hidden md:table-cell">Win Rate</th>
                      <th className="text-right py-3 px-4 text-text-muted font-medium hidden md:table-cell">Trades</th>
                      <th className="text-right py-3 px-4 text-text-muted font-medium">Prize</th>
                    </tr>
                  </thead>
                  <tbody>
                    {LEADERBOARD.map((p) => {
                      const isMe = p.name === "Ahmed B.";
                      return (
                        <tr
                          key={p.rank}
                          className={cn(
                            "border-b border-border/50 hover:bg-bg transition-colors",
                            isMe && "bg-primary/[0.03]"
                          )}
                        >
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              {p.badge ? (
                                <p.badge className={cn("w-4 h-4", p.rank === 1 ? "text-amber-500" : p.rank === 2 ? "text-slate-400" : "text-orange-400")} />
                              ) : (
                                <span className="w-4 h-4 flex items-center justify-center text-text-muted font-medium text-[12px]">{p.rank}</span>
                              )}
                              <span className={cn("font-semibold", p.rank <= 3 ? "text-text-primary" : "text-text-muted")}>{p.rank}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Avatar className="w-7 h-7">
                                <AvatarImage src={p.avatar} />
                                <AvatarFallback className="text-[10px]">{p.name[0]}</AvatarFallback>
                              </Avatar>
                              <span className="font-medium text-text-primary">{p.name}</span>
                              {isMe && <Badge className="bg-primary/10 text-primary border-0 rounded-full px-2 py-0 text-[10px]">You</Badge>}
                              <span className="text-[12px]">{p.country}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-right font-bold text-success">+{p.pnl}%</td>
                          <td className="py-3 px-4 text-right text-text-secondary hidden md:table-cell">{p.winRate}%</td>
                          <td className="py-3 px-4 text-right text-text-secondary hidden md:table-cell">{p.trades}</td>
                          <td className="py-3 px-4 text-right">
                            {p.prize ? (
                              <span className="font-semibold text-warning">{p.prize}</span>
                            ) : (
                              <span className="text-text-muted">-</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Past Winners Tab */}
        <TabsContent value="winners" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PAST_WINNERS.map((w, i) => (
              <motion.div
                key={w.month}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="rounded-[16px] border-border shadow-card overflow-hidden hover:shadow-card-hover transition-shadow">
                  <div className="flex items-center gap-4 p-5">
                    <div className="w-14 h-14 rounded-[14px] bg-gradient-to-br from-warning/20 to-warning/5 flex items-center justify-center shrink-0">
                      <Crown className="w-7 h-7 text-warning" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className="bg-warning/10 text-warning border-0 rounded-full px-2 py-0.5 text-[10px] font-semibold">Champion</Badge>
                        <span className="text-[12px] text-text-muted">{w.month}</span>
                      </div>
                      <h3 className="font-semibold text-[15px] text-text-primary">{w.winner}</h3>
                      <div className="flex items-center gap-3 mt-1.5 text-[12px]">
                        <span className="text-success font-medium">+{w.pnl}% P&L</span>
                        <span className="text-text-muted">·</span>
                        <span className="text-warning font-semibold">Won {w.prize}</span>
                        <span className="text-text-muted">·</span>
                        <span className="text-text-muted">{w.tier}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Achievement showcase */}
          <Card className="rounded-[16px] border-border shadow-card mt-4">
            <CardHeader>
              <CardTitle className="text-[15px] font-semibold text-text-primary flex items-center gap-2">
                <Award className="w-4 h-4 text-primary" /> Your Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: "First Competition", icon: Rocket, unlocked: true, desc: "Joined your first competition" },
                  { label: "Top 10", icon: BarChart3, unlocked: true, desc: "Reached top 10 on leaderboard" },
                  { label: "Champion", icon: Crown, unlocked: true, desc: "Won a competition" },
                  { label: "Streak Master", icon: Flame, unlocked: false, desc: "Win 3 competitions in a row" },
                ].map((a) => {
                  const Icon = a.icon;
                  return (
                    <div
                      key={a.label}
                      className={cn(
                        "rounded-[12px] border p-4 text-center transition-all",
                        a.unlocked ? "border-primary/20 bg-primary/5" : "border-border bg-bg opacity-60"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-[10px] flex items-center justify-center mx-auto mb-2",
                        a.unlocked ? "bg-primary/10" : "bg-bg"
                      )}>
                        {a.unlocked ? (
                          <Icon className="w-5 h-5 text-primary" />
                        ) : (
                          <Lock className="w-5 h-5 text-text-muted" />
                        )}
                      </div>
                      <p className="text-[12px] font-semibold text-text-primary">{a.label}</p>
                      <p className="text-[10px] text-text-muted mt-0.5">{a.desc}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SpecRow({ icon: Icon, label, value }: { icon: typeof DollarSign; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-[12px]">
      <span className="flex items-center gap-1.5 text-text-muted">
        <Icon className="w-3.5 h-3.5" /> {label}
      </span>
      <span className="font-medium text-text-primary">{value}</span>
    </div>
  );
}
