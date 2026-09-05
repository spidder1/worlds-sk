import Link from 'next/link';
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
      <nav className="border-b border-slate-800 bg-black px-6 py-4 text-sm" aria-label="Hlavne kategorie">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <AdminMenuGroup title="Prehľad" links={[
            ['/admin', 'Prehľad'],
            ['/admin/objednavky', 'Objednávky'],
          ]} />
          <AdminMenuGroup title="Katalóg" links={[
            ['/admin/produkty', 'Produkty'],
            ['/admin/kategorie', 'Kategórie'],
            ['/admin/atributy', 'Atribúty'],
            ['/admin/vyrobcovia', 'Výrobcovia'],
            ['/admin/kategorizacia', 'Kategorizácia'],
          ]} />
          <AdminMenuGroup title="Import a kvalita" links={[
            ['/admin/importy', 'Importy a synchronizácia'],
            ['/admin/karantena', 'Karanténa'],
            ['/admin/kvalita', 'Audit katalógu'],
            ['/admin/audit', 'Prevádzkový audit'],
          ]} />
          <AdminMenuGroup title="Nastavenia" links={[
            ['/admin/nastavenia', 'Ceny a pravidlá'],
            ['/admin/obsah', 'Obsah stránok'],
          ]} />
        </div>
      </nav>
      <div className="bg-slate-50 p-6 text-slate-900">{children}</div>
    </div>
  );
}

function AdminMenuGroup({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <section>
      <h2 className="mb-1 px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">{title}</h2>
      <div className="flex flex-wrap gap-1">
        {links.map(([href, label]) => (
          <Link key={href} className="rounded-lg px-2.5 py-1.5 font-medium text-slate-200 transition-colors hover:bg-slate-800 hover:text-white" href={href}>{label}</Link>
        ))}
      </div>
    </section>
  );
}
