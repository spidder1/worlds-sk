import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '../auth';
import { queryNeon } from '../../../lib/neon-client';
import { updateCategoryPresentation } from '../actions';

export const dynamic = 'force-dynamic';

export default async function AdminCategories({ searchParams }: { searchParams: Promise<{ saved?: string; error?: string }> }) {
  if (!(await isAdminAuthenticated())) redirect('/admin');
  const params = await searchParams;
  const categories = await queryNeon<{ slug: string; name: string; parent_slug: string | null; level: number; active: boolean; display_order: number; count: string }>(`WITH RECURSIVE category_source AS (
    SELECT c.id, c.slug, c.name,
           COALESCE(NULLIF(c.parent_slug, ''), parent.slug) AS resolved_parent_slug,
           c.level, c.active, c.display_order
      FROM categories c
      LEFT JOIN categories parent ON parent.id = c.parent_id
  ), category_tree AS (
    SELECT source.id, source.slug, source.name, source.resolved_parent_slug AS parent_slug,
           source.level, source.active, source.display_order,
           ARRAY[LPAD(COALESCE(source.display_order, 0)::text, 6, '0') || ':' || LOWER(source.name) || ':' || source.slug]::text[] AS sort_path,
           ARRAY[source.slug]::text[] AS visited
      FROM category_source source
     WHERE source.resolved_parent_slug IS NULL
        OR NOT EXISTS (SELECT 1 FROM category_source parent WHERE parent.slug = source.resolved_parent_slug)
    UNION ALL
    SELECT child.id, child.slug, child.name, child.resolved_parent_slug AS parent_slug,
           child.level, child.active, child.display_order,
           tree.sort_path || (LPAD(COALESCE(child.display_order, 0)::text, 6, '0') || ':' || LOWER(child.name) || ':' || child.slug),
           tree.visited || child.slug
      FROM category_source child
      JOIN category_tree tree ON child.resolved_parent_slug = tree.slug
     WHERE NOT child.slug = ANY(tree.visited)
  )
  SELECT tree.slug, tree.name, tree.parent_slug, tree.level, tree.active, tree.display_order, COUNT(p.id)::text AS count
    FROM category_tree tree LEFT JOIN products p ON p.category_slug = tree.slug
   GROUP BY tree.slug, tree.name, tree.parent_slug, tree.level, tree.active, tree.display_order, tree.sort_path
   ORDER BY tree.sort_path`);
  return <div><h2 className="text-2xl font-bold">Kategórie</h2><p className="mt-1 text-sm text-slate-600">Vlastná taxonómia zoradená ako strom. Názov, poradie a viditeľnosť môžete upraviť bez zmeny nadradenosti.</p>{params.saved ? <p className="mt-4 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">Kategória bola uložená.</p> : null}{params.error ? <p className="mt-4 rounded-lg bg-rose-50 p-3 text-sm text-rose-700">Neplatné údaje kategórie.</p> : null}<div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white"><table className="min-w-full text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-4 py-3">Názov</th><th className="px-4 py-3">Slug</th><th className="px-4 py-3">Nadradená</th><th className="px-4 py-3">Produkty</th><th className="px-4 py-3">Úprava</th></tr></thead><tbody className="divide-y divide-slate-100">{categories.map((category) => <tr key={category.slug}><td className="px-4 py-3 align-top" style={{ paddingLeft: `${16 + category.level * 18}px` }}><span className="text-sm font-semibold">{category.name}</span></td><td className="px-4 py-3 align-top font-mono text-xs text-slate-500">{category.slug}</td><td className="px-4 py-3 align-top text-slate-500">{category.parent_slug || '—'}</td><td className="px-4 py-3 align-top font-semibold">{category.count}</td><td className="px-4 py-3 align-top"><form action={updateCategoryPresentation} className="flex flex-wrap items-center gap-2"><input type="hidden" name="slug" value={category.slug} /><label className="text-xs text-slate-500">Názov<input name="name" defaultValue={category.name} className="ml-1 w-48 rounded-md border border-slate-200 px-2 py-1.5" /></label><label className="text-xs text-slate-500">Poradie<input name="display_order" type="number" min="0" max="999999" defaultValue={category.display_order} className="ml-1 w-20 rounded-md border border-slate-200 px-2 py-1.5" /></label><label className="flex items-center gap-1 text-xs text-slate-600"><input type="checkbox" name="active" value="true" defaultChecked={category.active} /> aktívna</label><button className="rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white">Uložiť</button></form></td></tr>)}</tbody></table></div></div>;
}
