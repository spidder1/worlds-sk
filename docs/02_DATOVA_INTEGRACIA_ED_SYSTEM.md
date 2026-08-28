# 2. Dátová integrácia: eD system a. s. (E LINKX)

Tento dokument slúži ako technický aj praktický sprievodca integráciou so SOAP/XML webovou službou distribútora **eD system a. s. (E LINKX)**.

---

## 2.1. Čo je to SOAP Web Service a ako prebieha komunikácia? (Pre nováčika)

Predstavte si, že eD system má veľký centrálny sklad a server, na ktorom beží program. Náš e-shop sa s týmto programom rozpráva cez internet pomocou špeciálnych štandardizovaných správ (formát **XML** obalený v obálke **SOAP**).

1. Náš server pošle otázku: *"Prosím ťa, daj mi odkaz na stiahnutie dnešného kompletného katalógu produktov."*
2. Server eD system overí prihlasovacie meno a heslo.
3. Odpovie: *"Tu je URL adresa, z ktorej si môžeš stiahnuť zabalený ZIP archív so všetkými produktmi."*
4. Náš server súbor stiahne, rozbalí, prečíta a naplní databázu.

---

## 2.2. Prehľad endpointov a autentifikácia

Webová služba je dostupná na adrese:
- **Slovenská lokalizácia (produkcia):** `https://private-ws-sk.elinkx.biz/service.asmx`
- **WSDL definícia:** `https://private-ws-sk.elinkx.biz/service.asmx?WSDL`

### Autentifikácia
Každé volanie metódy vyžaduje dva základné parametre:
- `login` – prihlasovacie meno vytvorené v administrácii eDshopu (označené ako "API účet")
- `password` – heslo nastavené k tomuto API účtu

---

## 2.3. Kľúčové metódy a ich účel

### 1. Sťahovanie katalógu: `getProductCatalogueFullDownloadZIPv1`
- **Účel**: Poskytne URL na stiahnutie kompletného katalógu produktov vo formáte ZIP.
- **Frekvencia volania**: 1x až 2x denne (napr. o 06:00 a 20:00).
- **Čo obsahuje**: Všetky produkty, názvy, kódy, PartNumber (MPN), EAN, nákupné ceny, odporúčané koncové ceny, poplatky (SNC, AO), záruky, obrázky, textové popisy a navigátorské atribúty.
- **Parametre**:
  - `login`, `password`
  - `onStock`: `false` (chceme všetky produkty) alebo `true` (iba skladom)
  - `Comodities`: voliteľný filter komodít (napr. "NB;CPU;LCD")
  - `ComoditiesTree`: voliteľný filter pre celý podstrom
  - `Producers`: voliteľný filter výrobcov (napr. "ASUS;LENOVO")
  - `Categories`: voliteľný filter kategórií

### 2. Rýchla aktualizácia skladu a cien: `getProductCatalogueStockDownloadXML`
- **Účel**: Poskytuje bleskový XML súbor so stavom zásob a aktuálnymi nákupnými cenami.
- **Frekvencia volania**: Každú hodinu (12x denne).
- **Čo obsahuje**: Kód produktu (`Code`), systémové ID (`ProId`), počet kusov na sklade (`OnStockCount`), dátum dostupnosti (`DateAvailible`), cenu (`YourPrice`, `YourPriceWithFees`) a poplatky.

### 3. Parametrický navigátor: `getNavigator` / `getProductCategoryList`
- **Účel**: Poskytuje strom superkategórií, kategórií a priradených technických parametrov (napr. Uhlopriečka, Socket, Frekvencia, Typ pamäte).
- **Využitie**: Napĺňa našu riadenú taxonómiu a filtruje produkty v bočnom paneli.

### 4. Dropshippingová objednávka zákazníka: `createNewOrderCustomer`
- **Účel**: Umožňuje priamo z nášho e-shopu vytvoriť objednávku, ktorú eD system zabalí v sklade a odošle kuriérom PPL / DPD koncovému zákazníkovi na Slovensku.
- **Parametre**:
  - Položky objednávky (`NewOrderCustomerItems`) – kód produktu, počet kusov, koncová cena s DPH a sadzba DPH.
  - Dopravná položka – položka s kódom `ProductCode: "TRA"` reprezentujúca kuriéra.
  - Doručovacia adresa zákazníka (`ShippingAddress` – meno, ulica, mesto, PSČ, krajina SK/CZ).
  - Identifikátor objednávky (`OrderSymbolCustomer`) a číslo faktury (`custumerInvoiceCode`).
  - Kontakt na zákazníka (`email`, `telephone`) pre notifikácie kuriéra.
  - Kód dopravcu (`TransportCode` napr. 176 pre DPD/PPL B2C).

---

## 2.4. Ukážka implementácie v TypeScript (`@worlds/ed-client`)

Klient je implementovaný s dôrazom na typovú bezpečnosť a asynchrónne volania:

```typescript
import { EDSystemClient } from '@worlds/ed-client';

const client = new EDSystemClient({
  login: process.env.ED_LOGIN || 'test_login',
  password: process.env.ED_PASSWORD || 'test_password',
  endpointUrl: 'https://private-ws-sk.elinkx.biz/service.asmx',
});

// 1. Získanie odkazu na katalóg
const catalogStatus = await client.getProductCatalogueFullDownloadZIPv1({
  onStock: false,
});

if (catalogStatus.IsReady && catalogStatus.Url) {
  console.log(`Katalóg je pripravený na adrese: ${catalogStatus.Url}`);
}

// 2. Vytvorenie testovacej dropship objednávky
const orderResult = await client.createNewOrderCustomer({
  NewOrderCustomerItems: [
    { ProductCode: 'ASU-NB-EXP15', Qty: 1, Price: 574.17, PriceVat: 689.0, VatRate: 1.20 },
    { ProductCode: 'TRA', Qty: 1, Price: 4.08, PriceVat: 4.90, VatRate: 1.20 }
  ],
  ShippingAddress: {
    name: 'Ján Novák',
    street: 'Hlavná 123',
    city: 'Bratislava',
    zipCode: '81101',
    countryCode: 'SK',
  },
  customerName: 'Ján Novák',
  email: 'jan.novak@example.sk',
  telephone: '+421905123456',
  OrderSymbolCustomer: 'WORLDS-100234',
  custumerInvoiceCode: 'FA-2026-001',
  price: 578.25,
  priceVat: 693.90,
  TransportCode: 176,
}, true); // true = test mode
```
