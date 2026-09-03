import { Metadata } from 'next';
import Link from 'next/link';
import {
  Sparkles,
  Clock3,
  Laptop,
  ArrowLeft,
  Building2,
  Calendar,
  Database
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'O nás | Worlds.sk',
  description: 'Spoznajte Worlds.sk – moderný technologický e-shop prevádzkovaný spoločnosťou ETHOS Technology, s. r. o. od roku 2008.',
};

export default function ONasPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link href="/" className="hover:text-blue-600 flex items-center gap-1 font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" /> Späť na domovskú stránku
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">O nás</span>
        </nav>

        {/* Hero Header */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 md:p-12 shadow-sm mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/60 rounded-full blur-3xl -z-10 transform translate-x-1/3 -translate-y-1/3 pointer-events-none" />
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-blue-100">
            <Sparkles className="w-4 h-4" /> Príbeh a profil spoločnosti
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            O spoločnosti Worlds.sk
          </h1>
          <p className="text-slate-600 text-base mt-3 max-w-3xl leading-relaxed">
            Worlds.sk prevádzkuje slovenská spoločnosť <strong>ETHOS Technology, s. r. o.</strong>. Nová verzia webu momentálne sprístupňuje produktový katalóg; online objednávanie sa pripravuje.
          </p>
        </div>

        {/* 4 kľúčové piliere */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2 text-center">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-bold mx-auto">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">Od roku 2008</h3>
            <p className="text-xs text-slate-500">Viac ako 17 rokov stabilného pôsobenia na slovenskom IT trhu.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2 text-center">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center font-bold mx-auto">
              <Laptop className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">Aktuálny katalóg</h3>
            <p className="text-xs text-slate-500">Priebežne synchronizovaná ponuka z distribučného katalógu eD system a. s.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2 text-center">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center font-bold mx-auto">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">Zdrojové dáta</h3>
            <p className="text-xs text-slate-500">Produktové údaje, ceny a dostupnosť pochádzajú z distribučného feedu.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2 text-center">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center font-bold mx-auto">
              <Clock3 className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">Postupné spustenie</h3>
            <p className="text-xs text-slate-500">Objednávky, platby a dopravu sprístupníme až po ich úplnom overení.</p>
          </div>
        </div>

        {/* Hlavný obsah */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-sm space-y-8 text-slate-700 leading-relaxed text-sm">
          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-slate-900">Naša filozofia a cieľ</h2>
            <p>
              Spoločnosť <strong>ETHOS Technology, s. r. o.</strong> prevádzkuje <strong>Worlds.sk</strong> a buduje novú generáciu katalógu IT techniky. Aktuálna verzia slúži na prezeranie ponuky a kontaktovanie tímu.
            </p>
            <p>
              V našej ponuke nájdete kompletné portfólio spotrebnej elektroniky, kancelárskej techniky, firemných aj herných notebookov, procesorov, grafických kariet, monitorov, diskov a príslušenstva od renomovaných svetových výrobcov ako <strong>ASUS, Lenovo, HP, Dell, Apple, Samsung, Intel, AMD, Kingston, Logitech</strong> a mnohých ďalších.
            </p>
          </section>

          <section className="bg-gradient-to-r from-blue-50 to-indigo-50/60 p-8 rounded-2xl border border-blue-100 space-y-4">
            <div className="flex items-center gap-3">
              <Building2 className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-bold text-slate-900">B2B riešenia a firemné nákupy</h3>
            </div>
            <p className="text-slate-700 text-sm">
              Pre firmy, školy, živnostníkov a inštitúcie poskytujeme komplexné dodávky IT vybavenia. Samozrejmosťou je vystavenie daňového dokladu s možnosťou odpočtu DPH, individuálne projektové ceny pri väčších odberoch a odborná konzultácia.
            </p>
            <div>
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow-sm text-sm"
              >
                Kontaktovať náš tím
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
