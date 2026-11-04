import type { VoiceSession, VoiceSessionCallbacks } from "./types";
import { AudioPlayer } from "@/lib/audio";

export function createCartesiaSession(cb: VoiceSessionCallbacks): VoiceSession {
  let player: AudioPlayer | null = null;
  let connected = false;
  let messages: { role: string; content: string }[] = [];
  let model = "sonic-3";
  let voice = "607167f6-9bf2-473c-accc-ac7b3b66b30b";
  let language = "mixed";
  let llmModel = "openai/gpt-oss-20b";

  let recognition: any = null;
  let abortController: AbortController | null = null;
  let isSpeaking = false;
  let lastFinal = "";

  async function speak(text: string, signal: AbortSignal) {
    const res = await fetch("/api/cartesia/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, voice, model }),
      signal,
    });
    if (!res.ok || signal.aborted) return;
    const buf = await res.arrayBuffer();
    if (signal.aborted) return;
    cb.onState("speaking");
    isSpeaking = true;
    await player?.enqueueArrayBuffer(buf, "audio/wav");
    isSpeaking = false;
  }

  async function processUserText(userText: string) {
    if (!userText.trim()) return;
    if (userText === lastFinal) return;
    lastFinal = userText;

    if (abortController) abortController.abort();
    abortController = new AbortController();
    const signal = abortController.signal;
    player?.stop();
    isSpeaking = false;

    cb.onTranscript({ id: crypto.randomUUID(), role: "user", text: userText, at: Date.now() });
    messages.push({ role: "user", content: userText });

    cb.onState("thinking");
    const t0 = performance.now();
    try {
      const chatRes = await fetch("/api/groq/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: llmModel, messages, language }),
        signal,
      });
      const chatData = await chatRes.json();
      if (signal.aborted) return;
      if (!chatRes.ok) { cb.onError(chatData?.error || "chat failed"); cb.onState("idle"); return; }
      const assistantText = chatData.text || "";
      if (assistantText.trim()) {
        cb.onTranscript({ id: crypto.randomUUID(), role: "assistant", text: assistantText, at: Date.now() });
        messages.push({ role: "assistant", content: assistantText });
      }
      cb.onLatency(Math.round(performance.now() - t0));
      await speak(assistantText, signal);
      if (!signal.aborted) cb.onState("idle");
    } catch (e: any) {
      if (e?.name !== "AbortError") cb.onError(e?.message || "error");
      cb.onState("idle");
    }
  }

  function startRecognition() {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) { cb.onError("Speech recognition not supported in this browser"); return; }
    recognition = new SR();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = language === "sw" ? "sw-KE" : "en-US";
    recognition.onresult = (e: any) => {
      let final = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) final += e.results[i][0].transcript;
      }
      if (final.trim()) {
        if (isSpeaking) {
          player?.stop();
          isSpeaking = false;
          if (abortController) abortController.abort();
        }
        processUserText(final.trim());
      }
    };
    recognition.onerror = (e: any) => cb.onError(e?.error || "speech recognition error");
    recognition.onend = () => {
      if (connected) {
        try { recognition.start(); } catch {}
      }
    };
    try { recognition.start(); } catch (e: any) { cb.onError(e?.message || "recognition start failed"); }
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
      startRecognition();
    },
    async disconnect() {
      connected = false;
      try { recognition?.stop(); } catch {}
      recognition = null;
      if (abortController) abortController.abort();
      abortController = null;
      player?.stop();
      player = null;
      messages = [];
      cb.onState("idle");
    },
    async startMic() {
      if (!connected) return;
      if (!recognition) startRecognition();
      cb.onState("listening");
    },
    async stopMic() {
      try { recognition?.stop(); } catch {}
      recognition = null;
      cb.onState("idle");
    },
    interrupt() {
      player?.stop();
      isSpeaking = false;
      if (abortController) abortController.abort();
      cb.onState("listening");
    },
    isConnected() { return connected; },
  };
}