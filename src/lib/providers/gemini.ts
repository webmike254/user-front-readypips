import { GoogleGenAI } from "@google/genai";
import type { VoiceSession, VoiceSessionCallbacks } from "./types";
import { MicCapture, AudioPlayer } from "@/lib/audio";
import { KENYAN_RECEPTIONIST_PROMPT } from "@/lib/personality";

export function createGeminiSession(cb: VoiceSessionCallbacks): VoiceSession {
  let session: any = null;
  let mic: MicCapture | null = null;
  let player: AudioPlayer | null = null;
  let connected = false;
  let lastInputAt = 0;
  let firstAudio = false;
  let assistantText = "";

  return {
    async connect(opts) {
      cb.onState("connecting");
      const t0 = performance.now();
      const res = await fetch("/api/gemini/token");
      const data = await res.json();
      if (!res.ok) throw new Error(JSON.stringify(data));
      const token = data.token;
      const ai = new GoogleGenAI({ apiKey: token });
      const model = opts.model;
      await new Promise<void>((resolve, reject) => {
        const s = (ai as any).live.connect({
          model,
          config: {
            responseModalities: ["AUDIO"],
            speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: opts.voice } } },
            systemInstruction: KENYAN_RECEPTIONIST_PROMPT + `\nLanguage: ${opts.language}.`,
            inputAudioTranscription: {},
            outputAudioTranscription: {},
          },
          callbacks: {
            onopen: () => {
              session = s;
              player = new AudioPlayer();
              cb.onConnectionTime(Math.round(performance.now() - t0));
              connected = true;
              cb.onState("idle");
              resolve();
            },
            onmessage: (msg: any) => {
              // transcription of user
              if (msg.serverContent?.inputTranscription?.text) {
                // accumulate? just final
              }
              if (msg.serverContent?.outputTranscription?.text) {
                assistantText += msg.serverContent.outputTranscription.text;
              }
              // model audio
              const parts = msg.serverContent?.modelTurn?.parts || [];
              for (const p of parts) {
                if (p.inlineData?.data) {
                  if (!firstAudio && lastInputAt) {
                    firstAudio = true;
                    cb.onLatency(Math.round(performance.now() - lastInputAt));
                  }
                  const bin = atob(p.inlineData.data);
                  const bytes = new Uint8Array(bin.length);
                  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
                  const pcm = new Int16Array(bytes.buffer);
                  player?.enqueuePcm16(pcm, 24000);
                  cb.onState("speaking");
                }
                if (p.text) assistantText += p.text;
              }
              if (msg.serverContent?.turnComplete) {
                if (assistantText.trim()) {
                  cb.onTranscript({ id: crypto.randomUUID(), role: "assistant", text: assistantText.trim(), at: Date.now() });
                }
                assistantText = "";
                firstAudio = false;
                cb.onState("idle");
              }
              // user transcription final
              if (msg.serverContent?.inputTranscription?.text && msg.serverContent?.turnComplete) {
                // handled separately? Gemini may not give final user text reliably
              }
            },
            onerror: (e: any) => cb.onError(e?.message || "Gemini error"),
            onclose: () => { connected = false; cb.onState("idle"); },
          },
        });
      });
    },
    async disconnect() {
      mic?.stop(); mic = null;
      player?.stop(); player = null;
      try { session?.close(); } catch {}
      session = null;
      connected = false;
      cb.onState("idle");
    },
    async startMic() {
      if (!session) return;
      mic = new MicCapture();
      mic.onChunk = (pcm) => {
        lastInputAt = performance.now();
        firstAudio = false;
        const bytes = new Uint8Array(pcm.buffer);
        let bin = "";
        for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
        const b64 = btoa(bin);
        try {
          session.sendRealtimeInput({ audio: { data: b64, mimeType: "audio/pcm;rate=16000" } });
        } catch {}
      };
      mic.onLevel = (l) => cb.onAudioLevel(l);
      await mic.start();
      cb.onState("listening");
    },
    async stopMic() {
      mic?.stop(); mic = null;
      cb.onState("idle");
    },
    interrupt() {
      player?.stop();
      cb.onState("listening");
    },
    isConnected() { return connected; },
  };
}