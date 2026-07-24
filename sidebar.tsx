import { LayoutDashboard, BookOpen, Video, BarChart3, Users, Award, Download, CreditCard, Settings, Crown, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  { key: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { key: "courses", icon: BookOpen, label: "My Courses" },
  { key: "live", icon: Video, label: "Live Classes" },
  { key: "tradingview", icon: BarChart3, label: "TradingView" },
  { key: "community", icon: Users, label: "Community" },
  { key: "certificates", icon: Award, label: "Certificates" },
  { key: "downloads", icon: Download, label: "Downloads" },
  { key: "subscriptions", icon: CreditCard, label: "Subscriptions & Challenges" },
  { key: "settings", icon: Settings, label: "Settings" },
];

export function Sidebar({ currentPage, setCurrentPage }: { currentPage: string; setCurrentPage: (page: string) => void }) {
  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen bg-white border-r border-slate-200 shadow-sm sticky top-0 z-30">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
            <img src="https://i.postimg.cc/sX5XGLk8/Ready-pips-black-ligo-removebg-preview-(2).png" alt="ReadyPips" className="w-full h-full object-contain" />
          </div>
          <span className="font-bold text-xl text-slate-900">ReadyPips</span>
        </div>

        <div className="flex flex-col items-center text-center mb-6">
          <Avatar className="w-20 h-20 mb-3 border-4 border-violet-50">
            <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=face" alt="Ahmed Bader" />
            <AvatarFallback className="bg-violet-600 text-white text-xl">AB</AvatarFallback>
          </Avatar>
          <h3 className="font-semibold text-slate-900">Ahmed Bader</h3>
          <div className="flex items-center gap-1 text-xs text-slate-500 mt-1"><CheckCircle2 className="w-3 h-3 text-blue-500" /><span>Premium Member</span></div>
        </div>

        <Button className="w-full justify-start gap-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl h-12 mb-6 group transition-all hover:shadow-md hover:-translate-y-0.5">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <div className="text-left">
            <div className="text-sm font-semibold">Return to Website</div>
            <div className="text-xs text-white/80">Go back to Ready Pips website</div>
          </div>
        </Button>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.key;
            return (
              <button key={item.key} onClick={() => setCurrentPage(item.key)} className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive ? "bg-violet-50 text-violet-700 font-semibold" : "text-slate-600 hover:bg-violet-50 hover:text-violet-700"}`}>
                <Icon className={`w-5 h-5 ${isActive ? "text-violet-600" : "text-slate-500"}`} />
                <span>{item.label}</span>
                {isActive && <div className="ml-auto w-1 h-1 rounded-full bg-violet-600" />}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6">
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center"><Crown className="w-5 h-5 text-amber-500" /></div>
            <div><p className="font-semibold text-slate-900 text-sm">Premium Plan</p><p className="text-xs text-slate-500">Renews on 25 Nov 2023</p></div>
          </div>
          <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white rounded-xl">Manage Plan</Button>
        </div>
      </div>
    </aside>
  );
}