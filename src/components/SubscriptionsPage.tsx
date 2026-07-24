import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Crown,
  Zap,
  Check,
  ArrowRight,
  CreditCard,
  Smartphone,
  Bitcoin,
  Building2,
  Download,
  Clock,
  Shield,
  HelpCircle,
  MessageCircle,
  Mail,
  FileText,
  Copy,
  ChevronRight,
  Trophy,
  TrendingUp,
  TrendingDown,
  Wallet,
  RefreshCcw,
  Upload,
  DollarSign,
  Percent,
  Users,
  Calendar,
  Lock,
  Sparkles,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Receipt,
  Landmark,
  CircleDollarSign,
  BarChart3,
  Target,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Diamond Challenge",
    price: "$5,000",
    popular: true,
    features: [
      "Unlimited Course Access",
      "Private Community",
      "VIP Signals",
      "TradingView Premium Access",
      "Weekly Live Mentorship",
      "Weekly Challenge Entry",
      "Priority Support",
      "Funding Dashboard",
      "Certificate Access",
      "Exclusive Resources",
    ],
  },
  {
    name: "Platinum Challenge",
    price: "$2,500",
    features: [
      "Unlimited Course Access",
      "Private Community",
      "VIP Signals",
      "Weekly Live Mentorship",
      "Funding Dashboard",
      "Priority Support",
    ],
  },
  {
    name: "Gold Challenge",
    price: "$1,250",
    features: [
      "Full Course Library",
      "Community Access",
      "Weekly Signals",
      "Live Mentorship",
      "Funding Dashboard",
    ],
  },
  {
    name: "Silver Challenge",
    price: "$650",
    features: ["Core Courses", "Community Access", "Weekly Signals", "Certificates"],
  },
  {
    name: "Bronze Challenge",
    price: "$300",
    features: ["Starter Courses", "Community Access", "Basic Signals"],
  },
  {
    name: "Starter Challenge",
    price: "$150",
    features: ["Beginner Courses", "Community Access"],
  },
  {
    name: "Beginner Challenge",
    price: "$75",
    features: ["Introductory Course", "Community Access"],
  },
];

const billingHistory = [
  { id: "INV-2023-001", date: "Oct 22, 2023", plan: "Premium Membership", amount: "$99.00", method: "M-Pesa", status: "Paid" },
  { id: "INV-2023-002", date: "Sep 22, 2023", plan: "Premium Membership", amount: "$99.00", method: "M-Pesa", status: "Paid" },
  { id: "INV-2023-003", date: "Aug 22, 2023", plan: "Challenge Entry", amount: "$42.99", method: "Card", status: "Paid" },
  { id: "INV-2023-004", date: "Jul 22, 2023", plan: "Premium Membership", amount: "$99.00", method: "M-Pesa", status: "Refunded" },
];

const faqs = [
  { q: "How do I pay using M-Pesa?", a: "Select M-Pesa, enter your phone number, and click Generate STK Push. You will receive a prompt on your phone to complete the payment." },
  { q: "How long does verification take?", a: "M-Pesa payments are verified automatically within 1-2 minutes. Other methods may take up to 24 hours." },
  { q: "Can I request a refund?", a: "Yes. You can request a refund or transfer your challenge ticket to the next available 2-week challenge from the Refund section." },
  { q: "What happens if I fail the challenge?", a: "You can retry by purchasing a new challenge entry or transfer an eligible ticket to the next challenge period." },
  { q: "Can I transfer my ticket?", a: "Yes. Use the Challenge Transfer option in the Refund section to reserve a seat in the next challenge." },
  { q: "How long is each challenge?", a: "Each ReadyPips funding challenge lasts for 2 weeks." },
  { q: "What are withdrawal charges?", a: "Withdrawals carry a flat $25 USD processing fee deducted from the requested amount." },
];

const recentActivity = [
  { type: "deposit", label: "M-Pesa Deposit", amount: "+$99.00", date: "Today, 10:23 AM", status: "Completed" },
  { type: "challenge", label: "Challenge Entry", amount: "-$42.99", date: "Yesterday, 2:15 PM", status: "Confirmed" },
  { type: "withdrawal", label: "Withdrawal Request", amount: "-$250.00", date: "Oct 10, 2023", status: "Pending" },
  { type: "bonus", label: "Referral Reward", amount: "+$25.00", date: "Oct 08, 2023", status: "Completed" },
];

const paymentSteps = [
  "Select Membership",
  "Choose Payment",
  "Confirm Order",
  "Complete Payment",
  "Verification",
  "Activated",
];

function CountUp({ end, suffix = "", prefix = "" }: { end: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end]);
  return <span>{prefix}{count}{suffix}</span>;
}

function Countdown({ target }: { target: Date }) {
  const [left, setLeft] = useState(calculateLeft(target));
  useEffect(() => {
    const timer = setInterval(() => setLeft(calculateLeft(target)), 1000);
    return () => clearInterval(timer);
  }, [target]);

  function calculateLeft(t: Date) {
    const diff = t.getTime() - Date.now();
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
    return {
      d: Math.floor(diff / (1000 * 60 * 60 * 24)),
      h: Math.floor((diff / (1000 * 60 * 60)) % 24),
      m: Math.floor((diff / (1000 * 60)) % 60),
      s: Math.floor((diff / 1000) % 60),
    };
  }

  const unit = (label: string, value: number) => (
    <div key={label} className="flex flex-col items-center">
      <div className="bg-white rounded-xl px-3 py-2 shadow-sm border border-[#ECECEC] min-w-12">
        <span className="text-lg font-bold text-[#111827]">{value.toString().padStart(2, "0")}</span>
      </div>
      <span className="text-[10px] uppercase tracking-wide text-[#6B7280] mt-1">{label}</span>
    </div>
  );

  return (
    <div className="flex items-center gap-2">
      {unit("Days", left.d)}
      {unit("Hrs", left.h)}
      {unit("Min", left.m)}
      {unit("Sec", left.s)}
    </div>
  );
}

function CircularProgress({ value, size = 140, stroke = 12 }: { value: number; size?: number; stroke?: number }) {
  const radius = (size - stroke) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} stroke="#ECECEC" strokeWidth={stroke} fill="transparent" />
      <motion.circle
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#5B3DF5"
        strokeWidth={stroke}
        fill="transparent"
        strokeDasharray={circumference}
        strokeLinecap="round"
      />
    </svg>
  );
}

function PaymentStepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-between gap-1 overflow-x-auto pb-2">
      {paymentSteps.map((step, i) => {
        const completed = i < currentStep;
        const active = i === currentStep;
        return (
          <div key={step} className="flex items-center min-w-max">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors",
                  completed ? "bg-green-500 text-white" : active ? "bg-[#5B3DF5] text-white" : "bg-[#F8F9FC] text-[#6B7280] border border-[#ECECEC]"
                )}
              >
                {completed ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span
                className={cn(
                  "text-[10px] font-medium whitespace-nowrap",
                  completed || active ? "text-[#111827]" : "text-[#6B7280]"
                )}
              >
                {step}
              </span>
            </div>
            {i < paymentSteps.length - 1 && (
              <div className={cn("w-6 h-0.5 mx-1 rounded-full", completed ? "bg-green-500" : "bg-[#ECECEC]")} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export function SubscriptionsPage() {
  const [selectedPlan, setSelectedPlan] = useState("Diamond Challenge");
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [phone, setPhone] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success">("idle");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [refundType, setRefundType] = useState("refund");
  const [autoRenew, setAutoRenew] = useState(true);

  const challengeOpens = new Date(Date.now() + 1000 * 60 * 60 * 24 * 2);
  const daysRemaining = 18;

  const handlePay = () => {
    if (!phone) return;
    setPaymentStatus("processing");
    setTimeout(() => setPaymentStatus("success"), 2000);
  };

  const currentStep = paymentStatus === "success" ? 6 : paymentStatus === "processing" ? 4 : 2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 pb-8"
    >
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-[#111827]">Subscriptions & Challenges</h1>
          <p className="text-[#6B7280] mt-1 max-w-2xl">
            Manage your membership, join funding challenges, complete secure payments, request withdrawals, and track your trading journey.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-gradient-to-r from-[#5B3DF5] to-[#7C5CFF] hover:from-[#4c32d4] hover:to-[#6a4ce8] text-white rounded-xl shadow-md hover:shadow-lg transition-all">
            <Crown className="w-4 h-4 mr-2" /> Upgrade Membership
          </Button>
          <Button variant="outline" className="rounded-xl border-[#ECECEC] text-[#111827] hover:bg-[#F3F0FF] hover:text-[#5B3DF5]">
            <Zap className="w-4 h-4 mr-2" /> Join New Challenge
          </Button>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Wallet Balance", value: 1240, prefix: "$", icon: Wallet, change: "+$99 today", positive: true },
          { label: "Active Challenge", value: 1, suffix: "", icon: Trophy, change: "Day 6 of 14", positive: true },
          { label: "Next Billing", value: 99, prefix: "$", icon: Calendar, change: "Nov 22, 2023", positive: true },
          { label: "Lifetime Earnings", value: 5240, prefix: "$", icon: TrendingUp, change: "+12% this month", positive: true },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              whileHover={{ y: -3, boxShadow: "0 12px 24px -10px rgba(91,61,245,0.12)" }}
              className="bg-white rounded-2xl border border-[#ECECEC] p-5 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#F3F0FF] flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#5B3DF5]" />
                </div>
                {stat.positive ? (
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-500" />
                )}
              </div>
              <p className="text-2xl font-bold text-[#111827]">
                <CountUp end={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </p>
              <p className="text-xs text-[#6B7280] mt-1">{stat.label}</p>
              <p className="text-[10px] font-medium text-green-600 mt-1">{stat.change}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Main Workspace */}
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex-1 min-w-0 space-y-8">
          {/* Membership Hero */}
          <Card
            className="rounded-3xl border-0 shadow-lg overflow-hidden text-white relative"
            style={{ background: "linear-gradient(135deg, #5B3DF5 0%, #7C5CFF 100%)" }}
          >
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
              <img
                src="/funding_pips_picture_4.jpg"
                alt="Analytics"
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="relative p-8 flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <Badge className="bg-white/20 text-white border-0 rounded-lg backdrop-blur-sm">Current Plan</Badge>
                  <Badge className="bg-amber-400 text-[#111827] border-0 rounded-lg">Premium</Badge>
                </div>
                <h2 className="text-3xl font-bold">Premium Membership</h2>
                <p className="text-white/80 max-w-md">Full access to all courses, live mentorship, VIP signals, and weekly funding challenges.</p>
                <div className="flex flex-wrap gap-6 text-sm">
                  <div>
                    <p className="text-white/60">Renewal Date</p>
                    <p className="font-semibold">Nov 22, 2023</p>
                  </div>
                  <div>
                    <p className="text-white/60">Next Billing</p>
                    <p className="font-semibold">$99.00</p>
                  </div>
                  <div>
                    <p className="text-white/60">Days Remaining</p>
                    <p className="font-semibold">{daysRemaining} days</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={autoRenew} onCheckedChange={setAutoRenew} />
                    <span className="font-medium">Auto Renew</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <Button className="bg-white text-[#5B3DF5] hover:bg-white/90 rounded-xl font-semibold">Upgrade Plan</Button>
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-xl">Manage Subscription</Button>
                  <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10 rounded-xl">Cancel Renewal</Button>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <CircularProgress value={(daysRemaining / 30) * 100} />
                <p className="text-sm font-medium text-white/80">Membership Active</p>
              </div>
            </CardContent>
          </Card>

          {/* Current Subscription */}
          <Card className="rounded-3xl border-[#ECECEC] shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-[#111827]">Current Subscription</CardTitle>
              <CardDescription>Overview of your active membership details.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: "Current Plan", value: "Premium" },
                  { label: "Status", value: "Active", badge: true },
                  { label: "Activated", value: "May 22, 2023" },
                  { label: "Renews On", value: "Nov 22, 2023" },
                  { label: "Payment Method", value: "M-Pesa" },
                  { label: "Member Since", value: "2022" },
                  { label: "Account Type", value: "Student" },
                  { label: "Trading Level", value: "Advanced" },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-xs text-[#6B7280] mb-1">{item.label}</p>
                    {item.badge ? (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 rounded-md">Active</Badge>
                    ) : (
                      <p className="font-semibold text-[#111827]">{item.value}</p>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 mt-6 pt-6 border-t border-[#ECECEC]">
                <Button variant="outline" className="rounded-xl border-[#ECECEC]">Manage</Button>
                <Button variant="outline" className="rounded-xl border-[#ECECEC]">Renew</Button>
                <Button className="btn-gradient-animated rounded-xl">Upgrade</Button>
              </div>
            </CardContent>
          </Card>

          {/* Membership Plans */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-[#111827]">Membership Plans</h2>
              <Button variant="link" className="text-[#5B3DF5]">Compare all plans <ChevronRight className="w-4 h-4" /></Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <motion.div
                  key={plan.name}
                  whileHover={{ y: -6, boxShadow: "0 20px 40px -12px rgba(91,61,245,0.18)" }}
                  onClick={() => setSelectedPlan(plan.name)}
                  className={cn(
                    "bg-white rounded-3xl border p-6 cursor-pointer transition-all",
                    selectedPlan === plan.name ? "border-[#5B3DF5] ring-1 ring-[#5B3DF5]" : "border-[#ECECEC] shadow-sm"
                  )}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-[#111827]">{plan.name}</h3>
                      <p className="text-xs text-[#6B7280]">One-time challenge fee</p>
                    </div>
                    {plan.popular && <Badge className="bg-[#5B3DF5] text-white rounded-md text-[10px]">POPULAR</Badge>}
                  </div>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-[#111827]">{plan.price}</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-[#6B7280]">
                        <Check className="w-4 h-4 text-[#5B3DF5] shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={cn(
                      "w-full rounded-xl font-semibold",
                      selectedPlan === plan.name
                        ? "bg-gradient-to-r from-[#5B3DF5] to-[#7C5CFF] text-white"
                        : "bg-[#F3F0FF] text-[#5B3DF5] hover:bg-[#5B3DF5] hover:text-white"
                    )}
                  >
                    Purchase Plan
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Weekly Challenge */}
          <Card className="rounded-3xl border-[#ECECEC] shadow-sm overflow-hidden">
            <div className="bg-[#F3F0FF] p-6 border-b border-[#ECECEC]">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl font-semibold text-[#111827] flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-[#F59E0B]" /> Weekly Funding Challenge
                  </CardTitle>
                  <CardDescription className="text-[#6B7280] mt-1 max-w-2xl">
                    Join the 2-week ReadyPips trading challenge and compete for funding opportunities.
                  </CardDescription>
                </div>
                <Countdown target={challengeOpens} />
              </div>
            </div>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Challenge Opens", value: "Mon, 30 Oct" },
                  { label: "Challenge Closes", value: "Sun, 12 Nov" },
                  { label: "Duration", value: "2 Weeks" },
                  { label: "Prize Pool", value: "$25,000" },
                ].map((s) => (
                  <div key={s.label} className="bg-[#F8F9FC] rounded-2xl p-4">
                    <p className="text-xs text-[#6B7280] mb-1">{s.label}</p>
                    <p className="font-semibold text-[#111827]">{s.value}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-5 rounded-2xl border border-[#ECECEC] bg-white">
                <div>
                  <p className="text-sm text-[#6B7280]">Challenge Entry Fee</p>
                  <p className="text-4xl font-bold text-[#111827]">$42.99</p>
                  <p className="text-xs text-[#6B7280]">Includes dashboard, leaderboard, analytics & certificate</p>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" className="rounded-xl border-[#ECECEC]">Challenge Rules</Button>
                  <Button className="bg-gradient-to-r from-[#5B3DF5] to-[#7C5CFF] hover:from-[#4c32d4] hover:to-[#6a4ce8] text-white rounded-xl">
                    Join Challenge <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Challenge Dashboard Preview */}
          <Card className="rounded-3xl border-[#ECECEC] shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold text-[#111827] flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#5B3DF5]" /> Challenge Dashboard
                </CardTitle>
                <CardDescription>Your current challenge performance at a glance.</CardDescription>
              </div>
              <Badge className="bg-green-100 text-green-700 rounded-md">In Progress</Badge>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Trading Days", value: "6 / 14", icon: Calendar, color: "text-[#5B3DF5]" },
                  { label: "Current Profit", value: "+$1,240", icon: TrendingUp, color: "text-green-600" },
                  { label: "Win Rate", value: "68%", icon: Target, color: "text-[#5B3DF5]" },
                  { label: "Leaderboard", value: "#12", icon: Trophy, color: "text-amber-500" },
                ].map((m) => {
                  const Icon = m.icon;
                  return (
                    <div key={m.label} className="p-4 rounded-2xl bg-[#F8F9FC]">
                      <Icon className={cn("w-5 h-5 mb-2", m.color)} />
                      <p className="text-xl font-bold text-[#111827]">{m.value}</p>
                      <p className="text-xs text-[#6B7280]">{m.label}</p>
                    </div>
                  );
                })}
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[#6B7280]">Daily Drawdown</span>
                    <span className="font-medium text-[#111827]">$320 / $500 max</span>
                  </div>
                  <Progress value={64} className="h-2 bg-[#ECECEC]" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[#6B7280]">Maximum Drawdown</span>
                    <span className="font-medium text-[#111827]">$1,850 / $2,500 max</span>
                  </div>
                  <Progress value={74} className="h-2 bg-[#ECECEC]" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[#6B7280]">Profit Target</span>
                    <span className="font-medium text-[#111827]">$1,240 / $2,500</span>
                  </div>
                  <Progress value={49.6} className="h-2 bg-[#ECECEC]" />
                </div>
              </div>
              <div className="flex items-center gap-3 mt-6 pt-6 border-t border-[#ECECEC]">
                <Button className="btn-gradient-animated rounded-xl">Open Challenge Dashboard</Button>
                <Button variant="outline" className="rounded-xl border-[#ECECEC]">View Leaderboard</Button>
              </div>
            </CardContent>
          </Card>

          {/* Payment Section */}
          <Card className="rounded-3xl border-[#ECECEC] shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-[#111827]">Choose Payment Method</CardTitle>
              <CardDescription>Secure checkout for {selectedPlan}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 p-4 rounded-2xl bg-[#F8F9FC]">
                <PaymentStepper currentStep={currentStep} />
              </div>

              <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                <TabsList className="grid grid-cols-4 bg-[#F8F9FC] rounded-xl p-1 mb-6">
                  <TabsTrigger value="mpesa" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    <Smartphone className="w-4 h-4 mr-2" /> M-Pesa
                  </TabsTrigger>
                  <TabsTrigger value="card" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    <CreditCard className="w-4 h-4 mr-2" /> Card
                  </TabsTrigger>
                  <TabsTrigger value="crypto" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    <Bitcoin className="w-4 h-4 mr-2" /> Crypto
                  </TabsTrigger>
                  <TabsTrigger value="bank" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    <Building2 className="w-4 h-4 mr-2" /> Bank
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="mpesa" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-[#F8F9FC]">
                      <p className="text-xs text-[#6B7280]">PayBill Number</p>
                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-bold text-[#111827]">522522</p>
                        <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg">
                          <Copy className="w-4 h-4 text-[#6B7280]" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#F8F9FC]">
                      <p className="text-xs text-[#6B7280]">Account Reference</p>
                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-bold text-[#111827]">RP-AHMED</p>
                        <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg">
                          <Copy className="w-4 h-4 text-[#6B7280]" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-[#111827]">M-Pesa Phone Number</Label>
                    <Input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 254712345678"
                      className="rounded-xl border-[#ECECEC]"
                    />
                    <p className="text-xs text-[#6B7280]">You will receive an STK push prompt on your phone.</p>
                  </div>
                  <AnimatePresence mode="wait">
                    {paymentStatus === "success" ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="p-6 rounded-2xl bg-green-50 border border-green-200 text-center"
                      >
                        <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Check className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-green-800">Payment Successful</h3>
                        <p className="text-sm text-green-700 mb-3">Transaction ID: MPESA-8839201</p>
                        <div className="flex justify-center gap-3">
                          <Button variant="outline" className="rounded-xl border-green-200 text-green-800">
                            <Download className="w-4 h-4 mr-2" /> Receipt
                          </Button>
                          <Button className="bg-green-600 hover:bg-green-700 text-white rounded-xl">Go to Dashboard</Button>
                        </div>
                      </motion.div>
                    ) : (
                      <Button
                        onClick={handlePay}
                        disabled={paymentStatus === "processing" || !phone}
                        className="w-full rounded-xl font-semibold text-white"
                        style={{ background: paymentStatus === "processing" ? "#6B7280" : "#34B233" }}
                      >
                        {paymentStatus === "processing" ? "Sending STK Push..." : "Generate STK Push"}
                      </Button>
                    )}
                  </AnimatePresence>
                  <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                    <Lock className="w-3 h-3" /> M-Pesa payments are encrypted and verified automatically.
                  </div>
                </TabsContent>

                <TabsContent value="card" className="space-y-4">
                  <div className="p-8 rounded-2xl bg-[#F8F9FC] text-center">
                    <CreditCard className="w-12 h-12 text-[#6B7280] mx-auto mb-3" />
                    <p className="text-[#6B7280]">Visa, Mastercard, Debit & Credit cards accepted.</p>
                    <Button className="mt-4 btn-gradient-animated rounded-xl">Pay with Card</Button>
                  </div>
                </TabsContent>

                <TabsContent value="crypto" className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    {["USDT", "BTC", "ETH"].map((c) => (
                      <button key={c} className="p-4 rounded-2xl border border-[#ECECEC] hover:border-[#5B3DF5] hover:bg-[#F3F0FF] transition-colors text-center">
                        <Bitcoin className="w-6 h-6 text-[#5B3DF5] mx-auto mb-2" />
                        <span className="font-semibold text-[#111827]">{c}</span>
                      </button>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="bank" className="space-y-4">
                  <div className="p-5 rounded-2xl bg-[#F8F9FC] space-y-2">
                    <p className="text-sm text-[#111827] font-medium">Bank: Equity Bank Kenya</p>
                    <p className="text-sm text-[#6B7280]">Account Name: ReadyPips Academy Ltd</p>
                    <p className="text-sm text-[#6B7280]">Account Number: 1234567890</p>
                    <p className="text-sm text-[#6B7280]">Swift: EQBLKENA</p>
                  </div>
                  <Button variant="outline" className="rounded-xl border-[#ECECEC]">
                    <Upload className="w-4 h-4 mr-2" /> Upload Payment Proof
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Billing History */}
          <Card className="rounded-3xl border-[#ECECEC] shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold text-[#111827]">Billing History</CardTitle>
                <CardDescription>View and download your invoices.</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="rounded-lg cursor-pointer">Paid</Badge>
                <Badge variant="outline" className="rounded-lg cursor-pointer">Pending</Badge>
                <Badge variant="outline" className="rounded-lg cursor-pointer">Refunded</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-[#ECECEC]">
                    <TableHead className="text-[#6B7280]">Invoice</TableHead>
                    <TableHead className="text-[#6B7280]">Date</TableHead>
                    <TableHead className="text-[#6B7280]">Plan</TableHead>
                    <TableHead className="text-[#6B7280]">Amount</TableHead>
                    <TableHead className="text-[#6B7280]">Method</TableHead>
                    <TableHead className="text-[#6B7280]">Status</TableHead>
                    <TableHead className="text-[#6B7280]">Receipt</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {billingHistory.map((inv) => (
                    <TableRow key={inv.id} className="border-[#ECECEC]">
                      <TableCell className="font-medium text-[#111827]">{inv.id}</TableCell>
                      <TableCell className="text-[#6B7280]">{inv.date}</TableCell>
                      <TableCell className="text-[#6B7280]">{inv.plan}</TableCell>
                      <TableCell className="font-medium text-[#111827]">{inv.amount}</TableCell>
                      <TableCell className="text-[#6B7280]">{inv.method}</TableCell>
                      <TableCell>
                        <Badge
                          className={cn(
                            "rounded-md",
                            inv.status === "Paid" ? "bg-green-100 text-green-700 hover:bg-green-100" :
                            inv.status === "Refunded" ? "bg-amber-100 text-amber-700 hover:bg-amber-100" :
                            "bg-red-100 text-red-700 hover:bg-red-100"
                          )}
                        >
                          {inv.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="ghost" className="text-[#5B3DF5] hover:bg-[#F3F0FF] rounded-lg">
                          <Download className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Withdrawals & Refunds */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="rounded-3xl border-[#ECECEC] shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-[#111827] flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-[#5B3DF5]" /> Withdrawals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-[#F8F9FC]">
                    <p className="text-xs text-[#6B7280]">Available Balance</p>
                    <p className="text-2xl font-bold text-[#111827]">$1,240.00</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#F8F9FC]">
                    <p className="text-xs text-[#6B7280]">Pending</p>
                    <p className="text-2xl font-bold text-[#111827]">$250.00</p>
                  </div>
                </div>
                <div className="p-4 rounded-2xl border border-[#ECECEC] space-y-3">
                  <div className="space-y-2">
                    <Label className="text-sm text-[#111827]">Withdrawal Amount (USD)</Label>
                    <Input
                      value={withdrawalAmount}
                      onChange={(e) => setWithdrawalAmount(e.target.value)}
                      placeholder="Min. $100"
                      className="rounded-xl border-[#ECECEC]"
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#6B7280]">
                    <span>Withdrawal Fee</span>
                    <span className="font-medium text-[#111827]">$25.00 USD</span>
                  </div>
                  <Button className="w-full btn-gradient-animated rounded-xl">
                    Request Withdrawal
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-[#ECECEC] shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-[#111827] flex items-center gap-2">
                  <RefreshCcw className="w-5 h-5 text-[#F59E0B]" /> Refund Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2 p-1 bg-[#F8F9FC] rounded-xl">
                  <button
                    onClick={() => setRefundType("refund")}
                    className={cn(
                      "flex-1 py-2 rounded-lg text-sm font-medium transition-colors",
                      refundType === "refund" ? "bg-white text-[#5B3DF5] shadow-sm" : "text-[#6B7280]"
                    )}
                  >
                    Refund
                  </button>
                  <button
                    onClick={() => setRefundType("transfer")}
                    className={cn(
                      "flex-1 py-2 rounded-lg text-sm font-medium transition-colors",
                      refundType === "transfer" ? "bg-white text-[#5B3DF5] shadow-sm" : "text-[#6B7280]"
                    )}
                  >
                    Transfer Ticket
                  </button>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-[#111827]">Challenge ID</Label>
                  <Input placeholder="e.g. CH-2023-884" className="rounded-xl border-[#ECECEC]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-[#111827]">Reason</Label>
                  <Input placeholder="Brief reason for request" className="rounded-xl border-[#ECECEC]" />
                </div>
                <Button className="w-full bg-[#F59E0B] hover:bg-[#d97706] text-white rounded-xl">
                  Submit {refundType === "refund" ? "Refund" : "Transfer"} Request
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* FAQ */}
          <Card className="rounded-3xl border-[#ECECEC] shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-[#111827] flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#5B3DF5]" /> Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-[#ECECEC]">
                    <AccordionTrigger className="text-left text-[#111827] hover:text-[#5B3DF5] hover:no-underline">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#6B7280]">{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="w-full xl:w-96 space-y-6">
          {/* Current Plan Summary */}
          <Card className="rounded-3xl border-[#ECECEC] shadow-sm bg-gradient-to-br from-[#F3F0FF] to-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[#111827]">Current Plan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#5B3DF5] flex items-center justify-center">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-[#111827]">Premium Membership</p>
                  <p className="text-xs text-[#6B7280]">Renews Nov 22, 2023</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B7280]">Days used</span>
                  <span className="font-medium text-[#111827]">12 / 30</span>
                </div>
                <Progress value={40} className="h-2 bg-[#ECECEC]" />
              </div>
              <Button className="w-full btn-gradient-animated rounded-xl">Manage Plan</Button>
            </CardContent>
          </Card>

          {/* Upcoming Challenge */}
          <Card className="rounded-3xl border-[#ECECEC] shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[#111827] flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#5B3DF5]" /> Upcoming Challenge
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#F8F9FC]">
                <p className="text-sm font-semibold text-[#111827]">Weekly Funding Challenge</p>
                <p className="text-xs text-[#6B7280] mb-3">Starts in 2 days</p>
                <Countdown target={challengeOpens} />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#6B7280]">Remaining Slots</span>
                <span className="font-semibold text-[#111827]">42 / 200</span>
              </div>
              <Progress value={21} className="h-2 bg-[#ECECEC]" />
              <Button className="w-full bg-gradient-to-r from-[#5B3DF5] to-[#7C5CFF] text-white rounded-xl">Reserve Seat</Button>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card className="rounded-3xl border-[#ECECEC] shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[#111827]">Payment Methods</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { label: "M-Pesa", value: "2547 **** 678", icon: Smartphone, active: true },
                { label: "Visa ending in 4242", value: "Expires 12/25", icon: CreditCard, active: false },
                { label: "USDT (TRC20)", value: "TX...9x2A", icon: Bitcoin, active: false },
              ].map((m) => {
                const Icon = m.icon;
                return (
                  <div key={m.label} className="flex items-center justify-between p-3 rounded-xl bg-[#F8F9FC]">
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-[#5B3DF5]" />
                      <div>
                        <p className="text-sm font-medium text-[#111827]">{m.label}</p>
                        <p className="text-xs text-[#6B7280]">{m.value}</p>
                      </div>
                    </div>
                    {m.active && <Badge className="bg-green-100 text-green-700 rounded-md text-[10px]">Default</Badge>}
                  </div>
                );
              })}
              <Button variant="outline" className="w-full rounded-xl border-[#ECECEC] mt-2">
                <PlusIcon className="w-4 h-4 mr-2" /> Add Method
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="rounded-3xl border-[#ECECEC] shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[#111827]">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((a, i) => (
                <div key={i} className="flex gap-3">
                  <div className={cn(
                    "w-9 h-9 rounded-xl flex items-center justify-center shrink-0",
                    a.type === "deposit" ? "bg-green-100 text-green-600" :
                    a.type === "withdrawal" ? "bg-red-100 text-red-600" :
                    a.type === "challenge" ? "bg-[#F3F0FF] text-[#5B3DF5]" :
                    "bg-amber-100 text-amber-600"
                  )}>
                    {a.type === "deposit" ? <ArrowDownRight className="w-4 h-4" /> :
                     a.type === "withdrawal" ? <ArrowUpRight className="w-4 h-4" /> :
                     a.type === "challenge" ? <Trophy className="w-4 h-4" /> :
                     <CircleDollarSign className="w-4 h-4" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-[#111827]">{a.label}</p>
                      <p className={cn(
                        "text-sm font-semibold",
                        a.amount.startsWith("+") ? "text-green-600" : "text-red-600"
                      )}>{a.amount}</p>
                    </div>
                    <p className="text-xs text-[#6B7280]">{a.date}</p>
                    <Badge
                      className={cn(
                        "mt-1 rounded-md text-[10px]",
                        a.status === "Completed" ? "bg-green-100 text-green-700 hover:bg-green-100" :
                        a.status === "Confirmed" ? "bg-[#F3F0FF] text-[#5B3DF5] hover:bg-[#F3F0FF]" :
                        "bg-amber-100 text-amber-700 hover:bg-amber-100"
                      )}
                    >
                      {a.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Security */}
          <Card className="rounded-3xl border-[#ECECEC] shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-[#111827]">Secure Payments</p>
                  <p className="text-xs text-[#6B7280]">256-bit encryption & SSL</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-[#6B7280]">
                <div className="flex items-center gap-1.5"><Lock className="w-3 h-3" /> Fraud Protection</div>
                <div className="flex items-center gap-1.5"><Check className="w-3 h-3" /> KYC Verified</div>
                <div className="flex items-center gap-1.5"><Sparkles className="w-3 h-3" /> Verified Txns</div>
                <div className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> Instant Alerts</div>
              </div>
            </CardContent>
          </Card>

          {/* Support */}
          <Card className="rounded-3xl border-[#ECECEC] shadow-sm bg-gradient-to-br from-[#F3F0FF] to-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[#111827]">Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start rounded-xl border-[#ECECEC]">
                <MessageCircle className="w-4 h-4 mr-2 text-[#5B3DF5]" /> WhatsApp Support
              </Button>
              <Button variant="outline" className="w-full justify-start rounded-xl border-[#ECECEC]">
                <Mail className="w-4 h-4 mr-2 text-[#5B3DF5]" /> Email Support
              </Button>
              <Button variant="outline" className="w-full justify-start rounded-xl border-[#ECECEC]">
                <FileText className="w-4 h-4 mr-2 text-[#5B3DF5]" /> Open Ticket
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}