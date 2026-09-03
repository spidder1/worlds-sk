import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Clock3, Mail, Truck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Doprava a platba | Worlds.sk',
  description: 'Aktuálne informácie o pripravovaných možnostiach dopravy a platby na Worlds.sk.',
  robots: { index: false, follow: true },
};

export default function DopravaAPlatbaPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-blue-600 flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Späť na domov
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-medium">Doprava a platba</span>
      </nav>

      <section className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 shadow-sm text-center space-y-5">
        <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto">
          <Clock3 className="w-9 h-9" />
        </div>
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
          <Truck className="w-4 h-4" /> Doprava a platba
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">Možnosti doručenia a platby pripravujeme</h1>
        <p className="text-sm text-slate-600 leading-relaxed max-w-xl mx-auto">
          Online pokladňa zatiaľ nie je aktívna. Konkrétnych dopravcov, ceny dopravy ani platobné metódy preto ešte nezverejňujeme ako dostupnú službu.
        </p>
        <a
          href="mailto:info@worlds.sk?subject=Ot%C3%A1zka%20k%20doprave%20a%20platbe"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
        >
          <Mail className="w-4 h-4" /> Opýtať sa e-mailom
        </a>
      </section>
    </div>
  );
}
