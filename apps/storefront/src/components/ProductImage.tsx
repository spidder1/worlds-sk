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

  return (
    <Image
      src={currentSrc}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={className}
      onError={() => setCurrentSrc('/product-placeholder.svg')}
    />
  );
}
