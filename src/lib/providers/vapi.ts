import type { VoiceSession, VoiceSessionCallbacks } from "./types";

export function createVapiSession(cb: VoiceSessionCallbacks): VoiceSession {
  let vapi: any = null;
  let connected = false;

  return {
    async connect(opts) {
      cb.onState("connecting");
      const t0 = performance.now();
      const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || "";
      const mod = await import("@vapi-ai/web");
      const Vapi = mod.default;
      vapi = new Vapi(publicKey);
      vapi.on("call-start", () => {
        connected = true;
        cb.onState("idle");
      });
      vapi.on("call-end", () => {
        connected = false;
        cb.onState("idle");
      });
      vapi.on("message", (m: any) => {
        if (m?.type === "transcript") {
          cb.onTranscript({ id: crypto.randomUUID(), role: m.role === "user" ? "user" : "assistant", text: m.transcript, at: Date.now() });
        }
      });
      vapi.on("error", (e: any) => cb.onError(e?.message || "Vapi error"));
      await vapi.start(opts.model);
      cb.onConnectionTime(Math.round(performance.now() - t0));
    },
    async disconnect() {
      try { vapi?.stop(); } catch {}
      vapi = null;
      connected = false;
      cb.onState("idle");
    },
    async startMic() { /* Vapi handles mic */ cb.onState("listening"); },
    async stopMic() { cb.onState("idle"); },
    interrupt() { try { vapi?.stop(); } catch {} },
    isConnected() { return connected; },
  };
}