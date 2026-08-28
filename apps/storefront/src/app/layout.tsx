import type { Metadata } from 'next';
import './globals.css';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const metadata: Metadata = {
  title: 'Worlds.sk | Moderný IT & Tech E-Shop s AI Data Engine',
  description: 'Oficiálna distribúcia IT techniky, notebookov, komponentov a periférií. Viac ako 70 000 produktov priamo zo skladu distribútora.',
  metadataBase: new URL('https://worlds.sk'),
  openGraph: {
    title: 'Worlds.sk - Špičková IT technika a komponenty',
    description: 'Viac ako 70 000 overených produktov priamo z centrálneho skladu eD system.',
    siteName: 'Worlds.sk',
    locale: 'sk_SK',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
