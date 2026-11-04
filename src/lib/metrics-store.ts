import type { LatencyRecord, ConversationSummary } from "@/lib/providers/types";

const LATENCY_KEY = "twiga_latency_records";
const CONV_KEY = "twiga_conversations";

export function loadLatency(): LatencyRecord[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(LATENCY_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveLatency(r: LatencyRecord) {
  const all = loadLatency();
  all.push(r);
  localStorage.setItem(LATENCY_KEY, JSON.stringify(all));
}

export function clearLatency() {
  localStorage.removeItem(LATENCY_KEY);
}

export function loadConversations(): ConversationSummary[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(CONV_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveConversation(c: ConversationSummary) {
  const all = loadConversations();
  all.push(c);
  localStorage.setItem(CONV_KEY, JSON.stringify(all));
}

export function clearConversations() {
  localStorage.removeItem(CONV_KEY);
}

export function aggregate(records: LatencyRecord[]) {
  if (records.length === 0) return null;
  const times = records.map((r) => r.responseTimeMs);
  const avg = times.reduce((a, b) => a + b, 0) / times.length;
  return {
    count: records.length,
    avg: Math.round(avg),
    fastest: Math.min(...times),
    slowest: Math.max(...times),
  };
}