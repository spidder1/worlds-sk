import React from 'react';
import Link from 'next/link';
import { getAllProducts, getCategories } from '../lib/catalog';
import { ProductCard } from '../components/ProductCard';
import { Sparkles, ArrowRight, Laptop, Cpu, Monitor, HardDrive, ShieldCheck, Zap, Server } from 'lucide-react';

export const revalidate = 60; // ISR revalidate every 60 seconds

export default async function HomePage() {
  const products = await getAllProducts();
  const categories = await getCategories();

  return (
    <div className="space-y-12">
      {/* Hero Banner */}
      <section className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-slate-900 via-brand-900 to-slate-900 text-white p-8 md:p-12 shadow-xl border border-slate-800">
        <div className="max-w-2xl relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 bg-brand-500/20 border border-brand-400/30 text-brand-300 text-xs font-semibold px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Driven E-Commerce & Direct eD Distribution
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Nová generácia nákupu <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">IT techniky</span>
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Priame napojenie na centrálne sklady distribútora eD system. Viac ako 70 000 produktov s overenými technickými parametrami a bleskovou logistikou.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/kategoria/notebooky"
              className="bg-brand-600 hover:bg-brand-500 text-white text-sm font-bold px-6 py-3 rounded-xl transition-colors flex items-center gap-2 shadow-lg shadow-brand-600/30"
            >
              Preskúmať notebooky
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/admin"
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-sm font-semibold px-5 py-3 rounded-xl transition-colors"
            >
              Katalóg & Quality Admin
            </Link>
          </div>
        </div>

        {/* Decorative background grid */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-15 pointer-events-none flex items-center justify-center">
          <Server className="w-96 h-96 text-brand-400" />
        </div>
      </section>

      {/* Top Categories Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Populárne kategórie</h2>
          <Link href="/kategoria/pocitace-a-notebooky" className="text-xs text-brand-600 hover:underline font-semibold flex items-center gap-1">
            Zobraziť všetky kategórie
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            href="/kategoria/notebooky"
            className="bg-white p-5 rounded-xl border border-slate-200 hover:border-brand-500 hover:shadow-md transition-all group flex flex-col items-center text-center"
          >
            <div className="bg-blue-50 text-brand-600 p-3 rounded-xl mb-3 group-hover:scale-110 transition-transform">
              <Laptop className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 group-hover:text-brand-600">Notebooky</h3>
            <p className="text-xs text-slate-500 mt-1">Pracovné, herné a ultrabooky</p>
          </Link>

          <Link
            href="/kategoria/procesory"
            className="bg-white p-5 rounded-xl border border-slate-200 hover:border-brand-500 hover:shadow-md transition-all group flex flex-col items-center text-center"
          >
            <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl mb-3 group-hover:scale-110 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 group-hover:text-emerald-600">Procesory</h3>
            <p className="text-xs text-slate-500 mt-1">Intel Core & AMD Ryzen</p>
          </Link>

          <Link
            href="/kategoria/monitory"
            className="bg-white p-5 rounded-xl border border-slate-200 hover:border-brand-500 hover:shadow-md transition-all group flex flex-col items-center text-center"
          >
            <div className="bg-purple-50 text-purple-600 p-3 rounded-xl mb-3 group-hover:scale-110 transition-transform">
              <Monitor className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 group-hover:text-purple-600">Monitory</h3>
            <p className="text-xs text-slate-500 mt-1">4K UHD, IPS a herné 144Hz+</p>
          </Link>

          <Link
            href="/kategoria/ssd-disky"
            className="bg-white p-5 rounded-xl border border-slate-200 hover:border-brand-500 hover:shadow-md transition-all group flex flex-col items-center text-center"
          >
            <div className="bg-amber-50 text-amber-600 p-3 rounded-xl mb-3 group-hover:scale-110 transition-transform">
              <HardDrive className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 group-hover:text-amber-600">SSD Disky</h3>
            <p className="text-xs text-slate-500 mt-1">M.2 NVMe PCIe 4.0 / 5.0</p>
          </Link>
        </div>
      </section>

      {/* Featured Products from Product Master */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Vybrané produkty z centrálneho skladu</h2>
            <p className="text-xs text-slate-500 mt-0.5">Produkty s overenou dostupnosťou a presnými špecifikáciami</p>
          </div>
          <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200">
            Skladom & k odoslaniu
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Trust & Technology Section */}
      <section className="bg-slate-100 rounded-2xl p-8 border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex gap-4 items-start">
          <div className="bg-white p-3 rounded-xl shadow-sm text-brand-600">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Real-time aktualizácia cien a skladu</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Ceny a skladové zásoby sa priebežne synchronizujú s centrálou eD system každú hodinu.
            </p>
          </div>
        </div>

        <div className="flex gap-4 items-start">
          <div className="bg-white p-3 rounded-xl shadow-sm text-emerald-600">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Presné parametre bez halucinácií</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Všetky špecifikácie sú validované priamo z produktového navigátora výrobcu a distribútora.
            </p>
          </div>
        </div>

        <div className="flex gap-4 items-start">
          <div className="bg-white p-3 rounded-xl shadow-sm text-purple-600">
            <Server className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">B2B & B2C Dropshipping pripravenosť</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Podpora priameho odosielania objednávok z veľkoskladu kuriérom PPL / DPD priamo k zákazníkovi.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
