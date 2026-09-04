import pg from 'pg';
import { WORLDS_IT_CATEGORIES } from '../packages/importer/src/taxonomy-definition.js';
import { TaxonomyCategory } from '@worlds/types';

const { Pool } = pg;

const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://neondb_owner:npg_nLuIOvXw7dZ3@ep-withered-thunder-au37ajrg-pooler.c-10.us-east-1.aws.neon.tech/neondb?sslmode=require';

export const NEW_ACCESSORY_CATEGORIES: TaxonomyCategory[] = [
  {
    id: 'cat-prislusenstvo-k-notebookom',
    slug: 'prislusenstvo-k-notebookom',
    name: 'Príslušenstvo k notebookom',
    parentSlug: 'prislusenstvo-a-periferie',
    level: 2,
    isSeoIndexed: true,
    displayOrder: 1,
    subcategories: [
      {
        id: 'cat-tasky-a-puzdra',
        slug: 'tasky-a-puzdra-na-notebooky',
        name: 'Tašky, batohy a puzdrá na notebooky',
        parentSlug: 'prislusenstvo-k-notebookom',
        level: 3,
        isSeoIndexed: true,
        displayOrder: 1,
      },
      {
        id: 'cat-baterie-a-adaptery',
        slug: 'baterie-a-adaptery-k-notebookom',
        name: 'Batérie a adaptéry k notebookom',
        parentSlug: 'prislusenstvo-k-notebookom',
        level: 3,
        isSeoIndexed: true,
        displayOrder: 2,
      },
      {
        id: 'cat-chladenie-stojany-nb',
        slug: 'chladenie-a-stojany-na-notebooky',
        name: 'Chladiace podložky a stojany',
        parentSlug: 'prislusenstvo-k-notebookom',
        level: 3,
        isSeoIndexed: true,
        displayOrder: 3,
      },
      {
        id: 'cat-ochranne-folie-skla',
        slug: 'ochranne-folie-a-skla',
        name: 'Ochranné fólie a sklá',
        parentSlug: 'prislusenstvo-k-notebookom',
        level: 3,
        isSeoIndexed: true,
        displayOrder: 4,
      },
      {
        id: 'cat-pera-a-stylusy',
        slug: 'pera-a-stylusy',
        name: 'Dotykové perá a stylusy',
        parentSlug: 'prislusenstvo-k-notebookom',
        level: 3,
        isSeoIndexed: true,
        displayOrder: 5,
      },
    ],
  },
  {
    id: 'cat-zaruky-a-sluzby',
    slug: 'zaruky-a-sluzby',
    name: 'Záruky, rozšírenia a služby',
    parentSlug: 'prislusenstvo-a-periferie',
    level: 2,
    isSeoIndexed: true,
    displayOrder: 6,
  },
];

export function categorizeProductSmartly(title: string, currentSlug: string): { slug: string; hierarchy: string[] } {
  const t = title.toLowerCase();

  // --- Rule 1: Laptop Accessories (Batteries, Chargers, Docks, Bags, Warranties, Covers, Pens, Stands) ---
  if (
    t.includes('bateria') ||
    t.includes('batéria') ||
    t.includes('baterie') ||
    t.includes('battery') ||
    t.includes('adaptér') ||
    t.includes('adapter') ||
    t.includes('nabíjač') ||
    t.includes('nabijac') ||
    t.includes('konektor') ||
    t.includes('power supply') ||
    t.includes('charging cable')
  ) {
    return {
      slug: 'baterie-a-adaptery-k-notebookom',
      hierarchy: ['Príslušenstvo a periférie', 'Príslušenstvo k notebookom', 'Batérie a adaptéry k notebookom'],
    };
  }

  if (
    t.includes('taška') ||
    t.includes('taska') ||
    t.includes('puzdro') ||
    t.includes('pouzdro') ||
    t.includes('batoh') ||
    t.includes('backpack') ||
    t.includes('bag') ||
    t.includes('sleeve') ||
    t.includes('toploader') ||
    t.includes('carry case') ||
    t.includes('kufor') ||
    t.includes('kufrik')
  ) {
    return {
      slug: 'tasky-a-puzdra-na-notebooky',
      hierarchy: ['Príslušenstvo a periférie', 'Príslušenstvo k notebookom', 'Tašky, batohy a puzdrá na notebooky'],
    };
  }

  if (
    t.includes('dokovac') ||
    t.includes('docking') ||
    t.includes('dock ') ||
    t.includes('port replicator') ||
    t.includes('usb hub') ||
    t.includes('usb-c hub')
  ) {
    return {
      slug: 'dokovacie-stanice',
      hierarchy: ['Príslušenstvo a periférie', 'Dokovacie stanice a USB huby'],
    };
  }

  if (
    t.includes('chladic') ||
    t.includes('chladiac') ||
    t.includes('cooling pad') ||
    t.includes('stojan') ||
    t.includes('stand') ||
    t.includes('podložka pod notebook') ||
    t.includes('podlozka pod notebook')
  ) {
    return {
      slug: 'chladenie-a-stojany-na-notebooky',
      hierarchy: ['Príslušenstvo a periférie', 'Príslušenstvo k notebookom', 'Chladiace podložky a stojany'],
    };
  }

  if (
    t.includes('záruka') ||
    t.includes('zaruka') ||
    t.includes('warranty') ||
    t.includes('rozšírenie záruky') ||
    t.includes('care pack') ||
    t.includes('premier support') ||
    t.includes('keep your drive') ||
    t.includes('licencia') ||
    t.includes('license')
  ) {
    return {
      slug: 'zaruky-a-sluzby',
      hierarchy: ['Príslušenstvo a periférie', 'Záruky, rozšírenia a služby'],
    };
  }

  if (t.includes('pero') || t.includes('pen') || t.includes('stylus')) {
    return {
      slug: 'pera-a-stylusy',
      hierarchy: ['Príslušenstvo a periférie', 'Príslušenstvo k notebookom', 'Dotykové perá a stylusy'],
    };
  }

  if (t.includes('sklo') || t.includes('fólia') || t.includes('folia') || t.includes('privacy') || t.includes('súkromie')) {
    return {
      slug: 'ochranne-folie-a-skla',
      hierarchy: ['Príslušenstvo a periférie', 'Príslušenstvo k notebookom', 'Ochranné fólie a sklá'],
    };
  }

  if (t.includes('mouse pad') || t.includes('podložka pod myš') || t.includes('podlozka pod mys')) {
    return {
      slug: 'klavesnice-a-mysi',
      hierarchy: ['Príslušenstvo a periférie', 'Klávesnice a myši'],
    };
  }

  if (t.includes('myš') || t.includes('mys') || t.includes('mouse')) {
    return {
      slug: 'klavesnice-a-mysi',
      hierarchy: ['Príslušenstvo a periférie', 'Klávesnice a myši'],
    };
  }

  if (t.includes('klávesnic') || t.includes('klavesnic') || t.includes('keyboard')) {
    return {
      slug: 'klavesnice-a-mysi',
      hierarchy: ['Príslušenstvo a periférie', 'Klávesnice a myši'],
    };
  }

  if (t.includes('slúchadl') || t.includes('sluchadl') || t.includes('headset') || t.includes('earbuds')) {
    return {
      slug: 'sluchadla-a-headsety',
      hierarchy: ['Príslušenstvo a periférie', 'Slúchadlá a headsety'],
    };
  }

  // --- Rule 2: Components & Monitors ---
  if (
    t.includes('základná doska') ||
    t.includes('zakladna doska') ||
    t.includes('motherboard') ||
    t.includes('z790') ||
    t.includes('b760') ||
    t.includes('b650') ||
    t.includes('x670') ||
    t.includes('h610') ||
    t.includes('z890') ||
    t.includes('x870')
  ) {
    return {
      slug: 'zakladne-dosky',
      hierarchy: ['Počítačové komponenty', 'Základné dosky'],
    };
  }

  if (t.includes('grafická karta') || t.includes('graficka karta') || t.includes('vga') || t.includes('rtx ') || t.includes('gtx ') || t.includes('radeon ')) {
    return {
      slug: 'graficke-karty',
      hierarchy: ['Počítačové komponenty', 'Grafické karty (GPU)'],
    };
  }

  if (t.includes('procesor') || t.includes('cpu ') || t.includes('intel core i') || t.includes('ryzen 5') || t.includes('ryzen 7') || t.includes('ryzen 9')) {
    return {
      slug: 'procesory',
      hierarchy: ['Počítačové komponenty', 'Procesory (CPU)'],
    };
  }

  if (t.includes('monitor') || t.includes('lcd') || t.includes('display') || t.includes('proart')) {
    return {
      slug: 'monitory-a-displeje',
      hierarchy: ['Monitory a displeje'],
    };
  }

  // --- Rule 3: Genuine Computers & Laptops ---
  if (t.includes('nuc') || t.includes('mini pc') || t.includes('tiny') || t.includes('thinkcentre') || t.includes('expertcenter')) {
    return {
      slug: 'mini-pc',
      hierarchy: ['Počítače a notebooky', 'Stolné počítače', 'Mini PC a HTPC'],
    };
  }

  if (t.includes('all in one') || t.includes('aio')) {
    return {
      slug: 'all-in-one-pocitace',
      hierarchy: ['Počítače a notebooky', 'Stolné počítače', 'All-in-One PC (v monitore)'],
    };
  }

  if (t.includes('server') || t.includes('thinksystem') || t.includes('workstation')) {
    return {
      slug: 'servery-a-workstation',
      hierarchy: ['Počítače a notebooky', 'Servery a pracovné stanice'],
    };
  }

  // Genuine Laptops
  if (
    t.includes('notebook') ||
    t.includes('ntb') ||
    t.includes('laptop') ||
    t.includes('thinkpad') ||
    t.includes('ideapad') ||
    t.includes('legion') ||
    t.includes('rog ') ||
    t.includes('tuf ') ||
    t.includes('zenbook') ||
    t.includes('vivobook') ||
    t.includes('expertbook') ||
    t.includes('chromebook') ||
    t.includes('yoga') ||
    t.includes('loq') ||
    t.includes('macbook')
  ) {
    if (t.includes('rog') || t.includes('tuf') || t.includes('legion') || t.includes('loq') || t.includes('herný') || t.includes('herny')) {
      return {
        slug: 'herne-notebooky',
        hierarchy: ['Počítače a notebooky', 'Notebooky', 'Herné notebooky'],
      };
    }

    if (
      t.includes('thinkpad') ||
      t.includes('expertbook') ||
      t.includes('firemný') ||
      t.includes('firemny') ||
      t.includes('x1 carbon') ||
      t.includes('t14') ||
      t.includes('t16') ||
      t.includes('l14') ||
      t.includes('l15') ||
      t.includes('p14') ||
      t.includes('p16')
    ) {
      return {
        slug: 'firemne-notebooky',
        hierarchy: ['Počítače a notebooky', 'Notebooky', 'Firemné a pracovné notebooky'],
      };
    }

    if (t.includes('2v1') || t.includes('flip') || t.includes('duo') || t.includes('spin') || t.includes('fold')) {
      return {
        slug: '2v1-a-dotykove-notebooky',
        hierarchy: ['Počítače a notebooky', 'Notebooky', '2v1 a dotykové notebooky'],
      };
    }

    if (t.includes('zenbook') || t.includes('ultrabook')) {
      return {
        slug: 'ultrabooky',
        hierarchy: ['Počítače a notebooky', 'Notebooky', 'Ultrabooky a kompaktné'],
      };
    }

    return {
      slug: 'notebooky',
      hierarchy: ['Počítače a notebooky', 'Notebooky'],
    };
  }

  // Desktop PCs
  if (t.includes('počítač') || t.includes('pocitac') || t.includes('desktop')) {
    if (t.includes('herný') || t.includes('herny') || t.includes('rog') || t.includes('legion')) {
      return {
        slug: 'herne-pocitace',
        hierarchy: ['Počítače a notebooky', 'Stolné počítače', 'Herné počítače'],
      };
    }
    return {
      slug: 'kancelarske-pocitace',
      hierarchy: ['Počítače a notebooky', 'Stolné počítače', 'Kancelárske a domáce PC'],
    };
  }

  return {
    slug: currentSlug,
    hierarchy: ['Počítače a IT'],
  };
}

export async function recategorizeAllProducts() {
  console.log('===========================================================');
  console.log(' Worlds.sk - INTELIGENTNÁ REKATEGORIZÁCIA KATALÓGU PRODUKTOV');
  console.log('===========================================================\n');

  const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
    max: 10,
  });

  console.log('📌 Pridávam nové podkategórie príslušenstva a služieb do Neon DB...');

  async function insertCategoryNode(cat: TaxonomyCategory, parentSlug?: string) {
    await pool.query(
      `INSERT INTO categories (id, slug, name, parent_slug, level, display_order)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (slug) DO UPDATE SET
         name = EXCLUDED.name,
         parent_slug = EXCLUDED.parent_slug,
         level = EXCLUDED.level,
         display_order = EXCLUDED.display_order`,
      [cat.id, cat.slug, cat.name, parentSlug || null, cat.level, cat.displayOrder || 1]
    );

    if (cat.subcategories && cat.subcategories.length > 0) {
      for (const sub of cat.subcategories) {
        await insertCategoryNode(sub, cat.slug);
      }
    }
  }

  for (const cat of NEW_ACCESSORY_CATEGORIES) {
    await insertCategoryNode(cat);
  }

  const res = await pool.query('SELECT id, title, category_slug FROM products');
  const products = res.rows;
  console.log(`📦 Načítaných ${products.length} produktov pre rekategorizáciu...`);

  const updatesToPerform: { id: string; slug: string; hierarchy: string[] }[] = [];
  const categoryStats: Record<string, number> = {};

  for (const p of products) {
    const newCat = categorizeProductSmartly(p.title, p.category_slug);
    categoryStats[newCat.slug] = (categoryStats[newCat.slug] || 0) + 1;

    if (newCat.slug !== p.category_slug) {
      updatesToPerform.push({
        id: p.id,
        slug: newCat.slug,
        hierarchy: newCat.hierarchy,
      });
    }
  }

  console.log(`🚀 Rýchly dávkový zápis pre ${updatesToPerform.length} zmenených produktov...`);

  // Perform updates in fast bulk batches of 200 items
  const batchSize = 200;
  for (let i = 0; i < updatesToPerform.length; i += batchSize) {
    const batch = updatesToPerform.slice(i, i + batchSize);

    const valueStrings: string[] = [];
    const params: any[] = [];
    let pIdx = 1;

    for (const item of batch) {
      valueStrings.push(`($${pIdx++}, $${pIdx++}, $${pIdx++}::jsonb)`);
      params.push(item.id, item.slug, JSON.stringify(item.hierarchy));
    }

    const bulkSql = `
      UPDATE products AS p SET
        category_slug = v.slug,
        category_hierarchy = v.hierarchy,
        updated_at = NOW()
      FROM (VALUES ${valueStrings.join(', ')}) AS v(id, slug, hierarchy)
      WHERE p.id = v.id
    `;

    await pool.query(bulkSql, params);
  }

  console.log(`\n===========================================================`);
  console.log(` 🎉 ÚSPECH! PRESUNUTÝCH A OPRAVENÝCH PRODUKTOV: ${updatesToPerform.length} z ${products.length}`);
  console.log(' Nová distribučná mapa kategórií:');
  console.log(JSON.stringify(categoryStats, null, 2));
  console.log(`===========================================================\n`);

  await pool.end();
}

if (process.argv[1]?.endsWith('recategorize-products.ts') || process.argv[1]?.endsWith('recategorize-products.js')) {
  recategorizeAllProducts().catch(console.error);
}
