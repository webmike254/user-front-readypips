import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar as CalendarIcon,
  Megaphone,
  Clock,
  Download,
  BookOpen,
  Award,
  Play,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const events = [
  { title: "Live Scalping Session", time: "02:00 PM", color: "bg-[#5B2ED4]" },
  { title: "Market Analysis Q&A", time: "04:30 PM", color: "bg-emerald-500" },
  { title: "Psychology Workshop", time: "Tomorrow, 10:00 AM", color: "bg-amber-500" },
];

const announcements = [
  { title: "New Advanced Course Released", time: "2 hours ago", type: "announcement", unread: true },
  { title: "Platform Maintenance Tonight", time: "5 hours ago", type: "update", unread: false },
  { title: "Trading Competition Results", time: "1 day ago", type: "announcement", unread: true },
];

const certificates = [
  { title: "Forex Fundamentals", date: "Issued 12 Oct 2023" },
  { title: "Technical Analysis 101", date: "Issued 28 Sep 2023" },
];

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setDisplay(Math.floor(progress * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value]);
  return <span>{display}</span>;
}

export function RightSidebar() {
  return (
    <aside className="hidden xl:flex w-[360px] 2xl:w-[380px] h-full overflow-y-auto pr-0 flex-col space-y-6 no-scrollbar shrink-0 py-6">
      <CalendarWidget />
      <ProgressWidget />
      <UpcomingClass />
      <Announcements />
      <Certificates />
      <QuickStats />
      <div className="h-8" />
    </aside>
  );
}

function CalendarWidget() {
  const today = 22;
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const eventDays = [5, 12, 18, 22, 25];

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
      <Card className="rounded-[28px] border-[#ECECEC] shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-bold text-[#111827] flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-[#5B2ED4]" /> October 2023
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5 pt-0">
          <div className="grid grid-cols-7 gap-1 text-center text-xs text-[#6B7280] mb-2">
            {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
              <div key={d} className="py-1 font-bold">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {days.map((day) => (
              <motion.div
                key={day}
                whileHover={{ scale: 1.1 }}
                className={cn(
                  "aspect-square rounded-xl flex items-center justify-center text-xs font-bold cursor-pointer relative transition-colors",
                  day === today
                    ? "bg-[#5B2ED4] text-white"
                    : "hover:bg-[#F0EEFC] text-[#111827]"
                )}
              >
                {day}
                {eventDays.includes(day) && day !== today && (
                  <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-[#5B2ED4]" />
                )}
              </motion.div>
            ))}
          </div>
          <div className="mt-4 space-y-3">
            {events.map((event) => (
              <motion.div
                key={event.title}
                whileHover={{ backgroundColor: "rgba(243,240,255,1)" }}
                className="flex items-center gap-3 p-2.5 rounded-xl transition-colors cursor-pointer"
              >
                <span className={cn("w-2 h-2 rounded-full", event.color)} />
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#111827]">{event.title}</p>
                  <p className="text-xs text-[#6B7280] flex items-center gap-1"><Clock className="w-3 h-3" /> {event.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ProgressWidget() {
  const progress = 78;
  const data = [
    { label: "Completed", value: 42, color: "bg-[#5B2ED4]" },
    { label: "In Progress", value: 28, color: "bg-emerald-500" },
    { label: "Remaining", value: 30, color: "bg-[#ECECEC]" },
  ];

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
      <Card className="rounded-[28px] border-[#ECECEC] shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-bold text-[#111827]">Course Progress</CardTitle>
        </CardHeader>
        <CardContent className="p-5 pt-0 flex flex-col items-center">
          <div className="relative w-40 h-40">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#F0EEFC" strokeWidth="10" />
              <motion.circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="10"
                strokeLinecap="round"
                initial={{ strokeDasharray: "0 264" }}
                whileInView={{ strokeDasharray: `${(progress / 100) * 264} 264` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="progressGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#5B2ED4" />
                  <stop offset="100%" stopColor="#22C55E" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-[#111827]">{progress}%</span>
              <span className="text-xs text-[#6B7280]">Completed</span>
            </div>
          </div>
          <div className="w-full mt-5 space-y-2.5">
            {data.map((item) => (
              <div key={item.label} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className={cn("w-3 h-3 rounded-full", item.color)} />
                  <span className="text-[#6B7280]">{item.label}</span>
                </div>
                <span className="font-bold text-[#111827]">{item.value}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function UpcomingClass() {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
      <Card className="rounded-[28px] border-[#ECECEC] shadow-sm overflow-hidden group">
        <div className="relative h-40 overflow-hidden">
          <img
            src="/funding_pips_picture_4.jpg"
            alt="Live class"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#EF4444] text-white text-[10px] font-bold rounded-full flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> LIVE
          </div>
        </div>
        <CardContent className="p-5">
          <h4 className="font-bold text-[#111827] mb-1">Advanced Scalping Live</h4>
          <p className="text-xs text-[#6B7280] mb-4">Today, 2:00 PM • 90 min</p>
          <Button className="w-full rounded-2xl bg-[#5B2ED4] hover:bg-[#4a24b0] text-white font-bold">
            <Play className="w-4 h-4 mr-2" /> Join Now
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function Announcements() {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
      <Card className="rounded-[28px] border-[#ECECEC] shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-bold text-[#111827] flex items-center gap-2">
            <Megaphone className="w-4 h-4 text-[#5B2ED4]" /> Announcements
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5 pt-0">
          <Tabs defaultValue="all">
            <TabsList className="w-full bg-[#F8F9FC] rounded-xl mb-3 p-1">
              <TabsTrigger value="all" className="flex-1 rounded-lg text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#5B2ED4]">All</TabsTrigger>
              <TabsTrigger value="announcements" className="flex-1 rounded-lg text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#5B2ED4]">News</TabsTrigger>
              <TabsTrigger value="updates" className="flex-1 rounded-lg text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#5B2ED4]">Updates</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-0 space-y-3">
              {announcements.map((a) => (
                <motion.div
                  key={a.title}
                  whileHover={{ backgroundColor: "rgba(243,240,255,1)" }}
                  className="flex items-start gap-3 p-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#F0EEFC] flex items-center justify-center flex-shrink-0">
                    <Megaphone className="w-4 h-4 text-[#5B2ED4]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#111827] truncate">{a.title}</p>
                    <p className="text-xs text-[#6B7280]">{a.time}</p>
                  </div>
                  {a.unread && <span className="w-2 h-2 rounded-full bg-[#5B2ED4] mt-2" />}
                </motion.div>
              ))}
            </TabsContent>
            <TabsContent value="announcements" className="mt-0">
              {announcements.filter((a) => a.type === "announcement").map((a) => (
                <div key={a.title} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F0EEFC] transition-colors cursor-pointer">
                  <div className="w-9 h-9 rounded-xl bg-[#F0EEFC] flex items-center justify-center flex-shrink-0">
                    <Megaphone className="w-4 h-4 text-[#5B2ED4]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#111827] truncate">{a.title}</p>
                    <p className="text-xs text-[#6B7280]">{a.time}</p>
                  </div>
                  {a.unread && <span className="w-2 h-2 rounded-full bg-[#5B2ED4] mt-2" />}
                </div>
              ))}
            </TabsContent>
            <TabsContent value="updates" className="mt-0">
              {announcements.filter((a) => a.type === "update").map((a) => (
                <div key={a.title} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F0EEFC] transition-colors cursor-pointer">
                  <div className="w-9 h-9 rounded-xl bg-[#F0EEFC] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-[#5B2ED4]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#111827] truncate">{a.title}</p>
                    <p className="text-xs text-[#6B7280]">{a.time}</p>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function Certificates() {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
      <Card className="rounded-[28px] border-[#ECECEC] shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-bold text-[#111827] flex items-center gap-2">
            <Award className="w-4 h-4 text-[#5B2ED4]" /> Certificates
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5 pt-0 space-y-3">
          {certificates.map((cert) => (
            <div key={cert.title} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F8F9FC] transition-colors group cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#5B2ED4] to-[#7B61FF] flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[#111827] truncate">{cert.title}</p>
                <p className="text-xs text-[#6B7280]">{cert.date}</p>
              </div>
              <motion.button whileHover={{ scale: 1.15 }} className="p-2 rounded-lg hover:bg-[#F0EEFC] text-[#6B7280] hover:text-[#5B2ED4] transition-colors">
                <Download className="w-4 h-4" />
              </motion.button>
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}

function QuickStats() {
  const stats = [
    { icon: BookOpen, label: "Courses Enrolled", value: 8 },
    { icon: Clock, label: "Hours Learned", value: 142 },
    { icon: Award, label: "Certificates", value: 4 },
  ];

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }} className="grid grid-cols-3 gap-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            whileHover={{ y: -3, boxShadow: "0 12px 24px rgba(0,0,0,0.06)" }}
            className="bg-white rounded-2xl border border-[#ECECEC] p-4 shadow-sm text-center"
          >
            <div className="w-9 h-9 rounded-xl bg-[#F0EEFC] flex items-center justify-center mx-auto mb-2">
              <Icon className="w-4 h-4 text-[#5B2ED4]" />
            </div>
            <div className="text-2xl font-bold text-[#111827]">
              <AnimatedNumber value={stat.value} />
            </div>
            <p className="text-[10px] text-[#6B7280] mt-0.5">{stat.label}</p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}