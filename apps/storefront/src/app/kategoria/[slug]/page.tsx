import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllProducts, findCategoryBySlug } from '../../../lib/catalog';
import { ProductCard } from '../../../components/ProductCard';
import { ChevronRight, Home, LayoutGrid } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ brand?: string; inStock?: string; sort?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = findCategoryBySlug(slug);

  if (!category) {
    return { title: 'Kategória nenájdená | Worlds.sk' };
  }

  return {
    title: `${category.name} | Výhodný nákup na Worlds.sk`,
    description: `Široká ponuka v kategórii ${category.name}. Skladová dostupnosť priamo z centrálneho skladu, rýchle doručenie a oficiálna záruka.`,
    alternates: {
      canonical: `https://worlds.sk/kategoria/${category.slug}`,
    },
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { brand: selectedBrand, inStock, sort } = await searchParams;

  const category = findCategoryBySlug(slug);
  if (!category) {
    notFound();
  }

  const allProducts = await getAllProducts();
  
  // Filter products by category or parent category slug
  let filtered = allProducts.filter(
    (p) =>
      p.categorySlug === slug ||
      p.categoryHierarchy.some((h) => h.toLowerCase().includes(category.name.toLowerCase()))
  );

  // Extract available brands for facets
  const availableBrands = Array.from(new Set(filtered.map((p) => p.brand))).sort();

  // Apply filters
  if (selectedBrand) {
    filtered = filtered.filter((p) => p.brand.toLowerCase() === selectedBrand.toLowerCase());
  }
  if (inStock === 'true') {
    filtered = filtered.filter((p) => p.isInStock && p.stockCount > 0);
  }

  // Sorting
  if (sort === 'price_asc') {
    filtered.sort((a, b) => a.pricing.finalPrice - b.pricing.finalPrice);
  } else if (sort === 'price_desc') {
    filtered.sort((a, b) => b.pricing.finalPrice - a.pricing.finalPrice);
  } else if (sort === 'name') {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    // Default quality sort
    filtered.sort((a, b) => b.qualityScore.total - a.qualityScore.total);
  }

  // Schema.org Breadcrumb JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Domov',
        item: 'https://worlds.sk',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: category.name,
        item: `https://worlds.sk/kategoria/${category.slug}`,
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Inject Breadcrumb JSON-LD for Google SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Breadcrumbs Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-slate-900 flex items-center gap-1">
          <Home className="w-3.5 h-3.5" />
          Domov
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-semibold">{category.name}</span>
      </nav>

      {/* Category Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">{category.name}</h1>
          <p className="text-xs text-slate-500 mt-1">
            Zobrazených <span className="font-bold text-slate-800">{filtered.length}</span> produktov s overenou dostupnosťou
          </p>
        </div>

        {/* Subcategory Pills if any */}
        {category.subcategories && category.subcategories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {category.subcategories.map((sub) => (
              <Link
                key={sub.id}
                href={`/kategoria/${sub.slug}`}
                className="text-xs bg-slate-100 hover:bg-brand-50 hover:text-brand-700 font-medium px-3 py-1.5 rounded-full border border-slate-200 transition-colors"
              >
                {sub.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Main Grid: Sidebar Filters + Products */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        {/* Sidebar Filters */}
        <aside className="md:col-span-1 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-3">
            Filtre produktov
          </div>

          {/* Brands Filter */}
          {availableBrands.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Výrobca</h4>
              <div className="space-y-1">
                <Link
                  href={`/kategoria/${slug}`}
                  className={`block text-xs px-2.5 py-1.5 rounded-md transition-colors ${
                    !selectedBrand ? 'bg-brand-50 text-brand-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Všetci výrobcovia
                </Link>
                {availableBrands.map((b) => (
                  <Link
                    key={b}
                    href={`/kategoria/${slug}?brand=${encodeURIComponent(b)}`}
                    className={`block text-xs px-2.5 py-1.5 rounded-md transition-colors ${
                      selectedBrand === b ? 'bg-brand-50 text-brand-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {b}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Skladom Filter */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Dostupnosť</h4>
            <Link
              href={inStock === 'true' ? `/kategoria/${slug}` : `/kategoria/${slug}?inStock=true`}
              className={`block text-xs px-2.5 py-1.5 rounded-md transition-colors ${
                inStock === 'true' ? 'bg-emerald-50 text-emerald-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {inStock === 'true' ? '✓ Iba skladom (aktívne)' : 'Zobraziť iba skladom'}
            </Link>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="md:col-span-3 space-y-4">
          {filtered.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
              <LayoutGrid className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">V tejto kategórii sa nenašli žiadne produkty</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Skúste zrušiť zvolené filtre alebo vybrať inú kategóriu z hlavného menu.
              </p>
              <Link
                href={`/kategoria/${slug}`}
                className="inline-block bg-brand-600 text-white text-xs font-semibold px-4 py-2 rounded-lg"
              >
                Zrušiť filtre
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
