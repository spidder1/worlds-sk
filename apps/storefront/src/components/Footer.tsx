import React from 'react';
import Link from 'next/link';
import { Database, RotateCcw, Shield, Clock3 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm mt-20 border-t border-slate-800">
      {/* Top Value Propositions */}
      <div className="border-b border-slate-800 py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex items-center gap-4">
            <div className="bg-slate-800 p-3 rounded-xl text-brand-400">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white">Distribučný katalóg</h4>
              <p className="text-xs text-slate-400">Produkty, ceny a dostupnosť z eD system feedu</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-slate-800 p-3 rounded-xl text-emerald-400">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white">Bezpečný katalóg</h4>
              <p className="text-xs text-slate-400">Verejná časť zobrazuje iba údaje určené zákazníkom</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-slate-800 p-3 rounded-xl text-amber-400">
              <Clock3 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white">Aktuálnosť dát</h4>
              <p className="text-xs text-slate-400">Viditeľný stav z poslednej úspešnej synchronizácie</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-slate-800 p-3 rounded-xl text-purple-400">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white">Objednávanie sa pripravuje</h4>
              <p className="text-xs text-slate-400">Pokladňa zatiaľ neprijíma osobné ani platobné údaje</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="text-xl font-black text-white mb-4">
            Worlds<span className="text-brand-500">.sk</span>
          </div>
          <p className="text-xs leading-relaxed text-slate-400 mb-4">
            Moderná technologická e-commerce platforma s napojením na distribučný katalóg eD system a priebežne aktualizovanou ponukou IT produktov.
          </p>
          <div className="text-xs text-slate-400 space-y-1">
            <p className="font-semibold text-slate-300">Prevádzkovateľ:</p>
            <p>ETHOS Technology, s. r. o.</p>
            <p>Tatranská 6396/101, 974 11 Banská Bystrica</p>
            <p>IČO: 44 099 207 | IČ DPH: SK2022595311</p>
          </div>
          <div className="text-xs text-slate-500 mt-4">
            © {new Date().getFullYear()} Worlds.sk. Všetky práva vyhradené.
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Hlavné kategórie</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/kategoria/notebooky" className="hover:text-white transition-colors">Notebooky a ultrabooky</Link></li>
            <li><Link href="/kategoria/herne-notebooky" className="hover:text-white transition-colors">Herné notebooky</Link></li>
            <li><Link href="/kategoria/firemne-notebooky" className="hover:text-white transition-colors">Firemné notebooky</Link></li>
            <li><Link href="/kategoria/prislusenstvo-a-periferie" className="hover:text-white transition-colors">Príslušenstvo a periférie</Link></li>
            <li><Link href="/kategoria/ups-zalozne-zdroje" className="hover:text-white transition-colors">UPS a záložné zdroje</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Informácie & Podpora</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/o-nas" className="hover:text-white transition-colors">O nás</Link></li>
            <li><Link href="/kontakt" className="hover:text-white transition-colors">Kontakt a podpora</Link></li>
            <li><Link href="/doprava-a-platba" className="hover:text-white transition-colors">Doprava a platba</Link></li>
            <li><Link href="/obchodne-podmienky" className="hover:text-white transition-colors">Obchodné podmienky (VOP)</Link></li>
            <li><Link href="/reklamacny-poriadok" className="hover:text-white transition-colors">Reklamačný poriadok a záruka</Link></li>
            <li><Link href="/ochrana-osobnych-udajov" className="hover:text-white transition-colors">Ochrana osobných údajov (GDPR)</Link></li>
            <li><Link href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap XML (Index)</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Technická platforma</h4>
          <p className="text-xs text-slate-400 leading-relaxed mb-3">
            Storefront beží na Next.js a používa oddelenú importnú a databázovú vrstvu.
          </p>
          <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 text-xs">
            <div className="text-slate-300 font-semibold mb-1">Stav katalógu</div>
            <div className="flex items-center gap-2 text-amber-300">
              <span className="w-2 h-2 rounded-full bg-amber-300" />
              Objednávanie zatiaľ nie je aktívne
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
