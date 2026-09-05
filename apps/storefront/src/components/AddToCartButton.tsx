'use client';

import { useState } from 'react';
import { Check, ShoppingCart } from 'lucide-react';

export function AddToCartButton({ productId, compact = false }: { productId: string; compact?: boolean }) {
  const [busy, setBusy] = useState(false);
  const [added, setAdded] = useState(false);

  async function addToCart() {
    setBusy(true);
    try {
      let sessionToken = window.localStorage.getItem('worlds-cart-session') || '';
      if (!sessionToken) {
        const response = await fetch('/api/cart');
        const data = await response.json();
        sessionToken = data.sessionToken;
        window.localStorage.setItem('worlds-cart-session', sessionToken);
      }
      const response = await fetch('/api/cart', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ sessionToken, productId, quantity: 1 }) });
      if (!response.ok) throw new Error('cart request failed');
      setAdded(true);
      window.setTimeout(() => setAdded(false), 2500);
    } catch {
      window.alert('Produkt sa nepodarilo pridať do košíka. Skúste to znova.');
    } finally { setBusy(false); }
  }

  return <button type="button" onClick={addToCart} disabled={busy} aria-label={compact ? (added ? 'Pridané do košíka' : 'Pridať do košíka') : undefined} className={compact
    ? 'inline-flex items-center justify-center rounded-lg bg-emerald-600 p-2 text-white shadow-sm transition-colors hover:bg-emerald-700 disabled:opacity-60'
    : 'w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white font-extrabold py-4 px-6 rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-brand-600/30 transition-all text-base'}>
    {added ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
    {!compact && (busy ? 'Pridávam…' : added ? 'Pridané do košíka' : 'Pridať do košíka')}
  </button>;
}
