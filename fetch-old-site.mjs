async function fetchOldSite() {
  const urls = [
    'https://www.worlds.sk/obchodne-podmienky',
    'https://www.worlds.sk/obchodne-podmienky.html',
    'https://www.worlds.sk/obchodni-podminky',
    'https://www.worlds.sk/clanky/obchodne-podmienky',
    'https://www.worlds.sk/vseobecne-obchodne-podmienky',
    'https://www.worlds.sk/terms',
    'https://www.worlds.sk/'
  ];

  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'sk-SK,sk;q=0.9,cs;q=0.8,en;q=0.7',
  };

  for (const u of urls) {
    try {
      console.log(`Pripájam sa na: ${u}...`);
      const res = await fetch(u, { headers });
      console.log(`Status: ${res.status}`);
      if (res.ok) {
        const text = await res.text();
        console.log(`Dĺžka HTML: ${text.length} znakov`);
        console.log(`Ukážka HTML:\n${text.slice(0, 1000)}...`);
        // Find links in page
        const links = [...text.matchAll(/href=["']([^"']+)["']/g)].map(m => m[1]);
        console.log('Nájdené linky:', links.filter(l => l.includes('podmien') || l.includes('obchod') || l.includes('reklam') || l.includes('kontakt') || l.includes('info')));
        return text;
      }
    } catch (e) {
      console.log(`Chyba: ${e.message}`);
    }
  }
}

fetchOldSite().catch(console.error);
