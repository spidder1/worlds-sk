'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Truck, ShieldCheck, CheckCircle2, ArrowRight, Home, ChevronRight, Lock } from 'lucide-react';

export default function CartPage() {
  const [isB2B, setIsB2B] = useState(false);
  const [shippingMethod, setShippingMethod] = useState<'176' | '177' | '180'>('176');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderSymbol, setOrderSymbol] = useState('');

  // Sample active cart item (e.g. ASUS ExpertBook)
  const cartItem = {
    code: 'ASU-NB-EXP15',
    title: 'ASUS ExpertBook B1 B1502CVA-BQ1234X i5-1335U 16GB 512GB 15.6" FHD W11P',
    partNumber: '90NX06Q1-M00AB0',
    priceWithVat: 689.0,
    priceWithoutVat: 574.17,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
  };

  const shippingCost = shippingMethod === '180' ? 0.0 : 4.90;
  const totalPriceWithVat = (cartItem.priceWithVat * cartItem.quantity) + shippingCost;
  const totalPriceWithoutVat = Math.round((totalPriceWithVat / 1.20) * 100) / 100;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const fakeSymbol = `ED-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderSymbol(fakeSymbol);
    setIsSubmitted(true);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-slate-900 flex items-center gap-1">
          <Home className="w-3.5 h-3.5" />
          Domov
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-semibold">Nákupný košík a Pokladňa</span>
      </nav>

      {isSubmitted ? (
        <div className="bg-white p-10 rounded-2xl border border-slate-200 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-black text-slate-900">Objednávka bola úspešne odoslaná!</h1>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Objednávka bola zaevidovaná pod číslom <span className="font-mono font-bold text-slate-900">{orderSymbol}</span> a postúpená na vybavenie do logistického centra eD system.
          </p>
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl max-w-md mx-auto text-xs text-slate-600 space-y-1 text-left">
            <div><strong>Doprava:</strong> Kuriér DPD / PPL B2C Dropship</div>
            <div><strong>Stav v eD API:</strong> <span className="text-emerald-600 font-bold">DONE (Order Created)</span></div>
            <div><strong>Predpokladané doručenie:</strong> do 24/48 hodín</div>
          </div>
          <div className="pt-4">
            <Link
              href="/"
              className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-6 py-3 rounded-xl inline-block"
            >
              Pokračovať v nákupe
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Left Column: Cart Items + Checkout Form */}
          <div className="md:col-span-2 space-y-6">
            {/* Cart Items */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-brand-600" />
                Položky v košíku (1)
              </h2>

              <div className="flex gap-4 items-center py-2">
                <div className="w-20 h-20 bg-slate-50 rounded-xl p-2 border border-slate-100 flex-shrink-0 flex items-center justify-center">
                  <img src={cartItem.image} alt={cartItem.title} className="max-h-full max-w-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-slate-400 font-mono">PN: {cartItem.partNumber}</div>
                  <h3 className="text-sm font-bold text-slate-900 line-clamp-2 leading-snug">{cartItem.title}</h3>
                  <div className="text-xs text-slate-500 mt-1">Počet: 1 ks</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-base font-black text-slate-900">{cartItem.priceWithVat.toFixed(2)} €</div>
                  <div className="text-[11px] text-slate-400">{cartItem.priceWithoutVat.toFixed(2)} € bez DPH</div>
                </div>
              </div>
            </div>

            {/* Checkout Form */}
            <form onSubmit={handleSubmitOrder} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-brand-600" />
                  Doručovacie a fakturačné údaje
                </h2>
                <div className="flex gap-2 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setIsB2B(false)}
                    className={`px-3 py-1 rounded-full ${!isB2B ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600'}`}
                  >
                    Fyzická osoba
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsB2B(true)}
                    className={`px-3 py-1 rounded-full ${isB2B ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600'}`}
                  >
                    Firma / B2B
                  </button>
                </div>
              </div>

              {isB2B && (
                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Názov firmy / Obchodné meno *</label>
                    <input required type="text" placeholder="Firma s.r.o." className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">IČO *</label>
                    <input required type="text" placeholder="12345678" className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">DIČ</label>
                    <input type="text" placeholder="2020123456" className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">IČ DPH (ak ste platca)</label>
                    <input type="text" placeholder="SK2020123456" className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs" />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Meno a priezvisko *</label>
                  <input required defaultValue="Ján Novák" type="text" className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">E-mail *</label>
                  <input required defaultValue="jan.novak@example.sk" type="email" className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Telefónne číslo *</label>
                  <input required defaultValue="+421 905 123 456" type="tel" className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Ulica a číslo domu *</label>
                  <input required defaultValue="Hlavná 123" type="text" className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mesto *</label>
                  <input required defaultValue="Bratislava" type="text" className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">PSČ *</label>
                  <input required defaultValue="811 01" type="text" className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs" />
                </div>
              </div>

              {/* Shipping Options */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Spôsob dopravy (eD Logistika)</h3>
                <div className="space-y-2">
                  <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-brand-500 cursor-pointer bg-slate-50">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingMethod === '176'}
                        onChange={() => setShippingMethod('176')}
                        className="text-brand-600"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900">Kuriér DPD / PPL B2C Dropshipping</div>
                        <div className="text-[11px] text-slate-500">Priame doručenie na adresu zákazníka zo skladu eD</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-900">4.90 €</span>
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-brand-500 cursor-pointer bg-slate-50">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingMethod === '177'}
                        onChange={() => setShippingMethod('177')}
                        className="text-brand-600"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900">Slovenská Pošta Balík</div>
                        <div className="text-[11px] text-slate-500">Doručenie na pobočku alebo adresu</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-900">4.90 €</span>
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-brand-500 cursor-pointer bg-slate-50">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingMethod === '180'}
                        onChange={() => setShippingMethod('180')}
                        className="text-brand-600"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900">Osobný odber na centrále</div>
                        <div className="text-[11px] text-slate-500">Vyzdvihnutie na výdajnom mieste</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-600">Zadarmo</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-black py-4 rounded-xl shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2 text-sm transition-all"
              >
                <span>Odoslať objednávku s povinnosťou platby</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Right Column: Order Summary Box */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 sticky top-24">
            <h3 className="text-base font-black text-slate-900 border-b border-slate-100 pb-3">
              Zhrnutie objednávky
            </h3>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Medzisúčet tovaru</span>
                <span className="font-semibold text-slate-900">{cartItem.priceWithVat.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between">
                <span>Doprava</span>
                <span className="font-semibold text-slate-900">{shippingCost === 0 ? 'Zadarmo' : `${shippingCost.toFixed(2)} €`}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Suma bez DPH</span>
                <span>{totalPriceWithoutVat.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>DPH (20%)</span>
                <span>{(totalPriceWithVat - totalPriceWithoutVat).toFixed(2)} €</span>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-3 flex justify-between items-baseline">
              <span className="text-sm font-black text-slate-900">Celkom na úhradu:</span>
              <span className="text-2xl font-black text-slate-900">{totalPriceWithVat.toFixed(2)} €</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-[11px] text-slate-500 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-700">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Bezpečný nákup & záruka
              </div>
              <p>Objednávka je okamžite prenášaná cez SOAP API metódu <code className="text-brand-600 font-mono">createNewOrderCustomer</code> do skladu eD system.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
