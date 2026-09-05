'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const CONSENT_KEY = 'worlds-cookie-consent-v2';
type Preferences = { necessary: true; analytics: boolean; marketing: boolean };

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  useEffect(() => setVisible(window.localStorage.getItem(CONSENT_KEY) === null), []);
  if (!visible) return null;
  function save(preferences: Preferences) {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(preferences));
    window.dispatchEvent(new CustomEvent('worlds-cookie-consent', { detail: preferences }));
    setVisible(false);
  }
  return <aside className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl" aria-label="Nastavenie cookies"><h2 className="font-bold text-slate-900">Súbory cookies</h2><p className="mt-2 text-sm leading-relaxed text-slate-600">Nevyhnutné cookies používame na fungovanie košíka a administrácie. Analytické a marketingové cookies zapneme iba s vaším súhlasom. Viac informácií nájdete v <Link href="/ochrana-osobnych-udajov" className="font-semibold text-brand-700 hover:underline">ochrane osobných údajov</Link>.</p>{customizing ? <div className="mt-4 space-y-3 rounded-xl bg-slate-50 p-4"><label className="flex items-center justify-between gap-4 text-sm"><span><strong>Analytické cookies</strong><small className="block text-slate-500">Pomáhajú nám zlepšovať výkon stránky.</small></span><input type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} /></label><label className="flex items-center justify-between gap-4 text-sm"><span><strong>Marketingové cookies</strong><small className="block text-slate-500">Umožňujú meranie kampaní a relevantné ponuky.</small></span><input type="checkbox" checked={marketing} onChange={(event) => setMarketing(event.target.checked)} /></label></div> : null}<div className="mt-4 flex flex-wrap justify-end gap-2"><button type="button" onClick={() => save({ necessary: true, analytics: false, marketing: false })} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">Iba nevyhnutné</button>{customizing ? <button type="button" onClick={() => save({ necessary: true, analytics, marketing })} className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white">Uložiť výber</button> : <><button type="button" onClick={() => setCustomizing(true)} className="rounded-lg border border-brand-200 px-4 py-2 text-sm font-semibold text-brand-700">Nastaviť cookies</button><button type="button" onClick={() => save({ necessary: true, analytics: true, marketing: true })} className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white">Povoliť všetky</button></>}</div></aside>;
}
