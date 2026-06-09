export type Lang = 'en' | 'es' | 'zh';

export type PartCategory = 'traveler' | 'ring';

export interface Part {
  id: string; // stable citation id, e.g. "trav-ss-round-09.1"
  category: PartCategory;
  name: string;
  attributes: {
    staple?: 'short' | 'long';
    profile?: 'round' | 'flat' | 'oval-half-round';
    size?: string; // verbatim, e.g. "11.1 mm (HZ type)"
    finish?: string; // verbatim, incl. service-life claims
    material?: string; // e.g. "steel", "nylon"
    application?: string; // e.g. "fine wool & synthetic counts"
  };
  selectionLogic: string; // the rule that helps pick this part
  source: string; // AB Carter public source this came from
  confirmWithEngineer?: boolean; // true where public data is thin
  locator?: string; // where to verify this part in the linked source (table/section)
  sourcePage?: number; // PDF page number, for a deep link (source#page=N)
}

export interface Citation {
  type: 'part';
  id: string;
  title: string;
  detail: string; // one-line key spec shown on the card
  source: string;
  url: string; // AB Carter source/category page (deep-linked to the page when known)
  locator?: string; // where to verify it in the source
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  citations?: Citation[];
}

export interface ChatResponse {
  reply: string;
  citations: Citation[];
}

export interface PageContext {
  label: string;
}
