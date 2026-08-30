import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, FileText, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Všeobecné obchodné podmienky (VOP) | Worlds.sk',
  description: 'Všeobecné obchodné podmienky internetového obchodu Worlds.sk prevádzkovaného spoločnosťou ETHOS Technology, s. r. o.',
};

export default function ObchodnePodmienkyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-blue-600 flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Späť na domov
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-medium">Obchodné podmienky</span>
      </nav>

      <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 shadow-sm space-y-8 text-slate-700 leading-relaxed">
        <div className="border-b border-slate-200 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <FileText className="w-3.5 h-3.5" /> Právne informácie
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Všeobecné obchodné podmienky (VOP)</h1>
          <p className="text-slate-500 text-sm mt-2">Platné a účinné od 1. januára 2025</p>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">1. Základné ustanovenia a prevádzkovateľ</h2>
          <p>
            Tieto Všeobecné obchodné podmienky (ďalej len „VOP“) upravujú práva a povinnosti zmluvných strán vyplývajúce z kúpnej zmluvy uzatvorenej medzi predávajúcim a kupujúcim prostredníctvom internetového obchodu <strong>Worlds.sk</strong>.
          </p>
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-2 text-sm">
            <p className="font-bold text-slate-900">Predávajúci a prevádzkovateľ e-shopu:</p>
            <p><strong>Obchodné meno:</strong> ETHOS Technology, s. r. o.</p>
            <p><strong>Sídlo:</strong> Tatranská 6396/101, 974 11 Banská Bystrica, Slovenská republika</p>
            <p><strong>IČO:</strong> 44 099 207</p>
            <p><strong>DIČ:</strong> 2022595311</p>
            <p><strong>IČ DPH:</strong> SK2022595311 (Platiteľ DPH)</p>
            <p><strong>Zápis v OR:</strong> Okresný súd Banská Bystrica, Oddiel: Sro, Vložka číslo: 14751/S</p>
            <p><strong>E-mail:</strong> info@worlds.sk | <strong>Tel.:</strong> +421 905 000 000</p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">2. Vymedzenie pojmov</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li><strong>Kupujúci – Spotrebiteľ:</strong> Fyzická osoba, ktorá pri uzatváraní a plnení spotrebiteľskej zmluvy nekoná v rámci predmetu svojej podnikateľskej činnosti, zamestnania alebo povolania (podľa zákona č. 108/2024 Z. z.).</li>
            <li><strong>Kupujúci – Podnikateľ (B2B):</strong> Právnická osoba alebo fyzická osoba – podnikateľ, ktorá nakupuje tovar na účely svojho podnikania (zadá IČO, DIČ). Vzťahy sa spravujú Obchodným zákonníkom SR.</li>
            <li><strong>Tovar:</strong> Produkty informačných technológií, výpočtová technika, komponenty, spotrebná elektronika a príslušenstvo uvedené v ponuke e-shopu.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">3. Objednávka tovaru a uzatvorenie zmluvy</h2>
          <p className="text-sm">
            Návrhom na uzatvorenie kúpnej zmluvy je umiestnenie ponúkaného tovaru na stránkach Worlds.sk. Kúpna zmluva vzniká odoslaním objednávky kupujúcim a jej elektronickým prijatím predávajúcim (potvrdenie objednávky na e-mail kupujúceho).
          </p>
          <p className="text-sm">
            Predávajúci si vyhradzuje právo zrušiť objednávku alebo jej časť v prípade, že sa tovar už nevyrába, nedodáva distribútorom (eD system) alebo sa výrazným spôsobom zmenila cena dodávateľa tovaru.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">4. Ceny tovaru a poplatky</h2>
          <p className="text-sm">
            Všetky ceny tovaru na stránkach sú uvádzané ako <strong>konečné vrátane 20% DPH</strong>, recyklačného poplatku (SNC) a autorského odvodu (AO), ak sa na daný tovar vzťahujú. Predávajúci je platiteľom DPH.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">5. Právo spotrebiteľa na odstúpenie od zmluvy (14 dní)</h2>
          <p className="text-sm">
            Spotrebiteľ má právo odstúpiť od kúpnej zmluvy bez uvedenia dôvodu v lehote <strong>14 kalendárnych dní</strong> odo dňa prevzatia tovaru v zmysle zákona o ochrane spotrebiteľa pri zmluvách uzavretých na diaľku.
          </p>
          <p className="text-sm">
            Tovar musí byť vrátený kompletný, nepoškodený, vrátane všetkého príslušenstva a pôvodnej dokumentácie. Náklady na vrátenie tovaru znáša kupujúci.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">6. Orgán dozoru</h2>
          <div className="bg-slate-50 p-4 rounded-xl text-sm border border-slate-200">
            <p className="font-semibold text-slate-900">Slovenská obchodná inšpekcia (SOI)</p>
            <p>Inšpektorát SOI pre Banskobystrický kraj</p>
            <p>Dolná 46, 974 00 Banská Bystrica 1</p>
            <p>Odbor výkonu dozoru, tel. č. 048/412 49 69, <a href="https://www.soi.sk" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">www.soi.sk</a></p>
          </div>
        </section>
      </div>
    </div>
  );
}
