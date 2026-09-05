import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '../auth';
import { resolveQuarantine } from '../actions';
import { queryNeon } from '../../../lib/neon-client';

export const dynamic = 'force-dynamic';

type QuarantineRow = {
  id: string;
  supplier_code: string;
  pro_id: string | null;
  reason: string;
  error_details: string;
  resolved: boolean;
  created_at: string;
};

export default async function AdminQuarantinePage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  if (!(await isAdminAuthenticated())) redirect('/admin');
  const params = await searchParams;
  const rows = await queryNeon<QuarantineRow>(`SELECT id, supplier_code, pro_id, reason, error_details, resolved, created_at
    FROM product_quarantine ORDER BY resolved ASC, created_at DESC LIMIT 200`);
  return <div className="mx-auto max-w-6xl space-y-6"><div><h2 className="text-2xl font-bold">Karanténa importu</h2><p className="mt-1 text-sm text-slate-600">Neplatné alebo neúplné záznamy z feedu, ktoré sa nezapísali do katalógu.</p></div>{params.saved ? <p className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">Záznam bol označený ako vyriešený.</p> : null}<div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white"><table className="min-w-full text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-4 py-3">Dátum</th><th className="px-4 py-3">Kód / ProId</th><th className="px-4 py-3">Dôvod</th><th className="px-4 py-3">Detail</th><th className="px-4 py-3">Stav</th></tr></thead><tbody className="divide-y divide-slate-100">{rows.map((row) => <tr key={row.id}><td className="whitespace-nowrap px-4 py-3 text-xs text-slate-500">{new Date(row.created_at).toLocaleString('sk-SK')}</td><td className="px-4 py-3 font-mono text-xs">{row.supplier_code}<br /><span className="text-slate-500">{row.pro_id || '—'}</span></td><td className="px-4 py-3 font-semibold">{row.reason}</td><td className="max-w-md px-4 py-3 text-slate-600">{row.error_details}</td><td className="px-4 py-3">{row.resolved ? <span className="text-emerald-700">Vyriešené</span> : <form action={resolveQuarantine} className="flex items-center gap-2"><input type="hidden" name="id" value={row.id} /><input name="note" placeholder="Poznámka" className="w-32 rounded border px-2 py-1 text-xs" /><button className="rounded bg-slate-900 px-2 py-1 text-xs font-semibold text-white">Vyriešiť</button></form>}</td></tr>)}</tbody></table>{rows.length === 0 ? <p className="p-8 text-center text-slate-500">Karanténa je prázdna.</p> : null}</div></div>;
}
