# 5. Developer Guide, Kódovacie princípy & Best Practices

Tento dokument je praktickou príručkou pre vývojárov pracujúcich na projekte **Worlds Commerce Platform**. Obsahuje kódovacie štandardy, architektonické princípy, inštrukcie k prostrediu a postupy testovania.

---

## 5.1. Kódovacie štandardy a architektonické princípy

V projekte prísne dodržiavame nasledovné zásady:

### 1. SOLID Princípy & Oddelenie zodpovedností (Separation of Concerns)
- **Single Responsibility**: Každý modul má jedinú úlohu (napr. `ProductNormalizer` len normalizuje texty a ceny, `TaxonomyEngine` len mapuje taxonómiu, `DeltaEngine` len počíta a porovnáva hashe).
- **Open/Closed**: Nové normalizačné pravidlá alebo ďalší dodávatelia sa pridávajú rozširovaním tried/rozhraní, nie zásahom do jadra storefrontu.
- **Dependency Inversion**: Vyššie vrstvy (napr. `ImporterService`) pracujú s abstrakciou `ProductMasterRepository`, čo umožňuje jednoduchú výmenu in-memory úložiska za PostgreSQL bez prepisovania biznis logiky.

### 2. DRY (Don't Repeat Yourself) & Zdieľané typy
- Všetky dátové modely, rozhrania SOAP volaní a stavové enumy sú centralizované v balíku `@worlds/types`.
- Storefront aj Ingestor používajú rovnaké TypeScript typy pre produkty a objednávky.

### 3. Typová bezpečnosť (Strict TypeScript)
- Zákaz používania `any` v produkčnom kóde (okrem izolovaných mockov).
- Všetky SOAP vstupy a výstupy sú typované s validáciou povinných a voliteľných hodnôt.

### 4. Determinizmus a bezpečnosť pri AI
- Žiadne náhodné generovanie kľúčových technických parametrov (CPU, RAM, cena, dostupnosť).
- AI asistuje len pri klasifikácii do **vopred definovanej taxonómie** a pri generovaní SEO popiskov z overených atribútov.

---

## 5.2. Štruktúra repozitára (pnpm Monorepo)

```text
c:\Web\Ethos\
├── apps/
│   └── storefront/              # Next.js 15 App Router e-commerce web & Admin
│       ├── src/
│       │   ├── app/             # Stránky (Domov, Kategória, Produkt, Košík, Admin, Sitemap)
│       │   ├── components/      # UI komponenty (Header, Footer, ProductCard, FacetFilters)
│       │   └── lib/             # Klientske a serverové služby
│       ├── package.json
│       └── next.config.ts
│
├── packages/
│   ├── types/                   # Zdieľané TypeScript rozhrania a dátové kontrakty
│   ├── ed-client/               # SOAP/XML klient pre eD system a. s. (E LINKX)
│   └── importer/                # Ingestion engine, normalizátor, AI classifier, testy
│
├── docs/                        # Podrobná dokumentácia celého riešenia
├── feed specs/                  # Zdrojová PDF špecifikácia (PRIVATEdoc.pdf)
├── package.json                 # Koreňový workspace
└── pnpm-workspace.yaml
```

---

## 5.3. Konfigurácia prostredia (`.env.example`)

Vytvorte súbor `.env` v koreňovom priečinku alebo v `apps/storefront/.env.local`:

```bash
# eD system a. s. (E LINKX) SOAP Web Service
ED_LOGIN=vas_api_login
ED_PASSWORD=vase_api_heslo
ED_ENDPOINT_URL=https://private-ws-sk.elinkx.biz/service.asmx

# Storefront & SEO
NEXT_PUBLIC_SITE_URL=https://worlds.sk
PORT=3000

# Databáza (PostgreSQL produkcia)
DATABASE_URL=postgresql://user:password@localhost:5432/worlds_pim?schema=public

# Redis (fronty a cache)
REDIS_URL=redis://localhost:6379
```

---

## 5.4. Príkazy a spúšťanie projektu

### Inštalácia závislostí
```bash
pnpm install
```

### Spustenie vývojového servera (Storefront + Admin)
```bash
pnpm dev:storefront
# Aplikácia pobeží na http://localhost:3000
# Admin rozhranie na http://localhost:3000/admin
```

### Spustenie Ingestion Pipeline (import vzorky dát a kontrola kvality)
```bash
pnpm --filter @worlds/importer run import:sample
```

### Spustenie automatizovaných testov
```bash
pnpm test
```

### Produkčný build všetkých balíkov
```bash
pnpm build
```
