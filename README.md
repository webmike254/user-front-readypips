# TWIGA Voice Lab

Experimental app to compare AI voice providers (Gemini Live, ElevenLabs, Groq, OpenAI Realtime, LiveKit).

## Setup

```bash
cd twiga-voice-lab
npm install
cp .env.example .env.local  # fill in keys
npm run dev
```

Open http://localhost:3000

## Environment variables

See `.env.example`. Keys stay server-side (API routes).

## Deploy (Vercel)

```bash
npm i -g vercel
vercel login
vercel --prod
```

Set the env vars in the Vercel project dashboard. Do not commit `.env.local`.

## Notes

- OpenAI key not provided; that provider will error until configured.
- ElevenLabs Conversational AI requires `ELEVENLABS_AGENT_ID` (create an agent in the ElevenLabs dashboard) for the signed-URL realtime path; the TTS path works with just the API key.
- LiveKit requires a running agent in the room for AI responses.
