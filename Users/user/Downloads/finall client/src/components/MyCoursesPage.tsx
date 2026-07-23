import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Clock, BookOpen, Play, ChevronRight, Star, Award, TrendingUp, Filter,
  BarChart3, CheckCircle2, PlayCircle, Lock, Brain, Shield, Globe, Bitcoin,
  LineChart, FileText, Layers, Zap, Target, Users, ArrowRight, Clock3, Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useLoading } from "@/hooks/useLoading";
import { PageSkeleton } from "@/components/Skeletons";
import { usePageNavigation } from "@/components/PageContext";
import { cn } from "@/lib/utils";

const courseCategories = [
  { id: "all", label: "All Courses", icon: BookOpen },
  { id: "forex", label: "Forex", icon: TrendingUp },
  { id: "smc", label: "Smart Money", icon: Layers },
  { id: "psychology", label: "Psychology", icon: Brain },
  { id: "risk", label: "Risk Management", icon: Shield },
  { id: "crypto", label: "Crypto", icon: Bitcoin },
  { id: "technical", label: "Technical Analysis", icon: BarChart3 },
  { id: "fundamental", label: "Fundamental", icon: FileText },
];

const allCourses = [
  { id: 1, title: "Forex Fundamentals", category: "forex", track: "Beginner Track", difficulty: "Beginner", progress: 75, lessons: 24, completed: 18, hours: 12, rating: 4.8, students: 1240, image: "https://images.unsplash.com/photo-1611974765270-ca1258634369?w=400&h=250&fit=crop", modules: 6, instructor: "Omar Al-Farsi", status: "In Progress" },
  { id: 2, title: "Advanced Price Action", category: "forex", track: "Advanced Track", difficulty: "Advanced", progress: 42, lessons: 36, completed: 15, hours: 24, rating: 4.9, students: 890, image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop", modules: 8, instructor: "Sarah Johnson", status: "In Progress" },
  { id: 3, title: "Risk Management Masterclass", category: "risk", track: "Core Track", difficulty: "Intermediate", progress: 30, lessons: 18, completed: 5, hours: 8, rating: 4.7, students: 2100, image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop", modules: 5, instructor: "Khalid Hassan", status: "In Progress" },
  { id: 4, title: "Trading Psychology Mastery", category: "psychology", track: "Core Track", difficulty: "Intermediate", progress: 100, lessons: 14, completed: 14, hours: 6, rating: 4.9, students: 1850, image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=250&fit=crop", modules: 4, instructor: "Khalid Hassan", status: "Completed" },
  { id: 5, title: "ICT Inner Circle", category: "smc", track: "Advanced Track", difficulty: "Advanced", progress: 0, lessons: 42, completed: 0, hours: 36, rating: 4.9, students: 670, image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop", modules: 10, instructor: "Sarah Johnson", status: "Not Started" },
  { id: 6, title: "Smart Money Concepts", category: "smc", track: "Intermediate Track", difficulty: "Intermediate", progress: 0, lessons: 28, completed: 0, hours: 18, rating: 4.8, students: 1540, image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=250&fit=crop", modules: 7, instructor: "Omar Al-Farsi", status: "Not Started" },
  { id: 7, title: "Crypto Trading 101", category: "crypto", track: "Beginner Track", difficulty: "Beginner", progress: 0, lessons: 16, completed: 0, hours: 8, rating: 4.6, students: 980, image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=250&fit=crop", modules: 4, instructor: "Omar Al-Farsi", status: "Not Started" },
  { id: 8, title: "Technical Analysis Pro", category: "technical", track: "Intermediate Track", difficulty: "Intermediate", progress: 15, lessons: 32, completed: 5, hours: 20, rating: 4.7, students: 1120, image: "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?w=400&h=250&fit=crop", modules: 8, instructor: "Sarah Johnson", status: "In Progress" },
  { id: 9, title: "Fundamental Analysis", category: "fundamental", track: "Core Track", difficulty: "Beginner", progress: 0, lessons: 20, completed: 0, hours: 10, rating: 4.5, students: 760, image: "https://images.unsplash.com/photo-1554224155-6726b8ff5e48?w=400&h=250&fit=crop", modules: 5, instructor: "Khalid Hassan", status: "Not Started" },
];

const learningTracks = [
  { name: "Beginner Track", courses: 3, completed: 1, color: "bg-success", icon: PlayCircle },
  { name: "Core Track", courses: 4, completed: 1, color: "bg-primary", icon: Target },
  { name: "Intermediate Track", courses: 3, completed: 0, color: "bg-warning", icon: Zap },
  { name: "Advanced Track", courses: 2, completed: 0, color: "bg-danger", icon: Crown },
];

function Crown(props: any) { return <Star {...props} />; }

export function MyCoursesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [showCompleted, setShowCompleted] = useState(true);
  const [view, setView] = useState<"grid" | "list">("grid");
  const isLoading = useLoading();
  const { setCurrentPage } = usePageNavigation();

  const filtered = allCourses.filter((c) => {
    const matchCategory = activeCategory === "all" || c.category === activeCategory;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchCompleted = showCompleted || c.status !== "Completed";
    return matchCategory && matchSearch && matchCompleted;
  });

  if (isLoading) return <PageSkeleton stats={4} cards={2} list={3} />;

  const inProgress = allCourses.filter((c) => c.status === "In Progress");
  const completed = allCourses.filter((c) => c.status === "Completed");
  const notStarted = allCourses.filter((c) => c.status === "Not Started");

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">My Courses</h1>
          <p className="text-[14px] text-text-secondary mt-1">Continue learning and track your progress across all courses.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="rounded-[12px] h-9 px-4 text-[13px] border-border" onClick={() => setCurrentPage("certificates")}>
            <Award className="w-4 h-4 mr-1.5" /> Certificates
          </Button>
          <Button variant="outline" className="rounded-[12px] h-9 px-4 text-[13px] border-border" onClick={() => setCurrentPage("downloads")}>
            <FileText className="w-4 h-4 mr-1.5" /> Resources
          </Button>
          <Button className="rounded-[12px] h-9 px-4 text-[13px] bg-primary hover:bg-primary-hover" onClick={() => setCurrentPage("quiz")}>
            <PlayCircle className="w-4 h-4 mr-1.5" /> Take Quiz
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Enrolled", value: allCourses.length, icon: BookOpen, color: "text-primary" },
          { label: "In Progress", value: inProgress.length, icon: Play, color: "text-warning" },
          { label: "Completed", value: completed.length, icon: CheckCircle2, color: "text-success" },
          { label: "Hours Learned", value: 48, icon: Clock, color: "text-text-secondary" },
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

      {/* Learning Tracks */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {learningTracks.map((track, i) => {
          const Icon = track.icon;
          const pct = Math.round((track.completed / track.courses) * 100);
          return (
            <motion.div key={track.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <Card className="rounded-[16px] border-border shadow-card hover:shadow-card-hover transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={cn("w-7 h-7 rounded-[8px] flex items-center justify-center", track.color)}>
                      <Icon className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-[12px] font-semibold text-text-primary truncate">{track.name}</span>
                  </div>
                  <p className="text-[11px] text-text-muted mb-2">{track.completed}/{track.courses} courses done</p>
                  <Progress value={pct} className="h-1.5" />
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Continue Learning - In Progress spotlight */}
      {inProgress.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[15px] font-semibold text-text-primary flex items-center gap-2">
              <Play className="w-4 h-4 text-primary" /> Continue Learning
            </h2>
            <button className="text-[12px] text-primary hover:underline">View all</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {inProgress.slice(0, 3).map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -3 }}
              >
                <Card className="rounded-[16px] border-border shadow-card overflow-hidden cursor-pointer hover:border-primary/20 transition-all">
                  <div className="h-32 relative overflow-hidden">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-2 left-3 text-white">
                      <p className="text-[11px] opacity-90">{course.instructor}</p>
                      <p className="text-[14px] font-semibold">{course.title}</p>
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-primary text-white border-0 rounded-full px-2 py-1 text-[10px]">{course.progress}%</Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 text-[11px] text-text-muted mb-3">
                      <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {course.completed}/{course.lessons}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {course.hours}h</span>
                      <span className="flex items-center gap-1"><Star className="w-3 h-3 text-warning fill-warning" /> {course.rating}</span>
                    </div>
                    <Progress value={course.progress} className="h-1.5 mb-3" />
                    <Button className="w-full bg-primary hover:bg-primary-hover text-white rounded-[10px] h-8 text-[12px] font-medium">
                      <Play className="w-3.5 h-3.5 mr-1" /> Continue
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Category Filter + Search */}
      <div className="flex flex-col gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <Input placeholder="Search your courses..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 rounded-[12px] border-border h-10 text-[13px]" />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {courseCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 rounded-[10px] text-[12px] font-medium transition-all",
                  activeCategory === cat.id
                    ? "bg-primary text-white"
                    : "bg-white border border-border text-text-secondary hover:bg-bg"
                )}
              >
                <Icon className="w-3.5 h-3.5" /> {cat.label}
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-text-muted">Show completed</span>
            <Switch checked={showCompleted} onCheckedChange={setShowCompleted} showLabels />
          </div>
          <div className="flex items-center gap-1 ml-auto">
            <button
              onClick={() => setView("grid")}
              className={cn("px-3 py-1.5 rounded-[8px] text-[12px] font-medium transition-all", view === "grid" ? "bg-primary/10 text-primary" : "text-text-muted hover:bg-bg")}
            >Grid</button>
            <button
              onClick={() => setView("list")}
              className={cn("px-3 py-1.5 rounded-[8px] text-[12px] font-medium transition-all", view === "list" ? "bg-primary/10 text-primary" : "text-text-muted hover:bg-bg")}
            >List</button>
          </div>
        </div>
      </div>

      {/* Course Grid/List */}
      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Card className="rounded-[16px] border-border shadow-card p-12 text-center">
              <BookOpen className="w-8 h-8 text-text-muted mx-auto mb-3" />
              <h3 className="text-[15px] font-medium text-text-primary mb-1">No courses found</h3>
              <p className="text-[13px] text-text-muted">Try adjusting your search or filter.</p>
            </Card>
          </motion.div>
        ) : view === "grid" ? (
          <motion.div key="grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {filtered.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ y: -3 }}
              >
                <Card className="rounded-[16px] border-border shadow-card overflow-hidden cursor-pointer hover:border-primary/20 transition-all">
                  <div className="h-36 relative overflow-hidden">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
                    {course.progress === 100 && (
                      <div className="absolute top-2 right-2 bg-success/90 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> DONE
                      </div>
                    )}
                    {course.progress === 0 && (
                      <div className="absolute top-2 right-2 bg-text-muted/80 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                        <Lock className="w-3 h-3" /> NEW
                      </div>
                    )}
                    <div className="absolute bottom-2 left-2">
                      <Badge className="bg-black/50 text-white border-0 rounded-full px-2 py-0.5 text-[10px]">{course.track}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="font-semibold text-[14px] text-text-primary truncate">{course.title}</h3>
                      <div className="flex items-center gap-1 text-warning text-[12px] font-medium shrink-0">
                        <Star className="w-3 h-3 fill-current" /> {course.rating}
                      </div>
                    </div>
                    <p className="text-[11px] text-text-muted mb-2">{course.instructor} · {course.modules} modules</p>
                    <div className="flex items-center gap-3 text-[11px] text-text-muted mb-3">
                      <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {course.completed}/{course.lessons}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {course.hours}h</span>
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {course.students}</span>
                      <Badge className="bg-primary/8 text-primary hover:bg-primary/8 rounded text-[10px] border-0">{course.difficulty}</Badge>
                    </div>
                    <div className="mb-3">
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-text-muted">Progress</span>
                        <span className="font-medium text-text-primary">{course.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-bg rounded-full overflow-hidden">
                        <motion.div
                          className={cn("h-full rounded-full", course.progress === 100 ? "bg-success" : "bg-primary")}
                          initial={{ width: 0 }}
                          animate={{ width: `${course.progress}%` }}
                          transition={{ duration: 0.8, delay: i * 0.05 }}
                        />
                      </div>
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary-hover text-white rounded-[10px] h-8 text-[12px] font-medium transition-all">
                      {course.progress === 0 ? <><PlayCircle className="w-3.5 h-3.5 mr-1" /> Start</> :
                       course.progress === 100 ? <><CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Review</> :
                       <><Play className="w-3.5 h-3.5 mr-1" /> Continue</>}
                      <ChevronRight className="w-3 h-3 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div key="list" className="space-y-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {filtered.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <Card className="rounded-[16px] border-border shadow-card hover:shadow-card-hover transition-all cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <img src={course.image} alt={course.title} className="w-20 h-16 object-cover rounded-[10px] shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-[14px] text-text-primary truncate">{course.title}</h3>
                          <Badge className="bg-primary/8 text-primary hover:bg-primary/8 rounded text-[10px] border-0 shrink-0">{course.difficulty}</Badge>
                        </div>
                        <p className="text-[11px] text-text-muted mb-2">{course.instructor} · {course.completed}/{course.lessons} lessons · {course.hours}h</p>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 max-w-[200px]">
                            <div className="h-1.5 bg-bg rounded-full overflow-hidden">
                              <motion.div
                                className={cn("h-full rounded-full", course.progress === 100 ? "bg-success" : "bg-primary")}
                                initial={{ width: 0 }}
                                animate={{ width: `${course.progress}%` }}
                                transition={{ duration: 0.6 }}
                              />
                            </div>
                          </div>
                          <span className="text-[12px] font-medium text-text-primary">{course.progress}%</span>
                        </div>
                      </div>
                      <Button className="bg-primary hover:bg-primary-hover text-white rounded-[10px] h-8 px-4 text-[12px] font-medium shrink-0">
                        {course.progress === 0 ? "Start" : course.progress === 100 ? "Review" : "Continue"}
                        <ChevronRight className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
