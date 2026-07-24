import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet,
  Smartphone,
  Building2,
  CreditCard,
  Bitcoin,
  CheckCircle2,
  XCircle,
  Loader2,
  ArrowRight,
  Shield,
  Clock,
  TrendingUp,
  Copy,
  Check,
  AlertCircle,
  Sparkles,
  Zap,
  ChevronRight,
  Home,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const MPESA_CONSUMER_KEY = "f6qoBa8bOaYz9zlKBupGpK0Uwdxq4YoqLctjB6q9CFoBEUXo";
const MPESA_CONSUMER_SECRET = "0bFGhbGDpPWu9fT0lJAWCYVjytAM8J9JjgGxBcAk4SAdebRietm4MrlGCFymiqQ1";
const MPESA_PASSKEY = "8141e97349b5bc29df05ef76e56a1291defa2066134b1c5d93d77766788ea82d";
const MPESA_SHORTCODE = "4123143";
const MPESA_ENV = "production";
const MPESA_CALLBACK_URL = "https://readypips.com/api/mpesa/callback";

const fundingPlans = [
  {
    name: "Starter",
    amount: 50,
    popular: false,
    features: ["1 Challenge Account", "Basic Support", "Standard Payouts"],
  },
  {
    name: "Pro",
    amount: 150,
    popular: true,
    features: ["3 Challenge Accounts", "Priority Support", "Fast Payouts", "Trading Tools Access"],
  },
  {
    name: "Elite",
    amount: 500,
    popular: false,
    features: ["10 Challenge Accounts", "VIP Support", "Instant Payouts", "All Tools Access", "Mentorship"],
  },
];

function MpesaPayment({ amount, onSuccess }: { amount: number; onSuccess: () => void }) {
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMsg, setStatusMsg] = useState("");

  const handlePayment = async () => {
    const raw = phone.trim().replace(/\D/g, "");
    if (!/^7\d{8}$/.test(raw)) {
      setStatus("error");
      setStatusMsg("Enter a valid Safaricom number, e.g. 712345678");
      return;
    }

    setStatus("loading");
    setStatusMsg("Sending STK push to your phone...");

    try {
      const fullNumber = "254" + raw;

      // Get access token
      const auth = btoa(`${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`);
      const tokenRes = await fetch(
        MPESA_ENV === "production"
          ? "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
          : "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
        {
          headers: { Authorization: `Basic ${auth}` },
        }
      );
      const tokenData = await tokenRes.json();
      const accessToken = tokenData.access_token;

      if (!accessToken) {
        throw new Error("Failed to get access token");
      }

      const timestamp = new Date().toISOString().replace(/[^0-9]/g, "").slice(0, 14);
      const password = btoa(MPESA_SHORTCODE + MPESA_PASSKEY + timestamp);

      // STK Push request
      const stkRes = await fetch(
        MPESA_ENV === "production"
          ? "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
          : "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            BusinessShortCode: MPESA_SHORTCODE,
            Password: password,
            Timestamp: timestamp,
            TransactionType: "CustomerPayBillOnline",
            Amount: Math.round(amount),
            PartyA: fullNumber,
            PartyB: MPESA_SHORTCODE,
            PhoneNumber: fullNumber,
            CallBackURL: MPESA_CALLBACK_URL,
            AccountReference: "ReadyPipsFunding",
            TransactionDesc: "Funding Payment",
          }),
        }
      );

      const stkData = await stkRes.json();

      if (stkData.ResponseCode === "0") {
        setStatus("success");
        setStatusMsg("STK push sent! Check your phone and enter M-Pesa PIN to complete payment.");
        setTimeout(() => onSuccess(), 3000);
      } else {
        throw new Error(stkData.ResponseDescription || "Payment failed");
      }
    } catch (err: any) {
      setStatus("error");
      setStatusMsg(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-mpesa-green/5 rounded-[16px] p-4 border border-mpesa-green/20">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-[12px] bg-mpesa-green flex items-center justify-center">
            <Smartphone className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-[14px] font-semibold text-text-primary">M-Pesa</p>
            <p className="text-[12px] text-text-muted">Pay via M-Pesa STK Push</p>
          </div>
        </div>

        <label className="text-[13px] font-medium text-text-primary block mb-1.5">Safaricom Number</label>
        <div className="flex items-center border border-border rounded-[12px] overflow-hidden focus-within:border-mpesa-green transition-colors">
          <span className="px-3 text-[14px] text-text-muted border-r border-border bg-bg py-3">+254</span>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 9))}
            placeholder="7XX XXX XXX"
            maxLength={9}
            className="flex-1 px-3 py-3 text-[14px] outline-none bg-transparent text-text-primary"
            disabled={status === "loading"}
          />
        </div>

        <div className="flex items-center justify-between mt-3 p-3 bg-white rounded-[12px] border border-border">
          <span className="text-[13px] text-text-muted">Amount</span>
          <span className="text-[16px] font-bold text-text-primary">KSh {amount.toLocaleString()}</span>
        </div>

        <Button
          onClick={handlePayment}
          disabled={status === "loading"}
          className="w-full mt-3 h-11 rounded-[12px] bg-mpesa-green hover:bg-mpesa-green-dark text-white font-semibold text-[14px] transition-all"
        >
          {status === "loading" ? (
            <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Sending...</span>
          ) : (
            <span className="flex items-center gap-2">Pay KSh {amount.toLocaleString()} <ArrowRight className="w-4 h-4" /></span>
          )}
        </Button>
      </div>

      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 p-3 rounded-[12px] bg-success/10 text-success text-[13px] font-medium"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            {statusMsg}
          </motion.div>
        )}
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 p-3 rounded-[12px] bg-danger/10 text-danger text-[13px] font-medium"
          >
            <XCircle className="w-4 h-4 shrink-0" />
            {statusMsg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function BankTransfer() {
  const [copied, setCopied] = useState("");
  const bankDetails = [
    { label: "Bank", value: "Equity Bank Kenya" },
    { label: "Account Name", value: "ReadyPips Ltd" },
    { label: "Account Number", value: "1234567890" },
    { label: "Branch", value: "Upper Hill" },
    { label: "SWIFT Code", value: "EQBLKENA" },
  ];

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="bg-[#1a1a2e]/5 rounded-[16px] p-4 border border-[#1a1a2e]/20">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-[12px] bg-[#1a1a2e] flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-[14px] font-semibold text-text-primary">Bank Transfer</p>
            <p className="text-[12px] text-text-muted">Direct bank deposit</p>
          </div>
        </div>

        <div className="space-y-2">
          {bankDetails.map((d) => (
            <div key={d.label} className="flex items-center justify-between p-2.5 bg-white rounded-[10px] border border-border">
              <div>
                <p className="text-[11px] text-text-muted">{d.label}</p>
                <p className="text-[13px] font-medium text-text-primary">{d.value}</p>
              </div>
              <button
                onClick={() => copyToClipboard(d.value, d.label)}
                className="p-1.5 rounded-[8px] hover:bg-bg text-text-muted hover:text-primary transition-colors"
              >
                {copied === d.label ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-3 p-3 bg-warning/10 rounded-[12px] border border-warning/20">
          <p className="text-[12px] text-warning font-medium flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5" />
            Send payment confirmation to support@readypips.com
          </p>
        </div>
      </div>
    </div>
  );
}

function CryptoPayment() {
  const [copied, setCopied] = useState(false);
  const walletAddress = "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD18";

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="bg-[#F7931A]/5 rounded-[16px] p-4 border border-[#F7931A]/20">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-[12px] bg-[#F7931A] flex items-center justify-center">
            <Bitcoin className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-[14px] font-semibold text-text-primary">Cryptocurrency</p>
            <p className="text-[12px] text-text-muted">BTC, ETH, USDT (ERC-20)</p>
          </div>
        </div>

        <label className="text-[13px] font-medium text-text-primary block mb-1.5">Wallet Address (USDT/ETH)</label>
        <div className="flex items-center border border-border rounded-[12px] overflow-hidden">
          <input
            type="text"
            value={walletAddress}
            readOnly
            className="flex-1 px-3 py-3 text-[12px] outline-none bg-transparent text-text-primary font-mono"
          />
          <button
            onClick={copyAddress}
            className="px-3 py-3 bg-primary text-white hover:bg-primary-dark transition-colors"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        <div className="mt-3 p-3 bg-white rounded-[12px] border border-border">
          <p className="text-[12px] text-text-muted mb-1">Minimum deposit</p>
          <p className="text-[14px] font-semibold text-text-primary">$50 USD equivalent</p>
        </div>
      </div>
    </div>
  );
}

export function FundingPage() {
  const [selectedPlan, setSelectedPlan] = useState(fundingPlans[1]);
  const [paymentComplete, setPaymentComplete] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Funding</h1>
          <p className="text-[14px] text-text-muted mt-1">Fund your trading account</p>
        </div>
        <Badge className="bg-primary/8 text-primary hover:bg-primary/8 rounded text-[11px] px-3 py-1.5">
          <Shield className="w-3 h-3 mr-1" /> Secure Payment
        </Badge>
      </div>

      {paymentComplete ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16"
        >
          <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10 text-success" />
          </div>
          <h2 className="text-xl font-bold text-text-primary mb-2">Payment Successful!</h2>
          <p className="text-[14px] text-text-muted mb-6">Your account has been funded. Start trading now.</p>
          <Button
            onClick={() => setPaymentComplete(false)}
            className="rounded-[12px] h-11 px-6"
          >
            Fund Again
          </Button>
        </motion.div>
      ) : (
        <>
          {/* Funding Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {fundingPlans.map((plan) => (
              <motion.div
                key={plan.name}
                whileHover={{ y: -2 }}
                onClick={() => setSelectedPlan(plan)}
                className={cn(
                  "relative cursor-pointer rounded-[18px] border-2 p-5 transition-all duration-200",
                  selectedPlan.name === plan.name
                    ? "border-primary bg-primary/5 shadow-card"
                    : "border-border bg-white hover:border-primary/30 hover:shadow-sm"
                )}
              >
                {plan.popular && (
                  <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-primary text-white hover:bg-primary rounded-full text-[10px] px-3 py-0.5">
                    <Sparkles className="w-3 h-3 mr-1" /> Popular
                  </Badge>
                )}
                <h3 className="text-[16px] font-bold text-text-primary mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-2xl font-bold text-text-primary">KSh {plan.amount.toLocaleString()}</span>
                </div>
                <ul className="space-y-1.5 mb-4">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-1.5 text-[12px] text-text-secondary">
                      <CheckCircle2 className="w-3 h-3 text-success shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={selectedPlan.name === plan.name ? "default" : "outline"}
                  className={cn(
                    "w-full rounded-[12px] h-10 text-[13px] font-medium",
                    selectedPlan.name === plan.name && "btn-gradient-animated"
                  )}
                >
                  {selectedPlan.name === plan.name ? "Selected" : "Select"}
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Payment Methods */}
          <Card className="rounded-[18px] border-border shadow-card overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-text-primary flex items-center gap-2">
                <Wallet className="w-4 h-4 text-primary" />
                Payment Method — KSh {selectedPlan.amount.toLocaleString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="mpesa" className="w-full">
                <TabsList className="w-full grid grid-cols-3 rounded-[14px] p-1 bg-bg mb-4">
                  <TabsTrigger value="mpesa" className="rounded-[10px] text-[12px] py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    <Smartphone className="w-3.5 h-3.5 mr-1.5" /> M-Pesa
                  </TabsTrigger>
                  <TabsTrigger value="bank" className="rounded-[10px] text-[12px] py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    <Building2 className="w-3.5 h-3.5 mr-1.5" /> Bank
                  </TabsTrigger>
                  <TabsTrigger value="crypto" className="rounded-[10px] text-[12px] py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    <Bitcoin className="w-3.5 h-3.5 mr-1.5" /> Crypto
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="mpesa">
                  <MpesaPayment amount={selectedPlan.amount} onSuccess={() => setPaymentComplete(true)} />
                </TabsContent>
                <TabsContent value="bank">
                  <BankTransfer />
                </TabsContent>
                <TabsContent value="crypto">
                  <CryptoPayment />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}