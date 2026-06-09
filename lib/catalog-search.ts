import { CATALOG } from '@/data/catalog';
import { Part } from './types';

// POC: the catalog is small enough to stuff whole into the prompt, which also
// makes multilingual robust — the model sees every English spec and answers in
// the user's language. PRODUCTION upgrade: replace the body with vector
// retrieval (embed the query, match top-k from Supabase/pgvector).
export function getContext(): Part[] {
  return CATALOG;
}
