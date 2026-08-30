import fs from 'node:fs';

function decodeHtml(html) {
  return html
    .replace(/&Scaron;/g, 'Š')
    .replace(/&scaron;/g, 'š')
    .replace(/&Aacute;/g, 'Á')
    .replace(/&aacute;/g, 'á')
    .replace(/&Eacute;/g, 'É')
    .replace(/&eacute;/g, 'é')
    .replace(/&Iacute;/g, 'Í')
    .replace(/&iacute;/g, 'í')
    .replace(/&Oacute;/g, 'Ó')
    .replace(/&oacute;/g, 'ó')
    .replace(/&Uacute;/g, 'Ú')
    .replace(/&uacute;/g, 'ú')
    .replace(/&Yacute;/g, 'Ý')
    .replace(/&yacute;/g, 'ý')
    .replace(/&Ccaron;/g, 'Č')
    .replace(/&ccaron;/g, 'č')
    .replace(/&Dcaron;/g, 'Ď')
    .replace(/&dcaron;/g, 'ď')
    .replace(/&Lcaron;/g, 'Ľ')
    .replace(/&lcaron;/g, 'ľ')
    .replace(/&Ncaron;/g, 'Ň')
    .replace(/&ncaron;/g, 'ň')
    .replace(/&Rcaron;/g, 'Ř')
    .replace(/&rcaron;/g, 'ř')
    .replace(/&Tcaron;/g, 'Ť')
    .replace(/&tcaron;/g, 'ť')
    .replace(/&Zcaron;/g, 'Ž')
    .replace(/&zcaron;/g, 'ž')
    .replace(/&Ocirc;/g, 'Ô')
    .replace(/&ocirc;/g, 'ô')
    .replace(/&Auml;/g, 'Ä')
    .replace(/&auml;/g, 'ä')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

function cleanHtmlToJsx(html) {
  let decoded = decodeHtml(html);
  // remove script tags, iframes, styles
  decoded = decoded.replace(/<script[\s\S]*?<\/script>/gi, '');
  decoded = decoded.replace(/<style[\s\S]*?<\/style>/gi, '');
  // replace class= with className=
  decoded = decoded.replace(/class=/g, 'className=');
  // replace self closing tags like <br>, <img>, <hr>, <input>
  decoded = decoded.replace(/<br\s*\/?>/gi, '<br />');
  decoded = decoded.replace(/<hr\s*\/?>/gi, '<hr className="my-4 border-slate-200" />');
  decoded = decoded.replace(/<img([^>]*?)(?<!\/)>/gi, '<img$1 />');
  return decoded;
}

// 1. Build Obchodné podmienky (VOP Spotrebitelia + VOP Podnikatelia)
const vopB2cRaw = fs.readFileSync('vop_fyzicke_osoby.html', 'utf8');
const vopB2bRaw = fs.readFileSync('vop_podnikatelia.html', 'utf8');

const vopB2cClean = cleanHtmlToJsx(vopB2cRaw);
const vopB2bClean = cleanHtmlToJsx(vopB2bRaw);

const vopPageContent = `'use client';

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
            className={\`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all \${
              activeTab === 'b2c'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }\`}
          >
            <Users className="w-4 h-4" />
            Pre fyzické osoby (Spotrebitelia)
          </button>
          <button
            onClick={() => setActiveTab('b2b')}
            className={\`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all \${
              activeTab === 'b2b'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }\`}
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
            <div dangerouslySetInnerHTML={{ __html: \`${vopB2cClean.replace(/`/g, '\\`').replace(/\${/g, '\\${')}\` }} />
          </div>
        ) : (
          <div>
            <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-200 text-xs text-amber-900 mb-6 font-medium">
              Tieto obchodné podmienky upravujú vzťah medzi predávajúcim a kupujúcim – podnikateľom (B2B) v zmysle Obchodného zákonníka SR.
            </div>
            <div dangerouslySetInnerHTML={{ __html: \`${vopB2bClean.replace(/`/g, '\\`').replace(/\${/g, '\\${')}\` }} />
          </div>
        )}
      </div>
    </div>
  );
}
`;

fs.writeFileSync('apps/storefront/src/app/obchodne-podmienky/page.tsx', vopPageContent, 'utf8');
console.log('✓ VOP prenesené (fyzické osoby + podnikatelia).');

// 2. Build Reklamačný poriadok
const reklRaw = fs.readFileSync('reklamacne_podmienky.html', 'utf8');
const reklClean = cleanHtmlToJsx(reklRaw);

const reklPageContent = `import { Metadata } from 'next';
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

        <div dangerouslySetInnerHTML={{ __html: \`${reklClean.replace(/`/g, '\\`').replace(/\${/g, '\\${')}\` }} />
      </div>
    </div>
  );
}
`;

fs.writeFileSync('apps/storefront/src/app/reklamacny-poriadok/page.tsx', reklPageContent, 'utf8');
console.log('✓ Reklamačný poriadok prenesený.');

// 3. Build O nás
const onasRaw = fs.readFileSync('o_nas.html', 'utf8');
const onasClean = cleanHtmlToJsx(onasRaw);

const onasPageContent = `import { Metadata } from 'next';
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

        <div dangerouslySetInnerHTML={{ __html: \`${onasClean.replace(/`/g, '\\`').replace(/\${/g, '\\${')}\` }} />
      </div>
    </div>
  );
}
`;

fs.writeFileSync('apps/storefront/src/app/o-nas/page.tsx', onasPageContent, 'utf8');
console.log('✓ O nás prenesené.');
