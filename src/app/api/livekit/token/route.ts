import { NextResponse } from "next/server";
import { AccessToken } from "livekit-server-sdk";

export async function POST(req: Request) {
  const url = process.env.LIVEKIT_URL;
  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;
  if (!url || !apiKey || !apiSecret) {
    return NextResponse.json({ error: "LiveKit env missing" }, { status: 500 });
  }
  const body = await req.json().catch(() => ({}));
  const identity = body?.identity || `user-${Math.random().toString(36).slice(2, 8)}`;
  const room = body?.room || "twiga-lab";
  const at = new AccessToken(apiKey, apiSecret, { identity, ttl: "10m" });
  at.addGrant({ roomJoin: true, room, canPublish: true, canSubscribe: true });
  const token = await at.toJwt();
  return NextResponse.json({ token, url, room });
}