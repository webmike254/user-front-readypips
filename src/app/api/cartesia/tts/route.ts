import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const key = process.env.CARTESIA_API_KEY;
  if (!key) return NextResponse.json({ error: "CARTESIA_API_KEY missing" }, { status: 500 });
  const body = await req.json();
  const text = body?.text || "";
  const voice = body?.voice || "db6b0ed5-d5d3-463d-ae85-518a07d3c2b4";
  const model = body?.model || "sonic-3";
  try {
    const res = await fetch("https://api.cartesia.ai/tts/bytes", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Cartesia-Version": "2026-08-14",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model_id: model,
        transcript: text,
        voice,
        output_format: { container: "wav", encoding: "pcm_s16le", sample_rate: 24000 },
        language: "en",
      }),
    });
    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: err }, { status: res.status });
    }
    const buf = await res.arrayBuffer();
    return new NextResponse(buf, { headers: { "Content-Type": "audio/wav" } });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message }, { status: 500 });
  }
}