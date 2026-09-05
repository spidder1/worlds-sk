import PDFDocument from 'pdfkit';
import { NextResponse } from 'next/server';
import { getNeonPool } from '../../../../../lib/neon-client';
import { isAdminAuthenticated } from '../../../../admin/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: 'Neautorizované.' }, { status: 401 });
  const { id } = await params;
  const pool = getNeonPool();
  const orders = await pool.query(`SELECT order_number, customer_name, customer_email, customer_ico, customer_dic, customer_ic_dph, shipping_address, subtotal, total, currency, created_at FROM orders WHERE id = $1 LIMIT 1`, [id]);
  if (!orders.rows.length) return NextResponse.json({ error: 'Objednávka neexistuje.' }, { status: 404 });
  const items = await pool.query(`SELECT sku, title, quantity, line_total, currency FROM order_items WHERE order_id = $1 ORDER BY id`, [id]);
  const order = orders.rows[0];
  const address = order.shipping_address || {};
  const vat = Number(order.total) - Number(order.subtotal);
  const document = new PDFDocument({ size: 'A4', margin: 50 });
  const chunks: Buffer[] = [];
  document.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
  const finished = new Promise<void>((resolve) => document.on('end', () => resolve()));
  document.fontSize(22).fillColor('#0f172a').text('FAKTÚRA', { align: 'right' });
  document.fontSize(10).fillColor('#475569').text('Worlds.sk · ETHOS Technology, s. r. o.', { align: 'right' });
  document.moveDown(2).fontSize(12).fillColor('#0f172a').text(`Číslo objednávky: ${order.order_number}`);
  document.fontSize(10).fillColor('#475569').text(`Dátum vystavenia: ${new Date(order.created_at).toLocaleDateString('sk-SK')}`);
  document.moveDown().fillColor('#0f172a').text('Odberateľ:').fontSize(10).fillColor('#334155').text(order.customer_name).text(order.customer_email).text(`${address.street || ''}, ${address.postalCode || ''} ${address.city || ''}`);
  if (order.customer_ico || order.customer_dic || order.customer_ic_dph) document.text(`IČO: ${order.customer_ico || '—'} · DIČ: ${order.customer_dic || '—'} · IČ DPH: ${order.customer_ic_dph || '—'}`);
  document.moveDown().fillColor('#0f172a').fontSize(11).text('Položky').moveDown(0.5);
  for (const item of items.rows) document.fontSize(9).fillColor('#334155').text(`${item.title} (${item.sku}) · ${item.quantity} ks · ${Number(item.line_total).toFixed(2)} ${item.currency}`);
  document.moveDown().fontSize(10).fillColor('#334155').text(`Medzisúčet bez DPH: ${Number(order.subtotal).toFixed(2)} ${order.currency}`).text(`DPH: ${vat.toFixed(2)} ${order.currency}`).fontSize(14).fillColor('#0f172a').text(`CELKOM: ${Number(order.total).toFixed(2)} ${order.currency}`);
  document.end();
  await finished;
  return new NextResponse(Buffer.concat(chunks), { status: 200, headers: { 'content-type': 'application/pdf', 'content-disposition': `attachment; filename="${order.order_number}.pdf"`, 'cache-control': 'private, no-store' } });
}
