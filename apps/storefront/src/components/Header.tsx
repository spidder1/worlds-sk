'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronDown, Grid3X3, Menu, Search, ShieldCheck, ShoppingCart } from 'lucide-react';
import type { TaxonomyCategory } from '@worlds/types';

function MegaMenu({ categories }: { categories: TaxonomyCategory[] }) {
  return (
    <div className="group relative">
      <button className="flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition-all hover:bg-brand-700 focus:outline-none">
        <Grid3X3 className="h-4 w-4" />
        <span>Všetky kategórie</span>
        <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
      </button>

      <div className="invisible absolute left-0 top-full z-50 w-[min(84rem,calc(100vw-2rem))] translate-y-2 rounded-b-2xl border border-slate-200 bg-white p-6 opacity-0 shadow-2xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
        <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-black text-slate-900">Kompletný katalóg kategórií</h3>
          <Link href="/produkty" className="text-xs font-semibold text-brand-600 hover:text-brand-800 hover:underline">Zobraziť všetky produkty &rarr;</Link>
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-4">
          {categories.map((cat) => (
            <div key={cat.id} className="space-y-2">
              <Link href={`/kategoria/${cat.slug}`} className="group/item flex items-center gap-1.5 font-bold text-slate-900 hover:text-brand-600">
                <span>{cat.name}</span>
              </Link>
              {cat.subcategories?.length ? (
                <ul className="space-y-1 pl-1">
                  {cat.subcategories.slice(0, 6).map((sub) => (
                    <li key={sub.id}>
                      <Link href={`/kategoria/${sub.slug}`} className="text-xs text-slate-600 hover:text-brand-600">
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                  {cat.subcategories.length > 6 ? (
                    <li>
                      <Link href={`/kategoria/${cat.slug}`} className="text-xs font-semibold text-brand-600 hover:underline">
                        + ďalších {cat.subcategories.length - 6} &rarr;
                      </Link>
                    </li>
                  ) : null}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileCategory({ category }: { category: TaxonomyCategory }) {
  if (!category.subcategories?.length) {
    return <Link href={`/kategoria/${category.slug}`} className="block border-t border-slate-100 px-4 py-3 text-sm font-bold text-slate-800">{category.name}</Link>;
  }
  return (
    <details className="border-t border-slate-100">
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-bold text-slate-800">
        {category.name}<ChevronDown className="h-4 w-4" />
      </summary>
      <div className="space-y-3 bg-slate-50 px-5 pb-4">
        <Link href={`/kategoria/${category.slug}`} className="block pt-2 text-sm font-semibold text-brand-700">Zobraziť celú kategóriu</Link>
        {category.subcategories.map((subcategory) => (
          <div key={subcategory.id}>
            <Link href={`/kategoria/${subcategory.slug}`} className="text-sm font-semibold text-slate-700">{subcategory.name}</Link>
            {subcategory.subcategories?.length ? (
              <div className="mt-1 flex flex-wrap gap-2">
                {subcategory.subcategories.map((child) => <Link key={child.id} href={`/kategoria/${child.slug}`} className="rounded-full bg-white px-2.5 py-1 text-xs text-slate-600">{child.name}</Link>)}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </details>
  );
}

export function Header({ categories }: { categories: TaxonomyCategory[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const query = searchQuery.trim();
    if (query) router.push(`/vyhladavanie?q=${encodeURIComponent(query)}`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
      <div className="bg-slate-900 px-4 py-1.5 text-xs text-slate-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <span className="flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Aktuálne dáta z katalógu eD system</span>
          <div className="hidden items-center gap-4 sm:flex">
            <Link href="/o-nas" className="hover:text-white">O nás</Link>
            <Link href="/doprava-a-platba" className="hover:text-white">Doprava a platba</Link>
            <Link href="/kontakt" className="hover:text-white">Kontakt</Link>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 lg:flex-nowrap lg:gap-6">
        <Link href="/" className="flex items-center gap-2 text-2xl font-black tracking-tight text-slate-900">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-xl text-white">W</span>
          <span>Worlds<span className="text-brand-600">.sk</span></span>
        </Link>
        <form onSubmit={handleSearch} className="order-3 w-full lg:order-none lg:max-w-2xl lg:flex-1">
          <div className="relative flex items-center">
            <input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} aria-label="Hľadať produkty" placeholder="Názov, výrobca, MPN alebo EAN..." className="w-full rounded-full border border-slate-300 bg-slate-100 py-2.5 pl-11 pr-24 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500" />
            <Search className="pointer-events-none absolute left-4 h-5 w-5 text-slate-400" />
            <button type="submit" className="absolute right-1.5 rounded-full bg-brand-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-brand-700">Hľadať</button>
          </div>
        </form>
        <Link href="/kosik" className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-200">
          <ShoppingCart className="h-4 w-4 text-brand-600" /><span className="hidden sm:inline">Košík</span>
        </Link>
      </div>

      <nav className="relative hidden border-t border-slate-200 bg-slate-50 lg:block" aria-label="Hlavné kategórie">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-2 text-sm">
          <MegaMenu categories={categories} />
          
          <div className="flex flex-1 items-center space-x-1 overflow-x-auto no-scrollbar py-0.5">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/kategoria/${category.slug}`}
                className="whitespace-nowrap rounded-lg px-3 py-1.5 font-semibold text-slate-700 transition-colors hover:bg-white hover:text-brand-700"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <details className="border-t border-slate-200 bg-white lg:hidden">
        <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3 text-sm font-bold text-slate-800"><Menu className="h-4 w-4" /> Kategórie a produkty</summary>
        <div className="max-h-[65vh] overflow-y-auto border-t border-slate-100">
          <Link href="/produkty" className="block bg-brand-600 px-4 py-3 text-sm font-bold text-white">Všetky produkty</Link>
          {categories.map((category) => <MobileCategory key={category.id} category={category} />)}
        </div>
      </details>
    </header>
  );
}
