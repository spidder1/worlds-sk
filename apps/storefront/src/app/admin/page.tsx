import { isAdminAuthenticated } from './auth';
import { loginAdmin } from './actions';
import { queryNeon } from '../../lib/neon-client';

export const dynamic = 'force-dynamic';

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (!(await isAdminAuthenticated())) {
    const params = await searchParams;
    return <div className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-sm"><h2 className="text-2xl font-bold">Prihlásenie administrátora</h2><p className="mt-2 text-sm text-slate-600">Interná správa katalógu Worlds.sk.</p>{params.error ? <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">Nesprávne heslo alebo nenastavené admin prostredie.</p> : null}<form action={loginAdmin} className="mt-6 space-y-4"><label className="block text-sm font-medium">Admin heslo<input name="password" type="password" required className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" /></label><button className="w-full rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white">Prihlásiť</button></form></div>;
  }
  const [products, priced, manufacturers, inStock, quality, reviewQueue, batches] = await Promise.all([
    queryNeon<{ count: string }>('SELECT COUNT(*)::text AS count FROM products'),
    queryNeon<{ count: string }>('SELECT COUNT(*)::text AS count FROM products WHERE final_price > 0'),
    queryNeon<{ count: string }>('SELECT COUNT(*)::text AS count FROM manufacturers'),
    queryNeon<{ count: string }>("SELECT COUNT(*)::text AS count FROM products WHERE status = 'ACTIVE' AND is_in_stock = true AND stock_count > 0"),
    queryNeon<{ average: string }>('SELECT COALESCE(ROUND(AVG(quality_score)), 0)::text AS average FROM products WHERE quality_score IS NOT NULL'),
    queryNeon<{ count: string }>('SELECT COUNT(*)::text AS count FROM products WHERE category_confidence IS NOT NULL AND category_confidence < 0.85'),
    queryNeon<{ status: string; started_at: string; mode: string }>('SELECT status, started_at, mode FROM sync_batches ORDER BY started_at DESC LIMIT 5'),
  ]);
  const cards = [['Produkty', products[0]?.count || '0'], ['S platnou cenou', priced[0]?.count || '0'], ['Skladom', inStock[0]?.count || '0'], ['Priemerná kvalita', `${quality[0]?.average || '0'}/100`], ['Kategorizácia <85%', reviewQueue[0]?.count || '0'], ['Výrobcovia', manufacturers[0]?.count || '0']];
  return <div><div className="flex items-end justify-between"><div><h2 className="text-2xl font-bold">Prehľad katalógu</h2><p className="mt-1 text-sm text-slate-600">Rýchla kontrola stavu importu, cien, dostupnosti a kvality verejného katalógu.</p></div></div><div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{cards.map(([label, value]) => <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-3xl font-bold">{value}</p></div>)}</div><section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5"><h3 className="font-semibold">Posledné importy</h3><div className="mt-3 divide-y divide-slate-100">{batches.map((batch, index) => <div key={`${batch.started_at}-${index}`} className="flex flex-wrap justify-between gap-2 py-3 text-sm"><span>{batch.mode}</span><span className="text-slate-500">{batch.status} · {new Date(batch.started_at).toLocaleString('sk-SK')}</span></div>)}</div></section></div>;
}
