/**
 * HTML Sanitizer & Specification Cleaner for eD System Product Descriptions
 */

export function decodeHtmlEntities(html: string): string {
  if (!html) return '';

  return html
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
    .replace(/&auml;/g, 'ä')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(dec))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
}

/**
 * Vyčistí HTML popis a pripraví ho na bezpečné a estetické renderovanie na storefront
 */
export function sanitizeAndFormatHtml(rawHtml: string): { cleanHtml: string; plainText: string; specs: Record<string, string> } {
  if (!rawHtml) return { cleanHtml: '', plainText: '', specs: {} };

  // 1. Dekódovanie entít (viackrát ak boli dvojito escapované)
  let decoded = decodeHtmlEntities(rawHtml);
  if (decoded.includes('&lt;') || decoded.includes('&gt;')) {
    decoded = decodeHtmlEntities(decoded);
  }

  // 2. Odstránenie skriptov, štýlov a iframeov
  decoded = decoded.replace(/<script[\s\S]*?<\/script>/gi, '');
  decoded = decoded.replace(/<style[\s\S]*?<\/style>/gi, '');
  decoded = decoded.replace(/<iframe[\s\S]*?<\/iframe>/gi, '');

  // 3. Extrakcia parametrov z HTML tabuliek pred vyčistením
  const specs: Record<string, string> = {};
  const rowMatches = decoded.matchAll(/<tr>[\s\S]*?<\/tr>/gi);
  for (const row of rowMatches) {
    const cols = [...row[0].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map(c =>
      c[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    );
    if (cols.length >= 2 && cols[0] && cols[1] && cols[0].length < 40) {
      const key = cols[0].replace(/:$/, '').trim();
      const val = cols[1].trim();
      if (key && val && key !== val && !key.toLowerCase().includes('http')) {
        specs[key] = val;
      }
    }
  }

  // 4. Odstránenie inline štýlov, fontov a nežiadúcich atribútov
  let clean = decoded
    .replace(/style="[^"]*"/gi, '')
    .replace(/style='[^']*'/gi, '')
    .replace(/dir="[^"]*"/gi, '')
    .replace(/align="[^"]*"/gi, '')
    .replace(/id="[^"]*"/gi, '')
    .replace(/class="[^"]*"/gi, '')
    .replace(/face="[^"]*"/gi, '')
    .replace(/color="[^"]*"/gi, '')
    .replace(/size="[^"]*"/gi, '')
    .replace(/<font[^>]*>/gi, '')
    .replace(/<\/font>/gi, '')
    .replace(/<span>\s*<\/span>/gi, '')
    .replace(/<p>\s*<\/p>/gi, '')
    .replace(/<p>\s*&nbsp;\s*<\/p>/gi, '')
    .replace(/<p>\s*<br\s*\/?>\s*<\/p>/gi, '');

  // 5. Normalizácia tagov pre moderný Tailwind dizajn
  clean = clean
    .replace(/<table[^>]*>/gi, '<table className="w-full text-xs text-slate-700 border-collapse my-4 divide-y divide-slate-200">')
    .replace(/<th[^>]*>/gi, '<th className="py-2.5 px-3 bg-slate-100 text-left font-bold text-slate-900">')
    .replace(/<td[^>]*>/gi, '<td className="py-2 px-3 border-b border-slate-100">')
    .replace(/<tr[^>]*>/gi, '<tr className="hover:bg-slate-50/80 transition-colors">')
    .replace(/<p[^>]*>/gi, '<p className="mb-3 leading-relaxed text-sm text-slate-700">')
    .replace(/<ul[^>]*>/gi, '<ul className="list-disc pl-5 my-3 space-y-1 text-sm text-slate-700">')
    .replace(/<ol[^>]*>/gi, '<ol className="list-decimal pl-5 my-3 space-y-1 text-sm text-slate-700">')
    .replace(/<li[^>]*>/gi, '<li className="leading-relaxed">')
    .replace(/<h1[^>]*>/gi, '<h3 className="text-base font-bold text-slate-900 mt-4 mb-2">')
    .replace(/<\/h1>/gi, '</h3>')
    .replace(/<h2[^>]*>/gi, '<h3 className="text-base font-bold text-slate-900 mt-4 mb-2">')
    .replace(/<\/h2>/gi, '</h3>')
    .replace(/<h3[^>]*>/gi, '<h4 className="text-sm font-bold text-slate-900 mt-3 mb-1.5">')
    .replace(/<\/h3>/gi, '</h4>')
    .replace(/<br\s*\/?>/gi, '<br />')
    .replace(/<hr\s*\/?>/gi, '<hr className="my-4 border-slate-200" />');

  // 6. Odstránenie hlásení "Popis produktu bol preložený pomocou umelej inteligencie..."
  clean = clean.replace(/<p[^>]*>.*?(preložený pomocou umelej inteligencie|prelozeny pomocou).*?<\/p>/gi, '');

  // 7. Generovanie čistého plain textu
  const plainText = decoded
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return {
    cleanHtml: clean.trim(),
    plainText,
    specs
  };
}
