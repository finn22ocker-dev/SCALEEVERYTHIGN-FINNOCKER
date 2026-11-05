/**
 * Einfaches In-Memory-Rate-Limit (Sliding Window) pro Schlüssel (z. B. IP).
 * Hinweis: Auf Serverless-Plattformen ist der Speicher pro Instanz – das ist
 * ein sinnvoller Basisschutz, aber kein verteiltes Limit. Für hohes Aufkommen
 * z. B. Upstash Redis o. Ä. ergänzen (siehe README).
 */
const buckets = new Map<string, number[]>();

export function rateLimit(key: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const hits = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  if (hits.length >= limit) {
    buckets.set(key, hits);
    return { allowed: false, retryAfter: Math.ceil((windowMs - (now - hits[0])) / 1000) };
  }
  hits.push(now);
  buckets.set(key, hits);
  if (buckets.size > 5000) {
    // Speicher begrenzen
    for (const [k, v] of buckets) {
      if (v.every((t) => now - t >= windowMs)) buckets.delete(k);
    }
  }
  return { allowed: true, retryAfter: 0 };
}
