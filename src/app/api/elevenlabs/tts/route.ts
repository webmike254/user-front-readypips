import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const key = process.env.ELEVENLABS_API_KEY;
  if (!key) return NextResponse.json({ error: "ELEVENLABS_API_KEY missing" }, { status: 500 });
  const body = await req.json();
  const text = body?.text || "";
  const voiceId = body?.voice || "21m00Tcm4TlvDq8ikWAM";
  const modelId = body?.model || "eleven_turbo_v2_5";
  try {
    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: "POST",
      headers: {
        "xi-api-key": key,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({ text, model_id: modelId }),
    });
    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: err }, { status: res.status });
    }
    const buf = await res.arrayBuffer();
    return new NextResponse(buf, { headers: { "Content-Type": "audio/mpeg" } });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message }, { status: 500 });
  }
}