import type { MetadataRoute } from 'next';
import { SITE_URL, IS_PRODUCTION_SITE } from '../lib/site';

export default function robots(): MetadataRoute.Robots {
  if (!IS_PRODUCTION_SITE) {
    // Preview and staging deployments are closed to crawlers entirely.
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Faceted filter combinations are crawl traps: the SEO surface is the
        // category and product URLs, not every filter permutation.
        disallow: ['/api/', '/admin/', '/kategoria/*?', '/produkty?', '/vyhladavanie'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
