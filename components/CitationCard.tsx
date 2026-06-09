import { Citation } from '@/lib/types';

export default function CitationCard({ citation }: { citation: Citation }) {
  return (
    <a
      href={citation.url}
      target="_blank"
      rel="noreferrer"
      className="mt-2 flex items-start gap-3 rounded-xl border border-carter-200 bg-surface p-2.5 transition hover:border-carter-400"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-carter-100 text-carter-600">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="3.5" />
        </svg>
      </div>
      <div className="min-w-0 flex-1 leading-tight">
        <div className="truncate text-sm font-semibold text-carter-900">{citation.title}</div>
        <div className="text-xs text-carter-700">{citation.detail}</div>
        <div className="mt-0.5 text-xs text-carter-500">View on abcarter.com →</div>
      </div>
    </a>
  );
}
