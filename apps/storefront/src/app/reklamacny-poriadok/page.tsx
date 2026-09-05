import { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldAlert,
  ArrowLeft,
  Clock,
  Wrench,
  FileCheck,
} from 'lucide-react';
import { getEditableContentPage } from '../../lib/content';
import { EditableContentPage } from '../../components/EditableContentPage';
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Reklamačný poriadok a záručné podmienky | Worlds.sk',
  description: 'Podmienky uplatnenia záruky, postup reklamácie tovaru a zoznam autorizovaných servisov na Worlds.sk.',
  robots: { index: false, follow: true },
};

export default async function ReklamacnyPoriadokPage() {
  const editable = await getEditableContentPage('reklamacny-poriadok');
  if (editable) return <EditableContentPage page={editable} />;
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link href="/" className="hover:text-blue-600 flex items-center gap-1 font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" /> Späť na domovskú stránku
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Reklamačný poriadok</span>
        </nav>

        <div className="mb-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950">
          Pracovný návrh: online objednávanie ešte nie je aktívne. Pred jeho spustením musí konečné znenie skontrolovať právnik.
        </div>

        {/* Hero Header */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 md:p-12 shadow-sm mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-50/50 rounded-full blur-3xl -z-10 transform translate-x-1/3 -translate-y-1/3 pointer-events-none" />
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-50 text-amber-800 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-amber-100">
            <ShieldAlert className="w-4 h-4" /> Servis a záručné podmienky
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Reklamačný poriadok a záruka
          </h1>
          <p className="text-slate-600 text-base mt-3 max-w-3xl leading-relaxed">
            Transparentné pravidlá pre uplatňovanie zodpovednosti za vady tovaru zakúpeného na Worlds.sk v zmysle Občianskeho a Obchodného zákonníka SR.
          </p>
        </div>

        {/* 3 rýchle karty výhod */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">24 mesiacov záruka</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Zákonná záručná doba pre spotrebiteľov s možnosťou predĺženej záruky od výrobcu až na 36–60 mesiacov.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Wrench className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Autorizované servisy</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Rýchla oprava priamo v autorizovaných strediskách popredných výrobcov ASUS, Lenovo, HP, Dell a Apple.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Zákonná lehota do 30 dní</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Každá reklamácia spotrebiteľa je vybavená v najkratšom možnom čase, najneskôr do 30 kalendárnych dní.
            </p>
          </div>
        </div>

        {/* Detailný obsah */}
        <div className="space-y-6">
          {/* ČLÁNOK 1 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center">01</span>
              <h2 className="text-xl font-bold text-slate-900">Všeobecné ustanovenia a záručná doba</h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Predávajúci poskytuje na tovar záruku v trvaní <strong>24 mesiacov</strong> pre fyzické osoby – spotrebiteľov. Záručná doba začína plynúť dňom prevzatia tovaru kupujúcim.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Pri tovare predávanom kupujúcim – podnikateľom (nákup na IČO) je dĺžka záručnej doby určená záručnými podmienkami výrobcu daného hardvéru (spravidla 12 až 24 mesiacov).
            </p>
          </div>

          {/* ČLÁNOK 2 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center">02</span>
              <h2 className="text-xl font-bold text-slate-900">Ako postupovať pri reklamácii tovaru</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-5 bg-blue-50/50 rounded-xl border border-blue-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-blue-900 text-sm">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">A</span>
                  Najrýchlejšia možnosť – Autorizovaný servis
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Pre značkové notebooky a počítače (ASUS, Lenovo, HP, Dell, Acer, Apple, Samsung) odporúčame kontaktovať priamo autorizovaný servis výrobcu. Servis často zabezpečí bezplatný odvoz kuriérom z vášho domu (On-Site / Pick-Up & Return).
                </p>
              </div>

              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <span className="w-6 h-6 rounded-full bg-slate-700 text-white flex items-center justify-center text-xs">B</span>
                  Zaslanie priamo predávajúcemu
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Tovar bezpečne zabaľte a zašlite spolu s popisom vady a kópiou faktúry na adresu:
                  <strong className="block text-slate-900 mt-1">ETHOS Technology, s. r. o., Tatranská 6396/101, 974 11 Banská Bystrica</strong>
                </p>
              </div>
            </div>
          </div>

          {/* ČLÁNOK 3 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center">03</span>
              <h2 className="text-xl font-bold text-slate-900">Zánik nároku na uplatnenie záruky</h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Nárok na uplatnenie záruky u predávajúceho zaniká najmä v týchto prípadoch:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-600 leading-relaxed">
              <li>Uplynutím záručnej doby tovaru.</li>
              <li>Mechanickým poškodením tovaru spôsobeným kupujúcim (pád, poliatie tekutinou, prasknutý displej).</li>
              <li>Používaním tovaru v podmienkach, ktoré nezodpovedajú vlhkosťou, teplotou alebo prašnosťou bežnému prostrediu.</li>
              <li>Neodborným zásahom, pretaktovaním, modifikáciou firmvéru alebo zásahom neautorizovanej osoby.</li>
              <li>Poškodením spôsobeným prepätím v elektrickej sieti alebo živelnou udalosťou.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
