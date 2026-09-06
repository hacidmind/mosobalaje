'use client';

import React from 'react';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import { VehicleRequestForm } from '@/src/components/forms/VehicleRequestForm';

export default function RequestVehiclePage() {
  return (
    <div className="min-h-screen bg-[#fcfbf9]">
      <section className="bg-stone-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge="Custom Sourcing" title="Request a Vehicle" subtitle="Can't find what you're looking for in stock? Our procurement team will source your exact specification from global auctions and dealer networks." dark />
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <VehicleRequestForm whatsappNumber="2349064153303" />
        </div>
      </section>
    </div>
  );
}