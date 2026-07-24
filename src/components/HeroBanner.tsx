import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

function formatCountdown(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function HeroBanner() {
  const [timeLeft, setTimeLeft] = useState(7 * 3600 + 38 * 60 + 3);
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft((p) => (p > 0 ? p - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-[28px] bg-[#1a103c] shadow-xl shadow-[#5B2ED4]/15 min-h-[320px]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#2d1b69] via-[#4c2bd3] to-[#5B2ED4]" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-64 h-64 bg-[#7B61FF] rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-20 w-80 h-80 bg-[#5B2ED4] rounded-full blur-[120px]" />
      </div>
      <div className="relative z-10 flex flex-col md:flex-row h-full min-h-[320px]">
        <div className="flex-1 p-8 lg:p-10 flex flex-col justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl lg:text-[32px] font-bold text-white mb-3"
          >
            Welcome back, Ahmed!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-sm lg:text-[15px] text-white/75 max-w-md leading-relaxed mb-6"
          >
            Keep learning, keep growing, and become a consistent trader. Your next milestone is within reach.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-1"
          >
            <div className="text-5xl lg:text-[56px] font-bold text-white tabular-nums tracking-tight">
              {formatCountdown(timeLeft)}
            </div>
            <p className="text-xs text-white/60 mt-1">Time left before next live class</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6"
          >
            <Button className="rounded-2xl bg-white text-[#5B2ED4] hover:bg-white/90 font-bold px-7 py-6 shadow-lg text-[15px]">
              Join Live Class
            </Button>
          </motion.div>
        </div>
        <div className="hidden md:block w-[48%] relative">
          <img
            src="/funding_pips_picture_3.png"
            alt="Trader at desk"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2d1b69] via-[#4c2bd3]/60 to-transparent" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/10">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "65%" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-[#7B61FF] to-[#A78BFA]"
        />
      </div>
    </motion.div>
  );
}