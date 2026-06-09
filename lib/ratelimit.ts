// In-memory fixed-window limiter (single-instance POC). Fails open by design:
// the assistant's availability for a live demo beats strict throttling.
const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, max: number, windowSeconds: number): boolean {
  const now = Date.now();
  const rec = hits.get(key);
  if (!rec || now > rec.resetAt) {
    hits.set(key, { count: 1, resetAt: now + windowSeconds * 1000 });
    return true;
  }
  if (rec.count >= max) return false;
  rec.count += 1;
  return true;
}
