import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllProducts } from '../../lib/catalog';
import { ProductCard } from '../../components/ProductCard';
import { Search, Home, ChevronRight } from 'lucide-react';

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `Výsledky vyhľadávania pre "${q}" | Worlds.sk` : 'Vyhľadávanie produktov | Worlds.sk',
    robots: { index: false, follow: true }, // prevent search crawl traps
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = (q || '').trim().toLowerCase();

  const allProducts = await getAllProducts();

  const results = query
    ? allProducts.filter((p) => {
        return (
          p.title.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.mpn.toLowerCase().includes(query) ||
          p.ean?.includes(query) ||
          p.categoryHierarchy.some((h) => h.toLowerCase().includes(query)) ||
          p.searchKeywords.some((k) => k.includes(query))
        );
      })
    : [];

  return (
    <div className="space-y-6">
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-slate-900 flex items-center gap-1">
          <Home className="w-3.5 h-3.5" />
          Domov
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-semibold">Vyhľadávanie</span>
      </nav>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Search className="w-5 h-5 text-brand-600" />
            Výsledky vyhľadávania pre: &ldquo;<span className="text-brand-600">{q || ''}</span>&rdquo;
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Nájdených <span className="font-bold text-slate-800">{results.length}</span> produktov v katalógu
          </p>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-4">
          <Search className="w-12 h-12 text-slate-300 mx-auto" />
          <h2 className="text-base font-bold text-slate-800">Pre zadaný výraz sme nenašli žiadne produkty</h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Skontrolujte preklepy, skúste hľadať podľa kľúčového slova (napr. &quot;i5&quot;, &quot;RTX 4060&quot;, &quot;Samsung&quot;) alebo Part Number výrobcu.
          </p>
          <Link
            href="/"
            className="inline-block bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            Späť na úvodnú stránku
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
