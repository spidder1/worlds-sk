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

Storefront health endpoint `/api/health` musí vrátiť `ok: true`, databázu `neon` a počet predajných produktov.

## Budúci full import

Full-feed import všetkých IT značiek a delta synchronizácia cien/skladu ešte nie sú zapnuté. Pred ich aktiváciou treba doplniť dedikovaný full-feed režim, kontrolu chýbajúcich produktov, inventárnu rezerváciu a produkčné pravidlá pre ceny, dopravu a platobnú bránu.

Staršie Supabase importéry v repozitári sú historický kód a nie sú súčasťou aktívneho workflow.
