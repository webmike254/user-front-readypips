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
  return <div className="flex items-center gap-1.5 font-mono text-2xl font-semibold text-text-primary tracking-wide"><span>{t.h}</span><span className="text-text-muted">:</span><span>{t.m}</span><span className="text-text-muted">:</span><span>{t.s}</span></div>;
}

function Circle({ value, size = 120, stroke = 8 }: { value: number; size?: number; stroke?: number }) {
  const r = (size - stroke) / 2, c = 2 * Math.PI * r, dash = (value / 100) * c;
  return <svg width={size} height={size} className="-rotate-90"><circle cx={size / 2} cy={size / 2} r={r} stroke="#E9E9EC" strokeWidth={stroke} fill="none" /><circle cx={size / 2} cy={size / 2} r={r} stroke="#5B3DF5" strokeWidth={stroke} fill="none" strokeDasharray={`${dash} ${c - dash}`} strokeLinecap="round" /></svg>;
}

const actions = [
  { icon: BookOpen, label: "My Courses" },
  { icon: Video, label: "Live Classes" },
  { icon: BarChart3, label: "TradingView" },
  { icon: Users, label: "Community" },
  { icon: Headphones, label: "Support" },
];

const courses = [
  { title: "Forex Fundamentals", difficulty: "Beginner", progress: 75, image: "https://images.unsplash.com/photo-1611974765270-ca1258634369?w=120&h=80&fit=crop" },
  { title: "Advanced Price Action", difficulty: "Advanced", progress: 42, image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=120&h=80&fit=crop" },
  { title: "Risk Management Masterclass", difficulty: "Intermediate", progress: 30, image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=120&h=80&fit=crop" },
];

const announcements = [
  { title: "New Live Session This Week", time: "2 hours ago" },
  { title: "Platform Maintenance", time: "1 day ago" },
  { title: "October Challenge Results", time: "3 days ago" },
];

export function Dashboard() {
  const streak = [true, true, true, true, true, false, false];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="flex flex-col xl:flex-row gap-10">
      <div className="flex-1 min-w-0 space-y-10">
        <Card className="rounded-[18px] border-border shadow-card overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-8 rounded-full bg-primary" />
                  <h1 className="text-[40px] font-bold text-text-primary leading-tight">Welcome back, Ahmed</h1>
                </div>
                <p className="text-text-secondary text-[15px]">Keep learning, keep growing, and become a consistent trader.</p>
                <div className="pt-2">
                  <p className="text-[13px] text-text-muted mb-1.5">Time left before next live class</p>
                  <Countdown />
                </div>
                <Button className="bg-primary hover:bg-primary-hover text-white rounded-button h-9 px-5 text-[13px] font-medium transition-all duration-150 hover:-translate-y-px">Join Live Class</Button>
              </div>
              <div className="hidden lg:block w-[280px] h-[180px] rounded-[18px] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=500&h=400&fit=crop" alt="Trading" className="w-full h-full object-cover" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {actions.map((a, i) => { const Icon = a.icon; return <motion.div key={a.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04, duration: 0.15 }} className="bg-white rounded-[18px] border border-border shadow-card p-5 cursor-pointer hover:border-primary/30 hover:shadow-card-hover transition-all duration-150"><div className="w-9 h-9 rounded-button bg-primary/8 flex items-center justify-center mb-3"><Icon className="w-4 h-4 text-primary" /></div><p className="font-medium text-text-primary text-[13px]">{a.label}</p></motion.div>; })}
        </div>

        <Card className="rounded-[18px] border-border shadow-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-lg font-semibold text-text-primary">My Courses</CardTitle><Button variant="ghost" className="text-primary hover:text-primary-hover hover:bg-primary/5 rounded-button text-[13px]">View All <ChevronRight className="w-3.5 h-3.5 ml-0.5" /></Button></CardHeader>
          <CardContent className="space-y-3">
            {courses.map((c) => (
              <div key={c.title} className="flex items-center gap-4 p-3 rounded-button border border-border hover:border-primary/30 transition-colors duration-150 cursor-pointer">
                <img src={c.image} alt={c.title} className="w-24 h-16 object-cover rounded-button" />
                <div className="flex-1 min-w-0"><h4 className="font-medium text-text-primary text-[15px] truncate">{c.title}</h4><Badge variant="secondary" className="mt-1 text-[10px] bg-primary/8 text-primary hover:bg-primary/8 rounded border-0">{c.difficulty}</Badge></div>
                <div className="w-32"><div className="flex justify-between text-[13px] mb-1"><span className="text-text-muted">Progress</span><span className="font-medium text-text-primary">{c.progress}%</span></div><Progress value={c.progress} className="h-1.5" /></div>
                <Button className="bg-primary hover:bg-primary-hover text-white rounded-button h-8 px-4 text-[13px] font-medium transition-all duration-150 hover:-translate-y-px">Continue</Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-[18px] border-border shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-9 h-9 rounded-button bg-warning/10 flex items-center justify-center"><Flame className="w-4 h-4 text-warning" /></div>
              <div><p className="text-xl font-semibold text-text-primary">5 <span className="text-text-secondary text-sm font-normal">days</span></p><p className="text-[13px] text-text-muted">You're on fire. Keep the momentum going.</p></div>
            </div>
            <div className="flex items-center justify-between">
              {days.map((day, i) => <div key={day} className="flex flex-col items-center gap-1.5"><div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-medium transition-colors duration-150 ${streak[i] ? "bg-success text-white" : "bg-bg text-text-muted border border-border"}`}>{streak[i] ? "✓" : i + 1}</div><span className="text-[10px] text-text-muted">{day}</span></div>)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="w-full xl:w-80 space-y-6">
        <Card className="rounded-[18px] border-border shadow-card">
          <CardHeader><CardTitle className="text-base font-semibold text-text-primary flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" /> October 2023</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1.5 text-center text-[13px] mb-3">
              {["S", "M", "T", "W", "T", "F", "S"].map((d) => <span key={d} className="text-text-muted font-medium">{d}</span>)}
              {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => <div key={d} className={`aspect-square rounded flex items-center justify-center text-[13px] ${d === 22 ? "bg-primary text-white font-semibold" : [5, 12, 19, 26].includes(d) ? "text-text-primary font-medium relative after:content-[''] after:absolute after:bottom-0.5 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full after:bg-primary" : "text-text-secondary hover:bg-primary/5"}`}>{d}</div>)}
            </div>
            <div className="space-y-2 pt-3 border-t border-border">
              {[{ title: "Live Trading Session", time: "2:00 PM" }, { title: "Q&A with Mentors", time: "5:00 PM" }].map((e) => <div key={e.title} className="flex items-center gap-2.5 p-2 rounded-button hover:bg-primary/5 transition-colors duration-150 cursor-pointer"><div className="w-1.5 h-1.5 rounded-full bg-primary" /><div className="flex-1"><p className="text-[13px] font-medium text-text-primary">{e.title}</p><p className="text-[11px] text-text-muted">{e.time}</p></div></div>)}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[18px] border-border shadow-card">
          <CardHeader><CardTitle className="text-base font-semibold text-text-primary">Course Progress</CardTitle></CardHeader>
          <CardContent className="flex flex-col items-center">
            <Circle value={58} size={120} stroke={8} />
            <p className="text-xl font-semibold text-text-primary mt-3">58%</p>
            <p className="text-[13px] text-text-muted mb-3">Overall completion</p>
            <div className="w-full space-y-2">
              <div className="flex items-center justify-between text-[13px]"><span className="flex items-center gap-2 text-text-secondary"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Completed</span><span className="font-medium text-text-primary">3</span></div>
              <div className="flex items-center justify-between text-[13px]"><span className="flex items-center gap-2 text-text-secondary"><span className="w-1.5 h-1.5 rounded-full bg-success" /> In Progress</span><span className="font-medium text-text-primary">4</span></div>
              <div className="flex items-center justify-between text-[13px]"><span className="flex items-center gap-2 text-text-secondary"><span className="w-1.5 h-1.5 rounded-full bg-border" /> Remaining</span><span className="font-medium text-text-primary">5</span></div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[18px] border-border shadow-card overflow-hidden">
          <div className="h-32"><img src="https://images.unsplash.com/photo-1611974765270-ca1258634369?w=400&h=250&fit=crop" alt="Live class" className="w-full h-full object-cover" /><Badge className="absolute top-3 left-3 bg-danger text-white hover:bg-danger rounded text-[10px]">LIVE</Badge></div>
          <CardContent className="p-4"><h4 className="font-medium text-text-primary text-[15px] mb-0.5">Live Market Analysis</h4><p className="text-[13px] text-text-muted flex items-center gap-1"><Clock className="w-3 h-3" /> Today, 2:00 PM</p><Button className="w-full bg-primary hover:bg-primary-hover text-white rounded-button h-9 mt-3 text-[13px] font-medium transition-all duration-150 hover:-translate-y-px">Join Now</Button></CardContent>
        </Card>

        <Card className="rounded-[18px] border-border shadow-card">
          <CardHeader className="pb-1"><CardTitle className="text-base font-semibold text-text-primary flex items-center gap-2"><Bell className="w-4 h-4 text-primary" /> Announcements</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {announcements.map((a) => <div key={a.title} className="flex items-start gap-2.5 p-2 rounded-button hover:bg-primary/5 transition-colors duration-150 cursor-pointer"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" /><div><p className="text-[13px] font-medium text-text-primary">{a.title}</p><p className="text-[11px] text-text-muted">{a.time}</p></div></div>)}
          </CardContent>
        </Card>

        <div className="grid grid-cols-3 gap-3">
          {[{ label: "Enrolled", value: "7" }, { label: "Hours", value: "48" }, { label: "Certs", value: "1" }].map((s) => <Card key={s.label} className="rounded-button border-border shadow-card text-center p-3 hover:shadow-card-hover transition-shadow duration-150 cursor-pointer"><p className="text-lg font-semibold text-text-primary">{s.value}</p><p className="text-[11px] text-text-muted">{s.label}</p></Card>)}
        </div>
      </div>
    </div>
  );
}
