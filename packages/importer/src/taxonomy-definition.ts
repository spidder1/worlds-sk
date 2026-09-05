import type { TaxonomyCategory } from '@worlds/types';

/**
 * Čistá, prehľadná taxonómia počítačového hardvéru a IT techniky pre Worlds.sk
 */
export const WORLDS_IT_CATEGORIES: TaxonomyCategory[] = [
  {
    id: 'cat-pocitace-a-notebooky',
    slug: 'pocitace-a-notebooky',
    name: 'Počítače a notebooky',
    level: 1,
    isSeoIndexed: true,
    displayOrder: 1,
    allowedFilterAttributes: ['brand', 'cpu_family', 'ram_gb', 'ssd_gb', 'screen_size_inch', 'gpu_model'],
    subcategories: [
      {
        id: 'cat-notebooky',
        slug: 'notebooky',
        name: 'Notebooky',
        parentSlug: 'pocitace-a-notebooky',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 1,
        allowedFilterAttributes: ['brand', 'cpu_family', 'ram_gb', 'ssd_gb', 'screen_size_inch', 'gpu_model', 'os'],
        subcategories: [
          {
            id: 'cat-herne-notebooky',
            slug: 'herne-notebooky',
            name: 'Herné notebooky',
            parentSlug: 'notebooky',
            level: 3,
            isSeoIndexed: true,
            displayOrder: 1,
            allowedFilterAttributes: ['brand', 'gpu_model', 'cpu_family', 'ram_gb', 'screen_size_inch'],
          },
          {
            id: 'cat-firemne-notebooky',
            slug: 'firemne-notebooky',
            name: 'Firemné a pracovné notebooky',
            parentSlug: 'notebooky',
            level: 3,
            isSeoIndexed: true,
            displayOrder: 2,
            allowedFilterAttributes: ['brand', 'cpu_family', 'ram_gb', 'ssd_gb', 'os'],
          },
          {
            id: 'cat-ultrabooky',
            slug: 'ultrabooky',
            name: 'Ultrabooky a kompaktné',
            parentSlug: 'notebooky',
            level: 3,
            isSeoIndexed: true,
            displayOrder: 3,
            allowedFilterAttributes: ['brand', 'screen_size_inch', 'ram_gb', 'ssd_gb'],
          },
          {
            id: 'cat-2v1-dotykove',
            slug: '2v1-a-dotykove-notebooky',
            name: '2v1 a dotykové notebooky',
            parentSlug: 'notebooky',
            level: 3,
            isSeoIndexed: true,
            displayOrder: 4,
            allowedFilterAttributes: ['brand', 'screen_size_inch', 'ram_gb'],
          },
          {
            id: 'cat-prislusenstvo-k-notebookom',
            slug: 'prislusenstvo-k-notebookom',
            name: 'Príslušenstvo k notebookom',
            parentSlug: undefined,
            level: 1,
            isSeoIndexed: true,
            displayOrder: 5,
            allowedFilterAttributes: ['brand'],
            subcategories: [
              { id: 'cat-tasky-a-puzdra', slug: 'tasky-a-puzdra-na-notebooky', name: 'Tašky, batohy a puzdrá na notebooky', parentSlug: 'prislusenstvo-k-notebookom', level: 2, isSeoIndexed: true, displayOrder: 1, allowedFilterAttributes: ['brand'] },
              { id: 'cat-baterie-a-adaptery', slug: 'baterie-a-adaptery-k-notebookom', name: 'Batérie a adaptéry k notebookom', parentSlug: 'prislusenstvo-k-notebookom', level: 2, isSeoIndexed: true, displayOrder: 2, allowedFilterAttributes: ['brand'] },
              { id: 'cat-chladenie-stojany-nb', slug: 'chladenie-a-stojany-na-notebooky', name: 'Chladiace podložky a stojany', parentSlug: 'prislusenstvo-k-notebookom', level: 2, isSeoIndexed: true, displayOrder: 3, allowedFilterAttributes: ['brand'] },
              { id: 'cat-ochranne-folie-skla', slug: 'ochranne-folie-a-skla', name: 'Ochranné fólie a sklá', parentSlug: 'prislusenstvo-k-notebookom', level: 2, isSeoIndexed: true, displayOrder: 4, allowedFilterAttributes: ['brand'] },
              { id: 'cat-pera-a-stylusy', slug: 'pera-a-stylusy', name: 'Dotykové perá a stylusy', parentSlug: 'prislusenstvo-k-notebookom', level: 2, isSeoIndexed: true, displayOrder: 5, allowedFilterAttributes: ['brand'] },
            ],
          },
        ],
      },
      {
        id: 'cat-stolne-pocitace',
        slug: 'stolne-pocitace',
        name: 'Stolné počítače',
        parentSlug: 'pocitace-a-notebooky',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 2,
        allowedFilterAttributes: ['brand', 'cpu_family', 'ram_gb', 'ssd_gb', 'gpu_model'],
        subcategories: [
          {
            id: 'cat-herne-pc',
            slug: 'herne-pocitace',
            name: 'Herné počítače',
            parentSlug: 'stolne-pocitace',
            level: 3,
            isSeoIndexed: true,
            displayOrder: 1,
            allowedFilterAttributes: ['brand', 'gpu_model', 'cpu_family', 'ram_gb'],
          },
          {
            id: 'cat-kancelarske-pc',
            slug: 'kancelarske-pocitace',
            name: 'Kancelárske a domáce PC',
            parentSlug: 'stolne-pocitace',
            level: 3,
            isSeoIndexed: true,
            displayOrder: 2,
            allowedFilterAttributes: ['brand', 'cpu_family', 'ram_gb', 'ssd_gb'],
          },
          {
            id: 'cat-all-in-one',
            slug: 'all-in-one-pocitace',
            name: 'All-in-One PC (v monitore)',
            parentSlug: 'stolne-pocitace',
            level: 3,
            isSeoIndexed: true,
            displayOrder: 3,
            allowedFilterAttributes: ['brand', 'screen_size_inch', 'ram_gb'],
          },
          {
            id: 'cat-mini-pc',
            slug: 'mini-pc',
            name: 'Mini PC a HTPC',
            parentSlug: 'stolne-pocitace',
            level: 3,
            isSeoIndexed: true,
            displayOrder: 4,
            allowedFilterAttributes: ['brand', 'cpu_family', 'ram_gb'],
          },
        ],
      },
      {
        id: 'cat-servery',
        slug: 'servery-a-workstation',
        name: 'Servery a pracovné stanice',
        parentSlug: 'pocitace-a-notebooky',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 3,
        allowedFilterAttributes: ['brand', 'cpu_family', 'ram_gb'],
      },
    ],
  },
  {
    id: 'cat-pocitacove-komponenty',
    slug: 'pocitacove-komponenty',
    name: 'Počítačové komponenty',
    level: 1,
    isSeoIndexed: true,
    displayOrder: 2,
    allowedFilterAttributes: ['brand', 'socket', 'chipset', 'capacity_gb'],
    subcategories: [
      {
        id: 'cat-procesory',
        slug: 'procesory',
        name: 'Procesory (CPU)',
        parentSlug: 'pocitacove-komponenty',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 1,
        allowedFilterAttributes: ['brand', 'socket', 'cpu_family', 'cores_count'],
      },
      {
        id: 'cat-graficke-karty',
        slug: 'graficke-karty',
        name: 'Grafické karty (GPU)',
        parentSlug: 'pocitacove-komponenty',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 2,
        allowedFilterAttributes: ['brand', 'gpu_chip', 'vram_gb', 'interface'],
      },
      {
        id: 'cat-pamate-ram',
        slug: 'pamate-ram',
        name: 'Operačné pamäte (RAM)',
        parentSlug: 'pocitacove-komponenty',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 3,
        allowedFilterAttributes: ['brand', 'ram_type', 'capacity_gb', 'frequency_mhz'],
      },
      {
        id: 'cat-ssd-a-disky',
        slug: 'ssd-a-pevne-disky',
        name: 'SSD disky a úložiská',
        parentSlug: 'pocitacove-komponenty',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 4,
        allowedFilterAttributes: ['brand', 'capacity_gb', 'form_factor', 'interface'],
      },
      {
        id: 'cat-zakladne-dosky',
        slug: 'zakladne-dosky',
        name: 'Základné dosky',
        parentSlug: 'pocitacove-komponenty',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 5,
        allowedFilterAttributes: ['brand', 'socket', 'chipset', 'form_factor'],
      },
      {
        id: 'cat-pocitacove-zdroje',
        slug: 'pocitacove-zdroje',
        name: 'Počítačové zdroje (PSU)',
        parentSlug: 'pocitacove-komponenty',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 6,
        allowedFilterAttributes: ['brand', 'power_w', 'efficiency_rating'],
      },
      {
        id: 'cat-pocitacove-skrinky',
        slug: 'pocitacove-skrinky',
        name: 'Počítačové skrinky (Case)',
        parentSlug: 'pocitacove-komponenty',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 7,
        allowedFilterAttributes: ['brand', 'form_factor', 'color'],
      },
      {
        id: 'cat-chladenie-pc',
        slug: 'chladenie-pc',
        name: 'Chladenie a ventilátory',
        parentSlug: 'pocitacove-komponenty',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 8,
        allowedFilterAttributes: ['brand', 'cooling_type', 'socket'],
      },
    ],
  },
  {
    id: 'cat-monitory-a-displeje',
    slug: 'monitory-a-displeje',
    name: 'Monitory a displeje',
    level: 1,
    isSeoIndexed: true,
    displayOrder: 3,
    allowedFilterAttributes: ['brand', 'screen_size_inch', 'resolution', 'refresh_rate_hz', 'panel_type'],
  },
  {
    id: 'cat-prislusenstvo-a-periferie',
    slug: 'prislusenstvo-a-periferie',
    name: 'Príslušenstvo a periférie',
    level: 1,
    isSeoIndexed: true,
    displayOrder: 4,
    allowedFilterAttributes: ['brand', 'connection_type'],
    subcategories: [
      {
        id: 'cat-klavesnice-a-mysi',
        slug: 'klavesnice-a-mysi',
        name: 'Klávesnice a myši',
        parentSlug: 'prislusenstvo-a-periferie',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 1,
        allowedFilterAttributes: ['brand', 'connection_type', 'switch_type'],
      },
      {
        id: 'cat-sluchadla-a-headsety',
        slug: 'sluchadla-a-headsety',
        name: 'Slúchadlá a headsety',
        parentSlug: 'prislusenstvo-a-periferie',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 2,
        allowedFilterAttributes: ['brand', 'connection_type'],
      },
      {
        id: 'cat-dokovacie-stanice',
        slug: 'dokovacie-stanice',
        name: 'Dokovacie stanice a USB huby',
        parentSlug: 'prislusenstvo-a-periferie',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 3,
        allowedFilterAttributes: ['brand', 'interface'],
      },
      {
        id: 'cat-webkamery-a-mikrofony',
        slug: 'webkamery-a-mikrofony',
        name: 'Webkamery a mikrofóny',
        parentSlug: 'prislusenstvo-a-periferie',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 4,
        allowedFilterAttributes: ['brand', 'resolution'],
      },
      {
        id: 'cat-reproduktory-pc',
        slug: 'reproduktory-k-pc',
        name: 'Reproduktory k počítaču',
        parentSlug: 'prislusenstvo-a-periferie',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 5,
        allowedFilterAttributes: ['brand', 'power_w'],
      },
    ],
  },
  {
    id: 'cat-sietove-prvky-a-wifi',
    slug: 'sietove-prvky-a-wifi',
    name: 'Sieťové prvky a Wi-Fi',
    level: 1,
    isSeoIndexed: true,
    displayOrder: 5,
    allowedFilterAttributes: ['brand', 'wifi_standard', 'ports_count'],
    subcategories: [
      {
        id: 'cat-wifi-routere',
        slug: 'wifi-routere-a-mesh',
        name: 'Wi-Fi routere a Mesh systémy',
        parentSlug: 'sietove-prvky-a-wifi',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 1,
        allowedFilterAttributes: ['brand', 'wifi_standard'],
      },
      {
        id: 'cat-switche',
        slug: 'switche-a-prepinace',
        name: 'Switche a sieťové prepínače',
        parentSlug: 'sietove-prvky-a-wifi',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 2,
        allowedFilterAttributes: ['brand', 'ports_count', 'poe_support'],
      },
      {
        id: 'cat-nas-uloziska',
        slug: 'nas-sietove-uloziska',
        name: 'NAS sieťové dátové úložiská',
        parentSlug: 'sietove-prvky-a-wifi',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 3,
        allowedFilterAttributes: ['brand', 'bays_count'],
      },
    ],
  },
  {
    id: 'cat-tlaciarne-a-kancelaria',
    slug: 'tlaciarne-a-kancelaria',
    name: 'Tlačiarne a kancelária',
    level: 1,
    isSeoIndexed: true,
    displayOrder: 6,
    allowedFilterAttributes: ['brand', 'print_technology'],
    subcategories: [
      {
        id: 'cat-tlaciarne-multifunkcie',
        slug: 'tlaciarne-a-multifunkcie',
        name: 'Tlačiarne a multifunkčné zariadenia',
        parentSlug: 'tlaciarne-a-kancelaria',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 1,
        allowedFilterAttributes: ['brand', 'print_technology', 'color_print'],
      },
      {
        id: 'cat-tonery-a-naplne',
        slug: 'tonery-a-naplne',
        name: 'Tonery, cartridge a náplne',
        parentSlug: 'tlaciarne-a-kancelaria',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 2,
        allowedFilterAttributes: ['brand', 'color'],
      },
      {
        id: 'cat-skenery',
        slug: 'skenery',
        name: 'Dokumentové skenery',
        parentSlug: 'tlaciarne-a-kancelaria',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 3,
        allowedFilterAttributes: ['brand'],
      },
    ],
  },
  {
    id: 'cat-napajanie-a-kable',
    slug: 'napajanie-a-kable',
    name: 'Napájanie, záložné zdroje a káble',
    level: 1,
    isSeoIndexed: true,
    displayOrder: 7,
    allowedFilterAttributes: ['brand', 'cable_type'],
    subcategories: [
      {
        id: 'cat-ups-zalozne-zdroje',
        slug: 'ups-zalozne-zdroje',
        name: 'UPS záložné zdroje a prepäťové ochrany',
        parentSlug: 'napajanie-a-kable',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 1,
        allowedFilterAttributes: ['brand', 'power_va'],
      },
      {
        id: 'cat-kable-a-redukcie',
        slug: 'kable-a-redukcie',
        name: 'Káble, redukcie a adaptéry (HDMI, DP, USB-C)',
        parentSlug: 'napajanie-a-kable',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 2,
        allowedFilterAttributes: ['brand', 'cable_type', 'length_m'],
      },
      {
        id: 'cat-nabijacky-adaptery',
        slug: 'nabijacky-a-adaptery',
        name: 'Nabíjačky a napájacie adaptéry',
        parentSlug: 'napajanie-a-kable',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 3,
        allowedFilterAttributes: ['brand', 'power_w'],
      },
    ],
  },
  {
    id: 'cat-pamatove-media',
    slug: 'pamatove-media-a-usb',
    name: 'Pamäťové médiá a USB',
    level: 1,
    isSeoIndexed: true,
    displayOrder: 8,
    allowedFilterAttributes: ['brand', 'capacity_gb'],
    subcategories: [
      {
        id: 'cat-usb-flash-disky',
        slug: 'usb-flash-disky',
        name: 'USB flash disky',
        parentSlug: 'pamatove-media-a-usb',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 1,
        allowedFilterAttributes: ['brand', 'capacity_gb', 'interface'],
      },
      {
        id: 'cat-externe-disky',
        slug: 'externe-disky-ssd-hdd',
        name: 'Externé disky (SSD a HDD)',
        parentSlug: 'pamatove-media-a-usb',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 2,
        allowedFilterAttributes: ['brand', 'capacity_gb', 'disk_type'],
      },
      {
        id: 'cat-pamatove-karty',
        slug: 'pamatove-karty-sd',
        name: 'Pamäťové karty (SD / microSD)',
        parentSlug: 'pamatove-media-a-usb',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 3,
        allowedFilterAttributes: ['brand', 'capacity_gb', 'card_type'],
      },
    ],
  },
];

export interface ProductInputFields {
  title: string;
  commodityName?: string;
  mpn?: string;
  ean?: string;
  description?: string;
  descriptionShort?: string;
  producerName?: string;
  attributes?: Record<string, any>;
}

/**
 * Nezávislý inteligentný klasifikátor: Kategorizuje produkt na základe jeho skutočných dát (názov, popis, partnumber, parametre)
 * NEPOUŽÍVA nespoľahlivú kategorizáciu dodávateľa.
 */
export function classifyProductIndependently(item: ProductInputFields): { slug: string; hierarchy: string[] } {
  const t = `${item.title || ''} ${item.commodityName || ''}`.toLowerCase();
  const desc = ((item.description || '') + ' ' + (item.descriptionShort || '')).toLowerCase();
  const fullText = `${t} ${desc} ${item.mpn || ''}`.toLowerCase();

  // 1. NOTEBOOKY
  const isNotebook = t.includes('ntb') || t.includes('notebook') || t.includes('laptop') ||
    t.includes('thinkpad') || t.includes('ideapad') || t.includes('expertbook') || t.includes('zenbook') ||
    t.includes('macbook') || t.includes('vivobook') || t.includes('latitude') || t.includes('inspiron') ||
    t.includes('probook') || t.includes('elitebook') || t.includes('victus') || t.includes('omen') ||
    t.includes('legion') || t.includes('predator') || t.includes('nitro') || t.includes('yoga') ||
    t.includes('swift') || t.includes('aspire') || t.includes('tuf gaming') || t.includes('rog zephyrus') ||
    t.includes('rog strix') || t.includes('katana') || t.includes('cyborg') || t.includes('v15 g') ||
    t.includes('250 g9') || t.includes('250 g10') || t.includes('450 g10') || t.includes('650 g10');

  const isAccessory = t.includes('carepack') || t.includes('care pack') || t.includes('rozšírenie záruky') ||
    t.includes('batoh') || t.includes('backpack') || t.includes('dokovac') || t.includes('dock') ||
    t.includes('puzdro') || t.includes('obal') || t.includes('baterka') || t.includes('bateria') ||
    t.includes('batéria') || t.includes('licencia') || t.includes('držiak') || t.includes('drziak');

  if (isAccessory && /\b(notebook|laptop|ntb)\b/.test(fullText)) {
    return { slug: 'prislusenstvo-k-notebookom', hierarchy: ['Príslušenstvo k notebookom'] };
  }

  if (isNotebook && !isAccessory) {
    // 1a. Herné notebooky (RTX grafiky, herné modelové rady)
    if (
      t.includes('rtx') || t.includes('geforce') || t.includes('radeon rx') ||
      t.includes('legion') || t.includes('predator') || t.includes('nitro') ||
      t.includes('victus') || t.includes('omen') || t.includes('tuf') ||
      t.includes('rog') || t.includes('katana') || t.includes('cyborg') ||
      t.includes('raider') || t.includes('stealth') || t.includes('gaming') ||
      desc.includes('rtx 40') || desc.includes('rtx 30') || desc.includes('rtx 20')
    ) {
      return { slug: 'herne-notebooky', hierarchy: ['Počítače a notebooky', 'Notebooky', 'Herné notebooky'] };
    }

    // 1b. 2v1 a dotykové notebooky
    if (
      t.includes('2in1') || t.includes('2v1') || t.includes('2-in-1') ||
      t.includes('touch') || t.includes('dotykov') || t.includes('x360') ||
      t.includes('flip') || t.includes('duet') || t.includes('spin') ||
      t.includes('detachable') || desc.includes('dotykový displej') || desc.includes('touchscreen')
    ) {
      return { slug: '2v1-a-dotykove-notebooky', hierarchy: ['Počítače a notebooky', 'Notebooky', '2v1 a dotykové notebooky'] };
    }

    // 1c. Firemné a pracovné notebooky
    if (
      t.includes('thinkpad') || t.includes('probook') || t.includes('elitebook') ||
      t.includes('latitude') || t.includes('precision') || t.includes('zbook') ||
      t.includes('expertbook') || t.includes('travelmate') || t.includes('thinkbook') ||
      t.includes('vostro') || desc.includes('windows 11 pro') || desc.includes('windows 10 pro')
    ) {
      return { slug: 'firemne-notebooky', hierarchy: ['Počítače a notebooky', 'Notebooky', 'Firemné a pracovné notebooky'] };
    }

    // 1d. Ultrabooky a prémiové ľahké modely
    if (
      t.includes('zenbook') || t.includes('swift') || t.includes('macbook') ||
      t.includes('gram') || t.includes('xps') || t.includes('surface laptop') ||
      t.includes('envy') || t.includes('yoga slim') || desc.includes('ultrabook') ||
      desc.includes('hmotnosť len 1.') || desc.includes('hmotnosť len 0.')
    ) {
      return { slug: 'ultrabooky', hierarchy: ['Počítače a notebooky', 'Notebooky', 'Ultrabooky a kompaktné'] };
    }

    // Všeobecný notebook
    return { slug: 'notebooky', hierarchy: ['Počítače a notebooky', 'Notebooky'] };
  }

  // 2. STOLNÉ POČÍTAČE, AIO & SERVERY
  if (
    t.includes('server') || t.includes('proliant') || t.includes('poweredge') ||
    t.includes('thinksystem') || t.includes('workstation') || t.includes('rack server')
  ) {
    return { slug: 'servery-a-workstation', hierarchy: ['Počítače a notebooky', 'Servery a pracovné stanice'] };
  }

  if (
    t.includes('all-in-one') || t.includes('all in one') || t.includes('aio') ||
    t.includes('imac') || t.includes('ideacentre aio') || t.includes('proone') ||
    t.includes('optiplex aio') || t.includes('veriton aio')
  ) {
    return { slug: 'all-in-one-pocitace', hierarchy: ['Počítače a notebooky', 'Stolné počítače', 'All-in-One PC'] };
  }

  if (
    t.includes('mini pc') || t.includes('minipc') || t.includes('nuc') ||
    t.includes('tiny') || t.includes('micro pc') || t.includes('usff') ||
    t.includes('mac mini') || t.includes('mac studio') || t.includes('deskmini')
  ) {
    return { slug: 'mini-pc', hierarchy: ['Počítače a notebooky', 'Stolné počítače', 'Mini PC'] };
  }

  if (
    (t.includes('počítač') || t.includes('pocitac') || t.includes('desktop') || t.includes('tower')) &&
    (t.includes('rtx') || t.includes('geforce') || t.includes('gaming') || t.includes('herný') || t.includes('herni'))
  ) {
    return { slug: 'herne-pocitace', hierarchy: ['Počítače a notebooky', 'Stolné počítače', 'Herné počítače'] };
  }

  if (
    t.includes('optiplex') || t.includes('thinkcentre') || t.includes('prodesk') ||
    t.includes('elitedesk') || t.includes('veriton') || t.includes('vostro desktop') ||
    t.includes('kancelársky pc') || t.includes('kancelarsky pc') || t.includes('stolný počítač')
  ) {
    return { slug: 'kancelarske-pocitace', hierarchy: ['Počítače a notebooky', 'Stolné počítače', 'Kancelárske a domáce PC'] };
  }

  // 3. MONITORY
  if (
    t.includes('monitor') || t.includes('lcd displej') || t.startsWith('lcd ') ||
    t.includes('oled monitor') || t.includes('gaming monitor') || t.includes('ultrawide') ||
    (t.includes('ips') && (t.includes('144hz') || t.includes('165hz') || t.includes('240hz') || t.includes('qhd') || t.includes('4k uhd')))
  ) {
    return { slug: 'monitory-a-displeje', hierarchy: ['Monitory a displeje'] };
  }

  // 4. KOMPONENTY
  if (
    t.includes('procesor') || t.includes('cpu') || t.includes('intel core i') ||
    t.includes('amd ryzen') || t.includes('core ultra') || t.includes('threadripper') ||
    t.includes('lga1700') || t.includes('socket am5')
  ) {
    return { slug: 'procesory', hierarchy: ['Počítačové komponenty', 'Procesory (CPU)'] };
  }

  if (
    (t.includes('grafická karta') || t.includes('graficka karta') || t.includes('vga') || t.includes('gpu')) ||
    ((t.includes('rtx 40') || t.includes('rtx 30') || t.includes('rx 7') || t.includes('rx 6')) && !t.includes('notebook') && !t.includes('laptop'))
  ) {
    return { slug: 'graficke-karty', hierarchy: ['Počítačové komponenty', 'Grafické karty (GPU)'] };
  }

  if (
    t.includes('operačná pamäť') || t.includes('operacna pamet') ||
    t.includes('ram ddr5') || t.includes('ram ddr4') || t.includes('ddr5 5600') ||
    t.includes('ddr5 6000') || t.includes('ddr4 3200') || t.includes('so-dimm') ||
    t.includes('kingston fury') || t.includes('corsair vengeance')
  ) {
    return { slug: 'pamate-ram', hierarchy: ['Počítačové komponenty', 'Operačné pamäte (RAM)'] };
  }

  if (
    t.includes('ssd') || t.includes('nvme') || t.includes('m.2 2280') ||
    t.includes('pcie 4.0 ssd') || t.includes('pcie 5.0 ssd') || t.includes('hdd 3.5') ||
    t.includes('barracuda') || t.includes('ironwolf') || t.includes('wd blue') ||
    t.includes('wd black') || t.includes('wd red') || t.includes('pevný disk')
  ) {
    return { slug: 'ssd-a-pevne-disky', hierarchy: ['Počítačové komponenty', 'SSD disky a úložiská'] };
  }

  if (
    t.includes('základná doska') || t.includes('zakladna doska') || t.includes('motherboard') ||
    t.includes('mainboard') || t.includes('b650') || t.includes('b760') || t.includes('z790') ||
    t.includes('x670') || t.includes('a620') || t.includes('z890')
  ) {
    return { slug: 'zakladne-dosky', hierarchy: ['Počítačové komponenty', 'Základné dosky'] };
  }

  if (
    t.includes('napájací zdroj') || t.includes('pocitacovy zdroj') || t.includes('power supply') ||
    t.includes('psu') || t.includes('80 plus gold') || t.includes('80 plus bronze') ||
    (t.includes('atx 3.0') && t.includes('w'))
  ) {
    return { slug: 'pocitacove-zdroje', hierarchy: ['Počítačové komponenty', 'Počítačové zdroje (PSU)'] };
  }

  if (
    t.includes('počítačová skrinka') || t.includes('pocitacova skrinka') ||
    t.includes('pc case') || t.includes('midi tower') || t.includes('mini itx case') ||
    t.includes('chassis')
  ) {
    return { slug: 'pocitacove-skrinky', hierarchy: ['Počítačové komponenty', 'Počítačové skrinky (Case)'] };
  }

  if (
    t.includes('chladič') || t.includes('chladic') || t.includes('cooler') ||
    t.includes('aio liquid') || t.includes('vodné chladenie') || t.includes('vodne chladenie') ||
    t.includes('ventilátor do skrinky') || t.includes('noctua') || t.includes('arctic liquid')
  ) {
    return { slug: 'chladenie-pc', hierarchy: ['Počítačové komponenty', 'Chladenie a ventilátory'] };
  }

  // 5. PERIFÉRIE
  if (
    t.includes('klávesnica') || t.includes('klavesnica') || t.includes('keyboard') ||
    t.includes('myš') || t.includes('mys') || t.includes('mouse') ||
    t.includes('trackball') || t.includes('podložka pod myš') || t.includes('podlozka pod mys')
  ) {
    return { slug: 'klavesnice-a-mysi', hierarchy: ['Príslušenstvo a periférie', 'Klávesnice a myši'] };
  }

  if (
    t.includes('slúchadlá') || t.includes('sluchadla') || t.includes('headset') ||
    t.includes('herné slúchadlá') || t.includes('sluchátka')
  ) {
    return { slug: 'sluchadla-a-headsety', hierarchy: ['Príslušenstvo a periférie', 'Slúchadlá a headsety'] };
  }

  if (
    t.includes('dokovacia stanica') || t.includes('dokovaci stanice') ||
    t.includes('thunderbolt dock') || t.includes('usb-c dock') || t.includes('usb hub') ||
    t.includes('replikátor portov')
  ) {
    return { slug: 'dokovacie-stanice', hierarchy: ['Príslušenstvo a periférie', 'Dokovacie stanice a USB huby'] };
  }

  if (
    t.includes('webkamera') || t.includes('webcam') || t.includes('mikrofón') ||
    t.includes('mikrofon') || t.includes('streaming mikrofón')
  ) {
    return { slug: 'webkamery-a-mikrofony', hierarchy: ['Príslušenstvo a periférie', 'Webkamery a mikrofóny'] };
  }

  if (
    t.includes('reproduktory') || t.includes('reproduktory k pc') || t.includes('pc reproduktory') ||
    t.includes('soundbar k monitoru')
  ) {
    return { slug: 'reproduktory-k-pc', hierarchy: ['Príslušenstvo a periférie', 'Reproduktory k počítaču'] };
  }

  // 6. SIEŤOVÉ PRVKY
  if (
    t.includes('router') || t.includes('mesh systém') || t.includes('mesh system') ||
    t.includes('wi-fi router') || t.includes('wifi router') || t.includes('access point')
  ) {
    return { slug: 'wifi-routere-a-mesh', hierarchy: ['Sieťové prvky a Wi-Fi', 'Wi-Fi routere a Mesh systémy'] };
  }

  if (
    t.includes('switch') || t.includes('prepínač') || t.includes('prepinac') ||
    t.includes('poe switch') || t.includes('gigabit switch')
  ) {
    return { slug: 'switche-a-prepinace', hierarchy: ['Sieťové prvky a Wi-Fi', 'Switche a sieťové prepínače'] };
  }

  if (
    t.includes('nas') || t.includes('synology') || t.includes('qnap') ||
    t.includes('diskstation') || t.includes('sieťové úložisko')
  ) {
    return { slug: 'nas-sietove-uloziska', hierarchy: ['Sieťové prvky a Wi-Fi', 'NAS sieťové dátové úložiská'] };
  }

  // 7. TLAČIARNE A KANCELÁRIA
  if (
    t.includes('toner') || t.includes('cartridge') || t.includes('atramentová náplň') ||
    t.includes('atramentova napln')
  ) {
    return { slug: 'tonery-a-naplne', hierarchy: ['Tlačiarne a kancelária', 'Tonery, cartridge a náplne'] };
  }

  if (
    t.includes('skener') || t.includes('scanner') || t.includes('dokumentový skener')
  ) {
    return { slug: 'skenery', hierarchy: ['Tlačiarne a kancelária', 'Dokumentové skenery'] };
  }

  if (
    t.includes('tlačiareň') || t.includes('tlaciaren') || t.includes('printer') ||
    t.includes('laserjet') || t.includes('deskjet') || t.includes('pixma') ||
    t.includes('ecotank') || t.includes('multifunkčn') || t.includes('multifunkcn')
  ) {
    return { slug: 'tlaciarne-a-multifunkcie', hierarchy: ['Tlačiarne a kancelária', 'Tlačiarne a multifunkčné zariadenia'] };
  }

  // 8. NAPÁJANIE, ZÁLOŽNÉ ZDROJE A KÁBLE
  if (
    t.includes('ups') || t.includes('záložný zdroj') || t.includes('zalozny zdroj') ||
    t.includes('prepäťová ochrana') || t.includes('prepatova ochrana') ||
    t.includes('back-ups') || t.includes('smart-ups')
  ) {
    return { slug: 'ups-zalozne-zdroje', hierarchy: ['Napájanie, záložné zdroje a káble', 'UPS záložné zdroje a prepäťové ochrany'] };
  }

  if (
    t.includes('kábel') || t.includes('kabel') || t.includes('redukcia') ||
    t.includes('hdmi') || t.includes('displayport') || t.includes('patch kábel') ||
    t.includes('usb-c kábel')
  ) {
    return { slug: 'kable-a-redukcie', hierarchy: ['Napájanie, záložné zdroje a káble', 'Káble, redukcie a adaptéry'] };
  }

  if (
    t.includes('nabíjačka') || t.includes('nabijacka') || t.includes('napájací adaptér') ||
    t.includes('napadaci adapter') || t.includes('power adapter')
  ) {
    return { slug: 'nabijacky-a-adaptery', hierarchy: ['Napájanie, záložné zdroje a káble', 'Nabíjačky a napájacie adaptéry'] };
  }

  // 9. PAMÄŤOVÉ MÉDIÁ
  if (
    t.includes('flash disk') || t.includes('usb flash') || t.includes('usb kľúč') ||
    t.includes('usb kluc') || t.includes('datatraveler')
  ) {
    return { slug: 'usb-flash-disky', hierarchy: ['Pamäťové médiá a USB', 'USB flash disky'] };
  }

  if (
    t.includes('externý disk') || t.includes('externy disk') || t.includes('external hdd') ||
    t.includes('portable ssd') || t.includes('externé ssd')
  ) {
    return { slug: 'externe-disky-ssd-hdd', hierarchy: ['Pamäťové médiá a USB', 'Externé disky (SSD a HDD)'] };
  }

  if (
    t.includes('pamäťová karta') || t.includes('pametova karta') || t.includes('microsd') ||
    t.includes('sdhc') || t.includes('sdxc')
  ) {
    return { slug: 'pamatove-karty-sd', hierarchy: ['Pamäťové médiá a USB', 'Pamäťové karty (SD / microSD)'] };
  }

  // Default fallback pre ostatné IT periférie
  return { slug: 'prislusenstvo-a-periferie', hierarchy: ['Príslušenstvo a periférie'] };
}
