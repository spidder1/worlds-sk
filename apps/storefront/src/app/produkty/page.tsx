import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, Grid3X3 } from 'lucide-react';
import { Pagination } from '../../components/Pagination';
import { ProductCard } from '../../components/ProductCard';
import { getCategories, getProductsPage, type ProductSort } from '../../lib/catalog';

export const metadata: Metadata = {
  title: 'Všetky IT produkty | Worlds.sk',
  description: 'Kompletný IT katalóg Worlds.sk s aktuálnymi cenami a dostupnosťou.',
  alternates: { canonical: 'https://worlds.sk/produkty' },
};

interface Props {
  searchParams: Promise<{ page?: string; inStock?: string; sort?: string }>;
}

export default async function ProductsPage({ searchParams }: Props) {
  const filters = await searchParams;
  const rawPage = Number.parseInt(filters.page ?? '1', 10);
  const page = Number.isSafeInteger(rawPage) && rawPage > 0 ? rawPage : 1;
  const sort: ProductSort = filters.sort === 'price_asc' || filters.sort === 'price_desc' || filters.sort === 'name' ? filters.sort : 'recommended';
  const inStockOnly = filters.inStock === 'true';
  const [result, categories] = await Promise.all([
    getProductsPage({ page, sort, inStockOnly }),
    getCategories(),
  ]);

  const hrefWith = (key: string, value?: string) => {
    const query = new URLSearchParams();
    if (filters.inStock === 'true' && key !== 'inStock') query.set('inStock', 'true');
    if (filters.sort && key !== 'sort') query.set('sort', filters.sort);
    if (value) query.set(key, value);
    const serialized = query.toString();
    return `/produkty${serialized ? `?${serialized}` : ''}`;
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-gradient-to-r from-slate-900 to-brand-900 p-7 text-white shadow-lg">
        <div className="flex items-start gap-4">
          <Grid3X3 className="mt-1 h-8 w-8 text-brand-300" />
          <div>
            <h1 className="text-3xl font-black tracking-tight">Všetky IT produkty</h1>
            <p className="mt-2 text-sm text-slate-300">{result.total.toLocaleString('sk-SK')} produktov s platnou cenou z aktuálneho eD katalógu.</p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="mb-3 text-sm font-black uppercase tracking-wide text-slate-700">Prejsť do kategórie</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link key={category.id} href={`/kategoria/${category.slug}`} className="rounded-xl border border-slate-200 bg-slate-50 p-4 hover:border-brand-400 hover:bg-brand-50">
              <span className="font-bold text-slate-900">{category.name}</span>
              <span className="mt-1 block text-xs text-slate-500">{category.subcategories?.length ?? 0} podkategórií</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
        <Link href={hrefWith('inStock', inStockOnly ? undefined : 'true')} className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold ${inStockOnly ? 'border-emerald-300 bg-emerald-50 text-emerald-800' : 'border-slate-200 text-slate-700 hover:bg-slate-50'}`}>
          {inStockOnly ? <Check className="h-4 w-4" /> : null} Iba produkty skladom
        </Link>
        <div className="flex flex-wrap gap-2 text-sm">
          {([
            ['recommended', 'Odporúčané'],
            ['price_asc', 'Najlacnejšie'],
            ['price_desc', 'Najdrahšie'],
            ['name', 'Názov A–Z'],
          ] as const).map(([value, label]) => (
            <Link key={value} href={hrefWith('sort', value === 'recommended' ? undefined : value)} className={`rounded-lg px-3 py-2 font-semibold ${sort === value ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>{label}</Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {result.products.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
      <Pagination basePath="/produkty" currentPage={result.page} totalPages={result.pageCount} searchParams={{ inStock: filters.inStock, sort: filters.sort }} />
    </div>
  );
}
