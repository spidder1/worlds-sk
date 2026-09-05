import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '../auth';
import { queueSupplierOrder, updateOrderStatus } from '../actions';
import { queryNeon } from '../../../lib/neon-client';

export const dynamic = 'force-dynamic';
const statusLabels: Record<string, string> = { NEW: 'Nová', PROCESSING: 'Spracováva sa', SHIPPED: 'Odoslaná', COMPLETED: 'Dokončená', CANCELLED: 'Zrušená' };
const paymentLabels: Record<string, string> = { PENDING: 'Čaká na platbu', PAID: 'Zaplatená', FAILED: 'Neúspešná', REFUNDED: 'Vrátená' };
type Order = { id: string; order_number: string; customer_name: string; customer_email: string; customer_type: string; customer_ico: string | null; customer_dic: string | null; customer_ic_dph: string | null; total: string; currency: string; status: string; payment_status: string; payment_method: string; supplier_order_status: string; supplier_order_symbol: string | null; supplier_order_error: string | null; created_at: string };

export default async function AdminOrders({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  if (!(await isAdminAuthenticated())) redirect('/admin');
  const params = await searchParams;
  const orders = await queryNeon<Order>(`SELECT id, order_number, customer_name, customer_email, COALESCE(customer_type, 'PRIVATE') AS customer_type, customer_ico, customer_dic, customer_ic_dph, total, currency, status, payment_status, payment_method, COALESCE(supplier_order_status, 'NOT_SENT') AS supplier_order_status, supplier_order_symbol, supplier_order_error, created_at FROM orders ORDER BY created_at DESC LIMIT 200`);
  return <div>
    <h2 className="text-2xl font-bold">Objednávky</h2>
    <p className="mt-1 text-sm text-slate-600">Prehľad objednávok, platieb a odoslania dodávateľovi.</p>
    {params.saved ? <p className="mt-4 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">Objednávka bola aktualizovaná.</p> : null}
    <div className="mt-6 space-y-4">
      {orders.map((order) => <article key={order.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div><h3 className="font-bold"><a href={`/api/orders/${order.id}/invoice`} className="hover:text-brand-700">{order.order_number}</a></h3><p className="mt-1 text-sm text-slate-600">{order.customer_name} · {order.customer_email}</p><p className="text-xs text-slate-500">{order.customer_type === 'LEGAL' ? `Právnická osoba · IČO ${order.customer_ico || '—'} · DIČ ${order.customer_dic || '—'} · IČ DPH ${order.customer_ic_dph || '—'}` : 'Súkromná osoba'}</p></div>
          <div className="text-right"><p className="text-lg font-black">{Number(order.total).toFixed(2)} {order.currency}</p><p className="text-xs text-slate-500">{new Date(order.created_at).toLocaleString('sk-SK')}</p><a href={`/api/orders/${order.id}/invoice`} className="mt-1 inline-block text-xs font-semibold text-brand-700 hover:underline">Stiahnuť PDF faktúru</a></div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 text-xs"><span className="rounded-full bg-slate-100 px-2 py-1">{statusLabels[order.status] || order.status}</span><span className="rounded-full bg-slate-100 px-2 py-1">{paymentLabels[order.payment_status] || order.payment_status}</span><span className="rounded-full bg-slate-100 px-2 py-1">eD: {order.supplier_order_status}</span></div>
        <form action={updateOrderStatus} className="mt-4 flex flex-wrap items-end gap-3"><input type="hidden" name="id" value={order.id} /><label className="text-xs font-semibold">Stav<select name="status" defaultValue={order.status} className="mt-1 block rounded-lg border p-2 text-sm">{Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label><label className="text-xs font-semibold">Platba<select name="payment_status" defaultValue={order.payment_status} className="mt-1 block rounded-lg border p-2 text-sm">{Object.entries(paymentLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label><span className="pb-2 text-xs text-slate-500">{order.payment_method === 'COD' ? 'Dobierka' : order.payment_method === 'CARD' ? 'Platba kartou' : 'Bankový prevod'}</span><button className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white">Uložiť stav</button></form>
        {order.payment_status === 'PAID' && order.supplier_order_status !== 'SENT' ? <form action={queueSupplierOrder} className="mt-2"><input type="hidden" name="id" value={order.id} /><button className="rounded-lg border border-amber-300 px-3 py-2 text-sm font-semibold text-amber-800">Zaradiť na odoslanie do eD</button></form> : null}
        {order.supplier_order_symbol ? <p className="mt-2 text-xs text-emerald-700">eD objednávka: {order.supplier_order_symbol}</p> : null}{order.supplier_order_error ? <p className="mt-2 text-xs text-rose-700">eD chyba: {order.supplier_order_error}</p> : null}
      </article>)}
      {orders.length === 0 ? <p className="rounded-xl bg-white p-8 text-center text-slate-500">Zatiaľ neexistujú žiadne objednávky.</p> : null}
    </div>
  </div>;
}
