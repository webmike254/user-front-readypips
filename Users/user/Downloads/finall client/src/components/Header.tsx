import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Bell, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";

export function Header() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-[70px] flex-shrink-0 bg-white border-b border-[#ECECEC] z-10 px-6 lg:px-8 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-2">
          <span className="text-sm font-medium text-[#111827]">Good afternoon, Ahmed! 👋</span>
        </div>
        <div className="hidden lg:flex items-center gap-4 text-[13px] text-[#6B7280]">
          <span>{format(time, "h:mm a")}</span>
          <span>{format(time, "EEEE, d MMM yyyy")}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} className="p-2.5 rounded-xl hover:bg-[#F0EEFC] text-[#6B7280] transition-colors">
          <Search className="w-5 h-5" />
        </motion.button>
        <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} className="relative p-2.5 rounded-xl hover:bg-[#F0EEFC] text-[#6B7280] transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#EF4444] rounded-full border-2 border-white" />
        </motion.button>
        <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} className="p-2.5 rounded-xl hover:bg-[#F0EEFC] text-[#6B7280] transition-colors">
          <MessageSquare className="w-5 h-5" />
        </motion.button>
        <Avatar className="w-10 h-10 border-2 border-white shadow-sm cursor-pointer">
          <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" alt="Ahmed" />
          <AvatarFallback className="bg-[#5B2ED4] text-white">AB</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}