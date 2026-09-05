import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/produkty', '/produkt/', '/kategoria/'],
      disallow: ['/api/', '/kosik', '/vyhladavanie', '/*?*'],
    },
    sitemap: 'https://worlds.sk/sitemap.xml',
    host: 'https://worlds.sk',
  };
}
