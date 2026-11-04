import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { KENYAN_RECEPTIONIST_PROMPT } from "@/lib/personality";

export async function POST(req: Request) {
  const key = process.env.GROQ_API_KEY;
  if (!key) return NextResponse.json({ error: "GROQ_API_KEY missing" }, { status: 500 });
  const body = await req.json();
  const model = body?.model || "openai/gpt-oss-20b";
  const messages = body?.messages || [];
  const language = body?.language || "mixed";
  const stream = body?.stream === true;
  const langHint = language === "sw" ? "Respond in Kiswahili." : language === "en" ? "Respond in English." : "Respond in natural Kenyan English/Kiswahili mix as the user does.";
  try {
    const groq = new Groq({ apiKey: key });
    if (stream) {
      const completion = await groq.chat.completions.create({
        model,
        messages: [
          { role: "system", content: KENYAN_RECEPTIONIST_PROMPT + "\n" + langHint },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 256,
        stream: true,
      });
      const encoder = new TextEncoder();
      const readable = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of completion) {
              const content = chunk.choices?.[0]?.delta?.content || "";
              if (content) controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
            }
            controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          } catch (e: any) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: e?.message })}\n\n`));
          } finally {
            controller.close();
          }
        },
      });
      return new Response(readable, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    }
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