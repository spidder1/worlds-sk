import type { Metadata } from 'next';
import './globals.css';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { getCategories } from '../lib/catalog';

export const metadata: Metadata = {
  title: 'Worlds.sk | Moderný IT & Tech E-Shop s AI Data Engine',
  description: 'IT technika, notebooky, komponenty a periférie s priebežne synchronizovanými cenami a dostupnosťou.',
  metadataBase: new URL('https://worlds.sk'),
  openGraph: {
    title: 'Worlds.sk - Špičková IT technika a komponenty',
    description: 'IT technika s priebežne synchronizovanými cenami a dostupnosťou z distribučného katalógu.',
    siteName: 'Worlds.sk',
    locale: 'sk_SK',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
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
      </body>
    </html>
  );
}
