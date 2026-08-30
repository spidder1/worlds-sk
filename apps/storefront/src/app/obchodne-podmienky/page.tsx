'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, Users, Building2, ShieldCheck } from 'lucide-react';

export default function ObchodnePodmienkyPage() {
  const [activeTab, setActiveTab] = useState<'b2c' | 'b2b'>('b2c');

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-blue-600 flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Späť na domov
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-medium">Obchodné podmienky</span>
      </nav>

      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-10 shadow-sm mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
          <FileText className="w-3.5 h-3.5" /> Právne dokumenty Worlds.sk
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">Všeobecné obchodné podmienky (VOP)</h1>
        <p className="text-slate-600 text-sm mt-2">
          Kompletné znenie obchodných podmienok prevádzkovateľa <strong>ETHOS Technology, s. r. o.</strong> pre nákup na Worlds.sk.
        </p>

        {/* Prepínač Spotrebiteľ vs Podnikateľ */}
        <div className="flex gap-3 mt-6 border-b border-slate-200 pb-4">
          <button
            onClick={() => setActiveTab('b2c')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === 'b2c'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            Pre fyzické osoby (Spotrebitelia)
          </button>
          <button
            onClick={() => setActiveTab('b2b')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === 'b2b'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Building2 className="w-4 h-4" />
            Pre podnikateľov (B2B firmy)
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 shadow-sm space-y-6 text-slate-700 leading-relaxed prose max-w-none text-sm">
        {activeTab === 'b2c' ? (
          <div>
            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-200 text-xs text-blue-900 mb-6 font-medium">
              Tieto obchodné podmienky upravujú vzťah medzi predávajúcim a kupujúcim – spotrebiteľom v zmysle zákona o ochrane spotrebiteľa.
            </div>
            <div dangerouslySetInnerHTML={{ __html: `<div className="page-title">
<h1>VŠEOBECNÉ OBCHODNÉ PODMIENKY PRE FYZICKÉ OSOBY - SPOTREBITEĽOV</h1>
</div>
<ul className="disc">
<li><a href="#answer1">IDENTIFIKAČNÉ A KONTAKTNÉ ÚDAJE SPOLOČNOSTI</a></li>
<li><a href="#answer2">ÚVODNÉ USTANOVENIA</a></li>
<li><a href="#answer3">VYMEDZENIE POJMOV</a></li>
<li><a href="#answer4">POSTUP VYTVÁRANIA OBJEDNÁVKY A UZAVRETIA ZMLUVY</a></li>
<li><a href="#answer5">STORNO OBJEDNÁVKY</a></li>
<li><a href="#answer6">CENA TOVARU</a></li>
<li><a href="#answer7">PLATOBNÉ PODMIENKY</a></li>
<li><a href="#answer8">POPLATKY ZA PREPRAVU, BALNÉ A DODACIE PODMIENKY</a></li>
<li><a href="#answer9">VÝHRADA VLASTNÍCTVA</a></li>
<li><a href="#answer10">ODSTÚPENIE OD ZMLUVY</a></li>
<li><a href="#answer11">REKLAMAČNÝ PORIADOK A ZÁRUČNÉ PODMIENKY</a></li>
<li><a href="#answer12">INFORMÁCIA O ALTERNATÍVNOM RIEŠENÍ SPOROV</a></li>
<li><a href="#answer13">INFORMÁCIA O POSTUPOCH UPLATŇOVANIA SŤAŽNOSTÍ A PODNETOV SPOTREBITEĽOV</a></li>
<li><a href="#answer14">OCHRANA OSOBNÝCH ÚDAJOV</a></li>
<li><a href="#answer15">ZÁVEREČNÉ USTANOVENIE</a></li>
<li><a href="#answer16">PRÍLOHY</a></li>
</ul>
<p><strong>Článok 1</strong></p>
<dl><dt id="answer1"></dt><dd>
<p><strong>IDENTIFIKAČNÉ A KONTAKTNÉ ÚDAJE SPOLOČNOSTI</strong></p>
<p><strong>1.1 Predávajúci:</strong><br />Obchodné meno: <strong>ETHOS Technology, s.r.o.</strong><br />Právna forma: Spoločnosť s ručením obmedzením<br />Sídlo: Tatranská 6396/101, Banská Bystrica PSČ: 974 11<br />IČO: 44 099 207<br />DIČ: 2022595311<br />IČ DPH: SK2022595311<br />Zapísaná v: Obchodnom registri Okresného súdu Banská Bystrica, Oddiel: Sro, Vložka č.: 14726/S<br />Zastúpená: Konateľom PhDr. Ivan Fencl<br /><strong>( Ďalej ako predávajúci )</strong></p>
<p><strong>Prevádzkareň ( Predajňa ): Nie je.</strong></p>
<p><strong>Pracovná doba</strong><br />Pondelok - Piatok 07,00 - 17,00<br />Sobota 07,00 - 13,00<br />Objednávky vytvorené prostredníctvom elektronického systému E - Shop sú prijímané a spracovávané <strong>Nepretržite</strong></p>
<p><strong>1.2 Kontaktné údaje:</strong><br />Telefónne číslo: 0907837484<br />E - Mail: <a href="https://web.archive.org/web/20180908030722/mailto:sales@worlds.sk">sales@worlds.sk</a></p>
<p><strong>1.3 Adresa, na ktorej môže kupujúci uplatniť reklamáciu, podať sťažnosť alebo iný podnet:</strong></p>
<p><strong>ETHOS Technology, s.r.o.</strong><br />Tatranská 6396/101, Banská Bystrica PSČ: 974 11<br />Slovenská republika</p>
<p><strong>1.4 Orgán dozoru:</strong><br />Slovenská obchodná inšpekcia (SOI)<br />Inšpektorát SOI pre Banskobystrický kraj<br />Dolná 46,<br />974 00 Banská Bystrica 1<br />Odbor výkonu dozoru<br />Telefónne číslo: 048/412 49 69, 048/415 18 71, 048/415 18 73<br />FAX: 048/412 46 93</p>
</dd><dt></dt></dl>
<p><strong>Článok 2</strong></p>
<dl><dt id="answer2"></dt><dd>
<p><strong>ÚVODNÉ USTANOVENIA</strong></p>
<p><strong>2.1</strong> Účelom týchto Všeobecných obchodných podmienok ( ďalej len "VOP" ) je jasne a zrozumiteľne informovať kupujúceho a poskytnúť mu všetky potrebné informácie pred uzavretím zmluvného vzťahu a zároveň ho poučiť o práve na Odstúpenie od zmluvy a o Reklamačnom poriadku.</p>
<p><strong>2.2</strong> VOP upravujú práva a povinnosti účastníkov zmluvy uzavretej na diaľku alebo zmluvy uzavretej mimo prevádzkových priestorov predávajúceho prostredníctvom elektronického obchodu <strong><a href="https://web.archive.org/web/20180908030722/https://worlds.sk/" target="_blank">WORLD'S</a></strong></p>
<p><strong>2.3</strong> V prípade uzatvorenia spotrebiteľskej zmluvy v zmysle ustanovenia &sect; 52 a nasl. Občianskeho zákonníka, uzavretej pri použití komunikačných prostriedkov na diaľku, sa zmluvný vzťah medzi kupujúcim a predávajúcim riadi predovšetkým v zmysle zákona č. 102/2014 Z. z. o ochrane spotrebiteľa pri predaji tovaru alebo poskytovaní služieb na základe zmluvy uzavretej na diaľku alebo zmluvy uzavretej mimo prevádzkových priestorov predávajúceho a o zmene a doplnení niektorých zákonov, Občianskym zákonníkom a zákonom č. 250/2007 Z. z. o ochrane spotrebiteľa a o zmene zákona Slovenskej národnej rady č. 372/1990 Zb. o priestupkoch v znení neskorších predpisov.</p>
</dd><dt></dt></dl>
<p><strong>Článok 3</strong></p>
<dl><dt id="answer3"></dt><dd>
<p><strong>VYMEDZENIE POJMOV</strong></p>
<p><strong>3.1</strong> <strong>Prevádzkovateľom</strong> elektronického/internetového obchodu ( E - Shopu ) je obchodná spoločnosť <strong>ETHOS Technology, s.r.o.</strong> so sídlom:<br />Tatranská 6396/101, Banská Bystrica, PSČ: 974 11, IČO: 44 099 207.</p>
<p><strong>3.2</strong> <strong>Predávajúcim</strong> je tiež obchodná spoločnosť <strong>ETHOS Technology, s.r.o.</strong> so sídlom: Tatranská 6396/101, Banská Bystrica, PSČ: 974 11, IČO: 44 099 207.</p>
<p><strong>3.3</strong> <strong>Kupujúcim ( Objednávateľom )</strong> sa rozumie spotrebiteľ - fyzická osoba nepodnikateľ, ktorá odoslala elektronickú objednávku, spracovanú prostredníctvom elektronického systému obchodu <strong><a href="https://web.archive.org/web/20180908030722/https://worlds.sk/" target="_blank">WORLD'S</a></strong> a ktorej kúpený tovar alebo poskytnuté služby neslúžia na výkon zamestnania, povolania alebo ktorá nekoná v rámci predmetu svojej obchodnej činnosti alebo inej podnikateľskej činnosti.</p>
<p><strong>3.4</strong> <strong>Elektronickou objednávkou</strong> sa rozumie odoslaný elektronický formulár, obsahujúci informácie o kupujúcom, zoznam objednaného tovaru alebo služby z ponuky elektronického obchodu a cenu tohto tovaru, spracovaný elektronickým systémom obchodu.</p>
<p><strong>3.5</strong> <strong>Zmluvou uzavretou na diaľku</strong> sa rozumie zmluva medzi predávajúcim a kupujúcim dohodnutá a uzavretá výlučne prostredníctvom prostriedku diaľkovej komunikácie bez súčasnej fyzickej prítomnosti predávajúceho a kupujúceho s využitím webového sídla, elektronickej pošty alebo telefónu.</p>
<p><strong>3.6</strong> <strong>Zmluvou, predmetom ktorej je predaj tovaru</strong> sa na účely týchto VOP rozumie zmluva, na základe ktorej kupujúci nadobúda vec za odplatu, najmä kúpna zmluva alebo licenčná zmluva predmetom, ktorej je prevod softvérovej licencie, prípadne zmluva o zhotovení veci na zákazku.</p>
</dd><dt></dt></dl>
<p><strong>Článok 4</strong></p>
<dl><dt id="answer4"></dt><dd>
<p><strong>POSTUP VYTVÁRANIA OBJEDNÁVKY A UZAVRETIA ZMLUVY</strong></p>
<p><strong>4.1</strong> Kupujúci si môže cez E - Shop objednať akýkoľvek tovar, pri ktorom je umiestnené tlačidlo <strong>VLOŹIŤ DO KOŠÍKA</strong>. V nákupnom košíku má kupujúci možnosť prezrieť si stručný prehľad označeného tovaru, jeho množstva a ceny a prípadne aktualizovať množstvo tovaru v Nákupnom košíku, tiež vymazať jednotlivé produkty alebo celý Nákupný košík a objednať iný tovar. V <strong>prípade,</strong> že proces výberu tovaru kupujúci ukončil, klikne na tlačidlo <strong>PREJSŤ K POKLADNI.</strong> Inak je oprávnený vrátiť sa k procesu výberu tovarov kliknutím na tlačidlo <strong>POKRAČOVAŤ V NÁKUPE.</strong><br />Pokiaľ je u tovaru uvedené, že <strong>Nie je skladom,</strong> bude Zákazník informovaný o termíne Dostupnosti a Dodania tovaru. Všeobecne platí, že tovar, ktorý nie je skladom, ale je uvedený na stránkach E - Shopu World's je z našej strany Dodateľný. <strong>Ešte pred platbou odporúčame sa však radšej informovať vopred o dostupnosti a lehote dodania tovaru.</strong></p>
<p><strong>4.2</strong> Ďalším krokom pri objednávaní tovaru je <strong>PRIHLÁSENIE SA</strong> registrovaného kupujúceho zadaním jeho E - Mailovej adresy a Hesla. V prípade, že kupujúci nie je registrovaný v systéme E-Shopu, bude mu umožnené vytvoriť si Nový zákaznícky účet kliknutím na možnosť <strong>Registrácia</strong> a vyplnením formuláru v časti <strong>Informácie o fakturácii</strong> poskytnutím svojich osobných údajov v rozsahu: Meno, Priezvisko, adresa dodania tovaru, E - Mailová adresa, telefonický kontakt, heslo, ktoré potvrdí tlačidlom <strong>REGISTROVAŤ</strong>.<br /> Súčasťou tohto kroku je povinné zaškrtnutie políčka, tzv. <strong>checkboxu,</strong> kde kupujúci vyjadruje svoj Súhlas so spracúvaním osobných údajov za účelom registrácie.<br /> Z dôvodu bezpečnosti pre registráciu zákazníka a objednanie tovaru zákazníkom, po Registrácii zákazníka, príde Zákazníkovi na E - Mail, ktorý uviedol pri Registrácii, <strong>E - Mail s odkazom na Potvrdenie účtu.</strong> Po kliknutí na tlačidlo <strong>Potvrdiť účet</strong> v E - Maile, bude automaticky presmerovaný na Platobnú stránku, kde môže dokončiť svoj nákup. Uvedené pravidlo je zavedené pre väčšiu bezpečnosť Zákazníka.<br /><strong>Zákazník môže svoj nákup v tomto kroku uskutočniť aj bez Registrácie v E - Shope World's, vybraním spôsobu objednania a zaplatenia tovaru Ako Hosť.</strong> Následne zadá svoje údaje v rozsahu: Meno, Priezvisko, adresa dodania tovaru, E - Mailová adresa, telefonický kontakt, heslo, ktoré sú nevyhnutné pre evidenciu Objednávky v systéme obchodu Word's a pre správne doručenie tovaru.<br /> <strong>Zákazník sa môže Registrovať v obchode Word's aj bez uvedenia svojej Adresy kliknutím na stránke vpravo hore na Prihlásiť alebo Odhlásiť, prípadne na Môj účet, stačí ak použije svoje Meno, Priezvisko a svoj E - Mail a nákup uskutočniť neskôr.</strong><br /> Súčasťou tohto kroku Registrácie je povinné zaškrtnutie políčka, tzv. <strong>checkboxu,</strong> kde kupujúci vyjadruje svoj Súhlas so spracúvaním osobných údajov za účelom registrácie.<br /> Takisto tu má kupujúci možnosť zaškrtnutím nepovinného políčka, tzv. <strong>checkboxu,</strong> prihlásiť sa na odber Spravodaja. <strong>Odoberanie alebo zrušenie odoberania Spravodaja môže zákazník kedykoľvek Eitovať, stačí ak sa prihlási do svojho účtu a v Menu Spravodaj, začiarkne alebo zruší začiarknutie políčka Prihlásiť sa alebo zrušiť odoberanie Spravodaja. O prihlásení alebo zrušení odoberania Spravodaja bude zákazník vždy upovedomený elektronicky na E - mail, ktorý uviedol pri Registrácii.</strong><br /> Z dôvodu bezpečnosti pre registráciu zákazníka a objednanie tovaru zákazníkom, po Registrácii zákazníka, aj v prípade pokiaľ ešte neuskutoční svoj nákup, príde Zákazníkovi na E - Mail, ktorý uviedol pri Registrácii, <strong>E - Mail s odkazom na Potvrdenie účtu.</strong> Po kliknutí na tlačidlo <strong>Potvrdiť účet</strong> v E - Maile, bude automaticky presmerovaný do svojho účtu.</p>
<p><strong>4.3</strong> Krok <strong>DODACIA ADRESA</strong> slúži na to, aby kupujúci určil adresu pre doručenie tovaru. Zákazník si môže dať doručiť tovar na Adresu, ktorú vyplnil pri Registrácii, ale môže si dať doručiť tovar aj na inú Adresu vybraním možnosti v tomto kroku <strong>Doručiť na inú adresu.</strong> Dodacie adresy si Zákazník môže pridávať v procese Objednávania tovaru, alebo priamo vo svojom Účte. Platí pravidlo, že Fakturačná adresa je vždy len jedna.</p>
<p><strong>4.4</strong> Krok <strong>SPÔSOB DOPRAVY</strong> slúži na to, aby si kupujúci zvolil spôsob doručenia tovaru v súlade s <strong>bodom 8</strong> týchto VOP. Naša spoločnosť využíva služby dopravných spoločností najmä SPS - UPS, DPD, Geis, GLS, prípadne iných. Kupujúci v tomto kroku má možnosť vybrať si spôsob dopravy Kuriér, alebo Osobné prevzatie po dohode s Dodávateľom. Pri výbere kupujúceho Spôsob dopravy - Osobné prevzatie, vzhľadom k tomu, že naša spoločnosť zatiaľ nemá vlastné priestory, kupujúci má možnosť sa s Dodávateľom dohodnúť na mieste a spôsobe prevzatia tovaru. Toto však platí len v rámci Banskej Bystrice, pričom kupujúci má právo požiadať Dodávateľa o bezplatné doručenie tovaru v meste Banská Bystrica a za tovar vykonáva Platbu pri prevzatí. Na konci Platobného procesu stačí uviesť do poznámky potrebné informácie, v ktorý deň a na ktoré miesto žiada doručiť tovar. Takisto tu má možnosť uviesť do Poznámky ďalšie svoje požiadavky, ktoré súvisia s nákupom tovaru, jeho zaplatením a doručením.</p>
<p><strong>4.5</strong> Krok <strong>INFORMÁCIE O PLATBE</strong> slúži na to, aby si kupujúci zvolil spôsob platby za tovar v súlade s <strong>bodom 7</strong> týchto VOP.</p>
<p><strong>4.6</strong> Pre odoslanie záväznej objednávky je potrebné, aby kupujúci stlačil tlačidlo s názvom <strong>OBJEDNÁVKA S POVINNOSŤOU PLATBY</strong> čím kupujúci výslovne potvrdzuje, že bol oboznámený, že súčasťou objednávky je povinnosť zaplatiť cenu, ako aj to, že bol oboznámený so Všeobecnými obchodnými podmienkami. Súčasťou tohto kroku je možnosť kupujúceho dôkladne sa oboznámiť so Všeobecnými obchodnými podmienkami predávajúceho, prostredníctvom ktorých predávajúci ešte pred uzavretím zmluvy informuje kupujúceho o podmienkach zmluvy na diaľku a oznamuje mu všetky potrebné a zákonom vyžadované informácie.<br /> Pred odoslaním formulára bude kupujúci informovaný aj o spracúvaní jeho osobných údajov. Text nad políčkom: Odoslaním formulára som si vedomý/á, že spoločnosť ETHOS Technology, s.r.o. bude spracúvať moje osobné údaje uvedené v tomto formulári za účelom predaja tovaru, vyhotovenia faktúry, dodania tovaru, resp. prípadnej reklamácie/súdneho sporu. So svojimi právami som sa oboznámil v sekcii <strong>Ochrana osobných údajov.</strong> Následne kupujúci zaškrtne <strong>políčko Oboznámil som sa s obchodnými podmienkami vrátane ochrany osobných údajov.</strong><br /> Zákazník tu má možnosť uviesť do Poznámky ďalšie svoje požiadavky, ktoré súvisia s nákupom tovaru, jeho zaplatením a doručením.</p>
<p><strong>4.7</strong> Predávajúci následne zašle kupujúcemu na jeho e-mailovú adresu <strong>Záväzné potvrdenie objednávky, ktoré slúži ako potvrdenie o uzavretí zmluvy,</strong> prílohou ktorého budú VOP a formulár pre Odstúpenie od zmluvy.</p>
<p><strong>4.8</strong> Všetky prijaté objednávky sú považované za návrh zmluvy. <strong>Zmluva, predmetom ktorej je predaj tovaru, vzniká až na základe záväzného potvrdenia objednávky zo strany predávajúceho, ktoré bude zaslané kupujúcemu na ním uvedenú E - Mailovú adresu.</strong></p>
<p><strong>4.9</strong> Zmena obsahu objednávky sa považuje za nový návrh zmluvy a zmluva vzniká až novým záväzným elektronickým potvrdením objednávky predávajúcim.</p>
<p><strong>4.10</strong> Z uvedenej zmluvy vznikne predávajúcemu povinnosť dohodnutý tovar alebo službu kupujúcemu riadne a včas dodať a kupujúcemu povinnosť dohodnutý tovar alebo službu prevziať a zaplatiť zaň predávajúcemu dohodnutú cenu.</p>
<p><strong>4.11</strong> Podmienkou platnosti objednávky je pravdivé a úplné vyplnenie všetkých, registračným formulárom požadovaných údajov a náležitostí, vrátane telefonického kontaktu <strong>plnoletou osobou spôsobilou na dané právne úkony.</strong></p>
</dd><dt></dt></dl>
<p><strong>Článok 5</strong></p>
<dl><dt id="answer5"></dt><dd>
<p><strong>STORNO OBJEDNÁVKY</strong></p>
<p><strong>5.1</strong> <strong>Storno Objednávky zo strany Kupujúceho</strong></p>
<p><strong>5.1.1</strong> Kupujúci má právo stornovať objednávku bez udania dôvodu kedykoľvek pred jej záväzným potvrdením predávajúcim.</p>
<p><strong>5.1.2</strong> Pre všetky ostatné prípady stornovania už potvrdenej objednávky platí, že kupujúci je povinný uhradiť predávajúcemu škodu vzniknutú takýmto konaním. Predávajúci uplatní právo na náhradu škody predovšetkým v prípade nákupu tovaru <strong>Na zákazku</strong> ktorý bolo nutné zhotoviť podľa osobitných požiadaviek kupujúceho alebo tovaru určeného osobitne pre jedného kupujúceho alebo v prípade, že v súvislosti so zaistením tovaru došlo už k vynaloženiu preukázateľných nákladov.</p>
<p><strong>5.2</strong> <strong>Storno Objednávky zo strany Predávajúceho</strong></p>
<p><strong>5.2.1</strong> Predávajúci si vyhradzuje právo stornovať objednávku alebo jej časť v týchto prípadoch:</p>
<p>a.) v prípade objednávky, ktorú nebolo možné záväzne potvrdiť (chybne uvedené telefónne číslo, nedostupný, neodpovedá na E - Maily atď.),<br /> b.) kľúčový materiál pre zhotovenie tovaru sa už nevyrába alebo nedodáva alebo sa výrazným spôsobom zmenila jeho cena,<br /> c.) v prípade technického zlyhania, poruchy portálu E - Shopu, v prípade zjavnej chyby v písaní a počítaní a inej zrejmej nesprávnosti,<br /> d.) v prípade vypredania zásob.</p>
<p><strong>V prípade, že táto situácia nastane, predávajúci bude okamžite prostredníctvom E - Mailu kontaktovať kupujúceho za účelom dohody o ďalšom postupe.</strong></p>
</dd><dt></dt></dl>
<p><strong>Článok 6</strong></p>
<dl><dt id="answer6"></dt><dd>
<p><strong>CENA TOVARU</strong></p>
<p><strong>6.1</strong> Cena tovaru je konečná, vrátane 20 % DPH, uvádzaná v <strong>mene: EUR.</strong></p>
<p><strong>6.2</strong> <strong>Zľavy, Akcie, Výhody</strong><br /> Zľavy/Akcie/Výhody platia v súlade s ich podmienkami výlučne od a do uvedeného dátumu danej zľavy/akcie/výhody alebo do vypredania zásob. Pokiaľ nie je výslovne uvedené inak platí, že jednotlivé zľavy/akcie/výhody nie je možné vzájomne kombinovať.</p>
<p><strong>6.3</strong> <strong>Darček</strong><br />V prípade, že ste k tovaru dostali darček ( bez akejkoľvek platby, t.j. za 0,- Eur ),prípadná reklamácia sa na darček nevzťahuje. Nie je to predaný tovar. Predávajúci si ohľadom dodania darčeku vyhradzuje právo zmien v baleniach, variantoch a farieb, ako aj právo jeho dodania do vyčerpania zásob.</p>
</dd><dt></dt></dl>
<p><strong>Článok 7</strong></p>
<dl><dt id="answer7"></dt><dd>
<p><strong>PLATOBNÉ PODMIENKY</strong></p>
<p><strong>7.1</strong> Za tovar a služby zakúpené v E - Shope je možné platiť nasledovnými spôsobmi:<br /> a.) platba na Dobierku - platíte priamo kuriérovi pri preberaní tovaru,<br /> b.) platba pri Osobnom prevzatí - platíte priamo zástupcovi Dodávateľa pri prevzatí tovaru v rámci Banskej Bystrice, po dohode s Dodávateľom v ktorý deň a na ktoré miesto si žiadate doručiť zakúpený tovar,<br /> c.) platba prostredníctvom Platobnej brány TrustPay a Platobnej brány PayPal,<br /> d.) platba na základe vystavenej Faktúry na tovar alebo služby predávajúcim.</p>
<p><strong>Platba prostredníctvom Platobnej brány TrustPay</strong></p>
<p>Po presmerovaní na stránku Pokladne si vyberiete či chcete platiť kartou alebo bankovým prevodom.<br /> Pri platbe kartou len zadáte požadované údaje a platba bude prevedená.<br /> Pri platbe bankovým prevodom kliknete na logo banky a následne <strong>budete presmerovaný do Internet Bankingu Vašej banky,</strong> kde postupujete štandardným postupom ako pri bežnom prevode.<br /> Pokiaľ nebudete vidieť logo Vašej banky, vyberiete si banku s názvom <strong>Other bank.</strong><br /> Podrobnosti o platbách a bezpečnosti platieb sú uvedené nižšie.</p>
<p><strong>Platba prostredníctvom Platobnej brány PayPal</strong></p>
<p>Po objednaní produktov v našom obchode kliknete na stránke Pokladne na logo Paypal. Budete presmerovaný na Platobnú bránu PayPal.<br /> Platba cez PayPayl je bezpečná. Nemusíte vôbec zadávať svoje údaje kreditnej alebo debetnej karty a napriek tomu môžete jednoducho a hlavne bezpečne nakúpiť tovar. Stačí, keď sa prihlásite do svojho PayPal účtu a potvrdíte objednanie produktov.<br /> Pokiaľ nemáte PayPal účet, môžete sa zaregistrovať a PayPal účet si vytvoriť, alebo si môžete zvoliť jednorázovú platbu bez registrácie a zadať svoje finančné údaje a platba bude prevedená.<br /> Platba prostredníctvom PayPal je pre Vás bez akýchkoľvek poplatkov. Poplatky hradí obchodník.</p>
<p><strong>TrustPay</strong></p>
<p>TrustPay je Platobná inštitúcia licencovaná a regulovaná Národnou bankou Slovenska. TrustPay je Platobná inštitúcia licencovaná pre cezhraničné prijímanie platieb kartou.<br /> TrustPay je Člen VISA a MasterCard, Účastník SEPA SCT a člen SWIFT. TrustPay ponúka možnosť zúčtovania platieb v nasledovných menách: EUR, USD, GBP, CAD, JPY, CZK, PLN, HUF.<br /> TrustPay podporuje Procesovanie platieb v akejkoľvek mene. TrustPay podporuje 3D Secure bezpečnostnej autentifikácie pre VISA a MasterCard. TrustPay podporuje službu Multicurrency.<br /> TrustPay platobná brána je dostupná v rámci celého Európskeho hospodárskeho priestoru a spĺňa všetky požiadavky PCI DSS level 1 certifikácie, ktorá zabezpečuje najvyššiu úroveň bezpečnosti Vašich dát.</p>
<p><strong>FAQ - Najčastejšie otázky</strong></p>
<p><strong>Zoznam v súčasnosti podporovaných bánk</strong></p>
<p><strong>Slovensko</strong><br />Tatra Banka, Slovenská sporiteľňa, VÚB, ČSOB, FIO banka, Poštová banka, TrustPay, Other Bank.</p>
<p><strong>TrustPay platobná brána &ndash; zákazník/používateľ</strong><br />Musím mať v TrustPay účet?<br />Nie</p>
<p><strong>Ako prostredníctvom TrustPay zaplatím?</strong><br /> Na stránke Obchodníka si vyberiete možnosť platby &ndash; buď kartou alebo prevodom.</p>
<p><strong>Platba kartou</strong><br /> Po presmerovaní na TrustPay bránu len zadáte požadované údaje z karty.</p>
<p><strong>Platba prevodom</strong><br /> Po presmerovaní na TrustPay bránu si vyberiete banku, v ktorej máte vedený účet &ndash; kliknete na logo banky. Vyberiete <strong>Zaplatiť teraz.</strong><br /> Po presmerovaní do Internet Bankingu Vašej banky len pokračujete v potvrdení platby ako pri inom bežnom prevode peňazí.<br /> ( V niektorých bankách nájdete prevodný príkaz už pred vyplnený, niekde bude potrebné, aby ste platobné údaje do príkazu vyplnili. ).</p>
<p><strong>Pri platbe prevodom TrustPay brána nezobrazuje moju banku. Ako mám zaplatiť?</strong><br /> Po presmerovaní na TrustPay bránu si vyberte banku s názvom <strong>Other bank.</strong><br /> TrustPay brána Vám zobrazí platobné inštrukcie. Tieto údaje použijete pri zadávaní prevodu vo Vašej banke. V tomto prípade však platba nemusí byť okamžitá a môže trvať niekoľko dní, kým budú Obchodníkovi peniaze na účet pripísané.</p>
<p><strong>Prečo mám platiť prevodom cez TrustPay?</strong><br /> Prevod cez TrustPay je okamžitý. t.j. Obchodník je v rozmedzí 2 minút až 2 hodín o platbe informovaný a vie Vám zaplatený tovar alebo službu bez odkladu poskytnúť.</p>
<p><strong>V akej mene môžem platiť?</strong><br /> <strong>Platba kartou</strong><br /> Nezáleží v akej mene budete kartou platiť. Obchodníkovi bude platba pripísaná v mene, ktorú má predvolenú.</p>
<p><strong>Platba prevodom</strong><br /> Je potrebné platiť v mene, v ktorej má obchodník stanovené ceny v pokladni. ( Výnimky: Ak obchodník využíva službu Multicurrency, TrustPay brána Vám po zmene výberu krajiny, zobrazí lokálne banky a môžete zaplatiť aj v lokálnej mene. Takýto prevod bude stále okamžitý. ).</p>
<p><strong>Koľko ma to bude stáť, ak zaplatím cez TrustPay?</strong><br /> TrustPay Vám &ndash; platiacemu zákazníkovi &ndash; neúčtuje poplatok, ak platíte prostredníctvom TrustPay brány.</p>
<p><strong>Je bezpečné platiť cez TrustPay?</strong><br /> TrustPay je regulovaný Národnou bankou Slovenska a je členom VISA a Mastercard. Platobné operácie sa odohrávajú na zabezpečených certifikovaných platformách spĺňajúcich tie najvyššie PCI DSS štandardy bezpečnosti.<br /> Pri platbe prevodom sú všetky zadávané citlivé informácie ( prihlasovacie údaje k Vášmu účtu, heslá a pod. ) zadávané a aj samotné potvrdenie platby vykonávate v bezpečnom prostredí Internet Bankingu Vašej banky, nie na TrustPay bráne. Obchodník a ani TrustPay k týmto údajom nemá prístup.<br /> Pri platbe kartou sú citlivé údaje z karty ( číslo karty, CVV kód a dátum expirácie ) po potvrdení platby automaticky zašifrované. Obchodník a ani TrustPay k týmto údajom nemá prístup.</p>
<p><strong>Môžem cez TrustPay platiť kartou?</strong><br /> Áno, stačí, ak vlastníte kartu typu VISA alebo MasterCard.</p>
<p><strong>Môžem cez TrustPay platiť v hotovosti?</strong><br /> Nie.</p>
<p><strong>Môžem cez TrustPay platiť šekovou poukážkou?</strong><br /> Nie. TrustPay nepodporuje platby šekovou poukážkou.</p>
<p><strong>Brána TrustPay &ndash; zákaznícka podpora</strong></p>
<p><strong>Som zákazník a zaplatil som prostredníctvom TrustPay.</strong></p>
<p><strong>Zaplatil som cez TrustPay ale obchodník mi neposkytol tovar/službu.</strong></p>
<p>a.) V prípade, že ste vyplnili všetky údaje vo Vašej platbe, platba bola spracovaná úspešne a obchodník dostal Vaše peniaze. V takomto prípade je potrebné obrátiť sa priamo na obchodníka.<br /> b.) V prípade, že ste zabudli vyplniť niektoré údaje vo Vašej platbe, Vaša platba mohla skončiť v našom systéme ako neidentifikovateľná. Takúto platbu nie je možné manuálne identifikovať. Takéto platby sú preto automaticky vrátené odosielateľovi do 3 pracovných dní ( prosím nezabudnite, že samotná platba môže trvať niekoľko dní ).</p>
<p><strong>Zaplatil som cez TrustPay a chcem svoje peniaze späť.</strong></p>
<p>V prípade, že ste vyplnili všetky údaje Vašej platby, platba bola úspešne spracovaná a obchodník dostal peniaze. V takomto prípade je potrebné obrátiť sa priamo na obchodníka.</p>
<p><strong>PayPal</strong></p>
<p>PayPal môže zákazník už využívať aj v slovenčine a nakupovať tak doma alebo v zahraničí ešte jednoduchšie.<br /> Ak si zákazník vyberie spôsob platby prostredníctvom PayPal, na konci objednávkového procesu po stlačení tlačidla <strong>Objednávka s povinnosťou platby,</strong> bude presmerovaný na bezpečnú stránku Paypal. Pokiaľ nemá účet, vyplní v platobnou formulári požadované údaje a Platba bude prevedená. Pokiaľ zákazník má PayPal účet, prihlási sa zadaním svojho E - Mailu a Hesla a prevedie platbu podľa inštrukcií. Kupujúci ešte pred zaplatením kúpnej ceny, má možnosť sa vrátiť na stránku obchodníka a platba za tovar bude zrušená.<br /> Na zaplatenie kúpnej ceny za tovar prostredníctvom PayPal nemusí zákazník mať svoj Paypal účet. Pokiaľ má svoj PayPal účet, nemusí mať na svojom PayPal účte žiadne finančné prostriedky.<br /> Službu PayPal je možné využiť na bezpečné platenie tovarov a služieb platobnou kartou na internete.<br /> Za tovar zaplatíte jednoducho svojou platobnou kartou, ale číslo Vašej platobnej karty obchodník u ktorého platíte za tovar nebude vidieť. Na serveroch a u obchodníkov sa číslo Vašej platobnej karty neobjaví a obchodník ani tretia strana ho nebude poznať.<br /> Platbu môže kupujúci realizovať prostredníctvom akéhokoľvek mobilného zariadenie, s ktorým sa je možné pripojiť na internet a ktoré má aplikáciu Paypal.<br /> Posielanie platieb cez PayPal je bezpečnejšie než nosenie hotovosti či poskytovanie finančných údajov predajcovi. Každá transakcia spĺňajúca príslušné kritériá je chránená pokročilým šifrovaním a nepretržitým monitorovaním podvodov.</p>
<p><strong>Platenie cez PayPal účet</strong></p>
<p>Platba prebehne tak, že suma bude stiahnutá z vášho bankového konta prostredníctvom platobnej karty ( tak, akoby ste platili kartou v kamennom obchode ). Tak je zaistené, že v podstate zaplatíte platobnou kartou, ale jej číslo nemusíte poskytovať obchodníkovi, na ktorého E - Shope nakupujete.<br /> Peniaze môžete poslať na akýkoľvek PayPal účet, alebo dokonca len na E - Mailovú adresu. Za platby cez PayPal účet neplatíte žiadne poplatky. Poplatky platí príjemca platieb.<br /> Platbu môže kupujúci realizovať aj v inej mene, tu si však môže spoločnosť PayPal účtovať poplatok za prepočet Meny.</p>
<p>PayPal kupujúcemu neúčtuje žiadne skryté poplatky, ani poplatky za spracovanie platby.<br /> Za hlavnú výhodu tejto služby možno označiť to, že pokiaľ kupujúci má svoj PayPal účet, pri platení cez internet nemusí používať osobné údaje z debetnej, alebo kreditnej karty. Stačí poznať svoju E - Mailovú adresu a Heslo. Kupujúci si nemusí pamätať čísla svojich platobných kariet ani tajné kódy. Znamená to, že obchodovanie cez systém PayPal je úplne anonymné.<br /> Kupujúci príjemcovi neposkytuje svoje finančné údaje. Všetky osobné údaje má k dispozícií iba spoločnosť PayPal a žiadnym tretím stranám ich neposkytuje. Celý systém je prepojený len pomocou E-mailových adries, ktoré vystupujú pri transakciách ako jediné identifikačné údaje.<br /> Zo všetkými ďalšími informáciami platbách prostredníctvom PayPal, sa kupujúci môže oboznámiť na stránke <strong><a href="https://web.archive.org/web/20180908030722/https://www.paypal.com/sk/home" target="_blank">PAYPAL</a></strong></p>
<p><strong>7.2</strong> Doplatky pre jednotlivé možnosti platieb sú uvedené v bode 8 týchto VOP.</p>
<p><strong>7.3</strong> Pokiaľ nebude splatná cena za dodané výrobky uhradená v plnej výške, má predávajúci právo prerušiť ďalšie dodávky tovaru do doby, kedy bude splatná cena uhradená v plnej výške.</p>
</dd><dt></dt></dl>
<p><strong>Článok 8</strong></p>
<dl><dt id="answer8"></dt><dd>
<p><strong>POPLATKY ZA PREPRAVU, BALNÉ A DODACIE PODMIENKY</strong></p>
<p><strong>8.1</strong> Spoločnosť ETHOS Technology, s.r.o. si náklady na obalový materiál a zabalenie výrobku neúčtuje.</p>
<p><strong>8.2</strong> V prípade objednávky nad 101 Eur s DPH je doprava zdarma.</p>
<p><strong>8.3</strong> V rámci <strong>Slovenskej republiky</strong> je dodanie realizované prostredníctvom niektorej zo zásielkových služieb &ndash; SLOVAK PARCEL SERVICES - UPS, DPD, GEIS, GLS, prípadne iných, pričom poplatok za prepravu je: <strong>4,00 Eur s DPH.</strong><br />Pri veľkorozmernom a ťažkom tovare nad 30kg, ako je biela technika, plotre, veľké kopírky a podobne je cena za dopravu <strong>12 Eur s DPH,</strong> vzhľadom k tomu, že je potrebné použiť vozidlo so zdvíhacou plošinou.</p>
<p><strong>8.4</strong> V rámci <strong>Českej republiky</strong> je dodanie realizované prostredníctvom niektorej zo zásielkových služieb &ndash; SLOVAK PARCEL SERVICES - UPS, DPD, GEIS, GLS, prípadne iných.<br /> <strong>Poplatok za prepravu je podľa aktuálnych cien prepravy jednotlivých prepravných spoločností.</strong><br /> Zásielka bude doručená zvyčajne najneskôr do 1-3 pracovných dní odo dňa odoslania tovaru Predávajúcim.</p>
<p><strong>8.5</strong> V rámci <strong>EÚ</strong> je dodanie realizované prostredníctvom niektorej zo zásielkových služieb &ndash; SLOVAK PARCEL SERVICES - UPS, DPD, GEIS, GLS, prípadne iných. <strong><br />Poplatok za prepravu je podľa aktuálnych cien prepravy jednotlivých prepravných spoločností.</strong><br /> Zásielka bude kupujúcemu doručená zvyčajne najneskôr do 3-10 pracovných dní odo dňa odoslania tovaru Predávajúcim.<br /> Dodanie tovaru sa môže predĺžiť v závislosti od pripísania peňazí na náš účet ( pri platbe prevodom na účet ).</p>
<p>Ak ide o tovar, ktorý je skladom, zásielka bude doručená zvyčajne najneskôr do 1-3 pracovných dní odo dňa odoslania tovaru predávajúcim.<br /> Pokiaľ ide o tovar, ktorý je na Objednávku a nie je skladom, kupujúci má právo tento tovar zakúpiť. O dostupnosti tovaru, bude kupujúci informovaný. Ide väčšinou o špecifický, alebo cenovo drahší tovar, prípadne tovar, ktorý sa môže konfigurovať, alebo si konfiguráciu vyžaduje, ako sú napr. servery, počítačové zostavy a podobne.</p>
<p><strong>8.6</strong> Dodacie lehoty a termíny uvedené v objednávke ( ak nie sú zmluvnými stranami výslovne v objednávke dohodnuté ako fixné ) sa môžu po dohode s kupujúcim meniť, a to podľa rozsahu a povahy dodávky ( druh, počet alebo prevedenie dodávaných tovarov ).<br /> Predávajúci vyvíja maximálne úsilie, aby v objednávke uvedené dodacie lehoty a termíny boli dodržané.</p>
<p><strong>8.7</strong> V prípade, ak predávajúci dodáva kupujúcemu tovar prostredníctvom zásielkovej služby a nie je možné vopred určiť presnú hodinu dodania, je v záujme kupujúceho vhodné ako Dodaciu adresu označiť v objednávke miesto zamestnania, prípadne aj osobu poverenú kupujúcim na prevzatie tovaru.</p>
<p><strong>8.8</strong> Predávajúci, prepravná spoločnosť alebo zásielková služba je oprávnená avizovať dodávku tovaru kupujúcemu E - Mailom, SMS správou alebo inou vhodnou formou ( napr. telefonicky ).<br /> Kupujúci berie na vedomie, že za účelom plnenia zmluvy predávajúci poskytne tieto údaje kupujúceho prepravnej/špedičnej spoločnosti alebo doručovateľovi.<br /> Kupujúci je povinný byť zastihnuteľný na ním uvedenej adrese v čase oznámeného dodania tovaru.</p>
<p><strong>8.9</strong> Ak sa kuriérovi nepodarí zásielku úspešne kupujúcemu doručiť na adresu uvedenú v objednávke ( kde sa v čase dodania kupujúci nezdržoval ), nechá kuriér oznámenie o neúspešnom doručení, vrátane telefónneho kontaktu, za účelom možnosti dohodnutia ďalšieho možného termínu dodania tovaru. Spravidla je to na ďalší pracovný deň.</p>
<p><strong>8.10</strong> <strong> V prípade, ak aj opakovaný pokus o doručenie tovaru bude neúspešný, má predávajúci voči kupujúcemu nárok na vyúčtovanie zvýšených výdavkov spojených s opakovaním doručovania.</strong></p>
<p><strong>8.11</strong> V prípade predĺženia dodacej lehoty z dôvodu, že sa kľúčový materiál pre zhotovenie tovaru už nevyrába alebo nedodáva, alebo sa výrazným spôsobom zmenila jeho cena, alebo došlo k mimoriadnej, nepredvídateľnej, neodvrátiteľnej udalosti, budeme o tomto obratom informovať kupujúceho za účelom dohody o ďalšom postupe, a to aj s možnosťou stornovania objednávky, pokiaľ sa zmluvné strany nedohodnú na inom spôsobe riešenia.</p>
<p><strong>8.12</strong> Zásielka s tovarom obsahuje Faktúru, Dodací a Záručný list ( doklady o kúpe tovaru ), Obchodné podmienky, Formulár na odstúpenie od zmluvy.<br /> Pokiaľ tomu tak nie, tieto doklady sú kupujúcemu zaslané poštou, alebo na E - Mail, ktorý uviedol pri kúpe tovaru.<br /> Každý výrobok je zreteľne označený údajmi o výrobcovi, o spôsobe použitia a údržby výrobku a o nebezpečenstve, ktoré vyplýva z jeho nesprávneho použitia alebo údržby, o podmienkach uchovávania a skladovania výrobku, v štátnom jazyku.</p>
<p><strong>8.13</strong> Ak Vám tovar nebol doručený ani do 7 dní po našom E - Maile, kontaktujte nás prosím. Bližšie informácie o Vašom balíku a možných dôvodoch nedoručenia Vám po preverení poskytneme a budeme snažiť situáciu čím skôr riešiť.</p>
<p><strong>8.14</strong> V prípade spotrebiteľskej kúpnej zmluvy sme ako predávajúci povinní splniť Vašu objednávku a doručiť Vám tovar v lehote najneskôr do 30 dní od prijatia objednávky.<br /> Ak objednaný tovar alebo časť tovarov z objednávky nie je možné dodať vo vyššie uvedenej lehote, budeme Vás o tejto situácii informovať v čo možno najkratšom čase a oznámime Vám predpokladaný termín dodania tovaru alebo navrhneme dodanie náhradného tovaru. Ak sa nám tovar nepodarí zabezpečiť ani v dodatočnej lehote, máte právo od zmluvy odstúpiť a v prípade úhrady kúpnej ceny alebo jej časti Vám budú finančné prostriedky vrátené do 14 dní na Vami určený bankový účet.</p>
</dd><dt></dt></dl>
<p><strong>Článok 9</strong></p>
<dl><dt id="answer9"></dt><dd>
<p><strong>VÝHRADA VLASTNÍCTVA</strong></p>
<p><strong>9.1</strong> Vlastnícke právo prechádza z predávajúceho na kupujúceho až momentom zaplatenia celej kúpnej ceny za predmet kúpnej zmluvy.</p>
<p><strong>9.2</strong> V prípade uplatnenia reklamácie kupujúcim pre tovar, na ktorý sa vzťahuje ešte vlastnícke právo predávajúceho, si predávajúci vyhradzuje právo vybaviť túto reklamáciu až v momente úplného zaplatenia kúpnej ceny k predmetu kúpnej zmluvy.</p>
</dd><dt></dt></dl>
<p><strong>Článok 10</strong></p>
<dl><dt id="answer10"></dt><dd>
<p><strong>ODSTÚPENIE OD ZMLUVY</strong></p>
<p><strong>10.1</strong> <strong> POUČENIE O UPLATNENÍ PRÁVA SPOTREBITEĽA NA ODSTÚPENIE OD ZMLUVY.</strong></p>
<p><strong>10.1.1</strong> Právo na odstúpenie od zmluvy.</p>
<p><strong>Máte právo odstúpiť od tejto zmluvy bez uvedenia dôvodu v lehote 14 dní.</strong></p>
<p><strong>Lehota na odstúpenie od zmluvy uplynie po 14 dňoch odo dňa, keď Vy alebo Vami určená tretia osoba s výnimkou dopravcu, prevezmete tovar ( v prípade zmluvy, predmetom ktorej je predaj tovaru ).</strong></p>
<p>V prípade zmluvy o službách alebo zmluvy o poskytovaní elektronického obsahu nedodávaného na hmotnom nosiči, uplynie lehota na odstúpenie od zmluvy po 14 dňoch odo dňa uzavretia zmluvy.<br /> V prípade zmluvy, predmetom ktorej je predaj tovaru, uplynie lehota na odstúpenie od zmluvy po 14 dňoch odo dňa, keď Vy alebo Vami určená tretia osoba s výnimkou dopravcu prevezmete tovar.<br /> Ak sa tovary objednané kupujúcim v jednej objednávke dodávajú oddelene, uplynie lehota na odstúpenie od zmluvy po 14 dňoch odo dňa, keď Vy alebo Vami určená tretia osoba s výnimkou dopravcu prevezmete tovar, ktorý bol dodaný ako posledný.<br /> Ak sa dodáva tovar pozostávajúci z viacerých dielov alebo kusov, uplynie lehota na odstúpenie od zmluvy po 14 dňoch odo dňa, keď Vy alebo Vami určená tretia osoba s výnimkou dopravcu prevezmete posledný diel alebo kus.<br /> Ak sa tovar dodáva opakovane počas vymedzeného obdobia, uplynie lehota na odstúpenie od zmluvy po 14 dňoch odo dňa, keď Vy alebo Vami určená tretia osoba s výnimkou dopravcu prevezmete prvý dodaný tovar.<br /> V prípade zmluvy o službách uplynie lehota na odstúpenie od zmluvy po 14 dňoch odo dňa uzavretia zmluvy.<br /> <strong>Pri uplatnení práva na odstúpenie od zmluvy nás informujte o svojom rozhodnutí odstúpiť od tejto zmluvy jednoznačným vyhlásením, napríklad listom zaslaným poštou na adresu: ETHOS Technology, s.r.o. Tatranská 6396/101, Banská Bystrica PSČ: 974 11 alebo E - Mailom na adresu: <a href="https://web.archive.org/web/20180908030722/mailto:sales@worlds.sk">sales@worlds.sk</a></strong><br /> Na tento účel môžete použiť vzorový formulár na odstúpenie od zmluvy, ktorý sme Vám zaslali a ktorý tiež je uvedený ako príloha týchto VOP a ktorý si môžete stiahnuť aj tu, kliknutím na tento Odkaz <strong><a href="https://web.archive.org/web/20180908030722/http://worlds.sk/documentsworlds/odstupenieodzmluvy.doc"> Vzorový formulár na odstúpenie od Zmluvy</a>.</strong><br /> Lehota na odstúpenie od zmluvy je zachovaná, ak zašlete oznámenie o uplatnení práva na odstúpenie od zmluvy pred tým, ako uplynie lehota na odstúpenie od zmluvy.</p>
<p><strong>10.1.2</strong> <strong>Dôsledky odstúpenia od zmluvy.</strong></p>
<p>Po odstúpení od zmluvy Vám vrátime všetky platby, ktoré ste uhradili v súvislosti s uzavretím zmluvy, najmä kúpnu cenu vrátane nákladov na doručenie tovaru k Vám. To sa nevzťahuje na dodatočné náklady, ak ste si zvolili iný druh doručenia, ako je najlacnejší bežný spôsob doručenia, ktorý ponúkame. Platby Vám budú vrátené bez zbytočného odkladu, najneskôr do 14 dní odo dňa, keď nám bude doručené Vaše oznámenie o odstúpení od tejto zmluvy. Ich úhrada bude uskutočnená rovnakým spôsobom, aký ste použili pri Vašej platbe, ak ste výslovne nesúhlasili s iným spôsobom platby, a to bez účtovania akýchkoľvek ďalších poplatkov.</p>
<p>Platba za zakúpený tovar Vám bude uhradená až po doručení vráteného tovaru späť na našu adresu alebo po predložení dokladu preukazujúceho zaslanie tovaru späť podľa toho, čo nastane skôr.</p>
<p><strong>Ako možno vrátiť tovar v prípade odstúpenia od zmluvy</strong><br /> Zašlite nám tovar späť alebo ho prineste na našu adresu najneskôr do 14 dní odo dňa uplatnenia práva na odstúpenie od zmluvy. Lehota sa považuje za zachovanú, ak tovar odošlete späť pred uplynutím 14-dňovej lehoty.</p>
<p><strong>Informácia o úhrade nákladov na vrátenie tovaru</strong><br /> Týmto Vás informujeme, že ak sa rozhodnete odstúpiť od zmluvy, <strong>priame náklady na vrátenie tovaru znášate Vy.</strong><br /> Ak tovar vzhľadom na jeho povahu nemožno vrátiť poštou: <strong>Priame náklady na vrátenie tovaru znášate Vy. Predpokladaný odhad týchto nákladov je 10 Eur.</strong><br /> Ak tovar v prípade zmlúv uzavretých mimo prevádzkových priestorov predávajúceho vzhľadom na jeho povahu nemôže byť odoslaný späť predávajúcemu poštou a bol dodaný spotrebiteľovi domov v čase uzavretia zmluvy: <strong>Tovar vyzdvihneme na vlastné náklady.</strong></p>
<p><strong>Informácia o zodpovednosti kupujúceho za škodu vzniknutú na vrátenom tovare</strong><br /> Týmto Vás informujeme, <strong>že Zodpovedáte iba za akékoľvek zníženie hodnoty tovaru v dôsledku zaobchádzania s ním iným spôsobom, než aký je potrebný na zistenie povahy, vlastností a funkčnosti tovaru.</strong></p>
<p>V prípade zmluvy o službách: <strong>Ak ste požiadali o začatie poskytovania služieb počas lehoty na odstúpenie od zmluvy, máte povinnosť uhradiť nám cenu za skutočne poskytnuté plnenia do dňa, kedy ste nám oznámili Vaše rozhodnutie odstúpiť od tejto zmluvy.</strong></p>
<p><strong>10.2</strong> <strong> KEDY KUPUJÚCI NEMÔŽE ODSTÚPIŤ OD ZMLUVY</strong></p>
<p><strong>10.2.1</strong> Kupujúci nemôže odstúpiť od zmluvy, predmetom ktorej je napr.:</p>
a.) predaj tovaru zhotoveného podľa osobitných požiadaviek kupujúceho, tovaru vyrobeného na mieru alebo tovaru určeného osobitne pre jedného kupujúceho,<br /> b.) predaj zvukových záznamov, obrazových záznamov, zvukovoobrazových záznamov, kníh alebo počítačového softvéru predávaných v ochrannom obale, ak spotrebiteľ tento obal rozbalil,<br /> c.) poskytnutie služby, ak sa jej poskytovanie začalo s výslovným súhlasom spotrebiteľa a spotrebiteľ vyhlásil, že bol riadne poučený o tom, že vyjadrením tohto súhlasu stráca právo na odstúpenie od zmluvy po úplnom poskytnutí služby, a ak došlo k úplnému poskytnutiu služby,<br /> d.) predaj tovaru alebo poskytnutie služby, ktorých cena závisí od pohybu cien na finančnom trhu, ktorý predávajúci nemôže ovplyvniť a ku ktorému môže dôjsť počas plynutia lehoty na odstúpenie od zmluvy,<br /> e.) vykonanie naliehavých opráv, o ktoré spotrebiteľ výslovne požiadal predávajúceho,<br /> f.) predaj tovaru uzavretého v ochrannom obale, ktorý nie je vhodné vrátiť z dôvodu ochrany zdravia alebo z hygienických dôvodov a ktorého ochranný obal bol po dodaní porušený,<br /> g.) poskytovanie elektronického obsahu inak ako na hmotnom nosiči, ak sa jeho poskytovanie začalo s výslovným súhlasom spotrebiteľa a spotrebiteľ vyhlásil, že bol riadne poučený o tom, že vyjadrením tohto súhlasu stráca právo na odstúpenie od zmluvy,<br /> h.) ostatné prípady sú uvedené v &sect;7 ods. 6 zákona č. 102/2014. Z. z.
<p><strong>10.2.2</strong> Vzhľadom k tomu, že v prípade odstúpenia sa zmluva od začiatku ruší, vrátia si zmluvné strany všetky vzájomne prijaté plnenia.</p>
<p><strong>10.2.3</strong> Vami vrátený tovar odporúčame zaslať doporučene, prípadne aj poistiť, nakoľko neručíme za jeho možnú stratu na ceste k nám zo strany tretieho subjektu. <strong>Zásielky na dobierku nebudú preberané, akceptované!</strong></p>
<p><strong>10.2.4</strong> <strong>V prípade, že kupujúci odstúpi od zmluvy a doručí predávajúcemu tovar, ktorý je použitý a je poškodený alebo neúplný alebo hodnota predmetného tovaru je znížená v dôsledku takého zaobchádzania s tovarom, ktoré je nad rámec zaobchádzania potrebného na zistenie vlastností a funkčnosti tovaru, má predávajúci voči kupujúcemu nárok na náhradu škody vo výške hodnoty opravy tovaru a uvedenia tovaru do pôvodného stavu resp. predávajúci má právo požadovať od kupujúceho preplatenie zníženia hodnoty tovaru a kupujúci je o tejto skutočnosti upovedomený.</strong></p>
<p><strong>10.3</strong> <strong> INFORMÁCIA O PRÍPADNEJ POVINNOSTI SPOTREBITEĽA UHRADIŤ PREDÁVAJÚCEMU CENU ZA SKUTOČNE POSKYTNUTÉ PLNENIE</strong></p>
<p><strong>10.3.1</strong> V prípade, že spotrebiteľ odstúpi od zmluvy o službách, je povinný uhradiť predávajúcemu iba cenu za skutočne poskytnuté plnenie do dňa doručenia oznámenia o odstúpení od zmluvy, ak pred začatím poskytovania služieb udelil spotrebiteľ predávajúcemu výslovný súhlas.</p>
<p><strong>10.4</strong> <strong> VÝSLOVNÝ SÚHLAS SO ZAČATÍM POSKYTOVANIA SLUŽBY PRED UPLYNUTÍM LEHOTY NA ODSTÚPENIE OD ZMLUVY</strong></p>
<p><strong>10.4.1</strong> Predávajúci týmto poučuje kupujúceho o tom, že udelením súhlasu so začatím poskytovania služby pred uplynutím lehoty na odstúpenie od zmluvy, po úplnom poskytnutí služby, kupujúci (spotrebiteľ) stráca právo na odstúpenie od zmluvy.</p>
<p><strong>10.4.2</strong> Kupujúci ( spotrebiteľ ) berie na vedomie a súhlasí s tým, že stlačením tlačidla Objednávka s povinnosťou platby udeľuje predávajúcemu výslovný súhlas so začatím poskytovania služby pred uplynutím lehoty na odstúpenie od zmluvy a zároveň vyhlasuje, že bol riadne poučený o tom, že udelením súhlasu stráca po úplnom poskytnutí služby právo na odstúpenie od zmluvy.</p>
</dd><dt></dt></dl>
<p><strong>Článok 11</strong></p>
<dl><dt id="answer11"></dt><dd>
<p><strong>REKLAMAČNÝ PORIADOK A ZÁRUČNÉ PODMIENKY</strong></p>
<p><strong>11.1</strong> Napriek tomu, že sa naša spoločnosť snaží robiť našu prácu čo najlepšie a ponúkať Vám čo najlepšie služby, môže sa stať, že niečo nie je tak, ako by malo byť. Na zabezpečenie rýchleho a správneho postupu pri vybavovaní reklamácií slúži tento <strong>Reklamačný poriadok.</strong></p>
<p><strong>11.2</strong> <strong> Zodpovednosť za vady predaného tovaru</strong><br /> Predávajúci zodpovedá za vady, ktoré má predaný tovar pri prevzatí kupujúcim. Pri tovaroch predávaných za nižšiu cenu nezodpovedá za vadu, pre ktorú bola dojednaná nižšia cena. Predávajúci tiež zodpovedá za vady, ktoré sa vyskytnú po prevzatí veci v záručnej dobe ( záruka ).<br /> Kupujúci je povinný vytknúť vady tovaru predávajúcemu <strong>bez zbytočného odkladu po tom, čo mal možnosť tovar prezrieť.</strong> Kupujúci je povinný si pri prevzatí tovaru, tovar prezrieť a skontrolovať kompletnosť dodaného tovaru a príslušných dokladov ( daňový doklad - faktúra ).<br /> Ak sa tovar doručuje kuriérskou službou alebo poštou je kupujúci povinný na mieste prevzatia skontrolovať, či je poškodený obal zásielky. V prípade poškodeného obalu zásielky a podozrenia, že tovar môže byť rovnako poškodený, <strong>kupujúci spíše priamo s vodičom prepravnej spoločnosti protokol o zistených vadách napr. pre poškodenie obalu tovaru, mechanické poškodenie tovaru, alebo nekompletnosť zásielky. Kupujúci zároveň poškodenie tovaru oznámi predávajúcemu formou E - Mailu alebo iným vhodným spôsobom bez zbytočného odkladu od dodania tovaru.</strong><br /> <strong>Pri osobnom odbere tovaru je kupujúci povinný tovar skontrolovať a zistené zjavné vady týkajúce sa mechanického poškodenia tovaru alebo jeho obalu, množstva dodaného tovaru, kompletnosti dokladov, príp. iné zjavné vady reklamovať ihneď.</strong></p>
<p><strong>11.3</strong> <strong> Záručná doba</strong><br /> Základná zákonná záručná doba na tovar alebo službu zakúpenú kupujúcim &ndash; spotrebiteľom, fyzickou osobou v internetovom obchode <strong><a href="https://web.archive.org/web/20180908030722/https://worlds.sk/" target="_blank">WORLD'S</a></strong> <strong>je 24 mesiacov</strong> podľa ustanovení Občianskeho zákonníka.<br /> Predávajúci <strong>môže</strong> vyhlásením v <strong>Záručnom liste</strong> poskytnúť <strong>dlhšiu záručnú dobu,</strong> ako je zákonná ( t. j. viac ako 24 mesiacov ).<br /> Záručné doby začínajú plynúť od prevzatia tovaru kupujúcim, t.j. dňom prevzatia tovaru od prepravnej spoločnosti alebo priamo od predávajúceho ak si tovar preberá kupujúci osobne.</p>
<p><strong>11.4</strong> <strong> Zánik práv</strong><br /> Práva zo zodpovednosti za vady tovaru, pre ktoré platí záručná doba, zaniknú, ak sa neuplatnili v záručnej dobe. Kupujúci preto môže uplatniť reklamáciu len v záručnej dobe.</p>
<p><strong>11.5</strong> <strong> Právo na uplatnenie reklamácie</strong><br /> Ak kupujúci zistí, že dodaný tovar má vadu, t.j. nemá požadované, prípadne právnymi predpismi stanovené vlastnosti, resp. nie je v bežnej kvalite, má právo túto vadu reklamovať.</p>
<p><strong>11.6</strong> <strong> Kde možno uplatniť reklamáciu alebo vykonanie záručných opráv</strong></p>
Kupujúci môže uplatniť reklamáciu alebo vykonanie záručných opráv písomne na adrese predávajúceho: ETHOS Technology, s.r.o., Tatranská 6396/101, Banská Bystrica PSČ: 974 11, E - Mail: <strong><a href="https://web.archive.org/web/20180908030722/mailto:sales@worlds.sk">sales@worlds.sk</a></strong>, Telefónne číslo: 0907837484.
<p>Kupujúci môže tiež uplatniť reklamáciu alebo vykonanie záručných opráv u určenej osoby: Autorizované servisné stredisko výrobcu produktu alebo služby. Určená osoba je osoba oprávnená výrobcom na vykonávanie záručných opráv ( &sect; 2 písm. n ) Zák. č. 250/2007 Z. z. ). Táto je zvyčajne uvedená v záručnom liste od výrobcu. Určená osoba môže reklamáciu vybaviť iba odovzdaním opraveného výrobku, inak reklamáciu postúpi predávajúcemu na vybavenie.</p>
<p>Predávajúci nemá zriadenú prevádzkareň.</p>
<p><strong>11.7</strong> <strong> Postup pri uplatňovaní reklamácie</strong></p>
<p>Kupujúci <strong>nemá ďalej používať vec,</strong> na ktorej zistil vadu s ohľadom na charakter vady.</p>
<p>Kupujúci má uplatniť reklamáciu <strong>bezodkladne v záručnej dobe</strong> u predávajúceho alebo u určenej osoby, a ak je to možné, vzhľadom na charakter výrobku, <strong>zaslať/odovzdať</strong> reklamovaný tovar osobe poverenej vybavovať reklamácie. Ak povaha výrobku neumožňuje doručiť výrobok predávajúcemu alebo do servisného strediska, požadovať odstránenie vady na mieste alebo dohodnúť spôsob prepravy výrobku.</p>
<p>Pri uplatnení reklamácie treba <strong>priložiť doklad o kúpe alebo záručný</strong> list v prípade, že Vám bol vydaný. Odporúča sa zákazníkovi pre rýchlejšie vybavenie reklamácie, ak sa tovar zasiela priamo do autorizovaného servisného strediska, pribaliť do zásielky spolu s dokladmi o kúpe, aj stručný popis vady, pre ktorú je výrobok zaslaný do reklamácie.</p>
<p>Kupujúci stručne <strong>opíše/uvedie vady tovaru,</strong> ktoré reklamuje. Tovar, ktorý reklamujete by nemal byť nehygienický a špinavý. Tovar odporúčame zaslať doporučene a prípadne poistiť, nakoľko neručíme za jeho prípadnú stratu na ceste k nám. Zásielky na Dobierku nebudú našou spoločnosťou preberané.</p>
<p><strong>11.8</strong> <strong> Za vadu výrobku/tovaru sa nepovažuje:</strong><br /> a.) opotrebovanie charakteristické pre daný materiál alebo použitie,<br /> b.) pokiaľ z povahy predanej veci vyplýva, že jej životnosť je kratšia než záručná doba a keď pri obvyklom užívaní takej veci dôjde k jej celkovému opotrebovaniu ešte pred uplynutím záručnej doby,<br /> c.) poškodenie výrobku spôsobené nesprávnym používaním, skladovaním alebo poškodením zo strany kupujúceho. Nesprávnym používaním sa rozumie nesprávne zaobchádzanie s výrobkom, spôsobom iným ako bol uvedený v návode na použitie, údržbu, skladovanie a používanie pre iný účel ako bol určený,<br /> d.) také mechanické poškodenie výrobku, ktoré nemohlo vzniknúť bežným používaním výrobku na určený účel,<br /> e.) ušpinenie ( fľaky, škvrny ) tovaru, ktoré vznikli po prevzatí tovaru spôsobené konaním kupujúceho,<br /> f.) nadmerné zaťažovanie alebo zanedbanie starostlivosti o jeho údržbu.</p>
<p><strong>11.9</strong> <strong> Poučenie o právach kupujúceho</strong><br /> Ak kupujúci uplatní právo zo zodpovednosti za vady tovaru, je predávajúci alebo ním poverený zamestnanec alebo určená osoba povinná poučiť kupujúceho o jeho právach podľa Občianskeho zákonníka v nasledovnom rozsahu:<br /> <strong>Poučenie o zodpovednosti predávajúceho za vady tovaru alebo služby podľa všeobecného predpisu</strong></p>
<p><strong>&sect; 622 Občianskeho zákonníka</strong><br /> 1.) Ak ide o vadu, ktorú možno odstrániť, má kupujúci právo, aby bola bezplatne, včas a riadne odstránená. Predávajúci je povinný vadu bez zbytočného odkladu odstrániť.<br /> 2.) Kupujúci môže namiesto odstránenia vady požadovať výmenu veci, alebo ak sa vada týka len súčasti veci, výmenu súčasti, ak tým predávajúcemu nevzniknú neprimerané náklady vzhľadom na cenu tovaru alebo závažnosť vady.<br /> 3.) Predávajúci môže vždy namiesto odstránenia vady vymeniť vadnú vec za bezvadnú, ak to kupujúcemu nespôsobí závažné ťažkosti.</p>
<p><strong>&sect; 623 Občianskeho zákonníka</strong><br /> 1.) Ak ide o vadu, ktorú nemožno odstrániť a ktorá bráni tomu, aby sa vec mohla riadne užívať ako vec bez vady, má kupujúci právo na výmenu veci alebo má právo od zmluvy odstúpiť. Tie isté práva prislúchajú kupujúcemu, ak ide síce o odstrániteľné vady, ak však kupujúci nemôže pre opätovné vyskytnutie sa vady po oprave alebo pre väčší počet vád vec riadne užívať.k ide o vadu, ktorú nemožno odstrániť a ktorá bráni tomu, aby sa vec mohla riadne užívať ako vec bez vady, má kupujúci právo na výmenu veci alebo má právo od zmluvy odstúpiť. Tie isté práva prislúchajú kupujúcemu, ak ide síce o odstrániteľné vady, ak však kupujúci nemôže pre opätovné vyskytnutie sa vady po oprave alebo pre väčší počet vád vec riadne užívať.<br /> 2.) Ak ide o iné neodstrániteľné vady, má kupujúci právo na primeranú zľavu z ceny veci.</p>
<p><strong>11.10</strong> <strong> Právo voľby kupujúceho</strong><br /> Kupujúci má právo voľby, ktoré z vyššie uvedených práv si uplatní.</p>
<p><strong>11.11</strong> <strong>Určiť spôsob vybavenia reklamácie</strong><br /> Na základe rozhodnutia kupujúceho, ktoré z vyššie uvedených práv si uplatní, je predávajúci ( alebo ním poverený zamestnanec alebo určená osoba ) povinný určiť spôsob vybavenia reklamácie podľa &sect; 2 písm. m) Z. č. 250/2007 Z. z. ihneď, v zložitých prípadoch najneskôr do 3 pracovných dní odo dňa uplatnenia reklamácie, v odôvodnených prípadoch, najmä ak sa vyžaduje zložité technické zhodnotenie stavu výrobku alebo služby, najneskôr do 30 dní odo dňa uplatnenia reklamácie.<br /> Tieto spôsoby vybavenia reklamácie sú:<br /> - odovzdanie opraveného výrobku,<br /> - výmena výrobku,<br /> - vrátenie kúpnej ceny výrobku,<br /> - vyplatenie primeranej zľavy z ceny výrobku,<br /> - písomná výzva na prevzatie plnenia alebo jej odôvodnené zamietnutie.</p>
<p><strong>11.12</strong> <strong>Vybavenie reklamácie</strong><br /> Po určení spôsobu vybavenia reklamácie sa reklamácia vybaví ihneď, v odôvodnených prípadoch možno reklamáciu vybaviť aj neskôr, vybavenie reklamácie však nesmie trvať dlhšie ako 30 dní odo dňa uplatnenia reklamácie. Po uplynutí lehoty na vybavenie reklamácie má kupujúci právo od zmluvy odstúpiť alebo má právo na výmenu výrobku za nový výrobok. Vybavením reklamácie nie je dotknuté právo kupujúceho na náhradu škody podľa osobitného predpisu.</p>
<p><strong>11.13</strong> <strong>Potvrdenie o uplatnení reklamácie</strong><br /> Predávajúci pri uplatnení reklamácie vydá kupujúcemu potvrdenie. Ak nie je možné potvrdenie dodať ihneď, musí sa doručiť bez zbytočného odkladu, najneskôr však spolu s dokladom o vybavení reklamácie.</p>
<p><strong>11.14</strong> <strong>Potvrdenie o uplatnení reklamácie</strong><br /> Predávajúci o vybavení reklamácie vydá a doručí kupujúcemu písomný doklad najneskôr do 30 dní odo dňa uplatnenia reklamácie.</p>
<p><strong>11.15</strong> <strong>Evidencia reklamácií</strong><br /> Predávajúci vedie evidenciu o reklamáciách a na požiadanie orgánu dozoru ju sprístupní k nahliadnutiu. Evidencia o reklamácii obsahuje údaje o dátume uplatnenia reklamácie, dátume a spôsobe vybavenia reklamácie a poradové číslo dokladu o uplatnení reklamácie.</p>
<p><strong>11.16</strong> <strong>Tento reklamačný poriadok bude prístupný na viditeľnom mieste dostupnom pre kupujúceho.</strong></p>
</dd><dt></dt></dl>
<p><strong>Článok 12</strong></p>
<dl><dt id="answer12"></dt><dd>
<p><strong>INFORMÁCIA O ALTERNATÍVNOM RIEŠENÍ SPOROV</strong></p>
<p>Vážený kupujúci, v súlade so Zákonom č. 391/2015 Z. z. o alternatívnom riešení spotrebiteľských sporov Vás týmto informujeme, že ako spotrebiteľ máte právo obrátiť sa na našu spoločnosť so <strong>žiadosťou o nápravu,</strong> ak nie ste spokojný so spôsobom, ktorým sme vybavili Vašu reklamáciu alebo ak sa domnievate, že sme porušili Vaša práva.</p>
<p><strong>Identifikačné a kontaktné údaje našej spoločnosti sú:</strong></p>
<p>Obchodné meno: <strong>ETHOS Technology, s.r.o.</strong><br />Právna forma: Spoločnosť s ručením obmedzením<br />Sídlo: Tatranská 6396/101, Banská Bystrica PSČ: 974 11<br />IČO: 44 099 207<br />DIČ: 2022595311<br />IČ DPH: SK2022595311<br />Zapísaná v: Obchodnom registri Okresného súdu Banská Bystrica, Oddiel: Sro, Vložka č.: 14726/S<br />Zastúpená: Konateľom PhDr. Ivan Fencl</p>
<p><strong>Prevádzkareň ( Predajňa ): nie je.</strong></p>
<p><strong>Pracovná doba</strong><br />Pondelok - Piatok 07,00 - 17,00<br />Sobota 07,00 - 13,00</p>
<p><strong>Kontaktné údaje:</strong><br />Telefónne číslo: 0907837484<br />E - Mail: <strong><a href="https://web.archive.org/web/20180908030722/mailto:sales@worlds.sk">sales@worlds.sk</a></strong><br /> <strong>( ďalej ako spoločnosť alebo ako predávajúci )</strong></p>
<p>Ak naša spoločnosť na Vašu žiadosť o nápravu odpovedala zamietavo alebo na ňu neodpovedala do 30 dní odo dňa jej odoslania, máte právo podať návrh na začatie alternatívneho riešenia sporu. Návrh na začatie alternatívneho riešenia sporu ( ďalej len návrh ) je treba podať príslušnému subjektu alternatívneho riešenia sporov, ktorým je Slovenská obchodná inšpekcia alebo iné právnické osoby zapísané v zozname Ministerstva hospodárstva SR. Ako spotrebiteľ máte právo voľby, ktorému z nich uvedený návrh podáte. Zoznam je dostupný na stránke<br /><strong><a href="https://web.archive.org/web/20180908030722/https://www.mhsr.sk/obchod/ochrana-spotrebitela/alternativne-riesenie-spotrebitelskych-sporov-1" target="_blank">Alternatívne riešenie spotrebiteľských sporov</a></strong></p>
<p>Návrh môžete podať v listinnej podobe, elektronickej podobe alebo ústne do zápisnice. Na podanie návrhu môžete využiť formulár, ktorého vzor je uvedený v prílohe týchto VOP a obsahuje zákonom predpísané náležitosti.</p>
<p>Vzorový formulár na Alternatívne riešenie sporu si môžete stiahnuť aj tu, kliknutím na tento Odkaz <strong><a href="https://web.archive.org/web/20180908030722/http://worlds.sk/documentsworlds/alternativneriesenie.doc"> Vzorový formulár na Alternatívne riešenie sporu</a>.</strong></p>
<p>Platforma na podávanie alternatívneho riešenia sporov, prostredníctvom ktorej môže spotrebiteľ podať návrh na začatie alternatívneho riešenia sporu:<br /> <strong><a href="https://web.archive.org/web/20180908030722/http://www.soi.sk/sk/Alternativne-riesenie-spotrebitelskych-sporov.soi" target="_blank">Platforma - Alternatívne riešenie spotrebiteľských sporov</a></strong></p>
<p>Zároveň ste oprávnený použiť platformu riešenia sporov On-line, ktorá je dostupná na webovej stránke<br /> <strong><a href="https://web.archive.org/web/20180908030722/https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home.chooseLanguage" target="_blank">Platforma - Alternatívne riešenie spotrebiteľských sporov On-line</a></strong></p>
<p>Alternatívne riešenie sporov môže využiť len spotrebiteľ t.j. fyzická osoba, ktorá pri uzatváraní a plnení spotrebiteľskej zmluvy nekoná v rámci predmetu svojej podnikateľskej činnosti, zamestnania alebo povolania. Alternatívne riešenie sporov sa týka len sporu medzi spotrebiteľom a predávajúcim, ktorého hodnota presahuje 20 Eur. Subjekt alternatívneho riešenia sporov môže od Vás za začatie riešenia sporu požadovať úhradu poplatku do výšky 5 Eur vrátane DPH. Výsledkom konania o alternatívnom riešení sporu, by mala byť dohoda predajcu a spotrebiteľa o zmierlivom vyriešení ich sporu. Avšak ani záväznosť takejto dohody nebráni stranám, aby svoj spor následne riešili súdnou cestou.</p>
</dd><dt></dt></dl>
<p><strong>Článok 13</strong></p>
<dl><dt id="answer13"></dt><dd>
<p><strong>INFORMÁCIA O POSTUPOCH UPLATŇOVANIA SŤAŽNOSTÍ A PODNETOV SPOTREBITEĽOV</strong></p>
<p><strong>13.1</strong> V prípade podania Vášho návrhu, pripomienky, sťažnosti alebo podnetu sa budeme týmito bezodkladne zaoberať s prihliadnutím na ich závažnosť a urgentnosť, a po odbornom preskúmaní a posúdení Vám zašleme informáciu o výsledku. Na komunikáciu s nami môžete využiť E - Mail: <strong><a href="https://web.archive.org/web/20180908030722/mailto:sales@worlds.sk">sales@worlds.sk</a></strong></p>
</dd><dt></dt></dl>
<p><strong>Článok 14</strong></p>
<dl><dt id="answer14"></dt><dd>
<p><strong>OCHRANA OSOBNÝCH ÚDAJOV</strong></p>
<p><strong>14.1</strong> Naša spoločnosť si uvedomuje, že v súvislosti s prevádzkovaním E - Shopu dochádza k spracúvaniu osobných údajov a preto sa snažíme dodržiavať všetky zákonom požadované opatrenia, aby sa zabezpečila ich náležitá ochrana a bezpečnosť. Za týmto účelom máme v súlade s GDPR - NARIADENÍM EURÓPSKEHO PARLAMENTU A RADY ( EÚ ) 2016/679 o ochrane fyzických osôb pri spracúvaní osobných údajov a o voľnom pohybe takýchto údajov, ktorým sa zrušuje smernica 95/46/ES, ako aj so Zákonom č. 18/2018 Z. z. o ochrane osobných údajov a o zmene a doplnení niektorých zákonov, prijaté primerané technické a organizačné opatrenia. Zároveň by sme Vás ako dotknutú osobu chceli informovať o podmienkach spracúvania Vašich osobných údajov.</p>
<p><strong>14.2</strong> <strong>Prevádzkovateľom informačných systémov osobných údajov je:</strong></p>
<p>Obchodné meno: <strong>ETHOS Technology, s.r.o.</strong><br />Právna forma: Spoločnosť s ručením obmedzením<br />Sídlo: Tatranská 6396/101, Banská Bystrica PSČ: 974 11<br />IČO: 44 099 207<br />DIČ: 2022595311<br />IČ DPH: SK2022595311<br />Zapísaná v: Obchodnom registri Okresného súdu Banská Bystrica, Oddiel: Sro, Vložka č.: 14726/S<br />Zastúpená: Konateľom PhDr. Ivan Fencl<br />Zodpovedná osoba: Nie je určená</p>
<p><strong>Kontaktné údaje:</strong><br />Telefónne číslo: 0907837484<br />E - Mail: <strong><a href="https://web.archive.org/web/20180908030722/mailto:sales@worlds.sk">sales@worlds.sk</a></strong><br /> <strong>( ďalej ako Prevádzkovateľ )</strong></p>
<p><strong>14.3</strong> <strong>V súvislosti s prevádzkovaním E - Shopu sa spracúvajú osobné údaje v týchto informačných systémoch osobných údajov:</strong></p>
<p><strong>14.3.1</strong> <strong>IS - E - SHOP</strong></p>
<p><strong>14.3.1.1</strong> <strong>ÚČEL SPRACÚVANIA OSOBNÝCH ÚDAJOV</strong><br /> Predaj tovaru, vyhotovenie faktúry, dodanie tovaru a prípadná reklamácia tovaru alebo prípadný súdny spor týkajúci sa kúpnej zmluvy.</p>
<p><strong>14.3.1.2</strong> <strong>ROZSAH/ZOZNAM SPRACÚVANÝCH OSOBNÝCH ÚDAJOV</strong><br /> Titul, meno, priezvisko, adresa bydliska, adresa na doručenie tovaru, dátum narodenia, E - Mailová adresa, telefónne číslo, č. účtu na prípadné vrátenie peňazí, pri platbe kartou aj údaje nevyhnutné na uskutočnenie platby cez internet.</p>
<p><strong>14.3.1.3</strong> <strong>PRÁVNY ZÁKLAD SPRACÚVANIA OSOBNÝCH ÚDAJOV</strong><br /> a.) &sect; 13 ods.1 písm. b) Zákona - spracúvanie osobných údajov je nevyhnutné <strong>na plnenie Kúpnej zmluvy realizovanej cez E - Shop,</strong> ktorej zmluvnou stranou je dotknutá osoba ( kupujúci ), alebo na vykonanie opatrenia pred uzatvorením zmluvy na základe žiadosti dotknutej osoby,<br /> b.) &sect; 13 ods.1 písm. c) Zákona - spracúvanie osobných údajov je nevyhnutné <strong>podľa osobitných predpisov.</strong> Ide najmä o:<br /> - zákon č. 102/2014 Z. z. o ochrane spotrebiteľa pri predaji tovaru alebo poskytovaní služieb na základe zmluvy uzavretej na diaľku alebo zmluvy uzavretej mimo prevádzkových priestorov predávajúceho a o zmene a doplnení niektorých zákonov,<br /> - zákon č. 250/2007 Z. z. o ochrane spotrebiteľa a o zmene zákona Slovenskej národnej rady č. 372/1990 Zb. o priestupkoch v znení neskorších predpisov,<br /> - zákon č. 40/1964 Zb. Občiansky zákonník v znení neskorších predpisov,<br /> c.) &sect; 13 ods.1 písm. f) Zákona - spracúvanie osobných údajov je nevyhnutné <strong>na účel oprávnených záujmov prevádzkovateľa,</strong> konkrétne na uplatňovanie/bránenie nárokov predávajúceho súdnou cestou napr. nárok na náhradu škody.</p>
<p><strong>14.3.1.4</strong> <strong>KATEGÓRIE PRÍJEMCOV A TRETÍCH STRÁN</strong><br /> <strong>Príjemca v tretej krajine alebo medzinárodnej organizácii</strong><br /> - Nie je.<br /> <strong>Príjemca v členskom štáte ( EÚ + EHP )</strong><br /> - Kuriérska/doručovateľská služba/slovenská pošta,<br /> - Poskytovateľ webhostingu,<br /> - Poskytovateľ IT servisu/údržby.<br /> <strong>Orgán verejnej moci, ktorý spracúva OÚ na základe osobitného predpisu alebo medzinárodnej zmluvy, ktorou je SR viazaná</strong><br /> - Štátne kontrolné orgány v oblasti elektronického obchodovania.</p>
<p><strong>14.3.1.5</strong> <strong>PRENOS OSOBNÝCH ÚDAJOV DO TRETEJ KRAJINY ALEBO MEDZINÁRODNEJ ORGANIZÁCIE</strong><br /> - Nie je a ani sa nezamýšľa.</p>
<p><strong>14.3.1.6</strong> <strong>DOBA UCHOVÁVANIA OSOBNÝCH ÚDAJOV</strong><br /> - Účtovné doklady - <strong>10 rokov,</strong><br /> - Registračné údaje na ( E - Shop ) - <strong>Počas realizácie kúpnej zmluvy a ešte počas trvania záručnej doby, ktorá je 2 roky alebo viac, od prevzatia tovaru.</strong></p>
<p><strong>14.3.1.7</strong> <strong>POUČENIE O PRÁVACH DOTKNUTEJ OSOBY</strong><br /> Ako dotknutá osoba máte:<br /> - právo požadovať od prevádzkovateľa <strong>prístup</strong> k osobným údajom týkajúcich sa Vašej osoby,<br /> - právo na <strong>opravu</strong> Vašich osobných údajov,<br /> - právo na <strong>vymazanie</strong> Vašich osobných údajov alebo<br /> - právo na <strong>obmedzenie</strong> spracúvania osobných údajov,<br /> - právo <strong>namietať</strong> spracúvanie osobných údajov, ako aj<br /> - právo na <strong>prenosnosť</strong> osobných údajov,<br /> - právo podať <strong>sťažnosť dozornému orgánu</strong> - právo podať návrh na začatie konania podľa &sect;100, Zákona č. 18/2018 Z. z..<br /> Svoje práva môžete uplatniť písomne na adresu sídla prevádzkovateľa alebo na E - Mailovú adresu: <strong><a href="https://web.archive.org/web/20180908030722/mailto:sales@worlds.sk">sales@worlds.sk</a></strong></p>
<p><strong>14.3.1.8</strong> <strong>POSKYTNUTIE VAŠÍCH OSOBNÝCH ÚDAJOV JE</strong><br /> - Požiadavkou, ktorá je potrebná na uzavretie a realizáciu kúpnej zmluvy uzavretej cez E - Shop.<br /> V prípade, že máte záujem o kúpu tovaru cez náš E - Shop, je potrebné, aby ste nám poskytli osobné údaje, ktoré sú nevyhnutne potrebné pre realizáciu kúpnej zmluvy. Následkom neposkytnutia Vašich osobných údajov je nemožnosť uzavrieť a realizovať kúpnu zmluvu cez E - Shop, iné následky nie sú.</p>
<p><strong>14.3.1.9</strong> <strong>AUTOMATIZOVANÉ ROZHODOVANIE VRÁTANE PROFILOVANIA NIE JE</strong><br /> Prevádzkovateľ pri spracúvaní osobných údajov pre daný účel <strong>nepoužíva</strong> automatizované individuálne rozhodovanie, ani profilovanie.</p>
<p><strong>14.3.2</strong> <strong>IS ODBER NOVINIEK/NEWSLETTER</strong></p>
<p><strong>14.3.2.1</strong> <strong>ÚČEL SPRACÚVANIA OSOBNÝCH ÚDAJOV</strong><br /> Informovanie o rôznych akciách, novinkách, tovare a činnostiach prevádzkovateľa ( zasielanie newsletterov - spravodajov ).</p>
<p><strong>14.3.2.2</strong> <strong>ROZSAH SPRACÚVANÝCH OSOBNÝCH ÚDAJOV</strong><br /> E - Mailová adresa, Meno a Priezvisko.</p>
<p><strong>14.3.2.3</strong> <strong>PRÁVNY ZÁKLAD SPRACÚVANIA OSOBNÝCH ÚDAJOV</strong><br /> <strong>Súhlas</strong> so spracúvaním svojich osobných údajov - &sect; 13ods.1 písm. a) Zákona č. 18/2018 Z. z..</p>
<p><strong>14.3.2.4</strong> <strong>PRÍJEMCA OSOBNÝCH ÚDAJOV</strong><br /> <strong>Príjemca v tretej krajine alebo medzinárodnej organizácii</strong><br /> - Nie je.<br /> <strong>Príjemca v členskom štáte ( EÚ + EHP )</strong><br /> - Poskytovateľ webhostingu,<br /> - Poskytovateľ IT servisu/údržby.</p>
<p><strong>14.3.2.5</strong> <strong>PRENOS OSOBNÝCH ÚDAJOV DO TRETEJ KRAJINY ALEBO MEDZINÁRODNEJ ORGANIZÁCIE</strong><br /> - Nie je a ani sa nezamýšľa.</p>
<p><strong>14.3.2.6</strong> <strong>DOBA UCHOVÁVANIA OSOBNÝCH ÚDAJOV</strong><br /> <strong>Po dobu trvania záujmu o odber noviniek. Ak si klient bude priať zrušiť odber noviniek, prestanú sa mu zasielať newslettery - spravodaje a jeho OÚ v databáze sa vymažú.</strong></p>
<p><strong>14.3.2.7</strong> <strong>POUČENIE O PRÁVACH DOTKNUTEJ OSOBY</strong><br /> Ako dotknutá osoba máte:<br /> - právo požadovať od prevádzkovateľa <strong>prístup</strong> k osobným údajom týkajúcich sa Vašej osoby,<br /> - právo na <strong>opravu</strong> Vašich osobných údajov,<br /> - právo na <strong>vymazanie</strong> Vašich osobných údajov alebo<br /> - právo na <strong>obmedzenie</strong> spracúvania osobných údajov,<br /> - právo <strong>namietať</strong> spracúvanie osobných údajov, ako aj<br /> - právo na <strong>prenosnosť</strong> osobných údajov,<br /> - právo podať <strong>sťažnosť dozornému orgánu</strong> - právo podať návrh na začatie konania podľa &sect;100, Zákona č. 18/2018 Z. z..<br /> Svoje práva môžete uplatniť písomne na adresu sídla prevádzkovateľa alebo na E - Mailovú adresu: <strong><a href="https://web.archive.org/web/20180908030722/mailto:sales@worlds.sk">sales@worlds.sk</a></strong></p>
<p><strong>14.3.2.8</strong> <strong>POUČENIE O PRÁVE KEDYKOĽVEK ODVOLAŤ SVOJ SÚHLAS</strong><br /> Máte právo svoj súhlas so spracovaním osobných údajov týkajúci sa odberu noviniek kedykoľvek odvolať, a to prostredníctvom checkboxu - zaškrtávacieho políčka <strong>Odoberanie spravodaja</strong> po prihlásení sa do Vášho účtu, kde:<br /> - Zaškrtnutím súhlasíte s odberom Spravodaja,<br /> - Zrušením začiarknutia políčka zrušíte Odber Spravodaja,<br /> Oznámenie o prihlásení alebo zrušení odoberania Spravodaja Vám bude doručené na Váš E-Mail<br /> Alebo písomne na adresu sídla prevádzkovateľa alebo na E - Mailovú adresu: <strong><a href="https://web.archive.org/web/20180908030722/mailto:sales@worlds.sk">sales@worlds.sk</a></strong><br /> Odvolanie súhlasu nemá vplyv na zákonnosť spracúvania osobných údajov založenom na súhlase pred jeho odvolaním.</p>
<p><strong>14.3.2.9</strong> <strong>POSKYTNUTIE VAŠÍCH OSOBNÝCH ÚDAJOV JE DOBROVOĽNÉ</strong><br /> V prípade, že máte záujem o odber noviniek, budeme potrebovať Váš E - Mail, aby sme Vám mohli zasielať elektronické správy - newsletter. Následkom neposkytnutia E - Mailovej adresy je nemožnosť zasielať Vám elektronické správy - newsletter, iné následky nie sú.</p>
<p><strong>14.3.2.10</strong> <strong>AUTOMATIZOVANÉ ROZHODOVANIE VRÁTANE PROFILOVANIA NIE JE</strong><br /> Prevádzkovateľ pri spracúvaní osobných údajov pre daný účel <strong>nepoužíva</strong> automatizované individuálne rozhodovanie, ani profilovanie.</p>
<p><strong>14.3.3.</strong> <strong>IS REGISTRÁCIA NA E - SHOPE ( BEZ NÁKUPU )</strong></p>
<p><strong>14.3.3.1</strong> <strong>ÚČEL SPRACÚVANIA OSOBNÝCH ÚDAJOV</strong><br /> Urýchliť a uľahčiť prípadný, ale hlavne opakovaný nákup, tak aby kupujúci nemusel opakovane, pri každom nákupe opätovne vypĺňať registračné údaje.</p>
<p><strong>14.3.3.2</strong> <strong>ROZSAH SPRACÚVANÝCH OSOBNÝCH ÚDAJOV</strong><br /> Titul, meno, priezvisko, adresa bydliska, adresa na doručenie tovaru, E - Mailová adresa, telefónne číslo.</p>
<p><strong>14.3.3.3</strong> <strong>PRÁVNY ZÁKLAD SPRACÚVANIA OSOBNÝCH ÚDAJOV</strong><br /> <strong>Súhlas</strong> so spracúvaním svojich osobných údajov - &sect; 13ods.1 písm. a) Zákona č. 18/2018 Z. z..</p>
<p><strong>14.3.3.4</strong> <strong>PRÍJEMCA OSOBNÝCH ÚDAJOV</strong><br /> <strong>Príjemca v tretej krajine alebo medzinárodnej organizácii</strong><br /> - Nie je.<br /> <strong>Príjemca v členskom štáte ( EÚ + EHP )</strong><br /> - Poskytovateľ webhostingu,<br /> - Poskytovateľ IT servisu/údržby.</p>
<p><strong>14.3.3.5</strong> <strong>PRENOS OSOBNÝCH ÚDAJOV DO TRETEJ KRAJINY ALEBO MEDZINÁRODNEJ ORGANIZÁCIE</strong><br /> - Nie je a ani sa nezamýšľa.</p>
<p><strong>14.3.3.6</strong> <strong>DOBA UCHOVÁVANIA OSOBNÝCH ÚDAJOV</strong><br /> Po dobu trvania záujmu o registráciu. Ak si klient bude priať zrušiť registráciu, jeho OÚ v databáze sa vymažú.<br /> <strong>Avšak, ak si klient objednal alebo kúpil nejaký tovar cez E - Shop a pre tento účel je registrovaný v E - Shope, ostávajú jeho údaje v databáze E - Shopu po dobu realizácie kúpnej zmluvy a ešte počas trvania Záručnej doby, ktorá je 2 roky od prevzatia tovaru, prípadne viac, ak je Záručná doba dlhšia, ako je zákonom stanovená.</strong></p>
<p><strong>14.3.3.7</strong> <strong>POUČENIE O PRÁVACH DOTKNUTEJ OSOBY</strong><br /> Ako dotknutá osoba máte:<br /> - právo požadovať od prevádzkovateľa <strong>prístup</strong> k osobným údajom týkajúcich sa Vašej osoby,<br /> - právo na <strong>opravu</strong> Vašich osobných údajov,<br /> - právo na <strong>vymazanie</strong> Vašich osobných údajov alebo<br /> - právo na <strong>obmedzenie</strong> spracúvania osobných údajov,<br /> - právo <strong>namietať</strong> spracúvanie osobných údajov, ako aj<br /> - právo na <strong>prenosnosť</strong> osobných údajov,<br /> - právo podať <strong>sťažnosť dozornému orgánu</strong> - právo podať návrh na začatie konania podľa &sect;100, Zákona č. 18/2018 Z. z..<br /> Svoje práva môžete uplatniť písomne na adresu sídla prevádzkovateľa alebo na E - Mailovú adresu: <strong><a href="https://web.archive.org/web/20180908030722/mailto:sales@worlds.sk">sales@worlds.sk</a></strong><br /> Zároveň Vás žiadame, aby ste Vaše osobné údaje v prípade ich zmeny aktualizovali bez zbytočného odkladu, a to prostredníctvom <strong>Zmeny údajov</strong> po prihlásení sa do Vášho účtu, tak aby spracúvané osobné údaje boli správne a aktuálne.</p>
<p><strong>14.3.3.8</strong> <strong>POUČENIE O PRÁVE KEDYKOĽVEK ODVOLAŤ SVOJ SÚHLAS</strong><br /> Máte právo svoj súhlas so spracovaním osobných údajov týkajúci sa registrácie kedykoľvek odvolať, a to prostredníctvom tlačidla <strong>Zmazať účet</strong> po prihlásení sa do Vášho účtu alebo písomne na adresu sídla prevádzkovateľa alebo na E - Mailovú adresu: <strong><a href="https://web.archive.org/web/20180908030722/mailto:sales@worlds.sk">sales@worlds.sk</a></strong><br /> Takisto máte právo požiadať o <strong>Anonymizáciu ( zašifrovanie )</strong> Vašich osobných údajov. Odvolanie súhlasu nemá vplyv na zákonnosť spracúvania osobných údajov založenom na súhlase pred jeho odvolaním.</p>
<p><strong>14.3.3.9</strong> <strong>POSKYTNUTIE VAŠÍCH OSOBNÝCH ÚDAJOV JE DOBROVOĽNÉ</strong><br /> V prípade, že máte záujem o registráciu, budeme potrebovať Váš E - Mail a identifikačné a kontaktné údaje, aby sme Vás mohli registrovať. Následkom neposkytnutia osobných údajov je nemožnosť registrovať Vás, <strong>iné následky nie sú.</strong></p>
<p><strong>14.3.3.10</strong> <strong>AUTOMATIZOVANÉ ROZHODOVANIE VRÁTANE PROFILOVANIA NIE JE</strong><br /> Prevádzkovateľ pri spracúvaní osobných údajov pre daný účel <strong>nepoužíva</strong> automatizované individuálne rozhodovanie, ani profilovanie.</p>
<p><strong>14.3.4.</strong> <strong>IS COOKIES</strong></p>
<p><strong>14.3.4.1</strong> <strong>ÚČEL SPRACÚVANIA OSOBNÝCH ÚDAJOV</strong><br /> Súbory Cookies nám umožňujú skvalitňovať a prispôsobovať služby poskytované prostredníctvom nášho E - Shopu</p>
<p><strong>14.3.4.2</strong> <strong>ROZSAH SPRACÚVANÝCH OSOBNÝCH ÚDAJOV</strong><br /> <strong> 1. Cokies, ktoré slúžia na zjednodušenie prihlásenia na našu stránku. Zákazník, napr. nemusí vypĺňať vždy svoje prihlasovacie meno.</strong><br /> <strong> 2. Uloženie histórie nákupného košíka konkrétneho užívateľa, napr. položky, ktoré ste mali uložené v nákupnom košíku. Zákazník aj po odhlásení sa zo svojho účtu a opätovnom prihlásení má v Nákupnom košíku položky, ktoré si tam pred tým pridal.</strong><br /> 3. Cookies, ktoré slúžia pre správne zobrazovanie našich stránok a zlepšenie procesu nákupu.<br /> 4. Cookies, ktoré sa používajú pre analýzu návštevnosti a aký tovar zákazníci vyhľadávajú.<br /> 5. Cookies, ktoré sa používajú pre správne zobrazenie reklamy.<br /> 6. Cokies, ktorými sa vykonáva identifikácia On-line prihlásených používateľov našich stránok.</p>
<p><strong>14.3.4.3</strong> <strong>PRÁVNY ZÁKLAD SPRACÚVANIA OSOBNÝCH ÚDAJOV</strong><br /> <strong>Súhlas</strong> so spracúvaním svojich osobných údajov - &sect; 13ods.1 písm. a) Zákona č. 18/2018 Z. z..</p>
<p><strong>14.3.4.4</strong> <strong>PRÍJEMCA OSOBNÝCH ÚDAJOV</strong><br /> <strong>Príjemca v tretej krajine alebo medzinárodnej organizácii</strong><br /> - Nie je.<br /> <strong>Príjemca v členskom štáte ( EÚ + EHP )</strong><br /> - Poskytovateľ webhostingu,<br /> - Poskytovateľ IT servisu/údržby.</p>
<p><strong>14.3.4.5</strong> <strong>PRENOS OSOBNÝCH ÚDAJOV DO TRETEJ KRAJINY ALEBO MEDZINÁRODNEJ ORGANIZÁCIE</strong><br /> - Nie je a ani sa nezamýšľa.</p>
<p><strong>14.3.4.6</strong> <strong>DOBA UCHOVÁVANIA OSOBNÝCH ÚDAJOV</strong><br /> <strong>24 hodín</strong></p>
<p><strong>14.3.4.7</strong> <strong>POUČENIE O PRÁVACH DOTKNUTEJ OSOBY</strong><br /> Ako dotknutá osoba máte:<br /> - právo požadovať od prevádzkovateľa <strong>prístup</strong> k osobným údajom týkajúcich sa Vašej osoby,<br /> - právo na <strong>opravu</strong> Vašich osobných údajov,<br /> - právo na <strong>vymazanie</strong> Vašich osobných údajov alebo<br /> - právo na <strong>obmedzenie</strong> spracúvania osobných údajov,<br /> - právo <strong>namietať</strong> spracúvanie osobných údajov, ako aj<br /> - právo na <strong>prenosnosť</strong> osobných údajov,<br /> - právo podať <strong>sťažnosť dozornému orgánu</strong> - právo podať návrh na začatie konania podľa &sect;100, Zákona č. 18/2018 Z. z..<br /> Svoje práva môžete uplatniť písomne na adresu sídla prevádzkovateľa alebo na E - Mailovú adresu: <strong><a href="https://web.archive.org/web/20180908030722/mailto:sales@worlds.sk">sales@worlds.sk</a></strong></p>
<p><strong>14.3.4.8</strong> <strong>POSKYTNUTIE VAŠÍCH OSOBNÝCH ÚDAJOV JE DOBROVOĽNÉ</strong><br /> V prípade, že nesúhlasíte so sledovaním cookies, Vaše OÚ sa nebudú pre daný účel spracúvať a nemá to žiaden dopad/následky na možnosti Vášho nakupovanie na našom E - Shope.</p>
<p><strong>14.3.4.9</strong> <strong>AUTOMATIZOVANÉ ROZHODOVANIE VRÁTANE PROFILOVANIA NIE JE</strong><br /> Prevádzkovateľ pri spracúvaní osobných údajov pre daný účel <strong>nepoužíva</strong> automatizované individuálne rozhodovanie, ani profilovanie.</p>
</dd><dt></dt></dl>
<p><strong>Článok 15</strong></p>
<dl><dt id="answer15"></dt><dd>
<p><strong>ZÁVEREČNÉ USTANOVENIE</strong></p>
<p><strong>15.1.</strong> <strong>Informácia o dĺžke trvania zmluvy a o minimálnej dĺžke trvania záväzkov spotrebiteľa</strong><br /> Zmluvy uzatvárané prostredníctvom nášho E - Shopu majú charakter spotrebiteľskej kúpnej zmluvy alebo zmluvy o poskytnutí služby. Najčastejší spôsob zániku tejto zmluvy je splnením záväzkov oboch zmluvných strán. Predávajúci má povinnosť dohodnutý tovar alebo službu kupujúcemu riadne a včas dodať a kupujúci má povinnosť dohodnutý tovar alebo službu prevziať a zaplatiť zaň predávajúcemu dohodnutú cenu. Uvedené zmluvy môžu tiež zaniknúť všeobecnými spôsobmi zániku záväzku, a to najmä odstúpením od zmluvy. V uvedených prípadoch nejde o zmluvu, pri ktorej sa automaticky predlžuje jej platnosť.</p>
<p><strong>15.2</strong> Naša spoločnosť zatiaľ nemá vytvorený kódex správania.</p>
<p><strong>15.3</strong> Všetky vzťahy vznikajúce medzi predávajúcim a kupujúcim sa riadia právnymi predpismi Slovenskej republiky. Vo veciach neupravovaných týmito Všeobecnými obchodnými podmienkami sa uplatnia príslušné ustanovenia zák. č. 102/2014 Z. z. o ochrane spotrebiteľa pri predaji tovaru alebo poskytovaní služieb na základe zmluvy uzavretej na diaľku alebo zmluvy uzavretej mimo prevádzkových priestorov predávajúceho a o zmene a doplnení niektorých zákonov, Občianskeho zákonníka a Zákonom č. 250/2007 Z. z. o ochrane spotrebiteľa a o zmene Zákona Slovenskej národnej rady č. 372/1990 Zb. o priestupkoch v znení neskorších predpisov.</p>
<p><strong>15.4</strong> <strong> Tieto VOP sa nevzťahujú na podnikateľov</strong> ( právnické osoby, SZČO ) t. j. na osoby, ktoré pri uzatváraní a plnení zmluvy konajú v rámci predmetu svojej podnikateľskej činnosti, zamestnania alebo povolania. Tieto obchodné záväzkové vzťahy sa riadia príslušnými ustanoveniami Obchodného zákonníka, najmä ustanoveniami Kúpnej zmluvy ( &sect;409 a nasl. ). Podnikatelia si preto nemôžu uplatňovať tzv. spotrebiteľské práva, na ktoré majú nárok len spotrebitelia. Predávajúci vyhlasuje, že na tovar zakúpený prostredníctvom nášho E - Shopu sa vzťahuje záruka za akosť v trvaní 12 mesiacov.</p>
<p><strong>15.5</strong> Predávajúci si vyhradzuje právo tieto všeobecné obchodné podmienky zmeniť v prípade legislatívnych zmien.</p>
<p><strong>15.6</strong> <strong> Všeobecné obchodné podmienky sú platné s účinnosťou od 25.5.2018.</strong></p>
<p><strong>15.7</strong> Okamihom keď kupujúci na stránkach elektronického obchodu <strong><a href="https://web.archive.org/web/20180908030722/https://worlds.sk/" target="_blank">WORLD'S</a></strong> klikne na tlačidlo <strong>Objednávka s povinnosťou platby,</strong> má sa za to, že kupujúci sa riadne oboznámil so Všeobecnými obchodnými podmienkami, tieto si preštudoval, zobral ich na vedomie a dobrovoľne sa rozhodol uzavrieť zmluvu na diaľku. VOP sa týmto stávajú neoddeliteľnou súčasťou dohody zmluvných strán.</p>
</dd><dt></dt></dl>
<p><strong>Článok 16</strong></p>
<dl><dt id="answer16"></dt><dd>
<p><strong>PRÍLOHY</strong></p>
<p style="text-align: center;"><strong>VZOROVÝ FORMULÁR NA ODSTÚPENIE OD ZMLUVY</strong></p>
<p style="text-align: center;"><strong>(vyplňte a zašlite tento formulár len v prípade, že si želáte odstúpiť od zmluvy)</strong></p>
<p>Vzorový formulár na odstúpenie od Zmluvy si môžete stiahnuť aj kliknutím na tento odkaz: <strong><a href="https://web.archive.org/web/20180908030722/http://worlds.sk/documentsworlds/odstupenieodzmluvy.doc"> Vzorový formulár na odstúpenie od Zmluvy</a>.</strong></p>
<p><strong>Komu: ETHOS Technology, s.r.o.</strong></p>
<p>Sídlo: Tatranská 6396/101, Banská Bystrica 974 11</p>
<p>IČO: 44 099 207</p>
<p>Telefónne číslo: +421 907 837 484</p>
<p>E-mail: sales@worlds.sk</p>
<p><strong>(V prípade spotrebiteľskej kúpnej zmluvy, ktorej predmetom je dodanie tovaru, vyplňte nasledovné)</strong></p>
<p>Týmto oznamujem/oznamujeme*, že odstupujem/odstupujeme* od zmluvy na tento tovar:</p>
<p>......................................................................................................................................................</p>
<p>Dátum prijatia tovaru: ..................................</p>
<p><strong>( V prípade zmluvy o zhotovení veci na zákazku, vyplňte nasledovné )</strong></p>
<p>Týmto oznamujem/oznamujeme*, že odstupujem/odstupujeme* od zmluvy o zhotovení na zákazku tejto veci:</p>
<p>.......................................................................................................................................................</p>
<p>Dátum objednania zhotovenia veci na zákazku: .........................................................</p>
<p>Meno a priezvisko spotrebiteľa/spotrebiteľov*:.......................................................................................</p>
<p>Adresa spotrebiteľa/spotrebiteľov*:...........................................................................................................</p>
<p>Podpis spotrebiteľa: .................................................</p>
<p><strong>( Iba ak sa tento formulár podáva v listinnej podobe )</strong></p>
<p>Dátum: ..................................................</p>
<p>* Nehodiace sa prečiarknite.</p>
<p style="text-align: center;"><strong>VZOROVÝ FORMULÁR NA ALTERNATÍVNE RIEŠENIE SPORU</strong></p>
<p style="text-align: center;"><strong>Návrh na začatie Alternatívneho riešenia sporu</strong></p>
<p>Vzorový formulár na Alternatívne riešenie sporu si môžete stiahnuť aj tu, kliknutím na tento Odkaz:<strong><a href="https://web.archive.org/web/20180908030722/http://worlds.sk/documentsworlds/alternativneriesenie.doc"> Vzorový formulár na Alternatívne riešenie sporu</a>.</strong></p>
<p><strong>Údaje o spotrebiteľovi</strong></p>
<p>Meno a priezvisko:</p>
<p>Bydlisko:</p>
<p>Adresa na doručovanie:</p>
<p>E - Mailová adresa:</p>
<p>Telefonický kontakt:</p>
<p><strong>Údaje o predávajúcom</strong></p>
<p>Obchodné meno/Názov:</p>
<p>Miesto podnikania/Sídlo:</p>
<p>Identifikačné číslo:</p>
<p>E - Mailová adresa:</p>
<p>Webová stránka:</p>
<p>Telefonický kontakt:</p>
<p><strong>Detail prípadu</strong></p>
<p>Dátum nákupu/Podpisu Zmluvy:</p>
<p>Dátum dodania:</p>
<p>Miesto nákupu:</p>
<p>Cena tovaru alebo služby:</p>
<p>Spôsob platby (1):</p>
<p>Spôsob predaja (2):</p>
<p>1 Napríklad bankový prevod, hotovosť, šek, kreditná karta alebo debetná karta.</p>
<p>2 Napríklad predajňa, elektronický obchod, iný predaj na diaľku ( ponukový katalóg, telefón ), podomový predaj, predajná akcia, trh/veľtrh, aukcie alebo internetové aukcie.</p>
</dd><dt></dt></dl>` }} />
          </div>
        ) : (
          <div>
            <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-200 text-xs text-amber-900 mb-6 font-medium">
              Tieto obchodné podmienky upravujú vzťah medzi predávajúcim a kupujúcim – podnikateľom (B2B) v zmysle Obchodného zákonníka SR.
            </div>
            <div dangerouslySetInnerHTML={{ __html: `<div className="page-title">
<h1>VŠEOBECNÉ OBCHODNÉ PODMIENKY PRE PODNIKATEĽOV</h1>
</div>
<ul className="disc">
<li><a href="#answer1">ÚVODNÉ USTANOVENIA</a></li>
<li><a href="#answer2">VYMEDZENIE POJMOV</a></li>
<li><a href="#answer3">ZMLUVNÉ STRANY</a></li>
<li><a href="#answer4">PREDMET ZMLUVY</a></li>
<li><a href="#answer5">MNOŽSTVO, AKOSŤ, VYHOTOVENIE TOVARU</a></li>
<li><a href="#answer6">KÚPNA CENA</a></li>
<li><a href="#answer7">MIESTO DODANIA TOVARU</a></li>
<li><a href="#answer8">ČAS DODANIA TOVARU</a></li>
<li><a href="#answer9">PLATOBNÉ PODMIENKY, POPLATKY ZA PREPRAVU, BALNÉ A MOŽNOSTI PLATIEB</a></li>
<li><a href="#answer10">POPLATKY ZA PREPRAVU</a></li>
<li><a href="#answer11">NADOBUDNUTIE VLASTNÍCKEHO PRÁVA K TOVARU</a></li>
<li><a href="#answer12">OBALY A BALENIE</a></li>
<li><a href="#answer13">DOKLADY VZŤAHUJÚCE SA NA TOVAR</a></li>
<li><a href="#answer14">NEBEZPEČENSTVO ŠKODY NA TOVARE</a></li>
<li><a href="#answer15">ZODPOVEDNOSŤ ZA VADY TOVARU</a></li>
<li><a href="#answer16">ZÁRUKA ZA AKOSŤ</a></li>
<li><a href="#answer17">ZÁVEREČNÉ USTANOVENIA</a></li>
</ul>
<p><strong>Článok 1</strong></p>
<dl><dt id="answer1"></dt><dd>
<p><strong>ÚVODNÉ USTANOVENIA</strong></p>
<p>Tieto všeobecné obchodné podmienky ( ďalej len VOP ) upravujú práva a povinnosti účastníkov <strong>obchodno záväzkového vzťahu, t. j. záväzkové vzťahy medzi podnikateľmi,</strong> ak pri ich vzniku je zrejmé s prihliadnutím na všetky okolnosti, že sa týkajú ich podnikateľskej činnosti. V prípade, že <strong>kupujúcim je podnikateľ</strong> ( nie spotrebiteľ ) <strong>riadi sa zmluvný vzťah príslušnými ustanoveniami Obchodného zákonníka,</strong> najmä ustanoveniami pre Kúpnu zmluvu &sect; 409 a nasl. Obchodného zákonníka. <strong><br />Na podnikateľa sa preto nevzťahujú práva, ktoré má spotrebiteľ.</strong></p>
</dd><dt></dt></dl>
<p><strong>Článok 2</strong></p>
<dl><dt id="answer2"></dt><dd>
<p><strong>VYMEDZENIE POJMOV</strong></p>
<p><strong>2.1</strong> <strong>Podnikateľom</strong> sa podľa &sect;2 ods. 2 Obchodného zákonníka rozumie:<br /> a.) osoba zapísaná v Obchodnom registri,<br /> b.) osoba, ktorá podniká na základe živnostenského oprávnenia,<br /> c.) osoba, ktorá podniká na základe iného než živnostenského oprávnenia podľa osobitných predpisov,<br /> d.) fyzická osoba, ktorá vykonáva poľnohospodársku výrobu a je zapísaná do evidencie podľa osobitného predpisu.</p>
<p><strong>2.2</strong> <strong>Prevádzkovateľom</strong> elektronického/internetového obchodu ( E - Shopu ) <strong><a href="https://web.archive.org/web/20190715201137/https://worlds.sk/" target="_blank">WORLD'S</a></strong> je obchodná spoločnosť <strong>ETHOS Technology, s.r.o.</strong> so sídlom: Tatranská 6396/101, Banská Bystrica, PSČ: 974 11, IČO: 44 099 207.</p>
<p><strong>2.3</strong> <strong>Elektronickou objednávkou</strong> sa rozumie odoslaný elektronický formulár, obsahujúci informácie o kupujúcom, zoznam objednaného tovaru alebo služby z ponuky elektronického obchodu a cenu tohto tovaru, spracovaný elektronickým systémom obchodu.</p>
<p><strong>2.4</strong> <strong>Zmluvou uzavretou na diaľku</strong> sa rozumie zmluva medzi predávajúcim a kupujúcim dohodnutá a uzavretá výlučne prostredníctvom prostriedku diaľkovej komunikácie bez súčasnej fyzickej prítomnosti predávajúceho a kupujúceho s využitím webového sídla, elektronickej pošty alebo telefónu.</p>
<p><strong>2.5</strong> <strong>Zmluvou, predmetom ktorej je predaj tovaru</strong> sa na účely týchto VOP rozumie zmluva, na základe ktorej kupujúci nadobúda vec za odplatu, najmä kúpna zmluva alebo licenčná zmluva predmetom, ktorej je prevod softvérovej licencie.</p>
</dd><dt></dt></dl>
<p><strong>Článok 3</strong></p>
<dl><dt id="answer3"></dt><dd>
<p><strong>ZMLUVNÉ STRANY</strong></p>
<p><strong>3.1 Predávajúci:</strong><br />Obchodné meno: <strong>ETHOS Technology, s.r.o.</strong><br />Právna forma: Spoločnosť s ručením obmedzeným<br />Sídlo: Tatranská 6396/101, Banská Bystrica, PSČ: 974 11<br />IČO: 44 099 207<br />DIČ: 2022595311<br />IČ DPH: SK2022595311<br />Zapísaná v: Obchodnom registri Okresného súdu Banská Bystrica, Oddiel: Sro, Vložka č.: 14726/S<br />Zastúpená: Konateľom PhDr. Ivan Fencl<br /><strong>( Ďalej ako predávajúci )</strong></p>
<p><strong>Prevádzkareň ( Predajňa ): Nie je.</strong></p>
<p><strong>Pracovná doba</strong><br />Pondelok - Piatok 07,00 - 17,00<br />Sobota 07,00 - 13,00<br />Objednávky vytvorené prostredníctvom elektronického systému E - Shop sú prijímané a spracovávané <strong>Nepretržite</strong></p>
<p><strong>Kontaktné údaje:</strong><br />Telefónne číslo: 0907837484<br />E - Mail: <strong><a href="https://web.archive.org/web/20190715201137/mailto:sales@worlds.sk">sales@worlds.sk</a></strong></p>
<p><strong>3.2 Kupujúcim ( objednávateľom )</strong> je:<br /> Podnikateľ - osoba, ktorá v mene podnikateľa odoslala elektronickú objednávku, spracovanú prostredníctvom elektronického systému obchodu.<br /> <strong>( Ďalej ako kupujúci )</strong></p>
<p><strong>( Ďalej spoločne ako zmluvné strany )</strong></p>
</dd><dt></dt></dl>
<p><strong>Článok 4</strong></p>
<dl><dt id="answer4"></dt><dd>
<p><strong>PREDMET ZMLUVY</strong></p>
<p>Predávajúci sa zaväzuje kupujúcemu dodať objednaný tovar, odovzdať doklady, ktoré sa na tovar vzťahujú a umožniť kupujúcemu nadobudnúť vlastnícke právo k tovaru v súlade s týmito VOP. Kupujúci sa zaväzuje objednaný tovar prevziať a zaplatiť zaň predávajúcemu riadne a včas dohodnutú kúpnu cenu.</p>
</dd><dt></dt></dl>
<p><strong>Článok 5</strong></p>
<dl><dt id="answer5"></dt><dd>
<p><strong>MNOŽSTVO, AKOSŤ, VYHOTOVENIE TOVARU</strong></p>
<p>Predávajúci sa zaväzuje kupujúcemu dodaťobjednaný tovar v množstve, akosti a vyhotovení v súlade a v rozsahu elektronickej objednávky, ktorá obsahuje informácie o kupujúcom, o objednanom tovare, jeho množstve, jeho vlastnostiach a cene tohto tovaru. Vlastnosti a popis tovaru je uvedený pri každom tovare ponúkanom v rámci ponuky elektronického obchodu predávajúceho, ktorá má charakter predlohy.</p>
</dd><dt></dt></dl>
<p><strong>Článok 6</strong></p>
<dl><dt id="answer6"></dt><dd>
<p><strong>KÚPNA CENA</strong></p>
<p>Kupujúci sa zaväzuje zaplatiť za dodaný tovar kúpnu cenu, ktorá je uvedená v ponuke elektronického obchodu.<br /> Cena tovaru je uvádzaná v <strong>mene: EUR.</strong> V súlade s príslušným účtovnými právnymi predpismi, si zmluvné strany budú účtovať <strong>kúpnu cenu s alebo bez DPH.</strong></p>
</dd><dt></dt></dl>
<p><strong>Článok 7</strong></p>
<dl><dt id="answer7"></dt><dd>
<p><strong>MIESTO DODANIA TOVARU</strong></p>
<p><strong>7.1</strong> <strong>Ak sa zmluvné strany výslovne nedohodnú inak, dodanie tovaru sa uskutočňuje jeho odovzdaním prvému dopravcovi na prepravu pre kupujúceho podľa &sect; 412 Obchodného zákonníka, predávajúci by mal tovar dostatočne označiť ako zásielku pre kupujúceho podľa &sect; 413, preto aby nastali účinky odovzdania tovaru.</strong></p>
<p><strong>7.2</strong> Ak predávajúci nie je povinný podľa zmluvy dodať tovar v určitom mieste, uskutočňuje sa dodanie tovaru jeho odovzdaním prvému dopravcovi na prepravu pre kupujúceho, ak zmluva určuje odoslanie tovaru predávajúcim. Predávajúci umožní kupujúcemu uplatniť práva z prepravnej zmluvy voči dopravcovi, pokiaľ tieto práva nemá kupujúci na základe prepravnej zmluvy.</p>
<p><strong>7.3</strong> Ak zmluva nemá ustanovenie o odoslaní tovaru predávajúcim a tovar je v zmluve jednotlivo určený alebo určený podľa druhu, ale má byť dodaný z určitých zásob alebo sa má vyrobiť, a strany v čase uzavretia zmluvy vedeli, kde sa nachádza alebo kde sa má vyrobiť, uskutočňuje sa dodanie, keď sa kupujúcemu umožní nakladať s tovarom v tomto mieste</p>
<p><strong>7.4</strong> V prípadoch, na ktoré sa nevzťahujú odseky 2 a 3, splní predávajúci povinnosť dodať tovar tým, že umožní kupujúcemu nakladať s tovarom v mieste, kde má predávajúci svoje sídlo alebo miesto podnikania, prípadne bydlisko alebo organizačnú zložku, ak predávajúci jej miesto včas kupujúcemu oznámi.</p>
<p><strong>7.5</strong> Ak sa dodanie tovaru uskutočňuje jeho odoslaním a tovar odovzdávaný dopravcovi nie je zjavne a dostatočne označený ako zásielka pre kupujúceho, nastanú účinky dodania, len keď predávajúci bez zbytočného odkladu oznámi kupujúcemu odoslanie tovaru a odoslaný tovar v oznámení bližšie určí. Ak tak predávajúci neurobí, uskutočňuje sa dodanie až odovzdaním tovaru dopravcom kupujúcemu.</p>
</dd><dt></dt></dl>
<p><strong>Článok 8</strong></p>
<dl><dt id="answer8"></dt><dd>
<p><strong>ČAS DODANIA TOVARU</strong></p>
<p>Predávajúci sa zaväzuje dodať kupujúcemu objednaný tovar podľa dostupnosti produktov a prevádzkových možností predávajúceho, zvyčajne do 3 až 5 pracovných dní, najneskôr však do 30 dní od záväzného potvrdenia objednávky predávajúcim.<br /> V prípade predĺženia dodacej lehoty z dôvodu, že sa daný tovar už nevyrába alebo nedodáva, alebo sa výrazným spôsobom zmenila jeho cena, alebo došlo k mimoriadnej, nepredvídateľnej, neodvrátiteľnej udalosti budeme o tomto obratom informovať kupujúceho za účelom dohody o ďalšom postupe, a to aj s možnosťou stornovania objednávky, pokiaľ sa zmluvné strany nedohodnú na inom spôsobe riešenia.</p>
</dd><dt></dt></dl>
<p><strong>Článok 9</strong></p>
<dl><dt id="answer9"></dt><dd>
<p><strong>PLATOBNÉ PODMIENKY, POPLATKY ZA PREPRAVU, BALNÉ A MOŽNOSTI PLATIEB</strong></p>
<p>Za tovar a služby zakúpené v E - Shope je možné platiť nasledovnými spôsobmi:<br /> a.) platba na Dobierku - platíte priamo kuriérovi pri preberaní tovaru,<br /> b.) platba pri Osobnom prevzatí - platíte priamo zástupcovi Predávajúceho pri prevzatí tovaru v rámci Banskej Bystrice, po dohode s Predávajúcim, v ktorý deň a na ktoré miesto si žiadate doručiť zakúpený tovar,<br /> c.) platba prostredníctvom Platobnej brány TrustPay a Platobnej brány PayPal,<br /> d.) platba na základe vystavenej Faktúry na tovar alebo služby Predávajúcim.</p>
<p><strong>Platba prostredníctvom Platobnej brány TrustPay</strong></p>
<p>Po presmerovaní na stránku Pokladne si vyberiete či chcete platiť kartou alebo bankovým prevodom.<br /><strong>Na konci Objednávkového procesu, po kliknutí na tlačidlo Objednávka s povinnosťou platby, budete presmerovaný do Platobnej brány TrustPay.</strong><br /> Pri platbe kartou len zadáte požadované údaje a platba bude prevedená.<br /> Pri platbe bankovým prevodom kliknete na logo banky a následne <strong>budete presmerovaný do Internet Bankingu Vašej banky,</strong> kde postupujete štandardným postupom ako pri bežnom prevode.<br /> Pokiaľ nebudete vidieť logo Vašej banky, vyberiete si banku s názvom <strong>Other bank.</strong><br /> Podrobnosti o platbách a bezpečnosti platieb sú uvedené nižšie.</p>
<p><strong>Platba prostredníctvom Platobnej brány PayPal</strong></p>
<p>Po objednaní produktov v našom obchode kliknete na stránke Pokladne na logo Paypal.<br /><strong>Na konci Objednávkového procesu, po kliknutí na tlačidlo Objednávka s povinnosťou platby, budete presmerovaný na Platobnú bránu PayPal.</strong><br /> Platba cez PayPayl je bezpečná. Nemusíte vôbec zadávať svoje údaje kreditnej alebo debetnej karty a napriek tomu môžete jednoducho a hlavne bezpečne nakúpiť tovar. Stačí, keď sa prihlásite do svojho PayPal účtu a prevediete platbu objednaných produktov.<br /> Pokiaľ nemáte PayPal účet, môžete sa zaregistrovať a PayPal účet si vytvoriť, alebo si môžete zvoliť jednorázovú platbu bez registrácie a zadať svoje finančné údaje a platba bude prevedená.<br /> <strong>Platba prostredníctvom PayPal je pre Vás bez akýchkoľvek poplatkov. Poplatky hradí obchodník.</strong></p>
<p><strong>TRUSTPAY</strong></p>
<p>TrustPay je Platobná inštitúcia licencovaná a regulovaná Národnou bankou Slovenska. TrustPay je Platobná inštitúcia licencovaná pre cezhraničné prijímanie platieb kartou.<br /> TrustPay je Člen VISA a MasterCard, Účastník SEPA SCT a člen SWIFT. TrustPay ponúka možnosť zúčtovania platieb v nasledovných menách: EUR, USD, GBP, CAD, JPY, CZK, PLN, HUF.<br /> TrustPay podporuje Procesovanie platieb v akejkoľvek mene. TrustPay podporuje 3D Secure bezpečnostnej autentifikácie pre VISA a MasterCard. TrustPay podporuje službu Multicurrency.<br /> TrustPay platobná brána je dostupná v rámci celého Európskeho hospodárskeho priestoru a spĺňa všetky požiadavky PCI DSS level 1 certifikácie, ktorá zabezpečuje najvyššiu úroveň bezpečnosti Vašich dát.</p>
<p><strong>FAQ - Najčastejšie otázky</strong></p>
<p><strong>Zoznam v súčasnosti podporovaných bánk</strong></p>
<p><strong>Slovensko</strong><br />Tatra Banka, Slovenská sporiteľňa, VÚB, ČSOB, Poštová banka, TrustPay, Other Bank.</p>
<p><strong>TrustPay platobná brána &ndash; zákazník/používateľ</strong><br />Musím mať v TrustPay účet?<br />Nie</p>
<p><strong>Ako prostredníctvom TrustPay zaplatím?</strong><br /> Na stránke Obchodníka si vyberiete možnosť platby &ndash; buď kartou alebo prevodom.</p>
<p><strong>Platba kartou</strong><br /> Po presmerovaní na TrustPay bránu len zadáte požadované údaje z karty.</p>
<p><strong>Platba prevodom</strong><br /> Po presmerovaní na TrustPay bránu si vyberiete banku, v ktorej máte vedený účet &ndash; kliknete na logo banky. Vyberiete <strong>Zaplatiť teraz.</strong><br /> Po presmerovaní do Internet Bankingu Vašej banky len pokračujete v potvrdení platby ako pri inom bežnom prevode peňazí.<br /> ( V niektorých bankách nájdete prevodný príkaz už pred vyplnený, niekde bude potrebné, aby ste platobné údaje do príkazu vyplnili. ).</p>
<p><strong>Pri platbe prevodom TrustPay brána nezobrazuje moju banku. Ako mám zaplatiť?</strong><br /> Po presmerovaní na TrustPay bránu si vyberte banku s názvom <strong>Other bank.</strong><br /> TrustPay brána Vám zobrazí platobné inštrukcie. Tieto údaje použijete pri zadávaní prevodu vo Vašej banke. V tomto prípade však platba nemusí byť okamžitá a môže trvať niekoľko dní, kým budú Obchodníkovi peniaze na účet pripísané.</p>
<p><strong>Prečo mám platiť prevodom cez TrustPay?</strong><br /> Prevod cez TrustPay je okamžitý. t.j. Obchodník je v rozmedzí 2 minút až 2 hodín o platbe informovaný a vie Vám zaplatený tovar alebo službu bez odkladu poskytnúť.</p>
<p><strong>V akej mene môžem platiť?</strong><br /> <strong>Platba kartou</strong><br /> Nezáleží v akej mene budete kartou platiť. Obchodníkovi bude platba pripísaná v mene, ktorú má predvolenú.</p>
<p><strong>Platba prevodom</strong><br /> Je potrebné platiť v mene, v ktorej má obchodník stanovené ceny v pokladni. ( Výnimky: Ak obchodník využíva službu Multicurrency, TrustPay brána Vám po zmene výberu krajiny, zobrazí lokálne banky a môžete zaplatiť aj v lokálnej mene. Takýto prevod bude stále okamžitý. ).</p>
<p><strong>Koľko ma to bude stáť, ak zaplatím cez TrustPay?</strong><br /> TrustPay Vám &ndash; platiacemu zákazníkovi &ndash; neúčtuje poplatok, ak platíte prostredníctvom TrustPay brány.</p>
<p><strong>Je bezpečné platiť cez TrustPay?</strong><br /> TrustPay je regulovaný Národnou bankou Slovenska a je členom VISA, Mastercard a UnionPay. Platobné operácie sa odohrávajú na zabezpečených certifikovaných platformách spĺňajúcich tie najvyššie PCI DSS štandardy bezpečnosti.<br /> Pri platbe prevodom sú všetky zadávané citlivé informácie ( prihlasovacie údaje k Vášmu účtu, heslá a pod. ) zadávané a aj samotné potvrdenie platby vykonávané v bezpečnom prostredí Internet Bankingu Vašej banky, nie na TrustPay bráne. Obchodník a ani TrustPay k týmto údajom nemá prístup.<br /> Pri platbe kartou sú citlivé údaje z karty ( číslo karty, CVV kód a dátum expirácie ) po potvrdení platby automaticky zašifrované. Obchodník a ani TrustPay k týmto údajom nemá prístup.</p>
<p><strong>Môžem cez TrustPay platiť kartou?</strong><br /> Áno, stačí, ak vlastníte kartu typu VISA alebo MasterCard.</p>
<p><strong>Môžem cez TrustPay platiť v hotovosti?</strong><br /> Nie.</p>
<p><strong>Môžem cez TrustPay platiť šekovou poukážkou?</strong><br /> Nie. TrustPay nepodporuje platby šekovou poukážkou.</p>
<p><strong>BRÁNA TRUSTPAY &ndash; ZÁKAZNÍCKA PODPORA</strong></p>
<p><strong>Som zákazník a zaplatil som prostredníctvom TrustPay.</strong></p>
<p><strong>Zaplatil som cez TrustPay ale obchodník mi neposkytol tovar/službu.</strong></p>
<p>a.) V prípade, že ste vyplnili všetky údaje vo Vašej platbe, platba bola spracovaná úspešne a obchodník dostal Vaše peniaze. V takomto prípade je potrebné obrátiť sa priamo na obchodníka.<br /> b.) V prípade, že ste zabudli vyplniť niektoré údaje vo Vašej platbe, Vaša platba mohla skončiť v našom systéme ako neidentifikovateľná. Takúto platbu nie je možné manuálne identifikovať. Takéto platby sú preto automaticky vrátené odosielateľovi do 3 pracovných dní ( prosím nezabudnite, že samotná platba môže trvať niekoľko dní ).</p>
<p><strong>Zaplatil som cez TrustPay a chcem svoje peniaze späť.</strong></p>
<p>V prípade, že ste vyplnili všetky údaje Vašej platby, platba bola úspešne spracovaná a obchodník dostal peniaze. V takomto prípade je potrebné obrátiť sa priamo na obchodníka.</p>
<p><strong>PAYPAL</strong></p>
<p>PayPal môže zákazník už využívať aj v slovenčine a nakupovať tak doma alebo v zahraničí ešte jednoduchšie.<br /> Ak si zákazník vyberie spôsob platby prostredníctvom PayPal, na konci objednávkového procesu po stlačení tlačidla <strong>Objednávka s povinnosťou platby,</strong> bude presmerovaný na bezpečnú stránku Paypal. Pokiaľ zákazník nemá účet, vyplní v platobnou formulári požadované údaje a Platba bude prevedená. Pokiaľ zákazník má PayPal účet, prihlási sa zadaním svojho E - Mailu a Hesla a prevedie platbu podľa inštrukcií.<br /> <strong>Kupujúci ešte pred zaplatením kúpnej ceny, má možnosť sa vrátiť na stránku obchodníka a platba za tovar bude zrušená.</strong><br /> Na zaplatenie kúpnej ceny za tovar prostredníctvom PayPal nemusí zákazník mať svoj Paypal účet. Pokiaľ má svoj PayPal účet, nemusí mať na svojom PayPal účte žiadne finančné prostriedky.<br /> Službu PayPal je možné využiť na bezpečné platenie tovarov a služieb platobnou kartou na internete.<br /> Za tovar zaplatíte jednoducho svojou platobnou kartou, ale číslo Vašej platobnej karty obchodník u ktorého platíte za tovar nebude vidieť. Na serveroch a u obchodníkov sa číslo Vašej platobnej karty neobjaví a obchodník ani tretia strana ho nebude poznať.<br /> Platbu môže kupujúci realizovať aj prostredníctvom akéhokoľvek mobilného zariadenie, s ktorým sa je možné pripojiť na internet a ktoré má aplikáciu Paypal.<br /> Posielanie platieb cez PayPal je bezpečnejšie než nosenie hotovosti či poskytovanie finančných údajov predajcovi. Každá transakcia spĺňajúca príslušné kritériá je chránená pokročilým šifrovaním a nepretržitým monitorovaním podvodov.</p>
<p><strong>Platenie cez PayPal účet</strong></p>
<p>Platba prebehne tak, že suma bude stiahnutá z Vášho bankového konta prostredníctvom platobnej karty ( tak, akoby ste platili kartou v kamennom obchode ). Tak je zaistené, že v podstate zaplatíte platobnou kartou, ale jej číslo nemusíte poskytovať obchodníkovi, na ktorého E - Shope nakupujete.<br /> Peniaze môžete poslať na akýkoľvek PayPal účet, alebo dokonca len na E - Mailovú adresu. <strong>Za platby cez PayPal účet neplatíte žiadne poplatky. Poplatky platí príjemca platieb.</strong><br /> Platbu môže kupujúci realizovať aj v inej mene, tu si však môže spoločnosť PayPal účtovať poplatok za prepočet Meny.</p>
<p>PayPal kupujúcemu neúčtuje žiadne skryté poplatky, ani poplatky za spracovanie platby.<br /> Za hlavnú výhodu tejto služby možno označiť to, že pokiaľ kupujúci má svoj PayPal účet, pri platení cez internet nemusí používať osobné údaje z debetnej, alebo kreditnej karty. Stačí poznať svoju E - Mailovú adresu a Heslo. Kupujúci si nemusí pamätať čísla svojich platobných kariet ani tajné kódy. Znamená to, že obchodovanie cez systém PayPal je úplne anonymné.<br /> Kupujúci príjemcovi neposkytuje svoje finančné údaje. Všetky osobné údaje má k dispozícií iba spoločnosť PayPal a žiadnym tretím stranám ich neposkytuje. Celý systém je prepojený len pomocou E - Mailových adries, ktoré vystupujú pri transakciách ako jediné identifikačné údaje.<br /> Zo všetkými ďalšími informáciami o platbách prostredníctvom PayPal, sa kupujúci môže oboznámiť na stránke <strong><a href="https://web.archive.org/web/20190715201137/https://www.paypal.com/sk/home" target="_blank">PAYPAL</a></strong></p>
<p><strong>9.1</strong> Doplatky pre jednotlivé možnosti platieb sú uvedené v bode 10 týchto VOP.</p>
<p><strong>9.2</strong> Pokiaľ nebude splatná cena za dodané výrobky uhradená v plnej výške, má predávajúci právo prerušiť ďalšie dodávky tovaru do doby, kedy bude splatná cena uhradená v plnej výške.</p>
</dd><dt></dt></dl>
<p><strong>Článok 10</strong></p>
<dl><dt id="answer10"></dt><dd>
<p><strong>POPLATKY ZA PREPRAVU</strong></p>
<p><strong>10.1</strong> V prípade objednávky nad 101 Eur s DPH je doprava zdarma.</p>
<p><strong>10.2</strong> V rámci <strong>Slovenskej republiky</strong> je dodanie realizované prostredníctvom niektorej zo zásielkových služieb &ndash; SLOVAK PARCEL SERVICES - UPS, DPD, GEIS, GLS, prípadne iných, pričom poplatok za prepravu je: <strong>4,00 Eur s DPH.</strong><br />Pri veľkorozmernom a ťažkom tovare nad 30kg, ako je biela technika, plotre, veľké kopírky a podobne je cena za dopravu <strong>12 Eur s DPH,</strong> vzhľadom k tomu, že je potrebné použiť vozidlo so zdvíhacou plošinou.<br />Zásielka bude doručená zvyčajne najneskôr do 1 - 3 pracovných dní odo dňa odoslania tovaru Predávajúcim. Spravidla je to nasledujúci pracovný deň.</p>
<p><strong>10.3</strong> V rámci <strong>Českej republiky</strong> je dodanie realizované prostredníctvom niektorej zo zásielkových služieb &ndash; SLOVAK PARCEL SERVICES - UPS, DPD, GEIS, GLS, prípadne iných.<br /> <strong>Poplatok za prepravu je 12 Eur s DPH.</strong><br /> Zásielka bude doručená zvyčajne najneskôr do 1 - 3 pracovných dní odo dňa odoslania tovaru Predávajúcim.</p>
<p><strong>10.4</strong> V rámci <strong>EÚ</strong> je dodanie realizované prostredníctvom niektorej zo zásielkových služieb &ndash; SLOVAK PARCEL SERVICES - UPS, DPD, GEIS, GLS, prípadne iných. <strong><br />Poplatok za prepravu je podľa aktuálnych cien prepravy jednotlivých prepravných spoločností.</strong><br /> Zásielka bude kupujúcemu doručená zvyčajne najneskôr do 3 - 10 pracovných dní odo dňa odoslania tovaru Predávajúcim.<br /> Dodanie tovaru sa môže predĺžiť v závislosti od pripísania peňazí na náš účet ( pri platbe prevodom na účet ).</p>
<p>Ak ide o tovar, ktorý je skladom, zásielka bude doručená zvyčajne najneskôr do 1 - 3 pracovných dní odo dňa odoslania tovaru predávajúcim.<br /> Pokiaľ ide o tovar, ktorý je na Objednávku a nie je skladom, kupujúci má právo tento tovar zakúpiť. O dostupnosti tovaru, bude kupujúci informovaný. Ide väčšinou o špecifický, alebo cenovo drahší tovar, prípadne tovar, ktorý sa môže konfigurovať, alebo si konfiguráciu vyžaduje, ako sú napr. servery, počítačové zostavy a podobne.</p>
</dd><dt></dt></dl>
<p><strong>Článok 11</strong></p>
<dl><dt id="answer11"></dt><dd>
<p><strong>NADOBUDNUTIE VLASTNÍCKEHO PRÁVA K TOVARU</strong></p>
<p><strong>11.1</strong> Vlastnícke právo prechádza z predávajúceho na kupujúceho až momentom zaplatenia celej kúpnej ceny za predmet kúpnej zmluvy.</p>
</dd><dt></dt></dl>
<p><strong>Článok 12</strong></p>
<dl><dt id="answer12"></dt><dd>
<p><strong>OBALY A BALENIE</strong></p>
<p>Spoločnosť ETHOS Technology, s.r.o. si náklady na obalový materiál a zabalenie výrobku neúčtuje.<br /> Predmet kúpy bude zabalený obvyklým spôsobom tak, aby nedošlo k jeho poškodeniu počas prepravy.<br /> Použité obaly sú určené na jednorazové použitie.</p>
<p>Ak sa tovar doručuje kuriérskou službou alebo poštou je <strong>kupujúci povinný na mieste prevzatia skontrolovať,</strong> či je poškodený obal zásielky.<br /> V prípade poškodeného obalu zásielky a podozrenia, že tovar môže byť rovnako poškodený, kupujúci spíše priamo s vodičom prepravnej spoločnosti protokol o zistených vadách napr. pre poškodenie obalu tovaru, mechanické poškodenie tovaru, alebo nekompletnosť zásielky. Kupujúci zároveň poškodenie tovaru oznámi predávajúcemu formou E - Mailu alebo iným vhodným spôsobom bez zbytočného odkladu od dodania tovaru.</p>
</dd><dt></dt></dl>
<p><strong>Článok 13</strong></p>
<dl><dt id="answer13"></dt><dd>
<p><strong>DOKLADY VZŤAHUJÚCE SA NA TOVAR</strong></p>
<p>Predávajúci sa zaväzuje odovzdať kupujúcemu všetky doklady vzťahujúce sa na dodávaný tovar pri dodaní tovaru vrátane návodu na použitie výrobku ( v prípadoch, kde je to potrebné ).</p>
</dd><dt></dt></dl>
<p><strong>Článok 14</strong></p>
<dl><dt id="answer14"></dt><dd>
<p><strong>NEBEZPEČENSTVO ŠKODY NA TOVARE</strong></p>
<p>Pre otázky nebezpečenstva škody na tovare platia príslušné ustanovenia &sect; 455 - 457 Obchodného zákonníka.</p>
</dd><dt></dt></dl>
<p><strong>Článok 15</strong></p>
<dl><dt id="answer15"></dt><dd>
<p><strong>ZODPOVEDNOSŤ ZA VADY TOVARU</strong></p>
<p>Pre zmluvné strany budú platiť ustanovenia &sect; 422 a nasl. Obchodného zákonníka, ktoré upravujú nároky zo zodpovednosti za vady.<br /> Vady tovaru musí kupujúci reklamovať písomne u predávajúceho bez zbytočného odkladu odo dňa prevzatia.<br /> Písomná reklamácia musí obsahovať aspoň tieto údaje:<br /> - kópiu faktúry,<br /> - názov tovaru,<br /> - dátum dodania tovaru,<br /> - opis vady tovaru a ako sa prejavuje,<br /> - voľbu nároku.</p>
</dd><dt></dt></dl>
<p><strong>Článok 16</strong></p>
<dl><dt id="answer16"></dt><dd>
<p><strong>ZÁRUKA ZA AKOSŤ</strong></p>
<p>Zárukou za akosť tovaru preberá predávajúci písomne záväzok, že dodaný tovar bude po určitú dobu spôsobilý na použitie na dohodnutý, inak na obvyklý účel alebo že si zachová dohodnuté, inak obvyklé vlastnosti.<br /> Záruka za akosť vzniká písomným vyhlásením predávajúceho vo forme:<br /> - poskytnutého Záručného listu,<br /> - vyznačenia dĺžky Záručnej doby alebo doby trvanlivosti alebo použiteľnosti dodaného tovaru na jeho obale.</p>
</dd><dt></dt></dl>
<p><strong>Článok 17</strong></p>
<dl><dt id="answer17"></dt><dd>
<p><strong>ZÁVEREČNÉ USTANOVENIA</strong></p>
<p>Zmluvné strany sa dohodli, že ak nie je v týchto VOP ustanovené niečo iné, spravujú sa vzťahy medzi zmluvnými stranami vyplývajúce z tejto zmluvy uzavretou na diaľku všeobecne záväznými predpismi platnými v Slovenskej republike, najmä príslušnými ustanoveniami Obchodného zákonníka.</p>
<p>Ak sa stane niektoré ustanovenie týchto VOP neplatným či neúčinným, nedotýka sa to ostatných ustanovení týchto VOP, ktoré zostávajú platné a účinné. Zmluvné strany sa v tomto prípade zaväzujú dohodou nahradiť neplatné/neúčinné ustanovenie novým ustanovením platným/účinným, ktoré najlepšie zodpovedá pôvodne zamýšľanému účelu neplatného/neúčinného ustanovenia.</p>
<p>Písomné odchylné dojednania zmluvných strán ( napr. prostredníctvom E - Mailovej komunikácie ) majú prednosť pred ustanoveniami týchto VOP.</p>
<p>Predávajúci si vyhradzuje právo tieto Všeobecné obchodné podmienky zmeniť v prípade legislatívnych zmien.</p>
<p><strong>Všeobecné obchodné podmienky sú platné s účinnosťou od 25.5.2018.</strong></p>
<p>Okamihom keď kupujúci na stránkach elektronického obchodu <strong><a href="https://web.archive.org/web/20190715201137/https://worlds.sk/" target="_blank">WORLD'S</a></strong> klikne na tlačidlo <strong>Objednávka s povinnosťou platby,</strong> má sa za to, že kupujúci je plnoletá osoba oprávnená konať v mene právnickej osoby - kupujúceho, ktorá sa riadne oboznámila so Všeobecnými obchodnými podmienkami, tieto si preštudovala, zobrala ich na vedomie a dobrovoľne sa rozhodla uzavrieť zmluvu na diaľku. VOP sa týmto stávajú neoddeliteľnou súčasťou dohody zmluvných strán.</p>
</dd><dt></dt></dl>` }} />
          </div>
        )}
      </div>
    </div>
  );
}
