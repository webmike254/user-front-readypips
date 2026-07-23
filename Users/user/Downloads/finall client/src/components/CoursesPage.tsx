import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Grid3X3,
  List,
  Heart,
  MoreVertical,
  Play,
  Clock,
  BarChart3,
  BookOpen,
  CheckCircle2,
  TrendingUp,
  Award,
  Flame,
  ChevronRight,
  Home,
  LayoutGrid,
  Star,
  Download,
  Share2,
  Bookmark,
  Flag,
  Trash2,
  X,
  Users,
  Calendar,
  FileText,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 1500;
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

const stats = [
  { icon: BookOpen, label: "Enrolled Courses", value: 12, color: "text-[#5B3DF5]", bg: "bg-[#F3F0FF]" },
  { icon: TrendingUp, label: "In Progress", value: 4, color: "text-amber-600", bg: "bg-amber-50" },
  { icon: CheckCircle2, label: "Completed", value: 6, color: "text-emerald-600", bg: "bg-emerald-50" },
  { icon: Clock, label: "Hours Learned", value: 142, color: "text-rose-600", bg: "bg-rose-50" },
];

const filters = [
  { label: "All Courses", count: 12 },
  { label: "In Progress", count: 4 },
  { label: "Completed", count: 6 },
  { label: "Not Started", count: 2 },
  { label: "Favorites", count: 3 },
];

const courses = [
  {
    id: 1,
    title: "Forex Fundamentals Masterclass",
    instructor: "Marcus Chen",
    category: "Forex Basics",
    difficulty: "Beginner",
    duration: "24h 30m",
    lessons: 42,
    completedLessons: 42,
    rating: 4.9,
    students: 12400,
    progress: 100,
    status: "Completed",
    statusColor: "bg-emerald-500",
    image: "https://images.unsplash.com/photo-1611974765270-ca1258634369?w=600&h=400&fit=crop",
    favorited: true,
    description: "Build a solid foundation in currency trading with institutional-grade concepts.",
    language: "English",
    lastAccessed: "Oct 18, 2023",
    certificate: true,
  },
  {
    id: 2,
    title: "Technical Analysis Pro",
    instructor: "Sarah Williams",
    category: "Technical Analysis",
    difficulty: "Intermediate",
    duration: "36h 15m",
    lessons: 58,
    completedLessons: 39,
    rating: 4.8,
    students: 8900,
    progress: 68,
    status: "In Progress",
    statusColor: "bg-[#5B3DF5]",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    favorited: false,
    description: "Master chart patterns, indicators, and price action strategies used by professionals.",
    language: "English",
    lastAccessed: "2 hours ago",
    certificate: false,
  },
  {
    id: 3,
    title: "Advanced Price Action Trading",
    instructor: "David Okonkwo",
    category: "Price Action",
    difficulty: "Advanced",
    duration: "48h 00m",
    lessons: 72,
    completedLessons: 24,
    rating: 4.9,
    students: 5600,
    progress: 34,
    status: "In Progress",
    statusColor: "bg-[#5B3DF5]",
    image: "https://images.unsplash.com/photo-1642790105337-304974e6cb18?w=600&h=400&fit=crop",
    favorited: true,
    description: "Learn how institutional traders read raw price movement without indicators.",
    language: "English",
    lastAccessed: "Yesterday",
    certificate: false,
  },
  {
    id: 4,
    title: "Risk Management & Psychology",
    instructor: "Elena Rossi",
    category: "Psychology",
    difficulty: "Intermediate",
    duration: "18h 45m",
    lessons: 28,
    completedLessons: 3,
    rating: 4.7,
    students: 10200,
    progress: 12,
    status: "In Progress",
    statusColor: "bg-[#5B3DF5]",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&h=400&fit=crop",
    favorited: false,
    description: "Develop the mental discipline and risk frameworks required for long-term success.",
    language: "English",
    lastAccessed: "3 days ago",
    certificate: false,
  },
  {
    id: 5,
    title: "Crypto & Bitcoin Trading",
    instructor: "James Nakamura",
    category: "Crypto",
    difficulty: "Advanced",
    duration: "30h 20m",
    lessons: 45,
    completedLessons: 0,
    rating: 4.8,
    students: 7300,
    progress: 0,
    status: "Not Started",
    statusColor: "bg-[#6B7280]",
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=600&h=400&fit=crop",
    favorited: false,
    description: "Apply forex principles to volatile crypto markets with advanced risk controls.",
    language: "English",
    lastAccessed: "Never",
    certificate: false,
  },
  {
    id: 6,
    title: "Institutional Order Flow",
    instructor: "Michael Torres",
    category: "Advanced",
    difficulty: "Advanced",
    duration: "42h 10m",
    lessons: 64,
    completedLessons: 0,
    rating: 5.0,
    students: 3400,
    progress: 0,
    status: "Locked",
    statusColor: "bg-amber-500",
    image: "https://images.unsplash.com/photo-1642790551116-18e150f248e5?w=600&h=400&fit=crop",
    favorited: false,
    description: "Unlock the strategies used by banks and hedge funds to move large capital.",
    language: "English",
    lastAccessed: "Locked",
    certificate: false,
  },
  {
    id: 7,
    title: "Live Scalping Bootcamp",
    instructor: "Ahmed Bader",
    category: "Live",
    difficulty: "Advanced",
    duration: "12h 00m",
    lessons: 24,
    completedLessons: 8,
    rating: 4.9,
    students: 2100,
    progress: 33,
    status: "Live",
    statusColor: "bg-[#EF4444]",
    image: "https://images.unsplash.com/photo-1611974765270-ca1258634369?w=600&h=400&fit=crop",
    favorited: true,
    description: "Join live scalping sessions with real-time market analysis and execution.",
    language: "English",
    lastAccessed: "Live now",
    certificate: false,
  },
  {
    id: 8,
    title: "Fundamental Analysis Deep Dive",
    instructor: "Lisa Thompson",
    category: "Fundamentals",
    difficulty: "Intermediate",
    duration: "22h 30m",
    lessons: 38,
    completedLessons: 38,
    rating: 4.6,
    students: 6700,
    progress: 100,
    status: "Completed",
    statusColor: "bg-emerald-500",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    favorited: false,
    description: "Understand macroeconomic events and how they drive currency movements.",
    language: "English",
    lastAccessed: "Oct 10, 2023",
    certificate: true,
  },
];

const recommended = [
  { id: 101, title: "Algorithmic Trading Basics", instructor: "Robert Klein", difficulty: "Advanced", rating: 4.9, students: 1800, image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=260&fit=crop" },
  { id: 102, title: "Prop Firm Challenge Prep", instructor: "Nina Patel", difficulty: "Intermediate", rating: 4.8, students: 3200, image: "https://images.unsplash.com/photo-1642790105337-304974e6cb18?w=400&h=260&fit=crop" },
  { id: 103, title: "Trading Journal Mastery", instructor: "Tom Bradley", difficulty: "Beginner", rating: 4.7, students: 5400, image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=260&fit=crop" },
  { id: 104, title: "Commodities & Metals", instructor: "Yuki Tanaka", difficulty: "Intermediate", rating: 4.8, students: 2900, image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=260&fit=crop" },
];

const recentlyViewed = [
  { id: 201, title: "Support & Resistance Zones", course: "Technical Analysis Pro", thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=120&fit=crop", currentTime: "12:45", totalTime: "24:30", remaining: "11:45" },
  { id: 202, title: "Smart Money Concepts", course: "Advanced Price Action Trading", thumbnail: "https://images.unsplash.com/photo-1642790105337-304974e6cb18?w=200&h=120&fit=crop", currentTime: "08:20", totalTime: "32:15", remaining: "23:55" },
  { id: 203, title: "Position Sizing Formula", course: "Risk Management & Psychology", thumbnail: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=200&h=120&fit=crop", currentTime: "04:10", totalTime: "18:45", remaining: "14:35" },
];

const achievements = [
  { icon: Award, label: "First Course Completed", color: "bg-emerald-100 text-emerald-600" },
  { icon: Flame, label: "7-Day Streak", color: "bg-amber-100 text-amber-600" },
  { icon: Star, label: "Top Performer", color: "bg-[#F3F0FF] text-[#5B3DF5]" },
  { icon: TrendingUp, label: "Quiz Master", color: "bg-rose-100 text-rose-600" },
  { icon: CheckCircle2, label: "Risk Management Expert", color: "bg-sky-100 text-sky-600" },
];

const upcoming = [
  { title: "Live Scalping Session", time: "2:00 PM", type: "Live Class", color: "bg-[#EF4444]" },
  { title: "Risk Management Quiz", time: "Tomorrow", type: "Quiz", color: "bg-amber-500" },
  { title: "Assignment: Trade Journal", time: "Fri, 27 Oct", type: "Assignment", color: "bg-[#5B3DF5]" },
];

function parseTime(time: string) {
  const [m, s] = time.split(":").map(Number);
  return m * 60 + s;
}

export function CoursesPage() {
  const [activeFilter, setActiveFilter] = useState("All Courses");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [favorites, setFavorites] = useState<number[]>(courses.filter((c) => c.favorited).map((c) => c.id));

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]));
  };

  const filteredCourses = activeFilter === "All Courses"
    ? courses
    : activeFilter === "Favorites"
    ? courses.filter((c) => favorites.includes(c.id))
    : courses.filter((c) => c.status === activeFilter.split(" ")[0] || (activeFilter === "Not Started" && c.status === "Not Started"));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 pb-8"
    >
      <div className="flex items-center gap-2 text-sm text-[#6B7280]">
        <Home className="w-4 h-4" />
        <span>Home</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-[#5B3DF5] font-semibold">My Courses</span>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h1 className="text-[40px] font-bold text-[#111827] leading-tight">My Courses</h1>
          <p className="text-[#6B7280] mt-2 text-base">Continue learning, track your progress, and discover new trading strategies.</p>
        </div>
        <motion.div whileHover={{ y: -2, boxShadow: "0 12px 28px rgba(91,61,245,0.25)" }} whileTap={{ scale: 0.98 }}>
          <Button className="rounded-2xl bg-gradient-to-r from-[#5B3DF5] to-[#7C5CFF] hover:from-[#6B4DF7] hover:to-[#8C6CFF] text-white font-semibold px-6 py-5 shadow-lg shadow-[#5B3DF5]/20">
            <LayoutGrid className="w-4 h-4 mr-2" /> Browse Course Catalog
          </Button>
        </motion.div>
      </div>

      <Tabs value={activeFilter} onValueChange={setActiveFilter}>
        <TabsList className="bg-transparent p-0 h-auto gap-2 flex-wrap">
          {filters.map((filter) => (
            <TabsTrigger
              key={filter.label}
              value={filter.label}
              className={cn(
                "rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 border",
                activeFilter === filter.label
                  ? "bg-white border-[#5B3DF5] text-[#5B3DF5] shadow-sm"
                  : "bg-white border-[#ECECEC] text-[#6B7280] hover:border-[#5B3DF5]/30 hover:text-[#5B3DF5]"
              )}
            >
              {filter.label}
              <span className={cn("ml-2 text-xs px-2 py-0.5 rounded-full", activeFilter === filter.label ? "bg-[#F3F0FF]" : "bg-[#F8F9FC]")}>
                {filter.count}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -4, boxShadow: "0 16px 32px rgba(0,0,0,0.06)" }}
              className="bg-white rounded-[24px] border border-[#ECECEC] p-6 shadow-sm"
            >
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4", stat.bg)}>
                <Icon className={cn("w-6 h-6", stat.color)} />
              </div>
              <div className="text-[32px] font-bold text-[#111827]">
                <AnimatedNumber value={stat.value} />
              </div>
              <p className="text-sm text-[#6B7280] mt-1">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      <Card className="rounded-[24px] border-[#ECECEC] shadow-sm">
        <CardContent className="p-5">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
              <Input
                placeholder="Search your courses..."
                className="pl-11 h-12 rounded-2xl border-[#ECECEC] bg-[#F8F9FC] focus-visible:ring-[#5B3DF5] focus-visible:bg-white transition-all"
              />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Select defaultValue="all">
                <SelectTrigger className="w-[160px] h-12 rounded-2xl border-[#ECECEC] bg-white"><SelectValue placeholder="Category" /></SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="forex">Forex Basics</SelectItem>
                  <SelectItem value="technical">Technical Analysis</SelectItem>
                  <SelectItem value="psychology">Psychology</SelectItem>
                  <SelectItem value="crypto">Crypto</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px] h-12 rounded-2xl border-[#ECECEC] bg-white"><SelectValue placeholder="Difficulty" /></SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px] h-12 rounded-2xl border-[#ECECEC] bg-white"><SelectValue placeholder="Instructor" /></SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="all">All Instructors</SelectItem>
                  <SelectItem value="marcus">Marcus Chen</SelectItem>
                  <SelectItem value="sarah">Sarah Williams</SelectItem>
                  <SelectItem value="david">David Okonkwo</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="recent">
                <SelectTrigger className="w-[140px] h-12 rounded-2xl border-[#ECECEC] bg-white"><SelectValue placeholder="Sort" /></SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="recent">Recently Active</SelectItem>
                  <SelectItem value="progress">Progress</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2 bg-[#F8F9FC] rounded-2xl p-1 border border-[#ECECEC]">
                <button onClick={() => setViewMode("grid")} className={cn("p-2.5 rounded-xl transition-all", viewMode === "grid" ? "bg-white text-[#5B3DF5] shadow-sm" : "text-[#6B7280] hover:text-[#5B3DF5]")}>
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button onClick={() => setViewMode("list")} className={cn("p-2.5 rounded-xl transition-all", viewMode === "list" ? "bg-white text-[#5B3DF5] shadow-sm" : "text-[#6B7280] hover:text-[#5B3DF5]")}>
                  <List className="w-5 h-5" />
                </button>
              </div>
              <Button variant="outline" className="h-12 rounded-2xl border-[#ECECEC] text-[#6B7280] hover:text-[#5B3DF5]">
                <Filter className="w-4 h-4 mr-2" /> Filter
              </Button>
              <Button variant="ghost" className="h-12 rounded-2xl text-[#6B7280] hover:text-[#EF4444]">
                <X className="w-4 h-4 mr-2" /> Clear
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ delay: index * 0.05 }}
            >
              <CourseTile course={course} isFavorite={favorites.includes(course.id)} onToggleFavorite={() => toggleFavorite(course.id)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <ContinueLearningBanner />

      <div className="grid lg:grid-cols-3 gap-6">
        <RecentlyViewed />
        <UpcomingSchedule />
        <Achievements />
      </div>

      <RecommendedCourses />

      <LearningAnalytics />
    </motion.div>
  );
}

function CourseTile({
  course,
  isFavorite,
  onToggleFavorite,
}: {
  course: typeof courses[0];
  isFavorite: boolean;
  onToggleFavorite: () => void;
}) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 24px 56px rgba(0,0,0,0.09)" }}
      className="group bg-white rounded-[28px] border border-[#ECECEC] shadow-sm overflow-hidden cursor-pointer transition-all"
    >
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-[320px] h-[200px] lg:h-auto relative overflow-hidden flex-shrink-0">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-black/10" />
          <Badge className={cn("absolute top-4 left-4 text-white border-0 font-semibold px-3 py-1", course.statusColor)}>
            {course.status}
          </Badge>
          <div className="absolute top-4 right-4 flex gap-2">
            <motion.button
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite();
              }}
              className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-colors shadow-sm",
                isFavorite ? "bg-white text-[#EF4444]" : "bg-black/30 text-white hover:bg-white hover:text-[#EF4444]"
              )}
            >
              <Heart className={cn("w-4 h-4", isFavorite && "fill-current")} />
            </motion.button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="w-9 h-9 rounded-full bg-black/30 text-white hover:bg-white hover:text-[#111827] flex items-center justify-center backdrop-blur-md transition-colors shadow-sm"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-2xl w-52">
                <DropdownMenuItem className="rounded-xl cursor-pointer"><Play className="w-4 h-4 mr-2" /> Continue</DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl cursor-pointer"><BookOpen className="w-4 h-4 mr-2" /> Course Details</DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl cursor-pointer"><Download className="w-4 h-4 mr-2" /> Download Resources</DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl cursor-pointer"><Bookmark className="w-4 h-4 mr-2" /> Bookmark</DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl cursor-pointer"><Share2 className="w-4 h-4 mr-2" /> Share</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="rounded-xl cursor-pointer text-[#EF4444]"><Trash2 className="w-4 h-4 mr-2" /> Remove</DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl cursor-pointer"><Flag className="w-4 h-4 mr-2" /> Report Issue</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="absolute bottom-4 left-4 right-4 lg:hidden">
            <div className="flex items-center justify-between text-white text-xs">
              <span className="font-bold">{course.progress}% complete</span>
              <span>{course.completedLessons}/{course.lessons} lessons</span>
            </div>
            <div className="h-1.5 bg-white/20 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-white rounded-full" style={{ width: `${course.progress}%` }} />
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 lg:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center flex-wrap gap-2 mb-3">
              <Badge variant="outline" className="rounded-lg text-[11px] font-medium border-[#ECECEC] text-[#6B7280]">
                {course.category}
              </Badge>
              <Badge variant="outline" className="rounded-lg text-[11px] font-medium border-[#ECECEC] text-[#6B7280]">
                {course.difficulty}
              </Badge>
              <Badge variant="outline" className="rounded-lg text-[11px] font-medium border-[#ECECEC] text-[#6B7280]">
                {course.language}
              </Badge>
              {course.certificate && (
                <Badge className="rounded-lg text-[11px] font-medium bg-emerald-100 text-emerald-700 border-0">
                  <Award className="w-3 h-3 mr-1" /> Certificate
                </Badge>
              )}
            </div>
            <h3 className="text-2xl font-bold text-[#111827] mb-2 group-hover:text-[#5B3DF5] transition-colors">
              {course.title}
            </h3>
            <p className="text-sm text-[#6B7280] mb-3">by <span className="font-semibold text-[#111827]">{course.instructor}</span></p>
            <p className="text-[15px] text-[#6B7280] leading-relaxed max-w-2xl mb-5">
              {course.description}
            </p>
            <div className="flex flex-wrap items-center gap-5 text-sm text-[#6B7280] mb-5">
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[#5B3DF5]" /> {course.duration}</span>
              <span className="flex items-center gap-1.5"><BarChart3 className="w-4 h-4 text-[#5B3DF5]" /> {course.lessons} lessons</span>
              <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-[#5B3DF5]" /> {course.students.toLocaleString()} students</span>
              <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-amber-500 fill-amber-500" /> {course.rating}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-[#5B3DF5]" /> Last viewed {course.lastAccessed}</span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-5">
            <div className="flex-1 w-full">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="font-bold text-[#111827]">{course.progress}% complete</span>
                <span className="text-[#6B7280]">{course.completedLessons}/{course.lessons} lessons</span>
              </div>
              <div className="relative">
                <Progress value={course.progress} className="h-3 bg-[#F3F0FF]" />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${course.progress}%` }}
                  className="absolute top-0 left-0 h-3 rounded-full bg-gradient-to-r from-[#5B3DF5] to-[#7C5CFF] opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-300"
                />
              </div>
              <p className="text-xs text-[#6B7280] mt-2">
                {course.progress === 100 ? "Completed on Oct 18, 2023" : course.progress === 0 ? "Start your learning journey" : `Estimated ${Math.ceil((course.lessons - course.completedLessons) * 0.5)} hours remaining`}
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex-shrink-0">
              <Button className="rounded-2xl bg-gradient-to-r from-[#5B3DF5] to-[#7C5CFF] hover:from-[#6B4DF7] hover:to-[#8C6CFF] text-white font-bold px-8 py-5 shadow-lg shadow-[#5B3DF5]/20 group-hover:shadow-xl transition-all">
                <Play className="w-4 h-4 mr-2" />
                {course.progress === 100 ? "Review Course" : course.progress === 0 ? "Start Course" : "Continue Learning"}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ContinueLearningBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-[#5B3DF5] to-[#7C5CFF] p-8 text-white shadow-xl shadow-[#5B3DF5]/20"
    >
      <div className="absolute top-0 right-0 w-[400px] h-full opacity-20">
        <img src="https://images.unsplash.com/photo-1642790551116-18e150f248e5?w=600&h=400&fit=crop" alt="Trading" className="w-full h-full object-cover" />
      </div>
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="flex-1">
          <Badge className="bg-white/20 text-white border-0 mb-3 rounded-full">Continue Learning</Badge>
          <h3 className="text-2xl font-bold mb-2">Technical Analysis Pro</h3>
          <p className="text-white/80 mb-4">Lesson 24: Advanced Support & Resistance Zones</p>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 max-w-[280px]">
              <div className="flex justify-between text-xs mb-1.5">
                <span>68% complete</span>
                <span>~5h 30m left</span>
              </div>
              <div className="h-2.5 bg-white/20 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} whileInView={{ width: "68%" }} viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeOut" }} className="h-full bg-white rounded-full" />
              </div>
            </div>
          </div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Button className="rounded-2xl bg-white text-[#5B3DF5] hover:bg-white/90 font-bold px-8 py-5">
              <Play className="w-4 h-4 mr-2" /> Resume Lesson
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function RecentlyViewed() {
  return (
    <Card className="rounded-[24px] border-[#ECECEC] shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-[#111827]">Continue Watching</CardTitle>
      </CardHeader>
      <CardContent className="p-5 pt-0 space-y-4">
        {recentlyViewed.map((item) => (
          <motion.div key={item.id} whileHover={{ backgroundColor: "rgba(243,240,255,0.5)" }} className="flex gap-3 p-2 rounded-2xl transition-colors cursor-pointer">
            <div className="w-20 h-14 rounded-xl overflow-hidden flex-shrink-0 relative">
              <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/70 text-white text-[9px] rounded">{item.remaining}</div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[#111827] truncate">{item.title}</p>
              <p className="text-xs text-[#6B7280] truncate">{item.course}</p>
              <div className="flex items-center gap-1 mt-1">
                <div className="h-1 flex-1 bg-[#F3F0FF] rounded-full overflow-hidden">
                  <div className="h-full bg-[#5B3DF5] rounded-full" style={{ width: `${(parseTime(item.currentTime) / parseTime(item.totalTime)) * 100}%` }} />
                </div>
              </div>
            </div>
            <Button size="icon" className="rounded-full bg-[#F3F0FF] text-[#5B3DF5] hover:bg-[#5B3DF5] hover:text-white">
              <Play className="w-4 h-4" />
            </Button>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}

function UpcomingSchedule() {
  return (
    <Card className="rounded-[24px] border-[#ECECEC] shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-[#111827]">Upcoming Schedule</CardTitle>
      </CardHeader>
      <CardContent className="p-5 pt-0 space-y-4">
        {upcoming.map((item) => (
          <motion.div key={item.title} whileHover={{ backgroundColor: "rgba(243,240,255,0.5)" }} className="flex items-start gap-3 p-3 rounded-2xl transition-colors cursor-pointer">
            <div className={cn("w-2 h-2 rounded-full mt-2", item.color)} />
            <div className="flex-1">
              <p className="text-sm font-bold text-[#111827]">{item.title}</p>
              <p className="text-xs text-[#6B7280]">{item.type} • {item.time}</p>
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}

function Achievements() {
  return (
    <Card className="rounded-[24px] border-[#ECECEC] shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-[#111827]">Achievements</CardTitle>
      </CardHeader>
      <CardContent className="p-5 pt-0">
        <div className="grid grid-cols-3 gap-3">
          {achievements.map((ach) => {
            const Icon = ach.icon;
            return (
              <motion.div key={ach.label} whileHover={{ scale: 1.08, y: -2 }} className="flex flex-col items-center text-center p-3 rounded-2xl bg-[#F8F9FC] cursor-pointer">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-2", ach.color)}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-[10px] font-semibold text-[#111827] leading-tight">{ach.label}</p>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function RecommendedCourses() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#111827]">Recommended for You</h2>
        <Button variant="ghost" className="text-[#5B3DF5] font-semibold hover:bg-[#F3F0FF]">
          View All <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {recommended.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -6, boxShadow: "0 24px 48px rgba(0,0,0,0.08)" }}
            className="bg-white rounded-[24px] border border-[#ECECEC] shadow-sm overflow-hidden group cursor-pointer"
          >
            <div className="h-40 overflow-hidden">
              <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="rounded-lg text-[11px] border-[#ECECEC] text-[#6B7280]">{course.difficulty}</Badge>
                <span className="flex items-center gap-1 text-xs text-[#6B7280]"><Star className="w-3 h-3 text-amber-500 fill-amber-500" /> {course.rating}</span>
              </div>
              <h4 className="font-bold text-[#111827] mb-1 group-hover:text-[#5B3DF5] transition-colors">{course.title}</h4>
              <p className="text-xs text-[#6B7280] mb-4">by {course.instructor}</p>
              <Button className="w-full rounded-2xl bg-[#F8F9FC] text-[#5B3DF5] hover:bg-[#5B3DF5] hover:text-white font-semibold">
                Enroll Now
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function LearningAnalytics() {
  const analytics = [
    { label: "Avg. Daily Learning", value: "1h 24m", icon: Clock, color: "text-[#5B3DF5]", bg: "bg-[#F3F0FF]" },
    { label: "Current Streak", value: "7 days", icon: Flame, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Weekly Goal", value: "82%", icon: BarChart3, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Quiz Average", value: "91%", icon: CheckCircle2, color: "text-rose-600", bg: "bg-rose-50" },
    { label: "Certificates", value: "4", icon: Award, color: "text-sky-600", bg: "bg-sky-50" },
    { label: "Hours This Month", value: "38h", icon: TrendingUp, color: "text-violet-600", bg: "bg-violet-50" },
  ];

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold text-[#111827]">Learning Analytics</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {analytics.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              whileHover={{ y: -4, boxShadow: "0 16px 32px rgba(0,0,0,0.06)" }}
              className="bg-white rounded-[24px] border border-[#ECECEC] p-5 shadow-sm text-center"
            >
              <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center mx-auto mb-3", item.bg)}>
                <Icon className={cn("w-5 h-5", item.color)} />
              </div>
              <div className="text-xl font-bold text-[#111827]">{item.value}</div>
              <p className="text-xs text-[#6B7280] mt-1">{item.label}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}