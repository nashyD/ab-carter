import { CATALOG } from '@/data/catalog';
import { LOCATORS } from '@/data/locators';
import { Part } from './types';

// POC: the catalog is small enough to stuff whole into the prompt, which also
// makes multilingual robust. Each part is merged with its source locator (where to
// verify it) so the assistant can point the buyer to the exact page/section.
// PRODUCTION upgrade: replace the body with vector retrieval (Supabase/pgvector).
export function getContext(): Part[] {
  return CATALOG.map((p) => {
    const loc = LOCATORS[p.id];
    if (!loc) return p;
    return { ...p, locator: loc.locator, sourcePage: loc.sourcePage };
  });
}
