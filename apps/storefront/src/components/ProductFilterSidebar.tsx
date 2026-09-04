'use client';

import React, { useState, useMemo } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Check, X, ChevronDown, ChevronUp, RotateCcw, Building2, SlidersHorizontal, Search } from 'lucide-react';
import type { MasterProduct } from '@worlds/types';

interface ProductFilterSidebarProps {
  products: MasterProduct[];
  allCategoryProducts?: MasterProduct[];
  totalCount: number;
  allManufacturers?: Array<{ name: string; count: number }>;
}

interface FilterSectionState {
  brands: boolean;
  price: boolean;
  stock: boolean;
  cpu: boolean;
  ram: boolean;
  ssd: boolean;
  screen: boolean;
  gpu: boolean;
}

export function ProductFilterSidebar({ products, allCategoryProducts, totalCount, allManufacturers = [] }: ProductFilterSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Active filter state from URL params
  const activeBrand = searchParams.get('vyrobca') || '';
  const activeInStock = searchParams.get('inStock') === 'true';
  const activeMinPrice = searchParams.get('minPrice') || '';
  const activeMaxPrice = searchParams.get('maxPrice') || '';
  const activeCpu = searchParams.get('cpu') || '';
  const activeRam = searchParams.get('ram') || '';
  const activeSsd = searchParams.get('ssd') || '';

  // Local brand search filter inside sidebar
  const [brandSearch, setBrandSearch] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  // Section collapse states
  const [sections, setSections] = useState<FilterSectionState>({
    brands: true,
    price: true,
    stock: true,
    cpu: true,
    ram: true,
    ssd: true,
    screen: true,
    gpu: true,
  });

  const toggleSection = (key: keyof FilterSectionState) => {
    setSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // 1. Calculate Available Manufacturers with Counts
  const availableBrands = useMemo(() => {
    const brandMap = new Map<string, number>();

    if (allManufacturers.length > 0) {
      for (const m of allManufacturers) {
        if (m.name && m.name !== 'Unbranded') {
          brandMap.set(m.name, m.count);
        }
      }
    } else {
      const sourceList = allCategoryProducts && allCategoryProducts.length > 0 ? allCategoryProducts : products;
      for (const p of sourceList) {
        const b = p.brand?.trim();
        if (b && b !== 'Unbranded') {
          brandMap.set(b, (brandMap.get(b) || 0) + 1);
        }
      }
    }

    return Array.from(brandMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [products, allCategoryProducts, allManufacturers]);

  // Filtered brands by local search input
  const filteredBrands = useMemo(() => {
    if (!brandSearch.trim()) return availableBrands;
    const q = brandSearch.toLowerCase();
    return availableBrands.filter((b) => b.name.toLowerCase().includes(q));
  }, [availableBrands, brandSearch]);

  // 2. Extract Extracted Specs from Product Titles & Attributes
  const extractedSpecs = useMemo(() => {
    const cpus = new Map<string, number>();
    const rams = new Map<string, number>();
    const ssds = new Map<string, number>();
    const sourceList = allCategoryProducts && allCategoryProducts.length > 0 ? allCategoryProducts : products;

    for (const p of sourceList) {
      const title = p.title || '';

      // Extract CPU
      if (/ryzen 7|core i7|ultra 7/i.test(title)) cpus.set('High-End (Intel i7 / Ryzen 7)', (cpus.get('High-End (Intel i7 / Ryzen 7)') || 0) + 1);
      else if (/ryzen 5|core i5|ultra 5/i.test(title)) cpus.set('Mainstream (Intel i5 / Ryzen 5)', (cpus.get('Mainstream (Intel i5 / Ryzen 5)') || 0) + 1);
      else if (/ryzen 3|core i3/i.test(title)) cpus.set('Basic (Intel i3 / Ryzen 3)', (cpus.get('Basic (Intel i3 / Ryzen 3)') || 0) + 1);

      // Extract RAM
      if (/64\s*gb|64g/i.test(title)) rams.set('64 GB RAM', (rams.get('64 GB RAM') || 0) + 1);
      else if (/32\s*gb|32g/i.test(title)) rams.set('32 GB RAM', (rams.get('32 GB RAM') || 0) + 1);
      else if (/16\s*gb|16g/i.test(title)) rams.set('16 GB RAM', (rams.get('16 GB RAM') || 0) + 1);
      else if (/8\s*gb|8g/i.test(title)) rams.set('8 GB RAM', (rams.get('8 GB RAM') || 0) + 1);

      // Extract SSD
      if (/2\s*tb|2000gb/i.test(title)) ssds.set('2 TB SSD', (ssds.get('2 TB SSD') || 0) + 1);
      else if (/1\s*tb|1000gb|1tssd/i.test(title)) ssds.set('1 TB SSD', (ssds.get('1 TB SSD') || 0) + 1);
      else if (/512\s*gb|512ssd/i.test(title)) ssds.set('512 GB SSD', (ssds.get('512 GB SSD') || 0) + 1);
      else if (/256\s*gb|256ssd/i.test(title)) ssds.set('256 GB SSD', (ssds.get('256 GB SSD') || 0) + 1);
    }

    return {
      cpus: Array.from(cpus.entries()).map(([name, count]) => ({ name, count })),
      rams: Array.from(rams.entries()).map(([name, count]) => ({ name, count })),
      ssds: Array.from(ssds.entries()).map(([name, count]) => ({ name, count })),
    };
  }, [products, allCategoryProducts]);

  // Helper to update URL query params
  const updateFilter = (key: string, value?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set('page', '1'); // Reset to first page
    const qs = params.toString();
    router.push(`${pathname}${qs ? `?${qs}` : ''}`);
  };

  const clearAllFilters = () => {
    router.push(pathname);
  };

  const hasActiveFilters = Boolean(activeBrand || activeInStock || activeMinPrice || activeMaxPrice || activeCpu || activeRam || activeSsd);

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-full flex items-center justify-between bg-white border border-slate-200 px-4 py-3 rounded-xl font-bold text-slate-800 shadow-sm"
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-brand-600" />
            Filtrovať produkty
            {hasActiveFilters ? <span className="w-2 h-2 rounded-full bg-brand-600"></span> : null}
          </span>
          <span className="text-xs text-brand-600 font-semibold">{mobileOpen ? 'Zatvoriť' : 'Zobraziť filtre'}</span>
        </button>
      </div>

      {/* Sidebar Container */}
      <aside
        className={`lg:block ${
          mobileOpen ? 'block fixed inset-0 z-50 bg-white p-6 overflow-y-auto' : 'hidden'
        } lg:relative lg:z-auto lg:p-0 lg:bg-transparent lg:overflow-visible w-full lg:w-64 flex-shrink-0 space-y-5`}
      >
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-brand-600" />
            Filtre produktov
          </h2>
          <button onClick={() => setMobileOpen(false)} className="p-2 text-slate-400 hover:text-slate-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Filter Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="font-black text-slate-900 text-sm tracking-tight flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-brand-600" />
              Filtrovanie ({totalCount.toLocaleString('sk-SK')})
            </h2>
            {hasActiveFilters ? (
              <button
                onClick={clearAllFilters}
                className="text-[11px] font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 bg-rose-50 px-2 py-1 rounded-md"
              >
                <RotateCcw className="w-3 h-3" />
                Vymazať
              </button>
            ) : null}
          </div>

          {/* 1. Stock Status Filter */}
          <div className="space-y-2">
            <button
              onClick={() => toggleSection('stock')}
              className="w-full flex items-center justify-between font-bold text-xs text-slate-800 uppercase tracking-wider"
            >
              <span>Dostupnosť</span>
              {sections.stock ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>
            {sections.stock ? (
              <label
                onClick={() => updateFilter('inStock', activeInStock ? undefined : 'true')}
                className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                  activeInStock
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className={`w-4 h-4 rounded border flex items-center justify-center ${activeInStock ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'}`}>
                    {activeInStock ? <Check className="w-3 h-3" /> : null}
                  </span>
                  Iba skladom
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                  Skladom
                </span>
              </label>
            ) : null}
          </div>

          {/* 2. Manufacturers / Brands Filter */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <button
              onClick={() => toggleSection('brands')}
              className="w-full flex items-center justify-between font-bold text-xs text-slate-800 uppercase tracking-wider"
            >
              <span className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-brand-600" />
                Výrobca / Značka
              </span>
              {sections.brands ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>

            {sections.brands ? (
              <div className="space-y-2">
                {availableBrands.length > 6 ? (
                  <div className="relative mb-2">
                    <input
                      type="text"
                      placeholder="Hľadať značku..."
                      value={brandSearch}
                      onChange={(e) => setBrandSearch(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg text-xs py-1.5 pl-7 pr-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                    />
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2 pointer-events-none" />
                  </div>
                ) : null}

                <div className="max-h-52 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                  {filteredBrands.map((b) => {
                    const isSelected = activeBrand.toLowerCase() === b.name.toLowerCase();
                    return (
                      <div
                        key={b.name}
                        onClick={() => updateFilter('vyrobca', isSelected ? undefined : b.name)}
                        className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs cursor-pointer transition-colors ${
                          isSelected ? 'bg-brand-50 text-brand-700 font-bold' : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span className="flex items-center gap-2 line-clamp-1">
                          <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-brand-600 border-brand-600 text-white' : 'border-slate-300 bg-white'}`}>
                            {isSelected ? <Check className="w-2.5 h-2.5" /> : null}
                          </span>
                          {b.name}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium ml-1">
                          ({b.count})
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>

          {/* 3. Extracted Specs Filters (CPU, RAM, SSD) */}
          {extractedSpecs.cpus.length > 0 ? (
            <div className="space-y-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => toggleSection('cpu')}
                className="w-full flex items-center justify-between font-bold text-xs text-slate-800 uppercase tracking-wider"
              >
                <span>Procesor / CPU</span>
                {sections.cpu ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>
              {sections.cpu ? (
                <div className="space-y-1">
                  {extractedSpecs.cpus.map((cpu) => {
                    const isSelected = activeCpu === cpu.name;
                    return (
                      <div
                        key={cpu.name}
                        onClick={() => updateFilter('cpu', isSelected ? undefined : cpu.name)}
                        className={`flex items-center justify-between px-2 py-1 rounded text-xs cursor-pointer ${
                          isSelected ? 'bg-brand-50 text-brand-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span>{cpu.name}</span>
                        <span className="text-[10px] text-slate-400">({cpu.count})</span>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
          ) : null}

          {extractedSpecs.rams.length > 0 ? (
            <div className="space-y-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => toggleSection('ram')}
                className="w-full flex items-center justify-between font-bold text-xs text-slate-800 uppercase tracking-wider"
              >
                <span>Pamäť RAM</span>
                {sections.ram ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>
              {sections.ram ? (
                <div className="space-y-1">
                  {extractedSpecs.rams.map((ram) => {
                    const isSelected = activeRam === ram.name;
                    return (
                      <div
                        key={ram.name}
                        onClick={() => updateFilter('ram', isSelected ? undefined : ram.name)}
                        className={`flex items-center justify-between px-2 py-1 rounded text-xs cursor-pointer ${
                          isSelected ? 'bg-brand-50 text-brand-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span>{ram.name}</span>
                        <span className="text-[10px] text-slate-400">({ram.count})</span>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
          ) : null}

          {extractedSpecs.ssds.length > 0 ? (
            <div className="space-y-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => toggleSection('ssd')}
                className="w-full flex items-center justify-between font-bold text-xs text-slate-800 uppercase tracking-wider"
              >
                <span>Kapacita SSD</span>
                {sections.ssd ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>
              {sections.ssd ? (
                <div className="space-y-1">
                  {extractedSpecs.ssds.map((ssd) => {
                    const isSelected = activeSsd === ssd.name;
                    return (
                      <div
                        key={ssd.name}
                        onClick={() => updateFilter('ssd', isSelected ? undefined : ssd.name)}
                        className={`flex items-center justify-between px-2 py-1 rounded text-xs cursor-pointer ${
                          isSelected ? 'bg-brand-50 text-brand-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span>{ssd.name}</span>
                        <span className="text-[10px] text-slate-400">({ssd.count})</span>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
          ) : null}

          {/* Close Mobile Filter Button */}
          <div className="lg:hidden pt-4 border-t border-slate-200">
            <button
              onClick={() => setMobileOpen(false)}
              className="w-full bg-brand-600 text-white font-bold py-2.5 rounded-xl text-sm shadow-md"
            >
              Zobraziť výsledky
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
