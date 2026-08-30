import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Reklamačný poriadok a záruka | Worlds.sk',
  description: 'Kompletný reklamačný poriadok, záručné lehoty a postup vybavenia reklamácie na Worlds.sk.',
};

export default function ReklamacnyPoriadokPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-blue-600 flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Späť na domov
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-medium">Reklamačný poriadok</span>
      </nav>

      <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 shadow-sm space-y-8 text-slate-700 leading-relaxed text-sm">
        <div className="border-b border-slate-200 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-800 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldAlert className="w-3.5 h-3.5" /> Servis a reklamácie
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Reklamačný poriadok a záručné podmienky</h1>
          <p className="text-slate-500 text-sm mt-2">Platné pravidlá pre uplatňovanie záruky na tovar</p>
        </div>

        <div dangerouslySetInnerHTML={{ __html: `<div className="page-title">
<h1>REKLAMAČNÉ PODMIENKY</h1>
</div>
<p><strong>ZÁRUKA A REKLAMAČNÝ PORIADOK</strong></p>
<p><strong> Záručná doba</strong></p>
<p><strong>1.</strong> Predávajúci poskytuje na Tovar <strong>záruku v trvaní dvadsaťštyri (24) mesiacov.</strong> Záručná doba podľa predchádzajúcej vety sa nevzťahuje na Tovar, ktorý je určený na rýchle spotrebovanie, alebo ktorého povaha ho neumožňuje dlhšie užívať alebo uchovávať. Predávajúci je oprávnený záručnú dobu predlžiť, pričom podmienky a rozsah takto predĺženej záruky určí v záručnom liste. V prípade použitej veci je záručná doba dvanásť (12) mesiacov.</p>
<p>V prípade, ak má Predávajúci vedomosť o existencii a podrobnostiach záruky poskytovaných výrobcom alebo Predávajúci podľa prísnejších zásad ako ustanovuje OZ, ak ju výrobca alebo Predávajúci poskytuje, alebo ak Predávajúci takúto prísnejšiu záruku poskytuje sám, alebo ak má Predávajúci vedomosť o existencii a podmienkach pomoci a službách poskytovaných spotrebiteľom po predaji Tovaru, ak sa takáto pomoc poskytuje zo strany výrobcu, poskytne Predávajúci túto informáciu Zákazníkom v Internetovom obchode buď pri jednotlivých tovarových položkách v rámci ich opisu alebo na Stránke.</p>
<p><strong>2.</strong> Predávajúci vystaví pre Zákazníka záručný list, ak nie je súčasťou originálneho balenia Tovaru.</p>
<p><strong>3.</strong> Záruka začína plynúť od momentu prevzatia Tovaru Zákazníkom. V prípade výmeny Tovaru za nový začína od momentu prevzatia vymeneného nového Tovaru Zákazníkom plynúť nová záručná doba. Ak má kúpenú vec uviesť do prevádzky iný podnikateľ než Predávajúci, začne záručná doba plynúť až odo dňa uvedenia veci do prevádzky, pokiaľ Zákazník objednal uvedenie do prevádzky najneskôr do troch (3) týždňov od prevzatia veci a riadne a včas poskytol na vykonanie služby potrebnú súčinnosť.</p>
<p><strong>4.</strong> Do záručnej doby sa nezapočítava doba vybavovania oprávnene uplatnenej reklamácie od momentu odovzdania Tovaru Predávajúcemu alebo servisu za účelom vybavenia reklamácie a odstránenia reklamovaných chýb Tovaru do momentu, kedy bol Zákazník povinný prevziať Tovar po vybavení reklamácie.</p>
<p><strong>Rozsah záruky a výluky zo záruky:</strong></p>
<p><strong>5.</strong> Práva zo záruky zanikajú, ak nie sú uplatnené v záručnej dobe. Nároky zo záruky musia byť uplatnené bez zbytočného odkladu po vzniku chyby.</p>
<p><strong>6.</strong> Záruka sa nevzťahuje na chyby a poškodenia Tovaru, ktoré vznikli používaním, údržbou alebo opravou Tovaru v rozpore s návodom na použitie, dokumentáciou Tovaru alebo všeobecnými zásadami používania Tovaru, alebo inými neodbornými zásahmi zo strany Zákazníka alebo tretích osôb vrátane neautorizovaných servisov, v dôsledku externého poškodenia Tovaru z akéhokoľvek dôvodu, v dôsledku použitia pirátskeho, neautorizovaného alebo nesprávneho softwaru, počítačovými vírusmi, malwaru, addwaru alebo iných škodlivých programov alebo kódov, v dôsledku použitia neautorizovaného a neoriginálneho spotrebného materiálu, najmä neoriginálnych náplní a papiera do tlačiarní, používaním Tovaru v nevhodných podmienkach a priestoroch, najmä v prípade nevhodnej úrovne teploty, vlhkosti alebo prašnosti alebo nevhodných chemických, fyzikálnych alebo mechanických vplyvov daného prostredia, nadmerným zaťažovaním Tovaru, zanedbaním starostlivosti a údržby Tovaru, zapojením do elektrickej siete, ktorá nezodpovedá norme určenej pre Tovar, alebo v dôsledku Vyššej moci.</p>
<p>Záruka sa takisto nevzťahuje na Tovar, ak bolo jeho výrobné číslo odstránené alebo poškodené alebo má odstránené alebo poškodené plomby, ktoré ho uzavierali. Záruka sa takisto nevzťahuje na Tovar, ktorý bol spotrebovaný, najmä ale nielen software s použitým jednorazovým licenčným klúčom, ktorého registrácia daný Tovar robí pre iného zákazníka neupotrebiteľným, alebo batérie.</p>
<p>Záruka sa takisto nevzťahuje na chyby a poškodenia, ktoré sú dôsledkom oneskoreného uplatnenia záruky na chybu alebo poškodenie, na ktoré sa inak záruka vzťahuje, a včasné uplatnenie záruky by zabránilo rozšíreniu chyby alebo vzniku nových chýb a poškodení.</p>
<p><strong>Poučenie o zodpovednosti za vady podla &sect;622 až 624 OZ:</strong></p>
<p><strong>7.</strong> Ak ide o vadu, ktorú možno odstrániť, má Zákazník právo, aby bola bezplatne, včas a riadne odstránená. Predávajúci je povinný vadu bez zbytočného odkladu odstrániť.</p>
<p>Zákazník môže namiesto odstránenia vady požadovať výmenu Tovaru, alebo ak sa vada týka len súčasti Tovaru, výmenu súčasti, <strong>ak tým Predávajúcemu nevzniknú neprimerané náklady</strong> vzhľadom na cenu Tovaru alebo závažnosť vady.</p>
<p>Predávajúci môže vždy namiesto odstránenia vady vymeniť chybný Tovar za bezchybný, ak to Zákazníkovi nespôsobí závažné ťažkosti.</p>
<p>Ak ide o vadu, ktorú nemožno odstrániť a ktorá bráni tomu, aby sa Tovar mohol riadne užívať ako vec bez vady, má Zákazník právo na výmenu Tovaru alebo má právo od Zmluvy odstúpiť. Tie isté práva prislúchajú Zákazníkovi, ak ide síce o odstrániteľné vady, ak však Zákazník nemôže pre opätovné vyskytnutie sa vady po oprave alebo pre väčší počet vád Tovar riadne užívať.</p>
<p>Ak ide o iné neodstrániteľné vady, má Zákazník právo na primeranú zľavu z Kúpnej ceny Tovaru.</p>
<p>Ak Tovar predávaný za nižšiu cenu alebo použitý Tovar má vadu, za ktorú Predávajúci zodpovedá, má Zákazník namiesto práva na výmenu veci právo na primeranú zľavu.</p>
<p><strong>8.</strong> <strong>Zákazník nie je oprávnený vrátiť Tovar,</strong> ktorý spotreboval, poškodil alebo iným spôsobom znemožnil jeho ďalšie užívanie, alebo ide o počítačový program, audiovizuálne dielo, zvukový záznam alebo zvukovo-obrazový záznam umeleckého výkonu alebo multimediálne dielo, ktoré Zákazník rozbalil, ktorý nie je možné vzhľadom na jeho vlastnosti vrátiť, ktorý podlieha rýchlej skaze, alebo ktorý bol pre Zákazníka vytvorený podľa jeho požiadaviek alebo je určený len pre daného jedného Zákazníka.</p>
<p><strong>Spôsob uplatňovania reklamácie:</strong></p>
<p><strong>9.</strong> Zákazník si uplatňuje právo na opravu Tovaru v mieste sídla Predávajúceho alebo v autorizovanom servisnom stredisku. Zoznam autorizovaných servisných stredísk je zverejnený na Stránke alebo <strong>bude zákazníkovi poskytnutý pri uplatňovaní reklamácie.</strong> Ostatné nároky zo záruky musia byť uplatnené v mieste sídla Predávajúceho.</p>
<p><strong>10.</strong> Zákazník je pri reklamácii Tovaru povinný predložiť Tovar, doklad o kúpe Tovaru, záručný list a ostatné príslušenstvo a dokumentáciu k Tovaru, ktoré boli Zákazníkovi s Tovarom dodané.</p>
<p><strong>11.</strong> Predávajúci vystaví Zákazníkovi potvrdenie o uplatnení záruky a reklamácii Tovaru. V prípade, ak je Tovar reklamovaný prostredníctvom prostriedkov diaľkovej komunikácie, Predávajúci je povinný doručit Zákazníkovi potvrdenie o uplatnení záruky a reklamácii Tovaru najneskôr s dokladom o vybavení reklamácie.</p>
<p><strong>Spôsob a lehoty vybavenia reklamácie:</strong></p>
<p><strong>12.</strong> Spôsoby vybavenia reklamácie upravujú príslušné ustanovenia OZ a &sect;18 Zákona o ochrane spotrebiteľa.</p>
<p><strong>13.</strong> Doba vybavenia reklamácie závisí od zložitosti prípadu. Jednoduché prípady sú podľa prevádzkových možností Predávajúceho alebo autorizovaného servisného strediska vybavované okamžite, zložitejšie prípady do siedmich (7) dní od uplatnenia reklamácie a odôvodnené zložité prípady do tridsiatich (30) dní od uplatnenia reklamácie. V prípade, ak nie je reklamácia vybavená do tridsiatich (30) dní od uplatnenia reklamácie, je Zákazník oprávnený odstúpiť od Zmluvy alebo má právo na výmenu Tovaru za nový.</p>
<p><strong>14.</strong> Predávajúci alebo autorizované servisné stredisko bezodkladne po vybavení reklamácie oznámi výsledok vybavenia reklamácie Zákazníkovi prostredníctvom elektronickej pošty alebo iným vhodným spôsobom a vydá Zákazníkovi doklad o vybavení reklamácie do tridsiatich (30) dní od uplatnenia reklamácie.</p>
<p><strong>15.</strong> Zákazník je povinný pri preberaní Tovaru po vybavení reklamácie predložiť Predávajúcemu potvrdenie o uplatnení záruky a reklamácii Tovaru a doklad totožnosti. Ak má Zákazník splnomocnenca, je splnomocnenec povinný okrem dokladov podľa predchádzajúcej vety predložiť aj písomné splnomocnenie udelené a podpísané Zákazníkom.</p>
<p><strong>16.</strong> V prípade, ak si Zákazník neprevezme Tovar do tridsiatich (30) dní od oznámenia výsledku reklamácie, je povinný nahradiť Predávajúcemu náklady na uskladnenie Tovaru vo výške 1,00 EUR za každý deň omeškania s prevzatím reklamovaného Tovaru. Ak je omeškanie s prevzatím reklamovaného Tovaru dlhšie ako šesť (6) mesiacov od oznámenia výsledku reklamácie, je Predávajúci oprávnený predať Tovar tretej osobe, pričom výťažok z predaja po odrátaní nákladov na uskladnenie, uchovanie, údržbu a predaj Tovaru vydá Zákazníkovi alebo na jeho náklady, ktoré si môže odrátať z výťažku zo speňaženia Tovaru, uloží do úschovy.</p>` }} />
      </div>
    </div>
  );
}
