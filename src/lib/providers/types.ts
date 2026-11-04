export type ProviderId = "gemini" | "elevenlabs" | "groq" | "openai" | "livekit";

export type Language = "en" | "sw" | "mixed";

export interface ProviderModel {
  id: string;
  label: string;
}

export interface ProviderVoice {
  id: string;
  label: string;
}

export interface ProviderConfig {
  id: ProviderId;
  label: string;
  models: ProviderModel[];
  voices: ProviderVoice[];
}

export interface TranscriptTurn {
  id: string;
  role: "user" | "assistant";
  text: string;
  at: number;
}

export interface LatencyRecord {
  id: string;
  provider: ProviderId;
  model: string;
  voice: string;
  language: Language;
  connectionTimeMs: number;
  responseTimeMs: number;
  at: number;
}

export interface ConversationSummary {
  provider: ProviderId;
  model: string;
  voice: string;
  language: Language;
  startedAt: number;
  endedAt: number;
  turnCount: number;
  avgResponseMs: number;
  fastestMs: number;
  slowestMs: number;
  connectionTimeMs: number;
}

export interface VoiceSessionCallbacks {
  onTranscript: (turn: TranscriptTurn) => void;
  onState: (state: "idle" | "connecting" | "listening" | "thinking" | "speaking") => void;
  onLatency: (ms: number) => void;
  onConnectionTime: (ms: number) => void;
  onError: (err: string) => void;
  onAudioLevel: (level: number) => void;
}

export interface VoiceSession {
  connect(opts: {
    model: string;
    voice: string;
    language: Language;
  }): Promise<void>;
  disconnect(): Promise<void>;
  startMic(): Promise<void>;
  stopMic(): Promise<void>;
  interrupt(): void;
  isConnected(): boolean;
}