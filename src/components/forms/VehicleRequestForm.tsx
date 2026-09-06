'use client';

import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle, Send, Calendar, Car, Banknote, User, Phone, Mail, MessageCircle } from 'lucide-react';
import { useToast } from '../ui/Toast';
import { createVehicleRequest } from '@/src/lib/data';
import { getWhatsAppUrl } from '@/src/lib/formatting';

interface VehicleRequestFormProps {
  whatsappNumber?: string;
}

export function VehicleRequestForm({ whatsappNumber }: VehicleRequestFormProps) {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    preferredMake: '',
    preferredModel: '',
    minYear: new Date().getFullYear() - 3,
    maxYear: new Date().getFullYear(),
    budget: '',
    transmission: 'Any',
    fuelType: 'Any',
    bodyType: 'Any',
    requirements: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: ['minYear', 'maxYear'].includes(name) ? parseInt(value) || 2023 : value,
    }));
  };

  const canNext = () => {
    if (step === 1) return form.name && form.phone && form.email;
    if (step === 2) return form.preferredMake && form.preferredModel;
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canNext()) {
      toast({ type: 'error', title: 'Validation Error', message: 'Please fill in all required fields.' });
      return;
    }

    setSubmitting(true);
    try {
      await createVehicleRequest(form);
      setSubmitted(true);
      toast({ type: 'success', title: 'Request Submitted!', message: 'Our sourcing team will review your requirements and get back to you shortly.' });
    } catch (err) {
      toast({ type: 'error', title: 'Submission Failed', message: err instanceof Error ? err.message : 'Please try again or contact us via WhatsApp.' });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    const whatsappUrl = getWhatsAppUrl(whatsappNumber);
    return (
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-8 text-center">
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-emerald-50 flex items-center justify-center">
          <CheckCircle className="w-7 h-7 text-emerald-600" />
        </div>
        <h3 className="text-lg font-bold text-stone-900">Vehicle Sourcing Request Received!</h3>
        <p className="text-sm text-stone-500 mt-2 max-w-sm mx-auto leading-relaxed">
          Our procurement desk has received your custom vehicle request for {form.preferredMake} {form.preferredModel}. We will review global auctions and dealer networks to find your exact specification.
        </p>
        <div className="mt-6 p-4 rounded-xl bg-stone-50 border border-stone-200 text-left text-sm space-y-1.5">
          <p><strong>Requested:</strong> {form.preferredMake} {form.preferredModel} ({form.minYear}-{form.maxYear})</p>
          <p><strong>Transmission:</strong> {form.transmission} | <strong>Fuel:</strong> {form.fuelType}</p>
          {form.budget && <p><strong>Budget:</strong> {form.budget}</p>}
        </div>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-500 transition-colors">
          <MessageCircle className="w-4 h-4" /> Chat with Sourcing Desk
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-400'}`}>1</div>
        <div className={`h-0.5 flex-1 ${step >= 2 ? 'bg-stone-900' : 'bg-stone-200'}`} />
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-400'}`}>2</div>
        <div className={`h-0.5 flex-1 ${step >= 3 ? 'bg-stone-900' : 'bg-stone-200'}`} />
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step >= 3 ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-400'}`}>3</div>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2"><User className="w-5 h-5 text-amber-500" /> Your Contact Details</h3>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wide">Full Name *</label>
              <input name="name" value={form.name} onChange={handleChange} className="w-full px-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500" placeholder="Your full name" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wide">Phone *</label>
                <input name="phone" value={form.phone} onChange={handleChange} className="w-full px-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500" placeholder="+234 800 000 0000" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wide">Email *</label>
                <input name="email" value={form.email} onChange={handleChange} type="email" className="w-full px-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500" placeholder="your@email.com" />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2"><Car className="w-5 h-5 text-amber-500" /> Vehicle Specifications</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wide">Preferred Make *</label>
                <input name="preferredMake" value={form.preferredMake} onChange={handleChange} className="w-full px-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500" placeholder="e.g. Toyota, Lexus" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wide">Preferred Model *</label>
                <input name="preferredModel" value={form.preferredModel} onChange={handleChange} className="w-full px-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500" placeholder="e.g. Land Cruiser" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wide">Min Year</label>
                <input name="minYear" type="number" value={form.minYear} onChange={handleChange} className="w-full px-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500" min={1990} max={2027} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wide">Max Year</label>
                <input name="maxYear" type="number" value={form.maxYear} onChange={handleChange} className="w-full px-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500" min={1990} max={2027} />
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wide">Transmission</label>
                <select name="transmission" value={form.transmission} onChange={handleChange} className="w-full px-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500">
                  <option value="Any">Any</option>
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wide">Fuel Type</label>
                <select name="fuelType" value={form.fuelType} onChange={handleChange} className="w-full px-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500">
                  <option value="Any">Any</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wide">Body Type</label>
                <select name="bodyType" value={form.bodyType} onChange={handleChange} className="w-full px-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500">
                  <option value="Any">Any</option>
                  <option value="SUV">SUV</option>
                  <option value="Sedan">Sedan</option>
                  <option value="Pickup Truck">Pickup Truck</option>
                  <option value="Coupe">Coupe</option>
                  <option value="Convertible">Convertible</option>
                  <option value="Van">Van</option>
                  <option value="Hatchback">Hatchback</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2"><Banknote className="w-5 h-5 text-amber-500" /> Budget & Requirements</h3>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wide">Budget Range</label>
              <input name="budget" value={form.budget} onChange={handleChange} className="w-full px-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500" placeholder="e.g. ₦40,000,000 - ₦55,000,000" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wide">Additional Requirements</label>
              <textarea name="requirements" value={form.requirements} onChange={handleChange} rows={4} className="w-full px-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 resize-none" placeholder="Specific color, features, inspection requirements, delivery timeline, etc." />
            </div>
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
              <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2"><Calendar className="w-4 h-4 text-amber-600" /> Procurement Summary</h4>
              <p className="text-xs text-stone-600 mt-1">Make: {form.preferredMake || '—'} | Model: {form.preferredModel || '—'} | Year Range: {form.minYear}-{form.maxYear} | Budget: {form.budget || 'Not specified'}</p>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8 pt-6 border-t border-stone-100">
          {step > 1 ? (
            <button type="button" onClick={() => setStep(step - 1)} className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-stone-600 hover:text-stone-900 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          ) : <div />}

          {step < 3 ? (
            <button type="button" onClick={() => canNext() && setStep(step + 1)} disabled={!canNext()} className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-stone-900 text-white text-sm font-bold hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button type="submit" disabled={submitting} className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 text-stone-950 text-sm font-bold hover:bg-amber-400 transition-colors disabled:opacity-50 shadow-sm">
              {submitting ? 'Submitting...' : <><Send className="w-4 h-4" /> Submit Request</>}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}