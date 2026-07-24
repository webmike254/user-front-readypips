import { useState } from "react";
import { motion } from "framer-motion";
import { Video, Calendar as CalendarIcon, Clock, Users, FileText, Download, MessageCircle, HelpCircle, Headphones, Bell, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";

const announcements = [
  { title: "New Live Events Added", time: "2 hours ago", type: "update" },
  { title: "Holiday Schedule Changes", time: "1 day ago", type: "notice" },
  { title: "Trading Competition Announced", time: "2 days ago", type: "event" },
];

export function LiveRightSidebar() {
  const [date, setDate] = useState<Date | undefined>(new Date(2023, 9, 22));

  return (
    <aside className="w-[340px] hidden xl:flex flex-col gap-6 h-full overflow-y-auto pr-1 no-scrollbar">
      {/* Upcoming Session */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <Card className="rounded-3xl border-[#ECECEC] shadow-sm overflow-hidden">
          <div className="h-32 relative">
            <img
              src="https://images.unsplash.com/photo-1611974765270-ca1258634369?w=500&h=300&fit=crop"
              alt="Upcoming"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3">
              <Badge className="bg-red-500 text-white border-none">Live</Badge>
            </div>
          </div>
          <CardContent className="p-5">
            <h3 className="font-semibold text-[#111827] mb-1">EUR/USD Live Market Breakdown</h3>
            <p className="text-xs text-[#6B7280] mb-3">Today at 14:00 GMT · 90 min</p>
            <div className="flex items-center gap-2 mb-4">
              <Avatar className="w-6 h-6">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
                <AvatarFallback>OA</AvatarFallback>
              </Avatar>
              <span className="text-xs text-[#6B7280]">Omar Al-Farsi · 128 joined</span>
            </div>
            <Button className="w-full bg-[#5B3DF5] hover:bg-[#4c32d4] text-white rounded-xl h-10">
              <Video className="w-4 h-4 mr-2" /> Join Live Class
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Calendar */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
        <Card className="rounded-3xl border-[#ECECEC] shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-[#111827] flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-[#5B3DF5]" /> October 2023
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-xl"
              defaultMonth={new Date(2023, 9, 1)}
            />
            <div className="mt-4 space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#F3F0FF] transition-colors cursor-pointer">
                <div className="w-2 h-2 rounded-full bg-[#5B3DF5] mt-1.5" />
                <div>
                  <p className="text-sm font-medium text-[#111827]">EUR/USD Breakdown</p>
                  <p className="text-xs text-[#6B7280]">14:00 GMT · 90 min</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#F3F0FF] transition-colors cursor-pointer">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5" />
                <div>
                  <p className="text-sm font-medium text-[#111827]">SMC Masterclass</p>
                  <p className="text-xs text-[#6B7280]">18:00 GMT · 120 min</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Resources */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
        <Card className="rounded-3xl border-[#ECECEC] shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-[#111827]">Resources</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { title: "Weekly Trading Plan", size: "2.4 MB" },
              { title: "Economic Calendar", size: "1.1 MB" },
              { title: "Session Slides", size: "5.6 MB" },
            ].map((res) => (
              <div key={res.title} className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F3F0FF] transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#111827]">{res.title}</p>
                    <p className="text-xs text-[#6B7280]">{res.size}</p>
                  </div>
                </div>
                <Download className="w-4 h-4 text-[#6B7280]" />
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Announcements */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
        <Card className="rounded-3xl border-[#ECECEC] shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-[#111827] flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#5B3DF5]" /> Announcements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {announcements.map((a) => (
              <div key={a.title} className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#F3F0FF] transition-colors cursor-pointer">
                <div className={`w-2 h-2 rounded-full mt-1.5 ${a.type === "update" ? "bg-[#5B3DF5]" : a.type === "notice" ? "bg-amber-500" : "bg-green-500"}`} />
                <div>
                  <p className="text-sm font-medium text-[#111827]">{a.title}</p>
                  <p className="text-xs text-[#6B7280]">{a.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Support */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 }}>
        <Card className="rounded-3xl border-[#ECECEC] shadow-sm bg-gradient-to-br from-[#5B3DF5] to-[#7C5CFF] text-white">
          <CardContent className="p-5">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-3">
              <Headphones className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-semibold mb-1">Need Help?</h3>
            <p className="text-sm text-white/80 mb-4">Our support team is available 24/7 to assist you.</p>
            <div className="space-y-2">
              <Button size="sm" className="w-full bg-white text-[#5B3DF5] hover:bg-white/90 rounded-xl h-9">
                <MessageCircle className="w-4 h-4 mr-2" /> Live Chat
              </Button>
              <Button size="sm" variant="outline" className="w-full border-white/30 text-white hover:bg-white/10 rounded-xl h-9">
                <HelpCircle className="w-4 h-4 mr-2" /> FAQ
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </aside>
  );
}