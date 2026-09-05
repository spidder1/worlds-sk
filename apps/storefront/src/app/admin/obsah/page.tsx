import { queryNeon } from '../../../lib/neon-client';
import { isAdminAuthenticated } from '../auth';
import { upsertContentPage } from '../actions';

const pageSlugs = ['o-nas', 'kontakt', 'doprava-a-platba', 'obchodne-podmienky', 'reklamacny-poriadok', 'ochrana-osobnych-udajov'];
type ContentRow = { slug: string; title: string; body: string; seo_title: string | null; seo_description: string | null };

export default async function AdminContentPage({ searchParams }: { searchParams: Promise<{ slug?: string }> }) {
  if (!(await isAdminAuthenticated())) return <p>Prihláste sa cez administračný vstup.</p>;
  const selectedSlug = (await searchParams).slug && pageSlugs.includes((await searchParams).slug as string) ? (await searchParams).slug as string : pageSlugs[0];
  const rows = await queryNeon<ContentRow>('SELECT slug, title, body, seo_title, seo_description FROM content_pages WHERE slug = ANY($1::text[]) ORDER BY slug', [pageSlugs]);
  const page = rows.find((row) => row.slug === selectedSlug) ?? { slug: selectedSlug, title: selectedSlug, body: '', seo_title: null, seo_description: null };
  return <div className="mx-auto max-w-4xl space-y-6"><div><h2 className="text-2xl font-bold">Editovateľný obsah</h2><p className="mt-1 text-sm text-slate-600">Upravujte texty informačných stránok bez zásahu do kódu. Každý nový riadok sa zobrazí ako samostatný odsek.</p></div>
    <div className="flex flex-wrap gap-2">{pageSlugs.map((slug) => <a key={slug} href={`/admin/obsah?slug=${slug}`} className={`rounded-lg px-3 py-2 text-sm ${slug === selectedSlug ? 'bg-slate-900 text-white' : 'bg-slate-200'}`}>{rows.find((row) => row.slug === slug)?.title ?? slug}</a>)}</div>
    <form action={upsertContentPage} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><input type="hidden" name="slug" value={page.slug} /><label className="block text-sm font-semibold">Názov<input name="title" defaultValue={page.title} className="mt-1 w-full rounded-lg border p-2 font-normal" /></label><label className="block text-sm font-semibold">Obsah<textarea name="body" rows={18} defaultValue={page.body} className="mt-1 w-full rounded-lg border p-3 font-normal" placeholder="Text stránky…" /></label><div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold">SEO titulok<input name="seo_title" defaultValue={page.seo_title ?? ''} className="mt-1 w-full rounded-lg border p-2 font-normal" /></label><label className="text-sm font-semibold">SEO popis<input name="seo_description" defaultValue={page.seo_description ?? ''} className="mt-1 w-full rounded-lg border p-2 font-normal" /></label></div><button className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">Uložiť stránku</button></form>
  </div>;
}
