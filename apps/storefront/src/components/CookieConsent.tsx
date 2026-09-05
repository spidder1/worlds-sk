'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const CONSENT_KEY = 'worlds-cookie-consent-v1';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  useEffect(() => setVisible(window.localStorage.getItem(CONSENT_KEY) === null), []);
  if (!visible) return null;
  function save(value: 'necessary' | 'all') {
    window.localStorage.setItem(CONSENT_KEY, value);
    setVisible(false);
  }
  return <aside className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl" aria-label="Nastavenie cookies"><h2 className="font-bold text-slate-900">Súbory cookies</h2><p className="mt-2 text-sm leading-relaxed text-slate-600">Používame nevyhnutné cookies na fungovanie košíka a administrácie. Voliteľné cookies môžeme použiť iba s vaším súhlasom. Viac informácií nájdete v <Link href="/ochrana-osobnych-udajov" className="font-semibold text-brand-700 hover:underline">ochrane osobných údajov</Link>.</p><div className="mt-4 flex flex-wrap justify-end gap-2"><button type="button" onClick={() => save('necessary')} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">Iba nevyhnutné</button><button type="button" onClick={() => save('all')} className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white">Povoliť všetky</button></div></aside>;
}
