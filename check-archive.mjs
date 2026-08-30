async function checkWayback() {
  console.log('Hľadám v archive.org (Wayback Machine) pre worlds.sk...');
  const cdxUrl = 'https://web.archive.org/cdx/search/cdx?url=worlds.sk/*&output=json&limit=100';
  const res = await fetch(cdxUrl);
  const data = await res.json();
  console.log(`Nájdených záznamov v archíve: ${data.length - 1}`);

  const rows = data.slice(1);
  const interesting = rows.filter(r => {
    const url = r[2].toLowerCase();
    return url.includes('podmien') || url.includes('obchod') || url.includes('reklam') || url.includes('info') || url.includes('vop');
  });

  console.log('\nZaujímavé archivované URL:', interesting.map(r => ({ timestamp: r[1], url: r[2], status: r[4] })));

  if (interesting.length > 0) {
    const latest = interesting[interesting.length - 1];
    const snapshotUrl = `https://web.archive.org/web/${latest[1]}/${latest[2]}`;
    console.log(`\nSťahujem snapshot z: ${snapshotUrl}...`);
    const snapRes = await fetch(snapshotUrl);
    const snapText = await snapRes.text();
    console.log(`Dĺžka stiahnutého textu: ${snapText.length}`);
    return snapText;
  } else {
    // Check root snapshot
    const rootSnapshot = rows[rows.length - 1];
    if (rootSnapshot) {
      const snapUrl = `https://web.archive.org/web/${rootSnapshot[1]}/${rootSnapshot[2]}`;
      console.log(`Sťahujem root snapshot: ${snapUrl}...`);
      const snapRes = await fetch(snapUrl);
      const snapText = await snapRes.text();
      return snapText;
    }
  }
}

checkWayback().catch(console.error);
