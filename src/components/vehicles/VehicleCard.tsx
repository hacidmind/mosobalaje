'use client';

import React from 'react';
import { formatNaira, getWhatsAppUrl } from '@/src/lib/formatting';
import { StatusBadge, ImportStatusBadge } from '../ui/StatusBadge';
import { Vehicle } from '@/src/lib/types';
import { ArrowRight, MessageCircle, ShieldCheck } from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle;
  onSelect: (vehicle: Vehicle) => void;
  whatsappNumber?: string;
  featured?: boolean;
}

export function VehicleCard({ vehicle, onSelect, whatsappNumber, featured }: VehicleCardProps) {
  const image = vehicle.images?.[0] || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600';
  const whatsappUrl = getWhatsAppUrl(whatsappNumber, `${vehicle.year} ${vehicle.make} ${vehicle.model}`, vehicle.vinPlaceholder);

  return (
    <div className={`group relative bg-white rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl cursor-pointer ${featured ? 'border-amber-300/60 ring-1 ring-amber-300/30' : 'border-stone-200/80 hover:border-stone-300'}`}>
      {featured && (
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2.5 py-1 rounded-full bg-amber-500 text-stone-950 text-[10px] font-bold uppercase tracking-wider shadow-sm">Featured</span>
        </div>
      )}

      <div className="relative aspect-16/9 overflow-hidden bg-stone-100" onClick={() => onSelect(vehicle)}>
        <img src={image} alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex gap-2">
            <StatusBadge status={vehicle.status} size="sm" />
            {vehicle.mileage > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-[11px] font-semibold">
                {vehicle.mileage.toLocaleString()} {vehicle.mileageUnit}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="p-5 space-y-3" onClick={() => onSelect(vehicle)}>
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs text-stone-500 font-medium tracking-wide uppercase">{vehicle.make}</p>
              <h3 className="text-lg font-bold text-stone-900 leading-tight">
                {vehicle.model} <span className="text-stone-400 font-normal text-sm">{vehicle.year}</span>
              </h3>
            </div>
            <span className="text-lg font-extrabold text-stone-900 whitespace-nowrap">{formatNaira(vehicle.price)}</span>
          </div>
          <p className="text-xs text-stone-500 mt-1">{vehicle.trim}</p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 text-[11px] font-medium">{vehicle.engine}</span>
          <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 text-[11px] font-medium">{vehicle.transmission}</span>
          <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 text-[11px] font-medium">{vehicle.fuelType}</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-stone-500">
          <ShieldCheck className="w-3 h-3 text-emerald-600" />
          <ImportStatusBadge status={vehicle.importStatus} />
        </div>
      </div>

      <div className="px-5 pb-5 flex flex-col gap-2">
        <button onClick={() => onSelect(vehicle)} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-stone-900 text-white text-sm font-semibold hover:bg-stone-800 transition-colors">
          View Details <ArrowRight className="w-4 h-4" />
        </button>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 hover:bg-emerald-100 transition-colors">
          <MessageCircle className="w-3.5 h-3.5" /> Inquire on WhatsApp
        </a>
      </div>
    </div>
  );
}