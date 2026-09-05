import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MasterProduct } from '@worlds/types';
import { CheckCircle2, AlertCircle, Eye } from 'lucide-react';
import { ProductImage } from './ProductImage';
import { AddToCartButton } from './AddToCartButton';

export function ProductCard({ product }: { product: MasterProduct }) {
  const primaryImg = product.images[0]?.url || '/product-placeholder.svg';

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group relative">
      {/* Manufacturer identity: show the verified logo, otherwise the name. */}
      <div className="absolute left-2 top-2 z-10 flex min-h-8 max-w-[9rem] items-center justify-center rounded-md border border-slate-200 bg-white/95 px-2 shadow-sm backdrop-blur-sm">
        {product.manufacturerLogoUrl ? (
          <Image
            src={product.manufacturerLogoUrl}
            alt={`${product.brand} logo`}
            width={56}
            height={24}
            className="max-h-6 max-w-[7rem] object-contain"
          />
        ) : (
          <span className="truncate text-[10px] font-bold text-slate-700">{product.brand}</span>
        )}
      </div>

      {/* Product Image */}
      <Link href={`/produkt/${product.slug}`} className="block relative w-full h-48 bg-slate-50 overflow-hidden">
        <ProductImage
          src={primaryImg}
          alt={product.title}
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

            <div className="flex items-center gap-2">
              <Link
                href={`/produkt/${product.slug}`}
                className="inline-flex items-center justify-center rounded-lg bg-brand-600 p-2 text-white shadow-sm transition-colors hover:bg-brand-700"
                title="Zobraziť detail"
                aria-label="Zobraziť detail produktu"
              >
                <Eye className="w-4 h-4" />
              </Link>
              <AddToCartButton productId={product.id} compact />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
