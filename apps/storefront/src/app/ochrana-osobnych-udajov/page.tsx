import { Metadata } from 'next';
import Link from 'next/link';
import { Lock, ArrowLeft, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ochrana osobných údajov (GDPR) | Worlds.sk',
  description: 'Zásady spracúvania a ochrany osobných údajov zákazníkov internetového obchodu Worlds.sk v zmysle GDPR.',
};

export default function OchranaOsobnychUdajovPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-blue-600 flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Späť na domov
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-medium">Ochrana osobných údajov</span>
      </nav>

      <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 shadow-sm space-y-8 text-slate-700 leading-relaxed">
        <div className="border-b border-slate-200 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <Lock className="w-3.5 h-3.5" /> GDPR & Súkromie
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Zásady ochrany osobných údajov (GDPR)</h1>
          <p className="text-slate-500 text-sm mt-2">Informácie o spracúvaní osobných údajov podľa Nariadenia EÚ 2016/679 (GDPR)</p>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">1. Prevádzkovateľ osobných údajov</h2>
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 text-sm space-y-1">
            <p><strong>Obchodné meno:</strong> ETHOS Technology, s. r. o.</p>
            <p><strong>Sídlo:</strong> Tatranská 6396/101, 974 11 Banská Bystrica, Slovenská republika</p>
            <p><strong>IČO:</strong> 44 099 207 | <strong>DIČ:</strong> 2022595311 | <strong>IČ DPH:</strong> SK2022595311</p>
            <p><strong>E-mail pre GDPR:</strong> info@worlds.sk</p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">2. Účely spracúvania a právne základy</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li><strong>Vybavenie objednávky a plnenie kúpnej zmluvy (čl. 6 ods. 1 písm. b) GDPR):</strong> Meno, priezvisko, dodacia adresa, fakturačná adresa, e-mail, telefónne číslo.</li>
            <li><strong>Plnenie zákonných účtovných a daňových povinností (čl. 6 ods. 1 písm. c) GDPR):</strong> Uchovávanie účtovných dokladov po dobu 10 rokov v zmysle zákona o účtovníctve.</li>
            <li><strong>Zákaznícka komunikácia a riešenie reklamácií:</strong> E-mailová a telefonická asistencia pri doručení tovaru.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">3. Príjemcovia a sprostredkovatelia osobných údajov</h2>
          <p className="text-sm">
            Osobné údaje poskytujeme výhradne overeným zmluvným partnerom nevyhnutným pre vybavenie vašej objednávky:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li><strong>Kuriérske a prepravné spoločnosti:</strong> DPD (Direct Parcel Distribution SK s.r.o.), PPL, Slovenská pošta, a.s.</li>
            <li><strong>Logistický a distribučný partner:</strong> eD system a. s. (pre zabezpečenie priameho dropshipping doručenia zo skladu).</li>
            <li><strong>Poskytovatelia platobných brán a banky.</strong></li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">4. Práva dotknutej osoby</h2>
          <p className="text-sm">
            Ako dotknutá osoba máte právo na: prístup k svojim údajom, opravu nesprávnych údajov, vymazanie údajov („právo na zabudnutie“), obmedzenie spracúvania, prenosnosť údajov a právo podať sťažnosť na Úrad na ochranu osobných údajov SR (Hraničná 12, Bratislava).
          </p>
        </section>
      </div>
    </div>
  );
}
