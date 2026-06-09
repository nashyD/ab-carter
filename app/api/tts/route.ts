import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/lib/ratelimit';

const TTS_PER_MIN = 30;
const MODEL = process.env.ELEVENLABS_MODEL || 'eleven_turbo_v2_5';
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || '21m00Tcm4TlvDq8ikWAM'; // "Rachel" (premade, multilingual)
const LANGS = new Set(['en', 'es', 'zh']);

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'local';
  if (!rateLimit(`tts:${ip}`, TTS_PER_MIN, 60)) {
    return NextResponse.json({ error: 'cap' }, { status: 429 });
  }

  // Same access gate as the chat route.
  const required = process.env.DEMO_PASSWORD;
  if (required && req.headers.get('x-access-code') !== required) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const key = process.env.ELEVENLABS_API_KEY;
  if (!key) {
    // No premium voice configured → client uses its browser fallback.
    return NextResponse.json({ error: 'tts_disabled' }, { status: 503 });
  }

  let text = '';
  let lang = 'en';
  try {
    const body = await req.json();
    text = typeof body?.text === 'string' ? body.text.slice(0, 1200) : '';
    lang = LANGS.has(body?.lang) ? body.lang : 'en';
  } catch {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 });
  }
  if (!text.trim()) {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 });
  }

  // language_code is supported on the v2.5 turbo/flash models, not on multilingual_v2.
  const supportsLangCode = /turbo_v2_5|flash_v2_5/.test(MODEL);

  try {
    const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
      method: 'POST',
      headers: {
        'xi-api-key': key,
        'Content-Type': 'application/json',
        Accept: 'audio/mpeg',
      },
      body: JSON.stringify({
        text,
        model_id: MODEL,
        voice_settings: { stability: 0.4, similarity_boost: 0.8 },
        ...(supportsLangCode ? { language_code: lang } : {}),
      }),
    });
    if (!r.ok) {
      const detail = await r.text().catch(() => '');
      console.error('elevenlabs error', r.status, detail.slice(0, 300));
      return NextResponse.json({ error: 'tts_failed' }, { status: 502 });
    }
    const audio = await r.arrayBuffer();
    return new NextResponse(audio, {
      status: 200,
      headers: { 'Content-Type': 'audio/mpeg', 'Cache-Control': 'no-store' },
    });
  } catch (err) {
    console.error('tts route error', err);
    return NextResponse.json({ error: 'tts_failed' }, { status: 502 });
  }
}
