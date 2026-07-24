import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, Video, BarChart3, Users, Headphones, Flame, Calendar, Clock, ChevronRight, Bell, Download, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

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
  return <div className="flex items-center gap-2 font-mono text-4xl md:text-5xl font-bold text-white tracking-wider"><span>{t.h}</span><span className="text-white/60">:</span><span>{t.m}</span><span className="text-white/60">:</span><span>{t.s}</span></div>;
}

function Circle({ value, size = 120, stroke = 10 }: { value: number; size?: number; stroke?: number }) {
  const r = (size - stroke) / 2, c = 2 * Math.PI * r, dash = (value / 100) * c;
  return <svg width={size} height={size} className="-rotate-90"><circle cx={size / 2} cy={size / 2} r={r} stroke="#E2E8F0" strokeWidth={stroke} fill="none" /><circle cx={size / 2} cy={size / 2} r={r} stroke="#7C3AED" strokeWidth={stroke} fill="none" strokeDasharray={`${dash} ${c - dash}`} strokeLinecap="round" /></svg>;
}

const actions = [
  { icon: BookOpen, label: "My Courses", color: "text-violet-600", bg: "bg-violet-50" },
  { icon: Video, label: "Live Classes", color: "text-green-500", bg: "bg-green-50" },
  { icon: BarChart3, label: "TradingView", color: "text-amber-500", bg: "bg-amber-50" },
  { icon: Users, label: "Community", color: "text-pink-500", bg: "bg-pink-50" },
  { icon: Headphones, label: "Support", color: "text-slate-500", bg: "bg-slate-100" },
];

const courses = [
  { title: "Forex Fundamentals", difficulty: "Beginner", progress: 75, image: "https://images.unsplash.com/photo-1611974765270-ca1258634369?w=120&h=80&fit=crop" },
  { title: "Advanced Price Action", difficulty: "Advanced", progress: 42, image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=120&h=80&fit=crop" },
  { title: "Risk Management Masterclass", difficulty: "Intermediate", progress: 30, image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=120&h=80&fit=crop" },
];

const announcements = [
  { title: "New Live Session This Week", time: "2 hours ago", type: "announcement" },
  { title: "Platform Maintenance", time: "1 day ago", type: "update" },
  { title: "October Challenge Results", time: "3 days ago", type: "announcement" },
];

const events = [
  { title: "Live Trading Session", time: "2:00 PM", color: "bg-violet-600" },
  { title: "Q&A with Mentors", time: "5:00 PM", color: "bg-green-500" },
];

export function Dashboard() {
  const [streak] = useState([true, true, true, true, true, false, false]);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      <div className="flex-1 min-w-0 space-y-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden rounded-3xl p-8 md:p-10 text-white bg-gradient-to-br from-violet-900 via-violet-700 to-violet-500">
          <div className="relative z-10 max-w-xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Welcome back, Ahmed!</h1>
            <p className="text-white/80 mb-6 max-w-md">Keep learning, keep growing, and become a consistent trader.</p>
            <Countdown />
            <p className="text-white/60 text-sm mt-2 mb-6">Time left before next live class</p>
            <Button className="bg-white text-violet-700 hover:bg-white/90 rounded-xl font-semibold px-6">Join Live Class</Button>
          </div>
          <img src="https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=500&h=400&fit=crop" alt="Trading" className="absolute right-0 bottom-0 h-full w-1/2 object-cover opacity-40" style={{ maskImage: "linear-gradient(to right, transparent, black 40%)" }} />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20"><motion.div initial={{ width: 0 }} animate={{ width: "65%" }} transition={{ duration: 1.5 }} className="h-full bg-white" /></div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {actions.map((a, i) => { const Icon = a.icon; return <motion.div key={a.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ y: -4 }} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm cursor-pointer hover:shadow-md transition-shadow"><div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${a.bg}`}><Icon className={`w-6 h-6 ${a.color}`} /></div><p className="font-semibold text-slate-900 text-sm">{a.label}</p></motion.div>; })}
        </div>

        <Card className="rounded-3xl border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-4"><CardTitle className="text-xl font-bold text-slate-900">My Courses</CardTitle><Button variant="ghost" className="text-violet-600 hover:text-violet-700 hover:bg-violet-50 rounded-xl">View All <ChevronRight className="w-4 h-4 ml-1" /></Button></CardHeader>
          <CardContent className="space-y-4">
            {courses.map((c) => (
              <div key={c.title} className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-2xl border border-slate-200 hover:bg-slate-50 hover:shadow-sm transition-all cursor-pointer">
                <img src={c.image} alt={c.title} className="w-full md:w-32 h-20 object-cover rounded-xl" />
                <div className="flex-1"><h4 className="font-semibold text-slate-900">{c.title}</h4><Badge variant="secondary" className="mt-1 text-xs bg-violet-50 text-violet-700 hover:bg-violet-50">{c.difficulty}</Badge></div>
                <div className="flex-1"><div className="flex justify-between text-sm mb-1"><span className="text-slate-500">Progress</span><span className="font-semibold text-slate-900">{c.progress}%</span></div><Progress value={c.progress} className="h-2" /></div>
                <Button className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl">Continue</Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4"><div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center"><Flame className="w-6 h-6 text-orange-500" /></div><div><p className="text-3xl font-bold text-slate-900">5<span className="text-lg text-slate-500 font-normal"> days</span></p><p className="text-sm text-slate-500">You're on fire! Keep the momentum going.</p></div></div>
            <div className="flex items-center justify-between">
              {days.map((day, i) => <div key={day} className="flex flex-col items-center gap-2"><div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors ${streak[i] ? "bg-green-500 border-green-500 text-white" : "bg-white border-slate-200 text-slate-400"}`}>{streak[i] ? "✓" : i + 1}</div><span className="text-xs text-slate-500">{day}</span></div>)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="w-full xl:w-96 space-y-8">
        <Card className="rounded-3xl border-slate-200 shadow-sm">
          <CardHeader><CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2"><Calendar className="w-5 h-5 text-violet-600" /> October 2023</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2 text-center text-sm mb-4">
              {["S", "M", "T", "W", "T", "F", "S"].map((d) => <span key={d} className="text-slate-400 font-medium">{d}</span>)}
              {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => <div key={d} className={`aspect-square rounded-lg flex items-center justify-center text-sm ${d === 22 ? "bg-violet-600 text-white font-semibold" : [5, 12, 19, 26].includes(d) ? "relative text-slate-900 font-medium after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full after:bg-violet-600" : "text-slate-500 hover:bg-violet-50"}`}>{d}</div>)}
            </div>
            <div className="space-y-3 pt-4 border-t border-slate-200">
              {events.map((e) => <div key={e.title} className="flex items-center gap-3 p-2 rounded-xl hover:bg-violet-50 transition-colors cursor-pointer"><div className={`w-2 h-2 rounded-full ${e.color}`} /><div className="flex-1"><p className="text-sm font-medium text-slate-900">{e.title}</p><p className="text-xs text-slate-500">{e.time}</p></div></div>)}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-slate-200 shadow-sm">
          <CardHeader><CardTitle className="text-lg font-bold text-slate-900">Course Progress</CardTitle></CardHeader>
          <CardContent className="flex flex-col items-center">
            <Circle value={58} size={140} stroke={12} />
            <p className="text-3xl font-bold text-slate-900 mt-4">58%</p>
            <p className="text-sm text-slate-500 mb-4">Overall completion</p>
            <div className="w-full space-y-2">
              <div className="flex items-center justify-between text-sm"><span className="flex items-center gap-2 text-slate-500"><span className="w-2 h-2 rounded-full bg-violet-600" /> Completed</span><span className="font-semibold text-slate-900">3</span></div>
              <div className="flex items-center justify-between text-sm"><span className="flex items-center gap-2 text-slate-500"><span className="w-2 h-2 rounded-full bg-green-500" /> In Progress</span><span className="font-semibold text-slate-900">4</span></div>
              <div className="flex items-center justify-between text-sm"><span className="flex items-center gap-2 text-slate-500"><span className="w-2 h-2 rounded-full bg-slate-200" /> Remaining</span><span className="font-semibold text-slate-900">5</span></div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-slate-200 shadow-sm overflow-hidden">
          <div className="relative h-40"><img src="https://images.unsplash.com/photo-1611974765270-ca1258634369?w=400&h=250&fit=crop" alt="Live class" className="w-full h-full object-cover" /><Badge className="absolute top-3 left-3 bg-red-500 text-white hover:bg-red-500">LIVE</Badge></div>
          <CardContent className="p-5"><h4 className="font-semibold text-slate-900 mb-1">Live Market Analysis</h4><p className="text-sm text-slate-500 mb-4 flex items-center gap-1"><Clock className="w-3 h-3" /> Today, 2:00 PM</p><Button className="w-full bg-violet-600 hover:bg-violet-700 text-white rounded-xl">Join Now</Button></CardContent>
        </Card>

        <Card className="rounded-3xl border-slate-200 shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2"><Bell className="w-5 h-5 text-violet-600" /> Announcements</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {announcements.map((a) => <div key={a.title} className="flex items-start gap-3 p-3 rounded-xl hover:bg-violet-50 transition-colors cursor-pointer"><div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${a.type === "announcement" ? "bg-violet-50 text-violet-600" : "bg-green-50 text-green-600"}`}>{a.type === "announcement" ? <Bell className="w-4 h-4" /> : <Download className="w-4 h-4" />}</div><div><p className="text-sm font-medium text-slate-900">{a.title}</p><p className="text-xs text-slate-500">{a.time}</p></div>{a.type === "announcement" && <div className="w-2 h-2 rounded-full bg-violet-600 ml-auto mt-1" />}</div>)}
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-slate-200 shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2"><Award className="w-5 h-5 text-violet-600" /> Certificates</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-200"><div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center"><Award className="w-5 h-5 text-amber-500" /></div><div className="flex-1"><p className="text-sm font-medium text-slate-900">Forex Fundamentals</p><p className="text-xs text-slate-500">Issued Oct 12, 2023</p></div><Button size="sm" variant="ghost" className="text-violet-600 hover:bg-violet-50"><Download className="w-4 h-4" /></Button></div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-3 gap-3">
          {[{ label: "Enrolled", value: "7" }, { label: "Hours", value: "48" }, { label: "Certs", value: "1" }].map((s) => <Card key={s.label} className="rounded-2xl border-slate-200 shadow-sm text-center p-4 hover:shadow-md transition-shadow cursor-pointer"><p className="text-2xl font-bold text-slate-900">{s.value}</p><p className="text-xs text-slate-500">{s.label}</p></Card>)}
        </div>
      </div>
    </div>
  );
}