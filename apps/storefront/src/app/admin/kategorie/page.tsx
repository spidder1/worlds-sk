import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '../auth';
import { queryNeon } from '../../../lib/neon-client';

export const dynamic = 'force-dynamic';

export default async function AdminCategories() {
  if (!(await isAdminAuthenticated())) redirect('/admin');
  const categories = await queryNeon<{ slug: string; name: string; parent_slug: string | null; level: number; active: boolean; count: string }>('SELECT c.slug, c.name, c.parent_slug, c.level, c.active, COUNT(p.id)::text AS count FROM categories c LEFT JOIN products p ON p.category_slug = c.slug GROUP BY c.slug, c.name, c.parent_slug, c.level, c.active ORDER BY c.level, c.display_order, c.name');
  return <div><h2 className="text-2xl font-bold">Kategórie</h2><p className="mt-1 text-sm text-slate-600">Vlastná taxonómia a aktuálne počty produktov.</p><div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white"><table className="min-w-full text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-4 py-3">Názov</th><th className="px-4 py-3">Slug</th><th className="px-4 py-3">Nadradená</th><th className="px-4 py-3">Produkty</th><th className="px-4 py-3">Stav</th></tr></thead><tbody className="divide-y divide-slate-100">{categories.map((category) => <tr key={category.slug}><td className="px-4 py-3" style={{ paddingLeft: `${16 + category.level * 18}px` }}>{category.name}</td><td className="px-4 py-3 font-mono text-xs text-slate-500">{category.slug}</td><td className="px-4 py-3 text-slate-500">{category.parent_slug || '—'}</td><td className="px-4 py-3 font-semibold">{category.count}</td><td className="px-4 py-3">{category.active ? 'Aktívna' : 'Skrytá'}</td></tr>)}</tbody></table></div></div>;
}
