import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSidebar } from "@/components/SidebarProvider";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  Video,
  BarChart3,
  Users,
  Award,
  Download,
  CreditCard,
  Settings,
  ArrowLeft,
  CheckCircle2,
  Wrench,
  X,
  ScanSearch,
  PanelLeftClose,
  PanelLeftOpen,
  HelpCircle,
  Trophy,
  TrendingUp,
  Copy,
  Wallet,
  LineChart,
  Crown,
  Activity,
  Zap,
  Sparkles,
  Target,
} from "lucide-react";

interface SidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const tradeItems = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "strategy-indicators", label: "Strategy Indicators", icon: Activity },
  { key: "copy-trading", label: "Copy Trading", icon: Copy },
  { key: "funding", label: "Funding", icon: Wallet },
  { key: "challenges", label: "Challenges", icon: Target },
  { key: "leaderboard", label: "Leaderboard", icon: Crown },
];

const growItems = [
  { key: "courses", label: "My Courses", icon: BookOpen },
  { key: "live", label: "Live Classes", icon: Video },
  { key: "tradingview", label: "TradingView", icon: BarChart3 },
  { key: "screener", label: "Screener", icon: ScanSearch },
  { key: "quiz", label: "Lesson Quiz", icon: HelpCircle },
  { key: "competition", label: "Competitions", icon: Trophy },
  { key: "community", label: "Community", icon: Users },
  { key: "certificates", label: "Certificates", icon: Award },
  { key: "downloads", label: "Downloads", icon: Download },
  { key: "tools", label: "Tools", icon: Wrench },
  { key: "subscriptions", label: "Subscriptions", icon: CreditCard },
  { key: "settings", label: "Settings", icon: Settings },
];

export function Sidebar({ currentPage, setCurrentPage }: SidebarProps) {
  const { mobileOpen, setMobileOpen, collapsed, toggleCollapsed } = useSidebar();
  const prefersReduced = useReducedMotion();
  const navigate = useNavigate();

  const handleNavigate = (key: string) => {
    setCurrentPage(key);
    navigate(`/${key}`);
    setMobileOpen(false);
  };

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Auto-collapse on tablet (1024-1279)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (max-width: 1279px)");
    const handle = () => { if (mq.matches && !collapsed) toggleCollapsed(); };
    handle();
    mq.addEventListener("change", handle);
    return () => mq.removeEventListener("change", handle);
  }, [collapsed, toggleCollapsed]);

  const NavLink = ({ item, onClick }: { item: typeof tradeItems[0]; onClick?: () => void }) => {
    const Icon = item.icon;
    const active = currentPage === item.key;
    return (
      <motion.button
        key={item.key}
        whileHover={prefersReduced ? {} : { x: 2 }}
        whileTap={prefersReduced ? {} : { scale: 0.98 }}
        onClick={() => { handleNavigate(item.key); onClick?.(); }}
        className={cn(
          "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-colors duration-150 relative group min-h-[44px]",
          active
            ? "bg-primary/8 text-primary"
            : "text-text-secondary hover:bg-bg hover:text-text-primary"
        )}
        title={collapsed ? item.label : undefined}
        aria-current={active ? "page" : undefined}
      >
        <Icon className={cn(
          "w-[18px] h-[18px] shrink-0 transition-colors",
          active ? "text-primary" : "text-text-muted group-hover:text-text-primary"
        )} aria-hidden="true" />
        {(!collapsed) && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            className="truncate whitespace-nowrap"
          >
            {item.label}
          </motion.span>
        )}
        {active && !collapsed && (
          <motion.div
            layoutId="activeIndicator"
            className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full bg-primary"
          />
        )}
      </motion.button>
    );
  };

  const SectionLabel = ({ label }: { label: string }) => (
    <div className={cn("px-3 py-1.5", collapsed && "px-0 text-center")}>
      <span className={cn(
        "text-[10px] font-semibold uppercase tracking-widest text-text-muted",
        collapsed && "text-[8px]"
      )}>
        {collapsed ? label.slice(0, 2) : label}
      </span>
    </div>
  );

  const SidebarContent = () => (
    <div className={cn("flex flex-col h-full", collapsed ? "px-2 py-4 items-center" : "px-3 py-4")}>
      {/* Logo */}
      <div className={cn("flex items-center justify-center mb-4 pt-2", collapsed && "mb-4 pt-2")}>
        <div className={cn(
          "flex items-center justify-center overflow-hidden transition-all duration-300",
          collapsed ? "w-16 h-16" : "w-36 h-36"
        )}>
          <img
            src="https://i.postimg.cc/sX5XGLk8/Ready-pips-black-ligo-removebg-preview-(2).png"
            alt="ReadyPips"
            className="w-full h-full object-contain"
            loading="eager"
          />
        </div>
      </div>

      {/* Profile */}
      <div className={cn("flex flex-col items-center mb-4 pb-4 border-b border-border", collapsed ? "mb-3 pb-3" : "")}>
        <div className={cn("relative overflow-hidden shrink-0 transition-all mb-2", collapsed ? "w-12 h-12 rounded-xl" : "w-20 h-20 rounded-2xl")}>
          <img
            src="https://api.dicebear.com/7.x/adventurer/svg?seed=Mike&backgroundColor=b6e3f4&scale=90"
            alt="Mike Muchemi"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="text-center overflow-hidden"
            >
              <h3 className="font-medium text-sm text-text-primary">Mike Muchemi</h3>
              <div className="flex items-center justify-center gap-1 mt-1">
                <Badge className="bg-primary/8 text-primary hover:bg-primary/8 rounded text-[10px] font-medium border-0">
                  Premium
                </Badge>
                <CheckCircle2 className="w-3 h-3 text-primary" aria-hidden="true" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Collapse toggle */}
      <div className={cn("mb-3", collapsed ? "px-0" : "px-1")}>
        <button
          onClick={toggleCollapsed}
          className={cn(
            "flex items-center justify-center rounded-xl transition-all duration-200 hover:bg-bg text-text-muted hover:text-text-primary focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:outline-none",
            collapsed ? "w-10 h-10" : "w-full h-9 px-2 gap-2"
          )}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <PanelLeftOpen className="w-4 h-4" aria-hidden="true" /> : (
            <>
              <PanelLeftClose className="w-4 h-4" aria-hidden="true" />
              <span className="text-[11px] font-medium">Collapse</span>
            </>
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto no-scrollbar w-full" aria-label="Main navigation">
        {/* TRADE Section */}
        <SectionLabel label="TRADE" />
        {tradeItems.map((item) => (
          <NavLink key={item.key} item={item} onClick={() => setMobileOpen(false)} />
        ))}

        <div className={cn("my-2 border-t border-border/50", collapsed && "mx-2")} />

        {/* GROW Section */}
        <SectionLabel label="GROW" />
        {growItems.map((item) => (
          <NavLink key={item.key} item={item} onClick={() => setMobileOpen(false)} />
        ))}
      </nav>

      {/* Back to website */}
      <div className={cn("mt-4 pt-4 border-t border-border", collapsed && "mt-3 pt-3")}>
        <Button
          variant="outline"
          className={cn(
            "w-full rounded-xl justify-start text-[13px] font-medium border-border text-text-secondary hover:bg-bg hover:text-text-primary h-10 transition-all focus-visible:ring-2 focus-visible:ring-primary/30",
            collapsed && "px-0 justify-center w-10"
          )}
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          {!collapsed && <span className="ml-2">Back to Website</span>}
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30 z-[40] lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-screen bg-white z-[50] transition-transform duration-300 ease-out shadow-card lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{ width: "min(80%, 280px)" }}
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <span className="font-semibold text-base text-text-primary">Menu</span>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 rounded-xl hover:bg-bg text-text-muted focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:outline-none"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
        <div className="px-3 py-2 h-[calc(100%-60px)] overflow-y-auto">
          <SidebarContent />
        </div>
      </aside>

      {/* Desktop / Tablet sidebar - Vertical rounded style */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 72 : 280 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          "hidden lg:flex flex-col h-screen sticky top-0 bg-white z-30 overflow-hidden shrink-0",
          "rounded-r-[24px] border-r border-border shadow-sm"
        )}
        aria-label="Desktop navigation"
      >
        <SidebarContent />
      </motion.aside>
    </>
  );
}