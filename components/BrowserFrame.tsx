import { ReactNode } from 'react';

export default function BrowserFrame({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl shadow-2xl shadow-carter-900/20 ring-1 ring-carter-900/5">
      <div className="flex items-center gap-3 bg-carter-200 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 truncate rounded-full bg-surface px-4 py-1 text-xs text-carter-700">
          {url}
        </div>
      </div>
      <div className="bg-surface">{children}</div>
    </div>
  );
}
