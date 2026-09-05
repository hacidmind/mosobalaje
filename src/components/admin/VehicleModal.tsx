import React, { useState, useEffect } from 'react';
import { Vehicle, BodyType, FuelType, Transmission, VehicleStatus, ImportStatus } from '../../types';
import { Modal } from '../ui/Modal';
import { generateSlug } from '../../lib/store';

interface VehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Vehicle>) => void;
  vehicle?: Vehicle | null;
}

export const VehicleModal: React.FC<VehicleModalProps> = ({
  isOpen,
  onClose,
  onSave,
  vehicle,
}) => {
  const isEditing = Boolean(vehicle);

  const [formData, setFormData] = useState<Partial<Vehicle>>({
    make: '',
    model: '',
    year: 2023,
    trim: '',
    bodyType: 'SUV',
    price: 45000000,
    currency: 'NGN',
    mileage: 15000,
    mileageUnit: 'miles',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engine: '2.4L Turbo 4-Cylinder',
    exteriorColor: '',
    interiorColor: '',
    vinPlaceholder: '',
    description: '',
    features: [],
    images: [],
    status: 'Available',
    importStatus: 'At Lagos Holding Facility',
    location: 'Lagos Holding Facility',
    featured: false,
    estimatedArrival: '',
    purchasePrice: 28000,
    sellingPrice: 45000000,
  });

  const [featuresText, setFeaturesText] = useState('');
  const [imagesText, setImagesText] = useState('');

  useEffect(() => {
    if (vehicle) {
      setFormData({ ...vehicle });
      setFeaturesText(vehicle.features ? vehicle.features.join('\n') : '');
      setImagesText(vehicle.images ? vehicle.images.join('\n') : '');
    } else {
      setFormData({
        make: '',
        model: '',
        year: 2023,
        trim: '',
        bodyType: 'SUV',
        price: 45000000,
        currency: 'NGN',
        mileage: 15000,
        mileageUnit: 'miles',
        transmission: 'Automatic',
        fuelType: 'Petrol',
        engine: '',
        exteriorColor: '',
        interiorColor: '',
        vinPlaceholder: '',
        description: '',
        features: [],
        images: [],
        status: 'Available',
        importStatus: 'At Lagos Holding Facility',
        location: 'Lagos Holding Facility',
        featured: false,
        estimatedArrival: '',
        purchasePrice: 28000,
        sellingPrice: 45000000,
      });
      setFeaturesText('');
      setImagesText('');
    }
  }, [vehicle, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanFeatures = featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    const cleanImages = imagesText
      .split('\n')
      .map((i) => i.trim())
      .filter(Boolean);

    const finalImages = cleanImages.length > 0 
      ? cleanImages 
      : ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200'];

    const slug = formData.slug || generateSlug(
      formData.make || 'Vehicle',
      formData.model || 'Import',
      Number(formData.year) || 2023,
      formData.trim
    );

    onSave({
      ...formData,
      slug,
      features: cleanFeatures,
      images: finalImages,
      price: Number(formData.price),
      sellingPrice: Number(formData.price),
      year: Number(formData.year),
      mileage: Number(formData.mileage),
    });

    onClose();
  };

  const bodyTypes: BodyType[] = ['SUV', 'Sedan', 'Pickup Truck', 'Coupe', 'Convertible', 'Van', 'Hatchback'];
  const statuses: VehicleStatus[] = ['Available', 'In Transit', 'Coming Soon', 'Reserved', 'Sold'];
  const importStatuses: ImportStatus[] = [
    'Sourced in USA/Europe',
    'Port of Export',
    'On High Seas',
    'Tin Can Island Port Clearing',
    'Customs Cleared',
    'At Lagos Holding Facility',
    'Ready for Nationwide Delivery',
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? `Edit Vehicle: ${vehicle?.year} ${vehicle?.make} ${vehicle?.model}` : 'Add New Imported Vehicle'}
      subtitle="Enter full automotive technical and commercial specifications"
      maxWidth="3xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Basic Specifications */}
        <div>
          <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider pb-2 border-b border-stone-200 mb-3">
            1. Core Vehicle Identity & Specs
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Make / Brand *</label>
              <input
                type="text"
                required
                placeholder="e.g. Lexus, Toyota, Mercedes-Benz"
                value={formData.make}
                onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Model *</label>
              <input
                type="text"
                required
                placeholder="e.g. RX 350, Prado, GLE 450"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Year *</label>
              <input
                type="number"
                required
                min={2010}
                max={2026}
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Trim / Edition</label>
              <input
                type="text"
                placeholder="e.g. F-Sport AWD, Platinum, AMG Line"
                value={formData.trim}
                onChange={(e) => setFormData({ ...formData, trim: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Body Type</label>
              <select
                value={formData.bodyType}
                onChange={(e) => setFormData({ ...formData, bodyType: e.target.value as BodyType })}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs"
              >
                {bodyTypes.map((bt) => (
                  <option key={bt} value={bt}>
                    {bt}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Engine</label>
              <input
                type="text"
                placeholder="e.g. 2.4L Turbo 4-Cyl / 3.5L V6"
                value={formData.engine}
                onChange={(e) => setFormData({ ...formData, engine: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mt-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Mileage</label>
              <input
                type="number"
                value={formData.mileage}
                onChange={(e) => setFormData({ ...formData, mileage: Number(e.target.value) })}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Unit</label>
              <select
                value={formData.mileageUnit}
                onChange={(e) => setFormData({ ...formData, mileageUnit: e.target.value as 'miles' | 'km' })}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs"
              >
                <option value="miles">Miles</option>
                <option value="km">Kilometers (km)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Transmission</label>
              <select
                value={formData.transmission}
                onChange={(e) => setFormData({ ...formData, transmission: e.target.value as Transmission })}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs"
              >
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Fuel Type</label>
              <select
                value={formData.fuelType}
                onChange={(e) => setFormData({ ...formData, fuelType: e.target.value as FuelType })}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs"
              >
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Exterior Colour</label>
              <input
                type="text"
                placeholder="e.g. Caviar Metallic Black"
                value={formData.exteriorColor}
                onChange={(e) => setFormData({ ...formData, exteriorColor: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Interior Colour</label>
              <input
                type="text"
                placeholder="e.g. Circuit Red Leather"
                value={formData.interiorColor}
                onChange={(e) => setFormData({ ...formData, interiorColor: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">VIN Placeholder / Masked</label>
              <input
                type="text"
                placeholder="e.g. 2T2HGMCA*PC02****"
                value={formData.vinPlaceholder}
                onChange={(e) => setFormData({ ...formData, vinPlaceholder: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Commercial & Logistics */}
        <div>
          <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider pb-2 border-b border-stone-200 mb-3">
            2. Commercial Pricing & Logistics Status
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Selling Price (NGN ₦) *</label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs font-bold text-stone-900"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Inventory Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as VehicleStatus })}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs font-semibold"
              >
                {statuses.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Import Clearance Stage</label>
              <select
                value={formData.importStatus}
                onChange={(e) => setFormData({ ...formData, importStatus: e.target.value as ImportStatus })}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs font-semibold"
              >
                {importStatuses.map((is) => (
                  <option key={is} value={is}>
                    {is}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Current Physical Location</label>
              <input
                type="text"
                placeholder="e.g. Lagos Holding Facility / Tin Can Island Port"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Estimated Arrival Notice (if in transit)</label>
              <input
                type="text"
                placeholder="e.g. Arrival at Tin Can Port in 7 Days"
                value={formData.estimatedArrival}
                onChange={(e) => setFormData({ ...formData, estimatedArrival: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs"
              />
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <input
              type="checkbox"
              id="vehicle-featured-check"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 text-amber-600 rounded border-stone-300"
            />
            <label htmlFor="vehicle-featured-check" className="text-xs font-bold text-stone-800 cursor-pointer">
              Mark as Featured Showroom Vehicle on Homepage
            </label>
          </div>
        </div>

        {/* Section 3: Description, Features & Images */}
        <div>
          <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider pb-2 border-b border-stone-200 mb-3">
            3. Vehicle Description, Features & Media
          </h4>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Description</label>
              <textarea
                rows={3}
                placeholder="Comprehensive vehicle description, auction source, condition notes..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Key Features (One feature per line)
              </label>
              <textarea
                rows={3}
                placeholder="Panoramic Sunroof&#10;Mark Levinson 21-Speaker Audio&#10;360 Panoramic Camera&#10;Adaptive Cruise Control"
                value={featuresText}
                onChange={(e) => setFeaturesText(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs resize-none font-mono text-[11px]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Image URLs (One image URL per line)
              </label>
              <textarea
                rows={3}
                placeholder="https://images.unsplash.com/...&#10;https://images.unsplash.com/..."
                value={imagesText}
                onChange={(e) => setImagesText(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs resize-none font-mono text-[11px]"
              />
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 text-xs font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-stone-950 hover:bg-stone-800 text-white text-xs font-bold shadow-md cursor-pointer"
          >
            {isEditing ? 'Save Changes' : 'Create & Publish Vehicle'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
