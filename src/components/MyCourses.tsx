import { motion } from "framer-motion";
import { ChevronRight, Play } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const courses = [
  {
    title: "Forex Fundamentals Masterclass",
    level: "Beginner",
    progress: 78,
    image: "/funding_pips_picture_2.jpg",
    color: "bg-emerald-500",
  },
  {
    title: "Advanced Price Action Trading",
    level: "Advanced",
    progress: 45,
    image: "/funding_pips_picture_2.jpg",
    color: "bg-[#5B2ED4]",
  },
  {
    title: "Risk Management & Psychology",
    level: "Intermediate",
    progress: 32,
    image: "/funding_pips_picture_2.jpg",
    color: "bg-amber-500",
  },
];

export function MyCourses() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="rounded-[28px] border-[#ECECEC] shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-lg font-bold text-[#111827]">My Courses</CardTitle>
          <Button variant="ghost" className="text-[#5B2ED4] hover:text-[#4a24b0] hover:bg-[#F0EEFC] text-sm font-semibold gap-1">
            View All <ChevronRight className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          {courses.map((course, i) => (
            <motion.div
              key={course.title}
              whileHover={{ backgroundColor: "rgba(248,249,252,1)" }}
              className={cn(
                "group flex flex-col sm:flex-row items-start sm:items-center gap-5 p-5 transition-all cursor-pointer",
                i !== courses.length - 1 && "border-b border-[#ECECEC]"
              )}
            >
              <div className="w-full sm:w-40 h-24 rounded-xl overflow-hidden flex-shrink-0">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={cn("text-[10px] font-bold px-2.5 py-1 rounded-full text-white uppercase tracking-wide", course.color)}>
                    {course.level}
                  </span>
                </div>
                <h4 className="font-bold text-[#111827] text-[15px] mb-3">{course.title}</h4>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2.5 bg-[#F0EEFC] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${course.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={cn("h-full rounded-full", course.color)}
                    />
                  </div>
                  <span className="text-sm font-bold text-[#6B7280]">{course.progress}%</span>
                </div>
              </div>
              <Button className="rounded-xl bg-[#F0EEFC] text-[#5B2ED4] hover:bg-[#5B2ED4] hover:text-white font-semibold gap-1 transition-all">
                <Play className="w-4 h-4" /> Continue
              </Button>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}