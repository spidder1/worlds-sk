import type { MetadataRoute } from 'next';
import { getAllProducts, getCategories } from '../lib/catalog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://worlds.sk';

  // 1. Static Pages
  const staticRoutes: MetadataRoute.Sitemap = [
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
    {
      url: `${baseUrl}/doprava-a-platba`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/obchodne-podmienky`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/reklamacny-poriadok`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/ochrana-osobnych-udajov`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/kosik`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  // 2. Categories
  const categories = await getCategories();
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
  const products = await getAllProducts();
  const productRoutes: MetadataRoute.Sitemap = products
    .filter((p) => p.status === 'ACTIVE' || p.status === 'OUT_OF_STOCK')
    .map((product) => ({
      url: `${baseUrl}/produkt/${product.slug}`,
      lastModified: new Date(product.updatedAt || new Date()),
      changeFrequency: 'daily',
      priority: 0.7,
    }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
