const JOB_LABELS: Record<string, string> = {
  'catalog-full': 'Úplný import katalógu',
  'image-loader': 'Nočné načítanie ďalších obrázkov',
  'manufacturer-cleanup': 'Čistenie výrobcov a logotypov',
  'premium-audit': 'Kontrola premium katalógu eD',
  'reference-data': 'Synchronizácia indexov a väzieb produktov',
  'search-drain': 'Priebežná synchronizácia vyhľadávania',
  'search-reindex': 'Kompletné obnovenie vyhľadávacieho indexu',
  'stock-price': 'Synchronizácia skladov a cien',
  'supplier-orders': 'Odoslanie zaplatených objednávok dodávateľovi',
  'transport-dictionary': 'Obnovenie dopravcov eD',
};

const MODE_LABELS: Record<string, string> = {
  FULL_ALL: 'Úplný import katalógu',
  FULL_CATALOG: 'Úplný import katalógu',
  SAMPLE_ASUS_LENOVO: 'Testovací import ASUS a Lenovo',
  STOCK_ONLY_FULL_ASUS_LENOVO: 'Synchronizácia skladov ASUS a Lenovo',
  STOCK_PRICE: 'Synchronizácia skladov a cien',
};

const STATUS_LABELS: Record<string, string> = {
  COMPLETED: 'Dokončené',
  FAILED: 'Zlyhanie',
  RUNNING: 'Prebieha',
  STARTED: 'Spustené',
  PENDING: 'Čaká na spracovanie',
  PROCESSING: 'Spracováva sa',
  SENT: 'Odoslané',
  ACTIVE: 'Aktívne',
  DISCONTINUED: 'Vyradené',
  INFO: 'Informácia',
  WARNING: 'Upozornenie',
  ERROR: 'Chyba',
  FATAL: 'Kritická chyba',
};

const REASON_LABELS: Record<string, string> = {
  MIGRATION_BACKFILL: 'Doplnené pri migrácii',
  MISSING_RECONCILIATION: 'Produkt chýbal pri zosúladení feedu',
  PRODUCT_WRITE: 'Zápis produktu',
  RETURNED_TO_FEED: 'Produkt sa vrátil do feedu',
};

const ACTION_LABELS: Record<string, string> = {
  CATEGORY_PRESENTATION_UPDATED: 'Úprava prezentácie kategórie',
  CATEGORY_REVIEW_APPROVED: 'Schválenie kategorizácie produktu',
  CONTENT_PAGE_UPDATED: 'Úprava obsahovej stránky',
  MANUFACTURER_REVIEW_UPDATED: 'Úprava kontroly výrobcu',
  ORDER_STATUS_UPDATED: 'Zmena stavu objednávky',
  PRICING_SETTINGS_UPDATED: 'Úprava cien a marží',
  QUARANTINE_RESOLVED: 'Vyriešenie karanténneho záznamu',
  SUPPLIER_ORDER_QUEUED: 'Zaradenie objednávky dodávateľovi',
  SYNC_JOB_SETTINGS_UPDATED: 'Úprava nastavenia synchronizácie',
  PRODUCT_CATEGORY_UPDATED: 'Úprava kategórie produktu',
};

const ENTITY_LABELS: Record<string, string> = {
  category: 'Kategória',
  content_page: 'Obsahová stránka',
  manufacturer: 'Výrobca',
  order: 'Objednávka',
  product: 'Produkt',
  product_quarantine: 'Karanténa produktu',
  store_settings: 'Nastavenia obchodu',
  sync_job: 'Synchronizácia',
};

export function jobLabel(jobKey: string, fallback?: string | null) {
  return fallback || JOB_LABELS[jobKey] || humanizeCode(jobKey);
}

export function importModeLabel(mode: string) {
  return MODE_LABELS[mode] || humanizeCode(mode);
}

export function statusLabel(status: string) {
  return STATUS_LABELS[status] || humanizeCode(status);
}

export function reasonLabel(reason: string) {
  return REASON_LABELS[reason] || humanizeCode(reason);
}

export function actionLabel(action: string) {
  return ACTION_LABELS[action] || humanizeCode(action);
}

export function entityLabel(entityType: string) {
  return ENTITY_LABELS[entityType] || humanizeCode(entityType);
}

export function humanizeCode(value: string) {
  return value
    .toLocaleLowerCase('sk-SK')
    .split('_')
    .map((part) => part ? part[0].toLocaleUpperCase('sk-SK') + part.slice(1) : part)
    .join(' ');
}
