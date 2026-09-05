import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Building2, ChevronRight, Home, Search } from 'lucide-react';
import { getManufacturers } from '../../lib/catalog';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Všetci výrobcovia | Worlds.sk',
  description: 'Prehľad výrobcov a značiek v IT katalógu Worlds.sk.',
};

export default async function ManufacturersPage() {
  const manufacturers = (await getManufacturers()).toSorted((a, b) =>
    a.name.localeCompare(b.name, 'sk', { sensitivity: 'base' })
  );

  return (
    <div className="space-y-6">
      <nav className="flex items-center gap-2 text-xs text-slate-500" aria-label="Navigačná cesta">
        <Link href="/" className="flex items-center gap-1 hover:text-slate-900">
          <Home className="h-3.5 w-3.5" /> Domov
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
        <span className="font-semibold text-slate-900">Výrobcovia</span>
      </nav>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-black tracking-tight text-slate-900">
              <Building2 className="h-6 w-6 text-brand-600" />
              Všetci výrobcovia
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">
              Vyberte značku a zobrazíme jej produkty z aktuálneho katalógu. Produkty sa načítajú až po vašom výbere.
            </p>
          </div>
          <Link href="/vyhladavanie" className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-brand-50 hover:text-brand-700">
            <Search className="h-4 w-4" /> Celý katalóg
          </Link>
        </div>
      </section>

      {manufacturers.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-sm text-slate-500">
          Zoznam výrobcov je dočasne nedostupný.
        </div>
      ) : (
        <section aria-label="Zoznam výrobcov" className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {manufacturers.map((manufacturer) => (
            <Link
              key={manufacturer.name}
              href={`/vyhladavanie?vyrobca=${encodeURIComponent(manufacturer.name)}`}
              className="group flex min-h-36 flex-col items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-400 hover:shadow-md"
              title={`Zobraziť produkty výrobcu ${manufacturer.name}`}
            >
              <span className="flex h-16 w-full items-center justify-center rounded-xl bg-slate-50 p-3 group-hover:bg-brand-50">
                {manufacturer.logoUrl ? (
                  <Image src={manufacturer.logoUrl} alt={`${manufacturer.name} logo`} width={120} height={56} className="h-full w-full object-contain" />
                ) : (
                  <span className="text-xl font-black text-slate-400">{manufacturer.name.slice(0, 2).toUpperCase()}</span>
                )}
              </span>
              <span className="mt-3 line-clamp-2 text-sm font-bold text-slate-900 group-hover:text-brand-700">{manufacturer.name}</span>
              <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 group-hover:text-brand-600">
                {manufacturer.count.toLocaleString('sk-SK')} produktov <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </section>
      )}
    </div>
  );
}
