import { useState, useEffect } from "react";
import { Search, Bell, MessageSquare } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import { MyCoursesPage } from "@/components/MyCoursesPage";
import { LiveClassesPage } from "@/components/LiveClassesPage";
import { TradingViewPage } from "@/components/TradingViewPage";
import { SubscriptionsPage } from "@/components/SubscriptionsPage";
import { CommunityPage } from "@/components/CommunityPage";
import { CertificatesPage } from "@/components/CertificatesPage";
import { DownloadsPage } from "@/components/DownloadsPage";
import { SettingsPage } from "@/components/SettingsPage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (d: Date) => d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
  const formatDate = (d: Date) => d.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "short", year: "numeric" });

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard": return <Dashboard />;
      case "courses": return <MyCoursesPage />;
      case "live": return <LiveClassesPage />;
      case "tradingview": return <TradingViewPage />;
      case "community": return <CommunityPage />;
      case "certificates": return <CertificatesPage />;
      case "downloads": return <DownloadsPage />;
      case "subscriptions": return <SubscriptionsPage />;
      case "settings": return <SettingsPage />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen flex bg-bg">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 bg-white border-b border-border flex items-center justify-between px-6 lg:px-8 sticky top-0 z-20">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center overflow-hidden">
                <img src="https://i.postimg.cc/sX5XGLk8/Ready-pips-black-ligo-removebg-preview-(2).png" alt="ReadyPips" className="w-full h-full object-contain" />
              </div>
              <span className="font-semibold text-base text-text-primary">ReadyPips</span>
            </div>
            <div className="hidden md:block h-4 w-px bg-border" />
            <div className="hidden md:flex items-center gap-3 text-[13px]">
              <span className="font-medium text-text-primary">Good afternoon, Ahmed</span>
              <span className="text-text-muted">{formatTime(time)}</span>
              <span className="text-text-muted">{formatDate(time)}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost" className="rounded-button text-text-muted hover:text-primary hover:bg-primary/5 h-8 w-8">
              <Search className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="ghost" className="rounded-button text-text-muted hover:text-primary hover:bg-primary/5 h-8 w-8 relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full" />
            </Button>
            <Button size="icon" variant="ghost" className="rounded-button text-text-muted hover:text-primary hover:bg-primary/5 h-8 w-8">
              <MessageSquare className="w-4 h-4" />
            </Button>
            <Avatar className="h-8 w-8 ml-1">
              <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" alt="Ahmed" />
              <AvatarFallback className="bg-primary text-white text-xs">AB</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="flex-1 p-6 lg:p-8 lg:px-10 overflow-y-auto">{renderPage()}</main>
      </div>
    </div>
  );
}

export default App;
