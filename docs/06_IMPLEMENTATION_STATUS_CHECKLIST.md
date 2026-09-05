# Stav implementácie (skutočný stav kódu)

> Tento dokument zachytáva aktuálny stav implementácie e-shopu na Neone.
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
| Košík so stavom | ✅ | Session košík cez Neon API, aktualizácia a mazanie položiek |
| Pokladňa (B2C aj B2B) | ✅ | Formulár, režim súkromná/právnická osoba, IČO/DIČ/IČ DPH validácia a `/api/company/lookup` pre SK/CZ registre |
| Ukladanie objednávok | ✅ | Neon tabuľky `orders`/`order_items`, idempotentné API |
| Platobná brána | 🟡 | Stripe Checkout + Comgate REST v2.0 redirect/webhook, bankový prevod a dobierka; GoPay zostáva nepripojený |
| `createNewOrderCustomer` dropshipping | ✅ | Platené objednávky sa zaraďujú do eD fronty a odosielajú workerom |
| PDF fakturácia | ✅ | Chránený endpoint s položkami, DPH a identifikátormi zákazníka |
| EU VAT reverse charge / VIES | ✅ | VIES endpoint, validácia zahraničného IČ DPH pri objednávke, netto prepočet, nulová DPH a označenie reverse charge na PDF |
| `/admin` dashboard, AI approval queue, karanténa | ✅ | Admin obsahuje živé metriky katalógu, karanténu importu s označením záznamov ako vyriešených a frontu kategorizácie pod 85 % s manuálnym schválením |
| AI konverzačný asistent (`/api/chat`) | 🟡 | Deterministický fallback aj voliteľný Gemini structured-JSON provider s validáciou filtrov; v produkcii treba nastaviť `GEMINI_API_KEY` |
| Meilisearch | 🟡 | Dávkový reindex a nightly/manual workflow sú pripravené; storefront používa Postgres fallback, kým nie sú nastavené Meilisearch secrets |
| Google / Heureka / NajNakup feedy | ✅ | Dynamické XML endpointy v `apps/storefront/src/app/api/feeds/` |
| GDPR cookie lišta | ✅ | Súhlas v localStorage a odkazy na právne stránky |
| 301 mapa zo starého worlds.sk | 🟡 | Registry `seo_redirects`, 301 catch-all handler a CSV loader sú hotové; treba načítať historický URL export |
| Testy storefrontu, E2E (Playwright) | ✅ | Smoke testy katalógu, košíka a VIES endpointu v `apps/storefront/tests/e2e/`, spúšťané v CI |
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

1. Priebežná QA a rozšírenie automatizovaných testov importu/katalógu.
