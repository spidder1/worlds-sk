# Import a automatizácia eD katalógu

Produkčný import beží ako samostatný worker. Storefront na Verceli neobsahuje eD serverové tajomstvá a nie je blokovaný spracovaním veľkého XML katalógu.

## Aktívny vývojový režim

- `pnpm sync:catalog` stiahne a spracuje kompletný katalóg. Predvolený scope `it-only` odmietne bielu techniku, záhradu, domácnosť a všetko bez preukázateľného IT signálu ešte pred zápisom.
- Všetky prijaté IT položky sa uložia úsporne do `integration.ed_catalog_compact`. Plne normalizované katalógové, atribútové, mediálne, cenové a search záznamy sa vytvoria iba pre existujúce alebo obchodne aktívne produkty. Tým sa celý zdrojový katalóg zmestí aj do limitov malého databázového plánu.
- `pnpm sync:stock-price` stiahne rýchly eD stock/price feed a zapisuje iba cenové a skladové delty.
- Ak stock/price feed prinesie cenu pre nový produkt, worker ho smie povýšiť do normalizovaného katalógu iba vtedy, ak produkt predtým prešiel IT filtrom a existuje v compact stagingu.
- Lokálny kontrolovaný import je možné spustiť s `--source-file=C:\...\feed.xml`. Použitie starej cache vyžaduje explicitný prepínač `--allow-cached-full`.
- `--dry-run` vykoná kompletné čítanie a filtrovanie bez pripojenia k databáze. `--scope=all` je výnimočný diagnostický režim; produkčný workflow ho nepoužíva.
- Import zapisuje výhradne do Neonu cez `DATABASE_URL`. Iný transport už neexistuje.

Lokálne spustenie:

```powershell
$env:DATABASE_URL = '<Neon connection string>'
$env:ED_LOGIN = '<eD login>'
$env:ED_PASSWORD = '<eD password>'
$env:ED_SAMPLE_ONLY = 'true'
$env:ED_SAMPLE_LIMIT = '250'
$env:ED_MIN_COST_EUR = '0'
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
- `DATABASE_URL`

Všetky tri hodnoty musia zostať iba v secrets alebo lokálnom `.env` súbore mimo commitu.
Minimálnu nákupnú cenu nastavte ako repository variable `ED_MIN_COST_EUR`; hodnota `0` filter vypína.

## Overenie po importe

```powershell
$env:DATABASE_URL = 'postgresql://user:password@host/neondb?sslmode=require'
pnpm build
pnpm sync:catalog -- --source-file=C:\Web\Ethos\downloads\productCatalogue_....xml --scope=it-only
```

Pred ostrým importom je možné overiť filter bez zápisu:

Full-feed import všetkých IT značiek je dostupný iba manuálne cez workflow `full` alebo po dry-run kontrole. Sample import synchronizuje ceny, sklad a dostupné obrázky; pri objednávke storefront znovu overí sklad a v transakcii uzamkne produktové riadky. Automatické označovanie dlhodobo chýbajúcich produktov, produkčná platobná brána a finálne obchodné pravidlá dopravy ešte nie sú zapnuté.

Staršie Supabase importéry v repozitári sú historický kód a nie sú súčasťou aktívneho workflow.
