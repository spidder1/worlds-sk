import { Metadata } from 'next';
import Link from 'next/link';
import { Truck, CreditCard, ArrowLeft, PackageCheck, Banknote, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Doprava a platba | Worlds.sk',
  description: 'Prehľad možností doručenia kuriérom DPD/PPL, Slovenská pošta, osobný odber a bezpečné spôsoby platby na Worlds.sk.',
};

export default function DopravaAPlatbaPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-blue-600 flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Späť na domov
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-medium">Doprava a platba</span>
      </nav>

      <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 shadow-sm space-y-10 text-slate-700 leading-relaxed">
        <div className="border-b border-slate-200 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <Truck className="w-3.5 h-3.5" /> Doručenie a úhrada
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Možnosti dopravy a platby</h1>
          <p className="text-slate-500 text-sm mt-2">Spoľahlivé doručenie priamo z centrále eD system a bezpečné platby</p>
        </div>

        {/* Doprava */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Truck className="w-6 h-6 text-blue-600" /> Spôsoby doručenia
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-slate-900">Kuriér DPD / PPL (Priamo na adresu)</h3>
                <span className="text-sm font-bold text-blue-600">4,90 €</span>
              </div>
              <p className="text-xs text-slate-600">
                Najrýchlejšie doručenie priamo k vašim dverám. Pri objednávke tovaru skladom do 14:00 expedujeme v ten istý pracovný deň (doručenie 24–48h).
              </p>
            </div>

            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-slate-900">Slovenská pošta – Balík na poštu</h3>
                <span className="text-sm font-bold text-blue-600">3,90 €</span>
              </div>
              <p className="text-xs text-slate-600">
                Doručenie na vašu spádovú pobočku Slovenskej pošty alebo do BalíkoBOXu.
              </p>
            </div>

            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-slate-900">Osobný odber Banská Bystrica</h3>
                <span className="text-sm font-bold text-emerald-600">ZADARMO</span>
              </div>
              <p className="text-xs text-slate-600">
                Po obdržaní potvrdzujúcej SMS/e-mailu si tovar vyzdvihnete na adrese prevádzky v Banskej Bystrici.
              </p>
            </div>

            <div className="p-5 bg-blue-50/50 rounded-xl border border-blue-200 space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-slate-900">Doprava ZADARMO pri nákupe nad 300 €</h3>
                <span className="text-sm font-bold text-emerald-600">0,00 €</span>
              </div>
              <p className="text-xs text-slate-600">
                Pri každej objednávke s hodnotou nad 300 € s DPH máte dopravu kuriérom úplne zadarmo.
              </p>
            </div>
          </div>
        </section>

        {/* Platba */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-blue-600" /> Možnosti platby
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <CreditCard className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-slate-900">Platba kartou online</h3>
              <p className="text-xs text-slate-600">Okamžitá platba cez zabezpečenú platobnú bránu (Visa, Mastercard, Apple Pay, Google Pay). <strong>Poplatok: 0,00 €</strong></p>
            </div>

            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <Banknote className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-slate-900">Bankový prevod</h3>
              <p className="text-xs text-slate-600">Prevod na účet v Tatra banke. Tovar expedujeme po pripísaní platby. <strong>Poplatok: 0,00 €</strong></p>
            </div>

            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <PackageCheck className="w-5 h-5 text-purple-600" />
              <h3 className="font-bold text-slate-900">Dobierka</h3>
              <p className="text-xs text-slate-600">Platba v hotovosti alebo kartou kuriérovi pri prevzatí balíka. <strong>Poplatok: 1,50 €</strong></p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
