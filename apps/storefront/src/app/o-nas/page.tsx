import { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'O nás | Worlds.sk',
  description: 'Profil spoločnosti ETHOS Technology, s. r. o. a predstavenie internetového obchodu Worlds.sk.',
};

export default function ONasPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-blue-600 flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Späť na domov
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-medium">O nás</span>
      </nav>

      <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 shadow-sm space-y-8 text-slate-700 leading-relaxed text-sm">
        <div className="border-b border-slate-200 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Profil spoločnosti
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">O spoločnosti Worlds.sk</h1>
          <p className="text-slate-500 text-sm mt-2">ETHOS Technology, s. r. o. – IT distribúcia od roku 2008</p>
        </div>

        <div dangerouslySetInnerHTML={{ __html: `<div className="page-title">
<h1>O NÁS</h1>
</div>
<p><strong>Profil spoločnosti</strong></p>
<p>Spoločnosť ETHOS Technology, s.r.o. je distribučná spoločnosť poskytujúca služby v oblasti IT technológií. Prevádzkuje elektronické riešenie internetového obchodu WORLD'S.  <br /> Založená bola v roku 2008. Naším hlavným zameraním a cieľom je poskytovať svojim zákazníkom a partnerom čo možno najširšie a najkomplexnejšie služby v oblasti IT technológií. Naša niekoľkoročná história je zárukou stability a kvality ponúkaných služieb. <br /><strong>Aj keď v slovenskom trhovom prostredí je stále dominantná cena tovaru, je naším prvoradým cieľom kvalita tovaru, jeho rýchla dostupnosť, bezpečné financovanie, rýchlosť vybavenia reklamácií a tiež široká a komplexná ponuka.</strong></p>
<p>V roku 2016 sme zmenili webovú lokalitu. Došlo k zmene domény a programového riešenia obchodu. Túto situáciu si vynútilo neustále sa rozširujúce trhové prostredie. Doterajšie riešenie elektronického obchodu bolo založené na prenájme od dodávateľov a nevyhovovalo našim potrebám.<strong><br /> </strong>Vypracovali sme nové vlastné programové riešenie, ktoré je celé v našej správe a prevádzkované na špecializovanom webhostingu. Takisto bol vytvorený vlastný grafický dizajn elektronického obchodu WORLD'S.<strong><br /> Z hľadiska bezpečnosti našej spoločnosti a hlavne našich zákazníkov a partnerov sme celú webovú lokalitu a Doménu elektronického obchodu WORLD'S spoločnosti ETHOS Technology, s.r.o. zabezpečili platným bezpečnostným Certifikátom SSL (Secure Socket Layer), ktorý je overený GeoTrust Inc.. Akákoľvek komunikácia a prenos dát odchádzajúcich z našej webovej lokality WORLD'S je šifrovaná, všetky adresy, názvy, čísla platobných kariet, heslá a ďalšie dôverné informácie sú pri zadávaní a prenose Internetom šifrované a chránené pred útokmi zvonku. Cieľom bolo vytvoriť bezpečné a spoľahlivé nakupovanie pre našich zákazníkov a partnerov u našej spoločnosti.<br /></strong></p>
<p><strong>Distribúcia výrobcov</strong></p>
<p>Distribuujeme  široké portfólio značiek, ktoré sa neustále aktualizuje o nových výrobcov. <br /><strong>Každý produkt v našom obchode je autorizovaný pre slovenský trh a má Záručné aj pozáručné servisné pokrytie. Nedodávame tovar, ktorý nemá originálny pôvod a nespĺňa podmienky kvality pre spotrebiteľa.</strong> <br />Tovar sme schopný dodať aj v rámci Európskej únie s autorizáciou produktu pre konkrétnu krajinu.</p>
<p><strong>Výrobcovia</strong></p>
<p>3D robotics, 3D System, A4Tech, ABBYY, Acronis, Acer , AData, Adobe, AEG, Akasa, Allied Telesyn, AMD, Amiko, AOC, APC, Apple, Arctic Cooling, Armor, AsRock, Asus , ATOP, Avermedia, AVG, Axago, Beko, Belkin, BenQ, BlacBerry, Bose, Bosch, Brother, Bsmart, Cambridge Audio, Canon, Case Logic, CipherLab, Cisco Systems, Computer Associates, Commend, CoolerMaster, Corel, Corsair, CreativeLabs, Crono, C-Tech, D-Clean, D-Link, Dell, Dicota, Digitus (Assmann), Eaton&MG, eBeam, Eizo, Epson, Eset, Eurocase, Evolveo, Fortron, Foxcon, Fujitsu, Garmin, Gembird, Genius, Gibertini, Gigabyte, Gigaset, GoPro, Grundig, Hama, Handspree, Hewlett&ndash;Packard, Hitachi, HTC, Hoya, Huawei, Chicony, Chieftec, I-Tec, IBM, IBM/Lenovo, Imation, Intel, Intellinet, JCB, Kaspersky, Kelline, KGuard, Kingston, Konica Minolta, Krups, Kyocera, Legrand, Lexmark, LG, Logitech, Manfrotto, Manhattan, Matrox, Meizu Sales Ltd., Metz, Microsoft, Microtik, Mio, Motorola, Moulinex, MSI, Nashuatec, NEX, Neovo, NetApp, Nikon, Nokia, NZXT, OKI, Olympus, Opexia, Opticon, Optoma, Ozone Gaming, Panasonic, Philips, Pioneer, Polycom, QNAP, Rayfilm, Reflecta, Remax, Revance, Ricoh, Rollei, Ronol,  Samsonite, Samsung, Sandisk, Sapphire, Seagate, Seasonic, Sharp, Sigma, SKYLINK, Solarix, Solight, Sony, Stygian, Symantec, Synology, THL, Topcom, Toshiba, TP-LINK, Transcend, Tristar, Triton, Triumph Board, Trust, Ubiquiti, Utax, Velbon, Verbatim, Vikintek, Vogel's, VU Plus, Wacom, Western Digital, Wincor Nixdorf, Xerox, Zalman, Zebex a mnoho ďalších.</p>
<p>Nezameriavame sa len na samotný predaj tovaru. Vieme zabezpečiť pre  našich zákazníkov a partnerov aj montáž a konfiguráciu špecializovaných zariadení, ako sú napr. serverové riešenia, montáže počítačových zostáv, navrhnúť optimálne riešenia technologických postupov a zariadení s dôrazom na kvalitu a cenu.<br /> Pre nás určite platí, že prvoradým cieľom je spokojný zákazník.</p>` }} />
      </div>
    </div>
  );
}
