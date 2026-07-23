import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("animate-pulse rounded-button bg-border/60", className)} {...props} />
  );
}

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-[18px] border border-border bg-white p-5 shadow-card space-y-4", className)}>
      <div className="flex items-center gap-3">
        <Skeleton className="w-8 h-8 rounded-button" />
        <div className="space-y-1.5 flex-1">
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="h-2 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <div className="flex gap-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  );
}

export function ListItemSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3 p-3 rounded-button border border-border bg-white", className)}>
      <Skeleton className="w-8 h-8 rounded-button shrink-0" />
      <div className="space-y-1.5 flex-1">
        <Skeleton className="h-3 w-2/3" />
        <Skeleton className="h-2 w-1/3" />
      </div>
      <Skeleton className="h-4 w-12 shrink-0" />
    </div>
  );
}

export function StatSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-[18px] border border-border bg-white p-5 shadow-card", className)}>
      <Skeleton className="w-4 h-4 mb-2" />
      <Skeleton className="h-6 w-16 mb-1" />
      <Skeleton className="h-3 w-20" />
    </div>
  );
}

export function TableSkeleton({ rows = 4, className }: { rows?: number; className?: string }) {
  return (
    <div className={cn("rounded-[18px] border border-border bg-white shadow-card overflow-hidden", className)}>
      <div className="p-4 border-b border-border space-y-2">
        <div className="flex items-center gap-2">
          <Skeleton className="w-4 h-4" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      <div className="p-4 space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="w-8 h-8 rounded-button" />
            <div className="space-y-1.5 flex-1">
              <Skeleton className="h-3 w-2/3" />
              <Skeleton className="h-2 w-1/3" />
            </div>
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChartSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-[18px] border border-border bg-white p-4 shadow-card", className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Skeleton className="w-4 h-4" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-4 w-20" />
      </div>
      <Skeleton className="h-64 w-full rounded-[18px]" />
    </div>
  );
}

export function HeroSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-[18px] border border-border bg-white p-6 shadow-card", className)}>
      <div className="flex items-center gap-3 mb-4">
        <Skeleton className="w-1 h-8 rounded-full" />
        <div className="space-y-1.5 flex-1">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-3 w-64" />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-9 w-28" />
        <Skeleton className="h-9 w-28" />
      </div>
    </div>
  );
}

export function PageSkeleton({ stats = 4, cards = 3, list = 3 }: { stats?: number; cards?: number; list?: number }) {
  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-4 w-96" />
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
