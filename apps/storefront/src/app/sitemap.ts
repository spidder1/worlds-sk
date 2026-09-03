import type { MetadataRoute } from 'next';
import { getCategories, getProductCount, getProductSitemapBatch } from '../lib/catalog';

const PRODUCT_SITEMAP_PAGE_SIZE = 1000;

export async function generateSitemaps() {
  let count = 0;
  try {
    count = await getProductCount();
  } catch (error) {
    console.warn('[sitemap] Product count unavailable; generating the base sitemap only.', error);
  }
  const pages = Math.max(1, Math.ceil(count / PRODUCT_SITEMAP_PAGE_SIZE));
  return Array.from({ length: pages }, (_, id) => ({ id }));
}

export default async function sitemap({ id }: { id: number | string }): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://worlds.sk';
  const pageId = Number(id);

  // 1. Static Pages
  const staticRoutes: MetadataRoute.Sitemap = pageId === 0 ? [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/o-nas`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ] : [];

  // 2. Categories
  let categories: Awaited<ReturnType<typeof getCategories>> = [];
  if (pageId === 0) {
    try {
      categories = await getCategories();
    } catch (error) {
      console.warn('[sitemap] Categories unavailable; omitting dynamic category URLs.', error);
    }
  }
  const categoryRoutes: MetadataRoute.Sitemap = [];

  function addCategoryRoutes(cats: typeof categories) {
    for (const cat of cats) {
      if (cat.isSeoIndexed) {
        categoryRoutes.push({
          url: `${baseUrl}/kategoria/${cat.slug}`,
          lastModified: new Date(),
          changeFrequency: 'daily',
          priority: 0.8,
        });
      }
      if (cat.subcategories) {
        addCategoryRoutes(cat.subcategories);
      }
    }
  }

  addCategoryRoutes(categories);

  // 3. Products (Active only)
  let products: Awaited<ReturnType<typeof getProductSitemapBatch>> = [];
  try {
    products = await getProductSitemapBatch(pageId * PRODUCT_SITEMAP_PAGE_SIZE, PRODUCT_SITEMAP_PAGE_SIZE);
  } catch (error) {
    console.warn('[sitemap] Products unavailable; omitting dynamic product URLs.', error);
  }
  const productRoutes: MetadataRoute.Sitemap = products
    .filter((p) => p.status === 'ACTIVE' || p.status === 'OUT_OF_STOCK')
    .map((product) => ({
      url: `${baseUrl}/produkt/${product.slug}`,
      lastModified: new Date(product.updatedAt),
      changeFrequency: 'daily',
      priority: 0.7,
    }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
