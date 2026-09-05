import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function AssistantPage() {
  return <main className="mx-auto max-w-4xl px-4 py-10"><div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Worlds.sk asistent</p><h1 className="mt-2 text-3xl font-black text-slate-900">Nájdite správny produkt</h1><p className="mt-2 text-slate-600">Napíšte požiadavku napríklad: „Tichý notebook s 16 GB RAM do 600 €“.</p><form action="/vyhladavanie" className="mt-6 flex gap-2"><input name="q" required className="flex-1 rounded-xl border border-slate-300 px-4 py-3" placeholder="Čo potrebujete?" /><button className="rounded-xl bg-brand-600 px-5 py-3 font-bold text-white">Hľadať v katalógu</button></form><p className="mt-4 text-sm text-slate-500">Pre konverzačné filtrovanie použite API <code>/api/chat</code>.</p><Link href="/produkty" className="mt-5 inline-block text-sm font-semibold text-brand-700 hover:underline">Prejsť na celý katalóg →</Link></div></main>;
}
