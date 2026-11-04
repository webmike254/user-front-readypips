import type { VoiceSession, VoiceSessionCallbacks } from "./types";
import { AudioPlayer } from "@/lib/audio";
import { KENYAN_RECEPTIONIST_PROMPT } from "@/lib/personality";

export function createGroqSession(cb: VoiceSessionCallbacks): VoiceSession {
  let player: AudioPlayer | null = null;
  let connected = false;
  let recorder: MediaRecorder | null = null;
  let chunks: Blob[] = [];
  let stream: MediaStream | null = null;
  let messages: { role: string; content: string }[] = [];
  let model = "openai/gpt-oss-20b";
  let voice = "autumn";
  let language: string = "mixed";

  async function processTurn() {
    cb.onState("thinking");
    const t0 = performance.now();
    const blob = new Blob(chunks, { type: recorder?.mimeType || "audio/webm" });
    chunks = [];
    const form = new FormData();
    form.append("file", blob, "audio.webm");
    form.append("model", "whisper-large-v3");
    const tr = await fetch("/api/groq/transcribe", { method: "POST", body: form });
    const trData = await tr.json();
    if (!tr.ok) { cb.onError(trData?.error || "transcribe failed"); cb.onState("idle"); return; }
    const userText = trData.text || "";
    if (userText.trim()) {
      cb.onTranscript({ id: crypto.randomUUID(), role: "user", text: userText, at: Date.now() });
      messages.push({ role: "user", content: userText });
    }
    // chat
    const chatRes = await fetch("/api/groq/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model, messages, language }),
    });
    const chatData = await chatRes.json();
    if (!chatRes.ok) { cb.onError(chatData?.error || "chat failed"); cb.onState("idle"); return; }
    const assistantText = chatData.text || "";
    if (assistantText.trim()) {
      cb.onTranscript({ id: crypto.randomUUID(), role: "assistant", text: assistantText, at: Date.now() });
      messages.push({ role: "assistant", content: assistantText });
    }
    // tts (browser speech synthesis fallback since Groq Orpheus requires terms acceptance)
    cb.onLatency(Math.round(performance.now() - t0));
    cb.onState("speaking");
    await new Promise<void>((resolve) => {
      try {
        const utter = new SpeechSynthesisUtterance(assistantText);
        utter.onend = () => resolve();
        utter.onerror = () => resolve();
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utter);
      } catch {
        resolve();
      }
    });
    cb.onState("idle");
    await player?.enqueueArrayBuffer(buf, "audio/wav");
  }

  return {
    async connect(opts) {
      cb.onState("connecting");
      const t0 = performance.now();
      model = opts.model;
      voice = opts.voice;
      language = opts.language;
      player = new AudioPlayer();
      connected = true;
      cb.onConnectionTime(Math.round(performance.now() - t0));
      cb.onState("idle");
    },
    async disconnect() {
      stream?.getTracks().forEach((t) => t.stop());
      stream = null;
      recorder = null;
      player?.stop();
      player = null;
      connected = false;
      messages = [];
      cb.onState("idle");
    },
    async startMic() {
      if (!connected) return;
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recorder = new MediaRecorder(stream);
      chunks = [];
      recorder.ondataavailable = (e) => { if (e.data.size > 0) chunks.push(e.data); };
      recorder.start();
      cb.onState("listening");
    },
    async stopMic() {
      if (!recorder) return;
      await new Promise<void>((resolve) => {
        recorder!.onstop = () => resolve();
        recorder!.stop();
      });
      stream?.getTracks().forEach((t) => t.stop());
      stream = null;
      recorder = null;
      await processTurn();
      cb.onState("idle");
    },
    interrupt() {
      player?.stop();
      cb.onState("listening");
    },
    isConnected() { return connected; },
  };
}