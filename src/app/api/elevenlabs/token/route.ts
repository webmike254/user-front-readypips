import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const key = process.env.ELEVENLABS_API_KEY;
  const agentId = process.env.ELEVENLABS_AGENT_ID;
  if (!key) return NextResponse.json({ error: "ELEVENLABS_API_KEY missing" }, { status: 500 });
  if (!agentId) return NextResponse.json({ error: "ELEVENLABS_AGENT_ID missing (create an agent in ElevenLabs dashboard)" }, { status: 500 });
  const url = `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${agentId}`;
  const res = await fetch(url, { headers: { "xi-api-key": key } });
  const data = await res.json();
  if (!res.ok) return NextResponse.json({ error: data }, { status: res.status });
  return NextResponse.json({ signedUrl: data.signed_url, agentId });
}