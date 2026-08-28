import { ImporterService, MANAGED_TAXONOMY } from '@worlds/importer';
import { MockEDSystemClient } from '@worlds/ed-client';
import { MasterProduct, TaxonomyCategory } from '@worlds/types';

// Global singleton instance for in-memory / server caching during app runtime
let globalImporter: ImporterService | null = null;
let isInitialized = false;

export async function getImporter(): Promise<ImporterService> {
  if (!globalImporter) {
    globalImporter = new ImporterService();
  }

  if (!isInitialized) {
    const mockClient = new MockEDSystemClient();
    const sample = await mockClient.getSampleProducts();
    await globalImporter.importBatch(sample);
    isInitialized = true;
  }

  return globalImporter;
}

export async function getAllProducts(): Promise<MasterProduct[]> {
  const importer = await getImporter();
  return importer.getRepository().getAllProducts();
}

export async function getProductBySlug(slug: string): Promise<MasterProduct | null> {
  const importer = await getImporter();
  return importer.getRepository().getProductBySlug(slug);
}

export async function getProductsByCategory(categorySlug: string): Promise<MasterProduct[]> {
  const importer = await getImporter();
  const res = await importer.getRepository().queryProducts({ categorySlug });
  return res.items;
}

export async function getCategories(): Promise<TaxonomyCategory[]> {
  return MANAGED_TAXONOMY;
}

export function findCategoryBySlug(slug: string, categories: TaxonomyCategory[] = MANAGED_TAXONOMY): TaxonomyCategory | null {
  for (const cat of categories) {
    if (cat.slug === slug) return cat;
    if (cat.subcategories) {
      const found = findCategoryBySlug(slug, cat.subcategories);
      if (found) return found;
    }
  }
  return null;
}
