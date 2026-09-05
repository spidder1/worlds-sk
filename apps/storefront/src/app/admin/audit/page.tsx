import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '../auth';
import { queryNeon } from '../../../lib/neon-client';
import { actionLabel, entityLabel, importModeLabel, reasonLabel, statusLabel } from '../../../lib/admin-labels';

export const dynamic = 'force-dynamic';

type LifecycleRow = {
  product_id: string;
  product_name: string | null;
  old_status: string | null;
  new_status: string;
  reason: string | null;
  changed_at: string;
};

type IssueRow = {
  source_key: string | null;
  issue_code: string;
  severity: string;
  message: string;
  created_at: string;
};

type OutboxRow = { status: string; count: string };
type AdminAuditRow = { action: string; entity_type: string; entity_id: string | null; created_at: string };

export default async function AdminAuditPage() {
  if (!(await isAdminAuthenticated())) redirect('/admin');

  const [lifecycle, issues, outbox, adminAudit, imports] = await Promise.all([
    queryNeon<LifecycleRow>(
      `SELECT h.product_id, COALESCE(NULLIF(p.name_b2c, ''), p.title) AS product_name,
              h.old_status, h.new_status, h.reason, h.changed_at
         FROM product_lifecycle_history h
         LEFT JOIN products p ON p.id = h.product_id
        ORDER BY h.changed_at DESC, h.id DESC
        LIMIT 50`,
    ),
    queryNeon<IssueRow>(
      `SELECT source_key, issue_code, severity, message, created_at
         FROM import_issues
        WHERE resolved = false
        ORDER BY created_at DESC, id DESC
        LIMIT 50`,
    ),
    queryNeon<OutboxRow>(
      `SELECT status, COUNT(*)::text AS count
         FROM outbox_events
        GROUP BY status
       ORDER BY status`,
    ),
    queryNeon<AdminAuditRow>(
      `SELECT action, entity_type, entity_id, created_at
         FROM admin_audit_log
        ORDER BY created_at DESC, id DESC
        LIMIT 50`,
    ),
    queryNeon<{ mode: string; status: string; started_at: string }>(
      `SELECT mode, status, started_at
         FROM sync_batches
        ORDER BY started_at DESC
        LIMIT 20`,
    ),
  ]);

  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold">Prevádzkový audit</h2>
        <p className="mt-1 text-sm text-slate-600">Zmeny životného cyklu produktov, otvorené importné problémy a outbox udalosti.</p>
      </div>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
        <h3 className="font-semibold">Outbox podľa stavu</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {outbox.length ? outbox.map((row) => (
            <span key={row.status} className="rounded-full bg-slate-100 px-3 py-1 text-sm">{statusLabel(row.status)}: {row.count}</span>
          )) : <span className="text-sm text-slate-500">Žiadne udalosti.</span>}
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
        <h3 className="font-semibold">Administrátorské rozhodnutia</h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-slate-200 text-xs uppercase text-slate-500"><tr><th className="py-2">Akcia</th><th>Typ</th><th>Objekt</th><th>Čas</th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {adminAudit.map((row, index) => <tr key={`${row.action}-${row.entity_id}-${row.created_at}-${index}`}><td className="py-2 font-medium">{actionLabel(row.action)}</td><td>{entityLabel(row.entity_type)}</td><td>{row.entity_id || '—'}</td><td className="text-slate-500">{new Date(row.created_at).toLocaleString('sk-SK')}</td></tr>)}
            </tbody>
          </table>
          {!adminAudit.length ? <p className="py-4 text-sm text-slate-500">Zatiaľ bez administrátorských zmien.</p> : null}
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
        <h3 className="font-semibold">Posledné zmeny produktov</h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-slate-200 text-xs uppercase text-slate-500"><tr><th className="py-2">Produkt</th><th>Stav</th><th>Dôvod</th><th>Čas</th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {lifecycle.map((row) => <tr key={`${row.product_id}-${row.changed_at}`}><td className="py-2"><div className="font-medium">{row.product_name || row.product_id}</div><div className="text-xs text-slate-500">{row.product_id}</div></td><td>{row.old_status ? statusLabel(row.old_status) : '—'} → {statusLabel(row.new_status)}</td><td>{row.reason ? reasonLabel(row.reason) : '—'}</td><td className="text-slate-500">{new Date(row.changed_at).toLocaleString('sk-SK')}</td></tr>)}
            </tbody>
          </table>
          {!lifecycle.length ? <p className="py-4 text-sm text-slate-500">Zatiaľ bez záznamov.</p> : null}
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
        <h3 className="font-semibold">Otvorené importné problémy</h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-slate-200 text-xs uppercase text-slate-500"><tr><th className="py-2">Zdroj</th><th>Závažnosť</th><th>Kód</th><th>Správa</th><th>Čas</th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {issues.map((row, index) => <tr key={`${row.source_key}-${row.issue_code}-${row.created_at}-${index}`}><td className="py-2">{row.source_key || '—'}</td><td>{statusLabel(row.severity)}</td><td>{statusLabel(row.issue_code)}</td><td>{row.message}</td><td className="text-slate-500">{new Date(row.created_at).toLocaleString('sk-SK')}</td></tr>)}
            </tbody>
          </table>
          {!issues.length ? <p className="py-4 text-sm text-emerald-700">Žiadne otvorené problémy.</p> : null}
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
        <h3 className="font-semibold">Posledné importy a synchronizácie</h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-slate-200 text-xs uppercase text-slate-500"><tr><th className="py-2">Synchronizácia</th><th>Stav</th><th>Spustené</th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {imports.map((row, index) => <tr key={`${row.mode}-${row.started_at}-${index}`}><td className="py-2 font-medium">{importModeLabel(row.mode)}</td><td>{statusLabel(row.status)}</td><td className="text-slate-500">{new Date(row.started_at).toLocaleString('sk-SK')}</td></tr>)}
            </tbody>
          </table>
          {!imports.length ? <p className="py-4 text-sm text-slate-500">Zatiaľ bez importov.</p> : null}
        </div>
      </section>
    </div>
  );
}
