import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  MessageCircle,
  ThumbsUp,
  Share2,
  Search,
  Plus,
  Bookmark,
  Pin,
  Clock,
  TrendingUp,
  Trophy,
  Hash,
  Filter,
  Send,
  Image,
  ChevronRight,
  CheckCircle2,
  Star,
  Crown,
  Shield,
  Download,
  FileText,
  Zap,
  Eye,
  MoreHorizontal,
  Heart,
  Lock,
  Globe,
  ArrowRight,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { downloadCoursePdf } from "@/lib/downloadPdf";

const categories = [
  { name: "Forex", icon: BarChart3, count: 124 },
  { name: "Gold", icon: TrendingUp, count: 89 },
  { name: "Indices", icon: TrendingUp, count: 56 },
  { name: "Crypto", icon: Globe, count: 78 },
  { name: "Psychology", icon: Shield, count: 42 },
  { name: "Funding", icon: Crown, count: 34 },
  { name: "Announcements", icon: Pin, count: 18 },
];

const discussions = [
  { id: 1, title: "EUR/USD forming bull flag on H4 — breakout analysis", category: "Forex", author: "Sarah Kimani", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=face", role: "Senior Trader", replies: 38, views: 420, lastActivity: "12 min ago", pinned: true },
  { id: 2, title: "Weekly market outlook: Key levels to watch this week", category: "Forex", author: "David Ochieng", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face", role: "Mentor", replies: 52, views: 680, lastActivity: "1 hour ago", pinned: true },
  { id: 3, title: "Gold pushing above $2,400 — what's next?", category: "Gold", author: "Grace Wanjiku", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face", role: "Challenge Winner", replies: 24, views: 310, lastActivity: "3 hours ago", pinned: false },
  { id: 4, title: "How I passed the ReadyPips Challenge on my first attempt", category: "Funding", author: "Ahmed Bader", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face", role: "Premium Member", replies: 67, views: 890, lastActivity: "5 hours ago", pinned: false },
  { id: 5, title: "Managing emotions during drawdown periods", category: "Psychology", author: "Khalid Hassan", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face", role: "Mentor", replies: 19, views: 240, lastActivity: "8 hours ago", pinned: false },
];

const mentorInsights = [
  { title: "Market Outlook: Institutional order flow this week", author: "David Ochieng", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face", type: "Analysis" },
  { title: "Video: How to identify smart money zones", author: "Sarah Kimani", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=face", type: "Video" },
];

const resources = [
  { title: "Weekly Trading Plan Template", type: "PDF", size: "2.4 MB" },
  { title: "Position Size Calculator", type: "XLSX", size: "0.8 MB" },
  { title: "Trading Journal Template", type: "XLSX", size: "1.5 MB" },
  { title: "Market Structure Cheat Sheet", type: "PDF", size: "3.1 MB" },
];

const leaderboard = [
  { name: "Grace Wanjiku", profit: "+32.4%", wins: 78 },
  { name: "David Ochieng", profit: "+28.1%", wins: 72 },
  { name: "Ahmed Bader", profit: "+24.7%", wins: 68 },
  { name: "Sarah Kimani", profit: "+21.3%", wins: 65 },
  { name: "James Mwangi", profit: "+19.8%", wins: 61 },
];

const trendingTopics = [
  { tag: "ForexStrategy", posts: 1240 },
  { tag: "PriceAction", posts: 890 },
  { tag: "RiskManagement", posts: 670 },
  { tag: "ScalpingTips", posts: 540 },
  { tag: "ReadyPipsChallenge", posts: 420 },
];

export function CommunityPage() {
  const [activeTab, setActiveTab] = useState("discussions");
  const [search, setSearch] = useState("");

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15 }} className="space-y-10 pb-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-[40px] font-bold text-text-primary">Community</h1>
          <p className="text-text-secondary text-[15px] mt-1">Connect with fellow ReadyPips traders, share insights, and grow together.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="bg-primary hover:bg-primary-hover text-white rounded-button h-9 px-4 text-[13px] font-medium transition-all duration-150 hover:-translate-y-px">
            <Plus className="w-4 h-4 mr-1.5" /> New Discussion
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Members", value: "2,340", icon: Users },
          { label: "Discussions", value: "456", icon: MessageCircle },
          { label: "Mentors Online", value: "8", icon: Shield },
          { label: "Challenge Entries", value: "156", icon: Trophy },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="rounded-[18px] border-border shadow-card">
              <CardContent className="p-5">
                <Icon className="w-4 h-4 text-primary mb-2" />
                <p className="text-lg font-semibold text-text-primary">{s.value}</p>
                <p className="text-[13px] text-text-muted">{s.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex-1 min-w-0 space-y-6">
          <Card className="rounded-[18px] border-border shadow-card">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face" />
                  <AvatarFallback className="bg-primary text-white text-xs">AB</AvatarFallback>
                </Avatar>
                <Input placeholder="Start a discussion..." value={search} onChange={(e) => setSearch(e.target.value)} className="rounded-button border-border bg-bg flex-1 h-9 text-[13px]" />
                <Button size="icon" variant="ghost" className="rounded-button text-text-muted hover:text-primary hover:bg-primary/5 h-9 w-9"><Image className="w-4 h-4" /></Button>
                <Button className="bg-primary hover:bg-primary-hover text-white rounded-button h-9 px-4 text-[13px] font-medium transition-all duration-150"><Send className="w-4 h-4" /></Button>
              </div>
            </CardContent>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-bg rounded-button p-1">
              <TabsTrigger value="discussions" className="rounded-button text-[13px] data-[state=active]:bg-white data-[state=active]:shadow-card data-[state=active]:text-text-primary">Discussions</TabsTrigger>
              <TabsTrigger value="categories" className="rounded-button text-[13px] data-[state=active]:bg-white data-[state=active]:shadow-card data-[state=active]:text-text-primary">Categories</TabsTrigger>
              <TabsTrigger value="mentors" className="rounded-button text-[13px] data-[state=active]:bg-white data-[state=active]:shadow-card data-[state=active]:text-text-primary">Mentor Insights</TabsTrigger>
              <TabsTrigger value="challenges" className="rounded-button text-[13px] data-[state=active]:bg-white data-[state=active]:shadow-card data-[state=active]:text-text-primary">Challenges</TabsTrigger>
            </TabsList>

            <TabsContent value="discussions" className="space-y-3 mt-4">
              {discussions.map((d) => (
                <Card key={d.id} className="rounded-[18px] border-border shadow-card hover:shadow-card-hover hover:border-primary/20 transition-all duration-150 cursor-pointer">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <Avatar className="w-8 h-8 mt-0.5">
                        <AvatarImage src={d.avatar} />
                        <AvatarFallback className="bg-primary text-white text-xs">{d.author[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {d.pinned && <Pin className="w-3 h-3 text-primary" />}
                          <h3 className="font-medium text-[15px] text-text-primary truncate">{d.title}</h3>
                        </div>
                        <div className="flex items-center gap-3 text-[13px]">
                          <span className="text-text-secondary">{d.author}</span>
                          <Badge className="bg-primary/8 text-primary hover:bg-primary/8 rounded text-[10px] border-0">{d.role}</Badge>
                          <Badge variant="outline" className="rounded text-[10px] border-border text-text-muted">{d.category}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-[13px] text-text-muted shrink-0">
                        <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" /> {d.replies}</span>
                        <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {d.views}</span>
                        <span className="text-[11px]">{d.lastActivity}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button variant="outline" className="w-full rounded-button border-border text-text-secondary hover:bg-primary/5 hover:text-primary hover:border-primary/20 text-[13px]">Load More Discussions</Button>
            </TabsContent>

            <TabsContent value="categories" className="mt-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <Card key={cat.name} className="rounded-[18px] border-border shadow-card hover:border-primary/30 hover:shadow-card-hover transition-all duration-150 cursor-pointer">
                      <CardContent className="p-5">
                        <Icon className="w-5 h-5 text-primary mb-3" />
                        <h3 className="font-medium text-[15px] text-text-primary">{cat.name}</h3>
                        <p className="text-[13px] text-text-muted">{cat.count} discussions</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="mentors" className="space-y-3 mt-4">
              {mentorInsights.map((insight) => (
                <Card key={insight.title} className="rounded-[18px] border-border shadow-card hover:shadow-card-hover transition-all duration-150 cursor-pointer">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={insight.avatar} />
                        <AvatarFallback className="bg-primary text-white text-xs">{insight.author[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="font-medium text-[15px] text-text-primary truncate">{insight.title}</h3>
                          <Badge className="bg-primary/8 text-primary hover:bg-primary/8 rounded text-[10px] border-0">{insight.type}</Badge>
                        </div>
                        <p className="text-[13px] text-text-muted">{insight.author} · Mentor</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-text-muted" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="challenges" className="mt-4">
              <Card className="rounded-[18px] border-border shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-text-primary flex items-center gap-2"><Trophy className="w-5 h-5 text-warning" /> Weekly Trading Challenge</CardTitle>
                  <CardDescription className="text-text-secondary text-[13px]">Join the 2-week ReadyPips trading challenge and compete for funding.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    {[
                      { label: "Opens", value: "Mon, 30 Oct" },
                      { label: "Closes", value: "Sun, 12 Nov" },
                      { label: "Duration", value: "2 Weeks" },
                      { label: "Prize Pool", value: "$25,000" },
                    ].map((s) => (
                      <div key={s.label} className="p-3 rounded-button bg-bg"><p className="text-[11px] text-text-muted mb-0.5">{s.label}</p><p className="font-medium text-text-primary text-[13px]">{s.value}</p></div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-[18px] border border-border">
                    <div>
                      <p className="text-[13px] text-text-muted">Entry Fee</p>
                      <p className="text-lg font-semibold text-text-primary">$42.99</p>
                    </div>
                    <Button className="bg-primary hover:bg-primary-hover text-white rounded-button h-9 px-5 text-[13px] font-medium transition-all duration-150 hover:-translate-y-px">
                      Join Challenge <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="w-full xl:w-80 space-y-6">
          <Card className="rounded-[18px] border-border shadow-card">
            <CardHeader><CardTitle className="text-base font-semibold text-text-primary flex items-center gap-2"><Hash className="w-4 h-4 text-primary" /> Trending</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {trendingTopics.map((t) => (
                <div key={t.tag} className="flex items-center justify-between p-2 rounded-button hover:bg-primary/5 transition-colors duration-150 cursor-pointer">
                  <span className="text-[13px] font-medium text-text-primary">#{t.tag}</span>
                  <span className="text-[11px] text-text-muted">{t.posts} posts</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-[18px] border-border shadow-card">
            <CardHeader><CardTitle className="text-base font-semibold text-text-primary flex items-center gap-2"><Trophy className="w-4 h-4 text-warning" /> Top Contributors</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {leaderboard.map((trader, i) => (
                <div key={trader.name} className="flex items-center gap-3 p-2 rounded-button hover:bg-primary/5 transition-colors duration-150">
                  <span className={cn("w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold", i === 0 ? "bg-warning/10 text-warning" : i === 1 ? "bg-text-muted/10 text-text-muted" : "bg-bg text-text-muted")}>{i + 1}</span>
                  <div className="flex-1 min-w-0"><p className="text-[13px] font-medium text-text-primary truncate">{trader.name}</p><p className="text-[11px] text-success">{trader.profit}</p></div>
                  <span className="text-[11px] text-text-muted">{trader.wins}%</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-[18px] border-border shadow-card">
            <CardHeader><CardTitle className="text-base font-semibold text-text-primary flex items-center gap-2"><Download className="w-4 h-4 text-primary" /> Resources</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {resources.map((r) => (
                <button key={r.title} onClick={(e) => { e.preventDefault(); downloadCoursePdf(); }} className="w-full flex items-center justify-between p-2 rounded-button hover:bg-primary/5 transition-colors duration-150 cursor-pointer text-left">
                  <div className="flex items-center gap-2"><FileText className="w-4 h-4 text-text-muted" /><div><p className="text-[13px] font-medium text-text-primary">{r.title}</p><p className="text-[11px] text-text-muted">{r.type} · {r.size}</p></div></div>
                  <Download className="w-3.5 h-3.5 text-text-muted" />
                </button>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-[18px] border-border shadow-card">
            <CardContent className="p-5">
              <h4 className="font-medium text-[13px] text-text-primary mb-3">Community Guidelines</h4>
              <div className="space-y-1.5 text-[13px] text-text-secondary">
                <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" /> Be respectful and constructive</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" /> No spam or self-promotion</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" /> Share verified strategies only</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" /> Respect mentors and moderators</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
