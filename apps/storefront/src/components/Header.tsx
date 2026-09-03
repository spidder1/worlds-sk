'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ShoppingCart, ShieldCheck, Laptop, Gamepad2, BriefcaseBusiness, Cable } from 'lucide-react';

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/vyhladavanie?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      {/* Top Banner */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Dáta z distribučného katalógu eD system
            </span>
            <span className="hidden sm:inline text-slate-500">•</span>
            <span className="hidden sm:inline">Aktuálna ponuka z distribučného katalógu</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/o-nas" className="hover:text-white transition-colors">O nás</Link>
            <span className="text-slate-600">•</span>
            <Link href="/doprava-a-platba" className="hover:text-white transition-colors">Doprava a platba</Link>
            <span className="text-slate-600">•</span>
            <Link href="/kontakt" className="hover:text-white transition-colors">Kontakt</Link>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-2xl font-black tracking-tight text-slate-900">
          <div className="bg-brand-600 text-white p-1.5 rounded-lg flex items-center justify-center font-black text-xl">
            W
          </div>
          <span>Worlds<span className="text-brand-600">.sk</span></span>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-2xl relative">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Hľadajte notebooky, procesory, monitory, MPN alebo EAN..."
              className="w-full bg-slate-100 border border-slate-300 text-slate-900 rounded-full pl-11 pr-24 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
            <button
              type="submit"
              className="absolute right-1.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold px-4 py-1.5 rounded-full transition-colors"
            >
              Hľadať
            </button>
          </div>
        </form>

        {/* Header Right Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/kosik"
            className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2 rounded-full font-medium text-sm transition-colors relative"
          >
            <ShoppingCart className="w-4 h-4 text-brand-600" />
            <span>Košík</span>
            <span className="sr-only">Objednávanie sa pripravuje</span>
          </Link>
        </div>
      </div>

      {/* Navigation Mega Bar */}
      <nav className="bg-slate-50 border-t border-slate-200 text-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-1 overflow-x-auto py-2 text-slate-700 font-medium">
          <Link
            href="/kategoria/notebooky"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-white hover:text-brand-600 hover:shadow-sm transition-all"
          >
            <Laptop className="w-4 h-4 text-slate-500" />
            Notebooky
          </Link>
          <Link
            href="/kategoria/herne-notebooky"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-white hover:text-brand-600 hover:shadow-sm transition-all"
          >
            <Gamepad2 className="w-4 h-4 text-slate-500" />
            Herné notebooky
          </Link>
          <Link
            href="/kategoria/firemne-notebooky"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-white hover:text-brand-600 hover:shadow-sm transition-all"
          >
            <BriefcaseBusiness className="w-4 h-4 text-slate-500" />
            Firemné notebooky
          </Link>
          <Link
            href="/kategoria/prislusenstvo-a-periferie"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-white hover:text-brand-600 hover:shadow-sm transition-all"
          >
            <Cable className="w-4 h-4 text-slate-500" />
            Príslušenstvo
          </Link>
          <Link
            href="/kategoria/ups-zalozne-zdroje"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-amber-700 bg-amber-50 hover:bg-amber-100 font-semibold transition-all"
          >
            ⚡ UPS a záložné zdroje
          </Link>
        </div>
      </nav>
    </header>
  );
}
