'use client';
import { useEffect, useState } from 'react';
import { ChatMessage, Lang } from '@/lib/types';
import { I18N } from '@/lib/i18n';
import BrowserFrame from '@/components/BrowserFrame';
import ChatPanel from '@/components/ChatPanel';
import LanguageToggle from '@/components/LanguageToggle';
import Avatar from '@/components/Avatar';

const GATED = process.env.NEXT_PUBLIC_GATED === '1';
const CODE_KEY = 'abc_access';
const AVATAR_KEY = 'abc_avatar';

export default function Page() {
  const [lang, setLang] = useState<Lang>('en');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [busy, setBusy] = useState(false);
  const [avatarOn, setAvatarOn] = useState(false);

  // Access gate (only active when NEXT_PUBLIC_GATED=1)
  const [ready, setReady] = useState(false);
  const [code, setCode] = useState('');
  const [codeInput, setCodeInput] = useState('');
  const [gateError, setGateError] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCode(localStorage.getItem(CODE_KEY) || '');
      setAvatarOn(localStorage.getItem(AVATAR_KEY) === '1');
    }
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

  function toggleAvatar() {
    setAvatarOn((v) => {
      const next = !v;
      localStorage.setItem(AVATAR_KEY, next ? '1' : '0');
      return next;
    });
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
  const avatarState = busy ? 'thinking' : 'idle';

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col justify-center gap-4 px-4 py-10">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold tracking-wide text-carter-700">A. B. CARTER</span>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleAvatar}
            title="Show or hide the assistant character"
            aria-pressed={avatarOn}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition ${
              avatarOn ? 'bg-carter-600 text-white' : 'bg-carter-100 text-carter-700 hover:bg-carter-200'
            }`}
          >
            <svg width="11" height="12" viewBox="0 0 22 24" fill="none" aria-hidden="true">
              <ellipse cx="11" cy="5" rx="9" ry="3" fill="currentColor" />
              <ellipse cx="11" cy="19" rx="9" ry="3" fill="currentColor" />
              <rect x="4" y="5" width="14" height="14" fill="currentColor" opacity="0.55" />
            </svg>
            Character
          </button>
          <LanguageToggle
            lang={lang}
            onChange={(l) => {
              setLang(l);
              setMessages([]);
            }}
          />
        </div>
      </div>
      <BrowserFrame url="abcarter.com">
        <div className="flex flex-col gap-4 p-6">
          {avatarOn && (
            <div className="flex justify-center">
              <Avatar state={avatarState} size={hero ? 128 : 76} />
            </div>
          )}
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
