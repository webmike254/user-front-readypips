import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Search, Clock, BookOpen, Play, Star, Award, TrendingUp,
  BarChart3, CheckCircle2, PlayCircle, Lock, Brain, Shield, Globe, Bitcoin,
  LineChart, FileText, Layers, Zap, Target, Users, ArrowRight, Clock3,
  Share2, Download, Bookmark, MoreHorizontal, CircleCheck, ShieldCheck,
  CandlestickChart, Network, Landmark, BrainCircuit, Sparkles, Medal,
  GraduationCap, MessageSquare, MonitorPlay, ClipboardCheck, BadgeCheck,
  FolderDown, Activity, Languages, ChevronRight, Loader2, Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Course Data                                                       */
/* ------------------------------------------------------------------ */

const courseCategories = [
  { id: "all", label: "All Courses", icon: BookOpen },
  { id: "forex", label: "Forex", icon: TrendingUp },
  { id: "smc", label: "Smart Money", icon: Layers },
  { id: "psychology", label: "Psychology", icon: Brain },
  { id: "risk", label: "Risk Management", icon: ShieldCheck },
  { id: "crypto", label: "Crypto", icon: Bitcoin },
  { id: "technical", label: "Technical Analysis", icon: BarChart3 },
  { id: "fundamental", label: "Fundamental", icon: FileText },
];

type CourseStatus = "Completed" | "In Progress" | "Not Started";

interface Course {
  id: number;
  title: string;
  category: string;
  track: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  progress: number;
  lessons: number;
  completed: number;
  hours: number;
  rating: number;
  students: number;
  image: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  description: string;
  modules: number;
  instructor: string;
  status: CourseStatus;
  language: string;
}

const allCourses: Course[] = [
  {
    id: 1, title: "Forex Fundamentals", category: "forex", track: "Beginner Track",
    difficulty: "Beginner", progress: 75, lessons: 24, completed: 18, hours: 12,
    rating: 4.8, students: 1240, image: "/funding_pips_picture_2.jpg",
    icon: Globe, iconBg: "#F0EBFF", iconColor: "#5B3DF5",
    description: "Master currency pairs, market structure, and foundational trading concepts.",
    modules: 6, instructor: "Omar Al-Farsi", status: "In Progress", language: "English",
  },
  {
    id: 2, title: "Advanced Price Action", category: "forex", track: "Advanced Track",
    difficulty: "Advanced", progress: 42, lessons: 36, completed: 15, hours: 24,
    rating: 4.9, students: 890, image: "/funding_pips_picture_3.png",
    icon: CandlestickChart, iconBg: "#E8F5E9", iconColor: "#22C55E",
    description: "Decode candlestick patterns, support zones, and institutional price movement.",
    modules: 8, instructor: "Sarah Johnson", status: "In Progress", language: "English",
  },
  {
    id: 3, title: "Risk Management Masterclass", category: "risk", track: "Core Track",
    difficulty: "Intermediate", progress: 30, lessons: 18, completed: 5, hours: 8,
    rating: 4.7, students: 2100, image: "/funding_pips_picture.jpg",
    icon: ShieldCheck, iconBg: "#FFF3E0", iconColor: "#F59E0B",
    description: "Build bulletproof position sizing, drawdown control, and risk-reward frameworks.",
    modules: 5, instructor: "Khalid Hassan", status: "In Progress", language: "English",
  },
  {
    id: 4, title: "Trading Psychology Mastery", category: "psychology", track: "Core Track",
    difficulty: "Intermediate", progress: 100, lessons: 14, completed: 14, hours: 6,
    rating: 4.9, students: 1850, image: "/funding_pips_picture.jpg",
    icon: BrainCircuit, iconBg: "#FCE4EC", iconColor: "#EC4899",
    description: "Develop emotional discipline, mental resilience, and a winning trader mindset.",
    modules: 4, instructor: "Khalid Hassan", status: "Completed", language: "English",
  },
  {
    id: 5, title: "ICT Inner Circle", category: "smc", track: "Advanced Track",
    difficulty: "Advanced", progress: 0, lessons: 42, completed: 0, hours: 36,
    rating: 4.9, students: 670, image: "/funding_pips_picture_3.png",
    icon: Network, iconBg: "#E3F2FD", iconColor: "#1976D2",
    description: "Institutional trading concepts, liquidity pools, and market structure analysis.",
    modules: 10, instructor: "Sarah Johnson", status: "Not Started", language: "English",
  },
  {
    id: 6, title: "Smart Money Concepts", category: "smc", track: "Intermediate Track",
    difficulty: "Intermediate", progress: 0, lessons: 28, completed: 0, hours: 18,
    rating: 4.8, students: 1540, image: "/funding_pips_picture_3.png",
    icon: Landmark, iconBg: "#EDE7F6", iconColor: "#7C5CFF",
    description: "Understand how institutional players engineer liquidity and manipulate retail flow.",
    modules: 7, instructor: "Omar Al-Farsi", status: "Not Started", language: "English",
  },
  {
    id: 7, title: "Crypto Trading 101", category: "crypto", track: "Beginner Track",
    difficulty: "Beginner", progress: 0, lessons: 16, completed: 0, hours: 8,
    rating: 4.6, students: 980, image: "/funding_pips_picture_4.jpg",
    icon: Bitcoin, iconBg: "#FFF8E1", iconColor: "#F59E0B",
    description: "Navigate crypto markets, blockchain basics, and digital asset trading strategies.",
    modules: 4, instructor: "Omar Al-Farsi", status: "Not Started", language: "English",
  },
  {
    id: 8, title: "Technical Analysis Pro", category: "technical", track: "Intermediate Track",
    difficulty: "Intermediate", progress: 15, lessons: 32, completed: 5, hours: 20,
    rating: 4.7, students: 1120, image: "/funding_pips_picture_4.jpg",
    icon: BarChart3, iconBg: "#E0F2F1", iconColor: "#009688",
    description: "Advanced indicators, chart patterns, and multi-timeframe analysis techniques.",
    modules: 8, instructor: "Sarah Johnson", status: "In Progress", language: "English",
  },
  {
    id: 9, title: "Fundamental Analysis", category: "fundamental", track: "Core Track",
    difficulty: "Beginner", progress: 0, lessons: 20, completed: 0, hours: 10,
    rating: 4.5, students: 760, image: "/funding_pips_pictures_5.jpg",
    icon: FileText, iconBg: "#FBE9E7", iconColor: "#FF5722",
    description: "Economic indicators, news trading, and macro-driven market forecasting.",
    modules: 5, instructor: "Khalid Hassan", status: "Not Started", language: "English",
  },
];

/* ------------------------------------------------------------------ */
/*  Lazy Image Hook  – IntersectionObserver                           */
/* ------------------------------------------------------------------ */

function useLazyImage(src: string) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const imgEl = entry.target as HTMLImageElement;
            imgEl.src = src;
            imgEl.onload = () => setLoaded(true);
            observer.unobserve(imgEl);
          }
        });
      },
      { rootMargin: "120px" }
    );

    observer.observe(img);
    return () => observer.disconnect();
  }, [src]);

  return { imgRef, loaded };
}

/* ------------------------------------------------------------------ */
/*  Lazy Image Component                                              */
/* ------------------------------------------------------------------ */

function LazyImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const { imgRef, loaded } = useLazyImage(src);

  return (
    <div className={cn("relative overflow-hidden bg-gray-100", className)}>
      <img
        ref={imgRef}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={cn(
          "w-full h-full object-cover transition-all duration-700 ease-out",
          loaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
        )}
      />
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-6 h-6 text-text-muted animate-spin" aria-hidden="true" />
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Status Badge                                                      */
/* ------------------------------------------------------------------ */

function StatusBadge({ status }: { status: CourseStatus }) {
  const styles: Record<CourseStatus, string> = {
    Completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    "In Progress": "bg-[#F0EBFF] text-[#5B3DF5] border-[#D4C8F7]",
    "Not Started": "bg-gray-50 text-gray-500 border-gray-200",
  };

  const icons: Record<CourseStatus, React.ElementType> = {
    Completed: CircleCheck,
    "In Progress": PlayCircle,
    "Not Started": Lock,
  };

  const Icon = icons[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold border",
        styles[status]
      )}
      aria-label={`Status: ${status}`}
    >
      <Icon className="w-3.5 h-3.5" aria-hidden="true" />
      {status}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Accessible Overflow Menu                                          */
/* ------------------------------------------------------------------ */

function OverflowMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const items = [
    { label: "Share", icon: Share2 },
    { label: "Download Notes", icon: Download },
    { label: "Save Offline", icon: Bookmark },
    { label: "Add to Favorites", icon: Star },
    { label: "Open Course", icon: ArrowRight },
    { label: "Mark Complete", icon: CircleCheck },
    { label: "Report Issue", icon: MessageSquare },
  ];

  const closeMenu = useCallback(() => setOpen(false), []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [closeMenu]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu();
        buttonRef.current?.focus();
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const focusedIndex = itemRefs.current.findIndex((r) => r === document.activeElement);
        const next = focusedIndex >= 0 && focusedIndex < items.length - 1 ? focusedIndex + 1 : 0;
        itemRefs.current[next]?.focus();
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        const focusedIndex = itemRefs.current.findIndex((r) => r === document.activeElement);
        const prev = focusedIndex > 0 ? focusedIndex - 1 : items.length - 1;
        itemRefs.current[prev]?.focus();
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, items.length, closeMenu]);

  return (
    <div ref={menuRef} className="relative">
      <button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5B3DF5]/40"
        aria-label="More course options"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <MoreHorizontal className="w-4 h-4 text-white" aria-hidden="true" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-1 w-52 bg-white rounded-[14px] border border-[#ECECEC] shadow-[0_4px_20px_rgba(0,0,0,0.06)] py-2 z-50"
            role="menu"
          >
            {items.map((item, i) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  ref={(el) => { itemRefs.current[i] = el; }}
                  role="menuitem"
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 text-[13px] text-text-secondary hover:bg-[#F8F7FF] hover:text-text-primary transition-colors focus:outline-none focus-visible:bg-[#F8F7FF] min-h-[44px]"
                  onClick={() => { closeMenu(); buttonRef.current?.focus(); }}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                  {item.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Skeleton Card                                                     */
/* ------------------------------------------------------------------ */

function SkeletonCard() {
  return (
    <div className="bg-white rounded-[20px] border border-[#ECECEC] overflow-hidden">
      <div className="h-[200px] bg-gray-100 animate-pulse" />
      <div className="p-5 space-y-4">
        <div className="flex gap-3">
          <div className="w-[72px] h-[72px] rounded-[18px] bg-gray-100 animate-pulse shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-8 bg-gray-100 rounded animate-pulse w-3/4" />
            <div className="h-5 bg-gray-100 rounded animate-pulse w-full" />
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="h-5 bg-gray-100 rounded animate-pulse w-20" />
          <div className="h-5 bg-gray-100 rounded animate-pulse w-20" />
          <div className="h-5 bg-gray-100 rounded animate-pulse w-20" />
          <div className="h-5 bg-gray-100 rounded animate-pulse w-20" />
          <div className="h-5 bg-gray-100 rounded animate-pulse w-20" />
          <div className="h-5 bg-gray-100 rounded animate-pulse w-20" />
        </div>
        <div className="h-3 bg-gray-100 rounded-full animate-pulse" />
        <div className="h-14 bg-gray-100 rounded-[16px] animate-pulse" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Course Card                                                       */
/* ------------------------------------------------------------------ */

function CourseCard({ course, index }: { course: Course; index: number }) {
  const navigate = useNavigate();
  const prefersReduced = useReducedMotion();
  const Icon = course.icon;

  const btnConfig = {
    "Completed": { text: "Review Course", icon: CircleCheck },
    "In Progress": { text: "Continue Learning", icon: PlayCircle },
    "Not Started": { text: "Start Learning", icon: Play },
  }[course.status];

  const BtnIcon = btnConfig.icon;

  const hoverY = prefersReduced ? 0 : -4;
  const hoverScale = prefersReduced ? 1 : 1.03;
  const animDuration = prefersReduced ? 0 : 0.4;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: animDuration, ease: "easeOut" }}
      whileHover={{ y: hoverY }}
      className="group focus-within:ring-2 focus-within:ring-[#5B3DF5]/20 rounded-[20px]"
      tabIndex={0}
      aria-label={`${course.title}, ${course.status}, ${course.progress}% complete`}
    >
      <div className="bg-white rounded-[20px] border border-[#ECECEC] overflow-hidden transition-all duration-[220ms] ease-out hover:border-[#5B3DF5]/20 cursor-pointer h-full flex flex-col">
        {/* Hero Image */}
        <div className="relative h-[200px] overflow-hidden">
          <LazyImage
            src={course.image}
            alt={course.title}
            className="h-full transition-transform duration-300 group-hover:scale-[1.03]"
          />
          {/* Status Badge – Top Left */}
          <div className="absolute top-3 left-3">
            <StatusBadge status={course.status} />
          </div>
          {/* Overflow Menu – Top Right */}
          <div className="absolute top-3 right-3">
            <OverflowMenu />
          </div>
          {/* Track Tag – Bottom Left */}
          <div className="absolute bottom-3 left-3">
            <span className="inline-block px-2.5 py-1 bg-black/40 backdrop-blur-sm text-white text-[11px] font-medium rounded-full">
              {course.track}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 flex flex-col flex-1">
          {/* Icon + Title */}
          <div className="flex gap-4 mb-4">
            <div
              className="w-[72px] h-[72px] rounded-[18px] flex items-center justify-center shrink-0 transition-colors duration-200"
              style={{ backgroundColor: course.iconBg }}
              aria-hidden="true"
            >
              <Icon className="w-8 h-8" style={{ color: course.iconColor }} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-[32px] leading-[1.15] text-[#111827] mb-1.5 group-hover:text-[#5B3DF5] transition-colors duration-200">
                {course.title}
              </h3>
              <p className="text-[18px] text-text-muted leading-relaxed line-clamp-2">
                {course.description}
              </p>
            </div>
          </div>

          {/* Metadata Row */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4" aria-label="Course metadata">
            <div className="flex items-center gap-1.5 text-[15px] text-text-muted">
              <BookOpen className="w-4 h-4 text-text-muted" aria-hidden="true" />
              <span>{course.lessons} lessons</span>
            </div>
            <div className="flex items-center gap-1.5 text-[15px] text-text-muted">
              <Clock3 className="w-4 h-4 text-text-muted" aria-hidden="true" />
              <span>{course.hours}h</span>
            </div>
            <div className="flex items-center gap-1.5 text-[15px] text-text-muted">
              <BarChart3 className="w-4 h-4 text-text-muted" aria-hidden="true" />
              <span>{course.difficulty}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[15px] text-text-muted">
              <Star className="w-4 h-4 text-text-muted" aria-hidden="true" />
              <span>{course.rating}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[15px] text-text-muted">
              <Users className="w-4 h-4 text-text-muted" aria-hidden="true" />
              <span>{course.students.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[15px] text-text-muted">
              <Languages className="w-4 h-4 text-text-muted" aria-hidden="true" />
              <span>{course.language}</span>
            </div>
          </div>

          {/* Progress Section */}
          <div className="mb-5" role="region" aria-label="Progress">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[15px] font-medium text-text-primary">Progress</span>
              <div className="flex items-center gap-2">
                <span className="text-[16px] font-bold text-text-primary">{course.progress}%</span>
                <Badge
                  className={cn(
                    "rounded-full text-[11px] border-0 px-2.5 py-0.5 font-medium",
                    course.progress === 100 && "bg-emerald-50 text-emerald-700",
                    course.progress > 0 && course.progress < 100 && "bg-[#F0EBFF] text-[#5B3DF5]",
                    course.progress === 0 && "bg-gray-50 text-gray-500"
                  )}
                >
                  {course.progress === 100 ? "Finished" : course.progress > 0 ? "Active" : "Pending"}
                </Badge>
              </div>
            </div>
            <div className="h-2.5 bg-[#F3F4F6] rounded-full overflow-hidden">
              <motion.div
                className={cn(
                  "h-full rounded-full",
                  course.progress === 100 ? "bg-emerald-500" : "bg-[#5B3DF5]"
                )}
                initial={{ width: 0 }}
                animate={{ width: `${course.progress}%` }}
                transition={{ duration: 0.8, delay: index * 0.05, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Action Button */}
          <Button
            onClick={() => navigate("/quiz")}
            className={cn(
              "w-full h-14 rounded-[16px] text-[17px] font-semibold transition-all duration-200 mt-auto min-h-[56px]",
              "btn-gradient-animated hover:translate-y-[-2px]",
              "focus-visible:ring-2 focus-visible:ring-[#5B3DF5]/40 focus-visible:ring-offset-2"
            )}
            aria-label={btnConfig.text}
          >
            <BtnIcon className="w-5 h-5 mr-2" aria-hidden="true" />
            {btnConfig.text}
            <ChevronRight className="w-4 h-4 ml-1" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                    */
/* ------------------------------------------------------------------ */

export function MyCoursesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [showCompleted, setShowCompleted] = useState(true);
  const [loading, setLoading] = useState(true);
  const prefersReduced = useReducedMotion();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filtered = allCourses.filter((c) => {
    const matchCategory = activeCategory === "all" || c.category === activeCategory;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
                        c.description.toLowerCase().includes(search.toLowerCase());
    const matchCompleted = showCompleted || c.status !== "Completed";
    return matchCategory && matchSearch && matchCompleted;
  });

  const inProgress = allCourses.filter((c) => c.status === "In Progress");
  const completed = allCourses.filter((c) => c.status === "Completed");
  const notStarted = allCourses.filter((c) => c.status === "Not Started");

  const animY = prefersReduced ? 0 : 12;
  const animDuration = prefersReduced ? 0 : 0.4;

  return (
    <div className="w-full mx-auto space-y-8 pb-8">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: animY }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: animDuration }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <h1 className="text-[32px] font-bold text-[#111827]">My Courses</h1>
          <p className="text-[15px] text-text-muted mt-1">
            Continue learning and track your progress across all courses.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="rounded-[14px] h-10 px-5 text-[13px] border-[#ECECEC] hover:bg-[#F8F7FF] hover:text-[#5B3DF5] hover:border-[#5B3DF5]/20 transition-all focus-visible:ring-2 focus-visible:ring-[#5B3DF5]/40"
            onClick={() => navigate("/certificates")}
            aria-label="View certificates"
          >
            <Award className="w-4 h-4 mr-1.5" aria-hidden="true" /> Certificates
          </Button>
          <Button
            className="rounded-[14px] h-10 px-5 text-[13px] btn-gradient-animated text-white transition-all hover:translate-y-[-2px] focus-visible:ring-2 focus-visible:ring-[#5B3DF5]/40"
            onClick={() => navigate("/quiz")}
            aria-label="Take a quiz"
          >
            <PlayCircle className="w-4 h-4 mr-1.5" aria-hidden="true" /> Take Quiz
          </Button>
        </div>
      </motion.header>

      {/* Stats Summary */}
      <section aria-label="Course statistics" className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Enrolled", value: allCourses.length, icon: BookOpen, color: "#5B3DF5" },
          { label: "In Progress", value: inProgress.length, icon: PlayCircle, color: "#F59E0B" },
          { label: "Completed", value: completed.length, icon: CircleCheck, color: "#22C55E" },
          { label: "Hours Learned", value: 48, icon: Clock3, color: "#6B7280" },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            >
              <div className="bg-white rounded-[16px] border border-[#ECECEC] p-4 transition-all duration-200 hover:border-[#5B3DF5]/20 hover:translate-y-[-2px]">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${s.color}10` }}
                    aria-hidden="true"
                  >
                    <Icon className="w-5 h-5" style={{ color: s.color }} />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-[#111827]">{s.value}</p>
                    <p className="text-[12px] text-text-muted">{s.label}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* Search + Filters */}
      <section aria-label="Search and filters" className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" aria-hidden="true" />
          <Input
            placeholder="Search your courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 rounded-[14px] border-[#ECECEC] h-11 text-[14px] focus-visible:ring-[#5B3DF5]/20 focus-visible:border-[#5B3DF5]/30"
            aria-label="Search courses"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {courseCategories.map((cat) => {
            const Icon = cat.icon;
            const active = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-[12px] text-[13px] font-medium transition-all duration-200 min-h-[44px]",
                  active
                    ? "bg-[#5B3DF5] text-white shadow-[0_2px_8px_rgba(91,61,245,0.15)]"
                    : "bg-white border border-[#ECECEC] text-text-secondary hover:bg-[#F8F7FF] hover:text-[#5B3DF5] hover:border-[#5B3DF5]/15 focus-visible:ring-2 focus-visible:ring-[#5B3DF5]/30"
                )}
                aria-pressed={active}
                aria-label={`Filter by ${cat.label}`}
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[13px] text-text-muted">Show completed</span>
            <Switch checked={showCompleted} onCheckedChange={setShowCompleted} showLabels />
          </div>
          <p className="text-[13px] text-text-muted" aria-live="polite">
            {filtered.length} course{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>
      </section>

      {/* Continue Learning Spotlight */}
      {inProgress.length > 0 && activeCategory === "all" && !search && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          aria-label="Continue learning"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[18px] font-semibold text-[#111827] flex items-center gap-2">
              <PlayCircle className="w-5 h-5 text-[#5B3DF5]" aria-hidden="true" /> Continue Learning
            </h2>
            <button className="text-[13px] text-[#5B3DF5] hover:underline font-medium min-h-[44px] px-2 rounded-lg focus-visible:ring-2 focus-visible:ring-[#5B3DF5]/30">
              View all
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {inProgress.slice(0, 4).map((course, i) => (
              <CourseCard key={course.id} course={course} index={i} />
            ))}
          </div>
        </motion.section>
      )}

      {/* All Courses Grid */}
      <section aria-label="All courses">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[18px] font-semibold text-[#111827]">
            {activeCategory === "all" && !search ? "All Courses" : "Results"}
          </h2>
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              aria-label="Loading courses"
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </motion.div>
          ) : filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-[20px] border border-[#ECECEC] p-16 text-center"
            >
              <BookOpen className="w-10 h-10 text-text-muted mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-[16px] font-medium text-[#111827] mb-1">No courses found</h3>
              <p className="text-[14px] text-text-muted">Try adjusting your search or filter.</p>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {filtered.map((course, i) => (
                <CourseCard key={course.id} course={course} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}