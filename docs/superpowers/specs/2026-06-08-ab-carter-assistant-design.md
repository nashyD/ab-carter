# AB Carter Assistant — POC Design Spec

- **Date:** 2026-06-08
- **Status:** Approved design → pending written-spec review
- **Owner:** Nash (TSD Modernization Solutions)
- **Type:** Pitch POC (not the paid build)

## Purpose

A cold-pitch demo for **AB Carter Inc** — a ~$24M, 100-year-old textile-spinning-solutions manufacturer in Gastonia, NC. The demo is the sales weapon Grant brings in person: a branded **AB Carter Assistant** that answers real traveler/ring part-selection questions from AB Carter's own catalog, in **English, Spanish, and Chinese**, looking as though it already lives on `abcarter.com`.

It productizes the same TSD Concierge we just shipped (paid) for Bisque Imports, pointed at AB Carter's flagship product line.

## Success criteria

- Correctly answers 3–5 realistic selection questions across travelers + rings.
- Answers the same caliber of question in EN, ES, and ZH-Hans (live language switch).
- Reads as if already embedded on `abcarter.com`.
- Never fabricates a spec or part number — cites by ID, or defers to an AB Carter engineer.
- Grant runs it from a laptop/iPad via one URL; starter chips guarantee a clean demo even if he freezes.
- Upgrades cleanly to the full RAG build the day they sign.

## Non-goals (these belong to the paid build, not the POC)

- Supabase / pgvector, the embeddings pipeline, the Cloudflare email-CSV auto-refresh Worker.
- Voice, image upload, analytics, persisted chat logs.
- The full catalog — only travelers + rings are seeded.
- Auth, multi-tenant, production hardening.

## Architecture

- Fork the Bisque assistant: **Next.js 16 + React 19 + TypeScript + Tailwind**, chat backed by **Claude Sonnet** (verify exact model id via the `claude-api` skill at build time).
- Replace the Supabase retrieval layer with a **static curated dataset stuffed into the prompt-cached system prompt**. No vector DB, no embeddings.
- Retain Bisque's **forced-tool-use `respond` pattern** (fields: `reply`, `citationIds`): the model answers only from the dataset and cites by ID. This is the anti-hallucination guarantee — it physically cannot invent an AB Carter spec on stage.
- **Upgrade seam:** all catalog access goes through a single `getContext(query, lang)` function. POC returns the full stuffed dataset; production swaps it for vector retrieval against Supabase. Same UI, same prompt contract.
- **Secrets:** `ANTHROPIC_API_KEY` via env var / Vercel env. No keys committed. POC uses a dedicated TSD demo key (never Nash's personal key).

## Catalog dataset (the real work)

- A typed array (`catalog.ts`) of ~40–80 entries.
- Entry shape:
  ```ts
  {
    id: string;            // stable citation id, e.g. "trav-steel-ss-round-01"
    category: 'traveler' | 'ring';
    name: string;
    attributes: {
      staple?: 'short' | 'long';
      profile?: 'round' | 'flat' | 'oval-half-round';
      size?: string;       // verbatim, e.g. "11.1mm (HZ type)"
      finish?: string;     // verbatim, incl. service-life claims
      material?: string;
      application?: string;
    };
    selectionLogic: string; // e.g. "Round wire → fine wool & synthetic counts"
    source: string;         // AB Carter public source the entry came from
    confirmWithEngineer?: boolean; // true where public data is thin
  }
  ```
- Sourced **only** from AB Carter public materials: the Travelers page, the *Rings & Steel Traveler Reference Guide*, and the steel-traveler brochures. Identifiers and numeric specs are kept verbatim; nothing is invented.
- Entries with thin public data carry `confirmWithEngineer: true` so the assistant defers honestly (which doubles as a lead-capture beat).

## Multilingual (EN / ES / ZH-Hans)

- Catalog data stays in English. The assistant **detects the user's language and replies in it**; part numbers, sizes, and model identifiers are reproduced **verbatim**, surrounding prose is translated.
- **Language toggle** in the UI (EN / ES / 中文) swaps the greeting, input placeholder, and starter chips. Auto-detection still governs answer language regardless of the toggle setting.
- **Vetted starter chips per language** (3–4 each), pre-tested so the live demo is reliable; free-form input still works in any language.
- System-prompt rule: *"Respond in the user's language. Never translate or alter part numbers, sizes, or model identifiers. If unsure of a spec, defer to an AB Carter engineer."*

## Persona + branding

- **Name:** "AB Carter Assistant" (neutral). **Persona:** a knowledgeable AB Carter application specialist — warm, precise, defers when unsure.
- **Branding:** AB Carter logo + color palette, inside a faux `abcarter.com` browser frame (reuse Bisque's `BrowserFrame`). Small "Powered by TSD Concierge" footer tag for attribution.
- **Single mode:** part/product selection. No mode switcher, no resources/site tabs.
- UI styling executed via the **ui-ux-pro-max** skill.

## UX flow

Faux `abcarter.com` browser frame → assistant panel → greeting + language toggle + starter chips → conversation with **citation cards** (name, key attributes, source) → graceful "confirm with an AB Carter engineer" deferral when public data is thin.

## Deployment

- **Vercel**, single public URL for Grant. One env var: `ANTHROPIC_API_KEY`.
- **Repo:** `~/Documents/TSD/TSD Modernization Solution/ab-carter-concierge/` — fresh git repo, `.env*` gitignored.
- Works on iPad/laptop in a browser.

## Risks & mitigations

- **Hallucinated specs** → forced citation + "never invent / defer to engineer" rule + curated-only dataset.
- **Chinese technical terminology quality** → vetted per-language starter chips; free-form still supported.
- **Public data thin on exact part numbers** → deferral path (also a lead-capture moment).
- **Live-demo network/key failure** → starter chips + a known-good demo script; consider a cached/canned fallback (decide in the plan).

## Upgrade path (the paid build)

Swap `getContext()` to Supabase + pgvector retrieval; add the email-CSV auto-refresh Worker; expand to the full catalog; add voice + image upload; persist chat logs; harden for production. The UI and the prompt contract do not change.
