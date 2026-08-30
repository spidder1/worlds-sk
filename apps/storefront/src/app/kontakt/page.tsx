'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Mail,
  MapPin,
  Building2,
  Clock,
  Send,
  ArrowLeft,
  CheckCircle2,
  Phone,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';

export default function KontaktPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
          <span className="text-slate-900 font-semibold">Kontakt</span>
        </nav>

        {/* Hero Header */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 md:p-12 shadow-sm mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/60 rounded-full blur-3xl -z-10 transform translate-x-1/3 -translate-y-1/3 pointer-events-none" />
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-blue-100">
            <Mail className="w-4 h-4" /> Zákaznícke centrum Worlds.sk
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Kontaktujte nás
          </h1>
          <p className="text-slate-600 text-base mt-3 max-w-3xl leading-relaxed">
            Potrebujete poradiť s výberom notebooku, overiť kompatibilitu komponentov alebo zistiť stav vašej objednávky? Náš tím je tu pre vás.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Ľavý stĺpec: Fakturačné a kontaktné údaje */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <Building2 className="w-5 h-5 text-blue-600" /> Fakturačné údaje a sídlo
            </h2>

            <div className="space-y-4 text-sm">
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <span className="font-extrabold text-slate-900 text-base block">ETHOS Technology, s. r. o.</span>
                <p className="flex items-start gap-2 text-slate-600 text-sm">
                  <MapPin className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Tatranská 6396/101, 974 11 Banská Bystrica, Slovenská republika</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-xs text-slate-500 font-semibold block">IČO</span>
                  <span className="font-bold text-slate-900 text-sm">44 099 207</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-xs text-slate-500 font-semibold block">DIČ</span>
                  <span className="font-bold text-slate-900 text-sm">2022595311</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 col-span-2">
                  <span className="text-xs text-slate-500 font-semibold block">IČ DPH</span>
                  <span className="font-bold text-slate-900 text-sm">SK2022595311 (Platiteľ DPH)</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3.5 p-3.5 bg-blue-50/50 rounded-xl border border-blue-100">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block font-medium">E-mail pre objednávky a otázky</span>
                    <a href="mailto:info@worlds.sk" className="font-bold text-slate-900 hover:text-blue-600 transition-colors">
                      info@worlds.sk
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-100">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block font-medium">Pracovná doba podpory</span>
                    <span className="font-bold text-slate-900">Pondelok – Piatok: 08:00 – 17:00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pravý stĺpec: Kontaktný formulár */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Napíšte nám správu</h2>
              <p className="text-xs text-slate-500 mt-1">Odpovedáme spravidla do niekoľkých hodín.</p>
            </div>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="font-bold text-emerald-900 text-lg">Ďakujeme za vašu správu!</h3>
                <p className="text-xs text-emerald-700 leading-relaxed">
                  Vaša správa bola úspešne odoslaná na naše zákaznícke oddelenie. Čoskoro sa vám ozveme.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-emerald-800 font-bold underline hover:no-underline pt-2"
                >
                  Odoslať ďalšiu správu
                </button>
              </div>
            ) : (
              <form className="space-y-4 text-sm" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1 text-xs uppercase tracking-wider">
                    Meno a priezvisko *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ján Novák"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1 text-xs uppercase tracking-wider">
                    E-mailová adresa *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jan.novak@example.sk"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1 text-xs uppercase tracking-wider">
                    Predmet
                  </label>
                  <input
                    type="text"
                    placeholder="Otázka k notebooku alebo objednávke"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1 text-xs uppercase tracking-wider">
                    Vaša správa *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Dobrý deň, chcel by som sa opýtať na..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 text-sm"
                >
                  <Send className="w-4 h-4" /> Odoslať správu
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
