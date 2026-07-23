import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSidebar } from "@/components/SidebarProvider";
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
  { key: "community", label: "Community", icon: Users },
  { key: "certificates", label: "Certificates", icon: Award },
  { key: "downloads", label: "Downloads", icon: Download },
  { key: "tools", label: "Tools", icon: Wrench },
  { key: "subscriptions", label: "Subscriptions", icon: CreditCard },
  { key: "settings", label: "Settings", icon: Settings },
];

export function Sidebar({ currentPage, setCurrentPage }: SidebarProps) {
  const { mobileOpen, setMobileOpen, collapsed } = useSidebar();

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
      <button
        key={item.key}
        onClick={() => { setCurrentPage(item.key); onClick?.(); }}
        className={cn(
          "w-full flex items-center gap-2.5 px-3 py-2 rounded-button text-[13px] font-medium transition-all duration-150",
          active
            ? "bg-primary/8 text-primary"
            : "text-text-secondary hover:bg-bg hover:text-text-primary"
        )}
      >
        <Icon className={cn("w-4 h-4 shrink-0", active ? "text-primary" : "text-text-muted")} />
        {(!collapsed) && <span className="truncate">{item.label}</span>}
      </button>
    );
  };

  const SidebarContent = () => (
    <div className={cn("flex flex-col h-full", collapsed ? "px-2 py-4 items-center" : "px-4 py-5")}>
      <div className={cn("flex items-center gap-2 mb-6", collapsed && "justify-center mb-5")}>
        <div className="w-7 h-7 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
          <img src="https://i.postimg.cc/sX5XGLk8/Ready-pips-black-ligo-removebg-preview-(2).png" alt="ReadyPips" className="w-full h-full object-contain" />
        </div>
        {!collapsed && <span className="font-semibold text-base text-text-primary">ReadyPips</span>}
      </div>

      <div className={cn("flex flex-col items-center mb-5 pb-4 border-b border-border", collapsed ? "mb-4 pb-3" : "")}>
        <Avatar className={cn("mb-2", collapsed ? "w-10 h-10" : "w-12 h-12")}>
          <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" alt="Ahmed Bader" />
          <AvatarFallback className="bg-primary text-white text-sm">AB</AvatarFallback>
        </Avatar>
        {!collapsed && (
          <>
            <h3 className="font-medium text-sm text-text-primary">Ahmed Bader</h3>
            <div className="flex items-center gap-1 mt-1">
              <Badge className="bg-primary/8 text-primary hover:bg-primary/8 rounded text-[10px] font-medium border-0">
                Premium
              </Badge>
              <CheckCircle2 className="w-3 h-3 text-primary" />
            </div>
          </>
        )}
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
            "w-full rounded-button justify-start text-[13px] font-medium border-border text-text-secondary hover:bg-bg hover:text-text-primary h-9",
            collapsed && "px-2 justify-center"
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
      <aside
        className={cn(
          "hidden md:flex flex-col h-screen sticky top-0 bg-white border-r border-border z-30 transition-[width] duration-200",
          collapsed ? "w-[64px]" : "w-[220px]"
        )}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
