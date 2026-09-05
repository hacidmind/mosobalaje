import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onOpenMobileFilters?: () => void;
  activeFilterCount?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search by make, model, trim (e.g. Lexus RX 350, Prado, Camry XSE)...',
  onOpenMobileFilters,
  activeFilterCount = 0,
}) => {
  return (
    <div className="relative flex items-center gap-2.5 w-full">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          id="inventory-search-input"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 bg-white border border-stone-200 rounded-xl text-sm text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all shadow-2xs"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-700"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {onOpenMobileFilters && (
        <button
          onClick={onOpenMobileFilters}
          className="lg:hidden shrink-0 inline-flex items-center gap-1.5 px-4 py-3 bg-stone-900 text-white rounded-xl text-xs font-bold shadow-2xs hover:bg-stone-800 transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4 text-amber-400" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="ml-1 w-4 h-4 rounded-full bg-amber-500 text-stone-950 font-black text-[10px] flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>
      )}
    </div>
  );
};
