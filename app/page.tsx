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
    const next: ChatMessage[] = [...messages, { role: 'user', content: text }];
    setMessages(next);
    setBusy(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: next,
          lang,
          page: { label: 'the AB Carter travelers & rings catalog' },
        }),
      });
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
