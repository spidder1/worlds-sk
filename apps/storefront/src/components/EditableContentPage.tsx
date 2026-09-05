import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { EditableContentPage } from '../lib/content';

export function EditableContentPage({ page }: { page: EditableContentPage }) {
  const paragraphs = page.body.split(/\n\s*\n|\r?\n/).map((part) => part.trim()).filter(Boolean);
  return <div className="container mx-auto max-w-4xl px-4 py-12"><nav className="mb-6 flex items-center gap-2 text-sm text-slate-500"><Link href="/" className="flex items-center gap-1 hover:text-blue-600"><ArrowLeft className="h-4 w-4" /> Späť na domov</Link><span>/</span><span className="font-medium text-slate-900">{page.title}</span></nav><article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-12"><h1 className="text-3xl font-extrabold text-slate-900">{page.title}</h1><div className="mt-6 space-y-4 text-sm leading-7 text-slate-700">{paragraphs.map((paragraph, index) => <p key={`${page.slug}-${index}`}>{paragraph}</p>)}</div></article></div>;
}
