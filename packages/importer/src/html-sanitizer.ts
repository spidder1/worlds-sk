/**
 * HTML Sanitizer & Specification Cleaner for eD System Product Descriptions
 * Zachováva kompletnú HTML štruktúru (odseky, zoznamy, tabuľky, nadpisy, tučné písmo)
 * a pripravuje ju na elegantné zobrazenie na webe.
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
 * Zachováva a čistí formátovaný HTML popis pre moderný e-shop
 */
export function sanitizeAndFormatHtml(rawHtml: string): { cleanHtml: string; plainText: string; specs: Record<string, string> } {
  if (!rawHtml) return { cleanHtml: '', plainText: '', specs: {} };

  // 1. Dôsledné dekódovanie entít (aj v prípade viacnásobného escapovania)
  let decoded = decodeHtmlEntities(rawHtml);
  if (decoded.includes('&lt;') || decoded.includes('&gt;')) {
    decoded = decodeHtmlEntities(decoded);
  }

  // 2. Bezpečnosť: Odstránenie skriptov a vložených prvkov
  decoded = decoded.replace(/<script[\s\S]*?<\/script>/gi, '');
  decoded = decoded.replace(/<style[\s\S]*?<\/style>/gi, '');
  decoded = decoded.replace(/<iframe[\s\S]*?<\/iframe>/gi, '');

  // 3. Extrakcia parametrov z tabuliek
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

  // 4. Odstránenie starých CSS atribútov (font, face, color, style), ale ZACHOVANIE štruktúrnych HTML značiek
  let clean = decoded
    .replace(/style="[^"]*"/gi, '')
    .replace(/style='[^']*'/gi, '')
    .replace(/dir="[^"]*"/gi, '')
    .replace(/align="[^"]*"/gi, '')
    .replace(/id="[^"]*"/gi, '')
    .replace(/face="[^"]*"/gi, '')
    .replace(/color="[^"]*"/gi, '')
    .replace(/size="[^"]*"/gi, '')
    .replace(/<font[^>]*>/gi, '')
    .replace(/<\/font>/gi, '')
    .replace(/<span>\s*<\/span>/gi, '')
    .replace(/<p>\s*<\/p>/gi, '')
    .replace(/<p>\s*&nbsp;\s*<\/p>/gi, '')
    .replace(/<p>\s*<br\s*\/?>\s*<\/p>/gi, '');

  // 5. Odstránenie automatických hlásení o strojovom preklade
  clean = clean.replace(/<p[^>]*>.*?(preložený pomocou umelej inteligencie|prelozeny pomocou).*?<\/p>/gi, '');

  // 6. Generovanie čistého textu pre vyhľadávanie a SEO
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
