import React from 'react';
import { 
  Fuel, 
  Gauge, 
  MapPin, 
  ArrowRight, 
  MessageCircle,
  Sparkles
} from 'lucide-react';
import { Vehicle } from '../../types';
import { StatusBadge, ImportStatusBadge } from '../ui/StatusBadge';
import { formatNaira, getWhatsAppUrl } from '../../lib/store';

interface VehicleCardProps {
  vehicle: Vehicle;
  onSelect: (vehicle: Vehicle) => void;
  whatsappNumber?: string;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  onSelect,
  whatsappNumber = '2349064153303',
}) => {
  const whatsappUrl = getWhatsAppUrl(
    whatsappNumber,
    `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim}`,
    vehicle._id.slice(-6).toUpperCase()
  );

  return (
    <div
      id={`vehicle-card-${vehicle.slug}`}
      className="group bg-white rounded-2xl border border-stone-200/90 hover:border-stone-400/80 transition-all duration-300 shadow-2xs hover:shadow-xl flex flex-col overflow-hidden"
    >
      {/* Image container */}
      <div 
        className="relative aspect-16/10 bg-stone-100 overflow-hidden cursor-pointer"
        onClick={() => onSelect(vehicle)}
      >
        <img
          src={vehicle.images[0] || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop'}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex justify-between items-start pointer-events-none">
          <div className="flex flex-col gap-1.5 items-start">
            <StatusBadge status={vehicle.status} size="sm" />
            {vehicle.featured && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-stone-950 text-amber-300 border border-amber-500/40 shadow-xs">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Featured
              </span>
            )}
          </div>

          <span className="px-2.5 py-1 rounded bg-stone-900/80 backdrop-blur-xs text-white text-[11px] font-medium tracking-wide">
            {vehicle.year}
          </span>
        </div>

        {/* Bottom overlay: Location / Import Status */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs font-medium bg-black/60 backdrop-blur-xs px-2.5 py-1.5 rounded-lg pointer-events-none">
          <span className="flex items-center gap-1 truncate max-w-[65%] text-[11px] text-stone-200">
            <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
            <span className="truncate">{vehicle.location}</span>
          </span>
          <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider shrink-0">
            {vehicle.bodyType}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Make & Model Title */}
          <div className="cursor-pointer" onClick={() => onSelect(vehicle)}>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-0.5">
              {vehicle.make}
            </div>
            <h3 className="text-lg font-bold text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-1">
              {vehicle.year} {vehicle.model}
            </h3>
            <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">
              {vehicle.trim}
            </p>
          </div>

          {/* Key Specs Pills */}
          <div className="grid grid-cols-3 gap-2 my-4 py-3 border-y border-stone-100 text-stone-600 text-xs">
            <div className="flex flex-col items-start">
              <span className="text-[10px] text-stone-600 font-medium uppercase">Mileage</span>
              <span className="font-semibold text-stone-800 flex items-center gap-1 mt-0.5">
                <Gauge className="w-3 h-3 text-stone-400" />
                {vehicle.mileage.toLocaleString()} {vehicle.mileageUnit}
              </span>
            </div>

            <div className="flex flex-col items-start border-l border-stone-100 pl-2">
              <span className="text-[10px] text-stone-600 font-medium uppercase">Trans</span>
              <span className="font-semibold text-stone-800 mt-0.5 truncate max-w-full">
                {vehicle.transmission}
              </span>
            </div>

            <div className="flex flex-col items-start border-l border-stone-100 pl-2">
              <span className="text-[10px] text-stone-600 font-medium uppercase">Fuel</span>
              <span className="font-semibold text-stone-800 flex items-center gap-1 mt-0.5">
                <Fuel className="w-3 h-3 text-stone-400" />
                {vehicle.fuelType}
              </span>
            </div>
          </div>

          {/* Import Stage Badge */}
          <div className="mb-4">
            <ImportStatusBadge status={vehicle.importStatus} />
          </div>
        </div>

        {/* Price & Actions */}
        <div className="pt-2">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-[11px] text-stone-600 font-medium block">Price (Lagos Cleared)</span>
              <span className="text-xl font-extrabold text-stone-950 tracking-tight">
                {formatNaira(vehicle.price)}
              </span>
            </div>
            {vehicle.status === 'In Transit' && vehicle.estimatedArrival && (
              <span className="text-[11px] text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded">
                On Vessel
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              id={`vehicle-details-btn-${vehicle.slug}`}
              onClick={() => onSelect(vehicle)}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-stone-950 hover:bg-stone-800 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              <span>View Specs</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </button>

            <a
              id={`vehicle-card-whatsapp-${vehicle.slug}`}
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg border border-emerald-600/30 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
