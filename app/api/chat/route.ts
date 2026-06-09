import { NextRequest, NextResponse } from 'next/server';
import { ask } from '@/lib/claude';
import { ChatMessage, Lang, PageContext } from '@/lib/types';
import { rateLimit } from '@/lib/ratelimit';

const CHAT_PER_MIN = 30;
const MAX_HISTORY_MESSAGES = 20;
const VALID_LANGS: Set<string> = new Set(['en', 'es', 'zh']);

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'local';
  if (!rateLimit(`chat:${ip}`, CHAT_PER_MIN, 60)) {
    return NextResponse.json({ error: 'cap' }, { status: 429 });
  }

  // Access gate: when DEMO_PASSWORD is set (deployed demo), require a matching code.
  // Unset locally → open for development. Protects the API key behind the endpoint.
  const accessCode = req.headers.get('x-access-code') ?? '';
  const requiredCode = process.env.DEMO_PASSWORD;
  if (requiredCode && accessCode !== requiredCode) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const lang: Lang = VALID_LANGS.has(body?.lang) ? body.lang : 'en';

    let page: PageContext | undefined;
    if (body?.page && typeof body.page.label === 'string') {
      page = { label: body.page.label.slice(0, 300) };
    }

    const raw: unknown = body?.messages;
    if (!Array.isArray(raw)) {
      return NextResponse.json({ error: 'bad_request' }, { status: 400 });
    }
    const messages = raw
      .filter(
        (m): m is ChatMessage =>
          m !== null &&
          typeof m === 'object' &&
          typeof (m as Record<string, unknown>).role === 'string' &&
          typeof (m as Record<string, unknown>).content === 'string' &&
          ['user', 'assistant'].includes((m as Record<string, unknown>).role as string),
      )
      .slice(-MAX_HISTORY_MESSAGES);

    const result = await ask(messages, lang, page);
    return NextResponse.json(result);
  } catch (err) {
    console.error('chat route error:', err);
    return NextResponse.json({ error: 'model' }, { status: 500 });
  }
}
