import type { ProviderId, VoiceSession, VoiceSessionCallbacks } from "./types";
import { createGeminiSession } from "./gemini";
import { createElevenLabsSession } from "./elevenlabs";
import { createGroqSession } from "./groq";
import { createOpenAISession } from "./openai";
import { createLiveKitSession } from "./livekit";
import { createCartesiaSession } from "./cartesia";

export function createSession(provider: ProviderId, cb: VoiceSessionCallbacks): VoiceSession {
  switch (provider) {
    case "gemini": return createGeminiSession(cb);
    case "elevenlabs": return createElevenLabsSession(cb);
    case "groq": return createGroqSession(cb);
    case "openai": return createOpenAISession(cb);
    case "livekit": return createLiveKitSession(cb);
    case "cartesia": return createCartesiaSession(cb);
  }
}