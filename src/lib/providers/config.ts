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
    id: "cartesia",
    label: "Cartesia",
    models: [
      { id: "sonic-3", label: "Sonic 3" },
      { id: "sonic-3.5", label: "Sonic 3.5" },
    ],
    voices: [
      { id: "607167f6-9bf2-473c-accc-ac7b3b66b30b", label: "Brenda" },
      { id: "f96dc0b1-7900-4894-a339-81fb46d515a7", label: "Steve" },
      { id: "db6b0ed5-d5d3-463d-ae85-518a07d3c2b4", label: "Skylar" },
    ],
  },
  {
    id: "livekit",
    label: "LiveKit",
    models: [{ id: "livekit-agent", label: "LiveKit Agent" }],
    voices: [{ id: "default", label: "Default" }],
  },
  {
    id: "vapi",
    label: "Vapi",
    models: [
      { id: "84b009c6-0634-44e2-9861-13d746e82542", label: "Vapi Assistant" },
    ],
    voices: [
      { id: "EXAVITQu4vr4xnSDxMaL", label: "Sarah" },
      { id: "Xb7hH8MSUJpSbSDYk0k2", label: "Alice" },
      { id: "hpp4J3VqNfWAUOO0d1Us", label: "Bella" },
      { id: "cgSgspJ2msm6clMCkdW9", label: "Jessica" },
      { id: "pFZP5JQG7iQjIQuC4Bku", label: "Lily" },
    ],
  },
];