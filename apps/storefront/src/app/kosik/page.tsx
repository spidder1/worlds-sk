import Link from 'next/link';
import type { Metadata } from 'next';
import { Home, ChevronRight } from 'lucide-react';
import { CartClient } from '../../components/CartClient';

export const metadata: Metadata = {
  title: 'Nákupný košík | Worlds.sk',
  description: 'Produkty vybrané v nákupnom košíku Worlds.sk.',
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-slate-900 flex items-center gap-1">
          <Home className="w-3.5 h-3.5" />
          Domov
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-semibold">Košík</span>
      </nav>

      <CartClient />
    </div>
  );
}
