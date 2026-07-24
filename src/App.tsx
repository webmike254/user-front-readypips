import React, { Suspense, useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import { Search, Bell, MessageSquare, Menu, Globe, Clock, ChevronRight, Home, TrendingUp, Award, Video, BookOpen } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { SidebarProvider, useSidebar } from "@/components/SidebarProvider";
import { NetworkProvider } from "@/components/NetworkProvider";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ToasterProvider } from "@/components/ToasterProvider";
import { PageSkeleton } from "@/components/Skeletons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { PageContext } from "@/components/PageContext";
import { cn } from "@/lib/utils";
import { RightSidebar } from "@/components/RightSidebar";

// ---- Dynamic imports for code splitting ----
const Dashboard = React.lazy(() => import("@/components/Dashboard").then((m) => ({ default: m.Dashboard })));
const MyCoursesPage = React.lazy(() => import("@/components/MyCoursesPage").then((m) => ({ default: m.MyCoursesPage })));
const LiveClassesPage = React.lazy(() => import("@/components/LiveClassesPage").then((m) => ({ default: m.LiveClassesPage })));
const TradingViewPage = React.lazy(() => import("@/components/TradingViewPage").then((m) => ({ default: m.TradingViewPage })));
const SubscriptionsPage = React.lazy(() => import("@/components/SubscriptionsPage").then((m) => ({ default: m.SubscriptionsPage })));
const CommunityPage = React.lazy(() => import("@/components/CommunityPage").then((m) => ({ default: m.CommunityPage })));
const CertificatesPage = React.lazy(() => import("@/components/CertificatesPage").then((m) => ({ default: m.CertificatesPage })));
const DownloadsPage = React.lazy(() => import("@/components/DownloadsPage").then((m) => ({ default: m.DownloadsPage })));
const SettingsPage = React.lazy(() => import("@/components/SettingsPage").then((m) => ({ default: m.SettingsPage })));
const TradingToolsPage = React.lazy(() => import("@/components/TradingToolsPage").then((m) => ({ default: m.TradingToolsPage })));
const MarketScreenerPage = React.lazy(() => import("@/components/MarketScreenerPage").then((m) => ({ default: m.MarketScreenerPage })));
const LessonQuizPage = React.lazy(() => import("@/components/LessonQuizPage").then((m) => ({ default: m.LessonQuizPage })));
const CompetitionPage = React.lazy(() => import("@/components/CompetitionPage").then((m) => ({ default: m.CompetitionPage })));
const StrategyIndicatorsPage = React.lazy(() => import("@/components/StrategyIndicatorsPage").then((m) => ({ default: m.StrategyIndicatorsPage })));
const CopyTradingPage = React.lazy(() => import("@/components/CopyTradingPage").then((m) => ({ default: m.CopyTradingPage })));
const FundingPage = React.lazy(() => import("@/components/FundingPage").then((m) => ({ default: m.FundingPage })));
const LeaderboardPage = React.lazy(() => import("@/components/LeaderboardPage").then((m) => ({ default: m.LeaderboardPage })));

function PageLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <PageSkeleton />
    </motion.div>
  );
}

const PAGE_META: Record<string, { label: string; parent?: string; parentLabel?: string }> = {
  dashboard: { label: "Dashboard" },
  "strategy-indicators": { label: "Strategy Indicators", parent: "dashboard", parentLabel: "Dashboard" },
  "copy-trading": { label: "Copy Trading", parent: "dashboard", parentLabel: "Dashboard" },
  funding: { label: "Funding", parent: "dashboard", parentLabel: "Dashboard" },
  challenges: { label: "Challenges", parent: "dashboard", parentLabel: "Dashboard" },
  leaderboard: { label: "Leaderboard", parent: "dashboard", parentLabel: "Dashboard" },
  courses: { label: "My Courses", parent: "dashboard", parentLabel: "Dashboard" },
  live: { label: "Live Classes", parent: "dashboard", parentLabel: "Dashboard" },
  tradingview: { label: "TradingView", parent: "dashboard", parentLabel: "Dashboard" },
  screener: { label: "Screener", parent: "tradingview", parentLabel: "TradingView" },
  quiz: { label: "Lesson Quiz", parent: "courses", parentLabel: "My Courses" },
  competition: { label: "Competitions", parent: "dashboard", parentLabel: "Dashboard" },
  community: { label: "Community", parent: "dashboard", parentLabel: "Dashboard" },
  certificates: { label: "Certificates", parent: "courses", parentLabel: "My Courses" },
  downloads: { label: "Downloads", parent: "courses", parentLabel: "My Courses" },
  tools: { label: "Trading Tools", parent: "tradingview", parentLabel: "TradingView" },
  subscriptions: { label: "Subscriptions", parent: "dashboard", parentLabel: "Dashboard" },
  settings: { label: "Settings", parent: "dashboard", parentLabel: "Dashboard" },
};

function Breadcrumbs({ currentPage, onNavigate }: { currentPage: string; onNavigate: (page: string) => void }) {
  const meta = PAGE_META[currentPage] || { label: "Dashboard" };
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[12px] text-text-muted">
      <button onClick={() => onNavigate("dashboard")} className="hover:text-primary transition-colors flex items-center gap-1">
        <Home className="w-3 h-3" aria-hidden="true" /> Home
      </button>
      {meta.parent && (
        <>
          <ChevronRight className="w-3 h-3" aria-hidden="true" />
          <button onClick={() => onNavigate(meta.parent!)} className="hover:text-primary transition-colors">
            {meta.parentLabel}
          </button>
        </>
      )}
      <ChevronRight className="w-3 h-3" aria-hidden="true" />
      <span className="text-text-primary font-medium" aria-current="page">{meta.label}</span>
    </nav>
  );
}

function SearchDropdown() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const results = [
    { label: "Forex Fundamentals", page: "courses", icon: BookOpen },
    { label: "Live Classes", page: "live", icon: Video },
    { label: "TradingView", page: "tradingview", icon: TrendingUp },
    { label: "Lesson Quiz", page: "quiz", icon: Award },
    { label: "Competitions", page: "competition", icon: Award },
    { label: "Certificates", page: "certificates", icon: Award },
  ].filter((r) => r.label.toLowerCase().includes(query.toLowerCase()));

  const handleNavigate = (page: string) => {
    setOpen(false);
    setQuery("");
    navigate(`/${page}`);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 h-9 rounded-[12px] bg-white border border-border text-text-muted hover:border-primary/30 hover:text-primary transition-all"
        aria-label="Open search"
      >
        <Search className="w-4 h-4" aria-hidden="true" />
        <span className="text-[13px] hidden md:inline">Search...</span>
        <kbd className="hidden md:inline text-[10px] px-1.5 py-0.5 rounded bg-bg border border-border text-text-muted">⌘K</kbd>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-2 bg-white border border-border rounded-[16px] shadow-card z-50 w-80 overflow-hidden"
          >
            <div className="p-3 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" aria-hidden="true" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search pages, courses, tools..."
                  className="w-full h-9 pl-10 pr-3 rounded-[10px] bg-bg border border-border text-[13px] text-text-primary focus:outline-none focus:border-primary"
                  aria-label="Search pages"
                />
              </div>
            </div>
            <div className="p-2 max-h-64 overflow-y-auto">
              {results.length === 0 ? (
                <p className="text-[13px] text-text-muted text-center py-4">No results found</p>
              ) : (
                results.map((r) => {
                  const Icon = r.icon;
                  return (
                    <button
                      key={r.label}
                      onClick={() => handleNavigate(r.page)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[10px] hover:bg-bg text-left transition-colors"
                    >
                      <div className="w-7 h-7 rounded-[8px] bg-primary/8 flex items-center justify-center">
                        <Icon className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                      </div>
                      <span className="text-[13px] font-medium text-text-primary">{r.label}</span>
                    </button>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NotificationsDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const notifications = [
    { title: "New live class starting", desc: "EUR/USD Market Breakdown starts in 1 hour", time: "5m ago", unread: true, color: "bg-danger" },
    { title: "Quiz completed", desc: "You scored 90% on Forex Fundamentals Quiz", time: "2h ago", unread: true, color: "bg-success" },
    { title: "New course available", desc: "Smart Money Concepts Masterclass", time: "5h ago", unread: true, color: "bg-primary" },
    { title: "Competition results", desc: "You ranked #3 in the weekly competition", time: "1d ago", unread: false, color: "bg-warning" },
  ];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-[12px] bg-white border border-border text-text-muted hover:border-primary/30 hover:text-primary transition-all"
        aria-label="Notifications"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <Bell className="w-4 h-4" aria-hidden="true" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full animate-pulse" aria-hidden="true" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-2 bg-white border border-border rounded-[16px] shadow-card z-50 w-80 overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <span className="text-[14px] font-semibold text-text-primary">Notifications</span>
              <span className="text-[11px] text-primary font-medium cursor-pointer hover:underline">Mark all read</span>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((n, i) => (
                <div
                  key={i}
                  className={cn("flex items-start gap-3 p-4 border-b border-border/50 hover:bg-bg transition-colors cursor-pointer", n.unread && "bg-primary/[0.02]")}
                >
                  <div className={cn("w-2 h-2 rounded-full mt-1.5 shrink-0", n.color)} aria-hidden="true" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-text-primary">{n.title}</p>
                    <p className="text-[12px] text-text-secondary mt-0.5">{n.desc}</p>
                    <p className="text-[11px] text-text-muted mt-1">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-border text-center">
              <button className="text-[12px] text-primary font-medium hover:underline">View all notifications</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MessagesDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const messages = [
    { name: "Omar Al-Farsi", text: "Great work on the quiz today!", time: "10m ago", unread: true, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
    { name: "Sarah Johnson", text: "Check the new SMC lesson", time: "1h ago", unread: true, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" },
    { name: "Community Group", text: "New discussion: Risk Management", time: "3h ago", unread: false, avatar: "https://images.unsplash.com/photo-1611974765270-ca1258634369?w=100&h=100&fit=crop" },
  ];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-[12px] bg-white border border-border text-text-muted hover:border-primary/30 hover:text-primary transition-all"
        aria-label="Messages"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <MessageSquare className="w-4 h-4" aria-hidden="true" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" aria-hidden="true" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-2 bg-white border border-border rounded-[16px] shadow-card z-50 w-80 overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <span className="text-[14px] font-semibold text-text-primary">Messages</span>
              <span className="text-[11px] text-primary font-medium cursor-pointer hover:underline">2 new</span>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={cn("flex items-start gap-3 p-4 border-b border-border/50 hover:bg-bg transition-colors cursor-pointer", m.unread && "bg-primary/[0.02]")}
                >
                  <Avatar className="w-9 h-9 shrink-0">
                    <AvatarImage src={m.avatar} />
                    <AvatarFallback className="text-[10px]">{m.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-[13px] font-medium text-text-primary">{m.name}</p>
                      <span className="text-[10px] text-text-muted">{m.time}</span>
                    </div>
                    <p className="text-[12px] text-text-secondary mt-0.5 truncate">{m.text}</p>
                  </div>
                  {m.unread && <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" aria-hidden="true" />}
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-border text-center">
              <button className="text-[12px] text-primary font-medium hover:underline">View all messages</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LiveClock() {
  const [time, setTime] = useState(new Date());
  const [detectedZone, setDetectedZone] = useState("");
  const [showZone, setShowZone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    try {
      const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setDetectedZone(zone);
    } catch {
      setDetectedZone("UTC");
    }
  }, []);

  const nairobiTime = new Date(time.toLocaleString("en-US", { timeZone: "Africa/Nairobi" }));
  const localTime = time;
  const isNairobi = detectedZone === "Africa/Nairobi";
  const displayTime = isNairobi ? localTime : nairobiTime;
  const formatTime = (d: Date) => d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
  const formatDate = (d: Date) => d.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" });

  return (
    <div className="relative">
      <button
        onClick={() => setShowZone(!showZone)}
        className="flex items-center gap-2 text-[13px] hover:bg-bg rounded-[12px] px-2.5 py-2 transition-colors border border-border bg-white"
        aria-label="Toggle timezone info"
      >
        <Clock className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
        <span className="font-mono font-medium text-text-primary hidden sm:inline">{formatTime(displayTime)}</span>
        <Globe className="w-3 h-3 text-text-muted" aria-hidden="true" />
      </button>
      <AnimatePresence>
        {showZone && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-1 bg-white border border-border rounded-[16px] shadow-card p-3 z-50 min-w-[220px]"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" aria-hidden="true" />
                <span className="text-[12px] font-medium text-text-primary">Live Clock</span>
              </div>
              <div className="border-t border-border pt-2 space-y-1.5">
                <div className="flex justify-between text-[12px]">
                  <span className="text-text-muted">Nairobi (UTC+3)</span>
                  <span className="font-mono font-medium text-text-primary">{formatTime(nairobiTime)}</span>
                </div>
                {!isNairobi && (
                  <div className="flex justify-between text-[12px]">
                    <span className="text-text-muted">Local ({detectedZone})</span>
                    <span className="font-mono font-medium text-text-primary">{formatTime(localTime)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[12px]">
                  <span className="text-text-muted">Date</span>
                  <span className="font-medium text-text-primary">{formatDate(displayTime)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FloatingTopBar({ currentPage, onNavigate }: { currentPage: string; onNavigate: (page: string) => void }) {
  const { setMobileOpen } = useSidebar();

  return (
    <header className="sticky top-0 z-20 px-4 md:px-6 lg:px-8 pt-4 pb-2 bg-bg/80 backdrop-blur-md">
      <div className="max-w-dashboard mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 rounded-[12px] bg-white border border-border text-text-muted hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:outline-none"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" aria-hidden="true" />
          </button>
          <div className="hidden md:block">
            <Breadcrumbs currentPage={currentPage} onNavigate={onNavigate} />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <SearchDropdown />
          <NotificationsDropdown />
          <MessagesDropdown />
          <div className="hidden sm:block">
            <LiveClock />
          </div>
          <Avatar className="h-9 w-9 border-2 border-border cursor-pointer hover:border-primary/30 transition-colors">
            <AvatarImage src="https://api.dicebear.com/7.x/adventurer/svg?seed=Mike&backgroundColor=b6e3f4&scale=90" alt="Mike Muchemi" />
            <AvatarFallback className="bg-primary text-white text-xs">MM</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get current page from URL path
  const path = location.pathname.replace("/", "") || "dashboard";
  const currentPage = path;

  const handleNavigate = (page: string) => {
    navigate(`/${page}`);
  };

  const renderPage = () => {
    const page = currentPage;
    switch (page) {
      case "dashboard": return <Dashboard />;
      case "strategy-indicators": return <StrategyIndicatorsPage />;
      case "copy-trading": return <CopyTradingPage />;
      case "funding": return <FundingPage />;
      case "challenges": return <CompetitionPage />;
      case "leaderboard": return <LeaderboardPage />;
      case "courses": return <MyCoursesPage />;
      case "live": return <LiveClassesPage />;
      case "tradingview": return <TradingViewPage />;
      case "screener": return <MarketScreenerPage />;
      case "quiz": return <LessonQuizPage />;
      case "competition": return <CompetitionPage />;
      case "community": return <CommunityPage />;
      case "certificates": return <CertificatesPage />;
      case "downloads": return <DownloadsPage />;
      case "tools": return <TradingToolsPage />;
      case "subscriptions": return <SubscriptionsPage />;
      case "settings": return <SettingsPage />;
      default: return <Dashboard />;
    }
  };

  return (
    <PageContext.Provider value={{ currentPage, setCurrentPage: handleNavigate }}>
      <div className="min-h-screen flex bg-bg">
        <Sidebar currentPage={currentPage} setCurrentPage={handleNavigate} />

        <div className="flex-1 flex min-w-0">
          <div className="flex-1 flex flex-col min-w-0">
            <FloatingTopBar currentPage={currentPage} onNavigate={handleNavigate} />

            <main className="flex-1 overflow-y-auto" style={{ WebkitOverflowScrolling: "touch" }}>
              <div className="max-w-dashboard mx-auto px-4 md:px-6 lg:px-8 pb-8">
                <ErrorBoundary>
                  <Suspense fallback={<PageLoader />}>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentPage}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                      >
                        {renderPage()}
                      </motion.div>
                    </AnimatePresence>
                  </Suspense>
                </ErrorBoundary>
              </div>
            </main>
          </div>

          {!["tradingview", "courses", "subscriptions"].includes(currentPage) && <RightSidebar />}
        </div>
      </div>
    </PageContext.Provider>
  );
}

function App() {
  return (
    <NetworkProvider>
      <SidebarProvider>
        <ToasterProvider>
          <Routes>
            <Route path="/*" element={<AppContent />} />
          </Routes>
        </ToasterProvider>
      </SidebarProvider>
    </NetworkProvider>
  );
}

export default App;