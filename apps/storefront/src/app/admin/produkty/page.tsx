import Link from 'next/link';
import { queryNeon } from '../../../lib/neon-client';
import { isAdminAuthenticated } from '../auth';
import { updateProductCategory } from '../actions';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function AdminProducts({ searchParams }: { searchParams: Promise<{ q?: string; page?: string; saved?: string }> }) {
  if (!(await isAdminAuthenticated())) redirect('/admin');
  const params = await searchParams;
  const q = (params.q || '').trim();
  const foldedQuery = q.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
  const page = Math.max(1, Number.parseInt(params.page || '1', 10) || 1);
  const limit = 30;
  const offset = (page - 1) * limit;
  const where = q ? `WHERE translate(lower(title), 'áäčďéěíĺľňóôŕřšťúůýž', 'aacdeeillnoorrstuuyz') ILIKE $1
    OR translate(lower(sku), 'áäčďéěíĺľňóôŕřšťúůýž', 'aacdeeillnoorrstuuyz') ILIKE $1
    OR translate(lower(brand), 'áäčďéěíĺľňóôŕřšťúůýž', 'aacdeeillnoorrstuuyz') ILIKE $1` : '';
  const args = q ? [`%${foldedQuery}%`] : [];
  const [products, totals] = await Promise.all([
    queryNeon<{ id: string; title: string; sku: string; brand: string; category_slug: string; final_price: string }>(`SELECT id, title, sku, brand, category_slug, final_price::text FROM products ${where} ORDER BY updated_at DESC LIMIT $${args.length + 1} OFFSET $${args.length + 2}`, [...args, limit, offset]),
    queryNeon<{ count: string }>(`SELECT COUNT(*)::text AS count FROM products ${where}`, args),
  ]);
  const categories = await queryNeon<{ slug: string; name: string }>('SELECT slug, name FROM categories WHERE active = true ORDER BY level, display_order, name');
  const total = Number(totals[0]?.count || 0);
  const pageCount = Math.max(1, Math.ceil(total / limit));
  return <div><div className="flex flex-wrap items-end justify-between gap-4"><div><h2 className="text-2xl font-bold">Produkty</h2><p className="mt-1 text-sm text-slate-600">Vyhľadávanie a manuálna oprava kategórie. Strana {page} z {pageCount} ({total} produktov).</p></div><form className="flex gap-2"><input name="q" defaultValue={q} placeholder="SKU, značka alebo názov" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" /><button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Hľadať</button></form></div>{params.saved ? <p className="mt-4 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">Produkt bol uložený.</p> : null}<div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white"><table className="min-w-full text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-4 py-3">Produkt</th><th className="px-4 py-3">Značka / SKU</th><th className="px-4 py-3">Cena</th><th className="px-4 py-3">Kategória</th></tr></thead><tbody className="divide-y divide-slate-100">{products.map((product) => <tr key={product.id}><td className="max-w-md px-4 py-3 font-medium">{product.title}</td><td className="px-4 py-3 text-slate-500">{product.brand}<br />{product.sku}</td><td className="px-4 py-3">{product.final_price} €</td><td className="px-4 py-3"><form action={updateProductCategory} className="flex gap-2"><input type="hidden" name="id" value={product.id} /><select name="category" defaultValue={product.category_slug} className="max-w-xs rounded border border-slate-300 px-2 py-1 text-xs">{categories.map((category) => <option key={category.slug} value={category.slug}>{category.name}</option>)}</select><button className="rounded bg-slate-900 px-2 py-1 text-xs text-white">Uložiť</button></form></td></tr>)}</tbody></table>{products.length === 0 ? <p className="p-8 text-center text-slate-500">Žiadne produkty.</p> : null}</div><div className="mt-4 flex gap-2 text-sm">{page > 1 ? <Link className="rounded border px-3 py-2" href={`/admin/produkty?q=${encodeURIComponent(q)}&page=${page - 1}`}>Predchádzajúca</Link> : null}{page < pageCount ? <Link className="rounded border px-3 py-2" href={`/admin/produkty?q=${encodeURIComponent(q)}&page=${page + 1}`}>Ďalšia</Link> : null}</div></div>;
}
