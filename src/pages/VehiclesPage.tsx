import React, { useState, useMemo, useEffect } from 'react';
import { Vehicle, WebsiteContentSettings } from '../types';
import { VehicleCard } from '../components/vehicles/VehicleCard';
import { VehicleFilters, VehicleFilterState } from '../components/vehicles/VehicleFilters';
import { SearchBar } from '../components/vehicles/SearchBar';
import { EmptyState } from '../components/ui/SectionHeader';
import { SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';

interface VehiclesPageProps {
  vehicles: Vehicle[];
  onSelectVehicle: (vehicle: Vehicle) => void;
  whatsappNumber?: string;
  initialSearchQuery?: string;
  initialMake?: string;
  onNavigate: (route: string) => void;
}

const DEFAULT_FILTERS: VehicleFilterState = {
  search: '',
  make: '',
  bodyType: '',
  priceRange: '',
  status: '',
  year: '',
  fuelType: '',
  transmission: '',
  featuredOnly: false,
  sortBy: 'price-desc',
};

export const VehiclesPage: React.FC<VehiclesPageProps> = ({
  vehicles,
  onSelectVehicle,
  whatsappNumber = '2349064153303',
  initialSearchQuery,
  initialMake,
  onNavigate,
}) => {
  const [filters, setFilters] = useState<VehicleFilterState>({
    ...DEFAULT_FILTERS,
    search: initialSearchQuery || '',
    make: initialMake || '',
  });

  useEffect(() => {
    if (initialSearchQuery) {
      setFilters((prev) => ({ ...prev, search: initialSearchQuery }));
    }
    if (initialMake) {
      setFilters((prev) => ({ ...prev, make: initialMake }));
    }
  }, [initialSearchQuery, initialMake]);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Extract unique makes
  const availableMakes = useMemo(() => {
    const set = new Set(vehicles.map((v) => v.make));
    return Array.from(set).sort();
  }, [vehicles]);

  // Active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.search) count++;
    if (filters.make) count++;
    if (filters.bodyType) count++;
    if (filters.priceRange) count++;
    if (filters.status) count++;
    if (filters.year) count++;
    if (filters.fuelType) count++;
    if (filters.transmission) count++;
    if (filters.featuredOnly) count++;
    return count;
  }, [filters]);

  // Filter and sort logic
  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      // Search
      if (filters.search.trim()) {
        const query = filters.search.toLowerCase().trim();
        const matchesTitle = `${v.year} ${v.make} ${v.model} ${v.trim}`.toLowerCase().includes(query);
        const matchesDescription = v.description.toLowerCase().includes(query);
        const matchesLocation = v.location.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDescription && !matchesLocation) return false;
      }

      // Make
      if (filters.make && v.make.toLowerCase() !== filters.make.toLowerCase()) {
        return false;
      }

      // Body Type
      if (filters.bodyType && v.bodyType !== filters.bodyType) {
        return false;
      }

      // Price Range in NGN
      if (filters.priceRange) {
        if (filters.priceRange === 'under-40m' && v.price >= 40000000) return false;
        if (filters.priceRange === '40m-60m' && (v.price < 40000000 || v.price > 60000000)) return false;
        if (filters.priceRange === '60m-90m' && (v.price < 60000000 || v.price > 90000000)) return false;
        if (filters.priceRange === '90m-plus' && v.price < 90000000) return false;
      }

      // Status
      if (filters.status && v.status !== filters.status) {
        return false;
      }

      // Year
      if (filters.year) {
        if (filters.year === '2023' && v.year !== 2023) return false;
        if (filters.year === '2022' && v.year !== 2022) return false;
        if (filters.year === '2021' && v.year !== 2021) return false;
        if (filters.year === '2020' && v.year > 2020) return false;
      }

      // Fuel Type
      if (filters.fuelType && v.fuelType !== filters.fuelType) {
        return false;
      }

      // Transmission
      if (filters.transmission && v.transmission !== filters.transmission) {
        return false;
      }

      // Featured
      if (filters.featuredOnly && !v.featured) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'year-desc':
          return b.year - a.year;
        case 'mileage-asc':
          return a.mileage - b.mileage;
        default:
          return b.price - a.price;
      }
    });
  }, [vehicles, filters]);

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  return (
    <div id="vehicles-page-container" className="py-10 bg-[#fcfbf9] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Verified Port & Logistics Inventory
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-950 tracking-tight mt-2">
            Available Imported Vehicles
          </h1>
          <p className="text-sm text-stone-600 mt-1 max-w-2xl">
            Browse inspected vehicles ready for physical inspection in Lagos or in-transit shipments docking at Tin Can Island. Direct sourcing via our registered IAA & Copart auction memberships.
          </p>
        </div>

        {/* Search & Top Action Bar */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="w-full md:w-2/3">
            <SearchBar
              value={filters.search}
              onChange={(val) => setFilters({ ...filters, search: val })}
              onOpenMobileFilters={() => setMobileFiltersOpen(true)}
              activeFilterCount={activeFilterCount}
            />
          </div>

          <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-600">
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
              <span>Sort:</span>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as VehicleFilterState['sortBy'] })}
                className="bg-stone-50 border border-stone-200 rounded-lg py-1.5 px-2.5 text-xs text-stone-800 font-bold focus:outline-hidden"
              >
                <option value="price-desc">Price: High to Low</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="year-desc">Year: Newest First</option>
                <option value="mileage-asc">Mileage: Lowest First</option>
              </select>
            </div>

            <button
              onClick={() => onNavigate('/request-vehicle')}
              className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-colors cursor-pointer"
            >
              <span>Can’t Find Vehicle?</span>
            </button>
          </div>
        </div>

        {/* Layout Grid: Sidebar Filters + Vehicles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-3 sticky top-28">
            <VehicleFilters
              filters={filters}
              onChange={setFilters}
              onReset={handleResetFilters}
              availableMakes={availableMakes}
              totalResults={filteredVehicles.length}
            />
          </div>

          {/* Vehicle Cards Grid */}
          <div className="lg:col-span-9">
            {filteredVehicles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredVehicles.map((vehicle) => (
                  <VehicleCard
                    key={vehicle._id}
                    vehicle={vehicle}
                    onSelect={onSelectVehicle}
                    whatsappNumber={whatsappNumber}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No vehicles match your search"
                description="We couldn’t find any vehicles with your exact filter criteria. Try resetting your filters or submit a bespoke sourcing request."
                actionText="Reset All Filters"
                onAction={handleResetFilters}
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer Modal */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end lg:hidden">
          <div className="w-full max-w-sm bg-white h-full overflow-y-auto p-6 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
                <h3 className="text-base font-bold text-stone-900">Filter Vehicles</h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1.5 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <VehicleFilters
                filters={filters}
                onChange={setFilters}
                onReset={handleResetFilters}
                availableMakes={availableMakes}
                totalResults={filteredVehicles.length}
              />
            </div>

            <div className="pt-6 border-t border-stone-200 mt-6">
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full py-3 bg-stone-950 text-white rounded-xl text-xs font-bold shadow-md"
              >
                View {filteredVehicles.length} Vehicles
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
