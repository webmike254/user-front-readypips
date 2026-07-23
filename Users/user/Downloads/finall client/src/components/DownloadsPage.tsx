import { useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  FileText,
  Video,
  BookOpen,
  Image,
  File,
  Archive,
  FileSpreadsheet,
  Presentation,
  Search,
  Filter,
  Clock,
  HardDrive,
  CheckCircle2,
  Eye,
  FolderOpen,
  Star,
  Lock,
  ChevronRight,
  Package,
  Headphones,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type FileCategory = "all" | "courses" | "tools" | "templates" | "signals";

const downloads = [
  { id: 1, name: "Forex Fundamentals Course Pack", description: "Complete course materials, slides, and cheat sheets.", category: "courses" as FileCategory, type: "PDF + ZIP", size: "245 MB", date: "Oct 15, 2023", icon: BookOpen, downloaded: true, premium: false, popular: true },
  { id: 2, name: "Advanced Price Action Guide", description: "In-depth price action strategies with annotated chart examples.", category: "courses" as FileCategory, type: "PDF", size: "38 MB", date: "Nov 3, 2023", icon: FileText, downloaded: true, premium: false, popular: true },
  { id: 3, name: "Risk Management Toolkit", description: "Risk calculator, position sizing tool, drawdown tracker.", category: "tools" as FileCategory, type: "XLSX + PDF", size: "12 MB", date: "Nov 5, 2023", icon: FileSpreadsheet, downloaded: false, premium: false, popular: false },
  { id: 4, name: "Trading Journal Template", description: "Professional journal with analytics and performance tracking.", category: "templates" as FileCategory, type: "XLSX", size: "5.2 MB", date: "Oct 20, 2023", icon: Presentation, downloaded: true, premium: false, popular: true },
  { id: 5, name: "Candlestick Pattern Flashcards", description: "Quick-reference cards for 35 candlestick patterns.", category: "courses" as FileCategory, type: "PDF", size: "18 MB", date: "Sep 28, 2023", icon: Image, downloaded: false, premium: false, popular: false },
  { id: 6, name: "Weekly Signal Report Archive", description: "Historical weekly signal reports with performance analysis.", category: "signals" as FileCategory, type: "PDF", size: "156 MB", date: "Nov 1, 2023", icon: FileText, downloaded: false, premium: true, popular: true },
  { id: 7, name: "Scalping Strategy Pack", description: "Complete scalping strategies with backtesting results.", category: "courses" as FileCategory, type: "ZIP", size: "89 MB", date: "Oct 5, 2023", icon: Archive, downloaded: false, premium: true, popular: true },
  { id: 8, name: "Market Analysis Spreadsheet", description: "Multi-pair analysis template with scoring.", category: "tools" as FileCategory, type: "XLSX", size: "7.4 MB", date: "Sep 22, 2023", icon: FileSpreadsheet, downloaded: false, premium: false, popular: false },
  { id: 9, name: "Psychology of Trading Audiobook", description: "Mental strategies for consistent performance.", category: "courses" as FileCategory, type: "MP3 + PDF", size: "320 MB", date: "Sep 15, 2023", icon: Headphones, downloaded: false, premium: true, popular: false },
];

const quickAccess = [
  { name: "Course Materials", count: 12, icon: BookOpen },
  { name: "Trading Tools", count: 5, icon: Star },
  { name: "Templates", count: 8, icon: Presentation },
  { name: "Signal Reports", count: 24, icon: FileText },
];

export function DownloadsPage() {
  const [activeTab, setActiveTab] = useState<FileCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [downloadedItems, setDownloadedItems] = useState<Set<number>>(new Set([1, 2, 4]));

  const toggleDownloaded = (id: number) => {
    setDownloadedItems((prev) => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  };

  const filtered = downloads.filter((d) => {
    const matchesTab = activeTab === "all" || d.category === activeTab;
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15 }} className="space-y-10 pb-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-[40px] font-bold text-text-primary">Downloads</h1>
          <p className="text-text-secondary text-[15px] mt-1">Access your course materials, tools, and trading resources.</p>
        </div>
        <Button className="bg-primary hover:bg-primary-hover text-white rounded-button h-9 px-4 text-[13px] font-medium transition-all duration-150 hover:-translate-y-px"><Download className="w-4 h-4 mr-1.5" /> Download All</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Files", value: "62", icon: File },
          { label: "Downloaded", value: "28", icon: CheckCircle2 },
          { label: "Storage Used", value: "1.8 GB", icon: HardDrive },
          { label: "Premium Files", value: "15", icon: Lock },
        ].map((s) => {
          const Icon = s.icon;
          return <Card key={s.label} className="rounded-[18px] border-border shadow-card"><CardContent className="p-5"><Icon className="w-4 h-4 text-primary mb-2" /><p className="text-lg font-semibold text-text-primary">{s.value}</p><p className="text-[13px] text-text-muted">{s.label}</p></CardContent></Card>;
        })}
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex-1 min-w-0 space-y-6">
          <Card className="rounded-[18px] border-border shadow-card">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="w-1 h-8 rounded-full bg-primary" />
                <div className="flex-1">
                  <h3 className="font-medium text-[15px] text-text-primary">Weekly Signal Report — Week 45</h3>
                  <p className="text-[13px] text-text-muted">12 high-probability setups with detailed analysis. Updated Nov 5.</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="rounded-button border-border text-text-secondary hover:bg-primary/5 hover:text-primary text-[13px] h-8"><Eye className="w-3.5 h-3.5 mr-1" /> Preview</Button>
                  <Button size="sm" className="bg-primary hover:bg-primary-hover text-white rounded-button text-[13px] h-8 font-medium transition-all duration-150 hover:-translate-y-px"><Download className="w-3.5 h-3.5 mr-1" /> Download</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search files..." className="rounded-button border-border bg-bg pl-10 h-9 text-[13px]" />
          </div>

          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as FileCategory)}>
            <TabsList className="bg-bg rounded-button p-1">
              <TabsTrigger value="all" className="rounded-button text-[13px] data-[state=active]:bg-white data-[state=active]:shadow-card data-[state=active]:text-text-primary">All</TabsTrigger>
              <TabsTrigger value="courses" className="rounded-button text-[13px] data-[state=active]:bg-white data-[state=active]:shadow-card data-[state=active]:text-text-primary">Courses</TabsTrigger>
              <TabsTrigger value="tools" className="rounded-button text-[13px] data-[state=active]:bg-white data-[state=active]:shadow-card data-[state=active]:text-text-primary">Tools</TabsTrigger>
              <TabsTrigger value="templates" className="rounded-button text-[13px] data-[state=active]:bg-white data-[state=active]:shadow-card data-[state=active]:text-text-primary">Templates</TabsTrigger>
              <TabsTrigger value="signals" className="rounded-button text-[13px] data-[state=active]:bg-white data-[state=active]:shadow-card data-[state=active]:text-text-primary">Signals</TabsTrigger>
            </TabsList>

            <div className="space-y-2 mt-4">
              {filtered.map((item) => {
                const Icon = item.icon;
                const isDownloaded = downloadedItems.has(item.id);
                return (
                  <Card key={item.id} className="rounded-[18px] border-border shadow-card hover:shadow-card-hover transition-shadow duration-150">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-button bg-primary/8 flex items-center justify-center shrink-0"><Icon className="w-4 h-4 text-primary" /></div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-[13px] text-text-primary truncate">{item.name}</h4>
                            {item.popular && <Badge className="bg-warning/10 text-warning hover:bg-warning/10 rounded text-[10px] border-0">Popular</Badge>}
                            {item.premium && <Badge className="bg-primary/8 text-primary hover:bg-primary/8 rounded text-[10px] border-0"><Lock className="w-3 h-3 mr-0.5" /> Premium</Badge>}
                          </div>
                          <p className="text-[12px] text-text-muted truncate">{item.description}</p>
                        </div>
                        <div className="flex items-center gap-2 text-[12px] text-text-muted shrink-0">
                          <span>{item.type}</span>
                          <span>·</span>
                          <span>{item.size}</span>
                        </div>
                        {isDownloaded ? (
                          <div className="flex items-center gap-1.5 shrink-0">
                            <CheckCircle2 className="w-4 h-4 text-success" />
                            <Button size="icon" variant="ghost" className="h-7 w-7 rounded text-text-muted hover:text-danger hover:bg-danger/5" onClick={() => toggleDownloaded(item.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
                          </div>
                        ) : (
                          <Button onClick={() => toggleDownloaded(item.id)} className="bg-primary hover:bg-primary-hover text-white rounded-button h-8 px-3 text-[13px] font-medium shrink-0 transition-all duration-150 hover:-translate-y-px"><Download className="w-3.5 h-3.5 mr-1" /> Get</Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
              {filtered.length === 0 && (
                <Card className="rounded-[18px] border-border shadow-card"><CardContent className="p-8 text-center"><FolderOpen className="w-8 h-8 text-text-muted mx-auto mb-2" /><p className="text-[15px] font-medium text-text-primary">No files found</p><p className="text-[13px] text-text-muted">Try adjusting your search or filter.</p></CardContent></Card>
              )}
            </div>
          </Tabs>
        </div>

        <div className="w-full xl:w-80 space-y-6">
          <Card className="rounded-[18px] border-border shadow-card">
            <CardHeader><CardTitle className="text-base font-semibold text-text-primary flex items-center gap-2"><HardDrive className="w-4 h-4 text-primary" /> Storage</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-[13px]"><span className="text-text-muted">1.8 GB used</span><span className="font-medium text-text-primary">5.2 GB</span></div>
              <Progress value={35} className="h-2" />
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-button bg-bg text-center"><p className="font-semibold text-text-primary">28</p><p className="text-[11px] text-text-muted">Downloaded</p></div>
                <div className="p-3 rounded-button bg-bg text-center"><p className="font-semibold text-text-primary">34</p><p className="text-[11px] text-text-muted">Remaining</p></div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[18px] border-border shadow-card">
            <CardHeader><CardTitle className="text-base font-semibold text-text-primary flex items-center gap-2"><FolderOpen className="w-4 h-4 text-primary" /> Quick Access</CardTitle></CardHeader>
            <CardContent className="space-y-1.5">
              {quickAccess.map((f) => {
                const Icon = f.icon;
                return <div key={f.name} className="flex items-center gap-2.5 p-2 rounded-button hover:bg-primary/5 transition-colors duration-150 cursor-pointer"><Icon className="w-4 h-4 text-primary" /><div className="flex-1"><p className="text-[13px] font-medium text-text-primary">{f.name}</p><p className="text-[11px] text-text-muted">{f.count} files</p></div><ChevronRight className="w-3.5 h-3.5 text-text-muted" /></div>;
              })}
            </CardContent>
          </Card>

          <Card className="rounded-[18px] border-border shadow-card">
            <CardHeader><CardTitle className="text-base font-semibold text-text-primary">Recent Downloads</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {downloads.filter(d => downloadedItems.has(d.id)).slice(0, 4).map((item) => {
                const Icon = item.icon;
                return <div key={item.id} className="flex items-center gap-2.5 p-1.5 rounded-button hover:bg-primary/5 transition-colors duration-150 cursor-pointer"><div className="w-7 h-7 rounded bg-primary/8 flex items-center justify-center"><Icon className="w-3.5 h-3.5 text-primary" /></div><div className="flex-1 min-w-0"><p className="text-[13px] font-medium text-text-primary truncate">{item.name}</p><p className="text-[11px] text-text-muted">{item.size}</p></div><CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" /></div>;
              })}
            </CardContent>
          </Card>

          <Card className="rounded-[18px] border-border shadow-card">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-button bg-primary/8 flex items-center justify-center"><Package className="w-4 h-4 text-primary" /></div>
                <div><p className="font-medium text-[13px] text-text-primary">Bulk Download</p><p className="text-[11px] text-text-muted">Get all files at once</p></div>
              </div>
              <Button className="w-full bg-primary hover:bg-primary-hover text-white rounded-button h-9 text-[13px] font-medium transition-all duration-150 hover:-translate-y-px"><Download className="w-4 h-4 mr-1.5" /> Download All (1.8 GB)</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
