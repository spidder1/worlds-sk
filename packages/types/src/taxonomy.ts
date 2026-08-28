/**
 * Managed Taxonomy & SEO Category Structure for Worlds.sk
 */

export interface TaxonomyCategory {
  id: string;
  slug: string;
  name: string;
  parentSlug?: string;
  level: number;
  icon?: string;
  description?: string;
  metaTitle?: string;
  metaDescription?: string;
  
  // Mapping rules from supplier
  supplierCategoryCodes?: string[];
  supplierCommodityCodes?: string[];
  
  // SEO & Facet controls
  isSeoIndexed: boolean;
  allowedFilterAttributes: string[]; // attributes that can generate canonical SEO landing URLs
  displayOrder: number;
  subcategories?: TaxonomyCategory[];
}

export interface FacetFilterOption {
  value: string | number;
  label: string;
  count: number;
  isSelected?: boolean;
}

export interface FacetFilterGroup {
  attributeKey: string;
  attributeName: string;
  unit?: string;
  filterType: 'single' | 'multiple' | 'range';
  options: FacetFilterOption[];
  min?: number;
  max?: number;
  currentMin?: number;
  currentMax?: number;
}

export interface SearchQueryParams {
  query?: string;
  category?: string;
  brand?: string[];
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  attributes?: Record<string, string[]>;
  sortBy?: 'price_asc' | 'price_desc' | 'relevance' | 'newest' | 'rating';
  page?: number;
  limit?: number;
}
