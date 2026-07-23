import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
} from "lucide-react";

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
  { key: "subscriptions", label: "Subscriptions", icon: CreditCard },
  { key: "settings", label: "Settings", icon: Settings },
];

export function Sidebar({ currentPage, setCurrentPage }: SidebarProps) {
  return (
    <aside className="hidden lg:flex flex-col w-[220px] h-screen sticky top-0 bg-white border-r border-border z-30">
      <div className="px-5 py-5 flex flex-col h-full">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center overflow-hidden">
            <img src="https://i.postimg.cc/sX5XGLk8/Ready-pips-black-ligo-removebg-preview-(2).png" alt="ReadyPips" className="w-full h-full object-contain" />
          </div>
          <span className="font-semibold text-base text-text-primary">ReadyPips</span>
        </div>

        <div className="flex flex-col items-center text-center mb-5 pb-5 border-b border-border">
          <Avatar className="w-14 h-14 mb-2">
            <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" alt="Ahmed Bader" />
            <AvatarFallback className="bg-primary text-white text-sm">AB</AvatarFallback>
          </Avatar>
          <h3 className="font-medium text-sm text-text-primary">Ahmed Bader</h3>
          <div className="flex items-center gap-1 mt-1">
            <Badge className="bg-primary/8 text-primary hover:bg-primary/8 rounded text-[10px] font-medium border-0">
              Premium
            </Badge>
            <CheckCircle2 className="w-3 h-3 text-primary" />
          </div>
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentPage === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setCurrentPage(item.key)}
                className={cn(
                  "w-full flex items-center gap-2.5 px-3 py-2 rounded-button text-[13px] font-medium transition-all duration-150",
                  active
                    ? "bg-primary/8 text-primary"
                    : "text-text-secondary hover:bg-bg hover:text-text-primary"
                )}
              >
                <Icon className={cn("w-4 h-4", active ? "text-primary" : "text-text-muted")} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="mt-4 pt-4 border-t border-border">
          <Button
            variant="outline"
            className="w-full rounded-button justify-start text-[13px] font-medium border-border text-text-secondary hover:bg-bg hover:text-text-primary h-9"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Website
          </Button>
        </div>
      </div>
    </aside>
  );
}
