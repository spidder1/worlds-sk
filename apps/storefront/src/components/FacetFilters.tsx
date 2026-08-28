'use client';

import React from 'react';
import { Filter, Check } from 'lucide-react';

export interface FilterProps {
  availableBrands: string[];
  selectedBrand?: string;
  onBrandChange: (brand?: string) => void;
  inStockOnly: boolean;
  onInStockChange: (inStock: boolean) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export function FacetFilters({
  availableBrands,
  selectedBrand,
  onBrandChange,
  inStockOnly,
  onInStockChange,
  sortBy,
  onSortChange,
}: FilterProps) {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
          <Filter className="w-4 h-4 text-brand-600" />
          Filtrovať produkty
        </div>
        {(selectedBrand || inStockOnly) && (
          <button
            onClick={() => {
              onBrandChange(undefined);
              onInStockChange(false);
            }}
            className="text-xs text-brand-600 hover:underline font-medium"
          >
            Zrušiť filtre
          </button>
        )}
      </div>

      {/* In Stock toggle */}
      <div>
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Dostupnosť</h4>
        <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-700 hover:text-slate-900">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onInStockChange(e.target.checked)}
            className="rounded border-slate-300 text-brand-600 focus:ring-brand-500 w-4 h-4"
          />
          Iba tovar na sklade
        </label>
      </div>

      {/* Brands Facet */}
      {availableBrands.length > 0 && (
        <div>
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Výrobca / Značka</h4>
          <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
            <button
              onClick={() => onBrandChange(undefined)}
              className={`w-full text-left text-xs px-2.5 py-1.5 rounded-md flex items-center justify-between transition-colors ${
                !selectedBrand ? 'bg-brand-50 text-brand-700 font-bold' : 'hover:bg-slate-50 text-slate-600'
              }`}
            >
              <span>Všetci výrobcovia</span>
              {!selectedBrand && <Check className="w-3.5 h-3.5" />}
            </button>
            {availableBrands.map((brand) => (
              <button
                key={brand}
                onClick={() => onBrandChange(selectedBrand === brand ? undefined : brand)}
                className={`w-full text-left text-xs px-2.5 py-1.5 rounded-md flex items-center justify-between transition-colors ${
                  selectedBrand === brand ? 'bg-brand-50 text-brand-700 font-bold' : 'hover:bg-slate-50 text-slate-600'
                }`}
              >
                <span>{brand}</span>
                {selectedBrand === brand && <Check className="w-3.5 h-3.5" />}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sorting */}
      <div>
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Zoradiť podľa</h4>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <option value="quality">Najvyššia kvalita (Quality Score)</option>
          <option value="price_asc">Najlacnejšie</option>
          <option value="price_desc">Najdrahšie</option>
          <option value="name">Názov (A-Z)</option>
        </select>
      </div>
    </div>
  );
}
