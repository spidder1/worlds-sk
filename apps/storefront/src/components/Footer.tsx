import React from 'react';
import Link from 'next/link';
import { Truck, RotateCcw, Shield, Award, HelpCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm mt-20 border-t border-slate-800">
      {/* Top Value Propositions */}
      <div className="border-b border-slate-800 py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex items-center gap-4">
            <div className="bg-slate-800 p-3 rounded-xl text-brand-400">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white">Rýchle doručenie</h4>
              <p className="text-xs text-slate-400">PPL / DPD kuriér priamo zo skladu distribútora</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-slate-800 p-3 rounded-xl text-emerald-400">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white">Oficiálna záruka</h4>
              <p className="text-xs text-slate-400">Až 36 mesiacov on-site / autorizovaný servis</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-slate-800 p-3 rounded-xl text-amber-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white">Overená kvalita dát</h4>
              <p className="text-xs text-slate-400">AI validácia a presné technické parametre</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-slate-800 p-3 rounded-xl text-purple-400">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white">14 dní na vrátenie</h4>
              <p className="text-xs text-slate-400">Bezstarostné vrátenie tovaru pre spotrebiteľov</p>
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
            Moderná technologická e-commerce platforma s priamym napojením na centrálny sklad eD system a. s. s viac ako 70 000 IT produktmi.
          </p>
          <div className="text-xs text-slate-500">
            © {new Date().getFullYear()} Worlds.sk. Všetky práva vyhradené.
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Hlavné kategórie</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/kategoria/notebooky" className="hover:text-white transition-colors">Notebooky a ultrabooky</Link></li>
            <li><Link href="/kategoria/herne-notebooky" className="hover:text-white transition-colors">Herné notebooky</Link></li>
            <li><Link href="/kategoria/procesory" className="hover:text-white transition-colors">Procesory (Intel & AMD)</Link></li>
            <li><Link href="/kategoria/monitory" className="hover:text-white transition-colors">Herné a kancelárske monitory</Link></li>
            <li><Link href="/kategoria/ssd-disky" className="hover:text-white transition-colors">NVMe SSD disky</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Informácie & Podpora</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#" className="hover:text-white transition-colors">Doprava a platba</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Obchodné podmienky</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Ochrana osobných údajov (GDPR)</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Reklamačný poriadok</a></li>
            <li><Link href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap XML (Index)</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Technická platforma</h4>
          <p className="text-xs text-slate-400 leading-relaxed mb-3">
            Poháňané Next.js 15, Medusa v2 a inteligentnou AI Data Ingestion pipeline.
          </p>
          <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 text-xs">
            <div className="text-slate-300 font-semibold mb-1">Status systému</div>
            <div className="flex items-center gap-2 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              eD Feed API: Online (v4.4.17)
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
