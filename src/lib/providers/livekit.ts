import { Room, RoomEvent, Track } from "livekit-client";
import type { VoiceSession, VoiceSessionCallbacks } from "./types";

export function createLiveKitSession(cb: VoiceSessionCallbacks): VoiceSession {
  let room: Room | null = null;
  let connected = false;

  return {
    async connect(opts) {
      cb.onState("connecting");
      const t0 = performance.now();
      const res = await fetch("/api/livekit/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identity: "twiga-tester", room: "twiga-lab" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(JSON.stringify(data));
      const r = new Room();
      await r.connect(data.url, data.token);
      room = r;
      connected = true;
      cb.onConnectionTime(Math.round(performance.now() - t0));
      // play remote audio tracks
      r.on(RoomEvent.TrackSubscribed, (track) => {
        if (track.kind === Track.Kind.Audio) {
          const el = track.attach();
          document.body.appendChild(el);
        }
      });
      cb.onState("idle");
      cb.onError("LiveKit connected. Publish mic and ensure an agent is in the room for AI responses.");
    },
    async disconnect() {
      await room?.disconnect();
      room = null;
      connected = false;
      cb.onState("idle");
    },
    async startMic() {
      if (!room) return;
      await room.localParticipant.setMicrophoneEnabled(true);
      cb.onState("listening");
    },
    async stopMic() {
      if (!room) return;
      await room.localParticipant.setMicrophoneEnabled(false);
      cb.onState("idle");
    },
    interrupt() {
      cb.onState("listening");
    },
    isConnected() { return connected; },
  };
}