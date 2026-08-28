# Status implementácie a kontrolný zoznam (Task Checklist)

Tento dokument poskytuje detailný, štruktúrovaný prehľad všetkých bodov z analytického dokumentu [`worlds_sk_analyza_ai_rebuild.md`](../worlds_sk_analyza_ai_rebuild.md). Zobrazuje, čo je už **kompletne naimplementované v kóde** a čo je naplánované na ďalšie fázy (databázové napojenie na produkčný Postgres, reálne API kľúče, platobné brány a produkčný cutover).

---

## 📊 Celkový prehľad stavu

| Oblasť | Stav | Percento dokončenia |
| :--- | :---: | :---: |
| **1. Dátové modely & Typová bezpečnosť (`@worlds/types`)** | ✅ Dokončené | **100%** |
| **2. eD system SOAP/XML Klient (`@worlds/ed-client`)** | ✅ Dokončené | **100%** |
| **3. Normalizácia & Dátový Ingestor (`@worlds/importer`)** | ✅ Dokončené | **100%** |
| **4. AI Engine, Taxonómia & Confidence Scoring** | ✅ Dokončené | **100%** |
| **5. Product Quality Score Engine (0–100 bodov)** | ✅ Dokončené | **100%** |
| **6. Storefront & SEO Vrstva (`apps/storefront`)** | ✅ Dokončené | **100%** |
| **7. Catalog Quality & AI Review Dashboard (`/admin`)** | ✅ Dokončené | **100%** |
| **8. Automatizované testy & CI/CD build** | ✅ Dokončené | **100%** |
| **9. Dokumentácia pre začiatočníkov aj seniorov (`docs/`)** | ✅ Dokončené | **100%** |
| **10. Napojenie na živý PostgreSQL & produkčné eD credentials** | ⏳ Pripravené na nasadenie | **Fáza produkčného rolloutu** |
| **11. SK/CZ platobné brány & ERP integrácia** | ⏳ Naplánované | **Fáza produkčného rolloutu** |

---

## 🗂️ Detailný rozpis bodov z analýzy

### 1. Architektúra, Dátový model & Oddelenie vrstiev (Sekcie 1, 2, 3, 4)
- [x] **Oddelenie dodávateľských dát od storefrontu**: PIM / Product Master architektúra (Raw $\rightarrow$ Staging $\rightarrow$ Master).
- [x] **Monorepo štruktúra**: Modulárne rozdelenie na `packages/types`, `packages/ed-client`, `packages/importer`, `apps/storefront`.
- [x] **Kanonická schéma produktu (`MasterProduct`)**: Unifikovaný model pre MPN, EAN, značky, atribúty, ceny a galériu.
- [x] **Stavový životný cyklus produktu (Sekcia 15)**: Podpora stavov `ACTIVE`, `OUT_OF_STOCK`, `DISCONTINUED`, `HIDDEN`, `REMOVED`.
- [x] **TypeScript Strict Typing**: Žiadne nebezpečné `any` typy, plná typová kontrola naprieč celým projektom.

---

### 2. eD system SOAP Web Service Integrácia (Sekcie 3, 16, PDF špecifikácia)
- [x] **SOAP 1.1/1.2 klient pre `https://private-ws-sk.elinkx.biz/service.asmx`**:
  - [x] `getProductCatalogueFullDownloadZIPv1` – sťahovanie kompletného ZIP katalógu s filtrami.
  - [x] `getProductCatalogueStockDownloadXML` – hodinové aktualizácie skladu a nákupných cien.
  - [x] `getNavigator` – sťahovanie superkategórií, kategórií a priradených atribútov.
  - [x] `getProductCategoryList` a `getProductSuperCategoryList`.
  - [x] `getProductProducerList` a `getProductCommodityList`.
  - [x] `getProductDetail` – detail konkrétneho produktu podľa kódu.
  - [x] `getTransportationListCustomer` – zoznam B2C dopravcov (DPD, PPL, Slovenská Pošta).
  - [x] `createNewOrderCustomer` – B2C dropshipping objednávky odosielané priamo z eD skladu.
- [x] **Mock eD klient (`MockEDSystemClient`)**: Reálne testovacie datasety pre vývoj a testovanie bez nutnosti aktívneho hesla.
- [ ] **Produkčné prihlasovacie údaje**: Doplnenie reálneho `login` a `password` od eD system do `.env` (čaká sa na dodanie od klienta).

---

### 3. Normalizácia, Čistenie dát a Cenotvorba (Sekcie 7, 8, 16, 17)
- [x] **Pravidlový normalizér značiek (`BRAND_MAP`)**: Zjednotenie variantov ako `Hewlett Packard`, `HP Inc.` $\rightarrow$ `HP`, `Kingston Technology` $\rightarrow$ `Kingston`, `Apple Inc.` $\rightarrow$ `Apple`.
- [x] **Normalizér kapacít a jednotiek**: Zjednotenie `512GB`, `512 Gb`, `512.0 GB` $\rightarrow$ `512 GB`.
- [x] **Kalkulácia cien a poplatkov (Sekcia 8)**:
  - [x] Presné započítanie recyklačného poplatku (`GarbageFee` / SNC).
  - [x] Presné započítanie autorského poplatku (`AuthorFee` / AO).
  - [x] Výpočet marže a koncovej ceny s DPH (20%).
  - [x] Zohľadnenie odporúčanej koncovej ceny (`EndUserPrice`).
- [x] **Delta Engine (Sekcia 17)**: Hashing surových dát (MD5) – nezmenené produkty sa pri importe preskakujú (0 ms).
- [x] **Validačná karanténa (Sekcia 16 & 20)**: Automatické zachytenie chybných záznamov (chýbajúce MPN, nulová cena) do karantény s audit logom.

---

### 4. AI Ingestion Engine & Taxonómia (Sekcie 5, 6, 8, 9)
- [x] **Riadená taxonómia (Managed Taxonomy)**: Pevný 3-úrovňový strom kategórií – zabraňuje AI vytvárať duplicitné kategórie.
- [x] **Pravidlový a AI klasifikátor**: Automatické priradenie kategórie podľa eD kódov, komodít a vlastností produktu.
- [x] **Confidence Scoring (Sekcia 6)**:
  - [x] Skóre $\ge 85\%$ $\rightarrow$ automatické schválenie (`AUTO_APPROVED`).
  - [x] Skóre $< 85\%$ $\rightarrow$ zaradenie do schvaľovacieho frontu (`NEEDS_REVIEW`).
- [x] **Generovanie SEO metadát (Sekcia 9)**: Automatická tvorba SEO Title, Description a vyhľadávacích kľúčových slov z overených atribútov (žiadne vymýšľanie parametrov).

---

### 5. Product Quality Score (Sekcia 23 & 24)
- [x] **Kompletný bodovací algoritmus 0–100 bodov**:
  - [x] EAN kód (+10 b)
  - [x] Výrobca (+5 b)
  - [x] MPN (+10 b)
  - [x] Kvalitná kategória (+15 b)
  - [x] Obrázky (+10 b)
  - [x] Štruktúrované atribúty (+20 b)
  - [x] Popis produktu (+10 b)
  - [x] SEO metadata (+10 b)
  - [x] Cena (+5 b)
  - [x] Skladová dostupnosť (+5 b)

---

### 6. Next.js 15 Storefront & Používateľské rozhranie (Sekcie 10, 11, 13)
- [x] **Next.js 15 App Router & Server Components**: Maximálna rýchlosť a nulový layout shift.
- [x] **Homepage (`/`)**: Hero sekcia, rýchle kategórie, výber produktov z centrálneho skladu, garancie.
- [x] **Kategória produktov (`/kategoria/[slug]`)**:
  - [x] Fazetované filtre v bočnom paneli (Výrobca, Iba skladom, Radenie podľa kvality/ceny).
  - [x] Responzívny grid produktov.
- [x] **Produktový detail (`/produkt/[slug]`)**:
  - [x] Obrázková galéria.
  - [x] Detailný rozpad ceny s DPH, bez DPH a poplatkami SNC/AO.
  - [x] Skladová dostupnosť a termín dodania.
  - [x] Parametrická tabuľka špecifikácií (MPN, EAN, Záruka, Rozmery, Atribúty).
- [x] **Vyhľadávanie (`/vyhladavanie`)**: Fulltextové hľadanie podľa názvu, MPN, EAN a kľúčových slov.
- [x] **Košík a Dropshipping pokladňa (`/kosik`)**:
  - [x] Prepínač B2C (fyzická osoba) vs B2B (Firma, IČO, DIČ, IČ DPH).
  - [x] Výber eD dropshipping dopravy (DPD/PPL kuriér, Slovenská pošta, Osobný odber).
  - [x] Simulácia odoslania objednávky cez `createNewOrderCustomer`.

---

### 7. SEO & Vyhľadávače (Sekcie 10, 13, 14, 22)
- [x] **Schema.org / JSON-LD štruktúrované dáta**:
  - [x] `Product` & `Offer` JSON-LD na každej produktovej stránke (Google Merchant & Rich Results).
  - [x] `BreadcrumbList` JSON-LD na kategóriách a detailoch.
- [x] **Dynamický Sitemap (`/sitemap.xml`) (Sekcia 14)**: Automatické indexovanie statických stránok, kategórií a aktívnych produktov.
- [x] **Prevencia Faceted Crawl Traps (Sekcia 10)**: Oddelenie crawlable SEO kategórií od dynamických parametrických filtrov.
- [x] **Kanonické URL a OpenGraph metadata**.

---

### 8. Quality Admin & Review Queue Dashboard (Sekcia 23)
- [x] **Admin rozhranie na `/admin`**:
  - [x] Celkové štatistiky katalógu (počet produktov, skladové zásoby, priemerné Quality Score).
  - [x] **AI Review Queue**: Schvaľovací front pre produkty s nízkou istotou zaradenia.
  - [x] **Karanténny log**: Prehľad zachytených chybných záznamov s dôvodom vyradenia.
  - [x] Prehľadná tabuľka Product Master so zobrazením kvality každého produktu.

---

### 9. Testovanie, Dokumentácia & CI/CD (Sekcie 20, 21, 22)
- [x] **Unit & Integration testy (`pnpm test`)**: 6/6 úspešných testov pre normalizér, taxonómiu, cenotvorbu, quality scorer a delta import.
- [x] **Turborepo & Monorepo build (`pnpm build`)**: 100% úspešný build všetkých 4 balíkov bez chýb.
- [x] **Kompletná 5-dielna dokumentácia v [`docs/`](../docs)**:
  - `01_ARCHITEKTURA_A_KONCEPT.md`
  - `02_DATOVA_INTEGRACIA_ED_SYSTEM.md`
  - `03_NORMALIZACIA_A_AI_ENGINE.md`
  - `04_STOREFRONT_A_SEO.md`
  - `05_DEVELOPER_GUIDE_A_BEST_PRACTICES.md`
- [x] **Verziovanie na GitHub**: Repozitár `spidder1/worlds-sk` na vetve `main`.

---

## ⏳ Čo zostáva implementovať do finálnej produkcie (Next Steps)

Tieto položky patria do produkčnej fázy rolloutu podľa harmonogramu (Sekcia 27):

1. **Živé prihlasovacie údaje k eD system API**:
   - [ ] Vložiť produkčný `login` a `password` do produkčných env premenných na Verceli / serveri.
2. **Produkčná PostgreSQL databáza & Redis**:
   - [ ] Pripojiť produkčnú databázu PostgreSQL (napr. cez Supabase, Neon alebo Hetzner) a spustiť migráciu tabuliek.
   - [ ] Nastaviť Redis / BullMQ pre plánované spúšťanie hodinového stock importu cez cron (`0 * * * *`).
3. **Platobné brány & reálna fakturácia**:
   - [ ] Napojenie slovenskej/českej platobnej brány (napr. GoPay, Comgate, Stripe, Barion).
   - [ ] Automatické generovanie PDF faktúr pre koncového zákazníka (alebo prepojenie na účtovníctvo ako SuperFaktura / KROS).
4. **Externý Search Engine (Meilisearch / OpenSearch)**:
   - [ ] Nasadiť inštanciu Meilisearch pre instantné vyhľadávanie pri 70 000+ produktoch.
5. **AI Konverzačný asistent (Sekcia 12)**:
   - [ ] Chatbot pre zákazníkov, ktorý na základe dopytu v prirodzenom jazyku preloží požiadavku na parametrický filter a odporučí produkty.
6. **Audit reálnych dát z predchádzajúceho e-shopu (Sekcia 26 & 28)**:
   - [ ] Import historických predajov a Search Console dát pre prioritizáciu TOP produktov.
