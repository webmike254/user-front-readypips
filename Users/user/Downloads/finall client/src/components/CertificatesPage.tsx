import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  X,
  Printer,
  Linkedin,
  Twitter,
  Copy,
  Check,
  ZoomIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const certificates = [
  { id: 1, title: "Forex Fundamentals Mastery", course: "Forex Fundamentals", issuedDate: "Oct 12, 2023", id_: "RP-CERT-2023-0847", grade: "A+", score: 96, skills: ["Currency Pairs", "Market Analysis", "Order Types", "Pip Calculation"], image: "/certificate-init.png", status: "earned" as const },
  { id: 2, title: "Advanced Price Action Specialist", course: "Advanced Price Action", issuedDate: "Nov 3, 2023", id_: "RP-CERT-2023-0921", grade: "A", score: 89, skills: ["Candlestick Patterns", "Support & Resistance", "Chart Patterns", "Trend Lines"], image: "/certificate-init.png", status: "earned" as const },
  { id: 3, title: "Risk Management Professional", course: "Risk Management Masterclass", issuedDate: "", id_: "", grade: "", score: 72, skills: ["Position Sizing", "Drawdown Management", "Risk-Reward Ratio"], image: "/certificate-init.png", status: "in_progress" as const },
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

function CertificateViewer({ cert, onClose }: { cert: typeof certificates[0]; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  const copyId = () => {
    navigator.clipboard.writeText(cert.id_);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className={cn(
          "bg-white rounded-[24px] shadow-2xl overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto",
          zoomed && "max-w-5xl"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white z-10 border-b border-border p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-button bg-primary/8 flex items-center justify-center">
              <Award className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">{cert.title}</h3>
              <p className="text-[12px] text-text-muted">{cert.id_} · {cert.issuedDate}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoomed(!zoomed)}
              className="p-2 rounded-button hover:bg-bg text-text-muted transition-colors"
              title={zoomed ? "Zoom out" : "Zoom in"}
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button onClick={onClose} className="p-2 rounded-button hover:bg-danger/5 text-text-muted hover:text-danger transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="relative rounded-[18px] overflow-hidden border border-border shadow-card mb-6">
            <img
              src={cert.image}
              alt={cert.title}
              className={cn(
                "w-full object-contain transition-all duration-300",
                zoomed ? "max-h-[70vh]" : "max-h-[400px]"
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button className="bg-primary hover:bg-primary-hover text-white rounded-button h-10 text-[13px] font-medium transition-all">
              <Download className="w-4 h-4 mr-1.5" /> Download PDF
            </Button>
            <Button variant="outline" className="rounded-button border-border text-text-secondary hover:bg-primary/5 hover:text-primary text-[13px] h-10">
              <Printer className="w-4 h-4 mr-1.5" /> Print
            </Button>
            <Button variant="outline" className="rounded-button border-border text-text-secondary hover:bg-primary/5 hover:text-primary text-[13px] h-10">
              <Share2 className="w-4 h-4 mr-1.5" /> Share
            </Button>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-[18px] bg-bg">
              <p className="text-[12px] text-text-muted mb-1">Certificate ID</p>
              <div className="flex items-center gap-2">
                <code className="text-[13px] font-mono text-text-primary">{cert.id_}</code>
                <button onClick={copyId} className="p-1 rounded hover:bg-primary/10 text-primary transition-colors">
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
            <div className="p-4 rounded-[18px] bg-bg">
              <p className="text-[12px] text-text-muted mb-1">Verification URL</p>
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-primary truncate">https://readypips.com/verify/{cert.id_}</span>
                <button onClick={copyId} className="p-1 rounded hover:bg-primary/10 text-primary transition-colors">
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-[12px] text-text-muted">Share on:</span>
            <button className="p-2 rounded-button bg-[#0077B5]/10 text-[#0077B5] hover:bg-[#0077B5]/20 transition-colors">
              <Linkedin className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-button bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2]/20 transition-colors">
              <Twitter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function CertificatesPage() {
  const [activeTab, setActiveTab] = useState("earned");
  const [selectedCert, setSelectedCert] = useState<typeof certificates[0] | null>(null);

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15 }} className="space-y-10 pb-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-[40px] font-bold text-text-primary">Certificates</h1>
          <p className="text-text-secondary text-[15px] mt-1">Your earned certificates and achievements.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="rounded-button border-border text-text-secondary hover:bg-primary/5 hover:text-primary hover:border-primary/20 text-[13px] h-9">
            <Share2 className="w-4 h-4 mr-1.5" /> Share Profile
          </Button>
          <Button className="bg-primary hover:bg-primary-hover text-white rounded-button text-[13px] font-medium h-9 px-4 transition-all duration-150 hover:-translate-y-px">
            <ExternalLink className="w-4 h-4 mr-1.5" /> Public Portfolio
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {achievements.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.05, duration: 0.2 }}
            >
              <Card className="rounded-[18px] border-border shadow-card hover:shadow-card-hover transition-shadow duration-200">
                <CardContent className="p-5">
                  <Icon className="w-4 h-4 text-primary mb-2" />
                  <p className="text-lg font-semibold text-text-primary">{s.value}</p>
                  <p className="text-[13px] text-text-muted">{s.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Featured Certificate Preview */}
      <Card className="rounded-[18px] border-border shadow-card overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-button bg-primary/8 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-text-primary">Forex Fundamentals Mastery</h2>
                  <p className="text-[13px] text-text-muted">RP-CERT-2023-0847 · Issued Oct 12, 2023</p>
                </div>
              </div>
              <p className="text-[13px] text-text-secondary mb-4">
                Awarded for completing the Forex Fundamentals course with distinction.
                This certificate verifies proficiency in currency pairs, market analysis, order types, and pip calculations.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {["Currency Pairs", "Market Analysis", "Order Types", "Pip Calculation"].map((skill) => (
                  <Badge key={skill} variant="outline" className="rounded text-[10px] border-border text-text-secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  className="bg-primary hover:bg-primary-hover text-white rounded-button h-9 text-[13px] font-medium transition-all"
                  onClick={() => setSelectedCert(certificates[0])}
                >
                  <Eye className="w-4 h-4 mr-1.5" /> View Certificate
                </Button>
                <Button variant="outline" className="rounded-button border-border text-text-secondary hover:bg-primary/5 hover:text-primary text-[13px] h-9">
                  <Download className="w-4 h-4 mr-1.5" /> Download
                </Button>
              </div>
            </div>
            <div
              className="w-full lg:w-[320px] rounded-[12px] overflow-hidden border border-border shadow-card cursor-pointer hover:shadow-card-hover transition-shadow"
              onClick={() => setSelectedCert(certificates[0])}
            >
              <img
                src="/certificate-init.png"
                alt="Certificate Preview"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex-1 min-w-0 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-bg rounded-button p-1">
              <TabsTrigger value="earned" className="rounded-button text-[13px] data-[state=active]:bg-white data-[state=active]:shadow-card data-[state=active]:text-text-primary">Earned</TabsTrigger>
              <TabsTrigger value="in_progress" className="rounded-button text-[13px] data-[state=active]:bg-white data-[state=active]:shadow-card data-[state=active]:text-text-primary">In Progress</TabsTrigger>
              <TabsTrigger value="available" className="rounded-button text-[13px] data-[state=active]:bg-white data-[state=active]:shadow-card data-[state=active]:text-text-primary">Available</TabsTrigger>
            </TabsList>

            <TabsContent value="earned" className="space-y-3 mt-4">
              {certificates.filter(c => c.status === "earned").map((cert, i) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                >
                  <Card className="rounded-[18px] border-border shadow-card hover:shadow-card-hover transition-shadow duration-200">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-4">
                        <div
                          className="w-24 h-16 rounded-button overflow-hidden border border-border cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => setSelectedCert(cert)}
                        >
                          <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" />
                        </div>
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
                          <div className="flex items-center gap-1.5 mt-1">
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-button border-border text-primary hover:bg-primary/5 text-[13px] h-7"
                              onClick={() => setSelectedCert(cert)}
                            >
                              <Eye className="w-3 h-3 mr-1" /> View
                            </Button>
                            <Button variant="outline" size="sm" className="rounded-button border-border text-primary hover:bg-primary/5 text-[13px] h-7">
                              <Download className="w-3 h-3 mr-1" /> PDF
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="in_progress" className="space-y-3 mt-4">
              {certificates.filter(c => c.status === "in_progress").map((cert, i) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                >
                  <Card className="rounded-[18px] border-border shadow-card">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-4">
                        <div className="w-24 h-16 rounded-button bg-bg flex items-center justify-center border border-border">
                          <Lock className="w-5 h-5 text-text-muted" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-0.5">
                            <h3 className="font-medium text-[15px] text-text-primary">{cert.title}</h3>
                            <Badge className="bg-primary/8 text-primary hover:bg-primary/8 rounded text-[10px] border-0">In Progress</Badge>
                          </div>
                          <p className="text-[13px] text-text-muted">{cert.course}</p>
                          <div className="w-48 mt-2">
                            <div className="flex justify-between text-[13px] mb-1">
                              <span className="text-text-muted">Progress</span>
                              <span className="font-medium text-text-primary">{cert.score}%</span>
                            </div>
                            <Progress value={cert.score} className="h-1.5" />
                          </div>
                        </div>
                        <Button className="bg-primary hover:bg-primary-hover text-white rounded-button h-8 px-4 text-[13px] font-medium transition-all duration-150 hover:-translate-y-px">
                          <BookOpen className="w-3.5 h-3.5 mr-1" /> Continue
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="available" className="space-y-3 mt-4">
              {availableCerts.map((cert, i) => {
                const Icon = cert.icon;
                return (
                  <motion.div
                    key={cert.title}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.2 }}
                  >
                    <Card className="rounded-[18px] border-border shadow-card hover:border-primary/30 transition-colors duration-150 cursor-pointer">
                      <CardContent className="p-5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-button bg-primary/8 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-[15px] text-text-primary">{cert.title}</h3>
                            <p className="text-[13px] text-text-muted">{cert.course} · Required: {cert.requiredScore}%</p>
                          </div>
                          <Button variant="outline" className="rounded-button border-border text-primary hover:bg-primary/5 text-[13px] h-8">
                            {cert.progress > 0 ? "Continue" : "Enroll"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </TabsContent>
          </Tabs>
        </div>

        <div className="w-full xl:w-80 space-y-6">
          <Card className="rounded-[18px] border-border shadow-card">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-text-primary">Certificate Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-text-muted">Earned</span>
                <span className="font-medium text-text-primary">2 of 7</span>
              </div>
              <Progress value={28} className="h-1.5" />
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-button bg-bg text-center">
                  <p className="font-semibold text-text-primary">A+</p>
                  <p className="text-[11px] text-text-muted">Best Grade</p>
                </div>
                <div className="p-3 rounded-button bg-bg text-center">
                  <p className="font-semibold text-text-primary">92%</p>
                  <p className="text-[11px] text-text-muted">Avg Score</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[18px] border-border shadow-card">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-text-primary flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" /> Skills
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1.5">
              {["Currency Pairs", "Market Analysis", "Order Types", "Pip Calculation", "Candlestick Patterns", "Support & Resistance", "Chart Patterns", "Trend Lines", "Position Sizing", "Drawdown Management", "Risk-Reward Ratio"].map((skill, i) => (
                <div key={skill} className="flex items-center gap-2 text-[13px]">
                  <CheckCircle2 className={cn("w-3.5 h-3.5 shrink-0", i < 8 ? "text-success" : "text-border")} />
                  <span className={i < 8 ? "text-text-primary" : "text-text-muted"}>{skill}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-[18px] border-border shadow-card">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-text-primary flex items-center gap-2">
                <Shield className="w-4 h-4 text-success" /> Verification
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1.5 text-[13px] text-text-secondary">
              <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-success" /> Blockchain-verified</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-success" /> Shareable on LinkedIn</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-success" /> Unique verification URL</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-success" /> Employer-verifiable</div>
            </CardContent>
          </Card>

          <Card className="rounded-[18px] border-border shadow-card">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-text-primary flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" /> Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { label: "Earned Advanced Price Action", time: "Nov 3", type: "earned" },
                { label: "Started Risk Management", time: "Nov 5", type: "started" },
                { label: "Earned Forex Fundamentals", time: "Oct 12", type: "earned" },
              ].map((a) => (
                <div key={a.label} className="flex items-center gap-2 p-1.5">
                  <div className={cn("w-1.5 h-1.5 rounded-full", a.type === "earned" ? "bg-warning" : "bg-primary")} />
                  <div className="flex-1">
                    <p className="text-[13px] text-text-primary">{a.label}</p>
                    <p className="text-[11px] text-text-muted">{a.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <AnimatePresence>
        {selectedCert && (
          <CertificateViewer cert={selectedCert} onClose={() => setSelectedCert(null)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
