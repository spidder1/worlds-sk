import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldAlert, ArrowLeft, CheckCircle2, Clock, Truck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Reklamačný poriadok a záruka | Worlds.sk',
  description: 'Podmienky uplatnenia záruky, postup reklamácie a servis tovaru na Worlds.sk.',
};

export default function ReklamacnyPoriadokPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-blue-600 flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Späť na domov
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-medium">Reklamačný poriadok</span>
      </nav>

      <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 shadow-sm space-y-8 text-slate-700 leading-relaxed">
        <div className="border-b border-slate-200 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-800 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldAlert className="w-3.5 h-3.5" /> Servis a záruka
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Reklamačný poriadok</h1>
          <p className="text-slate-500 text-sm mt-2">Pravidlá uplatňovania zodpovednosti za vady tovaru</p>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-2">
            <Clock className="w-6 h-6 text-blue-600 mx-auto" />
            <h3 className="font-bold text-slate-900">24 mesiacov záruka</h3>
            <p className="text-xs text-slate-600">Zákonná záručná doba pre koncových spotrebiteľov.</p>
          </div>
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
            <h3 className="font-bold text-slate-900">Autorizovaný servis</h3>
            <p className="text-xs text-slate-600">Priama podpora servisných stredísk výrobcov (ASUS, Lenovo, HP, Dell).</p>
          </div>
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-2">
            <Truck className="w-6 h-6 text-purple-600 mx-auto" />
            <h3 className="font-bold text-slate-900">Rýchle vybavenie</h3>
            <p className="text-xs text-slate-600">Vybavenie reklamácie v zákonnej lehote do 30 dní.</p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">1. Záručná doba</h2>
          <p className="text-sm">
            Záručná doba začína plynúť dňom prevzatia tovaru kupujúcim. Pre spotrebiteľa je zákonná záručná doba <strong>24 mesiacov</strong>, pokiaľ nie je pri tovare uvedená dlhšia záručná doba poskytovaná výrobcom (napr. 36 mesiacov pri vybraných notebookoch alebo 60 mesiacov pri SSD diskoch).
          </p>
          <p className="text-sm">
            Pri nákupe na firmu (B2B, IČO) sa dĺžka záruky riadi záručnými podmienkami výrobcu a Obchodným zákonníkom (spravidla 12 až 24 mesiacov).
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">2. Ako postupovať pri reklamácii</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">1</span>
              <div>
                <p className="font-semibold text-slate-900">Najrýchlejšia možnosť – Autorizovaný servis výrobcu:</p>
                <p className="text-slate-600 text-xs mt-1">Pre značky ako ASUS, Lenovo, HP, Dell, Acer, Samsung a Apple odporúčame kontaktovať priamo autorizovaný servis, kde technik vyrieši závadu alebo zabezpečí vyzdvihnutie tovaru kuriérom.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="flex-shrink-0 w-6 h-6 bg-slate-700 text-white rounded-full flex items-center justify-center font-bold text-xs">2</span>
              <div>
                <p className="font-semibold text-slate-900">Zaslanie tovaru predávajúcemu:</p>
                <p className="text-slate-600 text-xs mt-1">Tovar zašlite bezpečne zabalený na adresu sídla spoločnosti: <strong>ETHOS Technology, s. r. o., Tatranská 6396/101, 974 11 Banská Bystrica</strong> spolu s popisom závady a kópiou faktúry.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">3. Vybavenie reklamácie</h2>
          <p className="text-sm">
            Predávajúci vydá kupujúcemu potvrdenie o uplatnení reklamácie a o spôsobe jej vybavenia (oprava tovaru, výmena tovaru, vrátenie kúpnej ceny alebo primeraná zľava). Reklamácia bude vybavená najneskôr do 30 dní od jej riadneho uplatnenia.
          </p>
        </section>
      </div>
    </div>
  );
}
