'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, CheckCircle2, MapPin, Calendar, Gauge } from 'lucide-react';
import { VehicleGallery } from '@/src/components/vehicles/VehicleGallery';
import { VehicleCard } from '@/src/components/vehicles/VehicleCard';
import { InquiryForm } from '@/src/components/forms/InquiryForm';
import { formatNaira } from '@/src/lib/formatting';
import { Vehicle } from '@/src/lib/types';


interface Props {
  vehicle: Vehicle;
  allVehicles: Vehicle[];
  description: React.ReactNode;
}

export function VehicleDetailPageClient({ vehicle, allVehicles, description }: Props) {

  return (
    <div className="min-h-screen bg-[#fcfbf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/vehicles" className="inline-flex items-center gap-2 text-sm font-semibold text-stone-600 hover:text-stone-900 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Inventory
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <VehicleGallery
              images={vehicle.images}
              vehicleTitle={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              status={vehicle.status}
              importStatus={vehicle.importStatus}
              year={vehicle.year}
            />

            <div>
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <p className="text-sm text-stone-500 font-medium uppercase tracking-wide">{vehicle.make}</p>
                  <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
                    {vehicle.model} <span className="text-stone-400 font-medium">{vehicle.year}</span>
                  </h1>
                  <p className="text-sm text-stone-500 mt-1">{vehicle.trim}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-extrabold text-stone-900">{formatNaira(vehicle.price)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 p-5 rounded-2xl bg-stone-50 border border-stone-200">
                <div className="text-center"><p className="text-xs text-stone-500 uppercase tracking-wide">Mileage</p><p className="text-sm font-bold text-stone-900">{vehicle.mileage.toLocaleString()} {vehicle.mileageUnit}</p></div>
                <div className="text-center"><p className="text-xs text-stone-500 uppercase tracking-wide">Transmission</p><p className="text-sm font-bold text-stone-900">{vehicle.transmission}</p></div>
                <div className="text-center"><p className="text-xs text-stone-500 uppercase tracking-wide">Fuel</p><p className="text-sm font-bold text-stone-900">{vehicle.fuelType}</p></div>
                <div className="text-center"><p className="text-xs text-stone-500 uppercase tracking-wide">Engine</p><p className="text-sm font-bold text-stone-900">{vehicle.engine}</p></div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold text-stone-900 mb-3">Description</h2>
              {description}
            </div>

            {vehicle.features && vehicle.features.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-stone-900 mb-3">Key Features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {vehicle.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-stone-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-stone-900 text-stone-200">
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-amber-400 shrink-0" /><span className="text-sm">{vehicle.location}</span></div>
              <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-amber-400 shrink-0" /><span className="text-sm">{vehicle.importStatus}</span></div>
              {vehicle.vinPlaceholder && <div className="flex items-center gap-2"><Gauge className="w-4 h-4 text-amber-400 shrink-0" /><span className="text-sm font-mono text-xs">VIN: {vehicle.vinPlaceholder}</span></div>}
            </div>

            <div className="flex items-center gap-2 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-stone-700">Single Goods Declaration (SGD) verified & customs duties fully settled for immediate transfer.</span>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <InquiryForm vehicle={vehicle} whatsappNumber="2349064153303" />
          </div>
        </div>

        {allVehicles.filter(v => v._id !== vehicle._id).length > 0 && (
          <div className="mt-16 pt-12 border-t border-stone-200">
            <h2 className="text-xl font-bold text-stone-900 mb-6">More Vehicles You Might Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allVehicles.filter(v => v._id !== vehicle._id).slice(0, 3).map((v) => (
                <VehicleCard key={v._id} vehicle={v} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}