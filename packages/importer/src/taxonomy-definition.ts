import { TaxonomyCategory } from '@worlds/types';

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

/**
 * Zoznam povolených hardvérových kľúčových slov a komodít
 */
const COMPUTER_HARDWARE_KEYWORDS = [
  'notebook', 'laptop', 'thinkpad', 'ideapad', 'expertbook', 'zenbook', 'macbook', 'vivobook', 'latitude',
  'inspiron', 'probook', 'elitebook', 'victus', 'omen', 'legion', 'predator', 'nitro', 'yoga', 'swift', 'aspire',
  'počítač', 'pocitac', 'desktop', 'optiplex', 'thinkcentre', 'prodesk', 'elitedesk', 'all in one', 'aio', 'workstation', 'server',
  'procesor', 'cpu', 'intel core', 'amd ryzen', 'xeon', 'threadripper',
  'grafická karta', 'graficka karta', 'vga', 'gpu', 'geforce', 'radeon', 'rtx', 'gtx', 'quadro',
  'pamäť', 'pamet', 'ram', 'ddr4', 'ddr5', 'so-dimm', 'dimm', 'fury',
  'disk', 'ssd', 'nvme', 'm.2', 'pcie ssd', 'hdd', 'sata', 'barracuda', 'ironwolf', 'wd blue', 'wd black', 'wd red',
  'základná doska', 'zakladna doska', 'motherboard', 'mainboard', 'b650', 'b760', 'z790', 'x670', 'socket',
  'zdroj', 'power supply', 'psu', '80 plus', 'modular',
  'skrinka', 'case', 'chassis', 'tower',
  'chladenie', 'chladic', 'cooler', 'aio cooler', 'ventilator', 'fan',
  'monitor', 'lcd', 'display', 'oled', 'ips', 'qhd', '4k', 'gaming monitor', 'curved', '144hz', '165hz', '240hz',
  'klávesnica', 'klavesnica', 'keyboard', 'myš', 'mys', 'mouse', 'trackball', 'podložka pod myš',
  'slúchadlá', 'sluchadla', 'headset', 'mikrofón', 'mikrofon', 'webkamera', 'webcam', 'reproduktory', 'speakers',
  'dokovacia stanica', 'dokovaci stanice', 'dock', 'docking', 'usb hub', 'replikátor',
  'router', 'wi-fi', 'wifi', 'switch', 'access point', 'mesh', 'nas', 'synology', 'qnap', 'patch panel',
  'tlačiareň', 'tlaciaren', 'printer', 'laserjet', 'deskjet', 'pixma', 'ecotank', 'toner', 'cartridge', 'skener', 'scanner',
  'ups', 'záložný zdroj', 'zalozny zdroj', 'prepäťová ochrana', 'prepatova ochrana', 'apc', 'eaton',
  'flash disk', 'usb disk', 'pamäťová karta', 'pametova karta', 'sd karta', 'microsd', 'externý disk', 'externi disk'
];

/**
 * Filter: Určí, či je produkt skutočný počítačový hardvér
 */
export function isComputerHardware(name: string, comCode: string, comName: string, categoryName?: string): boolean {
  const text = `${name} ${comCode} ${comName} ${categoryName || ''}`.toLowerCase();

  // Vylúčime jednoznačne nesúvisiace položky
  const blackList = [
    'auto-moto', 'autokozmetika', 'žiarovka', 'ziarovka', 'pneumatika', 'autobatéria', 'autobaterie',
    'kuchyn', 'gril', 'panvica', 'kávovar', 'vysávač', 'vysavac', 'žehlička', 'zehlicka', 'hračka', 'hracka',
    'detský', 'detsky', 'bicykel', 'kolobežka', 'kolobezka', 'záhrada', 'zahrada', 'kosačka', 'kosacka',
    'parfém', 'kozmetika', 'oblečenie', 'topánky', 'chladnička', 'práčka', 'sporák', 'rúra'
  ];

  for (const b of blackList) {
    if (text.includes(b)) return false;
  }

  // Overíme prítomnosť počítačového hardvéru
  return COMPUTER_HARDWARE_KEYWORDS.some(k => text.includes(k));
}

/**
 * Inteligentné mapovanie produktu do taxonómie Worlds.sk
 */
export function mapToCleanTaxonomy(name: string, comCode: string, comName: string): { slug: string; hierarchy: string[] } {
  const n = name.toLowerCase();
  const c = comName.toLowerCase();
  const code = comCode.toLowerCase();

  // 1. Notebooky
  if (c.includes('notebook') || code === 'nb' || n.includes('notebook') || n.includes('laptop') || n.includes('thinkpad') || n.includes('ideapad') || n.includes('expertbook') || n.includes('zenbook') || n.includes('macbook')) {
    if (n.includes('legion') || n.includes('predator') || n.includes('nitro') || n.includes('victus') || n.includes('omen') || n.includes('tuf ') || n.includes('gaming')) {
      return { slug: 'herne-notebooky', hierarchy: ['Počítače a notebooky', 'Notebooky', 'Herné notebooky'] };
    }
    if (n.includes('thinkpad') || n.includes('probook') || n.includes('elitebook') || n.includes('latitude') || n.includes('expertbook')) {
      return { slug: 'firemne-notebooky', hierarchy: ['Počítače a notebooky', 'Notebooky', 'Firemné a pracovné notebooky'] };
    }
    if (n.includes('zenbook') || n.includes('swift') || n.includes('macbook') || n.includes('yoga') || n.includes('gram')) {
      return { slug: 'ultrabooky', hierarchy: ['Počítače a notebooky', 'Notebooky', 'Ultrabooky a kompaktné'] };
    }
    if (n.includes('2in1') || n.includes('2v1') || n.includes('touch') || n.includes('x360') || n.includes('flip')) {
      return { slug: '2v1-a-dotykove-notebooky', hierarchy: ['Počítače a notebooky', 'Notebooky', '2v1 a dotykové notebooky'] };
    }
    return { slug: 'notebooky', hierarchy: ['Počítače a notebooky', 'Notebooky'] };
  }

  // 2. Stolné PC & Servery
  if (c.includes('server') || n.includes('proliant') || n.includes('poweredge') || n.includes('thinksystem')) {
    return { slug: 'servery-a-workstation', hierarchy: ['Počítače a notebooky', 'Servery a pracovné stanice'] };
  }
  if (n.includes('aio') || n.includes('all in one') || n.includes('all-in-one')) {
    return { slug: 'all-in-one-pocitace', hierarchy: ['Počítače a notebooky', 'Stolné počítače', 'All-in-One PC'] };
  }
  if (n.includes('mini pc') || n.includes('nuc') || n.includes('tiny') || n.includes('micro')) {
    return { slug: 'mini-pc', hierarchy: ['Počítače a notebooky', 'Stolné počítače', 'Mini PC'] };
  }
  if (n.includes('herný počítač') || n.includes('herni pc') || n.includes('legion t') || n.includes('predator orion') || n.includes('omen 25l') || n.includes('omen 40l')) {
    return { slug: 'herne-pocitace', hierarchy: ['Počítače a notebooky', 'Stolné počítače', 'Herné počítače'] };
  }
  if (c.includes('počítač') || c.includes('desktop') || c.includes('pc') || n.includes('optiplex') || n.includes('thinkcentre') || n.includes('prodesk')) {
    return { slug: 'kancelarske-pocitace', hierarchy: ['Počítače a notebooky', 'Stolné počítače', 'Kancelárske a domáce PC'] };
  }

  // 3. Monitory
  if (c.includes('monitor') || c.includes('lcd') || n.startsWith('lcd ') || n.includes('monitor')) {
    return { slug: 'monitory-a-displeje', hierarchy: ['Monitory a displeje'] };
  }

  // 4. Komponenty
  if (c.includes('procesor') || c.includes('cpu') || n.includes('core i') || n.includes('ryzen') || n.includes('intel core') || n.includes('amd ryzen')) {
    return { slug: 'procesory', hierarchy: ['Počítačové komponenty', 'Procesory (CPU)'] };
  }
  if (c.includes('grafick') || c.includes('vga') || c.includes('gpu') || n.includes('geforce') || n.includes('radeon') || n.includes('rtx ') || n.includes('gtx ')) {
    return { slug: 'graficke-karty', hierarchy: ['Počítačové komponenty', 'Grafické karty (GPU)'] };
  }
  if (c.includes('pamäť') || c.includes('pamet') || c.includes('ram') || n.includes('ddr4') || n.includes('ddr5') || n.includes('so-dimm')) {
    return { slug: 'pamate-ram', hierarchy: ['Počítačové komponenty', 'Operačné pamäte (RAM)'] };
  }
  if (c.includes('ssd') || c.includes('hdd') || c.includes('disk') || n.includes('ssd') || n.includes('nvme') || n.includes('m.2')) {
    return { slug: 'ssd-a-pevne-disky', hierarchy: ['Počítačové komponenty', 'SSD disky a úložiská'] };
  }
  if (c.includes('základná doska') || c.includes('motherboard') || c.includes('mb') || n.includes('motherboard') || n.includes('socket')) {
    return { slug: 'zakladne-dosky', hierarchy: ['Počítačové komponenty', 'Základné dosky'] };
  }
  if (c.includes('zdroj') || c.includes('psu') || c.includes('power supply')) {
    return { slug: 'pocitacove-zdroje', hierarchy: ['Počítačové komponenty', 'Počítačové zdroje (PSU)'] };
  }
  if (c.includes('skrink') || c.includes('case') || c.includes('chassis')) {
    return { slug: 'pocitacove-skrinky', hierarchy: ['Počítačové komponenty', 'Počítačové skrinky (Case)'] };
  }
  if (c.includes('chladenie') || c.includes('cooler') || c.includes('ventilator') || n.includes('cooler') || n.includes('noctua')) {
    return { slug: 'chladenie-pc', hierarchy: ['Počítačové komponenty', 'Chladenie a ventilátory'] };
  }

  // 5. Periférie
  if (c.includes('klávesnic') || c.includes('myš') || c.includes('keyboard') || c.includes('mouse') || n.includes('keyboard') || n.includes('myš') || n.includes('mys')) {
    return { slug: 'klavesnice-a-mysi', hierarchy: ['Príslušenstvo a periférie', 'Klávesnice a myši'] };
  }
  if (c.includes('slúchadl') || c.includes('headset') || n.includes('headset') || n.includes('slúchadlá')) {
    return { slug: 'sluchadla-a-headsety', hierarchy: ['Príslušenstvo a periférie', 'Slúchadlá a headsety'] };
  }
  if (c.includes('dokov') || c.includes('dock') || c.includes('hub') || n.includes('dock') || n.includes('dokovacia')) {
    return { slug: 'dokovacie-stanice', hierarchy: ['Príslušenstvo a periférie', 'Dokovacie stanice a USB huby'] };
  }
  if (c.includes('webkam') || c.includes('mikrof') || n.includes('webcam') || n.includes('webkamera') || n.includes('mikrofón')) {
    return { slug: 'webkamery-a-mikrofony', hierarchy: ['Príslušenstvo a periférie', 'Webkamery a mikrofóny'] };
  }
  if (c.includes('reproduktor') || c.includes('speaker') || n.includes('reproduktory')) {
    return { slug: 'reproduktory-k-pc', hierarchy: ['Príslušenstvo a periférie', 'Reproduktory k počítaču'] };
  }

  // 6. Sieťové prvky
  if (c.includes('router') || c.includes('mesh') || n.includes('router') || n.includes('mesh')) {
    return { slug: 'wifi-routere-a-mesh', hierarchy: ['Sieťové prvky a Wi-Fi', 'Wi-Fi routere a Mesh systémy'] };
  }
  if (c.includes('switch') || c.includes('prepínač') || n.includes('switch')) {
    return { slug: 'switche-a-prepinace', hierarchy: ['Sieťové prvky a Wi-Fi', 'Switche a sieťové prepínače'] };
  }
  if (c.includes('nas') || n.includes('synology') || n.includes('qnap') || n.includes('diskstation')) {
    return { slug: 'nas-sietove-uloziska', hierarchy: ['Sieťové prvky a Wi-Fi', 'NAS sieťové dátové úložiská'] };
  }

  // 7. Tlačiarne a kancelária
  if (c.includes('toner') || c.includes('cartridge') || c.includes('náplň') || n.includes('toner') || n.includes('cartridge')) {
    return { slug: 'tonery-a-naplne', hierarchy: ['Tlačiarne a kancelária', 'Tonery, cartridge a náplne'] };
  }
  if (c.includes('skener') || c.includes('scanner') || n.includes('scanner') || n.includes('skener')) {
    return { slug: 'skenery', hierarchy: ['Tlačiarne a kancelária', 'Dokumentové skenery'] };
  }
  if (c.includes('tlačiar') || c.includes('printer') || n.includes('laserjet') || n.includes('deskjet') || n.includes('pixma') || n.includes('tlačiareň')) {
    return { slug: 'tlaciarne-a-multifunkcie', hierarchy: ['Tlačiarne a kancelária', 'Tlačiarne a multifunkčné zariadenia'] };
  }

  // 8. Napájanie a káble
  if (c.includes('ups') || c.includes('záložn') || n.includes('ups') || n.includes('back-ups') || n.includes('smart-ups')) {
    return { slug: 'ups-zalozne-zdroje', hierarchy: ['Napájanie, záložné zdroje a káble', 'UPS záložné zdroje a prepäťové ochrany'] };
  }
  if (c.includes('kábel') || c.includes('kabel') || c.includes('redukc') || c.includes('adaptér') || n.includes('hdmi') || n.includes('displayport') || n.includes('patch kabel')) {
    return { slug: 'kable-a-redukcie', hierarchy: ['Napájanie, záložné zdroje a káble', 'Káble, redukcie a adaptéry'] };
  }
  if (c.includes('nabíjač') || c.includes('nabijack') || n.includes('nabíjačka') || n.includes('adaptér')) {
    return { slug: 'nabijacky-a-adaptery', hierarchy: ['Napájanie, záložné zdroje a káble', 'Nabíjačky a napájacie adaptéry'] };
  }

  // 9. Pamäťové médiá
  if (c.includes('flash') || n.includes('flash disk') || n.includes('usb kľúč') || n.includes('datatraveler')) {
    return { slug: 'usb-flash-disky', hierarchy: ['Pamäťové médiá a USB', 'USB flash disky'] };
  }
  if (c.includes('extern') || n.includes('externý disk') || n.includes('external hdd') || n.includes('portable ssd')) {
    return { slug: 'externe-disky-ssd-hdd', hierarchy: ['Pamäťové médiá a USB', 'Externé disky (SSD a HDD)'] };
  }
  if (c.includes('karta') || n.includes('microsd') || n.includes('sdhc') || n.includes('sdxc')) {
    return { slug: 'pamatove-karty-sd', hierarchy: ['Pamäťové médiá a USB', 'Pamäťové karty (SD / microSD)'] };
  }

  // Default fallback
  return { slug: 'prislusenstvo-a-periferie', hierarchy: ['Príslušenstvo a periférie'] };
}
