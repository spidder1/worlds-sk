import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getProductBySlug } from '../../../lib/catalog';
import { ProductDescription } from '../../../components/ProductDescription';
import { AddToCartButton } from '../../../components/AddToCartButton';
import { ProductGallery } from '../../../components/ProductGallery';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Home,
  Layers,
  Award,
  Cpu,
  HardDrive,
  Monitor,
  Tag
} from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: 'Produkt nenájdený | Worlds.sk' };
  }

  return {
    title: product.seoTitle || `${product.title} | Worlds.sk`,
    description: product.seoDescription || product.supplierDescription?.slice(0, 155),
    alternates: {
      canonical: `https://worlds.sk/produkt/${product.slug}`,
    },
    openGraph: {
      title: product.title,
      description: product.seoDescription,
      images: product.images.map((img) => ({ url: img.url, alt: img.altText || product.title })),
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Group attributes into clean categories for presentation
  const allAttrs = Object.values(product.attributes || {});

  const cpuAttrs = allAttrs.filter((a) =>
    ['cpu_family', 'cpu_model', 'processor_model', 'cpu_cores', 'processor_frequency'].includes(a.code)
  );
  const memoryStorageAttrs = allAttrs.filter((a) =>
    ['ram_gb', 'ram_size_gb', 'ram_type', 'ram_frequency_mhz', 'ssd_gb', 'storage_capacity_gb', 'hdd_capacity_gb', 'storage_type'].includes(a.code)
  );
  const displayGpuAttrs = allAttrs.filter((a) =>
    ['screen_size_inch', 'display_diagonal_inch', 'display_resolution', 'panel_type', 'refresh_rate_hz', 'gpu_model', 'graphics_card', 'vram_gb'].includes(a.code)
  );
  const otherAttrs = allAttrs.filter(
    (a) =>
      !cpuAttrs.includes(a) &&
      !memoryStorageAttrs.includes(a) &&
      !displayGpuAttrs.includes(a) &&
      !['brand', 'mpn', 'warranty_months'].includes(a.code)
  );

  // Schema.org Product JSON-LD
  const productJsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.title,
    image: product.images.map((img) => img.url),
    description: product.supplierDescription || product.seoDescription,
    sku: product.sku,
    mpn: product.mpn,
    gtin13: product.ean || undefined,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
  };

  return (
    <div className="space-y-8">
      {/* Schema.org JSON-LD for Google Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto pb-1">
        <Link href="/" className="hover:text-slate-900 flex items-center gap-1 font-medium">
          <Home className="w-3.5 h-3.5 text-slate-400" />
          Domov
        </Link>
        {product.categoryHierarchy.map((catName, idx) => (
          <React.Fragment key={idx}>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="text-slate-700 font-medium truncate">{catName}</span>
          </React.Fragment>
        ))}
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
        <span className="text-slate-900 font-bold truncate max-w-[240px]">{product.title}</span>
      </nav>

      {/* Product Hero Section (Gallery + Purchase Box) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
        {/* Gallery */}
        <ProductGallery images={product.images} title={product.title} brand={product.brand} isInStock={product.isInStock} />

        {/* Purchase & Details Box */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Identifiers & Brand */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-mono">
              <span className="bg-slate-100 px-2 py-0.5 rounded font-semibold text-slate-700">SKU: {product.sku}</span>
              <span>•</span>
              <span>PartNumber: <strong className="text-slate-800">{product.mpn}</strong></span>
              {product.ean && (
                <>
                  <span>•</span>
                  <span>EAN: {product.ean}</span>
                </>
              )}
            </div>

            <h1 className="text-xl md:text-2xl lg:text-3xl font-black text-slate-900 leading-tight">
              {product.title}
            </h1>

            {/* Quality & Origin Badge */}
            <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-700">
              <Award className="w-4 h-4 text-brand-600" />
              <span>Distribučný katalóg eD system</span>
              <span className="text-slate-300">|</span>
              <span className="text-emerald-700 font-bold">Údaje z distribučného feedu</span>
            </div>

            {/* Stock Status Box */}
            <div>
              {product.isInStock ? (
                <div className="flex items-center gap-2.5 text-sm font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <div>
                    <div>{product.stockText || `Skladom ${product.stockCount} ks`}</div>
                    <div className="text-xs font-normal text-emerald-700">Dostupnosť bola potvrdená poslednou synchronizáciou skladu</div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2.5 text-sm font-bold text-amber-800 bg-amber-50 border border-amber-200 px-4 py-2.5 rounded-xl">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <div>
                    <div>Na objednávku u dodávateľa</div>
                    <div className="text-xs font-normal text-amber-700">Dostupnosť overujeme pri spracovaní objednávky</div>
                  </div>
                </div>
              )}
            </div>

            {/* Price Card */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                  {product.pricing.finalPrice.toFixed(2)} €
                </span>
                <span className="text-xs text-slate-500 font-bold uppercase">s DPH ({product.pricing.vatRate}%)</span>
              </div>
              <div className="text-xs text-slate-600 space-y-1">
                <div>Cena bez DPH: <span className="font-bold text-slate-800">{product.pricing.basePrice.toFixed(2)} €</span></div>
                {(product.pricing.supplierFees.garbageFee > 0 || product.pricing.supplierFees.authorFee > 0) && (
                  <div className="text-[11px] text-slate-400">
                    Vrátane recyklačného poplatku (SNC): {product.pricing.supplierFees.garbageFee} € a autorského poplatku (AO): {product.pricing.supplierFees.authorFee} €
                  </div>
                )}
              </div>
            </div>

            {/* Purchase CTA */}
            <div className="pt-2">
              <AddToCartButton productId={product.id} />
            </div>
          </div>

          {/* Value Badges */}
          <div className="grid grid-cols-3 gap-3 border-t border-slate-100 pt-5 text-xs text-slate-700 font-medium">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-brand-600 flex-shrink-0" />
              <span>Dostupnosť podľa skladu</span>
            </div>
            {Boolean(product.warrantyMonths) && (
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Záruka podľa feedu: {product.warrantyMonths} mesiacov</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-purple-600 flex-shrink-0" />
              <span>14 dní na vrátenie</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description & Structured Technical Specifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Rich HTML Description */}
        <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
          <h2 className="text-xl font-black text-slate-900 border-b border-slate-100 pb-4">
            Popis produktu
          </h2>
          <ProductDescription
            content={product.enrichedDescription || product.supplierDescription}
            fallbackText="Podrobný technický popis pre tento produkt pripravujeme."
          />
        </div>

        {/* Structured Technical Attributes Cards */}
        <div className="space-y-6">
          {/* Main Specifications Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-brand-600" />
              Základné parametre
            </h3>

            <div className="divide-y divide-slate-100 text-xs">
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-slate-500 font-medium">Výrobca</span>
                <span className="text-slate-900 font-bold">{product.brand}</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-slate-500 font-medium">Model / MPN</span>
                <span className="text-slate-900 font-mono font-bold">{product.mpn}</span>
              </div>
              {product.ean && (
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-slate-500 font-medium">EAN kód</span>
                  <span className="text-slate-900 font-mono">{product.ean}</span>
                </div>
              )}
              {Boolean(product.warrantyMonths) && (
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Záruka uvedená vo feede</span>
                  <span className="text-emerald-700 font-bold">{product.warrantyMonths} mesiacov</span>
                </div>
              )}
            </div>
          </div>

          {/* CPU Specifications */}
          {cpuAttrs.length > 0 && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2.5 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-brand-600" />
                Procesor a výkon
              </h4>
              <div className="divide-y divide-slate-100 text-xs">
                {cpuAttrs.map((attr, idx) => (
                  <div key={idx} className="py-2 flex justify-between">
                    <span className="text-slate-500 font-medium">{attr.name}</span>
                    <span className="text-slate-900 font-bold">{String(attr.value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Memory & Storage Specifications */}
          {memoryStorageAttrs.length > 0 && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2.5 flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-brand-600" />
                Pamäť a úložisko
              </h4>
              <div className="divide-y divide-slate-100 text-xs">
                {memoryStorageAttrs.map((attr, idx) => (
                  <div key={idx} className="py-2 flex justify-between">
                    <span className="text-slate-500 font-medium">{attr.name}</span>
                    <span className="text-slate-900 font-bold">{String(attr.value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Display & GPU Specifications */}
          {displayGpuAttrs.length > 0 && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2.5 flex items-center gap-2">
                <Monitor className="w-4 h-4 text-brand-600" />
                Displej a grafika
              </h4>
              <div className="divide-y divide-slate-100 text-xs">
                {displayGpuAttrs.map((attr, idx) => (
                  <div key={idx} className="py-2 flex justify-between">
                    <span className="text-slate-500 font-medium">{attr.name}</span>
                    <span className="text-slate-900 font-bold">{String(attr.value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other Extracted Specifications */}
          {otherAttrs.length > 0 && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2.5 flex items-center gap-2">
                <Tag className="w-4 h-4 text-brand-600" />
                Ostatné špecifikácie
              </h4>
              <div className="divide-y divide-slate-100 text-xs max-h-60 overflow-y-auto pr-1">
                {otherAttrs.map((attr, idx) => (
                  <div key={idx} className="py-2 flex justify-between">
                    <span className="text-slate-500 font-medium">{attr.name}</span>
                    <span className="text-slate-900 font-semibold">{String(attr.value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
