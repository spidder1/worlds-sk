import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getProductBySlug, getAllProducts } from '../../../lib/catalog';
import { ProductDescription } from '../../../components/ProductDescription';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  ShoppingCart,
  ChevronRight,
  Home,
  Info,
  Layers,
  Award,
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

  const primaryImage = product.images[0]?.url || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80';

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
    offers: {
      '@type': 'Offer',
      url: `https://worlds.sk/produkt/${product.slug}`,
      priceCurrency: product.pricing.currency,
      price: product.pricing.finalPrice.toFixed(2),
      itemCondition: 'https://schema.org/NewCondition',
      availability: product.isInStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/PreOrder',
      seller: {
        '@type': 'Organization',
        name: 'Worlds.sk',
      },
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
      <nav className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto">
        <Link href="/" className="hover:text-slate-900 flex items-center gap-1">
          <Home className="w-3.5 h-3.5" />
          Domov
        </Link>
        {product.categoryHierarchy.map((catName, idx) => (
          <React.Fragment key={idx}>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-700 font-medium truncate">{catName}</span>
          </React.Fragment>
        ))}
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-bold truncate max-w-[200px]">{product.title}</span>
      </nav>

      {/* Product Hero Section (Gallery + Purchase Info) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex items-center justify-center h-80 md:h-96 relative overflow-hidden">
            <img
              src={primaryImage}
              alt={product.title}
              className="max-h-full max-w-full object-contain"
            />
            <div className="absolute top-3 left-3 bg-slate-900/80 text-white text-xs font-bold px-2.5 py-1 rounded-md">
              {product.brand}
            </div>
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <div
                  key={idx}
                  className="w-16 h-16 bg-slate-50 border border-slate-200 rounded-lg p-1.5 flex-shrink-0 cursor-pointer hover:border-brand-500"
                >
                  <img src={img.url} alt={img.altText || ''} className="w-full h-full object-contain" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Purchase & Details Box */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
              <span>SKU: {product.sku}</span>
              <span>•</span>
              <span>Part Number: {product.mpn}</span>
              {product.ean && (
                <>
                  <span>•</span>
                  <span>EAN: {product.ean}</span>
                </>
              )}
            </div>

            <h1 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">
              {product.title}
            </h1>

            {/* Quality Score snippet */}
            <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full text-xs font-semibold text-slate-700">
              <Award className="w-3.5 h-3.5 text-brand-600" />
              <span>Kvalita dát: {product.qualityScore.total}/100</span>
              <span className="text-slate-400">|</span>
              <span className="text-emerald-600 font-bold">100% overené distribútorom</span>
            </div>

            {/* Stock Availability */}
            <div className="pt-2">
              {product.isInStock ? (
                <div className="flex items-center gap-2 text-sm font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{product.stockText || `Skladom ${product.stockCount} ks na centrále eD`}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3.5 py-2 rounded-xl">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>Dostupné u dodávateľa na objednávku</span>
                </div>
              )}
            </div>

            {/* Price Box */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-slate-900">
                  {product.pricing.finalPrice.toFixed(2)} €
                </span>
                <span className="text-xs text-slate-500 font-semibold">s DPH ({product.pricing.vatRate}%)</span>
              </div>
              <div className="text-xs text-slate-600 space-y-0.5">
                <div>Cena bez DPH: <span className="font-semibold text-slate-800">{product.pricing.basePrice.toFixed(2)} €</span></div>
                {(product.pricing.supplierFees.garbageFee > 0 || product.pricing.supplierFees.authorFee > 0) && (
                  <div className="text-[11px] text-slate-400">
                    Vrátane recyklačného poplatku (SNC): {product.pricing.supplierFees.garbageFee} € a autorského poplatku (AO): {product.pricing.supplierFees.authorFee} €
                  </div>
                )}
              </div>
            </div>

            {/* Purchase CTA */}
            <div className="flex gap-3 pt-2">
              <Link
                href="/kosik"
                className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-brand-600/30 transition-all text-sm"
              >
                <ShoppingCart className="w-5 h-5" />
                Vložiť do košíka
              </Link>
            </div>
          </div>

          {/* Value Badges */}
          <div className="grid grid-cols-3 gap-3 border-t border-slate-100 pt-4 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-brand-600 flex-shrink-0" />
              <span>Doručenie do 24/48h</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Záruka {product.warrantyMonths} mesiacov</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-purple-600 flex-shrink-0" />
              <span>14 dní na vrátenie</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description & Technical Specifications */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Description */}
        <div className="md:col-span-2 bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3">
            Popis produktu
          </h2>
          <ProductDescription
            content={product.enrichedDescription || product.supplierDescription}
            fallbackText="Podrobný technický popis pre tento produkt pripravujeme."
          />
        </div>

        {/* Technical Attributes Table */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
            <Layers className="w-4 h-4 text-brand-600" />
            Parametre a špecifikácie
          </h3>

          <div className="divide-y divide-slate-100 text-xs">
            <div className="py-2 flex justify-between">
              <span className="text-slate-500 font-medium">Výrobca</span>
              <span className="text-slate-900 font-bold">{product.brand}</span>
            </div>
            <div className="py-2 flex justify-between">
              <span className="text-slate-500 font-medium">Kód výrobcu (MPN)</span>
              <span className="text-slate-900 font-mono font-semibold">{product.mpn}</span>
            </div>
            {product.ean && (
              <div className="py-2 flex justify-between">
                <span className="text-slate-500 font-medium">EAN</span>
                <span className="text-slate-900 font-mono">{product.ean}</span>
              </div>
            )}
            <div className="py-2 flex justify-between">
              <span className="text-slate-500 font-medium">Záruka</span>
              <span className="text-slate-900 font-semibold">{product.warrantyMonths} mesiacov</span>
            </div>
            {product.dimensions?.weightKg && (
              <div className="py-2 flex justify-between">
                <span className="text-slate-500 font-medium">Hmotnosť</span>
                <span className="text-slate-900">{product.dimensions.weightKg} kg</span>
              </div>
            )}
            {Object.values(product.attributes || {}).map((attr, idx) => (
              <div key={idx} className="py-2 flex justify-between">
                <span className="text-slate-500 font-medium">{attr.name}</span>
                <span className="text-slate-900 font-semibold">{String(attr.value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
