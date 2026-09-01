'use client';

import React from 'react';

interface ProductDescriptionProps {
  content?: string;
  fallbackText?: string;
}

export function ProductDescription({ content, fallbackText }: ProductDescriptionProps) {
  if (!content || content.trim().length === 0) {
    return (
      <div className="text-sm text-slate-500 italic py-4">
        {fallbackText || 'Podrobný technický popis pre tento produkt pripravujeme.'}
      </div>
    );
  }

  // Ak je obsah v čistom HTML
  const isHtml = content.includes('<') && content.includes('>');

  if (isHtml) {
    return (
      <div
        className="text-sm text-slate-700 leading-relaxed overflow-x-auto space-y-3"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  // Ak je text obyčajný bez HTML značiek
  return (
    <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line space-y-3">
      {content}
    </div>
  );
}
