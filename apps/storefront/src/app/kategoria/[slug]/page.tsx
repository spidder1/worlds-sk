import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getProductsByCategory, findCategoryBySlug } from '../../../lib/catalog';
import { ProductCard } from '../../../components/ProductCard';
import { ChevronRight, Home, LayoutGrid, SlidersHorizontal, Check, X, Filter } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    brand?: string;
    inStock?: string;
    sort?: string;
    ram?: string;
    cpu?: string;
    ssd?: string;
    screen?: string;
    gpu?: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await findCategoryBySlug(slug);

  if (!category) {
    return { title: 'Kategória nenájdená | Worlds.sk' };
  }

  return {
    title: `${category.name} | Worlds.sk`,
    description: `Produkty v kategórii ${category.name} s cenou a dostupnosťou z poslednej synchronizácie distribučného katalógu.`,
    alternates: {
      canonical: `https://worlds.sk/kategoria/${category.slug}`,
    },
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const currentParams = await searchParams;
  const {
    brand: selectedBrand,
    inStock,
    sort,
    ram: selectedRam,
    cpu: selectedCpu,
    ssd: selectedSsd,
    screen: selectedScreen,
    gpu: selectedGpu
  } = currentParams;

  const category = await findCategoryBySlug(slug);
  if (!category) {
    notFound();
  }

  const categoryProducts = await getProductsByCategory(slug);

  // Extract available facet attributes across products in this category
  const availableBrands = Array.from(new Set(categoryProducts.map((p) => p.brand).filter(Boolean))).sort();
  
  const extractAttributeValues = (keys: string[]) => {
    const vals = new Set<string>();
    for (const p of categoryProducts) {
      for (const k of keys) {
        const val = p.attributes?.[k]?.value;
        if (val) vals.add(String(val));
      }
    }
    return Array.from(vals).sort();
  };

  const availableRam = extractAttributeValues(['ram_gb', 'ram_size_gb', 'ram_capacity']);
  const availableCpu = extractAttributeValues(['cpu_family', 'cpu_model', 'processor_model']);
  const availableSsd = extractAttributeValues(['ssd_gb', 'storage_capacity_gb', 'hdd_capacity_gb']);
  const availableScreens = extractAttributeValues(['screen_size_inch', 'display_diagonal_inch']);

  // Apply filters to product listing
  let filtered = [...categoryProducts];

  if (selectedBrand) {
    filtered = filtered.filter((p) => p.brand.toLowerCase() === selectedBrand.toLowerCase());
  }
  if (inStock === 'true') {
    filtered = filtered.filter((p) => p.isInStock && p.stockCount > 0);
  }
  if (selectedRam) {
    filtered = filtered.filter((p) => {
      const v = p.attributes?.['ram_gb']?.value || p.attributes?.['ram_size_gb']?.value;
      return String(v).toLowerCase() === selectedRam.toLowerCase();
    });
  }
  if (selectedCpu) {
    filtered = filtered.filter((p) => {
      const v = p.attributes?.['cpu_family']?.value || p.attributes?.['cpu_model']?.value;
      return String(v).toLowerCase() === selectedCpu.toLowerCase();
    });
  }
  if (selectedSsd) {
    filtered = filtered.filter((p) => {
      const v = p.attributes?.['ssd_gb']?.value || p.attributes?.['storage_capacity_gb']?.value;
      return String(v).toLowerCase() === selectedSsd.toLowerCase();
    });
  }
  if (selectedScreen) {
    filtered = filtered.filter((p) => {
      const v = p.attributes?.['screen_size_inch']?.value || p.attributes?.['display_diagonal_inch']?.value;
      return String(v).toLowerCase() === selectedScreen.toLowerCase();
    });
  }
  if (selectedGpu) {
    filtered = filtered.filter((p) => {
      const v = p.attributes?.['gpu_model']?.value || p.attributes?.['graphics_card']?.value;
      return String(v).toLowerCase() === selectedGpu.toLowerCase();
    });
  }

  // Sorting
  if (sort === 'price_asc') {
    filtered.sort((a, b) => a.pricing.finalPrice - b.pricing.finalPrice);
  } else if (sort === 'price_desc') {
    filtered.sort((a, b) => b.pricing.finalPrice - a.pricing.finalPrice);
  } else if (sort === 'name') {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    // Default quality score / stock sort
    filtered.sort((a, b) => (b.isInStock ? 1 : 0) - (a.isInStock ? 1 : 0) || b.qualityScore.total - a.qualityScore.total);
  }

  // Helper to build URL params
  const buildFilterUrl = (key: string, value: string | null) => {
    const p = new URLSearchParams();
    for (const [k, v] of Object.entries(currentParams)) {
      if (v && k !== key) p.set(k, v);
    }
    if (value !== null) {
      p.set(key, value);
    }
    const query = p.toString();
    return `/kategoria/${slug}${query ? `?${query}` : ''}`;
  };

  const hasActiveFilters = Boolean(
    selectedBrand || inStock || selectedRam || selectedCpu || selectedSsd || selectedScreen || selectedGpu
  );

  return (
    <div className="space-y-6">
      {/* Breadcrumbs Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto pb-1">
        <Link href="/" className="hover:text-slate-900 flex items-center gap-1 font-medium">
          <Home className="w-3.5 h-3.5 text-slate-400" />
          Domov
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
        <span className="text-slate-900 font-bold">{category.name}</span>
      </nav>

      {/* Category Header with Subcategories */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">{category.name}</h1>
            <p className="text-xs text-slate-500 mt-1">
              Zobrazených <span className="font-bold text-slate-900">{filtered.length}</span> produktov z poslednej synchronizácie katalógu
            </p>
          </div>

          {/* Sorting */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Zoradiť:</span>
            <div className="flex gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <Link
                href={buildFilterUrl('sort', null)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  !sort ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Odporúčané
              </Link>
              <Link
                href={buildFilterUrl('sort', 'price_asc')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  sort === 'price_asc' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Najlacnejšie
              </Link>
              <Link
                href={buildFilterUrl('sort', 'price_desc')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  sort === 'price_desc' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Najdrahšie
              </Link>
            </div>
          </div>
        </div>

        {/* Subcategory Pills / Navigation */}
        {category.subcategories && category.subcategories.length > 0 && (
          <div className="pt-3 border-t border-slate-100">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Podkategórie</div>
            <div className="flex flex-wrap gap-2">
              {category.subcategories.map((sub) => (
                <Link
                  key={sub.id}
                  href={`/kategoria/${sub.slug}`}
                  className="text-xs bg-slate-50 hover:bg-brand-50 hover:text-brand-700 hover:border-brand-300 font-semibold px-3.5 py-1.5 rounded-full border border-slate-200 transition-all shadow-sm"
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
          <span className="font-bold text-slate-700 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-brand-600" /> Aktívne filtre:
          </span>
          {selectedBrand && (
            <span className="inline-flex items-center gap-1 bg-white border border-slate-300 px-2.5 py-1 rounded-lg font-medium text-slate-800 shadow-sm">
              Výrobca: {selectedBrand}
              <Link href={buildFilterUrl('brand', null)} className="hover:text-red-500 ml-1">
                <X className="w-3 h-3" />
              </Link>
            </span>
          )}
          {inStock && (
            <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-300 px-2.5 py-1 rounded-lg font-bold text-emerald-800 shadow-sm">
              Iba skladom
              <Link href={buildFilterUrl('inStock', null)} className="hover:text-red-500 ml-1">
                <X className="w-3 h-3" />
              </Link>
            </span>
          )}
          {selectedRam && (
            <span className="inline-flex items-center gap-1 bg-white border border-slate-300 px-2.5 py-1 rounded-lg font-medium text-slate-800 shadow-sm">
              RAM: {selectedRam} GB
              <Link href={buildFilterUrl('ram', null)} className="hover:text-red-500 ml-1">
                <X className="w-3 h-3" />
              </Link>
            </span>
          )}
          {selectedCpu && (
            <span className="inline-flex items-center gap-1 bg-white border border-slate-300 px-2.5 py-1 rounded-lg font-medium text-slate-800 shadow-sm">
              CPU: {selectedCpu}
              <Link href={buildFilterUrl('cpu', null)} className="hover:text-red-500 ml-1">
                <X className="w-3 h-3" />
              </Link>
            </span>
          )}
          {selectedSsd && (
            <span className="inline-flex items-center gap-1 bg-white border border-slate-300 px-2.5 py-1 rounded-lg font-medium text-slate-800 shadow-sm">
              SSD: {selectedSsd} GB
              <Link href={buildFilterUrl('ssd', null)} className="hover:text-red-500 ml-1">
                <X className="w-3 h-3" />
              </Link>
            </span>
          )}
          {selectedScreen && (
            <span className="inline-flex items-center gap-1 bg-white border border-slate-300 px-2.5 py-1 rounded-lg font-medium text-slate-800 shadow-sm">
              Displej: {selectedScreen}&quot;
              <Link href={buildFilterUrl('screen', null)} className="hover:text-red-500 ml-1">
                <X className="w-3 h-3" />
              </Link>
            </span>
          )}
          <Link
            href={`/kategoria/${slug}`}
            className="text-xs font-bold text-red-600 hover:text-red-800 underline ml-auto"
          >
            Zrušiť všetky filtre
          </Link>
        </div>
      )}

      {/* Main Grid: Sidebar Attribute Filters + Products */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        {/* Sidebar Filters */}
        <aside className="md:col-span-1 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-brand-600" />
              Parametre a filtre
            </span>
          </div>

          {/* Skladom Toggle */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Dostupnosť</h4>
            <Link
              href={buildFilterUrl('inStock', inStock === 'true' ? null : 'true')}
              className={`flex items-center justify-between text-xs px-3 py-2 rounded-xl border transition-all ${
                inStock === 'true'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>Iba tovar skladom</span>
              {inStock === 'true' && <Check className="w-4 h-4 text-emerald-600" />}
            </Link>
          </div>

          {/* Brands Filter */}
          {availableBrands.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Výrobca</h4>
              <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                {availableBrands.map((b) => {
                  const isSelected = selectedBrand?.toLowerCase() === b.toLowerCase();
                  return (
                    <Link
                      key={b}
                      href={buildFilterUrl('brand', isSelected ? null : b)}
                      className={`flex items-center justify-between text-xs px-2.5 py-1.5 rounded-lg transition-colors ${
                        isSelected
                          ? 'bg-brand-50 text-brand-700 font-bold'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>{b}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-brand-600" />}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* RAM Attribute Filter */}
          {availableRam.length > 0 && (
            <div className="border-t border-slate-100 pt-4">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Operačná pamäť (RAM)</h4>
              <div className="space-y-1">
                {availableRam.map((r) => {
                  const isSelected = selectedRam === r;
                  return (
                    <Link
                      key={r}
                      href={buildFilterUrl('ram', isSelected ? null : r)}
                      className={`flex items-center justify-between text-xs px-2.5 py-1.5 rounded-lg transition-colors ${
                        isSelected
                          ? 'bg-brand-50 text-brand-700 font-bold'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>{r} GB</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-brand-600" />}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* CPU Attribute Filter */}
          {availableCpu.length > 0 && (
            <div className="border-t border-slate-100 pt-4">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Typ procesora (CPU)</h4>
              <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
                {availableCpu.map((c) => {
                  const isSelected = selectedCpu === c;
                  return (
                    <Link
                      key={c}
                      href={buildFilterUrl('cpu', isSelected ? null : c)}
                      className={`flex items-center justify-between text-xs px-2.5 py-1.5 rounded-lg transition-colors ${
                        isSelected
                          ? 'bg-brand-50 text-brand-700 font-bold'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="truncate">{c}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* SSD Attribute Filter */}
          {availableSsd.length > 0 && (
            <div className="border-t border-slate-100 pt-4">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Úložisko (SSD)</h4>
              <div className="space-y-1">
                {availableSsd.map((s) => {
                  const isSelected = selectedSsd === s;
                  return (
                    <Link
                      key={s}
                      href={buildFilterUrl('ssd', isSelected ? null : s)}
                      className={`flex items-center justify-between text-xs px-2.5 py-1.5 rounded-lg transition-colors ${
                        isSelected
                          ? 'bg-brand-50 text-brand-700 font-bold'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>{s} GB</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-brand-600" />}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Screen Size Filter */}
          {availableScreens.length > 0 && (
            <div className="border-t border-slate-100 pt-4">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Uhlopriečka displeja</h4>
              <div className="space-y-1">
                {availableScreens.map((sc) => {
                  const isSelected = selectedScreen === sc;
                  return (
                    <Link
                      key={sc}
                      href={buildFilterUrl('screen', isSelected ? null : sc)}
                      className={`flex items-center justify-between text-xs px-2.5 py-1.5 rounded-lg transition-colors ${
                        isSelected
                          ? 'bg-brand-50 text-brand-700 font-bold'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>{sc}&quot;</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-brand-600" />}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </aside>

        {/* Product Grid */}
        <div className="md:col-span-3 space-y-4">
          {filtered.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-4">
              <LayoutGrid className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-lg font-bold text-slate-800">Žiadne produkty nezodpovedajú zvoleným filtrom</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Skúste upraviť alebo zrušiť vybrané parametre a filtre.
              </p>
              <Link
                href={`/kategoria/${slug}`}
                className="inline-block bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition-all"
              >
                Zrušiť všetky filtre
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
