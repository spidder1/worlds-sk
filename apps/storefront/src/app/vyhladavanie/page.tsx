import Link from 'next/link';
import type { Metadata } from 'next';
import { ChevronRight, Home, Search } from 'lucide-react';
import { Pagination } from '../../components/Pagination';
import { ProductCard } from '../../components/ProductCard';
import { getProductsPage } from '../../lib/catalog';

interface Props {
  searchParams: Promise<{ q?: string; page?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `Výsledky vyhľadávania pre "${q}" | Worlds.sk` : 'Vyhľadávanie produktov | Worlds.sk',
    robots: { index: false, follow: true },
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const { q = '', page: rawPage } = await searchParams;
  const parsedPage = Number.parseInt(rawPage ?? '1', 10);
  const page = Number.isSafeInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const query = q.trim();
  const results = query ? await getProductsPage({ query, page }) : { products: [], page, total: 0, pageCount: 0, pageSize: 24 };

  return (
    <div className="space-y-6">
      <nav className="flex items-center gap-2 text-xs text-slate-500" aria-label="Navigačná cesta">
        <Link href="/" className="flex items-center gap-1 hover:text-slate-900"><Home className="h-3.5 w-3.5" /> Domov</Link>
        <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
        <span className="font-semibold text-slate-900">Vyhľadávanie</span>
      </nav>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="flex items-center gap-2 text-xl font-black text-slate-900">
          <Search className="h-5 w-5 text-brand-600" />
          Výsledky pre: <span className="text-brand-600">&ldquo;{query}&rdquo;</span>
        </h1>
        <p className="mt-1 text-sm text-slate-500">Nájdených {results.total.toLocaleString('sk-SK')} produktov s platnou cenou</p>
      </section>

      {results.products.length === 0 ? (
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-12 text-center">
          <Search className="mx-auto h-12 w-12 text-slate-300" />
          <h2 className="font-bold text-slate-800">Pre zadaný výraz sme nenašli žiadne produkty</h2>
          <p className="mx-auto max-w-md text-sm text-slate-500">Skúste názov produktu, výrobcu, MPN alebo EAN.</p>
          <Link href="/produkty" className="inline-block rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">Zobraziť celý katalóg</Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {results.products.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
          <Pagination basePath="/vyhladavanie" currentPage={results.page} totalPages={results.pageCount} searchParams={{ q: query }} />
        </>
      )}
    </div>
  );
}
