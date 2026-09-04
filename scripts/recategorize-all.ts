import { neon } from '@neondatabase/serverless';

const sql = neon("postgresql://neondb_owner:npg_nLuIOvXw7dZ3@ep-withered-thunder-au37ajrg-pooler.c-10.us-east-1.aws.neon.tech/neondb?sslmode=require");

interface CategoryRule {
  targetSlug: string;
  hierarchy: string[];
  test: (title: string) => boolean;
}

const RULES: CategoryRule[] = [
  // 1. Motherboards (Základné dosky)
  {
    targetSlug: 'zakladne-dosky',
    hierarchy: ['Počítačové komponenty', 'Základné dosky'],
    test: (t) => /\b(mb|mb sc|motherboard|základná|základní|b550|b650|b660|b760|b850|b860|z690|z790|z890|x570|x670|x870|a620)\b/i.test(t) && !/\b(ntb|notebook|laptop)\b/i.test(t)
  },
  // 2. PC Fans, Coolers & AIO Liquid Coolers (Chladenie PC)
  {
    targetSlug: 'chladenie-pc',
    hierarchy: ['Počítačové komponenty', 'Chladenie a ventilátory'],
    test: (t) => /\b(vodní chladič|chladič|ventilátor|fan|chladenie|teplovodivá pasta|water cooling|aio cooler|rog ryuo|rog ryujin|tuf gaming lc|proart lc|rog strix lc|vodní blok)\b/i.test(t) && !/\b(ntb|notebook|laptop|podložka)\b/i.test(t)
  },
  // 3. Cables & Adapters (Káble a redukcie)
  {
    targetSlug: 'kable-a-redukcie',
    hierarchy: ['Napájanie a káble', 'Káble, redukcie a adaptéry'],
    test: (t) => /\b(napájecí kabel|pci-e kabel|hdmi kabel|displayport kabel|usb-c kabel|redukcia|redukce|kábel|kabel)\b/i.test(t) && !/\b(zdroj pro ntb|adaptér pro ntb|nabíjačka)\b/i.test(t)
  },
  // 4. SSD Disks, External Enclosures & Boxes (SSD a úložiská)
  {
    targetSlug: 'ssd-a-pevne-disky',
    hierarchy: ['Počítačové komponenty', 'SSD disky a úložiská'],
    test: (t) => /\b(ssd|nvme|m\.2 ssd|externí box pro ssd|ssd nvme case|ssd box)\b/i.test(t) && !/\b(ntb|notebook|laptop)\b/i.test(t)
  },
  // 5. PC Cases (Počítačové skrinky)
  {
    targetSlug: 'pocitacove-skrinky',
    hierarchy: ['Počítačové komponenty', 'Počítačové skrinky (Case)'],
    test: (t) => /\b(skriňa|skrinka|pc case|mini tower|mid tower|big tower|eatx case|gt501|gt502|gt302|helios|hyperion|cronox|ap201)\b/i.test(t) && !/\b(ssd|nvme|box)\b/i.test(t)
  },
  // 6. Power Supplies (Počítačové zdroje)
  {
    targetSlug: 'pocitacove-zdroje',
    hierarchy: ['Počítačové komponenty', 'Počítačové zdroje (PSU)'],
    test: (t) => /\b(zdroj|psu|rog thor|rog loki|80\+|80plus|gold|platinum|titanium)\b/i.test(t) && !/\b(ntb|notebook|laptop|adaptér|adapter|charger)\b/i.test(t)
  },
  // 7. Warranties & Services (Záruky a služby)
  {
    targetSlug: 'zaruky-a-sluzby',
    hierarchy: ['Príslušenstvo a periférie', 'Záruky, rozšírenia a služby'],
    test: (t) => /\b(záruka|záruky|rozšírenie záruky|rozšíření záruky|carepack|onsite|premier support|warranty|adp|accidental damage|servisný balík|premium care)\b/i.test(t)
  },
  // 8. Laptop Batteries & Chargers (Batérie a adaptéry k notebookom)
  {
    targetSlug: 'baterie-a-adaptery-k-notebookom',
    hierarchy: ['Príslušenstvo a periférie', 'Príslušenstvo k notebookom', 'Batérie a adaptéry k notebookom'],
    test: (t) => /\b(bateria|batéria|baterie|adaptér|adapter|nabíjačka|charger|power bank|powerbank|avacom.*li-pol|avacom.*li-ion)\b/i.test(t)
  },
  // 9. Screen Protectors & Protective Glass (Ochranné fólie a sklá)
  {
    targetSlug: 'ochranne-folie-a-skla',
    hierarchy: ['Príslušenstvo a periférie', 'Príslušenstvo k notebookom', 'Ochranné fólie a sklá'],
    test: (t) => /\b(folie|fólia|sklo|paper feeling|tempered glass|screen protector|protection|1up|arc\+|silky matt|silverprotection|lens protection)\b/i.test(t)
  },
  // 10. Routers & Wi-Fi Networking
  {
    targetSlug: 'wifi-routere-a-mesh',
    hierarchy: ['Sieťové prvky a Wi-Fi', 'Wi-Fi routere a Mesh systémy'],
    test: (t) => /\b(router|aimesh|wifi7|wifi 7|be18000|be7200|gt-be19000|gt-be98|gs-be7200|gs-be18000)\b/i.test(t)
  },
  // 11. Headphones & Headsets
  {
    targetSlug: 'sluchadla-a-headsety',
    hierarchy: ['Príslušenstvo a periférie', 'Slúchadlá a headsety'],
    test: (t) => /\b(headphones|headset|slúchadlá|sluchátka|in-ear|tws|earbuds|rog delta|rog pelta|rog kithara|legion e510)\b/i.test(t)
  },
  // 12. Webcams & Microphones
  {
    targetSlug: 'webkamery-a-mikrofony',
    hierarchy: ['Príslušenstvo a periférie', 'Webkamery a mikrofóny'],
    test: (t) => /\b(mikrofon|mikrofón|microphone|webkamera|webcam|carnyx)\b/i.test(t)
  },
  // 13. Bags, Backpacks, Sleeves, Cases
  {
    targetSlug: 'tasky-a-puzdra-na-notebooky',
    hierarchy: ['Príslušenstvo a periférie', 'Príslušenstvo k notebookom', 'Tašky, batohy a puzdrá na notebooky'],
    test: (t) => /\b(brašna|batoh|puzdro|pouzdro|topload|backpack|sleeve|carry case|folio case)\b/i.test(t)
  },
  // 14. Docking Stations & USB Hubs
  {
    targetSlug: 'dokovacie-stanice',
    hierarchy: ['Príslušenstvo a periférie', 'Dokovacie stanice a USB huby'],
    test: (t) => /\b(dokovacia|dokovací|docking station|usb-c dock|thunderbolt dock|port replicator|fan hub)\b/i.test(t)
  },
  // 15. Pens & Styluses
  {
    targetSlug: 'pera-a-stylusy',
    hierarchy: ['Príslušenstvo a periférie', 'Príslušenstvo k notebookom', 'Dotykové perá a stylusy'],
    test: (t) => /\b(stylus|dotykové pero|digital pen|precision pen|active pen|tab pen|usi pen)\b/i.test(t) && !/\b(lenovo tab k|asus lcd)\b/i.test(t)
  },
  // 16. Keyboards, Mice, Gamepads, Accessories
  {
    targetSlug: 'klavesnice-a-mysi',
    hierarchy: ['Príslušenstvo a periférie', 'Klávesnice a myši'],
    test: (t) => /\b(klávesnica|klávesnice|myš|mouse|keyboard|gamepad|joystick|wrist rest|opěrka zápěstí)\b/i.test(t)
  },
  // 17. Gaming Desktops (PC Legion, Gaming PC)
  {
    targetSlug: 'herne-pocitace',
    hierarchy: ['Počítače a notebooky', 'Stolné počítače', 'Herné počítače'],
    test: (t) => /\b(pc legion|legion t5|legion t7|herný pc|gaming pc|desktop legion)\b/i.test(t)
  },
  // 18. Monitors & Displays (Monitory)
  {
    targetSlug: 'monitory-a-displeje',
    hierarchy: ['Monitory a displeje'],
    test: (t) => /\b(lcd|monitor|display|displej|proart pen display)\b/i.test(t) && !/\b(ntb|notebook|laptop|phone)\b/i.test(t)
  },
  // 19. General Peripherals (Chairs, Stand, Pads, Cleaning, Soundtracks, Software keys)
  {
    targetSlug: 'prislusenstvo-a-periferie',
    hierarchy: ['Príslušenstvo a periférie'],
    test: (t) => /\b(křeslo|stolička|chair|podložka|sada osvětlení|skin|klíč steam|cleaning|tool kit|digital artbook|soundtrack|deluxe edition|digital|monitor stand)\b/i.test(t)
  },
  // 20. Genuine Gaming Laptops ONLY
  {
    targetSlug: 'herne-notebooky',
    hierarchy: ['Počítače a notebooky', 'Notebooky', 'Herné notebooky'],
    test: (t) => /\b(ntb|notebook|laptop)\b/i.test(t) && /\b(gaming|rog|tuf|legion|loq)\b/i.test(t)
  },
  // 21. Genuine Business Laptops ONLY
  {
    targetSlug: 'firemne-notebooky',
    hierarchy: ['Počítače a notebooky', 'Notebooky', 'Firemné a pracovné notebooky'],
    test: (t) => /\b(ntb|notebook|laptop)\b/i.test(t) && /\b(thinkpad|expertbook|probook|latitude|v15 g|v14 g)\b/i.test(t)
  },
  // 22. Genuine Ultrabooky ONLY
  {
    targetSlug: 'ultrabooky',
    hierarchy: ['Počítače a notebooky', 'Notebooky', 'Ultrabooky a kompaktné'],
    test: (t) => /\b(ntb|notebook|laptop)\b/i.test(t) && /\b(zenbook|yoga slim|swift)\b/i.test(t)
  },
  // 23. Genuine General Laptops ONLY
  {
    targetSlug: 'notebooky',
    hierarchy: ['Počítače a notebooky', 'Notebooky'],
    test: (t) => /\b(ntb|notebook|laptop|vivobook|ideapad slim|ideapad 3)\b/i.test(t)
  }
];

async function main() {
  const products = await sql`SELECT id, sku, title, category_slug, category_hierarchy FROM products`;
  console.log(`Total products in database: ${products.length}`);

  let changedCount = 0;
  const updates: { id: string; targetSlug: string; hierarchy: string[] }[] = [];

  const categoryCounts: Record<string, number> = {};

  for (const p of products) {
    const title = p.title || '';
    const currentSlug = p.category_slug || '';

    let matchedRule: CategoryRule | null = null;
    for (const rule of RULES) {
      if (rule.test(title)) {
        matchedRule = rule;
        break;
      }
    }

    const finalSlug = matchedRule ? matchedRule.targetSlug : currentSlug;
    const finalHierarchy = matchedRule ? matchedRule.hierarchy : p.category_hierarchy;

    categoryCounts[finalSlug] = (categoryCounts[finalSlug] || 0) + 1;

    if (finalSlug !== currentSlug) {
      changedCount++;
      updates.push({ id: p.id, targetSlug: finalSlug, hierarchy: finalHierarchy });
    }
  }

  console.log(`\nItems that will be recategorized: ${changedCount}`);
  console.log('\n--- NEW PRODUCT DISTRIBUTION BY CATEGORY SLUG ---');
  for (const [slug, count] of Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])) {
    console.log(`${slug}: ${count} items`);
  }

  if (updates.length > 0) {
    console.log(`\nExecuting ${updates.length} updates in Neon DB using parameterized queries...`);
    let done = 0;
    const batchSize = 50;
    for (let i = 0; i < updates.length; i += batchSize) {
      const chunk = updates.slice(i, i + batchSize);
      await Promise.all(chunk.map(u => 
        sql`UPDATE products SET category_slug = ${u.targetSlug}, category_hierarchy = ${JSON.stringify(u.hierarchy)}::jsonb, updated_at = NOW() WHERE id = ${u.id}`
      ));
      done += chunk.length;
      console.log(`Updated ${done}/${updates.length} items...`);
    }
    console.log('\nRecategorization successfully applied and saved in Neon DB!');
  }
}

main().catch(console.error);
