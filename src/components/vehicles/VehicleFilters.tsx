import React from 'react';
import { Filter, RotateCcw, Check } from 'lucide-react';
import { VehicleStatus, BodyType, FuelType, Transmission } from '../../types';

export interface VehicleFilterState {
  search: string;
  make: string;
  bodyType: string;
  priceRange: string;
  status: string;
  year: string;
  fuelType: string;
  transmission: string;
  featuredOnly: boolean;
  sortBy: 'price-asc' | 'price-desc' | 'year-desc' | 'mileage-asc';
}

interface VehicleFiltersProps {
  filters: VehicleFilterState;
  onChange: (filters: VehicleFilterState) => void;
  onReset: () => void;
  availableMakes: string[];
  totalResults: number;
}

export const VehicleFilters: React.FC<VehicleFiltersProps> = ({
  filters,
  onChange,
  onReset,
  availableMakes,
  totalResults,
}) => {
  const bodyTypes: BodyType[] = ['SUV', 'Sedan', 'Pickup Truck', 'Coupe'];
  const statuses: VehicleStatus[] = ['Available', 'In Transit', 'Coming Soon', 'Reserved', 'Sold'];
  const fuelTypes: FuelType[] = ['Petrol', 'Diesel', 'Hybrid'];
  const transmissions: Transmission[] = ['Automatic', 'Manual'];

  const handleFieldChange = (field: keyof VehicleFilterState, value: unknown) => {
    onChange({
      ...filters,
      [field]: value,
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 p-5 shadow-2xs space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-stone-100">
        <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
          <Filter className="w-4 h-4 text-amber-600" />
          <span>Filters ({totalResults} Vehicles)</span>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-stone-500 hover:text-stone-900 flex items-center gap-1 font-semibold transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          Reset All
        </button>
      </div>

      {/* Make / Brand */}
      <div>
        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
          Vehicle Make
        </label>
        <select
          id="filter-make"
          value={filters.make}
          onChange={(e) => handleFieldChange('make', e.target.value)}
          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs text-stone-800 font-medium focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 outline-hidden transition-all"
        >
          <option value="">All Brands</option>
          {availableMakes.map((make) => (
            <option key={make} value={make}>
              {make}
            </option>
          ))}
        </select>
      </div>

      {/* Availability Status */}
      <div>
        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
          Inventory Status
        </label>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => handleFieldChange('status', '')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filters.status === ''
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            All
          </button>
          {statuses.map((st) => {
            const isSelected = filters.status === st;
            return (
              <button
                key={st}
                onClick={() => handleFieldChange('status', isSelected ? '' : st)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {st}
              </button>
            );
          })}
        </div>
      </div>

      {/* Body Type */}
      <div>
        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
          Body Type
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {bodyTypes.map((type) => {
            const isSelected = filters.bodyType === type;
            return (
              <button
                key={type}
                onClick={() => handleFieldChange('bodyType', isSelected ? '' : type)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold text-left flex items-center justify-between transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-50 border border-stone-200/80 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span>{type}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range (in NGN) */}
      <div>
        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
          Budget / Price (NGN)
        </label>
        <select
          id="filter-price-range"
          value={filters.priceRange}
          onChange={(e) => handleFieldChange('priceRange', e.target.value)}
          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs text-stone-800 font-medium focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 outline-hidden transition-all"
        >
          <option value="">Any Budget</option>
          <option value="under-40m">Under ₦40,000,000</option>
          <option value="40m-60m">₦40M – ₦60,000,000</option>
          <option value="60m-90m">₦60M – ₦90,000,000</option>
          <option value="90m-plus">₦90,000,000 and Above</option>
        </select>
      </div>

      {/* Year */}
      <div>
        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
          Model Year
        </label>
        <select
          id="filter-year"
          value={filters.year}
          onChange={(e) => handleFieldChange('year', e.target.value)}
          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs text-stone-800 font-medium focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 outline-hidden transition-all"
        >
          <option value="">All Years</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020 and older</option>
        </select>
      </div>

      {/* Fuel Type & Transmission */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <div>
          <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1.5">
            Fuel
          </label>
          <select
            value={filters.fuelType}
            onChange={(e) => handleFieldChange('fuelType', e.target.value)}
            className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs text-stone-800"
          >
            <option value="">All</option>
            {fuelTypes.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1.5">
            Transmission
          </label>
          <select
            value={filters.transmission}
            onChange={(e) => handleFieldChange('transmission', e.target.value)}
            className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs text-stone-800"
          >
            <option value="">All</option>
            {transmissions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Featured Toggle */}
      <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
        <span className="text-xs font-bold text-stone-800">Featured Showroom Units Only</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={filters.featuredOnly}
            onChange={(e) => handleFieldChange('featuredOnly', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-9 h-5 bg-stone-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-600"></div>
        </label>
      </div>
    </div>
  );
};
