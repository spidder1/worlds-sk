async function extractFooterLinks() {
  const snapUrl = 'https://web.archive.org/web/20180908160757/https://worlds.sk/ako-kupit-tovar';
  const res = await fetch(snapUrl);
  const html = await res.text();

  // Find all links
  const links = [...html.matchAll(/<a[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gis)];
  console.log('--- NÁJDENÉ ODKAZY V ARCHÍVOVANEJ STRÁNKE ---');
  const infoLinks = links
    .map(l => ({ url: l[1], text: l[2].replace(/<[^>]+>/g, '').trim() }))
    .filter(l => l.text && (
      l.url.includes('podmien') || l.url.includes('reklam') || l.url.includes('obchod') ||
      l.url.includes('kontakt') || l.url.includes('doprav') || l.url.includes('platb') ||
      l.url.includes('ako-') || l.url.includes('onas') || l.url.includes('o-nas') ||
      l.text.toLowerCase().includes('podmienk') || l.text.toLowerCase().includes('reklam') ||
      l.text.toLowerCase().includes('kontakt') || l.text.toLowerCase().includes('doprav')
    ));

  console.log(infoLinks);

  // Download each distinct link
  for (const item of infoLinks) {
    console.log(`\nSťahujem: ${item.text} (${item.url})...`);
    try {
      const pageRes = await fetch(item.url);
      const pageHtml = await pageRes.text();
      // Extract main content area (e.g. .std, .main, article, div#content)
      const contentMatch = pageHtml.match(/<div[^>]*class=["'][^"']*(std|page-title|col-main|content)[^"']*["'][^>]*>([\s\S]*?)<\/div>/i);
      console.log(`Dĺžka obsahu: ${pageHtml.length}`);
      if (contentMatch) {
        console.log(`Extrahovaný text (prvých 500 znakov):\n${contentMatch[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 500)}`);
      }
    } catch (e) {
      console.log(`Chyba: ${e.message}`);
    }
  }
}

extractFooterLinks().catch(console.error);
