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
      { id: "21m00Tcm4TlvDq8ikWAM", label: "Rachel" },
      { id: "AZnzlk1qvw1trBwP9zvP", label: "Domi" },
      { id: "EXAVITQu4vr4xnSDxMaL", label: "Bella" },
      { id: "ErXwobaYiN019PkySvjV", label: "Antoni" },
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
  {
    id: "openai",
    label: "OpenAI Realtime",
    models: [
      { id: "gpt-4o-realtime-preview", label: "GPT-4o Realtime" },
      { id: "gpt-4o-mini-realtime-preview", label: "GPT-4o Mini Realtime" },
    ],
    voices: [
      { id: "alloy", label: "Alloy" },
      { id: "ash", label: "Ash" },
      { id: "ballad", label: "Ballad" },
      { id: "coral", label: "Coral" },
      { id: "sage", label: "Sage" },
      { id: "verse", label: "Verse" },
    ],
  },
  {
    id: "livekit",
    label: "LiveKit",
    models: [{ id: "livekit-agent", label: "LiveKit Agent" }],
    voices: [{ id: "default", label: "Default" }],
  },
];