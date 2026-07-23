import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const days = [
  { day: "M", completed: true, date: "Mon, 16 Oct" },
  { day: "T", completed: true, date: "Tue, 17 Oct" },
  { day: "W", completed: true, date: "Wed, 18 Oct" },
  { day: "T", completed: false, date: "Thu, 19 Oct" },
  { day: "F", completed: true, date: "Fri, 20 Oct" },
  { day: "S", completed: true, date: "Sat, 21 Oct" },
  { day: "S", completed: false, date: "Sun, 22 Oct" },
];

export function LearningStreak() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card className="rounded-[28px] border-[#ECECEC] shadow-sm">
        <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center">
              <Flame className="w-7 h-7 text-orange-500" />
            </div>
            <div>
              <div className="text-3xl font-bold text-[#111827]">12 Days</div>
              <p className="text-sm text-[#6B7280]">Keep your streak alive!</p>
            </div>
          </div>
          <TooltipProvider>
            <div className="flex-1 flex items-center justify-between gap-2 w-full">
              {days.map((d, i) => (
                <Tooltip key={i}>
                  <TooltipTrigger asChild>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold cursor-pointer transition-colors",
                        d.completed
                          ? "bg-[#22C55E] text-white"
                          : "bg-white border-2 border-[#ECECEC] text-[#6B7280]"
                      )}
                    >
                      {d.day}
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{d.date}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
        </CardContent>
      </Card>
    </motion.div>
  );
}