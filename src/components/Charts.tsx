import { useMemo } from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
  Area,
} from "recharts";
import { cn } from "@/lib/utils";

export interface ChartDataPoint {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  price?: number;
}

function formatPrice(price: number) {
  if (price >= 10000) return price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (price >= 1000) return price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (price >= 1) return price.toFixed(2);
  return price.toFixed(4);
}

function formatCompact(num: number) {
  if (num >= 1e12) return (num / 1e12).toFixed(1) + "T";
  if (num >= 1e9) return (num / 1e9).toFixed(1) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
  return num.toString();
}

export function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null;
  const item = payload[0].payload;
  const isUp = item.close >= item.open;
  return (
    <div className="bg-white border border-border rounded-button shadow-card p-3 text-xs z-50">
      <p className="font-semibold text-text-primary mb-1.5">{item.date || label}</p>
      <div className="space-y-1">
        <div className="flex justify-between gap-4">
          <span className="text-text-muted">Open</span>
          <span className="font-medium text-text-primary">{formatPrice(item.open)}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-text-muted">High</span>
          <span className="font-medium text-success">{formatPrice(item.high)}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-text-muted">Low</span>
          <span className="font-medium text-danger">{formatPrice(item.low)}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-text-muted">Close</span>
          <span className={cn("font-medium", isUp ? "text-success" : "text-danger")}>{formatPrice(item.close)}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-text-muted">Volume</span>
          <span className="font-medium text-text-primary">{formatCompact(item.volume)}</span>
        </div>
        {item.sma20 && (
          <div className="flex justify-between gap-4">
            <span className="text-text-muted">SMA 20</span>
            <span className="font-medium text-primary">{formatPrice(item.sma20)}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function calculateSMA(data: ChartDataPoint[], period: number): (number | null)[] {
  const result: (number | null)[] = [];
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      result.push(null);
      continue;
    }
    let sum = 0;
    for (let j = 0; j < period; j++) {
      sum += data[i - j].close;
    }
    result.push(sum / period);
  }
  return result;
}

function calculateEMA(data: ChartDataPoint[], period: number): (number | null)[] {
  const result: (number | null)[] = [];
  const multiplier = 2 / (period + 1);
  let ema = data[0]?.close || 0;
  for (let i = 0; i < data.length; i++) {
    if (i === 0) {
      result.push(ema);
    } else {
      ema = (data[i].close - ema) * multiplier + ema;
      result.push(ema);
    }
  }
  return result;
}

export interface CandlestickChartProps {
  data: ChartDataPoint[];
  height?: number;
  showSMA?: boolean;
  showEMA?: boolean;
  showVolume?: boolean;
  showGrid?: boolean;
  showReference?: boolean;
  currentPrice?: number;
  className?: string;
}

export function CandlestickChart({
  data,
  height = 400,
  showSMA = false,
  showEMA = false,
  showVolume = true,
  showGrid = true,
  showReference = true,
  currentPrice,
  className,
}: CandlestickChartProps) {
  const chartData = useMemo(() => {
    if (!data.length) return [];
    const sma20 = showSMA ? calculateSMA(data, 20) : [];
    const ema12 = showEMA ? calculateEMA(data, 12) : [];
    const ema26 = showEMA ? calculateEMA(data, 26) : [];

    return data.map((d, i) => ({
      ...d,
      price: d.close,
      isUp: d.close >= d.open,
      sma20: showSMA ? sma20[i] : null,
      ema12: showEMA ? ema12[i] : null,
      ema26: showEMA ? ema26[i] : null,
    }));
  }, [data, showSMA, showEMA]);

  if (!chartData.length) {
    return (
      <div className={cn("flex items-center justify-center bg-white rounded-[18px] border border-border", className)} style={{ height }}>
        <p className="text-[13px] text-text-muted">No data available</p>
      </div>
    );
  }

  return (
    <div className={cn("rounded-[18px] overflow-hidden border border-border bg-white", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />}
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#9A9A9A" }} axisLine={false} tickLine={false} minTickGap={30} />
          <YAxis
            domain={["auto", "auto"]}
            tick={{ fontSize: 11, fill: "#9A9A9A" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => formatPrice(v)}
            width={60}
          />
          <YAxis yAxisId="volume" orientation="right" hide domain={[0, "auto"]} />
          <Tooltip content={<CustomTooltip />} />
          {showReference && currentPrice !== undefined && (
            <ReferenceLine y={currentPrice} stroke="#5B3DF5" strokeDasharray="4 4" strokeOpacity={0.5} />
          )}

          {/* Volume */}
          {showVolume && (
            <Bar dataKey="volume" yAxisId="volume" barSize={chartData.length > 100 ? 2 : 4} radius={[1, 1, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.isUp ? "#22C55E20" : "#EF444420"} />
              ))}
            </Bar>
          )}

          {/* Candlestick wicks (high-low line) */}
          <Line type="monotone" dataKey="high" stroke="transparent" dot={false} />
          <Line type="monotone" dataKey="low" stroke="transparent" dot={false} />

          {/* SMA */}
          {showSMA && <Line type="monotone" dataKey="sma20" stroke="#5B3DF5" strokeWidth={1.5} dot={false} strokeOpacity={0.7} />}

          {/* EMA */}
          {showEMA && (
            <>
              <Line type="monotone" dataKey="ema12" stroke="#22C55E" strokeWidth={1.5} dot={false} strokeOpacity={0.7} />
              <Line type="monotone" dataKey="ema26" stroke="#EF4444" strokeWidth={1.5} dot={false} strokeOpacity={0.7} />
            </>
          )}

          {/* Close line as candle body representation */}
          <Bar
            dataKey="close"
            barSize={chartData.length > 100 ? 2 : 6}
            radius={[1, 1, 1, 1]}
            fill="#5B3DF5"
            shape={(props: any) => {
              const { x, y, width, height: h, payload } = props;
              const isUp = payload.isUp;
              const openY = props.yAxis.scale(payload.open);
              const closeY = props.yAxis.scale(payload.close);
              const highY = props.yAxis.scale(payload.high);
              const lowY = props.yAxis.scale(payload.low);
              const bodyTop = Math.min(openY, closeY);
              const bodyHeight = Math.abs(openY - closeY) || 1;
              const color = isUp ? "#22C55E" : "#EF4444";

              return (
                <g>
                  {/* Wick */}
                  <line x1={x + width / 2} y1={highY} x2={x + width / 2} y2={lowY} stroke={color} strokeWidth={1} />
                  {/* Body */}
                  <rect x={x + width * 0.1} y={bodyTop} width={width * 0.8} height={bodyHeight} fill={color} rx={1} />
                </g>
              );
            }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export interface AreaChartProps {
  data: ChartDataPoint[];
  height?: number;
  color?: string;
  showVolume?: boolean;
  showGrid?: boolean;
  showReference?: boolean;
  currentPrice?: number;
  className?: string;
}

export function PriceAreaChart({
  data,
  height = 400,
  color = "#5B3DF5",
  showVolume = true,
  showGrid = true,
  showReference = true,
  currentPrice,
  className,
}: AreaChartProps) {
  const chartData = useMemo(() => {
    if (!data.length) return [];
    return data.map((d) => ({
      ...d,
      price: d.close,
      isUp: d.close >= d.open,
    }));
  }, [data]);

  if (!chartData.length) {
    return (
      <div className={cn("flex items-center justify-center bg-white rounded-[18px] border border-border", className)} style={{ height }}>
        <p className="text-[13px] text-text-muted">No data available</p>
      </div>
    );
  }

  return (
    <div className={cn("rounded-[18px] overflow-hidden border border-border bg-white", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />}
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#9A9A9A" }} axisLine={false} tickLine={false} minTickGap={30} />
          <YAxis
            domain={["auto", "auto"]}
            tick={{ fontSize: 11, fill: "#9A9A9A" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => formatPrice(v)}
            width={60}
          />
          <YAxis yAxisId="volume" orientation="right" hide domain={[0, "auto"]} />
          <Tooltip content={<CustomTooltip />} />
          {showReference && currentPrice !== undefined && (
            <ReferenceLine y={currentPrice} stroke="#5B3DF5" strokeDasharray="4 4" strokeOpacity={0.5} />
          )}

          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.2} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>

          <Area type="monotone" dataKey="price" stroke={color} strokeWidth={2} fill="url(#areaGradient)" />

          {showVolume && (
            <Bar dataKey="volume" yAxisId="volume" barSize={chartData.length > 100 ? 2 : 4} radius={[2, 2, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`vol-${index}`} fill={entry.isUp ? "#22C55E20" : "#EF444420"} />
              ))}
            </Bar>
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export interface MultiLineChartProps {
  data: { date: string; [key: string]: number | string }[];
  lines: { key: string; color: string; name: string }[];
  height?: number;
  showGrid?: boolean;
  className?: string;
}

export function MultiLineChart({ data, lines, height = 300, showGrid = true, className }: MultiLineChartProps) {
  if (!data.length) {
    return (
      <div className={cn("flex items-center justify-center bg-white rounded-[18px] border border-border", className)} style={{ height }}>
        <p className="text-[13px] text-text-muted">No data available</p>
      </div>
    );
  }

  return (
    <div className={cn("rounded-[18px] overflow-hidden border border-border bg-white", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />}
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#9A9A9A" }} axisLine={false} tickLine={false} minTickGap={30} />
          <YAxis tick={{ fontSize: 11, fill: "#9A9A9A" }} axisLine={false} tickLine={false} width={60} />
          <Tooltip
            content={({ active, payload, label }) => {
              if (!active || !payload) return null;
              return (
                <div className="bg-white border border-border rounded-button shadow-card p-3 text-xs z-50">
                  <p className="font-semibold text-text-primary mb-1">{label}</p>
                  {payload.map((p: any, i: number) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                      <span className="text-text-muted">{p.name}:</span>
                      <span className="font-medium text-text-primary">{formatPrice(p.value)}</span>
                    </div>
                  ))}
                </div>
              );
            }}
          />
          {lines.map((line) => (
            <Line key={line.key} type="monotone" dataKey={line.key} stroke={line.color} strokeWidth={2} dot={false} name={line.name} />
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export interface BarChartProps {
  data: { label: string; value: number; color?: string }[];
  height?: number;
  className?: string;
}

export function SimpleBarChart({ data, height = 300, className }: BarChartProps) {
  if (!data.length) {
    return (
      <div className={cn("flex items-center justify-center bg-white rounded-[18px] border border-border", className)} style={{ height }}>
        <p className="text-[13px] text-text-muted">No data available</p>
      </div>
    );
  }

  return (
    <div className={cn("rounded-[18px] overflow-hidden border border-border bg-white", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />
          <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#9A9A9A" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#9A9A9A" }} axisLine={false} tickLine={false} width={60} tickFormatter={(v: number) => formatCompact(v)} />
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload || !payload.length) return null;
              return (
                <div className="bg-white border border-border rounded-button shadow-card p-3 text-xs z-50">
                  <p className="font-semibold text-text-primary">{payload[0].payload.label}</p>
                  <p className="text-primary">{formatCompact(payload[0].value as number)}</p>
                </div>
              );
            }}
          />
          <Bar dataKey="value" barSize={40} radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`bar-${index}`} fill={entry.color || "#5B3DF5"} />
            ))}
          </Bar>
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export function MiniChart({ data, height = 80, color = "#5B3DF5", className }: { data: { date: string; value: number }[]; height?: number; color?: string; className?: string }) {
  if (!data.length) return null;

  const isPositive = data[data.length - 1].value >= data[0].value;
  const lineColor = color || (isPositive ? "#22C55E" : "#EF4444");

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`miniGradient-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={lineColor} stopOpacity={0.15} />
              <stop offset="95%" stopColor={lineColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Line type="monotone" dataKey="value" stroke={lineColor} strokeWidth={2} dot={false} />
          <Area type="monotone" dataKey="value" stroke="none" fill={`url(#miniGradient-${color})`} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
