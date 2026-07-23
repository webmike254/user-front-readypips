import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Video, Calendar as CalendarIcon, Clock, Users, Bell, Play, Download,
  FileText, CheckCircle2, Crown, Star, ChevronRight, MonitorPlay, BookOpen,
  BarChart3, Brain, ShieldCheck, CandlestickChart, Bitcoin, Globe, Newspaper,
  ArrowRight, Radio, Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePageNavigation } from "@/components/PageContext";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  Live: "bg-danger/10 text-danger",
  "Starting Soon": "bg-warning/10 text-warning",
  Upcoming: "bg-primary/10 text-primary",
  Completed: "bg-success/10 text-success",
};

const categories = [
  { name: "Market Analysis", icon: BarChart3, color: "#5B3DF5" },
  { name: "Live Trading", icon: CandlestickChart, color: "#22C55E" },
  { name: "Mentorship", icon: Crown, color: "#F59E0B" },
  { name: "Psychology", icon: Brain, color: "#EC4899" },
  { name: "Risk Management", icon: ShieldCheck, color: "#EF4444" },
  { name: "Price Action", icon: BookOpen, color: "#5B3DF5" },
  { name: "Smart Money", icon: Globe, color: "#7C5CFF" },
  { name: "Crypto", icon: Bitcoin, color: "#F59E0B" },
  { name: "News Trading", icon: Newspaper, color: "#EF4444" },
];

const upcomingClasses = [
  {
    id: 1, title: "EUR/USD Live Market Breakdown",
    instructor: "Omar Al-Farsi",
    instructorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    date: "Today", time: "14:00 GMT", duration: "90 min",
    difficulty: "Intermediate", category: "Market Analysis",
    description: "Deep dive into EUR/USD price action, key levels, and institutional order flow.",
    registered: 128, seats: 200, language: "English", status: "Live",
    thumbnail: "https://images.unsplash.com/photo-1611974765270-ca1258634369?w=600&h=340&fit=crop",
  },
  {
    id: 2, title: "Smart Money Concepts Masterclass",
    instructor: "Sarah Johnson",
    instructorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    date: "Tomorrow", time: "18:00 GMT", duration: "120 min",
    difficulty: "Advanced", category: "Smart Money",
    description: "Learn how institutional traders engineer liquidity and manipulate retail order flow.",
    registered: 84, seats: 150, language: "English", status: "Starting Soon",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=340&fit=crop",
  },
  {
    id: 3, title: "Risk Management for Beginners",
    instructor: "Khalid Hassan",
    instructorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    date: "Wed, 25 Jul", time: "16:00 GMT", duration: "60 min",
    difficulty: "Beginner", category: "Risk Management",
    description: "Position sizing, stop-loss placement, and protecting your trading capital.",
    registered: 210, seats: 300, language: "English", status: "Upcoming",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=340&fit=crop",
  },
  {
    id: 4, title: "Crypto Scalping Live Session",
    instructor: "Omar Al-Farsi",
    instructorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    date: "Thu, 26 Jul", time: "15:00 GMT", duration: "75 min",
    difficulty: "Intermediate", category: "Crypto",
    description: "Live scalping session on BTC and ETH. Watch real trades in real-time.",
    registered: 56, seats: 100, language: "English", status: "Upcoming",
    thumbnail: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=600&h=340&fit=crop",
  },
];

const recordings = [
  { title: "NFP Trading Strategy", duration: "1:24:00", date: "18 Jul 2026", instructor: "Omar Al-Farsi", thumbnail: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=225&fit=crop", views: 420 },
  { title: "ICT Order Blocks", duration: "1:05:00", date: "15 Jul 2026", instructor: "Sarah Johnson", thumbnail: "https://images.unsplash.com/photo-1611974765270-ca1258634369?w=400&h=225&fit=crop", views: 380 },
  { title: "Psychology of Winning", duration: "52:00", date: "12 Jul 2026", instructor: "Khalid Hassan", thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=225&fit=crop", views: 290 },
  { title: "Crypto Scalping Live", duration: "1:10:00", date: "10 Jul 2026", instructor: "Omar Al-Farsi", thumbnail: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=225&fit=crop", views: 510 },
  { title: "London Session Breakdown", duration: "1:30:00", date: "8 Jul 2026", instructor: "Sarah Johnson", thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop", views: 350 },
  { title: "Risk Management Deep Dive", duration: "45:00", date: "5 Jul 2026", instructor: "Khalid Hassan", thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop", views: 270 },
];

const weeklySchedule = [
  { day: "Mon", time: "14:00", title: "EUR/USD Breakdown", instructor: "Omar Al-Farsi", duration: "90 min", status: "Live" },
  { day: "Tue", time: "18:00", title: "SMC Masterclass", instructor: "Sarah Johnson", duration: "120 min", status: "Upcoming" },
  { day: "Wed", time: "16:00", title: "Risk Management", instructor: "Khalid Hassan", duration: "60 min", status: "Upcoming" },
  { day: "Thu", time: "15:00", title: "Crypto Scalping", instructor: "Omar Al-Farsi", duration: "75 min", status: "Upcoming" },
  { day: "Fri", time: "14:00", title: "Weekly Market Review", instructor: "Sarah Johnson", duration: "90 min", status: "Upcoming" },
];

const instructors = [
  { name: "Omar Al-Farsi", role: "Senior Forex Mentor", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face", rating: 4.9, students: 1240, classes: 48 },
  { name: "Sarah Johnson", role: "Institutional Trader", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face", rating: 4.8, students: 980, classes: 36 },
  { name: "Khalid Hassan", role: "Psychology & Risk Expert", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face", rating: 4.9, students: 2100, classes: 52 },
];

function CountdownTimer() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const next = new Date();
  next.setHours(next.getHours() + 7);
  next.setMinutes(next.getMinutes() + 38);

  const diff = Math.max(0, next.getTime() - now.getTime());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return (
    <div className="flex gap-2">
      {[
        { v: days, l: "Days" }, { v: hours, l: "Hrs" }, { v: minutes, l: "Min" }, { v: seconds, l: "Sec" },
      ].map((u) => (
        <div key={u.l} className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-[10px] bg-white border border-border flex items-center justify-center text-lg font-bold text-text-primary font-mono">
            {String(u.v).padStart(2, "0")}
          </div>
          <span className="text-[10px] text-text-muted mt-1">{u.l}</span>
        </div>
      ))}
    </div>
  );
}

export function LiveClassesPage() {
  const { setCurrentPage } = usePageNavigation();
  const [reminders, setReminders] = useState({ email: true, browser: true, whatsapp: true });
  const [search, setSearch] = useState("");

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Live Classes</h1>
          <p className="text-[14px] text-text-secondary mt-1">Join live trading sessions, mentorship classes, and watch recordings.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-[12px] h-9 px-4 text-[13px] border-border" onClick={() => setCurrentPage("downloads")}>
            <CalendarIcon className="w-4 h-4 mr-1.5" /> Full Schedule
          </Button>
          <Button className="rounded-[12px] h-9 px-4 text-[13px] bg-primary hover:bg-primary-hover">
            <Video className="w-4 h-4 mr-1.5" /> Join Live
          </Button>
        </div>
      </div>

      {/* Next Live Class - Clean card with countdown */}
      <Card className="rounded-[16px] border-border shadow-card overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-danger/10 text-danger border-0 rounded-full px-3 py-1 text-[12px] font-semibold">
                  <Radio className="w-3 h-3 mr-1 animate-pulse" /> Live Soon
                </Badge>
                <span className="text-[12px] text-text-muted">Next Live Trading Session</span>
              </div>
              <h2 className="text-xl font-bold text-text-primary mb-2">EUR/USD Live Market Breakdown</h2>
              <p className="text-[13px] text-text-secondary leading-relaxed mb-4 max-w-lg">
                Join Omar Al-Farsi for a deep dive into institutional order flow and key levels in the EUR/USD pair.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-[12px] text-text-muted mb-5">
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 14:00 GMT · 90 min</span>
                <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> 128 registered</span>
                <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> English</span>
              </div>
              <div className="flex items-center gap-3 mb-5">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
                  <AvatarFallback>OA</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-[13px] font-semibold text-text-primary">Omar Al-Farsi</p>
                  <p className="text-[11px] text-text-muted">Senior Forex Mentor</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="bg-primary hover:bg-primary-hover text-white rounded-[12px] h-10 px-5 text-[13px] font-medium">
                  <Video className="w-4 h-4 mr-1.5" /> Join Live Class
                </Button>
                <Button variant="outline" className="rounded-[12px] h-10 px-4 text-[13px] border-border">
                  <Bell className="w-4 h-4 mr-1.5" /> Set Reminder
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <p className="text-[12px] text-text-muted font-medium">Starts in</p>
              <CountdownTimer />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Upcoming", value: "8", icon: CalendarIcon, color: "text-primary" },
          { label: "Hours Live", value: "42h", icon: Clock, color: "text-success" },
          { label: "Attended", value: "36", icon: CheckCircle2, color: "text-text-secondary" },
          { label: "Certificates", value: "5", icon: Crown, color: "text-warning" },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div key={s.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="rounded-[16px] border-border shadow-card">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-[10px] bg-primary/8 flex items-center justify-center shrink-0">
                      <Icon className={cn("w-4 h-4", s.color)} />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-text-primary">{s.value}</p>
                      <p className="text-[11px] text-text-muted">{s.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="rounded-[12px] bg-bg p-1 mb-4">
          <TabsTrigger value="upcoming" className="rounded-[10px] text-[13px] data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">Upcoming</TabsTrigger>
          <TabsTrigger value="schedule" className="rounded-[10px] text-[13px] data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">Weekly Schedule</TabsTrigger>
          <TabsTrigger value="recordings" className="rounded-[10px] text-[13px] data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">Recordings</TabsTrigger>
          <TabsTrigger value="instructors" className="rounded-[10px] text-[13px] data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">Instructors</TabsTrigger>
        </TabsList>

        {/* Upcoming Classes */}
        <TabsContent value="upcoming" className="mt-0 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <Input placeholder="Search classes..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 rounded-[12px] border-border h-9 text-[13px]" />
          </div>
          {upcomingClasses
            .filter((c) => c.title.toLowerCase().includes(search.toLowerCase()))
            .map((cls, i) => (
              <motion.div
                key={cls.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Card className="rounded-[16px] border-border shadow-card overflow-hidden hover:shadow-card-hover transition-shadow">
                  <div className="flex flex-col lg:flex-row gap-5 p-5">
                    <div className="w-full lg:w-48 h-32 rounded-[12px] overflow-hidden shrink-0 relative">
                      <img src={cls.thumbnail} alt={cls.title} className="w-full h-full object-cover" />
                      <div className="absolute top-2 left-2">
                        <Badge className={cn("border-0 rounded-full px-2 py-1 text-[10px] font-semibold", statusStyles[cls.status])}>
                          {cls.status === "Live" && <Radio className="w-2.5 h-2.5 mr-1 animate-pulse" />}
                          {cls.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[15px] font-semibold text-text-primary mb-1">{cls.title}</h3>
                      <p className="text-[13px] text-text-secondary mb-3 line-clamp-2">{cls.description}</p>
                      <div className="flex flex-wrap items-center gap-3 text-[12px] text-text-muted mb-4">
                        <span className="flex items-center gap-1.5">
                          <Avatar className="w-5 h-5"><AvatarImage src={cls.instructorAvatar} /><AvatarFallback className="text-[8px]">{cls.instructor[0]}</AvatarFallback></Avatar>
                          {cls.instructor}
                        </span>
                        <span className="flex items-center gap-1"><CalendarIcon className="w-3.5 h-3.5" /> {cls.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {cls.time} · {cls.duration}</span>
                        <Badge className="bg-primary/8 text-primary hover:bg-primary/8 rounded text-[10px] border-0">{cls.difficulty}</Badge>
                        <Badge className="bg-bg text-text-secondary border border-border rounded text-[10px]">{cls.category}</Badge>
                        <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {cls.registered}/{cls.seats}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex-1 max-w-[200px]">
                          <div className="flex justify-between text-[11px] mb-1">
                            <span className="text-text-muted">Seats filled</span>
                            <span className="font-medium text-text-primary">{Math.round((cls.registered / cls.seats) * 100)}%</span>
                          </div>
                          <div className="h-1.5 bg-bg rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: `${(cls.registered / cls.seats) * 100}%` }} />
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button className="bg-primary hover:bg-primary-hover text-white rounded-[10px] h-9 px-4 text-[13px] font-medium">
                          <Video className="w-4 h-4 mr-1.5" /> {cls.status === "Live" ? "Join Now" : "Register"}
                        </Button>
                        <Button variant="outline" className="rounded-[10px] h-9 px-4 text-[13px] border-border">
                          <Bell className="w-4 h-4 mr-1.5" /> Reminder
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
        </TabsContent>

        {/* Weekly Schedule */}
        <TabsContent value="schedule" className="mt-0">
          <Card className="rounded-[16px] border-border shadow-card overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-[15px] font-semibold text-text-primary flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-primary" /> This Week's Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-7 border-b border-border">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => (
                  <div key={d} className={cn("p-3 text-center text-[12px] font-medium", i === 0 ? "text-primary bg-primary/5" : "text-text-muted")}>
                    {d}
                  </div>
                ))}
              </div>
              <div className="p-4 space-y-2">
                {weeklySchedule.map((s) => (
                  <div key={s.day + s.title} className="flex items-center justify-between p-3 rounded-[12px] hover:bg-bg transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="text-center min-w-[50px]">
                        <p className="text-[11px] text-text-muted">{s.day}</p>
                        <p className="text-[14px] font-semibold text-text-primary">{s.time}</p>
                      </div>
                      <div className="w-px h-8 bg-border" />
                      <div>
                        <p className="text-[14px] font-medium text-text-primary">{s.title}</p>
                        <p className="text-[12px] text-text-muted">{s.instructor} · {s.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={cn("border-0 rounded-full px-2 py-0.5 text-[10px]", statusStyles[s.status])}>{s.status}</Badge>
                      <Button size="sm" className="rounded-[8px] h-8 bg-primary hover:bg-primary-hover text-white text-[12px]">
                        Join
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-center p-4 text-center">
                  <p className="text-[12px] text-text-muted">No classes scheduled for Sat &amp; Sun</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <div className="mt-4">
            <h3 className="text-[14px] font-semibold text-text-primary mb-3">Browse Categories</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <div
                    key={cat.name}
                    className="bg-white rounded-[14px] border border-border p-4 shadow-card hover:shadow-card-hover transition-shadow cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-[10px] flex items-center justify-center mb-2" style={{ backgroundColor: `${cat.color}15` }}>
                      <Icon className="w-4 h-4" style={{ color: cat.color }} />
                    </div>
                    <p className="text-[12px] font-semibold text-text-primary">{cat.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </TabsContent>

        {/* Recordings */}
        <TabsContent value="recordings" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recordings.map((rec, i) => (
              <motion.div
                key={rec.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -3 }}
              >
                <Card className="rounded-[16px] border-border shadow-card overflow-hidden cursor-pointer hover:shadow-card-hover transition-shadow">
                  <div className="h-36 relative group">
                    <img src={rec.thumbnail} alt={rec.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                        <Play className="w-5 h-5 text-primary ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px]">{rec.duration}</div>
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-black/50 text-white border-0 rounded-full px-2 py-0.5 text-[10px]">
                        <MonitorPlay className="w-2.5 h-2.5 mr-1" /> {rec.views} views
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-[14px] text-text-primary mb-1">{rec.title}</h3>
                    <p className="text-[11px] text-text-muted mb-3">{rec.date} · {rec.instructor}</p>
                    <div className="flex gap-2">
                      <Button size="sm" className="rounded-[8px] h-8 bg-primary hover:bg-primary-hover text-white text-[12px] flex-1">
                        <Play className="w-3.5 h-3.5 mr-1" /> Watch
                      </Button>
                      <Button size="sm" variant="outline" className="rounded-[8px] h-8 text-[12px] border-border">
                        <Download className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Instructors */}
        <TabsContent value="instructors" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {instructors.map((inst, i) => (
              <motion.div
                key={inst.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="rounded-[16px] border-border shadow-card overflow-hidden hover:shadow-card-hover transition-shadow">
                  <div className="h-20 bg-gradient-to-r from-primary/10 to-primary/5" />
                  <CardContent className="p-5 -mt-10">
                    <Avatar className="w-16 h-16 border-4 border-white shadow-md mb-3">
                      <AvatarImage src={inst.avatar} />
                      <AvatarFallback>{inst.name[0]}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-[15px] text-text-primary">{inst.name}</h3>
                    <p className="text-[12px] text-text-muted mb-3">{inst.role}</p>
                    <div className="flex items-center gap-3 text-[12px] mb-4">
                      <span className="flex items-center gap-1 text-warning">
                        <Star className="w-3.5 h-3.5 fill-current" /> {inst.rating}
                      </span>
                      <span className="flex items-center gap-1 text-text-muted"><Users className="w-3.5 h-3.5" /> {inst.students}</span>
                      <span className="flex items-center gap-1 text-text-muted"><Video className="w-3.5 h-3.5" /> {inst.classes}</span>
                    </div>
                    <Button variant="outline" className="w-full rounded-[10px] h-9 text-[13px] border-border">
                      View Profile <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Reminder Settings */}
          <Card className="rounded-[16px] border-border shadow-card mt-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-[15px] font-semibold text-text-primary flex items-center gap-2">
                <Bell className="w-4 h-4 text-primary" /> Reminder Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { key: "email", label: "Email Reminder", desc: "Get notified via email before each class" },
                { key: "browser", label: "Browser Notification", desc: "Receive push notifications in your browser" },
                { key: "whatsapp", label: "WhatsApp Reminder", desc: "Get a WhatsApp message before classes" },
              ].map((r) => (
                <div key={r.key} className="flex items-center justify-between p-3 rounded-[12px] bg-bg">
                  <div>
                    <p className="text-[13px] font-medium text-text-primary">{r.label}</p>
                    <p className="text-[11px] text-text-muted">{r.desc}</p>
                  </div>
                  <Switch
                    checked={reminders[r.key as keyof typeof reminders]}
                    onCheckedChange={(checked) => setReminders((prev) => ({ ...prev, [r.key]: checked }))}
                    showLabels
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
