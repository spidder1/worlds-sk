'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductImageProps {
  src?: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
}

export function ProductImage({ src, alt, sizes, className, priority = false }: ProductImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src || '/product-placeholder.svg');
  const isExternal = /^https?:\/\//i.test(currentSrc);

  return (
    <Image
      src={currentSrc}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      // Feed images may come from several supplier CDNs. Keep those URLs
      // usable without requiring a new next.config remotePatterns entry for
      // every supplier host; the error handler still provides a local fallback.
      unoptimized={isExternal}
      className={className}
      onError={() => setCurrentSrc('/product-placeholder.svg')}
    />
  );
}
