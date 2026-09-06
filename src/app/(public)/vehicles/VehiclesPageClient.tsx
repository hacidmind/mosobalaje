'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { VehicleFilters } from '@/src/components/vehicles/VehicleFilters';
import { VehicleCard } from '@/src/components/vehicles/VehicleCard';
import { EmptyState } from '@/src/components/ui/SectionHeader';
import { Vehicle } from '@/src/lib/types';
import { SectionHeader } from '@/src/components/ui/SectionHeader';

interface Props {
  vehicles: Vehicle[];
}

export function VehiclesPageClient({ vehicles }: Props) {
  const router = useRouter();
  const [filtered, setFiltered] = useState<Vehicle[]>(vehicles || []);

  const handleSelectVehicle = (vehicle: Vehicle) => {
    router.push(`/vehicles/${vehicle.slug}`);
  };

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
            <VehicleFilters vehicles={vehicles || []} onFilter={setFiltered} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filtered.length === 0 ? (
          <EmptyState
            title="No vehicles match your current filters"
            description="Try adjusting your search criteria or browse our full inventory."
            onAction={() => setFiltered(vehicles || [])}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((v) => (
              <VehicleCard key={v._id} vehicle={v} onSelect={handleSelectVehicle} />
            ))}
          </div>
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