import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { VehicleStatus, ImportStatus } from '../../types';
import { StatusBadge, ImportStatusBadge } from '../ui/StatusBadge';

interface VehicleGalleryProps {
  images: string[];
  vehicleTitle: string;
  status: VehicleStatus;
  importStatus: ImportStatus;
  year: number;
}

export const VehicleGallery: React.FC<VehicleGalleryProps> = ({
  images,
  vehicleTitle,
  status,
  importStatus,
  year,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);

  const safeImages = images.length > 0 ? images : ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1400'];

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? safeImages.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === safeImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-3">
      {/* Main Image View */}
      <div className="relative aspect-16/10 rounded-2xl overflow-hidden bg-stone-900 border border-stone-200/80 group select-none shadow-sm">
        <img
          id="gallery-main-image"
          src={safeImages[currentIndex]}
          alt={`${vehicleTitle} - Photo ${currentIndex + 1}`}
          className="w-full h-full object-cover object-center transition-all duration-300"
        />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none">
          <div className="flex flex-col gap-1.5 items-start">
            <StatusBadge status={status} size="md" />
            <ImportStatusBadge status={importStatus} />
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-bold border border-white/10">
              {year} Model
            </span>
            <button
              onClick={() => setFullscreenOpen(true)}
              className="pointer-events-auto p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:text-amber-400 hover:bg-black/80 transition-colors border border-white/10"
              aria-label="View Fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation arrows (if >1 image) */}
        {safeImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors opacity-90 group-hover:opacity-100"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors opacity-90 group-hover:opacity-100"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Counter */}
        <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-black/60 backdrop-blur-xs text-white text-xs font-medium pointer-events-none">
          {currentIndex + 1} / {safeImages.length}
        </div>
      </div>

      {/* Thumbnails Row */}
      {safeImages.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5 overflow-x-auto pb-1">
          {safeImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative aspect-16/10 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                currentIndex === idx
                  ? 'border-amber-600 ring-2 ring-amber-500/20 shadow-md'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {fullscreenOpen && (
        <div
          id="fullscreen-lightbox"
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 backdrop-blur-md"
          onClick={() => setFullscreenOpen(false)}
        >
          <button
            onClick={() => setFullscreenOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div
            className="max-w-5xl max-h-[85vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={safeImages[currentIndex]}
              alt={vehicleTitle}
              className="max-h-[80vh] w-auto mx-auto rounded-lg shadow-2xl object-contain"
            />
            <div className="text-center text-stone-300 text-sm mt-4 font-medium">
              {vehicleTitle} — Photo {currentIndex + 1} of {safeImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
