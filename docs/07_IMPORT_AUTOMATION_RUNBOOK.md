# Import a automatizácia eD katalógu

Aktívna importná cesta používa Neon PostgreSQL. Storefront aj importer vyžadujú serverové premenné prostredia a do verejného klienta sa nikdy neposielajú.

## Aktívny vývojový režim

Počas vývoja sa importujú iba produkty značiek ASUS a Lenovo. Produkty bez ceny sa do verejného storefrontu nezaradia; dostupné obrázky sa ukladajú do produktovej galérie.

Lokálne spustenie:

```powershell
$env:DATABASE_URL = '<Neon connection string>'
$env:ED_LOGIN = '<eD login>'
$env:ED_PASSWORD = '<eD password>'
$env:ED_SAMPLE_ONLY = 'true'
$env:ED_SAMPLE_LIMIT = '250'
pnpm build
pnpm import:sample-neon
```

Import vytvorí záznam v `sync_batches` a pri úspechu ho označí ako `COMPLETED`. Pri chybe zapíše `FAILED` s chybovou správou. Opakovaný beh je nedestruktívny a existujúce produkty nemaže.

Samostatná hodinová synchronizácia cien a skladu načíta iba stock feed bez veľkého katalógového ZIP-u:

```powershell
pnpm import:neon:stock
```

V GitHub Actions ju spúšťa job `stock-price-sync` každú hodinu.

Pre kontrolu celého feedu bez zápisu produktov:

```powershell
pnpm import:neon:dry-run
```

## Automatizácia

Workflow `.github/workflows/ed-catalog-sync.yml` spúšťa sample import:

- každé dve hodiny,
- raz týždenne,
- alebo manuálne cez `workflow_dispatch`.

GitHub Actions secrets:

- `DATABASE_URL`
- `ED_LOGIN`
- `ED_PASSWORD`

Všetky tri hodnoty musia zostať iba v secrets alebo lokálnom `.env` súbore mimo commitu.

## Overenie po importe

```powershell
$env:DATABASE_URL = '<Neon connection string>'
pnpm db:migrate
pnpm report:classification
```

Migrácie vytvárajú aj trigramové/JSONB indexy pre vyhľadávanie, MPN/EAN, atribúty a storefront filtre.

Storefront health endpoint `/api/health` musí vrátiť `ok: true`, databázu `neon` a počet predajných produktov.
Odpoveď obsahuje aj `lastSync` s režimom, stavom a počtom importovaných produktov.
V `sync_batches.metrics` sa ukladajú `priced_count`, `image_product_count`, `image_count` a `multi_image_product_count`.

## Budúci full import

Full-feed import všetkých IT značiek je dostupný iba manuálne cez workflow `full` alebo po dry-run kontrole. Sample import synchronizuje ceny, sklad a dostupné obrázky; pri objednávke storefront znovu overí sklad a v transakcii uzamkne produktové riadky. Automatické označovanie dlhodobo chýbajúcich produktov, produkčná platobná brána a finálne obchodné pravidlá dopravy ešte nie sú zapnuté.

Staršie Supabase importéry v repozitári sú historický kód a nie sú súčasťou aktívneho workflow.
