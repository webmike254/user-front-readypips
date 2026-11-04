import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { KENYAN_RECEPTIONIST_PROMPT } from "@/lib/personality";

export async function POST(req: Request) {
  const key = process.env.GROQ_API_KEY;
  if (!key) return NextResponse.json({ error: "GROQ_API_KEY missing" }, { status: 500 });
  const body = await req.json();
  const model = body?.model || "llama-3.3-70b-versatile";
  const messages = body?.messages || [];
  const language = body?.language || "mixed";
  const langHint = language === "sw" ? "Respond in Kiswahili." : language === "en" ? "Respond in English." : "Respond in natural Kenyan English/Kiswahili mix as the user does.";
  try {
    const groq = new Groq({ apiKey: key });
    const completion = await groq.chat.completions.create({
      model,
      messages: [
        { role: "system", content: KENYAN_RECEPTIONIST_PROMPT + "\n" + langHint },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 256,
    });
    const text = completion.choices?.[0]?.message?.content || "";
    return NextResponse.json({ text });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message }, { status: 500 });
  }
}