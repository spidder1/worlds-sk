async function listAllArchiveUrls() {
  const res = await fetch('https://web.archive.org/cdx/search/cdx?url=*.worlds.sk/*&output=json&limit=500');
  const data = await res.json();
  console.log('Počet záznamov v archíve:', data.length - 1);
  const urls = [...new Set(data.slice(1).map(r => r[2]))];
  console.log('Zoznam všetkých URL v archíve:\n', urls.slice(0, 50));
}

listAllArchiveUrls().catch(console.error);
