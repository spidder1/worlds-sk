import Link from 'next/link';
import type { Metadata } from 'next';
import { ChevronRight, Home, Search, Building2, X } from 'lucide-react';
import { Pagination } from '../../components/Pagination';
import { ProductCard } from '../../components/ProductCard';
import { ProductFilterSidebar } from '../../components/ProductFilterSidebar';
import { getManufacturers, getProductsPage } from '../../lib/catalog';
import { searchMeilisearch } from '../../lib/meilisearch';

interface Props {
  searchParams: Promise<{ q?: string; vyrobca?: string; inStock?: string; page?: string; cpu?: string; ram?: string; ssd?: string; minPrice?: string; maxPrice?: string }>;
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
  const { q = '', vyrobca = '', inStock, page: rawPage, cpu = '', ram = '', ssd = '', minPrice: rawMinPrice, maxPrice: rawMaxPrice } = await searchParams;
  const parsedPage = Number.parseInt(rawPage ?? '1', 10);
  const page = Number.isSafeInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const query = q.trim();
  const inStockOnly = inStock === 'true';

  const brandFilters = vyrobca.split(',').map((s) => s.trim()).filter(Boolean);
  const cpuFilters = cpu.split(',').map((s) => s.trim()).filter(Boolean);
  const ramFilters = ram.split(',').map((s) => s.trim()).filter(Boolean);
  const ssdFilters = ssd.split(',').map((s) => s.trim()).filter(Boolean);
  const minPrice = Number.parseFloat(rawMinPrice ?? '');
  const maxPrice = Number.parseFloat(rawMaxPrice ?? '');
  const validMinPrice = Number.isFinite(minPrice) && minPrice >= 0 ? minPrice : undefined;
  const validMaxPrice = Number.isFinite(maxPrice) && maxPrice > 0 ? maxPrice : undefined;

  const indexed = page === 1 && query && !vyrobca && !cpu && !ram && !ssd && !inStockOnly && !rawMinPrice && !rawMaxPrice ? await searchMeilisearch(query, 1000) : null;
  const [results, manufacturers] = await Promise.all([
    getProductsPage({ query: indexed ? '' : query, searchIds: indexed?.ids, brand: vyrobca, inStockOnly, page, cpu, ram, ssd, minPrice: validMinPrice, maxPrice: validMaxPrice }),
    getManufacturers({ query, inStockOnly }),
  ]);

  const removeSearchParamValue = (key: string, valueToRemove: string) => {
    const currentMap: Record<string, string> = { q, vyrobca, cpu, ram, ssd };
    if (inStock) currentMap.inStock = inStock;

    const currentList = (currentMap[key] || '').split(',').map((s) => s.trim()).filter(Boolean);
    const updatedList = currentList.filter((v) => v.toLowerCase() !== valueToRemove.toLowerCase());

    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (inStock === 'true') params.set('inStock', 'true');
    if (key !== 'vyrobca' && vyrobca) params.set('vyrobca', vyrobca);
    if (key !== 'cpu' && cpu) params.set('cpu', cpu);
    if (key !== 'ram' && ram) params.set('ram', ram);
    if (key !== 'ssd' && ssd) params.set('ssd', ssd);

    if (updatedList.length > 0) {
      params.set(key, updatedList.join(','));
    }
    const qs = params.toString();
    return `/vyhladavanie${qs ? `?${qs}` : ''}`;
  };

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
              {brandFilters.length > 0 ? (
                <>Produkty značky: <span className="text-brand-600">{brandFilters.join(', ')}</span></>
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

          <div className="flex flex-wrap items-center gap-2">
            {brandFilters.map((b) => (
              <Link
                key={b}
                href={removeSearchParamValue('vyrobca', b)}
                className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 hover:bg-brand-100 transition-colors"
              >
                <Building2 className="w-3.5 h-3.5" />
                Výrobca: {b}
                <X className="w-3.5 h-3.5" />
              </Link>
            ))}
            {cpuFilters.map((c) => (
              <Link
                key={c}
                href={removeSearchParamValue('cpu', c)}
                className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 hover:bg-brand-100 transition-colors"
              >
                CPU: {c}
                <X className="w-3.5 h-3.5" />
              </Link>
            ))}
            {ramFilters.map((r) => (
              <Link
                key={r}
                href={removeSearchParamValue('ram', r)}
                className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 hover:bg-brand-100 transition-colors"
              >
                RAM: {r}
                <X className="w-3.5 h-3.5" />
              </Link>
            ))}
            {ssdFilters.map((s) => (
              <Link
                key={s}
                href={removeSearchParamValue('ssd', s)}
                className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 hover:bg-brand-100 transition-colors"
              >
                SSD: {s}
                <X className="w-3.5 h-3.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main 2-Column Layout with Left Filter Sidebar */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Sidebar Filter */}
        <ProductFilterSidebar
          facets={results.facets}
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
                searchParams={{ q: query, vyrobca, inStock, cpu, ram, ssd, minPrice: rawMinPrice, maxPrice: rawMaxPrice }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
