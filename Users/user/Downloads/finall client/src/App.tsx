import React, { Suspense } from "react";
import { useState, useEffect } from "react";
import { Search, Bell, MessageSquare, Menu, Globe, Clock } from "lucide-react";
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
const ChallengePaymentPage = React.lazy(() => import("@/components/ChallengePaymentPage").then((m) => ({ default: m.ChallengePaymentPage })));

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
  const formatDate = (d: Date) => d.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
  const formatZone = (d: Date) => d.toLocaleTimeString("en-US", { timeZoneName: "short" }).split(" ").pop() || "UTC+3";

  return (
    <div className="relative">
      <button
        onClick={() => setShowZone(!showZone)}
        className="flex items-center gap-2 text-[13px] hover:bg-bg rounded-button px-2 py-1 transition-colors"
      >
        <Clock className="w-3.5 h-3.5 text-primary" />
        <span className="font-mono font-medium text-text-primary">{formatTime(displayTime)}</span>
        <span className="text-text-muted hidden lg:inline">{formatDate(displayTime)}</span>
        <Globe className="w-3 h-3 text-text-muted" />
      </button>
      <AnimatePresence>
        {showZone && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-1 bg-white border border-border rounded-[18px] shadow-card p-3 z-50 min-w-[220px]"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-[12px] font-medium text-text-primary">Live Clock</span>
              </div>
              <div className="border-t border-border pt-2 space-y-1.5">
                <div className="flex justify-between text-[12px]">
                  <span className="text-text-muted">Nairobi (UTC+3)</span>
                  <span className="font-mono font-medium text-text-primary">{formatTime(nairobiTime)}</span>
                </div>
                {!isNairobi && (
                  <div className="flex justify-between text-[12px]">
                    <span className="text-text-muted">Your Local ({detectedZone})</span>
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

function Header() {
  const { setMobileOpen } = useSidebar();

  return (
    <header className="h-14 bg-white border-b border-border flex items-center justify-between px-4 lg:px-6 sticky top-0 z-20">
      <div className="flex items-center gap-3 lg:gap-5">
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden p-2 rounded-button hover:bg-bg text-text-muted"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
            <img src="https://i.postimg.cc/sX5XGLk8/Ready-pips-black-ligo-removebg-preview-(2).png" alt="ReadyPips" className="w-full h-full object-contain" />
          </div>
        </div>
        <div className="hidden md:block h-4 w-px bg-border" />
        <div className="hidden md:flex items-center gap-3 text-[13px]">
          <span className="font-medium text-text-primary">Good afternoon, Ahmed</span>
          <LiveClock />
        </div>
      </div>
      <div className="flex items-center gap-1.5 lg:gap-2">
        <Button size="icon" variant="ghost" className="rounded-button text-text-muted hover:text-primary hover:bg-primary/5 h-8 w-8" aria-label="Search">
          <Search className="w-4 h-4" />
        </Button>
        <Button size="icon" variant="ghost" className="rounded-button text-text-muted hover:text-primary hover:bg-primary/5 h-8 w-8 relative" aria-label="Notifications">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full" />
        </Button>
        <Button size="icon" variant="ghost" className="rounded-button text-text-muted hover:text-primary hover:bg-primary/5 h-8 w-8 hidden sm:flex" aria-label="Messages">
          <MessageSquare className="w-4 h-4" />
        </Button>
        <Avatar className="h-8 w-8 ml-1">
          <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" alt="Ahmed" />
          <AvatarFallback className="bg-primary text-white text-xs">AB</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}

function AppContent() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard": return <Dashboard />;
      case "courses": return <MyCoursesPage />;
      case "live": return <LiveClassesPage />;
      case "tradingview": return <TradingViewPage />;
      case "screener": return <MarketScreenerPage />;
      case "quiz": return <LessonQuizPage />;
      case "payment": return <ChallengePaymentPage />;
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
    <PageContext.Provider value={{ currentPage, setCurrentPage }}>
      <div className="min-h-screen flex bg-bg">
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 p-4 md:p-6 lg:p-8 lg:px-10 overflow-y-auto">
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
          </main>
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
          <AppContent />
        </ToasterProvider>
      </SidebarProvider>
    </NetworkProvider>
  );
}

export default App;
