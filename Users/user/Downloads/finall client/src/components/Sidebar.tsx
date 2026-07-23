import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSidebar } from "@/components/SidebarProvider";
import { motion, AnimatePresence } from "framer-motion";
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
} from "lucide-react";
import { useEffect } from "react";

interface SidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const navItems = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
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

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const NavLink = ({ item, onClick }: { item: typeof navItems[0]; onClick?: () => void }) => {
    const Icon = item.icon;
    const active = currentPage === item.key;
    return (
      <motion.button
        key={item.key}
        whileHover={{ x: 2 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => { setCurrentPage(item.key); onClick?.(); }}
        className={cn(
          "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-button text-[13px] font-medium transition-colors duration-150 relative group",
          active
            ? "bg-primary/8 text-primary"
            : "text-text-secondary hover:bg-bg hover:text-text-primary"
        )}
        title={collapsed ? item.label : undefined}
      >
        <Icon className={cn("w-4 h-4 shrink-0 transition-colors", active ? "text-primary" : "text-text-muted group-hover:text-text-primary")} />
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
            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-full bg-primary"
          />
        )}
      </motion.button>
    );
  };

  const SidebarContent = () => (
    <div className={cn("flex flex-col h-full", collapsed ? "px-2 py-4 items-center" : "px-3 py-4")}>
      {/* Logo - expanded image only */}
      <div className={cn("flex items-center mb-6 pt-2", collapsed && "justify-center mb-5 pt-2")}>
        <div className={cn(
          "rounded-[16px] flex items-center justify-center overflow-hidden transition-all duration-300",
          collapsed ? "w-20 h-20" : "w-24 h-24"
        )}>
          <img
            src="https://i.postimg.cc/sX5XGLk8/Ready-pips-black-ligo-removebg-preview-(2).png"
            alt="ReadyPips"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Collapse toggle button */}
      <div className={cn("mb-4", collapsed ? "px-0" : "px-1")}>
        <button
          onClick={toggleCollapsed}
          className={cn(
            "flex items-center justify-center rounded-button transition-all duration-200 hover:bg-bg text-text-muted hover:text-text-primary",
            collapsed ? "w-9 h-9" : "w-full h-8 px-2 gap-2"
          )}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <PanelLeftOpen className="w-4 h-4" /> : (
            <>
              <PanelLeftClose className="w-4 h-4" />
              <span className="text-[11px] font-medium">Collapse</span>
            </>
          )}
        </button>
      </div>

      <div className={cn("flex flex-col items-center mb-5 pb-4 border-b border-border", collapsed ? "mb-4 pb-3" : "")}>
        <Avatar className={cn("mb-2 transition-all", collapsed ? "w-9 h-9" : "w-11 h-11")}>
          <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" alt="Ahmed Bader" />
          <AvatarFallback className="bg-primary text-white text-sm">AB</AvatarFallback>
        </Avatar>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="text-center overflow-hidden"
            >
              <h3 className="font-medium text-sm text-text-primary">Ahmed Bader</h3>
              <div className="flex items-center justify-center gap-1 mt-1">
                <Badge className="bg-primary/8 text-primary hover:bg-primary/8 rounded text-[10px] font-medium border-0">
                  Premium
                </Badge>
                <CheckCircle2 className="w-3 h-3 text-primary" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto no-scrollbar w-full">
        {navItems.map((item) => (
          <NavLink key={item.key} item={item} onClick={() => setMobileOpen(false)} />
        ))}
      </nav>

      <div className={cn("mt-4 pt-4 border-t border-border", collapsed && "mt-3 pt-3")}>
        <Button
          variant="outline"
          className={cn(
            "w-full rounded-button justify-start text-[13px] font-medium border-border text-text-secondary hover:bg-bg hover:text-text-primary h-9 transition-all",
            collapsed && "px-0 justify-center w-9"
          )}
        >
          <ArrowLeft className="w-4 h-4" />
          {!collapsed && <span className="ml-2">Back to Website</span>}
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-[40] lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-screen bg-white z-[50] w-[80%] max-w-[280px] transition-transform duration-300 ease-out shadow-card lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <span className="font-semibold text-base text-text-primary">Menu</span>
          <button onClick={() => setMobileOpen(false)} className="p-2 rounded-button hover:bg-bg text-text-muted">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="px-3 py-2">
          <SidebarContent />
        </div>
      </aside>

      {/* Desktop/tablet sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 64 : 220 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          "hidden md:flex flex-col h-screen sticky top-0 bg-white border-r border-border z-30 overflow-hidden"
        )}
      >
        <SidebarContent />
      </motion.aside>
    </>
  );
}
