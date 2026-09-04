# Stav implementácie (skutočný stav kódu)

> **Pozor:** Predchádzajúca verzia tohto dokumentu uvádzala 100 % dokončenie pre
> košík, B2B pokladňu a `/admin` dashboard. Nič z toho v repozitári neexistuje.
> Tento dokument je prepísaný tak, aby zodpovedal tomu, čo je naozaj v kóde.
> Kontrolovateľné tvrdenie = odkaz na súbor.

Posledná revízia: 2026-09-04.

---

## Čo v kóde skutočne je

| Oblasť | Stav | Kde |
| :--- | :---: | :--- |
| Dátové modely (`@worlds/types`) | ✅ | `packages/types/src/` |
| eD system SOAP klient | ✅ | `packages/ed-client/src/ed-client.ts` |
| Streamovaný XML/ZIP import s delta hashovaním | ✅ | `packages/importer/src/catalog-sync.ts` |
| Normalizácia, taxonómia, atribúty | ✅ | `packages/importer/src/{normalizer,taxonomy-engine,attribute-extractor}.ts` |
| Quality Score (0–100) | ✅ | `packages/types/src/product-quality.ts` |
| Zápis importu priamo do Neonu | ✅ | `packages/importer/src/neon-rpc.ts` |
| Storefront: katalóg, kategórie, detail, vyhľadávanie, filtre | ✅ | `apps/storefront/src/app/` |
| Slovenské právne stránky (VOP, reklamácie, GDPR) | ✅ | `apps/storefront/src/app/obchodne-podmienky/` a spol. |
| Sitemap (chunked), robots.txt, kanonické URL | ✅ | `apps/storefront/src/app/{sitemap,robots}.ts` |
| JSON-LD `Product` + `Offer` + `BreadcrumbList` | ✅ | `apps/storefront/src/app/produkt/[slug]/page.tsx` |
| Testy importéra + CI (lint/test/build/secret scan) | ✅ | `packages/importer/src/*.test.ts`, `.github/workflows/ci.yml` |

---

## Čo v kóde NIE JE (napriek starším tvrdeniam)

| Oblasť | Stav | Poznámka |
| :--- | :---: | :--- |
| Košík so stavom | ❌ | `/kosik` je statická stránka „objednávanie sa pripravuje“ |
| Pokladňa (B2C aj B2B) | ❌ | Žiadny formulár, žiadna validácia IČO/DIČ/IČ DPH |
| Ukladanie objednávok | ❌ | Typy v `packages/types/src/orders.ts` existujú, tabuľka ani API nie |
| Platobná brána | ❌ | Žiadna integrácia (cieľ: Stripe) |
| `createNewOrderCustomer` dropshipping | ⚠️ | Metóda v SOAP klientovi je, nikto ju nevolá |
| PDF fakturácia | ❌ | — |
| EU VAT reverse charge / VIES | ❌ | — |
| `/admin` dashboard, AI approval queue, karanténa | ❌ | Žiadna `/admin` route v `apps/storefront` |
| AI konverzačný asistent (`/api/chat`) | ❌ | V `apps/storefront` neexistuje adresár `api/` |
| Meilisearch | ❌ | Vyhľadávanie ide cez Postgres `ILIKE` + `pg_trgm` |
| Google / Heureka / NajNakup feedy | ❌ | — |
| GDPR cookie lišta | ❌ | Stránka o ochrane údajov áno, banner nie |
| 301 mapa zo starého worlds.sk | ❌ | — |
| Testy storefrontu, E2E (Playwright) | ❌ | Testy má iba `packages/importer` |
| Redis / BullMQ | ❌ | Plánovanie rieši GitHub Actions cron |

---

## Produkčná infraštruktúra

- **Databáza:** Neon PostgreSQL (`DATABASE_URL`). Schéma je verzovaná v
  `db/neon/migrations/`, aplikuje sa cez `node scripts/migrate-neon.mjs`.
- **Supabase:** vyradené. Migrácie v `supabase/` sú historické; importér do
  Supabase už nezapisuje (transport `neon` je predvolený).
- **Import:** `.github/workflows/ed-catalog-sync.yml` — sklad a ceny hodinovo,
  celý katalóg 2× denne, rozsah obmedzený cez `ED_BRAND_SCOPE`.
- **Rozsah katalógu pre launch:** ASUS + Lenovo (~2 000 SKU). Rozšírenie na celý
  eD katalóg je zmena jednej premennej, ale vyžaduje si výkonnostný test.

---

## Ďalšie kroky (poradie)

1. Košík so stavom + pokladňa (B2C a B2B) + ukladanie objednávok.
2. Stripe: platba, webhook s overením podpisu, idempotentný prechod `PENDING → PAID`.
3. Odoslanie zaplatenej objednávky do eD cez `createNewOrderCustomer`.
4. PDF faktúra s rozpisom DPH, SNC a AO.
5. Validácia IČO/DIČ cez FinStat/ARES, reverse charge cez VIES.
6. GDPR cookie lišta.
7. Produktové feedy (Google Merchant, Heureka, NajNakup) a 301 mapa.
8. E2E testy pokladne (Playwright) predtým, než sa spustia platby naostro.
