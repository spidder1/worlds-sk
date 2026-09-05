'use client';

import { useState } from 'react';

export function CompanyLookupButton() {
  const [country, setCountry] = useState('SK');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  async function lookup() {
    const form = document.querySelector<HTMLFormElement>('form[data-checkout-form]');
    const ico = form?.elements.namedItem('customerIco') as HTMLInputElement | null;
    if (!ico?.value.trim()) { setMessage('Najprv zadajte IČO.'); return; }
    setLoading(true); setMessage('Overujem…');
    try {
      const response = await fetch('/api/company/lookup', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ country, ico: ico.value }) });
      const data = await response.json();
      if (!response.ok || data.status !== 'FOUND') { setMessage(data.status === 'UNAVAILABLE' ? 'Register je dočasne nedostupný.' : 'Firma sa nenašla.'); return; }
      for (const [name, value] of [['customerName', data.name], ['street', data.street], ['city', data.city], ['postalCode', data.postalCode], ['customerDic', data.dic], ['customerIcDph', data.icDph]] as const) {
        const input = form?.elements.namedItem(name) as HTMLInputElement | null;
        if (input && value) { input.value = String(value); input.dispatchEvent(new Event('input', { bubbles: true })); }
      }
      setMessage('Údaje firmy boli načítané.');
    } catch { setMessage('Register je dočasne nedostupný.'); } finally { setLoading(false); }
  }
  return <div className="flex flex-wrap items-center gap-2"><select aria-label="Krajina registra" value={country} onChange={(event) => setCountry(event.target.value)} className="rounded-lg border border-slate-200 px-2 py-2 text-sm"><option value="SK">SK</option><option value="CZ">CZ</option></select><button type="button" onClick={lookup} disabled={loading} className="rounded-lg border border-brand-200 px-3 py-2 text-xs font-semibold text-brand-700 disabled:opacity-60">{loading ? 'Overujem…' : 'Načítať firmu podľa IČO'}</button>{message ? <span className="text-xs text-slate-500" role="status">{message}</span> : null}</div>;
}
