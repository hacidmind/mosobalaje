import React, { useState } from 'react';
import { Send, CheckCircle2, ArrowRight, ShieldCheck, Car } from 'lucide-react';
import { BodyType, FuelType, Transmission } from '../../types';
import { store, getWhatsAppUrl } from '../../lib/store';
import { useToast } from '../ui/Toast';

interface VehicleRequestFormProps {
  onSuccess?: () => void;
  whatsappNumber?: string;
}

export const VehicleRequestForm: React.FC<VehicleRequestFormProps> = ({
  onSuccess,
  whatsappNumber = '2349064153303',
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    preferredMake: '',
    preferredModel: '',
    minYear: 2021,
    maxYear: 2024,
    budget: '',
    transmission: 'Automatic' as Transmission | 'Any',
    fuelType: 'Petrol' as FuelType | 'Any',
    bodyType: 'SUV' as BodyType | 'Any',
    requirements: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim() || !formData.preferredMake.trim() || !formData.preferredModel.trim()) {
      toast({
        type: 'error',
        title: 'Required Information Needed',
        message: 'Please fill in your name, phone number, vehicle make, and model.',
      });
      return;
    }

    setLoading(true);

    try {
      store.createVehicleRequest({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        preferredMake: formData.preferredMake.trim(),
        preferredModel: formData.preferredModel.trim(),
        minYear: Number(formData.minYear),
        maxYear: Number(formData.maxYear),
        budget: formData.budget.trim() || 'Flexible / Market Assessment',
        transmission: formData.transmission,
        fuelType: formData.fuelType,
        bodyType: formData.bodyType,
        requirements: formData.requirements.trim(),
      });

      setSubmitted(true);
      toast({
        type: 'success',
        title: 'Custom Import Request Received',
        message: `Your request for a ${formData.preferredMake} ${formData.preferredModel} has been logged in our procurement system.`,
      });

      if (onSuccess) onSuccess();
    } catch {
      toast({
        type: 'error',
        title: 'Submission Error',
        message: 'Unable to submit vehicle request. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const whatsappUrl = getWhatsAppUrl(
    whatsappNumber,
    `${formData.preferredMake || 'Custom'} ${formData.preferredModel || 'Vehicle'} (${formData.minYear}-${formData.maxYear})`
  );

  if (submitted) {
    return (
      <div id="request-confirmed-view" className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-sm">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
          Procurement Docket Created
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-3 mb-3">
          Vehicle Sourcing Request Submitted
        </h3>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-6">
          Thank you, <strong className="text-stone-900">{formData.name}</strong>. Our international procurement team in North America and Europe has received your requirement for a{' '}
          <span className="font-semibold text-stone-900">{formData.preferredMake} {formData.preferredModel} ({formData.minYear}–{formData.maxYear})</span>.
        </p>

        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 text-left text-xs text-stone-700 space-y-2 mb-8">
          <div className="flex justify-between border-b border-stone-200 pb-2">
            <span className="text-stone-500">Contact Number:</span>
            <span className="font-semibold text-stone-900">{formData.phone}</span>
          </div>
          <div className="flex justify-between border-b border-stone-200 pb-2">
            <span className="text-stone-500">Target Budget:</span>
            <span className="font-semibold text-stone-900">{formData.budget || 'Market Rate'}</span>
          </div>
          <div className="flex justify-between border-b border-stone-200 pb-2">
            <span className="text-stone-500">Next Action:</span>
            <span className="font-semibold text-amber-700">Auction shortlist compilation (24–48 hrs)</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-colors"
          >
            <span>Notify Director via WhatsApp</span>
          </a>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: '',
                phone: '',
                email: '',
                preferredMake: '',
                preferredModel: '',
                minYear: 2021,
                maxYear: 2024,
                budget: '',
                transmission: 'Automatic',
                fuelType: 'Petrol',
                bodyType: 'SUV',
                requirements: '',
              });
            }}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-sm transition-colors cursor-pointer"
          >
            <span>Submit Another Vehicle</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-sm space-y-8">
      {/* Step 1: Customer Contact Details */}
      <div>
        <div className="flex items-center gap-2 pb-3 border-b border-stone-100 mb-5">
          <span className="w-6 h-6 rounded-full bg-stone-900 text-white font-bold text-xs flex items-center justify-center">1</span>
          <h4 className="text-base font-bold text-stone-900">Your Contact Details</h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Alhaji Sanni Bello"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 outline-hidden transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Phone (WhatsApp Enabled) <span className="text-rose-500">*</span>
            </label>
            <input
              type="tel"
              required
              placeholder="e.g. 0803 234 5678"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 outline-hidden transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="sanni@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 outline-hidden transition-all"
            />
          </div>
        </div>
      </div>

      {/* Step 2: Desired Vehicle Specifications */}
      <div>
        <div className="flex items-center gap-2 pb-3 border-b border-stone-100 mb-5">
          <span className="w-6 h-6 rounded-full bg-stone-900 text-white font-bold text-xs flex items-center justify-center">2</span>
          <h4 className="text-base font-bold text-stone-900">Vehicle Specifications</h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Preferred Make <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Toyota, Lexus, Mercedes"
              value={formData.preferredMake}
              onChange={(e) => setFormData({ ...formData, preferredMake: e.target.value })}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 outline-hidden transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Preferred Model <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Land Cruiser, RX 350, GLE"
              value={formData.preferredModel}
              onChange={(e) => setFormData({ ...formData, preferredModel: e.target.value })}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 outline-hidden transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Minimum Year
            </label>
            <select
              value={formData.minYear}
              onChange={(e) => setFormData({ ...formData, minYear: Number(e.target.value) })}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 outline-hidden transition-all"
            >
              {[2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016].map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Maximum Year
            </label>
            <select
              value={formData.maxYear}
              onChange={(e) => setFormData({ ...formData, maxYear: Number(e.target.value) })}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 outline-hidden transition-all"
            >
              {[2025, 2024, 2023, 2022, 2021, 2020].map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Body Type
            </label>
            <select
              value={formData.bodyType}
              onChange={(e) => setFormData({ ...formData, bodyType: e.target.value as BodyType | 'Any' })}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 outline-hidden transition-all"
            >
              <option value="Any">Any Body Style</option>
              <option value="SUV">SUV (Sport Utility Vehicle)</option>
              <option value="Sedan">Sedan / Saloon</option>
              <option value="Pickup Truck">Pickup Truck (Hilux / F-150)</option>
              <option value="Coupe">Coupe / Sport</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Transmission
            </label>
            <select
              value={formData.transmission}
              onChange={(e) => setFormData({ ...formData, transmission: e.target.value as Transmission | 'Any' })}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 outline-hidden transition-all"
            >
              <option value="Automatic">Automatic Transmission</option>
              <option value="Manual">Manual Transmission</option>
              <option value="Any">Any Transmission</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Fuel Type
            </label>
            <select
              value={formData.fuelType}
              onChange={(e) => setFormData({ ...formData, fuelType: e.target.value as FuelType | 'Any' })}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 outline-hidden transition-all"
            >
              <option value="Petrol">Petrol (Gasoline)</option>
              <option value="Diesel">Diesel</option>
              <option value="Hybrid">Hybrid / Mild Hybrid</option>
              <option value="Any">Any Fuel</option>
            </select>
          </div>
        </div>
      </div>

      {/* Step 3: Budget & Additional Directives */}
      <div>
        <div className="flex items-center gap-2 pb-3 border-b border-stone-100 mb-5">
          <span className="w-6 h-6 rounded-full bg-stone-900 text-white font-bold text-xs flex items-center justify-center">3</span>
          <h4 className="text-base font-bold text-stone-900">Budget Range & Special Preferences</h4>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Target Total Budget (Inclusive of Shipping & Nigerian Customs Duty)
            </label>
            <input
              type="text"
              placeholder="e.g. ₦45,000,000 to ₦55,000,000 or $35,000 USD landed"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 outline-hidden transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Specific Color, Packages, or Inspection Directives
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Prefer Caviar Black with Red interior; must have panoramic roof and 360 camera; clean title only, under 30k miles."
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 outline-hidden transition-all resize-none"
            />
          </div>
        </div>
      </div>

      {/* Guarantees & Submit */}
      <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-stone-500">
          <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
          <span>Includes preliminary Carfax check & Nigerian port duty estimation at zero initial commitment.</span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm transition-all shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50"
        >
          <Car className="w-4 h-4" />
          <span>{loading ? 'Submitting Request...' : 'Submit Custom Sourcing Request'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};
