import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CATALOG } from './catalog';

test('catalog has a usable number of entries', () => {
  assert.ok(CATALOG.length >= 40, `expected >= 40 entries, got ${CATALOG.length}`);
});

test('every entry is well-formed and ids are unique', () => {
  const ids = new Set<string>();
  for (const p of CATALOG) {
    assert.match(p.id, /^[a-z0-9-]+$/);
    assert.ok(!ids.has(p.id), `duplicate id: ${p.id}`);
    ids.add(p.id);
    assert.ok(['traveler', 'ring'].includes(p.category));
    assert.ok(p.name.length > 0);
    assert.ok(p.selectionLogic.length > 0);
    assert.match(p.source, /^https:\/\/(www\.)?abcarter\.com/);
  }
});
