import Link from 'next/link';
import type { Metadata } from 'next';
import { ChevronRight, Home, Search, Building2, X } from 'lucide-react';
import { Pagination } from '../../components/Pagination';
import { ProductCard } from '../../components/ProductCard';
import { ProductFilterSidebar } from '../../components/ProductFilterSidebar';
import { getManufacturers, getProductsPage } from '../../lib/catalog';

interface Props {
  searchParams: Promise<{ q?: string; vyrobca?: string; inStock?: string; page?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q, vyrobca } = await searchParams;
  const title = vyrobca
    ? `Produkty od výrobcu ${vyrobca} | Worlds.sk`
    : q
    ? `Výsledky vyhľadávania pre "${q}" | Worlds.sk`
    : 'Katalóg produktov a vyhľadávanie | Worlds.sk';
  return {
    title,
    robots: { index: false, follow: true },
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const { q = '', vyrobca = '', inStock, page: rawPage } = await searchParams;
  const parsedPage = Number.parseInt(rawPage ?? '1', 10);
  const page = Number.isSafeInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const query = q.trim();
  const brandFilter = vyrobca.trim();
  const inStockOnly = inStock === 'true';

  const [results, manufacturers] = await Promise.all([
    getProductsPage({ query, brand: brandFilter, inStockOnly, page }),
    getManufacturers(),
  ]);

  return (
    <div className="space-y-6">
      <nav className="flex items-center gap-2 text-xs text-slate-500" aria-label="Navigačná cesta">
        <Link href="/" className="flex items-center gap-1 hover:text-slate-900"><Home className="h-3.5 w-3.5" /> Domov</Link>
        <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
        <span className="font-semibold text-slate-900">Katalóg & Vyhľadávanie</span>
      </nav>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="flex items-center gap-2 text-xl font-black text-slate-900">
              <Search className="h-5 w-5 text-brand-600" />
              {brandFilter ? (
                <>Produkty značky: <span className="text-brand-600">{brandFilter}</span></>
              ) : query ? (
                <>Výsledky pre: <span className="text-brand-600">&ldquo;{query}&rdquo;</span></>
              ) : (
                <>Kompletný IT Katalóg</>
              )}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Nájdených {results.total.toLocaleString('sk-SK')} produktov s dostupnosťou z eD distribučného skladu
            </p>
          </div>

          {brandFilter ? (
            <Link
              href={`/vyhladavanie${query ? `?q=${encodeURIComponent(query)}` : ''}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 hover:bg-brand-100 transition-colors"
            >
              <Building2 className="w-3.5 h-3.5" />
              Výrobca: {brandFilter}
              <X className="w-3.5 h-3.5" />
            </Link>
          ) : null}
        </div>
      </section>

      {/* Main 2-Column Layout with Left Filter Sidebar */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Sidebar Filter */}
        <ProductFilterSidebar
          products={results.products}
          totalCount={results.total}
          allManufacturers={manufacturers}
        />

        {/* Right Product Grid Column */}
        <div className="flex-1 w-full space-y-6">
          {results.products.length === 0 ? (
            <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-12 text-center">
              <Search className="mx-auto h-12 w-12 text-slate-300" />
              <h2 className="font-bold text-slate-800">Pre zadané kritériá sme nenašli žiadne produkty</h2>
              <p className="mx-auto max-w-md text-sm text-slate-500">Skúste zmeniť názov produktu, vybrať iného výrobcu alebo zrušiť filtre.</p>
              <Link href="/vyhladavanie" className="inline-block rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">Zobraziť celý katalóg</Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {results.products.map((product) => <ProductCard key={product.id} product={product} />)}
              </div>
              <Pagination
                basePath="/vyhladavanie"
                currentPage={results.page}
                totalPages={results.pageCount}
                searchParams={{ q: query, vyrobca: brandFilter, inStock }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
