# 3. Normalizácia dát a AI Catalog Engine

Tento dokument vysvetľuje, ako systém čistí vstupné dáta od dodávateľa, ako funguje riadená AI kategorizácia a ako sa počíta **Product Quality Score (0–100)**.

---

## 3.1. Prečo je potrebná normalizácia? (Pre nováčika)

Dodávatelia IT techniky majú v systémoch dáta od stoviek rôznych výrobcov. Každý výrobca píše názvy a parametre inak.

**Príklad problému v praxi:**
- Jeden produkt má výrobcu `Hewlett-Packard`, druhý `HP Inc.`, tretí `HP`. Ak by sme to neopravili, zákazník filtrujúci podľa "HP" by našiel len tretinu notebookov.
- Jeden disk má kapacitu `512GB`, iný `512 Gb`, ďalší `512.0 GB`. Pre filter sú to tri rôzne hodnoty.

**Riešenie v našom systéme:**
Každý záznam prechádza **Normalizačným enginom**, ktorý dáta automaticky zjednotí na jeden kanonický tvar:
- `Hewlett-Packard` $\rightarrow$ `HP`
- `512GB` $\rightarrow$ `512 GB`
- Odstránia sa nežiaduce HTML značky z popisov
- Vygeneruje sa čisté, slovenské SEO URL (slug) bez diakritiky

---

## 3.2. Riadená taxonómia a AI kategorizácia

Základné pravidlo: **Umelá inteligencia nesmie vytvárať náhodné nové kategórie.**

V systéme máme definovaný pevný strom kategórií (**Managed Taxonomy**):
```text
Počítače a notebooky
├── Notebooky
│   ├── Herné notebooky
│   ├── Firemné a pracovné notebooky
│   └── Ultrabooky a tenké notebooky
├── Stolné počítače
└── Tablety

Počítačové komponenty
├── Procesory (CPU)
├── Grafické karty (GPU)
├── Operačné pamäte (RAM)
└── SSD disky

Monitory
```

### Ako funguje AI Classifier & Confidence Scoring
1. Systém najprv skontroluje kód kategórie od eD system (napr. kód `101`).
2. AI analyzuje názov produktu (napr. *"Lenovo LOQ 15 RTX 4060"*).
3. Podľa kľúčových znakov (RTX grafika, modelový rad LOQ) určí, že ide o **Herný notebook**.
4. Priradí **Confidence Score (Miera istoty)** od 0% do 100%:
   - **Score $\ge 85\%$ (napr. 96%)**: Produkt je označený ako `AUTO_APPROVED` a okamžite publikovaný na webe.
   - **Score $< 85\%$ (napr. 62%)**: Produkt je označený ako `NEEDS_REVIEW` a zaradený do schvaľovacieho frontu v admine pre manuálne potvrdenie administrátorom.

---

## 3.3. Výpočet cien a poplatkov (Cenotvorba)

Cena produktu nie je len obyčajné číslo. Systém presne kalkuluje:

$$\text{Nákupná cena s poplatkami} = \text{YourPrice} + \text{GarbageFee (SNC)} + \text{AuthorFee (AO)}$$

$$\text{Základná predajná cena bez DPH} = \text{Nákupná cena s poplatkami} \times \left(1 + \frac{\text{Marža \%}}{100}\right)$$

$$\text{Koncová predajná cena s DPH} = \text{Základná predajná cena bez DPH} \times \left(1 + \frac{\text{DPH \%}}{100}\right)$$

Ak dodávateľ poskytuje odporúčanú koncovú cenu (`EndUserPrice`), systém ju zohľadní, aby e-shop nepredával pod odporúčanú cenu, no vždy garantuje minimálnu nastavenú maržu.

---

## 3.4. Product Quality Score (0–100 bodov)

Každý produkt v systéme má automaticky vypočítané skóre kvality:

| Kritérium | Max. bodov | Podmienka udelenia |
| :--- | :---: | :--- |
| **EAN kód** | +10 | Platný medzinárodný čiarový kód (GTIN/EAN $\ge$ 8 znakov) |
| **Značka / Výrobca** | +5 | Overený, normalizovaný výrobca |
| **Part Number (MPN)** | +10 | Presný kód výrobcu pre identifikáciu |
| **Kategória** | +15 | Presné zaradenie v 3-úrovňovej hierarchii |
| **Obrázky** | +10 | Minimálne 1 až 2 kvalitné obrázky |
| **Štruktúrované atribúty** | +20 | 4 a viac vyplnených parametrov z navigátora |
| **Popis produktu** | +10 | Zmysluplný popis $\ge$ 150 znakov |
| **SEO Metadata** | +10 | Vygenerovaný SEO title a description |
| **Cena** | +5 | Platná nákupná aj predajná cena $> 0$ |
| **Skladová dostupnosť** | +5 | Známy a overený stav skladu |
| **CELKOM** | **100** | **Maximálna kvalita dát** |

Skóre kvality sa používa v administrácii na prioritizáciu produktov a v storefrontovom vyhľadávaní pre férové radenie najlepšie popísaných produktov na popredné miesta.
