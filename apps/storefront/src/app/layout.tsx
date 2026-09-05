import type { Metadata } from 'next';
import './globals.css';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { getCategories } from '../lib/catalog';
import { SITE_URL, IS_PRODUCTION_SITE } from '../lib/site';
import { CookieConsent } from '../components/CookieConsent';

export const metadata: Metadata = {
  title: 'Worlds.sk | Moderný IT & Tech E-Shop s AI Data Engine',
  description: 'IT technika, notebooky, komponenty a periférie s priebežne synchronizovanými cenami a dostupnosťou.',
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: 'Worlds.sk - Špičková IT technika a komponenty',
    description: 'IT technika s priebežne synchronizovanými cenami a dostupnosťou z distribučného katalógu.',
    siteName: 'Worlds.sk',
    locale: 'sk_SK',
    type: 'website',
  },
  // Only the production origin may be indexed. Preview deployments would
  // otherwise compete with worlds.sk for the same content.
  robots: {
    index: IS_PRODUCTION_SITE,
    follow: IS_PRODUCTION_SITE,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getCategories();

  return (
    <html lang="sk">
      <body className="min-h-screen flex flex-col antialiased">
        <Header categories={categories} />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
          {children}
        </main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
