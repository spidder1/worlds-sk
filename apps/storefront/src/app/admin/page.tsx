import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getImporter } from '../../lib/catalog';
import {
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Database,
  Brain,
  Sliders,
  ChevronRight,
  Home,
  FileCheck,
  TrendingUp,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Catalog Quality & AI Review Dashboard | Worlds.sk Admin',
  robots: { index: false, follow: false },
};

export const revalidate = 0; // always dynamic for admin

export default async function AdminDashboardPage() {
  const importer = await getImporter();
  const repo = importer.getRepository();
  const stats = await repo.getStats();
  const products = await repo.getAllProducts();
  const quarantine = await repo.getQuarantineRecords();
  const runs = await repo.getImportRuns();

  const needsReviewProducts = products.filter((p) => p.reviewStatus === 'NEEDS_REVIEW');
  const autoApprovedProducts = products.filter((p) => p.reviewStatus === 'AUTO_APPROVED');

  return (
    <div className="space-y-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-slate-900 flex items-center gap-1">
          <Home className="w-3.5 h-3.5" />
          Domov
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-semibold">Katalóg & AI Quality Admin</span>
      </nav>

      {/* Admin Title & Sync Controls */}
      <div className="bg-slate-900 text-white p-6 md:p-8 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-brand-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Brain className="w-4 h-4" />
            Worlds Commerce Platform v1.0.0
          </div>
          <h1 className="text-2xl md:text-3xl font-black">Catalog Quality & AI Review Dashboard</h1>
          <p className="text-slate-400 text-xs mt-1">
            Monitorovanie kvality dát z eD system SOAP web service a riadenie AI kategorizácie.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl text-xs">
            <span className="text-slate-400">eD Web Service:</span>{' '}
            <span className="text-emerald-400 font-bold">Online (v4.4.17)</span>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase">Celkovo produktov</div>
          <div className="text-3xl font-black text-slate-900 mt-2">{stats.totalProducts}</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {stats.inStockProducts} skladom
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase">Priemerné Quality Score</div>
          <div className="text-3xl font-black text-brand-600 mt-2">{stats.averageQualityScore}/100</div>
          <div className="text-[11px] text-slate-400 mt-1">
            Cieľ $\ge$ 80 pre indexáciu
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase">Vyžaduje kontrolu (AI)</div>
          <div className="text-3xl font-black text-amber-500 mt-2">{stats.needsReviewCount}</div>
          <div className="text-[11px] text-amber-600 font-semibold mt-1">
            Confidence &lt; 85% alebo chýba EAN
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase">Karanténa (Chyby)</div>
          <div className="text-3xl font-black text-rose-500 mt-2">{stats.quarantinedCount}</div>
          <div className="text-[11px] text-rose-600 font-semibold mt-1">
            Chýbajúce MPN / nulové ceny
          </div>
        </div>
      </div>

      {/* Product Master Quality Breakdown Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-brand-600" />
              Prehľad spracovaných produktov v Product Master
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Normalizované záznamy pripravené pre storefront, Google Merchant feed a vyhľadávač.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Kód / SKU</th>
                <th className="p-3">Názov produktu</th>
                <th className="p-3">Značka</th>
                <th className="p-3">Taxonómia (Kategória)</th>
                <th className="p-3">Nákup / Predaj s DPH</th>
                <th className="p-3">Sklad</th>
                <th className="p-3">Quality Score</th>
                <th className="p-3">AI Confidence</th>
                <th className="p-3">Stav</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-mono font-bold text-brand-700">
                    <Link href={`/produkt/${p.slug}`} className="hover:underline">
                      {p.sku}
                    </Link>
                  </td>
                  <td className="p-3 max-w-xs truncate" title={p.title}>
                    <Link href={`/produkt/${p.slug}`} className="hover:text-brand-600 font-semibold">
                      {p.title}
                    </Link>
                  </td>
                  <td className="p-3">{p.brand}</td>
                  <td className="p-3">
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px]">
                      {p.categoryHierarchy[p.categoryHierarchy.length - 1]}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="font-bold">{p.pricing.finalPrice.toFixed(2)} €</div>
                    <div className="text-[10px] text-slate-400">{p.pricing.supplierCost.toFixed(2)} € (nákup)</div>
                  </td>
                  <td className="p-3">
                    <span className="font-bold text-emerald-600">{p.stockCount} ks</span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-12 bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full ${
                            p.qualityScore.total >= 80 ? 'bg-emerald-500' : p.qualityScore.total >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                          }`}
                          style={{ width: `${p.qualityScore.total}%` }}
                        />
                      </div>
                      <span className="font-bold">{p.qualityScore.total}/100</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="font-mono text-emerald-700 font-bold">
                      {Math.round((p.aiEnrichment?.confidence || 0) * 100)}%
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full text-[10px] font-bold">
                      {p.reviewStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Review Queue Section (Section 6 & 23 in Spec) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-600" />
              Schvaľovací front (AI Review Queue)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Produkty, pri ktorých AI vyhodnotila nejednoznačnú kategóriu alebo chýbajúce parametre.
            </p>
          </div>
        </div>

        {needsReviewProducts.length === 0 ? (
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-center text-xs text-slate-500">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            Všetky produkty boli úspešne automaticky schválené bez potreby manuálneho zásahu.
          </div>
        ) : (
          <div className="space-y-3">
            {needsReviewProducts.map((p) => (
              <div key={p.id} className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold text-slate-900">{p.title}</div>
                  <div className="text-[11px] text-slate-600 mt-1">
                    AI Návrh: <span className="font-semibold">{p.categoryHierarchy.join(' > ')}</span> (Confidence: {Math.round((p.aiEnrichment?.confidence || 0) * 100)}%)
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-emerald-700">
                    Schváliť návrh
                  </button>
                  <button className="bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-slate-300">
                    Zmeniť kategóriu
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quarantine & Error Log */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-600" />
              Karanténa a chybové záznamy
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Záznamy z importu s nulovou cenou, chýbajúcim MPN alebo poškodeným XML, ktoré neboli publikované.
            </p>
          </div>
        </div>

        {quarantine.length === 0 ? (
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-center text-xs text-slate-500">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            Žiadne chybné záznamy v karanténe. Všetky dodávateľské dáta spĺňajú validačné pravidlá.
          </div>
        ) : (
          <div className="space-y-2">
            {quarantine.map((q) => (
              <div key={q.id} className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs flex justify-between">
                <div>
                  <span className="font-bold text-rose-800">[{q.reason}]</span> {q.errorDetails} (Kód: {q.supplierCode})
                </div>
                <span className="text-slate-400 font-mono">{q.createdAt}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
