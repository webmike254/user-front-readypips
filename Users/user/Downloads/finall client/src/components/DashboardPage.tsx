import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Video,
  BarChart3,
  Users,
  Headphones,
  Play,
  Flame,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const quickActions = [
  { title: "My Courses", icon: BookOpen, color: "#5B3DF5" },
  { title: "Live Classes", icon: Video, color: "#22C55E" },
  { title: "TradingView", icon: BarChart3, color: "#F59E0B" },
  { title: "Community", icon: Users, color: "#EC4899" },
  { title: "Support", icon: Headphones, color: "#EF4444" },
];

const courses = [
  { title: "Forex Fundamentals", difficulty: "Beginner", progress: 75, thumbnail: "/funding_pips_picture_2.jpg" },
  { title: "Smart Money Concepts", difficulty: "Advanced", progress: 42, thumbnail: "/funding_pips_picture_2.jpg" },
  { title: "Risk Management Pro", difficulty: "Intermediate", progress: 90, thumbnail: "/funding_pips_picture_2.jpg" },
];

const streakDays = [
  { day: "M", completed: true, date: "16 Oct" },
  { day: "T", completed: true, date: "17 Oct" },
  { day: "W", completed: true, date: "18 Oct" },
  { day: "T", completed: true, date: "19 Oct" },
  { day: "F", completed: true, date: "20 Oct" },
  { day: "S", completed: false, date: "21 Oct" },
  { day: "S", completed: false, date: "22 Oct" },
];

function Countdown({ target }: { target: Date }) {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, target.getTime() - now.getTime());
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return (
    <div className="text-5xl font-bold text-white tracking-wider font-mono">
      {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
    </div>
  );
}

export function DashboardPage() {
  const nextLive = new Date();
  nextLive.setHours(nextLive.getHours() + 7);
  nextLive.setMinutes(nextLive.getMinutes() + 38);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8 pb-8">
      {/* Hero Banner */}
      <motion.div
        variants={item}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#5B3DF5] via-[#6B4CF6] to-[#7C5CFF] p-8 lg:p-10 shadow-xl shadow-violet-200"
      >
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
            <img
              src="/funding_pips_picture_3.png"
              alt="Trading desk"
              className="w-full h-full object-cover"
            />
        </div>
        <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-center">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl font-bold text-white">Welcome back, Ahmed!</h1>
            <Countdown target={nextLive} />
            <p className="text-white/70 text-sm">Time left before next live class</p>
            <Button className="bg-white text-[#5B3DF5] hover:bg-white/90 rounded-xl px-6 h-11 font-semibold">
              <Video className="w-4 h-4 mr-2" /> Join Live Class
            </Button>
          </div>
          <div className="hidden lg:block w-[420px] h-[280px] rounded-2xl overflow-hidden shadow-2xl border border-white/20">
            <img
              src="/funding_pips_picture_3.png"
              alt="Programmer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "65%" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full bg-white/80"
          />
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <motion.div
              key={action.title}
              whileHover={{ y: -4, boxShadow: "0 12px 30px -8px rgba(0,0,0,0.1)" }}
              className="bg-white rounded-2xl border border-[#ECECEC] p-5 shadow-sm cursor-pointer transition-all"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${action.color}15` }}
              >
                <Icon className="w-6 h-6" style={{ color: action.color }} />
              </div>
              <h3 className="font-semibold text-[#111827]">{action.title}</h3>
            </motion.div>
          );
        })}
      </motion.div>

      {/* My Courses */}
      <motion.div variants={item}>
        <Card className="rounded-3xl border-[#ECECEC] shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-semibold text-[#111827]">My Courses</CardTitle>
            <Button variant="link" className="text-[#5B3DF5] font-medium">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {courses.map((course) => (
              <motion.div
                key={course.title}
                whileHover={{ backgroundColor: "#FAFAFA" }}
                className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl border border-[#ECECEC] transition-colors"
              >
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full sm:w-40 h-24 object-cover rounded-xl"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h3 className="font-semibold text-[#111827]">{course.title}</h3>
                      <Badge
                        variant="secondary"
                        className="mt-1 bg-[#F3F0FF] text-[#5B3DF5] hover:bg-[#F3F0FF]"
                      >
                        {course.difficulty}
                      </Badge>
                    </div>
                    <span className="text-sm font-semibold text-[#5B3DF5]">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2 mb-3" />
                  <Button size="sm" className="bg-[#5B3DF5] hover:bg-[#4c32d4] text-white rounded-lg h-9">
                    <Play className="w-3.5 h-3.5 mr-1.5" /> Continue
                  </Button>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Learning Streak */}
      <motion.div variants={item}>
        <Card className="rounded-3xl border-[#ECECEC] shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
                <Flame className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-3xl font-bold text-[#111827]">12 Day Streak</p>
                <p className="text-sm text-[#6B7280]">Keep it up! You're building great trading habits.</p>
              </div>
            </div>
            <div className="flex justify-between">
              {streakDays.map((d, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <span className="text-xs text-[#6B7280]">{d.day}</span>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                      d.completed
                        ? "bg-green-500 text-white"
                        : "bg-white border-2 border-[#ECECEC] text-[#6B7280]"
                    }`}
                    title={d.date}
                  >
                    {d.completed ? "✓" : i + 1}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}