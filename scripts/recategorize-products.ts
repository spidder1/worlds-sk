import pg from 'pg';
import { WORLDS_IT_CATEGORIES } from '../packages/importer/src/taxonomy-definition.ts';
import type { TaxonomyCategory } from '@worlds/types';

const { Pool } = pg;

function requireDatabaseUrl(): string {
  const connectionString = process.env.DATABASE_URL?.trim();
  if (!connectionString) {
    throw new Error('DATABASE_URL is required. Refusing to guess a production database.');
  }
  return connectionString;
}

const connectionString = requireDatabaseUrl();

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

const NOTEBOOK_CATEGORY_SLUGS = new Set([
  'notebooky', 'herne-notebooky', 'firemne-notebooky', 'ultrabooky', '2v1-a-dotykove-notebooky',
  'prislusenstvo-k-notebookom', 'tasky-a-puzdra-na-notebooky', 'baterie-a-adaptery-k-notebookom',
  'chladenie-a-stojany-na-notebooky', 'ochranne-folie-a-skla', 'pera-a-stylusy',
]);
const NOTEBOOK_SIGNAL_RE = /\b(notebook|notebooky|laptop|ntb|macbook|thinkpad|ideapad|thinkbook|legion|zenbook|vivobook|expertbook|chromebook|probook|elitebook|latitude|aspire|swift|yoga|surface book|rog|tuf)\b/i;

export function categorizeProductSmartly(title: string, currentSlug: string): { slug: string; hierarchy: string[] } {
  const t = title.toLowerCase();
  const notebookContext = /(notebook|laptop|\bntb\b|macbook|thinkpad|probook|elitebook|latitude|ideapad|chromebook|aspire|vivobook|zenbook|yoga|legion|rog|tuf)/i.test(t);

  // High-confidence product-family rules run first. Supplier titles frequently
  // contain compatible-device words (for example "for Chromebook"), so these
  // checks must win before the generic notebook/component rules below.
  if (/\b(záruk|zaruk|warranty|care ?pack|carepack|onsite|on-site|premier support|support contract|service contract|pickup.{0,20}return|technical support|support service|std exch|ons pda|trv nb|\d+\s*(?:y|year|years) .*svc|prodloužen|prodlouzeni|rozšíren|rozsiren|predĺžen|predlzen|pws|nbd|subscription|licenc|license)\b/i.test(t)) {
    return { slug: 'zaruky-a-sluzby', hierarchy: ['Príslušenstvo a periférie', 'Záruky, rozšírenia a služby'] };
  }
  if (/\b(toner|cartridge|ink cartridge|atrament|inkoust|kazeta|valec pre|drum unit|printhead|náplň|naplň)\b/i.test(t)) {
    return { slug: 'tonery-a-naplne', hierarchy: ['Tlačiarne a kancelárska technika', 'Tonery a náplne'] };
  }
  if (/\b(printer|tlačiareň|tlaciaren|multifunk|laserjet|deskjet|officejet|imageprograf|plotter)\b/i.test(t)) {
    return { slug: 'tlaciarne-a-multifunkcie', hierarchy: ['Tlačiarne a kancelárska technika', 'Tlačiarne a multifunkcie'] };
  }
  if (/(micro\s*sd|sdxc|sdhc|compactflash|cf card|pamäťová karta|pamatova karta|memory card)/i.test(t)) {
    return { slug: 'pamatove-karty-sd', hierarchy: ['Úložiská a pamäte', 'Pamäťové karty (SD / microSD)'] };
  }
  if (/\b(flash disk|usb flash|thumb ?drive|pendrive|usb stick)\b/i.test(t)) {
    return { slug: 'usb-flash-disky', hierarchy: ['Úložiská a pamäte', 'USB flash disky'] };
  }
  if (/\b(smartphone|phone|iphone|ipad|tablet|tab|legion go|smartwatch|skoda|škoda|superb)\b/i.test(t)) {
    return { slug: 'prislusenstvo-a-periferie', hierarchy: ['Príslušenstvo a periférie'] };
  }
  if (/\b(smart-?ups|ups|battery pack.*ups|ups.*batéri|ups.*bateri|záložný zdroj|zalozny zdroj)\b/i.test(t)) {
    return { slug: 'ups-zalozne-zdroje', hierarchy: ['Napájanie a káble', 'UPS a záložné zdroje'] };
  }
  if (/(laptop lock|notebook lock|zámok na notebook|zamok na notebook|briefcase|laptop bag|laptop roller|aktovka na notebook|stolek na notebook|notebook table|powerbank|power bank)/i.test(t)) {
    return { slug: 'prislusenstvo-a-periferie', hierarchy: ['Príslušenstvo a periférie'] };
  }
  if (/(notebook|laptop|\bntb\b|macbook|thinkpad|probook|elitebook|latitude|ideapad|chromebook|aspire|vivobook|zenbook)/i.test(t) && /(secret|filter|podstav|stojan|stolek|kábel|kabel|cable|držiak|drzak|držák|zámok|zamok|lock|t-lock|čisti|cisti|vrecko|messenger|taška|taska|puzdro|sleeve|batoh|vozík|vozik|napájací|napajaci|power cord|napájecí zdroj|napajeci zdroj|zdroj pre notebook|screw|skrut|hdd|hard drive|hardware kit|pevného disku|lte|modul|pamäť|pamat|sodimm|ddr[345])/i.test(t)) {
    return { slug: 'prislusenstvo-a-periferie', hierarchy: ['Príslušenstvo a periférie'] };
  }
  if (notebookContext && /(batéri|bateri|battery|li-ion|li-pol|mah\b|\d+\s*wh\b|nabíjač|nabijac|charger|power adapter)/i.test(t)) {
    return { slug: 'baterie-a-adaptery-k-notebookom', hierarchy: ['Príslušenstvo a periférie', 'Príslušenstvo k notebookom', 'Batérie a adaptéry k notebookom'] };
  }
  if (notebookContext && /(ochrann[áaeé] fóli|ochrann[áaeé] foli|ochrann[ée] sk|screen protector|privacy filter|paper feeling|flexibleglass|bladeshield|lens protection|tempered glass|fólie|folie|folia pro)/i.test(t)) {
    return { slug: 'ochranne-folie-a-skla', hierarchy: ['Príslušenstvo a periférie', 'Príslušenstvo k notebookom', 'Ochranné fólie a sklá'] };
  }
  if (/\b(taška|taska|brašna|brasna|batoh|backpack|sleeve|topload|carry case|puzdro|pouzdro|kufrík|kufrik|bag pro)\b/i.test(t)) {
    return { slug: 'tasky-a-puzdra-na-notebooky', hierarchy: ['Príslušenstvo a periférie', 'Príslušenstvo k notebookom', 'Tašky, batohy a puzdrá na notebooky'] };
  }
  if (/\b(stojan na notebook|stojan pre notebook|laptop stand|chladiaca podložka|chladiaca|chladící podložka|chladicí podložka|cooling pad|podstavec pro notebook|držák na notebook|drzak na notebook)\b/i.test(t)) {
    return { slug: 'chladenie-a-stojany-na-notebooky', hierarchy: ['Príslušenstvo a periférie', 'Príslušenstvo k notebookom', 'Chladiace podložky a stojany'] };
  }
  if (/(webcam|webkamera|microphone|mikrofón|mikrofon|lavalier|klopový mikrofón|klopovy mikrofon)/i.test(t)) {
    return { slug: 'webkamery-a-mikrofony', hierarchy: ['Príslušenstvo a periférie', 'Webkamery a mikrofóny'] };
  }
  if (/(headset|headphones|slúchadlá|sluchátka|earbuds|tws)/i.test(t)) {
    return { slug: 'sluchadla-a-headsety', hierarchy: ['Príslušenstvo a periférie', 'Slúchadlá a headsety'] };
  }
  if (/\b(ups|záložný zdroj|zalozny zdroj|uninterruptible|powerwalker|line-interactive)\b/i.test(t)) {
    return { slug: 'ups-zalozne-zdroje', hierarchy: ['Napájanie a káble', 'UPS a záložné zdroje'] };
  }
  if (/\b(psu|napájací zdroj|napajaci zdroj|power supply|80\s*\+|80plus|zdroj pre pc|pc power)\b/i.test(t)) {
    return { slug: 'pocitacove-zdroje', hierarchy: ['Počítačové komponenty', 'Počítačové zdroje'] };
  }
  if (/\b(motherboard|mainboard|základná doska|zakladna doska|b550|b650|b760|a620|z790|h610|x670|x870)\b/i.test(t)) {
    return { slug: 'zakladne-dosky', hierarchy: ['Počítačové komponenty', 'Základné dosky'] };
  }
  if (/\b(usb hub|hub usb|docking station|dokovacia stanica|dokovacie zariadenie|port replicator)\b/i.test(t)) {
    return { slug: 'dokovacie-stanice', hierarchy: ['Príslušenstvo a periférie', 'Dokovacie stanice a USB huby'] };
  }
  if (/\b(router|routery|wi-?fi|wireless router|mesh system|access point|lte router)\b/i.test(t)) {
    return { slug: 'wifi-routere-a-mesh', hierarchy: ['Sieťové prvky', 'Wi-Fi routery a Mesh'] };
  }
  if (/\b(joystick|gamepad|cleaning kit|čistiaca sada|cistiaca sada|tool kit|nástrojová sada|nastrojova sada)\b/i.test(t)) {
    return { slug: 'prislusenstvo-a-periferie', hierarchy: ['Príslušenstvo a periférie'] };
  }
  if (/\b(fan|ventilátor|ventilator|cpu cooler|chladic procesora|thermal paste|teplovodivá pasta|teplovodiva pasta)\b/i.test(t)) {
    return { slug: 'chladenie-pc', hierarchy: ['Počítačové komponenty', 'Chladenie PC'] };
  }
  if (/\b(extension lead|predlžovačka|predlzovacka|power strip)\b/i.test(t)) {
    return { slug: 'kable-a-redukcie', hierarchy: ['Napájanie a káble', 'Káble, redukcie a adaptéry'] };
  }
  if (/\b(phone case|iphone|ipad case|galaxy|pixel \d|mobil|smartphone|xiaomi .*case|realme .*case)\b/i.test(t)) {
    return { slug: 'prislusenstvo-a-periferie', hierarchy: ['Príslušenstvo a periférie'] };
  }
  if (/\b(mb\s+sc|motherboard|mainboard|základná doska|zakladna doska|b450|b550|b660|b760|a620|z790|h610|h810|x670|x870)\b/i.test(t)) {
    return { slug: 'zakladne-dosky', hierarchy: ['Počítačové komponenty', 'Základné dosky'] };
  }
  if (/\b(ssd nvme case|nvme case|m\.2.*box|externí box pro ssd|externy box pre ssd)\b/i.test(t)) {
    return { slug: 'ssd-a-pevne-disky', hierarchy: ['Úložiská a pamäte', 'SSD a pevné disky'] };
  }
  if (/(\bssd\b|solid state drive|nvme ssd|m\.2 ssd)/i.test(t) && !/(notebook|laptop|\bntb\b|macbook|thinkpad|probook|elitebook|latitude|ideapad|chromebook|aspire|vivobook|zenbook|legion|rog|tuf)/i.test(t)) {
    return { slug: 'ssd-a-pevne-disky', hierarchy: ['Úložiská a pamäte', 'SSD a pevné disky'] };
  }
  if (/(vga splitter|vga rozbočovač|vga kábel|vga kabel|vga cable|vga holder|kvm prepínač|kvm prepinac|gpu .*cbl|gpu .*cable|gpu pwr|gpu support bracket)/i.test(t)) {
    return { slug: 'kable-a-redukcie', hierarchy: ['Napájanie a káble', 'Káble, redukcie a adaptéry'] };
  }
  if (/(chladič|chladenie cpu|cpu cooler|thermal paste|teplovodivá pasta|teplovodiva pasta)/i.test(t)) {
    return { slug: 'chladenie-pc', hierarchy: ['Počítačové komponenty', 'Chladenie PC'] };
  }
  if (/(routerboard|mikrotik router|thermal paste|tepelná pasta|vodné chladenie|vodni chlazení|heat sink)/i.test(t)) {
    return { slug: t.includes('router') ? 'wifi-routere-a-mesh' : 'chladenie-pc', hierarchy: t.includes('router') ? ['Sieťové prvky', 'Wi-Fi routery a Mesh'] : ['Počítačové komponenty', 'Chladenie PC'] };
  }
  if (/\b(stojan monitoru|držák monitoru|držiak monitoru|monitor arm|mount monitor)\b/i.test(t)) {
    return { slug: 'prislusenstvo-a-periferie', hierarchy: ['Príslušenstvo a periférie'] };
  }
  if (/(podstavec pod monitor|podstav.*monitor|soundbar|reproduktorová lišta|patch panel|rack|držiak na monitor|drzak na monitor)/i.test(t)) {
    return { slug: 'prislusenstvo-a-periferie', hierarchy: ['Príslušenstvo a periférie'] };
  }
  if (/\b(kuchyňsk[áa] váha|kuchynsk[áa] vaha|digitáln[áa] váha|digitaln[áa] vaha|gps .*display|display .*váha)\b/i.test(t)) {
    return { slug: 'prislusenstvo-a-periferie', hierarchy: ['Príslušenstvo a periférie'] };
  }
  if (/(čtečka|ctecka|reader|vesa plate|all-in-one video kit|externí box)/i.test(t)) {
    return { slug: 'prislusenstvo-a-periferie', hierarchy: ['Príslušenstvo a periférie'] };
  }
  if (/(monitor|monitory|lcd monitor|gaming monitor|display panel|displej monitor|\d{2}["″])/i.test(t) && !/(ochrann|protector|fólia|folia|sklo|kuchyň|kuchyn|váha|vaha|gps|collar|patch panel|poe injektor|ventilační jednotka)/i.test(t)) {
    return { slug: 'monitory-a-displeje', hierarchy: ['Monitory a displeje'] };
  }
  if (/\b(skriňa|skrinka|case|miditower|midi tower|mini tower|big tower|tower chassis|pc chassis)\b/i.test(t) && !/\b(laptop case|phone case|puzdro|ssd case|nvme case|external box|enclosure|galaxy|iphone|mobil)\b/i.test(t)) {
    return { slug: 'pocitacove-skrinky', hierarchy: ['Počítačové komponenty', 'Počítačové skrinky (Case)'] };
  }
  if (/\b(hdmi|displayport|usb-c|usb hub|hub usb|prevodník|prevodnik|redukcia|redukce|adapter|adaptér|converter|switch)\b/i.test(t) && !/\b(router|switch\s+(?:cisco|hpe|tp-link)|motherboard|základná doska)\b/i.test(t)) {
    return { slug: 'kable-a-redukcie', hierarchy: ['Napájanie a káble', 'Káble, redukcie a adaptéry'] };
  }

  // --- Rule 1: Laptop Accessories (Batteries, Chargers, Docks, Bags, Warranties, Covers, Pens, Stands) ---
  if (
    notebookContext && (
      t.includes('bateria') || t.includes('batéria') || t.includes('baterie') || t.includes('battery') ||
      t.includes('adaptér') || t.includes('adapter') || t.includes('nabíjač') || t.includes('nabijac') ||
      t.includes('konektor') || t.includes('power supply') || t.includes('charging cable')
    )
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

  if (notebookContext && (t.includes('sklo') || t.includes('fólia') || t.includes('folia') || t.includes('privacy') || t.includes('súkromie'))) {
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

  // Gaming brand names also occur on peripherals, games and power supplies;
  // keep those out of the notebook branches unless the title describes a PC.
  if (!/(notebook|laptop|ntb|macbook)/i.test(t) && /(digital|steam|soundtrack|artbook|skin|wrist rest|podložka na zem|cosmic mat|sada osvětlení|sada osvetleni|zdroj tuf gaming|headphones|in-ear|ssd disk|\bssd\b|\bzdroj\b|power supply|motherboard|základná doska|case)/i.test(t)) {
    return { slug: 'prislusenstvo-a-periferie', hierarchy: ['Príslušenstvo a periférie'] };
  }
  if (/\b(tablet|tab)\b/i.test(t) || /(herní křeslo|herne kreslo|gaming chair|stolička|stolicka)/i.test(t)) {
    return { slug: 'prislusenstvo-a-periferie', hierarchy: ['Príslušenstvo a periférie'] };
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
    let newCat = categorizeProductSmartly(p.title, p.category_slug);
    if (NOTEBOOK_CATEGORY_SLUGS.has(newCat.slug) && !NOTEBOOK_SIGNAL_RE.test(p.title || '')) {
      newCat = { slug: 'prislusenstvo-a-periferie', hierarchy: ['Príslušenstvo a periférie'] };
    }
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
