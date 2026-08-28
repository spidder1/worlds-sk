# 4. Next.js 15 Storefront a SEO architektúra

Tento dokument popisuje frontendovú aplikáciu Worlds.sk, princípy Server-Side Renderingu, správu štruktúrovaných dát a optimalizáciu pre vyhľadávače (Google, Seznam, Heureka).

---

## 4.1. Prečo Next.js 15 App Router? (Pre nováčika)

Predstavte si, že bežná webová aplikácia (napr. starší React) pošle do prehliadača prázdnu stránku a až JavaScript v počítači zákazníka začne sťahovať produkty. Robot od Google (Googlebot) takúto stránku nemusí správne prečítať alebo ju zaradí pomaly.

**Next.js 15 so Server Components funguje inak:**
1. Server pripraví hotový HTML kód stránky aj s produktmi, cenami a obrázkami za niekoľko milisekúnd.
2. Zákazník aj Googlebot okamžite vidia hotovú stránku bez blikania.
3. Rýchlosť načítania (Core Web Vitals - LCP, INP, CLS) je špičková, čo priamo zlepšuje pozície v Google vyhľadávaní.

---

## 4.2. SEO štruktúra a rich snippets (JSON-LD)

Každá produktová stránka (`/produkt/[slug]`) automaticky vkladá do hlavičky štruktúrované dáta vo formáte **Schema.org/Product**:

```json
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "ASUS ExpertBook B1 B1502CVA-BQ1234X",
  "image": ["https://images.unsplash.com/..."],
  "description": "Výkonný a odolný firemný notebook ASUS...",
  "sku": "ASU-NB-EXP15",
  "mpn": "90NX06Q1-M00AB0",
  "gtin13": "4711387123456",
  "brand": {
    "@type": "Brand",
    "name": "ASUS"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://worlds.sk/produkt/asus-expertbook-b1...",
    "priceCurrency": "EUR",
    "price": "689.00",
    "itemCondition": "https://schema.org/NewCondition",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "Worlds.sk"
    }
  }
}
```

### Čo to prináša v praxi?
Keď niekto hľadá v Google *"ASUS ExpertBook 90NX06Q1-M00AB0"*, Google priamo vo výsledkoch zobrazí:
- Hviezdicové hodnotenie
- Presnú cenu v EUR
- Zelený príznak **Skladom**
- Obrázok a názov výrobcu

---

## 4.3. Facetovaná navigácia a prevencia "Crawl Traps"

Pri 70 000 produktoch by nekontrolované filtrovanie (napr. kombinácie typu `farba=cerna&ram=16gb&cena_od=100&cena_do=200&zoradit=najdrahsie`) vytvorilo milióny zbytočných adries. Googlebot by minul celý čas (crawl budget) na prehľadávanie týchto prázdnych stránok a nestihol by indexovať skutočné produkty.

**Naše riešenie:**
1. **SEO Kategórie a podkategórie** (`/kategoria/notebooky`, `/kategoria/herne-notebooky`): Sú trvalo indexovateľné a majú vlastné unikátne texty a sitemapy.
2. **UX filtre** (dynamické filtrovanie cez parametre `?brand=ASUS&inStock=true`): Majú nastavený `canonical` odkaz smerujúci na hlavnú kategóriu alebo pri vyhľadávaní obsahujú hlavičku `robots: noindex, follow`.
3. **Dynamický Sitemap Index** (`/sitemap.xml`): Automaticky rozdeľuje sitemapy na logické celky: statické stránky, kategórie a aktívne produkty.
