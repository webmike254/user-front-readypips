import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Crown, Check, Zap, Smartphone, CreditCard, History, HelpCircle, MessageCircle, ShieldCheck, Loader2, ChevronDown, ChevronUp, Wallet, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

function Countdown({ target }: { target: string }) {
  const [left, setLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const end = new Date(target);
    const tick = () => {
      const diff = Math.max(end.getTime() - Date.now(), 0);
      setLeft({ d: Math.floor(diff / 86400000), h: Math.floor((diff % 86400000) / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) });
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [target]);
  return (
    <div className="flex gap-3">
      {[{ value: left.d, label: "Days" }, { value: left.h, label: "Hours" }, { value: left.m, label: "Mins" }, { value: left.s, label: "Secs" }].map((item) => (
        <div key={item.label} className="text-center">
          <div className="bg-slate-900 text-white rounded-xl py-2 px-3 text-xl font-bold tabular-nums">{String(item.value).padStart(2, "0")}</div>
          <p className="text-xs text-slate-500 mt-1">{item.label}</p>
        </div>
      ))}
    </div>
  );
}

const plans = [
  { name: "Starter", price: "KSh 3,900", period: "/month", description: "Perfect for beginners starting their trading journey.", features: ["Access to basic courses", "Weekly webinars", "Community access", "Email support"], highlighted: false },
  { name: "Pro", price: "KSh 9,900", period: "/month", description: "Most popular for serious traders.", features: ["All Starter features", "Live trading sessions", "1-on-1 mentorship", "Prop firm challenges"], highlighted: true },
  { name: "Elite", price: "KSh 19,900", period: "/month", description: "For professionals seeking an edge.", features: ["All Pro features", "Private Discord group", "Custom strategies", "Priority withdrawals"], highlighted: false },
];

const billingHistory = [
  { id: "INV-001", date: "Oct 22, 2023", amount: "KSh 9,900.00", status: "Paid", method: "M-Pesa" },
  { id: "INV-002", date: "Sep 22, 2023", amount: "KSh 9,900.00", status: "Paid", method: "M-Pesa" },
  { id: "INV-003", date: "Aug 22, 2023", amount: "KSh 9,900.00", status: "Paid", method: "Card" },
];

const faq = [
  { q: "How do I pay with M-Pesa?", a: "Enter your M-Pesa phone number and click Pay. You will receive an STK push to complete the payment." },
  { q: "Can I get a refund?", a: "Yes, refunds are available within 7 days of purchase if you haven't accessed any paid content." },
  { q: "What are funding challenges?", a: "Funding challenges let you prove your trading skills to earn a funded account with ReadyPips capital." },
];

export function SubscriptionsPage() {
  const [selectedPlan, setSelectedPlan] = useState("Pro");
  const [phone, setPhone] = useState("+254 712 345 678");
  const [payStatus, setPayStatus] = useState<"idle" | "processing" | "success">("idle");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handlePay = () => {
    if (payStatus !== "idle") return;
    setPayStatus("processing");
    setTimeout(() => setPayStatus("success"), 2000);
  };

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      <div className="flex-1 min-w-0 space-y-8">
        <div><h1 className="text-4xl font-bold text-slate-900">Subscriptions & Challenges</h1><p className="text-slate-500 mt-2">Manage your membership, join challenges, and handle payments.</p></div>

        <Card className="rounded-3xl border-slate-200 shadow-sm overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-violet-600 to-green-500" />
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2"><div className="w-12 h-12 rounded-2xl bg-violet-50 flex items-center justify-center"><Crown className="w-6 h-6 text-violet-600" /></div><div><p className="text-sm text-slate-500">Current Plan</p><h2 className="text-2xl font-bold text-slate-900">Pro Membership</h2></div></div>
                <p className="text-slate-500 max-w-md">Renews automatically on <span className="font-medium text-slate-900">25 Nov 2023</span>. Next billing: <span className="font-medium text-slate-900">KSh 9,900.00</span></p>
              </div>
              <div className="flex gap-3"><Button variant="outline" className="rounded-xl border-slate-200">Cancel Renewal</Button><Button className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl">Upgrade Plan</Button></div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <motion.div key={p.name} whileHover={{ y: -4 }} onClick={() => setSelectedPlan(p.name)} className={`rounded-3xl border-2 p-6 cursor-pointer transition-all ${selectedPlan === p.name ? "border-violet-600 bg-violet-50/30 shadow-md" : "border-slate-200 bg-white hover:border-violet-300"}`}>
              {p.highlighted && <Badge className="mb-3 bg-violet-600 text-white hover:bg-violet-600">Most Popular</Badge>}
              <h3 className="text-lg font-semibold text-slate-900">{p.name}</h3>
              <div className="flex items-baseline gap-1 my-2"><span className="text-3xl font-bold text-slate-900">{p.price}</span><span className="text-slate-500 text-sm">{p.period}</span></div>
              <p className="text-sm text-slate-500 mb-4">{p.description}</p>
              <ul className="space-y-2 mb-6">{p.features.map((f) => <li key={f} className="flex items-center gap-2 text-sm text-slate-900"><Check className="w-4 h-4 text-green-500" /> {f}</li>)}</ul>
              <Button className={`w-full rounded-xl ${selectedPlan === p.name ? "bg-violet-600 hover:bg-violet-700 text-white" : "bg-violet-50 text-violet-700 hover:bg-violet-100"}`}>{selectedPlan === p.name ? "Selected" : "Choose Plan"}</Button>
            </motion.div>
          ))}
        </div>

        <Card className="rounded-3xl border-slate-200 shadow-sm overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-amber-500 to-red-500" />
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div><Badge className="mb-2 bg-amber-100 text-amber-700 hover:bg-amber-100">Weekly Challenge</Badge><h2 className="text-2xl font-bold text-slate-900 mb-2">KSh 1.3M Demo Challenge</h2><p className="text-slate-500 max-w-md">Trade a demo account, hit the profit target, and win a funded account. Entry closes soon.</p></div>
              <Countdown target="2023-10-29T23:59:59" />
            </div>
            <div className="mt-6"><div className="flex justify-between text-sm mb-2"><span className="text-slate-500">Spots filled</span><span className="font-semibold text-slate-900">78%</span></div><Progress value={78} className="h-2" /></div>
            <div className="flex gap-3 mt-6"><Button className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl">Join Challenge</Button><Button variant="outline" className="rounded-xl border-slate-200">View Rules</Button></div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-slate-200 shadow-sm">
          <CardHeader><CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2"><Smartphone className="w-5 h-5 text-violet-600" /> Pay with M-Pesa</CardTitle><CardDescription>Enter your M-Pesa number to receive an STK push.</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3"><Input value={phone} onChange={(e) => setPhone(e.target.value)} className="rounded-xl border-slate-200 h-12" placeholder="+254 7XX XXX XXX" /><Button onClick={handlePay} disabled={payStatus !== "idle"} className="bg-green-500 hover:bg-green-600 text-white rounded-xl h-12 px-8">{payStatus === "processing" ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}{payStatus === "success" ? "Paid ✓" : payStatus === "processing" ? "Processing..." : "Pay Now"}</Button></div>
            {payStatus === "success" && <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-green-50 text-green-800 text-sm flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 shrink-0" /> Payment request sent. Complete the prompt on your phone. TxID: MPESA-883920</motion.div>}
            <div className="flex items-center gap-4 text-sm text-slate-500"><span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> Secure payment</span><span className="flex items-center gap-1"><Zap className="w-4 h-4" /> Instant activation</span></div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="rounded-3xl border-slate-200 shadow-sm">
            <CardHeader><CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2"><Wallet className="w-5 h-5 text-violet-600" /> Withdraw Earnings</CardTitle></CardHeader>
            <CardContent className="space-y-4"><div className="p-4 rounded-2xl bg-slate-50"><p className="text-sm text-slate-500">Available balance</p><p className="text-3xl font-bold text-slate-900">KSh 0.00</p></div><Button variant="outline" className="w-full rounded-xl border-slate-200">Request Withdrawal</Button></CardContent>
          </Card>
          <Card className="rounded-3xl border-slate-200 shadow-sm">
            <CardHeader><CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2"><AlertCircle className="w-5 h-5 text-violet-600" /> Refund Policy</CardTitle></CardHeader>
            <CardContent className="space-y-4"><p className="text-sm text-slate-500">Request a refund within 7 days if you haven't accessed paid content.</p><Button variant="outline" className="w-full rounded-xl border-slate-200">Request Refund</Button></CardContent>
          </Card>
        </div>

        <Card className="rounded-3xl border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between"><CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2"><History className="w-5 h-5 text-violet-600" /> Billing History</CardTitle></CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="text-left text-slate-500 border-b border-slate-200"><th className="pb-3 font-medium">Invoice</th><th className="pb-3 font-medium">Date</th><th className="pb-3 font-medium">Amount</th><th className="pb-3 font-medium">Method</th><th className="pb-3 font-medium">Status</th></tr></thead>
                <tbody>{billingHistory.map((inv) => <tr key={inv.id} className="border-b border-slate-100 last:border-0"><td className="py-4 font-medium text-slate-900">{inv.id}</td><td className="py-4 text-slate-500">{inv.date}</td><td className="py-4 font-medium text-slate-900">{inv.amount}</td><td className="py-4 text-slate-500">{inv.method}</td><td className="py-4"><Badge className="bg-green-50 text-green-700 hover:bg-green-50">{inv.status}</Badge></td></tr>)}</tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-slate-200 shadow-sm">
          <CardHeader><CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2"><HelpCircle className="w-5 h-5 text-violet-600" /> Frequently Asked</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {faq.map((item, i) => (
              <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"><span className="font-medium text-slate-900">{item.q}</span>{openFaq === i ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}</button>
                {openFaq === i && <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} className="overflow-hidden"><p className="px-4 pb-4 text-sm text-slate-500">{item.a}</p></motion.div>}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="w-full xl:w-96 space-y-8">
        <Card className="rounded-3xl border-slate-200 shadow-sm">
          <CardHeader><CardTitle className="text-lg font-bold text-slate-900">Plan Summary</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-sm"><span className="text-slate-500">Plan</span><span className="font-semibold text-slate-900">Pro</span></div>
            <div className="flex justify-between text-sm"><span className="text-slate-500">Billing</span><span className="font-semibold text-slate-900">Monthly</span></div>
            <div className="flex justify-between text-sm"><span className="text-slate-500">Next charge</span><span className="font-semibold text-slate-900">25 Nov 2023</span></div>
            <Separator />
            <div className="flex justify-between"><span className="font-semibold text-slate-900">Total</span><span className="font-bold text-slate-900">KSh 9,900.00/mo</span></div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-slate-200 shadow-sm">
          <CardHeader><CardTitle className="text-lg font-bold text-slate-900">Payment Methods</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50"><div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center"><Smartphone className="w-5 h-5 text-green-600" /></div><div className="flex-1"><p className="text-sm font-medium text-slate-900">M-Pesa</p><p className="text-xs text-slate-500">+254 712 345 678</p></div><Badge className="bg-green-50 text-green-700 hover:bg-green-50">Default</Badge></div>
            <Button variant="outline" className="w-full rounded-xl border-slate-200"><CreditCard className="w-4 h-4 mr-2" /> Add Card</Button>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-slate-200 shadow-sm bg-gradient-to-br from-violet-600 to-violet-500 text-white">
          <CardContent className="p-6"><MessageCircle className="w-10 h-10 mb-3 opacity-90" /><h3 className="font-semibold text-lg mb-1">Need help?</h3><p className="text-sm text-white/80 mb-4">Our support team is available 24/7 for billing and challenge questions.</p><Button className="w-full bg-white text-violet-700 hover:bg-white/90 rounded-xl font-semibold">Contact Support</Button></CardContent>
        </Card>
      </div>
    </div>
  );
}