import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '../auth';
import { queryNeon } from '../../../lib/neon-client';

export const dynamic = 'force-dynamic';

export default async function AdminImports() {
  if (!(await isAdminAuthenticated())) redirect('/admin');
  const [batches, imageStats, quality] = await Promise.all([
    queryNeon<{ id: string; mode: string; status: string; total_read: number; imported_count: number; filtered_count: number; started_at: string; completed_at: string | null }>('SELECT id, mode, status, total_read, imported_count, filtered_count, started_at, completed_at FROM sync_batches ORDER BY started_at DESC LIMIT 30'),
    queryNeon<{ total: string; with_images: string; multi_images: string; missing_images: string }>("SELECT COUNT(*)::text AS total, COUNT(*) FILTER (WHERE COALESCE(jsonb_array_length(images),0)>0)::text AS with_images, COUNT(*) FILTER (WHERE COALESCE(jsonb_array_length(images),0)>1)::text AS multi_images, COUNT(*) FILTER (WHERE COALESCE(jsonb_array_length(images),0)=0)::text AS missing_images FROM products"),
    queryNeon<{ count: string }>('SELECT COUNT(*)::text AS count FROM products WHERE quality_score IS NOT NULL AND quality_score < 60'),
  ]);
  const stats = imageStats[0];
  return <div><h2 className="text-2xl font-bold">Importy a kvalita</h2><p className="mt-1 text-sm text-slate-600">Stav dávok, obrázkov a produktov vyžadujúcich kontrolu.</p><div className="mt-6 grid gap-4 md:grid-cols-4">{[['Produkty', stats?.total], ['S obrázkom', stats?.with_images], ['Viac obrázkov', stats?.multi_images], ['Bez obrázka', stats?.missing_images]].map(([label, value]) => <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4"><p className="text-xs uppercase text-slate-500">{label}</p><p className="mt-2 text-2xl font-bold">{value || '0'}</p></div>)}</div><p className="mt-4 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">Produkty s quality score pod 60: <strong>{quality[0]?.count || '0'}</strong></p><div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white"><table className="min-w-full text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-4 py-3">Dávka</th><th className="px-4 py-3">Režim</th><th className="px-4 py-3">Stav</th><th className="px-4 py-3">Načítané</th><th className="px-4 py-3">Filtrované</th><th className="px-4 py-3">Začiatok</th></tr></thead><tbody className="divide-y divide-slate-100">{batches.map((batch) => <tr key={String(batch.id)}><td className="px-4 py-3 font-mono text-xs">{String(batch.id).slice(0, 8)}</td><td className="px-4 py-3">{batch.mode}</td><td className="px-4 py-3">{batch.status}</td><td className="px-4 py-3">{batch.imported_count ?? batch.total_read ?? 0}</td><td className="px-4 py-3">{batch.filtered_count ?? 0}</td><td className="px-4 py-3 text-slate-500">{new Date(batch.started_at).toLocaleString('sk-SK')}</td></tr>)}</tbody></table></div></div>;
}
