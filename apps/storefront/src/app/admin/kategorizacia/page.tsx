import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '../auth';
import { approveCategoryReview } from '../actions';
import { queryNeon } from '../../../lib/neon-client';

export const dynamic = 'force-dynamic';

type ProductRow = { id: string; title: string; brand: string; sku: string; category_slug: string; category_confidence: string | null; category_reasoning: string | null };
type CategoryRow = { slug: string; name: string };

export default async function AdminCategorizationPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  if (!(await isAdminAuthenticated())) redirect('/admin');
  const params = await searchParams;
  const [products, categories] = await Promise.all([
    queryNeon<ProductRow>(`SELECT id, title, brand, sku, category_slug, category_confidence::text, category_reasoning
      FROM products WHERE category_confidence IS NOT NULL AND category_confidence < 0.85
      ORDER BY category_confidence ASC, updated_at DESC LIMIT 200`),
    queryNeon<CategoryRow>('SELECT slug, name FROM categories WHERE active = true ORDER BY level, display_order, name'),
  ]);
  return <div className="mx-auto max-w-7xl space-y-6"><div><h2 className="text-2xl font-bold">Kontrola kategorizácie</h2><p className="mt-1 text-sm text-slate-600">Produkty s istotou kategorizácie pod 85 %. Po schválení sa záznam označí ako manuálne potvrdený.</p></div>{params.saved ? <p className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">Kategorizácia bola schválená.</p> : null}<div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white"><table className="min-w-full text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-4 py-3">Produkt</th><th className="px-4 py-3">Istota</th><th className="px-4 py-3">Dôvod</th><th className="px-4 py-3">Nová kategória</th></tr></thead><tbody className="divide-y divide-slate-100">{products.map((product) => <tr key={product.id}><td className="max-w-md px-4 py-3"><p className="font-semibold">{product.title}</p><p className="text-xs text-slate-500">{product.brand} · {product.sku}</p></td><td className="px-4 py-3 font-mono text-xs">{Math.round(Number(product.category_confidence || 0) * 100)} %<br /><span className="text-slate-500">{product.category_slug}</span></td><td className="max-w-sm px-4 py-3 text-xs text-slate-600">{product.category_reasoning || 'Bez vysvetlenia'}</td><td className="px-4 py-3"><form action={approveCategoryReview} className="flex gap-2"><input type="hidden" name="id" value={product.id} /><select name="category" defaultValue={product.category_slug} className="max-w-xs rounded border border-slate-300 px-2 py-1 text-xs">{categories.map((category) => <option key={category.slug} value={category.slug}>{category.name}</option>)}</select><button className="rounded bg-slate-900 px-2 py-1 text-xs font-semibold text-white">Schváliť</button></form></td></tr>)}</tbody></table>{products.length === 0 ? <p className="p-8 text-center text-slate-500">Fronta je prázdna.</p> : null}</div></div>;
}
