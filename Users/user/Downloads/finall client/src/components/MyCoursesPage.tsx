import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Clock, BookOpen, Play, ChevronRight, Star, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLoading } from "@/hooks/useLoading";
import { PageSkeleton, CardSkeleton } from "@/components/Skeletons";
import { cn } from "@/lib/utils";

const allCourses = [
  { title: "Forex Fundamentals", category: "In Progress", difficulty: "Beginner", progress: 75, lessons: 24, completed: 18, hours: 12, rating: 4.8, image: "https://images.unsplash.com/photo-1611974765270-ca1258634369?w=400&h=250&fit=crop" },
  { title: "Advanced Price Action", category: "In Progress", difficulty: "Advanced", progress: 42, lessons: 36, completed: 15, hours: 24, rating: 4.9, image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop" },
  { title: "Risk Management Masterclass", category: "In Progress", difficulty: "Intermediate", progress: 30, lessons: 18, completed: 5, hours: 8, rating: 4.7, image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop" },
  { title: "Trading Psychology", category: "Completed", difficulty: "Intermediate", progress: 100, lessons: 14, completed: 14, hours: 6, rating: 4.9, image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=250&fit=crop" },
  { title: "M-Pesa & Prop Firm Funding", category: "Not Started", difficulty: "Beginner", progress: 0, lessons: 10, completed: 0, hours: 4, rating: 4.6, image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop" },
];

export function MyCoursesPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const isLoading = useLoading();
  const filtered = allCourses.filter((c) => (filter === "All" || c.category === filter) && c.title.toLowerCase().includes(search.toLowerCase()));

  if (isLoading) return <PageSkeleton stats={4} cards={2} list={3} />;

  return (
    <div className="flex flex-col xl:flex-row gap-10">
      <div className="flex-1 min-w-0 space-y-8">
        <div>
          <h1 className="text-[40px] font-bold text-text-primary">My Courses</h1>
          <p className="text-text-secondary text-[15px] mt-1">Continue learning and track your progress.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" /><Input placeholder="Search your courses..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 rounded-button border-border h-9 text-[13px]" /></div>
          <Tabs value={filter} onValueChange={setFilter} className="w-full md:w-auto">
            <TabsList className="bg-bg rounded-button p-1">
              <TabsTrigger value="All" className="rounded-button text-[13px] data-[state=active]:bg-white data-[state=active]:shadow-card data-[state=active]:text-text-primary">All</TabsTrigger>
              <TabsTrigger value="In Progress" className="rounded-button text-[13px] data-[state=active]:bg-white data-[state=active]:shadow-card data-[state=active]:text-text-primary">In Progress</TabsTrigger>
              <TabsTrigger value="Completed" className="rounded-button text-[13px] data-[state=active]:bg-white data-[state=active]:shadow-card data-[state=active]:text-text-primary">Completed</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        {filtered.length === 0 ? (
          <Card className="rounded-[18px] border-border shadow-card p-12 text-center">
            <BookOpen className="w-8 h-8 text-text-muted mx-auto mb-3" />
            <h3 className="text-[15px] font-medium text-text-primary mb-1">No courses found</h3>
            <p className="text-[13px] text-text-muted">Try adjusting your search or filter.</p>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {filtered.map((course) => (
              <Card key={course.title} className="rounded-[18px] border-border shadow-card overflow-hidden hover:shadow-card-hover transition-shadow duration-150 cursor-pointer">
                <div className="h-36"><img src={course.image} alt={course.title} className="w-full h-full object-cover" /></div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="font-medium text-[15px] text-text-primary">{course.title}</h3>
                    <div className="flex items-center gap-1 text-warning text-[13px] font-medium"><Star className="w-3.5 h-3.5 fill-current" /> {course.rating}</div>
                  </div>
                  <div className="flex items-center gap-3 text-[13px] text-text-muted mb-3">
                    <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {course.completed}/{course.lessons}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {course.hours}h</span>
                    <Badge className="bg-primary/8 text-primary hover:bg-primary/8 rounded text-[10px] border-0">{course.difficulty}</Badge>
                  </div>
                  <div className="mb-3"><div className="flex justify-between text-[13px] mb-1"><span className="text-text-muted">Progress</span><span className="font-medium text-text-primary">{course.progress}%</span></div><Progress value={course.progress} className="h-1.5" /></div>
                  <Button className="w-full bg-primary hover:bg-primary-hover text-white rounded-button h-8 text-[13px] font-medium transition-all duration-150 hover:-translate-y-px">{course.progress === 0 ? "Start Course" : course.progress === 100 ? "Review" : "Continue"} <ChevronRight className="w-3.5 h-3.5 ml-1" /></Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      <div className="w-full xl:w-80 space-y-6">
        <Card className="rounded-[18px] border-border shadow-card">
          <CardHeader><CardTitle className="text-base font-semibold text-text-primary">Learning Stats</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {[{ label: "Courses Enrolled", value: "7" }, { label: "Lessons Completed", value: "42" }, { label: "Hours Learned", value: "48" }, { label: "Certificates", value: "1" }].map((s) => (
              <div key={s.label} className="flex items-center justify-between p-2.5 rounded-button bg-bg"><span className="text-[13px] text-text-muted">{s.label}</span><span className="text-[15px] font-semibold text-text-primary">{s.value}</span></div>
            ))}
          </CardContent>
        </Card>
        <Card className="rounded-[18px] border-border shadow-card">
          <CardHeader><CardTitle className="text-base font-semibold text-text-primary">Recommended</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {[{ title: "ICT Inner Circle", level: "Advanced" }, { title: "Smart Money Concepts", level: "Intermediate" }].map((rec) => (
              <div key={rec.title} className="flex items-center gap-2.5 p-2.5 rounded-button border border-border hover:border-primary/20 transition-colors duration-150 cursor-pointer"><div className="w-8 h-8 rounded bg-primary/8 flex items-center justify-center"><Play className="w-4 h-4 text-primary" /></div><div className="flex-1"><p className="text-[13px] font-medium text-text-primary">{rec.title}</p><p className="text-[11px] text-text-muted">{rec.level}</p></div><ChevronRight className="w-3.5 h-3.5 text-text-muted" /></div>
            ))}
          </CardContent>
        </Card>
        <Card className="rounded-[18px] border-border shadow-card">
          <CardContent className="p-5">
            <Award className="w-6 h-6 text-primary mb-2" />
            <h3 className="font-medium text-[15px] text-text-primary mb-0.5">Complete your next course</h3>
            <p className="text-[13px] text-text-muted mb-3">Finish Advanced Price Action to unlock your next certificate.</p>
            <Button className="w-full bg-primary hover:bg-primary-hover text-white rounded-button h-9 text-[13px] font-medium transition-all duration-150 hover:-translate-y-px">Continue Learning</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
