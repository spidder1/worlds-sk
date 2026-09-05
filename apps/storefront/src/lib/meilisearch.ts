export type MeiliSearchHit = { id: string };

function foldQuery(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

export async function searchMeilisearch(query: string, limit = 1000): Promise<{ ids: string[]; estimatedTotalHits: number } | null> {
  const host = process.env.MEILISEARCH_HOST?.trim()?.replace(/\/$/, '');
  const apiKey = process.env.MEILISEARCH_API_KEY?.trim();
  if (!host || !apiKey || !query.trim()) return null;
  const index = process.env.MEILISEARCH_INDEX?.trim() || 'worlds_products';
  try {
    const response = await fetch(`${host}/indexes/${encodeURIComponent(index)}/search`, { method: 'POST', headers: { authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' }, body: JSON.stringify({ q: foldQuery(query), limit: Math.min(1000, Math.max(1, limit)), attributesToRetrieve: ['id'] }), signal: AbortSignal.timeout(2500), cache: 'no-store' });
    if (!response.ok) return null;
    const data = await response.json() as { hits?: MeiliSearchHit[]; estimatedTotalHits?: number };
    return { ids: (data.hits || []).map((hit) => hit.id).filter(Boolean), estimatedTotalHits: Number(data.estimatedTotalHits || 0) };
  } catch {
    return null;
  }
}
