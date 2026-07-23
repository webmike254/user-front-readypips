import { useState, useEffect } from "react";
import { Search, Bell, MessageSquare, Menu } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { SidebarProvider, useSidebar } from "@/components/SidebarProvider";
import { Dashboard } from "@/components/Dashboard";
import { MyCoursesPage } from "@/components/MyCoursesPage";
import { LiveClassesPage } from "@/components/LiveClassesPage";
import { TradingViewPage } from "@/components/TradingViewPage";
import { SubscriptionsPage } from "@/components/SubscriptionsPage";
import { CommunityPage } from "@/components/CommunityPage";
import { CertificatesPage } from "@/components/CertificatesPage";
import { DownloadsPage } from "@/components/DownloadsPage";
import { SettingsPage } from "@/components/SettingsPage";
import { TradingToolsPage } from "@/components/TradingToolsPage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ToasterProvider } from "@/components/ToasterProvider";

function Header() {
  const { setMobileOpen } = useSidebar();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (d: Date) => d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
  const formatDate = (d: Date) => d.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" });

  return (
    <header className="h-14 bg-white border-b border-border flex items-center justify-between px-4 lg:px-6 sticky top-0 z-20">
      <div className="flex items-center gap-3 lg:gap-5">
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden p-2 rounded-button hover:bg-bg text-text-muted"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center overflow-hidden">
            <img src="https://i.postimg.cc/sX5XGLk8/Ready-pips-black-ligo-removebg-preview-(2).png" alt="ReadyPips" className="w-full h-full object-contain" />
          </div>
          <span className="font-semibold text-base text-text-primary hidden sm:inline">ReadyPips</span>
        </div>
        <div className="hidden md:block h-4 w-px bg-border" />
        <div className="hidden md:flex items-center gap-3 text-[13px]">
          <span className="font-medium text-text-primary">Good afternoon, Ahmed</span>
          <span className="text-text-muted">{formatTime(time)}</span>
          <span className="text-text-muted">{formatDate(time)}</span>
        </div>
      </div>
      <div className="flex items-center gap-1.5 lg:gap-2">
        <Button size="icon" variant="ghost" className="rounded-button text-text-muted hover:text-primary hover:bg-primary/5 h-8 w-8">
          <Search className="w-4 h-4" />
        </Button>
        <Button size="icon" variant="ghost" className="rounded-button text-text-muted hover:text-primary hover:bg-primary/5 h-8 w-8 relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full" />
        </Button>
        <Button size="icon" variant="ghost" className="rounded-button text-text-muted hover:text-primary hover:bg-primary/5 h-8 w-8 hidden sm:flex">
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
    <div className="min-h-screen flex bg-bg">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-4 md:p-6 lg:p-8 lg:px-10 overflow-y-auto">{renderPage()}</main>
      </div>
    </div>
  );
}

function App() {
  return (
    <SidebarProvider>
      <ToasterProvider>
        <AppContent />
      </ToasterProvider>
    </SidebarProvider>
  );
}

export default App;
