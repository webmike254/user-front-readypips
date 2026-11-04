"use client";

import { useEffect, useRef, useState } from "react";
import { PROVIDERS } from "@/lib/providers/config";
import { createSession } from "@/lib/providers";
import type { ProviderId, Language, TranscriptTurn, VoiceSession } from "@/lib/providers/types";
import { saveLatency, saveConversation, loadLatency, loadConversations, clearLatency, clearConversations, aggregate } from "@/lib/metrics-store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mic, Square, Volume2, Trash2, Download } from "lucide-react";

const LANGS: { id: Language; label: string }[] = [
  { id: "en", label: "English" },
  { id: "sw", label: "Kiswahili" },
  { id: "mixed", label: "Mixed Kenyan" },
];

export default function VoiceLab() {
  const [provider, setProvider] = useState<ProviderId>("openai");
  const cfg = PROVIDERS.find((p) => p.id === provider)!;
  const [model, setModel] = useState(cfg.models[0].id);
  const [voice, setVoice] = useState(cfg.voices[0].id);
  const [language, setLanguage] = useState<Language>("mixed");

  const [connected, setConnected] = useState(false);
  const [status, setStatus] = useState<"idle" | "connecting" | "listening" | "thinking" | "speaking">("idle");
  const [transcript, setTranscript] = useState<TranscriptTurn[]>([]);
  const [audioLevel, setAudioLevel] = useState(0);
  const [lastLatency, setLastLatency] = useState<number | null>(null);
  const [connectionTime, setConnectionTime] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [records, setRecords] = useState(loadLatency());
  const [convs, setConvs] = useState(loadConversations());

  const sessionRef = useRef<VoiceSession | null>(null);
  const convStartRef = useRef<number | null>(null);
  const turnCountRef = useRef(0);
  const latenciesRef = useRef<number[]>([]);
  const connTimeRef = useRef<number>(0);

  useEffect(() => {
    const c = PROVIDERS.find((p) => p.id === provider)!;
    setModel(c.models[0].id);
    setVoice(c.voices[0].id);
  }, [provider]);

  const handleTranscript = (t: TranscriptTurn) => {
    setTranscript((prev) => [...prev, t]);
    if (t.role === "assistant") turnCountRef.current += 1;
  };

  const handleLatency = (ms: number) => {
    setLastLatency(ms);
    latenciesRef.current.push(ms);
    saveLatency({
      id: crypto.randomUUID(),
      provider,
      model,
      voice,
      language,
      connectionTimeMs: connTimeRef.current,
      responseTimeMs: ms,
      at: Date.now(),
    });
    setRecords(loadLatency());
  };
  const handleConnect = async () => {
    setError(null);
    try {
      const s = createSession(provider, {
        onTranscript: handleTranscript,
        onState: setStatus,
        onLatency: handleLatency,
        onConnectionTime: (ms) => { setConnectionTime(ms); connTimeRef.current = ms; },
        onError: (e) => setError(e),
        onAudioLevel: setAudioLevel,
      });
      await s.connect({ model, voice, language });
      sessionRef.current = s;
      setConnected(true);
      convStartRef.current = Date.now();
      turnCountRef.current = 0;
      latenciesRef.current = [];
    } catch (e: any) {
      setError(e?.message || String(e));
    }
  };

  const handleDisconnect = async () => {
    const s = sessionRef.current;
    if (s) {
      await s.disconnect();
      sessionRef.current = null;
    }
    setConnected(false);
    setStatus("idle");
    if (convStartRef.current) {
      const lats = latenciesRef.current;
      const summary = {
        provider,
        model,
        voice,
        language,
        startedAt: convStartRef.current,
        endedAt: Date.now(),
        turnCount: turnCountRef.current,
        avgResponseMs: lats.length ? Math.round(lats.reduce((a, b) => a + b, 0) / lats.length) : 0,
        fastestMs: lats.length ? Math.min(...lats) : 0,
        slowestMs: lats.length ? Math.max(...lats) : 0,
        connectionTimeMs: connTimeRef.current,
      };
      saveConversation(summary);
      setConvs(loadConversations());
    }
    convStartRef.current = null;
  };

  const toggleMic = async () => {
    const s = sessionRef.current;
    if (!s) return;
    if (status === "listening") {
      await s.stopMic();
    } else {
      await s.startMic();
    }
  };

  const interrupt = () => {
    sessionRef.current?.interrupt();
  };

  const clearAll = () => {
    clearLatency();
    clearConversations();
    setRecords([]);
    setConvs([]);
    setTranscript([]);
  };

  const exportCsv = () => {
    const rows = ["provider,model,voice,language,responseMs,connectionMs,at"];
    records.forEach((r) => rows.push(`${r.provider},${r.model},${r.voice},${r.language},${r.responseTimeMs},${r.connectionTimeMs},${new Date(r.at).toISOString()}`));
    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "twiga-latency.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const agg = aggregate(records);
  const providerAgg = (pid: ProviderId) => aggregate(records.filter((r) => r.provider === pid));

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="border-b border-gray-200 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-orange-500 flex items-center justify-center text-white font-bold">T</div>
          <div>
            <h1 className="text-xl font-bold">TWIGA Voice Lab</h1>
            <p className="text-xs text-gray-500">Experimental AI voice comparison</p>
          </div>
        </div>
        <Badge variant="secondary">Experimental</Badge>
      </header>
      <main className="max-w-6xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-1">
          <CardHeader><CardTitle>Setup</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Provider</label>
              <Select value={provider} onValueChange={(v) => v && setProvider(v as ProviderId)} disabled={connected}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {PROVIDERS.map((p) => <SelectItem key={p.id} value={p.id}>{p.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Model</label>
              <Select value={model} onValueChange={(v) => v && setModel(v)} disabled={connected}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {cfg.models.map((m) => <SelectItem key={m.id} value={m.id}>{m.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Voice</label>
              <Select value={voice} onValueChange={(v) => v && setVoice(v)} disabled={connected}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {cfg.voices.map((v) => <SelectItem key={v.id} value={v.id}>{v.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Language</label>
              <Select value={language} onValueChange={(v) => v && setLanguage(v as Language)} disabled={connected}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {LANGS.map((l) => <SelectItem key={l.id} value={l.id}>{l.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              {!connected ? (
                <Button className="flex-1 bg-orange-500 hover:bg-orange-600" onClick={handleConnect}>Connect</Button>
              ) : (
                <Button className="flex-1" variant="destructive" onClick={handleDisconnect}>End Conversation</Button>
              )}
            </div>

            {error && <p className="text-xs text-red-600 break-words">{error}</p>}
            {connectionTime !== null && <p className="text-xs text-gray-500">Connection time: {connectionTime} ms</p>}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Conversation</span>
              <Badge>{status}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center gap-4">
              <div className="h-24 w-full bg-gray-50 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center gap-1">
                  {Array.from({ length: 32 }).map((_, i) => (
                    <div key={i} className="w-1 bg-orange-500 rounded-full transition-all" style={{ height: `${Math.max(4, audioLevel * 80 * (0.5 + ((i % 5) * 0.1)))}px` }} />
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  size="lg"
                  className={cn("h-20 w-20 rounded-full", status === "listening" ? "bg-red-500 hover:bg-red-600" : "bg-orange-500 hover:bg-orange-600")}
                  onClick={toggleMic}
                  disabled={!connected}
                >
                  {status === "listening" ? <Square className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
                </Button>
                <Button variant="outline" onClick={interrupt} disabled={!connected}>
                  <Volume2 className="h-4 w-4 mr-2" /> Interrupt
                </Button>
              </div>
              <p className="text-sm text-gray-500">
                {status === "listening" ? "Listening… tap to stop" : status === "thinking" ? "Thinking…" : status === "speaking" ? "Speaking… (tap interrupt)" : connected ? "Tap mic to speak" : "Connect to start"}
              </p>
              {lastLatency !== null && <p className="text-sm">Last response: <span className="font-semibold text-orange-600">{lastLatency} ms</span></p>}
            </div>

            <Tabs defaultValue="transcript">
              <TabsList>
                <TabsTrigger value="transcript">Transcript</TabsTrigger>
                <TabsTrigger value="metrics">Latency</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>
              <TabsContent value="transcript">
                <ScrollArea className="h-64 border rounded-md p-3">
                  {transcript.length === 0 && <p className="text-sm text-gray-400">No messages yet.</p>}
                  <div className="space-y-2">
                    {transcript.map((t) => (
                      <div key={t.id} className={cn("text-sm", t.role === "user" ? "text-right" : "text-left")}>
                        <span className={cn("inline-block px-3 py-2 rounded-lg max-w-[80%]", t.role === "user" ? "bg-orange-100" : "bg-gray-100")}>
                          <span className="block text-[10px] uppercase text-gray-500">{t.role}</span>
                          {t.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="metrics">
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="p-2 bg-gray-50 rounded">Tests: <b>{records.length}</b></div>
                    <div className="p-2 bg-gray-50 rounded">Avg: <b>{agg ? agg.avg + " ms" : "—"}</b></div>
                    <div className="p-2 bg-gray-50 rounded">Fastest: <b>{agg ? agg.fastest + " ms" : "—"}</b></div>
                    <div className="p-2 bg-gray-50 rounded">Slowest: <b>{agg ? agg.slowest + " ms" : "—"}</b></div>
                  </div>
                  <div className="text-xs text-gray-500 space-y-1">
                    {PROVIDERS.map((p) => {
                      const a = providerAgg(p.id);
                      return a ? <div key={p.id}>{p.label}: {a.count} tests, avg {a.avg} ms, fastest {a.fastest} ms</div> : null;
                    })}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={exportCsv}><Download className="h-3 w-3 mr-1" /> Export CSV</Button>
                    <Button size="sm" variant="ghost" onClick={clearAll}><Trash2 className="h-3 w-3 mr-1" /> Clear</Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="history">
                <ScrollArea className="h-64">
                  {convs.length === 0 && <p className="text-sm text-gray-400">No conversations saved.</p>}
                  <div className="space-y-2">
                    {convs.map((c, i) => (
                      <div key={i} className="text-xs border rounded p-2">
                        <div className="font-medium">{c.provider} · {c.voice} · {c.language}</div>
                        <div>turns: {c.turnCount} · avg: {c.avgResponseMs} ms · fastest: {c.fastestMs} ms · conn: {c.connectionTimeMs} ms</div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}


