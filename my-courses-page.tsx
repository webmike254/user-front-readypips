import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Clock, BookOpen, Play, ChevronRight, Star, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const allCourses = [
  { title: "Forex Fundamentals", category: "In Progress", difficulty: "Beginner", progress: 75, lessons: 24, completed: 18, hours: 12, rating: 4.8, image: "https://images.unsplash.com/photo-1611974765270-ca1258634369?w=400&h=250&fit=crop" },
  { title: "Advanced Price Action", category: "In Progress", difficulty: "Advanced", progress: 42, lessons: 36, completed: 15, hours: 24, rating: 4.9, image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop" },
  { title: "Risk Management Masterclass", category: "In Progress", difficulty: "Intermediate", progress: 30, lessons: 18, completed: 5, hours: 8, rating: 4.7, image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop" },
  { title: "Trading Psychology", category: "Completed", difficulty: "Intermediate", progress: 100, lessons: 14, completed: 14, hours: 6, rating: 4.9, image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=250&fit=crop" },
  { title: "M-Pesa & Prop Firm Funding", category: "Not Started", difficulty: "Beginner", progress: 0, lessons: 10, completed: 0, hours: 4, rating: 4.6, image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop" },
];

const recommendations = [
  { title: "ICT Inner Circle", level: "Advanced", students: "1.2k" },
  { title: "Smart Money Concepts", level: "Intermediate", students: "3.4k" },
];

export function MyCoursesPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const filtered = allCourses.filter((c) => (filter === "All" || c.category === filter) && c.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      <div className="flex-1 min-w-0 space-y-8">
        <div><h1 className="text-4xl font-bold text-slate-900">My Courses</h1><p className="text-slate-500 mt-2">Continue learning and track your progress.</p></div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><Input placeholder="Search your courses..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 rounded-xl border-slate-200 h-12" /></div>
          <Tabs value={filter} onValueChange={setFilter} className="w-full md:w-auto">
            <TabsList className="bg-white border border-slate-200 rounded-xl p-1">
              <TabsTrigger value="All" className="rounded-lg data-[state=active]:bg-violet-50 data-[state=active]:text-violet-700">All</TabsTrigger>
              <TabsTrigger value="In Progress" className="rounded-lg data-[state=active]:bg-violet-50 data-[state=active]:text-violet-700">In Progress</TabsTrigger>
              <TabsTrigger value="Completed" className="rounded-lg data-[state=active]:bg-violet-50 data-[state=active]:text-violet-700">Completed</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((c, i) => (
            <motion.div key={c.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ y: -4 }} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all cursor-pointer">
              <div className="relative h-44"><img src={c.image} alt={c.title} className="w-full h-full object-cover" /><Badge className="absolute top-3 left-3 bg-white/90 text-slate-900 hover:bg-white/90">{c.difficulty}</Badge></div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2"><h3 className="font-semibold text-slate-900 text-lg">{c.title}</h3><div className="flex items-center gap-1 text-amber-500 text-sm font-medium"><Star className="w-4 h-4 fill-current" /> {c.rating}</div></div>
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-4"><span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> {c.completed}/{c.lessons} lessons</span><span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {c.hours}h</span></div>
                <div className="mb-4"><div className="flex justify-between text-sm mb-1"><span className="text-slate-500">Progress</span><span className="font-semibold text-slate-900">{c.progress}%</span></div><Progress value={c.progress} className="h-2" /></div>
                <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white rounded-xl">{c.progress === 0 ? "Start Course" : c.progress === 100 ? "Review Course" : "Continue"} <ChevronRight className="w-4 h-4 ml-1" /></Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="w-full xl:w-96 space-y-8">
        <Card className="rounded-3xl border-slate-200 shadow-sm">
          <CardHeader><CardTitle className="text-lg font-bold text-slate-900">Learning Stats</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {[{ label: "Courses Enrolled", value: "7" }, { label: "Lessons Completed", value: "42" }, { label: "Hours Learned", value: "48" }, { label: "Certificates Earned", value: "1" }].map((s) => <div key={s.label} className="flex items-center justify-between p-3 rounded-xl bg-slate-50"><span className="text-sm text-slate-500">{s.label}</span><span className="text-lg font-bold text-slate-900">{s.value}</span></div>)}
          </CardContent>
        </Card>
        <Card className="rounded-3xl border-slate-200 shadow-sm">
          <CardHeader><CardTitle className="text-lg font-bold text-slate-900">Recommended</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {recommendations.map((r) => <div key={r.title} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-violet-50 transition-colors cursor-pointer"><div className="w-10 h-10 rounded-lg bg-violet-50 flex items-center justify-center"><Play className="w-5 h-5 text-violet-600" /></div><div className="flex-1"><p className="text-sm font-medium text-slate-900">{r.title}</p><p className="text-xs text-slate-500">{r.level} • {r.students} students</p></div><ChevronRight className="w-4 h-4 text-slate-400" /></div>)}
          </CardContent>
        </Card>
        <Card className="rounded-3xl border-slate-200 shadow-sm bg-gradient-to-br from-violet-600 to-violet-500 text-white">
          <CardContent className="p-6"><Award className="w-10 h-10 mb-3 opacity-90" /><h3 className="font-semibold text-lg mb-1">Complete your next course</h3><p className="text-sm text-white/80 mb-4">Finish Advanced Price Action to unlock your next certificate.</p><Button className="w-full bg-white text-violet-700 hover:bg-white/90 rounded-xl font-semibold">Continue Learning</Button></CardContent>
        </Card>
      </div>
    </div>
  );
}