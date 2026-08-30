'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, MapPin, Building2, Clock, Send, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function KontaktPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-blue-600 flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Späť na domov
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-medium">Kontakt</span>
      </nav>

      <div className="space-y-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <Mail className="w-3.5 h-3.5" /> Sme tu pre vás
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Kontaktujte nás</h1>
          <p className="text-slate-500 text-sm mt-2">
            Máte otázku k produktom, potrebujete poradiť s výberom alebo preveriť stav objednávky?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Kontaktné informácie */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-600" /> Fakturačné údaje a sídlo
            </h2>
            
            <div className="space-y-4 text-sm text-slate-700">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <p className="font-bold text-slate-900 text-base">ETHOS Technology, s. r. o.</p>
                <p className="flex items-center gap-2 text-slate-600">
                  <MapPin className="w-4 h-4 text-slate-400" /> Tatranská 6396/101, 974 11 Banská Bystrica
                </p>
                <p className="text-xs text-slate-500 mt-2">Slovenská republika</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block">IČO:</span>
                  <span className="font-bold text-slate-900 text-sm">44 099 207</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block">DIČ:</span>
                  <span className="font-bold text-slate-900 text-sm">2022595311</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 col-span-2">
                  <span className="text-slate-500 block">IČ DPH:</span>
                  <span className="font-bold text-slate-900 text-sm">SK2022595311 (Platiteľ DPH)</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">E-mail pre objednávky a otázky:</span>
                    <a href="mailto:info@worlds.sk" className="font-bold text-slate-900 hover:text-blue-600">info@worlds.sk</a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Pracovná doba zákazníckej podpory:</span>
                    <span className="font-medium text-slate-900">Pondelok – Piatok: 08:00 – 17:00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Kontaktný formulár */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-slate-900">Napíšte nám správu</h2>
            <form className="space-y-4 text-sm" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-slate-700 font-medium mb-1">Vaše meno a priezvisko</label>
                <input
                  type="text"
                  placeholder="Ján Novák"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Váš e-mail</label>
                <input
                  type="email"
                  placeholder="jan.novak@example.sk"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Predmet správy</label>
                <input
                  type="text"
                  placeholder="Otázka k dostupnosti notebooku"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Správa</label>
                <textarea
                  rows={4}
                  placeholder="Napíšte nám vašu požiadavku..."
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Odoslať správu
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
