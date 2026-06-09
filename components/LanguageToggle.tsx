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
          className={`rounded-full px-3 py-1 transition ${
            l === lang ? 'bg-carter-600 text-white' : 'text-carter-700 hover:bg-carter-200'
          }`}
        >
          {LABELS[l]}
        </button>
      ))}
    </div>
  );
}
