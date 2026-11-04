import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req: Request) {
  const key = process.env.GROQ_API_KEY;
  if (!key) return NextResponse.json({ error: "GROQ_API_KEY missing" }, { status: 500 });
  const form = await req.formData();
  const file = form.get("file") as File | null;
  const model = (form.get("model") as string) || "whisper-large-v3";
  if (!file) return NextResponse.json({ error: "no file" }, { status: 400 });
  try {
    const groq = new Groq({ apiKey: key });
    const transcription = await groq.audio.transcriptions.create({
      file,
      model,
      language: undefined,
      response_format: "json",
    });
    return NextResponse.json({ text: transcription.text });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message }, { status: 500 });
  }
}