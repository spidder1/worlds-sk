import fs from 'node:fs';

async function extractExactTexts() {
  const pages = [
    {
      name: 'vop_fyzicke_osoby',
      url: 'https://web.archive.org/web/20180908160757/https://worlds.sk/obchodne-podmienky-pre-fyzicke-osoby'
    },
    {
      name: 'vop_podnikatelia',
      url: 'https://web.archive.org/web/20180908160757/https://worlds.sk/obchodne-podmienky-pre-podnikatelov'
    },
    {
      name: 'reklamacne_podmienky',
      url: 'https://web.archive.org/web/20180908160757/https://worlds.sk/reklamacne-podmienky'
    },
    {
      name: 'o_nas',
      url: 'https://web.archive.org/web/20180908160757/https://worlds.sk/o-nas'
    },
    {
      name: 'kontakt',
      url: 'https://web.archive.org/web/20180908160757/https://worlds.sk/kontakt'
    }
  ];

  for (const p of pages) {
    console.log(`\nSťahujem presný obsah pre ${p.name}...`);
    const res = await fetch(p.url);
    const html = await res.text();

    // Extract inside <div class="std">...</div> or main content
    const match = html.match(/<div class="std">([\s\S]*?)<\/div>\s*<\/div>/i) ||
                  html.match(/<div class="col-main">([\s\S]*?)<\/div>\s*<div class="col-left/i);

    let content = match ? match[1] : html;

    // Clean up html tags for display
    fs.writeFileSync(`${p.name}.html`, content, 'utf8');
    console.log(`✓ Uložené do ${p.name}.html (${content.length} znakov).`);
    
    // Print snippet
    const cleanText = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    console.log(`Snippet:\n${cleanText.slice(0, 400)}...\n`);
  }
}

extractExactTexts().catch(console.error);
