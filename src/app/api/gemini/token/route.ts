import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function GET() {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return NextResponse.json({ error: "GEMINI_API_KEY missing" }, { status: 500 });
  try {
    const ai = new GoogleGenAI({ apiKey: key });
    // Create an ephemeral token for live usage
    const token = await (ai as any).authTokens.create({
      config: { uses: 5, expireTime: new Date(Date.now() + 30 * 60 * 1000).toISOString() },
    });
    const value = token?.name || token?.token || token;
    return NextResponse.json({ token: value });
  } catch (e: any) {
    // Fallback: return a constrained signal; client will need keyless path
    return NextResponse.json({ error: e?.message || "token creation failed" }, { status: 500 });
  }
}