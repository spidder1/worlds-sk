import Link from 'next/link';
import type { Metadata } from 'next';
import { Clock3, Home, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Objednávanie sa pripravuje | Worlds.sk',
  description: 'Online objednávanie na Worlds.sk momentálne nie je aktívne.',
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-slate-900 flex items-center gap-1">
          <Home className="w-3.5 h-3.5" />
          Domov
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-semibold">Košík</span>
      </nav>

      <section className="bg-white p-8 md:p-12 rounded-2xl border border-slate-200 text-center space-y-5 shadow-sm">
        <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto">
          <Clock3 className="w-9 h-9" />
        </div>
        <h1 className="text-2xl font-black text-slate-900">Online objednávanie sa pripravuje</h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          Katalóg, ceny a dostupnosť si môžete prezerať, no pokladňa zatiaľ neposiela objednávky.
          Nezadávajte sem osobné ani platobné údaje.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link href="/" className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm px-6 py-3 rounded-xl">
            Späť do katalógu
          </Link>
          <Link href="/kontakt" className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm px-6 py-3 rounded-xl">
            Kontaktovať nás
          </Link>
        </div>
      </section>
    </div>
  );
}
