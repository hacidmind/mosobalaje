import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  Gauge, 
  Fuel, 
  Cpu, 
  FileCheck2, 
  CheckCircle2, 
  Share2, 
  MessageCircle, 
  Phone, 
  ChevronRight,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { Vehicle } from '../types';
import { VehicleGallery } from '../components/vehicles/VehicleGallery';
import { InquiryForm } from '../components/forms/InquiryForm';
import { StatusBadge, ImportStatusBadge } from '../components/ui/StatusBadge';
import { VehicleCard } from '../components/vehicles/VehicleCard';
import { formatNaira, getWhatsAppUrl } from '../lib/store';
import { useToast } from '../components/ui/Toast';

interface VehicleDetailPageProps {
  vehicle: Vehicle;
  allVehicles: Vehicle[];
  onBack: () => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
  whatsappNumber?: string;
}

export const VehicleDetailPage: React.FC<VehicleDetailPageProps> = ({
  vehicle,
  allVehicles,
  onBack,
  onSelectVehicle,
  whatsappNumber = '2349064153303',
}) => {
  const { toast } = useToast();
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const cleanPhone = (whatsappNumber || '2349064153303').replace(/[^0-9+]/g, '');

  const relatedVehicles = allVehicles
    .filter((v) => v._id !== vehicle._id && (v.make === vehicle.make || v.bodyType === vehicle.bodyType))
    .slice(0, 3);

  const whatsappUrl = getWhatsAppUrl(
    whatsappNumber,
    `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim}`,
    vehicle._id.slice(-6).toUpperCase()
  );

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${vehicle.year} ${vehicle.make} ${vehicle.model} | Mosobalaje Vehicle Imports`,
        text: `Check out this verified imported ${vehicle.year} ${vehicle.make} ${vehicle.model} on Mosobalaje Vehicle Imports:`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        type: 'success',
        title: 'Link Copied',
        message: 'Vehicle URL has been copied to your clipboard.',
      });
    }
  };

  return (
    <div id="vehicle-detail-view" className="py-8 bg-[#fcfbf9] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Breadcrumb & Actions */}
        <div className="flex items-center justify-between pb-6 border-b border-stone-200/80 mb-8">
          <button
            id="back-to-inventory-btn"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-stone-950 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Inventory</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-semibold transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Vehicle</span>
            </button>
          </div>
        </div>

        {/* Primary Content Grid: Left Details & Right Sticky Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Main Column: Gallery, Specs, Description, Features */}
          <div className="lg:col-span-8 space-y-10">
            {/* Gallery */}
            <VehicleGallery
              images={vehicle.images}
              vehicleTitle={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              status={vehicle.status}
              importStatus={vehicle.importStatus}
              year={vehicle.year}
            />

            {/* Vehicle Title & Key Highlights (Mobile & Desktop Header) */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
                  {vehicle.make}
                </span>
                <span className="text-stone-300">•</span>
                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  Ref: {vehicle._id.slice(-6).toUpperCase()}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-950 tracking-tight">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h1>

              <p className="text-base text-stone-600 mt-1 font-medium">
                {vehicle.trim}
              </p>

              {/* Price Banner for Mobile */}
              <div className="lg:hidden mt-4 p-4 rounded-2xl bg-white border border-stone-200 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-stone-500 uppercase font-semibold block">Selling Price</span>
                  <span className="text-2xl font-black text-stone-950">
                    {formatNaira(vehicle.price)}
                  </span>
                </div>
                <StatusBadge status={vehicle.status} size="md" />
              </div>
            </div>

            {/* Specification Grid Cards */}
            <div className="bg-white rounded-2xl border border-stone-200/90 p-6 shadow-2xs">
              <h3 className="text-sm font-bold text-stone-950 uppercase tracking-wider pb-3 border-b border-stone-100 mb-5">
                Technical Specifications & Provenance
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-5 gap-x-4 text-xs">
                <div>
                  <span className="text-stone-600 block text-[11px] uppercase font-semibold">Make & Model</span>
                  <span className="font-bold text-stone-900 text-sm mt-0.5 block">{vehicle.make} {vehicle.model}</span>
                </div>

                <div>
                  <span className="text-stone-600 block text-[11px] uppercase font-semibold">Year</span>
                  <span className="font-bold text-stone-900 text-sm mt-0.5 block">{vehicle.year}</span>
                </div>

                <div>
                  <span className="text-stone-600 block text-[11px] uppercase font-semibold">Mileage</span>
                  <span className="font-bold text-stone-900 text-sm mt-0.5 block">
                    {vehicle.mileage.toLocaleString()} {vehicle.mileageUnit}
                  </span>
                </div>

                <div>
                  <span className="text-stone-600 block text-[11px] uppercase font-semibold">Transmission</span>
                  <span className="font-bold text-stone-900 text-sm mt-0.5 block">{vehicle.transmission}</span>
                </div>

                <div>
                  <span className="text-stone-600 block text-[11px] uppercase font-semibold">Fuel Type</span>
                  <span className="font-bold text-stone-900 text-sm mt-0.5 block">{vehicle.fuelType}</span>
                </div>

                <div>
                  <span className="text-stone-600 block text-[11px] uppercase font-semibold">Engine</span>
                  <span className="font-bold text-stone-900 text-sm mt-0.5 block">{vehicle.engine || 'Standard'}</span>
                </div>

                <div>
                  <span className="text-stone-600 block text-[11px] uppercase font-semibold">Body Style</span>
                  <span className="font-bold text-stone-900 text-sm mt-0.5 block">{vehicle.bodyType}</span>
                </div>

                <div>
                  <span className="text-stone-600 block text-[11px] uppercase font-semibold">Exterior Colour</span>
                  <span className="font-bold text-stone-900 text-sm mt-0.5 block">{vehicle.exteriorColor || 'Metallic'}</span>
                </div>

                <div>
                  <span className="text-stone-600 block text-[11px] uppercase font-semibold">Interior Colour</span>
                  <span className="font-bold text-stone-900 text-sm mt-0.5 block">{vehicle.interiorColor || 'Leather'}</span>
                </div>

                <div>
                  <span className="text-stone-600 block text-[11px] uppercase font-semibold">Masked VIN</span>
                  <span className="font-mono font-bold text-stone-800 text-xs mt-0.5 block">
                    {vehicle.vinPlaceholder || 'Available upon request'}
                  </span>
                </div>

                <div>
                  <span className="text-stone-600 block text-[11px] uppercase font-semibold">Showroom Location</span>
                  <span className="font-bold text-stone-900 text-sm mt-0.5 block">{vehicle.location}</span>
                </div>

                <div>
                  <span className="text-stone-600 block text-[11px] uppercase font-semibold">Import Status</span>
                  <span className="font-bold text-amber-800 text-sm mt-0.5 block">{vehicle.importStatus}</span>
                </div>
              </div>
            </div>

            {/* Comprehensive Vehicle Description */}
            <div className="bg-white rounded-2xl border border-stone-200/90 p-6 shadow-2xs">
              <h3 className="text-sm font-bold text-stone-950 uppercase tracking-wider pb-3 border-b border-stone-100 mb-4">
                Vehicle Overview
              </h3>
              <p className="text-sm text-stone-700 leading-relaxed whitespace-pre-line">
                {vehicle.description}
              </p>
            </div>

            {/* Key Features List */}
            {vehicle.features && vehicle.features.length > 0 && (
              <div className="bg-white rounded-2xl border border-stone-200/90 p-6 shadow-2xs">
                <h3 className="text-sm font-bold text-stone-950 uppercase tracking-wider pb-3 border-b border-stone-100 mb-4">
                  Factory Packages & Key Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {vehicle.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Customs & Provenance Guarantees */}
            <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-stone-900 space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-700" />
                <h4 className="font-bold text-sm text-stone-950">
                  Guaranteed Clean Nigerian Customs Settlement
                </h4>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed">
                This vehicle comes with full documentation: verifiable Nigeria Customs Service Single Goods Declaration (SGD), genuine assessment notices, and official port exit passes. No fraudulent duty stamps, no police impound risk. Sourced with direct IAA & Copart registered bidder credentials.
              </p>
            </div>
          </div>

          {/* Right Sticky Inquiry & Purchase Panel (Desktop) */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-md space-y-6">
              <div>
                <span className="text-xs text-stone-500 uppercase font-bold block">
                  Total Landed & Cleared Price
                </span>
                <div className="text-3xl font-black text-stone-950 tracking-tight mt-1">
                  {formatNaira(vehicle.price)}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <StatusBadge status={vehicle.status} size="sm" />
                  <span className="text-xs text-stone-500">
                    Location: {vehicle.location}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                <a
                  id="detail-whatsapp-btn"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Inquire via WhatsApp</span>
                </a>

                <a
                  href={`tel:${cleanPhone}`}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800 font-bold text-xs transition-colors"
                >
                  <Phone className="w-4 h-4 text-stone-600" />
                  <span>Call Direct Desk</span>
                </a>
              </div>

              <div className="pt-4 border-t border-stone-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-3">
                  Submit Formal Inspection Inquiry
                </h4>
                <InquiryForm vehicle={vehicle} whatsappNumber={whatsappNumber} />
              </div>
            </div>
          </div>
        </div>

        {/* Related Vehicles Section */}
        {relatedVehicles.length > 0 && (
          <div className="mt-20 pt-12 border-t border-stone-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-stone-950">Similar Imported Vehicles</h3>
                <p className="text-xs text-stone-500 mt-1">
                  Other available options in our inventory matching this category.
                </p>
              </div>
              <button
                onClick={onBack}
                className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
              >
                View Full Inventory
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedVehicles.map((rel) => (
                <VehicleCard
                  key={rel._id}
                  vehicle={rel}
                  onSelect={onSelectVehicle}
                  whatsappNumber={whatsappNumber}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Persistent Mobile Bottom Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 p-3 shadow-2xl flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-stone-500 uppercase block font-semibold">Lagos Price</span>
          <span className="text-lg font-black text-stone-950 block leading-tight">
            {formatNaira(vehicle.price)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-md"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>
          <a
            href={`tel:${cleanPhone}`}
            className="p-2.5 rounded-xl bg-stone-900 text-white"
            aria-label="Call"
          >
            <Phone className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
