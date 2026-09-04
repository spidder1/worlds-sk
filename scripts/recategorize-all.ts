import { neon } from '@neondatabase/serverless';

const sql = neon("postgresql://neondb_owner:npg_nLuIOvXw7dZ3@ep-withered-thunder-au37ajrg-pooler.c-10.us-east-1.aws.neon.tech/neondb?sslmode=require");

interface CategoryRule {
  targetSlug: string;
  hierarchy: string[];
  test: (title: string, brand: string, currentSlug: string) => boolean;
}

const RULES: CategoryRule[] = [
  // 1. Warranties & Services
  {
    targetSlug: 'zaruky-a-sluzby',
    hierarchy: ['Príslušenstvo a periférie', 'Záruky, rozšírenia a služby'],
    test: (t) => /\b(záruka|záruky|rozšírenie záruky|rozšíření záruky|carepack|onsite|premier support|warranty|ADP|accidental damage|servisný balík)\b/i.test(t)
  },
  // 2. Bags, Backpacks, Sleeves, Folio Cases
  {
    targetSlug: 'tasky-a-puzdra-na-notebooky',
    hierarchy: ['Príslušenstvo a periférie', 'Príslušenstvo k notebookom', 'Tašky, batohy a puzdrá na notebooky'],
    test: (t) => /\b(brašna|batoh|puzdro|pouzdro|topload|backpack|sleeve|carry case|folio case|obazp|ruksak)\b/i.test(t)
  },
  // 3. Laptop Batteries, Chargers, Adapters, Power Banks
  {
    targetSlug: 'baterie-a-adaptery-k-notebookom',
    hierarchy: ['Príslušenstvo a periférie', 'Príslušenstvo k notebookom', 'Batérie a adaptéry k notebookom'],
    test: (t) => /\b(bateria|batéria|baterie|adaptér|adapter|nabíjačka|charger|power bank|powerbank|síťový zdroj pro ntb|napájací adaptér)\b/i.test(t)
  },
  // 4. Screen Protectors & Protective Glass
  {
    targetSlug: 'ochranne-folie-a-skla',
    hierarchy: ['Príslušenstvo a periférie', 'Príslušenstvo k notebookom', 'Ochranné fólie a sklá'],
    test: (t) => /\b(ochranná folie|ochranná fólia|ochranné sklo|paper feeling|tempered glass|screen protector|ochranná vrstva)\b/i.test(t)
  },
  // 5. Pens & Styluses
  {
    targetSlug: 'pera-a-stylusy',
    hierarchy: ['Príslušenstvo a periférie', 'Príslušenstvo k notebookom', 'Dotykové perá a stylusy'],
    test: (t) => /\b(stylus|dotykové pero|digital pen|precision pen|active pen|pen pro)\b/i.test(t)
  },
  // 6. Docking Stations & USB Hubs
  {
    targetSlug: 'dokovacie-stanice',
    hierarchy: ['Príslušenstvo a periférie', 'Dokovacie stanice a USB huby'],
    test: (t) => /\b(dokovacia|dokovací|docking station|usb-c dock|thunderbolt dock|port replicator|dokovacia stanica)\b/i.test(t)
  },
  // 7. Laptop Cooling Pads & Stands
  {
    targetSlug: 'chladenie-a-stojany-na-notebooky',
    hierarchy: ['Príslušenstvo a periférie', 'Príslušenstvo k notebookom', 'Chladiace podložky a stojany'],
    test: (t) => /\b(chladiaca podložka|stojan na ntb|laptop stand|cooling pad)\b/i.test(t)
  },
  // 8. Motherboards
  {
    targetSlug: 'zakladne-dosky',
    hierarchy: ['Počítačové komponenty', 'Základné dosky'],
    test: (t) => /\b(základní deska|základná doska|motherboard)\b/i.test(t) ||
      (/\b(ASUS MB|LENOVO MB|MB Sc|ROG STRIX B550|TUF GAMING B550|TUF GAMING B450|TUF GAMING B660|TUF GAMING A620|ROG STRIX Z790|TUF GAMING Z790|PRIME B550|PRIME B660|PRIME B760|PRIME Z790|PRIME A620)\b/i.test(t) && !/\b(NTB|Notebook|Laptop)\b/i.test(t))
  },
  // 9. PC Cases
  {
    targetSlug: 'pocitacove-skrinky',
    hierarchy: ['Počítačové komponenty', 'Počítačové skrinky (Case)'],
    test: (t) => /\b(skriňa|skrinka|pc case|mini tower|mid-tower|full-tower|eatx case|tuf gaming gt501|prime case ap201)\b/i.test(t) && !/\b(ssd.*case|nvme.*case|box)\b/i.test(t)
  },
  // 10. PC Power Supplies (PSU)
  {
    targetSlug: 'pocitacove-zdroje',
    hierarchy: ['Počítačové komponenty', 'Počítačové zdroje (PSU)'],
    test: (t) => /\b(zdroj tuf gaming|zdroj rog|pc zdroj|napájací zdroj 80\+|psu 850w|psu 750w|psu 1000w|psu 1200w)\b/i.test(t) || (/\b(zdroj)\b/i.test(t) && /\b(80\+|gold|platinum|bronze|850w|750w|1000w|1200w|650w|550w)\b/i.test(t))
  },
  // 11. RAM Memory
  {
    targetSlug: 'pamate-ram',
    hierarchy: ['Počítačové komponenty', 'Operačné pamäte (RAM)'],
    test: (t) => /\b(pamäť lenovo|paměť lenovo|pamäť kingston|ram module|ddr4 sodimm|ddr5 sodimm|so-dimm|8gb ddr4|16gb ddr4|32gb ddr4|8gb ddr5|16gb ddr5|32gb ddr5)\b/i.test(t) && !/\b(NTB|Notebook|Laptop)\b/i.test(t)
  },
  // 12. Headphones & Headsets
  {
    targetSlug: 'sluchadla-a-headsety',
    hierarchy: ['Príslušenstvo a periférie', 'Slúchadlá a headsety'],
    test: (t) => /\b(headphones|headset|slúchadlá|sluchátka|in-ear|tws|earbuds)\b/i.test(t)
  },
  // 13. Keyboards & Mice
  {
    targetSlug: 'klavesnice-a-mysi',
    hierarchy: ['Príslušenstvo a periférie', 'Klávesnice a myši'],
    test: (t) => /\b(klávesnica|klávesnice|myš|mouse|keyboard|set klávesnica|combo klávesnica)\b/i.test(t)
  },
  // 14. Graphics Cards (Standalone GPUs)
  {
    targetSlug: 'graficke-karty',
    hierarchy: ['Počítačové komponenty', 'Grafické karty (GPU)'],
    test: (t) => /\b(grafická karta|vga card)\b/i.test(t) || (/\b(RTX [0-9]{4}|RX [0-9]{4})\b/i.test(t) && !/\b(NTB|Notebook|Laptop|MB|Základná|Základní)\b/i.test(t))
  },
  // 15. Gaming Laptops (Genuine Laptops ONLY)
  {
    targetSlug: 'herne-notebooky',
    hierarchy: ['Počítače a notebooky', 'Notebooky', 'Herné notebooky'],
    test: (t) => /\b(NTB|Notebook|Laptop)\b/i.test(t) && /\b(Gaming|ROG|TUF|Legion|LOQ)\b/i.test(t)
  },
  // 16. Business Laptops (Genuine Laptops ONLY)
  {
    targetSlug: 'firemne-notebooky',
    hierarchy: ['Počítače a notebooky', 'Notebooky', 'Firemné a pracovné notebooky'],
    test: (t) => /\b(NTB|Notebook|Laptop)\b/i.test(t) && /\b(ThinkPad|ExpertBook|ProBook|Latitude|V15 G|V14 G)\b/i.test(t)
  },
  // 17. Ultrabooks (Genuine Laptops ONLY)
  {
    targetSlug: 'ultrabooky',
    hierarchy: ['Počítače a notebooky', 'Notebooky', 'Ultrabooky a kompaktné'],
    test: (t) => /\b(NTB|Notebook|Laptop)\b/i.test(t) && /\b(Zenbook|Yoga Slim|Swift)\b/i.test(t)
  },
  // 18. General Laptops (Genuine Laptops ONLY)
  {
    targetSlug: 'notebooky',
    hierarchy: ['Počítače a notebooky', 'Notebooky'],
    test: (t) => /\b(NTB|Notebook|Laptop|Vivobook|IdeaPad Slim)\b/i.test(t)
  }
];

async function main() {
  const products = await sql`SELECT id, sku, title, brand, category_slug, category_hierarchy FROM products`;
  console.log(`Total products in database: ${products.length}`);

  let changedCount = 0;
  const updates: { id: string; targetSlug: string; hierarchy: string[] }[] = [];

  const categoryCounts: Record<string, number> = {};

  for (const p of products) {
    const title = p.title || '';
    const brand = p.brand || '';
    const currentSlug = p.category_slug || '';

    let matchedRule: CategoryRule | null = null;
    for (const rule of RULES) {
      if (rule.test(title, brand, currentSlug)) {
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
    console.log(`\nExecuting ${updates.length} updates in Neon DB...`);
    const batchSize = 100;
    for (let i = 0; i < updates.length; i += batchSize) {
      const chunk = updates.slice(i, i + batchSize);
      const valuesSql = chunk.map(u => `('${u.id}', '${u.targetSlug}', ARRAY[${u.hierarchy.map(h => `'${h.replace(/'/g, "''")}'`).join(',')}]::text[])`).join(',');
      
      await sql.unsafe(`
        UPDATE products AS p
        SET 
          category_slug = v.target_slug,
          category_hierarchy = v.hierarchy,
          updated_at = NOW()
        FROM (VALUES ${valuesSql}) AS v(id, target_slug, hierarchy)
        WHERE p.id = v.id;
      `);
      console.log(`Updated batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(updates.length / batchSize)}`);
    }
    console.log('\nRecategorization complete!');
  }
}

main().catch(console.error);
