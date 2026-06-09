'use client';
import { useState } from 'react';
import { CATALOG } from '@/data/catalog';
import { Part } from '@/lib/types';

function attrLine(p: Part): string {
  return [
    p.attributes.staple && `${p.attributes.staple} staple`,
    p.attributes.profile,
    p.attributes.size,
    p.attributes.finish,
    p.attributes.material,
    p.attributes.application,
  ]
    .filter(Boolean)
    .join(' · ');
}

function Section({ label, items }: { label: string; items: Part[] }) {
  if (items.length === 0) return null;
  return (
    <div className="mb-4">
      <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-carter-400">
        {label} ({items.length})
      </div>
      <ul className="flex flex-col gap-1.5">
        {items.map((p) => (
          <li key={p.id} className="rounded-lg border border-carter-100 px-3 py-2">
            <div className="flex items-start justify-between gap-2">
              <span className="text-sm font-medium text-carter-900">{p.name}</span>
              {p.confirmWithEngineer && (
                <span className="shrink-0 rounded-full bg-carter-100 px-2 py-0.5 text-[10px] text-carter-500">
                  confirm w/ engineer
                </span>
              )}
            </div>
            {attrLine(p) && <div className="mt-0.5 text-xs text-carter-600">{attrLine(p)}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function KnowledgeBase({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState('');
  const ql = q.trim().toLowerCase();
  const filtered = ql
    ? CATALOG.filter((p) => `${p.name} ${attrLine(p)} ${p.selectionLogic}`.toLowerCase().includes(ql))
    : CATALOG;
  const travelers = filtered.filter((p) => p.category === 'traveler');
  const rings = filtered.filter((p) => p.category === 'ring');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-carter-900/40 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-surface shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-carter-100 px-5 py-3.5">
          <div>
            <h2 className="text-sm font-semibold text-carter-900">Knowledge base</h2>
            <p className="text-xs text-carter-500">{CATALOG.length} parts, sourced from abcarter.com</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-1.5 text-carter-500 transition hover:bg-carter-100"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <div className="border-b border-carter-100 px-5 py-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Filter parts…"
            className="w-full rounded-full bg-carter-100 px-4 py-2 text-sm text-carter-900 outline-none placeholder:text-carter-500"
          />
        </div>
        <div className="overflow-y-auto px-5 py-3">
          <Section label="Travelers" items={travelers} />
          <Section label="Rings" items={rings} />
          {filtered.length === 0 && (
            <p className="py-6 text-center text-sm text-carter-500">No parts match that filter.</p>
          )}
        </div>
      </div>
    </div>
  );
}
