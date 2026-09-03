import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Check, ChevronRight, Home, LayoutGrid, Building2, X } from 'lucide-react';
import { Pagination } from '../../../components/Pagination';
import { ProductCard } from '../../../components/ProductCard';
import { ProductFilterSidebar } from '../../../components/ProductFilterSidebar';
import { findCategoryBySlug, getManufacturers, getProductsPage, type ProductSort } from '../../../lib/catalog';

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string; inStock?: string; sort?: string; vyrobca?: string }>;
}

function parsePage(value?: string): number {
  const page = Number.parseInt(value ?? '1', 10);
  return Number.isSafeInteger(page) && page > 0 ? page : 1;
}

function parseSort(value?: string): ProductSort {
  return value === 'price_asc' || value === 'price_desc' || value === 'name' ? value : 'recommended';
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await findCategoryBySlug(slug);
  if (!category) return { title: 'Kategória nenájdená | Worlds.sk' };
  return {
    title: `${category.name} | Worlds.sk`,
    description: `Produkty v kategórii ${category.name} s aktuálnou cenou a dostupnosťou.`,
    alternates: { canonical: `https://worlds.sk/kategoria/${category.slug}` },
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const [{ slug }, filters] = await Promise.all([params, searchParams]);
  const category = await findCategoryBySlug(slug);
  if (!category) notFound();

  const page = parsePage(filters.page);
  const sort = parseSort(filters.sort);
  const inStockOnly = filters.inStock === 'true';
  const brandFilter = filters.vyrobca?.trim() ?? '';

  const [result, manufacturers] = await Promise.all([
    getProductsPage({ categorySlug: slug, page, sort, inStockOnly, brand: brandFilter }),
    getManufacturers(),
  ]);

  const hrefWith = (key: string, value?: string) => {
    const query = new URLSearchParams();
    if (filters.inStock === 'true' && key !== 'inStock') query.set('inStock', 'true');
    if (filters.sort && key !== 'sort') query.set('sort', filters.sort);
    if (filters.vyrobca && key !== 'vyrobca') query.set('vyrobca', filters.vyrobca);
    if (value) query.set(key, value);
    const serialized = query.toString();
    return `/kategoria/${slug}${serialized ? `?${serialized}` : ''}`;
  };

  return (
    <div className="space-y-6">
      <nav className="flex items-center gap-2 overflow-x-auto text-xs text-slate-500" aria-label="Navigačná cesta">
        <Link href="/" className="flex items-center gap-1 hover:text-slate-900"><Home className="h-3.5 w-3.5" /> Domov</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/vyhladavanie" className="hover:text-slate-900">Produkty</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="font-semibold text-slate-900">{category.name}</span>
      </nav>

      <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 md:text-3xl">
              {category.name} {brandFilter ? <span className="text-brand-600">({brandFilter})</span> : null}
            </h1>
            <p className="mt-1 text-sm text-slate-500">{result.total.toLocaleString('sk-SK')} produktov s platnou cenou</p>
          </div>

          {brandFilter ? (
            <Link
              href={hrefWith('vyrobca', undefined)}
              className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 hover:bg-brand-100 transition-colors"
            >
              <Building2 className="w-3.5 h-3.5" />
              Výrobca: {brandFilter}
              <X className="w-3.5 h-3.5" />
            </Link>
          ) : null}
        </div>

        {/* Subcategories */}
        {category.subcategories?.length ? (
          <div className="grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-2 lg:grid-cols-3">
            {category.subcategories.map((subcategory) => (
              <Link key={subcategory.id} href={`/kategoria/${subcategory.slug}`} className="group rounded-xl border border-slate-200 bg-slate-50 p-4 hover:border-brand-400 hover:bg-brand-50">
                <span className="font-bold text-slate-800 group-hover:text-brand-700">{subcategory.name}</span>
                {subcategory.subcategories?.length ? <span className="mt-1 block text-xs text-slate-500">{subcategory.subcategories.length} ďalších sekcií</span> : null}
              </Link>
            ))}
          </div>
        ) : null}
      </section>

      {/* Sorting bar */}
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

      {/* Main 2-Column Layout with Left Filter Sidebar */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Sidebar Filter */}
        <ProductFilterSidebar
          products={result.products}
          totalCount={result.total}
          allManufacturers={manufacturers}
        />

        {/* Right Product Grid Column */}
        <div className="flex-1 w-full space-y-6">
          {result.products.length ? (
            <>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {result.products.map((product) => <ProductCard key={product.id} product={product} />)}
              </div>
              <Pagination
                basePath={`/kategoria/${slug}`}
                currentPage={result.page}
                totalPages={result.pageCount}
                searchParams={{ inStock: filters.inStock, sort: filters.sort, vyrobca: filters.vyrobca }}
              />
            </>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
              <LayoutGrid className="mx-auto h-12 w-12 text-slate-300" />
              <h2 className="mt-4 font-bold text-slate-800">V tejto kategórii momentálne nie sú produkty zodpovedajúce vybraným filtrom.</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
