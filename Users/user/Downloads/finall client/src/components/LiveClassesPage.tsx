import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Video,
  Calendar as CalendarIcon,
  Clock,
  Users,
  Bell,
  Play,
  Download,
  FileText,
  CheckCircle2,
  Crown,
  Star,
  ChevronRight,
  MonitorPlay,
  BookOpen,
  BarChart3,
  Brain,
  ShieldCheck,
  CandlestickChart,
  Bitcoin,
  Globe,
  Newspaper,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const statusStyles: Record<string, string> = {
  Live: "bg-red-500 text-white",
  "Starting Soon": "bg-amber-500 text-white",
  Upcoming: "bg-[#5B3DF5] text-white",
  Completed: "bg-green-500 text-white",
  Cancelled: "bg-gray-400 text-white",
};

const categories = [
  { name: "Market Analysis", icon: BarChart3, color: "#5B3DF5" },
  { name: "Live Trading", icon: CandlestickChart, color: "#22C55E" },
  { name: "Mentorship", icon: Crown, color: "#F59E0B" },
  { name: "Trading Psychology", icon: Brain, color: "#EC4899" },
  { name: "Risk Management", icon: ShieldCheck, color: "#EF4444" },
  { name: "Price Action", icon: BookOpen, color: "#5B3DF5" },
  { name: "Smart Money", icon: Globe, color: "#7C5CFF" },
  { name: "Crypto", icon: Bitcoin, color: "#F59E0B" },
  { name: "Forex Basics", icon: FileText, color: "#22C55E" },
  { name: "News Trading", icon: Newspaper, color: "#EF4444" },
];

const upcomingClasses = [
  {
    id: 1,
    title: "EUR/USD Live Market Breakdown",
    instructor: "Omar Al-Farsi",
    instructorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    date: "Today",
    time: "14:00 GMT",
    duration: "90 min",
    difficulty: "Intermediate",
    category: "Market Analysis",
    description: "Deep dive into EUR/USD price action, key levels, and institutional order flow.",
    registered: 128,
    seats: 200,
    language: "English",
    status: "Live",
    thumbnail: "https://images.unsplash.com/photo-1611974765270-ca1258634369?w=600&h=340&fit=crop",
  },
  {
    id: 2,
    title: "Smart Money Concepts Masterclass",
    instructor: "Sarah Johnson",
    instructorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    date: "Tomorrow",
    time: "18:00 GMT",
    duration: "120 min",
    difficulty: "Advanced",
    category: "Smart Money",
    description: "Learn how institutional traders engineer liquidity and manipulate retail order flow.",
    registered: 84,
    seats: 150,
    language: "English",
    status: "Starting Soon",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=340&fit=crop",
  },
  {
    id: 3,
    title: "Risk Management for Beginners",
    instructor: "Khalid Hassan",
    instructorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    date: "Wed, 25 Oct",
    time: "16:00 GMT",
    duration: "60 min",
    difficulty: "Beginner",
    category: "Risk Management",
    description: "Position sizing, stop-loss placement, and protecting your trading capital.",
    registered: 210,
    seats: 300,
    language: "English",
    status: "Upcoming",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=340&fit=crop",
  },
];

const recordings = [
  { title: "NFP Trading Strategy", duration: "1:24:00", date: "18 Oct 2023", instructor: "Omar Al-Farsi", thumbnail: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=225&fit=crop" },
  { title: "ICT Order Blocks", duration: "1:05:00", date: "15 Oct 2023", instructor: "Sarah Johnson", thumbnail: "https://images.unsplash.com/photo-1611974765270-ca1258634369?w=400&h=225&fit=crop" },
  { title: "Psychology of Winning", duration: "52:00", date: "12 Oct 2023", instructor: "Khalid Hassan", thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=225&fit=crop" },
  { title: "Crypto Scalping Live", duration: "1:10:00", date: "10 Oct 2023", instructor: "Omar Al-Farsi", thumbnail: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=225&fit=crop" },
];

const resources = [
  { title: "Weekly Trading Plan", desc: "This week's key levels and setups", size: "2.4 MB" },
  { title: "Economic Calendar", desc: "High-impact news events", size: "1.1 MB" },
  { title: "Forex Cheat Sheet", desc: "Quick reference for beginners", size: "3.2 MB" },
  { title: "Risk Calculator", desc: "Position size calculator", size: "0.8 MB" },
  { title: "Trading Journal", desc: "Track and review your trades", size: "1.5 MB" },
  { title: "Market Outlook", desc: "Weekly market analysis PDF", size: "4.3 MB" },
];

const attendance = [
  { class: "NFP Trading Strategy", instructor: "Omar Al-Farsi", date: "18 Oct 2023", attendance: "Present", duration: "84 min", certificate: true, replay: true },
  { class: "ICT Order Blocks", instructor: "Sarah Johnson", date: "15 Oct 2023", attendance: "Present", duration: "65 min", certificate: true, replay: true },
  { class: "Psychology of Winning", instructor: "Khalid Hassan", date: "12 Oct 2023", attendance: "Late", duration: "40 min", certificate: false, replay: true },
  { class: "Crypto Scalping Live", instructor: "Omar Al-Farsi", date: "10 Oct 2023", attendance: "Present", duration: "70 min", certificate: true, replay: true },
];

function Countdown({ target }: { target: Date }) {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, target.getTime() - now.getTime());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  const units = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];
  return (
    <div className="flex gap-3">
      {units.map((u) => (
        <div key={u.label} className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-2xl font-bold text-white">
            {String(u.value).padStart(2, "0")}
          </div>
          <span className="text-xs text-white/70 mt-1.5">{u.label}</span>
        </div>
      ))}
    </div>
  );
}

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1200;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value]);
  return <span>{count}{suffix}</span>;
}

export function LiveClassesPage() {
  const [date, setDate] = useState<Date | undefined>(new Date(2023, 9, 22));
  const [reminders, setReminders] = useState({
    email: true,
    sms: false,
    browser: true,
    whatsapp: true,
    calendar: false,
  });

  const nextLive = new Date();
  nextLive.setHours(nextLive.getHours() + 7);
  nextLive.setMinutes(nextLive.getMinutes() + 38);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8 pb-8">
      {/* Page Header */}
      <motion.div variants={item} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-[#111827] mb-2">Live Classes</h1>
          <p className="text-[#6B7280] max-w-2xl">
            Join scheduled trading sessions, market analysis, mentorship classes, and live webinars with our instructors.
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-[#5B3DF5] hover:bg-[#4c32d4] text-white rounded-xl px-6 h-11 shadow-md shadow-violet-200">
            <Video className="w-4 h-4 mr-2" /> Join Next Live Class
          </Button>
          <Button variant="outline" className="rounded-xl px-6 h-11 border-[#ECECEC] text-[#111827] hover:bg-[#F3F0FF] hover:text-[#5B3DF5]">
            <CalendarIcon className="w-4 h-4 mr-2" /> View Full Schedule
          </Button>
        </div>
      </motion.div>

      {/* Hero Banner */}
      <motion.div variants={item} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#5B3DF5] via-[#6B4CF6] to-[#7C5CFF] p-8 lg:p-10 shadow-xl shadow-violet-200">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&h=500&fit=crop"
            alt="Trading desk"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-center">
          <div className="flex-1 space-y-6">
            <div>
              <Badge className="bg-white/20 text-white border-none mb-3">Next Live Trading Session</Badge>
              <h2 className="text-3xl font-bold text-white mb-2">EUR/USD Live Market Breakdown</h2>
              <p className="text-white/80 max-w-lg">Today's market analysis begins soon. Join Omar Al-Farsi for a deep dive into institutional order flow and key levels.</p>
            </div>
            <Countdown target={nextLive} />
            <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
              <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> 14:00 GMT · 90 min</div>
              <div className="flex items-center gap-2"><Users className="w-4 h-4" /> 128 registered</div>
              <div className="flex items-center gap-2"><Globe className="w-4 h-4" /> English</div>
            </div>
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10 border-2 border-white/30">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
                <AvatarFallback>OA</AvatarFallback>
              </Avatar>
              <div className="text-white">
                <p className="font-semibold text-sm">Omar Al-Farsi</p>
                <p className="text-xs text-white/70">Senior Forex Mentor</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button className="bg-white text-[#5B3DF5] hover:bg-white/90 rounded-xl px-6 h-11 font-semibold">
                <Video className="w-4 h-4 mr-2" /> Join Live Class
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-xl px-6 h-11">
                <CalendarIcon className="w-4 h-4 mr-2" /> Add to Calendar
              </Button>
            </div>
          </div>
          <div className="hidden lg:block w-[420px] h-[280px] rounded-2xl overflow-hidden shadow-2xl border border-white/20">
            <img
              src="https://images.unsplash.com/photo-1611974765270-ca1258634369?w=800&h=500&fit=crop"
              alt="Charts"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </motion.div>

      {/* Upcoming Classes */}
      <motion.div variants={item}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-[#111827]">Upcoming Live Classes</h2>
          <Button variant="link" className="text-[#5B3DF5] font-medium">
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <div className="space-y-4">
          {upcomingClasses.map((cls) => (
            <motion.div
              key={cls.id}
              whileHover={{ y: -3, boxShadow: "0 12px 30px -8px rgba(0,0,0,0.08)" }}
              className="bg-white rounded-2xl border border-[#ECECEC] p-5 shadow-sm transition-all"
            >
              <div className="flex flex-col lg:flex-row gap-5">
                <div className="w-full lg:w-56 h-32 rounded-xl overflow-hidden shrink-0">
                  <img src={cls.thumbnail} alt={cls.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <Badge className={`${statusStyles[cls.status]} mb-2`}>{cls.status}</Badge>
                      <h3 className="text-lg font-semibold text-[#111827]">{cls.title}</h3>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                      <Users className="w-4 h-4" /> {cls.registered}/{cls.seats}
                    </div>
                  </div>
                  <p className="text-sm text-[#6B7280] mb-3 line-clamp-2">{cls.description}</p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#6B7280] mb-4">
                    <div className="flex items-center gap-1.5">
                      <Avatar className="w-5 h-5">
                        <AvatarImage src={cls.instructorAvatar} />
                        <AvatarFallback>{cls.instructor[0]}</AvatarFallback>
                      </Avatar>
                      {cls.instructor}
                    </div>
                    <span className="flex items-center gap-1"><CalendarIcon className="w-3.5 h-3.5" /> {cls.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {cls.time} · {cls.duration}</span>
                    <span className="px-2 py-0.5 rounded-md bg-[#F3F0FF] text-[#5B3DF5]">{cls.difficulty}</span>
                    <span className="px-2 py-0.5 rounded-md bg-gray-100 text-[#6B7280]">{cls.category}</span>
                    <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" /> {cls.language}</span>
                  </div>
                  <div className="flex gap-3">
                    <Button className="bg-[#5B3DF5] hover:bg-[#4c32d4] text-white rounded-xl h-10 px-5">
                      <Video className="w-4 h-4 mr-2" /> Join
                    </Button>
                    <Button variant="outline" className="rounded-xl h-10 px-5 border-[#ECECEC] text-[#111827] hover:bg-[#F3F0FF] hover:text-[#5B3DF5]">
                      <Bell className="w-4 h-4 mr-2" /> Reminder
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div variants={item}>
        <h2 className="text-2xl font-semibold text-[#111827] mb-4">Live Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.name}
                whileHover={{ y: -4, borderColor: "#5B3DF5" }}
                className="bg-white rounded-2xl border border-[#ECECEC] p-5 shadow-sm cursor-pointer transition-all"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${cat.color}15` }}>
                  <Icon className="w-5 h-5" style={{ color: cat.color }} />
                </div>
                <h3 className="font-semibold text-[#111827] text-sm">{cat.name}</h3>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Weekly Schedule */}
      <motion.div variants={item}>
        <h2 className="text-2xl font-semibold text-[#111827] mb-4">This Week's Schedule</h2>
        <Card className="rounded-3xl border-[#ECECEC] shadow-sm">
          <CardContent className="p-0">
            <div className="grid grid-cols-7 border-b border-[#ECECEC]">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => (
                <div key={d} className={`p-4 text-center text-sm font-medium ${i === 0 ? "text-[#5B3DF5] bg-[#F3F0FF]" : "text-[#6B7280]"}`}>
                  {d}
                </div>
              ))}
            </div>
            <div className="p-4 space-y-3">
              {[
                { day: "Mon", time: "14:00", title: "EUR/USD Breakdown", instructor: "Omar Al-Farsi", duration: "90 min" },
                { day: "Tue", time: "18:00", title: "SMC Masterclass", instructor: "Sarah Johnson", duration: "120 min" },
                { day: "Wed", time: "16:00", title: "Risk Management", instructor: "Khalid Hassan", duration: "60 min" },
                { day: "Thu", time: "14:00", title: "Crypto Scalping", instructor: "Omar Al-Farsi", duration: "90 min" },
              ].map((s) => (
                <div key={s.title} className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F3F0FF] transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="text-center min-w-[48px]">
                      <p className="text-xs text-[#6B7280]">{s.day}</p>
                      <p className="text-sm font-semibold text-[#111827]">{s.time}</p>
                    </div>
                    <div>
                      <p className="font-medium text-[#111827] text-sm">{s.title}</p>
                      <p className="text-xs text-[#6B7280]">{s.instructor} · {s.duration}</p>
                    </div>
                  </div>
                  <Button size="sm" className="rounded-lg h-8 bg-[#5B3DF5] hover:bg-[#4c32d4] text-white">
                    Join
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Featured Session */}
      <motion.div variants={item}>
        <Card className="rounded-3xl border-[#ECECEC] shadow-sm overflow-hidden">
          <div className="h-40 bg-gradient-to-r from-[#5B3DF5] to-[#7C5CFF] relative">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=300&fit=crop"
              alt="Featured"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute bottom-4 left-6 text-white">
              <Badge className="bg-white/20 text-white border-none mb-2">Featured Session</Badge>
              <h3 className="text-2xl font-bold">Smart Money Concepts Masterclass</h3>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-[#111827]">Sarah Johnson</p>
                    <p className="text-sm text-[#6B7280]">Institutional Trader · 12 years experience</p>
                  </div>
                </div>
                <p className="text-[#6B7280] text-sm leading-relaxed">
                  A complete walkthrough of smart money concepts including order blocks, fair value gaps, liquidity sweeps, and market structure shifts. Designed for traders ready to think like institutions.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Order Blocks", "FVG", "Liquidity", "Market Structure"].map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-[#F3F0FF] text-[#5B3DF5] text-xs font-medium">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="lg:w-80 space-y-3">
                <h4 className="font-semibold text-[#111827] text-sm">What you'll learn</h4>
                <ul className="space-y-2 text-sm text-[#6B7280]">
                  {["Identify institutional order flow", "Spot high-probability setups", "Manage risk around smart money zones"].map((i) => (
                    <li key={i} className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> {i}</li>
                  ))}
                </ul>
                <Button className="w-full bg-[#5B3DF5] hover:bg-[#4c32d4] text-white rounded-xl h-11 mt-2">
                  Register Now <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Previous Recordings */}
      <motion.div variants={item}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-[#111827]">Previous Recordings</h2>
          <Button variant="link" className="text-[#5B3DF5] font-medium">Browse All <ChevronRight className="w-4 h-4 ml-1" /></Button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {recordings.map((rec) => (
            <motion.div
              key={rec.title}
              whileHover={{ y: -4 }}
              className="min-w-[280px] bg-white rounded-2xl border border-[#ECECEC] shadow-sm overflow-hidden"
            >
              <div className="h-36 relative">
                <img src={rec.thumbnail} alt={rec.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                    <Play className="w-5 h-5 text-[#5B3DF5] ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-xs">{rec.duration}</div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-[#111827] mb-1">{rec.title}</h3>
                <p className="text-xs text-[#6B7280] mb-3">{rec.date} · {rec.instructor}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="rounded-lg h-8 text-xs border-[#ECECEC]">
                    <MonitorPlay className="w-3.5 h-3.5 mr-1" /> Replay
                  </Button>
                  <Button size="sm" variant="outline" className="rounded-lg h-8 text-xs border-[#ECECEC]">
                    <Download className="w-3.5 h-3.5 mr-1" /> Notes
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Resources + Stats + Attendance + Notifications */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <motion.div variants={item} className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-[#111827] mb-4">Class Materials</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {resources.map((res) => (
                <motion.div
                  key={res.title}
                  whileHover={{ borderColor: "#5B3DF5" }}
                  className="bg-white rounded-2xl border border-[#ECECEC] p-4 shadow-sm flex items-start gap-3 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-red-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-[#111827] text-sm">{res.title}</h4>
                    <p className="text-xs text-[#6B7280] mb-2">{res.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#6B7280]">{res.size}</span>
                      <Button size="sm" variant="ghost" className="h-7 text-xs text-[#5B3DF5] hover:bg-[#F3F0FF]">
                        <Download className="w-3.5 h-3.5 mr-1" /> Download
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <Card className="rounded-3xl border-[#ECECEC] shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[#111827]">My Attendance</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="w-full min-w-full text-sm">
                <thead>
                  <tr className="text-left text-[#6B7280] border-b border-[#ECECEC]">
                    <th className="pb-3 font-medium">Class</th>
                    <th className="pb-3 font-medium">Instructor</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Attendance</th>
                    <th className="pb-3 font-medium">Replay</th>
                  </tr>
                </thead>
                <tbody className="text-[#111827]">
                  {attendance.map((row) => (
                    <tr key={row.class} className="border-b border-[#ECECEC] last:border-0">
                      <td className="py-3 font-medium">{row.class}</td>
                      <td className="py-3 text-[#6B7280]">{row.instructor}</td>
                      <td className="py-3 text-[#6B7280]">{row.date}</td>
                      <td className="py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${row.attendance === "Present" ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"}`}>
                          {row.attendance}
                        </span>
                      </td>
                      <td className="py-3">
                        {row.replay && (
                          <Button size="sm" variant="ghost" className="h-7 text-xs text-[#5B3DF5] hover:bg-[#F3F0FF]">
                            <Play className="w-3.5 h-3.5 mr-1" /> Watch
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} className="space-y-8">
          <Card className="rounded-3xl border-[#ECECEC] shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[#111827]">Quick Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Upcoming Classes", value: 8 },
                  { label: "Hours of Live Learning", value: 42, suffix: "h" },
                  { label: "Sessions Attended", value: 36 },
                  { label: "Certificates Earned", value: 5 },
                ].map((stat) => (
                  <div key={stat.label} className="bg-[#F8F9FC] rounded-2xl p-4">
                    <p className="text-3xl font-bold text-[#111827]"><AnimatedCounter value={stat.value} suffix={stat.suffix} /></p>
                    <p className="text-xs text-[#6B7280] mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-[#ECECEC] shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[#111827]">Reminder Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: "email", label: "Email Reminder" },
                { key: "sms", label: "SMS Reminder" },
                { key: "browser", label: "Browser Notification" },
                { key: "whatsapp", label: "WhatsApp Reminder" },
                { key: "calendar", label: "Calendar Reminder" },
              ].map((r) => (
                <div key={r.key} className="flex items-center justify-between">
                  <span className="text-sm text-[#111827]">{r.label}</span>
                  <Switch
                    checked={reminders[r.key as keyof typeof reminders]}
                    onCheckedChange={(checked) => setReminders((prev) => ({ ...prev, [r.key]: checked }))}
                    className="data-[state=checked]:bg-[#5B3DF5]"
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-[#ECECEC] shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[#111827]">Instructor Spotlight</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" />
                  <AvatarFallback>OA</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold text-[#111827]">Omar Al-Farsi</h4>
                  <p className="text-xs text-[#6B7280]">Forex & SMC Specialist</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-medium text-[#111827]">4.9</span>
                    <span className="text-xs text-[#6B7280]">(1,240 students)</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-[#6B7280] mb-4">
                Omar has over 10 years of institutional trading experience and has mentored more than 5,000 students across the Middle East and Europe.
              </p>
              <Button variant="outline" className="w-full rounded-xl border-[#ECECEC] text-[#111827] hover:bg-[#F3F0FF] hover:text-[#5B3DF5]">
                View Full Profile
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}