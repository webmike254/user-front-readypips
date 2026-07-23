import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Shield,
  Bell,
  Palette,
  Globe,
  Lock,
  Eye,
  EyeOff,
  Camera,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Key,
  Smartphone,
  Monitor,
  Moon,
  Sun,
  CheckCircle2,
  AlertCircle,
  LogOut,
  HelpCircle,
  MessageCircle,
  FileText,
  Crown,
  Zap,
  Download,
  Trash2,
  Save,
  Upload,
  Users,
  Link,
  Unlink,
  CreditCard,
  Bitcoin,
  Building2,
  RefreshCcw,
  Fingerprint,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const menuItems = [
  { key: "profile", label: "Profile", icon: User },
  { key: "security", label: "Security", icon: Shield },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "appearance", label: "Appearance", icon: Palette },
  { key: "trading", label: "Trading Preferences", icon: Globe },
  { key: "payments", label: "Payment Methods", icon: CreditCard },
  { key: "privacy", label: "Privacy", icon: Lock },
  { key: "devices", label: "Devices", icon: Monitor },
  { key: "support", label: "Support", icon: HelpCircle },
];

const connectedAccounts = [
  { name: "Google", icon: Mail, connected: true, detail: "ahmed.bader@gmail.com" },
  { name: "Telegram", icon: MessageCircle, connected: true, detail: "@ahmed_trader" },
  { name: "WhatsApp", icon: Phone, connected: true, detail: "+254 712 345 678" },
  { name: "Discord", icon: Users, connected: false, detail: "" },
];

const sessions = [
  { device: "Chrome on Windows", location: "Nairobi, Kenya", time: "Current session", active: true, icon: Monitor },
  { device: "Safari on iPhone", location: "Nairobi, Kenya", time: "2 hours ago", active: false, icon: Smartphone },
  { device: "Chrome on Android", location: "Mombasa, Kenya", time: "Yesterday", active: false, icon: Smartphone },
];

export function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [liveReminders, setLiveReminders] = useState(true);
  const [mentorAlerts, setMentorAlerts] = useState(true);
  const [challengeUpdates, setChallengeUpdates] = useState(true);
  const [fundingAlerts, setFundingAlerts] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [compactMode, setCompactMode] = useState(false);

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-text-primary">Profile</h2>
              <p className="text-[13px] text-text-muted mt-0.5">Update your personal details and public profile.</p>
            </div>
            <Card className="rounded-[18px] border-border shadow-card">
              <CardContent className="p-6 space-y-5">
                <div className="flex items-center gap-4">
                  <div className="relative group">
                    <Avatar className="w-16 h-16"><AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" /><AvatarFallback className="bg-primary text-white text-lg">AB</AvatarFallback></Avatar>
                    <div className="absolute inset-0 bg-black/30 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-150 cursor-pointer"><Camera className="w-5 h-5 text-white" /></div>
                  </div>
                  <div><p className="font-medium text-text-primary">Ahmed Bader</p><div className="flex items-center gap-1.5 mt-0.5"><Badge className="bg-primary/8 text-primary hover:bg-primary/8 rounded text-[10px] border-0">Premium</Badge><CheckCircle2 className="w-3.5 h-3.5 text-success" /></div><Button variant="outline" size="sm" className="rounded-button border-border text-text-secondary hover:bg-primary/5 text-[13px] h-7 mt-2"><Upload className="w-3 h-3 mr-1" /> Change Photo</Button></div>
                </div>
                <Separator className="bg-border" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5"><Label className="text-[13px] text-text-primary">Full Name</Label><Input defaultValue="Ahmed Bader" className="rounded-button border-border h-9 text-[13px]" /></div>
                  <div className="space-y-1.5"><Label className="text-[13px] text-text-primary">Username</Label><Input defaultValue="ahmed_trader" className="rounded-button border-border h-9 text-[13px]" /></div>
                  <div className="space-y-1.5"><Label className="text-[13px] text-text-primary">Email</Label><Input defaultValue="ahmed.bader@gmail.com" className="rounded-button border-border h-9 text-[13px]" /></div>
                  <div className="space-y-1.5"><Label className="text-[13px] text-text-primary">Phone</Label><Input defaultValue="+254 712 345 678" className="rounded-button border-border h-9 text-[13px]" /></div>
                  <div className="space-y-1.5"><Label className="text-[13px] text-text-primary">Country</Label><Input defaultValue="Kenya" className="rounded-button border-border h-9 text-[13px]" /></div>
                  <div className="space-y-1.5"><Label className="text-[13px] text-text-primary">Timezone</Label><Input defaultValue="Africa/Nairobi" className="rounded-button border-border h-9 text-[13px]" /></div>
                  <div className="space-y-1.5"><Label className="text-[13px] text-text-primary">Trading Experience</Label><Input defaultValue="Intermediate" className="rounded-button border-border h-9 text-[13px]" /></div>
                  <div className="space-y-1.5"><Label className="text-[13px] text-text-primary">Date of Birth</Label><Input type="date" defaultValue="1995-06-15" className="rounded-button border-border h-9 text-[13px]" /></div>
                </div>
                <div className="space-y-1.5"><Label className="text-[13px] text-text-primary">Bio</Label><Input defaultValue="Forex trader | Price action enthusiast | ReadyPips Premium" className="rounded-button border-border h-9 text-[13px]" /></div>
                <div className="flex items-center gap-2 pt-2"><Button className="bg-primary hover:bg-primary-hover text-white rounded-button h-9 px-4 text-[13px] font-medium transition-all duration-150 hover:-translate-y-px"><Save className="w-4 h-4 mr-1.5" /> Save Changes</Button><Button variant="outline" className="rounded-button border-border text-text-secondary hover:bg-primary/5 text-[13px] h-9">Cancel</Button></div>
              </CardContent>
            </Card>
            <Card className="rounded-[18px] border-border shadow-card">
              <CardHeader><CardTitle className="text-base font-semibold text-text-primary">Connected Accounts</CardTitle><CardDescription className="text-[13px] text-text-muted">Link your social accounts.</CardDescription></CardHeader>
              <CardContent className="space-y-2">
                {connectedAccounts.map((a) => { const Icon = a.icon; return (
                  <div key={a.name} className="flex items-center justify-between p-3 rounded-button border border-border hover:border-primary/20 transition-colors duration-150">
                    <div className="flex items-center gap-2.5"><Icon className={cn("w-4 h-4", a.connected ? "text-primary" : "text-text-muted")} /><div><p className="text-[13px] font-medium text-text-primary">{a.name}</p><p className="text-[11px] text-text-muted">{a.connected ? a.detail : "Not connected"}</p></div></div>
                    {a.connected ? <Button size="sm" variant="ghost" className="text-danger hover:bg-danger/5 rounded text-[12px] h-7"><Unlink className="w-3 h-3 mr-1" /> Disconnect</Button> : <Button size="sm" variant="outline" className="rounded-button border-primary/20 text-primary hover:bg-primary/5 text-[12px] h-7"><Link className="w-3 h-3 mr-1" /> Connect</Button>}
                  </div>
                ); })}
              </CardContent>
            </Card>
          </div>
        );

      case "security":
        return (
          <div className="space-y-6">
            <div><h2 className="text-lg font-semibold text-text-primary">Security</h2><p className="text-[13px] text-text-muted mt-0.5">Manage your password and account security.</p></div>
            <Card className="rounded-[18px] border-border shadow-card">
              <CardHeader><CardTitle className="text-base font-semibold text-text-primary">Change Password</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1.5"><Label className="text-[13px]">Current Password</Label><div className="relative"><Input type={showPassword ? "text" : "password"} placeholder="Enter current password" className="rounded-button border-border h-9 text-[13px] pr-9" /><button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary">{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button></div></div>
                <div className="space-y-1.5"><Label className="text-[13px]">New Password</Label><Input type="password" placeholder="Enter new password" className="rounded-button border-border h-9 text-[13px]" /></div>
                <div className="space-y-1.5"><Label className="text-[13px]">Confirm Password</Label><Input type="password" placeholder="Confirm new password" className="rounded-button border-border h-9 text-[13px]" /></div>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {[{ label: "8+ characters", met: true }, { label: "Uppercase letter", met: true }, { label: "Number", met: false }, { label: "Special character", met: false }].map((r) => (
                    <div key={r.label} className="flex items-center gap-1.5 text-[12px]">{r.met ? <CheckCircle2 className="w-3 h-3 text-success" /> : <AlertCircle className="w-3 h-3 text-text-muted" />}<span className={r.met ? "text-success" : "text-text-muted"}>{r.label}</span></div>
                  ))}
                </div>
                <Button className="bg-primary hover:bg-primary-hover text-white rounded-button h-9 px-4 text-[13px] font-medium transition-all duration-150 hover:-translate-y-px"><Key className="w-4 h-4 mr-1.5" /> Update Password</Button>
              </CardContent>
            </Card>
            <Card className="rounded-[18px] border-border shadow-card">
              <CardHeader><CardTitle className="text-base font-semibold text-text-primary">Two-Factor Authentication</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-button border border-success/20 bg-success/5">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  <div className="flex-1"><p className="text-[13px] font-medium text-success">2FA is enabled</p><p className="text-[11px] text-text-muted">Protected with authenticator app</p></div>
                  <Button size="sm" variant="outline" className="rounded-button border-success/20 text-success hover:bg-success/5 text-[12px] h-7">Configure</Button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-button border border-border"><div className="flex items-center gap-2 mb-1"><Smartphone className="w-4 h-4 text-primary" /><p className="text-[13px] font-medium text-text-primary">Authenticator App</p></div><Badge className="bg-success/10 text-success hover:bg-success/10 rounded text-[10px] border-0">Active</Badge></div>
                  <div className="p-3 rounded-button border border-border"><div className="flex items-center gap-2 mb-1"><Phone className="w-4 h-4 text-text-muted" /><p className="text-[13px] font-medium text-text-primary">SMS Verification</p></div><Button size="sm" variant="outline" className="rounded-button border-border text-[12px] h-6 mt-1">Enable</Button></div>
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-[18px] border-border shadow-card">
              <CardHeader><CardTitle className="text-base font-semibold text-text-primary">Active Sessions</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {sessions.map((s) => { const Icon = s.icon; return (
                  <div key={s.device} className="flex items-center justify-between p-3 rounded-button border border-border">
                    <div className="flex items-center gap-2.5"><Icon className={cn("w-4 h-4", s.active ? "text-success" : "text-text-muted")} /><div><p className="text-[13px] font-medium text-text-primary">{s.device}{s.active && <Badge className="ml-1.5 bg-success/10 text-success hover:bg-success/10 rounded text-[10px] border-0">Current</Badge>}</p><p className="text-[11px] text-text-muted">{s.location} · {s.time}</p></div></div>
                    {!s.active && <Button size="sm" variant="ghost" className="text-danger hover:bg-danger/5 rounded text-[12px] h-7"><LogOut className="w-3 h-3 mr-1" /> Revoke</Button>}
                  </div>
                ); })}
                <Button variant="outline" className="w-full rounded-button border-danger/20 text-danger hover:bg-danger/5 text-[13px] h-9 mt-2"><LogOut className="w-4 h-4 mr-1.5" /> Sign Out All Other Devices</Button>
              </CardContent>
            </Card>
            <Card className="rounded-[18px] border-border shadow-card">
              <CardHeader><CardTitle className="text-base font-semibold text-text-primary">Data & Privacy</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded-button border border-border hover:border-primary/20 transition-colors duration-150"><div className="flex items-center gap-2.5"><Download className="w-4 h-4 text-primary" /><div><p className="text-[13px] font-medium text-text-primary">Export My Data</p><p className="text-[11px] text-text-muted">Download a copy of all your data</p></div></div><Button size="sm" variant="outline" className="rounded-button border-border text-[12px] h-7">Export</Button></div>
                <div className="flex items-center justify-between p-3 rounded-button border border-danger/20 hover:border-danger/40 transition-colors duration-150"><div className="flex items-center gap-2.5"><Trash2 className="w-4 h-4 text-danger" /><div><p className="text-[13px] font-medium text-danger">Delete Account</p><p className="text-[11px] text-text-muted">Permanently delete your account and data</p></div></div><Button size="sm" variant="outline" className="rounded-button border-danger/20 text-danger hover:bg-danger/5 text-[12px] h-7">Delete</Button></div>
              </CardContent>
            </Card>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <div><h2 className="text-lg font-semibold text-text-primary">Notifications</h2><p className="text-[13px] text-text-muted mt-0.5">Choose how you want to receive notifications.</p></div>
            <Card className="rounded-[18px] border-border shadow-card">
              <CardHeader><CardTitle className="text-base font-semibold text-text-primary">Channels</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {[{ label: "Email Notifications", desc: "Receive updates via email", icon: Mail, state: emailNotif, setter: setEmailNotif }, { label: "Push Notifications", desc: "Browser and mobile push alerts", icon: Bell, state: pushNotif, setter: setPushNotif }, { label: "SMS Notifications", desc: "Text message alerts", icon: Phone, state: smsNotif, setter: setSmsNotif }].map((c) => { const Icon = c.icon; return (
                  <div key={c.label} className="flex items-center justify-between p-3 rounded-button border border-border">
                    <div className="flex items-center gap-2.5"><Icon className="w-4 h-4 text-primary" /><div><p className="text-[13px] font-medium text-text-primary">{c.label}</p><p className="text-[11px] text-text-muted">{c.desc}</p></div></div>
                    <Switch checked={c.state} onCheckedChange={c.setter} className="data-[state=checked]:bg-primary" />
                  </div>
                ); })}
              </CardContent>
            </Card>
            <Card className="rounded-[18px] border-border shadow-card">
              <CardHeader><CardTitle className="text-base font-semibold text-text-primary">Preferences</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {[{ label: "Live Class Reminders", desc: "Get notified before sessions start", state: liveReminders, setter: setLiveReminders }, { label: "Mentor Announcements", desc: "Updates from your instructors", state: mentorAlerts, setter: setMentorAlerts }, { label: "Challenge Updates", desc: "Challenge start, results, deadlines", state: challengeUpdates, setter: setChallengeUpdates }, { label: "Funding Alerts", desc: "Withdrawal and deposit notifications", state: fundingAlerts, setter: setFundingAlerts }].map((p) => (
                  <div key={p.label} className="flex items-center justify-between py-2">
                    <div><p className="text-[13px] font-medium text-text-primary">{p.label}</p><p className="text-[11px] text-text-muted">{p.desc}</p></div>
                    <Switch checked={p.state} onCheckedChange={p.setter} className="data-[state=checked]:bg-primary" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        );

      case "appearance":
        return (
          <div className="space-y-6">
            <div><h2 className="text-lg font-semibold text-text-primary">Appearance</h2><p className="text-[13px] text-text-muted mt-0.5">Customize the look and feel of your dashboard.</p></div>
            <Card className="rounded-[18px] border-border shadow-card">
              <CardContent className="p-6 space-y-5">
                <div className="flex items-center justify-between"><div><p className="text-[13px] font-medium text-text-primary">Dark Mode</p><p className="text-[11px] text-text-muted">Switch between light and dark themes</p></div><Switch checked={darkMode} onCheckedChange={setDarkMode} className="data-[state=checked]:bg-primary" /></div>
                <Separator className="bg-border" />
                <div><p className="text-[13px] font-medium text-text-primary mb-3">Theme Color</p><div className="flex items-center gap-2">{["#5B3DF5", "#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#EC4899"].map((c) => <button key={c} className={cn("w-8 h-8 rounded-button transition-transform hover:scale-105", c === "#5B3DF5" && "ring-2 ring-offset-2 ring-primary")} style={{ backgroundColor: c }} />)}</div></div>
                <Separator className="bg-border" />
                <div className="flex items-center justify-between"><div><p className="text-[13px] font-medium text-text-primary">Compact Mode</p><p className="text-[11px] text-text-muted">Reduce spacing for more density</p></div><Switch checked={compactMode} onCheckedChange={setCompactMode} className="data-[state=checked]:bg-primary" /></div>
              </CardContent>
            </Card>
          </div>
        );

      case "trading":
        return (
          <div className="space-y-6">
            <div><h2 className="text-lg font-semibold text-text-primary">Trading Preferences</h2><p className="text-[13px] text-text-muted mt-0.5">Set your default trading parameters.</p></div>
            <Card className="rounded-[18px] border-border shadow-card">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5"><Label className="text-[13px]">Preferred Market</Label><Input defaultValue="Forex" className="rounded-button border-border h-9 text-[13px]" /></div>
                  <div className="space-y-1.5"><Label className="text-[13px]">Default Chart</Label><Input defaultValue="Candlestick" className="rounded-button border-border h-9 text-[13px]" /></div>
                  <div className="space-y-1.5"><Label className="text-[13px]">Default Pair</Label><Input defaultValue="EUR/USD" className="rounded-button border-border h-9 text-[13px]" /></div>
                  <div className="space-y-1.5"><Label className="text-[13px]">Trading Session</Label><Input defaultValue="London" className="rounded-button border-border h-9 text-[13px]" /></div>
                  <div className="space-y-1.5"><Label className="text-[13px]">Timezone</Label><Input defaultValue="Africa/Nairobi (GMT+3)" className="rounded-button border-border h-9 text-[13px]" /></div>
                  <div className="space-y-1.5"><Label className="text-[13px]">Currency Display</Label><Input defaultValue="USD ($)" className="rounded-button border-border h-9 text-[13px]" /></div>
                </div>
                <Button className="bg-primary hover:bg-primary-hover text-white rounded-button h-9 px-4 text-[13px] font-medium mt-4 transition-all duration-150 hover:-translate-y-px"><Save className="w-4 h-4 mr-1.5" /> Save Preferences</Button>
              </CardContent>
            </Card>
          </div>
        );

      case "payments":
        return (
          <div className="space-y-6">
            <div><h2 className="text-lg font-semibold text-text-primary">Payment Methods</h2><p className="text-[13px] text-text-muted mt-0.5">Manage your payment options.</p></div>
            <Card className="rounded-[18px] border-border shadow-card">
              <CardContent className="space-y-2">
                {[{ name: "M-Pesa", detail: "2547 **** 678", icon: Smartphone, active: true }, { name: "Visa ending 4242", detail: "Expires 12/25", icon: CreditCard, active: false }, { name: "USDT (TRC20)", detail: "TX...9x2A", icon: Bitcoin, active: false }, { name: "Bank Transfer", detail: "Equity Bank", icon: Building2, active: false }].map((m) => { const Icon = m.icon; return (
                  <div key={m.name} className="flex items-center justify-between p-3 rounded-button border border-border hover:border-primary/20 transition-colors duration-150">
                    <div className="flex items-center gap-2.5"><Icon className="w-4 h-4 text-primary" /><div><p className="text-[13px] font-medium text-text-primary">{m.name}</p><p className="text-[11px] text-text-muted">{m.detail}</p></div></div>
                    <div className="flex items-center gap-2">{m.active && <Badge className="bg-success/10 text-success hover:bg-success/10 rounded text-[10px] border-0">Default</Badge>}<Button size="sm" variant="ghost" className="text-text-muted hover:text-danger rounded text-[12px] h-7">Remove</Button></div>
                  </div>
                ); })}
                <Button variant="outline" className="w-full rounded-button border-border text-primary hover:bg-primary/5 text-[13px] h-9 mt-2"><Zap className="w-4 h-4 mr-1.5" /> Add Payment Method</Button>
              </CardContent>
            </Card>
          </div>
        );

      case "privacy":
        return (
          <div className="space-y-6">
            <div><h2 className="text-lg font-semibold text-text-primary">Privacy</h2><p className="text-[13px] text-text-muted mt-0.5">Control your profile and data visibility.</p></div>
            <Card className="rounded-[18px] border-border shadow-card">
              <CardContent className="space-y-3">
                {[{ label: "Profile Visibility", desc: "Show your profile to other members", default: true }, { label: "Community Visibility", desc: "Show your activity in community", default: true }, { label: "Hide Email", desc: "Don't show email on your profile", default: true }, { label: "Hide Phone", desc: "Don't show phone on your profile", default: false }].map((p) => (
                  <div key={p.label} className="flex items-center justify-between py-2"><div><p className="text-[13px] font-medium text-text-primary">{p.label}</p><p className="text-[11px] text-text-muted">{p.desc}</p></div><Switch defaultChecked={p.default} className="data-[state=checked]:bg-primary" /></div>
                ))}
              </CardContent>
            </Card>
            <Card className="rounded-[18px] border-border shadow-card">
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded-button border border-border hover:border-primary/20 transition-colors duration-150"><div className="flex items-center gap-2.5"><Download className="w-4 h-4 text-primary" /><div><p className="text-[13px] font-medium text-text-primary">Export Data</p><p className="text-[11px] text-text-muted">Download all your data</p></div></div><Button size="sm" variant="outline" className="rounded-button border-border text-[12px] h-7">Export</Button></div>
                <div className="flex items-center justify-between p-3 rounded-button border border-danger/20"><div className="flex items-center gap-2.5"><Trash2 className="w-4 h-4 text-danger" /><div><p className="text-[13px] font-medium text-danger">Delete Account</p><p className="text-[11px] text-text-muted">This action is irreversible</p></div></div><Button size="sm" variant="outline" className="rounded-button border-danger/20 text-danger hover:bg-danger/5 text-[12px] h-7">Delete</Button></div>
              </CardContent>
            </Card>
          </div>
        );

      case "devices":
        return (
          <div className="space-y-6">
            <div><h2 className="text-lg font-semibold text-text-primary">Devices</h2><p className="text-[13px] text-text-muted mt-0.5">Manage your active login sessions.</p></div>
            <Card className="rounded-[18px] border-border shadow-card">
              <CardContent className="space-y-2">
                {sessions.map((s) => { const Icon = s.icon; return (
                  <div key={s.device} className="flex items-center justify-between p-3 rounded-button border border-border">
                    <div className="flex items-center gap-2.5"><Icon className={cn("w-4 h-4", s.active ? "text-success" : "text-text-muted")} /><div><p className="text-[13px] font-medium text-text-primary">{s.device}</p><p className="text-[11px] text-text-muted">{s.location} · {s.time}</p></div></div>
                    {!s.active && <Button size="sm" variant="ghost" className="text-danger hover:bg-danger/5 rounded text-[12px] h-7">Remove</Button>}
                  </div>
                ); })}
                <Button variant="outline" className="w-full rounded-button border-danger/20 text-danger hover:bg-danger/5 text-[13px] h-9 mt-2"><LogOut className="w-4 h-4 mr-1.5" /> Sign Out All Other Devices</Button>
              </CardContent>
            </Card>
          </div>
        );

      case "support":
        return (
          <div className="space-y-6">
            <div><h2 className="text-lg font-semibold text-text-primary">Support</h2><p className="text-[13px] text-text-muted mt-0.5">Get help with your account and platform.</p></div>
            <Card className="rounded-[18px] border-border shadow-card">
              <CardContent className="space-y-2">
                {[{ label: "Open Ticket", desc: "Submit a support request", icon: FileText }, { label: "Live Chat", desc: "Chat with our support team", icon: MessageCircle }, { label: "WhatsApp Support", desc: "Message us on WhatsApp", icon: Phone }, { label: "Report Bug", desc: "Report a platform issue", icon: AlertCircle }, { label: "Feature Request", desc: "Suggest a new feature", icon: Zap }].map((s) => { const Icon = s.icon; return (
                  <div key={s.label} className="flex items-center justify-between p-3 rounded-button border border-border hover:border-primary/20 transition-colors duration-150 cursor-pointer">
                    <div className="flex items-center gap-2.5"><Icon className="w-4 h-4 text-primary" /><div><p className="text-[13px] font-medium text-text-primary">{s.label}</p><p className="text-[11px] text-text-muted">{s.desc}</p></div></div>
                    <ChevronRight className="w-4 h-4 text-text-muted" />
                  </div>
                ); })}
              </CardContent>
            </Card>
          </div>
        );

      default: return null;
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15 }} className="pb-8">
      <div className="mb-8">
        <h1 className="text-[40px] font-bold text-text-primary">Settings</h1>
        <p className="text-text-secondary text-[15px] mt-1">Manage your account preferences and security.</p>
      </div>

      <div className="flex gap-6">
        <nav className="w-52 shrink-0">
          <div className="sticky top-20 space-y-0.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = activeSection === item.key;
              return (
                <button key={item.key} onClick={() => setActiveSection(item.key)} className={cn("w-full flex items-center gap-2.5 px-3 py-2 rounded-button text-[13px] font-medium transition-all duration-150 text-left", active ? "bg-primary/8 text-primary" : "text-text-secondary hover:bg-bg hover:text-text-primary")}>
                  <Icon className={cn("w-4 h-4", active ? "text-primary" : "text-text-muted")} />{item.label}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="flex-1 min-w-0">
          {renderSection()}
        </div>
      </div>
    </motion.div>
  );
}
