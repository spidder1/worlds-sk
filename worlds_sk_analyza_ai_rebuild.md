# Worlds.sk -- návrh modernizácie e-shopu s využitím AI

**Pracovná technická a strategická analýza**\
**Rozsah katalógu:** približne 70 000 produktov\
**Cieľ:** nahradiť problematické časti súčasného riešenia modernou,
škálovateľnou platformou, pri ktorej bude AI využitá počas vývoja aj pri
správe produktových dát.

> Poznámka: Worlds.sk je zámerne neprístupný z časti zahraničných IP
> adries. Preto nebolo možné vykonať úplný externý technický crawl webu.
> Pred implementáciou odporúčam samostatný audit zo slovenskej IP,
> prístup do Google Search Console, analytiky, serverových logov a
> vzorky zdrojového produktového feedu.

------------------------------------------------------------------------

## 1. Manažérske zhrnutie

Worlds.sk by som nevnímal iba ako web, ktorý potrebuje opraviť hosting,
SEO, import a kategórie. Pri katalógu približne 70 000 produktov je
jadrom problému **správa produktových dát**. Webová stránka je až
posledná vrstva nad dátami.

Odporúčané riešenie je preto postupný **rebuild/modernizácia**, ktorý
môže vznikať paralelne vedľa súčasného e-shopu. Starý systém môže počas
vývoja ďalej predávať a nový systém sa bude plniť rovnakými
dodávateľskými dátami. Prechod na novú platformu sa uskutoční až po
porovnaní cien, skladov, objednávok, URL, SEO prvkov a výsledkov
importov.

Ako preferovaný technologický smer odporúčam:

-   **Next.js** pre rýchly, SEO-friendly storefront,
-   **Medusa v2** ako modulárne commerce jadro,
-   **PostgreSQL** ako hlavná databáza,
-   **Redis** pre cache, fronty a background workflows,
-   **Meilisearch** alebo **OpenSearch** pre produktové vyhľadávanie,
-   objektové úložisko typu **S3 / Cloudflare R2** pre obrázky a súbory,
-   **Cloudflare** ako CDN, WAF, DNS a bezpečnostnú vrstvu,
-   samostatnú **importnú a AI produktovú pipeline** pre validáciu,
    normalizáciu, kategorizáciu a obohacovanie produktov.

AI môže generovať veľkú časť implementácie, testov, migrácií a
administračných nástrojov. Nemala by však fungovať ako nekontrolovaný
„autopilot". Kód musí prechádzať CI, automatickými testami a code
review. Pri produktových dátach AI nesmie vymýšľať technické parametre,
ceny ani dostupnosť.

**Realistický čas pre kvalitný produkčný rebuild:** približne **16--22
týždňov** pri sústredenom malom tíme s intenzívnym využitím AI. Funkčný
MVP je možné dostať približne do **8--12 týždňov**, ale bezpečná SEO
migrácia, paralelná synchronizácia a produkčný cutover potrebujú ďalší
čas.

------------------------------------------------------------------------

## 2. Čo je pravdepodobne skutočný problém

Pri e-shope s desiatkami tisíc produktov importovaných z externého
dátového servisu sa zvyčajne mieša päť samostatných problémov:

1.  **Dodávateľské dáta** -- rozdielna kvalita názvov, parametrov,
    značiek, obrázkov, EAN/MPN a popisov.
2.  **Produktový informačný model** -- chýbajúca alebo nekonzistentná
    normalizácia atribútov.
3.  **Kategorizácia** -- produkty sú zaradené príliš všeobecne,
    nekonzistentne alebo podľa štruktúry dodávateľa namiesto potrieb
    zákazníka.
4.  **Commerce vrstva** -- ceny, sklady, košík, objednávky, zákazníci,
    doprava a platby.
5.  **Storefront, vyhľadávanie a SEO** -- to, čo vidí zákazník a Google.

Ak sa všetkých päť vrstiev rieši v jednom monolitickom systéme alebo
sériou pluginov, každá zmena môže poškodiť import, výkon alebo SEO. Nové
riešenie by preto malo tieto oblasti oddeliť.

------------------------------------------------------------------------

## 3. Navrhovaná architektúra

``` text
                         DÁTOVÝ SERVIS / DODÁVATELIA
                                   │
                                   ▼
                     ┌──────────────────────────┐
                     │     PRODUCT INGESTION    │
                     │ Python / TypeScript      │
                     │ plánované importné joby  │
                     └────────────┬─────────────┘
                                  │
                ┌─────────────────┼──────────────────┐
                ▼                 ▼                  ▼
           Validácia         Normalizácia        AI enrichment
           duplicity         atribúty             kategorizácia
           EAN/MPN           výrobcovia           popisy/SEO
           chyby             jednotky             synonymá
                │                 │                  │
                └─────────────────┼──────────────────┘
                                  ▼
                     ┌──────────────────────────┐
                     │ PRODUCT MASTER DATABASE  │
                     │ PostgreSQL               │
                     └────────────┬─────────────┘
                                  │
                   ┌──────────────┴──────────────┐
                   ▼                             ▼
            COMMERCE ENGINE                  SEARCH ENGINE
              Medusa v2               Meilisearch / OpenSearch
                   │                             │
                   └──────────────┬──────────────┘
                                  ▼
                         NEXT.JS STOREFRONT
                                  │
               ┌──────────────────┼──────────────────┐
               ▼                  ▼                  ▼
          Google/SEO          zákazníci         AI asistent
          Shopping                              výber produktov
```

Zásadná myšlienka: **storefront nesmie byť priamo závislý od
dodávateľského feedu**. Feed sa najprv spracuje, skontroluje a uloží do
interného produktového modelu. Až schválené dáta sa publikujú do shopu.

------------------------------------------------------------------------

## 4. Prečo Next.js + Medusa + PostgreSQL

### Next.js

Next.js umožňuje server-side rendering a statickú/inkrementálnu
regeneráciu stránok. To je vhodné pre produktové a kategóriové stránky,
kde potrebujeme dobrý výkon, indexovateľný HTML obsah a kontrolu nad
SEO.

### Medusa v2

Medusa je modulárne commerce jadro. Produkty, ceny, sklad, objednávky a
ďalšie commerce funkcie nemusia byť pevne previazané s frontendovou
témou. To je veľmi vhodné pri custom importe a AI automatizácii.

Pre Worlds.sk by som základný CSV import nepovažoval za hlavný
mechanizmus. Vytvoril by som vlastnú integračnú vrstvu nad API/feedom
dodávateľa s auditom každej zmeny.

### PostgreSQL

70 000 produktov nie je pre PostgreSQL veľký objem. Počet riadkov bude
samozrejme vyšší kvôli variantom, atribútom, cenám, skladom a histórii,
ale kvalitne navrhnutá relačná databáza má dostatočnú rezervu.

### Redis

Redis môže obsluhovať cache, fronty, background úlohy, synchronizačné
joby a koordináciu náročnejších importov.

------------------------------------------------------------------------

## 5. AI kategorizácia produktov

Toto môže byť jedna z najhodnotnejších častí projektu.

Dodávateľ môže poslať napríklad:

``` text
PN: 90NX06Q1-M00AB0
Brand: ASUS
Name: ASUS NB ExpertBook B1 B1502CVA-BQ1234X
CPU: i5-1335U
RAM: 16GB
SSD: 512GB
```

AI a normalizačná vrstva z toho môžu vytvoriť:

``` json
{
  "department": "Počítače",
  "category": "Notebooky",
  "subcategory": "Firemné notebooky",
  "brand": "ASUS",
  "series": "ExpertBook",
  "attributes": {
    "screen_size": "15.6",
    "cpu": "Intel Core i5-1335U",
    "ram": "16 GB",
    "storage": "512 GB SSD"
  },
  "audience": ["business"]
}
```

AI však nemá mať právo vytvárať ľubovoľné nové kategórie. Najprv sa
vytvorí **riadená taxonómia** a AI vyberá iba z povolených uzlov.

Príklad:

``` text
Počítače
├── Notebooky
│   ├── Firemné notebooky
│   ├── Herné notebooky
│   ├── Ultrabooky
│   ├── 2-v-1 notebooky
│   └── Chromebooky
├── Stolné počítače
├── Komponenty
│   ├── Procesory
│   ├── Grafické karty
│   ├── Základné dosky
│   ├── RAM
│   ├── SSD
│   └── Zdroje
└── Príslušenstvo
```

Tak sa zabráni tomu, aby AI vytvorila stovky podobných alebo
duplicitných kategórií.

------------------------------------------------------------------------

## 6. Confidence scoring a ľudská kontrola

Každé AI rozhodnutie má mať confidence score.

``` text
Intel Core i9-14900K
→ PC komponenty
→ Procesory
→ Intel procesory
Confidence: 99,7 %
```

Takéto rozhodnutie možno automaticky prijať.

Pri nejednoznačnom produkte:

``` text
Generic USB industrial module XYZ-522
Confidence: 61 %
```

produkt skončí vo fronte **Needs review / Vyžaduje kontrolu**.

Cieľom nie je, aby človek manuálne prešiel 70 000 produktov. Cieľom je,
aby automatika bezpečne vyriešila väčšinu a človek kontroloval iba
problematické prípady.

------------------------------------------------------------------------

## 7. Čistenie a normalizácia dodávateľských dát

Dodávateľské feedy často obsahujú rovnakú hodnotu v rôznych tvaroch:

``` text
HP
Hewlett Packard
Hewlett-Packard
HP Inc.
hewlett packard
```

Interná hodnota má byť napríklad vždy:

``` text
HP
```

Podobne:

``` text
128 GB
128GB
128 Gb
128 G
128.0GB
```

sa normalizuje na jednu internú hodnotu.

Rovnaký princíp platí pre farby, jednotky, veľkosti, typy konektorov,
CPU, GPU, RAM, rozmery, kapacity a ďalšie atribúty.

**Jednoduché prípady rieši pravidlový engine. AI sa používa na
nejednoznačné prípady.** To je lacnejšie, rýchlejšie a predvídateľnejšie
ako posielať každý údaj do LLM.

------------------------------------------------------------------------

## 8. AI popisy produktov

Pri dátových e-shopoch je častý problém, že desiatky obchodov publikujú
rovnaký dodávateľský popis.

Odporúčam udržiavať minimálne dve vrstvy:

``` text
supplier_description
worlds_description
```

AI môže z overených štruktúrovaných údajov vytvoriť obsah typu:

-   krátke predstavenie,
-   kľúčové vlastnosti,
-   pre koho je produkt vhodný,
-   technické parametre,
-   kompatibilita,
-   obsah balenia.

Kritické pravidlo: **AI nesmie vymýšľať technické parametre.** Môže
vysvetľovať a prepisovať iba fakty, ktoré sú potvrdené zdrojovými
dátami.

Rovnako neodporúčam automaticky vytvoriť 70 000 dlhých generických AI
textov. Enrichment by mal byť prioritizovaný podľa obchodnej hodnoty
produktu.

------------------------------------------------------------------------

## 9. AI a SEO metadata

Pre kvalitné produkty je možné automaticky generovať:

-   SEO title,
-   meta description,
-   H1,
-   krátky popis,
-   dlhší popis,
-   ALT text obrázkov,
-   synonymá pre interné vyhľadávanie,
-   interné linkovanie.

Napríklad dodávateľský názov:

``` text
C9300L-24T-4G-E
```

môže byť na stránke prezentovaný ako:

``` text
Cisco Catalyst C9300L-24T-4G-E – 24-portový managed switch
```

Opäť platí, že názov musí vychádzať z overených produktových vlastností.

------------------------------------------------------------------------

## 10. Kategórie a SEO landing pages

Pri 70 000 produktoch je architektúra kategórií zásadná. Produkty majú
byť dostupné cez crawlable hierarchiu:

``` text
menu
→ kategória
→ podkategória
→ produkt
```

Príklady vhodných URL:

``` text
/notebooky/
/notebooky/herne/
/notebooky/asus/
/procesory/intel/
/procesory/amd/
/graficke-karty/nvidia/
```

Niektoré kombinácie filtrov môžu mať samostatnú SEO landing page,
napríklad:

``` text
/herne-notebooky/asus/
/notebooky/16-gb-ram/
/monitory/27-palcov/
```

Nie však každá kombinácia. Faceted navigation môže pri veľkom katalógu
vyrobiť milióny URL a zbytočne míňať crawl budget.

Preto odporúčam rozdeliť filtre na:

``` text
SEO filter → indexovateľný/crawlable
UX filter  → neindexovať a nevytvárať z neho nekonečný URL priestor
```

------------------------------------------------------------------------

## 11. Vyhľadávanie produktov

Pri technologickom katalógu by som produktové vyhľadávanie nepostavil na
jednoduchom SQL `LIKE '%text%'`.

Odporúčanie:

-   **Meilisearch** -- jednoduchšie nasadenie a veľmi dobrý pomer
    výkon/jednoduchosť,
-   **OpenSearch** -- väčšia flexibilita a pokročilejšie možnosti pri
    komplikovanom search use-case.

Indexovať sa môžu:

-   názov,
-   výrobca,
-   MPN,
-   EAN,
-   kategória,
-   parametre,
-   synonymá,
-   alternatívne názvy,
-   AI-generované search keywords.

Vyhľadávanie `16gb ddr5 notebook` tak nemusí iba hľadať slová v popise,
ale môže filtrovať reálne produktové atribúty.

------------------------------------------------------------------------

## 12. AI / konverzačné vyhľadávanie

Neskôr je možné pridať asistenta, ktorému zákazník napíše:

> Potrebujem notebook do 900 €, hlavne na AutoCAD, aspoň 16 GB RAM a
> nech nie je veľmi ťažký.

AI požiadavku preloží na štruktúrovaný dotaz:

``` json
{
  "category": "notebooks",
  "price_max": 900,
  "ram_min": 16,
  "usage": "CAD",
  "weight_preference": "light"
}
```

Katalógový/search engine vyhľadá **reálne produkty** a LLM iba vysvetlí
výsledky.

Zásadné pravidlo: **LLM nerozhoduje o cene ani skladovej dostupnosti.**
Tie vždy získava z commerce systému v reálnom čase.

------------------------------------------------------------------------

## 13. SEO ako súčasť platformy, nie plugin

Každá produktová stránka má server-side poskytovať správne:

-   `<title>`,
-   meta description,
-   canonical,
-   robots directives,
-   OpenGraph,
-   breadcrumbs,
-   Product JSON-LD,
-   Offer JSON-LD,
-   Brand,
-   SKU,
-   GTIN/EAN,
-   cenu,
-   dostupnosť,
-   relevantné údaje o doprave a vrátení, ak sú použité v merchant
    structured data.

Pri cenách a dostupnosti je dôležité, aby štruktúrované dáta zodpovedali
tomu, čo zákazník reálne vidí.

Pre e-commerce je vhodná kombinácia kvalitných on-page structured data a
produktového feedu do Google Merchant Center.

------------------------------------------------------------------------

## 14. Sitemapy

Pre 70 000 produktov odporúčam oddelené sitemapy:

``` text
/sitemap-index.xml
/sitemap-products-1.xml
/sitemap-products-2.xml
/sitemap-categories.xml
/sitemap-brands.xml
/sitemap-content.xml
```

Do sitemap sa majú dostať iba canonical a indexovateľné URL.

Pri významnej zmene produktu -- napríklad obsahu alebo relevantných
údajov -- sa aktualizuje `lastmod` podľa skutočnej zmeny, nie umelo pri
každom importe.

------------------------------------------------------------------------

## 15. Vypredané a ukončené produkty

Produkt sa nemá automaticky vymazať iba preto, že zmizol z feedu.

Navrhujem stavový model:

``` text
ACTIVE
OUT_OF_STOCK
DISCONTINUED
HIDDEN
REMOVED
```

Produkt s historickou SEO hodnotou môže zostať dostupný ako:

> Produkt sa už nepredáva.

A stránka ponúkne:

-   novší model,
-   podobné produkty,
-   rovnakú značku,
-   rovnakú kategóriu.

301 redirect má zmysel iba vtedy, ak existuje skutočne vhodná náhrada.
Inak môže byť hodnotnejšie zachovať informatívnu produktovú stránku.

------------------------------------------------------------------------

## 16. Importná architektúra

Odporúčaná pipeline:

``` text
Dodávateľ
    │
    ▼
RAW IMPORT
    │
    ▼
STAGING
    │
    ├── validácia
    ├── normalizácia
    ├── deduplikácia
    ├── kategorizácia
    ├── enrichment
    ├── porovnanie zmien
    ▼
APPROVED PRODUCT MASTER
    │
    ▼
SHOP / SEARCH / FEEDY
```

Každý import musí mať auditovateľný výsledok, napríklad:

``` text
Importované:            71 328
Nové:                      316
Aktualizované:            8 421
Zmeny ceny:               4 912
Zmeny skladu:             3 183
Zmiznuté zo zdroja:         148
Neplatné:                    37
Vyžadujú AI/human review:    61
```

Tak je vždy jasné, čo import reálne urobil.

------------------------------------------------------------------------

## 17. Delta import namiesto spracovania celého katalógu

Pre normalizovaný produkt sa uloží hash dát.

``` text
hash(product-data)
```

Ak sa hash od posledného importu nezmenil, produkt netreba znovu
spracovať.

Ak sa zmenil:

``` text
reprocess product
→ update DB
→ update search index
→ invalidate cache
→ update feed
```

Namiesto spracovania všetkých 70 000 produktov sa pri bežnom importe
spracujú iba zmenené produkty. To znižuje čas importu, AI náklady a
riziko zbytočných zmien.

------------------------------------------------------------------------

## 18. Hosting a infraštruktúra

Odporúčaná logická topológia:

``` text
Cloudflare
    │
Next.js storefront
    │
Medusa API
    │
├── PostgreSQL
├── Redis
├── Object Storage
├── Search Engine
└── Background Workers
```

### Možné hostingové smerovanie

Pre slovenský e-shop nemusí byť nutné vybudovať drahú AWS
infraštruktúru. Zaujímavá môže byť kombinácia:

-   Cloudflare -- DNS/CDN/WAF/bot protection,
-   Hetzner alebo kvalitný európsky cloud -- aplikačné servery/workery,
-   managed PostgreSQL,
-   managed Redis alebo spoľahlivo prevádzkovaný Redis,
-   Cloudflare R2/S3 kompatibilné úložisko,
-   samostatný search service.

Presný sizing sa určí podľa návštevnosti, veľkosti obrázkov, frekvencie
importov, objednávok a peak trafficu -- nie iba podľa počtu produktov.

------------------------------------------------------------------------

## 19. Blokovanie zahraničných IP

Keďže zahraničný prístup je blokovaný zámerne, pravidlá by som presunul
do kontrolovateľnej WAF/CDN vrstvy a nepoužíval jednoduché pravidlo
`foreign country = deny` bez výnimiek.

Princíp:

``` text
Slovensko / povolené trhy → allow
Overené Google crawlery      → allow
Google Shopping/Merchant     → allow podľa potreby
Bing a ďalšie relevantné boty→ allow
monitoring/API integrácie    → allow

ostatná riziková prevádzka
→ challenge / rate limit / block
```

Dôležité je overovať crawler identitu bezpečným spôsobom a
newhitelistovať iba user-agent string.

------------------------------------------------------------------------

## 20. Vývoj pomocou AI

Pre tento projekt neodporúčam jednorazový prompt typu „vytvor mi
e-shop". Vhodnejší je **repository-based AI development**.

``` text
repository/
├── storefront/
├── commerce/
├── importer/
├── ai-catalog/
├── search/
├── infra/
├── docs/
└── tests/
```

Každá úloha pre AI má mať jasnú špecifikáciu, napríklad:

``` text
Implementuj parser dodávateľského feedu podľa /docs/import-spec.md.
Pridaj unit testy.
Nemeň commerce service.
Produkt upsertuj podľa supplier_id + MPN.
Neplatné záznamy pošli do quarantine.
Pri zmene schémy vytvor migráciu.
```

AI implementuje zmenu a CI následne vykoná:

``` text
lint
→ typecheck
→ unit tests
→ integration tests
→ security scanning
→ build
→ preview deployment
```

Až úspešná verzia sa môže merge-núť.

Takto je realistické, aby AI vytvorila veľkú väčšinu rutinného kódu,
pričom architektúra, akceptačné kritériá, bezpečnosť a finálne
rozhodnutia zostávajú kontrolované človekom.

------------------------------------------------------------------------

## 21. Automatické testovanie

Každá kritická funkcia má mať testy:

-   unit testy,
-   API integračné testy,
-   importné testy,
-   end-to-end browser testy,
-   checkout testy,
-   SEO testy.

Príklad:

``` text
Given:
price = 99.99 EUR
stock = 4

Product page musí vrátiť:
HTTP 200
viditeľnú cenu 99.99 EUR
availability = InStock
správny canonical
Product JSON-LD s rovnakou cenou
```

------------------------------------------------------------------------

## 22. Automatické SEO testy

Každý deployment môže automaticky kontrolovať:

``` text
canonical existuje
SEO title existuje
presne jeden H1
Product schema je syntakticky správna
breadcrumb schema existuje
nevznikol náhodný noindex
robots pravidlá sú správne
sitemap je dostupná
HTTP status je správny
structured price = viditeľná cena
```

Ak kritická kontrola zlyhá, deployment sa zastaví. To výrazne znižuje
riziko, že jediná chyba v template poškodí desaťtisíce URL.

------------------------------------------------------------------------

## 23. Admin dashboard pre kvalitu katalógu

Administrácia by mala ukazovať kvalitu dát, nie iba zoznam produktov.

``` text
CATALOG QUALITY

71 284 produktov

✓ Správne kategorizované       67 822
⚠ Nízka AI confidence           1 122
⚠ Chýbajúci EAN                   814
⚠ Chýbajúci obrázok                392
⚠ Chýbajúce parametre              811
⚠ Kandidáti na duplicitu            323
```

Administrátor môže vybrať problematické produkty, nechať AI navrhnúť
opravu a návrh hromadne potvrdiť alebo zamietnuť.

------------------------------------------------------------------------

## 24. Product Quality Score

Každý produkt môže mať interné skóre kvality, napríklad:

``` text
Quality score: 87/100
```

Príklad bodovania:

  Kritérium                  Body
  ------------------------ ------
  EAN                         +10
  výrobca                      +5
  MPN                         +10
  kvalitná kategória          +15
  obrázok                     +10
  štruktúrované atribúty      +20
  kvalitný popis              +10
  SEO metadata                +10
  cena                         +5
  dostupnosť                   +5

Skóre sa môže používať pri prioritizácii enrichmentu a rozhodovaní,
ktoré produkty majú byť aktívne indexované. Hranica pre indexáciu však
nemá byť slepá -- musí brať do úvahy aj obchodnú a SEO hodnotu.

------------------------------------------------------------------------

## 25. Porovnanie platforiem

  ------------------------------------------------------------------------
  Riešenie                     Orientačné hodnotenie Komentár
  --------------------- ---------------------------- ---------------------
  **Next.js + Medusa +                      **9/10** Najlepší fit pre
  PostgreSQL**                                       AI-driven development
                                                     a custom produktovú
                                                     pipeline

  **Shopware 6**                            **8/10** Výborné tradičnejšie
                                                     commerce riešenie;
                                                     vhodné aj pre budúcu
                                                     agentúrnu správu

  **Shopify**                               **6/10** Silné SaaS, ale menej
                                                     atraktívne pri veľmi
                                                     custom importe a
                                                     dátovej automatizácii

  **WooCommerce**                           **5/10** Použiteľné, ale pre
                                                     tento rebuild by
                                                     nebolo mojou prvou
                                                     voľbou

  **Úplne custom                            **6/10** Zbytočne vysoké
  backend**                                          riziko; lepšie je
                                                     customizovať dátovú
                                                     vrstvu okolo
                                                     overeného commerce
                                                     jadra
  ------------------------------------------------------------------------

Ak je hlavným cieľom **vlastný vývoj s vysokým podielom AI**, preferujem
Medusa/Next.js.

Ak klient preferuje **štandardnejší enterprise e-commerce produkt, ktorý
má dlhodobo spravovať externá agentúra**, Shopware 6 je veľmi vážny
kandidát a mal by byť súčasťou finálneho proof-of-concept porovnania.

------------------------------------------------------------------------

## 26. Nemigrovať 70 000 produktov naslepo

Pred migráciou odporúčam vyhodnotiť minimálne:

-   predaje za 12--24 mesiacov,
-   Google impressions a clicks,
-   skladovú dostupnosť,
-   dostupnosť u dodávateľa,
-   maržu,
-   kvalitu popisu a parametrov,
-   kategóriu,
-   značku,
-   backlinks,
-   konverzie.

Je možné, že z 70 000 produktov je len časť reálne obchodne zaujímavá.
Ilustračný príklad:

``` text
70 000 celkových produktov
18 000 aktuálne predajných
12 000 obchodne zaujímavých
 7 000 so search impressions
 3 000 s historickým predajom
```

Tieto čísla nie sú odhadom Worlds.sk -- sú iba ukážkou analýzy, ktorú
treba vykonať nad reálnymi dátami.

Výsledkom môže byť stratégia: **veľmi kvalitné jadro katalógu +
kontrolovaný long-tail**, namiesto rovnakej investície do každého z 70
000 produktov.

------------------------------------------------------------------------

# 27. Navrhovaný harmonogram

Nižšie je realistický harmonogram pre malý skúsený tím využívajúci AI
coding agents. Jednotlivé fázy sa čiastočne prekrývajú.

  -------------------------------------------------------------------------
  Fáza                                       Trvanie Hlavný výstup
  --------------------- ---------------------------- ----------------------
  0\. Discovery a                           3--5 dní prístupy, feed, infra,
  prístupy                                           GSC/analytics,
                                                     definícia scope

  1\. Forenzný audit                     1--2 týždne technický/SEO/dátový
                                                     audit, URL inventory,
                                                     riziká

  2\. Taxonómia a                        1--2 týždne category tree,
  dátový model                                       attribute model,
                                                     canonical product
                                                     schema

  3\. Importná pipeline                  2--3 týždne raw/staging/master,
  MVP                                                delta import, audit
                                                     log, quarantine

  4\. AI catalog engine                  2--3 týždne kategorizácia,
                                                     normalizácia,
                                                     confidence scoring,
                                                     review queue

  5\. Commerce backend                   2--3 týždne produkty, ceny, sklad,
                                                     zákazníci, objednávky,
                                                     checkout integrácie

  6\. Search +                           3--4 týždne Next.js shop,
  storefront                                         kategórie, PDP,
                                                     search, košík,
                                                     responzívne UI

  7\. SEO/Merchant                       1--2 týždne schema, canonical,
  vrstva                                             sitemaps, redirects,
                                                     feeds, SEO QA

  8\. Admin/quality                      1--2 týždne catalog quality, AI
  dashboard                                          review, import
                                                     monitoring

  9\. Paralelná                          2--3 týždne starý a nový shop
  synchronizácia                                     bežia súbežne,
                                                     porovnanie dát

  10\. UAT,                              1--2 týždne produkčná pripravenosť
  load/security testy                                a opravy

  11\. Cutover +                            1 týždeň DNS/CDN prechod,
  hypercare                                          monitoring, okamžité
                                                     opravy
  -------------------------------------------------------------------------

### Časové scenáre

**Rýchle MVP: 8--12 týždňov**\
Obsahuje import, základnú taxonómiu, commerce jadro, storefront, search
a základné SEO. Nie je to ešte ideálny termín na bezrizikové vypnutie
starého shopu.

**Odporúčaný produkčný projekt: 16--22 týždňov**\
Zahŕňa kvalitnú migráciu, AI katalogizáciu, paralelnú synchronizáciu,
automatické testy, SEO redirect mapu, UAT a kontrolovaný cutover.

**Komplexná verzia: 22--30 týždňov**\
Ak sa pridá rozsiahly B2B režim, viac dodávateľov, komplikované
ERP/účtovníctvo, personalizácia, AI shopping assistant, marketplace
feedy a väčší redizajn.

### Čo môže harmonogram predĺžiť

Najväčšie riziká nie sú samotné React/TypeScript obrazovky. Sú to:

-   nezdokumentovaný alebo nekonzistentný produktový feed,
-   komplikovaná logika cien a skladov,
-   staré URL bez jasného mapovania,
-   chýbajúce dáta o objednávkach/zákazníkoch,
-   platobné a dopravné integrácie,
-   nejasná kategorizácia,
-   veľké množstvo manuálnych výnimiek v súčasnom systéme,
-   požiadavka migrovať heslá zákazníkov alebo kompletnú históriu účtov,
-   integrácie na účtovníctvo/ERP, ktoré zatiaľ nepoznáme.

------------------------------------------------------------------------

## 28. Navrhovaný spôsob realizácie

### Fáza A -- audit pred programovaním

Najprv získať:

1.  vzorku a dokumentáciu produktového feedu,
2.  export aktuálnej kategóriovej štruktúry,
3.  databázovú schému alebo relevantné exporty,
4.  Google Search Console,
5.  analytiku,
6.  server/access logy,
7.  zoznam platobných a dopravných integrácií,
8.  informácie o účtovníctve/ERP,
9.  export objednávok a produktového výkonu,
10. zoznam súčasných URL.

### Fáza B -- proof of concept

Pred kompletným buildom spracovať napríklad **5 000 reprezentatívnych
produktov** z viacerých kategórií.

Na tejto vzorke overiť:

-   presnosť AI kategorizácie,
-   kvalitu normalizácie,
-   náklady na AI enrichment,
-   search relevanciu,
-   rýchlosť importu,
-   návrh produktovej stránky,
-   SEO output.

Až potom zmraziť architektúru a rozbehnúť celý katalóg.

------------------------------------------------------------------------

## 29. Čo by som urobil ako prvé

Prvým technickým sprintom by ešte nebol nový homepage.

Priorita:

``` text
1. feed/data audit
2. canonical product schema
3. category taxonomy
4. importer + staging DB
5. delta/change detection
6. AI classification proof of concept
7. quality dashboard
8. až potom storefront vo väčšom rozsahu
```

Dôvod je jednoduchý: krásny nový frontend nevyrieši nekvalitné dáta. Ak
je dátové jadro správne, storefront, Google feed, Heureka feed aj budúci
AI asistent môžu používať ten istý kvalitný produktový zdroj.

------------------------------------------------------------------------

## 30. Dlhodobý cieľ -- Worlds Commerce Platform

Projekt by som nekoncepčne nenazýval iba „nový Worlds.sk web". Lepší
cieľ je vytvoriť **Worlds Commerce Platform**, v ktorej je web iba jeden
z výstupov.

``` text
                    PRODUCT MASTER
                         │
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
    Worlds.sk       Google Shopping     Heureka
        │                │                │
        ├─────────── Marketplace feedy ───┤
        │
        ├── B2B feed/API
        ├── e-mail kampane
        └── AI shopping assistant
```

Tak sa z dnešného komplikovaného 70-tisícového katalógu môže stať hlavné
dátové aktívum firmy.

------------------------------------------------------------------------

## 31. Predbežné odporúčanie

**Preferovaný smer:** Next.js + Medusa v2 + PostgreSQL + Redis +
samostatný search engine + vlastná produktová/importná pipeline +
Cloudflare.

**AI použiť intenzívne na:**

-   generovanie a refactoring kódu,
-   unit/integration/E2E testy,
-   dokumentáciu,
-   kategorizáciu,
-   normalizáciu nejednoznačných dát,
-   SEO metadata,
-   popisy z overených faktov,
-   synonymá a search enrichment,
-   detekciu dátových anomálií,
-   návrhy opráv v administračnom dashboarde.

**AI nepoužiť ako autoritu pre:**

-   cenu,
-   skladovú dostupnosť,
-   neoverené technické parametre,
-   daňové/účtovné rozhodnutia,
-   automatické produkčné deploye bez testov,
-   nekontrolované vytváranie kategórií.

**Odhad:** MVP 8--12 týždňov; odporúčaný produkčný rebuild 16--22
týždňov; komplexná verzia 22--30 týždňov podľa integrácií a stavu dát.

------------------------------------------------------------------------

## 32. Ďalší krok

Pre presný technický návrh a cenový odhad treba vykonať Discovery/Audit.
Minimálne potrebné vstupy:

-   500--5 000 riadkov reálneho produktového feedu alebo API
    dokumentácia,
-   aktuálna category tree,
-   zoznam integrácií,
-   anonymizovaný prehľad databázovej schémy,
-   Search Console export alebo prístup,
-   GA/analytics dáta,
-   top landing pages a top produkty,
-   informácie o súčasnom hostingu,
-   požiadavky na platby, dopravu, fakturáciu a B2B.

Po tomto kroku je možné pripraviť presný **Solution Architecture
Document**, databázový model, integračný diagram, backlog po sprintoch,
infra sizing a podstatne presnejší rozpočet.

------------------------------------------------------------------------

## Referenčné zdroje

-   Medusa Product Module:
    https://docs.medusajs.com/resources/commerce-modules/product
-   Medusa product import:
    https://docs.medusajs.com/user-guide/products/import
-   Google -- Ecommerce site structure:
    https://developers.google.com/search/docs/specialty/ecommerce/help-google-understand-your-ecommerce-site-structure
-   Google -- Faceted navigation:
    https://developers.google.com/crawling/docs/faceted-navigation
-   Google -- Merchant listing structured data:
    https://developers.google.com/search/docs/appearance/structured-data/merchant-listing
-   Google Merchant Center -- landing page requirements:
    https://support.google.com/merchants/answer/7331077

*Dokument je predbežná architektonická analýza. Finálne technologické
rozhodnutie, harmonogram a rozpočet treba potvrdiť po audite reálnych
dát, integrácií a existujúcej infraštruktúry Worlds.sk.*
