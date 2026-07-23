import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

function Shimmer({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("relative overflow-hidden rounded-button bg-[#F0F0F3]", className)} {...props}>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
    </div>
  );
}

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn("rounded-[18px] border border-border bg-white p-5 shadow-card space-y-4", className)}
    >
      <div className="flex items-center gap-3">
        <Shimmer className="w-10 h-10 rounded-[12px]" />
        <div className="space-y-2 flex-1">
          <Shimmer className="h-3.5 w-1/3 rounded-full" />
          <Shimmer className="h-2.5 w-1/2 rounded-full" />
        </div>
      </div>
      <div className="space-y-2">
        <Shimmer className="h-4 w-full rounded-full" />
        <Shimmer className="h-4 w-4/5 rounded-full" />
        <Shimmer className="h-4 w-3/5 rounded-full" />
      </div>
      <div className="flex gap-2 pt-1">
        <Shimmer className="h-9 w-24 rounded-full" />
        <Shimmer className="h-9 w-24 rounded-full" />
      </div>
    </motion.div>
  );
}

export function ListItemSkeleton({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      className={cn("flex items-center gap-3 p-3.5 rounded-button border border-border bg-white", className)}
    >
      <Shimmer className="w-10 h-10 rounded-[12px] shrink-0" />
      <div className="space-y-2 flex-1">
        <Shimmer className="h-3.5 w-2/3 rounded-full" />
        <Shimmer className="h-2.5 w-1/3 rounded-full" />
      </div>
      <Shimmer className="h-5 w-14 rounded-full shrink-0" />
    </motion.div>
  );
}

export function StatSkeleton({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={cn("rounded-[18px] border border-border bg-white p-5 shadow-card space-y-3", className)}
    >
      <div className="flex items-center gap-2">
        <Shimmer className="w-4 h-4 rounded-full" />
        <Shimmer className="h-3 w-16 rounded-full" />
      </div>
      <Shimmer className="h-7 w-20 rounded-full" />
      <Shimmer className="h-3 w-24 rounded-full" />
    </motion.div>
  );
}

export function TableSkeleton({ rows = 4, className }: { rows?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn("rounded-[18px] border border-border bg-white shadow-card overflow-hidden", className)}
    >
      <div className="p-4 border-b border-border space-y-2">
        <div className="flex items-center gap-2">
          <Shimmer className="w-4 h-4 rounded-full" />
          <Shimmer className="h-4 w-32 rounded-full" />
        </div>
      </div>
      <div className="p-4 space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05, duration: 0.15 }}
            className="flex items-center gap-3"
          >
            <Shimmer className="w-8 h-8 rounded-[12px]" />
            <div className="space-y-1.5 flex-1">
              <Shimmer className="h-3 w-2/3 rounded-full" />
              <Shimmer className="h-2 w-1/3 rounded-full" />
            </div>
            <Shimmer className="h-6 w-16 rounded-full" />
            <Shimmer className="h-6 w-16 rounded-full" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function ChartSkeleton({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn("rounded-[18px] border border-border bg-white p-4 shadow-card space-y-4", className)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shimmer className="w-4 h-4 rounded-full" />
          <Shimmer className="h-4 w-32 rounded-full" />
        </div>
        <Shimmer className="h-4 w-20 rounded-full" />
      </div>
      <div className="space-y-2">
        <Shimmer className="h-48 w-full rounded-[12px]" />
        <div className="flex justify-between px-2">
          <Shimmer className="h-2 w-8 rounded-full" />
          <Shimmer className="h-2 w-8 rounded-full" />
          <Shimmer className="h-2 w-8 rounded-full" />
          <Shimmer className="h-2 w-8 rounded-full" />
          <Shimmer className="h-2 w-8 rounded-full" />
        </div>
      </div>
    </motion.div>
  );
}

export function HeroSkeleton({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn("rounded-[18px] border border-border bg-white p-6 shadow-card space-y-4", className)}
    >
      <div className="flex items-center gap-3 mb-4">
        <Shimmer className="w-1 h-8 rounded-full" />
        <div className="space-y-2 flex-1">
          <Shimmer className="h-5 w-48 rounded-full" />
          <Shimmer className="h-3 w-64 rounded-full" />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Shimmer className="h-9 w-28 rounded-full" />
        <Shimmer className="h-9 w-28 rounded-full" />
      </div>
    </motion.div>
  );
}

export function PageSkeleton({ stats = 4, cards = 3, list = 3 }: { stats?: number; cards?: number; list?: number }) {
  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <Shimmer className="h-10 w-48 rounded-full" />
        <Shimmer className="h-4 w-96 rounded-full" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: stats }).map((_, i) => <StatSkeleton key={i} />)}
      </div>
      <HeroSkeleton />
      <div className="grid gap-4">
        {Array.from({ length: cards }).map((_, i) => <CardSkeleton key={i} />)}
      </div>
      <div className="space-y-2">
        {Array.from({ length: list }).map((_, i) => <ListItemSkeleton key={i} />)}
      </div>
    </div>
  );
}

export function TickerSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="rounded-[18px] border border-border bg-white p-4 shadow-card overflow-hidden"
    >
      <div className="flex items-center gap-6 overflow-hidden">
        <Shimmer className="h-4 w-28 rounded-full shrink-0" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2 shrink-0">
            <Shimmer className="w-10 h-4 rounded-full" />
            <Shimmer className="w-16 h-4 rounded-full" />
            <Shimmer className="w-12 h-4 rounded-full" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function MiniCardSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05, duration: 0.15 }}
          className="rounded-button border border-border bg-white shadow-card text-center p-3 space-y-2"
        >
          <Shimmer className="h-5 w-8 mx-auto rounded-full" />
          <Shimmer className="h-2.5 w-12 mx-auto rounded-full" />
        </motion.div>
      ))}
    </div>
  );
}
