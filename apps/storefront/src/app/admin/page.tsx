import { isAdminAuthenticated } from './auth';
import { loginAdmin } from './actions';
import { queryNeon } from '../../lib/neon-client';

export const dynamic = 'force-dynamic';

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (!(await isAdminAuthenticated())) {
    const params = await searchParams;
    return <div className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-sm"><h2 className="text-2xl font-bold">Prihlásenie administrátora</h2><p className="mt-2 text-sm text-slate-600">Interná správa katalógu Worlds.sk.</p>{params.error ? <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">Nesprávne heslo alebo nenastavené admin prostredie.</p> : null}<form action={loginAdmin} className="mt-6 space-y-4"><label className="block text-sm font-medium">Admin heslo<input name="password" type="password" required className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" /></label><button className="w-full rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white">Prihlásiť</button></form></div>;
  }
  const [products, priced, manufacturers, inStock, quality, reviewQueue, batches, transportMethods] = await Promise.all([
    queryNeon<{ count: string }>('SELECT COUNT(*)::text AS count FROM products'),
    queryNeon<{ count: string }>('SELECT COUNT(*)::text AS count FROM products WHERE final_price > 0'),
    queryNeon<{ count: string }>('SELECT COUNT(*)::text AS count FROM manufacturers'),
    queryNeon<{ count: string }>("SELECT COUNT(*)::text AS count FROM products WHERE status = 'ACTIVE' AND is_in_stock = true AND stock_count > 0"),
    queryNeon<{ average: string }>('SELECT COALESCE(ROUND(AVG(quality_score)), 0)::text AS average FROM products WHERE quality_score IS NOT NULL'),
    queryNeon<{ count: string }>('SELECT COUNT(*)::text AS count FROM products WHERE category_confidence IS NOT NULL AND category_confidence < 0.85'),
    queryNeon<{ status: string; started_at: string; mode: string }>('SELECT status, started_at, mode FROM sync_batches ORDER BY started_at DESC LIMIT 5'),
    queryNeon<{ count: string }>('SELECT COUNT(*)::text AS count FROM supplier_transport_methods WHERE active = true'),
  ]);
  const cards = [['Produkty', products[0]?.count || '0'], ['S platnou cenou', priced[0]?.count || '0'], ['Skladom', inStock[0]?.count || '0'], ['Priemerná kvalita', `${quality[0]?.average || '0'}/100`], ['Kategorizácia <85%', reviewQueue[0]?.count || '0'], ['Výrobcovia', manufacturers[0]?.count || '0']];
  const readiness = [
    ['eD systém', Boolean(process.env.ED_ENDPOINT_URL?.trim() && process.env.ED_LOGIN?.trim() && process.env.ED_PASSWORD?.trim())],
    ['Meilisearch', Boolean(process.env.MEILISEARCH_HOST?.trim() && process.env.MEILISEARCH_API_KEY?.trim())],
    ['Redis worker', Boolean(process.env.REDIS_URL?.trim())],
    ['Gemini asistent', Boolean(process.env.GEMINI_API_KEY?.trim())],
    ['Stripe', Boolean(process.env.STRIPE_SECRET_KEY?.trim() && process.env.STRIPE_WEBHOOK_SECRET?.trim())],
    ['Comgate', Boolean(process.env.COMGATE_MERCHANT?.trim() && process.env.COMGATE_SECRET?.trim())],
    ['GoPay', Boolean(process.env.GOPAY_GO_ID?.trim() && process.env.GOPAY_CLIENT_ID?.trim() && process.env.GOPAY_CLIENT_SECRET?.trim())],
  ];
  return <div><div className="flex items-end justify-between"><div><h2 className="text-2xl font-bold">Prehľad katalógu</h2><p className="mt-1 text-sm text-slate-600">Rýchla kontrola stavu importu, cien, dostupnosti a kvality verejného katalógu.</p></div></div><div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{cards.map(([label, value]) => <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-3xl font-bold">{value}</p></div>)}</div><section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5"><div className="flex flex-wrap items-baseline justify-between gap-2"><h3 className="font-semibold">Pripravenosť integrácií</h3><span className="text-xs text-slate-500">Aktívni dopravcovia eD: {transportMethods[0]?.count || '0'}</span></div><div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">{readiness.map(([label, configured]) => <div key={String(label)} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm"><span>{String(label)}</span><span className={configured ? 'font-semibold text-emerald-700' : 'font-semibold text-amber-700'}>{configured ? 'Nastavené' : 'Nenastavené'}</span></div>)}</div></section><section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5"><h3 className="font-semibold">Posledné importy</h3><div className="mt-3 divide-y divide-slate-100">{batches.map((batch, index) => <div key={`${batch.started_at}-${index}`} className="flex flex-wrap justify-between gap-2 py-3 text-sm"><span>{batch.mode}</span><span className="text-slate-500">{batch.status} · {new Date(batch.started_at).toLocaleString('sk-SK')}</span></div>)}</div></section></div>;
}
