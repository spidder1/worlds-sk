import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '../auth';
import { queryNeon } from '../../../lib/neon-client';
import { updateCategoryPresentation } from '../actions';

export const dynamic = 'force-dynamic';

export default async function AdminCategories({ searchParams }: { searchParams: Promise<{ saved?: string; error?: string }> }) {
  if (!(await isAdminAuthenticated())) redirect('/admin');
  const params = await searchParams;
  const categories = await queryNeon<{ slug: string; name: string; parent_slug: string | null; level: number; active: boolean; display_order: number; count: string }>(`WITH RECURSIVE category_tree AS (
    SELECT c.id, c.slug, c.name, COALESCE(c.parent_slug, parent.slug) AS parent_slug, c.level, c.active, c.display_order,
           ARRAY[LPAD(c.display_order::text, 6, '0') || ':' || c.name]::text[] AS sort_path
      FROM categories c LEFT JOIN categories parent ON parent.id = c.parent_id
     WHERE c.parent_slug IS NULL AND c.parent_id IS NULL
    UNION ALL
    SELECT child.id, child.slug, child.name, COALESCE(child.parent_slug, parent.slug) AS parent_slug, child.level, child.active, child.display_order,
           tree.sort_path || (LPAD(child.display_order::text, 6, '0') || ':' || child.name)
      FROM categories child
      LEFT JOIN categories parent ON parent.id = child.parent_id
      JOIN category_tree tree ON child.parent_slug = tree.slug OR child.parent_id = tree.id
  )
  SELECT tree.slug, tree.name, tree.parent_slug, tree.level, tree.active, tree.display_order, COUNT(p.id)::text AS count
    FROM category_tree tree LEFT JOIN products p ON p.category_slug = tree.slug
   GROUP BY tree.slug, tree.name, tree.parent_slug, tree.level, tree.active, tree.display_order, tree.sort_path
   ORDER BY tree.sort_path`);
  return <div><h2 className="text-2xl font-bold">Kategórie</h2><p className="mt-1 text-sm text-slate-600">Vlastná taxonómia zoradená ako strom. Názov, poradie a viditeľnosť môžete upraviť bez zmeny nadradenosti.</p>{params.saved ? <p className="mt-4 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">Kategória bola uložená.</p> : null}{params.error ? <p className="mt-4 rounded-lg bg-rose-50 p-3 text-sm text-rose-700">Neplatné údaje kategórie.</p> : null}<div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white"><table className="min-w-full text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-4 py-3">Názov</th><th className="px-4 py-3">Slug</th><th className="px-4 py-3">Nadradená</th><th className="px-4 py-3">Produkty</th><th className="px-4 py-3">Úprava</th></tr></thead><tbody className="divide-y divide-slate-100">{categories.map((category) => <tr key={category.slug}><td className="px-4 py-3 align-top" style={{ paddingLeft: `${16 + category.level * 18}px` }}><span className="text-sm font-semibold">{category.name}</span></td><td className="px-4 py-3 align-top font-mono text-xs text-slate-500">{category.slug}</td><td className="px-4 py-3 align-top text-slate-500">{category.parent_slug || '—'}</td><td className="px-4 py-3 align-top font-semibold">{category.count}</td><td className="px-4 py-3 align-top"><form action={updateCategoryPresentation} className="flex flex-wrap items-center gap-2"><input type="hidden" name="slug" value={category.slug} /><label className="text-xs text-slate-500">Názov<input name="name" defaultValue={category.name} className="ml-1 w-48 rounded-md border border-slate-200 px-2 py-1.5" /></label><label className="text-xs text-slate-500">Poradie<input name="display_order" type="number" min="0" max="999999" defaultValue={category.display_order} className="ml-1 w-20 rounded-md border border-slate-200 px-2 py-1.5" /></label><label className="flex items-center gap-1 text-xs text-slate-600"><input type="checkbox" name="active" value="true" defaultChecked={category.active} /> aktívna</label><button className="rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white">Uložiť</button></form></td></tr>)}</tbody></table></div></div>;
}
