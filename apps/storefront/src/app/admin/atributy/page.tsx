import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '../auth';
import { queryNeon } from '../../../lib/neon-client';

export const dynamic = 'force-dynamic';

type AttributeRow = { key: string; products: string; examples: string[] };

export default async function AdminAttributesPage() {
  if (!(await isAdminAuthenticated())) redirect('/admin');
  const stats = await queryNeon<{ products: string; with_attributes: string; average: string; maximum: string }>(`SELECT COUNT(*)::text AS products, COUNT(*) FILTER (WHERE attributes <> '{}'::jsonb)::text AS with_attributes, ROUND(AVG((SELECT COUNT(*) FROM jsonb_object_keys(attributes))), 2)::text AS average, MAX((SELECT COUNT(*) FROM jsonb_object_keys(attributes)))::text AS maximum FROM products`);
  const rows = await queryNeon<AttributeRow>(`SELECT a.key, COUNT(*)::text AS products, (ARRAY_AGG(DISTINCT COALESCE(a.value->>'value', a.value #>> '{}')) FILTER (WHERE COALESCE(a.value->>'value', a.value #>> '{}') <> ''))[1:3] AS examples FROM products p CROSS JOIN LATERAL jsonb_each(CASE WHEN jsonb_typeof(p.attributes) = 'object' THEN p.attributes ELSE '{}'::jsonb END) a GROUP BY a.key ORDER BY COUNT(*) DESC, a.key LIMIT 120`);
  const summary = stats[0];
  return <div className="mx-auto max-w-6xl space-y-6"><div><h2 className="text-2xl font-bold">Atribúty produktov</h2><p className="mt-1 text-sm text-slate-600">Prehľad atribútov importovaných z feedu a technických parametrov použitých vo filtroch.</p></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[['Produkty', summary?.products], ['S atribútmi', summary?.with_attributes], ['Priemer atribútov', summary?.average], ['Maximum', summary?.maximum]].map(([label, value]) => <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-2xl font-bold">{value || '0'}</p></div>)}</div><div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white"><table className="min-w-full text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-4 py-3">Kód atribútu</th><th className="px-4 py-3">Produktov</th><th className="px-4 py-3">Príklady hodnôt</th></tr></thead><tbody className="divide-y divide-slate-100">{rows.map((row) => <tr key={row.key}><td className="px-4 py-3 font-mono text-xs">{row.key}</td><td className="px-4 py-3 font-semibold">{row.products}</td><td className="max-w-xl px-4 py-3 text-slate-600">{(row.examples || []).filter(Boolean).join(' · ')}</td></tr>)}</tbody></table></div></div>;
}
