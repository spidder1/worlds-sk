import { MasterProduct, TaxonomyCategory, QuarantineRecord, ImportRunSummary } from '@worlds/types';

export const CATEGORIES: TaxonomyCategory[] = [
  {
    id: 'cat-1',
    slug: 'pocitace-a-notebooky',
    name: 'Počítače a notebooky',
    level: 1,
    isSeoIndexed: true,
    displayOrder: 1,
    subcategories: [
      {
        id: 'cat-2',
        slug: 'notebooky',
        name: 'Notebooky',
        parentSlug: 'pocitace-a-notebooky',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 1,
        subcategories: [
          {
            id: 'cat-3',
            slug: 'herne-notebooky',
            name: 'Herné notebooky',
            parentSlug: 'notebooky',
            level: 3,
            isSeoIndexed: true,
            displayOrder: 1,
          },
          {
            id: 'cat-4',
            slug: 'firemne-notebooky',
            name: 'Firemné a pracovné notebooky',
            parentSlug: 'notebooky',
            level: 3,
            isSeoIndexed: true,
            displayOrder: 2,
          },
          {
            id: 'cat-5',
            slug: 'ultrabooky',
            name: 'Ultrabooky',
            parentSlug: 'notebooky',
            level: 3,
            isSeoIndexed: true,
            displayOrder: 3,
          },
        ],
      },
      {
        id: 'cat-6',
        slug: 'stolne-pocitace',
        name: 'Stolné počítače',
        parentSlug: 'pocitace-a-notebooky',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 2,
      },
    ],
  },
  {
    id: 'cat-8',
    slug: 'komponenty',
    name: 'Počítačové komponenty',
    level: 1,
    isSeoIndexed: true,
    displayOrder: 2,
    subcategories: [
      {
        id: 'cat-9',
        slug: 'procesory',
        name: 'Procesory (CPU)',
        parentSlug: 'komponenty',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 1,
      },
      {
        id: 'cat-10',
        slug: 'graficke-karty',
        name: 'Grafické karty (GPU)',
        parentSlug: 'komponenty',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 2,
      },
      {
        id: 'cat-11',
        slug: 'pamate-ram',
        name: 'Operačné pamäte (RAM)',
        parentSlug: 'komponenty',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 3,
      },
      {
        id: 'cat-12',
        slug: 'ssd-disky',
        name: 'SSD disky',
        parentSlug: 'komponenty',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 4,
      },
    ],
  },
  {
    id: 'cat-13',
    slug: 'monitory',
    name: 'Monitory',
    level: 1,
    isSeoIndexed: true,
    displayOrder: 3,
  },
];

export const PRODUCTS: MasterProduct[] = [
  {
    "id": "ed-11294400",
    "supplierCode": "11294400",
    "sku": "11294400",
    "mpn": "NX.J02EC.003",
    "ean": "4711474070777",
    "brand": "Acer",
    "categorySlug": "notebooky",
    "categoryHierarchy": [
      "Počítače a notebooky",
      "Notebooky"
    ],
    "title": "ACER NTB Aspire 17 (A17-51M-54L5),i5-120U,17,3\"FHD,16GB,1TB SSD,Intel Iris,W11H,Gray",
    "slug": "acer-ntb-aspire-17-a17-51m-54l5-i5-120u-17-3-fhd-16gb-1tb-ssd-intel-iris-w11h-gray-11294400",
    "shortDescription": "&lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;ACER NTB Aspire 17 (A17-51M-54L5)&lt;/strong&gt;&lt;br /&gt; &lt;strong&gt;Part Number: NX.J02EC.003&lt;/strong&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Procesor&lt;/strong&gt;&lt;br /&gt; Výrobca procesora: Intel&lt;br /&gt; Model procesora: Core 5 120U&lt;br /&gt; Rýchlosť procesora: 1,4 GHz&lt;br /&gt; Počet jadier: 10&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Zobrazenie a grafika&lt;/strong&gt;&lt;br /&gt; Grafická karta: Intel Iris X Graphics&lt;br /&gt; Veľkosť obrazovky: 17,3\"&lt;br /&gt; Technológia obrazovky displeja: IPS&lt;br /&gt; Typ displeja: Matný&lt;br /&gt; Dotykový displej: Nie&lt;br /&gt; Režim obrazovky: FHD&lt;br /&gt; Rozlíšenie obrazovky: 1920 x 1080&lt;br /&gt; Pomer strán: 16:9&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Pamäť&lt;/strong&gt;&lt;br /&gt; Štandardná pamäť: 16 GB&lt;br /&gt; Technológia pamäte: LPDDR5&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Úložisko&lt;/strong&gt;&lt;br /&gt; Celková kapacita disku SSD: 1024 GB&lt;br /&gt; Typ SSD: PCIe NVMe SSD PM4&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Siete a komunikácia&lt;/strong&gt;&lt;br /&gt; Wi-Fi 6E (802.11 a/b/g/n/ac/ax) 2*2: Áno&lt;br /&gt; Bluetooth 5.1: Áno&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Rozhrania/porty&lt;/strong&gt;&lt;br /&gt; USB Type-C: Áno&lt;br /&gt; DisplayPort: Áno&lt;br /&gt; Thunderbolt: Áno&lt;br /&gt; DC-in: Áno&lt;br /&gt; USB 3.2 Gen 1: Áno&lt;br /&gt; HDMI: Áno&lt;br /&gt; 3.5 mm Combo Jack: Áno&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Software&lt;/strong&gt;&lt;br /&gt; Operačný systém: Windows 11 Home&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Výbava&lt;/strong&gt;&lt;br /&gt; Predná kamera: Áno&lt;br /&gt; Mikrofón: Áno&lt;br /&gt; Numerická klávesnica: Áno&lt;br /&gt; Podsvietená klávesnica: Áno&lt;br /&gt; Čítačka odtlačkov prstov: Áno&lt;br /&gt; Touchpad: Áno&lt;br /&gt; Čítačka pamäťových kariet: Nie&lt;br /&gt; Optická mechanika: Nie&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Informácie o batérii&lt;br /&gt; Počet článkov batérie: 3 články&lt;/strong&gt;&lt;br /&gt; Chemické zloženie batérie: Lithium-iontový (Li-Ion)&lt;br /&gt; Energia batérie: 50Wh&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Popis napájania&lt;/strong&gt;&lt;br /&gt; 3-pin 65 W AC adaptér, 243 g s 180 cm DC káblom&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Fyzické charakteristiky&lt;/strong&gt;&lt;br /&gt; Farba: Steel Gray&lt;br /&gt; Rozmery: 402,1 (W) x 256,5 (D) x 17,99 (H) mm&lt;br /&gt; Hmotnosť (približná): 2,09 kg&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt; &lt;/p&gt; &lt;p&gt;&lt;em&gt;Popis produktu bol preložený pomocou umelej inteligencie a môže obsahovať nepresnosti.&lt;/em&gt;&lt;/p&gt;",
    "supplierDescription": "&lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;ACER NTB Aspire 17 (A17-51M-54L5)&lt;/strong&gt;&lt;br /&gt; &lt;strong&gt;Part Number: NX.J02EC.003&lt;/strong&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Procesor&lt;/strong&gt;&lt;br /&gt; Výrobca procesora: Intel&lt;br /&gt; Model procesora: Core 5 120U&lt;br /&gt; Rýchlosť procesora: 1,4 GHz&lt;br /&gt; Počet jadier: 10&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Zobrazenie a grafika&lt;/strong&gt;&lt;br /&gt; Grafická karta: Intel Iris X Graphics&lt;br /&gt; Veľkosť obrazovky: 17,3\"&lt;br /&gt; Technológia obrazovky displeja: IPS&lt;br /&gt; Typ displeja: Matný&lt;br /&gt; Dotykový displej: Nie&lt;br /&gt; Režim obrazovky: FHD&lt;br /&gt; Rozlíšenie obrazovky: 1920 x 1080&lt;br /&gt; Pomer strán: 16:9&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Pamäť&lt;/strong&gt;&lt;br /&gt; Štandardná pamäť: 16 GB&lt;br /&gt; Technológia pamäte: LPDDR5&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Úložisko&lt;/strong&gt;&lt;br /&gt; Celková kapacita disku SSD: 1024 GB&lt;br /&gt; Typ SSD: PCIe NVMe SSD PM4&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Siete a komunikácia&lt;/strong&gt;&lt;br /&gt; Wi-Fi 6E (802.11 a/b/g/n/ac/ax) 2*2: Áno&lt;br /&gt; Bluetooth 5.1: Áno&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Rozhrania/porty&lt;/strong&gt;&lt;br /&gt; USB Type-C: Áno&lt;br /&gt; DisplayPort: Áno&lt;br /&gt; Thunderbolt: Áno&lt;br /&gt; DC-in: Áno&lt;br /&gt; USB 3.2 Gen 1: Áno&lt;br /&gt; HDMI: Áno&lt;br /&gt; 3.5 mm Combo Jack: Áno&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Software&lt;/strong&gt;&lt;br /&gt; Operačný systém: Windows 11 Home&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Výbava&lt;/strong&gt;&lt;br /&gt; Predná kamera: Áno&lt;br /&gt; Mikrofón: Áno&lt;br /&gt; Numerická klávesnica: Áno&lt;br /&gt; Podsvietená klávesnica: Áno&lt;br /&gt; Čítačka odtlačkov prstov: Áno&lt;br /&gt; Touchpad: Áno&lt;br /&gt; Čítačka pamäťových kariet: Nie&lt;br /&gt; Optická mechanika: Nie&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Informácie o batérii&lt;br /&gt; Počet článkov batérie: 3 články&lt;/strong&gt;&lt;br /&gt; Chemické zloženie batérie: Lithium-iontový (Li-Ion)&lt;br /&gt; Energia batérie: 50Wh&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Popis napájania&lt;/strong&gt;&lt;br /&gt; 3-pin 65 W AC adaptér, 243 g s 180 cm DC káblom&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Fyzické charakteristiky&lt;/strong&gt;&lt;br /&gt; Farba: Steel Gray&lt;br /&gt; Rozmery: 402,1 (W) x 256,5 (D) x 17,99 (H) mm&lt;br /&gt; Hmotnosť (približná): 2,09 kg&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt; &lt;/p&gt; &lt;p&gt;&lt;em&gt;Popis produktu bol preložený pomocou umelej inteligencie a môže obsahovať nepresnosti.&lt;/em&gt;&lt;/p&gt;",
    "seoTitle": "ACER NTB Aspire 17 (A17-51M-54L5),i5-120U,17,3\"FHD,16GB,1TB SSD,Intel Iris,W11H,Gray | Worlds.sk",
    "seoDescription": "Kúpiť ACER NTB Aspire 17 (A17-51M-54L5),i5-120U,17,3\"FHD,16GB,1TB SSD,Intel Iris,W11H,Gray (PartNumber: NX.J02EC.003) za výhodnú cenu 876.91 € s expresným doručením z centrálneho skladu na Worlds.sk.",
    "searchKeywords": [
      "acer",
      "nx.j02ec.003",
      "notebooky"
    ],
    "pricing": {
      "supplierCost": 652.46,
      "supplierFees": {
        "garbageFee": 0.42,
        "authorFee": 6.04
      },
      "totalCostWithFees": 652.46,
      "vatRate": 20,
      "marginPercentage": 12,
      "basePrice": 730.76,
      "finalPrice": 876.91,
      "currency": "EUR"
    },
    "stockCount": 11,
    "isInStock": true,
    "stockText": "Skladom > 11 ks",
    "warrantyMonths": 24,
    "attributes": {
      "brand": {
        "code": "brand",
        "name": "Výrobca",
        "value": "Acer",
        "rawValue": "Acer"
      },
      "mpn": {
        "code": "mpn",
        "name": "Part Number",
        "value": "NX.J02EC.003",
        "rawValue": "NX.J02EC.003"
      },
      "warranty": {
        "code": "warranty",
        "name": "Záruka",
        "value": "24 mesiacov",
        "rawValue": "24"
      }
    },
    "images": [
      {
        "id": "img-11294400",
        "url": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80",
        "position": 0,
        "isPrimary": true,
        "altText": "ACER NTB Aspire 17 (A17-51M-54L5),i5-120U,17,3\"FHD,16GB,1TB SSD,Intel Iris,W11H,Gray"
      }
    ],
    "status": "ACTIVE",
    "reviewStatus": "AUTO_APPROVED",
    "qualityScore": {
      "total": 90,
      "breakdown": {
        "hasEan": true,
        "hasBrand": true,
        "hasMpn": true,
        "hasValidCategory": true,
        "hasImages": true,
        "hasAttributes": true,
        "hasDescription": true,
        "hasSeoMetadata": true,
        "hasPrice": true,
        "hasStock": true
      }
    },
    "dataHash": "hash_11294400_652.46_11",
    "lastSyncedAt": "2026-09-01T15:48:11.557Z",
    "lastReprocessedAt": "2026-09-01T15:48:11.559Z",
    "createdAt": "2026-09-01T15:48:11.559Z",
    "updatedAt": "2026-09-01T15:48:11.559Z"
  },
  {
    "id": "ed-550505",
    "supplierCode": "550505",
    "sku": "550505",
    "mpn": "R7I-00009",
    "ean": "196388028818",
    "brand": "Microsoft",
    "categorySlug": "notebooky",
    "categoryHierarchy": [
      "Počítače a notebooky",
      "Notebooky"
    ],
    "title": "Microsoft Surface Laptop 5 13,5\" 256 GB (i5/16GB) Platinum W10 PRO",
    "slug": "microsoft-surface-laptop-5-13-5-256-gb-i5-16gb-platinum-w10-pro-550505",
    "shortDescription": "&lt;h2 class=\"text-primary cross-sell_group\"&gt;Microsoft Surface Laptop 5 13,5\" i5/16GB/256GB W10Pro platinový&lt;/h2&gt;\n&lt;p&gt;Microsoft Surface Laptop 5 predstavuje úplne nový inovatívny odraz najnovších vychytávok a technológií na trhu notebookov. Spojenie až o 70 % vylepšeného a celkovo zrýchleného výkonu v kombinácii s rýchlejším multitaskingom mu zaručuje výkon, ktorý vás ohromí. Pútavé hliníkové telo je nielen mimoriadne elegantné, ale taktiež poskytuje notebooku Microsoft Surface Laptop 5 jeho výnimočnú tenkosť a ľahkosť, ktorá sa prejavuje v jeho komfortnej ultra-prenosnosti. Pomocou 10-bodového viacdotykového displeja PixelSense bolo dosiahnuté, že práca s ním je intuitívnejšia, a vy sa tak stávate vo svojich úlohách úplne flexibilní. Celkovú funkcionalitu tohto úplne nového skvostu na poli notebookov dokresľuje famózna výdrž batérie, ktorá bola dosiahnutá bez kompromisov vo výkone.&lt;/p&gt;\n&lt;p&gt;&lt;strong&gt;Až o 70 % rýchlosti navyše.&lt;br&gt;&lt;/strong&gt;Za svoju jedinečnú rýchlosť vďačí Microsoft Surface Laptop 5 predovšetkým najmodernejším procesorom, výkonnému operačnému pamäti a veľkému SSD disku. Rýchlosť multitaskingu a celková plynulosť je zaručená extrémne výkonnými procesormi Intel Core 12. generácie. Až 32GB RAM a veľkosť úložiska vo forme SSD až do 1TB zabezpečí, že plnenie úloh a každodenné dosahovanie produktivity vo všetkých aplikáciách a programoch bude jednoduchšie ako kedykoľvek predtým.&lt;/p&gt;\n&lt;p&gt;&lt;strong&gt;17 hodín bez prerušenia.&lt;br&gt;&lt;/strong&gt;Už ste niekedy mohli pracovať alebo sa baviť 17 hodín v kuse? Ak nie, teraz máte túto možnosť. Ultimátna, až 17-hodinová výdrž batérie na jedno nabitie, sa stane oporným bodom chvíľ, ktoré sú určené len pre vás. Povedzte fixácii na zásuvky a nabíjačky nie. Microsoft Surface Laptop 5 láme bariéry dokonalej výkonnosti v spojení s maximálnou výdržou batérie a ide nekompromisne za titulom zariadenia, ktoré si zamilujete.&lt;/p&gt;\n&lt;p&gt;&lt;strong&gt;s HD ide HO lepšie.&lt;br&gt;&lt;/strong&gt;Práca z domu sa stáva neodmysliteľnou súčasťou našich životov. Aby ste mohli pracovať z domu rovnako produktívne ako z kancelárie, je Microsoft Surface Laptop 5 vybavený HD (720p) webkamerou, ktorá vašim videokonferenciám zabezpečí profesionálny obraz s dokonalým svetlom. Nemyslelo sa však len na kvalitu obrazu. K dispozícii budete mať aj intuitívne overovanie tváre pomocou Windows Hello, duálne štúdiové mikrofóny s výnimočným dosahom a výčet uzatvárajú omnisonické reproduktory s technológiou Dolby Atmos, ktoré každý zvuk premenia na audiovýsledok, ktorý trvá.&lt;/p&gt;\n&lt;p&gt;&lt;strong&gt;Javisko, ktoré si podmaní publikum.&lt;br&gt;&lt;/strong&gt;Displej predstavuje pohľad do digitálneho sveta, a zároveň predstavuje jeden z kľúčových faktorov pri výbere správneho zariadenia. Aby vás každý pohľad na obrazovku ohromil, je nový notebook Microsoft Surface Laptop 5 vybavený 10-bodovým viacdotykovým displejom PixelSense s pomerom strán 3:2 a 201 PPI. Minimálne rámiky, zobrazenie čisté ako krištáľ a maximálny dôraz na najjemnejšie detaily, to všetko len preto, aby každý pohľad stál za to.&lt;/p&gt;\n&lt;p&gt;&lt;strong&gt;Na každej sekunde záleží.&lt;br&gt;&lt;br&gt;&lt;/strong&gt;Vďaka okamžitému zapnutiu je možné vrátiť sa k práci za pár sekúnd. Keď notebook Microsoft Surface Laptop 5 zatvoríte, stačí otvoriť veko, prihlásiť sa pomocou intuitívneho overovania tváre prostredníctvom Windows Hello a ste tam, kde ste skončili pred prerušením.&lt;/p&gt;\n&lt;p&gt;&lt;strong&gt;Váš štýl. Vaša voľba.&lt;br&gt;&lt;/strong&gt;Microsoft Surface Laptop 5 je možné okamžite vybrať v 2 veľkostiach, pričom je k dispozícii v dvoch farbách – elegantnej čiernej a štýlovej platine. Rozhodnúť sa môžete aj pre prevedenie klávesnice. Microsoft Surface Laptop 5 si môžete zvoliť vo veľmi odolnej kovovej klávesnici s jemnými detailmi, alebo v nápaditej klávesnici z hrejivého materiálu Alcantara. Odteraz môžete pracovať štýlovo, jednoducho podľa seba.&lt;/p&gt;\n&lt;h2 class=\"text-primary cross-sell_group\"&gt;Špecifikácie&lt;/h2&gt;\n&lt;table class=\"table\"&gt;\n  &lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;Displej&lt;/th&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Veľkosť displeja&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;13,5\"&lt;/td&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Typ displeja&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;PixelSense&lt;/td&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Jemnosť displeja&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;201 PPI&lt;/td&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Povrch displeja&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Lesklý&lt;/td&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Maximálna obnovovacia frekvencia&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;60 Hz&lt;/td&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Pomer strán&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;3:2&lt;/td&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Dotykový displej&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Áno&lt;/td&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;Procesor&lt;/th&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Procesor&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Intel Core i5&lt;/td&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Modelové označenie procesora&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;1235U&lt;/td&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Generácia procesora&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;12. Generácia | Alder Lake&lt;/td&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;Fotoaparát&lt;/th&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Rozlíšenie Webkamery&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Full HD 1920x1080 p&lt;/td&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Webkamera&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Áno&lt;/td&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;Výkon&lt;/th&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Veľkosť RAM&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;16 GB&lt;/td&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Grafická karta&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Intel Iris Xe Graphics&lt;/td&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Typ pamäte RAM&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;DDR5&lt;/td&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;Úložisko&lt;/th&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Typ disku&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;SSD&lt;/td&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Kapacita úložiska&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;256 GB&lt;/td&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Slot pre pamäťové karty&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Nie&lt;/td&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;Batéria&lt;/th&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Výdrž batérie&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;17 h&lt;/td&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Kapacita batérie (Wh)&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;47,4 Wh&lt;/td&gt;&lt;/tr&gt;\n&lt;/table&gt;",
    "supplierDescription": "&lt;h2 class=\"text-primary cross-sell_group\"&gt;Microsoft Surface Laptop 5 13,5\" i5/16GB/256GB W10Pro platinový&lt;/h2&gt;\n&lt;p&gt;Microsoft Surface Laptop 5 predstavuje úplne nový inovatívny odraz najnovších vychytávok a technológií na trhu notebookov. Spojenie až o 70 % vylepšeného a celkovo zrýchleného výkonu v kombinácii s rýchlejším multitaskingom mu zaručuje výkon, ktorý vás ohromí. Pútavé hliníkové telo je nielen mimoriadne elegantné, ale taktiež poskytuje notebooku Microsoft Surface Laptop 5 jeho výnimočnú tenkosť a ľahkosť, ktorá sa prejavuje v jeho komfortnej ultra-prenosnosti. Pomocou 10-bodového viacdotykového displeja PixelSense bolo dosiahnuté, že práca s ním je intuitívnejšia, a vy sa tak stávate vo svojich úlohách úplne flexibilní. Celkovú funkcionalitu tohto úplne nového skvostu na poli notebookov dokresľuje famózna výdrž batérie, ktorá bola dosiahnutá bez kompromisov vo výkone.&lt;/p&gt;\n&lt;p&gt;&lt;strong&gt;Až o 70 % rýchlosti navyše.&lt;br&gt;&lt;/strong&gt;Za svoju jedinečnú rýchlosť vďačí Microsoft Surface Laptop 5 predovšetkým najmodernejším procesorom, výkonnému operačnému pamäti a veľkému SSD disku. Rýchlosť multitaskingu a celková plynulosť je zaručená extrémne výkonnými procesormi Intel Core 12. generácie. Až 32GB RAM a veľkosť úložiska vo forme SSD až do 1TB zabezpečí, že plnenie úloh a každodenné dosahovanie produktivity vo všetkých aplikáciách a programoch bude jednoduchšie ako kedykoľvek predtým.&lt;/p&gt;\n&lt;p&gt;&lt;strong&gt;17 hodín bez prerušenia.&lt;br&gt;&lt;/strong&gt;Už ste niekedy mohli pracovať alebo sa baviť 17 hodín v kuse? Ak nie, teraz máte túto možnosť. Ultimátna, až 17-hodinová výdrž batérie na jedno nabitie, sa stane oporným bodom chvíľ, ktoré sú určené len pre vás. Povedzte fixácii na zásuvky a nabíjačky nie. Microsoft Surface Laptop 5 láme bariéry dokonalej výkonnosti v spojení s maximálnou výdržou batérie a ide nekompromisne za titulom zariadenia, ktoré si zamilujete.&lt;/p&gt;\n&lt;p&gt;&lt;strong&gt;s HD ide HO lepšie.&lt;br&gt;&lt;/strong&gt;Práca z domu sa stáva neodmysliteľnou súčasťou našich životov. Aby ste mohli pracovať z domu rovnako produktívne ako z kancelárie, je Microsoft Surface Laptop 5 vybavený HD (720p) webkamerou, ktorá vašim videokonferenciám zabezpečí profesionálny obraz s dokonalým svetlom. Nemyslelo sa však len na kvalitu obrazu. K dispozícii budete mať aj intuitívne overovanie tváre pomocou Windows Hello, duálne štúdiové mikrofóny s výnimočným dosahom a výčet uzatvárajú omnisonické reproduktory s technológiou Dolby Atmos, ktoré každý zvuk premenia na audiovýsledok, ktorý trvá.&lt;/p&gt;\n&lt;p&gt;&lt;strong&gt;Javisko, ktoré si podmaní publikum.&lt;br&gt;&lt;/strong&gt;Displej predstavuje pohľad do digitálneho sveta, a zároveň predstavuje jeden z kľúčových faktorov pri výbere správneho zariadenia. Aby vás každý pohľad na obrazovku ohromil, je nový notebook Microsoft Surface Laptop 5 vybavený 10-bodovým viacdotykovým displejom PixelSense s pomerom strán 3:2 a 201 PPI. Minimálne rámiky, zobrazenie čisté ako krištáľ a maximálny dôraz na najjemnejšie detaily, to všetko len preto, aby každý pohľad stál za to.&lt;/p&gt;\n&lt;p&gt;&lt;strong&gt;Na každej sekunde záleží.&lt;br&gt;&lt;br&gt;&lt;/strong&gt;Vďaka okamžitému zapnutiu je možné vrátiť sa k práci za pár sekúnd. Keď notebook Microsoft Surface Laptop 5 zatvoríte, stačí otvoriť veko, prihlásiť sa pomocou intuitívneho overovania tváre prostredníctvom Windows Hello a ste tam, kde ste skončili pred prerušením.&lt;/p&gt;\n&lt;p&gt;&lt;strong&gt;Váš štýl. Vaša voľba.&lt;br&gt;&lt;/strong&gt;Microsoft Surface Laptop 5 je možné okamžite vybrať v 2 veľkostiach, pričom je k dispozícii v dvoch farbách – elegantnej čiernej a štýlovej platine. Rozhodnúť sa môžete aj pre prevedenie klávesnice. Microsoft Surface Laptop 5 si môžete zvoliť vo veľmi odolnej kovovej klávesnici s jemnými detailmi, alebo v nápaditej klávesnici z hrejivého materiálu Alcantara. Odteraz môžete pracovať štýlovo, jednoducho podľa seba.&lt;/p&gt;\n&lt;h2 class=\"text-primary cross-sell_group\"&gt;Špecifikácie&lt;/h2&gt;\n&lt;table class=\"table\"&gt;\n  &lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;Displej&lt;/th&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Veľkosť displeja&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;13,5\"&lt;/td&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Typ displeja&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;PixelSense&lt;/td&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Jemnosť displeja&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;201 PPI&lt;/td&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Povrch displeja&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Lesklý&lt;/td&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Maximálna obnovovacia frekvencia&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;60 Hz&lt;/td&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Pomer strán&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;3:2&lt;/td&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Dotykový displej&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Áno&lt;/td&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;Procesor&lt;/th&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Procesor&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Intel Core i5&lt;/td&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Modelové označenie procesora&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;1235U&lt;/td&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Generácia procesora&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;12. Generácia | Alder Lake&lt;/td&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;Fotoaparát&lt;/th&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Rozlíšenie Webkamery&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Full HD 1920x1080 p&lt;/td&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Webkamera&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Áno&lt;/td&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;Výkon&lt;/th&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Veľkosť RAM&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;16 GB&lt;/td&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Grafická karta&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Intel Iris Xe Graphics&lt;/td&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Typ pamäte RAM&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;DDR5&lt;/td&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;Úložisko&lt;/th&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Typ disku&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;SSD&lt;/td&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Kapacita úložiska&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;256 GB&lt;/td&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Slot pre pamäťové karty&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Nie&lt;/td&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;Batéria&lt;/th&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Výdrž batérie&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;17 h&lt;/td&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Kapacita batérie (Wh)&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;47,4 Wh&lt;/td&gt;&lt;/tr&gt;\n&lt;/table&gt;",
    "seoTitle": "Microsoft Surface Laptop 5 13,5\" 256 GB (i5/16GB) Platinum W10 PRO | Worlds.sk",
    "seoDescription": "Kúpiť Microsoft Surface Laptop 5 13,5\" 256 GB (i5/16GB) Platinum W10 PRO (PartNumber: R7I-00009) za výhodnú cenu 1368.46 € s expresným doručením z centrálneho skladu na Worlds.sk.",
    "searchKeywords": [
      "microsoft",
      "r7i-00009",
      "notebooky"
    ],
    "pricing": {
      "supplierCost": 1018.2,
      "supplierFees": {
        "garbageFee": 0.12,
        "authorFee": 0
      },
      "totalCostWithFees": 1018.2,
      "vatRate": 20,
      "marginPercentage": 12,
      "basePrice": 1140.38,
      "finalPrice": 1368.46,
      "currency": "EUR"
    },
    "stockCount": 2,
    "isInStock": true,
    "stockText": "Skladom > 2 ks",
    "warrantyMonths": 24,
    "attributes": {
      "brand": {
        "code": "brand",
        "name": "Výrobca",
        "value": "Microsoft",
        "rawValue": "Microsoft"
      },
      "mpn": {
        "code": "mpn",
        "name": "Part Number",
        "value": "R7I-00009",
        "rawValue": "R7I-00009"
      },
      "warranty": {
        "code": "warranty",
        "name": "Záruka",
        "value": "24 mesiacov",
        "rawValue": "24"
      }
    },
    "images": [
      {
        "id": "img-550505",
        "url": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80",
        "position": 0,
        "isPrimary": true,
        "altText": "Microsoft Surface Laptop 5 13,5\" 256 GB (i5/16GB) Platinum W10 PRO"
      }
    ],
    "status": "ACTIVE",
    "reviewStatus": "AUTO_APPROVED",
    "qualityScore": {
      "total": 90,
      "breakdown": {
        "hasEan": true,
        "hasBrand": true,
        "hasMpn": true,
        "hasValidCategory": true,
        "hasImages": true,
        "hasAttributes": true,
        "hasDescription": true,
        "hasSeoMetadata": true,
        "hasPrice": true,
        "hasStock": true
      }
    },
    "dataHash": "hash_550505_1018.2_2",
    "lastSyncedAt": "2026-09-01T15:48:11.559Z",
    "lastReprocessedAt": "2026-09-01T15:48:11.559Z",
    "createdAt": "2026-09-01T15:48:11.559Z",
    "updatedAt": "2026-09-01T15:48:11.559Z"
  },
  {
    "id": "ed-11294540",
    "supplierCode": "11294540",
    "sku": "11294540",
    "mpn": "NX.J3UEC.001",
    "ean": "4711474276025",
    "brand": "Acer",
    "categorySlug": "notebooky",
    "categoryHierarchy": [
      "Počítače a notebooky",
      "Notebooky"
    ],
    "title": "ACER NTB Aspire Go Spin 14 (AGSP14-31PT-C2S7),N150,14\"WUXGA,8GB,512GB SSD,Intel Graphics,W11H,Silver",
    "slug": "acer-ntb-aspire-go-spin-14-agsp14-31pt-c2s7-n150-14-wuxga-8gb-512gb-ssd-intel-graphics-w11h-silver-11294540",
    "shortDescription": "&lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;ACER NTB Aspire Go Spin 14 (AGSP14-31PT-C2S7)&lt;/strong&gt;&lt;br /&gt;&lt;strong&gt; PN: NX.J3UEC.001&lt;/strong&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Procesor&lt;/strong&gt;&lt;br /&gt; Výrobca procesora: Intel&lt;br /&gt; Model procesora: processor N150&lt;br /&gt; Rýchlosť procesora: 3,6 GHz&lt;br /&gt; Počet jadier: 4&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Zobrazenie a grafika&lt;/strong&gt;&lt;br /&gt; Grafická karta: Intel Graphics&lt;br /&gt; Veľkosť obrazovky: 14\"&lt;br /&gt; Technológia obrazovky displeja: IPS&lt;br /&gt; Typ displeja: Lesklý&lt;br /&gt; Dotykový displej: Áno&lt;br /&gt; Režim obrazovky: WUXGA&lt;br /&gt; Rozlíšenie obrazovky: 1920 x 1200&lt;br /&gt; Pomer strán: 16:10&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Pamäť&lt;/strong&gt;&lt;br /&gt; Štandardná pamäť: 8 GB&lt;br /&gt; Technológia pamäte: LPDDR5&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Úložisko&lt;/strong&gt;&lt;br /&gt; Celková kapacita disku SSD: 512 GB&lt;br /&gt; Typ SSD: PCIe Gen3 NVMe SSD PM4&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Siete a komunikácia&lt;/strong&gt;&lt;br /&gt; Wifi 6 802.11AX: Áno&lt;br /&gt; Bluetooth 5.1: Áno&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Rozhranie/porty&lt;/strong&gt;&lt;br /&gt; 2x USB Type-C port&lt;br /&gt; 2x USB 3.2 Gen 1 port&lt;br /&gt; 1x HDMI port&lt;br /&gt; 3,5mm Jack port&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Softvér&lt;/strong&gt;&lt;br /&gt; Operačný systém: Windows 11 Home&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Výbava&lt;/strong&gt;&lt;br /&gt; Kamera s 2Mic.: Áno&lt;br /&gt; Numerická klávesnica: Áno&lt;br /&gt; Čítačka odtlačkov prstov: Nie&lt;br /&gt; Čítačka pamäťových kariet: Nie&lt;br /&gt; Optická mechanika: Nie&lt;br /&gt; Podsvietenie klávesnice: Nie&lt;br /&gt; Touchpad: Áno&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Informácie o batérii&lt;/strong&gt;&lt;br /&gt; Počet článkov: 3-článkov&lt;br /&gt; Chemické zloženie batérie: Lithium-iontová (Li-Ion)&lt;br /&gt; Energia batérie: 53Wh&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Popis napájania&lt;/strong&gt;&lt;br /&gt; 65W USB Type-C AC Adaptér PCR50%_TCO9.0&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Fyzické charakteristiky&lt;/strong&gt;&lt;br /&gt; Farba: Pure Silver&lt;br /&gt; Rozmery: 319,8 (W) x 227,9 (D) x 22,3 (V) mm&lt;br /&gt; Hmotnosť (približná): 1,54 kg&lt;/p&gt; &lt;p&gt;&lt;em&gt;Popis produktu bol preložený pomocou umelej inteligencie a môže obsahovať nepresnosti.&lt;/em&gt;&lt;/p&gt;",
    "supplierDescription": "&lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;ACER NTB Aspire Go Spin 14 (AGSP14-31PT-C2S7)&lt;/strong&gt;&lt;br /&gt;&lt;strong&gt; PN: NX.J3UEC.001&lt;/strong&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Procesor&lt;/strong&gt;&lt;br /&gt; Výrobca procesora: Intel&lt;br /&gt; Model procesora: processor N150&lt;br /&gt; Rýchlosť procesora: 3,6 GHz&lt;br /&gt; Počet jadier: 4&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Zobrazenie a grafika&lt;/strong&gt;&lt;br /&gt; Grafická karta: Intel Graphics&lt;br /&gt; Veľkosť obrazovky: 14\"&lt;br /&gt; Technológia obrazovky displeja: IPS&lt;br /&gt; Typ displeja: Lesklý&lt;br /&gt; Dotykový displej: Áno&lt;br /&gt; Režim obrazovky: WUXGA&lt;br /&gt; Rozlíšenie obrazovky: 1920 x 1200&lt;br /&gt; Pomer strán: 16:10&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Pamäť&lt;/strong&gt;&lt;br /&gt; Štandardná pamäť: 8 GB&lt;br /&gt; Technológia pamäte: LPDDR5&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Úložisko&lt;/strong&gt;&lt;br /&gt; Celková kapacita disku SSD: 512 GB&lt;br /&gt; Typ SSD: PCIe Gen3 NVMe SSD PM4&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Siete a komunikácia&lt;/strong&gt;&lt;br /&gt; Wifi 6 802.11AX: Áno&lt;br /&gt; Bluetooth 5.1: Áno&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Rozhranie/porty&lt;/strong&gt;&lt;br /&gt; 2x USB Type-C port&lt;br /&gt; 2x USB 3.2 Gen 1 port&lt;br /&gt; 1x HDMI port&lt;br /&gt; 3,5mm Jack port&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Softvér&lt;/strong&gt;&lt;br /&gt; Operačný systém: Windows 11 Home&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Výbava&lt;/strong&gt;&lt;br /&gt; Kamera s 2Mic.: Áno&lt;br /&gt; Numerická klávesnica: Áno&lt;br /&gt; Čítačka odtlačkov prstov: Nie&lt;br /&gt; Čítačka pamäťových kariet: Nie&lt;br /&gt; Optická mechanika: Nie&lt;br /&gt; Podsvietenie klávesnice: Nie&lt;br /&gt; Touchpad: Áno&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Informácie o batérii&lt;/strong&gt;&lt;br /&gt; Počet článkov: 3-článkov&lt;br /&gt; Chemické zloženie batérie: Lithium-iontová (Li-Ion)&lt;br /&gt; Energia batérie: 53Wh&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Popis napájania&lt;/strong&gt;&lt;br /&gt; 65W USB Type-C AC Adaptér PCR50%_TCO9.0&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Fyzické charakteristiky&lt;/strong&gt;&lt;br /&gt; Farba: Pure Silver&lt;br /&gt; Rozmery: 319,8 (W) x 227,9 (D) x 22,3 (V) mm&lt;br /&gt; Hmotnosť (približná): 1,54 kg&lt;/p&gt; &lt;p&gt;&lt;em&gt;Popis produktu bol preložený pomocou umelej inteligencie a môže obsahovať nepresnosti.&lt;/em&gt;&lt;/p&gt;",
    "seoTitle": "ACER NTB Aspire Go Spin 14 (AGSP14-31PT-C2S7),N150,14\"WUXGA,8GB,512GB SSD,Intel Graphics,W11H,Silver | Worlds.sk",
    "seoDescription": "Kúpiť ACER NTB Aspire Go Spin 14 (AGSP14-31PT-C2S7),N150,14\"WUXGA,8GB,512GB SSD,Intel Graphics,W11H,Silver (PartNumber: NX.J3UEC.001) za výhodnú cenu 639.02 € s expresným doručením z centrálneho skladu na Worlds.sk.",
    "searchKeywords": [
      "acer",
      "nx.j3uec.001",
      "notebooky"
    ],
    "pricing": {
      "supplierCost": 475.46,
      "supplierFees": {
        "garbageFee": 0.42,
        "authorFee": 6.04
      },
      "totalCostWithFees": 475.46,
      "vatRate": 20,
      "marginPercentage": 12,
      "basePrice": 532.52,
      "finalPrice": 639.02,
      "currency": "EUR"
    },
    "stockCount": 50,
    "isInStock": true,
    "stockText": "Skladom > 50 ks",
    "warrantyMonths": 24,
    "attributes": {
      "brand": {
        "code": "brand",
        "name": "Výrobca",
        "value": "Acer",
        "rawValue": "Acer"
      },
      "mpn": {
        "code": "mpn",
        "name": "Part Number",
        "value": "NX.J3UEC.001",
        "rawValue": "NX.J3UEC.001"
      },
      "warranty": {
        "code": "warranty",
        "name": "Záruka",
        "value": "24 mesiacov",
        "rawValue": "24"
      }
    },
    "images": [
      {
        "id": "img-11294540",
        "url": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80",
        "position": 0,
        "isPrimary": true,
        "altText": "ACER NTB Aspire Go Spin 14 (AGSP14-31PT-C2S7),N150,14\"WUXGA,8GB,512GB SSD,Intel Graphics,W11H,Silver"
      }
    ],
    "status": "ACTIVE",
    "reviewStatus": "AUTO_APPROVED",
    "qualityScore": {
      "total": 90,
      "breakdown": {
        "hasEan": true,
        "hasBrand": true,
        "hasMpn": true,
        "hasValidCategory": true,
        "hasImages": true,
        "hasAttributes": true,
        "hasDescription": true,
        "hasSeoMetadata": true,
        "hasPrice": true,
        "hasStock": true
      }
    },
    "dataHash": "hash_11294540_475.46_50",
    "lastSyncedAt": "2026-09-01T15:48:11.559Z",
    "lastReprocessedAt": "2026-09-01T15:48:11.559Z",
    "createdAt": "2026-09-01T15:48:11.559Z",
    "updatedAt": "2026-09-01T15:48:11.559Z"
  },
  {
    "id": "ed-11294592",
    "supplierCode": "11294592",
    "sku": "11294592",
    "mpn": "NX.J46EC.002",
    "ean": "4711474275851",
    "brand": "Acer",
    "categorySlug": "notebooky",
    "categoryHierarchy": [
      "Počítače a notebooky",
      "Notebooky"
    ],
    "title": "ACER NTB Aspire Go 15 (AG15-32P-C3L4),N150,15.6\"FHD,16GB,512GB SSD,Intel Graphics,W11H,Silver",
    "slug": "acer-ntb-aspire-go-15-ag15-32p-c3l4-n150-15-6-fhd-16gb-512gb-ssd-intel-graphics-w11h-silver-11294592",
    "shortDescription": "&lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;ACER NTB Aspire Go 15 (AG15-32P-C3L4)&lt;/strong&gt;&lt;br /&gt;&lt;strong&gt; Číslo dielu: NX.J46EC.002&lt;/strong&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Procesor&lt;/strong&gt;&lt;br /&gt; Výrobca procesora: Intel&lt;br /&gt; Model procesora: processor N150&lt;br /&gt; Rýchlosť procesora: 3,6 GHz&lt;br /&gt; Počet jadier: 4&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Zobrazenie a grafika&lt;/strong&gt;&lt;br /&gt; Veľkosť obrazovky: 15,6\"&lt;br /&gt; Typ obrazovky: Anti-Glare&lt;br /&gt; Režim obrazovky: FHD&lt;br /&gt; Technológia podsvietenia: TN&lt;br /&gt; Rozlíšenie obrazovky: 1920x1080&lt;br /&gt; Pomer strán: 16:9&lt;br /&gt; Dotykový displej: Nie&lt;br /&gt; Grafická karta: Intel Graphics&lt;br /&gt; Svietivosť: 300nits&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Pamäť&lt;/strong&gt;&lt;br /&gt; Štandardná pamäť: 16 GB&lt;br /&gt; Technológia pamäte: DDR5&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Úložisko&lt;/strong&gt;&lt;br /&gt; Celková kapacita disku SSD: 512 GB&lt;br /&gt; Typ SSD: PCIe Gen3 NVMe SSD PM4&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Sťah a komunikácia&lt;/strong&gt;&lt;br /&gt; Bluetooth verzia v5.1: Áno&lt;br /&gt; Wifi 6 802.11AX: Áno&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Rozhranie/porty&lt;/strong&gt;&lt;br /&gt; 2x USB Type-C port&lt;br /&gt; 2x USB 3.2 Gen 1 port&lt;br /&gt; 1x HDMI port&lt;br /&gt; 3,5mm Jack port&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Softvér&lt;/strong&gt;&lt;br /&gt; Operačný systém: Windows 11 Home&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Vybavenie&lt;/strong&gt;&lt;br /&gt; USB HD TNR kamera: Áno&lt;br /&gt; Numerická klávesnica: Áno&lt;br /&gt; Čítačka odtlačkov prstov: Nie&lt;br /&gt; Čítačka pamäťových kariet: Nie&lt;br /&gt; Optická mechanika: Nie&lt;br /&gt; Podsvietenie klávesnice: Nie&lt;br /&gt; Touchpad: Áno&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Informácie o batérii&lt;/strong&gt;&lt;br /&gt; Počet článkov: 3-články&lt;br /&gt; Chemické zloženie batérie: Lithium-iontový (Li-Ion)&lt;br /&gt; Energia batérie: 53Wh&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Popis napájania&lt;/strong&gt;&lt;br /&gt; 65W USB Type-C AC Adaptér PCR50%_TCO9.0&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Fyzické charakteristiky&lt;/strong&gt;&lt;br /&gt; Farba: Pure Silver&lt;br /&gt; Rozmery (ŠxVxH): 362,9 x 18,9 x 239,69 mm&lt;br /&gt; Hmotnosť (približne): 1,75 kg&lt;/p&gt; &lt;p&gt;&lt;em&gt;Popis produktu bol preložený pomocou umelej inteligencie a môže obsahovať nepresnosti.&lt;/em&gt;&lt;/p&gt;",
    "supplierDescription": "&lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;ACER NTB Aspire Go 15 (AG15-32P-C3L4)&lt;/strong&gt;&lt;br /&gt;&lt;strong&gt; Číslo dielu: NX.J46EC.002&lt;/strong&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Procesor&lt;/strong&gt;&lt;br /&gt; Výrobca procesora: Intel&lt;br /&gt; Model procesora: processor N150&lt;br /&gt; Rýchlosť procesora: 3,6 GHz&lt;br /&gt; Počet jadier: 4&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Zobrazenie a grafika&lt;/strong&gt;&lt;br /&gt; Veľkosť obrazovky: 15,6\"&lt;br /&gt; Typ obrazovky: Anti-Glare&lt;br /&gt; Režim obrazovky: FHD&lt;br /&gt; Technológia podsvietenia: TN&lt;br /&gt; Rozlíšenie obrazovky: 1920x1080&lt;br /&gt; Pomer strán: 16:9&lt;br /&gt; Dotykový displej: Nie&lt;br /&gt; Grafická karta: Intel Graphics&lt;br /&gt; Svietivosť: 300nits&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Pamäť&lt;/strong&gt;&lt;br /&gt; Štandardná pamäť: 16 GB&lt;br /&gt; Technológia pamäte: DDR5&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Úložisko&lt;/strong&gt;&lt;br /&gt; Celková kapacita disku SSD: 512 GB&lt;br /&gt; Typ SSD: PCIe Gen3 NVMe SSD PM4&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Sťah a komunikácia&lt;/strong&gt;&lt;br /&gt; Bluetooth verzia v5.1: Áno&lt;br /&gt; Wifi 6 802.11AX: Áno&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Rozhranie/porty&lt;/strong&gt;&lt;br /&gt; 2x USB Type-C port&lt;br /&gt; 2x USB 3.2 Gen 1 port&lt;br /&gt; 1x HDMI port&lt;br /&gt; 3,5mm Jack port&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Softvér&lt;/strong&gt;&lt;br /&gt; Operačný systém: Windows 11 Home&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Vybavenie&lt;/strong&gt;&lt;br /&gt; USB HD TNR kamera: Áno&lt;br /&gt; Numerická klávesnica: Áno&lt;br /&gt; Čítačka odtlačkov prstov: Nie&lt;br /&gt; Čítačka pamäťových kariet: Nie&lt;br /&gt; Optická mechanika: Nie&lt;br /&gt; Podsvietenie klávesnice: Nie&lt;br /&gt; Touchpad: Áno&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Informácie o batérii&lt;/strong&gt;&lt;br /&gt; Počet článkov: 3-články&lt;br /&gt; Chemické zloženie batérie: Lithium-iontový (Li-Ion)&lt;br /&gt; Energia batérie: 53Wh&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Popis napájania&lt;/strong&gt;&lt;br /&gt; 65W USB Type-C AC Adaptér PCR50%_TCO9.0&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Fyzické charakteristiky&lt;/strong&gt;&lt;br /&gt; Farba: Pure Silver&lt;br /&gt; Rozmery (ŠxVxH): 362,9 x 18,9 x 239,69 mm&lt;br /&gt; Hmotnosť (približne): 1,75 kg&lt;/p&gt; &lt;p&gt;&lt;em&gt;Popis produktu bol preložený pomocou umelej inteligencie a môže obsahovať nepresnosti.&lt;/em&gt;&lt;/p&gt;",
    "seoTitle": "ACER NTB Aspire Go 15 (AG15-32P-C3L4),N150,15.6\"FHD,16GB,512GB SSD,Intel Graphics,W11H,Silver | Worlds.sk",
    "seoDescription": "Kúpiť ACER NTB Aspire Go 15 (AG15-32P-C3L4),N150,15.6\"FHD,16GB,512GB SSD,Intel Graphics,W11H,Silver (PartNumber: NX.J46EC.002) za výhodnú cenu 639.02 € s expresným doručením z centrálneho skladu na Worlds.sk.",
    "searchKeywords": [
      "acer",
      "nx.j46ec.002",
      "notebooky"
    ],
    "pricing": {
      "supplierCost": 475.46,
      "supplierFees": {
        "garbageFee": 0.42,
        "authorFee": 6.04
      },
      "totalCostWithFees": 475.46,
      "vatRate": 20,
      "marginPercentage": 12,
      "basePrice": 532.52,
      "finalPrice": 639.02,
      "currency": "EUR"
    },
    "stockCount": 51,
    "isInStock": true,
    "stockText": "Skladom > 51 ks",
    "warrantyMonths": 24,
    "attributes": {
      "brand": {
        "code": "brand",
        "name": "Výrobca",
        "value": "Acer",
        "rawValue": "Acer"
      },
      "mpn": {
        "code": "mpn",
        "name": "Part Number",
        "value": "NX.J46EC.002",
        "rawValue": "NX.J46EC.002"
      },
      "warranty": {
        "code": "warranty",
        "name": "Záruka",
        "value": "24 mesiacov",
        "rawValue": "24"
      }
    },
    "images": [
      {
        "id": "img-11294592",
        "url": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=80",
        "position": 0,
        "isPrimary": true,
        "altText": "ACER NTB Aspire Go 15 (AG15-32P-C3L4),N150,15.6\"FHD,16GB,512GB SSD,Intel Graphics,W11H,Silver"
      }
    ],
    "status": "ACTIVE",
    "reviewStatus": "AUTO_APPROVED",
    "qualityScore": {
      "total": 90,
      "breakdown": {
        "hasEan": true,
        "hasBrand": true,
        "hasMpn": true,
        "hasValidCategory": true,
        "hasImages": true,
        "hasAttributes": true,
        "hasDescription": true,
        "hasSeoMetadata": true,
        "hasPrice": true,
        "hasStock": true
      }
    },
    "dataHash": "hash_11294592_475.46_51",
    "lastSyncedAt": "2026-09-01T15:48:11.559Z",
    "lastReprocessedAt": "2026-09-01T15:48:11.559Z",
    "createdAt": "2026-09-01T15:48:11.559Z",
    "updatedAt": "2026-09-01T15:48:11.559Z"
  },
  {
    "id": "ed-1651091",
    "supplierCode": "1651091",
    "sku": "1651091",
    "mpn": "83K100DGCK",
    "ean": "198156990815",
    "brand": "Lenovo",
    "categorySlug": "notebooky",
    "categoryHierarchy": [
      "Počítače a notebooky",
      "Notebooky"
    ],
    "title": "LENOVO NTB IdeaPad Slim 3 15IRH10 - i5-13420H,15.3\" WUXGA IPS,16GB,512SSD,HDMI,Int. Intel UHD,W11H,2Y CC",
    "slug": "lenovo-ntb-ideapad-slim-3-15irh10-i5-13420h-15-3-wuxga-ips-16gb-512ssd-hdmi-int-intel-uhd-w11h-2y-cc-1651091",
    "shortDescription": "&lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Produkt: Lenovo IdeaPad Slim 3 15IRH10&lt;/strong&gt;&lt;br /&gt; &lt;strong&gt;Part Number: 83K100DGCK&lt;br /&gt;&lt;/strong&gt;&lt;/p&gt;\n&lt;table id=\"lenovo\"&gt;\n&lt;tbody&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;VÝKON&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Procesor&lt;/td&gt;\n&lt;td&gt;Intel Core™ i5-13420H, 8C (4P + 4E) / 12T, P-core 2.1 / 4.6GHz, E-core 1.5 / 3.4GHz, 12MB&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Grafická Karta&lt;/td&gt;\n&lt;td&gt;Integrated Intel UHD Graphics&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Chipset&lt;/td&gt;\n&lt;td&gt;Intel SoC Platform&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pameť&lt;/td&gt;\n&lt;td&gt;8GB Soldered DDR5-4800 + 8GB SO-DIMM DDR5-4800&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pameťové sloty&lt;/td&gt;\n&lt;td&gt;One memory soldered to systemboard, one DDR5 SO-DIMM slot, dual-channel capable&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Max. Pameť&lt;/td&gt;\n&lt;td&gt;Up to 24GB (8GB soldered + 16GB SO-DIMM) DDR5-4800 offering&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Úložisko&lt;/td&gt;\n&lt;td&gt;512GB SSD M.2 2242 PCIe 4.0x4 NVMe&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Podporované Úložisko&lt;/td&gt;\n&lt;td&gt;Up to two drives, 2x M.2 SSD &lt;br /&gt;• M.2 2242 SSD up to 1TB&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Čitačka Kariet&lt;/td&gt;\n&lt;td&gt;SD Card Reader&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Optická Mechanika&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Audio Chip&lt;/td&gt;\n&lt;td&gt;High Definition (HD) Audio&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Reproduktory&lt;/td&gt;\n&lt;td&gt;Stereo speakers, 2W x2, optimized with Dolby Audio™&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Kamera&lt;/td&gt;\n&lt;td&gt;HD 720p with Privacy Shutter&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Mikrofon&lt;/td&gt;\n&lt;td&gt;2x, Array&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Bateria&lt;/td&gt;\n&lt;td&gt;Integrated 60Wh&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Max. výdrž na baterii&lt;/td&gt;\n&lt;td&gt;-&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Napájací Adaptér&lt;/td&gt;\n&lt;td&gt;65W Round Tip (3-pin)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;DESIGN&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Displej&lt;/td&gt;\n&lt;td&gt;15.3\" WUXGA (1920x1200) IPS 300nits Anti-glare, 45% NTSC, 60Hz&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Dotyková obrazovka&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pero&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Klávesnica&lt;/td&gt;\n&lt;td&gt;Backlit, Czech / Slovak&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Farba&lt;/td&gt;\n&lt;td&gt;Luna Grey&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Materiál&lt;/td&gt;\n&lt;td&gt;Aluminium (Top), PC-ABS (Bottom)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Rozmery (ŠxHxV)&lt;/td&gt;\n&lt;td&gt;343.4 x 239.5 x 16.9-17.9 mm (13.52 x 9.51 x 0.67-0.70 inches)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Hmotnost&lt;/td&gt;\n&lt;td&gt;Starting at 1.63 kg&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;SOFTWARE&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Operačný systém&lt;/td&gt;\n&lt;td&gt;Windows 11 Home, Czech / Slovak / English&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Dodávaný software&lt;/td&gt;\n&lt;td&gt;Office Trial&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;KONEKTIVITA&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Ethernet&lt;/td&gt;\n&lt;td&gt;-&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;WLAN + Bluetooth&lt;/td&gt;\n&lt;td&gt;Wi-Fi 6, 802.11ax 2x2 + BT5.2&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Standartné porty&lt;/td&gt;\n&lt;td&gt;2x USB-A (USB 5Gbps / USB 3.2 Gen 1)&lt;br /&gt;1x USB-C (USB 5Gbps / USB 3.2 Gen 1), with USB PD 3.0 and DisplayPort™ 1.2&lt;br /&gt;1x HDMI 1.4&lt;br /&gt;1x Headphone / microphone combo jack (3.5mm)&lt;br /&gt;1x SD card reader&lt;br /&gt;1x Power connector&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;ZABEZPEČENÍ A SOUKROMÍ&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Čitačka otlačkov prstov&lt;/td&gt;\n&lt;td&gt;-&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;SERVIS&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Základná záruka&lt;/td&gt;\n&lt;td&gt;2-year, Courier or Carry-in&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Zahrnutý Upgrade&lt;/td&gt;\n&lt;td&gt;-&lt;/td&gt;\n&lt;/tr&gt;\n&lt;/tbody&gt;\n&lt;/table&gt;\n&lt;p&gt; &lt;/p&gt;",
    "supplierDescription": "&lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Produkt: Lenovo IdeaPad Slim 3 15IRH10&lt;/strong&gt;&lt;br /&gt; &lt;strong&gt;Part Number: 83K100DGCK&lt;br /&gt;&lt;/strong&gt;&lt;/p&gt;\n&lt;table id=\"lenovo\"&gt;\n&lt;tbody&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;VÝKON&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Procesor&lt;/td&gt;\n&lt;td&gt;Intel Core™ i5-13420H, 8C (4P + 4E) / 12T, P-core 2.1 / 4.6GHz, E-core 1.5 / 3.4GHz, 12MB&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Grafická Karta&lt;/td&gt;\n&lt;td&gt;Integrated Intel UHD Graphics&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Chipset&lt;/td&gt;\n&lt;td&gt;Intel SoC Platform&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pameť&lt;/td&gt;\n&lt;td&gt;8GB Soldered DDR5-4800 + 8GB SO-DIMM DDR5-4800&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pameťové sloty&lt;/td&gt;\n&lt;td&gt;One memory soldered to systemboard, one DDR5 SO-DIMM slot, dual-channel capable&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Max. Pameť&lt;/td&gt;\n&lt;td&gt;Up to 24GB (8GB soldered + 16GB SO-DIMM) DDR5-4800 offering&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Úložisko&lt;/td&gt;\n&lt;td&gt;512GB SSD M.2 2242 PCIe 4.0x4 NVMe&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Podporované Úložisko&lt;/td&gt;\n&lt;td&gt;Up to two drives, 2x M.2 SSD &lt;br /&gt;• M.2 2242 SSD up to 1TB&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Čitačka Kariet&lt;/td&gt;\n&lt;td&gt;SD Card Reader&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Optická Mechanika&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Audio Chip&lt;/td&gt;\n&lt;td&gt;High Definition (HD) Audio&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Reproduktory&lt;/td&gt;\n&lt;td&gt;Stereo speakers, 2W x2, optimized with Dolby Audio™&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Kamera&lt;/td&gt;\n&lt;td&gt;HD 720p with Privacy Shutter&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Mikrofon&lt;/td&gt;\n&lt;td&gt;2x, Array&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Bateria&lt;/td&gt;\n&lt;td&gt;Integrated 60Wh&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Max. výdrž na baterii&lt;/td&gt;\n&lt;td&gt;-&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Napájací Adaptér&lt;/td&gt;\n&lt;td&gt;65W Round Tip (3-pin)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;DESIGN&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Displej&lt;/td&gt;\n&lt;td&gt;15.3\" WUXGA (1920x1200) IPS 300nits Anti-glare, 45% NTSC, 60Hz&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Dotyková obrazovka&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pero&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Klávesnica&lt;/td&gt;\n&lt;td&gt;Backlit, Czech / Slovak&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Farba&lt;/td&gt;\n&lt;td&gt;Luna Grey&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Materiál&lt;/td&gt;\n&lt;td&gt;Aluminium (Top), PC-ABS (Bottom)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Rozmery (ŠxHxV)&lt;/td&gt;\n&lt;td&gt;343.4 x 239.5 x 16.9-17.9 mm (13.52 x 9.51 x 0.67-0.70 inches)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Hmotnost&lt;/td&gt;\n&lt;td&gt;Starting at 1.63 kg&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;SOFTWARE&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Operačný systém&lt;/td&gt;\n&lt;td&gt;Windows 11 Home, Czech / Slovak / English&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Dodávaný software&lt;/td&gt;\n&lt;td&gt;Office Trial&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;KONEKTIVITA&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Ethernet&lt;/td&gt;\n&lt;td&gt;-&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;WLAN + Bluetooth&lt;/td&gt;\n&lt;td&gt;Wi-Fi 6, 802.11ax 2x2 + BT5.2&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Standartné porty&lt;/td&gt;\n&lt;td&gt;2x USB-A (USB 5Gbps / USB 3.2 Gen 1)&lt;br /&gt;1x USB-C (USB 5Gbps / USB 3.2 Gen 1), with USB PD 3.0 and DisplayPort™ 1.2&lt;br /&gt;1x HDMI 1.4&lt;br /&gt;1x Headphone / microphone combo jack (3.5mm)&lt;br /&gt;1x SD card reader&lt;br /&gt;1x Power connector&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;ZABEZPEČENÍ A SOUKROMÍ&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Čitačka otlačkov prstov&lt;/td&gt;\n&lt;td&gt;-&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;SERVIS&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Základná záruka&lt;/td&gt;\n&lt;td&gt;2-year, Courier or Carry-in&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Zahrnutý Upgrade&lt;/td&gt;\n&lt;td&gt;-&lt;/td&gt;\n&lt;/tr&gt;\n&lt;/tbody&gt;\n&lt;/table&gt;\n&lt;p&gt; &lt;/p&gt;",
    "seoTitle": "LENOVO NTB IdeaPad Slim 3 15IRH10 - i5-13420H,15.3\" WUXGA IPS,16GB,512SSD,HDMI,Int. Intel UHD,W11H,2Y CC | Worlds.sk",
    "seoDescription": "Kúpiť LENOVO NTB IdeaPad Slim 3 15IRH10 - i5-13420H,15.3\" WUXGA IPS,16GB,512SSD,HDMI,Int. Intel UHD,W11H,2Y CC (PartNumber: 83K100DGCK) za výhodnú cenu 804.82 € s expresným doručením z centrálneho skladu na Worlds.sk.",
    "searchKeywords": [
      "lenovo",
      "83k100dgck",
      "notebooky"
    ],
    "pricing": {
      "supplierCost": 598.82,
      "supplierFees": {
        "garbageFee": 0.42,
        "authorFee": 6.04
      },
      "totalCostWithFees": 598.82,
      "vatRate": 20,
      "marginPercentage": 12,
      "basePrice": 670.68,
      "finalPrice": 804.82,
      "currency": "EUR"
    },
    "stockCount": 43,
    "isInStock": true,
    "stockText": "Skladom > 43 ks",
    "warrantyMonths": 24,
    "attributes": {
      "brand": {
        "code": "brand",
        "name": "Výrobca",
        "value": "Lenovo",
        "rawValue": "Lenovo"
      },
      "mpn": {
        "code": "mpn",
        "name": "Part Number",
        "value": "83K100DGCK",
        "rawValue": "83K100DGCK"
      },
      "warranty": {
        "code": "warranty",
        "name": "Záruka",
        "value": "24 mesiacov",
        "rawValue": "24"
      }
    },
    "images": [
      {
        "id": "img-1651091",
        "url": "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80",
        "position": 0,
        "isPrimary": true,
        "altText": "LENOVO NTB IdeaPad Slim 3 15IRH10 - i5-13420H,15.3\" WUXGA IPS,16GB,512SSD,HDMI,Int. Intel UHD,W11H,2Y CC"
      }
    ],
    "status": "ACTIVE",
    "reviewStatus": "AUTO_APPROVED",
    "qualityScore": {
      "total": 90,
      "breakdown": {
        "hasEan": true,
        "hasBrand": true,
        "hasMpn": true,
        "hasValidCategory": true,
        "hasImages": true,
        "hasAttributes": true,
        "hasDescription": true,
        "hasSeoMetadata": true,
        "hasPrice": true,
        "hasStock": true
      }
    },
    "dataHash": "hash_1651091_598.82_43",
    "lastSyncedAt": "2026-09-01T15:48:11.559Z",
    "lastReprocessedAt": "2026-09-01T15:48:11.559Z",
    "createdAt": "2026-09-01T15:48:11.559Z",
    "updatedAt": "2026-09-01T15:48:11.559Z"
  },
  {
    "id": "ed-11294673",
    "supplierCode": "11294673",
    "sku": "11294673",
    "mpn": "NX.J46EC.003",
    "ean": "4711474275868",
    "brand": "Acer",
    "categorySlug": "notebooky",
    "categoryHierarchy": [
      "Počítače a notebooky",
      "Notebooky"
    ],
    "title": "ACER NTB Aspire Go 15 (AG15-32P-3249),iCore 3 N355,15.6\"FHD,16GB,512GB SSD,Intel Graphics,W11H,Silver",
    "slug": "acer-ntb-aspire-go-15-ag15-32p-3249-icore-3-n355-15-6-fhd-16gb-512gb-ssd-intel-graphics-w11h-silver-11294673",
    "shortDescription": "&lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;ACER NTB Aspire Go 15 (AG15-32P-3249)&lt;/strong&gt;&lt;br /&gt;&lt;strong&gt; PN: NX.J46EC.003&lt;/strong&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Procesor&lt;/strong&gt;&lt;br /&gt; Výrobca procesora: Intel&lt;br /&gt; Model procesora: Core 3 N355&lt;br /&gt; Rýchlosť procesora: 3,9 GHz&lt;br /&gt; Počet jadier: 8&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Zobrazenie a grafika&lt;/strong&gt;&lt;br /&gt; Grafická karta: Intel Graphics&lt;br /&gt; Veľkosť obrazovky: 15,6\"&lt;br /&gt; Technológia displeja obrazovky: IPS&lt;br /&gt; Dotykový displej: Nie&lt;br /&gt; Svietivosť: 300nits&lt;br /&gt; Typ displeja: Matný&lt;br /&gt; Režim obrazovky: FHD&lt;br /&gt; Rozlíšenie obrazovky: 1920 x 1080&lt;br /&gt; Pomer strán: 16:9&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Pamäť&lt;/strong&gt;&lt;br /&gt; Štandardná pamäť: 16 GB&lt;br /&gt; Technológia pamäti: DDR5&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Úložisko&lt;/strong&gt;&lt;br /&gt; Celková kapacita disku: 512 GB&lt;br /&gt; Typ disku: PCIe NVMe SSD PM4&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Sieť a komunikácia&lt;/strong&gt;&lt;br /&gt; Wifi 6 802.11AX: Áno&lt;br /&gt; Bluetooth 5.1: Áno&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Softvér&lt;/strong&gt;&lt;br /&gt; Operačný systém: Windows 11 Home&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Rozhranie/porty&lt;/strong&gt;&lt;br /&gt; 2x USB Type-C port &lt;br /&gt; 2x USB 3.2 Gen 1 port&lt;br /&gt; 1x HDMI 2.1&lt;br /&gt; 3,5mm Jack port&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Výbava&lt;/strong&gt;&lt;br /&gt; Webkamera: Áno&lt;br /&gt; Numerická klávesnica: Áno&lt;br /&gt; Čítačka odtlačkov prstov: Nie&lt;br /&gt; Čítačka pamäťových kariet: Nie&lt;br /&gt; Optická mechanika: Nie&lt;br /&gt; Podsvietenie klávesnice: Nie&lt;br /&gt; Touchpad: Áno&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Informácie o batérii&lt;/strong&gt;&lt;br /&gt; Počet článkov: 3-články&lt;br /&gt; Chemické zloženie batérie: Lithium-iontový (Li-Ion)&lt;br /&gt; Energia batérie: 53Wh&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Popis napájania&lt;/strong&gt;&lt;br /&gt; 65W USB Type-C AC adaptér PCR50% TCO9.0&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Fyzické charakteristiky&lt;/strong&gt;&lt;br /&gt; Farba: Pure Silver&lt;br /&gt; Rozmery: 362,9 (W) x 241,26 (D) x 19,9 (H) mm&lt;br /&gt; Hmotnosť (približná): 1,78 kg&lt;/p&gt; &lt;p&gt;&lt;em&gt;Popis produktu bol preložený pomocou umelej inteligencie a môže obsahovať nepresnosti.&lt;/em&gt;&lt;/p&gt;",
    "supplierDescription": "&lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;ACER NTB Aspire Go 15 (AG15-32P-3249)&lt;/strong&gt;&lt;br /&gt;&lt;strong&gt; PN: NX.J46EC.003&lt;/strong&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Procesor&lt;/strong&gt;&lt;br /&gt; Výrobca procesora: Intel&lt;br /&gt; Model procesora: Core 3 N355&lt;br /&gt; Rýchlosť procesora: 3,9 GHz&lt;br /&gt; Počet jadier: 8&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Zobrazenie a grafika&lt;/strong&gt;&lt;br /&gt; Grafická karta: Intel Graphics&lt;br /&gt; Veľkosť obrazovky: 15,6\"&lt;br /&gt; Technológia displeja obrazovky: IPS&lt;br /&gt; Dotykový displej: Nie&lt;br /&gt; Svietivosť: 300nits&lt;br /&gt; Typ displeja: Matný&lt;br /&gt; Režim obrazovky: FHD&lt;br /&gt; Rozlíšenie obrazovky: 1920 x 1080&lt;br /&gt; Pomer strán: 16:9&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Pamäť&lt;/strong&gt;&lt;br /&gt; Štandardná pamäť: 16 GB&lt;br /&gt; Technológia pamäti: DDR5&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Úložisko&lt;/strong&gt;&lt;br /&gt; Celková kapacita disku: 512 GB&lt;br /&gt; Typ disku: PCIe NVMe SSD PM4&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Sieť a komunikácia&lt;/strong&gt;&lt;br /&gt; Wifi 6 802.11AX: Áno&lt;br /&gt; Bluetooth 5.1: Áno&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Softvér&lt;/strong&gt;&lt;br /&gt; Operačný systém: Windows 11 Home&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Rozhranie/porty&lt;/strong&gt;&lt;br /&gt; 2x USB Type-C port &lt;br /&gt; 2x USB 3.2 Gen 1 port&lt;br /&gt; 1x HDMI 2.1&lt;br /&gt; 3,5mm Jack port&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Výbava&lt;/strong&gt;&lt;br /&gt; Webkamera: Áno&lt;br /&gt; Numerická klávesnica: Áno&lt;br /&gt; Čítačka odtlačkov prstov: Nie&lt;br /&gt; Čítačka pamäťových kariet: Nie&lt;br /&gt; Optická mechanika: Nie&lt;br /&gt; Podsvietenie klávesnice: Nie&lt;br /&gt; Touchpad: Áno&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Informácie o batérii&lt;/strong&gt;&lt;br /&gt; Počet článkov: 3-články&lt;br /&gt; Chemické zloženie batérie: Lithium-iontový (Li-Ion)&lt;br /&gt; Energia batérie: 53Wh&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Popis napájania&lt;/strong&gt;&lt;br /&gt; 65W USB Type-C AC adaptér PCR50% TCO9.0&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Fyzické charakteristiky&lt;/strong&gt;&lt;br /&gt; Farba: Pure Silver&lt;br /&gt; Rozmery: 362,9 (W) x 241,26 (D) x 19,9 (H) mm&lt;br /&gt; Hmotnosť (približná): 1,78 kg&lt;/p&gt; &lt;p&gt;&lt;em&gt;Popis produktu bol preložený pomocou umelej inteligencie a môže obsahovať nepresnosti.&lt;/em&gt;&lt;/p&gt;",
    "seoTitle": "ACER NTB Aspire Go 15 (AG15-32P-3249),iCore 3 N355,15.6\"FHD,16GB,512GB SSD,Intel Graphics,W11H,Silver | Worlds.sk",
    "seoDescription": "Kúpiť ACER NTB Aspire Go 15 (AG15-32P-3249),iCore 3 N355,15.6\"FHD,16GB,512GB SSD,Intel Graphics,W11H,Silver (PartNumber: NX.J46EC.003) za výhodnú cenu 680.69 € s expresným doručením z centrálneho skladu na Worlds.sk.",
    "searchKeywords": [
      "acer",
      "nx.j46ec.003",
      "notebooky"
    ],
    "pricing": {
      "supplierCost": 506.46,
      "supplierFees": {
        "garbageFee": 0.42,
        "authorFee": 6.04
      },
      "totalCostWithFees": 506.46,
      "vatRate": 20,
      "marginPercentage": 12,
      "basePrice": 567.24,
      "finalPrice": 680.69,
      "currency": "EUR"
    },
    "stockCount": 24,
    "isInStock": true,
    "stockText": "Skladom > 24 ks",
    "warrantyMonths": 24,
    "attributes": {
      "brand": {
        "code": "brand",
        "name": "Výrobca",
        "value": "Acer",
        "rawValue": "Acer"
      },
      "mpn": {
        "code": "mpn",
        "name": "Part Number",
        "value": "NX.J46EC.003",
        "rawValue": "NX.J46EC.003"
      },
      "warranty": {
        "code": "warranty",
        "name": "Záruka",
        "value": "24 mesiacov",
        "rawValue": "24"
      }
    },
    "images": [
      {
        "id": "img-11294673",
        "url": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80",
        "position": 0,
        "isPrimary": true,
        "altText": "ACER NTB Aspire Go 15 (AG15-32P-3249),iCore 3 N355,15.6\"FHD,16GB,512GB SSD,Intel Graphics,W11H,Silver"
      }
    ],
    "status": "ACTIVE",
    "reviewStatus": "AUTO_APPROVED",
    "qualityScore": {
      "total": 90,
      "breakdown": {
        "hasEan": true,
        "hasBrand": true,
        "hasMpn": true,
        "hasValidCategory": true,
        "hasImages": true,
        "hasAttributes": true,
        "hasDescription": true,
        "hasSeoMetadata": true,
        "hasPrice": true,
        "hasStock": true
      }
    },
    "dataHash": "hash_11294673_506.46_24",
    "lastSyncedAt": "2026-09-01T15:48:11.559Z",
    "lastReprocessedAt": "2026-09-01T15:48:11.559Z",
    "createdAt": "2026-09-01T15:48:11.559Z",
    "updatedAt": "2026-09-01T15:48:11.559Z"
  },
  {
    "id": "ed-11294685",
    "supplierCode": "11294685",
    "sku": "11294685",
    "mpn": "GP.BAG11.003",
    "ean": "4710180537857",
    "brand": "Acer",
    "categorySlug": "herne-notebooky",
    "categoryHierarchy": [
      "Počítače a notebooky",
      "Notebooky",
      "Herné notebooky"
    ],
    "title": "ACER Predator Streetstyle Luggage 20\", black, kufr, TSA kombinační zámek, přední otevírání, kapsa na notebooky tablet",
    "slug": "acer-predator-streetstyle-luggage-20-black-kufr-tsa-kombina-n-z-mek-p-edn-otev-r-n-kapsa-na-notebooky-tablet-11294685",
    "shortDescription": "&lt;p&gt;&lt;strong&gt;Predator Streetstyle Luggage 20\", čierna&lt;/strong&gt;&lt;/p&gt; &lt;p&gt;TSA kombinačný zámok, predné otváranie, priehradka na notebooky a tablety, 4 dvojité otočné kolieska, 54 x 36 x 25 cm, 3,5 kg&lt;/p&gt; &lt;p&gt;&lt;strong&gt;Parametre:&lt;/strong&gt;&lt;/p&gt; &lt;p&gt;Design Street style / Robustný&lt;br /&gt;Rozmery 20 palcov (54 x 36 x 25 cm)&lt;br /&gt;Hmotnosť 3,5 kg&lt;br /&gt;Farba: Čierna&lt;br /&gt;Vlastnosti&lt;br /&gt;• TSA kombinačný zámok&lt;br /&gt;• Priestor na notebook a tablet&lt;br /&gt;• Tichá dvojradová kolieska&lt;br /&gt;• Dizajn s predným otváraním&lt;br /&gt;• Štruktúra 1:9 pre pohodlnejšie&lt;br /&gt;balenie a skladovanie&lt;/p&gt; &lt;p&gt;&lt;em&gt;Popis produktu bol preložený pomocou umelej inteligencie a môže obsahovať nepresnosti.&lt;/em&gt;&lt;/p&gt;",
    "supplierDescription": "&lt;p&gt;&lt;strong&gt;Predator Streetstyle Luggage 20\", čierna&lt;/strong&gt;&lt;/p&gt; &lt;p&gt;TSA kombinačný zámok, predné otváranie, priehradka na notebooky a tablety, 4 dvojité otočné kolieska, 54 x 36 x 25 cm, 3,5 kg&lt;/p&gt; &lt;p&gt;&lt;strong&gt;Parametre:&lt;/strong&gt;&lt;/p&gt; &lt;p&gt;Design Street style / Robustný&lt;br /&gt;Rozmery 20 palcov (54 x 36 x 25 cm)&lt;br /&gt;Hmotnosť 3,5 kg&lt;br /&gt;Farba: Čierna&lt;br /&gt;Vlastnosti&lt;br /&gt;• TSA kombinačný zámok&lt;br /&gt;• Priestor na notebook a tablet&lt;br /&gt;• Tichá dvojradová kolieska&lt;br /&gt;• Dizajn s predným otváraním&lt;br /&gt;• Štruktúra 1:9 pre pohodlnejšie&lt;br /&gt;balenie a skladovanie&lt;/p&gt; &lt;p&gt;&lt;em&gt;Popis produktu bol preložený pomocou umelej inteligencie a môže obsahovať nepresnosti.&lt;/em&gt;&lt;/p&gt;",
    "seoTitle": "ACER Predator Streetstyle Luggage 20\", black, kufr, TSA kombinační zámek, přední otevírání, kapsa na notebooky tablet | Worlds.sk",
    "seoDescription": "Kúpiť ACER Predator Streetstyle Luggage 20\", black, kufr, TSA kombinační zámek, přední otevírání, kapsa na notebooky tablet (PartNumber: GP.BAG11.003) za výhodnú cenu 241.92 € s expresným doručením z centrálneho skladu na Worlds.sk.",
    "searchKeywords": [
      "acer",
      "gp.bag11.003",
      "herne-notebooky"
    ],
    "pricing": {
      "supplierCost": 180,
      "supplierFees": {
        "garbageFee": 0,
        "authorFee": 0
      },
      "totalCostWithFees": 180,
      "vatRate": 20,
      "marginPercentage": 12,
      "basePrice": 201.6,
      "finalPrice": 241.92,
      "currency": "EUR"
    },
    "stockCount": 2,
    "isInStock": true,
    "stockText": "Skladom > 2 ks",
    "warrantyMonths": 24,
    "attributes": {
      "brand": {
        "code": "brand",
        "name": "Výrobca",
        "value": "Acer",
        "rawValue": "Acer"
      },
      "mpn": {
        "code": "mpn",
        "name": "Part Number",
        "value": "GP.BAG11.003",
        "rawValue": "GP.BAG11.003"
      },
      "warranty": {
        "code": "warranty",
        "name": "Záruka",
        "value": "24 mesiacov",
        "rawValue": "24"
      }
    },
    "images": [
      {
        "id": "img-11294685",
        "url": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80",
        "position": 0,
        "isPrimary": true,
        "altText": "ACER Predator Streetstyle Luggage 20\", black, kufr, TSA kombinační zámek, přední otevírání, kapsa na notebooky tablet"
      }
    ],
    "status": "ACTIVE",
    "reviewStatus": "AUTO_APPROVED",
    "qualityScore": {
      "total": 90,
      "breakdown": {
        "hasEan": true,
        "hasBrand": true,
        "hasMpn": true,
        "hasValidCategory": true,
        "hasImages": true,
        "hasAttributes": true,
        "hasDescription": true,
        "hasSeoMetadata": true,
        "hasPrice": true,
        "hasStock": true
      }
    },
    "dataHash": "hash_11294685_180_2",
    "lastSyncedAt": "2026-09-01T15:48:11.559Z",
    "lastReprocessedAt": "2026-09-01T15:48:11.559Z",
    "createdAt": "2026-09-01T15:48:11.559Z",
    "updatedAt": "2026-09-01T15:48:11.559Z"
  },
  {
    "id": "ed-1519425",
    "supplierCode": "1519425",
    "sku": "1519425",
    "mpn": "B9ZU6ET#BCM",
    "ean": "198990891224",
    "brand": "HP",
    "categorySlug": "firemne-notebooky",
    "categoryHierarchy": [
      "Počítače a notebooky",
      "Notebooky",
      "Firemné a pracovné notebooky"
    ],
    "title": "HP NTB EliteBook Ultra G1i U5-226V 40TOPS 14\"2.8K 2880x1800 OLED 400 120Hz IR,16GB,512GB TLC,64WHr,Win11Pro,EVO, 3y onst",
    "slug": "hp-ntb-elitebook-ultra-g1i-u5-226v-40tops-14-2-8k-2880x1800-oled-400-120hz-ir-16gb-512gb-tlc-64whr-win11pro-evo-3y-onst-1519425",
    "shortDescription": "&lt;h2 class=\"text-primary cross-sell_group\"&gt;14\" notebook HP EliteBook Ultra G1i Next Gen AI&lt;/h2&gt;&lt;div class=\"tpl-product-detail-desc\"&gt;&lt;div class=\"box-in\"&gt;&lt;div class=\"row\"&gt;&lt;p&gt;Notebooky HP Elite poskytujú výkonné, mimoriadne bezpečné a spravovateľné riešenia pre náročné pracovné postupy. Tento rad nádherne navrhnutých firemných produktov si môžete ľahko nosiť so sebou.&lt;/p&gt;&lt;/div&gt;&lt;div class=\"row\"&gt;&lt;figure class=\"box-img\"&gt;&lt;img src=\"https://c.edsystem.cz/IMGCACHE/_1752/1752493_0d_3.jpg\" alt=\"Right facing\"&gt;&lt;/figure&gt;&lt;div class=\"desc\"&gt;&lt;h2&gt;Spoločnosť HP odporúča systém Windows 11 Pro&lt;/h2&gt;&lt;p&gt;Zhrňte a prepíšte obsah, získajte relevantné odporúčania a zachovajte si prehľad pomocou funkcie Microsoft Copilot. [10]&lt;/p&gt;&lt;/div&gt;&lt;/div&gt;&lt;div class=\"row\"&gt;&lt;figure class=\"box-img\"&gt;&lt;img src=\"https://c.edsystem.cz/IMGCACHE/_1752/1752493_0g_3.jpg\" alt=\"Left facing\"&gt;&lt;/figure&gt;&lt;div class=\"desc\"&gt;&lt;h2&gt;Spoločnosť Intel poháňa počítače novej generácie s umelou inteligenciou&lt;/h2&gt;&lt;p&gt;Uvoľnite svoj čas a sústreďte sa na to, na čom záleží, s najnovším procesorom Intel Core Ultra™ s podporou 48 tops. [2,3]&lt;/p&gt;&lt;/div&gt;&lt;/div&gt;&lt;div class=\"row\"&gt;&lt;figure class=\"box-img\"&gt;&lt;img src=\"https://c.edsystem.cz/IMGCACHE/_1752/1752493_0a_3.jpg\" alt=\"Center facing\"&gt;&lt;/figure&gt;&lt;div class=\"desc\"&gt;&lt;h2&gt;Pomoc využívajúca umelú inteligenciu&lt;/h2&gt;&lt;p&gt;Odomknite nové možnosti a eliminujte rutinné úlohy s počítačom HP EliteBook Ultra G1i Next Gen AI.[ 6]&lt;/p&gt;&lt;/div&gt;&lt;/div&gt;&lt;div class=\"row\"&gt;&lt;div class=\"desc\"&gt;&lt;h2&gt;Elegantný dizajn&lt;/h2&gt;&lt;p&gt;Ovládnite miestnosť s počítačom, z ktorého vyžaruje sofistikovanosť.&lt;/p&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;h2 class=\"text-primary cross-sell_group\"&gt;Parametre&lt;/h2&gt; &lt;div class=\"wrap-overflow-table\"&gt;&lt;div class=\"wrap-overflow-table_in\"&gt;&lt;table class=\"table\"&gt;&lt;tbody&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;Funkcie systému&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Operačný systém&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Windows 11 Pro&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Skupina procesora&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Procesor Intel Core™ Ultra 5&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Procesor&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Procesor Intel Core™ Ultra 5 226V (max. 4,5 GHz s technológiou Intel Turbo Boost, vyrovnávacia pamäť L3 8 MB, 8 jadier, 8 vlákien)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Špecifikácie trvalej udržateľnosti&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Nízky obsah halogenidov; Výplň z lisovanej papierovej drviny je recyklovateľná a 100 % z nej pochádza z trvalo udržateľných zdrojov; Vonkajšia škatuľa a lepenkové výplne sú recyklovateľné a 100 % z nich pochádza z trvalo udržateľných zdrojov; Puzdrá reproduktorov obsahujú plasty, ktoré by inak skončili v oceáne; 90 % recyklovaného kovu&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Pamäť&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;16 GB pamäte LPDDR5x-8533 MT/s (na doske) Rýchlosť prenosu dát až 8 533 MT/s.&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Popis pevného disku&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;512 GB jednotka PCIe Gen4 NVMe™ TLC SSD&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Obrazovka&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;14\" diagonal 2.8K display&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Obrazovka&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;14\" diagonal, 2.8K (2880 x 1800), OLED, IPS, BrightView, 400 nits, 100% DCI-P3 Displej OLED IPS BrightView s uhlopriečkou 35,6 cm (14\"), jasom 400 nitov, 100 % pokrytím škály DCI-P3 a rozlíšením 2,8K (2880 x 1800) [9,10,11,12]&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Grafická karta (integrovaná)&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Grafika Intel Arc™&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Grafika&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Integrovaná Grafika Intel Arc™&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Fotoaparát&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Infračervená 9 Mpx kamera AI s dočasnou redukciou šumu a dvomi digitálnymi mikrofónmi&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Klávesnica&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Modrá podsvietená klávesnica plnej veľkosti so zariadením HP Imagepad&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Polohovacie zariadenie&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Haptický trackpad s podporou viacprstových gest&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Webová kamera&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;9 MP IR AI camera with temporal noise reduction and integrated dual array digital microphones&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Zvuk&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Zvuk od Poly Studio, štyri stereofónne reproduktory, dva mikrofóny s redukciou šumu pomocou umelej inteligencie&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Polohovacie zariadenie&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Haptický trackpad s podporou viacprstových gest&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Bezdrôtová&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Bezdrôtová karta Intel Wi-Fi 7 BE201 (2 x 2) a Bluetooth 5.4&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Minimálne rozmery (š x h x v)&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;31,37 x 21,72 x 0,9 cm (predná strana); 31,37 x 21,72 x 1,21 cm (zadná strana)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Rozmery (Š x H x V) poznámka&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Predná výška sa meria blízko predného okraja, kde sa začína zužovanie spodného krytu šasi. Zadná výška sa meria blízko zadného okraja, kde sa končí zužovanie spodného krytu šasi.&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Hmotnosť&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Od 1,19 kg&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Poznámky k hmotnosti (metrické)&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Hmotnosť sa líši v závislosti od konfigurácie. Nezahŕňa napájací adaptér.&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Typ batérie&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;6-článková lítium-iónová polymérová batéria HP s dlhou výdržou, 64 Wh&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Štítky ekologickej bezpečnosti&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Certifikácia TCO&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Napájanie&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;65 W adaptér USB Type-C&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Záruka&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;1-ročná (1/1/0) obmedzená záruka pokrýva náklady na diely a prácu počas 1 roka. Nevzťahuje sa na opravu na mieste. Zmluvné podmienky sa v jednotlivých krajinách líšia. Platia určité obmedzenia a výnimky.&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Vrátane služby podpory&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;3-r. podpora HP pre NB na mieste. Zmluvné podmienky nájdete na stránke https://h20195.www2.hp.com/v2/GetPDF.aspx/4AA8-2300SKE &amp; https://www8.hp.com/h20195/v2/getpdf.aspx/4AA5-7123SKE.pdf&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Farba produktu&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Modrá&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;/div&gt;&lt;/div&gt; &lt;h2 class=\"text-primary cross-sell_group\"&gt;Poznámky&lt;/h2&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[1] Niektoré funkcie nemusia byť k dispozícii vo všetkých vydaniach alebo verziách systému Windows. Na využívanie všetkých funkcií systému Windows môžu systémy vyžadovať inovovaný alebo samostatne zakúpený hardvér, ovládače, softvér alebo aktualizáciu systému BIOS. Aktualizácia systému Windows 11 prebieha automaticky a je vždy povolená. Vyžaduje sa vysokorýchlostný internet a konto Microsoft. Poskytovateľ internetových služieb si môže účtovať poplatky a na aktualizácie sa časom môžu vzťahovať ďalšie požiadavky. Pozri http://www.windows.com.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[2] Viacjadrová architektúra pomáha zvýšiť výkon niektorých softvérových produktov. Prínos tejto technológie nemusia využiť všetci používatelia ani všetky softvérové aplikácie. Výkon a taktovacia frekvencia závisia od záťažového profilu konkrétnej aplikácie, ako aj hardvérovej a softvérovej konfigurácie. Číselné označenie, značka alebo názov produktu spoločnosti Intel neoznačuje mieru výkonnosti.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[3] Funkcie a softvér, ktoré vyžadujú aktualizáciu NPU, môžu vyžadovať nákup, predplatné alebo sprístupnenie softvéru poskytovateľom softvéru alebo platformy a softvér tretích strán môže mať špecifické požiadavky na konfiguráciu alebo kompatibilitu. Výkon sa líši v závislosti od používania, konfigurácie a ďalších faktorov.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[6] Aplikácia HP AI Companion je na vybraných počítačoch HP AI novej generácie predinštalovaná alebo k dispozícii na stiahnutie z obchodu Microsoft Store. Vyžaduje počítač HP AI novej generácie s jednotkou NPU so 40 – 60 tops a s min. 16 GB úložiskom a vyžaduje systém Windows 11. Výkon vyžaduje konto nastavené do 30 dní od spustenia alebo registrácie počítača prostredníctvom aplikácie HP AI Companion. Niektoré funkcie vyžadujú, aby zákazník nahral lokálne údaje. Každá z desiatich (10) knižníc má limit 100 MB, podporované súbory sa môžu líšiť a pri spustení zahŕňajú súbory PDF, .txt., .docx. Na používanie s umelou inteligenciou v zariadení vyžaduje počítač HP Next Gen AI 32 GB pamäte RAM a až 4,5 GB ukladacieho priestoru v počítači. Režim \"V zariadení\" používa stiahnutý LLM Phi 3.5 na lokálne spracovanie otázok a nevyžaduje pripojenie na internet. Režim \"Cloud\" používa GPT-4o na spracovanie otázok online a vyžaduje pripojenie k internetu. Spotlight a hlasové funkcie sú funkcie aplikácie HP AI Companion. Očakávaná dostupnosť na jar 2025. Dostupnosť sa líši v závislosti od regiónu.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[10] Môže sa vyžadovať stiahnutie služby Windows Update alebo aplikácie z obchodu Microsoft Store. Microsoft Copilot NIE JE k dispozícii v Číne, Rusku, Bielorusku a regiónoch, na ktoré je uvalené embargo - Kuba, Irán, Severná Kórea a Krym.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt; &lt;h2 class=\"text-primary cross-sell_group\"&gt;Právne upozornenie&lt;/h2&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[4] Niektoré funkcie nemusia byť k dispozícii vo všetkých vydaniach alebo verziách systému Windows. Na využívanie všetkých funkcií systému Windows môžu systémy vyžadovať inovovaný alebo samostatne zakúpený hardvér, ovládače, softvér alebo aktualizáciu systému BIOS. Aktualizácia systému Windows 11 prebieha automaticky a je vždy povolená. Poskytovateľ internetových služieb si môže účtovať poplatky a na aktualizácie sa časom môžu vzťahovať ďalšie požiadavky. Viď http://www.windows.com. Microsoft Copilot vyžaduje systém Windows 11. Niektoré funkcie vyžadujú jednotku NPU. Načasovanie a dostupnosť budú závisieť od spoločnosti Microsoft a líšia sa v závislosti od trhu a zariadenia. Vyžaduje sa konto Microsoft na prihlásenie. Ak funkcia Copilot nie je k dispozícii, kláves Copilot smeruje do vyhľadávacieho nástroja Bing. Viď http://aka.ms/WindowsAIFeatures.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[5] Viacjadrová architektúra pomáha zvýšiť výkon niektorých softvérových produktov. Prínos tejto technológie nemusia nevyhnutne pocítiť všetci zákazníci ani všetky softvérové aplikácie. Výkon a taktovacia frekvencia sa líšia v závislosti od záťažového profilu konkrétnej aplikácie, ako aj hardvérovej a softvérovej konfigurácie. Číselné označenie, značka alebo názov produktu spoločnosti Intel neoznačuje mieru výkonnosti. Funkcie a softvér, ktoré vyžadujú aktualizáciu NPU, môžu vyžadovať nákup, predplatné alebo povolenie softvéru poskytovateľom softvéru alebo platformy a softvér tretích strán môže mať špecifické požiadavky na konfiguráciu alebo kompatibilitu. Výkon sa líši v závislosti od používania, konfigurácie a ďalších faktorov. Riešenia nezávislých dodávateľov softvéru sa predávajú samostatne a môžu vyžadovať predplatné a jednotku NPU.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[7] Vyžaduje sa bezdrôtový prístupový bod a služba pripojenia na internet (predávajú sa samostatne). Dostupnosť verejných bezdrôtových prístupových bodov je obmedzená. Funkcia Wi-Fi 7 (802.11BE) vyžaduje kompatibilný operačný systém Windows 11, kompatibilný procesor a samostatne zakúpený smerovač Wi-Fi 7 na podporu spätnej kompatibility s predchádzajúcimi špecifikáciami 802.11. Je k dispozícii v krajinách, v ktorých je podporovaný štandard Wi-Fi 7. Parametre štandardu 802.11BE sú len orientačné a nie sú konečné. Ak sa budú konečné parametre odlišovať od orientačných parametrov, môže to ovplyvniť schopnosť zariadenia komunikovať s inými zariadeniami pomocou štandardu 802.11BE. Pripojenie Wi-Fi s podporou gigabitových rýchlostí prenosu údajov možno dosiahnuť v sieti Wi-Fi 7 (802.11BE) pri prenose súborov medzi dvoma zariadeniami pripojenými k rovnakému smerovaču.?Vyžaduje sa samostatne predávaný bezdrôtový smerovač podporujúci kanály 160 MHz.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[8] HP Sure Click vyžaduje systém Windows 10 alebo novší. Viď https://bit.ly/2PrLT6A_SureClick.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[9] HP Sure Sense je k dispozícii vo vybraných počítačoch HP s operačným systémom Windows 10 Pro, Windows 10 Enterprise, Windows 11 Pro alebo Windows 11 Enterprise.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[11] Riešenie HP Sure Start Gen7 je k dispozícii vo vybraných počítačoch HP a vyžaduje systém Windows 10 Pro alebo novší.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[12] Aplikácia HP AI Companion je predinštalovaná vo vybraných počítačoch HP Gen AI alebo je k dispozícii na stiahnutie z obchodu Microsoft Store. Vyžaduje počítač HP Next Gen AI PC s jednotkou NPU podporujúcou 40 – 60 TOPS a vyžaduje systém Windows 11. Výkon vyžaduje konto nastavené do 30 dní od spustenia alebo registrácie počítača prostredníctvom aplikácie HP AI Companion. Niektoré funkcie vyžadujú, aby zákazník nahral lokálne údaje. Päť (5) knižníc s limitom 100 MB, podporované súbory sa môžu líšiť a pri spustení zahŕňajú súbory .pdf, .txt a .docx.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[13] Dostupnosť softvéru Poly je naplánovaná na leto 2024. Vyžaduje sa operačný systém Windows.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;",
    "supplierDescription": "&lt;h2 class=\"text-primary cross-sell_group\"&gt;14\" notebook HP EliteBook Ultra G1i Next Gen AI&lt;/h2&gt;&lt;div class=\"tpl-product-detail-desc\"&gt;&lt;div class=\"box-in\"&gt;&lt;div class=\"row\"&gt;&lt;p&gt;Notebooky HP Elite poskytujú výkonné, mimoriadne bezpečné a spravovateľné riešenia pre náročné pracovné postupy. Tento rad nádherne navrhnutých firemných produktov si môžete ľahko nosiť so sebou.&lt;/p&gt;&lt;/div&gt;&lt;div class=\"row\"&gt;&lt;figure class=\"box-img\"&gt;&lt;img src=\"https://c.edsystem.cz/IMGCACHE/_1752/1752493_0d_3.jpg\" alt=\"Right facing\"&gt;&lt;/figure&gt;&lt;div class=\"desc\"&gt;&lt;h2&gt;Spoločnosť HP odporúča systém Windows 11 Pro&lt;/h2&gt;&lt;p&gt;Zhrňte a prepíšte obsah, získajte relevantné odporúčania a zachovajte si prehľad pomocou funkcie Microsoft Copilot. [10]&lt;/p&gt;&lt;/div&gt;&lt;/div&gt;&lt;div class=\"row\"&gt;&lt;figure class=\"box-img\"&gt;&lt;img src=\"https://c.edsystem.cz/IMGCACHE/_1752/1752493_0g_3.jpg\" alt=\"Left facing\"&gt;&lt;/figure&gt;&lt;div class=\"desc\"&gt;&lt;h2&gt;Spoločnosť Intel poháňa počítače novej generácie s umelou inteligenciou&lt;/h2&gt;&lt;p&gt;Uvoľnite svoj čas a sústreďte sa na to, na čom záleží, s najnovším procesorom Intel Core Ultra™ s podporou 48 tops. [2,3]&lt;/p&gt;&lt;/div&gt;&lt;/div&gt;&lt;div class=\"row\"&gt;&lt;figure class=\"box-img\"&gt;&lt;img src=\"https://c.edsystem.cz/IMGCACHE/_1752/1752493_0a_3.jpg\" alt=\"Center facing\"&gt;&lt;/figure&gt;&lt;div class=\"desc\"&gt;&lt;h2&gt;Pomoc využívajúca umelú inteligenciu&lt;/h2&gt;&lt;p&gt;Odomknite nové možnosti a eliminujte rutinné úlohy s počítačom HP EliteBook Ultra G1i Next Gen AI.[ 6]&lt;/p&gt;&lt;/div&gt;&lt;/div&gt;&lt;div class=\"row\"&gt;&lt;div class=\"desc\"&gt;&lt;h2&gt;Elegantný dizajn&lt;/h2&gt;&lt;p&gt;Ovládnite miestnosť s počítačom, z ktorého vyžaruje sofistikovanosť.&lt;/p&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;h2 class=\"text-primary cross-sell_group\"&gt;Parametre&lt;/h2&gt; &lt;div class=\"wrap-overflow-table\"&gt;&lt;div class=\"wrap-overflow-table_in\"&gt;&lt;table class=\"table\"&gt;&lt;tbody&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;Funkcie systému&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Operačný systém&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Windows 11 Pro&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Skupina procesora&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Procesor Intel Core™ Ultra 5&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Procesor&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Procesor Intel Core™ Ultra 5 226V (max. 4,5 GHz s technológiou Intel Turbo Boost, vyrovnávacia pamäť L3 8 MB, 8 jadier, 8 vlákien)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Špecifikácie trvalej udržateľnosti&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Nízky obsah halogenidov; Výplň z lisovanej papierovej drviny je recyklovateľná a 100 % z nej pochádza z trvalo udržateľných zdrojov; Vonkajšia škatuľa a lepenkové výplne sú recyklovateľné a 100 % z nich pochádza z trvalo udržateľných zdrojov; Puzdrá reproduktorov obsahujú plasty, ktoré by inak skončili v oceáne; 90 % recyklovaného kovu&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Pamäť&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;16 GB pamäte LPDDR5x-8533 MT/s (na doske) Rýchlosť prenosu dát až 8 533 MT/s.&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Popis pevného disku&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;512 GB jednotka PCIe Gen4 NVMe™ TLC SSD&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Obrazovka&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;14\" diagonal 2.8K display&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Obrazovka&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;14\" diagonal, 2.8K (2880 x 1800), OLED, IPS, BrightView, 400 nits, 100% DCI-P3 Displej OLED IPS BrightView s uhlopriečkou 35,6 cm (14\"), jasom 400 nitov, 100 % pokrytím škály DCI-P3 a rozlíšením 2,8K (2880 x 1800) [9,10,11,12]&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Grafická karta (integrovaná)&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Grafika Intel Arc™&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Grafika&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Integrovaná Grafika Intel Arc™&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Fotoaparát&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Infračervená 9 Mpx kamera AI s dočasnou redukciou šumu a dvomi digitálnymi mikrofónmi&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Klávesnica&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Modrá podsvietená klávesnica plnej veľkosti so zariadením HP Imagepad&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Polohovacie zariadenie&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Haptický trackpad s podporou viacprstových gest&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Webová kamera&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;9 MP IR AI camera with temporal noise reduction and integrated dual array digital microphones&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Zvuk&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Zvuk od Poly Studio, štyri stereofónne reproduktory, dva mikrofóny s redukciou šumu pomocou umelej inteligencie&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Polohovacie zariadenie&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Haptický trackpad s podporou viacprstových gest&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Bezdrôtová&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Bezdrôtová karta Intel Wi-Fi 7 BE201 (2 x 2) a Bluetooth 5.4&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Minimálne rozmery (š x h x v)&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;31,37 x 21,72 x 0,9 cm (predná strana); 31,37 x 21,72 x 1,21 cm (zadná strana)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Rozmery (Š x H x V) poznámka&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Predná výška sa meria blízko predného okraja, kde sa začína zužovanie spodného krytu šasi. Zadná výška sa meria blízko zadného okraja, kde sa končí zužovanie spodného krytu šasi.&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Hmotnosť&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Od 1,19 kg&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Poznámky k hmotnosti (metrické)&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Hmotnosť sa líši v závislosti od konfigurácie. Nezahŕňa napájací adaptér.&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Typ batérie&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;6-článková lítium-iónová polymérová batéria HP s dlhou výdržou, 64 Wh&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Štítky ekologickej bezpečnosti&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Certifikácia TCO&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Napájanie&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;65 W adaptér USB Type-C&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Záruka&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;1-ročná (1/1/0) obmedzená záruka pokrýva náklady na diely a prácu počas 1 roka. Nevzťahuje sa na opravu na mieste. Zmluvné podmienky sa v jednotlivých krajinách líšia. Platia určité obmedzenia a výnimky.&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Vrátane služby podpory&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;3-r. podpora HP pre NB na mieste. Zmluvné podmienky nájdete na stránke https://h20195.www2.hp.com/v2/GetPDF.aspx/4AA8-2300SKE &amp; https://www8.hp.com/h20195/v2/getpdf.aspx/4AA5-7123SKE.pdf&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Farba produktu&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Modrá&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;/div&gt;&lt;/div&gt; &lt;h2 class=\"text-primary cross-sell_group\"&gt;Poznámky&lt;/h2&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[1] Niektoré funkcie nemusia byť k dispozícii vo všetkých vydaniach alebo verziách systému Windows. Na využívanie všetkých funkcií systému Windows môžu systémy vyžadovať inovovaný alebo samostatne zakúpený hardvér, ovládače, softvér alebo aktualizáciu systému BIOS. Aktualizácia systému Windows 11 prebieha automaticky a je vždy povolená. Vyžaduje sa vysokorýchlostný internet a konto Microsoft. Poskytovateľ internetových služieb si môže účtovať poplatky a na aktualizácie sa časom môžu vzťahovať ďalšie požiadavky. Pozri http://www.windows.com.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[2] Viacjadrová architektúra pomáha zvýšiť výkon niektorých softvérových produktov. Prínos tejto technológie nemusia využiť všetci používatelia ani všetky softvérové aplikácie. Výkon a taktovacia frekvencia závisia od záťažového profilu konkrétnej aplikácie, ako aj hardvérovej a softvérovej konfigurácie. Číselné označenie, značka alebo názov produktu spoločnosti Intel neoznačuje mieru výkonnosti.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[3] Funkcie a softvér, ktoré vyžadujú aktualizáciu NPU, môžu vyžadovať nákup, predplatné alebo sprístupnenie softvéru poskytovateľom softvéru alebo platformy a softvér tretích strán môže mať špecifické požiadavky na konfiguráciu alebo kompatibilitu. Výkon sa líši v závislosti od používania, konfigurácie a ďalších faktorov.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[6] Aplikácia HP AI Companion je na vybraných počítačoch HP AI novej generácie predinštalovaná alebo k dispozícii na stiahnutie z obchodu Microsoft Store. Vyžaduje počítač HP AI novej generácie s jednotkou NPU so 40 – 60 tops a s min. 16 GB úložiskom a vyžaduje systém Windows 11. Výkon vyžaduje konto nastavené do 30 dní od spustenia alebo registrácie počítača prostredníctvom aplikácie HP AI Companion. Niektoré funkcie vyžadujú, aby zákazník nahral lokálne údaje. Každá z desiatich (10) knižníc má limit 100 MB, podporované súbory sa môžu líšiť a pri spustení zahŕňajú súbory PDF, .txt., .docx. Na používanie s umelou inteligenciou v zariadení vyžaduje počítač HP Next Gen AI 32 GB pamäte RAM a až 4,5 GB ukladacieho priestoru v počítači. Režim \"V zariadení\" používa stiahnutý LLM Phi 3.5 na lokálne spracovanie otázok a nevyžaduje pripojenie na internet. Režim \"Cloud\" používa GPT-4o na spracovanie otázok online a vyžaduje pripojenie k internetu. Spotlight a hlasové funkcie sú funkcie aplikácie HP AI Companion. Očakávaná dostupnosť na jar 2025. Dostupnosť sa líši v závislosti od regiónu.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[10] Môže sa vyžadovať stiahnutie služby Windows Update alebo aplikácie z obchodu Microsoft Store. Microsoft Copilot NIE JE k dispozícii v Číne, Rusku, Bielorusku a regiónoch, na ktoré je uvalené embargo - Kuba, Irán, Severná Kórea a Krym.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt; &lt;h2 class=\"text-primary cross-sell_group\"&gt;Právne upozornenie&lt;/h2&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[4] Niektoré funkcie nemusia byť k dispozícii vo všetkých vydaniach alebo verziách systému Windows. Na využívanie všetkých funkcií systému Windows môžu systémy vyžadovať inovovaný alebo samostatne zakúpený hardvér, ovládače, softvér alebo aktualizáciu systému BIOS. Aktualizácia systému Windows 11 prebieha automaticky a je vždy povolená. Poskytovateľ internetových služieb si môže účtovať poplatky a na aktualizácie sa časom môžu vzťahovať ďalšie požiadavky. Viď http://www.windows.com. Microsoft Copilot vyžaduje systém Windows 11. Niektoré funkcie vyžadujú jednotku NPU. Načasovanie a dostupnosť budú závisieť od spoločnosti Microsoft a líšia sa v závislosti od trhu a zariadenia. Vyžaduje sa konto Microsoft na prihlásenie. Ak funkcia Copilot nie je k dispozícii, kláves Copilot smeruje do vyhľadávacieho nástroja Bing. Viď http://aka.ms/WindowsAIFeatures.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[5] Viacjadrová architektúra pomáha zvýšiť výkon niektorých softvérových produktov. Prínos tejto technológie nemusia nevyhnutne pocítiť všetci zákazníci ani všetky softvérové aplikácie. Výkon a taktovacia frekvencia sa líšia v závislosti od záťažového profilu konkrétnej aplikácie, ako aj hardvérovej a softvérovej konfigurácie. Číselné označenie, značka alebo názov produktu spoločnosti Intel neoznačuje mieru výkonnosti. Funkcie a softvér, ktoré vyžadujú aktualizáciu NPU, môžu vyžadovať nákup, predplatné alebo povolenie softvéru poskytovateľom softvéru alebo platformy a softvér tretích strán môže mať špecifické požiadavky na konfiguráciu alebo kompatibilitu. Výkon sa líši v závislosti od používania, konfigurácie a ďalších faktorov. Riešenia nezávislých dodávateľov softvéru sa predávajú samostatne a môžu vyžadovať predplatné a jednotku NPU.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[7] Vyžaduje sa bezdrôtový prístupový bod a služba pripojenia na internet (predávajú sa samostatne). Dostupnosť verejných bezdrôtových prístupových bodov je obmedzená. Funkcia Wi-Fi 7 (802.11BE) vyžaduje kompatibilný operačný systém Windows 11, kompatibilný procesor a samostatne zakúpený smerovač Wi-Fi 7 na podporu spätnej kompatibility s predchádzajúcimi špecifikáciami 802.11. Je k dispozícii v krajinách, v ktorých je podporovaný štandard Wi-Fi 7. Parametre štandardu 802.11BE sú len orientačné a nie sú konečné. Ak sa budú konečné parametre odlišovať od orientačných parametrov, môže to ovplyvniť schopnosť zariadenia komunikovať s inými zariadeniami pomocou štandardu 802.11BE. Pripojenie Wi-Fi s podporou gigabitových rýchlostí prenosu údajov možno dosiahnuť v sieti Wi-Fi 7 (802.11BE) pri prenose súborov medzi dvoma zariadeniami pripojenými k rovnakému smerovaču.?Vyžaduje sa samostatne predávaný bezdrôtový smerovač podporujúci kanály 160 MHz.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[8] HP Sure Click vyžaduje systém Windows 10 alebo novší. Viď https://bit.ly/2PrLT6A_SureClick.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[9] HP Sure Sense je k dispozícii vo vybraných počítačoch HP s operačným systémom Windows 10 Pro, Windows 10 Enterprise, Windows 11 Pro alebo Windows 11 Enterprise.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[11] Riešenie HP Sure Start Gen7 je k dispozícii vo vybraných počítačoch HP a vyžaduje systém Windows 10 Pro alebo novší.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[12] Aplikácia HP AI Companion je predinštalovaná vo vybraných počítačoch HP Gen AI alebo je k dispozícii na stiahnutie z obchodu Microsoft Store. Vyžaduje počítač HP Next Gen AI PC s jednotkou NPU podporujúcou 40 – 60 TOPS a vyžaduje systém Windows 11. Výkon vyžaduje konto nastavené do 30 dní od spustenia alebo registrácie počítača prostredníctvom aplikácie HP AI Companion. Niektoré funkcie vyžadujú, aby zákazník nahral lokálne údaje. Päť (5) knižníc s limitom 100 MB, podporované súbory sa môžu líšiť a pri spustení zahŕňajú súbory .pdf, .txt a .docx.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[13] Dostupnosť softvéru Poly je naplánovaná na leto 2024. Vyžaduje sa operačný systém Windows.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;",
    "seoTitle": "HP NTB EliteBook Ultra G1i U5-226V 40TOPS 14\"2.8K 2880x1800 OLED 400 120Hz IR,16GB,512GB TLC,64WHr,Win11Pro,EVO, 3y onst | Worlds.sk",
    "seoDescription": "Kúpiť HP NTB EliteBook Ultra G1i U5-226V 40TOPS 14\"2.8K 2880x1800 OLED 400 120Hz IR,16GB,512GB TLC,64WHr,Win11Pro,EVO, 3y onst (PartNumber: B9ZU6ET#BCM) za výhodnú cenu 2266.61 € s expresným doručením z centrálneho skladu na Worlds.sk.",
    "searchKeywords": [
      "hp",
      "b9zu6et#bcm",
      "firemne-notebooky"
    ],
    "pricing": {
      "supplierCost": 1686.46,
      "supplierFees": {
        "garbageFee": 0.42,
        "authorFee": 6.04
      },
      "totalCostWithFees": 1686.46,
      "vatRate": 20,
      "marginPercentage": 12,
      "basePrice": 1888.84,
      "finalPrice": 2266.61,
      "currency": "EUR"
    },
    "stockCount": 2,
    "isInStock": true,
    "stockText": "Skladom > 2 ks",
    "warrantyMonths": 24,
    "attributes": {
      "brand": {
        "code": "brand",
        "name": "Výrobca",
        "value": "HP",
        "rawValue": "HP"
      },
      "mpn": {
        "code": "mpn",
        "name": "Part Number",
        "value": "B9ZU6ET#BCM",
        "rawValue": "B9ZU6ET#BCM"
      },
      "warranty": {
        "code": "warranty",
        "name": "Záruka",
        "value": "24 mesiacov",
        "rawValue": "24"
      }
    },
    "images": [
      {
        "id": "img-1519425",
        "url": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80",
        "position": 0,
        "isPrimary": true,
        "altText": "HP NTB EliteBook Ultra G1i U5-226V 40TOPS 14\"2.8K 2880x1800 OLED 400 120Hz IR,16GB,512GB TLC,64WHr,Win11Pro,EVO, 3y onst"
      }
    ],
    "status": "ACTIVE",
    "reviewStatus": "AUTO_APPROVED",
    "qualityScore": {
      "total": 90,
      "breakdown": {
        "hasEan": true,
        "hasBrand": true,
        "hasMpn": true,
        "hasValidCategory": true,
        "hasImages": true,
        "hasAttributes": true,
        "hasDescription": true,
        "hasSeoMetadata": true,
        "hasPrice": true,
        "hasStock": true
      }
    },
    "dataHash": "hash_1519425_1686.46_2",
    "lastSyncedAt": "2026-09-01T15:48:11.559Z",
    "lastReprocessedAt": "2026-09-01T15:48:11.559Z",
    "createdAt": "2026-09-01T15:48:11.559Z",
    "updatedAt": "2026-09-01T15:48:11.559Z"
  },
  {
    "id": "ed-1519426",
    "supplierCode": "1519426",
    "sku": "1519426",
    "mpn": "B9ZU7ET#BCM",
    "ean": "198990891248",
    "brand": "HP",
    "categorySlug": "firemne-notebooky",
    "categoryHierarchy": [
      "Počítače a notebooky",
      "Notebooky",
      "Firemné a pracovné notebooky"
    ],
    "title": "HP NTB EliteBook Ultra G1i U7-258V 47TOPS 14\"2.8K 2880x1800 OLED 400 120Hz IR,32GB,1TB TLC,64WHr,Win11Pro,EVO, 3y onst",
    "slug": "hp-ntb-elitebook-ultra-g1i-u7-258v-47tops-14-2-8k-2880x1800-oled-400-120hz-ir-32gb-1tb-tlc-64whr-win11pro-evo-3y-onst-1519426",
    "shortDescription": "&lt;h2 class=\"text-primary cross-sell_group\"&gt;14\" notebook HP EliteBook Ultra G1i Next Gen AI&lt;/h2&gt;&lt;div class=\"tpl-product-detail-desc\"&gt;&lt;div class=\"box-in\"&gt;&lt;div class=\"row\"&gt;&lt;p&gt;Notebooky HP Elite poskytujú výkonné, mimoriadne bezpečné a spravovateľné riešenia pre náročné pracovné postupy. Tento rad nádherne navrhnutých firemných produktov si môžete ľahko nosiť so sebou.&lt;/p&gt;&lt;/div&gt;&lt;div class=\"row\"&gt;&lt;figure class=\"box-img\"&gt;&lt;img src=\"https://c.edsystem.cz/IMGCACHE/_1752/1752494_0d_3.jpg\" alt=\"Right facing\"&gt;&lt;/figure&gt;&lt;div class=\"desc\"&gt;&lt;h2&gt;Spoločnosť HP odporúča systém Windows 11 Pro&lt;/h2&gt;&lt;p&gt;Zhrňte a prepíšte obsah, získajte relevantné odporúčania a zachovajte si prehľad pomocou funkcie Microsoft Copilot. [10]&lt;/p&gt;&lt;/div&gt;&lt;/div&gt;&lt;div class=\"row\"&gt;&lt;figure class=\"box-img\"&gt;&lt;img src=\"https://c.edsystem.cz/IMGCACHE/_1752/1752494_0g_3.jpg\" alt=\"Left facing\"&gt;&lt;/figure&gt;&lt;div class=\"desc\"&gt;&lt;h2&gt;Spoločnosť Intel poháňa počítače novej generácie s umelou inteligenciou&lt;/h2&gt;&lt;p&gt;Uvoľnite svoj čas a sústreďte sa na to, na čom záleží, s najnovším procesorom Intel Core Ultra™ s podporou 48 tops. [2,3]&lt;/p&gt;&lt;/div&gt;&lt;/div&gt;&lt;div class=\"row\"&gt;&lt;figure class=\"box-img\"&gt;&lt;img src=\"https://c.edsystem.cz/IMGCACHE/_1752/1752494_0a_3.jpg\" alt=\"Center facing\"&gt;&lt;/figure&gt;&lt;div class=\"desc\"&gt;&lt;h2&gt;Pomoc využívajúca umelú inteligenciu&lt;/h2&gt;&lt;p&gt;Odomknite nové možnosti a eliminujte rutinné úlohy s počítačom HP EliteBook Ultra G1i Next Gen AI.[ 6]&lt;/p&gt;&lt;/div&gt;&lt;/div&gt;&lt;div class=\"row\"&gt;&lt;div class=\"desc\"&gt;&lt;h2&gt;Elegantný dizajn&lt;/h2&gt;&lt;p&gt;Ovládnite miestnosť s počítačom, z ktorého vyžaruje sofistikovanosť.&lt;/p&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;h2 class=\"text-primary cross-sell_group\"&gt;Parametre&lt;/h2&gt; &lt;div class=\"wrap-overflow-table\"&gt;&lt;div class=\"wrap-overflow-table_in\"&gt;&lt;table class=\"table\"&gt;&lt;tbody&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;Funkcie systému&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Operačný systém&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Windows 11 Pro&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Skupina procesora&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Procesor Intel Core™ Ultra 7&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Procesor&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Procesor Intel Core™ Ultra 7 258V (max. 4,8 GHz s technológiou Intel Turbo Boost, vyrovnávacia pamäť L3 12 MB, 8 jadier, 8 vlákien)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Špecifikácie trvalej udržateľnosti&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Nízky obsah halogenidov; Výplň z lisovanej papierovej drviny je recyklovateľná a 100 % z nej pochádza z trvalo udržateľných zdrojov; Vonkajšia škatuľa a lepenkové výplne sú recyklovateľné a 100 % z nich pochádza z trvalo udržateľných zdrojov; Puzdrá reproduktorov obsahujú plasty, ktoré by inak skončili v oceáne; 90 % recyklovaného kovu&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Pamäť&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;32 GB pamäte LPDDR5x-8533 MT/s (na doske) Rýchlosť prenosu dát až 8 533 MT/s.&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Popis pevného disku&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;1 TB jednotka PCIe Gen4 NVMe™ TLC M.2 SSD&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Obrazovka&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;14\" diagonal 2.8K display&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Obrazovka&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;14\" diagonal, 2.8K (2880 x 1800), OLED, IPS, BrightView, 400 nits, 100% DCI-P3 Displej OLED IPS BrightView s uhlopriečkou 35,6 cm (14\"), jasom 400 nitov, 100 % pokrytím škály DCI-P3 a rozlíšením 2,8K (2880 x 1800) [9,10,11,12]&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Grafická karta (integrovaná)&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Grafika Intel Arc™&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Grafika&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Integrovaná Grafika Intel Arc™&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Fotoaparát&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Infračervená 9 Mpx kamera AI s dočasnou redukciou šumu a dvomi digitálnymi mikrofónmi&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Klávesnica&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Modrá podsvietená klávesnica plnej veľkosti so zariadením HP Imagepad&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Polohovacie zariadenie&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Haptický trackpad s podporou viacprstových gest&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Webová kamera&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;9 MP IR AI camera with temporal noise reduction and integrated dual array digital microphones&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Zvuk&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Zvuk od Poly Studio, štyri stereofónne reproduktory, dva mikrofóny s redukciou šumu pomocou umelej inteligencie&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Polohovacie zariadenie&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Haptický trackpad s podporou viacprstových gest&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Bezdrôtová&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Bezdrôtová karta Intel Wi-Fi 7 BE201 (2 x 2) a Bluetooth 5.4&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Minimálne rozmery (š x h x v)&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;31,37 x 21,72 x 0,9 cm (predná strana); 31,37 x 21,72 x 1,21 cm (zadná strana)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Rozmery (Š x H x V) poznámka&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Predná výška sa meria blízko predného okraja, kde sa začína zužovanie spodného krytu šasi. Zadná výška sa meria blízko zadného okraja, kde sa končí zužovanie spodného krytu šasi.&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Hmotnosť&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Od 1,19 kg&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Poznámky k hmotnosti (metrické)&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Hmotnosť sa líši v závislosti od konfigurácie. Nezahŕňa napájací adaptér.&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Typ batérie&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;6-článková lítium-iónová polymérová batéria HP s dlhou výdržou, 64 Wh&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Štítky ekologickej bezpečnosti&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Certifikácia TCO&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Napájanie&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;65 W adaptér USB Type-C&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Záruka&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;1-ročná (1/1/0) obmedzená záruka pokrýva náklady na diely a prácu počas 1 roka. Nevzťahuje sa na opravu na mieste. Zmluvné podmienky sa v jednotlivých krajinách líšia. Platia určité obmedzenia a výnimky.&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Vrátane služby podpory&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;3-r. podpora HP pre NB na mieste. Zmluvné podmienky nájdete na stránke https://h20195.www2.hp.com/v2/GetPDF.aspx/4AA8-2300SKE &amp; https://www8.hp.com/h20195/v2/getpdf.aspx/4AA5-7123SKE.pdf&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Farba produktu&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Modrá&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;/div&gt;&lt;/div&gt; &lt;h2 class=\"text-primary cross-sell_group\"&gt;Poznámky&lt;/h2&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[1] Niektoré funkcie nemusia byť k dispozícii vo všetkých vydaniach alebo verziách systému Windows. Na využívanie všetkých funkcií systému Windows môžu systémy vyžadovať inovovaný alebo samostatne zakúpený hardvér, ovládače, softvér alebo aktualizáciu systému BIOS. Aktualizácia systému Windows 11 prebieha automaticky a je vždy povolená. Vyžaduje sa vysokorýchlostný internet a konto Microsoft. Poskytovateľ internetových služieb si môže účtovať poplatky a na aktualizácie sa časom môžu vzťahovať ďalšie požiadavky. Pozri http://www.windows.com.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[2] Viacjadrová architektúra pomáha zvýšiť výkon niektorých softvérových produktov. Prínos tejto technológie nemusia využiť všetci používatelia ani všetky softvérové aplikácie. Výkon a taktovacia frekvencia závisia od záťažového profilu konkrétnej aplikácie, ako aj hardvérovej a softvérovej konfigurácie. Číselné označenie, značka alebo názov produktu spoločnosti Intel neoznačuje mieru výkonnosti.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[3] Funkcie a softvér, ktoré vyžadujú aktualizáciu NPU, môžu vyžadovať nákup, predplatné alebo sprístupnenie softvéru poskytovateľom softvéru alebo platformy a softvér tretích strán môže mať špecifické požiadavky na konfiguráciu alebo kompatibilitu. Výkon sa líši v závislosti od používania, konfigurácie a ďalších faktorov.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[6] Aplikácia HP AI Companion je na vybraných počítačoch HP AI novej generácie predinštalovaná alebo k dispozícii na stiahnutie z obchodu Microsoft Store. Vyžaduje počítač HP AI novej generácie s jednotkou NPU so 40 – 60 tops a s min. 16 GB úložiskom a vyžaduje systém Windows 11. Výkon vyžaduje konto nastavené do 30 dní od spustenia alebo registrácie počítača prostredníctvom aplikácie HP AI Companion. Niektoré funkcie vyžadujú, aby zákazník nahral lokálne údaje. Každá z desiatich (10) knižníc má limit 100 MB, podporované súbory sa môžu líšiť a pri spustení zahŕňajú súbory PDF, .txt., .docx. Na používanie s umelou inteligenciou v zariadení vyžaduje počítač HP Next Gen AI 32 GB pamäte RAM a až 4,5 GB ukladacieho priestoru v počítači. Režim \"V zariadení\" používa stiahnutý LLM Phi 3.5 na lokálne spracovanie otázok a nevyžaduje pripojenie na internet. Režim \"Cloud\" používa GPT-4o na spracovanie otázok online a vyžaduje pripojenie k internetu. Spotlight a hlasové funkcie sú funkcie aplikácie HP AI Companion. Očakávaná dostupnosť na jar 2025. Dostupnosť sa líši v závislosti od regiónu.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[10] Môže sa vyžadovať stiahnutie služby Windows Update alebo aplikácie z obchodu Microsoft Store. Microsoft Copilot NIE JE k dispozícii v Číne, Rusku, Bielorusku a regiónoch, na ktoré je uvalené embargo - Kuba, Irán, Severná Kórea a Krym.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt; &lt;h2 class=\"text-primary cross-sell_group\"&gt;Právne upozornenie&lt;/h2&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[4] Niektoré funkcie nemusia byť k dispozícii vo všetkých vydaniach alebo verziách systému Windows. Na využívanie všetkých funkcií systému Windows môžu systémy vyžadovať inovovaný alebo samostatne zakúpený hardvér, ovládače, softvér alebo aktualizáciu systému BIOS. Aktualizácia systému Windows 11 prebieha automaticky a je vždy povolená. Poskytovateľ internetových služieb si môže účtovať poplatky a na aktualizácie sa časom môžu vzťahovať ďalšie požiadavky. Viď http://www.windows.com. Microsoft Copilot vyžaduje systém Windows 11. Niektoré funkcie vyžadujú jednotku NPU. Načasovanie a dostupnosť budú závisieť od spoločnosti Microsoft a líšia sa v závislosti od trhu a zariadenia. Vyžaduje sa konto Microsoft na prihlásenie. Ak funkcia Copilot nie je k dispozícii, kláves Copilot smeruje do vyhľadávacieho nástroja Bing. Viď http://aka.ms/WindowsAIFeatures.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[5] Viacjadrová architektúra pomáha zvýšiť výkon niektorých softvérových produktov. Prínos tejto technológie nemusia nevyhnutne pocítiť všetci zákazníci ani všetky softvérové aplikácie. Výkon a taktovacia frekvencia sa líšia v závislosti od záťažového profilu konkrétnej aplikácie, ako aj hardvérovej a softvérovej konfigurácie. Číselné označenie, značka alebo názov produktu spoločnosti Intel neoznačuje mieru výkonnosti. Funkcie a softvér, ktoré vyžadujú aktualizáciu NPU, môžu vyžadovať nákup, predplatné alebo povolenie softvéru poskytovateľom softvéru alebo platformy a softvér tretích strán môže mať špecifické požiadavky na konfiguráciu alebo kompatibilitu. Výkon sa líši v závislosti od používania, konfigurácie a ďalších faktorov. Riešenia nezávislých dodávateľov softvéru sa predávajú samostatne a môžu vyžadovať predplatné a jednotku NPU.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[7] Vyžaduje sa bezdrôtový prístupový bod a služba pripojenia na internet (predávajú sa samostatne). Dostupnosť verejných bezdrôtových prístupových bodov je obmedzená. Funkcia Wi-Fi 7 (802.11BE) vyžaduje kompatibilný operačný systém Windows 11, kompatibilný procesor a samostatne zakúpený smerovač Wi-Fi 7 na podporu spätnej kompatibility s predchádzajúcimi špecifikáciami 802.11. Je k dispozícii v krajinách, v ktorých je podporovaný štandard Wi-Fi 7. Parametre štandardu 802.11BE sú len orientačné a nie sú konečné. Ak sa budú konečné parametre odlišovať od orientačných parametrov, môže to ovplyvniť schopnosť zariadenia komunikovať s inými zariadeniami pomocou štandardu 802.11BE. Pripojenie Wi-Fi s podporou gigabitových rýchlostí prenosu údajov možno dosiahnuť v sieti Wi-Fi 7 (802.11BE) pri prenose súborov medzi dvoma zariadeniami pripojenými k rovnakému smerovaču.?Vyžaduje sa samostatne predávaný bezdrôtový smerovač podporujúci kanály 160 MHz.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[8] HP Sure Click vyžaduje systém Windows 10 alebo novší. Viď https://bit.ly/2PrLT6A_SureClick.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[9] HP Sure Sense je k dispozícii vo vybraných počítačoch HP s operačným systémom Windows 10 Pro, Windows 10 Enterprise, Windows 11 Pro alebo Windows 11 Enterprise.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[11] Riešenie HP Sure Start Gen7 je k dispozícii vo vybraných počítačoch HP a vyžaduje systém Windows 10 Pro alebo novší.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[12] Aplikácia HP AI Companion je predinštalovaná vo vybraných počítačoch HP Gen AI alebo je k dispozícii na stiahnutie z obchodu Microsoft Store. Vyžaduje počítač HP Next Gen AI PC s jednotkou NPU podporujúcou 40 – 60 TOPS a vyžaduje systém Windows 11. Výkon vyžaduje konto nastavené do 30 dní od spustenia alebo registrácie počítača prostredníctvom aplikácie HP AI Companion. Niektoré funkcie vyžadujú, aby zákazník nahral lokálne údaje. Päť (5) knižníc s limitom 100 MB, podporované súbory sa môžu líšiť a pri spustení zahŕňajú súbory .pdf, .txt a .docx.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[13] Dostupnosť softvéru Poly je naplánovaná na leto 2024. Vyžaduje sa operačný systém Windows.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;",
    "supplierDescription": "&lt;h2 class=\"text-primary cross-sell_group\"&gt;14\" notebook HP EliteBook Ultra G1i Next Gen AI&lt;/h2&gt;&lt;div class=\"tpl-product-detail-desc\"&gt;&lt;div class=\"box-in\"&gt;&lt;div class=\"row\"&gt;&lt;p&gt;Notebooky HP Elite poskytujú výkonné, mimoriadne bezpečné a spravovateľné riešenia pre náročné pracovné postupy. Tento rad nádherne navrhnutých firemných produktov si môžete ľahko nosiť so sebou.&lt;/p&gt;&lt;/div&gt;&lt;div class=\"row\"&gt;&lt;figure class=\"box-img\"&gt;&lt;img src=\"https://c.edsystem.cz/IMGCACHE/_1752/1752494_0d_3.jpg\" alt=\"Right facing\"&gt;&lt;/figure&gt;&lt;div class=\"desc\"&gt;&lt;h2&gt;Spoločnosť HP odporúča systém Windows 11 Pro&lt;/h2&gt;&lt;p&gt;Zhrňte a prepíšte obsah, získajte relevantné odporúčania a zachovajte si prehľad pomocou funkcie Microsoft Copilot. [10]&lt;/p&gt;&lt;/div&gt;&lt;/div&gt;&lt;div class=\"row\"&gt;&lt;figure class=\"box-img\"&gt;&lt;img src=\"https://c.edsystem.cz/IMGCACHE/_1752/1752494_0g_3.jpg\" alt=\"Left facing\"&gt;&lt;/figure&gt;&lt;div class=\"desc\"&gt;&lt;h2&gt;Spoločnosť Intel poháňa počítače novej generácie s umelou inteligenciou&lt;/h2&gt;&lt;p&gt;Uvoľnite svoj čas a sústreďte sa na to, na čom záleží, s najnovším procesorom Intel Core Ultra™ s podporou 48 tops. [2,3]&lt;/p&gt;&lt;/div&gt;&lt;/div&gt;&lt;div class=\"row\"&gt;&lt;figure class=\"box-img\"&gt;&lt;img src=\"https://c.edsystem.cz/IMGCACHE/_1752/1752494_0a_3.jpg\" alt=\"Center facing\"&gt;&lt;/figure&gt;&lt;div class=\"desc\"&gt;&lt;h2&gt;Pomoc využívajúca umelú inteligenciu&lt;/h2&gt;&lt;p&gt;Odomknite nové možnosti a eliminujte rutinné úlohy s počítačom HP EliteBook Ultra G1i Next Gen AI.[ 6]&lt;/p&gt;&lt;/div&gt;&lt;/div&gt;&lt;div class=\"row\"&gt;&lt;div class=\"desc\"&gt;&lt;h2&gt;Elegantný dizajn&lt;/h2&gt;&lt;p&gt;Ovládnite miestnosť s počítačom, z ktorého vyžaruje sofistikovanosť.&lt;/p&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;h2 class=\"text-primary cross-sell_group\"&gt;Parametre&lt;/h2&gt; &lt;div class=\"wrap-overflow-table\"&gt;&lt;div class=\"wrap-overflow-table_in\"&gt;&lt;table class=\"table\"&gt;&lt;tbody&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;Funkcie systému&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Operačný systém&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Windows 11 Pro&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Skupina procesora&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Procesor Intel Core™ Ultra 7&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Procesor&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Procesor Intel Core™ Ultra 7 258V (max. 4,8 GHz s technológiou Intel Turbo Boost, vyrovnávacia pamäť L3 12 MB, 8 jadier, 8 vlákien)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Špecifikácie trvalej udržateľnosti&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Nízky obsah halogenidov; Výplň z lisovanej papierovej drviny je recyklovateľná a 100 % z nej pochádza z trvalo udržateľných zdrojov; Vonkajšia škatuľa a lepenkové výplne sú recyklovateľné a 100 % z nich pochádza z trvalo udržateľných zdrojov; Puzdrá reproduktorov obsahujú plasty, ktoré by inak skončili v oceáne; 90 % recyklovaného kovu&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Pamäť&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;32 GB pamäte LPDDR5x-8533 MT/s (na doske) Rýchlosť prenosu dát až 8 533 MT/s.&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Popis pevného disku&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;1 TB jednotka PCIe Gen4 NVMe™ TLC M.2 SSD&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Obrazovka&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;14\" diagonal 2.8K display&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Obrazovka&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;14\" diagonal, 2.8K (2880 x 1800), OLED, IPS, BrightView, 400 nits, 100% DCI-P3 Displej OLED IPS BrightView s uhlopriečkou 35,6 cm (14\"), jasom 400 nitov, 100 % pokrytím škály DCI-P3 a rozlíšením 2,8K (2880 x 1800) [9,10,11,12]&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Grafická karta (integrovaná)&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Grafika Intel Arc™&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Grafika&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Integrovaná Grafika Intel Arc™&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Fotoaparát&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Infračervená 9 Mpx kamera AI s dočasnou redukciou šumu a dvomi digitálnymi mikrofónmi&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Klávesnica&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Modrá podsvietená klávesnica plnej veľkosti so zariadením HP Imagepad&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Polohovacie zariadenie&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Haptický trackpad s podporou viacprstových gest&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Webová kamera&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;9 MP IR AI camera with temporal noise reduction and integrated dual array digital microphones&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Zvuk&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Zvuk od Poly Studio, štyri stereofónne reproduktory, dva mikrofóny s redukciou šumu pomocou umelej inteligencie&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Polohovacie zariadenie&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Haptický trackpad s podporou viacprstových gest&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Bezdrôtová&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Bezdrôtová karta Intel Wi-Fi 7 BE201 (2 x 2) a Bluetooth 5.4&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Minimálne rozmery (š x h x v)&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;31,37 x 21,72 x 0,9 cm (predná strana); 31,37 x 21,72 x 1,21 cm (zadná strana)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Rozmery (Š x H x V) poznámka&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Predná výška sa meria blízko predného okraja, kde sa začína zužovanie spodného krytu šasi. Zadná výška sa meria blízko zadného okraja, kde sa končí zužovanie spodného krytu šasi.&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Hmotnosť&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Od 1,19 kg&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Poznámky k hmotnosti (metrické)&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Hmotnosť sa líši v závislosti od konfigurácie. Nezahŕňa napájací adaptér.&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Typ batérie&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;6-článková lítium-iónová polymérová batéria HP s dlhou výdržou, 64 Wh&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Štítky ekologickej bezpečnosti&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Certifikácia TCO&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Napájanie&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;65 W adaptér USB Type-C&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Záruka&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;1-ročná (1/1/0) obmedzená záruka pokrýva náklady na diely a prácu počas 1 roka. Nevzťahuje sa na opravu na mieste. Zmluvné podmienky sa v jednotlivých krajinách líšia. Platia určité obmedzenia a výnimky.&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Vrátane služby podpory&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;3-r. podpora HP pre NB na mieste. Zmluvné podmienky nájdete na stránke https://h20195.www2.hp.com/v2/GetPDF.aspx/4AA8-2300SKE &amp; https://www8.hp.com/h20195/v2/getpdf.aspx/4AA5-7123SKE.pdf&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Farba produktu&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Modrá&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;/div&gt;&lt;/div&gt; &lt;h2 class=\"text-primary cross-sell_group\"&gt;Poznámky&lt;/h2&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[1] Niektoré funkcie nemusia byť k dispozícii vo všetkých vydaniach alebo verziách systému Windows. Na využívanie všetkých funkcií systému Windows môžu systémy vyžadovať inovovaný alebo samostatne zakúpený hardvér, ovládače, softvér alebo aktualizáciu systému BIOS. Aktualizácia systému Windows 11 prebieha automaticky a je vždy povolená. Vyžaduje sa vysokorýchlostný internet a konto Microsoft. Poskytovateľ internetových služieb si môže účtovať poplatky a na aktualizácie sa časom môžu vzťahovať ďalšie požiadavky. Pozri http://www.windows.com.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[2] Viacjadrová architektúra pomáha zvýšiť výkon niektorých softvérových produktov. Prínos tejto technológie nemusia využiť všetci používatelia ani všetky softvérové aplikácie. Výkon a taktovacia frekvencia závisia od záťažového profilu konkrétnej aplikácie, ako aj hardvérovej a softvérovej konfigurácie. Číselné označenie, značka alebo názov produktu spoločnosti Intel neoznačuje mieru výkonnosti.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[3] Funkcie a softvér, ktoré vyžadujú aktualizáciu NPU, môžu vyžadovať nákup, predplatné alebo sprístupnenie softvéru poskytovateľom softvéru alebo platformy a softvér tretích strán môže mať špecifické požiadavky na konfiguráciu alebo kompatibilitu. Výkon sa líši v závislosti od používania, konfigurácie a ďalších faktorov.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[6] Aplikácia HP AI Companion je na vybraných počítačoch HP AI novej generácie predinštalovaná alebo k dispozícii na stiahnutie z obchodu Microsoft Store. Vyžaduje počítač HP AI novej generácie s jednotkou NPU so 40 – 60 tops a s min. 16 GB úložiskom a vyžaduje systém Windows 11. Výkon vyžaduje konto nastavené do 30 dní od spustenia alebo registrácie počítača prostredníctvom aplikácie HP AI Companion. Niektoré funkcie vyžadujú, aby zákazník nahral lokálne údaje. Každá z desiatich (10) knižníc má limit 100 MB, podporované súbory sa môžu líšiť a pri spustení zahŕňajú súbory PDF, .txt., .docx. Na používanie s umelou inteligenciou v zariadení vyžaduje počítač HP Next Gen AI 32 GB pamäte RAM a až 4,5 GB ukladacieho priestoru v počítači. Režim \"V zariadení\" používa stiahnutý LLM Phi 3.5 na lokálne spracovanie otázok a nevyžaduje pripojenie na internet. Režim \"Cloud\" používa GPT-4o na spracovanie otázok online a vyžaduje pripojenie k internetu. Spotlight a hlasové funkcie sú funkcie aplikácie HP AI Companion. Očakávaná dostupnosť na jar 2025. Dostupnosť sa líši v závislosti od regiónu.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[10] Môže sa vyžadovať stiahnutie služby Windows Update alebo aplikácie z obchodu Microsoft Store. Microsoft Copilot NIE JE k dispozícii v Číne, Rusku, Bielorusku a regiónoch, na ktoré je uvalené embargo - Kuba, Irán, Severná Kórea a Krym.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt; &lt;h2 class=\"text-primary cross-sell_group\"&gt;Právne upozornenie&lt;/h2&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[4] Niektoré funkcie nemusia byť k dispozícii vo všetkých vydaniach alebo verziách systému Windows. Na využívanie všetkých funkcií systému Windows môžu systémy vyžadovať inovovaný alebo samostatne zakúpený hardvér, ovládače, softvér alebo aktualizáciu systému BIOS. Aktualizácia systému Windows 11 prebieha automaticky a je vždy povolená. Poskytovateľ internetových služieb si môže účtovať poplatky a na aktualizácie sa časom môžu vzťahovať ďalšie požiadavky. Viď http://www.windows.com. Microsoft Copilot vyžaduje systém Windows 11. Niektoré funkcie vyžadujú jednotku NPU. Načasovanie a dostupnosť budú závisieť od spoločnosti Microsoft a líšia sa v závislosti od trhu a zariadenia. Vyžaduje sa konto Microsoft na prihlásenie. Ak funkcia Copilot nie je k dispozícii, kláves Copilot smeruje do vyhľadávacieho nástroja Bing. Viď http://aka.ms/WindowsAIFeatures.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[5] Viacjadrová architektúra pomáha zvýšiť výkon niektorých softvérových produktov. Prínos tejto technológie nemusia nevyhnutne pocítiť všetci zákazníci ani všetky softvérové aplikácie. Výkon a taktovacia frekvencia sa líšia v závislosti od záťažového profilu konkrétnej aplikácie, ako aj hardvérovej a softvérovej konfigurácie. Číselné označenie, značka alebo názov produktu spoločnosti Intel neoznačuje mieru výkonnosti. Funkcie a softvér, ktoré vyžadujú aktualizáciu NPU, môžu vyžadovať nákup, predplatné alebo povolenie softvéru poskytovateľom softvéru alebo platformy a softvér tretích strán môže mať špecifické požiadavky na konfiguráciu alebo kompatibilitu. Výkon sa líši v závislosti od používania, konfigurácie a ďalších faktorov. Riešenia nezávislých dodávateľov softvéru sa predávajú samostatne a môžu vyžadovať predplatné a jednotku NPU.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[7] Vyžaduje sa bezdrôtový prístupový bod a služba pripojenia na internet (predávajú sa samostatne). Dostupnosť verejných bezdrôtových prístupových bodov je obmedzená. Funkcia Wi-Fi 7 (802.11BE) vyžaduje kompatibilný operačný systém Windows 11, kompatibilný procesor a samostatne zakúpený smerovač Wi-Fi 7 na podporu spätnej kompatibility s predchádzajúcimi špecifikáciami 802.11. Je k dispozícii v krajinách, v ktorých je podporovaný štandard Wi-Fi 7. Parametre štandardu 802.11BE sú len orientačné a nie sú konečné. Ak sa budú konečné parametre odlišovať od orientačných parametrov, môže to ovplyvniť schopnosť zariadenia komunikovať s inými zariadeniami pomocou štandardu 802.11BE. Pripojenie Wi-Fi s podporou gigabitových rýchlostí prenosu údajov možno dosiahnuť v sieti Wi-Fi 7 (802.11BE) pri prenose súborov medzi dvoma zariadeniami pripojenými k rovnakému smerovaču.?Vyžaduje sa samostatne predávaný bezdrôtový smerovač podporujúci kanály 160 MHz.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[8] HP Sure Click vyžaduje systém Windows 10 alebo novší. Viď https://bit.ly/2PrLT6A_SureClick.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[9] HP Sure Sense je k dispozícii vo vybraných počítačoch HP s operačným systémom Windows 10 Pro, Windows 10 Enterprise, Windows 11 Pro alebo Windows 11 Enterprise.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[11] Riešenie HP Sure Start Gen7 je k dispozícii vo vybraných počítačoch HP a vyžaduje systém Windows 10 Pro alebo novší.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[12] Aplikácia HP AI Companion je predinštalovaná vo vybraných počítačoch HP Gen AI alebo je k dispozícii na stiahnutie z obchodu Microsoft Store. Vyžaduje počítač HP Next Gen AI PC s jednotkou NPU podporujúcou 40 – 60 TOPS a vyžaduje systém Windows 11. Výkon vyžaduje konto nastavené do 30 dní od spustenia alebo registrácie počítača prostredníctvom aplikácie HP AI Companion. Niektoré funkcie vyžadujú, aby zákazník nahral lokálne údaje. Päť (5) knižníc s limitom 100 MB, podporované súbory sa môžu líšiť a pri spustení zahŕňajú súbory .pdf, .txt a .docx.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[13] Dostupnosť softvéru Poly je naplánovaná na leto 2024. Vyžaduje sa operačný systém Windows.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;",
    "seoTitle": "HP NTB EliteBook Ultra G1i U7-258V 47TOPS 14\"2.8K 2880x1800 OLED 400 120Hz IR,32GB,1TB TLC,64WHr,Win11Pro,EVO, 3y onst | Worlds.sk",
    "seoDescription": "Kúpiť HP NTB EliteBook Ultra G1i U7-258V 47TOPS 14\"2.8K 2880x1800 OLED 400 120Hz IR,32GB,1TB TLC,64WHr,Win11Pro,EVO, 3y onst (PartNumber: B9ZU7ET#BCM) za výhodnú cenu 3665.34 € s expresným doručením z centrálneho skladu na Worlds.sk.",
    "searchKeywords": [
      "hp",
      "b9zu7et#bcm",
      "firemne-notebooky"
    ],
    "pricing": {
      "supplierCost": 2727.19,
      "supplierFees": {
        "garbageFee": 0.42,
        "authorFee": 6.04
      },
      "totalCostWithFees": 2727.19,
      "vatRate": 20,
      "marginPercentage": 12,
      "basePrice": 3054.45,
      "finalPrice": 3665.34,
      "currency": "EUR"
    },
    "stockCount": 1,
    "isInStock": true,
    "stockText": "Skladom > 1 ks",
    "warrantyMonths": 24,
    "attributes": {
      "brand": {
        "code": "brand",
        "name": "Výrobca",
        "value": "HP",
        "rawValue": "HP"
      },
      "mpn": {
        "code": "mpn",
        "name": "Part Number",
        "value": "B9ZU7ET#BCM",
        "rawValue": "B9ZU7ET#BCM"
      },
      "warranty": {
        "code": "warranty",
        "name": "Záruka",
        "value": "24 mesiacov",
        "rawValue": "24"
      }
    },
    "images": [
      {
        "id": "img-1519426",
        "url": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=80",
        "position": 0,
        "isPrimary": true,
        "altText": "HP NTB EliteBook Ultra G1i U7-258V 47TOPS 14\"2.8K 2880x1800 OLED 400 120Hz IR,32GB,1TB TLC,64WHr,Win11Pro,EVO, 3y onst"
      }
    ],
    "status": "ACTIVE",
    "reviewStatus": "AUTO_APPROVED",
    "qualityScore": {
      "total": 90,
      "breakdown": {
        "hasEan": true,
        "hasBrand": true,
        "hasMpn": true,
        "hasValidCategory": true,
        "hasImages": true,
        "hasAttributes": true,
        "hasDescription": true,
        "hasSeoMetadata": true,
        "hasPrice": true,
        "hasStock": true
      }
    },
    "dataHash": "hash_1519426_2727.19_1",
    "lastSyncedAt": "2026-09-01T15:48:11.559Z",
    "lastReprocessedAt": "2026-09-01T15:48:11.559Z",
    "createdAt": "2026-09-01T15:48:11.559Z",
    "updatedAt": "2026-09-01T15:48:11.559Z"
  },
  {
    "id": "ed-1519429",
    "supplierCode": "1519429",
    "sku": "1519429",
    "mpn": "B9ZV0ET#BCM",
    "ean": "198990891323",
    "brand": "HP",
    "categorySlug": "firemne-notebooky",
    "categoryHierarchy": [
      "Počítače a notebooky",
      "Notebooky",
      "Firemné a pracovné notebooky"
    ],
    "title": "HP NTB EliteBook X G1i U5-226V 40TOPS 14\"WUXGA 1920x1200 400 IR, 16GB, 512GB TLC, 68WHr, Win11Pro, EVO, 3y onst",
    "slug": "hp-ntb-elitebook-x-g1i-u5-226v-40tops-14-wuxga-1920x1200-400-ir-16gb-512gb-tlc-68whr-win11pro-evo-3y-onst-1519429",
    "shortDescription": "&lt;h2 class=\"text-primary cross-sell_group\"&gt;HP EliteBook X G1i 14 inch Notebook Next Gen AI PC&lt;/h2&gt;&lt;div class=\"tpl-product-detail-desc\"&gt;&lt;div class=\"box-in\"&gt;&lt;div class=\"row\"&gt;&lt;p&gt;Notebooky HP Elite poskytujú výkonné, mimoriadne bezpečné a spravovateľné riešenia pre náročné pracovné postupy. Tento rad nádherne navrhnutých firemných produktov si môžete ľahko nosiť so sebou.&lt;/p&gt;&lt;/div&gt;&lt;div class=\"row\"&gt;&lt;figure class=\"box-img\"&gt;&lt;img src=\"https://c.edsystem.cz/IMGCACHE/_1752/1752520_0c_3.jpg\" alt=\"Right facing\"&gt;&lt;/figure&gt;&lt;div class=\"desc\"&gt;&lt;h2&gt;Spoločnosť HP odporúča systém Windows 11 Pro&lt;/h2&gt;&lt;p&gt;Zhrňte a prepíšte obsah, získajte relevantné odporúčania a zachovajte si prehľad pomocou funkcie Microsoft Copilot. [10]&lt;/p&gt;&lt;/div&gt;&lt;/div&gt;&lt;div class=\"row\"&gt;&lt;figure class=\"box-img\"&gt;&lt;img src=\"https://c.edsystem.cz/IMGCACHE/_1752/1752520_0f_3.jpg\" alt=\"Left facing\"&gt;&lt;/figure&gt;&lt;div class=\"desc\"&gt;&lt;h2&gt;Spoločnosť Intel poháňa počítače novej generácie s umelou inteligenciou&lt;/h2&gt;&lt;p&gt;Uvoľnite si čas a sústreďte sa na to, na čom záleží, s najnovším procesorom Intel Core™ Ultra s jednotkou NPU. [2,3]&lt;/p&gt;&lt;/div&gt;&lt;/div&gt;&lt;div class=\"row\"&gt;&lt;figure class=\"box-img\"&gt;&lt;img src=\"https://c.edsystem.cz/IMGCACHE/_1752/1752520_0a_3.jpg\" alt=\"Center facing\"&gt;&lt;/figure&gt;&lt;div class=\"desc\"&gt;&lt;h2&gt;Dlhá výdrž batérie&lt;/h2&gt;&lt;p&gt;Urob viac medzi nabíjaniami vďaka výdrži batérie, ktorú efektívne spravuje umelá inteligencia novej generácie. [3]&lt;/p&gt;&lt;/div&gt;&lt;/div&gt;&lt;div class=\"row\"&gt;&lt;div class=\"desc\"&gt;&lt;h2&gt;Chránené aplikáciou HP Wolf Security&lt;/h2&gt;&lt;p&gt;HP Wolf Security for Business vytvára hardvérom vynucovanú pružnú obranu, ktorá je vždy zapnutá. [11]&lt;/p&gt;&lt;/div&gt;&lt;/div&gt;&lt;div class=\"row\"&gt;&lt;div class=\"desc\"&gt;&lt;h2&gt;5 MP kamera&lt;/h2&gt;&lt;p&gt;Zostaňte sústredení a schopní priniesť si na každé stretnutie to najlepšie s fotoaparátom Poly Camera Pro.[5]&lt;/p&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;h2 class=\"text-primary cross-sell_group\"&gt;Parametre&lt;/h2&gt; &lt;div class=\"wrap-overflow-table\"&gt;&lt;div class=\"wrap-overflow-table_in\"&gt;&lt;table class=\"table\"&gt;&lt;tbody&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;Funkcie systému&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Operačný systém&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Windows 11 Pro&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Skupina procesora&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Procesor Intel Core™ Ultra 5&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Procesor&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Procesor Intel Core™ Ultra 5 226V (max. 4,5 GHz s technológiou Intel Turbo Boost, vyrovnávacia pamäť L3 8 MB, 8 jadier, 8 vlákien)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Špecifikácie trvalej udržateľnosti&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Nízky obsah halogenidov; K dispozícii je hromadné balenie; 35 % recyklovaných plastov od spotrebiteľov; 30 % plastov, ktoré by inak skončili v oceáne; 90 % recyklovaného kovu; 50 % plastov v puzdre ventilátora, ktoré by inak skončili v oceáne; 100 % papierových obalov HP pochádza z recyklovaných alebo certifikovaných udržateľných zdrojov&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Pamäť&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;16 GB pamäte LPDDR5x-8533 MT/s (na doske) Rýchlosť prenosu dát až 8 533 MT/s.&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Popis pevného disku&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;512 GB jednotka PCIe Gen4 NVMe™ TLC SSD&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Obrazovka&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;14\" diagonal WUXGA display&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Obrazovka&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;14\" diagonal, WUXGA (1920 x 1200), IPS, anti-glare, 400 nits, 100% sRGB with HP Eye Ease Antireflexný displej IPS s uhlopriečkou 35,6 cm (14\"), jasom 400 nitov, 100 % pokrytím škály sRGB, funkciou HP Eye Ease a rozlíšením WUXGA (1920 x 1200) [16,17,18,19]&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Grafická karta (integrovaná)&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Grafika Intel Arc™&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Grafika&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Integrovaná Grafika Intel Arc™&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Fotoaparát&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;5 Mpx infračervená kamera s AI&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Klávesnica&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Klávesnica HP Premium – odolná voči poliatiu, modrá, podsvietená, s klávesmi DuraKeys&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Polohovacie zariadenie&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Clickpad s podporou multidotykových gest&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Zvuk&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Zvuk od spoločnosti Poly Studio, štyri stereofónne reproduktory so samostatnými zosilňovačmi, sústava dvoch integrovaných mikrofónov&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Polohovacie zariadenie&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Clickpad s podporou multidotykových gest&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Bezdrôtová&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Bezdrôtová karta Intel Wi-Fi 7 BE201 (2 x 2) a Bluetooth 5.4&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Minimálne rozmery (š x h x v)&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;31,39 x 21,99 x 1,05 cm (predná strana); 31,39 x 21,99 x 1,49 cm (zadná strana)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Rozmery (Š x H x V) poznámka&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Predná výška sa meria blízko predného okraja, kde sa začína zužovanie spodného krytu šasi. Zadná výška sa meria blízko zadného okraja, kde sa končí zužovanie spodného krytu šasi.&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Hmotnosť&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Od 1,18 kg&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Poznámky k hmotnosti (metrické)&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Hmotnosť sa líši v závislosti od konfigurácie. Nezahŕňa napájací adaptér.&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Typ batérie&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;6-článková lítium-iónová polymérová batéria HP s dlhou výdržou, 68 Wh&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Štítky ekologickej bezpečnosti&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Certifikácia TCO&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Napájanie&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;65 W tenký napájací adaptér HP USB Type-C GaN&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Záruka&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;1-ročná (1/1/0) obmedzená záruka pokrýva náklady na diely a prácu počas 1 roka. Nevzťahuje sa na opravu na mieste. Zmluvné podmienky sa v jednotlivých krajinách líšia. Platia určité obmedzenia a výnimky.&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Vrátane služby podpory&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;3-r. podpora HP pre NB na mieste. Zmluvné podmienky nájdete na stránke https://h20195.www2.hp.com/v2/GetPDF.aspx/4AA8-2300SKE &amp; https://www8.hp.com/h20195/v2/getpdf.aspx/4AA5-7123SKE.pdf&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;/div&gt;&lt;/div&gt; &lt;h2 class=\"text-primary cross-sell_group\"&gt;Poznámky&lt;/h2&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[1] Niektoré funkcie nemusia byť k dispozícii vo všetkých vydaniach alebo verziách systému Windows. Na využívanie všetkých funkcií systému Windows môžu systémy vyžadovať inovovaný alebo samostatne zakúpený hardvér, ovládače, softvér alebo aktualizáciu systému BIOS. Aktualizácia systému Windows 11 prebieha automaticky a je vždy povolená. Vyžaduje sa vysokorýchlostný internet a konto Microsoft. Poskytovateľ internetových služieb si môže účtovať poplatky a na aktualizácie sa časom môžu vzťahovať ďalšie požiadavky. Pozri http://www.windows.com.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[2] Viacjadrová architektúra pomáha zvýšiť výkon niektorých softvérových produktov. Prínos tejto technológie nemusia využiť všetci používatelia ani všetky softvérové aplikácie. Výkon a taktovacia frekvencia závisia od záťažového profilu konkrétnej aplikácie, ako aj hardvérovej a softvérovej konfigurácie. Číselné označenie, značka alebo názov produktu spoločnosti Intel neoznačuje mieru výkonnosti.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[3] Funkcie a softvér, ktoré vyžadujú NPU, môžu vyžadovať nákup, predplatné alebo povolenie poskytovateľom softvéru alebo platformy a softvér tretích strán môže mať špecifické požiadavky na konfiguráciu alebo kompatibilitu. Potenciálny výkon pri odvodzovaní NPU sa líši v závislosti od používania, konfigurácie a ďalších faktorov.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[4] Riešenia nezávislých dodávateľov softvéru sa predávajú samostatne a môžu vyžadovať predplatné a jednotku NPU.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[5] Vyžaduje sa aplikácia HP a operačný systém Windows. AI Magic Background beží na GPU pri prvom generovaní pozadia v aplikácii Poly Camera Pro. Jednotka NPU sa používa na streamovanie upraveného pozadia v aplikáciách na spoluprácu.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[10] Môže sa vyžadovať stiahnutie služby Windows Update alebo aplikácie z obchodu Microsoft Store. Microsoft Copilot NIE JE k dispozícii v Číne, Rusku, Bielorusku a regiónoch, na ktoré je uvalené embargo - Kuba, Irán, Severná Kórea a Krym.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[11] HP Wolf Security for Business vyžaduje systém Windows 10, 11 Pro alebo novší, zahŕňa rôzne funkcie zabezpečenia od spoločnosti HP a je k dispozícii v produktoch HP Pro, Elite, Workstation a RPOS. Funkcie zabezpečenia nájdete v podrobných informáciách o produkte.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt; &lt;h2 class=\"text-primary cross-sell_group\"&gt;Právne upozornenie&lt;/h2&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[6] Niektoré funkcie nemusia byť k dispozícii vo všetkých vydaniach alebo verziách systému Windows. Na využívanie všetkých funkcií systému Windows môžu systémy vyžadovať inovovaný alebo samostatne zakúpený hardvér, ovládače, softvér alebo aktualizáciu systému BIOS. Aktualizácia systému Windows 11 prebieha automaticky a je vždy povolená. Poskytovateľ internetových služieb si môže účtovať poplatky a na aktualizácie sa časom môžu vzťahovať ďalšie požiadavky. Viď http://www.windows.com. Microsoft Copilot vyžaduje systém Windows 11. Niektoré funkcie vyžadujú jednotku NPU. Načasovanie a dostupnosť budú závisieť od spoločnosti Microsoft a líšia sa v závislosti od trhu a zariadenia. Vyžaduje sa konto Microsoft na prihlásenie. Ak funkcia Copilot nie je k dispozícii, kláves Copilot smeruje do vyhľadávacieho nástroja Bing. Viď http://aka.ms/WindowsAIFeatures.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[7] Technológia viacerých jadier je navrhnutá na zvýšenie výkonu niektorých softvérových produktov. Prínos tejto technológie nemusia nevyhnutne pocítiť všetci zákazníci ani všetky softvérové aplikácie. Výkon a taktovacia frekvencia sa líšia v závislosti od záťažového profilu konkrétnej aplikácie, ako aj hardvérovej a softvérovej konfigurácie. Číselné označenie, značka alebo názov produktu spoločnosti Intel neoznačuje mieru výkonnosti. Funkcie a softvér, ktoré vyžadujú aktualizáciu NPU, môžu vyžadovať nákup, predplatné alebo povolenie softvéru poskytovateľom softvéru alebo platformy a softvér tretích strán môže mať špecifické požiadavky na konfiguráciu alebo kompatibilitu. Výkon sa líši v závislosti od používania, konfigurácie a ďalších faktorov. Riešenia nezávislých dodávateľov softvéru sa predávajú samostatne a môžu vyžadovať predplatné a jednotku NPU.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[8] Vyžaduje sa bezdrôtový prístupový bod a služba pripojenia na internet (predávajú sa samostatne). Dostupnosť verejných bezdrôtových prístupových bodov je obmedzená. Funkcia Wi-Fi 7 (802.11BE) vyžaduje kompatibilný operačný systém Windows 11, kompatibilný procesor a samostatne zakúpený smerovač Wi-Fi 7 na podporu spätnej kompatibility s predchádzajúcimi špecifikáciami 802.11. K dispozícii je len v krajinách, v ktorých je podporovaná sieť Wi-Fi 7. Parametre štandardu 802.11BE sú len orientačné a nie sú konečné. Ak sa budú konečné parametre odlišovať od orientačných parametrov, môže to ovplyvniť schopnosť zariadenia komunikovať s inými zariadeniami pomocou štandardu 802.11BE. Pripojenie Wi-Fi s podporou gigabitových rýchlostí prenosu údajov možno dosiahnuť v sieti Wi-Fi 7 (802.11BE) pri prenose súborov medzi dvoma zariadeniami pripojenými k rovnakému smerovaču.?Vyžaduje sa samostatne predávaný bezdrôtový smerovač podporujúci kanály 160 MHz.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[9] HP Sure Click vyžaduje systém Windows 10 alebo novší. Všetky podrobnosti nájdete na stránke https://bit.ly/2PrLT6A_SureClick.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[12] HP Sure Sense je k dispozícii vo vybraných počítačoch HP s operačným systémom Windows 10 Pro, Windows 10 Enterprise, Windows 11 Pro alebo Windows 11 Enterprise.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[13] Riešenie HP Sure Start Gen7 je k dispozícii vo vybraných počítačoch HP a vyžaduje systém Windows 10 Pro alebo novší.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[14] Aplikácia HP AI Companion je na vybraných počítačoch HP AI novej generácie predinštalovaná alebo k dispozícii na stiahnutie z obchodu Microsoft Store. Vyžaduje počítač HP AI novej generácie s jednotkou NPU podporujúcou 40 až 60 biliónov operácií za sekundu a systém Windows 11. Výkon vyžaduje konto nastavené do 30 dní od spustenia alebo registrácie počítača prostredníctvom aplikácie HP AI Companion. Niektoré funkcie vyžadujú, aby zákazník nahral lokálne údaje. Päť (5) knižníc s limitom 100 MB, podporované súbory sa môžu líšiť a pri spustení zahŕňajú súbory .pdf, .txt a .docx.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[16] Vyžaduje sa aplikácia myHP a operačný systém Windows. HP Power Manager vyžaduje systém Windows 10 a vyšší. Dá sa stiahnuť v obchode Microsoft Store.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[15] Dostupnosť softvéru Poly je naplánovaná na leto 2024. Vyžaduje sa operačný systém Windows.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;",
    "supplierDescription": "&lt;h2 class=\"text-primary cross-sell_group\"&gt;HP EliteBook X G1i 14 inch Notebook Next Gen AI PC&lt;/h2&gt;&lt;div class=\"tpl-product-detail-desc\"&gt;&lt;div class=\"box-in\"&gt;&lt;div class=\"row\"&gt;&lt;p&gt;Notebooky HP Elite poskytujú výkonné, mimoriadne bezpečné a spravovateľné riešenia pre náročné pracovné postupy. Tento rad nádherne navrhnutých firemných produktov si môžete ľahko nosiť so sebou.&lt;/p&gt;&lt;/div&gt;&lt;div class=\"row\"&gt;&lt;figure class=\"box-img\"&gt;&lt;img src=\"https://c.edsystem.cz/IMGCACHE/_1752/1752520_0c_3.jpg\" alt=\"Right facing\"&gt;&lt;/figure&gt;&lt;div class=\"desc\"&gt;&lt;h2&gt;Spoločnosť HP odporúča systém Windows 11 Pro&lt;/h2&gt;&lt;p&gt;Zhrňte a prepíšte obsah, získajte relevantné odporúčania a zachovajte si prehľad pomocou funkcie Microsoft Copilot. [10]&lt;/p&gt;&lt;/div&gt;&lt;/div&gt;&lt;div class=\"row\"&gt;&lt;figure class=\"box-img\"&gt;&lt;img src=\"https://c.edsystem.cz/IMGCACHE/_1752/1752520_0f_3.jpg\" alt=\"Left facing\"&gt;&lt;/figure&gt;&lt;div class=\"desc\"&gt;&lt;h2&gt;Spoločnosť Intel poháňa počítače novej generácie s umelou inteligenciou&lt;/h2&gt;&lt;p&gt;Uvoľnite si čas a sústreďte sa na to, na čom záleží, s najnovším procesorom Intel Core™ Ultra s jednotkou NPU. [2,3]&lt;/p&gt;&lt;/div&gt;&lt;/div&gt;&lt;div class=\"row\"&gt;&lt;figure class=\"box-img\"&gt;&lt;img src=\"https://c.edsystem.cz/IMGCACHE/_1752/1752520_0a_3.jpg\" alt=\"Center facing\"&gt;&lt;/figure&gt;&lt;div class=\"desc\"&gt;&lt;h2&gt;Dlhá výdrž batérie&lt;/h2&gt;&lt;p&gt;Urob viac medzi nabíjaniami vďaka výdrži batérie, ktorú efektívne spravuje umelá inteligencia novej generácie. [3]&lt;/p&gt;&lt;/div&gt;&lt;/div&gt;&lt;div class=\"row\"&gt;&lt;div class=\"desc\"&gt;&lt;h2&gt;Chránené aplikáciou HP Wolf Security&lt;/h2&gt;&lt;p&gt;HP Wolf Security for Business vytvára hardvérom vynucovanú pružnú obranu, ktorá je vždy zapnutá. [11]&lt;/p&gt;&lt;/div&gt;&lt;/div&gt;&lt;div class=\"row\"&gt;&lt;div class=\"desc\"&gt;&lt;h2&gt;5 MP kamera&lt;/h2&gt;&lt;p&gt;Zostaňte sústredení a schopní priniesť si na každé stretnutie to najlepšie s fotoaparátom Poly Camera Pro.[5]&lt;/p&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;h2 class=\"text-primary cross-sell_group\"&gt;Parametre&lt;/h2&gt; &lt;div class=\"wrap-overflow-table\"&gt;&lt;div class=\"wrap-overflow-table_in\"&gt;&lt;table class=\"table\"&gt;&lt;tbody&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;Funkcie systému&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Operačný systém&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Windows 11 Pro&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Skupina procesora&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Procesor Intel Core™ Ultra 5&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Procesor&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Procesor Intel Core™ Ultra 5 226V (max. 4,5 GHz s technológiou Intel Turbo Boost, vyrovnávacia pamäť L3 8 MB, 8 jadier, 8 vlákien)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Špecifikácie trvalej udržateľnosti&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Nízky obsah halogenidov; K dispozícii je hromadné balenie; 35 % recyklovaných plastov od spotrebiteľov; 30 % plastov, ktoré by inak skončili v oceáne; 90 % recyklovaného kovu; 50 % plastov v puzdre ventilátora, ktoré by inak skončili v oceáne; 100 % papierových obalov HP pochádza z recyklovaných alebo certifikovaných udržateľných zdrojov&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Pamäť&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;16 GB pamäte LPDDR5x-8533 MT/s (na doske) Rýchlosť prenosu dát až 8 533 MT/s.&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Popis pevného disku&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;512 GB jednotka PCIe Gen4 NVMe™ TLC SSD&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Obrazovka&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;14\" diagonal WUXGA display&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Obrazovka&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;14\" diagonal, WUXGA (1920 x 1200), IPS, anti-glare, 400 nits, 100% sRGB with HP Eye Ease Antireflexný displej IPS s uhlopriečkou 35,6 cm (14\"), jasom 400 nitov, 100 % pokrytím škály sRGB, funkciou HP Eye Ease a rozlíšením WUXGA (1920 x 1200) [16,17,18,19]&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Grafická karta (integrovaná)&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Grafika Intel Arc™&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Grafika&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Integrovaná Grafika Intel Arc™&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Fotoaparát&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;5 Mpx infračervená kamera s AI&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Klávesnica&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Klávesnica HP Premium – odolná voči poliatiu, modrá, podsvietená, s klávesmi DuraKeys&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Polohovacie zariadenie&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Clickpad s podporou multidotykových gest&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Zvuk&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Zvuk od spoločnosti Poly Studio, štyri stereofónne reproduktory so samostatnými zosilňovačmi, sústava dvoch integrovaných mikrofónov&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Polohovacie zariadenie&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Clickpad s podporou multidotykových gest&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Bezdrôtová&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Bezdrôtová karta Intel Wi-Fi 7 BE201 (2 x 2) a Bluetooth 5.4&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Minimálne rozmery (š x h x v)&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;31,39 x 21,99 x 1,05 cm (predná strana); 31,39 x 21,99 x 1,49 cm (zadná strana)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Rozmery (Š x H x V) poznámka&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Predná výška sa meria blízko predného okraja, kde sa začína zužovanie spodného krytu šasi. Zadná výška sa meria blízko zadného okraja, kde sa končí zužovanie spodného krytu šasi.&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Hmotnosť&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Od 1,18 kg&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Poznámky k hmotnosti (metrické)&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Hmotnosť sa líši v závislosti od konfigurácie. Nezahŕňa napájací adaptér.&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Typ batérie&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;6-článková lítium-iónová polymérová batéria HP s dlhou výdržou, 68 Wh&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Štítky ekologickej bezpečnosti&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Certifikácia TCO&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Napájanie&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;65 W tenký napájací adaptér HP USB Type-C GaN&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Záruka&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;1-ročná (1/1/0) obmedzená záruka pokrýva náklady na diely a prácu počas 1 roka. Nevzťahuje sa na opravu na mieste. Zmluvné podmienky sa v jednotlivých krajinách líšia. Platia určité obmedzenia a výnimky.&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Vrátane služby podpory&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;3-r. podpora HP pre NB na mieste. Zmluvné podmienky nájdete na stránke https://h20195.www2.hp.com/v2/GetPDF.aspx/4AA8-2300SKE &amp; https://www8.hp.com/h20195/v2/getpdf.aspx/4AA5-7123SKE.pdf&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;/div&gt;&lt;/div&gt; &lt;h2 class=\"text-primary cross-sell_group\"&gt;Poznámky&lt;/h2&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[1] Niektoré funkcie nemusia byť k dispozícii vo všetkých vydaniach alebo verziách systému Windows. Na využívanie všetkých funkcií systému Windows môžu systémy vyžadovať inovovaný alebo samostatne zakúpený hardvér, ovládače, softvér alebo aktualizáciu systému BIOS. Aktualizácia systému Windows 11 prebieha automaticky a je vždy povolená. Vyžaduje sa vysokorýchlostný internet a konto Microsoft. Poskytovateľ internetových služieb si môže účtovať poplatky a na aktualizácie sa časom môžu vzťahovať ďalšie požiadavky. Pozri http://www.windows.com.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[2] Viacjadrová architektúra pomáha zvýšiť výkon niektorých softvérových produktov. Prínos tejto technológie nemusia využiť všetci používatelia ani všetky softvérové aplikácie. Výkon a taktovacia frekvencia závisia od záťažového profilu konkrétnej aplikácie, ako aj hardvérovej a softvérovej konfigurácie. Číselné označenie, značka alebo názov produktu spoločnosti Intel neoznačuje mieru výkonnosti.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[3] Funkcie a softvér, ktoré vyžadujú NPU, môžu vyžadovať nákup, predplatné alebo povolenie poskytovateľom softvéru alebo platformy a softvér tretích strán môže mať špecifické požiadavky na konfiguráciu alebo kompatibilitu. Potenciálny výkon pri odvodzovaní NPU sa líši v závislosti od používania, konfigurácie a ďalších faktorov.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[4] Riešenia nezávislých dodávateľov softvéru sa predávajú samostatne a môžu vyžadovať predplatné a jednotku NPU.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[5] Vyžaduje sa aplikácia HP a operačný systém Windows. AI Magic Background beží na GPU pri prvom generovaní pozadia v aplikácii Poly Camera Pro. Jednotka NPU sa používa na streamovanie upraveného pozadia v aplikáciách na spoluprácu.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[10] Môže sa vyžadovať stiahnutie služby Windows Update alebo aplikácie z obchodu Microsoft Store. Microsoft Copilot NIE JE k dispozícii v Číne, Rusku, Bielorusku a regiónoch, na ktoré je uvalené embargo - Kuba, Irán, Severná Kórea a Krym.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[11] HP Wolf Security for Business vyžaduje systém Windows 10, 11 Pro alebo novší, zahŕňa rôzne funkcie zabezpečenia od spoločnosti HP a je k dispozícii v produktoch HP Pro, Elite, Workstation a RPOS. Funkcie zabezpečenia nájdete v podrobných informáciách o produkte.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt; &lt;h2 class=\"text-primary cross-sell_group\"&gt;Právne upozornenie&lt;/h2&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[6] Niektoré funkcie nemusia byť k dispozícii vo všetkých vydaniach alebo verziách systému Windows. Na využívanie všetkých funkcií systému Windows môžu systémy vyžadovať inovovaný alebo samostatne zakúpený hardvér, ovládače, softvér alebo aktualizáciu systému BIOS. Aktualizácia systému Windows 11 prebieha automaticky a je vždy povolená. Poskytovateľ internetových služieb si môže účtovať poplatky a na aktualizácie sa časom môžu vzťahovať ďalšie požiadavky. Viď http://www.windows.com. Microsoft Copilot vyžaduje systém Windows 11. Niektoré funkcie vyžadujú jednotku NPU. Načasovanie a dostupnosť budú závisieť od spoločnosti Microsoft a líšia sa v závislosti od trhu a zariadenia. Vyžaduje sa konto Microsoft na prihlásenie. Ak funkcia Copilot nie je k dispozícii, kláves Copilot smeruje do vyhľadávacieho nástroja Bing. Viď http://aka.ms/WindowsAIFeatures.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[7] Technológia viacerých jadier je navrhnutá na zvýšenie výkonu niektorých softvérových produktov. Prínos tejto technológie nemusia nevyhnutne pocítiť všetci zákazníci ani všetky softvérové aplikácie. Výkon a taktovacia frekvencia sa líšia v závislosti od záťažového profilu konkrétnej aplikácie, ako aj hardvérovej a softvérovej konfigurácie. Číselné označenie, značka alebo názov produktu spoločnosti Intel neoznačuje mieru výkonnosti. Funkcie a softvér, ktoré vyžadujú aktualizáciu NPU, môžu vyžadovať nákup, predplatné alebo povolenie softvéru poskytovateľom softvéru alebo platformy a softvér tretích strán môže mať špecifické požiadavky na konfiguráciu alebo kompatibilitu. Výkon sa líši v závislosti od používania, konfigurácie a ďalších faktorov. Riešenia nezávislých dodávateľov softvéru sa predávajú samostatne a môžu vyžadovať predplatné a jednotku NPU.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[8] Vyžaduje sa bezdrôtový prístupový bod a služba pripojenia na internet (predávajú sa samostatne). Dostupnosť verejných bezdrôtových prístupových bodov je obmedzená. Funkcia Wi-Fi 7 (802.11BE) vyžaduje kompatibilný operačný systém Windows 11, kompatibilný procesor a samostatne zakúpený smerovač Wi-Fi 7 na podporu spätnej kompatibility s predchádzajúcimi špecifikáciami 802.11. K dispozícii je len v krajinách, v ktorých je podporovaná sieť Wi-Fi 7. Parametre štandardu 802.11BE sú len orientačné a nie sú konečné. Ak sa budú konečné parametre odlišovať od orientačných parametrov, môže to ovplyvniť schopnosť zariadenia komunikovať s inými zariadeniami pomocou štandardu 802.11BE. Pripojenie Wi-Fi s podporou gigabitových rýchlostí prenosu údajov možno dosiahnuť v sieti Wi-Fi 7 (802.11BE) pri prenose súborov medzi dvoma zariadeniami pripojenými k rovnakému smerovaču.?Vyžaduje sa samostatne predávaný bezdrôtový smerovač podporujúci kanály 160 MHz.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[9] HP Sure Click vyžaduje systém Windows 10 alebo novší. Všetky podrobnosti nájdete na stránke https://bit.ly/2PrLT6A_SureClick.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[12] HP Sure Sense je k dispozícii vo vybraných počítačoch HP s operačným systémom Windows 10 Pro, Windows 10 Enterprise, Windows 11 Pro alebo Windows 11 Enterprise.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[13] Riešenie HP Sure Start Gen7 je k dispozícii vo vybraných počítačoch HP a vyžaduje systém Windows 10 Pro alebo novší.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[14] Aplikácia HP AI Companion je na vybraných počítačoch HP AI novej generácie predinštalovaná alebo k dispozícii na stiahnutie z obchodu Microsoft Store. Vyžaduje počítač HP AI novej generácie s jednotkou NPU podporujúcou 40 až 60 biliónov operácií za sekundu a systém Windows 11. Výkon vyžaduje konto nastavené do 30 dní od spustenia alebo registrácie počítača prostredníctvom aplikácie HP AI Companion. Niektoré funkcie vyžadujú, aby zákazník nahral lokálne údaje. Päť (5) knižníc s limitom 100 MB, podporované súbory sa môžu líšiť a pri spustení zahŕňajú súbory .pdf, .txt a .docx.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[16] Vyžaduje sa aplikácia myHP a operačný systém Windows. HP Power Manager vyžaduje systém Windows 10 a vyšší. Dá sa stiahnuť v obchode Microsoft Store.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[15] Dostupnosť softvéru Poly je naplánovaná na leto 2024. Vyžaduje sa operačný systém Windows.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;",
    "seoTitle": "HP NTB EliteBook X G1i U5-226V 40TOPS 14\"WUXGA 1920x1200 400 IR, 16GB, 512GB TLC, 68WHr, Win11Pro, EVO, 3y onst | Worlds.sk",
    "seoDescription": "Kúpiť HP NTB EliteBook X G1i U5-226V 40TOPS 14\"WUXGA 1920x1200 400 IR, 16GB, 512GB TLC, 68WHr, Win11Pro, EVO, 3y onst (PartNumber: B9ZV0ET#BCM) za výhodnú cenu 2159.09 € s expresným doručením z centrálneho skladu na Worlds.sk.",
    "searchKeywords": [
      "hp",
      "b9zv0et#bcm",
      "firemne-notebooky"
    ],
    "pricing": {
      "supplierCost": 1606.46,
      "supplierFees": {
        "garbageFee": 0.42,
        "authorFee": 6.04
      },
      "totalCostWithFees": 1606.46,
      "vatRate": 20,
      "marginPercentage": 12,
      "basePrice": 1799.24,
      "finalPrice": 2159.09,
      "currency": "EUR"
    },
    "stockCount": 4,
    "isInStock": true,
    "stockText": "Skladom > 4 ks",
    "warrantyMonths": 24,
    "attributes": {
      "brand": {
        "code": "brand",
        "name": "Výrobca",
        "value": "HP",
        "rawValue": "HP"
      },
      "mpn": {
        "code": "mpn",
        "name": "Part Number",
        "value": "B9ZV0ET#BCM",
        "rawValue": "B9ZV0ET#BCM"
      },
      "warranty": {
        "code": "warranty",
        "name": "Záruka",
        "value": "24 mesiacov",
        "rawValue": "24"
      }
    },
    "images": [
      {
        "id": "img-1519429",
        "url": "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80",
        "position": 0,
        "isPrimary": true,
        "altText": "HP NTB EliteBook X G1i U5-226V 40TOPS 14\"WUXGA 1920x1200 400 IR, 16GB, 512GB TLC, 68WHr, Win11Pro, EVO, 3y onst"
      }
    ],
    "status": "ACTIVE",
    "reviewStatus": "AUTO_APPROVED",
    "qualityScore": {
      "total": 90,
      "breakdown": {
        "hasEan": true,
        "hasBrand": true,
        "hasMpn": true,
        "hasValidCategory": true,
        "hasImages": true,
        "hasAttributes": true,
        "hasDescription": true,
        "hasSeoMetadata": true,
        "hasPrice": true,
        "hasStock": true
      }
    },
    "dataHash": "hash_1519429_1606.46_4",
    "lastSyncedAt": "2026-09-01T15:48:11.559Z",
    "lastReprocessedAt": "2026-09-01T15:48:11.559Z",
    "createdAt": "2026-09-01T15:48:11.559Z",
    "updatedAt": "2026-09-01T15:48:11.559Z"
  },
  {
    "id": "ed-1519431",
    "supplierCode": "1519431",
    "sku": "1519431",
    "mpn": "B9ZV2ET#BCM",
    "ean": "198990891170",
    "brand": "HP",
    "categorySlug": "firemne-notebooky",
    "categoryHierarchy": [
      "Počítače a notebooky",
      "Notebooky",
      "Firemné a pracovné notebooky"
    ],
    "title": "HP NTB EliteBook X G1a R7-360PRO 50TOPS 14\"WUXGA 1920x1200 400 IR, 32GB, 1TB TLC, 74WHr, Win11Pro, 3y onsite",
    "slug": "hp-ntb-elitebook-x-g1a-r7-360pro-50tops-14-wuxga-1920x1200-400-ir-32gb-1tb-tlc-74whr-win11pro-3y-onsite-1519431",
    "shortDescription": "&lt;h2 class=\"text-primary cross-sell_group\"&gt;14\" notebook HP EliteBook X G1a Next Gen AI&lt;/h2&gt;&lt;div class=\"tpl-product-detail-desc\"&gt;&lt;div class=\"box-in\"&gt;&lt;div class=\"row\"&gt;&lt;p&gt;Notebooky HP EliteBook AI sú vynikajúco pripravené na využívanie umelej inteligencie na náročné pracovné postupy a ľahko ich môžete všade nosiť so sebou.&lt;/p&gt;&lt;/div&gt;&lt;div class=\"row\"&gt;&lt;figure class=\"box-img\"&gt;&lt;img src=\"https://c.edsystem.cz/IMGCACHE/_1752/1752523_0d_3.jpg\" alt=\"Right facing\"&gt;&lt;/figure&gt;&lt;div class=\"desc\"&gt;&lt;h2&gt;Spoločnosť HP odporúča systém Windows 11 Pro&lt;/h2&gt;&lt;p&gt;Zhrňte a prepíšte obsah, získajte relevantné odporúčania a zachovajte si prehľad pomocou funkcie Microsoft Copilot. [7]&lt;/p&gt;&lt;/div&gt;&lt;/div&gt;&lt;div class=\"row\"&gt;&lt;figure class=\"box-img\"&gt;&lt;img src=\"https://c.edsystem.cz/IMGCACHE/_1752/1752523_0e_3.jpg\" alt=\"Left facing\"&gt;&lt;/figure&gt;&lt;div class=\"desc\"&gt;&lt;h2&gt;Veliaci procesor AMD&lt;/h2&gt;&lt;p&gt;Rozvíjajte inovatívne nápady s bleskurýchlym procesorom AMD Ryzen™ a jednotkou NPU s výkonom až 55 tops. [2,3]&lt;/p&gt;&lt;/div&gt;&lt;/div&gt;&lt;div class=\"row\"&gt;&lt;figure class=\"box-img\"&gt;&lt;img src=\"https://c.edsystem.cz/IMGCACHE/_1752/1752523_0a_3.jpg\" alt=\"Center facing\"&gt;&lt;/figure&gt;&lt;div class=\"desc\"&gt;&lt;h2&gt;Dlhá výdrž batérie&lt;/h2&gt;&lt;p&gt;HP Smart Sense[8] udržuje počítač chladný a tichý a adaptívne stmievanie[9] pomáha šetriť výdrž batérie.&lt;/p&gt;&lt;/div&gt;&lt;/div&gt;&lt;div class=\"row\"&gt;&lt;div class=\"desc\"&gt;&lt;h2&gt;Chránené aplikáciou HP Wolf Security&lt;/h2&gt;&lt;p&gt;HP Wolf Security for Business vytvára hardvérom vynucovanú pružnú obranu, ktorá je stále zapnutá. [10]&lt;/p&gt;&lt;/div&gt;&lt;/div&gt;&lt;div class=\"row\"&gt;&lt;div class=\"desc\"&gt;&lt;h2&gt;5 MP kamera&lt;/h2&gt;&lt;p&gt;Zostaňte sústredení a pripavení na každé stretnutie s najlepšou 5 Mpx kamerou a softvérom Poly Camera Pro.[4]&lt;/p&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;h2 class=\"text-primary cross-sell_group\"&gt;Parametre&lt;/h2&gt; &lt;div class=\"wrap-overflow-table\"&gt;&lt;div class=\"wrap-overflow-table_in\"&gt;&lt;table class=\"table\"&gt;&lt;tbody&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;Funkcie systému&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Operačný systém&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Windows 11 Pro&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Skupina procesora&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Procesor AMD Ryzen™ AI 7 PRO&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Procesor&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;AMD Ryzen™ AI 7 PRO 360 (max. zvýšená frekvencia 5,0 GHz, vyrovnávacia pamäť 16 MB L3 , 8 jadier, 16 vlákien)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Špecifikácie trvalej udržateľnosti&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Nízky obsah halogenidov; Výplň z lisovanej papierovej drviny je recyklovateľná a 100 % z nej pochádza z trvalo udržateľných zdrojov; Vonkajšia škatuľa a lepenkové výplne sú recyklovateľné a 100 % z nich pochádza z trvalo udržateľných zdrojov; 20 % recyklovaných plastov od spotrebiteľov; Puzdrá reproduktorov obsahujú plasty, ktoré by inak skončili v oceáne; Minimálne 35 % recyklovaného kovu&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Pamäť&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;32 GB pamäte LPDDR5x-8533 MT/s (na doske) Rýchlosť prenosu dát až 8 533 MT/s.&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Popis pevného disku&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;1 TB jednotka PCIe Gen4 NVMe™ TLC M.2 SSD&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Obrazovka&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;14\" diagonal WUXGA display&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Obrazovka&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;14\" diagonal, WUXGA (1920 x 1200), IPS, anti-glare, 400 nits, 100% sRGB Antireflexný displej IPS s uhlopriečkou 35,6 cm (14\"), jasom 400 nitov, 100 % pokrytím škály sRGB a rozlíšením WUXGA (1920 x 1200) [10,11,12,13]&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Grafická karta (integrovaná)&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Grafická karta AMD Radeon™ 880M&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Grafika&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Integrovaná Grafická karta AMD Radeon™ 880M&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Fotoaparát&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;5 Mpx infračervená kamera s AI&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Klávesnica&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Klávesnica HP Premium – odolná voči poliatiu, jemná sivá, podsvietená&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Polohovacie zariadenie&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Clickpad s podporou multidotykových gest, ťuknutia predvolene zapnuté&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Zvuk&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Zvuk od spoločnosti Poly Studio, štyri stereofónne reproduktory so samostatnými zosilňovačmi, sústava dvoch integrovaných mikrofónov&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Polohovacie zariadenie&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Clickpad s podporou multidotykových gest, ťuknutia predvolene zapnuté&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Bezdrôtová&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Bezdrôtová karta MediaTek Wi-Fi 7 MT7925 (2 x 2) a Bluetooth 5.4&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Minimálne rozmery (š x h x v)&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;31,22 x 21,46 x 0,92 cm (predná strana); 31,22 x 21,46 x 1,31 cm (zadná strana)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Rozmery (Š x H x V) poznámka&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Predná výška sa meria blízko predného okraja, kde sa začína zužovanie spodného krytu šasi. Zadná výška sa meria blízko zadného okraja, kde sa končí zužovanie spodného krytu šasi.&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Hmotnosť&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Už od hmotnosti 1,49 kg&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Poznámky k hmotnosti (metrické)&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Hmotnosť sa líši v závislosti od konfigurácie. Nezahŕňa napájací adaptér.&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Typ batérie&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;4-článková, lítium-iónová polymérová batéria HP s extra dlhou výdržou (74,5 Wh)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Štítky ekologickej bezpečnosti&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Certifikácia TCO&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Napájanie&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Tenký 100 W adaptér HP USB Type-C&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Záruka&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;1-ročná (1/1/0) obmedzená záruka pokrýva náklady na diely a prácu počas 1 roka. Nevzťahuje sa na opravu na mieste. Zmluvné podmienky sa v jednotlivých krajinách líšia. Platia určité obmedzenia a výnimky.&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Vrátane služby podpory&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;3-r. podpora HP pre NB na mieste. Zmluvné podmienky nájdete na stránke https://h20195.www2.hp.com/v2/GetPDF.aspx/4AA8-2300SKE &amp; https://www8.hp.com/h20195/v2/getpdf.aspx/4AA5-7123SKE.pdf&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;/div&gt;&lt;/div&gt; &lt;h2 class=\"text-primary cross-sell_group\"&gt;Poznámky&lt;/h2&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[1] Niektoré funkcie nemusia byť k dispozícii vo všetkých vydaniach alebo verziách systému Windows. Na využívanie všetkých funkcií systému Windows môžu systémy vyžadovať inovovaný alebo samostatne zakúpený hardvér, ovládače, softvér alebo aktualizáciu systému BIOS. Aktualizácia systému Windows 11 prebieha automaticky a je vždy povolená. Vyžaduje sa vysokorýchlostný internet a konto Microsoft. Poskytovateľ internetových služieb si môže účtovať poplatky a na aktualizácie sa časom môžu vzťahovať ďalšie požiadavky. Pozri http://www.windows.com.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[2] Technológia viacerých jadier je navrhnutá na zvýšenie výkonu niektorých softvérových produktov. Prínos tejto technológie nemusia nevyhnutne pocítiť všetci zákazníci ani všetky softvérové aplikácie. Výkon a taktovacia frekvencia sa líšia v závislosti od záťažového profilu konkrétnej aplikácie, ako aj hardvérovej a softvérovej konfigurácie. Číselné označenie AMD neoznačuje taktovaciu frekvenciu.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[3] Funkcie a softvér, ktoré vyžadujú NPU, môžu vyžadovať nákup, predplatné alebo povolenie poskytovateľom softvéru alebo platformy a softvér tretích strán môže mať špecifické požiadavky na konfiguráciu alebo kompatibilitu. Potenciálny výkon pri odvodzovaní NPU sa líši v závislosti od používania, konfigurácie a ďalších faktorov.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[4] Vyžaduje sa aplikácia myHP a operačný systém Windows.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[7] Môže sa vyžadovať služba Windows Update alebo stiahnutie aplikácie z obchodu Microsoft Store. Microsoft Copilot NIE JE k dispozícii v Číne, Rusku, Bielorusku a regiónoch, na ktoré je uvalené embargo - Kuba, Irán, Severná Kórea a Krym.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[8] Smart Sense vyžaduje aplikáciu HP a operačný systém Windows 11. Funkcie sa môžu líšiť v závislosti od platformy.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[9] Adaptívne stmievanie funguje iba pri otvorenom kryte kamery.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[10] HP Wolf Security for Business vyžaduje systém Windows 10, 11 Pro alebo novší, zahŕňa rôzne funkcie zabezpečenia od spoločnosti HP a je k dispozícii v produktoch HP Pro, Elite, Workstation a RPOS. Funkcie zabezpečenia nájdete v podrobných informáciách o produkte.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt; &lt;h2 class=\"text-primary cross-sell_group\"&gt;Právne upozornenie&lt;/h2&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[5] Niektoré funkcie nemusia byť k dispozícii vo všetkých vydaniach alebo verziách systému Windows. Na využívanie všetkých funkcií systému Windows môžu systémy vyžadovať inovovaný alebo samostatne zakúpený hardvér, ovládače, softvér alebo aktualizáciu systému BIOS. Aktualizácia systému Windows 11 prebieha automaticky a je vždy povolená. Poskytovateľ internetových služieb si môže účtovať poplatky a na aktualizácie sa časom môžu vzťahovať ďalšie požiadavky. Viď http://www.windows.com. Microsoft Copilot vyžaduje systém Windows 11. Niektoré funkcie vyžadujú jednotku NPU. Načasovanie a dostupnosť budú závisieť od spoločnosti Microsoft a líšia sa v závislosti od trhu a zariadenia. Vyžaduje sa konto Microsoft na prihlásenie. Ak funkcia Copilot nie je k dispozícii, kláves Copilot smeruje do vyhľadávacieho nástroja Bing. Viď http://aka.ms/WindowsAIFeatures.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[6] Smart Sense vyžaduje aplikáciu myHP a operačný systém Windows 11. Funkcie sa môžu líšiť v závislosti od platformy. Adaptívne stlmenie funguje iba pri odkrytej kamere.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[11] Vyžaduje sa bezdrôtový prístupový bod a služba pripojenia na internet (predávajú sa samostatne). Dostupnosť verejných bezdrôtových prístupových bodov je obmedzená. Funkcia Wi-Fi 7 (802.11BE) vyžaduje kompatibilný operačný systém Windows 11, kompatibilný procesor a samostatne zakúpený smerovač Wi-Fi 7 na podporu spätnej kompatibility s predchádzajúcimi špecifikáciami 802.11. Je k dispozícii v krajinách, v ktorých je podporovaný štandard Wi-Fi 7. Parametre štandardu 802.11BE sú len orientačné a nie sú konečné. Ak sa budú konečné parametre odlišovať od orientačných parametrov, môže to ovplyvniť schopnosť zariadenia komunikovať s inými zariadeniami pomocou štandardu 802.11BE. Pripojenie Wi-Fi s podporou gigabitových rýchlostí prenosu údajov možno dosiahnuť v sieti Wi-Fi 7 (802.11BE) pri prenose súborov medzi dvoma zariadeniami pripojenými k rovnakému smerovaču.?Vyžaduje sa samostatne predávaný bezdrôtový smerovač podporujúci kanály 160 MHz.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[12] HP Sure Click vyžaduje systém Windows 10 alebo novší. Všetky podrobnosti nájdete na stránke https://bit.ly/2PrLT6A_SureClick.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[13] HP Sure Sense je k dispozícii vo vybraných počítačoch HP s operačným systémom Windows 10 Pro, Windows 10 Enterprise, Windows 11 Pro alebo Windows 11 Enterprise.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[14] Riešenie HP Sure Start Gen7 je k dispozícii vo vybraných počítačoch HP a vyžaduje systém Windows 10 Pro alebo novší.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[15] Aplikácia HP AI Companion je na vybraných počítačoch HP AI novej generácie predinštalovaná alebo k dispozícii na stiahnutie z obchodu Microsoft Store. Vyžaduje počítač HP AI novej generácie s jednotkou NPU podporujúcou 40 až 60 biliónov operácií za sekundu a systém Windows 11. Výkon vyžaduje konto nastavené do 30 dní od spustenia alebo registrácie počítača prostredníctvom aplikácie HP AI Companion. Niektoré funkcie vyžadujú, aby zákazník nahral lokálne údaje. Päť (5) knižníc s limitom 100 MB, podporované súbory sa môžu líšiť a pri spustení zahŕňajú súbory .pdf, .txt a .docx.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[17] Vyžaduje sa aplikácia myHP a operačný systém Windows. HP Power Manager vyžaduje systém Windows 10 a vyšší. Dá sa stiahnuť v obchode Microsoft Store.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[16] Dostupnosť softvéru Poly je naplánovaná na leto 2024. Vyžaduje sa operačný systém Windows.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;",
    "supplierDescription": "&lt;h2 class=\"text-primary cross-sell_group\"&gt;14\" notebook HP EliteBook X G1a Next Gen AI&lt;/h2&gt;&lt;div class=\"tpl-product-detail-desc\"&gt;&lt;div class=\"box-in\"&gt;&lt;div class=\"row\"&gt;&lt;p&gt;Notebooky HP EliteBook AI sú vynikajúco pripravené na využívanie umelej inteligencie na náročné pracovné postupy a ľahko ich môžete všade nosiť so sebou.&lt;/p&gt;&lt;/div&gt;&lt;div class=\"row\"&gt;&lt;figure class=\"box-img\"&gt;&lt;img src=\"https://c.edsystem.cz/IMGCACHE/_1752/1752523_0d_3.jpg\" alt=\"Right facing\"&gt;&lt;/figure&gt;&lt;div class=\"desc\"&gt;&lt;h2&gt;Spoločnosť HP odporúča systém Windows 11 Pro&lt;/h2&gt;&lt;p&gt;Zhrňte a prepíšte obsah, získajte relevantné odporúčania a zachovajte si prehľad pomocou funkcie Microsoft Copilot. [7]&lt;/p&gt;&lt;/div&gt;&lt;/div&gt;&lt;div class=\"row\"&gt;&lt;figure class=\"box-img\"&gt;&lt;img src=\"https://c.edsystem.cz/IMGCACHE/_1752/1752523_0e_3.jpg\" alt=\"Left facing\"&gt;&lt;/figure&gt;&lt;div class=\"desc\"&gt;&lt;h2&gt;Veliaci procesor AMD&lt;/h2&gt;&lt;p&gt;Rozvíjajte inovatívne nápady s bleskurýchlym procesorom AMD Ryzen™ a jednotkou NPU s výkonom až 55 tops. [2,3]&lt;/p&gt;&lt;/div&gt;&lt;/div&gt;&lt;div class=\"row\"&gt;&lt;figure class=\"box-img\"&gt;&lt;img src=\"https://c.edsystem.cz/IMGCACHE/_1752/1752523_0a_3.jpg\" alt=\"Center facing\"&gt;&lt;/figure&gt;&lt;div class=\"desc\"&gt;&lt;h2&gt;Dlhá výdrž batérie&lt;/h2&gt;&lt;p&gt;HP Smart Sense[8] udržuje počítač chladný a tichý a adaptívne stmievanie[9] pomáha šetriť výdrž batérie.&lt;/p&gt;&lt;/div&gt;&lt;/div&gt;&lt;div class=\"row\"&gt;&lt;div class=\"desc\"&gt;&lt;h2&gt;Chránené aplikáciou HP Wolf Security&lt;/h2&gt;&lt;p&gt;HP Wolf Security for Business vytvára hardvérom vynucovanú pružnú obranu, ktorá je stále zapnutá. [10]&lt;/p&gt;&lt;/div&gt;&lt;/div&gt;&lt;div class=\"row\"&gt;&lt;div class=\"desc\"&gt;&lt;h2&gt;5 MP kamera&lt;/h2&gt;&lt;p&gt;Zostaňte sústredení a pripavení na každé stretnutie s najlepšou 5 Mpx kamerou a softvérom Poly Camera Pro.[4]&lt;/p&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;h2 class=\"text-primary cross-sell_group\"&gt;Parametre&lt;/h2&gt; &lt;div class=\"wrap-overflow-table\"&gt;&lt;div class=\"wrap-overflow-table_in\"&gt;&lt;table class=\"table\"&gt;&lt;tbody&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;Funkcie systému&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Operačný systém&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Windows 11 Pro&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Skupina procesora&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Procesor AMD Ryzen™ AI 7 PRO&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Procesor&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;AMD Ryzen™ AI 7 PRO 360 (max. zvýšená frekvencia 5,0 GHz, vyrovnávacia pamäť 16 MB L3 , 8 jadier, 16 vlákien)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Špecifikácie trvalej udržateľnosti&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Nízky obsah halogenidov; Výplň z lisovanej papierovej drviny je recyklovateľná a 100 % z nej pochádza z trvalo udržateľných zdrojov; Vonkajšia škatuľa a lepenkové výplne sú recyklovateľné a 100 % z nich pochádza z trvalo udržateľných zdrojov; 20 % recyklovaných plastov od spotrebiteľov; Puzdrá reproduktorov obsahujú plasty, ktoré by inak skončili v oceáne; Minimálne 35 % recyklovaného kovu&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Pamäť&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;32 GB pamäte LPDDR5x-8533 MT/s (na doske) Rýchlosť prenosu dát až 8 533 MT/s.&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Popis pevného disku&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;1 TB jednotka PCIe Gen4 NVMe™ TLC M.2 SSD&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Obrazovka&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;14\" diagonal WUXGA display&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Obrazovka&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;14\" diagonal, WUXGA (1920 x 1200), IPS, anti-glare, 400 nits, 100% sRGB Antireflexný displej IPS s uhlopriečkou 35,6 cm (14\"), jasom 400 nitov, 100 % pokrytím škály sRGB a rozlíšením WUXGA (1920 x 1200) [10,11,12,13]&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Grafická karta (integrovaná)&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Grafická karta AMD Radeon™ 880M&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Grafika&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Integrovaná Grafická karta AMD Radeon™ 880M&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Fotoaparát&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;5 Mpx infračervená kamera s AI&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Klávesnica&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Klávesnica HP Premium – odolná voči poliatiu, jemná sivá, podsvietená&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Polohovacie zariadenie&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Clickpad s podporou multidotykových gest, ťuknutia predvolene zapnuté&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Zvuk&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Zvuk od spoločnosti Poly Studio, štyri stereofónne reproduktory so samostatnými zosilňovačmi, sústava dvoch integrovaných mikrofónov&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Polohovacie zariadenie&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Clickpad s podporou multidotykových gest, ťuknutia predvolene zapnuté&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Bezdrôtová&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Bezdrôtová karta MediaTek Wi-Fi 7 MT7925 (2 x 2) a Bluetooth 5.4&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Minimálne rozmery (š x h x v)&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;31,22 x 21,46 x 0,92 cm (predná strana); 31,22 x 21,46 x 1,31 cm (zadná strana)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Rozmery (Š x H x V) poznámka&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Predná výška sa meria blízko predného okraja, kde sa začína zužovanie spodného krytu šasi. Zadná výška sa meria blízko zadného okraja, kde sa končí zužovanie spodného krytu šasi.&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Hmotnosť&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Už od hmotnosti 1,49 kg&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Poznámky k hmotnosti (metrické)&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Hmotnosť sa líši v závislosti od konfigurácie. Nezahŕňa napájací adaptér.&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Typ batérie&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;4-článková, lítium-iónová polymérová batéria HP s extra dlhou výdržou (74,5 Wh)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Štítky ekologickej bezpečnosti&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Certifikácia TCO&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Napájanie&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;Tenký 100 W adaptér HP USB Type-C&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Záruka&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;1-ročná (1/1/0) obmedzená záruka pokrýva náklady na diely a prácu počas 1 roka. Nevzťahuje sa na opravu na mieste. Zmluvné podmienky sa v jednotlivých krajinách líšia. Platia určité obmedzenia a výnimky.&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;th scope=\"row\" style=\"text-align:left\"&gt;Vrátane služby podpory&lt;/th&gt;&lt;td style=\"padding-right:2.5rem;text-align:justify;\"&gt;3-r. podpora HP pre NB na mieste. Zmluvné podmienky nájdete na stránke https://h20195.www2.hp.com/v2/GetPDF.aspx/4AA8-2300SKE &amp; https://www8.hp.com/h20195/v2/getpdf.aspx/4AA5-7123SKE.pdf&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;/div&gt;&lt;/div&gt; &lt;h2 class=\"text-primary cross-sell_group\"&gt;Poznámky&lt;/h2&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[1] Niektoré funkcie nemusia byť k dispozícii vo všetkých vydaniach alebo verziách systému Windows. Na využívanie všetkých funkcií systému Windows môžu systémy vyžadovať inovovaný alebo samostatne zakúpený hardvér, ovládače, softvér alebo aktualizáciu systému BIOS. Aktualizácia systému Windows 11 prebieha automaticky a je vždy povolená. Vyžaduje sa vysokorýchlostný internet a konto Microsoft. Poskytovateľ internetových služieb si môže účtovať poplatky a na aktualizácie sa časom môžu vzťahovať ďalšie požiadavky. Pozri http://www.windows.com.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[2] Technológia viacerých jadier je navrhnutá na zvýšenie výkonu niektorých softvérových produktov. Prínos tejto technológie nemusia nevyhnutne pocítiť všetci zákazníci ani všetky softvérové aplikácie. Výkon a taktovacia frekvencia sa líšia v závislosti od záťažového profilu konkrétnej aplikácie, ako aj hardvérovej a softvérovej konfigurácie. Číselné označenie AMD neoznačuje taktovaciu frekvenciu.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[3] Funkcie a softvér, ktoré vyžadujú NPU, môžu vyžadovať nákup, predplatné alebo povolenie poskytovateľom softvéru alebo platformy a softvér tretích strán môže mať špecifické požiadavky na konfiguráciu alebo kompatibilitu. Potenciálny výkon pri odvodzovaní NPU sa líši v závislosti od používania, konfigurácie a ďalších faktorov.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[4] Vyžaduje sa aplikácia myHP a operačný systém Windows.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[7] Môže sa vyžadovať služba Windows Update alebo stiahnutie aplikácie z obchodu Microsoft Store. Microsoft Copilot NIE JE k dispozícii v Číne, Rusku, Bielorusku a regiónoch, na ktoré je uvalené embargo - Kuba, Irán, Severná Kórea a Krym.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[8] Smart Sense vyžaduje aplikáciu HP a operačný systém Windows 11. Funkcie sa môžu líšiť v závislosti od platformy.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[9] Adaptívne stmievanie funguje iba pri otvorenom kryte kamery.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[10] HP Wolf Security for Business vyžaduje systém Windows 10, 11 Pro alebo novší, zahŕňa rôzne funkcie zabezpečenia od spoločnosti HP a je k dispozícii v produktoch HP Pro, Elite, Workstation a RPOS. Funkcie zabezpečenia nájdete v podrobných informáciách o produkte.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt; &lt;h2 class=\"text-primary cross-sell_group\"&gt;Právne upozornenie&lt;/h2&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[5] Niektoré funkcie nemusia byť k dispozícii vo všetkých vydaniach alebo verziách systému Windows. Na využívanie všetkých funkcií systému Windows môžu systémy vyžadovať inovovaný alebo samostatne zakúpený hardvér, ovládače, softvér alebo aktualizáciu systému BIOS. Aktualizácia systému Windows 11 prebieha automaticky a je vždy povolená. Poskytovateľ internetových služieb si môže účtovať poplatky a na aktualizácie sa časom môžu vzťahovať ďalšie požiadavky. Viď http://www.windows.com. Microsoft Copilot vyžaduje systém Windows 11. Niektoré funkcie vyžadujú jednotku NPU. Načasovanie a dostupnosť budú závisieť od spoločnosti Microsoft a líšia sa v závislosti od trhu a zariadenia. Vyžaduje sa konto Microsoft na prihlásenie. Ak funkcia Copilot nie je k dispozícii, kláves Copilot smeruje do vyhľadávacieho nástroja Bing. Viď http://aka.ms/WindowsAIFeatures.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[6] Smart Sense vyžaduje aplikáciu myHP a operačný systém Windows 11. Funkcie sa môžu líšiť v závislosti od platformy. Adaptívne stlmenie funguje iba pri odkrytej kamere.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[11] Vyžaduje sa bezdrôtový prístupový bod a služba pripojenia na internet (predávajú sa samostatne). Dostupnosť verejných bezdrôtových prístupových bodov je obmedzená. Funkcia Wi-Fi 7 (802.11BE) vyžaduje kompatibilný operačný systém Windows 11, kompatibilný procesor a samostatne zakúpený smerovač Wi-Fi 7 na podporu spätnej kompatibility s predchádzajúcimi špecifikáciami 802.11. Je k dispozícii v krajinách, v ktorých je podporovaný štandard Wi-Fi 7. Parametre štandardu 802.11BE sú len orientačné a nie sú konečné. Ak sa budú konečné parametre odlišovať od orientačných parametrov, môže to ovplyvniť schopnosť zariadenia komunikovať s inými zariadeniami pomocou štandardu 802.11BE. Pripojenie Wi-Fi s podporou gigabitových rýchlostí prenosu údajov možno dosiahnuť v sieti Wi-Fi 7 (802.11BE) pri prenose súborov medzi dvoma zariadeniami pripojenými k rovnakému smerovaču.?Vyžaduje sa samostatne predávaný bezdrôtový smerovač podporujúci kanály 160 MHz.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[12] HP Sure Click vyžaduje systém Windows 10 alebo novší. Všetky podrobnosti nájdete na stránke https://bit.ly/2PrLT6A_SureClick.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[13] HP Sure Sense je k dispozícii vo vybraných počítačoch HP s operačným systémom Windows 10 Pro, Windows 10 Enterprise, Windows 11 Pro alebo Windows 11 Enterprise.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[14] Riešenie HP Sure Start Gen7 je k dispozícii vo vybraných počítačoch HP a vyžaduje systém Windows 10 Pro alebo novší.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[15] Aplikácia HP AI Companion je na vybraných počítačoch HP AI novej generácie predinštalovaná alebo k dispozícii na stiahnutie z obchodu Microsoft Store. Vyžaduje počítač HP AI novej generácie s jednotkou NPU podporujúcou 40 až 60 biliónov operácií za sekundu a systém Windows 11. Výkon vyžaduje konto nastavené do 30 dní od spustenia alebo registrácie počítača prostredníctvom aplikácie HP AI Companion. Niektoré funkcie vyžadujú, aby zákazník nahral lokálne údaje. Päť (5) knižníc s limitom 100 MB, podporované súbory sa môžu líšiť a pri spustení zahŕňajú súbory .pdf, .txt a .docx.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[17] Vyžaduje sa aplikácia myHP a operačný systém Windows. HP Power Manager vyžaduje systém Windows 10 a vyšší. Dá sa stiahnuť v obchode Microsoft Store.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;table style=\"width: 100%;word-break:break-all;\"&gt;&lt;tbody&gt;&lt;tr style=\"text-align:left\"&gt;&lt;td style=\"padding:5px;padding-left:15px;border:0; border-left:1px #e21b52 solid; font-size:.75rem; opacity:.7;\"&gt;[16] Dostupnosť softvéru Poly je naplánovaná na leto 2024. Vyžaduje sa operačný systém Windows.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;",
    "seoTitle": "HP NTB EliteBook X G1a R7-360PRO 50TOPS 14\"WUXGA 1920x1200 400 IR, 32GB, 1TB TLC, 74WHr, Win11Pro, 3y onsite | Worlds.sk",
    "seoDescription": "Kúpiť HP NTB EliteBook X G1a R7-360PRO 50TOPS 14\"WUXGA 1920x1200 400 IR, 32GB, 1TB TLC, 74WHr, Win11Pro, 3y onsite (PartNumber: B9ZV2ET#BCM) za výhodnú cenu 2414.45 € s expresným doručením z centrálneho skladu na Worlds.sk.",
    "searchKeywords": [
      "hp",
      "b9zv2et#bcm",
      "firemne-notebooky"
    ],
    "pricing": {
      "supplierCost": 1796.46,
      "supplierFees": {
        "garbageFee": 0.42,
        "authorFee": 6.04
      },
      "totalCostWithFees": 1796.46,
      "vatRate": 20,
      "marginPercentage": 12,
      "basePrice": 2012.04,
      "finalPrice": 2414.45,
      "currency": "EUR"
    },
    "stockCount": 2,
    "isInStock": true,
    "stockText": "Skladom > 2 ks",
    "warrantyMonths": 24,
    "attributes": {
      "brand": {
        "code": "brand",
        "name": "Výrobca",
        "value": "HP",
        "rawValue": "HP"
      },
      "mpn": {
        "code": "mpn",
        "name": "Part Number",
        "value": "B9ZV2ET#BCM",
        "rawValue": "B9ZV2ET#BCM"
      },
      "warranty": {
        "code": "warranty",
        "name": "Záruka",
        "value": "24 mesiacov",
        "rawValue": "24"
      }
    },
    "images": [
      {
        "id": "img-1519431",
        "url": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80",
        "position": 0,
        "isPrimary": true,
        "altText": "HP NTB EliteBook X G1a R7-360PRO 50TOPS 14\"WUXGA 1920x1200 400 IR, 32GB, 1TB TLC, 74WHr, Win11Pro, 3y onsite"
      }
    ],
    "status": "ACTIVE",
    "reviewStatus": "AUTO_APPROVED",
    "qualityScore": {
      "total": 90,
      "breakdown": {
        "hasEan": true,
        "hasBrand": true,
        "hasMpn": true,
        "hasValidCategory": true,
        "hasImages": true,
        "hasAttributes": true,
        "hasDescription": true,
        "hasSeoMetadata": true,
        "hasPrice": true,
        "hasStock": true
      }
    },
    "dataHash": "hash_1519431_1796.46_2",
    "lastSyncedAt": "2026-09-01T15:48:11.559Z",
    "lastReprocessedAt": "2026-09-01T15:48:11.559Z",
    "createdAt": "2026-09-01T15:48:11.559Z",
    "updatedAt": "2026-09-01T15:48:11.559Z"
  },
  {
    "id": "ed-854443",
    "supplierCode": "854443",
    "sku": "854443",
    "mpn": "1512",
    "ean": "8717249817628",
    "brand": "DESQ",
    "categorySlug": "notebooky",
    "categoryHierarchy": [
      "Počítače a notebooky",
      "Notebooky"
    ],
    "title": "DESQ Stojan na notebook, 6 portů",
    "slug": "desq-stojan-na-notebook-6-port-854443",
    "shortDescription": "Promeňte svoj notebook v výkonnú desktopovú pracovnú stanicu s DESQ Notebook Dockom. Stačí pripojiť USB-C kábel a získate prístup k externým monitorom, klávesniciam, myšiam a ďalším perifériam. Stojan je kompatibilný s MacBookmi, notebookmi s USB Type-C, tabletmi a mobilnými telefónmi.  ? Promení váš notebook v desktop PC s plynulou integráciou cez USB-C ? Plne nastaviteľný pre ergonómickú výšku a uhly ? Zdvíha obrazovku až o 28 cm pre lepší komfort pri sledovaní ? Platforma nastaviteľná až do uhla 70 ° pre dokonalú polohu obrazovky ? Ľahká konštrukcia a skladací dizajn pre ľahké prenášanie ? Výrezy v konštrukcii podporujú prúdenie vzduchu a udržiavajú notebook v chlade ? Pevná a odolná hliníková zliatina pre dlhú životnosť ? Silikónové podložky a nožičky pre stabilitu a ochranu proti sklzu  S DESQ stojanom na notebook nastavíte obrazovku do ideálnej výšky, čo podporuje zdravé a ergonomické držanie tela a pomáha predchádzať bolestiam chrbta, krku a únave očí. &lt;p&gt;&lt;em&gt;Popis produktu bol preložený pomocou umelej inteligencie a môže obsahovať nepresnosti.&lt;/em&gt;&lt;/p&gt;",
    "supplierDescription": "Promeňte svoj notebook v výkonnú desktopovú pracovnú stanicu s DESQ Notebook Dockom. Stačí pripojiť USB-C kábel a získate prístup k externým monitorom, klávesniciam, myšiam a ďalším perifériam. Stojan je kompatibilný s MacBookmi, notebookmi s USB Type-C, tabletmi a mobilnými telefónmi.  ? Promení váš notebook v desktop PC s plynulou integráciou cez USB-C ? Plne nastaviteľný pre ergonómickú výšku a uhly ? Zdvíha obrazovku až o 28 cm pre lepší komfort pri sledovaní ? Platforma nastaviteľná až do uhla 70 ° pre dokonalú polohu obrazovky ? Ľahká konštrukcia a skladací dizajn pre ľahké prenášanie ? Výrezy v konštrukcii podporujú prúdenie vzduchu a udržiavajú notebook v chlade ? Pevná a odolná hliníková zliatina pre dlhú životnosť ? Silikónové podložky a nožičky pre stabilitu a ochranu proti sklzu  S DESQ stojanom na notebook nastavíte obrazovku do ideálnej výšky, čo podporuje zdravé a ergonomické držanie tela a pomáha predchádzať bolestiam chrbta, krku a únave očí. &lt;p&gt;&lt;em&gt;Popis produktu bol preložený pomocou umelej inteligencie a môže obsahovať nepresnosti.&lt;/em&gt;&lt;/p&gt;",
    "seoTitle": "DESQ Stojan na notebook, 6 portů | Worlds.sk",
    "seoDescription": "Kúpiť DESQ Stojan na notebook, 6 portů (PartNumber: 1512) za výhodnú cenu 166.25 € s expresným doručením z centrálneho skladu na Worlds.sk.",
    "searchKeywords": [
      "desq",
      "1512",
      "notebooky"
    ],
    "pricing": {
      "supplierCost": 123.7,
      "supplierFees": {
        "garbageFee": 0,
        "authorFee": 0
      },
      "totalCostWithFees": 123.7,
      "vatRate": 20,
      "marginPercentage": 12,
      "basePrice": 138.54,
      "finalPrice": 166.25,
      "currency": "EUR"
    },
    "stockCount": 1,
    "isInStock": true,
    "stockText": "Skladom > 1 ks",
    "warrantyMonths": 24,
    "attributes": {
      "brand": {
        "code": "brand",
        "name": "Výrobca",
        "value": "DESQ",
        "rawValue": "DESQ"
      },
      "mpn": {
        "code": "mpn",
        "name": "Part Number",
        "value": 1512,
        "rawValue": 1512
      },
      "warranty": {
        "code": "warranty",
        "name": "Záruka",
        "value": "24 mesiacov",
        "rawValue": "24"
      }
    },
    "images": [
      {
        "id": "img-854443",
        "url": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80",
        "position": 0,
        "isPrimary": true,
        "altText": "DESQ Stojan na notebook, 6 portů"
      }
    ],
    "status": "ACTIVE",
    "reviewStatus": "AUTO_APPROVED",
    "qualityScore": {
      "total": 90,
      "breakdown": {
        "hasEan": true,
        "hasBrand": true,
        "hasMpn": true,
        "hasValidCategory": true,
        "hasImages": true,
        "hasAttributes": true,
        "hasDescription": true,
        "hasSeoMetadata": true,
        "hasPrice": true,
        "hasStock": true
      }
    },
    "dataHash": "hash_854443_123.7_1",
    "lastSyncedAt": "2026-09-01T15:48:11.560Z",
    "lastReprocessedAt": "2026-09-01T15:48:11.560Z",
    "createdAt": "2026-09-01T15:48:11.560Z",
    "updatedAt": "2026-09-01T15:48:11.560Z"
  },
  {
    "id": "ed-8055295",
    "supplierCode": "8055295",
    "sku": "8055295",
    "mpn": "21NU0028CK",
    "ean": "198156491886",
    "brand": "Lenovo",
    "categorySlug": "firemne-notebooky",
    "categoryHierarchy": [
      "Počítače a notebooky",
      "Notebooky",
      "Firemné a pracovné notebooky"
    ],
    "title": "LENOVO NTB Thinkpad X1 2-in-1 G10 - Ultra 7 258V,14\" 2.8k OLED Touch,32GB,2TSSD,IRcam,HDMI,Int. Arc,W11P3Y Premier",
    "slug": "lenovo-ntb-thinkpad-x1-2-in-1-g10-ultra-7-258v-14-2-8k-oled-touch-32gb-2tssd-ircam-hdmi-int-arc-w11p3y-premier-8055295",
    "shortDescription": "&lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Produkt: Lenovo ThinkPad X1-2-in-1 G10&lt;/strong&gt;&lt;br /&gt; &lt;strong&gt;Part Number: 21NU0028CK&lt;/strong&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt; &lt;/p&gt; &lt;table id=\"lenovo\"&gt; &lt;tbody&gt; &lt;tr&gt; &lt;th colspan=\"2\"&gt;&lt;strong&gt;VÝKON&lt;/strong&gt;&lt;/th&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Procesor&lt;/td&gt; &lt;td&gt;Intel Core™ Ultra 7 258V, 8C (4P + 4LPE) / 8T, Max Turbo až do 4,8GHz, 12MB&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Grafická Karta&lt;/td&gt; &lt;td&gt;Integrované Intel Arc™ Graphics 140V&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Chipset&lt;/td&gt; &lt;td&gt;Intel SoC Platform&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Pameť&lt;/td&gt; &lt;td&gt;32GB Soldered LPDDR5x-8533, MoP Memory&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Pameťové sloty&lt;/td&gt; &lt;td&gt;Memory spojená s doskou, žiadne sloty, dual-channel&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Max. Pameť&lt;/td&gt; &lt;td&gt;32GB spojená pamäť, nie je možné rozšíriť&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Úložisko&lt;/td&gt; &lt;td&gt;2TB SSD M.2 2280 PCIe 5.0x4 Performance NVMe Opal 2.0&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Podporované Úložisko&lt;/td&gt; &lt;td&gt;Jeden disk, až do 2TB M.2 2280 SSD&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Čítačka Kariet&lt;/td&gt; &lt;td&gt;Nie&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Optická Mechanika&lt;/td&gt; &lt;td&gt;Nie&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Audio Čip&lt;/td&gt; &lt;td&gt;High Definition (HD) Audio, Realtek ALC713 codec&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Reproduktory&lt;/td&gt; &lt;td&gt;Stereofónne reproduktory, 2W x2, Dolby Atmos&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Kamera&lt;/td&gt; &lt;td&gt;UHD 8.0MP + IR Discrete s Privacy Shutter, MIPI, Computer Vision&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Mikrofón&lt;/td&gt; &lt;td&gt;2x, 360°&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Batterka&lt;/td&gt; &lt;td&gt;Integrovaná 57Wh&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Max. výdrž na batérii&lt;/td&gt; &lt;td&gt;-&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Napájací adaptér&lt;/td&gt; &lt;td&gt;Napájací adaptér &lt;br /&gt;65W USB-C Slim GaN (3-pin)&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;th colspan=\"2\"&gt;&lt;strong&gt;DIZAJN&lt;/strong&gt;&lt;/th&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Displej&lt;/td&gt; &lt;td&gt;14\" 2.8K (2880x1800) OLED 500nits Anti-reflection / Anti-smudge, 100% DCI-P3, 120Hz VRR, DisplayHDR™ True Black 500, Dolby Vision, Dotyk&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Dotyková obrazovka&lt;/td&gt; &lt;td&gt;OGS, 10-bodová Multi-touch&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Pera&lt;/td&gt; &lt;td&gt;Lenovo Yoga Pen&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Klávesnica&lt;/td&gt; &lt;td&gt;Podsvietená, Czech / Slovak&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Farba&lt;/td&gt; &lt;td&gt;Sivé&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Materiál&lt;/td&gt; &lt;td&gt;Hliník (Horná časť), Hliník (Spodná časť)&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Rozmery (ŠxHxV)&lt;/td&gt; &lt;td&gt;312.80 x 217.65 x 15.49 mm (12.31 x 8.57 x 0.61 palca)&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Hmotnosť&lt;/td&gt; &lt;td&gt;Začína od 1.30 kg&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;th colspan=\"2\"&gt;&lt;strong&gt;SOFTWARE&lt;/strong&gt;&lt;/th&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Operačný systém&lt;/td&gt; &lt;td&gt;Windows 11 Pro, Czech / Slovak / English&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Dodávaný softvér&lt;/td&gt; &lt;td&gt;Intel Connectivity Performance Suite + Lenovo AI Now&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;th colspan=\"2\"&gt;&lt;strong&gt;KONEKTIVITA&lt;/strong&gt;&lt;/th&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Ethernet&lt;/td&gt; &lt;td&gt;-&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;WLAN + Bluetooth&lt;/td&gt; &lt;td&gt;Intel Wi-Fi 7 BE201, 802.11be 2x2 + BT5.4&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Štandardné porty&lt;/td&gt; &lt;td&gt;1x USB-A (USB 5Gbps / USB 3.2 Gen 1)&lt;br /&gt;1x USB-A (USB 5Gbps / USB 3.2 Gen 1), Always On&lt;br /&gt;2x USB-C (Thunderbolt™ 4 / USB4 40Gbps), s USB PD 3.0 a DisplayPort™ 2.1&lt;br /&gt;1x HDMI 2.1, až 4K/60Hz&lt;br /&gt;1x slúchadlový / mikrofónový combo jack (3,5 mm)&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;th colspan=\"2\"&gt;&lt;strong&gt;Zabezpečenie a súkromie&lt;/strong&gt;&lt;/th&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Čítačka odtlačkov prstov&lt;/td&gt; &lt;td&gt;Touch Style, Match-on-Chip, integrovaná v tlačidle napájania&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;th colspan=\"2\"&gt;&lt;strong&gt;Služby&lt;/strong&gt;&lt;/th&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Základná záruka&lt;/td&gt; &lt;td&gt;3 roky, Kurier alebo donáška&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Zahrnuté vylepšenie&lt;/td&gt; &lt;td&gt;3Y Premier Support WHB (CPN), CO2 Offset 0.5 ton (Druhá generácia projekty uhlíkovej kompenzácie)&lt;/td&gt; &lt;/tr&gt; &lt;/tbody&gt; &lt;/table&gt; &lt;p&gt; &lt;/p&gt; &lt;p&gt;&lt;em&gt;Popis produktu bol preložený pomocou umelej inteligencie a môže obsahovať nepresnosti.&lt;/em&gt;&lt;/p&gt;",
    "supplierDescription": "&lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Produkt: Lenovo ThinkPad X1-2-in-1 G10&lt;/strong&gt;&lt;br /&gt; &lt;strong&gt;Part Number: 21NU0028CK&lt;/strong&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt; &lt;/p&gt; &lt;table id=\"lenovo\"&gt; &lt;tbody&gt; &lt;tr&gt; &lt;th colspan=\"2\"&gt;&lt;strong&gt;VÝKON&lt;/strong&gt;&lt;/th&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Procesor&lt;/td&gt; &lt;td&gt;Intel Core™ Ultra 7 258V, 8C (4P + 4LPE) / 8T, Max Turbo až do 4,8GHz, 12MB&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Grafická Karta&lt;/td&gt; &lt;td&gt;Integrované Intel Arc™ Graphics 140V&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Chipset&lt;/td&gt; &lt;td&gt;Intel SoC Platform&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Pameť&lt;/td&gt; &lt;td&gt;32GB Soldered LPDDR5x-8533, MoP Memory&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Pameťové sloty&lt;/td&gt; &lt;td&gt;Memory spojená s doskou, žiadne sloty, dual-channel&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Max. Pameť&lt;/td&gt; &lt;td&gt;32GB spojená pamäť, nie je možné rozšíriť&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Úložisko&lt;/td&gt; &lt;td&gt;2TB SSD M.2 2280 PCIe 5.0x4 Performance NVMe Opal 2.0&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Podporované Úložisko&lt;/td&gt; &lt;td&gt;Jeden disk, až do 2TB M.2 2280 SSD&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Čítačka Kariet&lt;/td&gt; &lt;td&gt;Nie&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Optická Mechanika&lt;/td&gt; &lt;td&gt;Nie&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Audio Čip&lt;/td&gt; &lt;td&gt;High Definition (HD) Audio, Realtek ALC713 codec&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Reproduktory&lt;/td&gt; &lt;td&gt;Stereofónne reproduktory, 2W x2, Dolby Atmos&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Kamera&lt;/td&gt; &lt;td&gt;UHD 8.0MP + IR Discrete s Privacy Shutter, MIPI, Computer Vision&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Mikrofón&lt;/td&gt; &lt;td&gt;2x, 360°&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Batterka&lt;/td&gt; &lt;td&gt;Integrovaná 57Wh&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Max. výdrž na batérii&lt;/td&gt; &lt;td&gt;-&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Napájací adaptér&lt;/td&gt; &lt;td&gt;Napájací adaptér &lt;br /&gt;65W USB-C Slim GaN (3-pin)&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;th colspan=\"2\"&gt;&lt;strong&gt;DIZAJN&lt;/strong&gt;&lt;/th&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Displej&lt;/td&gt; &lt;td&gt;14\" 2.8K (2880x1800) OLED 500nits Anti-reflection / Anti-smudge, 100% DCI-P3, 120Hz VRR, DisplayHDR™ True Black 500, Dolby Vision, Dotyk&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Dotyková obrazovka&lt;/td&gt; &lt;td&gt;OGS, 10-bodová Multi-touch&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Pera&lt;/td&gt; &lt;td&gt;Lenovo Yoga Pen&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Klávesnica&lt;/td&gt; &lt;td&gt;Podsvietená, Czech / Slovak&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Farba&lt;/td&gt; &lt;td&gt;Sivé&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Materiál&lt;/td&gt; &lt;td&gt;Hliník (Horná časť), Hliník (Spodná časť)&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Rozmery (ŠxHxV)&lt;/td&gt; &lt;td&gt;312.80 x 217.65 x 15.49 mm (12.31 x 8.57 x 0.61 palca)&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Hmotnosť&lt;/td&gt; &lt;td&gt;Začína od 1.30 kg&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;th colspan=\"2\"&gt;&lt;strong&gt;SOFTWARE&lt;/strong&gt;&lt;/th&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Operačný systém&lt;/td&gt; &lt;td&gt;Windows 11 Pro, Czech / Slovak / English&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Dodávaný softvér&lt;/td&gt; &lt;td&gt;Intel Connectivity Performance Suite + Lenovo AI Now&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;th colspan=\"2\"&gt;&lt;strong&gt;KONEKTIVITA&lt;/strong&gt;&lt;/th&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Ethernet&lt;/td&gt; &lt;td&gt;-&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;WLAN + Bluetooth&lt;/td&gt; &lt;td&gt;Intel Wi-Fi 7 BE201, 802.11be 2x2 + BT5.4&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Štandardné porty&lt;/td&gt; &lt;td&gt;1x USB-A (USB 5Gbps / USB 3.2 Gen 1)&lt;br /&gt;1x USB-A (USB 5Gbps / USB 3.2 Gen 1), Always On&lt;br /&gt;2x USB-C (Thunderbolt™ 4 / USB4 40Gbps), s USB PD 3.0 a DisplayPort™ 2.1&lt;br /&gt;1x HDMI 2.1, až 4K/60Hz&lt;br /&gt;1x slúchadlový / mikrofónový combo jack (3,5 mm)&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;th colspan=\"2\"&gt;&lt;strong&gt;Zabezpečenie a súkromie&lt;/strong&gt;&lt;/th&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Čítačka odtlačkov prstov&lt;/td&gt; &lt;td&gt;Touch Style, Match-on-Chip, integrovaná v tlačidle napájania&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;th colspan=\"2\"&gt;&lt;strong&gt;Služby&lt;/strong&gt;&lt;/th&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Základná záruka&lt;/td&gt; &lt;td&gt;3 roky, Kurier alebo donáška&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Zahrnuté vylepšenie&lt;/td&gt; &lt;td&gt;3Y Premier Support WHB (CPN), CO2 Offset 0.5 ton (Druhá generácia projekty uhlíkovej kompenzácie)&lt;/td&gt; &lt;/tr&gt; &lt;/tbody&gt; &lt;/table&gt; &lt;p&gt; &lt;/p&gt; &lt;p&gt;&lt;em&gt;Popis produktu bol preložený pomocou umelej inteligencie a môže obsahovať nepresnosti.&lt;/em&gt;&lt;/p&gt;",
    "seoTitle": "LENOVO NTB Thinkpad X1 2-in-1 G10 - Ultra 7 258V,14\" 2.8k OLED Touch,32GB,2TSSD,IRcam,HDMI,Int. Arc,W11P3Y Premier | Worlds.sk",
    "seoDescription": "Kúpiť LENOVO NTB Thinkpad X1 2-in-1 G10 - Ultra 7 258V,14\" 2.8k OLED Touch,32GB,2TSSD,IRcam,HDMI,Int. Arc,W11P3Y Premier (PartNumber: 21NU0028CK) za výhodnú cenu 4039.34 € s expresným doručením z centrálneho skladu na Worlds.sk.",
    "searchKeywords": [
      "lenovo",
      "21nu0028ck",
      "firemne-notebooky"
    ],
    "pricing": {
      "supplierCost": 3005.46,
      "supplierFees": {
        "garbageFee": 0.42,
        "authorFee": 6.04
      },
      "totalCostWithFees": 3005.46,
      "vatRate": 20,
      "marginPercentage": 12,
      "basePrice": 3366.12,
      "finalPrice": 4039.34,
      "currency": "EUR"
    },
    "stockCount": 2,
    "isInStock": true,
    "stockText": "Skladom > 2 ks",
    "warrantyMonths": 24,
    "attributes": {
      "brand": {
        "code": "brand",
        "name": "Výrobca",
        "value": "Lenovo",
        "rawValue": "Lenovo"
      },
      "mpn": {
        "code": "mpn",
        "name": "Part Number",
        "value": "21NU0028CK",
        "rawValue": "21NU0028CK"
      },
      "warranty": {
        "code": "warranty",
        "name": "Záruka",
        "value": "24 mesiacov",
        "rawValue": "24"
      }
    },
    "images": [
      {
        "id": "img-8055295",
        "url": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80",
        "position": 0,
        "isPrimary": true,
        "altText": "LENOVO NTB Thinkpad X1 2-in-1 G10 - Ultra 7 258V,14\" 2.8k OLED Touch,32GB,2TSSD,IRcam,HDMI,Int. Arc,W11P3Y Premier"
      }
    ],
    "status": "ACTIVE",
    "reviewStatus": "AUTO_APPROVED",
    "qualityScore": {
      "total": 90,
      "breakdown": {
        "hasEan": true,
        "hasBrand": true,
        "hasMpn": true,
        "hasValidCategory": true,
        "hasImages": true,
        "hasAttributes": true,
        "hasDescription": true,
        "hasSeoMetadata": true,
        "hasPrice": true,
        "hasStock": true
      }
    },
    "dataHash": "hash_8055295_3005.46_2",
    "lastSyncedAt": "2026-09-01T15:48:11.560Z",
    "lastReprocessedAt": "2026-09-01T15:48:11.560Z",
    "createdAt": "2026-09-01T15:48:11.560Z",
    "updatedAt": "2026-09-01T15:48:11.560Z"
  },
  {
    "id": "ed-11294748",
    "supplierCode": "11294748",
    "sku": "11294748",
    "mpn": "NX.JDKEC.002",
    "ean": "4711474437006",
    "brand": "Acer",
    "categorySlug": "notebooky",
    "categoryHierarchy": [
      "Počítače a notebooky",
      "Notebooky"
    ],
    "title": "ACER NTB Aspire Vero 16 (AV16-71P-74WA),Ultra 7 255H,16\"WUXGA,32GB,1TB SSD,Intel Arc,W11H,Gray",
    "slug": "acer-ntb-aspire-vero-16-av16-71p-74wa-ultra-7-255h-16-wuxga-32gb-1tb-ssd-intel-arc-w11h-gray-11294748",
    "shortDescription": "&lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;ACER NTB Aspire Vero 16 &lt;/strong&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;strong&gt;(&lt;/strong&gt;&lt;strong&gt;AV16-71P-74WA&lt;/strong&gt;&lt;strong&gt;)&lt;/strong&gt;&lt;br /&gt; &lt;strong&gt;Číslo dielu: &lt;/strong&gt;&lt;strong&gt;NX.JDKEC.002&lt;/strong&gt;&lt;/span&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;strong&gt;Procesor&lt;/strong&gt;&lt;br /&gt; Výrobca procesora: Intel&lt;br /&gt; Model procesora: Core Ultra 7 processor 255H&lt;br /&gt; Rýchlosť procesora: 2,0 &lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;GHz&lt;br /&gt; Počet jadier: &lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;16&lt;/span&gt;&lt;/span&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;strong&gt;Zobrazenie a grafika&lt;/strong&gt;&lt;br /&gt; &lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;Uhlopriečka displeja: &lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;16\"&lt;br /&gt; Rozlíšenie displeja: WUXGA 1920 x 1200&lt;br /&gt; Typ displeja: Glare&lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;br /&gt; Pomer strán: 16:&lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;10&lt;br /&gt; Dotykový displej: Nie&lt;br /&gt; Jas: 400nits&lt;br /&gt; Farebný gamut: 100% sRGB farebný gamut&lt;br /&gt; Grafická karta: Intel Arc Graphics&lt;/span&gt;&lt;/span&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;strong&gt;Pamäť&lt;/strong&gt;&lt;br /&gt; Štandardná pamäť:&lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt; 32 GB&lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;br /&gt; Technológia pamäte: &lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;LPDDR5X&lt;/span&gt;&lt;/span&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;Úložisko&lt;/span&gt;&lt;/span&gt;&lt;/strong&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;br /&gt; Celková kapacita disku SSD: 1024 GB&lt;br /&gt; Typ SSD: PCIe NVMe SSD PM4 + M.2&lt;/span&gt;&lt;/span&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;Sieť a komunikácia&lt;/span&gt;&lt;/span&gt;&lt;/strong&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;br /&gt; WIFI 6E Intel 802.11ax 2x2 MU: Áno&lt;br /&gt; Bluetooth verzia v5.3: Áno&lt;/span&gt;&lt;/span&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Rozhrania/porty&lt;/strong&gt;&lt;span lang=\"EN\"&gt;&lt;br /&gt; 2x USB Type-C port podporujúci: USB 3.2 Gen2 (až 10 Gbps) &lt;br /&gt; DisplayPort cez USB-C &lt;br /&gt; Thunderbolt 4 &lt;br /&gt; DC-in port &lt;br /&gt; 2x USB 3.2 Gen1 &lt;br /&gt; HDMI 2.1&lt;br /&gt; 1x 3.5mm Combo audio jack&lt;br /&gt; &lt;/span&gt;&lt;span lang=\"CS\"&gt;Kensington lock: Nie&lt;/span&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;Softvér&lt;/span&gt;&lt;/span&gt;&lt;/strong&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;br /&gt; Operačný systém: &lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;Windows 11 Home &lt;/span&gt;&lt;/span&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;strong&gt;Výbava&lt;/strong&gt;&lt;br /&gt; Webkamera: Áno&lt;br /&gt; Numerická klávesnica: Áno&lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;br /&gt; Čítačka odtlačkov prstov: &lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;Áno&lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;br /&gt; Čítačka pamäťových kariet: &lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;Nie&lt;br /&gt; Optická mechanika: Nie&lt;br /&gt; Podsvietenie klávesnice: Áno&lt;br /&gt; Touchpad: Áno&lt;br /&gt; TPM: Áno&lt;br /&gt; &lt;br /&gt; &lt;strong&gt;Informácie o batérii&lt;/strong&gt;&lt;br /&gt; Chemické zloženie batérie: Lithium-iont (Li-Ion)&lt;br /&gt; Energia batérie: 53Whrs&lt;/span&gt;&lt;/span&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Popis napájania&lt;/strong&gt;&lt;br /&gt; 65W USB Type-C AC Adaptér PCR50% TCO9.0&lt;/p&gt; &lt;p&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;strong&gt;Fyzické charakteristiky&lt;/strong&gt;&lt;br /&gt; Farba: Cobblestone Gray&lt;br /&gt; Špecifikácia: Bio-Based Oyster Shell Material&lt;br /&gt; &lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;Rozmery: &lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;359,5 x 247 x 16,55 cm&lt;br /&gt; &lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;Hmotnosť (približná): &lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;1,8 kg&lt;/span&gt;&lt;/span&gt;&lt;/p&gt; &lt;p&gt;&lt;em&gt;Popis produktu bol preložený pomocou umelej inteligencie a môže obsahovať nepresnosti.&lt;/em&gt;&lt;/p&gt;",
    "supplierDescription": "&lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;ACER NTB Aspire Vero 16 &lt;/strong&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;strong&gt;(&lt;/strong&gt;&lt;strong&gt;AV16-71P-74WA&lt;/strong&gt;&lt;strong&gt;)&lt;/strong&gt;&lt;br /&gt; &lt;strong&gt;Číslo dielu: &lt;/strong&gt;&lt;strong&gt;NX.JDKEC.002&lt;/strong&gt;&lt;/span&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;strong&gt;Procesor&lt;/strong&gt;&lt;br /&gt; Výrobca procesora: Intel&lt;br /&gt; Model procesora: Core Ultra 7 processor 255H&lt;br /&gt; Rýchlosť procesora: 2,0 &lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;GHz&lt;br /&gt; Počet jadier: &lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;16&lt;/span&gt;&lt;/span&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;strong&gt;Zobrazenie a grafika&lt;/strong&gt;&lt;br /&gt; &lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;Uhlopriečka displeja: &lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;16\"&lt;br /&gt; Rozlíšenie displeja: WUXGA 1920 x 1200&lt;br /&gt; Typ displeja: Glare&lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;br /&gt; Pomer strán: 16:&lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;10&lt;br /&gt; Dotykový displej: Nie&lt;br /&gt; Jas: 400nits&lt;br /&gt; Farebný gamut: 100% sRGB farebný gamut&lt;br /&gt; Grafická karta: Intel Arc Graphics&lt;/span&gt;&lt;/span&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;strong&gt;Pamäť&lt;/strong&gt;&lt;br /&gt; Štandardná pamäť:&lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt; 32 GB&lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;br /&gt; Technológia pamäte: &lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;LPDDR5X&lt;/span&gt;&lt;/span&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;Úložisko&lt;/span&gt;&lt;/span&gt;&lt;/strong&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;br /&gt; Celková kapacita disku SSD: 1024 GB&lt;br /&gt; Typ SSD: PCIe NVMe SSD PM4 + M.2&lt;/span&gt;&lt;/span&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;Sieť a komunikácia&lt;/span&gt;&lt;/span&gt;&lt;/strong&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;br /&gt; WIFI 6E Intel 802.11ax 2x2 MU: Áno&lt;br /&gt; Bluetooth verzia v5.3: Áno&lt;/span&gt;&lt;/span&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Rozhrania/porty&lt;/strong&gt;&lt;span lang=\"EN\"&gt;&lt;br /&gt; 2x USB Type-C port podporujúci: USB 3.2 Gen2 (až 10 Gbps) &lt;br /&gt; DisplayPort cez USB-C &lt;br /&gt; Thunderbolt 4 &lt;br /&gt; DC-in port &lt;br /&gt; 2x USB 3.2 Gen1 &lt;br /&gt; HDMI 2.1&lt;br /&gt; 1x 3.5mm Combo audio jack&lt;br /&gt; &lt;/span&gt;&lt;span lang=\"CS\"&gt;Kensington lock: Nie&lt;/span&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;Softvér&lt;/span&gt;&lt;/span&gt;&lt;/strong&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;br /&gt; Operačný systém: &lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;Windows 11 Home &lt;/span&gt;&lt;/span&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;strong&gt;Výbava&lt;/strong&gt;&lt;br /&gt; Webkamera: Áno&lt;br /&gt; Numerická klávesnica: Áno&lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;br /&gt; Čítačka odtlačkov prstov: &lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;Áno&lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;br /&gt; Čítačka pamäťových kariet: &lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;Nie&lt;br /&gt; Optická mechanika: Nie&lt;br /&gt; Podsvietenie klávesnice: Áno&lt;br /&gt; Touchpad: Áno&lt;br /&gt; TPM: Áno&lt;br /&gt; &lt;br /&gt; &lt;strong&gt;Informácie o batérii&lt;/strong&gt;&lt;br /&gt; Chemické zloženie batérie: Lithium-iont (Li-Ion)&lt;br /&gt; Energia batérie: 53Whrs&lt;/span&gt;&lt;/span&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Popis napájania&lt;/strong&gt;&lt;br /&gt; 65W USB Type-C AC Adaptér PCR50% TCO9.0&lt;/p&gt; &lt;p&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;strong&gt;Fyzické charakteristiky&lt;/strong&gt;&lt;br /&gt; Farba: Cobblestone Gray&lt;br /&gt; Špecifikácia: Bio-Based Oyster Shell Material&lt;br /&gt; &lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;Rozmery: &lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;359,5 x 247 x 16,55 cm&lt;br /&gt; &lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;Hmotnosť (približná): &lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;1,8 kg&lt;/span&gt;&lt;/span&gt;&lt;/p&gt; &lt;p&gt;&lt;em&gt;Popis produktu bol preložený pomocou umelej inteligencie a môže obsahovať nepresnosti.&lt;/em&gt;&lt;/p&gt;",
    "seoTitle": "ACER NTB Aspire Vero 16 (AV16-71P-74WA),Ultra 7 255H,16\"WUXGA,32GB,1TB SSD,Intel Arc,W11H,Gray | Worlds.sk",
    "seoDescription": "Kúpiť ACER NTB Aspire Vero 16 (AV16-71P-74WA),Ultra 7 255H,16\"WUXGA,32GB,1TB SSD,Intel Arc,W11H,Gray (PartNumber: NX.JDKEC.002) za výhodnú cenu 1165.87 € s expresným doručením z centrálneho skladu na Worlds.sk.",
    "searchKeywords": [
      "acer",
      "nx.jdkec.002",
      "notebooky"
    ],
    "pricing": {
      "supplierCost": 867.46,
      "supplierFees": {
        "garbageFee": 0.42,
        "authorFee": 6.04
      },
      "totalCostWithFees": 867.46,
      "vatRate": 20,
      "marginPercentage": 12,
      "basePrice": 971.56,
      "finalPrice": 1165.87,
      "currency": "EUR"
    },
    "stockCount": 2,
    "isInStock": true,
    "stockText": "Skladom > 2 ks",
    "warrantyMonths": 24,
    "attributes": {
      "brand": {
        "code": "brand",
        "name": "Výrobca",
        "value": "Acer",
        "rawValue": "Acer"
      },
      "mpn": {
        "code": "mpn",
        "name": "Part Number",
        "value": "NX.JDKEC.002",
        "rawValue": "NX.JDKEC.002"
      },
      "warranty": {
        "code": "warranty",
        "name": "Záruka",
        "value": "24 mesiacov",
        "rawValue": "24"
      }
    },
    "images": [
      {
        "id": "img-11294748",
        "url": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=80",
        "position": 0,
        "isPrimary": true,
        "altText": "ACER NTB Aspire Vero 16 (AV16-71P-74WA),Ultra 7 255H,16\"WUXGA,32GB,1TB SSD,Intel Arc,W11H,Gray"
      }
    ],
    "status": "ACTIVE",
    "reviewStatus": "AUTO_APPROVED",
    "qualityScore": {
      "total": 90,
      "breakdown": {
        "hasEan": true,
        "hasBrand": true,
        "hasMpn": true,
        "hasValidCategory": true,
        "hasImages": true,
        "hasAttributes": true,
        "hasDescription": true,
        "hasSeoMetadata": true,
        "hasPrice": true,
        "hasStock": true
      }
    },
    "dataHash": "hash_11294748_867.46_2",
    "lastSyncedAt": "2026-09-01T15:48:11.560Z",
    "lastReprocessedAt": "2026-09-01T15:48:11.560Z",
    "createdAt": "2026-09-01T15:48:11.560Z",
    "updatedAt": "2026-09-01T15:48:11.560Z"
  },
  {
    "id": "ed-8055332",
    "supplierCode": "8055332",
    "sku": "8055332",
    "mpn": "21QX00GUCK",
    "ean": "198157464728",
    "brand": "Lenovo",
    "categorySlug": "firemne-notebooky",
    "categoryHierarchy": [
      "Počítače a notebooky",
      "Notebooky",
      "Firemné a pracovné notebooky"
    ],
    "title": "LENOVO NTB ThinkPad T14s G6 - Ultra 7 258V,14\" WUXGA IPS,32GB,1TSSD,HDMI,Int. Intel Arc,W11P,3Y Premier",
    "slug": "lenovo-ntb-thinkpad-t14s-g6-ultra-7-258v-14-wuxga-ips-32gb-1tssd-hdmi-int-intel-arc-w11p-3y-premier-8055332",
    "shortDescription": "&lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Produkt: Lenovo ThinkPad T14s Gen 6 (INTEL)&lt;/strong&gt;&lt;br /&gt; &lt;strong&gt;Part Number: 21QX00GUCK&lt;/strong&gt;&lt;/p&gt;\n&lt;p dir=\"LTR\" align=\"LEFT\"&gt; &lt;/p&gt;\n&lt;table id=\"lenovo\"&gt;\n&lt;tbody&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;VÝKON&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Procesor&lt;/td&gt;\n&lt;td&gt;Intel Core™ Ultra 7 258V, 8C (4P + 4LPE) / 8T, Max Turbo up to 4.8GHz, 12MB&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Grafická Karta&lt;/td&gt;\n&lt;td&gt;Integrated Intel Arc™ Graphics 140V&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Chipset&lt;/td&gt;\n&lt;td&gt;Intel SoC Platform&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pameť&lt;/td&gt;\n&lt;td&gt;32GB Soldered LPDDR5x-8533, MoP Memory&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pameťové sloty&lt;/td&gt;\n&lt;td&gt;Memory soldered to systemboard, no slots, dual-channel&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Max. Pameť&lt;/td&gt;\n&lt;td&gt;32GB soldered memory, not upgradable&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Úložisko&lt;/td&gt;\n&lt;td&gt;1TB SSD M.2 2280 PCIe 5.0x4 Performance NVMe Opal 2.0&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Podporované Úložisko&lt;/td&gt;\n&lt;td&gt;One drive, up to 1TB M.2 2280 SSD&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Čitačka Kariet&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Optická Mechanika&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Audio Chip&lt;/td&gt;\n&lt;td&gt;High Definition (HD) Audio, Realtek ALC3287 codec&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Reproduktory&lt;/td&gt;\n&lt;td&gt;Stereo speakers, 2W x2, Dolby Atmos&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Kamera&lt;/td&gt;\n&lt;td&gt;5.0MP + IR Discrete with Privacy Shutter, Computer Vision on ISP&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Mikrofon&lt;/td&gt;\n&lt;td&gt;2x, 360°&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Bateria&lt;/td&gt;\n&lt;td&gt;58Wh&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Max. výdrž na baterii&lt;/td&gt;\n&lt;td&gt;-&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Napájací Adaptér&lt;/td&gt;\n&lt;td&gt;65W USB-C Slim GaN (3-pin)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;DESIGN&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Displej&lt;/td&gt;\n&lt;td&gt;14\" WUXGA (1920x1200) IPS 500nits Anti-glare, 100% sRGB, 60Hz, Low Power&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Dotyková obrazovka&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pero&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Klávesnica&lt;/td&gt;\n&lt;td&gt;Backlit, Czech / Slovak&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Farba&lt;/td&gt;\n&lt;td&gt;Black&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Materiál&lt;/td&gt;\n&lt;td&gt;Carbon Fiber Hybrid (Top), Aluminium (Bottom)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Rozmery (ŠxHxV)&lt;/td&gt;\n&lt;td&gt;313.6 x 219.4 x 16.9 mm (12.35 x 8.64 x 0.67 inches)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Hmotnost&lt;/td&gt;\n&lt;td&gt;Starting at 1.31 kg&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;SOFTWARE&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Operačný systém&lt;/td&gt;\n&lt;td&gt;Windows 11 Pro, Czech / Slovak / English&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Dodávaný software&lt;/td&gt;\n&lt;td&gt;Lenovo AI Now&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;KONEKTIVITA&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Ethernet&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;WLAN + Bluetooth&lt;/td&gt;\n&lt;td&gt;Intel Wi-Fi 7 BE201, 802.11be 2x2 + BT5.4&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Standartné porty&lt;/td&gt;\n&lt;td&gt;1x USB-A (USB 5Gbps / USB 3.2 Gen 1)&lt;br /&gt;1x USB-A (USB 5Gbps / USB 3.2 Gen 1), Always On&lt;br /&gt;2x USB-C (Thunderbolt™ 4 / USB4 40Gbps), with USB PD 3.0 and DisplayPort™ 2.1&lt;br /&gt;1x HDMI 2.1, up to 4K/60Hz&lt;br /&gt;1x Headphone / microphone combo jack (3.5mm)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;ZABEZPEČENÍ A SOUKROMÍ&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Čitačka otlačkov prstov&lt;/td&gt;\n&lt;td&gt;Touch Style, Match-on-Chip, Integrated in Power Button&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;SERVIS&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Základná záruka&lt;/td&gt;\n&lt;td&gt;3-year, Courier or Carry-in&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Zahrnutý Upgrade&lt;/td&gt;\n&lt;td&gt;3Y Premier Support HB (CPN), CO2 Offset 0.5 ton (2nd Generation Carbon Offset Projects)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;/tbody&gt;\n&lt;/table&gt;\n&lt;p&gt; &lt;/p&gt;",
    "supplierDescription": "&lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Produkt: Lenovo ThinkPad T14s Gen 6 (INTEL)&lt;/strong&gt;&lt;br /&gt; &lt;strong&gt;Part Number: 21QX00GUCK&lt;/strong&gt;&lt;/p&gt;\n&lt;p dir=\"LTR\" align=\"LEFT\"&gt; &lt;/p&gt;\n&lt;table id=\"lenovo\"&gt;\n&lt;tbody&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;VÝKON&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Procesor&lt;/td&gt;\n&lt;td&gt;Intel Core™ Ultra 7 258V, 8C (4P + 4LPE) / 8T, Max Turbo up to 4.8GHz, 12MB&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Grafická Karta&lt;/td&gt;\n&lt;td&gt;Integrated Intel Arc™ Graphics 140V&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Chipset&lt;/td&gt;\n&lt;td&gt;Intel SoC Platform&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pameť&lt;/td&gt;\n&lt;td&gt;32GB Soldered LPDDR5x-8533, MoP Memory&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pameťové sloty&lt;/td&gt;\n&lt;td&gt;Memory soldered to systemboard, no slots, dual-channel&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Max. Pameť&lt;/td&gt;\n&lt;td&gt;32GB soldered memory, not upgradable&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Úložisko&lt;/td&gt;\n&lt;td&gt;1TB SSD M.2 2280 PCIe 5.0x4 Performance NVMe Opal 2.0&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Podporované Úložisko&lt;/td&gt;\n&lt;td&gt;One drive, up to 1TB M.2 2280 SSD&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Čitačka Kariet&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Optická Mechanika&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Audio Chip&lt;/td&gt;\n&lt;td&gt;High Definition (HD) Audio, Realtek ALC3287 codec&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Reproduktory&lt;/td&gt;\n&lt;td&gt;Stereo speakers, 2W x2, Dolby Atmos&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Kamera&lt;/td&gt;\n&lt;td&gt;5.0MP + IR Discrete with Privacy Shutter, Computer Vision on ISP&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Mikrofon&lt;/td&gt;\n&lt;td&gt;2x, 360°&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Bateria&lt;/td&gt;\n&lt;td&gt;58Wh&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Max. výdrž na baterii&lt;/td&gt;\n&lt;td&gt;-&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Napájací Adaptér&lt;/td&gt;\n&lt;td&gt;65W USB-C Slim GaN (3-pin)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;DESIGN&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Displej&lt;/td&gt;\n&lt;td&gt;14\" WUXGA (1920x1200) IPS 500nits Anti-glare, 100% sRGB, 60Hz, Low Power&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Dotyková obrazovka&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pero&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Klávesnica&lt;/td&gt;\n&lt;td&gt;Backlit, Czech / Slovak&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Farba&lt;/td&gt;\n&lt;td&gt;Black&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Materiál&lt;/td&gt;\n&lt;td&gt;Carbon Fiber Hybrid (Top), Aluminium (Bottom)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Rozmery (ŠxHxV)&lt;/td&gt;\n&lt;td&gt;313.6 x 219.4 x 16.9 mm (12.35 x 8.64 x 0.67 inches)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Hmotnost&lt;/td&gt;\n&lt;td&gt;Starting at 1.31 kg&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;SOFTWARE&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Operačný systém&lt;/td&gt;\n&lt;td&gt;Windows 11 Pro, Czech / Slovak / English&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Dodávaný software&lt;/td&gt;\n&lt;td&gt;Lenovo AI Now&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;KONEKTIVITA&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Ethernet&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;WLAN + Bluetooth&lt;/td&gt;\n&lt;td&gt;Intel Wi-Fi 7 BE201, 802.11be 2x2 + BT5.4&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Standartné porty&lt;/td&gt;\n&lt;td&gt;1x USB-A (USB 5Gbps / USB 3.2 Gen 1)&lt;br /&gt;1x USB-A (USB 5Gbps / USB 3.2 Gen 1), Always On&lt;br /&gt;2x USB-C (Thunderbolt™ 4 / USB4 40Gbps), with USB PD 3.0 and DisplayPort™ 2.1&lt;br /&gt;1x HDMI 2.1, up to 4K/60Hz&lt;br /&gt;1x Headphone / microphone combo jack (3.5mm)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;ZABEZPEČENÍ A SOUKROMÍ&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Čitačka otlačkov prstov&lt;/td&gt;\n&lt;td&gt;Touch Style, Match-on-Chip, Integrated in Power Button&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;SERVIS&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Základná záruka&lt;/td&gt;\n&lt;td&gt;3-year, Courier or Carry-in&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Zahrnutý Upgrade&lt;/td&gt;\n&lt;td&gt;3Y Premier Support HB (CPN), CO2 Offset 0.5 ton (2nd Generation Carbon Offset Projects)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;/tbody&gt;\n&lt;/table&gt;\n&lt;p&gt; &lt;/p&gt;",
    "seoTitle": "LENOVO NTB ThinkPad T14s G6 - Ultra 7 258V,14\" WUXGA IPS,32GB,1TSSD,HDMI,Int. Intel Arc,W11P,3Y Premier | Worlds.sk",
    "seoDescription": "Kúpiť LENOVO NTB ThinkPad T14s G6 - Ultra 7 258V,14\" WUXGA IPS,32GB,1TSSD,HDMI,Int. Intel Arc,W11P,3Y Premier (PartNumber: 21QX00GUCK) za výhodnú cenu 2199.41 € s expresným doručením z centrálneho skladu na Worlds.sk.",
    "searchKeywords": [
      "lenovo",
      "21qx00guck",
      "firemne-notebooky"
    ],
    "pricing": {
      "supplierCost": 1636.46,
      "supplierFees": {
        "garbageFee": 0.42,
        "authorFee": 6.04
      },
      "totalCostWithFees": 1636.46,
      "vatRate": 20,
      "marginPercentage": 12,
      "basePrice": 1832.84,
      "finalPrice": 2199.41,
      "currency": "EUR"
    },
    "stockCount": 5,
    "isInStock": true,
    "stockText": "Skladom > 5 ks",
    "warrantyMonths": 24,
    "attributes": {
      "brand": {
        "code": "brand",
        "name": "Výrobca",
        "value": "Lenovo",
        "rawValue": "Lenovo"
      },
      "mpn": {
        "code": "mpn",
        "name": "Part Number",
        "value": "21QX00GUCK",
        "rawValue": "21QX00GUCK"
      },
      "warranty": {
        "code": "warranty",
        "name": "Záruka",
        "value": "24 mesiacov",
        "rawValue": "24"
      }
    },
    "images": [
      {
        "id": "img-8055332",
        "url": "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80",
        "position": 0,
        "isPrimary": true,
        "altText": "LENOVO NTB ThinkPad T14s G6 - Ultra 7 258V,14\" WUXGA IPS,32GB,1TSSD,HDMI,Int. Intel Arc,W11P,3Y Premier"
      }
    ],
    "status": "ACTIVE",
    "reviewStatus": "AUTO_APPROVED",
    "qualityScore": {
      "total": 90,
      "breakdown": {
        "hasEan": true,
        "hasBrand": true,
        "hasMpn": true,
        "hasValidCategory": true,
        "hasImages": true,
        "hasAttributes": true,
        "hasDescription": true,
        "hasSeoMetadata": true,
        "hasPrice": true,
        "hasStock": true
      }
    },
    "dataHash": "hash_8055332_1636.46_5",
    "lastSyncedAt": "2026-09-01T15:48:11.560Z",
    "lastReprocessedAt": "2026-09-01T15:48:11.560Z",
    "createdAt": "2026-09-01T15:48:11.560Z",
    "updatedAt": "2026-09-01T15:48:11.560Z"
  },
  {
    "id": "ed-8055334",
    "supplierCode": "8055334",
    "sku": "8055334",
    "mpn": "21QX00HECK",
    "ean": "198157578036",
    "brand": "Lenovo",
    "categorySlug": "firemne-notebooky",
    "categoryHierarchy": [
      "Počítače a notebooky",
      "Notebooky",
      "Firemné a pracovné notebooky"
    ],
    "title": "LENOVO NTB ThinkPad T14s G6 - Ultra 7 258V,14\" WUXGA IPS Touch,32GB,1TSSD,HDMI,Int. Intel Arc,W11P,3Y Premier",
    "slug": "lenovo-ntb-thinkpad-t14s-g6-ultra-7-258v-14-wuxga-ips-touch-32gb-1tssd-hdmi-int-intel-arc-w11p-3y-premier-8055334",
    "shortDescription": "&lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Produkt: Lenovo ThinkPad T14s Gen 6 (INTEL)&lt;/strong&gt;&lt;br /&gt; &lt;strong&gt;Part Number: 21QX00HECK&lt;/strong&gt;&lt;/p&gt;\n&lt;p dir=\"LTR\" align=\"LEFT\"&gt; &lt;/p&gt;\n&lt;table id=\"lenovo\"&gt;\n&lt;tbody&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;VÝKON&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Procesor&lt;/td&gt;\n&lt;td&gt;Intel Core™ Ultra 7 258V, 8C (4P + 4LPE) / 8T, Max Turbo up to 4.8GHz, 12MB&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Grafická Karta&lt;/td&gt;\n&lt;td&gt;Integrated Intel Arc™ Graphics 140V&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Chipset&lt;/td&gt;\n&lt;td&gt;Intel SoC Platform&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pameť&lt;/td&gt;\n&lt;td&gt;32GB Soldered LPDDR5x-8533, MoP Memory&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pameťové sloty&lt;/td&gt;\n&lt;td&gt;Memory soldered to systemboard, no slots, dual-channel&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Max. Pameť&lt;/td&gt;\n&lt;td&gt;32GB soldered memory, not upgradable&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Úložisko&lt;/td&gt;\n&lt;td&gt;1TB SSD M.2 2280 PCIe 5.0x4 Performance NVMe Opal 2.0&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Podporované Úložisko&lt;/td&gt;\n&lt;td&gt;One drive, up to 1TB M.2 2280 SSD&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Čitačka Kariet&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Optická Mechanika&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Audio Chip&lt;/td&gt;\n&lt;td&gt;High Definition (HD) Audio, Realtek ALC3287 codec&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Reproduktory&lt;/td&gt;\n&lt;td&gt;Stereo speakers, 2W x2, Dolby Atmos&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Kamera&lt;/td&gt;\n&lt;td&gt;5.0MP + IR Discrete with Privacy Shutter, Computer Vision on ISP&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Mikrofon&lt;/td&gt;\n&lt;td&gt;2x, 360°&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Bateria&lt;/td&gt;\n&lt;td&gt;58Wh&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Max. výdrž na baterii&lt;/td&gt;\n&lt;td&gt;-&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Napájací Adaptér&lt;/td&gt;\n&lt;td&gt;65W USB-C Slim GaN (3-pin)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;DESIGN&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Displej&lt;/td&gt;\n&lt;td&gt;14\" WUXGA (1920x1200) IPS 400nits Anti-glare, 45% NTSC, 60Hz, DBEF5, Touch&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Dotyková obrazovka&lt;/td&gt;\n&lt;td&gt;On-cell, 10-point Multi-touch&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pero&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Klávesnica&lt;/td&gt;\n&lt;td&gt;Backlit, Czech / Slovak&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Farba&lt;/td&gt;\n&lt;td&gt;Black&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Materiál&lt;/td&gt;\n&lt;td&gt;Carbon Fiber Hybrid (Top), Aluminium (Bottom)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Rozmery (ŠxHxV)&lt;/td&gt;\n&lt;td&gt;313.6 x 219.4 x 16.9 mm (12.35 x 8.64 x 0.67 inches)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Hmotnost&lt;/td&gt;\n&lt;td&gt;Starting at 1.38 kg&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;SOFTWARE&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Operačný systém&lt;/td&gt;\n&lt;td&gt;Windows 11 Pro, Czech / Slovak / English&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Dodávaný software&lt;/td&gt;\n&lt;td&gt;Lenovo AI Now&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;KONEKTIVITA&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Ethernet&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;WLAN + Bluetooth&lt;/td&gt;\n&lt;td&gt;Intel Wi-Fi 7 BE201, 802.11be 2x2 + BT5.4&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Standartné porty&lt;/td&gt;\n&lt;td&gt;1x USB-A (USB 5Gbps / USB 3.2 Gen 1)&lt;br /&gt;1x USB-A (USB 5Gbps / USB 3.2 Gen 1), Always On&lt;br /&gt;2x USB-C (Thunderbolt™ 4 / USB4 40Gbps), with USB PD 3.0 and DisplayPort™ 2.1&lt;br /&gt;1x HDMI 2.1, up to 4K/60Hz&lt;br /&gt;1x Headphone / microphone combo jack (3.5mm)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;ZABEZPEČENÍ A SOUKROMÍ&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Čitačka otlačkov prstov&lt;/td&gt;\n&lt;td&gt;Touch Style, Match-on-Chip, Integrated in Power Button&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;SERVIS&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Základná záruka&lt;/td&gt;\n&lt;td&gt;3-year, Courier or Carry-in&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Zahrnutý Upgrade&lt;/td&gt;\n&lt;td&gt;3Y Premier Support HB (CPN), CO2 Offset 0.5 ton (2nd Generation Carbon Offset Projects)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;/tbody&gt;\n&lt;/table&gt;\n&lt;p&gt; &lt;/p&gt;",
    "supplierDescription": "&lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Produkt: Lenovo ThinkPad T14s Gen 6 (INTEL)&lt;/strong&gt;&lt;br /&gt; &lt;strong&gt;Part Number: 21QX00HECK&lt;/strong&gt;&lt;/p&gt;\n&lt;p dir=\"LTR\" align=\"LEFT\"&gt; &lt;/p&gt;\n&lt;table id=\"lenovo\"&gt;\n&lt;tbody&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;VÝKON&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Procesor&lt;/td&gt;\n&lt;td&gt;Intel Core™ Ultra 7 258V, 8C (4P + 4LPE) / 8T, Max Turbo up to 4.8GHz, 12MB&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Grafická Karta&lt;/td&gt;\n&lt;td&gt;Integrated Intel Arc™ Graphics 140V&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Chipset&lt;/td&gt;\n&lt;td&gt;Intel SoC Platform&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pameť&lt;/td&gt;\n&lt;td&gt;32GB Soldered LPDDR5x-8533, MoP Memory&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pameťové sloty&lt;/td&gt;\n&lt;td&gt;Memory soldered to systemboard, no slots, dual-channel&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Max. Pameť&lt;/td&gt;\n&lt;td&gt;32GB soldered memory, not upgradable&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Úložisko&lt;/td&gt;\n&lt;td&gt;1TB SSD M.2 2280 PCIe 5.0x4 Performance NVMe Opal 2.0&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Podporované Úložisko&lt;/td&gt;\n&lt;td&gt;One drive, up to 1TB M.2 2280 SSD&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Čitačka Kariet&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Optická Mechanika&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Audio Chip&lt;/td&gt;\n&lt;td&gt;High Definition (HD) Audio, Realtek ALC3287 codec&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Reproduktory&lt;/td&gt;\n&lt;td&gt;Stereo speakers, 2W x2, Dolby Atmos&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Kamera&lt;/td&gt;\n&lt;td&gt;5.0MP + IR Discrete with Privacy Shutter, Computer Vision on ISP&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Mikrofon&lt;/td&gt;\n&lt;td&gt;2x, 360°&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Bateria&lt;/td&gt;\n&lt;td&gt;58Wh&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Max. výdrž na baterii&lt;/td&gt;\n&lt;td&gt;-&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Napájací Adaptér&lt;/td&gt;\n&lt;td&gt;65W USB-C Slim GaN (3-pin)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;DESIGN&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Displej&lt;/td&gt;\n&lt;td&gt;14\" WUXGA (1920x1200) IPS 400nits Anti-glare, 45% NTSC, 60Hz, DBEF5, Touch&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Dotyková obrazovka&lt;/td&gt;\n&lt;td&gt;On-cell, 10-point Multi-touch&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pero&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Klávesnica&lt;/td&gt;\n&lt;td&gt;Backlit, Czech / Slovak&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Farba&lt;/td&gt;\n&lt;td&gt;Black&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Materiál&lt;/td&gt;\n&lt;td&gt;Carbon Fiber Hybrid (Top), Aluminium (Bottom)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Rozmery (ŠxHxV)&lt;/td&gt;\n&lt;td&gt;313.6 x 219.4 x 16.9 mm (12.35 x 8.64 x 0.67 inches)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Hmotnost&lt;/td&gt;\n&lt;td&gt;Starting at 1.38 kg&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;SOFTWARE&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Operačný systém&lt;/td&gt;\n&lt;td&gt;Windows 11 Pro, Czech / Slovak / English&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Dodávaný software&lt;/td&gt;\n&lt;td&gt;Lenovo AI Now&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;KONEKTIVITA&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Ethernet&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;WLAN + Bluetooth&lt;/td&gt;\n&lt;td&gt;Intel Wi-Fi 7 BE201, 802.11be 2x2 + BT5.4&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Standartné porty&lt;/td&gt;\n&lt;td&gt;1x USB-A (USB 5Gbps / USB 3.2 Gen 1)&lt;br /&gt;1x USB-A (USB 5Gbps / USB 3.2 Gen 1), Always On&lt;br /&gt;2x USB-C (Thunderbolt™ 4 / USB4 40Gbps), with USB PD 3.0 and DisplayPort™ 2.1&lt;br /&gt;1x HDMI 2.1, up to 4K/60Hz&lt;br /&gt;1x Headphone / microphone combo jack (3.5mm)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;ZABEZPEČENÍ A SOUKROMÍ&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Čitačka otlačkov prstov&lt;/td&gt;\n&lt;td&gt;Touch Style, Match-on-Chip, Integrated in Power Button&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;SERVIS&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Základná záruka&lt;/td&gt;\n&lt;td&gt;3-year, Courier or Carry-in&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Zahrnutý Upgrade&lt;/td&gt;\n&lt;td&gt;3Y Premier Support HB (CPN), CO2 Offset 0.5 ton (2nd Generation Carbon Offset Projects)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;/tbody&gt;\n&lt;/table&gt;\n&lt;p&gt; &lt;/p&gt;",
    "seoTitle": "LENOVO NTB ThinkPad T14s G6 - Ultra 7 258V,14\" WUXGA IPS Touch,32GB,1TSSD,HDMI,Int. Intel Arc,W11P,3Y Premier | Worlds.sk",
    "seoDescription": "Kúpiť LENOVO NTB ThinkPad T14s G6 - Ultra 7 258V,14\" WUXGA IPS Touch,32GB,1TSSD,HDMI,Int. Intel Arc,W11P,3Y Premier (PartNumber: 21QX00HECK) za výhodnú cenu 2255.86 € s expresným doručením z centrálneho skladu na Worlds.sk.",
    "searchKeywords": [
      "lenovo",
      "21qx00heck",
      "firemne-notebooky"
    ],
    "pricing": {
      "supplierCost": 1678.46,
      "supplierFees": {
        "garbageFee": 0.42,
        "authorFee": 6.04
      },
      "totalCostWithFees": 1678.46,
      "vatRate": 20,
      "marginPercentage": 12,
      "basePrice": 1879.88,
      "finalPrice": 2255.86,
      "currency": "EUR"
    },
    "stockCount": 5,
    "isInStock": true,
    "stockText": "Skladom > 5 ks",
    "warrantyMonths": 24,
    "attributes": {
      "brand": {
        "code": "brand",
        "name": "Výrobca",
        "value": "Lenovo",
        "rawValue": "Lenovo"
      },
      "mpn": {
        "code": "mpn",
        "name": "Part Number",
        "value": "21QX00HECK",
        "rawValue": "21QX00HECK"
      },
      "warranty": {
        "code": "warranty",
        "name": "Záruka",
        "value": "24 mesiacov",
        "rawValue": "24"
      }
    },
    "images": [
      {
        "id": "img-8055334",
        "url": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80",
        "position": 0,
        "isPrimary": true,
        "altText": "LENOVO NTB ThinkPad T14s G6 - Ultra 7 258V,14\" WUXGA IPS Touch,32GB,1TSSD,HDMI,Int. Intel Arc,W11P,3Y Premier"
      }
    ],
    "status": "ACTIVE",
    "reviewStatus": "AUTO_APPROVED",
    "qualityScore": {
      "total": 90,
      "breakdown": {
        "hasEan": true,
        "hasBrand": true,
        "hasMpn": true,
        "hasValidCategory": true,
        "hasImages": true,
        "hasAttributes": true,
        "hasDescription": true,
        "hasSeoMetadata": true,
        "hasPrice": true,
        "hasStock": true
      }
    },
    "dataHash": "hash_8055334_1678.46_5",
    "lastSyncedAt": "2026-09-01T15:48:11.560Z",
    "lastReprocessedAt": "2026-09-01T15:48:11.560Z",
    "createdAt": "2026-09-01T15:48:11.560Z",
    "updatedAt": "2026-09-01T15:48:11.560Z"
  },
  {
    "id": "ed-805638",
    "supplierCode": "805638",
    "sku": "805638",
    "mpn": "21ST001HCK",
    "ean": "198157664524",
    "brand": "Lenovo",
    "categorySlug": "firemne-notebooky",
    "categoryHierarchy": [
      "Počítače a notebooky",
      "Notebooky",
      "Firemné a pracovné notebooky"
    ],
    "title": "LENOVO NTB ThinkPad E16 AMD G3 - Ryzen5 230,16\" WUXGA,16GB,512SSD,FHD+IRcam,W11P",
    "slug": "lenovo-ntb-thinkpad-e16-amd-g3-ryzen5-230-16-wuxga-16gb-512ssd-fhd-ircam-w11p-805638",
    "shortDescription": "&lt;div class=\"tpl-product-detail-desc\"&gt;\n&lt;h2 class=\"text-primary cross-sell_group\"&gt;Technické parametre&lt;/h2&gt;\n&lt;table class=\"table\"&gt;\n&lt;tbody&gt;\n&lt;tr&gt;\n&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;VÝKON&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Procesor&lt;/td&gt;\n&lt;td&gt;AMD Ryzen 5 230 (6C / 12T, 3.5 / 4.9GHz, 6MB L2 / 16MB L3)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Grafická Karta&lt;/td&gt;\n&lt;td&gt;Integrated AMD Radeon 760M Graphics&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Chipset&lt;/td&gt;\n&lt;td&gt;AMD SoC Platform&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pamäť&lt;/td&gt;\n&lt;td&gt;1x 16GB SO-DIMM DDR5-5600&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pamäťové sloty&lt;/td&gt;\n&lt;td&gt;2x DDR5-4800 SO-DIMM slot, dual-channel kompatibilné&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Max. Pamäť&lt;/td&gt;\n&lt;td&gt;Až 64GB DDR5-5600&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Úložisko&lt;/td&gt;\n&lt;td&gt;512GB SSD M.2 2242 PCIe 4.0x4 NVMe Opal 2.0&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Podporované Úložiská&lt;/td&gt;\n&lt;td&gt;Až 2x disk, 2x M.2 SSD&lt;br /&gt;• M.2 2242 SSD až 1TB&lt;br /&gt;• M.2 2280 SSD do 1TB&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Slot pre Úložisko&lt;/td&gt;\n&lt;td&gt;2x M.2 slot&lt;br /&gt;• 1x M.2 2242 PCIe 4.0 x4 slot&lt;br /&gt;• 1x M.2 2280 PCIe 4.0 x4 slot&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Čítačka kariet&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Optická mechanika&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Audio čip&lt;/td&gt;\n&lt;td&gt;High Definition (HD) Audio, Senary SN6147 codec&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Reproduktory&lt;/td&gt;\n&lt;td&gt;Stereo reproduktory, 2W x2, Dolby Atmos, audio od HARMAN&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Kamera&lt;/td&gt;\n&lt;td&gt;FHD 1080p + IR Hybrid s krytkou kamery&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Mikrofón&lt;/td&gt;\n&lt;td&gt;2x&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Baterka&lt;/td&gt;\n&lt;td&gt;64Wh&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Napájací adaptér&lt;/td&gt;\n&lt;td&gt;65W USB-C (3-pól)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;DIZAJN&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Displej&lt;/td&gt;\n&lt;td&gt;16\" WUXGA (1920x1200) IPS 300nits Anti-glare, 45% NTSC&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Dotyková obrazovka&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Klávesnica&lt;/td&gt;\n&lt;td&gt;Podsvietená, CZ/SK&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Farba&lt;/td&gt;\n&lt;td&gt;Čierna&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Materiál&lt;/td&gt;\n&lt;td&gt;Hliník (kryt), Hliník (telo)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Rozmery (ŠxHxV)&lt;/td&gt;\n&lt;td&gt;356 x 249 x 10.1/17.05 (vpredu/vzadu), 21.15 (maximálne) mm&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Hmotnosť&lt;/td&gt;\n&lt;td&gt;Od 1.71 kg&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;SOFTVÉR&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Operačný systém&lt;/td&gt;\n&lt;td&gt;Windows 11 Pro, CZ/SK/EN&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Dodávaný softvér&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;KONEKTIVITA&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Ethernet&lt;/td&gt;\n&lt;td&gt;100/1000M (RJ-45)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;WLAN + Bluetooth&lt;/td&gt;\n&lt;td&gt;Wi-Fi 6E, 11ax 2x2 + BT5.3&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;WWAN&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;SIM karta&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;NFC&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Štandardné porty&lt;/td&gt;\n&lt;td&gt;1x USB-A (USB 5Gbps / USB 3.2 Gen 1)&lt;br /&gt;1x USB-A (USB 10Gbps / USB 3.2 Gen 2), stále napájané&lt;br /&gt;1x USB-C (USB 5Gbps / USB 3.2 Gen 1), s USB PD 3.1 a DisplayPort 1.4&lt;br /&gt;1x USB-C (USB4 40Gbps), s USB PD 3.1 a DisplayPort 1.4a&lt;br /&gt;1x HDMI 2.1, až 4K/60Hz&lt;br /&gt;1x slúchadlový/mikrofónny combo jack (3.5mm)&lt;br /&gt;1x Ethernet (RJ-45)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Kábel monitoru&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;BEZPEČNOSŤ A OCHRANA SÚKROMIA&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Čítačka SmartCard&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Bezpečnostný čip&lt;/td&gt;\n&lt;td&gt;Discrete TPM 2.0 Enabled&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Čítačka odtlačkov prstov&lt;/td&gt;\n&lt;td&gt;Dotykové ovládanie, integrované do tlačidla napájania&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Fyzický zámok&lt;/td&gt;\n&lt;td&gt;Kensington Nano Security Slot, 2.5 x 6 mm&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Ďalšie zabezpečenie&lt;/td&gt;\n&lt;td&gt;IR kamera pre Windows Hello&lt;br /&gt;Záslepka kamery&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt; OVLÁDATEĽNOSŤ&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Riadenie systému&lt;/td&gt;\n&lt;td&gt;Non-DASH&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;SLUŽBY&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Záručná doba&lt;/td&gt;\n&lt;td&gt;1 rok v servise&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Zahrnuté vylepšenie&lt;/td&gt;\n&lt;td&gt;3 ROKY onsite&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;DOPLNKY&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Príslušenstvo v balení&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;CERTIFIKÁCIA&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Zelená certifikácia&lt;/td&gt;\n&lt;td&gt;ENERGY STAR 9.0&lt;br /&gt;EPEAT Gold Registered&lt;br /&gt;ErP Lot 6/26&lt;br /&gt;RoHS compliant&lt;br /&gt;TCO Certified 10.0&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Ostatné certifikácie&lt;/td&gt;\n&lt;td&gt;TÜV Rheinland Low Blue Light (Softvérové riešenie)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Mil-Spec Testy&lt;/td&gt;\n&lt;td&gt;MIL-STD-810H vojenské testy - splnené&lt;/td&gt;\n&lt;/tr&gt;\n&lt;/tbody&gt;\n&lt;/table&gt;\n&lt;p&gt; &lt;/p&gt;\n&lt;/div&gt;&lt;p&gt;&lt;em&gt;Popis produktu bol preložený pomocou umelej inteligencie a môže obsahovať nepresnosti.&lt;/em&gt;&lt;/p&gt;",
    "supplierDescription": "&lt;div class=\"tpl-product-detail-desc\"&gt;\n&lt;h2 class=\"text-primary cross-sell_group\"&gt;Technické parametre&lt;/h2&gt;\n&lt;table class=\"table\"&gt;\n&lt;tbody&gt;\n&lt;tr&gt;\n&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;VÝKON&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Procesor&lt;/td&gt;\n&lt;td&gt;AMD Ryzen 5 230 (6C / 12T, 3.5 / 4.9GHz, 6MB L2 / 16MB L3)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Grafická Karta&lt;/td&gt;\n&lt;td&gt;Integrated AMD Radeon 760M Graphics&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Chipset&lt;/td&gt;\n&lt;td&gt;AMD SoC Platform&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pamäť&lt;/td&gt;\n&lt;td&gt;1x 16GB SO-DIMM DDR5-5600&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pamäťové sloty&lt;/td&gt;\n&lt;td&gt;2x DDR5-4800 SO-DIMM slot, dual-channel kompatibilné&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Max. Pamäť&lt;/td&gt;\n&lt;td&gt;Až 64GB DDR5-5600&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Úložisko&lt;/td&gt;\n&lt;td&gt;512GB SSD M.2 2242 PCIe 4.0x4 NVMe Opal 2.0&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Podporované Úložiská&lt;/td&gt;\n&lt;td&gt;Až 2x disk, 2x M.2 SSD&lt;br /&gt;• M.2 2242 SSD až 1TB&lt;br /&gt;• M.2 2280 SSD do 1TB&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Slot pre Úložisko&lt;/td&gt;\n&lt;td&gt;2x M.2 slot&lt;br /&gt;• 1x M.2 2242 PCIe 4.0 x4 slot&lt;br /&gt;• 1x M.2 2280 PCIe 4.0 x4 slot&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Čítačka kariet&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Optická mechanika&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Audio čip&lt;/td&gt;\n&lt;td&gt;High Definition (HD) Audio, Senary SN6147 codec&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Reproduktory&lt;/td&gt;\n&lt;td&gt;Stereo reproduktory, 2W x2, Dolby Atmos, audio od HARMAN&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Kamera&lt;/td&gt;\n&lt;td&gt;FHD 1080p + IR Hybrid s krytkou kamery&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Mikrofón&lt;/td&gt;\n&lt;td&gt;2x&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Baterka&lt;/td&gt;\n&lt;td&gt;64Wh&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Napájací adaptér&lt;/td&gt;\n&lt;td&gt;65W USB-C (3-pól)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;DIZAJN&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Displej&lt;/td&gt;\n&lt;td&gt;16\" WUXGA (1920x1200) IPS 300nits Anti-glare, 45% NTSC&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Dotyková obrazovka&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Klávesnica&lt;/td&gt;\n&lt;td&gt;Podsvietená, CZ/SK&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Farba&lt;/td&gt;\n&lt;td&gt;Čierna&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Materiál&lt;/td&gt;\n&lt;td&gt;Hliník (kryt), Hliník (telo)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Rozmery (ŠxHxV)&lt;/td&gt;\n&lt;td&gt;356 x 249 x 10.1/17.05 (vpredu/vzadu), 21.15 (maximálne) mm&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Hmotnosť&lt;/td&gt;\n&lt;td&gt;Od 1.71 kg&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;SOFTVÉR&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Operačný systém&lt;/td&gt;\n&lt;td&gt;Windows 11 Pro, CZ/SK/EN&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Dodávaný softvér&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;KONEKTIVITA&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Ethernet&lt;/td&gt;\n&lt;td&gt;100/1000M (RJ-45)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;WLAN + Bluetooth&lt;/td&gt;\n&lt;td&gt;Wi-Fi 6E, 11ax 2x2 + BT5.3&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;WWAN&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;SIM karta&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;NFC&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Štandardné porty&lt;/td&gt;\n&lt;td&gt;1x USB-A (USB 5Gbps / USB 3.2 Gen 1)&lt;br /&gt;1x USB-A (USB 10Gbps / USB 3.2 Gen 2), stále napájané&lt;br /&gt;1x USB-C (USB 5Gbps / USB 3.2 Gen 1), s USB PD 3.1 a DisplayPort 1.4&lt;br /&gt;1x USB-C (USB4 40Gbps), s USB PD 3.1 a DisplayPort 1.4a&lt;br /&gt;1x HDMI 2.1, až 4K/60Hz&lt;br /&gt;1x slúchadlový/mikrofónny combo jack (3.5mm)&lt;br /&gt;1x Ethernet (RJ-45)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Kábel monitoru&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;BEZPEČNOSŤ A OCHRANA SÚKROMIA&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Čítačka SmartCard&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Bezpečnostný čip&lt;/td&gt;\n&lt;td&gt;Discrete TPM 2.0 Enabled&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Čítačka odtlačkov prstov&lt;/td&gt;\n&lt;td&gt;Dotykové ovládanie, integrované do tlačidla napájania&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Fyzický zámok&lt;/td&gt;\n&lt;td&gt;Kensington Nano Security Slot, 2.5 x 6 mm&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Ďalšie zabezpečenie&lt;/td&gt;\n&lt;td&gt;IR kamera pre Windows Hello&lt;br /&gt;Záslepka kamery&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt; OVLÁDATEĽNOSŤ&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Riadenie systému&lt;/td&gt;\n&lt;td&gt;Non-DASH&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;SLUŽBY&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Záručná doba&lt;/td&gt;\n&lt;td&gt;1 rok v servise&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Zahrnuté vylepšenie&lt;/td&gt;\n&lt;td&gt;3 ROKY onsite&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;DOPLNKY&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Príslušenstvo v balení&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th class=\"table-row--highlight badge--primary\" colspan=\"2\" scope=\"colgroup\"&gt;CERTIFIKÁCIA&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Zelená certifikácia&lt;/td&gt;\n&lt;td&gt;ENERGY STAR 9.0&lt;br /&gt;EPEAT Gold Registered&lt;br /&gt;ErP Lot 6/26&lt;br /&gt;RoHS compliant&lt;br /&gt;TCO Certified 10.0&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Ostatné certifikácie&lt;/td&gt;\n&lt;td&gt;TÜV Rheinland Low Blue Light (Softvérové riešenie)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Mil-Spec Testy&lt;/td&gt;\n&lt;td&gt;MIL-STD-810H vojenské testy - splnené&lt;/td&gt;\n&lt;/tr&gt;\n&lt;/tbody&gt;\n&lt;/table&gt;\n&lt;p&gt; &lt;/p&gt;\n&lt;/div&gt;&lt;p&gt;&lt;em&gt;Popis produktu bol preložený pomocou umelej inteligencie a môže obsahovať nepresnosti.&lt;/em&gt;&lt;/p&gt;",
    "seoTitle": "LENOVO NTB ThinkPad E16 AMD G3 - Ryzen5 230,16\" WUXGA,16GB,512SSD,FHD+IRcam,W11P | Worlds.sk",
    "seoDescription": "Kúpiť LENOVO NTB ThinkPad E16 AMD G3 - Ryzen5 230,16\" WUXGA,16GB,512SSD,FHD+IRcam,W11P (PartNumber: 21ST001HCK) za výhodnú cenu 1324.26 € s expresným doručením z centrálneho skladu na Worlds.sk.",
    "searchKeywords": [
      "lenovo",
      "21st001hck",
      "firemne-notebooky"
    ],
    "pricing": {
      "supplierCost": 985.31,
      "supplierFees": {
        "garbageFee": 0.42,
        "authorFee": 6.04
      },
      "totalCostWithFees": 985.31,
      "vatRate": 20,
      "marginPercentage": 12,
      "basePrice": 1103.55,
      "finalPrice": 1324.26,
      "currency": "EUR"
    },
    "stockCount": 99,
    "isInStock": true,
    "stockText": "Skladom > 99 ks",
    "warrantyMonths": 24,
    "attributes": {
      "brand": {
        "code": "brand",
        "name": "Výrobca",
        "value": "Lenovo",
        "rawValue": "Lenovo"
      },
      "mpn": {
        "code": "mpn",
        "name": "Part Number",
        "value": "21ST001HCK",
        "rawValue": "21ST001HCK"
      },
      "warranty": {
        "code": "warranty",
        "name": "Záruka",
        "value": "24 mesiacov",
        "rawValue": "24"
      }
    },
    "images": [
      {
        "id": "img-805638",
        "url": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80",
        "position": 0,
        "isPrimary": true,
        "altText": "LENOVO NTB ThinkPad E16 AMD G3 - Ryzen5 230,16\" WUXGA,16GB,512SSD,FHD+IRcam,W11P"
      }
    ],
    "status": "ACTIVE",
    "reviewStatus": "AUTO_APPROVED",
    "qualityScore": {
      "total": 90,
      "breakdown": {
        "hasEan": true,
        "hasBrand": true,
        "hasMpn": true,
        "hasValidCategory": true,
        "hasImages": true,
        "hasAttributes": true,
        "hasDescription": true,
        "hasSeoMetadata": true,
        "hasPrice": true,
        "hasStock": true
      }
    },
    "dataHash": "hash_805638_985.31_99",
    "lastSyncedAt": "2026-09-01T15:48:11.560Z",
    "lastReprocessedAt": "2026-09-01T15:48:11.560Z",
    "createdAt": "2026-09-01T15:48:11.560Z",
    "updatedAt": "2026-09-01T15:48:11.560Z"
  },
  {
    "id": "ed-11294775",
    "supplierCode": "11294775",
    "sku": "11294775",
    "mpn": "GP.GCR11.00V",
    "ean": "4711474000804",
    "brand": "Acer",
    "categorySlug": "herne-notebooky",
    "categoryHierarchy": [
      "Počítače a notebooky",
      "Notebooky",
      "Herné notebooky"
    ],
    "title": "ACER herní křeslo/židle Predator Rift Pro,4D područky,zádová opěrka,otočná konstrukce,Black",
    "slug": "acer-hern-k-eslo-idle-predator-rift-pro-4d-podru-ky-z-dov-op-rka-oto-n-konstrukce-black-11294775",
    "shortDescription": "&lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;span style=\"font-family: verdana,geneva,sans-serif; font-size: 8pt;\"&gt;&lt;strong&gt;ACER Predator Gaming Chair Rift Pro PGC371&lt;/strong&gt;&lt;/span&gt;&lt;br /&gt;&lt;span style=\"font-family: verdana,geneva,sans-serif; font-size: 8pt;\"&gt; &lt;strong&gt;PN: GP.GCR11.010&lt;/strong&gt;&lt;/span&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;span style=\"font-family: verdana,geneva,sans-serif; font-size: 8pt;\"&gt;&lt;strong&gt;Špecifikácie&lt;/strong&gt;&lt;br /&gt; Polštárek pod hlavu: Áno Polštárek pod bedrá: Áno Naklopenie operadla: Áno Náklon operadla: 90°-160° &lt;br /&gt;&lt;span style=\"font-family: verdana,geneva,sans-serif; font-size: 8pt;\"&gt;&lt;span style=\"font-family: verdana,geneva,sans-serif; font-size: 8pt;\"&gt;Nastaviteľné podrúčky: Áno, 4D&lt;br /&gt; Výškovo nastaviteľné sedadlo: Áno, 100mm&lt;br /&gt; Otočná konštrukcia: Áno&lt;br /&gt; Rám: kovový&lt;br /&gt; Kolesá: Pevné, vhodné pre koberce&lt;/span&gt;&lt;/span&gt;&lt;/span&gt;&lt;/p&gt; &lt;p&gt;&lt;span style=\"font-family: verdana,geneva,sans-serif; font-size: 8pt;\"&gt;&lt;strong&gt;Fyzické charakteristiky&lt;/strong&gt;&lt;br /&gt; Farba: Čierna, Modrá&lt;br /&gt; Materiál: Syntetická koža s prešívaním&lt;br /&gt; Nosnosť: 170 kg&lt;/span&gt;&lt;/p&gt; &lt;p&gt;&lt;em&gt;Popis produktu bol preložený pomocou umelej inteligencie a môže obsahovať nepresnosti.&lt;/em&gt;&lt;/p&gt;",
    "supplierDescription": "&lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;span style=\"font-family: verdana,geneva,sans-serif; font-size: 8pt;\"&gt;&lt;strong&gt;ACER Predator Gaming Chair Rift Pro PGC371&lt;/strong&gt;&lt;/span&gt;&lt;br /&gt;&lt;span style=\"font-family: verdana,geneva,sans-serif; font-size: 8pt;\"&gt; &lt;strong&gt;PN: GP.GCR11.010&lt;/strong&gt;&lt;/span&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;span style=\"font-family: verdana,geneva,sans-serif; font-size: 8pt;\"&gt;&lt;strong&gt;Špecifikácie&lt;/strong&gt;&lt;br /&gt; Polštárek pod hlavu: Áno Polštárek pod bedrá: Áno Naklopenie operadla: Áno Náklon operadla: 90°-160° &lt;br /&gt;&lt;span style=\"font-family: verdana,geneva,sans-serif; font-size: 8pt;\"&gt;&lt;span style=\"font-family: verdana,geneva,sans-serif; font-size: 8pt;\"&gt;Nastaviteľné podrúčky: Áno, 4D&lt;br /&gt; Výškovo nastaviteľné sedadlo: Áno, 100mm&lt;br /&gt; Otočná konštrukcia: Áno&lt;br /&gt; Rám: kovový&lt;br /&gt; Kolesá: Pevné, vhodné pre koberce&lt;/span&gt;&lt;/span&gt;&lt;/span&gt;&lt;/p&gt; &lt;p&gt;&lt;span style=\"font-family: verdana,geneva,sans-serif; font-size: 8pt;\"&gt;&lt;strong&gt;Fyzické charakteristiky&lt;/strong&gt;&lt;br /&gt; Farba: Čierna, Modrá&lt;br /&gt; Materiál: Syntetická koža s prešívaním&lt;br /&gt; Nosnosť: 170 kg&lt;/span&gt;&lt;/p&gt; &lt;p&gt;&lt;em&gt;Popis produktu bol preložený pomocou umelej inteligencie a môže obsahovať nepresnosti.&lt;/em&gt;&lt;/p&gt;",
    "seoTitle": "ACER herní křeslo/židle Predator Rift Pro,4D područky,zádová opěrka,otočná konstrukce,Black | Worlds.sk",
    "seoDescription": "Kúpiť ACER herní křeslo/židle Predator Rift Pro,4D područky,zádová opěrka,otočná konstrukce,Black (PartNumber: GP.GCR11.00V) za výhodnú cenu 379.01 € s expresným doručením z centrálneho skladu na Worlds.sk.",
    "searchKeywords": [
      "acer",
      "gp.gcr11.00v",
      "herne-notebooky"
    ],
    "pricing": {
      "supplierCost": 282,
      "supplierFees": {
        "garbageFee": 0,
        "authorFee": 0
      },
      "totalCostWithFees": 282,
      "vatRate": 20,
      "marginPercentage": 12,
      "basePrice": 315.84,
      "finalPrice": 379.01,
      "currency": "EUR"
    },
    "stockCount": 31,
    "isInStock": true,
    "stockText": "Skladom > 31 ks",
    "warrantyMonths": 24,
    "attributes": {
      "brand": {
        "code": "brand",
        "name": "Výrobca",
        "value": "Acer",
        "rawValue": "Acer"
      },
      "mpn": {
        "code": "mpn",
        "name": "Part Number",
        "value": "GP.GCR11.00V",
        "rawValue": "GP.GCR11.00V"
      },
      "warranty": {
        "code": "warranty",
        "name": "Záruka",
        "value": "24 mesiacov",
        "rawValue": "24"
      }
    },
    "images": [
      {
        "id": "img-11294775",
        "url": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80",
        "position": 0,
        "isPrimary": true,
        "altText": "ACER herní křeslo/židle Predator Rift Pro,4D područky,zádová opěrka,otočná konstrukce,Black"
      }
    ],
    "status": "ACTIVE",
    "reviewStatus": "AUTO_APPROVED",
    "qualityScore": {
      "total": 90,
      "breakdown": {
        "hasEan": true,
        "hasBrand": true,
        "hasMpn": true,
        "hasValidCategory": true,
        "hasImages": true,
        "hasAttributes": true,
        "hasDescription": true,
        "hasSeoMetadata": true,
        "hasPrice": true,
        "hasStock": true
      }
    },
    "dataHash": "hash_11294775_282_31",
    "lastSyncedAt": "2026-09-01T15:48:11.560Z",
    "lastReprocessedAt": "2026-09-01T15:48:11.560Z",
    "createdAt": "2026-09-01T15:48:11.560Z",
    "updatedAt": "2026-09-01T15:48:11.560Z"
  },
  {
    "id": "ed-11294783",
    "supplierCode": "11294783",
    "sku": "11294783",
    "mpn": "NH.QZ8EC.00D",
    "ean": "4711474596659",
    "brand": "Acer",
    "categorySlug": "herne-notebooky",
    "categoryHierarchy": [
      "Počítače a notebooky",
      "Notebooky",
      "Herné notebooky"
    ],
    "title": "ACER NTB Nitro V 15 (ANV15-52-97LA),i9-13900,15.6\"FHD,16GB,1TB SSD,RTX 5060,Linux,Black",
    "slug": "acer-ntb-nitro-v-15-anv15-52-97la-i9-13900-15-6-fhd-16gb-1tb-ssd-rtx-5060-linux-black-11294783",
    "shortDescription": "&lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;ACER NTB Nitro V 15 (ANV15-52-97LA)&lt;/strong&gt;&lt;br /&gt; &lt;strong&gt;Číslo dielu: NH.QZ8EC.00D&lt;/strong&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Procesor&lt;/strong&gt;&lt;br /&gt; Výrobca procesora: Intel&lt;br /&gt; Model procesora: Core i9-13900&lt;br /&gt; Rýchlosť procesora: 2,0 GHz&lt;br /&gt; Počet jadier: 24&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Zobrazenie a grafika&lt;/strong&gt;&lt;br /&gt; Grafická karta: NVIDIA GeForce RTX™ 5060&lt;br /&gt; Veľkosť displeja: 15,6\"&lt;br /&gt; Technológia displeja obrazovky: IPS&lt;br /&gt; Typ displeja: Matný&lt;br /&gt; Dotykový displej: Nie&lt;br /&gt; Režim obrazovky: FHD&lt;br /&gt; Rozlíšenie obrazovky: 1920 x 1080&lt;br /&gt; Pomer strán: 16:9&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Pamäť&lt;/strong&gt;&lt;br /&gt; Štandardná pamäť: 16 GB (2x8)&lt;br /&gt; Technológia pamäti: DDR4&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Úložisko&lt;/strong&gt;&lt;br /&gt; Celková kapacita disku SSD: 1024 GB&lt;br /&gt; Typ SSD: PCIe NVMe SSD PM4 + N (M.2)&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Siete a komunikácia&lt;/strong&gt;&lt;br /&gt; Wifi 6 802.11ax 2x2 MU-MIMO: Áno&lt;br /&gt; Bluetooth 5.1: Áno&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Rozhranie/porty&lt;/strong&gt;&lt;br /&gt; 3x USB 3.2 Gen1&lt;br /&gt; 1x USB Type-C&lt;br /&gt; DisplayPort cez USB-C&lt;br /&gt; Thunderbolt™ 4 &lt;br /&gt; HDMI 2.1 &lt;br /&gt; RJ-45&lt;br /&gt; Kensington lock slot: Áno&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Softvér&lt;/strong&gt;&lt;br /&gt; Operačný systém: ESHELL Linux (iba na štart)&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Výbava&lt;/strong&gt;&lt;br /&gt; HD TNR kamera s 2Mic.: Áno&lt;br /&gt; Čítačka odtlačkov prstov: Nie&lt;br /&gt; Čítačka pamäťových kariet: Nie&lt;br /&gt; Optická mechanika: Nie&lt;br /&gt; Podsvietenie klávesnice: Áno&lt;br /&gt; Touchpad: Áno&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Informácie o batérii&lt;/strong&gt;&lt;br /&gt; Počet článkov: 4-články&lt;br /&gt; Chemické zloženie batérie: Lithium-iontový (Li-Ion)&lt;br /&gt; Energia batérie: 76Wh&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Popis napájania&lt;/strong&gt;&lt;br /&gt; 135W 5.5mm Slim AC adaptér PCR50%&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Fyzické charakteristiky&lt;/strong&gt;&lt;br /&gt; Farba: Obsidian čierna&lt;br /&gt; Rozmery: 362.3 (W) x 239.89 (H) x 27 (H) mm&lt;br /&gt; Hmotnosť (približná): 2.1 kg&lt;/p&gt; &lt;p&gt;&lt;em&gt;Popis produktu bol preložený pomocou umelej inteligencie a môže obsahovať nepresnosti.&lt;/em&gt;&lt;/p&gt;",
    "supplierDescription": "&lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;ACER NTB Nitro V 15 (ANV15-52-97LA)&lt;/strong&gt;&lt;br /&gt; &lt;strong&gt;Číslo dielu: NH.QZ8EC.00D&lt;/strong&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Procesor&lt;/strong&gt;&lt;br /&gt; Výrobca procesora: Intel&lt;br /&gt; Model procesora: Core i9-13900&lt;br /&gt; Rýchlosť procesora: 2,0 GHz&lt;br /&gt; Počet jadier: 24&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Zobrazenie a grafika&lt;/strong&gt;&lt;br /&gt; Grafická karta: NVIDIA GeForce RTX™ 5060&lt;br /&gt; Veľkosť displeja: 15,6\"&lt;br /&gt; Technológia displeja obrazovky: IPS&lt;br /&gt; Typ displeja: Matný&lt;br /&gt; Dotykový displej: Nie&lt;br /&gt; Režim obrazovky: FHD&lt;br /&gt; Rozlíšenie obrazovky: 1920 x 1080&lt;br /&gt; Pomer strán: 16:9&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Pamäť&lt;/strong&gt;&lt;br /&gt; Štandardná pamäť: 16 GB (2x8)&lt;br /&gt; Technológia pamäti: DDR4&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Úložisko&lt;/strong&gt;&lt;br /&gt; Celková kapacita disku SSD: 1024 GB&lt;br /&gt; Typ SSD: PCIe NVMe SSD PM4 + N (M.2)&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Siete a komunikácia&lt;/strong&gt;&lt;br /&gt; Wifi 6 802.11ax 2x2 MU-MIMO: Áno&lt;br /&gt; Bluetooth 5.1: Áno&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Rozhranie/porty&lt;/strong&gt;&lt;br /&gt; 3x USB 3.2 Gen1&lt;br /&gt; 1x USB Type-C&lt;br /&gt; DisplayPort cez USB-C&lt;br /&gt; Thunderbolt™ 4 &lt;br /&gt; HDMI 2.1 &lt;br /&gt; RJ-45&lt;br /&gt; Kensington lock slot: Áno&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Softvér&lt;/strong&gt;&lt;br /&gt; Operačný systém: ESHELL Linux (iba na štart)&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Výbava&lt;/strong&gt;&lt;br /&gt; HD TNR kamera s 2Mic.: Áno&lt;br /&gt; Čítačka odtlačkov prstov: Nie&lt;br /&gt; Čítačka pamäťových kariet: Nie&lt;br /&gt; Optická mechanika: Nie&lt;br /&gt; Podsvietenie klávesnice: Áno&lt;br /&gt; Touchpad: Áno&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Informácie o batérii&lt;/strong&gt;&lt;br /&gt; Počet článkov: 4-články&lt;br /&gt; Chemické zloženie batérie: Lithium-iontový (Li-Ion)&lt;br /&gt; Energia batérie: 76Wh&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Popis napájania&lt;/strong&gt;&lt;br /&gt; 135W 5.5mm Slim AC adaptér PCR50%&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Fyzické charakteristiky&lt;/strong&gt;&lt;br /&gt; Farba: Obsidian čierna&lt;br /&gt; Rozmery: 362.3 (W) x 239.89 (H) x 27 (H) mm&lt;br /&gt; Hmotnosť (približná): 2.1 kg&lt;/p&gt; &lt;p&gt;&lt;em&gt;Popis produktu bol preložený pomocou umelej inteligencie a môže obsahovať nepresnosti.&lt;/em&gt;&lt;/p&gt;",
    "seoTitle": "ACER NTB Nitro V 15 (ANV15-52-97LA),i9-13900,15.6\"FHD,16GB,1TB SSD,RTX 5060,Linux,Black | Worlds.sk",
    "seoDescription": "Kúpiť ACER NTB Nitro V 15 (ANV15-52-97LA),i9-13900,15.6\"FHD,16GB,1TB SSD,RTX 5060,Linux,Black (PartNumber: NH.QZ8EC.00D) za výhodnú cenu 1316.4 € s expresným doručením z centrálneho skladu na Worlds.sk.",
    "searchKeywords": [
      "acer",
      "nh.qz8ec.00d",
      "herne-notebooky"
    ],
    "pricing": {
      "supplierCost": 979.46,
      "supplierFees": {
        "garbageFee": 0.42,
        "authorFee": 6.04
      },
      "totalCostWithFees": 979.46,
      "vatRate": 20,
      "marginPercentage": 12,
      "basePrice": 1097,
      "finalPrice": 1316.4,
      "currency": "EUR"
    },
    "stockCount": 53,
    "isInStock": true,
    "stockText": "Skladom > 53 ks",
    "warrantyMonths": 24,
    "attributes": {
      "brand": {
        "code": "brand",
        "name": "Výrobca",
        "value": "Acer",
        "rawValue": "Acer"
      },
      "mpn": {
        "code": "mpn",
        "name": "Part Number",
        "value": "NH.QZ8EC.00D",
        "rawValue": "NH.QZ8EC.00D"
      },
      "warranty": {
        "code": "warranty",
        "name": "Záruka",
        "value": "24 mesiacov",
        "rawValue": "24"
      }
    },
    "images": [
      {
        "id": "img-11294783",
        "url": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=80",
        "position": 0,
        "isPrimary": true,
        "altText": "ACER NTB Nitro V 15 (ANV15-52-97LA),i9-13900,15.6\"FHD,16GB,1TB SSD,RTX 5060,Linux,Black"
      }
    ],
    "status": "ACTIVE",
    "reviewStatus": "AUTO_APPROVED",
    "qualityScore": {
      "total": 90,
      "breakdown": {
        "hasEan": true,
        "hasBrand": true,
        "hasMpn": true,
        "hasValidCategory": true,
        "hasImages": true,
        "hasAttributes": true,
        "hasDescription": true,
        "hasSeoMetadata": true,
        "hasPrice": true,
        "hasStock": true
      }
    },
    "dataHash": "hash_11294783_979.46_53",
    "lastSyncedAt": "2026-09-01T15:48:11.560Z",
    "lastReprocessedAt": "2026-09-01T15:48:11.560Z",
    "createdAt": "2026-09-01T15:48:11.560Z",
    "updatedAt": "2026-09-01T15:48:11.560Z"
  },
  {
    "id": "ed-11294784",
    "supplierCode": "11294784",
    "sku": "11294784",
    "mpn": "NH.QZAEC.001",
    "ean": "4711474541734",
    "brand": "Acer",
    "categorySlug": "herne-notebooky",
    "categoryHierarchy": [
      "Počítače a notebooky",
      "Notebooky",
      "Herné notebooky"
    ],
    "title": "ACER NTB Nitro V 15 (ANV15-52-999E),i9-13900,15.6\"FHD,16GB,1TB SSD,RTX 5060,W11H,Black",
    "slug": "acer-ntb-nitro-v-15-anv15-52-999e-i9-13900-15-6-fhd-16gb-1tb-ssd-rtx-5060-w11h-black-11294784",
    "shortDescription": "&lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;ACER NTB Nitro V 15 (ANV15-52-999E)&lt;/strong&gt;&lt;br /&gt; &lt;strong&gt;Číslo dielu: NH.QZAEC.001&lt;/strong&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Procesor&lt;/strong&gt;&lt;br /&gt; Výrobca procesora: Intel&lt;br /&gt; Model procesora: Core i9-13900&lt;br /&gt; Rýchlosť procesora: 2,0 GHz&lt;br /&gt; Počet jadier: 24&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Zobrazenie a grafika&lt;/strong&gt;&lt;br /&gt; Grafická karta: NVIDIA GeForce RTX™ 5060&lt;br /&gt; Veľkosť obrazovky: 15,6\"&lt;br /&gt; Technológia obrazovky displeja: IPS&lt;br /&gt; Typ displeja: Matný&lt;br /&gt; Dotykový displej: Nie&lt;br /&gt; Režim obrazovky: FHD&lt;br /&gt; Rozlíšenie obrazovky: 1920 x 1080&lt;br /&gt; Pomer strán: 16:9&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Pamäť&lt;/strong&gt;&lt;br /&gt; Štandardná pamäť: 16 GB (2x8)&lt;br /&gt; Technológia pamäti: DDR4&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Úložisko&lt;/strong&gt;&lt;br /&gt; Celková kapacita disku SSD: 1024 GB&lt;br /&gt; Typ SSD: PCIe NVMe SSD PM4 + N (M.2)&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Sť a komunikácia&lt;/strong&gt;&lt;br /&gt; Wifi 6 802.11ax 2x2 MU-MIMO: Áno&lt;br /&gt; Bluetooth 5.1: Áno&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Rozhrania/porty&lt;/strong&gt;&lt;br /&gt; 3x USB 3.2 Gen1 &lt;br /&gt;1x USB Type-C&lt;br /&gt; DisplayPort over USB-C &lt;br /&gt;Thunderbolt™ 4 &lt;br /&gt; HDMI 2.1 &lt;br /&gt;RJ-45&lt;br /&gt; Kensington zámok: Áno&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Software&lt;/strong&gt;&lt;br /&gt; Operačný systém: Windows 11 Home&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Výbava&lt;/strong&gt;&lt;br /&gt; HD TNR kamera s 2Mic.: Áno&lt;br /&gt; Čítačka odtlačkov prstov: Nie&lt;br /&gt; Čítačka pamäťových kariet: Nie&lt;br /&gt; Optická mechanika: Nie&lt;br /&gt; Podsvietenie klávesnice: Áno&lt;br /&gt; Touchpad: Áno&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Informácie o batérii&lt;/strong&gt;&lt;br /&gt; Počet článkov: 4-články&lt;br /&gt; Chemické zloženie batérie: Lithium-iónový (Li-Ion)&lt;br /&gt; Energia batérie: 76Wh&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Popis napájania&lt;/strong&gt;&lt;br /&gt; 135W 5.5mm Slim AC adaptér PCR50%&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Fyzické charakteristiky&lt;/strong&gt;&lt;br /&gt; Farba: Obsidiánová čierna&lt;br /&gt; Rozmery: 362.3 (W) x 239.89 (D) x 27 (H) mm&lt;br /&gt; Hmotnosť (približná): 2.1 kg&lt;/p&gt; &lt;p&gt;&lt;em&gt;Popis produktu bol preložený pomocou umelej inteligencie a môže obsahovať nepresnosti.&lt;/em&gt;&lt;/p&gt;",
    "supplierDescription": "&lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;ACER NTB Nitro V 15 (ANV15-52-999E)&lt;/strong&gt;&lt;br /&gt; &lt;strong&gt;Číslo dielu: NH.QZAEC.001&lt;/strong&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Procesor&lt;/strong&gt;&lt;br /&gt; Výrobca procesora: Intel&lt;br /&gt; Model procesora: Core i9-13900&lt;br /&gt; Rýchlosť procesora: 2,0 GHz&lt;br /&gt; Počet jadier: 24&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Zobrazenie a grafika&lt;/strong&gt;&lt;br /&gt; Grafická karta: NVIDIA GeForce RTX™ 5060&lt;br /&gt; Veľkosť obrazovky: 15,6\"&lt;br /&gt; Technológia obrazovky displeja: IPS&lt;br /&gt; Typ displeja: Matný&lt;br /&gt; Dotykový displej: Nie&lt;br /&gt; Režim obrazovky: FHD&lt;br /&gt; Rozlíšenie obrazovky: 1920 x 1080&lt;br /&gt; Pomer strán: 16:9&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Pamäť&lt;/strong&gt;&lt;br /&gt; Štandardná pamäť: 16 GB (2x8)&lt;br /&gt; Technológia pamäti: DDR4&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Úložisko&lt;/strong&gt;&lt;br /&gt; Celková kapacita disku SSD: 1024 GB&lt;br /&gt; Typ SSD: PCIe NVMe SSD PM4 + N (M.2)&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Sť a komunikácia&lt;/strong&gt;&lt;br /&gt; Wifi 6 802.11ax 2x2 MU-MIMO: Áno&lt;br /&gt; Bluetooth 5.1: Áno&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Rozhrania/porty&lt;/strong&gt;&lt;br /&gt; 3x USB 3.2 Gen1 &lt;br /&gt;1x USB Type-C&lt;br /&gt; DisplayPort over USB-C &lt;br /&gt;Thunderbolt™ 4 &lt;br /&gt; HDMI 2.1 &lt;br /&gt;RJ-45&lt;br /&gt; Kensington zámok: Áno&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Software&lt;/strong&gt;&lt;br /&gt; Operačný systém: Windows 11 Home&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Výbava&lt;/strong&gt;&lt;br /&gt; HD TNR kamera s 2Mic.: Áno&lt;br /&gt; Čítačka odtlačkov prstov: Nie&lt;br /&gt; Čítačka pamäťových kariet: Nie&lt;br /&gt; Optická mechanika: Nie&lt;br /&gt; Podsvietenie klávesnice: Áno&lt;br /&gt; Touchpad: Áno&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Informácie o batérii&lt;/strong&gt;&lt;br /&gt; Počet článkov: 4-články&lt;br /&gt; Chemické zloženie batérie: Lithium-iónový (Li-Ion)&lt;br /&gt; Energia batérie: 76Wh&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Popis napájania&lt;/strong&gt;&lt;br /&gt; 135W 5.5mm Slim AC adaptér PCR50%&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Fyzické charakteristiky&lt;/strong&gt;&lt;br /&gt; Farba: Obsidiánová čierna&lt;br /&gt; Rozmery: 362.3 (W) x 239.89 (D) x 27 (H) mm&lt;br /&gt; Hmotnosť (približná): 2.1 kg&lt;/p&gt; &lt;p&gt;&lt;em&gt;Popis produktu bol preložený pomocou umelej inteligencie a môže obsahovať nepresnosti.&lt;/em&gt;&lt;/p&gt;",
    "seoTitle": "ACER NTB Nitro V 15 (ANV15-52-999E),i9-13900,15.6\"FHD,16GB,1TB SSD,RTX 5060,W11H,Black | Worlds.sk",
    "seoDescription": "Kúpiť ACER NTB Nitro V 15 (ANV15-52-999E),i9-13900,15.6\"FHD,16GB,1TB SSD,RTX 5060,W11H,Black (PartNumber: NH.QZAEC.001) za výhodnú cenu 1438.7 € s expresným doručením z centrálneho skladu na Worlds.sk.",
    "searchKeywords": [
      "acer",
      "nh.qzaec.001",
      "herne-notebooky"
    ],
    "pricing": {
      "supplierCost": 1070.46,
      "supplierFees": {
        "garbageFee": 0.42,
        "authorFee": 6.04
      },
      "totalCostWithFees": 1070.46,
      "vatRate": 20,
      "marginPercentage": 12,
      "basePrice": 1198.92,
      "finalPrice": 1438.7,
      "currency": "EUR"
    },
    "stockCount": 6,
    "isInStock": true,
    "stockText": "Skladom > 6 ks",
    "warrantyMonths": 24,
    "attributes": {
      "brand": {
        "code": "brand",
        "name": "Výrobca",
        "value": "Acer",
        "rawValue": "Acer"
      },
      "mpn": {
        "code": "mpn",
        "name": "Part Number",
        "value": "NH.QZAEC.001",
        "rawValue": "NH.QZAEC.001"
      },
      "warranty": {
        "code": "warranty",
        "name": "Záruka",
        "value": "24 mesiacov",
        "rawValue": "24"
      }
    },
    "images": [
      {
        "id": "img-11294784",
        "url": "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80",
        "position": 0,
        "isPrimary": true,
        "altText": "ACER NTB Nitro V 15 (ANV15-52-999E),i9-13900,15.6\"FHD,16GB,1TB SSD,RTX 5060,W11H,Black"
      }
    ],
    "status": "ACTIVE",
    "reviewStatus": "AUTO_APPROVED",
    "qualityScore": {
      "total": 90,
      "breakdown": {
        "hasEan": true,
        "hasBrand": true,
        "hasMpn": true,
        "hasValidCategory": true,
        "hasImages": true,
        "hasAttributes": true,
        "hasDescription": true,
        "hasSeoMetadata": true,
        "hasPrice": true,
        "hasStock": true
      }
    },
    "dataHash": "hash_11294784_1070.46_6",
    "lastSyncedAt": "2026-09-01T15:48:11.560Z",
    "lastReprocessedAt": "2026-09-01T15:48:11.560Z",
    "createdAt": "2026-09-01T15:48:11.560Z",
    "updatedAt": "2026-09-01T15:48:11.560Z"
  },
  {
    "id": "ed-11294791",
    "supplierCode": "11294791",
    "sku": "11294791",
    "mpn": "NH.QYGEC.001",
    "ean": "4711474570192",
    "brand": "Acer",
    "categorySlug": "herne-notebooky",
    "categoryHierarchy": [
      "Počítače a notebooky",
      "Notebooky",
      "Herné notebooky"
    ],
    "title": "ACER NTB Nitro 18 AI (AN18-61-R3KG),AI 9 365,18\" 2560x1600,32GB,1TB SSD,RTX 5060,W11H,Black",
    "slug": "acer-ntb-nitro-18-ai-an18-61-r3kg-ai-9-365-18-2560x1600-32gb-1tb-ssd-rtx-5060-w11h-black-11294791",
    "shortDescription": "&lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;ACER Nitro 18 AI (AN18-61-R3KG)&lt;/strong&gt;&lt;br /&gt; &lt;strong&gt;Číslo dielu: NH.QYGEC.001&lt;/strong&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;strong&gt;Procesor&lt;/strong&gt;&lt;br /&gt; Výrobca procesora: AMD&lt;br /&gt; Model procesora: Ryzen AI 9 365&lt;br /&gt; Rýchlosť procesora: 2,0 &lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;GHz&lt;br /&gt; Počet jadier: 10&lt;/span&gt;&lt;/span&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;strong&gt;Zobrazenie a grafika&lt;/strong&gt;&lt;br /&gt; &lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;Uhlopriečka displeja: &lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;18\"&lt;br /&gt; Rozlíšenie displeja: WQXGA 2560x1600&lt;br /&gt; Typ displeja: Glare&lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;br /&gt; Pomer strán: 16&lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;:10&lt;br /&gt; Obnovovacia frekvencia: 165 Hz&lt;br /&gt; Jas: 300 nitov&lt;br /&gt; Dotykový displej: Nie&lt;br /&gt; Grafická karta: NVIDIA GeForce RTX 5060&lt;/span&gt;&lt;/span&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;strong&gt;Pamäť&lt;/strong&gt;&lt;br /&gt; Štandardná pamäť:&lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt; 32 GB&lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;br /&gt; Technológia pamäti&lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;: DDR5&lt;/span&gt;&lt;/span&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;Úložisko&lt;/span&gt;&lt;/span&gt;&lt;/strong&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;br /&gt; Celková kapacita disku SSD: 1024 GB&lt;br /&gt; Typ SSD: PCIe NVMe SSD&lt;/span&gt;&lt;/span&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;Sieť a komunikácia&lt;/span&gt;&lt;/span&gt;&lt;/strong&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;br /&gt; Wifi 6E 802.11ax 2x2 MU-MIMO: Áno&lt;br /&gt; Bluetooth verzia v5.4: Áno&lt;/span&gt;&lt;/span&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Rozhrania/porty&lt;/strong&gt;&lt;span lang=\"EN\"&gt;&lt;br /&gt; 1x USB Type-C port podporujúci: USB4 (až 40Gbps) / DisplayPort cez USB-C cez iGPU / USB nabíjanie 5 V; 3 A / DC-in port 20 V; 90 W &lt;br /&gt; 1x USB Type-C port podporujúci: USB 3.2 Gen 2 (až 10 Gbps) / DisplayPort cez USB-C cez iGPU / USB nabíjanie 5 V; 3 A / DC-in port 20 V; 90 W &lt;br /&gt; 2x USB 3.2 Gen2 &lt;br /&gt; 1x USB 2.0 &lt;br /&gt; HDMI 2.1 &lt;br /&gt; RJ-45&lt;br /&gt; Micro SD&lt;br /&gt;2x USB 3.2 Gen 2&lt;span lang=\"EN\"&gt;&lt;br /&gt; 1x 3,5mm combo audio jack&lt;br /&gt; &lt;/span&gt;&lt;span lang=\"CS\"&gt;Kensington lock: Nie&lt;/span&gt;&lt;/span&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;Softvér&lt;/span&gt;&lt;/span&gt;&lt;/strong&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;br /&gt; Operačný systém: &lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;Windows 11 Home&lt;/span&gt;&lt;/span&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;strong&gt;Výbava&lt;/strong&gt;&lt;br /&gt; Webkamera: Áno&lt;br /&gt; Numerická klávesnica: Áno&lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;br /&gt; Čítačka odtlačkov prstov: &lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;Nie&lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;br /&gt; Čítačka pamäťových kariet: &lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;Áno&lt;br /&gt; Optická mechanika: Nie&lt;br /&gt; Podsvietenie klávesnice: Áno&lt;br /&gt; Touchpad: Áno &lt;br /&gt; TPM: Áno&lt;br /&gt; Chladenie: Áno&lt;br /&gt; &lt;br /&gt; &lt;strong&gt;Informácie o batérii&lt;/strong&gt;&lt;br /&gt; Chemické zloženie batérie: Lithium-iontový (Li-Ion)&lt;br /&gt; Energie batérie: 90 Whrs&lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;br /&gt; Počet článkov: &lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;4&lt;/span&gt;&lt;/span&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Popis napájania&lt;/strong&gt;&lt;br /&gt; 230W 5.5mm AC Adaptér PCR50%&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;strong&gt;Fyzické charakteristiky&lt;/strong&gt;&lt;br /&gt; Farba: Obsidian Black&lt;br /&gt; Materiál: Hliníkový kryt LCD&lt;br /&gt; &lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;Rozmery: &lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;400.9 (W) x 310.3 (D) x 15.08/24.95 (H) mm (15.78 x 12.22 x 0.59/0.98 palca)&lt;br /&gt; &lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;Hmotnosť (približne): &lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;3,02 kg&lt;/span&gt;&lt;/span&gt;&lt;/p&gt; &lt;p&gt;&lt;em&gt;Popis produktu bol preložený pomocou umelej inteligencie a môže obsahovať nepresnosti.&lt;/em&gt;&lt;/p&gt;",
    "supplierDescription": "&lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;ACER Nitro 18 AI (AN18-61-R3KG)&lt;/strong&gt;&lt;br /&gt; &lt;strong&gt;Číslo dielu: NH.QYGEC.001&lt;/strong&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;strong&gt;Procesor&lt;/strong&gt;&lt;br /&gt; Výrobca procesora: AMD&lt;br /&gt; Model procesora: Ryzen AI 9 365&lt;br /&gt; Rýchlosť procesora: 2,0 &lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;GHz&lt;br /&gt; Počet jadier: 10&lt;/span&gt;&lt;/span&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;strong&gt;Zobrazenie a grafika&lt;/strong&gt;&lt;br /&gt; &lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;Uhlopriečka displeja: &lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;18\"&lt;br /&gt; Rozlíšenie displeja: WQXGA 2560x1600&lt;br /&gt; Typ displeja: Glare&lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;br /&gt; Pomer strán: 16&lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;:10&lt;br /&gt; Obnovovacia frekvencia: 165 Hz&lt;br /&gt; Jas: 300 nitov&lt;br /&gt; Dotykový displej: Nie&lt;br /&gt; Grafická karta: NVIDIA GeForce RTX 5060&lt;/span&gt;&lt;/span&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;strong&gt;Pamäť&lt;/strong&gt;&lt;br /&gt; Štandardná pamäť:&lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt; 32 GB&lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;br /&gt; Technológia pamäti&lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;: DDR5&lt;/span&gt;&lt;/span&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;Úložisko&lt;/span&gt;&lt;/span&gt;&lt;/strong&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;br /&gt; Celková kapacita disku SSD: 1024 GB&lt;br /&gt; Typ SSD: PCIe NVMe SSD&lt;/span&gt;&lt;/span&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;Sieť a komunikácia&lt;/span&gt;&lt;/span&gt;&lt;/strong&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;br /&gt; Wifi 6E 802.11ax 2x2 MU-MIMO: Áno&lt;br /&gt; Bluetooth verzia v5.4: Áno&lt;/span&gt;&lt;/span&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Rozhrania/porty&lt;/strong&gt;&lt;span lang=\"EN\"&gt;&lt;br /&gt; 1x USB Type-C port podporujúci: USB4 (až 40Gbps) / DisplayPort cez USB-C cez iGPU / USB nabíjanie 5 V; 3 A / DC-in port 20 V; 90 W &lt;br /&gt; 1x USB Type-C port podporujúci: USB 3.2 Gen 2 (až 10 Gbps) / DisplayPort cez USB-C cez iGPU / USB nabíjanie 5 V; 3 A / DC-in port 20 V; 90 W &lt;br /&gt; 2x USB 3.2 Gen2 &lt;br /&gt; 1x USB 2.0 &lt;br /&gt; HDMI 2.1 &lt;br /&gt; RJ-45&lt;br /&gt; Micro SD&lt;br /&gt;2x USB 3.2 Gen 2&lt;span lang=\"EN\"&gt;&lt;br /&gt; 1x 3,5mm combo audio jack&lt;br /&gt; &lt;/span&gt;&lt;span lang=\"CS\"&gt;Kensington lock: Nie&lt;/span&gt;&lt;/span&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;Softvér&lt;/span&gt;&lt;/span&gt;&lt;/strong&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;br /&gt; Operačný systém: &lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;Windows 11 Home&lt;/span&gt;&lt;/span&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;strong&gt;Výbava&lt;/strong&gt;&lt;br /&gt; Webkamera: Áno&lt;br /&gt; Numerická klávesnica: Áno&lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;br /&gt; Čítačka odtlačkov prstov: &lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;Nie&lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;br /&gt; Čítačka pamäťových kariet: &lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;Áno&lt;br /&gt; Optická mechanika: Nie&lt;br /&gt; Podsvietenie klávesnice: Áno&lt;br /&gt; Touchpad: Áno &lt;br /&gt; TPM: Áno&lt;br /&gt; Chladenie: Áno&lt;br /&gt; &lt;br /&gt; &lt;strong&gt;Informácie o batérii&lt;/strong&gt;&lt;br /&gt; Chemické zloženie batérie: Lithium-iontový (Li-Ion)&lt;br /&gt; Energie batérie: 90 Whrs&lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;br /&gt; Počet článkov: &lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;4&lt;/span&gt;&lt;/span&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Popis napájania&lt;/strong&gt;&lt;br /&gt; 230W 5.5mm AC Adaptér PCR50%&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;strong&gt;Fyzické charakteristiky&lt;/strong&gt;&lt;br /&gt; Farba: Obsidian Black&lt;br /&gt; Materiál: Hliníkový kryt LCD&lt;br /&gt; &lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;Rozmery: &lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;400.9 (W) x 310.3 (D) x 15.08/24.95 (H) mm (15.78 x 12.22 x 0.59/0.98 palca)&lt;br /&gt; &lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;Hmotnosť (približne): &lt;/span&gt;&lt;/span&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;&lt;span style=\"font-family: Arial; font-size: small;\"&gt;3,02 kg&lt;/span&gt;&lt;/span&gt;&lt;/p&gt; &lt;p&gt;&lt;em&gt;Popis produktu bol preložený pomocou umelej inteligencie a môže obsahovať nepresnosti.&lt;/em&gt;&lt;/p&gt;",
    "seoTitle": "ACER NTB Nitro 18 AI (AN18-61-R3KG),AI 9 365,18\" 2560x1600,32GB,1TB SSD,RTX 5060,W11H,Black | Worlds.sk",
    "seoDescription": "Kúpiť ACER NTB Nitro 18 AI (AN18-61-R3KG),AI 9 365,18\" 2560x1600,32GB,1TB SSD,RTX 5060,W11H,Black (PartNumber: NH.QYGEC.001) za výhodnú cenu 1976.3 € s expresným doručením z centrálneho skladu na Worlds.sk.",
    "searchKeywords": [
      "acer",
      "nh.qygec.001",
      "herne-notebooky"
    ],
    "pricing": {
      "supplierCost": 1470.46,
      "supplierFees": {
        "garbageFee": 0.42,
        "authorFee": 6.04
      },
      "totalCostWithFees": 1470.46,
      "vatRate": 20,
      "marginPercentage": 12,
      "basePrice": 1646.92,
      "finalPrice": 1976.3,
      "currency": "EUR"
    },
    "stockCount": 10,
    "isInStock": true,
    "stockText": "Skladom > 10 ks",
    "warrantyMonths": 24,
    "attributes": {
      "brand": {
        "code": "brand",
        "name": "Výrobca",
        "value": "Acer",
        "rawValue": "Acer"
      },
      "mpn": {
        "code": "mpn",
        "name": "Part Number",
        "value": "NH.QYGEC.001",
        "rawValue": "NH.QYGEC.001"
      },
      "warranty": {
        "code": "warranty",
        "name": "Záruka",
        "value": "24 mesiacov",
        "rawValue": "24"
      }
    },
    "images": [
      {
        "id": "img-11294791",
        "url": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80",
        "position": 0,
        "isPrimary": true,
        "altText": "ACER NTB Nitro 18 AI (AN18-61-R3KG),AI 9 365,18\" 2560x1600,32GB,1TB SSD,RTX 5060,W11H,Black"
      }
    ],
    "status": "ACTIVE",
    "reviewStatus": "AUTO_APPROVED",
    "qualityScore": {
      "total": 90,
      "breakdown": {
        "hasEan": true,
        "hasBrand": true,
        "hasMpn": true,
        "hasValidCategory": true,
        "hasImages": true,
        "hasAttributes": true,
        "hasDescription": true,
        "hasSeoMetadata": true,
        "hasPrice": true,
        "hasStock": true
      }
    },
    "dataHash": "hash_11294791_1470.46_10",
    "lastSyncedAt": "2026-09-01T15:48:11.560Z",
    "lastReprocessedAt": "2026-09-01T15:48:11.560Z",
    "createdAt": "2026-09-01T15:48:11.560Z",
    "updatedAt": "2026-09-01T15:48:11.560Z"
  },
  {
    "id": "ed-11294793",
    "supplierCode": "11294793",
    "sku": "11294793",
    "mpn": "NH.QX9EC.001",
    "ean": "4711474542274",
    "brand": "Acer",
    "categorySlug": "herne-notebooky",
    "categoryHierarchy": [
      "Počítače a notebooky",
      "Notebooky",
      "Herné notebooky"
    ],
    "title": "ACER NTB Predator Helios Neo 16S AI (PHN16S-71-90BU),Ultra9-275HX,16\"WQXGA,32GB,1TB SSD,RTX 5060,W11H,Black",
    "slug": "acer-ntb-predator-helios-neo-16s-ai-phn16s-71-90bu-ultra9-275hx-16-wqxga-32gb-1tb-ssd-rtx-5060-w11h-black-11294793",
    "shortDescription": "&lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;ACER NTB Predator Helios Neo 16S AI (PHN16S-71-90BU) &lt;/strong&gt;&lt;br /&gt;&lt;strong&gt; Číslo dielu: NH.QX9EC.001&lt;/strong&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Procesor&lt;/strong&gt;&lt;br /&gt; Výrobca procesora: Intel&lt;br /&gt; Model procesora: Core Ultra 9 processor 275HX &lt;br /&gt; Rýchlosť procesora: 2,7 GHz&lt;br /&gt; Počet jadier: 24&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Zobrazenie a grafika&lt;/strong&gt;&lt;br /&gt; Grafická karta: NVIDIA GeForce RTX 5060&lt;br /&gt; Veľkosť obrazovky: 16\"&lt;br /&gt; Technológia obrazovky displeja: OLED&lt;br /&gt; Typ displeja: Lesklý&lt;br /&gt; Režim obrazovky: WQXGA&lt;br /&gt; Dotyková obrazovka: Nie&lt;br /&gt; Rozlíšenie obrazovky: 2560 x 1600&lt;br /&gt; Pomer strán: 16:10&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Pamäť&lt;/strong&gt;&lt;br /&gt; Štandardná pamäť: 32 GB&lt;br /&gt; Technológia pamäti: DDR5&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Úložisko&lt;/strong&gt;&lt;br /&gt; Celková kapacita disku SSD: 1024 GB&lt;br /&gt; Typ SSD: PCIe NVMe SED SSD PMP4&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Sieť a komunikácia&lt;/strong&gt;&lt;br /&gt; Wifi 6E 802.11ax 2x2 MU-MIMO Killer 1675i: Áno&lt;br /&gt; Bluetooth verzia 5.4: Áno&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Rozhranie/porty&lt;/strong&gt;&lt;br /&gt; 2x USB Type-C port &lt;br /&gt; 2x USB 3.2 Gen2&lt;br /&gt; 1x USB 3.2 Gen1&lt;br /&gt; 1x HDMI 2.1&lt;br /&gt; 1x RJ-45&lt;br /&gt; 3,5mm Jack port&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Software&lt;/strong&gt;&lt;br /&gt; Operačný systém: Windows 11 Home&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Výbava&lt;/strong&gt;&lt;br /&gt; Webkamera: Áno&lt;br /&gt; Numerická klávesnica: Áno&lt;br /&gt; Čítačka pamäťových kariet: Áno&lt;br /&gt; Optická mechanika: Nie&lt;br /&gt; Podsvietenie klávesnice: Áno&lt;br /&gt; Touchpad: Áno&lt;br /&gt; TPM: Áno&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Informácie o batérii&lt;/strong&gt;&lt;br /&gt; Chemické zloženie batérie: Lithium-iónový (Li-Ion)&lt;br /&gt; Počet článkov: 4&lt;br /&gt; Energia batérie: 76Wh&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Popis napájania&lt;/strong&gt;&lt;br /&gt; 230W 5,5mm AC adaptér PCR50%&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Fyzické charakteristiky&lt;/strong&gt;&lt;br /&gt; Farba: Abyssal Black&lt;br /&gt; Špecifikácia: Hliník&lt;br /&gt; Rozmery: 357,78 (W) x 278,63 (D) x 27,85 (H) mm&lt;br /&gt; Hmotnosť: 2,80 kg&lt;/p&gt; &lt;p&gt;&lt;em&gt;Popis produktu bol preložený pomocou umelej inteligencie a môže obsahovať nepresnosti.&lt;/em&gt;&lt;/p&gt;",
    "supplierDescription": "&lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;ACER NTB Predator Helios Neo 16S AI (PHN16S-71-90BU) &lt;/strong&gt;&lt;br /&gt;&lt;strong&gt; Číslo dielu: NH.QX9EC.001&lt;/strong&gt;&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Procesor&lt;/strong&gt;&lt;br /&gt; Výrobca procesora: Intel&lt;br /&gt; Model procesora: Core Ultra 9 processor 275HX &lt;br /&gt; Rýchlosť procesora: 2,7 GHz&lt;br /&gt; Počet jadier: 24&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Zobrazenie a grafika&lt;/strong&gt;&lt;br /&gt; Grafická karta: NVIDIA GeForce RTX 5060&lt;br /&gt; Veľkosť obrazovky: 16\"&lt;br /&gt; Technológia obrazovky displeja: OLED&lt;br /&gt; Typ displeja: Lesklý&lt;br /&gt; Režim obrazovky: WQXGA&lt;br /&gt; Dotyková obrazovka: Nie&lt;br /&gt; Rozlíšenie obrazovky: 2560 x 1600&lt;br /&gt; Pomer strán: 16:10&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Pamäť&lt;/strong&gt;&lt;br /&gt; Štandardná pamäť: 32 GB&lt;br /&gt; Technológia pamäti: DDR5&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Úložisko&lt;/strong&gt;&lt;br /&gt; Celková kapacita disku SSD: 1024 GB&lt;br /&gt; Typ SSD: PCIe NVMe SED SSD PMP4&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Sieť a komunikácia&lt;/strong&gt;&lt;br /&gt; Wifi 6E 802.11ax 2x2 MU-MIMO Killer 1675i: Áno&lt;br /&gt; Bluetooth verzia 5.4: Áno&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Rozhranie/porty&lt;/strong&gt;&lt;br /&gt; 2x USB Type-C port &lt;br /&gt; 2x USB 3.2 Gen2&lt;br /&gt; 1x USB 3.2 Gen1&lt;br /&gt; 1x HDMI 2.1&lt;br /&gt; 1x RJ-45&lt;br /&gt; 3,5mm Jack port&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Software&lt;/strong&gt;&lt;br /&gt; Operačný systém: Windows 11 Home&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Výbava&lt;/strong&gt;&lt;br /&gt; Webkamera: Áno&lt;br /&gt; Numerická klávesnica: Áno&lt;br /&gt; Čítačka pamäťových kariet: Áno&lt;br /&gt; Optická mechanika: Nie&lt;br /&gt; Podsvietenie klávesnice: Áno&lt;br /&gt; Touchpad: Áno&lt;br /&gt; TPM: Áno&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Informácie o batérii&lt;/strong&gt;&lt;br /&gt; Chemické zloženie batérie: Lithium-iónový (Li-Ion)&lt;br /&gt; Počet článkov: 4&lt;br /&gt; Energia batérie: 76Wh&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Popis napájania&lt;/strong&gt;&lt;br /&gt; 230W 5,5mm AC adaptér PCR50%&lt;/p&gt; &lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Fyzické charakteristiky&lt;/strong&gt;&lt;br /&gt; Farba: Abyssal Black&lt;br /&gt; Špecifikácia: Hliník&lt;br /&gt; Rozmery: 357,78 (W) x 278,63 (D) x 27,85 (H) mm&lt;br /&gt; Hmotnosť: 2,80 kg&lt;/p&gt; &lt;p&gt;&lt;em&gt;Popis produktu bol preložený pomocou umelej inteligencie a môže obsahovať nepresnosti.&lt;/em&gt;&lt;/p&gt;",
    "seoTitle": "ACER NTB Predator Helios Neo 16S AI (PHN16S-71-90BU),Ultra9-275HX,16\"WQXGA,32GB,1TB SSD,RTX 5060,W11H,Black | Worlds.sk",
    "seoDescription": "Kúpiť ACER NTB Predator Helios Neo 16S AI (PHN16S-71-90BU),Ultra9-275HX,16\"WQXGA,32GB,1TB SSD,RTX 5060,W11H,Black (PartNumber: NH.QX9EC.001) za výhodnú cenu 2163.12 € s expresným doručením z centrálneho skladu na Worlds.sk.",
    "searchKeywords": [
      "acer",
      "nh.qx9ec.001",
      "herne-notebooky"
    ],
    "pricing": {
      "supplierCost": 1609.46,
      "supplierFees": {
        "garbageFee": 0.42,
        "authorFee": 6.04
      },
      "totalCostWithFees": 1609.46,
      "vatRate": 20,
      "marginPercentage": 12,
      "basePrice": 1802.6,
      "finalPrice": 2163.12,
      "currency": "EUR"
    },
    "stockCount": 1,
    "isInStock": true,
    "stockText": "Skladom > 1 ks",
    "warrantyMonths": 24,
    "attributes": {
      "brand": {
        "code": "brand",
        "name": "Výrobca",
        "value": "Acer",
        "rawValue": "Acer"
      },
      "mpn": {
        "code": "mpn",
        "name": "Part Number",
        "value": "NH.QX9EC.001",
        "rawValue": "NH.QX9EC.001"
      },
      "warranty": {
        "code": "warranty",
        "name": "Záruka",
        "value": "24 mesiacov",
        "rawValue": "24"
      }
    },
    "images": [
      {
        "id": "img-11294793",
        "url": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80",
        "position": 0,
        "isPrimary": true,
        "altText": "ACER NTB Predator Helios Neo 16S AI (PHN16S-71-90BU),Ultra9-275HX,16\"WQXGA,32GB,1TB SSD,RTX 5060,W11H,Black"
      }
    ],
    "status": "ACTIVE",
    "reviewStatus": "AUTO_APPROVED",
    "qualityScore": {
      "total": 90,
      "breakdown": {
        "hasEan": true,
        "hasBrand": true,
        "hasMpn": true,
        "hasValidCategory": true,
        "hasImages": true,
        "hasAttributes": true,
        "hasDescription": true,
        "hasSeoMetadata": true,
        "hasPrice": true,
        "hasStock": true
      }
    },
    "dataHash": "hash_11294793_1609.46_1",
    "lastSyncedAt": "2026-09-01T15:48:11.560Z",
    "lastReprocessedAt": "2026-09-01T15:48:11.560Z",
    "createdAt": "2026-09-01T15:48:11.560Z",
    "updatedAt": "2026-09-01T15:48:11.560Z"
  },
  {
    "id": "ed-1651147",
    "supplierCode": "1651147",
    "sku": "1651147",
    "mpn": "83K100DJCK",
    "ean": "198156990839",
    "brand": "Lenovo",
    "categorySlug": "notebooky",
    "categoryHierarchy": [
      "Počítače a notebooky",
      "Notebooky"
    ],
    "title": "LENOVO NTB IdeaPad Slim 3 15IRH10 - i5-13420H,15.3\" WUXGA IPS,24GB,1TSSD,HDMI,Int. Intel UHD,W11H,2Y CC",
    "slug": "lenovo-ntb-ideapad-slim-3-15irh10-i5-13420h-15-3-wuxga-ips-24gb-1tssd-hdmi-int-intel-uhd-w11h-2y-cc-1651147",
    "shortDescription": "&lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Produkt: Lenovo IdeaPad Slim 3 15IRH10&lt;/strong&gt;&lt;br /&gt; &lt;strong&gt;Part Number: 83K100DGCK&lt;br /&gt;&lt;/strong&gt;&lt;/p&gt;\n&lt;table id=\"lenovo\"&gt;\n&lt;tbody&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;VÝKON&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Procesor&lt;/td&gt;\n&lt;td&gt;Intel Core™ i5-13420H, 8C (4P + 4E) / 12T, P-core 2.1 / 4.6GHz, E-core 1.5 / 3.4GHz, 12MB&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Grafická Karta&lt;/td&gt;\n&lt;td&gt;Integrated Intel UHD Graphics&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Chipset&lt;/td&gt;\n&lt;td&gt;Intel SoC Platform&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pameť&lt;/td&gt;\n&lt;td&gt;8GB Soldered DDR5-4800 + 16GB SO-DIMM DDR5-4800&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pameťové sloty&lt;/td&gt;\n&lt;td&gt;One memory soldered to systemboard, one DDR5 SO-DIMM slot, dual-channel capable&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Max. Pameť&lt;/td&gt;\n&lt;td&gt;Up to 24GB (8GB soldered + 16GB SO-DIMM) DDR5-4800 offering&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Úložisko&lt;/td&gt;\n&lt;td&gt;1TB SSD M.2 2242 PCIe 4.0x4 NVMe&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Podporované Úložisko&lt;/td&gt;\n&lt;td&gt;Up to two drives, 2x M.2 SSD &lt;br /&gt;• M.2 2242 SSD up to 1TB&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Čitačka Kariet&lt;/td&gt;\n&lt;td&gt;SD Card Reader&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Optická Mechanika&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Audio Chip&lt;/td&gt;\n&lt;td&gt;High Definition (HD) Audio&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Reproduktory&lt;/td&gt;\n&lt;td&gt;Stereo speakers, 2W x2, optimized with Dolby Audio™&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Kamera&lt;/td&gt;\n&lt;td&gt;FHD 1080p + IR with Privacy Shutter&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Mikrofon&lt;/td&gt;\n&lt;td&gt;2x, Array&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Bateria&lt;/td&gt;\n&lt;td&gt;Integrated 60Wh&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Max. výdrž na baterii&lt;/td&gt;\n&lt;td&gt;-&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Napájací Adaptér&lt;/td&gt;\n&lt;td&gt;65W Round Tip (3-pin)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;DESIGN&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Displej&lt;/td&gt;\n&lt;td&gt;15.3\" WUXGA (1920x1200) IPS 300nits Anti-glare, 45% NTSC, 60Hz&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Dotyková obrazovka&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pero&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Klávesnica&lt;/td&gt;\n&lt;td&gt;Backlit, Czech / Slovak&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Farba&lt;/td&gt;\n&lt;td&gt;Luna Grey&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Materiál&lt;/td&gt;\n&lt;td&gt;Aluminium (Top), PC-ABS (Bottom)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Rozmery (ŠxHxV)&lt;/td&gt;\n&lt;td&gt;343.4 x 239.5 x 16.9-17.9 mm (13.52 x 9.51 x 0.67-0.70 inches)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Hmotnost&lt;/td&gt;\n&lt;td&gt;Starting at 1.63 kg&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;SOFTWARE&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Operačný systém&lt;/td&gt;\n&lt;td&gt;Windows 11 Home, Czech / Slovak / English&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Dodávaný software&lt;/td&gt;\n&lt;td&gt;Office Trial&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;KONEKTIVITA&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Ethernet&lt;/td&gt;\n&lt;td&gt;-&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;WLAN + Bluetooth&lt;/td&gt;\n&lt;td&gt;Wi-Fi 6, 802.11ax 2x2 + BT5.2&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Standartné porty&lt;/td&gt;\n&lt;td&gt;2x USB-A (USB 5Gbps / USB 3.2 Gen 1)&lt;br /&gt;1x USB-C (USB 5Gbps / USB 3.2 Gen 1), with USB PD 3.0 and DisplayPort™ 1.2&lt;br /&gt;1x HDMI 1.4&lt;br /&gt;1x Headphone / microphone combo jack (3.5mm)&lt;br /&gt;1x SD card reader&lt;br /&gt;1x Power connector&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;ZABEZPEČENÍ A SOUKROMÍ&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Čitačka otlačkov prstov&lt;/td&gt;\n&lt;td&gt;-&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;SERVIS&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Základná záruka&lt;/td&gt;\n&lt;td&gt;2-year, Courier or Carry-in&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Zahrnutý Upgrade&lt;/td&gt;\n&lt;td&gt;-&lt;/td&gt;\n&lt;/tr&gt;\n&lt;/tbody&gt;\n&lt;/table&gt;\n&lt;p&gt; &lt;/p&gt;",
    "supplierDescription": "&lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Produkt: Lenovo IdeaPad Slim 3 15IRH10&lt;/strong&gt;&lt;br /&gt; &lt;strong&gt;Part Number: 83K100DGCK&lt;br /&gt;&lt;/strong&gt;&lt;/p&gt;\n&lt;table id=\"lenovo\"&gt;\n&lt;tbody&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;VÝKON&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Procesor&lt;/td&gt;\n&lt;td&gt;Intel Core™ i5-13420H, 8C (4P + 4E) / 12T, P-core 2.1 / 4.6GHz, E-core 1.5 / 3.4GHz, 12MB&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Grafická Karta&lt;/td&gt;\n&lt;td&gt;Integrated Intel UHD Graphics&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Chipset&lt;/td&gt;\n&lt;td&gt;Intel SoC Platform&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pameť&lt;/td&gt;\n&lt;td&gt;8GB Soldered DDR5-4800 + 16GB SO-DIMM DDR5-4800&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pameťové sloty&lt;/td&gt;\n&lt;td&gt;One memory soldered to systemboard, one DDR5 SO-DIMM slot, dual-channel capable&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Max. Pameť&lt;/td&gt;\n&lt;td&gt;Up to 24GB (8GB soldered + 16GB SO-DIMM) DDR5-4800 offering&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Úložisko&lt;/td&gt;\n&lt;td&gt;1TB SSD M.2 2242 PCIe 4.0x4 NVMe&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Podporované Úložisko&lt;/td&gt;\n&lt;td&gt;Up to two drives, 2x M.2 SSD &lt;br /&gt;• M.2 2242 SSD up to 1TB&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Čitačka Kariet&lt;/td&gt;\n&lt;td&gt;SD Card Reader&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Optická Mechanika&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Audio Chip&lt;/td&gt;\n&lt;td&gt;High Definition (HD) Audio&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Reproduktory&lt;/td&gt;\n&lt;td&gt;Stereo speakers, 2W x2, optimized with Dolby Audio™&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Kamera&lt;/td&gt;\n&lt;td&gt;FHD 1080p + IR with Privacy Shutter&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Mikrofon&lt;/td&gt;\n&lt;td&gt;2x, Array&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Bateria&lt;/td&gt;\n&lt;td&gt;Integrated 60Wh&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Max. výdrž na baterii&lt;/td&gt;\n&lt;td&gt;-&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Napájací Adaptér&lt;/td&gt;\n&lt;td&gt;65W Round Tip (3-pin)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;DESIGN&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Displej&lt;/td&gt;\n&lt;td&gt;15.3\" WUXGA (1920x1200) IPS 300nits Anti-glare, 45% NTSC, 60Hz&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Dotyková obrazovka&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pero&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Klávesnica&lt;/td&gt;\n&lt;td&gt;Backlit, Czech / Slovak&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Farba&lt;/td&gt;\n&lt;td&gt;Luna Grey&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Materiál&lt;/td&gt;\n&lt;td&gt;Aluminium (Top), PC-ABS (Bottom)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Rozmery (ŠxHxV)&lt;/td&gt;\n&lt;td&gt;343.4 x 239.5 x 16.9-17.9 mm (13.52 x 9.51 x 0.67-0.70 inches)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Hmotnost&lt;/td&gt;\n&lt;td&gt;Starting at 1.63 kg&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;SOFTWARE&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Operačný systém&lt;/td&gt;\n&lt;td&gt;Windows 11 Home, Czech / Slovak / English&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Dodávaný software&lt;/td&gt;\n&lt;td&gt;Office Trial&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;KONEKTIVITA&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Ethernet&lt;/td&gt;\n&lt;td&gt;-&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;WLAN + Bluetooth&lt;/td&gt;\n&lt;td&gt;Wi-Fi 6, 802.11ax 2x2 + BT5.2&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Standartné porty&lt;/td&gt;\n&lt;td&gt;2x USB-A (USB 5Gbps / USB 3.2 Gen 1)&lt;br /&gt;1x USB-C (USB 5Gbps / USB 3.2 Gen 1), with USB PD 3.0 and DisplayPort™ 1.2&lt;br /&gt;1x HDMI 1.4&lt;br /&gt;1x Headphone / microphone combo jack (3.5mm)&lt;br /&gt;1x SD card reader&lt;br /&gt;1x Power connector&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;ZABEZPEČENÍ A SOUKROMÍ&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Čitačka otlačkov prstov&lt;/td&gt;\n&lt;td&gt;-&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;SERVIS&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Základná záruka&lt;/td&gt;\n&lt;td&gt;2-year, Courier or Carry-in&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Zahrnutý Upgrade&lt;/td&gt;\n&lt;td&gt;-&lt;/td&gt;\n&lt;/tr&gt;\n&lt;/tbody&gt;\n&lt;/table&gt;\n&lt;p&gt; &lt;/p&gt;",
    "seoTitle": "LENOVO NTB IdeaPad Slim 3 15IRH10 - i5-13420H,15.3\" WUXGA IPS,24GB,1TSSD,HDMI,Int. Intel UHD,W11H,2Y CC | Worlds.sk",
    "seoDescription": "Kúpiť LENOVO NTB IdeaPad Slim 3 15IRH10 - i5-13420H,15.3\" WUXGA IPS,24GB,1TSSD,HDMI,Int. Intel UHD,W11H,2Y CC (PartNumber: 83K100DJCK) za výhodnú cenu 895.3 € s expresným doručením z centrálneho skladu na Worlds.sk.",
    "searchKeywords": [
      "lenovo",
      "83k100djck",
      "notebooky"
    ],
    "pricing": {
      "supplierCost": 666.14,
      "supplierFees": {
        "garbageFee": 0.42,
        "authorFee": 6.04
      },
      "totalCostWithFees": 666.14,
      "vatRate": 20,
      "marginPercentage": 12,
      "basePrice": 746.08,
      "finalPrice": 895.3,
      "currency": "EUR"
    },
    "stockCount": 5,
    "isInStock": true,
    "stockText": "Skladom > 5 ks",
    "warrantyMonths": 24,
    "attributes": {
      "brand": {
        "code": "brand",
        "name": "Výrobca",
        "value": "Lenovo",
        "rawValue": "Lenovo"
      },
      "mpn": {
        "code": "mpn",
        "name": "Part Number",
        "value": "83K100DJCK",
        "rawValue": "83K100DJCK"
      },
      "warranty": {
        "code": "warranty",
        "name": "Záruka",
        "value": "24 mesiacov",
        "rawValue": "24"
      }
    },
    "images": [
      {
        "id": "img-1651147",
        "url": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80",
        "position": 0,
        "isPrimary": true,
        "altText": "LENOVO NTB IdeaPad Slim 3 15IRH10 - i5-13420H,15.3\" WUXGA IPS,24GB,1TSSD,HDMI,Int. Intel UHD,W11H,2Y CC"
      }
    ],
    "status": "ACTIVE",
    "reviewStatus": "AUTO_APPROVED",
    "qualityScore": {
      "total": 90,
      "breakdown": {
        "hasEan": true,
        "hasBrand": true,
        "hasMpn": true,
        "hasValidCategory": true,
        "hasImages": true,
        "hasAttributes": true,
        "hasDescription": true,
        "hasSeoMetadata": true,
        "hasPrice": true,
        "hasStock": true
      }
    },
    "dataHash": "hash_1651147_666.14_5",
    "lastSyncedAt": "2026-09-01T15:48:11.560Z",
    "lastReprocessedAt": "2026-09-01T15:48:11.560Z",
    "createdAt": "2026-09-01T15:48:11.560Z",
    "updatedAt": "2026-09-01T15:48:11.560Z"
  },
  {
    "id": "ed-8055366",
    "supplierCode": "8055366",
    "sku": "8055366",
    "mpn": "21T0001UCK",
    "ean": "198157657793",
    "brand": "Lenovo",
    "categorySlug": "firemne-notebooky",
    "categoryHierarchy": [
      "Počítače a notebooky",
      "Notebooky",
      "Firemné a pracovné notebooky"
    ],
    "title": "LENOVO NTB ThinkPad E14 G7 - AMD Ryzen 5 230,14\" WUXGA IPS,16GB,512SSD,HDMI,Radeon 760M,W11P,3Y Onsite",
    "slug": "lenovo-ntb-thinkpad-e14-g7-amd-ryzen-5-230-14-wuxga-ips-16gb-512ssd-hdmi-radeon-760m-w11p-3y-onsite-8055366",
    "shortDescription": "&lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Produkt: Lenovo ThinkPad E14 Gen 7 (AMD)&lt;/strong&gt;&lt;br /&gt; &lt;strong&gt;Part Number: 21T0001UCK&lt;/strong&gt;&lt;/p&gt;\n&lt;p dir=\"LTR\" align=\"LEFT\"&gt; &lt;/p&gt;\n&lt;table id=\"lenovo\"&gt;\n&lt;tbody&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;VÝKON&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Procesor&lt;/td&gt;\n&lt;td&gt;AMD Ryzen™ 5 230 (6C / 12T, 3.5 / 4.9GHz, 6MB L2 / 16MB L3)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Grafická Karta&lt;/td&gt;\n&lt;td&gt;Integrated AMD Radeon™ 760M Graphics&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Chipset&lt;/td&gt;\n&lt;td&gt;AMD SoC Platform&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pameť&lt;/td&gt;\n&lt;td&gt;1x 16GB SO-DIMM DDR5-5600&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pameťové sloty&lt;/td&gt;\n&lt;td&gt;Two DDR5 SO-DIMM slots, dual-channel capable&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Max. Pameť&lt;/td&gt;\n&lt;td&gt;Up to 64GB DDR5-5600&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Úložisko&lt;/td&gt;\n&lt;td&gt;512GB SSD M.2 2242 PCIe 4.0x4 NVMe Opal 2.0&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Podporované Úložisko&lt;/td&gt;\n&lt;td&gt;Up to two drives, 2x M.2 SSD&lt;br /&gt;• M.2 2242 SSD up to 1TB&lt;br /&gt;• M.2 2280 SSD up to 1TB&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Čitačka Kariet&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Optická Mechanika&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Audio Chip&lt;/td&gt;\n&lt;td&gt;High Definition (HD) Audio, Senary SN6147 codec&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Reproduktory&lt;/td&gt;\n&lt;td&gt;Stereo speakers, 2W x2, Dolby Atmos, audio by HARMAN&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Kamera&lt;/td&gt;\n&lt;td&gt;FHD 1080p + IR Hybrid with Privacy Shutter&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Mikrofon&lt;/td&gt;\n&lt;td&gt;2x, Array&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Bateria&lt;/td&gt;\n&lt;td&gt;64Wh&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Max. výdrž na baterii&lt;/td&gt;\n&lt;td&gt;-&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Napájací Adaptér&lt;/td&gt;\n&lt;td&gt;65W USB-C (3-pin)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;DESIGN&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Displej&lt;/td&gt;\n&lt;td&gt;14\" WUXGA (1920x1200) IPS 300nits Anti-glare, 45% NTSC, 60Hz&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Dotyková obrazovka&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pero&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Klávesnica&lt;/td&gt;\n&lt;td&gt;Backlit, Czech / Slovak&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Farba&lt;/td&gt;\n&lt;td&gt;Black&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Materiál&lt;/td&gt;\n&lt;td&gt;Aluminium (Top), Aluminium (Bottom)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Rozmery (ŠxHxV)&lt;/td&gt;\n&lt;td&gt;313 x 220.3 x 10.1/15.25 (front/rear), 19.7 (maximum) mm;&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Hmotnost&lt;/td&gt;\n&lt;td&gt;Starting at 1.41 kg&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;SOFTWARE&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Operačný systém&lt;/td&gt;\n&lt;td&gt;Windows 11 Pro, Czech / Slovak / English&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Dodávaný software&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;KONEKTIVITA&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Ethernet&lt;/td&gt;\n&lt;td&gt;100/1000M (RJ-45)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;WLAN + Bluetooth&lt;/td&gt;\n&lt;td&gt;Wi-Fi 6E, 802.11ax 2x2 + BT5.3&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Standartné porty&lt;/td&gt;\n&lt;td&gt;1x USB-A (USB 5Gbps / USB 3.2 Gen 1)&lt;br /&gt;1x USB-A (USB 10Gbps / USB 3.2 Gen 2), Always On&lt;br /&gt;1x USB-C (USB 5Gbps / USB 3.2 Gen 1), with USB PD 3.1 and DisplayPort™ 1.4&lt;br /&gt;1x USB-C (USB4 40Gbps), with USB PD 3.1 and DisplayPort™ 1.4a&lt;br /&gt;1x HDMI 2.1, up to 4K/60Hz&lt;br /&gt;1x Headphone / microphone combo jack (3.5mm)&lt;br /&gt;1x Ethernet (RJ-45)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;ZABEZPEČENÍ A SOUKROMÍ&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Čitačka otlačkov prstov&lt;/td&gt;\n&lt;td&gt;Touch Style, Match-on-Chip, Integrated in Power Button&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;SERVIS&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Základná záruka&lt;/td&gt;\n&lt;td&gt;1-year, Courier or Carry-in&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Zahrnutý Upgrade&lt;/td&gt;\n&lt;td&gt;3Y Onsite upgrade from 1Y Courier/Carry-in Windchill (CPN)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;/tbody&gt;\n&lt;/table&gt;\n&lt;p&gt; &lt;/p&gt;",
    "supplierDescription": "&lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Produkt: Lenovo ThinkPad E14 Gen 7 (AMD)&lt;/strong&gt;&lt;br /&gt; &lt;strong&gt;Part Number: 21T0001UCK&lt;/strong&gt;&lt;/p&gt;\n&lt;p dir=\"LTR\" align=\"LEFT\"&gt; &lt;/p&gt;\n&lt;table id=\"lenovo\"&gt;\n&lt;tbody&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;VÝKON&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Procesor&lt;/td&gt;\n&lt;td&gt;AMD Ryzen™ 5 230 (6C / 12T, 3.5 / 4.9GHz, 6MB L2 / 16MB L3)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Grafická Karta&lt;/td&gt;\n&lt;td&gt;Integrated AMD Radeon™ 760M Graphics&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Chipset&lt;/td&gt;\n&lt;td&gt;AMD SoC Platform&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pameť&lt;/td&gt;\n&lt;td&gt;1x 16GB SO-DIMM DDR5-5600&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pameťové sloty&lt;/td&gt;\n&lt;td&gt;Two DDR5 SO-DIMM slots, dual-channel capable&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Max. Pameť&lt;/td&gt;\n&lt;td&gt;Up to 64GB DDR5-5600&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Úložisko&lt;/td&gt;\n&lt;td&gt;512GB SSD M.2 2242 PCIe 4.0x4 NVMe Opal 2.0&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Podporované Úložisko&lt;/td&gt;\n&lt;td&gt;Up to two drives, 2x M.2 SSD&lt;br /&gt;• M.2 2242 SSD up to 1TB&lt;br /&gt;• M.2 2280 SSD up to 1TB&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Čitačka Kariet&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Optická Mechanika&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Audio Chip&lt;/td&gt;\n&lt;td&gt;High Definition (HD) Audio, Senary SN6147 codec&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Reproduktory&lt;/td&gt;\n&lt;td&gt;Stereo speakers, 2W x2, Dolby Atmos, audio by HARMAN&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Kamera&lt;/td&gt;\n&lt;td&gt;FHD 1080p + IR Hybrid with Privacy Shutter&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Mikrofon&lt;/td&gt;\n&lt;td&gt;2x, Array&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Bateria&lt;/td&gt;\n&lt;td&gt;64Wh&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Max. výdrž na baterii&lt;/td&gt;\n&lt;td&gt;-&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Napájací Adaptér&lt;/td&gt;\n&lt;td&gt;65W USB-C (3-pin)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;DESIGN&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Displej&lt;/td&gt;\n&lt;td&gt;14\" WUXGA (1920x1200) IPS 300nits Anti-glare, 45% NTSC, 60Hz&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Dotyková obrazovka&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pero&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Klávesnica&lt;/td&gt;\n&lt;td&gt;Backlit, Czech / Slovak&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Farba&lt;/td&gt;\n&lt;td&gt;Black&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Materiál&lt;/td&gt;\n&lt;td&gt;Aluminium (Top), Aluminium (Bottom)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Rozmery (ŠxHxV)&lt;/td&gt;\n&lt;td&gt;313 x 220.3 x 10.1/15.25 (front/rear), 19.7 (maximum) mm;&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Hmotnost&lt;/td&gt;\n&lt;td&gt;Starting at 1.41 kg&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;SOFTWARE&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Operačný systém&lt;/td&gt;\n&lt;td&gt;Windows 11 Pro, Czech / Slovak / English&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Dodávaný software&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;KONEKTIVITA&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Ethernet&lt;/td&gt;\n&lt;td&gt;100/1000M (RJ-45)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;WLAN + Bluetooth&lt;/td&gt;\n&lt;td&gt;Wi-Fi 6E, 802.11ax 2x2 + BT5.3&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Standartné porty&lt;/td&gt;\n&lt;td&gt;1x USB-A (USB 5Gbps / USB 3.2 Gen 1)&lt;br /&gt;1x USB-A (USB 10Gbps / USB 3.2 Gen 2), Always On&lt;br /&gt;1x USB-C (USB 5Gbps / USB 3.2 Gen 1), with USB PD 3.1 and DisplayPort™ 1.4&lt;br /&gt;1x USB-C (USB4 40Gbps), with USB PD 3.1 and DisplayPort™ 1.4a&lt;br /&gt;1x HDMI 2.1, up to 4K/60Hz&lt;br /&gt;1x Headphone / microphone combo jack (3.5mm)&lt;br /&gt;1x Ethernet (RJ-45)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;ZABEZPEČENÍ A SOUKROMÍ&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Čitačka otlačkov prstov&lt;/td&gt;\n&lt;td&gt;Touch Style, Match-on-Chip, Integrated in Power Button&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;SERVIS&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Základná záruka&lt;/td&gt;\n&lt;td&gt;1-year, Courier or Carry-in&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Zahrnutý Upgrade&lt;/td&gt;\n&lt;td&gt;3Y Onsite upgrade from 1Y Courier/Carry-in Windchill (CPN)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;/tbody&gt;\n&lt;/table&gt;\n&lt;p&gt; &lt;/p&gt;",
    "seoTitle": "LENOVO NTB ThinkPad E14 G7 - AMD Ryzen 5 230,14\" WUXGA IPS,16GB,512SSD,HDMI,Radeon 760M,W11P,3Y Onsite | Worlds.sk",
    "seoDescription": "Kúpiť LENOVO NTB ThinkPad E14 G7 - AMD Ryzen 5 230,14\" WUXGA IPS,16GB,512SSD,HDMI,Radeon 760M,W11P,3Y Onsite (PartNumber: 21T0001UCK) za výhodnú cenu 1095.98 € s expresným doručením z centrálneho skladu na Worlds.sk.",
    "searchKeywords": [
      "lenovo",
      "21t0001uck",
      "firemne-notebooky"
    ],
    "pricing": {
      "supplierCost": 815.46,
      "supplierFees": {
        "garbageFee": 0.42,
        "authorFee": 6.04
      },
      "totalCostWithFees": 815.46,
      "vatRate": 20,
      "marginPercentage": 12,
      "basePrice": 913.32,
      "finalPrice": 1095.98,
      "currency": "EUR"
    },
    "stockCount": 22,
    "isInStock": true,
    "stockText": "Skladom > 22 ks",
    "warrantyMonths": 24,
    "attributes": {
      "brand": {
        "code": "brand",
        "name": "Výrobca",
        "value": "Lenovo",
        "rawValue": "Lenovo"
      },
      "mpn": {
        "code": "mpn",
        "name": "Part Number",
        "value": "21T0001UCK",
        "rawValue": "21T0001UCK"
      },
      "warranty": {
        "code": "warranty",
        "name": "Záruka",
        "value": "24 mesiacov",
        "rawValue": "24"
      }
    },
    "images": [
      {
        "id": "img-8055366",
        "url": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=80",
        "position": 0,
        "isPrimary": true,
        "altText": "LENOVO NTB ThinkPad E14 G7 - AMD Ryzen 5 230,14\" WUXGA IPS,16GB,512SSD,HDMI,Radeon 760M,W11P,3Y Onsite"
      }
    ],
    "status": "ACTIVE",
    "reviewStatus": "AUTO_APPROVED",
    "qualityScore": {
      "total": 90,
      "breakdown": {
        "hasEan": true,
        "hasBrand": true,
        "hasMpn": true,
        "hasValidCategory": true,
        "hasImages": true,
        "hasAttributes": true,
        "hasDescription": true,
        "hasSeoMetadata": true,
        "hasPrice": true,
        "hasStock": true
      }
    },
    "dataHash": "hash_8055366_815.46_22",
    "lastSyncedAt": "2026-09-01T15:48:11.560Z",
    "lastReprocessedAt": "2026-09-01T15:48:11.560Z",
    "createdAt": "2026-09-01T15:48:11.560Z",
    "updatedAt": "2026-09-01T15:48:11.560Z"
  },
  {
    "id": "ed-8055371",
    "supplierCode": "8055371",
    "sku": "8055371",
    "mpn": "21ST0022CK",
    "ean": "198157664692",
    "brand": "Lenovo",
    "categorySlug": "firemne-notebooky",
    "categoryHierarchy": [
      "Počítače a notebooky",
      "Notebooky",
      "Firemné a pracovné notebooky"
    ],
    "title": "LENOVO NTB ThinkPad E16 G3 - Ryzen 7 250,16\" WUXGA IPS,32GB,1TSSD,HDMI,Radeon 780M,W11P,3Y Onsite",
    "slug": "lenovo-ntb-thinkpad-e16-g3-ryzen-7-250-16-wuxga-ips-32gb-1tssd-hdmi-radeon-780m-w11p-3y-onsite-8055371",
    "shortDescription": "&lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Produkt: Lenovo ThinkPad E16 Gen 3 (AMD)&lt;/strong&gt;&lt;br /&gt; &lt;strong&gt;Part Number: 21ST0022CK&lt;/strong&gt;&lt;/p&gt;\n&lt;p dir=\"LTR\" align=\"LEFT\"&gt; &lt;/p&gt;\n&lt;table id=\"lenovo\"&gt;\n&lt;tbody&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;VÝKON&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Procesor&lt;/td&gt;\n&lt;td&gt;AMD Ryzen™ 7 250 (8C / 16T, 3.3 / 5.1GHz, 8MB L2 / 16MB L3)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Grafická Karta&lt;/td&gt;\n&lt;td&gt;Integrated AMD Radeon™ 780M Graphics&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Chipset&lt;/td&gt;\n&lt;td&gt;AMD SoC Platform&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pameť&lt;/td&gt;\n&lt;td&gt;1x 32GB SO-DIMM DDR5-5600&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pameťové sloty&lt;/td&gt;\n&lt;td&gt;Two DDR5 SO-DIMM slots, dual-channel capable&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Max. Pameť&lt;/td&gt;\n&lt;td&gt;Up to 64GB DDR5-5600&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Úložisko&lt;/td&gt;\n&lt;td&gt;1TB SSD M.2 2242 PCIe 4.0x4 NVMe Opal 2.0&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Podporované Úložisko&lt;/td&gt;\n&lt;td&gt;Up to two drives, 2x M.2 SSD&lt;br /&gt;• M.2 2242 SSD up to 1TB&lt;br /&gt;• M.2 2280 SSD up to 1TB&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Čitačka Kariet&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Optická Mechanika&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Audio Chip&lt;/td&gt;\n&lt;td&gt;High Definition (HD) Audio, Senary SN6147 codec&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Reproduktory&lt;/td&gt;\n&lt;td&gt;Stereo speakers, 2W x2, Dolby Atmos, audio by HARMAN&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Kamera&lt;/td&gt;\n&lt;td&gt;FHD 1080p + IR Hybrid with Privacy Shutter&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Mikrofon&lt;/td&gt;\n&lt;td&gt;2x, Array&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Bateria&lt;/td&gt;\n&lt;td&gt;64Wh&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Max. výdrž na baterii&lt;/td&gt;\n&lt;td&gt;-&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Napájací Adaptér&lt;/td&gt;\n&lt;td&gt;65W USB-C (3-pin)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;DESIGN&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Displej&lt;/td&gt;\n&lt;td&gt;16\" WUXGA (1920x1200) IPS 300nits Anti-glare, 45% NTSC&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Dotyková obrazovka&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pero&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Klávesnica&lt;/td&gt;\n&lt;td&gt;Backlit, Czech / Slovak&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Farba&lt;/td&gt;\n&lt;td&gt;Black&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Materiál&lt;/td&gt;\n&lt;td&gt;Aluminium (Top), Aluminium (Bottom)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Rozmery (ŠxHxV)&lt;/td&gt;\n&lt;td&gt;356 x 249 x 10.1/17.05 (front/rear), 21.15 (maximum) mm;&lt;br /&gt;14.01 x 9.80 x 0.40/0.67 (front/rear), 0.83 (maximum) inches&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Hmotnost&lt;/td&gt;\n&lt;td&gt;Starting at 1.71 kg&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;SOFTWARE&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Operačný systém&lt;/td&gt;\n&lt;td&gt;Windows 11 Pro, Czech / Slovak / English&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Dodávaný software&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;KONEKTIVITA&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Ethernet&lt;/td&gt;\n&lt;td&gt;100/1000M (RJ-45)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;WLAN + Bluetooth&lt;/td&gt;\n&lt;td&gt;Wi-Fi 6E, 802.11ax 2x2 + BT5.3&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Standartné porty&lt;/td&gt;\n&lt;td&gt;1x USB-A (USB 5Gbps / USB 3.2 Gen 1)&lt;br /&gt;1x USB-A (USB 10Gbps / USB 3.2 Gen 2), Always On&lt;br /&gt;1x USB-C (USB 5Gbps / USB 3.2 Gen 1), with USB PD 3.1 and DisplayPort™ 1.4&lt;br /&gt;1x USB-C (USB4 40Gbps), with USB PD 3.1 and DisplayPort™ 1.4a&lt;br /&gt;1x HDMI 2.1, up to 4K/60Hz&lt;br /&gt;1x Headphone / microphone combo jack (3.5mm)&lt;br /&gt;1x Ethernet (RJ-45)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;ZABEZPEČENÍ A SOUKROMÍ&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Čitačka otlačkov prstov&lt;/td&gt;\n&lt;td&gt;Touch Style, Match-on-Chip, Integrated in Power Button&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;SERVIS&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Základná záruka&lt;/td&gt;\n&lt;td&gt;1-year, Courier or Carry-in&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Zahrnutý Upgrade&lt;/td&gt;\n&lt;td&gt;3Y Onsite upgrade from 1Y Courier/Carry-in Windchill (CPN)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;/tbody&gt;\n&lt;/table&gt;\n&lt;p&gt; &lt;/p&gt;",
    "supplierDescription": "&lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Produkt: Lenovo ThinkPad E16 Gen 3 (AMD)&lt;/strong&gt;&lt;br /&gt; &lt;strong&gt;Part Number: 21ST0022CK&lt;/strong&gt;&lt;/p&gt;\n&lt;p dir=\"LTR\" align=\"LEFT\"&gt; &lt;/p&gt;\n&lt;table id=\"lenovo\"&gt;\n&lt;tbody&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;VÝKON&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Procesor&lt;/td&gt;\n&lt;td&gt;AMD Ryzen™ 7 250 (8C / 16T, 3.3 / 5.1GHz, 8MB L2 / 16MB L3)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Grafická Karta&lt;/td&gt;\n&lt;td&gt;Integrated AMD Radeon™ 780M Graphics&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Chipset&lt;/td&gt;\n&lt;td&gt;AMD SoC Platform&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pameť&lt;/td&gt;\n&lt;td&gt;1x 32GB SO-DIMM DDR5-5600&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pameťové sloty&lt;/td&gt;\n&lt;td&gt;Two DDR5 SO-DIMM slots, dual-channel capable&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Max. Pameť&lt;/td&gt;\n&lt;td&gt;Up to 64GB DDR5-5600&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Úložisko&lt;/td&gt;\n&lt;td&gt;1TB SSD M.2 2242 PCIe 4.0x4 NVMe Opal 2.0&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Podporované Úložisko&lt;/td&gt;\n&lt;td&gt;Up to two drives, 2x M.2 SSD&lt;br /&gt;• M.2 2242 SSD up to 1TB&lt;br /&gt;• M.2 2280 SSD up to 1TB&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Čitačka Kariet&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Optická Mechanika&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Audio Chip&lt;/td&gt;\n&lt;td&gt;High Definition (HD) Audio, Senary SN6147 codec&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Reproduktory&lt;/td&gt;\n&lt;td&gt;Stereo speakers, 2W x2, Dolby Atmos, audio by HARMAN&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Kamera&lt;/td&gt;\n&lt;td&gt;FHD 1080p + IR Hybrid with Privacy Shutter&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Mikrofon&lt;/td&gt;\n&lt;td&gt;2x, Array&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Bateria&lt;/td&gt;\n&lt;td&gt;64Wh&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Max. výdrž na baterii&lt;/td&gt;\n&lt;td&gt;-&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Napájací Adaptér&lt;/td&gt;\n&lt;td&gt;65W USB-C (3-pin)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;DESIGN&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Displej&lt;/td&gt;\n&lt;td&gt;16\" WUXGA (1920x1200) IPS 300nits Anti-glare, 45% NTSC&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Dotyková obrazovka&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pero&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Klávesnica&lt;/td&gt;\n&lt;td&gt;Backlit, Czech / Slovak&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Farba&lt;/td&gt;\n&lt;td&gt;Black&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Materiál&lt;/td&gt;\n&lt;td&gt;Aluminium (Top), Aluminium (Bottom)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Rozmery (ŠxHxV)&lt;/td&gt;\n&lt;td&gt;356 x 249 x 10.1/17.05 (front/rear), 21.15 (maximum) mm;&lt;br /&gt;14.01 x 9.80 x 0.40/0.67 (front/rear), 0.83 (maximum) inches&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Hmotnost&lt;/td&gt;\n&lt;td&gt;Starting at 1.71 kg&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;SOFTWARE&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Operačný systém&lt;/td&gt;\n&lt;td&gt;Windows 11 Pro, Czech / Slovak / English&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Dodávaný software&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;KONEKTIVITA&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Ethernet&lt;/td&gt;\n&lt;td&gt;100/1000M (RJ-45)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;WLAN + Bluetooth&lt;/td&gt;\n&lt;td&gt;Wi-Fi 6E, 802.11ax 2x2 + BT5.3&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Standartné porty&lt;/td&gt;\n&lt;td&gt;1x USB-A (USB 5Gbps / USB 3.2 Gen 1)&lt;br /&gt;1x USB-A (USB 10Gbps / USB 3.2 Gen 2), Always On&lt;br /&gt;1x USB-C (USB 5Gbps / USB 3.2 Gen 1), with USB PD 3.1 and DisplayPort™ 1.4&lt;br /&gt;1x USB-C (USB4 40Gbps), with USB PD 3.1 and DisplayPort™ 1.4a&lt;br /&gt;1x HDMI 2.1, up to 4K/60Hz&lt;br /&gt;1x Headphone / microphone combo jack (3.5mm)&lt;br /&gt;1x Ethernet (RJ-45)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;ZABEZPEČENÍ A SOUKROMÍ&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Čitačka otlačkov prstov&lt;/td&gt;\n&lt;td&gt;Touch Style, Match-on-Chip, Integrated in Power Button&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;SERVIS&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Základná záruka&lt;/td&gt;\n&lt;td&gt;1-year, Courier or Carry-in&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Zahrnutý Upgrade&lt;/td&gt;\n&lt;td&gt;3Y Onsite upgrade from 1Y Courier/Carry-in Windchill (CPN)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;/tbody&gt;\n&lt;/table&gt;\n&lt;p&gt; &lt;/p&gt;",
    "seoTitle": "LENOVO NTB ThinkPad E16 G3 - Ryzen 7 250,16\" WUXGA IPS,32GB,1TSSD,HDMI,Radeon 780M,W11P,3Y Onsite | Worlds.sk",
    "seoDescription": "Kúpiť LENOVO NTB ThinkPad E16 G3 - Ryzen 7 250,16\" WUXGA IPS,32GB,1TSSD,HDMI,Radeon 780M,W11P,3Y Onsite (PartNumber: 21ST0022CK) za výhodnú cenu 1837.87 € s expresným doručením z centrálneho skladu na Worlds.sk.",
    "searchKeywords": [
      "lenovo",
      "21st0022ck",
      "firemne-notebooky"
    ],
    "pricing": {
      "supplierCost": 1367.46,
      "supplierFees": {
        "garbageFee": 0.42,
        "authorFee": 6.04
      },
      "totalCostWithFees": 1367.46,
      "vatRate": 20,
      "marginPercentage": 12,
      "basePrice": 1531.56,
      "finalPrice": 1837.87,
      "currency": "EUR"
    },
    "stockCount": 40,
    "isInStock": true,
    "stockText": "Skladom > 40 ks",
    "warrantyMonths": 24,
    "attributes": {
      "brand": {
        "code": "brand",
        "name": "Výrobca",
        "value": "Lenovo",
        "rawValue": "Lenovo"
      },
      "mpn": {
        "code": "mpn",
        "name": "Part Number",
        "value": "21ST0022CK",
        "rawValue": "21ST0022CK"
      },
      "warranty": {
        "code": "warranty",
        "name": "Záruka",
        "value": "24 mesiacov",
        "rawValue": "24"
      }
    },
    "images": [
      {
        "id": "img-8055371",
        "url": "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80",
        "position": 0,
        "isPrimary": true,
        "altText": "LENOVO NTB ThinkPad E16 G3 - Ryzen 7 250,16\" WUXGA IPS,32GB,1TSSD,HDMI,Radeon 780M,W11P,3Y Onsite"
      }
    ],
    "status": "ACTIVE",
    "reviewStatus": "AUTO_APPROVED",
    "qualityScore": {
      "total": 90,
      "breakdown": {
        "hasEan": true,
        "hasBrand": true,
        "hasMpn": true,
        "hasValidCategory": true,
        "hasImages": true,
        "hasAttributes": true,
        "hasDescription": true,
        "hasSeoMetadata": true,
        "hasPrice": true,
        "hasStock": true
      }
    },
    "dataHash": "hash_8055371_1367.46_40",
    "lastSyncedAt": "2026-09-01T15:48:11.560Z",
    "lastReprocessedAt": "2026-09-01T15:48:11.560Z",
    "createdAt": "2026-09-01T15:48:11.560Z",
    "updatedAt": "2026-09-01T15:48:11.560Z"
  },
  {
    "id": "ed-8055387",
    "supplierCode": "8055387",
    "sku": "8055387",
    "mpn": "21QG001NCK",
    "ean": "198157717442",
    "brand": "Lenovo",
    "categorySlug": "firemne-notebooky",
    "categoryHierarchy": [
      "Počítače a notebooky",
      "Notebooky",
      "Firemné a pracovné notebooky"
    ],
    "title": "LENOVO NTB ThinkPad T14 G6 - Ultra 5 228V,14\" WUXGA IPS,32GB,512SSD,HDMI,Int. Intel Arc,W11P,3Y Premier",
    "slug": "lenovo-ntb-thinkpad-t14-g6-ultra-5-228v-14-wuxga-ips-32gb-512ssd-hdmi-int-intel-arc-w11p-3y-premier-8055387",
    "shortDescription": "&lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Produkt: Lenovo ThinkPad T14 Gen 36(Intel)&lt;/strong&gt;&lt;br /&gt; &lt;strong&gt;Part Number: 21QG001NCK&lt;/strong&gt;&lt;/p&gt;\n&lt;p dir=\"LTR\" align=\"LEFT\"&gt; &lt;/p&gt;\n&lt;table id=\"lenovo\"&gt;\n&lt;tbody&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;VÝKON&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Procesor&lt;/td&gt;\n&lt;td&gt;Intel Core™ Ultra 5 228V, 8C (4P + 4LPE) / 8T, Max Turbo up to 4.5GHz, 8MB&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Grafická Karta&lt;/td&gt;\n&lt;td&gt;Integrated Intel Arc™ Graphics 130V&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Chipset&lt;/td&gt;\n&lt;td&gt;Intel SoC Platform&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pameť&lt;/td&gt;\n&lt;td&gt;32GB Soldered LPDDR5x-8533, MoP Memory&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pameťové sloty&lt;/td&gt;\n&lt;td&gt;Models with V series processor: memory soldered to systemboard, no slots, dual-channel&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Max. Pameť&lt;/td&gt;\n&lt;td&gt;Models with V series processor: 32GB soldered memory, not upgradable&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Úložisko&lt;/td&gt;\n&lt;td&gt;512GB SSD M.2 2280 PCIe 4.0x4 NVMe Opal 2.0&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Podporované Úložisko&lt;/td&gt;\n&lt;td&gt;One drive, up to 2TB M.2 2280 SSD&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Čitačka Kariet&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Optická Mechanika&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Audio Chip&lt;/td&gt;\n&lt;td&gt;High Definition (HD) Audio, Realtek ALC3287 codec&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Reproduktory&lt;/td&gt;\n&lt;td&gt;Stereo speakers, 2W x2, Dolby Audio™&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Kamera&lt;/td&gt;\n&lt;td&gt;5.0MP + IR Discrete with Privacy Shutter&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Mikrofon&lt;/td&gt;\n&lt;td&gt;2x, 360°&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Bateria&lt;/td&gt;\n&lt;td&gt;57Wh&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Max. výdrž na baterii&lt;/td&gt;\n&lt;td&gt;-&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Napájací Adaptér&lt;/td&gt;\n&lt;td&gt;65W USB-C Slim GaN (3-pin)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;DESIGN&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Displej&lt;/td&gt;\n&lt;td&gt;14\" WUXGA (1920x1200) IPS 400nits Anti-glare, 45% NTSC, 60Hz, DBEF5&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Dotyková obrazovka&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pero&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Klávesnica&lt;/td&gt;\n&lt;td&gt;Backlit, Czech / Slovak&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Farba&lt;/td&gt;\n&lt;td&gt;Black&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Materiál&lt;/td&gt;\n&lt;td&gt;PC + 20% CF (Top), PC + 20% CF (Bottom)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Rozmery (ŠxHxV)&lt;/td&gt;\n&lt;td&gt;315.9 x 223.7 x 10.9/16.13 (front/rear), 21.95 (maximum) mm;&lt;br /&gt;12.44 x 8.81 x 0.43/0.64 (front/rear), 0.86 (maximum) inches&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Hmotnost&lt;/td&gt;\n&lt;td&gt;Starting at 1.38 kg&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;SOFTWARE&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Operačný systém&lt;/td&gt;\n&lt;td&gt;Windows 11 Pro, Czech / Slovak / English&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Dodávaný software&lt;/td&gt;\n&lt;td&gt;Lenovo AI Now&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;KONEKTIVITA&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Ethernet&lt;/td&gt;\n&lt;td&gt;100/1000M (RJ-45)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;WLAN + Bluetooth&lt;/td&gt;\n&lt;td&gt;Intel Wi-Fi 7 BE201, 802.11be 2x2 + BT5.4&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Standartné porty&lt;/td&gt;\n&lt;td&gt;1x USB-A (USB 5Gbps / USB 3.2 Gen 1)&lt;br /&gt;1x USB-A (USB 5Gbps / USB 3.2 Gen 1), Always On&lt;br /&gt;2x USB-C (Thunderbolt™ 4 / USB4 40Gbps), with USB PD 3.0 and DisplayPort™ 2.1&lt;br /&gt;1x HDMI 2.1, up to 4K/60Hz&lt;br /&gt;1x Headphone / microphone combo jack (3.5mm)&lt;br /&gt;1x Ethernet (RJ-45)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;ZABEZPEČENÍ A SOUKROMÍ&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Čitačka otlačkov prstov&lt;/td&gt;\n&lt;td&gt;Touch Style, Match-on-Chip, Integrated in Power Button&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;SERVIS&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Základná záruka&lt;/td&gt;\n&lt;td&gt;3-year, Courier or Carry-in&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Zahrnutý Upgrade&lt;/td&gt;\n&lt;td&gt;3Y Premier Support HB (CPN), CO2 Offset 0.5 ton (2nd Generation Carbon Offset Projects)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;/tbody&gt;\n&lt;/table&gt;\n&lt;p&gt; &lt;/p&gt;",
    "supplierDescription": "&lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Produkt: Lenovo ThinkPad T14 Gen 36(Intel)&lt;/strong&gt;&lt;br /&gt; &lt;strong&gt;Part Number: 21QG001NCK&lt;/strong&gt;&lt;/p&gt;\n&lt;p dir=\"LTR\" align=\"LEFT\"&gt; &lt;/p&gt;\n&lt;table id=\"lenovo\"&gt;\n&lt;tbody&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;VÝKON&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Procesor&lt;/td&gt;\n&lt;td&gt;Intel Core™ Ultra 5 228V, 8C (4P + 4LPE) / 8T, Max Turbo up to 4.5GHz, 8MB&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Grafická Karta&lt;/td&gt;\n&lt;td&gt;Integrated Intel Arc™ Graphics 130V&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Chipset&lt;/td&gt;\n&lt;td&gt;Intel SoC Platform&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pameť&lt;/td&gt;\n&lt;td&gt;32GB Soldered LPDDR5x-8533, MoP Memory&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pameťové sloty&lt;/td&gt;\n&lt;td&gt;Models with V series processor: memory soldered to systemboard, no slots, dual-channel&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Max. Pameť&lt;/td&gt;\n&lt;td&gt;Models with V series processor: 32GB soldered memory, not upgradable&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Úložisko&lt;/td&gt;\n&lt;td&gt;512GB SSD M.2 2280 PCIe 4.0x4 NVMe Opal 2.0&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Podporované Úložisko&lt;/td&gt;\n&lt;td&gt;One drive, up to 2TB M.2 2280 SSD&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Čitačka Kariet&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Optická Mechanika&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Audio Chip&lt;/td&gt;\n&lt;td&gt;High Definition (HD) Audio, Realtek ALC3287 codec&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Reproduktory&lt;/td&gt;\n&lt;td&gt;Stereo speakers, 2W x2, Dolby Audio™&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Kamera&lt;/td&gt;\n&lt;td&gt;5.0MP + IR Discrete with Privacy Shutter&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Mikrofon&lt;/td&gt;\n&lt;td&gt;2x, 360°&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Bateria&lt;/td&gt;\n&lt;td&gt;57Wh&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Max. výdrž na baterii&lt;/td&gt;\n&lt;td&gt;-&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Napájací Adaptér&lt;/td&gt;\n&lt;td&gt;65W USB-C Slim GaN (3-pin)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;DESIGN&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Displej&lt;/td&gt;\n&lt;td&gt;14\" WUXGA (1920x1200) IPS 400nits Anti-glare, 45% NTSC, 60Hz, DBEF5&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Dotyková obrazovka&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pero&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Klávesnica&lt;/td&gt;\n&lt;td&gt;Backlit, Czech / Slovak&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Farba&lt;/td&gt;\n&lt;td&gt;Black&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Materiál&lt;/td&gt;\n&lt;td&gt;PC + 20% CF (Top), PC + 20% CF (Bottom)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Rozmery (ŠxHxV)&lt;/td&gt;\n&lt;td&gt;315.9 x 223.7 x 10.9/16.13 (front/rear), 21.95 (maximum) mm;&lt;br /&gt;12.44 x 8.81 x 0.43/0.64 (front/rear), 0.86 (maximum) inches&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Hmotnost&lt;/td&gt;\n&lt;td&gt;Starting at 1.38 kg&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;SOFTWARE&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Operačný systém&lt;/td&gt;\n&lt;td&gt;Windows 11 Pro, Czech / Slovak / English&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Dodávaný software&lt;/td&gt;\n&lt;td&gt;Lenovo AI Now&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;KONEKTIVITA&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Ethernet&lt;/td&gt;\n&lt;td&gt;100/1000M (RJ-45)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;WLAN + Bluetooth&lt;/td&gt;\n&lt;td&gt;Intel Wi-Fi 7 BE201, 802.11be 2x2 + BT5.4&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Standartné porty&lt;/td&gt;\n&lt;td&gt;1x USB-A (USB 5Gbps / USB 3.2 Gen 1)&lt;br /&gt;1x USB-A (USB 5Gbps / USB 3.2 Gen 1), Always On&lt;br /&gt;2x USB-C (Thunderbolt™ 4 / USB4 40Gbps), with USB PD 3.0 and DisplayPort™ 2.1&lt;br /&gt;1x HDMI 2.1, up to 4K/60Hz&lt;br /&gt;1x Headphone / microphone combo jack (3.5mm)&lt;br /&gt;1x Ethernet (RJ-45)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;ZABEZPEČENÍ A SOUKROMÍ&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Čitačka otlačkov prstov&lt;/td&gt;\n&lt;td&gt;Touch Style, Match-on-Chip, Integrated in Power Button&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;SERVIS&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Základná záruka&lt;/td&gt;\n&lt;td&gt;3-year, Courier or Carry-in&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Zahrnutý Upgrade&lt;/td&gt;\n&lt;td&gt;3Y Premier Support HB (CPN), CO2 Offset 0.5 ton (2nd Generation Carbon Offset Projects)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;/tbody&gt;\n&lt;/table&gt;\n&lt;p&gt; &lt;/p&gt;",
    "seoTitle": "LENOVO NTB ThinkPad T14 G6 - Ultra 5 228V,14\" WUXGA IPS,32GB,512SSD,HDMI,Int. Intel Arc,W11P,3Y Premier | Worlds.sk",
    "seoDescription": "Kúpiť LENOVO NTB ThinkPad T14 G6 - Ultra 5 228V,14\" WUXGA IPS,32GB,512SSD,HDMI,Int. Intel Arc,W11P,3Y Premier (PartNumber: 21QG001NCK) za výhodnú cenu 1955.59 € s expresným doručením z centrálneho skladu na Worlds.sk.",
    "searchKeywords": [
      "lenovo",
      "21qg001nck",
      "firemne-notebooky"
    ],
    "pricing": {
      "supplierCost": 1455.05,
      "supplierFees": {
        "garbageFee": 0.42,
        "authorFee": 6.04
      },
      "totalCostWithFees": 1455.05,
      "vatRate": 20,
      "marginPercentage": 12,
      "basePrice": 1629.66,
      "finalPrice": 1955.59,
      "currency": "EUR"
    },
    "stockCount": 1,
    "isInStock": true,
    "stockText": "Skladom > 1 ks",
    "warrantyMonths": 24,
    "attributes": {
      "brand": {
        "code": "brand",
        "name": "Výrobca",
        "value": "Lenovo",
        "rawValue": "Lenovo"
      },
      "mpn": {
        "code": "mpn",
        "name": "Part Number",
        "value": "21QG001NCK",
        "rawValue": "21QG001NCK"
      },
      "warranty": {
        "code": "warranty",
        "name": "Záruka",
        "value": "24 mesiacov",
        "rawValue": "24"
      }
    },
    "images": [
      {
        "id": "img-8055387",
        "url": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80",
        "position": 0,
        "isPrimary": true,
        "altText": "LENOVO NTB ThinkPad T14 G6 - Ultra 5 228V,14\" WUXGA IPS,32GB,512SSD,HDMI,Int. Intel Arc,W11P,3Y Premier"
      }
    ],
    "status": "ACTIVE",
    "reviewStatus": "AUTO_APPROVED",
    "qualityScore": {
      "total": 90,
      "breakdown": {
        "hasEan": true,
        "hasBrand": true,
        "hasMpn": true,
        "hasValidCategory": true,
        "hasImages": true,
        "hasAttributes": true,
        "hasDescription": true,
        "hasSeoMetadata": true,
        "hasPrice": true,
        "hasStock": true
      }
    },
    "dataHash": "hash_8055387_1455.05_1",
    "lastSyncedAt": "2026-09-01T15:48:11.560Z",
    "lastReprocessedAt": "2026-09-01T15:48:11.560Z",
    "createdAt": "2026-09-01T15:48:11.560Z",
    "updatedAt": "2026-09-01T15:48:11.560Z"
  },
  {
    "id": "ed-8055388",
    "supplierCode": "8055388",
    "sku": "8055388",
    "mpn": "21QG001UCK",
    "ean": "198157725980",
    "brand": "Lenovo",
    "categorySlug": "firemne-notebooky",
    "categoryHierarchy": [
      "Počítače a notebooky",
      "Notebooky",
      "Firemné a pracovné notebooky"
    ],
    "title": "LENOVO NTB ThinkPad T14 G6 - Ultra 7 258V,14\" WUXGA IPS,32GB,1TSSD,HDMI,Int. Intel Arc,W11P,3Y Premier",
    "slug": "lenovo-ntb-thinkpad-t14-g6-ultra-7-258v-14-wuxga-ips-32gb-1tssd-hdmi-int-intel-arc-w11p-3y-premier-8055388",
    "shortDescription": "&lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Produkt: Lenovo ThinkPad T14 Gen 36(Intel)&lt;/strong&gt;&lt;br /&gt; &lt;strong&gt;Part Number: 21QG001UCK&lt;/strong&gt;&lt;/p&gt;\n&lt;p dir=\"LTR\" align=\"LEFT\"&gt; &lt;/p&gt;\n&lt;table id=\"lenovo\"&gt;\n&lt;tbody&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;VÝKON&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Procesor&lt;/td&gt;\n&lt;td&gt;Intel Core™ Ultra 7 258V, 8C (4P + 4LPE) / 8T, Max Turbo up to 4.8GHz, 12MB&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Grafická Karta&lt;/td&gt;\n&lt;td&gt;Integrated Intel Arc™ Graphics 140V&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Chipset&lt;/td&gt;\n&lt;td&gt;Intel SoC Platform&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pameť&lt;/td&gt;\n&lt;td&gt;32GB Soldered LPDDR5x-8533, MoP Memory&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pameťové sloty&lt;/td&gt;\n&lt;td&gt;Models with V series processor: memory soldered to systemboard, no slots, dual-channel&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Max. Pameť&lt;/td&gt;\n&lt;td&gt;Models with V series processor: 32GB soldered memory, not upgradable&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Úložisko&lt;/td&gt;\n&lt;td&gt;1TB SSD M.2 2280 PCIe 5.0x4 Performance NVMe Opal 2.0&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Podporované Úložisko&lt;/td&gt;\n&lt;td&gt;One drive, up to 2TB M.2 2280 SSD&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Čitačka Kariet&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Optická Mechanika&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Audio Chip&lt;/td&gt;\n&lt;td&gt;High Definition (HD) Audio, Realtek ALC3287 codec&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Reproduktory&lt;/td&gt;\n&lt;td&gt;Stereo speakers, 2W x2, Dolby Audio™&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Kamera&lt;/td&gt;\n&lt;td&gt;5.0MP + IR Discrete with Privacy Shutter&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Mikrofon&lt;/td&gt;\n&lt;td&gt;2x, 360°&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Bateria&lt;/td&gt;\n&lt;td&gt;57Wh&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Max. výdrž na baterii&lt;/td&gt;\n&lt;td&gt;-&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Napájací Adaptér&lt;/td&gt;\n&lt;td&gt;65W USB-C Slim GaN (3-pin)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;DESIGN&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Displej&lt;/td&gt;\n&lt;td&gt;14\" WUXGA (1920x1200) IPS 400nits Anti-glare, 45% NTSC, 60Hz, DBEF5&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Dotyková obrazovka&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pero&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Klávesnica&lt;/td&gt;\n&lt;td&gt;Backlit, Czech / Slovak&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Farba&lt;/td&gt;\n&lt;td&gt;Black&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Materiál&lt;/td&gt;\n&lt;td&gt;PC + 20% CF (Top), PC + 20% CF (Bottom)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Rozmery (ŠxHxV)&lt;/td&gt;\n&lt;td&gt;315.9 x 223.7 x 10.9/16.13 (front/rear), 21.95 (maximum) mm;&lt;br /&gt;12.44 x 8.81 x 0.43/0.64 (front/rear), 0.86 (maximum) inches&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Hmotnost&lt;/td&gt;\n&lt;td&gt;Starting at 1.38 kg&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;SOFTWARE&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Operačný systém&lt;/td&gt;\n&lt;td&gt;Windows 11 Pro, Czech / Slovak / English&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Dodávaný software&lt;/td&gt;\n&lt;td&gt;Lenovo AI Now&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;KONEKTIVITA&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Ethernet&lt;/td&gt;\n&lt;td&gt;100/1000M (RJ-45)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;WLAN + Bluetooth&lt;/td&gt;\n&lt;td&gt;Intel Wi-Fi 7 BE201, 802.11be 2x2 + BT5.4&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Standartné porty&lt;/td&gt;\n&lt;td&gt;1x USB-A (USB 5Gbps / USB 3.2 Gen 1)&lt;br /&gt;1x USB-A (USB 5Gbps / USB 3.2 Gen 1), Always On&lt;br /&gt;2x USB-C (Thunderbolt™ 4 / USB4 40Gbps), with USB PD 3.0 and DisplayPort™ 2.1&lt;br /&gt;1x HDMI 2.1, up to 4K/60Hz&lt;br /&gt;1x Headphone / microphone combo jack (3.5mm)&lt;br /&gt;1x Ethernet (RJ-45)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;ZABEZPEČENÍ A SOUKROMÍ&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Čitačka otlačkov prstov&lt;/td&gt;\n&lt;td&gt;Touch Style, Match-on-Chip, Integrated in Power Button&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;SERVIS&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Základná záruka&lt;/td&gt;\n&lt;td&gt;3-year, Courier or Carry-in&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Zahrnutý Upgrade&lt;/td&gt;\n&lt;td&gt;3Y Premier Support HB (CPN), CO2 Offset 0.5 ton (2nd Generation Carbon Offset Projects)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;/tbody&gt;\n&lt;/table&gt;\n&lt;p&gt; &lt;/p&gt;",
    "supplierDescription": "&lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Produkt: Lenovo ThinkPad T14 Gen 36(Intel)&lt;/strong&gt;&lt;br /&gt; &lt;strong&gt;Part Number: 21QG001UCK&lt;/strong&gt;&lt;/p&gt;\n&lt;p dir=\"LTR\" align=\"LEFT\"&gt; &lt;/p&gt;\n&lt;table id=\"lenovo\"&gt;\n&lt;tbody&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;VÝKON&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Procesor&lt;/td&gt;\n&lt;td&gt;Intel Core™ Ultra 7 258V, 8C (4P + 4LPE) / 8T, Max Turbo up to 4.8GHz, 12MB&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Grafická Karta&lt;/td&gt;\n&lt;td&gt;Integrated Intel Arc™ Graphics 140V&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Chipset&lt;/td&gt;\n&lt;td&gt;Intel SoC Platform&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pameť&lt;/td&gt;\n&lt;td&gt;32GB Soldered LPDDR5x-8533, MoP Memory&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pameťové sloty&lt;/td&gt;\n&lt;td&gt;Models with V series processor: memory soldered to systemboard, no slots, dual-channel&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Max. Pameť&lt;/td&gt;\n&lt;td&gt;Models with V series processor: 32GB soldered memory, not upgradable&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Úložisko&lt;/td&gt;\n&lt;td&gt;1TB SSD M.2 2280 PCIe 5.0x4 Performance NVMe Opal 2.0&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Podporované Úložisko&lt;/td&gt;\n&lt;td&gt;One drive, up to 2TB M.2 2280 SSD&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Čitačka Kariet&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Optická Mechanika&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Audio Chip&lt;/td&gt;\n&lt;td&gt;High Definition (HD) Audio, Realtek ALC3287 codec&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Reproduktory&lt;/td&gt;\n&lt;td&gt;Stereo speakers, 2W x2, Dolby Audio™&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Kamera&lt;/td&gt;\n&lt;td&gt;5.0MP + IR Discrete with Privacy Shutter&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Mikrofon&lt;/td&gt;\n&lt;td&gt;2x, 360°&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Bateria&lt;/td&gt;\n&lt;td&gt;57Wh&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Max. výdrž na baterii&lt;/td&gt;\n&lt;td&gt;-&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Napájací Adaptér&lt;/td&gt;\n&lt;td&gt;65W USB-C Slim GaN (3-pin)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;DESIGN&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Displej&lt;/td&gt;\n&lt;td&gt;14\" WUXGA (1920x1200) IPS 400nits Anti-glare, 45% NTSC, 60Hz, DBEF5&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Dotyková obrazovka&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pero&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Klávesnica&lt;/td&gt;\n&lt;td&gt;Backlit, Czech / Slovak&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Farba&lt;/td&gt;\n&lt;td&gt;Black&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Materiál&lt;/td&gt;\n&lt;td&gt;PC + 20% CF (Top), PC + 20% CF (Bottom)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Rozmery (ŠxHxV)&lt;/td&gt;\n&lt;td&gt;315.9 x 223.7 x 10.9/16.13 (front/rear), 21.95 (maximum) mm;&lt;br /&gt;12.44 x 8.81 x 0.43/0.64 (front/rear), 0.86 (maximum) inches&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Hmotnost&lt;/td&gt;\n&lt;td&gt;Starting at 1.38 kg&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;SOFTWARE&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Operačný systém&lt;/td&gt;\n&lt;td&gt;Windows 11 Pro, Czech / Slovak / English&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Dodávaný software&lt;/td&gt;\n&lt;td&gt;Lenovo AI Now&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;KONEKTIVITA&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Ethernet&lt;/td&gt;\n&lt;td&gt;100/1000M (RJ-45)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;WLAN + Bluetooth&lt;/td&gt;\n&lt;td&gt;Intel Wi-Fi 7 BE201, 802.11be 2x2 + BT5.4&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Standartné porty&lt;/td&gt;\n&lt;td&gt;1x USB-A (USB 5Gbps / USB 3.2 Gen 1)&lt;br /&gt;1x USB-A (USB 5Gbps / USB 3.2 Gen 1), Always On&lt;br /&gt;2x USB-C (Thunderbolt™ 4 / USB4 40Gbps), with USB PD 3.0 and DisplayPort™ 2.1&lt;br /&gt;1x HDMI 2.1, up to 4K/60Hz&lt;br /&gt;1x Headphone / microphone combo jack (3.5mm)&lt;br /&gt;1x Ethernet (RJ-45)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;ZABEZPEČENÍ A SOUKROMÍ&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Čitačka otlačkov prstov&lt;/td&gt;\n&lt;td&gt;Touch Style, Match-on-Chip, Integrated in Power Button&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;SERVIS&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Základná záruka&lt;/td&gt;\n&lt;td&gt;3-year, Courier or Carry-in&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Zahrnutý Upgrade&lt;/td&gt;\n&lt;td&gt;3Y Premier Support HB (CPN), CO2 Offset 0.5 ton (2nd Generation Carbon Offset Projects)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;/tbody&gt;\n&lt;/table&gt;\n&lt;p&gt; &lt;/p&gt;",
    "seoTitle": "LENOVO NTB ThinkPad T14 G6 - Ultra 7 258V,14\" WUXGA IPS,32GB,1TSSD,HDMI,Int. Intel Arc,W11P,3Y Premier | Worlds.sk",
    "seoDescription": "Kúpiť LENOVO NTB ThinkPad T14 G6 - Ultra 7 258V,14\" WUXGA IPS,32GB,1TSSD,HDMI,Int. Intel Arc,W11P,3Y Premier (PartNumber: 21QG001UCK) za výhodnú cenu 2352.62 € s expresným doručením z centrálneho skladu na Worlds.sk.",
    "searchKeywords": [
      "lenovo",
      "21qg001uck",
      "firemne-notebooky"
    ],
    "pricing": {
      "supplierCost": 1750.46,
      "supplierFees": {
        "garbageFee": 0.42,
        "authorFee": 6.04
      },
      "totalCostWithFees": 1750.46,
      "vatRate": 20,
      "marginPercentage": 12,
      "basePrice": 1960.52,
      "finalPrice": 2352.62,
      "currency": "EUR"
    },
    "stockCount": 9,
    "isInStock": true,
    "stockText": "Skladom > 9 ks",
    "warrantyMonths": 24,
    "attributes": {
      "brand": {
        "code": "brand",
        "name": "Výrobca",
        "value": "Lenovo",
        "rawValue": "Lenovo"
      },
      "mpn": {
        "code": "mpn",
        "name": "Part Number",
        "value": "21QG001UCK",
        "rawValue": "21QG001UCK"
      },
      "warranty": {
        "code": "warranty",
        "name": "Záruka",
        "value": "24 mesiacov",
        "rawValue": "24"
      }
    },
    "images": [
      {
        "id": "img-8055388",
        "url": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80",
        "position": 0,
        "isPrimary": true,
        "altText": "LENOVO NTB ThinkPad T14 G6 - Ultra 7 258V,14\" WUXGA IPS,32GB,1TSSD,HDMI,Int. Intel Arc,W11P,3Y Premier"
      }
    ],
    "status": "ACTIVE",
    "reviewStatus": "AUTO_APPROVED",
    "qualityScore": {
      "total": 90,
      "breakdown": {
        "hasEan": true,
        "hasBrand": true,
        "hasMpn": true,
        "hasValidCategory": true,
        "hasImages": true,
        "hasAttributes": true,
        "hasDescription": true,
        "hasSeoMetadata": true,
        "hasPrice": true,
        "hasStock": true
      }
    },
    "dataHash": "hash_8055388_1750.46_9",
    "lastSyncedAt": "2026-09-01T15:48:11.560Z",
    "lastReprocessedAt": "2026-09-01T15:48:11.560Z",
    "createdAt": "2026-09-01T15:48:11.560Z",
    "updatedAt": "2026-09-01T15:48:11.560Z"
  },
  {
    "id": "ed-8055393",
    "supplierCode": "8055393",
    "sku": "8055393",
    "mpn": "21QL003RCK",
    "ean": "198158486811",
    "brand": "Lenovo",
    "categorySlug": "firemne-notebooky",
    "categoryHierarchy": [
      "Počítače a notebooky",
      "Notebooky",
      "Firemné a pracovné notebooky"
    ],
    "title": "LENOVO NTB ThinkPad P14s G6 - AMD Ryzen AI 7 PRO 350,14\" WUXGA IPS,32GB,1TSSD,HDMI,Int. AMD Radeon,W11P,3Y Premier",
    "slug": "lenovo-ntb-thinkpad-p14s-g6-amd-ryzen-ai-7-pro-350-14-wuxga-ips-32gb-1tssd-hdmi-int-amd-radeon-w11p-3y-premier-8055393",
    "shortDescription": "&lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Produkt: Lenovo ThinkPad P14s Gen 6 (AMD)&lt;/strong&gt;&lt;br /&gt; &lt;strong&gt;Part Number: 21QL003RCK&lt;/strong&gt;&lt;/p&gt;\n&lt;p dir=\"LTR\" align=\"LEFT\"&gt; &lt;/p&gt;\n&lt;table id=\"lenovo\"&gt;\n&lt;tbody&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;VÝKON&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Procesor&lt;/td&gt;\n&lt;td&gt;AMD Ryzen™ AI 7 PRO 350 (8C / 16T, 2.0 / 5.0GHz, 8MB L2 / 16MB L3)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Grafická Karta&lt;/td&gt;\n&lt;td&gt;Integrated AMD Radeon™ 860M Graphics&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Chipset&lt;/td&gt;\n&lt;td&gt;AMD SoC Platform&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pameť&lt;/td&gt;\n&lt;td&gt;2x 16GB SO-DIMM DDR5-5600 Non-ECC&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pameťové sloty&lt;/td&gt;\n&lt;td&gt;Two DDR5 SO-DIMM slots, dual-channel capable&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Max. Pameť&lt;/td&gt;\n&lt;td&gt;Up to 96GB (2x 48GB DDR5 SO-DIMM)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Úložisko&lt;/td&gt;\n&lt;td&gt;1TB SSD M.2 2280 PCIe 4.0x4 Performance NVMe Opal 2.0&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Podporované Úložisko&lt;/td&gt;\n&lt;td&gt;One drive, up to 2TB M.2 2280 SSD&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Čitačka Kariet&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Optická Mechanika&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Audio Chip&lt;/td&gt;\n&lt;td&gt;High Definition (HD) Audio, Realtek ALC3287 codec&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Reproduktory&lt;/td&gt;\n&lt;td&gt;Stereo speakers, 2W x2, Dolby Atmos&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Kamera&lt;/td&gt;\n&lt;td&gt;5.0MP + IR with Privacy Shutter&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Mikrofon&lt;/td&gt;\n&lt;td&gt;2x, Array&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Bateria&lt;/td&gt;\n&lt;td&gt;52.5Wh&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Max. výdrž na baterii&lt;/td&gt;\n&lt;td&gt;-&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Napájací Adaptér&lt;/td&gt;\n&lt;td&gt;65W USB-C (3-pin)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;DESIGN&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Displej&lt;/td&gt;\n&lt;td&gt;14\" WUXGA (1920x1200) IPS 400nits Anti-glare, 45% NTSC, DBEF5&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Dotyková obrazovka&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pero&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Klávesnica&lt;/td&gt;\n&lt;td&gt;Backlit, Czech / Slovak&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Farba&lt;/td&gt;\n&lt;td&gt;Black&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Materiál&lt;/td&gt;\n&lt;td&gt;PC + 20% CF + 50% GF + 30% PCC (Top), PC + 20% CF + 30% PCC (Bottom)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Rozmery (ŠxHxV)&lt;/td&gt;\n&lt;td&gt;315.90 x 223.70 x 10.90/16.13 (front/rear), 21.8 (maximum) mm;&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Hmotnost&lt;/td&gt;\n&lt;td&gt;Starting at 1.39 kg&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;SOFTWARE&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Operačný systém&lt;/td&gt;\n&lt;td&gt;Windows 11 Pro, Czech / Slovak / English&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Dodávaný software&lt;/td&gt;\n&lt;td&gt;Lenovo AI Now&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;KONEKTIVITA&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Ethernet&lt;/td&gt;\n&lt;td&gt;100/1000M (RJ-45)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;WLAN + Bluetooth&lt;/td&gt;\n&lt;td&gt;MediaTek Wi-Fi 7 MT7925, 802.11be 2x2 + BT5.4&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Standartné porty&lt;/td&gt;\n&lt;td&gt;1x USB-A (USB 5Gbps / USB 3.2 Gen 1)&lt;br /&gt;1x USB-A (USB 5Gbps / USB 3.2 Gen 1), Always On&lt;br /&gt;2x USB-C (Thunderbolt™ 4 / USB4 40Gbps), with PD 3.0 and DisplayPort™ 1.4&lt;br /&gt;1x HDMI 2.1, up to 4K/60Hz&lt;br /&gt;1x Headphone / microphone combo jack (3.5mm)&lt;br /&gt;1x Ethernet (RJ-45)&lt;br /&gt;1x Security keyhole&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;ZABEZPEČENÍ A SOUKROMÍ&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Čitačka otlačkov prstov&lt;/td&gt;\n&lt;td&gt;Touch Style, Match-on-Chip, Integrated in Power Button&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;SERVIS&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Základná záruka&lt;/td&gt;\n&lt;td&gt;3-year, Courier or Carry-in&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Zahrnutý Upgrade&lt;/td&gt;\n&lt;td&gt;3Y Premier Support Upgrade from 3Y Courier/Carry-In WHB(CPN), CO2 Offset 0.5 ton (2nd Generation Carbon Offset Projects)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;/tbody&gt;\n&lt;/table&gt;\n&lt;p&gt; &lt;/p&gt;",
    "supplierDescription": "&lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Produkt: Lenovo ThinkPad P14s Gen 6 (AMD)&lt;/strong&gt;&lt;br /&gt; &lt;strong&gt;Part Number: 21QL003RCK&lt;/strong&gt;&lt;/p&gt;\n&lt;p dir=\"LTR\" align=\"LEFT\"&gt; &lt;/p&gt;\n&lt;table id=\"lenovo\"&gt;\n&lt;tbody&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;VÝKON&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Procesor&lt;/td&gt;\n&lt;td&gt;AMD Ryzen™ AI 7 PRO 350 (8C / 16T, 2.0 / 5.0GHz, 8MB L2 / 16MB L3)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Grafická Karta&lt;/td&gt;\n&lt;td&gt;Integrated AMD Radeon™ 860M Graphics&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Chipset&lt;/td&gt;\n&lt;td&gt;AMD SoC Platform&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pameť&lt;/td&gt;\n&lt;td&gt;2x 16GB SO-DIMM DDR5-5600 Non-ECC&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pameťové sloty&lt;/td&gt;\n&lt;td&gt;Two DDR5 SO-DIMM slots, dual-channel capable&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Max. Pameť&lt;/td&gt;\n&lt;td&gt;Up to 96GB (2x 48GB DDR5 SO-DIMM)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Úložisko&lt;/td&gt;\n&lt;td&gt;1TB SSD M.2 2280 PCIe 4.0x4 Performance NVMe Opal 2.0&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Podporované Úložisko&lt;/td&gt;\n&lt;td&gt;One drive, up to 2TB M.2 2280 SSD&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Čitačka Kariet&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Optická Mechanika&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Audio Chip&lt;/td&gt;\n&lt;td&gt;High Definition (HD) Audio, Realtek ALC3287 codec&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Reproduktory&lt;/td&gt;\n&lt;td&gt;Stereo speakers, 2W x2, Dolby Atmos&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Kamera&lt;/td&gt;\n&lt;td&gt;5.0MP + IR with Privacy Shutter&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Mikrofon&lt;/td&gt;\n&lt;td&gt;2x, Array&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Bateria&lt;/td&gt;\n&lt;td&gt;52.5Wh&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Max. výdrž na baterii&lt;/td&gt;\n&lt;td&gt;-&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Napájací Adaptér&lt;/td&gt;\n&lt;td&gt;65W USB-C (3-pin)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;DESIGN&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Displej&lt;/td&gt;\n&lt;td&gt;14\" WUXGA (1920x1200) IPS 400nits Anti-glare, 45% NTSC, DBEF5&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Dotyková obrazovka&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pero&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Klávesnica&lt;/td&gt;\n&lt;td&gt;Backlit, Czech / Slovak&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Farba&lt;/td&gt;\n&lt;td&gt;Black&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Materiál&lt;/td&gt;\n&lt;td&gt;PC + 20% CF + 50% GF + 30% PCC (Top), PC + 20% CF + 30% PCC (Bottom)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Rozmery (ŠxHxV)&lt;/td&gt;\n&lt;td&gt;315.90 x 223.70 x 10.90/16.13 (front/rear), 21.8 (maximum) mm;&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Hmotnost&lt;/td&gt;\n&lt;td&gt;Starting at 1.39 kg&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;SOFTWARE&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Operačný systém&lt;/td&gt;\n&lt;td&gt;Windows 11 Pro, Czech / Slovak / English&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Dodávaný software&lt;/td&gt;\n&lt;td&gt;Lenovo AI Now&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;KONEKTIVITA&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Ethernet&lt;/td&gt;\n&lt;td&gt;100/1000M (RJ-45)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;WLAN + Bluetooth&lt;/td&gt;\n&lt;td&gt;MediaTek Wi-Fi 7 MT7925, 802.11be 2x2 + BT5.4&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Standartné porty&lt;/td&gt;\n&lt;td&gt;1x USB-A (USB 5Gbps / USB 3.2 Gen 1)&lt;br /&gt;1x USB-A (USB 5Gbps / USB 3.2 Gen 1), Always On&lt;br /&gt;2x USB-C (Thunderbolt™ 4 / USB4 40Gbps), with PD 3.0 and DisplayPort™ 1.4&lt;br /&gt;1x HDMI 2.1, up to 4K/60Hz&lt;br /&gt;1x Headphone / microphone combo jack (3.5mm)&lt;br /&gt;1x Ethernet (RJ-45)&lt;br /&gt;1x Security keyhole&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;ZABEZPEČENÍ A SOUKROMÍ&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Čitačka otlačkov prstov&lt;/td&gt;\n&lt;td&gt;Touch Style, Match-on-Chip, Integrated in Power Button&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;SERVIS&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Základná záruka&lt;/td&gt;\n&lt;td&gt;3-year, Courier or Carry-in&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Zahrnutý Upgrade&lt;/td&gt;\n&lt;td&gt;3Y Premier Support Upgrade from 3Y Courier/Carry-In WHB(CPN), CO2 Offset 0.5 ton (2nd Generation Carbon Offset Projects)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;/tbody&gt;\n&lt;/table&gt;\n&lt;p&gt; &lt;/p&gt;",
    "seoTitle": "LENOVO NTB ThinkPad P14s G6 - AMD Ryzen AI 7 PRO 350,14\" WUXGA IPS,32GB,1TSSD,HDMI,Int. AMD Radeon,W11P,3Y Premier | Worlds.sk",
    "seoDescription": "Kúpiť LENOVO NTB ThinkPad P14s G6 - AMD Ryzen AI 7 PRO 350,14\" WUXGA IPS,32GB,1TSSD,HDMI,Int. AMD Radeon,W11P,3Y Premier (PartNumber: 21QL003RCK) za výhodnú cenu 1950.77 € s expresným doručením z centrálneho skladu na Worlds.sk.",
    "searchKeywords": [
      "lenovo",
      "21ql003rck",
      "firemne-notebooky"
    ],
    "pricing": {
      "supplierCost": 1451.46,
      "supplierFees": {
        "garbageFee": 0.42,
        "authorFee": 6.04
      },
      "totalCostWithFees": 1451.46,
      "vatRate": 20,
      "marginPercentage": 12,
      "basePrice": 1625.64,
      "finalPrice": 1950.77,
      "currency": "EUR"
    },
    "stockCount": 2,
    "isInStock": true,
    "stockText": "Skladom > 2 ks",
    "warrantyMonths": 24,
    "attributes": {
      "brand": {
        "code": "brand",
        "name": "Výrobca",
        "value": "Lenovo",
        "rawValue": "Lenovo"
      },
      "mpn": {
        "code": "mpn",
        "name": "Part Number",
        "value": "21QL003RCK",
        "rawValue": "21QL003RCK"
      },
      "warranty": {
        "code": "warranty",
        "name": "Záruka",
        "value": "24 mesiacov",
        "rawValue": "24"
      }
    },
    "images": [
      {
        "id": "img-8055393",
        "url": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80",
        "position": 0,
        "isPrimary": true,
        "altText": "LENOVO NTB ThinkPad P14s G6 - AMD Ryzen AI 7 PRO 350,14\" WUXGA IPS,32GB,1TSSD,HDMI,Int. AMD Radeon,W11P,3Y Premier"
      }
    ],
    "status": "ACTIVE",
    "reviewStatus": "AUTO_APPROVED",
    "qualityScore": {
      "total": 90,
      "breakdown": {
        "hasEan": true,
        "hasBrand": true,
        "hasMpn": true,
        "hasValidCategory": true,
        "hasImages": true,
        "hasAttributes": true,
        "hasDescription": true,
        "hasSeoMetadata": true,
        "hasPrice": true,
        "hasStock": true
      }
    },
    "dataHash": "hash_8055393_1451.46_2",
    "lastSyncedAt": "2026-09-01T15:48:11.560Z",
    "lastReprocessedAt": "2026-09-01T15:48:11.560Z",
    "createdAt": "2026-09-01T15:48:11.560Z",
    "updatedAt": "2026-09-01T15:48:11.560Z"
  },
  {
    "id": "ed-8055396",
    "supplierCode": "8055396",
    "sku": "8055396",
    "mpn": "21QR003ECK",
    "ean": "198158511940",
    "brand": "Lenovo",
    "categorySlug": "firemne-notebooky",
    "categoryHierarchy": [
      "Počítače a notebooky",
      "Notebooky",
      "Firemné a pracovné notebooky"
    ],
    "title": "LENOVO NTB ThinkPad P16s Gen 4 - AMD Ryzen AI 7 PRO 350,16\" WUXGA Touch,32GB,1TSSD,HDMI,W11P,3Y Premier",
    "slug": "lenovo-ntb-thinkpad-p16s-gen-4-amd-ryzen-ai-7-pro-350-16-wuxga-touch-32gb-1tssd-hdmi-w11p-3y-premier-8055396",
    "shortDescription": "&lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Produkt: Lenovo ThinkPad P16s Gen 4 (AMD)&lt;/strong&gt;&lt;br /&gt; &lt;strong&gt;Part Number: 21QR003ECK&lt;/strong&gt;&lt;/p&gt;\n&lt;p dir=\"LTR\" align=\"LEFT\"&gt; &lt;/p&gt;\n&lt;table id=\"lenovo\"&gt;\n&lt;tbody&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;VÝKON&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Procesor&lt;/td&gt;\n&lt;td&gt;AMD Ryzen™ AI 7 PRO 350 (8C / 16T, 2.0 / 5.0GHz, 8MB L2 / 16MB L3)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Grafická Karta&lt;/td&gt;\n&lt;td&gt;Integrated AMD Radeon™ 860M Graphics&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Chipset&lt;/td&gt;\n&lt;td&gt;AMD SoC Platform&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pameť&lt;/td&gt;\n&lt;td&gt;2x 16GB SO-DIMM DDR5-5600 Non-ECC&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pameťové sloty&lt;/td&gt;\n&lt;td&gt;Two DDR5 SO-DIMM slots, dual-channel capable&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Max. Pameť&lt;/td&gt;\n&lt;td&gt;Up to 96GB (2x 48GB DDR5 SO-DIMM)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Úložisko&lt;/td&gt;\n&lt;td&gt;1TB SSD M.2 2280 PCIe 4.0x4 Performance NVMe Opal 2.0&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Podporované Úložisko&lt;/td&gt;\n&lt;td&gt;One drive, up to 2TB M.2 2280 SSD&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Čitačka Kariet&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Optická Mechanika&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Audio Chip&lt;/td&gt;\n&lt;td&gt;High Definition (HD) Audio, Realtek ALC3287 codec&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Reproduktory&lt;/td&gt;\n&lt;td&gt;Stereo speakers, 2W x2, Dolby Atmos&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Kamera&lt;/td&gt;\n&lt;td&gt;5.0MP + IR with Privacy Shutter and Human Presence Detection&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Mikrofon&lt;/td&gt;\n&lt;td&gt;2x, Array&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Bateria&lt;/td&gt;\n&lt;td&gt;86Wh&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Max. výdrž na baterii&lt;/td&gt;\n&lt;td&gt;-&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Napájací Adaptér&lt;/td&gt;\n&lt;td&gt;65W USB-C (3-pin)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;DESIGN&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Displej&lt;/td&gt;\n&lt;td&gt;16\" WUXGA (1920x1200) IPS 400nits Anti-glare, 45% NTSC, Eyesafe, Touch&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Dotyková obrazovka&lt;/td&gt;\n&lt;td&gt;On-cell, 10-point Multi-touch&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pero&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Klávesnica&lt;/td&gt;\n&lt;td&gt;Backlit, Czech / Slovak&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Farba&lt;/td&gt;\n&lt;td&gt;Black&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Materiál&lt;/td&gt;\n&lt;td&gt;PC + 20% CF + 50% GF + 30% PCC (Top), PC + 40% GF + 45% PCC (Bottom)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Rozmery (ŠxHxV)&lt;/td&gt;\n&lt;td&gt;359.70 x 251.70 x 11.80/18.14 (front/rear), 23.65 (maximum) mm;&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Hmotnost&lt;/td&gt;\n&lt;td&gt;Starting at 1.71 kg&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;SOFTWARE&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Operačný systém&lt;/td&gt;\n&lt;td&gt;Windows 11 Pro, Czech / Slovak / English&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Dodávaný software&lt;/td&gt;\n&lt;td&gt;Lenovo AI Now&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;KONEKTIVITA&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Ethernet&lt;/td&gt;\n&lt;td&gt;100/1000M (RJ-45)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;WLAN + Bluetooth&lt;/td&gt;\n&lt;td&gt;MediaTek Wi-Fi 7 MT7925, 802.11be 2x2 + BT5.4&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Standartné porty&lt;/td&gt;\n&lt;td&gt;1x USB-A (USB 5Gbps / USB 3.2 Gen 1)&lt;br /&gt;1x USB-A (USB 5Gbps / USB 3.2 Gen 1), Always On&lt;br /&gt;2x USB-C (Thunderbolt™ 4 / USB4 40Gbps), with PD 3.0 and DisplayPort™ 1.4&lt;br /&gt;1x HDMI 2.1, up to 4K/60Hz&lt;br /&gt;1x Headphone / microphone combo jack (3.5mm)&lt;br /&gt;1x Ethernet (RJ-45)&lt;br /&gt;1x Security keyhole&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;ZABEZPEČENÍ A SOUKROMÍ&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Čitačka otlačkov prstov&lt;/td&gt;\n&lt;td&gt;Touch Style, Match-on-Chip, Integrated in Power Button&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;SERVIS&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Základná záruka&lt;/td&gt;\n&lt;td&gt;3-year, Courier or Carry-in&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Zahrnutý Upgrade&lt;/td&gt;\n&lt;td&gt;3Y Premier Support Upgrade from 3Y Courier/Carry-In WHB(CPN), CO2 Offset 0.5 ton (2nd Generation Carbon Offset Projects)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;/tbody&gt;\n&lt;/table&gt;\n&lt;p&gt; &lt;/p&gt;",
    "supplierDescription": "&lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Produkt: Lenovo ThinkPad P16s Gen 4 (AMD)&lt;/strong&gt;&lt;br /&gt; &lt;strong&gt;Part Number: 21QR003ECK&lt;/strong&gt;&lt;/p&gt;\n&lt;p dir=\"LTR\" align=\"LEFT\"&gt; &lt;/p&gt;\n&lt;table id=\"lenovo\"&gt;\n&lt;tbody&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;VÝKON&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Procesor&lt;/td&gt;\n&lt;td&gt;AMD Ryzen™ AI 7 PRO 350 (8C / 16T, 2.0 / 5.0GHz, 8MB L2 / 16MB L3)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Grafická Karta&lt;/td&gt;\n&lt;td&gt;Integrated AMD Radeon™ 860M Graphics&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Chipset&lt;/td&gt;\n&lt;td&gt;AMD SoC Platform&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pameť&lt;/td&gt;\n&lt;td&gt;2x 16GB SO-DIMM DDR5-5600 Non-ECC&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pameťové sloty&lt;/td&gt;\n&lt;td&gt;Two DDR5 SO-DIMM slots, dual-channel capable&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Max. Pameť&lt;/td&gt;\n&lt;td&gt;Up to 96GB (2x 48GB DDR5 SO-DIMM)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Úložisko&lt;/td&gt;\n&lt;td&gt;1TB SSD M.2 2280 PCIe 4.0x4 Performance NVMe Opal 2.0&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Podporované Úložisko&lt;/td&gt;\n&lt;td&gt;One drive, up to 2TB M.2 2280 SSD&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Čitačka Kariet&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Optická Mechanika&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Audio Chip&lt;/td&gt;\n&lt;td&gt;High Definition (HD) Audio, Realtek ALC3287 codec&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Reproduktory&lt;/td&gt;\n&lt;td&gt;Stereo speakers, 2W x2, Dolby Atmos&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Kamera&lt;/td&gt;\n&lt;td&gt;5.0MP + IR with Privacy Shutter and Human Presence Detection&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Mikrofon&lt;/td&gt;\n&lt;td&gt;2x, Array&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Bateria&lt;/td&gt;\n&lt;td&gt;86Wh&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Max. výdrž na baterii&lt;/td&gt;\n&lt;td&gt;-&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Napájací Adaptér&lt;/td&gt;\n&lt;td&gt;65W USB-C (3-pin)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;DESIGN&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Displej&lt;/td&gt;\n&lt;td&gt;16\" WUXGA (1920x1200) IPS 400nits Anti-glare, 45% NTSC, Eyesafe, Touch&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Dotyková obrazovka&lt;/td&gt;\n&lt;td&gt;On-cell, 10-point Multi-touch&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pero&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Klávesnica&lt;/td&gt;\n&lt;td&gt;Backlit, Czech / Slovak&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Farba&lt;/td&gt;\n&lt;td&gt;Black&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Materiál&lt;/td&gt;\n&lt;td&gt;PC + 20% CF + 50% GF + 30% PCC (Top), PC + 40% GF + 45% PCC (Bottom)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Rozmery (ŠxHxV)&lt;/td&gt;\n&lt;td&gt;359.70 x 251.70 x 11.80/18.14 (front/rear), 23.65 (maximum) mm;&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Hmotnost&lt;/td&gt;\n&lt;td&gt;Starting at 1.71 kg&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;SOFTWARE&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Operačný systém&lt;/td&gt;\n&lt;td&gt;Windows 11 Pro, Czech / Slovak / English&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Dodávaný software&lt;/td&gt;\n&lt;td&gt;Lenovo AI Now&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;KONEKTIVITA&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Ethernet&lt;/td&gt;\n&lt;td&gt;100/1000M (RJ-45)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;WLAN + Bluetooth&lt;/td&gt;\n&lt;td&gt;MediaTek Wi-Fi 7 MT7925, 802.11be 2x2 + BT5.4&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Standartné porty&lt;/td&gt;\n&lt;td&gt;1x USB-A (USB 5Gbps / USB 3.2 Gen 1)&lt;br /&gt;1x USB-A (USB 5Gbps / USB 3.2 Gen 1), Always On&lt;br /&gt;2x USB-C (Thunderbolt™ 4 / USB4 40Gbps), with PD 3.0 and DisplayPort™ 1.4&lt;br /&gt;1x HDMI 2.1, up to 4K/60Hz&lt;br /&gt;1x Headphone / microphone combo jack (3.5mm)&lt;br /&gt;1x Ethernet (RJ-45)&lt;br /&gt;1x Security keyhole&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;ZABEZPEČENÍ A SOUKROMÍ&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Čitačka otlačkov prstov&lt;/td&gt;\n&lt;td&gt;Touch Style, Match-on-Chip, Integrated in Power Button&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;SERVIS&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Základná záruka&lt;/td&gt;\n&lt;td&gt;3-year, Courier or Carry-in&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Zahrnutý Upgrade&lt;/td&gt;\n&lt;td&gt;3Y Premier Support Upgrade from 3Y Courier/Carry-In WHB(CPN), CO2 Offset 0.5 ton (2nd Generation Carbon Offset Projects)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;/tbody&gt;\n&lt;/table&gt;\n&lt;p&gt; &lt;/p&gt;",
    "seoTitle": "LENOVO NTB ThinkPad P16s Gen 4 - AMD Ryzen AI 7 PRO 350,16\" WUXGA Touch,32GB,1TSSD,HDMI,W11P,3Y Premier | Worlds.sk",
    "seoDescription": "Kúpiť LENOVO NTB ThinkPad P16s Gen 4 - AMD Ryzen AI 7 PRO 350,16\" WUXGA Touch,32GB,1TSSD,HDMI,W11P,3Y Premier (PartNumber: 21QR003ECK) za výhodnú cenu 2495.09 € s expresným doručením z centrálneho skladu na Worlds.sk.",
    "searchKeywords": [
      "lenovo",
      "21qr003eck",
      "firemne-notebooky"
    ],
    "pricing": {
      "supplierCost": 1856.46,
      "supplierFees": {
        "garbageFee": 0.42,
        "authorFee": 6.04
      },
      "totalCostWithFees": 1856.46,
      "vatRate": 20,
      "marginPercentage": 12,
      "basePrice": 2079.24,
      "finalPrice": 2495.09,
      "currency": "EUR"
    },
    "stockCount": 2,
    "isInStock": true,
    "stockText": "Skladom > 2 ks",
    "warrantyMonths": 24,
    "attributes": {
      "brand": {
        "code": "brand",
        "name": "Výrobca",
        "value": "Lenovo",
        "rawValue": "Lenovo"
      },
      "mpn": {
        "code": "mpn",
        "name": "Part Number",
        "value": "21QR003ECK",
        "rawValue": "21QR003ECK"
      },
      "warranty": {
        "code": "warranty",
        "name": "Záruka",
        "value": "24 mesiacov",
        "rawValue": "24"
      }
    },
    "images": [
      {
        "id": "img-8055396",
        "url": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=80",
        "position": 0,
        "isPrimary": true,
        "altText": "LENOVO NTB ThinkPad P16s Gen 4 - AMD Ryzen AI 7 PRO 350,16\" WUXGA Touch,32GB,1TSSD,HDMI,W11P,3Y Premier"
      }
    ],
    "status": "ACTIVE",
    "reviewStatus": "AUTO_APPROVED",
    "qualityScore": {
      "total": 90,
      "breakdown": {
        "hasEan": true,
        "hasBrand": true,
        "hasMpn": true,
        "hasValidCategory": true,
        "hasImages": true,
        "hasAttributes": true,
        "hasDescription": true,
        "hasSeoMetadata": true,
        "hasPrice": true,
        "hasStock": true
      }
    },
    "dataHash": "hash_8055396_1856.46_2",
    "lastSyncedAt": "2026-09-01T15:48:11.560Z",
    "lastReprocessedAt": "2026-09-01T15:48:11.560Z",
    "createdAt": "2026-09-01T15:48:11.560Z",
    "updatedAt": "2026-09-01T15:48:11.560Z"
  },
  {
    "id": "ed-8055399",
    "supplierCode": "8055399",
    "sku": "8055399",
    "mpn": "21RX000XCK",
    "ean": "198158505048",
    "brand": "Lenovo",
    "categorySlug": "firemne-notebooky",
    "categoryHierarchy": [
      "Počítače a notebooky",
      "Notebooky",
      "Firemné a pracovné notebooky"
    ],
    "title": "LENOVO NTB ThinkPad P16s Gen 4 - AMD Ryzen AI 9 HX PRO 370,16\" WUXGA IPS,64GB,1TSSD,HDMI,Int. AMD Radeon,W11P,3Y Premier",
    "slug": "lenovo-ntb-thinkpad-p16s-gen-4-amd-ryzen-ai-9-hx-pro-370-16-wuxga-ips-64gb-1tssd-hdmi-int-amd-radeon-w11p-3y-premier-8055399",
    "shortDescription": "&lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Produkt: Lenovo ThinkPad P16s Gen 4 (AMD)&lt;/strong&gt;&lt;br /&gt; &lt;strong&gt;Part Number: 21RX000XCK&lt;/strong&gt;&lt;/p&gt;\n&lt;p dir=\"LTR\" align=\"LEFT\"&gt; &lt;/p&gt;\n&lt;table id=\"lenovo\"&gt;\n&lt;tbody&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;VÝKON&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Procesor&lt;/td&gt;\n&lt;td&gt;AMD Ryzen™ AI 9 HX PRO 370 (12C / 24T, 2.0 / 5.1GHz, 12MB L2 / 24MB L3)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Grafická Karta&lt;/td&gt;\n&lt;td&gt;Integrated AMD Radeon™ 890M Graphics&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Chipset&lt;/td&gt;\n&lt;td&gt;AMD SoC Platform&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pameť&lt;/td&gt;\n&lt;td&gt;2x 32GB SO-DIMM DDR5-5600 Non-ECC&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pameťové sloty&lt;/td&gt;\n&lt;td&gt;Two DDR5 SO-DIMM slots, dual-channel capable&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Max. Pameť&lt;/td&gt;\n&lt;td&gt;Up to 96GB (2x 48GB DDR5 SO-DIMM)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Úložisko&lt;/td&gt;\n&lt;td&gt;1TB SSD M.2 2280 PCIe 4.0x4 Performance NVMe Opal 2.0&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Podporované Úložisko&lt;/td&gt;\n&lt;td&gt;One drive, up to 2TB M.2 2280 SSD&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Čitačka Kariet&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Optická Mechanika&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Audio Chip&lt;/td&gt;\n&lt;td&gt;High Definition (HD) Audio, Realtek ALC3287 codec&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Reproduktory&lt;/td&gt;\n&lt;td&gt;Stereo speakers, 2W x2, Dolby Atmos&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Kamera&lt;/td&gt;\n&lt;td&gt;5.0MP + IR with Privacy Shutter and Human Presence Detection&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Mikrofon&lt;/td&gt;\n&lt;td&gt;2x, Array&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Bateria&lt;/td&gt;\n&lt;td&gt;86Wh&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Max. výdrž na baterii&lt;/td&gt;\n&lt;td&gt;-&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Napájací Adaptér&lt;/td&gt;\n&lt;td&gt;65W USB-C (3-pin)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;DESIGN&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Displej&lt;/td&gt;\n&lt;td&gt;16\" WUXGA (1920x1200) IPS 500nits Anti-glare, 100% sRGB, Low Power, Eyesafe, UL Low Blue Light&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Dotyková obrazovka&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pero&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Klávesnica&lt;/td&gt;\n&lt;td&gt;Backlit, Czech / Slovak&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Farba&lt;/td&gt;\n&lt;td&gt;Black&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Materiál&lt;/td&gt;\n&lt;td&gt;PC + 20% CF + 50% GF + 30% PCC (Top), PC + 20% CF + 30% PCC (Bottom)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Rozmery (ŠxHxV)&lt;/td&gt;\n&lt;td&gt;359.70 x 251.70 x 11.80/18.14 (front/rear), 23.5 (maximum) mm;&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Hmotnost&lt;/td&gt;\n&lt;td&gt;Starting at 1.71 kg&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;SOFTWARE&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Operačný systém&lt;/td&gt;\n&lt;td&gt;Windows 11 Pro, Czech / Slovak / English&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Dodávaný software&lt;/td&gt;\n&lt;td&gt;Lenovo AI Now&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;KONEKTIVITA&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Ethernet&lt;/td&gt;\n&lt;td&gt;100/1000M (RJ-45)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;WLAN + Bluetooth&lt;/td&gt;\n&lt;td&gt;MediaTek Wi-Fi 7 MT7925, 802.11be 2x2 + BT5.4&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Standartné porty&lt;/td&gt;\n&lt;td&gt;1x USB-A (USB 5Gbps / USB 3.2 Gen 1)&lt;br /&gt;1x USB-A (USB 5Gbps / USB 3.2 Gen 1), Always On&lt;br /&gt;2x USB-C (Thunderbolt™ 4 / USB4 40Gbps), with PD 3.0 and DisplayPort™ 1.4&lt;br /&gt;1x HDMI 2.1, up to 4K/60Hz&lt;br /&gt;1x Headphone / microphone combo jack (3.5mm)&lt;br /&gt;1x Ethernet (RJ-45)&lt;br /&gt;1x Security keyhole&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;ZABEZPEČENÍ A SOUKROMÍ&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Čitačka otlačkov prstov&lt;/td&gt;\n&lt;td&gt;Touch Style, Match-on-Chip, Integrated in Power Button&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;SERVIS&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Základná záruka&lt;/td&gt;\n&lt;td&gt;3-year, Courier or Carry-in&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Zahrnutý Upgrade&lt;/td&gt;\n&lt;td&gt;3Y Premier Support Upgrade from 3Y Courier/Carry-In WHB(CPN), CO2 Offset 0.5 ton (2nd Generation Carbon Offset Projects)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;/tbody&gt;\n&lt;/table&gt;\n&lt;p&gt; &lt;/p&gt;",
    "supplierDescription": "&lt;p dir=\"LTR\" align=\"LEFT\"&gt;&lt;strong&gt;Produkt: Lenovo ThinkPad P16s Gen 4 (AMD)&lt;/strong&gt;&lt;br /&gt; &lt;strong&gt;Part Number: 21RX000XCK&lt;/strong&gt;&lt;/p&gt;\n&lt;p dir=\"LTR\" align=\"LEFT\"&gt; &lt;/p&gt;\n&lt;table id=\"lenovo\"&gt;\n&lt;tbody&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;VÝKON&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Procesor&lt;/td&gt;\n&lt;td&gt;AMD Ryzen™ AI 9 HX PRO 370 (12C / 24T, 2.0 / 5.1GHz, 12MB L2 / 24MB L3)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Grafická Karta&lt;/td&gt;\n&lt;td&gt;Integrated AMD Radeon™ 890M Graphics&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Chipset&lt;/td&gt;\n&lt;td&gt;AMD SoC Platform&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pameť&lt;/td&gt;\n&lt;td&gt;2x 32GB SO-DIMM DDR5-5600 Non-ECC&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pameťové sloty&lt;/td&gt;\n&lt;td&gt;Two DDR5 SO-DIMM slots, dual-channel capable&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Max. Pameť&lt;/td&gt;\n&lt;td&gt;Up to 96GB (2x 48GB DDR5 SO-DIMM)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Úložisko&lt;/td&gt;\n&lt;td&gt;1TB SSD M.2 2280 PCIe 4.0x4 Performance NVMe Opal 2.0&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Podporované Úložisko&lt;/td&gt;\n&lt;td&gt;One drive, up to 2TB M.2 2280 SSD&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Čitačka Kariet&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Optická Mechanika&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Audio Chip&lt;/td&gt;\n&lt;td&gt;High Definition (HD) Audio, Realtek ALC3287 codec&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Reproduktory&lt;/td&gt;\n&lt;td&gt;Stereo speakers, 2W x2, Dolby Atmos&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Kamera&lt;/td&gt;\n&lt;td&gt;5.0MP + IR with Privacy Shutter and Human Presence Detection&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Mikrofon&lt;/td&gt;\n&lt;td&gt;2x, Array&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Bateria&lt;/td&gt;\n&lt;td&gt;86Wh&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Max. výdrž na baterii&lt;/td&gt;\n&lt;td&gt;-&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Napájací Adaptér&lt;/td&gt;\n&lt;td&gt;65W USB-C (3-pin)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;DESIGN&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Displej&lt;/td&gt;\n&lt;td&gt;16\" WUXGA (1920x1200) IPS 500nits Anti-glare, 100% sRGB, Low Power, Eyesafe, UL Low Blue Light&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Dotyková obrazovka&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Pero&lt;/td&gt;\n&lt;td&gt;Nie&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Klávesnica&lt;/td&gt;\n&lt;td&gt;Backlit, Czech / Slovak&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Farba&lt;/td&gt;\n&lt;td&gt;Black&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Materiál&lt;/td&gt;\n&lt;td&gt;PC + 20% CF + 50% GF + 30% PCC (Top), PC + 20% CF + 30% PCC (Bottom)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Rozmery (ŠxHxV)&lt;/td&gt;\n&lt;td&gt;359.70 x 251.70 x 11.80/18.14 (front/rear), 23.5 (maximum) mm;&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Hmotnost&lt;/td&gt;\n&lt;td&gt;Starting at 1.71 kg&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;SOFTWARE&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Operačný systém&lt;/td&gt;\n&lt;td&gt;Windows 11 Pro, Czech / Slovak / English&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Dodávaný software&lt;/td&gt;\n&lt;td&gt;Lenovo AI Now&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;KONEKTIVITA&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Ethernet&lt;/td&gt;\n&lt;td&gt;100/1000M (RJ-45)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;WLAN + Bluetooth&lt;/td&gt;\n&lt;td&gt;MediaTek Wi-Fi 7 MT7925, 802.11be 2x2 + BT5.4&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Standartné porty&lt;/td&gt;\n&lt;td&gt;1x USB-A (USB 5Gbps / USB 3.2 Gen 1)&lt;br /&gt;1x USB-A (USB 5Gbps / USB 3.2 Gen 1), Always On&lt;br /&gt;2x USB-C (Thunderbolt™ 4 / USB4 40Gbps), with PD 3.0 and DisplayPort™ 1.4&lt;br /&gt;1x HDMI 2.1, up to 4K/60Hz&lt;br /&gt;1x Headphone / microphone combo jack (3.5mm)&lt;br /&gt;1x Ethernet (RJ-45)&lt;br /&gt;1x Security keyhole&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;ZABEZPEČENÍ A SOUKROMÍ&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Čitačka otlačkov prstov&lt;/td&gt;\n&lt;td&gt;Touch Style, Match-on-Chip, Integrated in Power Button&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;th colspan=\"2\"&gt;&lt;strong&gt;SERVIS&lt;/strong&gt;&lt;/th&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Základná záruka&lt;/td&gt;\n&lt;td&gt;3-year, Courier or Carry-in&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n&lt;td&gt;Zahrnutý Upgrade&lt;/td&gt;\n&lt;td&gt;3Y Premier Support Upgrade from 3Y Courier/Carry-In WHB(CPN), CO2 Offset 0.5 ton (2nd Generation Carbon Offset Projects)&lt;/td&gt;\n&lt;/tr&gt;\n&lt;/tbody&gt;\n&lt;/table&gt;\n&lt;p&gt; &lt;/p&gt;",
    "seoTitle": "LENOVO NTB ThinkPad P16s Gen 4 - AMD Ryzen AI 9 HX PRO 370,16\" WUXGA IPS,64GB,1TSSD,HDMI,Int. AMD Radeon,W11P,3Y Premier | Worlds.sk",
    "seoDescription": "Kúpiť LENOVO NTB ThinkPad P16s Gen 4 - AMD Ryzen AI 9 HX PRO 370,16\" WUXGA IPS,64GB,1TSSD,HDMI,Int. AMD Radeon,W11P,3Y Premier (PartNumber: 21RX000XCK) za výhodnú cenu 3679.15 € s expresným doručením z centrálneho skladu na Worlds.sk.",
    "searchKeywords": [
      "lenovo",
      "21rx000xck",
      "firemne-notebooky"
    ],
    "pricing": {
      "supplierCost": 2737.46,
      "supplierFees": {
        "garbageFee": 0.42,
        "authorFee": 6.04
      },
      "totalCostWithFees": 2737.46,
      "vatRate": 20,
      "marginPercentage": 12,
      "basePrice": 3065.96,
      "finalPrice": 3679.15,
      "currency": "EUR"
    },
    "stockCount": 4,
    "isInStock": true,
    "stockText": "Skladom > 4 ks",
    "warrantyMonths": 24,
    "attributes": {
      "brand": {
        "code": "brand",
        "name": "Výrobca",
        "value": "Lenovo",
        "rawValue": "Lenovo"
      },
      "mpn": {
        "code": "mpn",
        "name": "Part Number",
        "value": "21RX000XCK",
        "rawValue": "21RX000XCK"
      },
      "warranty": {
        "code": "warranty",
        "name": "Záruka",
        "value": "24 mesiacov",
        "rawValue": "24"
      }
    },
    "images": [
      {
        "id": "img-8055399",
        "url": "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80",
        "position": 0,
        "isPrimary": true,
        "altText": "LENOVO NTB ThinkPad P16s Gen 4 - AMD Ryzen AI 9 HX PRO 370,16\" WUXGA IPS,64GB,1TSSD,HDMI,Int. AMD Radeon,W11P,3Y Premier"
      }
    ],
    "status": "ACTIVE",
    "reviewStatus": "AUTO_APPROVED",
    "qualityScore": {
      "total": 90,
      "breakdown": {
        "hasEan": true,
        "hasBrand": true,
        "hasMpn": true,
        "hasValidCategory": true,
        "hasImages": true,
        "hasAttributes": true,
        "hasDescription": true,
        "hasSeoMetadata": true,
        "hasPrice": true,
        "hasStock": true
      }
    },
    "dataHash": "hash_8055399_2737.46_4",
    "lastSyncedAt": "2026-09-01T15:48:11.560Z",
    "lastReprocessedAt": "2026-09-01T15:48:11.560Z",
    "createdAt": "2026-09-01T15:48:11.560Z",
    "updatedAt": "2026-09-01T15:48:11.560Z"
  }
];

export async function getAllProducts(): Promise<MasterProduct[]> {
  return PRODUCTS;
}

export async function getProductBySlug(slug: string): Promise<MasterProduct | null> {
  const product = PRODUCTS.find((p) => p.slug === slug);
  return product || null;
}

export async function getProductsByCategory(categorySlug: string): Promise<MasterProduct[]> {
  return PRODUCTS.filter((p) => {
    if (p.categorySlug === categorySlug) return true;
    if (p.categoryHierarchy && p.categoryHierarchy.some((c) => c.toLowerCase().replace(/[^a-z0-9]+/g, '-').includes(categorySlug))) {
      return true;
    }
    return false;
  });
}

export async function getFeaturedProducts(limit = 8): Promise<MasterProduct[]> {
  return PRODUCTS.slice(0, limit);
}

export async function getCategories(): Promise<TaxonomyCategory[]> {
  return CATEGORIES;
}

export function getCategoryBySlug(slug: string): TaxonomyCategory | null {
  function findCat(cats: TaxonomyCategory[]): TaxonomyCategory | null {
    for (const c of cats) {
      if (c.slug === slug) return c;
      if (c.subcategories) {
        const found = findCat(c.subcategories);
        if (found) return found;
      }
    }
    return null;
  }
  return findCat(CATEGORIES);
}

export const findCategoryBySlug = getCategoryBySlug;

export async function searchProducts(query: string): Promise<MasterProduct[]> {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return PRODUCTS.filter((p) => {
    return (
      p.title.toLowerCase().includes(q) ||
      p.mpn.toLowerCase().includes(q) ||
      (p.ean && p.ean.toLowerCase().includes(q)) ||
      p.brand.toLowerCase().includes(q)
    );
  });
}

export async function getImporter() {
  return {
    getRepository() {
      return {
        async getStats() {
          return {
            totalProducts: PRODUCTS.length,
            inStockProducts: PRODUCTS.filter((p) => p.isInStock).length,
            totalMasterProducts: PRODUCTS.length,
            activeCount: PRODUCTS.filter((p) => p.status === 'ACTIVE').length,
            needsReviewCount: 0,
            autoApprovedCount: PRODUCTS.length,
            quarantinedCount: 0,
            averageQualityScore: 92,
            brandCount: Array.from(new Set(PRODUCTS.map((p) => p.brand))).length,
          };
        },
        async getAllProducts() {
          return PRODUCTS;
        },
        async getQuarantineRecords(): Promise<QuarantineRecord[]> {
          return [];
        },
        async getImportRuns(): Promise<ImportRunSummary[]> {
          return [
            {
              id: 'run-live-ed-1',
              startedAt: new Date().toISOString(),
              completedAt: new Date().toISOString(),
              totalProcessed: 122145,
              createdCount: PRODUCTS.length,
              updatedCount: 0,
              quarantinedCount: 0,
              autoApprovedCount: PRODUCTS.length,
              needsReviewCount: 0,
              status: 'COMPLETED' as const,
              durationMs: 4200,
            },
          ];
        },
      };
    },
  };
}

