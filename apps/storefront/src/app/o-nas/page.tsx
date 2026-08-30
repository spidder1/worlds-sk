import { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, ShieldCheck, Zap, Laptop, ArrowLeft, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'O nás | Worlds.sk',
  description: 'Spoznajte Worlds.sk – vášho spoľahlivého partnera pre IT techniku, výpočtovú techniku a elektroniku.',
};

export default function ONasPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-blue-600 flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Späť na domov
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-medium">O nás</span>
      </nav>

      <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 shadow-sm space-y-8 text-slate-700 leading-relaxed">
        <div className="border-b border-slate-200 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Príbeh značky
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">O internetovom obchode Worlds.sk</h1>
          <p className="text-slate-500 text-sm mt-2">Váš technologický partner pre firemné aj domáce IT riešenia</p>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Kto sme a čo robíme</h2>
          <p>
            Internetový obchod <strong>Worlds.sk</strong> prevádzkuje slovenská IT spoločnosť <strong>ETHOS Technology, s. r. o.</strong> so sídlom v Banskej Bystrici. Dlhodobo sa špecializujeme na dodávku kvalitnej výpočtovej techniky, notebookov, počítačových komponentov, monitorov, príslušenstva a sieťových riešení pre domácnosti aj firmy (B2B).
          </p>
          <p>
            Vďaka priamemu napojeniu na centrálne distribučné sklady lídra na trhu (eD system a. s.) ponúkame okamžitý prístup k viac ako <strong>70 000 overeným IT produktom</strong> s expresným dodaním po celom Slovensku.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold">
              <Laptop className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900">70 000+ Produktov</h3>
            <p className="text-xs text-slate-600">Široký výber od popredných svetových značiek ASUS, Lenovo, HP, Dell, Apple, Intel, Samsung a Kingston.</p>
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900">Expresná expedícia</h3>
            <p className="text-xs text-slate-600">Doručenie kuriérom DPD a PPL priamo z centrálneho skladu do 24–48 hodín.</p>
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 bg-purple-600 text-white rounded-xl flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900">Odborné poradenstvo</h3>
            <p className="text-xs text-slate-600">Sme tím IT špecialistov pripravených pomôcť vám s výberom optimálnej konfigurácie.</p>
          </div>
        </section>

        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 space-y-3">
          <h3 className="font-bold text-slate-900 text-lg">Firemné nákupy (B2B)</h3>
          <p className="text-sm text-slate-700">
            Plánujete nákup techniky pre vašu firmu, školu alebo inštitúciu? Vystavujeme daňové doklady s odpočtom DPH, ponúkame individuálne cenové ponuky na väčšie odbery a odbornú konfiguráciu.
          </p>
          <div className="pt-2">
            <Link href="/kontakt" className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition shadow-sm">
              Kontaktovať B2B oddelenie
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
