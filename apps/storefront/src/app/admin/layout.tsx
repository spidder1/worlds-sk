import { logoutAdmin } from './actions';

export const metadata = { robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-950 text-slate-100 shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-800 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Worlds.sk</p><h1 className="text-xl font-bold">Administrácia</h1></div>
        <form action={logoutAdmin}><button className="rounded-lg border border-slate-700 px-3 py-2 text-sm hover:bg-slate-800">Odhlásiť</button></form>
      </div>
      <div className="bg-slate-50 p-6 text-slate-900">{children}</div>
    </div>
  );
}
