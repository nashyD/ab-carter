'use client';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { ChatMessage } from '@/lib/types';
import MessageBubble from './MessageBubble';

export default function ChatPanel({
  messages,
  busy,
  onSend,
  chips,
  placeholder,
  sendLabel,
  thinkingLabel,
  tools,
  speaking,
  onStop,
}: {
  messages: ChatMessage[];
  busy: boolean;
  onSend: (text: string) => void;
  chips: string[];
  placeholder: string;
  sendLabel: string;
  thinkingLabel: string;
  tools?: ReactNode;
  speaking?: boolean;
  onStop?: () => void;
}) {
  const [text, setText] = useState('');
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, busy]);

  const submit = () => {
    const t = text.trim();
    if (!t || busy) return;
    setText('');
    onSend(t);
  };

  return (
    <div className="flex flex-col gap-3">
      {messages.length === 0 && (
        <div className="flex flex-wrap justify-center gap-2">
          {chips.map((chip) => (
            <button
              key={chip}
              onClick={() => onSend(chip)}
              className="rounded-full border border-carter-200 bg-surface px-3 py-1.5 text-xs text-carter-700 transition hover:border-carter-400"
            >
              {chip}
            </button>
          ))}
        </div>
      )}

      <div className="flex max-h-[42vh] flex-col gap-3 overflow-y-auto">
        {messages.map((m, i) => (
          <MessageBubble key={i} message={m} />
        ))}
        {busy && (
          <div className="self-start rounded-2xl rounded-bl-md bg-carter-100 px-4 py-3 text-carter-500">
            {thinkingLabel}
          </div>
        )}
        <div ref={endRef} />
      </div>

      {speaking && onStop && (
        <button
          onClick={onStop}
          className="mx-auto inline-flex items-center gap-1.5 rounded-full bg-carter-100 px-3 py-1 text-xs font-medium text-carter-700 transition hover:bg-carter-200"
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <rect x="5" y="5" width="14" height="14" rx="2.5" />
          </svg>
          Stop speaking
        </button>
      )}

      <div className="flex items-center gap-2">
        {tools}
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          placeholder={placeholder}
          className="min-w-0 flex-1 rounded-full bg-carter-100 px-4 py-2.5 text-sm text-carter-900 outline-none placeholder:text-carter-500"
        />
        <button
          onClick={submit}
          disabled={busy}
          className="rounded-full bg-carter-600 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
        >
          {sendLabel}
        </button>
      </div>
    </div>
  );
}
