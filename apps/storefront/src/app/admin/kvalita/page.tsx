import Link from 'next/link';
import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '../auth';
import { queryNeon } from '../../../lib/neon-client';

export const dynamic = 'force-dynamic';

type CountRow = { count: string };
type CategoryRow = { category_slug: string; count: string };

export default async function AdminQualityPage() {
  if (!(await isAdminAuthenticated())) redirect('/admin');
  const notebookSlugs = ['notebooky', 'herne-notebooky', 'firemne-notebooky', 'ultrabooky', '2v1-a-dotykove-notebooky'];
  const [lowQuality, lowConfidence, missingImages, missingPrice, missingAttrs, invalidBrands, notebookMismatch, categoryCounts] = await Promise.all([
    queryNeon<CountRow>('SELECT COUNT(*)::text AS count FROM products WHERE quality_score IS NOT NULL AND quality_score < 60'),
    queryNeon<CountRow>('SELECT COUNT(*)::text AS count FROM products WHERE category_confidence IS NOT NULL AND category_confidence < 0.85'),
    queryNeon<CountRow>("SELECT COUNT(*)::text AS count FROM products WHERE COALESCE(jsonb_array_length(images), 0) = 0"),
    queryNeon<CountRow>('SELECT COUNT(*)::text AS count FROM products WHERE final_price IS NULL OR final_price <= 0'),
    queryNeon<CountRow>("SELECT COUNT(*)::text AS count FROM products WHERE attributes IS NULL OR attributes = '{}'::jsonb"),
    queryNeon<CountRow>("SELECT COUNT(*)::text AS count FROM products WHERE brand IS NULL OR brand = '' OR brand ~ '[<>\\[\\]]' OR brand = 'Unbranded'"),
    queryNeon<CountRow>(`SELECT COUNT(*)::text AS count FROM products WHERE category_slug = ANY($1::text[]) AND title !~* '(notebook|laptop|\\bntb\\b|macbook|thinkpad|ideapad|chromebook|probook|elitebook|latitude|vivobook|zenbook|aspire|yoga|legion|rog|tuf)'`, [notebookSlugs]),
    queryNeon<CategoryRow>('SELECT category_slug, COUNT(*)::text AS count FROM products GROUP BY category_slug ORDER BY COUNT(*) DESC LIMIT 25'),
  ]);
  const checks = [
    ['Nízka kvalita (<60)', lowQuality[0]?.count],
    ['Kategorizácia s istotou <85%', lowConfidence[0]?.count],
    ['Bez obrázka', missingImages[0]?.count],
    ['Bez predajnej ceny', missingPrice[0]?.count],
    ['Bez atribútov', missingAttrs[0]?.count],
    ['Nečistý výrobca', invalidBrands[0]?.count],
    ['Podozrivý produkt v notebookoch', notebookMismatch[0]?.count],
  ];
  return <div className="mx-auto max-w-6xl space-y-6"><div><h2 className="text-2xl font-bold">Audit kvality katalógu</h2><p className="mt-1 text-sm text-slate-600">Kontrolné dotazy nad celým katalógom. Čísla sú diagnostika, nie automatické odstránenie produktov.</p></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{checks.map(([label, value]) => <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-3xl font-bold">{value || '0'}</p></div>)}</div><section className="rounded-2xl border border-slate-200 bg-white p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div><h3 className="font-bold">Najväčšie kategórie</h3><p className="text-xs text-slate-500">Pre detail použite Produkty a vyhľadávanie.</p></div><Link href="/admin/produkty" className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white">Otvoriť produkty</Link></div><div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{categoryCounts.map((row) => <div key={row.category_slug} className="flex justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm"><span className="truncate pr-2">{row.category_slug}</span><strong>{row.count}</strong></div>)}</div></section></div>;
}
