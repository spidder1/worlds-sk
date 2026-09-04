'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { ProductImage } from '@worlds/types';

export function ProductGallery({ images, title, brand, isInStock }: {
  images: ProductImage[];
  title: string;
  brand: string;
  isInStock: boolean;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = images[selectedIndex] || images[0];
  const primaryImage = selected?.url || '/product-placeholder.svg';

  return (
    <div className="space-y-4">
      <div className="group relative flex h-80 items-center justify-center overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 p-6 md:h-[400px]">
        <Image
          src={primaryImage}
          alt={selected?.altText || title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-black text-white shadow-md">{brand}</div>
        {isInStock ? <div className="absolute right-4 top-4 rounded-md bg-emerald-600 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">Skladom</div> : null}
      </div>

      {images.length > 1 ? (
        <div className="flex gap-3 overflow-x-auto pb-2" aria-label="Galéria obrázkov produktu">
          {images.map((image, index) => (
            <button
              key={image.id || image.url}
              type="button"
              onClick={() => setSelectedIndex(index)}
              aria-label={`Zobraziť obrázok ${index + 1}`}
              aria-pressed={index === selectedIndex}
              className={`h-20 w-20 flex-shrink-0 rounded-xl border bg-slate-50 p-2 transition-colors ${index === selectedIndex ? 'border-brand-600 ring-2 ring-brand-200' : 'border-slate-200 hover:border-brand-500'}`}
            >
              <Image src={image.url} alt={image.altText || `${title} obrázok ${index + 1}`} width={80} height={80} className="h-full w-full object-contain" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
