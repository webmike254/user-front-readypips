import { motion } from "framer-motion";
import { BookOpen, Video, BarChart3, Users, HeadphonesIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const actions = [
  { icon: BookOpen, label: "My Courses", color: "bg-blue-50 text-blue-600" },
  { icon: Video, label: "Live Classes", color: "bg-rose-50 text-rose-600" },
  { icon: BarChart3, label: "TradingView", color: "bg-emerald-50 text-emerald-600" },
  { icon: Users, label: "Community", color: "bg-amber-50 text-amber-600" },
  { icon: HeadphonesIcon, label: "Support", color: "bg-purple-50 text-[#7B61FF]" },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {actions.map((action, i) => {
        const Icon = action.icon;
        return (
          <motion.div
            key={action.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(0,0,0,0.08)" }}
          >
            <Card className="rounded-2xl border-[#ECECEC] shadow-sm hover:shadow-md transition-all cursor-pointer h-full">
              <CardContent className="p-5 flex flex-col items-center text-center gap-3">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", action.color)}
                >
                  <Icon className="w-6 h-6" />
                </motion.div>
                <span className="text-sm font-semibold text-[#111827]">{action.label}</span>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}