import { useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  Download,
  Share2,
  Eye,
  Star,
  Trophy,
  Calendar,
  BookOpen,
  Shield,
  Lock,
  CheckCircle2,
  ExternalLink,
  FileText,
  Clock,
  Target,
  Flame,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const certificates = [
  { id: 1, title: "Forex Fundamentals Mastery", course: "Forex Fundamentals", issuedDate: "Oct 12, 2023", id_: "RP-CERT-2023-0847", grade: "A+", score: 96, skills: ["Currency Pairs", "Market Analysis", "Order Types", "Pip Calculation"], image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=250&fit=crop", status: "earned" as const },
  { id: 2, title: "Advanced Price Action Specialist", course: "Advanced Price Action", issuedDate: "Nov 3, 2023", id_: "RP-CERT-2023-0921", grade: "A", score: 89, skills: ["Candlestick Patterns", "Support & Resistance", "Chart Patterns", "Trend Lines"], image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop", status: "earned" as const },
  { id: 3, title: "Risk Management Professional", course: "Risk Management Masterclass", issuedDate: "", id_: "", grade: "", score: 72, skills: ["Position Sizing", "Drawdown Management", "Risk-Reward Ratio"], image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop", status: "in_progress" as const },
];

const availableCerts = [
  { title: "Scalping Strategies Expert", course: "Scalping Masterclass", progress: 30, requiredScore: 80, icon: Target },
  { title: "Trading Psychology Specialist", course: "Trading Psychology", progress: 15, requiredScore: 75, icon: Flame },
  { title: "Technical Analysis Pro", course: "Technical Analysis Deep Dive", progress: 0, requiredScore: 85, icon: Shield },
];

const achievements = [
  { label: "Certificates Earned", value: "2", icon: Award },
  { label: "Skills Verified", value: "11", icon: CheckCircle2 },
  { label: "Courses Completed", value: "3", icon: BookOpen },
  { label: "Average Score", value: "92%", icon: Star },
];

export function CertificatesPage() {
  const [activeTab, setActiveTab] = useState("earned");

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15 }} className="space-y-10 pb-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-[40px] font-bold text-text-primary">Certificates</h1>
          <p className="text-text-secondary text-[15px] mt-1">Your earned certificates and achievements.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="rounded-button border-border text-text-secondary hover:bg-primary/5 hover:text-primary hover:border-primary/20 text-[13px] h-9"><Share2 className="w-4 h-4 mr-1.5" /> Share Profile</Button>
          <Button className="bg-primary hover:bg-primary-hover text-white rounded-button text-[13px] font-medium h-9 px-4 transition-all duration-150 hover:-translate-y-px"><ExternalLink className="w-4 h-4 mr-1.5" /> Public Portfolio</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {achievements.map((s, i) => {
          const Icon = s.icon;
          return <Card key={s.label} className="rounded-[18px] border-border shadow-card"><CardContent className="p-5"><Icon className="w-4 h-4 text-primary mb-2" /><p className="text-lg font-semibold text-text-primary">{s.value}</p><p className="text-[13px] text-text-muted">{s.label}</p></CardContent></Card>;
        })}
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex-1 min-w-0 space-y-6">
          <Card className="rounded-[18px] border-border shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-button bg-primary/8 flex items-center justify-center"><Trophy className="w-6 h-6 text-primary" /></div>
                <div className="flex-1">
                  <div className="flex items-center gap-2"><h2 className="text-lg font-semibold text-text-primary">Forex Fundamentals Mastery</h2><Badge className="bg-success/10 text-success hover:bg-success/10 rounded text-[10px] border-0">A+</Badge></div>
                  <p className="text-[13px] text-text-muted mt-0.5">Score: 96% · Issued Oct 12, 2023 · RP-CERT-2023-0847</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="rounded-button border-border text-text-secondary hover:bg-primary/5 hover:text-primary text-[13px] h-8"><Download className="w-3.5 h-3.5 mr-1" /> PDF</Button>
                  <Button variant="outline" size="sm" className="rounded-button border-border text-text-secondary hover:bg-primary/5 hover:text-primary text-[13px] h-8"><Share2 className="w-3.5 h-3.5 mr-1" /> Share</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-bg rounded-button p-1">
              <TabsTrigger value="earned" className="rounded-button text-[13px] data-[state=active]:bg-white data-[state=active]:shadow-card data-[state=active]:text-text-primary">Earned</TabsTrigger>
              <TabsTrigger value="in_progress" className="rounded-button text-[13px] data-[state=active]:bg-white data-[state=active]:shadow-card data-[state=active]:text-text-primary">In Progress</TabsTrigger>
              <TabsTrigger value="available" className="rounded-button text-[13px] data-[state=active]:bg-white data-[state=active]:shadow-card data-[state=active]:text-text-primary">Available</TabsTrigger>
            </TabsList>

            <TabsContent value="earned" className="space-y-3 mt-4">
              {certificates.filter(c => c.status === "earned").map((cert) => (
                <Card key={cert.id} className="rounded-[18px] border-border shadow-card hover:shadow-card-hover transition-shadow duration-150">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-4">
                      <img src={cert.image} alt={cert.title} className="w-24 h-16 object-cover rounded-button" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="font-medium text-[15px] text-text-primary">{cert.title}</h3>
                          <Badge className="bg-warning/10 text-warning hover:bg-warning/10 rounded text-[10px] border-0">{cert.grade}</Badge>
                        </div>
                        <p className="text-[13px] text-text-muted">{cert.course}</p>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {cert.skills.map((skill) => <Badge key={skill} variant="outline" className="rounded text-[10px] border-border text-text-secondary">{skill}</Badge>)}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                        <span className="text-[13px] text-text-muted flex items-center gap-1"><Star className="w-3 h-3 text-primary" /> {cert.score}%</span>
                        <span className="text-[11px] text-text-muted flex items-center gap-1"><FileText className="w-3 h-3" /> {cert.id_}</span>
                        <Button variant="outline" size="sm" className="rounded-button border-border text-primary hover:bg-primary/5 text-[13px] h-7 mt-1"><Download className="w-3 h-3 mr-1" /> Download</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="in_progress" className="space-y-3 mt-4">
              {certificates.filter(c => c.status === "in_progress").map((cert) => (
                <Card key={cert.id} className="rounded-[18px] border-border shadow-card">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-16 rounded-button bg-bg flex items-center justify-center"><Lock className="w-5 h-5 text-text-muted" /></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-0.5"><h3 className="font-medium text-[15px] text-text-primary">{cert.title}</h3><Badge className="bg-primary/8 text-primary hover:bg-primary/8 rounded text-[10px] border-0">In Progress</Badge></div>
                        <p className="text-[13px] text-text-muted">{cert.course}</p>
                        <div className="w-48 mt-2"><div className="flex justify-between text-[13px] mb-1"><span className="text-text-muted">Progress</span><span className="font-medium text-text-primary">{cert.score}%</span></div><Progress value={cert.score} className="h-1.5" /></div>
                      </div>
                      <Button className="bg-primary hover:bg-primary-hover text-white rounded-button h-8 px-4 text-[13px] font-medium transition-all duration-150 hover:-translate-y-px"><BookOpen className="w-3.5 h-3.5 mr-1" /> Continue</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="available" className="space-y-3 mt-4">
              {availableCerts.map((cert) => {
                const Icon = cert.icon;
                return (
                  <Card key={cert.title} className="rounded-[18px] border-border shadow-card hover:border-primary/30 transition-colors duration-150 cursor-pointer">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-button bg-primary/8 flex items-center justify-center"><Icon className="w-5 h-5 text-primary" /></div>
                        <div className="flex-1"><h3 className="font-medium text-[15px] text-text-primary">{cert.title}</h3><p className="text-[13px] text-text-muted">{cert.course} · Required: {cert.requiredScore}%</p></div>
                        <Button variant="outline" className="rounded-button border-border text-primary hover:bg-primary/5 text-[13px] h-8">{cert.progress > 0 ? "Continue" : "Enroll"}</Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </TabsContent>
          </Tabs>
        </div>

        <div className="w-full xl:w-80 space-y-6">
          <Card className="rounded-[18px] border-border shadow-card">
            <CardHeader><CardTitle className="text-base font-semibold text-text-primary">Certificate Stats</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-[13px]"><span className="text-text-muted">Earned</span><span className="font-medium text-text-primary">2 of 7</span></div>
              <Progress value={28} className="h-1.5" />
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-button bg-bg text-center"><p className="font-semibold text-text-primary">A+</p><p className="text-[11px] text-text-muted">Best Grade</p></div>
                <div className="p-3 rounded-button bg-bg text-center"><p className="font-semibold text-text-primary">92%</p><p className="text-[11px] text-text-muted">Avg Score</p></div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[18px] border-border shadow-card">
            <CardHeader><CardTitle className="text-base font-semibold text-text-primary flex items-center gap-2"><Sparkles className="w-4 h-4 text-primary" /> Skills</CardTitle></CardHeader>
            <CardContent className="space-y-1.5">
              {["Currency Pairs", "Market Analysis", "Order Types", "Pip Calculation", "Candlestick Patterns", "Support & Resistance", "Chart Patterns", "Trend Lines", "Position Sizing", "Drawdown Management", "Risk-Reward Ratio"].map((skill, i) => (
                <div key={skill} className="flex items-center gap-2 text-[13px]"><CheckCircle2 className={cn("w-3.5 h-3.5 shrink-0", i < 8 ? "text-success" : "text-border")} /><span className={i < 8 ? "text-text-primary" : "text-text-muted"}>{skill}</span></div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-[18px] border-border shadow-card">
            <CardHeader><CardTitle className="text-base font-semibold text-text-primary flex items-center gap-2"><Shield className="w-4 h-4 text-success" /> Verification</CardTitle></CardHeader>
            <CardContent className="space-y-1.5 text-[13px] text-text-secondary">
              <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-success" /> Blockchain-verified</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-success" /> Shareable on LinkedIn</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-success" /> Unique verification URL</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-success" /> Employer-verifiable</div>
            </CardContent>
          </Card>

          <Card className="rounded-[18px] border-border shadow-card">
            <CardHeader><CardTitle className="text-base font-semibold text-text-primary flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> Activity</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {[
                { label: "Earned Advanced Price Action", time: "Nov 3", type: "earned" },
                { label: "Started Risk Management", time: "Nov 5", type: "started" },
                { label: "Earned Forex Fundamentals", time: "Oct 12", type: "earned" },
              ].map((a) => (
                <div key={a.label} className="flex items-center gap-2 p-1.5"><div className={cn("w-1.5 h-1.5 rounded-full", a.type === "earned" ? "bg-warning" : "bg-primary")} /><div className="flex-1"><p className="text-[13px] text-text-primary">{a.label}</p><p className="text-[11px] text-text-muted">{a.time}</p></div></div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
