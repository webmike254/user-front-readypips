import type { ProviderConfig } from "./types";

export const PROVIDERS: ProviderConfig[] = [
  {
    id: "gemini",
    label: "Google Gemini Live",
    models: [
      { id: "gemini-2.0-flash-live-001", label: "Gemini 2.0 Flash Live" },
      { id: "gemini-live-2.5-flash-preview", label: "Gemini Live 2.5 Flash (preview)" },
    ],
    voices: [
      { id: "Puck", label: "Puck" },
      { id: "Charon", label: "Charon" },
      { id: "Kore", label: "Kore" },
      { id: "Fenrir", label: "Fenrir" },
      { id: "Aoede", label: "Aoede" },
    ],
  },
  {
    id: "elevenlabs",
    label: "ElevenLabs Conversational AI",
    models: [
      { id: "eleven_turbo_v2_5", label: "Eleven Turbo v2.5" },
      { id: "eleven_multilingual_v2", label: "Eleven Multilingual v2" },
    ],
    voices: [
      { id: "EXAVITQu4vr4xnSDxMaL", label: "Sarah" },
      { id: "pNInz6obpgDQGcFmaJgB", label: "Adam" },
      { id: "nPczCjzI2devNBz1zQrb", label: "Brian" },
      { id: "Xb7hH8MSUJpSbSDYk0k2", label: "Alice" },
    ],
  },
  {
    id: "groq",
    label: "Groq",
    models: [
      { id: "openai/gpt-oss-120b", label: "GPT OSS 120B" },
      { id: "openai/gpt-oss-20b", label: "GPT OSS 20B" },
      { id: "qwen/qwen3.8-27b", label: "Qwen 3.8 27B" },
    ],
    voices: [
      { id: "autumn", label: "Autumn (Orpheus)" },
      { id: "diana", label: "Diana (Orpheus)" },
      { id: "hannah", label: "Hannah (Orpheus)" },
    ],
  },
  // OpenAI omitted: OPENAI_API_KEY not configured
  {
    id: "livekit",
    label: "LiveKit",
    models: [{ id: "livekit-agent", label: "LiveKit Agent" }],
    voices: [{ id: "default", label: "Default" }],
  },
];