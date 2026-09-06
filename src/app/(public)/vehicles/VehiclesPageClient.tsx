'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MotionReveal } from '@/src/components/ui/MotionReveal';
import { VehicleFilters } from '@/src/components/vehicles/VehicleFilters';
import { VehicleCard } from '@/src/components/vehicles/VehicleCard';
import { EmptyState } from '@/src/components/ui/SectionHeader';
import { Vehicle } from '@/src/lib/types';
import { SectionHeader } from '@/src/components/ui/SectionHeader';

interface Props {
  vehicles: Vehicle[];
}

export function VehiclesPageClient({ vehicles }: Props) {
  const [filterKey, setFilterKey] = useState(0);
  const [filtered, setFiltered] = useState<Vehicle[]>(vehicles || []);

  const resetFilters = () => { setFilterKey(key => key + 1); setFiltered(vehicles); };

  return (
    <div className="min-h-screen bg-[#fcfbf9]">
      <div className="bg-stone-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Premium Inventory"
            title="Imported Vehicles For Sale"
            subtitle="All vehicles listed are physically present in Nigeria with verified customs clearance documentation."
            dark
          />
          <div className="max-w-3xl mx-auto mt-6">
            <VehicleFilters key={filterKey} vehicles={vehicles || []} onFilter={setFiltered} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p role="status" aria-live="polite" className="mb-6 text-sm text-stone-500"><span className="font-semibold text-stone-900">{filtered.length}</span> {filtered.length === 1 ? 'vehicle' : 'vehicles'} found</p>
        {filtered.length === 0 ? (
          <EmptyState
            title="No vehicles match your current filters"
            description="Try adjusting your search criteria or browse our full inventory."
            onAction={resetFilters}
          />
        ) : (
          <MotionReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((v) => (
              <VehicleCard key={v._id} vehicle={v} />
            ))}
          </MotionReveal>
        )}
      </div>

      <div className="text-center pb-16">
        <Link href="/request-vehicle" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-stone-900 text-white text-sm font-bold hover:bg-stone-800 transition-colors shadow-sm">
          Can&apos;t find what you&apos;re looking for? Request a custom import
        </Link>
      </div>
    </div>
  );
}