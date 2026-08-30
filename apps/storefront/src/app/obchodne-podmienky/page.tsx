'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  FileText,
  Users,
  Building2,
  ShieldCheck,
  RotateCcw,
  CreditCard,
  Truck,
  HelpCircle,
  Scale,
  CheckCircle2,
  AlertCircle,
  Download
} from 'lucide-react';

export default function ObchodnePodmienkyPage() {
  const [activeTab, setActiveTab] = useState<'b2c' | 'b2b'>('b2c');
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setActiveSection(activeSection === id ? null : id);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link href="/" className="hover:text-blue-600 flex items-center gap-1 font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" /> Späť na domovskú stránku
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Obchodné podmienky</span>
        </nav>

        {/* Hero Header */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 md:p-12 shadow-sm mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl -z-10 transform translate-x-1/3 -translate-y-1/3 pointer-events-none" />
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-blue-100">
            <FileText className="w-4 h-4" /> Právne dokumenty Worlds.sk
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Všeobecné obchodné podmienky
          </h1>
          <p className="text-slate-600 text-base mt-3 max-w-3xl leading-relaxed">
            Platné a účinné znenie obchodných podmienok spoločnosti <strong>ETHOS Technology, s. r. o.</strong> pre nákup v internetovom obchode Worlds.sk v zmysle zákonov Slovenskej republiky.
          </p>

          {/* Prepínač Spotrebiteľ vs B2B Podnikateľ */}
          <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-slate-100">
            <button
              onClick={() => setActiveTab('b2c')}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-sm ${
                activeTab === 'b2c'
                  ? 'bg-blue-600 text-white ring-2 ring-blue-600/20 shadow-blue-500/20'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Users className="w-4 h-4" />
              Pre fyzické osoby (Spotrebitelia)
            </button>
            <button
              onClick={() => setActiveTab('b2b')}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-sm ${
                activeTab === 'b2b'
                  ? 'bg-slate-900 text-white ring-2 ring-slate-900/20 shadow-slate-900/20'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Building2 className="w-4 h-4" />
              Pre podnikateľov (B2B firmy)
            </button>
          </div>
        </div>

        {/* TAB 1: SPOTREBITELIA (B2C) */}
        {activeTab === 'b2c' && (
          <div className="space-y-6">
            {/* Rýchly prehľad kľúčových práv spotrebiteľa */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">14 dní na vrátenie</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Zákonné právo na odstúpenie od zmluvy bez udania dôvodu.</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">24 mesiacov záruka</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Plná záruka na všetok spotrebiteľský tovar s autorizovaným servisom.</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Orgán dozoru SOI</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Dohľad vykonáva Slovenská obchodná inšpekcia pre BB kraj.</p>
                </div>
              </div>
            </div>

            {/* ČLÁNOK 1 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center">01</span>
                <h2 className="text-xl font-bold text-slate-900">Identifikačné a kontaktné údaje prevádzkovateľa</h2>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Tento internetový obchod <strong>Worlds.sk</strong> je prevádzkovaný spoločnosťou:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-6 rounded-xl border border-slate-200 text-sm">
                <div>
                  <span className="text-xs text-slate-500 block uppercase font-bold">Obchodné meno</span>
                  <span className="font-bold text-slate-900 text-base">ETHOS Technology, s. r. o.</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block uppercase font-bold">Sídlo spoločnosti</span>
                  <span className="font-medium text-slate-800">Tatranská 6396/101, 974 11 Banská Bystrica</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block uppercase font-bold">Registrácia</span>
                  <span className="font-medium text-slate-800">OR Okresného súdu Banská Bystrica, Oddiel: Sro, Vložka č. 14751/S</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block uppercase font-bold">IČO / DIČ / IČ DPH</span>
                  <span className="font-medium text-slate-800">IČO: 44 099 207 | DIČ: 2022595311 | IČ DPH: SK2022595311</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block uppercase font-bold">Zákaznícka podpora (E-mail)</span>
                  <a href="mailto:info@worlds.sk" className="font-bold text-blue-600 hover:underline">info@worlds.sk</a>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block uppercase font-bold">Pracovná doba</span>
                  <span className="font-medium text-slate-800">Pondelok – Piatok: 08:00 – 17:00</span>
                </div>
              </div>
            </div>

            {/* ČLÁNOK 2 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center">02</span>
                <h2 className="text-xl font-bold text-slate-900">Vymedzenie základných pojmov</h2>
              </div>
              <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <strong className="text-slate-900 block mb-1">Spotrebiteľská zmluva</strong>
                  Každá kúpna zmluva uzatvorená na diaľku medzi Predávajúcim a Kupujúcim – spotrebiteľom prostredníctvom elektronického obchodu Worlds.sk.
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <strong className="text-slate-900 block mb-1">Kupujúci – Spotrebiteľ</strong>
                  Fyzická osoba, ktorá pri uzatváraní a plnení zmluvy nekoná v rámci predmetu svojej podnikateľskej činnosti, zamestnania alebo povolania v zmysle platného zákona č. 108/2024 Z. z. o ochrane spotrebiteľa.
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <strong className="text-slate-900 block mb-1">Tovar a elektronické objednávanie</strong>
                  Výrobky z oblasti IT, hardvéru, výpočtovej techniky, kancelárskej techniky a príslušenstva uvedené v katalógu internetového obchodu.
                </div>
              </div>
            </div>

            {/* ČLÁNOK 3 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center">03</span>
                <h2 className="text-xl font-bold text-slate-900">Postup vytvárania objednávky a vznik kúpnej zmluvy</h2>
              </div>
              <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-600 leading-relaxed">
                <li>Kupujúci si vyberie tovar v e-shope, zvolí požadované množstvo a kliknutím na tlačidlo „Pridať do košíka“ ho vloží do nákupného košíka.</li>
                <li>V nákupnom košíku si kupujúci zvolí spôsob doručenia (kuriér DPD/PPL, Slovenská pošta, osobný odber) a spôsob platby (platobná karta, prevod na účet, dobierka).</li>
                <li>Kupujúci vyplní identifikačné a doručovacie údaje potrebné pre riadne doručenie tovaru.</li>
                <li>Odoslaním objednávky s povinnosťou platby kupujúci potvrdzuje, že sa oboznámil s týmito Všeobecnými obchodnými podmienkami a Reklamačným poriadkom.</li>
                <li>Kúpna zmluva je uzatvorená momentom doručenia elektronického potvrdenia objednávky predávajúcim na e-mailovú adresu kupujúceho.</li>
              </ol>
            </div>

            {/* ČLÁNOK 4 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center">04</span>
                <h2 className="text-xl font-bold text-slate-900">Ceny tovaru, DPH a poplatky (SNC a AO)</h2>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Všetky predajné ceny tovaru na stránkach Worlds.sk sú uvádzané ako <strong>konečné vrátane 20% DPH</strong>, recyklačného poplatku (SNC) a autorského odvodu (AO).
              </p>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                <p>• <strong>Recyklačný poplatok (SNC):</strong> Zákonný poplatok za spätný odber a ekologickú likvidáciu elektroodpadu.</p>
                <p>• <strong>Autorský odvod (AO):</strong> Poplatok v zmysle Autorského zákona vzťahujúci sa na pamäťové médiá a zariadenia schopné záznamu.</p>
              </div>
            </div>

            {/* ČLÁNOK 5 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 font-black text-sm flex items-center justify-center">05</span>
                <h2 className="text-xl font-bold text-slate-900">Odstúpenie od zmluvy do 14 dní bez udania dôvodu</h2>
              </div>
              <div className="bg-emerald-50/60 p-5 rounded-xl border border-emerald-200 text-sm text-emerald-950 space-y-2">
                <div className="font-bold flex items-center gap-2 text-emerald-900">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  Právo spotrebiteľa na bezplatné odstúpenie od zmluvy
                </div>
                <p>
                  V zmysle zákona o ochrane spotrebiteľa má kupujúci – spotrebiteľ právo odstúpiť od kúpnej zmluvy uzavretej na diaľku do <strong>14 kalendárnych dní</strong> odo dňa prevzatia tovaru bez uvedenia dôvodu.
                </p>
              </div>

              <div className="text-sm text-slate-600 space-y-2 leading-relaxed">
                <p><strong>Postup pri vrátení tovaru:</strong></p>
                <ol className="list-decimal pl-5 space-y-1.5">
                  <li>Kupujúci zašle písomné oznámenie o odstúpení od zmluvy e-mailom na <a href="mailto:info@worlds.sk" className="text-blue-600 underline">info@worlds.sk</a> alebo poštou na adresu sídla.</li>
                  <li>Tovar zašle kupujúci na vlastné náklady najneskôr do 14 dní od oznámenia na adresu: <strong>ETHOS Technology, s.r.o., Tatranská 6396/101, 974 11 Banská Bystrica</strong>.</li>
                  <li>Tovar musí byť kompletný, čistý, nepoškodený, vrátane všetkého príslušenstva a pôvodného balenia.</li>
                  <li>Predávajúci vráti kupujúcemu všetky prijaté platby do 14 dní od doručenia vráteného tovaru rovnakým spôsobom, aký kupujúci použil pri platbe.</li>
                </ol>
              </div>
            </div>

            {/* ČLÁNOK 6 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center">06</span>
                <h2 className="text-xl font-bold text-slate-900">Alternatívne riešenie sporov (ARS) a orgán dozoru</h2>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                V prípade, že kupujúci – spotrebiteľ nie je spokojný so spôsobom, ktorým predávajúci vybavil jeho reklamáciu, má právo obrátiť sa na predávajúceho so žiadosťou o nápravu. Ak predávajúci odpovie zamietavo alebo neodpovie do 30 dní, spotrebiteľ má právo podať návrh na začatie alternatívneho riešenia sporu subjektu ARS (napr. Slovenská obchodná inšpekcia) alebo využiť platformu RSO na adrese: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">ec.europa.eu/consumers/odr</a>.
              </p>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                <p className="font-bold text-slate-900">Orgán dozoru:</p>
                <p>Slovenská obchodná inšpekcia (SOI)</p>
                <p>Inšpektorát SOI pre Banskobystrický kraj, Dolná 46, 974 00 Banská Bystrica 1</p>
                <p>Odbor výkonu dozoru, tel.: 048/412 49 69, <a href="https://www.soi.sk" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">www.soi.sk</a></p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PODNIKATELIA (B2B) */}
        {activeTab === 'b2b' && (
          <div className="space-y-6">
            <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-sm space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800 text-amber-400 rounded-full text-xs font-bold uppercase">
                <Building2 className="w-3.5 h-3.5" /> B2B Režim
              </div>
              <h2 className="text-xl font-bold">Všeobecné obchodné podmienky pre podnikateľov</h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Tieto obchodné podmienky sa vzťahujú na nákup tovaru právnickými osobami a fyzickými osobami – podnikateľmi (nákup na IČO). Zmluvný vzťah sa spravuje zákonom č. 513/1991 Zb. Obchodný zákonník v platnom znení.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900">1. Zmluvné strany a predmet zmluvy</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Predávajúcim je spoločnosť <strong>ETHOS Technology, s. r. o.</strong>, IČO: 44 099 207. Kupujúcim je podnikateľský subjekt, ktorý v objednávke uvedie svoje identifikačné údaje (IČO, DIČ, IČ DPH, sídlo firmy). Predmetom zmluvy je dodávka výpočtovej techniky, IT zariadení a príslušenstva.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900">2. Ceny, fakturácia a platobné podmienky</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600 leading-relaxed">
                <li>Pre podnikateľov sú ceny uvádzané bez DPH aj s DPH. Predávajúci vystaví riadnu daňovú faktúru so všetkými náležitosťami daňového dokladu.</li>
                <li>Úhrada sa vykonáva vopred online platobnou kartou, bankovým prevodom na základe proforma faktúry alebo dobierkou pri doručení.</li>
                <li>Pre stálych B2B partnerov a zmluvných odberateľov je možné dohodnúť individuálnu splatnosť faktúr.</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900">3. Dodacie lehoty a prechod nebezpečenstva škody</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Tovar je expedovaný priamo z centrálneho logistického skladu eD system a. s. prostredníctvom zmluvných kuriérskych služieb. Nebezpečenstvo škody na tovare prechádza na kupujúceho – podnikateľa momentom odovzdania tovaru prvému dopravcovi na prepravu.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900">4. Záruka a zodpovednosť za vady pri B2B</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Záručná doba pre kupujúcich – podnikateľov sa riadi záručnými podmienkami stanovenými jednotlivými výrobcami hardvéru (spravidla 12 až 36 mesiacov podľa typu zariadenia). Na zmluvné vzťahy podnikateľov sa nevzťahuje 14-dňové právo spotrebiteľa na odstúpenie od zmluvy bez udania dôvodu.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
