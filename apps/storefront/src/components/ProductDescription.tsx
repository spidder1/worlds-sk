'use client';

import React from 'react';

interface ProductDescriptionProps {
  content?: string;
  fallbackText?: string;
}

function decodeHtmlEntities(html: string): string {
  if (!html) return '';
  return html
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&Scaron;/g, 'Š')
    .replace(/&scaron;/g, 'š')
    .replace(/&Aacute;/g, 'Á')
    .replace(/&aacute;/g, 'á')
    .replace(/&Eacute;/g, 'É')
    .replace(/&eacute;/g, 'é')
    .replace(/&Iacute;/g, 'Í')
    .replace(/&iacute;/g, 'í')
    .replace(/&Oacute;/g, 'Ó')
    .replace(/&oacute;/g, 'ó')
    .replace(/&Uacute;/g, 'Ú')
    .replace(/&uacute;/g, 'ú')
    .replace(/&Yacute;/g, 'Ý')
    .replace(/&yacute;/g, 'ý')
    .replace(/&Ccaron;/g, 'Č')
    .replace(/&ccaron;/g, 'č')
    .replace(/&Dcaron;/g, 'Ď')
    .replace(/&dcaron;/g, 'ď')
    .replace(/&Lcaron;/g, 'Ľ')
    .replace(/&lcaron;/g, 'ľ')
    .replace(/&Ncaron;/g, 'Ň')
    .replace(/&ncaron;/g, 'ň')
    .replace(/&Rcaron;/g, 'Ř')
    .replace(/&rcaron;/g, 'ř')
    .replace(/&Tcaron;/g, 'Ť')
    .replace(/&tcaron;/g, 'ť')
    .replace(/&Zcaron;/g, 'Ž')
    .replace(/&zcaron;/g, 'ž')
    .replace(/&Ocirc;/g, 'Ô')
    .replace(/&ocirc;/g, 'ô')
    .replace(/&Auml;/g, 'Ä')
    .replace(/&auml;/g, 'ä');
}

export function ProductDescription({ content, fallbackText }: ProductDescriptionProps) {
  if (!content || content.trim().length === 0) {
    return (
      <div className="text-sm text-slate-500 italic py-4">
        {fallbackText || 'Podrobný technický popis pre tento produkt pripravujeme.'}
      </div>
    );
  }

  // Ak je obsah escapovaný, dekódujeme ho
  let processedContent = content;
  if (processedContent.includes('&lt;') || processedContent.includes('&gt;')) {
    processedContent = decodeHtmlEntities(processedContent);
  }

  const isHtml = processedContent.includes('<') && processedContent.includes('>');

  if (isHtml) {
    return (
      <div
        className="text-sm text-slate-700 leading-relaxed overflow-x-auto space-y-3 prose prose-slate max-w-none prose-p:my-2 prose-headings:font-bold prose-headings:text-slate-900 prose-ul:list-disc prose-ul:pl-5 prose-ol:list-decimal prose-ol:pl-5 prose-li:my-1 prose-strong:text-slate-900 prose-strong:font-bold prose-table:w-full prose-table:border-collapse prose-table:text-xs prose-td:p-2 prose-td:border-b prose-td:border-slate-100 prose-th:p-2 prose-th:bg-slate-50 prose-th:text-left prose-th:font-bold prose-th:text-slate-900"
        dangerouslySetInnerHTML={{ __html: processedContent }}
      />
    );
  }

  return (
    <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line space-y-3">
      {processedContent}
    </div>
  );
}
