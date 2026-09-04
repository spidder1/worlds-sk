'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

type CartItem = { product_id: string; quantity: number; title: string; slug: string; final_price: number; image_url: string | null };

export function CartClient() {
  const [sessionToken, setSessionToken] = useState('');
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  async function load(session?: string) { const r = await fetch(`/api/cart${session ? `?session=${encodeURIComponent(session)}` : ''}`); const data = await r.json(); if (data.sessionToken) { localStorage.setItem('worlds-cart-session', data.sessionToken); setSessionToken(data.sessionToken); } setItems(data.items || []); }
  useEffect(() => { const session = localStorage.getItem('worlds-cart-session') || ''; load(session).finally(() => setLoading(false)); }, []);
  const total = useMemo(() => items.reduce((sum, item) => sum + item.final_price * item.quantity, 0), [items]);
  async function remove(productId: string) { await fetch(`/api/cart?session=${encodeURIComponent(sessionToken)}&productId=${encodeURIComponent(productId)}`, { method: 'DELETE' }); await load(sessionToken); }
  if (loading) return <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500">Načítavam košík…</div>;
  if (!items.length) return <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center space-y-4"><h1 className="text-2xl font-black">Košík je prázdny</h1><p className="text-sm text-slate-600">Vyberte si produkt z katalógu.</p><Link href="/produkty" className="inline-block rounded-xl bg-brand-600 px-5 py-3 font-bold text-white">Prejsť do katalógu</Link></div>;
  return <div className="space-y-5">{items.map((item) => <div key={item.product_id} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4">{item.image_url ? <Image src={item.image_url} alt="" width={80} height={80} className="h-20 w-20 rounded-lg object-contain" /> : null}<div className="min-w-0 flex-1"><Link href={`/produkt/${item.slug}`} className="font-bold text-slate-900 hover:text-brand-700">{item.title}</Link><div className="mt-1 text-sm text-slate-500">{item.quantity} ks × {item.final_price.toFixed(2)} €</div></div><button type="button" onClick={() => remove(item.product_id)} className="text-xs font-semibold text-rose-600">Odstrániť</button></div>)}<div className="flex items-center justify-between rounded-2xl bg-slate-900 p-5 text-white"><span className="font-bold">Medzisúčet</span><span className="text-xl font-black">{total.toFixed(2)} €</span></div><p className="text-sm text-slate-500">Pokladňa a platba budú aktivované v ďalšej MVP etape.</p></div>;
}
