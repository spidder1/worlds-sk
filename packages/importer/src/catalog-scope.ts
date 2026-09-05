export type CatalogScopeReason = 'IT_SIGNAL' | 'NON_IT_KEYWORD' | 'SERVICE_CATEGORY' | 'NO_IT_SIGNAL';

export interface CatalogScopeInput {
  title?: unknown;
  description?: unknown;
  descriptionShort?: unknown;
  commodityName?: unknown;
}

export interface CatalogScopeDecision {
  included: boolean;
  reason: CatalogScopeReason;
  matchedTerm?: string;
}

function text(raw: unknown): string {
  if (raw === null || raw === undefined) return '';
  if (typeof raw === 'object' && '#text' in (raw as Record<string, unknown>)) {
    return text((raw as Record<string, unknown>)['#text']);
  }
  return String(raw);
}

function normalize(raw: string): string {
  return raw
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/<[^>]+>/g, ' ')
    .replace(/[^a-z0-9+./-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const NON_IT_PATTERNS: Array<[string, RegExp]> = [
  ['white-goods', /\b(chladnick|mraznick|prack|susick|umyvack|sporak|varn[ay] dosk|digestor|mikrovln|vstavana rura|odsavac par)/],
  ['small-appliance', /\b(kavovar|vysavac|zehlick|mixer|slahac|frit[eě]z|hriankovac|toastovac|rychlovarna kanvic|odstavovac|kuchynsk[y] robot|pekaren chleba|fen na vlasy|kulm|holiaci strojcek)/],
  ['garden', /\b(zahrad|kosack|krovinorez|motorov[ay] pil|retazov[ay] pil|zavlaz|baz[eé]n|trampolin|gril|kompost|postrekovac|strunov[ay] kos|stiepack|fukar listia)/],
  ['tools', /\b(vrtack|brusk|skrutkovac|priamoc[ií]ar|kladivo|zvarack|kompresor|pracovn[ay] stol|gola sada|racna|pilov[ay] kotuc)/],
  ['home-furniture', /\b(matrac|postel|sedack|pohovk|skr[ií]n|komod|jedalensk|stolick|svietidlo|luster|koberec|zaclona|zaves)/],
  ['personal-care', /\b(epilator|depilator|elektrick[ay] kefk|ustna sprcha|masazn|osobna vaha|tlakomer|inhalator|teplomer pre deti)/],
  ['auto-moto', /\b(autodiel|pneumatik|motorov[ay] olej|stresn[y] nosic|autosedack|stierac|startovac[ií] kabel pre auto)/],
  ['pet-baby', /\b(krmivo|macky|psov|detsky kocik|plienk|dojcensk|hracka pre deti)/],
];

const IT_PATTERNS: Array<[string, RegExp]> = [
  ['computer', /\b(notebook|laptop|ultrabook|chromebook|macbook|desktop|pocitac|workstation|mini pc|nuc|all in one|imac|thin client|server|proliant|poweredge|thinksystem)\b/],
  ['mobile', /\b(tablet|smartphone|mobilny telefon|iphone|ipad|android telefon|smart hodinky|smartwatch|wearable)\b/],
  ['display', /\b(monitor|lcd|oled|display|projektor|projection|digital signage|interaktivna tabula)\b/],
  ['components', /\b(procesor|cpu|graficka karta|gpu|geforce|radeon|opera[cč]na pam[aä]t|ram|ddr[345]|ssd|nvme|pevny disk|hdd|motherboard|\bmb\b|z[aá]kladna doska|chipset|pc skrinka|pc skri[nň]a|computer case|mid tower|full tower|eatx|e-atx|atx|chladic cpu|pc ventilator|thermal paste|termalna pasta)\b/],
  ['network', /\b(router|switch|access point|wi-?fi|ethernet|lan|wan|firewall|modem|mesh system|sietov|network|transceiver|sfp\+?|poe|patch panel|rack|optick[ay] kabel|fiber optic)\b/],
  ['printing', /\b(tlaciaren|printer|multifunk|laserjet|deskjet|ecotank|pixma|skener|scanner|toner|cartridge|atramentov[ay] napln|print server|plotter|etiketov[ay] tlaciaren)\b/],
  ['peripheral', /\b(klavesnic|keyboard|mys|mouse|trackball|touchpad|gamepad|joystick|headset|sluchadl|mikrofon|webkamera|webcam|pc reproduktor|dokovaci[ae]|docking station|usb hub|port replicator|grafick[y] tablet|citacka kariet|barcode scanner|citacka ciarovych kodov)\b/],
  ['it-accessory', /\b(z[aá]ruk[ay]|warranty|care ?pack|battery|bat[eé]ri[ae]|nab[ií]ja[cč]k|charger|bra[sš]n[ay]|batoh|puzdro|pouzdro|sleeve|dvd writer|optick[aá] mechanika|usb dvd)\b/],
  ['storage', /\b(nas|diskstation|qnap|synology|datove ulozisko|storage|usb flash|flash disk|datatraveler|pamatova karta|microsd|sdhc|sdxc|card reader|tape drive)\b/],
  ['power-it', /\b(ups|zalozny zdroj|smart-ups|back-ups|prepatova ochrana|power bank|napajaci adapter|notebook adapter|pc zdroj|power supply|psu)\b/],
  ['cabling', /\b(usb(?:-[ac])?|thunderbolt|hdmi|displayport|dvi|vga kabel|patch kabel|rj45|sata kabel|pcie|kvm|redukcia|datovy kabel|komunikacny kabel)\b/],
  ['software-service', /\b(software|licencia|license|antivirus|operacny system|windows server|microsoft 365|office 365|care pack|carepack|zaruka pre notebook|it service)\b/],
  ['security-it', /\b(ip kamera|network camera|nvr|dvr|video surveillance|dochadzkov[y] system|videokonferenc|conference camera)\b/],
];

// Supplier commodities in this group are not sellable hardware items. Keep
// this separate from the general title rules so a notebook that merely has a
// warranty description is not removed, while warranty/service catalogue rows
// are consistently excluded by their commodity classification.
const SERVICE_COMMODITY_PATTERNS: Array<[string, RegExp]> = [
  ['warranty', /\b(z[aá]ruk|warranty|care ?pack|carepack|support contract|service contract|onsite support)\b/],
  ['license', /\b(licen[cs]|predplat|subscription|antivirus|software assurance)\b/],
  ['service', /\b(servis|service|implement[aá]cia|installation|consulting|konzult[aá]cia|skolenie|training)\b/],
];

function firstMatch(haystack: string, patterns: Array<[string, RegExp]>): string | undefined {
  return patterns.find(([, pattern]) => pattern.test(haystack))?.[0];
}

export function assessCatalogScope(input: CatalogScopeInput): CatalogScopeDecision {
  const titleText = normalize(text(input.title));
  const haystack = normalize([
    text(input.title),
    text(input.descriptionShort),
    text(input.description),
    text(input.commodityName),
  ].join(' '));

  const serviceCommodity = firstMatch(normalize(text(input.commodityName)), SERVICE_COMMODITY_PATTERNS);
  if (serviceCommodity) return { included: false, reason: 'SERVICE_CATEGORY', matchedTerm: serviceCommodity };

  const excludedBy = firstMatch(titleText || haystack, NON_IT_PATTERNS);
  const includedBy = firstMatch(haystack, IT_PATTERNS);
  const explicitHardware = /\b(motherboard|z[aá]kladna doska|pc skrinka|pc skri[nň]a|computer case|mid tower|full tower|eatx|e-atx)\b/.test(haystack);
  if (excludedBy && !explicitHardware) return { included: false, reason: 'NON_IT_KEYWORD', matchedTerm: excludedBy };
  if (includedBy) return { included: true, reason: 'IT_SIGNAL', matchedTerm: includedBy };

  if (excludedBy) return { included: false, reason: 'NON_IT_KEYWORD', matchedTerm: excludedBy };

  return { included: false, reason: 'NO_IT_SIGNAL' };
}
