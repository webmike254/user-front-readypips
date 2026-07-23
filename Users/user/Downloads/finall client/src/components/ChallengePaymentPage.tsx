import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  Lock,
  Shield,
  Zap,
  CreditCard,
  Bitcoin,
  Copy,
  ChevronRight,
  Home,
  Loader2,
  Check,
  ArrowRight,
  Download,
  Tag,
  Sparkles,
  Clock,
  TrendingUp,
  AlertCircle,
  Smartphone,
  Building2,
  Wallet,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePageNavigation } from "@/components/PageContext";
import { cn } from "@/lib/utils";

type PaymentMethod = "mpesa" | "card" | "crypto";
type PaymentStatus = "idle" | "processing" | "success" | "failed";
type CryptoCoin = "BTC" | "ETH" | "USDT" | "USDC";

const CHALLENGE_PRICE = 42.99;

const CRYPTO_WALLETS: Record<CryptoCoin, { address: string; network: string }> = {
  BTC: { address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh", network: "Bitcoin" },
  ETH: { address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e", network: "Ethereum (ERC20)" },
  USDT: { address: "TQn9Y2khEsLJW7B7Nk1Q2f3y4Z5a6B7c8D", network: "Tron (TRC20)" },
  USDC: { address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e", network: "Ethereum (ERC20)" },
};

export function ChallengePaymentPage() {
  const { setCurrentPage } = usePageNavigation();
  const [method, setMethod] = useState<PaymentMethod | null>(null);
  const [status, setStatus] = useState<PaymentStatus>("idle");
  const [cryptoCoin, setCryptoCoin] = useState<CryptoCoin>("USDT");
  const [copied, setCopied] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const total = CHALLENGE_PRICE - discount;

  const copyAddress = () => {
    navigator.clipboard?.writeText(CRYPTO_WALLETS[cryptoCoin].address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "READY10") {
      setDiscount(CHALLENGE_PRICE * 0.1);
      setCouponApplied(true);
      setErrors((e) => ({ ...e, coupon: "" }));
    } else if (couponCode.toUpperCase() === "WELCOME20") {
      setDiscount(CHALLENGE_PRICE * 0.2);
      setCouponApplied(true);
      setErrors((e) => ({ ...e, coupon: "" }));
    } else {
      setErrors((e) => ({ ...e, coupon: "Invalid coupon code" }));
      setCouponApplied(false);
      setDiscount(0);
    }
  };

  const handlePay = () => {
    setStatus("processing");
    setTimeout(() => {
      setStatus("success");
    }, 3000);
  };

  if (status === "success") {
    return <PaymentSuccess onGoDashboard={() => setCurrentPage("dashboard")} total={total} method={method} />;
  }

  if (status === "failed") {
    return <PaymentFailed onRetry={() => setStatus("idle")} />;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-[13px] text-text-muted">
        <button onClick={() => setCurrentPage("dashboard")} className="hover:text-primary transition-colors">Dashboard</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-text-secondary">Challenges</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-text-primary font-medium">Payment</span>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Challenge Payment</h1>
        <p className="text-[14px] text-text-secondary mt-1">Complete your payment to unlock your ReadyPips Funding Challenge instantly.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Payment Flow (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Payment Information */}
          <Card className="rounded-[16px] border-border shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-[12px] font-bold text-primary">1</span>
                </div>
                <h2 className="text-[15px] font-semibold text-text-primary">Payment Methods</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* M-Pesa */}
                <PaymentMethodCard
                  active={method === "mpesa"}
                  onClick={() => setMethod("mpesa")}
                  icon={<Smartphone className="w-5 h-5" />}
                  title="M-Pesa"
                  subtitle="Fast mobile payment"
                  accent="success"
                  logo={
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded bg-success flex items-center justify-center text-white text-[8px] font-bold">M</div>
                      <span className="text-[11px] font-medium text-text-muted">Safaricom</span>
                    </div>
                  }
                />

                {/* Card */}
                <PaymentMethodCard
                  active={method === "card"}
                  onClick={() => setMethod("card")}
                  icon={<CreditCard className="w-5 h-5" />}
                  title="Bank Card"
                  subtitle="Secure international payment"
                  accent="primary"
                  logo={
                    <div className="flex items-center gap-1">
                      <div className="w-6 h-4 rounded-[2px] bg-blue-600 flex items-center justify-center text-white text-[7px] font-bold italic">VISA</div>
                      <div className="w-4 h-4 rounded-full bg-red-500/80" />
                      <div className="w-4 h-4 rounded-full bg-yellow-400/80 -ml-2" />
                    </div>
                  }
                />

                {/* Crypto */}
                <PaymentMethodCard
                  active={method === "crypto"}
                  onClick={() => setMethod("crypto")}
                  icon={<Bitcoin className="w-5 h-5" />}
                  title="Crypto"
                  subtitle="Blockchain payment"
                  accent="warning"
                  logo={
                    <div className="flex items-center gap-1">
                      <Bitcoin className="w-3.5 h-3.5 text-warning" />
                      <span className="text-[10px] font-medium text-text-muted">BTC</span>
                      <span className="text-[10px] font-medium text-text-muted">ETH</span>
                      <span className="text-[10px] font-medium text-text-muted">USDT</span>
                    </div>
                  }
                />
              </div>

              {/* Dynamic Payment Form */}
              <AnimatePresence mode="wait">
                {method === "mpesa" && (
                  <motion.div
                    key="mpesa"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-5 pt-5 border-t border-border space-y-4">
                      <div className="rounded-[12px] bg-success/5 border border-success/20 p-4 flex items-start gap-3">
                        <Smartphone className="w-5 h-5 text-success shrink-0 mt-0.5" />
                        <p className="text-[13px] text-text-secondary">
                          You will receive an M-Pesa payment prompt on your phone. Enter your phone number and confirm the prompt to complete payment.
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField label="Country Code" required>
                          <select className="w-full h-10 rounded-button border border-border bg-white px-3 text-[14px] text-text-primary focus:outline-none focus:border-primary">
                            <option>+254 (Kenya)</option>
                            <option>+255 (Tanzania)</option>
                            <option>+256 (Uganda)</option>
                          </select>
                        </FormField>
                        <FormField label="Phone Number" required error={errors.phone}>
                          <Input placeholder="712 345 678" className="rounded-button h-10" />
                        </FormField>
                      </div>
                      <FormField label="Email Address" required>
                        <Input type="email" placeholder="ahmed@example.com" className="rounded-button h-10" />
                      </FormField>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-border accent-primary" />
                        <span className="text-[13px] text-text-secondary">Receive payment confirmation via email</span>
                      </label>
                    </div>
                  </motion.div>
                )}

                {method === "card" && (
                  <motion.div
                    key="card"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-5 pt-5 border-t border-border space-y-4">
                      <FormField label="Cardholder Name" required>
                        <Input placeholder="Ahmed Bader" className="rounded-button h-10" />
                      </FormField>
                      <FormField label="Card Number" required>
                        <div className="relative">
                          <Input placeholder="1234 5678 9012 3456" className="rounded-button h-10 pr-12 font-mono" maxLength={19} />
                          <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        </div>
                      </FormField>
                      <div className="grid grid-cols-3 gap-4">
                        <FormField label="Expiry" required>
                          <Input placeholder="MM/YY" className="rounded-button h-10 font-mono" maxLength={5} />
                        </FormField>
                        <FormField label="CVV" required>
                          <Input placeholder="123" className="rounded-button h-10 font-mono" maxLength={4} type="password" />
                        </FormField>
                        <FormField label="ZIP Code" required>
                          <Input placeholder="00100" className="rounded-button h-10" />
                        </FormField>
                      </div>
                      <FormField label="Email" required>
                        <Input type="email" placeholder="ahmed@example.com" className="rounded-button h-10" />
                      </FormField>
                      <div className="grid grid-cols-2 gap-4">
                        <FormField label="Country" required>
                          <select className="w-full h-10 rounded-button border border-border bg-white px-3 text-[14px] text-text-primary focus:outline-none focus:border-primary">
                            <option>Kenya</option>
                            <option>United States</option>
                            <option>United Kingdom</option>
                            <option>Other</option>
                          </select>
                        </FormField>
                        <FormField label="Billing Address" required>
                          <Input placeholder="Street address" className="rounded-button h-10" />
                        </FormField>
                      </div>
                      <div className="flex items-center gap-2 text-[12px] text-text-muted">
                        <Lock className="w-3.5 h-3.5" />
                        Your card information is encrypted and processed securely via Stripe.
                      </div>
                    </div>
                  </motion.div>
                )}

                {method === "crypto" && (
                  <motion.div
                    key="crypto"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-5 pt-5 border-t border-border space-y-4">
                      {/* Coin selector */}
                      <div>
                        <Label className="text-[13px] font-medium text-text-primary mb-2 block">Select Cryptocurrency</Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {(Object.keys(CRYPTO_WALLETS) as CryptoCoin[]).map((coin) => (
                            <button
                              key={coin}
                              onClick={() => setCryptoCoin(coin)}
                              className={cn(
                                "flex flex-col items-center gap-1.5 p-3 rounded-[12px] border-2 transition-all",
                                cryptoCoin === coin
                                  ? "border-warning bg-warning/5"
                                  : "border-border bg-white hover:bg-bg"
                              )}
                            >
                              <CryptoIcon coin={coin} />
                              <span className={cn(
                                "text-[12px] font-semibold",
                                cryptoCoin === coin ? "text-text-primary" : "text-text-secondary"
                              )}>
                                {coin}
                              </span>
                              <span className="text-[10px] text-text-muted">
                                {coin === "USDT" ? "TRC20" : coin === "USDC" ? "ERC20" : coin === "BTC" ? "Bitcoin" : "ERC20"}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* QR + Address */}
                      <div className="rounded-[12px] border border-border p-5 bg-bg">
                        <div className="flex flex-col md:flex-row items-center gap-5">
                          {/* QR Code placeholder */}
                          <div className="w-32 h-32 rounded-[12px] bg-white border border-border flex items-center justify-center shrink-0">
                            <div className="grid grid-cols-8 gap-0.5">
                              {Array.from({ length: 64 }).map((_, i) => (
                                <div
                                  key={i}
                                  className={cn(
                                    "w-2.5 h-2.5 rounded-[1px]",
                                    (i * 7 + cryptoCoin.charCodeAt(0)) % 3 === 0 ? "bg-text-primary" : "bg-transparent"
                                  )}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0 w-full">
                            <div className="text-[12px] font-medium text-text-muted mb-1">Send to this address</div>
                            <div className="text-[11px] text-text-muted mb-2">Network: {CRYPTO_WALLETS[cryptoCoin].network}</div>
                            <div className="flex items-center gap-2">
                              <code className="flex-1 text-[11px] font-mono text-text-primary bg-white border border-border rounded-[8px] px-3 py-2.5 truncate">
                                {CRYPTO_WALLETS[cryptoCoin].address}
                              </code>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={copyAddress}
                                className="h-10 w-10 rounded-[8px] shrink-0"
                              >
                                {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                              </Button>
                            </div>
                            <div className="mt-3 flex items-center gap-2">
                              <Badge className={cn(
                                "border-0 rounded-full px-2.5 py-1 text-[11px] font-medium",
                                status === "idle" ? "bg-warning/10 text-warning" : "bg-success/10 text-success"
                              )}>
                                <Clock className="w-3 h-3 mr-1" /> Waiting for payment
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-[12px] bg-warning/5 border border-warning/20 p-4 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                        <p className="text-[13px] text-text-secondary">
                          Send the exact amount of {cryptoCoin === "BTC" ? "0.00068" : cryptoCoin === "ETH" ? "0.018" : "42.99"} {cryptoCoin} to the address above. Your challenge will be activated automatically once the transaction is confirmed on the blockchain.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>

          {/* Billing Information */}
          <Card className="rounded-[16px] border-border shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-[12px] font-bold text-primary">2</span>
                </div>
                <h2 className="text-[15px] font-semibold text-text-primary">Billing Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Full Name" required>
                  <Input placeholder="Ahmed Bader" className="rounded-button h-10" />
                </FormField>
                <FormField label="Email" required>
                  <Input type="email" placeholder="ahmed@example.com" className="rounded-button h-10" />
                </FormField>
                <FormField label="Country" required>
                  <select className="w-full h-10 rounded-button border border-border bg-white px-3 text-[14px] text-text-primary focus:outline-none focus:border-primary">
                    <option>Kenya</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Nigeria</option>
                    <option>Other</option>
                  </select>
                </FormField>
                <FormField label="Phone" required>
                  <Input placeholder="+254 712 345 678" className="rounded-button h-10" />
                </FormField>
                <FormField label="Referral Code (optional)">
                  <Input placeholder="Enter referral code" className="rounded-button h-10" />
                </FormField>
                <FormField label="Company (optional)">
                  <Input placeholder="Company name" className="rounded-button h-10" />
                </FormField>
              </div>
            </CardContent>
          </Card>

          {/* Coupon Section */}
          <Card className="rounded-[16px] border-border shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-4 h-4 text-primary" />
                <h2 className="text-[15px] font-semibold text-text-primary">Coupon Code</h2>
              </div>
              <div className="flex gap-2">
                <Input
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code (try READY10)"
                  className={cn("rounded-button h-10 flex-1", errors.coupon && "border-danger")}
                />
                <Button
                  onClick={applyCoupon}
                  variant="outline"
                  className="rounded-button h-10 px-5 text-[13px] font-medium shrink-0"
                >
                  Apply
                </Button>
              </div>
              {errors.coupon && <p className="text-[12px] text-danger mt-2">{errors.coupon}</p>}
              {couponApplied && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 flex items-center gap-2 text-[13px] text-success"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Coupon applied! You saved ${discount.toFixed(2)}
                </motion.div>
              )}
            </CardContent>
          </Card>

          {/* Terms & Conditions */}
          <Card className="rounded-[16px] border-border shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-[12px] font-bold text-primary">3</span>
                </div>
                <h2 className="text-[15px] font-semibold text-text-primary">Terms & Conditions</h2>
              </div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-border accent-primary mt-0.5" />
                <span className="text-[13px] text-text-secondary leading-relaxed">
                  I agree to the ReadyPips Challenge Terms & Conditions. I understand that the challenge fee is non-refundable once the challenge is activated. I confirm that I am at least 18 years old and the billing information provided is accurate.
                </span>
              </label>
            </CardContent>
          </Card>

          {/* Secure Checkout Button */}
          <Button
            onClick={handlePay}
            disabled={!method || status === "processing"}
            className="w-full h-12 rounded-[16px] text-[15px] font-semibold bg-primary hover:bg-primary-hover transition-all"
          >
            {status === "processing" ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Verifying Payment...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 mr-2" /> Secure Checkout - ${total.toFixed(2)}
              </>
            )}
          </Button>
          {!method && (
            <p className="text-center text-[12px] text-text-muted">Select a payment method to continue</p>
          )}
        </div>

        {/* Right: Order Summary (4 cols) */}
        <div className="lg:col-span-4">
          <div className="sticky top-20 space-y-4">
            {/* Challenge Summary Card */}
            <Card className="rounded-[16px] border-border shadow-card overflow-hidden">
              {/* Challenge image */}
              <div className="h-28 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent flex items-center justify-center relative">
                <TrendingUp className="w-12 h-12 text-primary" />
                <Badge className="absolute top-3 right-3 bg-success/10 text-success border-0 rounded-full px-2.5 py-1 text-[11px] font-semibold">
                  <Zap className="w-3 h-3 mr-1" /> Instant Access
                </Badge>
              </div>
              <CardContent className="p-5">
                <h3 className="text-[15px] font-semibold text-text-primary">Funding Challenge</h3>
                <p className="text-[13px] text-text-secondary mt-0.5">ReadyPips Evaluation Challenge</p>

                <div className="mt-4 space-y-2.5">
                  <SummaryRow label="Account Type" value="Standard" />
                  <SummaryRow label="Challenge Fee" value={`$${CHALLENGE_PRICE.toFixed(2)}`} />
                  <SummaryRow label="Duration" value="Unlimited" />
                  <SummaryRow label="Profit Target" value="10%" />
                  <SummaryRow label="Max Daily Loss" value="5%" />
                  <SummaryRow label="Max Drawdown" value="10%" />
                  <SummaryRow label="Min Trading Days" value="3 Days" />
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <Badge className="bg-success/10 text-success border-0 rounded-full px-3 py-1 text-[12px] font-semibold w-full justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Available Immediately
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card className="rounded-[16px] border-border shadow-card">
              <CardContent className="p-5">
                <h3 className="text-[15px] font-semibold text-text-primary mb-4">Order Summary</h3>
                <div className="space-y-2.5">
                  <SummaryRow label="Challenge" value="Evaluation" />
                  <SummaryRow label="Price" value={`$${CHALLENGE_PRICE.toFixed(2)}`} />
                  <SummaryRow
                    label="Discount"
                    value={discount > 0 ? `-$${discount.toFixed(2)}` : "$0.00"}
                    valueClass={discount > 0 ? "text-success" : ""}
                  />
                  <SummaryRow label="Processing Fee" value="Free" valueClass="text-success" />
                  <SummaryRow label="Tax" value="$0.00" />
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] font-semibold text-text-primary">Total</span>
                    <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Indicators */}
            <Card className="rounded-[16px] border-border shadow-card">
              <CardContent className="p-5">
                <div className="grid grid-cols-2 gap-3">
                  <SecurityItem icon={Shield} label="SSL Encrypted" />
                  <SecurityItem icon={Lock} label="PCI DSS Secure" />
                  <SecurityItem icon={Zap} label="Instant Activation" />
                  <SecurityItem icon={Shield} label="256-bit Encryption" />
                  <SecurityItem icon={CheckCircle2} label="Money Protected" />
                </div>
              </CardContent>
            </Card>

            {/* What Happens After Payment */}
            <Card className="rounded-[16px] border-border shadow-card">
              <CardContent className="p-5">
                <h3 className="text-[13px] font-semibold text-text-primary mb-4">What Happens Next</h3>
                <div className="space-y-3">
                  {[
                    { n: 1, label: "Payment Received", done: false },
                    { n: 2, label: "Account Created", done: false },
                    { n: 3, label: "Challenge Activated", done: false },
                    { n: 4, label: "Dashboard Unlocked", done: false },
                    { n: 5, label: "Start Trading", done: false },
                  ].map((step, i) => (
                    <div key={step.n} className="flex items-center gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full border-2 border-primary/20 flex items-center justify-center">
                          <span className="text-[10px] font-bold text-primary">{step.n}</span>
                        </div>
                        {i < 4 && <div className="w-0.5 h-4 bg-border" />}
                      </div>
                      <span className="text-[13px] text-text-secondary">{step.label}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentMethodCard({
  active,
  onClick,
  icon,
  title,
  subtitle,
  accent,
  logo,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  accent: "success" | "primary" | "warning";
  logo: React.ReactNode;
}) {
  const accentColors = {
    success: "border-success bg-success/5",
    primary: "border-primary bg-primary/5",
    warning: "border-warning bg-warning/5",
  };
  const accentIcon = {
    success: "text-success",
    primary: "text-primary",
    warning: "text-warning",
  };

  return (
    <motion.button
      whileHover={{ y: -2 }}
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-start gap-2 p-4 rounded-[14px] border-2 text-left transition-all duration-150",
        active ? accentColors[accent] : "border-border bg-white hover:bg-bg hover:border-border hover:shadow-card-hover"
      )}
    >
      {active && (
        <div className={cn(
          "absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center",
          accent === "success" ? "bg-success" : accent === "primary" ? "bg-primary" : "bg-warning"
        )}>
          <Check className="w-3 h-3 text-white" />
        </div>
      )}
      <div className={cn("w-9 h-9 rounded-[10px] flex items-center justify-center", active ? accentIcon[accent] + " bg-white" : "bg-bg text-text-muted")}>
        {icon}
      </div>
      <div>
        <div className="text-[14px] font-semibold text-text-primary">{title}</div>
        <div className="text-[12px] text-text-muted mt-0.5">{subtitle}</div>
      </div>
      <div className="mt-1">{logo}</div>
    </motion.button>
  );
}

function FormField({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label className="text-[13px] font-medium text-text-primary mb-1.5 block">
        {label} {required && <span className="text-danger">*</span>}
      </Label>
      {children}
      {error && <p className="text-[12px] text-danger mt-1">{error}</p>}
    </div>
  );
}

function SummaryRow({ label, value, valueClass }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[13px] text-text-muted">{label}</span>
      <span className={cn("text-[13px] font-medium text-text-primary", valueClass)}>{value}</span>
    </div>
  );
}

function SecurityItem({ icon: Icon, label }: { icon: typeof Shield; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="w-3.5 h-3.5 text-success shrink-0" />
      <span className="text-[11px] text-text-secondary">{label}</span>
    </div>
  );
}

function CryptoIcon({ coin }: { coin: CryptoCoin }) {
  const colors: Record<CryptoCoin, string> = {
    BTC: "text-warning",
    ETH: "text-blue-500",
    USDT: "text-green-500",
    USDC: "text-blue-600",
  };
  const labels: Record<CryptoCoin, string> = { BTC: "BTC", ETH: "ETH", USDT: "₮", USDC: "$" };
  return (
    <div className={cn("w-7 h-7 rounded-full bg-white border border-border flex items-center justify-center text-[11px] font-bold", colors[coin])}>
      {labels[coin]}
    </div>
  );
}

function PaymentSuccess({ onGoDashboard, total, method }: { onGoDashboard: () => void; total: number; method: PaymentMethod | null }) {
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="rounded-[16px] border-border shadow-card">
        <CardContent className="p-8">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-4"
            >
              <CheckCircle2 className="w-8 h-8 text-success" />
            </motion.div>
            <h2 className="text-xl font-bold text-text-primary">Payment Successful</h2>
            <p className="text-[14px] text-text-secondary mt-2 max-w-md">
              Welcome to ReadyPips. Your Funding Challenge has been activated successfully. Your dashboard is now ready. Good luck.
            </p>

            {/* Receipt */}
            <div className="w-full mt-6 rounded-[12px] border border-border bg-bg p-5 text-left">
              <div className="text-[13px] font-semibold text-text-primary mb-3">Receipt</div>
              <div className="space-y-2">
                <SummaryRow label="Receipt No." value="RP-2026-00184" />
                <SummaryRow label="Transaction ID" value="TXN-9f2a8b7c" />
                <SummaryRow label="Challenge" value="Evaluation Challenge" />
                <SummaryRow label="Amount Paid" value={`$${total.toFixed(2)}`} />
                <SummaryRow label="Payment Method" value={method === "mpesa" ? "M-Pesa" : method === "card" ? "Bank Card" : "Cryptocurrency"} />
                <SummaryRow label="Date" value={new Date().toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })} />
                <SummaryRow label="Time" value={new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })} />
                <SummaryRow label="Customer" value="Ahmed Bader" />
                <SummaryRow label="Email" value="ahmed@example.com" />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <Button onClick={onGoDashboard} className="rounded-button h-11 px-6 text-[14px] font-semibold">
                Go to Dashboard <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <Button variant="outline" onClick={() => {}} className="rounded-button h-11 px-5 text-[14px] font-medium">
                <Zap className="w-4 h-4 mr-1" /> Start Challenge
              </Button>
              <Button variant="outline" onClick={() => {}} className="rounded-button h-11 px-5 text-[14px] font-medium">
                <Download className="w-4 h-4 mr-1" /> Download Receipt
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function PaymentFailed({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="rounded-[16px] border-border shadow-card">
        <CardContent className="p-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-danger/10 flex items-center justify-center mb-4">
              <XCircle className="w-8 h-8 text-danger" />
            </div>
            <h2 className="text-xl font-bold text-text-primary">Payment Failed</h2>
            <p className="text-[14px] text-text-secondary mt-2">
              Your payment could not be processed. This may be due to insufficient funds, an expired card, or a network issue.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <Button onClick={onRetry} className="rounded-button h-11 px-6 text-[14px] font-semibold">
                <Lock className="w-4 h-4 mr-1" /> Retry Payment
              </Button>
              <Button variant="outline" onClick={() => {}} className="rounded-button h-11 px-5 text-[14px] font-medium">
                Choose Another Method
              </Button>
              <Button variant="outline" onClick={() => {}} className="rounded-button h-11 px-5 text-[14px] font-medium">
                Contact Support
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
