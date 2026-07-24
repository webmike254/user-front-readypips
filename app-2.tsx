import { useState, useEffect } from "react";
import { Search, Bell, MessageSquare } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import { MyCoursesPage } from "@/components/MyCoursesPage";
import { LiveClassesPage } from "@/components/LiveClassesPage";
import { TradingViewPage } from "@/components/TradingViewPage";
import { CommunityPage } from "@/components/CommunityPage";
import { CertificatesPage } from "@/components/CertificatesPage";
import { DownloadsPage } from "@/components/DownloadsPage";
import { SubscriptionsPage } from "@/components/SubscriptionsPage";
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

  const formatTime = (d: Date) =>
    d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "short", year: "numeric" });

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
    <div className="min-h-screen flex bg-[#F8F9FC]">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-[70px] bg-white border-b border-[#ECECEC] flex items-center justify-between px-6 lg:px-8 sticky top-0 z-20">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#111827] flex items-center justify-center text-white font-bold text-lg">
                <span className="text-green-500">R</span>
              </div>
              <span className="font-bold text-xl text-[#111827]">ReadyPips</span>
            </div>
            <div className="hidden md:block h-6 w-px bg-[#ECECEC]" />
            <div className="hidden md:flex items-center gap-4 text-sm">
              <span className="font-medium text-[#111827]">Good afternoon, Ahmed! 👋</span>
              <span className="text-[#6B7280]">{formatTime(time)}</span>
              <span className="text-[#6B7280]">{formatDate(time)}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button size="icon" variant="ghost" className="rounded-xl text-[#6B7280] hover:text-[#5B3DF5] hover:bg-[#F3F0FF]">
              <Search className="w-5 h-5" />
            </Button>
            <Button size="icon" variant="ghost" className="rounded-xl text-[#6B7280] hover:text-[#5B3DF5] hover:bg-[#F3F0FF] relative">
              <Bell className="w-5 h-5" />
              <Badge className="absolute top-1 right-1 h-4 w-4 p-0 flex items-center justify-center bg-red-500 text-white text-[10px] rounded-full">3</Badge>
            </Button>
            <Button size="icon" variant="ghost" className="rounded-xl text-[#6B7280] hover:text-[#5B3DF5] hover:bg-[#F3F0FF]">
              <MessageSquare className="w-5 h-5" />
            </Button>
            <Avatar className="h-10 w-10 border-2 border-[#F3F0FF]">
              <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" alt="Ahmed" />
              <AvatarFallback className="bg-[#5B3DF5] text-white">AB</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;