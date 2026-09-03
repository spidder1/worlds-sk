import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MasterProduct } from '@worlds/types';
import { CheckCircle2, AlertCircle, Eye } from 'lucide-react';

export function ProductCard({ product }: { product: MasterProduct }) {
  const primaryImg = product.images[0]?.url || '/product-placeholder.svg';

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group relative">
      {/* Quality Badge for Admin/Diagnostics */}
      <div className="absolute top-2 left-2 z-10">
        <span className="bg-slate-900/80 backdrop-blur-sm text-slate-100 text-[10px] font-bold px-2 py-0.5 rounded-md">
          {product.brand}
        </span>
      </div>

      {/* Product Image */}
      <Link href={`/produkt/${product.slug}`} className="block relative w-full h-48 bg-slate-50 overflow-hidden">
        <Image
          src={primaryImg}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Body Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category path / MPN */}
          <div className="text-[11px] text-slate-400 font-mono mb-1 truncate">
            PN: {product.mpn} {product.ean ? `| EAN: ${product.ean}` : ''}
          </div>

          {/* Title */}
          <Link href={`/produkt/${product.slug}`}>
            <h3 className="text-sm font-semibold text-slate-900 line-clamp-2 group-hover:text-brand-600 transition-colors mb-2 leading-snug">
              {product.title}
            </h3>
          </Link>

          {/* Key Attributes snippet */}
          {product.attributes && Object.keys(product.attributes).length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {Object.values(product.attributes).slice(0, 3).map((attr, idx) => (
                <span key={idx} className="bg-slate-100 text-slate-600 text-[10px] px-1.5 py-0.5 rounded font-medium">
                  {String(attr.value)}
                </span>
              ))}
            </div>
          )}
        </div>

        <div>
          {/* Stock Availability */}
          <div className="flex items-center gap-1.5 text-xs mb-3 font-medium">
            {product.isInStock ? (
              <span className="flex items-center gap-1 text-emerald-600">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {product.stockText || `Skladom ${product.stockCount} ks`}
              </span>
            ) : (
              <span className="flex items-center gap-1 text-amber-600">
                <AlertCircle className="w-3.5 h-3.5" />
                Na objednávku
              </span>
            )}
          </div>

          {/* Price Block */}
          <div className="flex items-end justify-between pt-2 border-t border-slate-100">
            <div>
              <div className="text-lg font-black text-slate-900 leading-none">
                {product.pricing.finalPrice.toFixed(2)} €
              </div>
              <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                {product.pricing.basePrice.toFixed(2)} € bez DPH
              </div>
            </div>

            <Link
              href={`/produkt/${product.slug}`}
              className="bg-brand-600 hover:bg-brand-700 text-white p-2 rounded-lg transition-colors flex items-center justify-center shadow-sm"
              title="Zobraziť detail"
            >
              <Eye className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
