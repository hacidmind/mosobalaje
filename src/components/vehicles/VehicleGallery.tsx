'use client';

import React, { useState } from 'react';
import { VehicleImage } from '@/src/components/vehicles/VehicleImage';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { VehicleStatus, ImportStatus } from '@/src/lib/types';
import { StatusBadge, ImportStatusBadge } from '../ui/StatusBadge';

interface VehicleGalleryProps {
  images: string[];
  vehicleTitle: string;
  status: VehicleStatus;
  importStatus: ImportStatus;
  year: number;
}

export function VehicleGallery({ images, vehicleTitle, status, importStatus, year }: VehicleGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);

  const safeImages = images.length > 0 ? images : ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1400'];

  const prevImage = () => setCurrentIndex((prev) => (prev === 0 ? safeImages.length - 1 : prev - 1));
  const nextImage = () => setCurrentIndex((prev) => (prev === safeImages.length - 1 ? 0 : prev + 1));

  return (
    <>
      <div className="space-y-3">
        <div className="relative aspect-16/10 rounded-2xl overflow-hidden bg-stone-900 border border-stone-200/80 group select-none shadow-sm">
          <VehicleImage src={safeImages[currentIndex]} alt={`${vehicleTitle} - Photo ${currentIndex + 1}`} fill sizes="(max-width: 1023px) 100vw, 65vw" preload={currentIndex === 0} unoptimized={!safeImages[currentIndex].startsWith('https://images.unsplash.com/')} className="object-cover object-center" />

          <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none">
            <div className="flex flex-col gap-1.5 items-start">
              <StatusBadge status={status} size="md" />
              <ImportStatusBadge status={importStatus} />
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-bold border border-white/10">{year} Model</span>
              <button onClick={() => setFullscreenOpen(true)} className="pointer-events-auto p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:text-amber-400 hover:bg-black/80 transition-colors border border-white/10" aria-label="View Fullscreen">
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {safeImages.length > 1 && (
            <>
              <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors opacity-90 group-hover:opacity-100" aria-label="Previous photo">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors opacity-90 group-hover:opacity-100" aria-label="Next photo">
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {safeImages.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {safeImages.map((img, idx) => (
              <button aria-label={`View photo ${idx + 1}`} aria-pressed={idx === currentIndex} key={idx} onClick={() => setCurrentIndex(idx)} className={`relative shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${idx === currentIndex ? 'border-amber-500 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'}`}>
                <VehicleImage src={img} alt="" fill sizes="80px" unoptimized={!img.startsWith('https://images.unsplash.com/')} className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {fullscreenOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={() => setFullscreenOpen(false)}>
          <button onClick={() => setFullscreenOpen(false)} className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10" aria-label="Close fullscreen">
            <X className="w-6 h-6" />
          </button>
          {safeImages.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10">
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
          <VehicleImage src={safeImages[currentIndex]} alt={`${vehicleTitle} - Fullscreen`} fill sizes="100vw" unoptimized={!safeImages[currentIndex].startsWith('https://images.unsplash.com/')} className="object-contain p-6" />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">{currentIndex + 1} / {safeImages.length}</div>
        </div>
      )}
    </>
  );
}