# AB Carter Assistant POC — Implementation Plan

> **For agentic workers:** Implement task-by-task. Steps use checkbox (`- [ ]`) syntax. Forked from the Bisque assistant at `/Users/nashdavis/Documents/TSD/TSD Modernization Solution/bisque-imports/` — read those files when a task says "port from Bisque."

**Goal:** Ship a branded, multilingual (EN/ES/ZH) "AB Carter Assistant" demo — a part-selection chatbot grounded in AB Carter's real travelers/rings catalog — and push it to `github.com/nashyD/ab-carter`.

**Architecture:** Next.js 16 + Claude Sonnet, forked from the Bisque Concierge. The Supabase/pgvector retrieval layer is replaced by a static curated catalog (~40–80 entries) stuffed whole into the prompt-cached system prompt behind a `getContext()` seam. Forced `respond` tool-use guarantees the model answers only from the catalog and cites by ID. No Supabase, embeddings, worker, voice, or image upload (those are the paid build).

**Tech Stack:** Next.js 16.2.6, React 19, TypeScript, Tailwind v4, `@anthropic-ai/sdk`, Vercel.

**⚠️ Next.js 16 caveat:** This is not the Next.js in your training data. Before writing routing/server code, read `node_modules/next/dist/docs/` in the new app and heed deprecations. TSD apps on Next 16 use `proxy.ts` (export `proxy`), not `middleware.ts` — we don't add middleware here, but don't reach for it.

**Model id:** `claude-sonnet-4-6` (the id the live Bisque app uses). Confirm via the `claude-api` skill if anything 4xx's.

---

## File Structure

**Project root:** `/Users/nashdavis/Documents/TSD/TSD Modernization Solution/ab-carter-concierge/`

**Config (port from Bisque, lightly edited):**
- `package.json` — drop `@supabase/supabase-js` and `openai`; keep `@anthropic-ai/sdk`, `next`, `react`, `react-dom`.
- `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `next-env.d.ts` — copy as-is.
- `.gitignore` — already present.
- `.env.example` — create: `ANTHROPIC_API_KEY=`.

**Data (the content work):**
- `data/catalog.ts` — `export const CATALOG: Part[]` — curated AB Carter travelers + rings.

**Lib:**
- `lib/types.ts` — `Part`, `Citation`, `Lang`, `ChatMessage`, `ChatResponse`, `PageContext`.
- `lib/catalog-search.ts` — `getContext()` returns the whole catalog (the seam; production swaps to vector retrieval).
- `lib/prompt.ts` — `buildSystemPrompt(items, lang, pageLabel)` — persona + grounding + multilingual rules.
- `lib/claude.ts` — `ask(messages, lang, page)` — forced `respond` tool, citations.
- `lib/i18n.ts` — per-language UI strings, greeting, starter chips.
- `lib/ratelimit.ts` — in-memory fixed-window limiter (no Supabase).

**API:**
- `app/api/chat/route.ts` — POST handler (rate limit + validation + `ask`); no Supabase logging.

**UI (port + rebrand from Bisque):**
- `app/layout.tsx` — metadata → AB Carter.
- `app/globals.css` — AB Carter palette (`carter-*`); drop clay avatar keyframes.
- `app/page.tsx` — single mode, language toggle, faux `abcarter.com` frame, "Powered by TSD Concierge".
- `components/BrowserFrame.tsx` — port, recolor, url `abcarter.com`.
- `components/ChatPanel.tsx` — port, take `strings`/`chips` via props (drop `MODES`).
- `components/MessageBubble.tsx` — port, recolor.
- `components/CitationCard.tsx` — port, render a `part` citation (name + key spec + source/deferral).
- `components/LanguageToggle.tsx` — **new** — EN / ES / 中文.

**Dropped from the Bisque template (do not port):** `components/Avatar.tsx`, `components/ModeSwitch.tsx`, `components/VoiceControls.tsx`, `components/UploadButton.tsx`, `app/api/transcribe/`, `app/api/tts/`, `lib/retrieve.ts`, `lib/knowledge.ts`, `lib/log.ts`, `lib/modes.ts`, `data/products.json`, `data/resources.json`.

---

## Phase 1 — Types & contract (do first; catalog curation depends on it)

### Task 1: Define the data contract

**Files:** Create `lib/types.ts`

- [ ] **Step 1: Write `lib/types.ts`**

```ts
export type Lang = 'en' | 'es' | 'zh';

export type PartCategory = 'traveler' | 'ring';

export interface Part {
  id: string;                 // stable citation id, e.g. "trav-ss-round-09.1"
  category: PartCategory;
  name: string;               // e.g. "Short-Staple Steel Traveler — Round Wire"
  attributes: {
    staple?: 'short' | 'long';
    profile?: 'round' | 'flat' | 'oval-half-round';
    size?: string;            // verbatim, e.g. "11.1 mm (HZ type)"
    finish?: string;          // verbatim, incl. service-life claims
    material?: string;        // e.g. "steel", "nylon"
    application?: string;     // e.g. "fine wool & synthetic counts"
  };
  selectionLogic: string;     // the rule that helps pick this part
  source: string;             // AB Carter public source this came from
  confirmWithEngineer?: boolean; // true where public data is thin
}

export interface Citation {
  type: 'part';
  id: string;
  title: string;
  detail: string;             // one-line key spec shown on the card
  source: string;
  url: string;                // AB Carter source/category page
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  citations?: Citation[];
}

export interface ChatResponse {
  reply: string;
  citations: Citation[];
}

export interface PageContext {
  label: string;
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/types.ts && git commit -m "feat: data contract for AB Carter parts + citations"
```

---

## Phase 2 — Catalog data (the real content work)

### Task 2: Curate the AB Carter catalog

**Files:** Create `data/catalog.ts`, `data/catalog.test.ts`

Source ONLY from AB Carter public materials. Pages/PDFs to mine:
- `https://www.abcarter.com/travelers/` (short/long-staple steel; profiles round/flat/oval-half-round; J-type 9.1/11.1/17.0 mm, HZ-type 9.5/10.3/11.1/17.0 mm; finishes incl. "up to 50% longer life")
- `https://www.abcarter.com/` nav → nylon travelers, rings (short/long staple), belts/accessories (rings is in-scope; belts optional)
- The "Rings & Steel Traveler Reference Guide" and steel-traveler brochure PDFs linked from the travelers page
- Nylon travelers page

Rules: copy sizes/finishes/profiles **verbatim**; never invent a number or part code. Where the public source only names a category without specs, write the entry at category level and set `confirmWithEngineer: true`. Target 40–80 entries across travelers + rings.

- [ ] **Step 1: Fetch the public sources** (WebFetch each page; for PDFs, fetch and extract text — use the `pdf` skill if a PDF won't convert). Record the source URL per entry.

- [ ] **Step 2: Write `data/catalog.ts`** as `export const CATALOG: Part[] = [ ... ]` with the curated entries. Example shape (fill with real values, not these):

```ts
import { Part } from '@/lib/types';

export const CATALOG: Part[] = [
  {
    id: 'trav-ss-round-fine',
    category: 'traveler',
    name: 'Short-Staple Steel Traveler — Round Wire',
    attributes: {
      staple: 'short', profile: 'round', material: 'steel',
      application: 'fine wool & synthetic counts',
    },
    selectionLogic: 'Round wire profile suits fine wool and synthetic counts.',
    source: 'https://www.abcarter.com/travelers/',
  },
  // ... 40–80 total
];
```

- [ ] **Step 3: Write `data/catalog.test.ts`** (integrity, not behavior):

```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CATALOG } from './catalog';

test('catalog has a usable number of entries', () => {
  assert.ok(CATALOG.length >= 40, `expected >= 40 entries, got ${CATALOG.length}`);
});

test('every entry is well-formed and ids are unique', () => {
  const ids = new Set<string>();
  for (const p of CATALOG) {
    assert.match(p.id, /^[a-z0-9-]+$/);
    assert.ok(!ids.has(p.id), `duplicate id: ${p.id}`);
    ids.add(p.id);
    assert.ok(['traveler', 'ring'].includes(p.category));
    assert.ok(p.name.length > 0);
    assert.ok(p.selectionLogic.length > 0);
    assert.match(p.source, /^https:\/\/(www\.)?abcarter\.com/);
  }
});
```

- [ ] **Step 4: Run the test** — `npx --yes tsx --test data/catalog.test.ts`. Expected: both tests PASS. (`tsx` is a devDependency from Task 12.)

- [ ] **Step 5: Commit** — `git add data/catalog.ts data/catalog.test.ts && git commit -m "feat: curated AB Carter travelers/rings catalog"`

---

## Phase 3 — Retrieval seam

### Task 3: `getContext()` seam

**Files:** Create `lib/catalog-search.ts`

- [ ] **Step 1: Write it** (POC returns the whole catalog; documented upgrade point):

```ts
import { CATALOG } from '@/data/catalog';
import { Part } from './types';

// POC: the catalog is small enough to stuff whole, which also makes
// multilingual robust (the model sees every English spec, answers in the
// user's language). PRODUCTION upgrade: replace the body with vector
// retrieval (embed the query, match top-k from Supabase/pgvector).
export function getContext(): Part[] {
  return CATALOG;
}
```

- [ ] **Step 2: Commit** — `git commit -am "feat: getContext seam (stuffed-catalog POC)"`

---

## Phase 4 — Prompt & model

### Task 4: System prompt with multilingual rules

**Files:** Create `lib/prompt.ts`

- [ ] **Step 1: Write it** (ported/rewritten from Bisque `knowledge.ts`):

```ts
import { Part } from './types';

const LANG_NAME: Record<string, string> = { en: 'English', es: 'Spanish', zh: 'Simplified Chinese' };

export function buildSystemPrompt(items: Part[], lang: string, pageLabel?: string): string {
  const persona =
    'You are the AB Carter Assistant, the application specialist for A. B. Carter, Inc. ' +
    '(abcarter.com), a 100-year-old maker of spinning travelers, rings, and textile solutions in Gastonia, NC. ' +
    'You help mill technicians and buyers select the right traveler or ring. Be precise, professional, and concise.';
  const rules =
    'Rules:\n' +
    '- Answer ONLY from the AB Carter catalog below. Never invent a product, size, finish, part code, price, or URL.\n' +
    '- When you recommend a part, cite it by its exact id.\n' +
    '- NEVER translate or alter part numbers, sizes, or model identifiers — reproduce them verbatim.\n' +
    `- Respond in ${LANG_NAME[lang] ?? 'the user\'s language'}; if the user writes in another language, answer in THAT language.\n` +
    '- If the catalog lacks the exact spec, say so and tell the user to confirm sizing with an AB Carter engineer (sales@abcarter.com). Do not guess.\n' +
    '- Reply in plain conversational text — no markdown.\n' +
    '- Always answer by calling the `respond` tool.';
  const page = pageLabel ? `\n\nThe visitor is on ${pageLabel}.` : '';
  return `${persona}\n\n${rules}${page}\n\nAB Carter catalog (JSON):\n${JSON.stringify(items)}`;
}
```

- [ ] **Step 2: Commit** — `git add lib/prompt.ts && git commit -m "feat: AB Carter system prompt + multilingual grounding rules"`

### Task 5: `ask()` — forced-citation chat

**Files:** Create `lib/claude.ts` (port + simplify from Bisque)

- [ ] **Step 1: Write it:**

```ts
import Anthropic from '@anthropic-ai/sdk';
import { Citation, ChatMessage, ChatResponse, PageContext, Part } from './types';
import { buildSystemPrompt } from './prompt';
import { getContext } from './catalog-search';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const respondTool: Anthropic.Tool = {
  name: 'respond',
  description: 'Return your reply and the ids of any AB Carter parts you cited.',
  input_schema: {
    type: 'object',
    properties: {
      reply: { type: 'string', description: 'Your concise reply, in the user\'s language.' },
      citationIds: { type: 'array', items: { type: 'string' }, description: 'Exact ids of cited parts; [] if none.' },
    },
    required: ['reply', 'citationIds'],
  },
};

function resolveCitations(ids: string[], items: Part[]): Citation[] {
  return ids
    .map((id) => items.find((it) => it.id === id))
    .filter((p): p is Part => Boolean(p))
    .map((p): Citation => ({
      type: 'part',
      id: p.id,
      title: p.name,
      detail: [p.attributes.size, p.attributes.profile, p.attributes.finish, p.attributes.application]
        .filter(Boolean).join(' · ') || p.selectionLogic,
      source: p.source,
      url: p.source,
    }));
}

export async function ask(messages: ChatMessage[], lang: string, page?: PageContext): Promise<ChatResponse> {
  const items = getContext();
  const apiMessages: Anthropic.MessageParam[] = messages.map((m) => ({ role: m.role, content: m.content }));
  const res = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 700,
    system: [{ type: 'text', text: buildSystemPrompt(items, lang, page?.label), cache_control: { type: 'ephemeral' } }],
    tools: [respondTool],
    tool_choice: { type: 'tool', name: 'respond' },
    messages: apiMessages,
  });
  const toolUse = res.content.find((c) => c.type === 'tool_use');
  if (!toolUse || toolUse.type !== 'tool_use') throw new Error('Claude did not return a structured response');
  const { reply, citationIds } = toolUse.input as { reply: string; citationIds: string[] };
  return { reply, citations: resolveCitations(citationIds, items) };
}
```

- [ ] **Step 2: Commit** — `git add lib/claude.ts && git commit -m "feat: ask() forced-citation chat over stuffed catalog"`

---

## Phase 5 — API

### Task 6: In-memory rate limiter

**Files:** Create `lib/ratelimit.ts` (replaces Bisque's Supabase version)

- [ ] **Step 1: Write it:**

```ts
// In-memory fixed-window limiter (single-instance POC). Fails open.
const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, max: number, windowSeconds: number): boolean {
  const now = Date.now();
  const rec = hits.get(key);
  if (!rec || now > rec.resetAt) {
    hits.set(key, { count: 1, resetAt: now + windowSeconds * 1000 });
    return true;
  }
  if (rec.count >= max) return false;
  rec.count += 1;
  return true;
}
```

### Task 7: Chat API route

**Files:** Create `app/api/chat/route.ts` (port from Bisque; drop logging, add `lang`)

- [ ] **Step 1: Write it:**

```ts
import { NextRequest, NextResponse } from 'next/server';
import { ask } from '@/lib/claude';
import { PageContext } from '@/lib/types';
import { rateLimit } from '@/lib/ratelimit';

const CHAT_PER_MIN = 30;
const MAX_HISTORY_MESSAGES = 20;
const VALID_LANGS = new Set(['en', 'es', 'zh']);

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'local';
  if (!rateLimit(`chat:${ip}`, CHAT_PER_MIN, 60)) {
    return NextResponse.json({ error: 'cap' }, { status: 429 });
  }
  try {
    const body = await req.json();
    const lang = VALID_LANGS.has(body.lang) ? body.lang : 'en';
    let { messages } = body;
    let page: PageContext | undefined;
    if (body.page && typeof body.page.label === 'string') page = { label: body.page.label.slice(0, 300) };
    if (!Array.isArray(messages)) return NextResponse.json({ error: 'bad_request' }, { status: 400 });
    messages = messages
      .filter((m: unknown) => m && typeof (m as any).role === 'string' && typeof (m as any).content === 'string'
        && ['user', 'assistant'].includes((m as any).role))
      .slice(-MAX_HISTORY_MESSAGES);
    const result = await ask(messages, lang, page);
    return NextResponse.json(result);
  } catch (err) {
    console.error('chat route error:', err);
    return NextResponse.json({ error: 'model' }, { status: 500 });
  }
}
```

- [ ] **Step 2: Commit** — `git add lib/ratelimit.ts app/api/chat/route.ts && git commit -m "feat: chat API route + in-memory limiter, lang-aware"`

---

## Phase 6 — i18n & UI

### Task 8: i18n strings

**Files:** Create `lib/i18n.ts`

- [ ] **Step 1: Write it** (vetted starter questions per language so the live demo never misfires; translate the prose, keep any part terms natural):

```ts
import { Lang } from './types';

export interface UIStrings {
  greeting: string;
  placeholder: string;
  send: string;
  thinking: string;
  chips: string[];
}

export const I18N: Record<Lang, UIStrings> = {
  en: {
    greeting: "I'm the AB Carter Assistant. Tell me your spinning setup and I'll help you pick the right traveler or ring.",
    placeholder: 'Ask about travelers, rings, sizes…',
    send: 'Send',
    thinking: 'Thinking…',
    chips: [
      'Which traveler for fine cotton on a short-staple ring?',
      'What wire profile suits heavy wool counts?',
      'I need ~50% longer traveler life — what finish?',
    ],
  },
  es: {
    greeting: 'Soy el Asistente de AB Carter. Cuénteme su configuración de hilatura y le ayudo a elegir el cursor o anillo correcto.',
    placeholder: 'Pregunte por cursores, anillos, tamaños…',
    send: 'Enviar',
    thinking: 'Pensando…',
    chips: [
      '¿Qué cursor para algodón fino en anillo de fibra corta?',
      '¿Qué perfil de alambre para títulos de lana gruesa?',
      'Necesito ~50% más vida del cursor, ¿qué acabado?',
    ],
  },
  zh: {
    greeting: '我是 AB Carter 助手。告诉我您的纺纱配置，我来帮您选择合适的钢丝圈或钢领。',
    placeholder: '咨询钢丝圈、钢领、尺寸…',
    send: '发送',
    thinking: '思考中…',
    chips: [
      '短纤维钢领纺细支棉纱用哪种钢丝圈？',
      '粗支毛纱适合哪种钢丝截面？',
      '需要钢丝圈寿命延长约50%，用什么表面处理？',
    ],
  },
};
```

> Have the per-language chips/greeting reviewed for textile-term accuracy during the build (use Claude to sanity-check the ZH/ES textile vocabulary). The chips must map to questions the catalog can actually answer.

### Task 9: LanguageToggle component

**Files:** Create `components/LanguageToggle.tsx`

- [ ] **Step 1: Write it:**

```tsx
'use client';
import { Lang } from '@/lib/types';

const LABELS: Record<Lang, string> = { en: 'EN', es: 'ES', zh: '中文' };

export default function LanguageToggle({ lang, onChange }: { lang: Lang; onChange: (l: Lang) => void }) {
  return (
    <div className="flex gap-1 rounded-full bg-carter-100 p-1 text-xs font-medium">
      {(Object.keys(LABELS) as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => onChange(l)}
          className={`rounded-full px-3 py-1 transition ${l === lang ? 'bg-carter-600 text-white' : 'text-carter-700 hover:bg-carter-200'}`}
        >
          {LABELS[l]}
        </button>
      ))}
    </div>
  );
}
```

### Task 10: Port ChatPanel, MessageBubble, CitationCard, BrowserFrame (rebranded)

**Files:** Create the four components by porting from Bisque.

- [ ] **Step 1: `components/BrowserFrame.tsx`** — copy Bisque's; replace `clay-*` → `carter-*`, `bg-glaze` → `bg-carter-400`. Keep the traffic-light chrome.
- [ ] **Step 2: `components/MessageBubble.tsx`** — copy Bisque's; replace `clay-*` → `carter-*`; remove the `message.image` block (no uploads).
- [ ] **Step 3: `components/CitationCard.tsx`** — adapt for `type: 'part'`: left icon (no image), `title` = part name, subtitle = `detail`, footer line "View on abcarter.com →" linking `url`. Replace `clay-*` → `carter-*`.

```tsx
import { Citation } from '@/lib/types';

export default function CitationCard({ citation }: { citation: Citation }) {
  return (
    <a href={citation.url} target="_blank" rel="noreferrer"
       className="mt-2 flex items-start gap-3 rounded-xl border border-carter-200 bg-surface p-2.5 transition hover:border-carter-400">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-carter-100 text-carter-600">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.5"/></svg>
      </div>
      <div className="min-w-0 flex-1 leading-tight">
        <div className="truncate text-sm font-semibold text-carter-900">{citation.title}</div>
        <div className="text-xs text-carter-700">{citation.detail}</div>
        <div className="mt-0.5 text-xs text-carter-500">View on abcarter.com →</div>
      </div>
    </a>
  );
}
```

- [ ] **Step 4: `components/ChatPanel.tsx`** — port Bisque's, but remove the `MODES` import and take `chips`, `placeholder`, `sendLabel`, `thinkingLabel` as props; `MessageBubble` no longer needs `onCitationOpen` (citations are plain links now). Replace `clay-*` → `carter-*`.

### Task 11: Page, layout, globals (branding)

**Files:** Create `app/page.tsx`, `app/layout.tsx`, `app/globals.css`. Use the **ui-ux-pro-max** skill for the visual pass.

- [ ] **Step 1: `app/globals.css`** — AB Carter palette; drop all clay keyframes:

```css
@import "tailwindcss";

@theme {
  --color-carter-50: #f4f6f8;
  --color-carter-100: #e6ebf0;
  --color-carter-200: #cdd7e0;
  --color-carter-400: #5b7390;
  --color-carter-500: #3a5273;
  --color-carter-600: #233a5e;   /* AB Carter navy */
  --color-carter-700: #1a2c47;
  --color-carter-900: #0f1b2d;
  --color-accent: #b1232b;       /* AB Carter red */
  --color-surface: #ffffff;
}

body { background: var(--color-carter-50); color: var(--color-carter-900); font-family: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif; }
```
> Confirm AB Carter's real brand hexes from abcarter.com during the ui-ux-pro-max pass; the values above are a sensible industrial-navy/red default.

- [ ] **Step 2: `app/layout.tsx`** — port Bisque's; set `metadata.title = 'AB Carter Assistant'`, description accordingly.

- [ ] **Step 3: `app/page.tsx`** — single thread, language state, faux `abcarter.com` frame, "Powered by TSD Concierge" footer:

```tsx
'use client';
import { useState } from 'react';
import { ChatMessage, Lang } from '@/lib/types';
import { I18N } from '@/lib/i18n';
import BrowserFrame from '@/components/BrowserFrame';
import ChatPanel from '@/components/ChatPanel';
import LanguageToggle from '@/components/LanguageToggle';

export default function Page() {
  const [lang, setLang] = useState<Lang>('en');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [busy, setBusy] = useState(false);
  const t = I18N[lang];

  async function onSend(text: string) {
    const next = [...messages, { role: 'user', content: text } as ChatMessage];
    setMessages(next); setBusy(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next, lang, page: { label: 'the AB Carter travelers & rings catalog' } }),
      });
      if (!res.ok) throw new Error('model');
      const data = await res.json();
      setMessages([...next, { role: 'assistant', content: data.reply, citations: data.citations }]);
    } catch {
      setMessages([...next, { role: 'assistant', content: 'Something went wrong — please try again in a moment.' }]);
    } finally { setBusy(false); }
  }

  const hero = messages.length === 0;
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col justify-center gap-4 px-4 py-10">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold tracking-wide text-carter-700">A. B. CARTER</span>
        <LanguageToggle lang={lang} onChange={(l) => { setLang(l); setMessages([]); }} />
      </div>
      <BrowserFrame url="abcarter.com">
        <div className="flex flex-col gap-4 p-6">
          {hero && <p className="text-center text-sm text-carter-700">{t.greeting}</p>}
          <ChatPanel
            messages={messages} busy={busy} onSend={onSend}
            chips={t.chips} placeholder={t.placeholder} sendLabel={t.send} thinkingLabel={t.thinking}
          />
        </div>
      </BrowserFrame>
      <p className="text-center text-xs text-carter-500">Powered by TSD Concierge</p>
    </main>
  );
}
```

- [ ] **Step 4: Commit** — `git add app components lib/i18n.ts && git commit -m "feat: AB Carter UI — single-mode, multilingual, branded frame"`

---

## Phase 7 — Build, verify, ship

### Task 12: Configs, install, typecheck, build

**Files:** `package.json`, `.env.example`, copy remaining configs.

- [ ] **Step 1:** Copy `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `next-env.d.ts` from Bisque. Write `package.json` (name `ab-carter-assistant`; deps: `@anthropic-ai/sdk`, `next` 16.2.6, `react`/`react-dom` 19; devDeps: tailwind/postcss, eslint, typescript, types, `tsx` for the catalog test). Write `.env.example` with `ANTHROPIC_API_KEY=`.
- [ ] **Step 2:** `npm install`
- [ ] **Step 3:** `npx tsc --noEmit` — fix any type errors until clean.
- [ ] **Step 4:** `npm run build` — must succeed. Read `node_modules/next/dist/docs/` if a Next 16 API complains.
- [ ] **Step 5: Commit** — `git add -A && git commit -m "chore: project config, clean typecheck + build"`

### Task 13: Manual demo verification

- [ ] **Step 1:** Create `.env.local` with a **TSD demo `ANTHROPIC_API_KEY`** (provided by Nash — never his personal key). Do NOT commit it.
- [ ] **Step 2:** `npm run dev`; open the local URL.
- [ ] **Step 3:** Verify, per language (EN, then ES, then 中文): the greeting + chips switch; tapping a chip returns a grounded answer in that language with at least one citation card; part numbers/sizes appear verbatim; an off-catalog question triggers the "confirm with an AB Carter engineer" deferral instead of a fabricated spec.
- [ ] **Step 4:** If any answer invents a spec, tighten the prompt rules in `lib/prompt.ts` and re-verify.

### Task 14: Push to GitHub

- [ ] **Step 1:** Create the remote if needed: `gh repo create nashyD/ab-carter --private --source "/Users/nashdavis/Documents/TSD/TSD Modernization Solution/ab-carter-concierge" --remote origin` (confirm whether it should be private vs public with Nash; default private).
- [ ] **Step 2:** `git push -u origin main` (rename branch to `main` first if needed: `git branch -M main`).
- [ ] **Step 3:** Confirm `.env.local` is NOT in the pushed tree (`git ls-files | grep env` returns only `.env.example`).

---

## Out of scope (the paid build, not this POC)
Supabase + pgvector retrieval, embeddings pipeline, the email-CSV auto-refresh Worker, full catalog, voice, image upload, chat logging/analytics, auth, production hardening. The `getContext()` seam and the forced-citation contract are the upgrade points.
