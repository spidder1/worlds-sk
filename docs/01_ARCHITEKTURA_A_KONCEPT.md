# 1. Architektúra a koncept platformy Worlds.sk

Tento dokument vysvetľuje celkový koncept, logiku fungovania a technickú architektúru e-commerce platformy **Worlds.sk**. Je napísaný tak, aby mu porozumel aj človek bez hlbokých technických znalostí (nováčik), no zároveň poskytuje presné technické detaily pre senior vývojárov.

---

## 1.1. Problém tradičných e-shopov s 70 000 produktmi (Prečo nie monolit?)

Mnoho bežných e-shopov (napr. na báze WooCommerce, PrestaShop či jednoduchých vlastných systémov) funguje tak, že:
1. Zoberú surový XML feed od dodávateľa.
2. Priamo ho bez hlbšej kontroly "napchajú" do databázy webu.
3. Zákazníkovi aj vyhľadávaču Google zobrazujú presne to, čo dodávateľ poslal – často s nekonzistentnými názvami, chýbajúcimi parametrami a duplicitnými kategóriami.

Pri **70 000 produktoch** tento prístup zlyháva:
- **Pomalosť a pády webu**: Každý import preťažuje databázu webu.
- **Nekvalitné SEO**: Google vidí milióny neprehľadných stránok, prichádza o crawl budget a web penalizuje.
- **Nekonzistentné dáta**: Značka "HP" je raz "Hewlett Packard", raz "HP Inc.", kapacita disku je raz "512GB", inokedy "512 Gb". Filtrovanie potom nefunguje.

---

## 1.2. Naše riešenie: Dátovo orientovaná modulárna architektúra (PIM First)

Naša platforma stavia na zásadnom pravidle: **Storefront (web pre zákazníka) nesmie byť priamo závislý od dodávateľského feedu.**

Medzi dodávateľom (eD system) a zákazníkom existuje **Product Master (PIM - Product Information Management)** vrstva:

```text
       ┌────────────────────────────────────────────────────────┐
       │         eD system a. s. Web Service (SOAP/XML)         │
       │           Centrálny distribútor IT techniky            │
       └──────────────────────────┬─────────────────────────────┘
                                  │
                                  ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   INSPEKCIA & INGESTION PIPELINE                       │
│                                                                        │
│  [1. RAW INGEST]      Sťahovanie ZIP / XML súborov z eD system         │
│  [2. VALIDÁCIA]       Kontrola: má produkt MPN? Je cena > 0?          │
│  [3. DELTA ENGINE]    MD5 hash porovnanie (preskoč nezmenené)          │
│  [4. NORMALIZÁCIA]    Oprava názvov značiek, jednotiek, výpočet DPH   │
│  [5. TAXONÓMIA / AI]  Zaradenie do kategórií + Confidence scoring      │
│  [6. QUALITY SCORE]   Výpočet skóre kvality (0 až 100 bodov)           │
└──────────────────────────┬──────────────────┬──────────────────────────┘
                           │                  │
               Chybné dáta │                  │ Schválené dáta
                           ▼                  ▼
┌─────────────────────────────────────┐   ┌──────────────────────────────┐
│        KARANTÉNA (Quarantine)       │   │   PRODUCT MASTER DATABÁZA    │
│  - Chýbajúce kódy výrobcu           │   │      (PostgreSQL Master)     │
│  - Nulové ceny                      │   │  - 100% overené dáta         │
│  - Audit log chýb                   │   │  - História cien a skladov   │
└─────────────────────────────────────┘   └──────────────┬───────────────┘
                                                         │
                                   ┌─────────────────────┴─────────────────────┐
                                   ▼                                           ▼
┌──────────────────────────────────────────────────────┐   ┌───────────────────────────────────┐
│               NEXT.JS 15 STOREFRONT                  │   │      QUALITY & REVIEW ADMIN       │
│  - Rýchly server-side rendering (SSR/ISR)            │   │  - Prehľad zdravia katalógu       │
│  - SEO First (Schema.org/Product JSON-LD)            │   │  - Schvaľovací front (Review)     │
│  - Parametrické filtre a nákupný košík               │   │  - Spúšťanie a monitorovanie sync │
└──────────────────────────────────────────────────────┘   └───────────────────────────────────┘
```

---

## 1.3. Rozpis jednotlivých vrstiev systému

### 1. Dátový klient (`@worlds/ed-client`)
- Komunikuje cez štandardný protokol **SOAP 1.1 / 1.2** s webovou službou `https://private-ws-sk.elinkx.biz/service.asmx`.
- Stará sa o autentifikáciu, sťahovanie veľkých dátových súborov (komprimovaný ZIP/XML) a posielanie dropshippingových objednávok priamo do centrály eD system.

### 2. Ingestion & AI Pipeline (`@worlds/importer`)
- **Delta Sync**: Namiesto prepočítavania celých 70 000 produktov každý deň si systém ukladá hash dát. Ak sa produkt nezmenil, spracovanie trvá 0 ms.
- **Rule Normalizer**: Deterministické pravidlá opravujú nejednotné názvy značiek, kapacity (128GB $\rightarrow$ 128 GB) a vypočítavajú predajné ceny s poplatkami (recyklačný poplatok SNC, autorský poplatok AO, DPH a marža).
- **AI Categorizer**: Klasifikuje produkt do stromu kategórií a priraďuje mu **Confidence Score (0.0 až 1.0)**. Ak je skóre vysoké ($\ge 85\%$), produkt je automaticky schválený. Ak je nízke, putuje do schvaľovacieho frontu v admine.
- **Quality Scorer**: Každý produkt dostane skóre 0–100 podľa bohatosti jeho dát (EAN, obrázky, popis, parametre).

### 3. Next.js 15 Storefront (`apps/storefront`)
- Moderný frontend postavený na **Next.js 15 (App Router)** a **Tailwind CSS**.
- Využíva **Server Components** pre bleskové načítanie a perfektnú SEO indexáciu Googlebotom.
- Generuje **Schema.org/Product** a **BreadcrumbList** štruktúrované dáta vo formáte JSON-LD, čo zabezpečuje rich snippets vo výsledkoch vyhľadávania.

---

## 1.4. Zhrnutie výhod pre biznis

1. **Bezpečnosť a nezávislosť**: Výpadok alebo chyba v dodávateľskom feede nerozbije fungujúci e-shop.
2. **Škálovateľnosť**: Databáza a infraštruktúra hravo zvládnu rast zo 70 000 na 200 000+ produktov.
3. **Automatizácia s ľudskou kontrolou**: 95%+ produktov sa zaradí a nacení samo, človek rieši len anomálie v prehľadnom dashboarde.
