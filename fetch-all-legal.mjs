async function fetchAllLegalPages() {
  const res = await fetch('https://web.archive.org/cdx/search/cdx?url=*.worlds.sk/*&output=json&limit=5000');
  const data = await res.json();
  const rows = data.slice(1);

  const keywords = ['obchod', 'podmien', 'reklam', 'ako-', 'kontakt', 'doprav', 'platb', 'vop', 'gdpr', 'osobn'];
  const matched = rows.filter(r => {
    const u = r[2].toLowerCase();
    return keywords.some(k => u.includes(k));
  });

  console.log(`Nájdených ${matched.length} záznamov:`);
  const uniqueUrls = new Map();
  for (const m of matched) {
    if (!uniqueUrls.has(m[2])) {
      uniqueUrls.set(m[2], m);
    }
  }

  for (const [url, row] of uniqueUrls) {
    console.log(`- ${url} (ts: ${row[1]}, status: ${row[4]})`);
  }

  // Fetch snapshots
  for (const [url, row] of uniqueUrls) {
    const snapUrl = `https://web.archive.org/web/${row[1]}/${url}`;
    try {
      console.log(`\nSťahujem: ${snapUrl}...`);
      const snapRes = await fetch(snapUrl);
      const html = await snapRes.text();
      console.log(`Dĺžka: ${html.length}`);
      
      // Save snapshot to a scratch file
      const filename = url.replace(/[^a-z0-9]/gi, '_') + '.html';
      // extract text content from main/body
      console.log(`Náhľad textu (prvých 300 znakov):\n${html.slice(0, 300)}`);
    } catch (e) {
      console.log(`Chyba: ${e.message}`);
    }
  }
}

fetchAllLegalPages().catch(console.error);
