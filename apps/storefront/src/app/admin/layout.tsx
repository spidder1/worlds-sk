export const metadata = { robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-slate-900 shadow-sm">{children}</div>
  );
}
