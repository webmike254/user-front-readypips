import type { VoiceSession, VoiceSessionCallbacks } from "./types";
import { MicCapture, AudioPlayer } from "@/lib/audio";
import { KENYAN_RECEPTIONIST_PROMPT } from "@/lib/personality";

export function createOpenAISession(cb: VoiceSessionCallbacks): VoiceSession {
  let ws: WebSocket | null = null;
  let mic: MicCapture | null = null;
  let player: AudioPlayer | null = null;
  let connected = false;
  let speechStoppedAt = 0;
  let firstAudioReceived = false;
  let currentAssistantText = "";

  return {
    async connect(opts) {
      cb.onState("connecting");
      const t0 = performance.now();
      const res = await fetch("/api/openai/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: opts.model, voice: opts.voice }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(JSON.stringify(data));
      const ephemeral = data.client_secret?.value || data.value;
      const model = opts.model;
      const url = `wss://api.openai.com/v1/realtime?model=${encodeURIComponent(model)}`;
      await new Promise<void>((resolve, reject) => {
        const socket = new WebSocket(url, ["realtime", `openai-ephemeral-key.${ephemeral}`]);
        socket.onopen = () => {
          ws = socket;
          player = new AudioPlayer();
          // configure session
          socket.send(JSON.stringify({
            type: "session.update",
            session: {
              instructions: KENYAN_RECEPTIONIST_PROMPT + `\nLanguage preference: ${opts.language}.`,
              voice: opts.voice,
              modalities: ["text", "audio"],
              input_audio_format: "pcm16",
              output_audio_format: "pcm16",
              input_audio_transcription: { model: "whisper-1" },
              turn_detection: { type: "server_vad", create_response: true, interrupt_response: true },
            },
          }));
          cb.onConnectionTime(Math.round(performance.now() - t0));
          connected = true;
          cb.onState("idle");
          resolve();
        };
        socket.onerror = (e) => reject(e);
        socket.onmessage = (ev) => {
          try {
            const msg = JSON.parse(ev.data);
            switch (msg.type) {
              case "input_audio_buffer.speech_stopped":
                speechStoppedAt = performance.now();
                firstAudioReceived = false;
                cb.onState("thinking");
                break;
              case "response.created":
                break;
              case "response.audio.delta": {
                if (!firstAudioReceived && speechStoppedAt) {
                  firstAudioReceived = true;
                  cb.onLatency(Math.round(performance.now() - speechStoppedAt));
                }
                // decode base64 -> Int16
                const bin = atob(msg.delta);
                const bytes = new Uint8Array(bin.length);
                for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
                const pcm = new Int16Array(bytes.buffer);
                player?.enqueuePcm16(pcm, 24000);
                cb.onState("speaking");
                break;
              }
              case "response.audio_transcript.delta":
                currentAssistantText += msg.delta || "";
                break;
              case "response.audio_transcript.done":
                if (currentAssistantText.trim()) {
                  cb.onTranscript({ id: crypto.randomUUID(), role: "assistant", text: currentAssistantText.trim(), at: Date.now() });
                }
                currentAssistantText = "";
                break;
              case "conversation.item.input_audio_transcription.completed":
                cb.onTranscript({ id: crypto.randomUUID(), role: "user", text: msg.transcript || "", at: Date.now() });
                break;
              case "response.done":
                cb.onState("idle");
                break;
              case "error":
                cb.onError(msg.error?.message || "OpenAI error");
                break;
            }
          } catch {}
        };
        socket.onclose = () => {
          connected = false;
          cb.onState("idle");
        };
      });
    },
    async disconnect() {
      mic?.stop();
      mic = null;
      player?.stop();
      player = null;
      ws?.close();
      ws = null;
      connected = false;
      cb.onState("idle");
    },
    async startMic() {
      if (!ws || !connected) return;
      mic = new MicCapture();
      mic.onChunk = (pcm) => {
        if (!ws || ws.readyState !== WebSocket.OPEN) return;
        // base64 encode
        const bytes = new Uint8Array(pcm.buffer);
        let bin = "";
        for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
        const b64 = btoa(bin);
        ws.send(JSON.stringify({ type: "input_audio_buffer.append", audio: b64 }));
      };
      mic.onLevel = (l) => cb.onAudioLevel(l);
      await mic.start();
      cb.onState("listening");
    },
    async stopMic() {
      mic?.stop();
      mic = null;
      cb.onState("idle");
    },
    interrupt() {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: "response.cancel" }));
      }
      player?.stop();
      cb.onState("listening");
    },
    isConnected() {
      return connected;
    },
  };
}