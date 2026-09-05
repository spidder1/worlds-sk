import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getCategories, getFeaturedProducts, getManufacturers, getProductCount } from '../lib/catalog';
import { ProductCard } from '../components/ProductCard';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Server, Building2 } from 'lucide-react';

export const revalidate = 60; // ISR revalidate every 60 seconds

export default async function HomePage() {
  const [products, categories, productCount, manufacturers] = await Promise.all([
    getFeaturedProducts(8),
    getCategories(),
    getProductCount(),
    getManufacturers(),
  ]);

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
            Aktuálna ponuka IT techniky napojená na distribučný katalóg eD system, s priebežne synchronizovanými cenami a dostupnosťou.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/vyhladavanie"
              className="bg-brand-600 hover:bg-brand-500 text-white text-sm font-bold px-6 py-3 rounded-xl transition-colors flex items-center gap-2 shadow-lg shadow-brand-600/30"
            >
              Prezrieť {productCount.toLocaleString('sk-SK')} produktov
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Decorative background grid */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-15 pointer-events-none flex items-center justify-center">
          <Server className="w-96 h-96 text-brand-400" />
        </div>
      </section>

      {/* Manufacturer train */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Building2 className="w-5 h-5 text-brand-600" />
              Top Výrobcovia a Značky
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Vyberte si svojho obľúbeného výrobcu a prezrite si jeho kompletné portfolio</p>
          </div>
          <Link href="/vyhladavanie" className="text-xs text-brand-600 hover:underline font-semibold flex items-center gap-1">
            Všetci výrobcovia
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="manufacturer-marquee relative overflow-hidden rounded-2xl border border-slate-200 bg-white py-3 shadow-sm" aria-label="Výrobcovia a značky">
          <div className="manufacturer-marquee-track flex w-max items-center gap-3 hover:[animation-play-state:paused]">
            {[...manufacturers, ...manufacturers].map((brand, index) => (
              <Link
                key={`${brand.name}-${index}`}
                href={`/vyhladavanie?vyrobca=${encodeURIComponent(brand.name)}`}
                className="group flex h-16 w-40 shrink-0 items-center gap-3 rounded-xl border border-slate-100 bg-white px-4 transition-all hover:border-brand-400 hover:bg-brand-50"
                title={`${brand.name} — ${brand.count.toLocaleString('sk-SK')} produktov`}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-50 p-1.5 text-xs font-black text-slate-500 group-hover:bg-white group-hover:text-brand-600">
                  {brand.logoUrl ? <Image src={brand.logoUrl} alt={`${brand.name} logo`} width={40} height={40} className="h-full w-full object-contain" /> : brand.name.substring(0, 2).toUpperCase()}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-bold text-slate-900 group-hover:text-brand-600">{brand.name}</span>
                  <span className="block text-[10px] font-medium text-slate-400">{brand.count.toLocaleString('sk-SK')} produktov</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Accordion Section */}
      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-black tracking-tight text-slate-900">Všetky kategórie</h2>
            <p className="mt-1 text-xs text-slate-500">Celý IT katalóg prehľadne rozdelený do hlavných sekcií a podkategórií.</p>
          </div>
          <Link href="/vyhladavanie" className="flex flex-shrink-0 items-center gap-1 text-xs font-semibold text-brand-600 hover:underline">Celý katalóg <ArrowRight className="h-3.5 w-3.5" /></Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <article key={category.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <Link href={`/kategoria/${category.slug}`} className="font-black text-slate-900 hover:text-brand-700">{category.name}</Link>
              {category.subcategories?.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {category.subcategories.map((subcategory) => (
                    <Link key={subcategory.id} href={`/kategoria/${subcategory.slug}`} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-brand-50 hover:text-brand-700">{subcategory.name}</Link>
                  ))}
                </div>
              ) : <p className="mt-2 text-xs text-slate-500">Zobraziť produkty</p>}
            </article>
          ))}
        </div>
      </section>

      {/* Featured Products from Product Master */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Vybrané produkty z katalógu</h2>
            <p className="text-xs text-slate-500 mt-0.5">Produkty s dostupnosťou uvedenou v poslednej synchronizácii</p>
          </div>
          <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200">
            Evidované skladom
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
            <h3 className="font-bold text-slate-900 text-sm">Aktualizácia cien a skladu</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Katalóg zobrazuje cenu a dostupnosť z poslednej úspešnej synchronizácie s distribučným feedom.
            </p>
          </div>
        </div>

        <div className="flex gap-4 items-start">
          <div className="bg-white p-3 rounded-xl shadow-sm text-emerald-600">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Kontrolovaný produktový obsah</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Zobrazené parametre pochádzajú zo štruktúrovaných produktových dát a prechádzajú spracovaním importnej vrstvy.
            </p>
          </div>
        </div>

        <div className="flex gap-4 items-start">
          <div className="bg-white p-3 rounded-xl shadow-sm text-purple-600">
            <Server className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Príprava objednávkového napojenia</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Online objednávky a doprava budú sprístupnené až po dokončení a overení celého objednávkového toku.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
