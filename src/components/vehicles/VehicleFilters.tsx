'use client';

import React, { useState, useEffect, useDeferredValue } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Vehicle } from '@/src/lib/types';

interface VehicleFiltersProps {
  vehicles: Vehicle[];
  onFilter: (filtered: Vehicle[]) => void;
  initialSearch?: string;
  initialMake?: string;
}

export function VehicleFilters({ vehicles, onFilter, initialSearch = '', initialMake = '' }: VehicleFiltersProps) {
  const [search, setSearch] = useState(initialSearch);
  const [makeFilter, setMakeFilter] = useState(initialMake);
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  const makes = Array.from(new Set(vehicles.map((v) => v.make))).sort();
  const statuses = ['All', 'Available', 'In Transit', 'Reserved', 'Sold', 'Coming Soon'];

  const deferredSearch = useDeferredValue(search);

  useEffect(() => {
    let result = [...vehicles];

    if (deferredSearch.trim()) {
      const q = deferredSearch.trim().toLowerCase();
      result = result.filter(
        (v) =>
          v.make.toLowerCase().includes(q) ||
          v.model.toLowerCase().includes(q) ||
          v.year.toString().includes(q) ||
          v.description.toLowerCase().includes(q) ||
          v.trim.toLowerCase().includes(q),
      );
    }

    if (makeFilter) {
      result = result.filter((v) => v.make.toLowerCase() === makeFilter.toLowerCase());
    }

    if (statusFilter !== 'All') {
      result = result.filter((v) => v.status === statusFilter);
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'year-desc':
        result.sort((a, b) => b.year - a.year);
        break;
      case 'year-asc':
        result.sort((a, b) => a.year - b.year);
        break;
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    onFilter(result);
  }, [vehicles, deferredSearch, makeFilter, statusFilter, sortBy, onFilter]);

  const clearFilters = () => {
    setSearch('');
    setMakeFilter('');
    setStatusFilter('All');
    setSortBy('newest');
    onFilter(vehicles);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="search"
            aria-label="Search vehicles"
            placeholder="Search by make, model, year, or keyword..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); }}
            className="w-full pl-10 pr-10 py-3 rounded-xl border border-stone-300 bg-white text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
          />
          {search && (
            <button aria-label="Clear search" onClick={() => { setSearch(''); }} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <button
          aria-expanded={showFilters}
          aria-controls="inventory-filters"
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-semibold transition-all ${
            showFilters ? 'bg-stone-100 border-stone-400 text-stone-900' : 'bg-white border-stone-300 text-stone-600 hover:bg-stone-50'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {(makeFilter || statusFilter !== 'All') && (
            <span className="w-2 h-2 rounded-full bg-amber-500" />
          )}
        </button>
        <select
          aria-label="Sort vehicles"
          value={sortBy}
          onChange={(e) => { setSortBy(e.target.value); }}
          className="px-4 py-3 rounded-xl border border-stone-300 bg-white text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
        >
          <option value="newest">Newest First</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="year-desc">Year: Newest</option>
          <option value="year-asc">Year: Oldest</option>
        </select>
      </div>

      {showFilters && (
        <div id="inventory-filters" className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-wrap gap-3 items-center">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-semibold text-stone-500 mb-1.5 uppercase tracking-wide">Make</label>
            <select aria-label="Vehicle make" value={makeFilter} onChange={(e) => { setMakeFilter(e.target.value); }} className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30">
              <option value="">All Makes</option>
              {makes.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-semibold text-stone-500 mb-1.5 uppercase tracking-wide">Status</label>
            <select aria-label="Vehicle availability" value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); }} className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30">
              {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <button onClick={clearFilters} className="mt-5 px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 hover:bg-stone-200 rounded-lg transition-colors flex items-center gap-1.5">
            <RefreshCw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
      )}
    </div>
  );
}

import { RefreshCw } from 'lucide-react';