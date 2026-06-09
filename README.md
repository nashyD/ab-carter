# AB Carter Assistant — TSD Concierge demo

A branded, multilingual (English / Español / 中文) AI **part-selection assistant** for
[A. B. Carter, Inc.](https://www.abcarter.com) travelers and rings. Built by
**TSD Modernization Solutions** as a live pitch demo of the TSD Concierge product.

Ask it a real spinning question — _"Which traveler for fine cotton on a short-staple ring?"_ —
in any of the three languages, and it answers from AB Carter's own catalog, citing the part,
and never inventing a spec.

## How it works

- **Next.js 16 + Claude (Sonnet).** The chat is forced through a `respond` tool that must
  cite parts by id, so the assistant can only answer from the supplied catalog.
- **Stuffed-catalog POC.** The curated travelers/rings catalog (`data/catalog.ts`) is small
  enough to place whole into the prompt-cached system prompt via the `getContext()` seam
  (`lib/catalog-search.ts`). No database, no embeddings.
- **Multilingual.** A language toggle swaps the greeting and starter questions; the model
  detects the user's language and replies in it, reproducing part numbers and sizes verbatim.
- **Grounding guardrail.** Where AB Carter's public data is thin, the assistant defers to an
  AB Carter engineer (`sales@abcarter.com`) instead of guessing.

## Run locally

```bash
npm install
cp .env.example .env.local   # then add a TSD demo ANTHROPIC_API_KEY (not a personal key)
npm run dev
```

Open the printed local URL.

## Catalog accuracy

Every entry in `data/catalog.ts` is sourced from AB Carter's public website and brochures,
with the source URL on each record. Specs are reproduced verbatim; nothing is fabricated.

## The production build (not in this demo)

This POC upgrades cleanly to the full Concierge: replace `getContext()` with vector retrieval
(Supabase + pgvector), add the email-CSV catalog auto-refresh worker, the full catalog, voice,
and image ("snap the worn part") search. The UI and the forced-citation contract stay the same.

---

_A TSD Concierge build · [tsd-modernization.com](https://tsd-modernization.com)_
