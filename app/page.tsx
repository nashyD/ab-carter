'use client';
import { useEffect, useState } from 'react';
import { ChatMessage, Lang } from '@/lib/types';
import { I18N } from '@/lib/i18n';
import BrowserFrame from '@/components/BrowserFrame';
import ChatPanel from '@/components/ChatPanel';
import LanguageToggle from '@/components/LanguageToggle';

const GATED = process.env.NEXT_PUBLIC_GATED === '1';
const CODE_KEY = 'abc_access';

export default function Page() {
  const [lang, setLang] = useState<Lang>('en');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [busy, setBusy] = useState(false);

  // Access gate (only active when NEXT_PUBLIC_GATED=1)
  const [ready, setReady] = useState(false);
  const [code, setCode] = useState('');
  const [codeInput, setCodeInput] = useState('');
  const [gateError, setGateError] = useState(false);

  useEffect(() => {
    setCode(typeof window !== 'undefined' ? localStorage.getItem(CODE_KEY) || '' : '');
    setReady(true);
  }, []);

  const t = I18N[lang];

  function submitCode() {
    const c = codeInput.trim();
    if (!c) return;
    localStorage.setItem(CODE_KEY, c);
    setCode(c);
    setGateError(false);
  }

  async function onSend(text: string) {
    const next: ChatMessage[] = [...messages, { role: 'user', content: text }];
    setMessages(next);
    setBusy(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-access-code': code },
        body: JSON.stringify({
          messages: next,
          lang,
          page: { label: 'the AB Carter travelers & rings catalog' },
        }),
      });
      if (res.status === 401) {
        localStorage.removeItem(CODE_KEY);
        setCode('');
        setGateError(true);
        setMessages([]);
        return;
      }
      if (!res.ok) throw new Error('model');
      const data = await res.json();
      setMessages([...next, { role: 'assistant', content: data.reply, citations: data.citations }]);
    } catch {
      setMessages([
        ...next,
        { role: 'assistant', content: 'Something went wrong — please try again in a moment.' },
      ]);
    } finally {
      setBusy(false);
    }
  }

  if (!ready) return null;

  if (GATED && !code) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-sm flex-col justify-center px-4">
        <div className="rounded-2xl bg-surface p-6 shadow-xl ring-1 ring-carter-900/5">
          <div className="text-sm font-semibold tracking-wide text-carter-700">A. B. CARTER</div>
          <h1 className="mt-1 text-lg font-semibold text-carter-900">Assistant — demo access</h1>
          <p className="mt-1 text-sm text-carter-500">Enter the access code to continue.</p>
          <input
            type="password"
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submitCode()}
            placeholder="Access code"
            className="mt-4 w-full rounded-full bg-carter-100 px-4 py-2.5 text-sm text-carter-900 outline-none placeholder:text-carter-500"
          />
          <button
            onClick={submitCode}
            className="mt-3 w-full rounded-full bg-carter-600 px-4 py-2.5 text-sm font-semibold text-white"
          >
            Enter
          </button>
          {gateError && <p className="mt-2 text-center text-xs text-accent">Incorrect code — try again.</p>}
          <p className="mt-4 text-center text-xs text-carter-500">Powered by TSD Concierge</p>
        </div>
      </main>
    );
  }

  const hero = messages.length === 0;
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col justify-center gap-4 px-4 py-10">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold tracking-wide text-carter-700">A. B. CARTER</span>
        <LanguageToggle
          lang={lang}
          onChange={(l) => {
            setLang(l);
            setMessages([]);
          }}
        />
      </div>
      <BrowserFrame url="abcarter.com">
        <div className="flex flex-col gap-4 p-6">
          {hero && <p className="text-center text-sm text-carter-700">{t.greeting}</p>}
          <ChatPanel
            messages={messages}
            busy={busy}
            onSend={onSend}
            chips={t.chips}
            placeholder={t.placeholder}
            sendLabel={t.send}
            thinkingLabel={t.thinking}
          />
        </div>
      </BrowserFrame>
      <p className="text-center text-xs text-carter-500">Powered by TSD Concierge</p>
    </main>
  );
}
