import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Bell, MessageSquare, Sparkles } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import { MyCoursesPage } from "@/components/MyCoursesPage";
import { LiveClassesPage } from "@/components/LiveClassesPage";
import { TradingViewPage } from "@/components/TradingViewPage";
import { SubscriptionsPage } from "@/components/SubscriptionsPage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function PlaceholderPage({ title, description }: { title: string; description: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div><h1 className="text-4xl font-bold text-slate-900">{title}</h1><p className="text-slate-500 mt-2">{description}</p></div>
      <div className="p-12 rounded-3xl bg-white border border-slate-200 shadow-sm text-center">
        <div className="w-16 h-16 rounded-2xl bg-violet-50 flex items-center justify-center mx-auto mb-4"><Sparkles className="w-8 h-8 text-violet-600" /></div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">Coming Soon</h3>
        <p className="text-slate-500 max-w-md mx-auto">This section is under active development.</p>
      </div>
    </motion.div>
  );
}

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [time, setTime] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);
  const fmtTime = (d: Date) => d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
  const fmtDate = (d: Date) => d.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "short", year: "numeric" });

  const page = () => {
    switch (currentPage) {
      case "dashboard": return <Dashboard />;
      case "courses": return <MyCoursesPage />;
      case "live": return <LiveClassesPage />;
      case "tradingview": return <TradingViewPage />;
      case "community": return <PlaceholderPage title="Community" description="Connect with fellow ReadyPips traders." />;
      case "certificates": return <PlaceholderPage title="Certificates" description="Your earned certificates and achievements." />;
      case "downloads": return <PlaceholderPage title="Downloads" description="Access your course materials and resources." />;
      case "subscriptions": return <SubscriptionsPage />;
      case "settings": return <PlaceholderPage title="Settings" description="Manage your account preferences and security." />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-8 sticky top-0 z-20">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2"><div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden"><img src="https://i.postimg.cc/sX5XGLk8/Ready-pips-black-ligo-removebg-preview-(2).png" alt="ReadyPips" className="w-full h-full object-contain" /></div><span className="font-bold text-xl text-slate-900">ReadyPips</span></div>
            <div className="hidden md:block h-6 w-px bg-slate-200" />
            <div className="hidden md:flex items-center gap-4 text-sm"><span className="font-medium text-slate-900">Good afternoon, Ahmed! 👋</span><span className="text-slate-500">{fmtTime(time)}</span><span className="text-slate-500">{fmtDate(time)}</span></div>
          </div>
          <div className="flex items-center gap-3">
            <Button size="icon" variant="ghost" className="rounded-xl text-slate-500 hover:text-violet-600 hover:bg-violet-50"><Search className="w-5 h-5" /></Button>
            <Button size="icon" variant="ghost" className="rounded-xl text-slate-500 hover:text-violet-600 hover:bg-violet-50 relative"><Bell className="w-5 h-5" /><Badge className="absolute top-1 right-1 h-4 w-4 p-0 flex items-center justify-center bg-red-500 text-white text-xs rounded-full">3</Badge></Button>
            <Button size="icon" variant="ghost" className="rounded-xl text-slate-500 hover:text-violet-600 hover:bg-violet-50"><MessageSquare className="w-5 h-5" /></Button>
            <Avatar className="h-10 w-10 border-2 border-violet-50"><AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" alt="Ahmed" /><AvatarFallback className="bg-violet-600 text-white">AB</AvatarFallback></Avatar>
          </div>
        </header>
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">{page()}</main>
      </div>
    </div>
  );
}

export default App;