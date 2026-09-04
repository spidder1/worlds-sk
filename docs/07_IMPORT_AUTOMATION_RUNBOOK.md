# Import a automatizácia eD katalógu

Produkčný import beží ako samostatný worker. Storefront na Verceli neobsahuje eD serverové tajomstvá a nie je blokovaný spracovaním veľkého XML katalógu.

## Režimy

- `pnpm sync:catalog` stiahne a spracuje kompletný katalóg. Predvolený scope `it-only` odmietne bielu techniku, záhradu, domácnosť a všetko bez preukázateľného IT signálu ešte pred zápisom.
- Všetky prijaté IT položky sa uložia úsporne do `integration.ed_catalog_compact`. Plne normalizované katalógové, atribútové, mediálne, cenové a search záznamy sa vytvoria iba pre existujúce alebo obchodne aktívne produkty. Tým sa celý zdrojový katalóg zmestí aj do limitov malého databázového plánu.
- `pnpm sync:stock-price` stiahne rýchly eD stock/price feed a zapisuje iba cenové a skladové delty.
- Ak stock/price feed prinesie cenu pre nový produkt, worker ho smie povýšiť do normalizovaného katalógu iba vtedy, ak produkt predtým prešiel IT filtrom a existuje v compact stagingu.
- Lokálny kontrolovaný import je možné spustiť s `--source-file=C:\...\feed.xml`. Použitie starej cache vyžaduje explicitný prepínač `--allow-cached-full`.
- `--dry-run` vykoná kompletné čítanie a filtrovanie bez pripojenia k databáze. `--scope=all` je výnimočný diagnostický režim; produkčný workflow ho nepoužíva.
- Import zapisuje výhradne do Neonu cez `DATABASE_URL`. Iný transport už neexistuje.

Každý beh má záznam v `integration.import_batches`, vrátane počtu filtrovaných produktov a dôvodov vyradenia. Databázový lease zabráni súbehu dvoch importov. Zlyhanie sa zapíše do batchu a uvoľní lease; úspešný plný import označí chýbajúce IT ponuky najprv ako `MISSING` a po druhom po sebe idúcom výpadku ako `DISCONTINUED`.

## Produkčná automatizácia

Workflow `.github/workflows/ed-catalog-sync.yml` spúšťa:

- stock/price synchronizáciu každé dve hodiny,
- kompletný katalóg každú nedeľu o 02:43 UTC,
- oba režimy aj manuálne.

V GitHub repository secrets musia byť nastavené iba tieto hodnoty:

- `ED_LOGIN`
- `ED_PASSWORD`
- `DATABASE_URL`

Hodnoty sa nesmú uložiť do Git repozitára ani do premenných s prefixom `NEXT_PUBLIC_`.

## Bezpečný lokálny prvý import

```powershell
$env:DATABASE_URL = 'postgresql://user:password@host/neondb?sslmode=require'
pnpm build
pnpm sync:catalog -- --source-file=C:\Web\Ethos\downloads\productCatalogue_....xml --scope=it-only
```

Pred ostrým importom je možné overiť filter bez zápisu:

```powershell
pnpm sync:catalog -- --source-file=C:\Web\Ethos\downloads\productCatalogue_....xml --scope=it-only --dry-run
```

Po importe treba skontrolovať posledný batch, počet compact IT položiek, počty normalizovaných produktov, aktuálne ceny/sklad, počet search dokumentov a načítanie storefrontu. Stock feed sa nepovažuje za aktívny, kým nie je úspešný aspoň jeden čerstvý beh s rotovanými eD prihlasovacími údajmi.
