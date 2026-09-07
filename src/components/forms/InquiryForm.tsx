'use client';

import React, { useState } from 'react';
import { Send, CheckCircle, MessageCircle, User, Phone, Mail } from 'lucide-react';
import { useToast } from '../ui/Toast';
import { createInquiry } from '@/src/lib/actions';
import { getWhatsAppUrl } from '@/src/lib/formatting';
import { Vehicle } from '@/src/lib/types';

interface InquiryFormProps {
  vehicle?: Vehicle;
  whatsappNumber?: string;
}

export function InquiryForm({ vehicle, whatsappNumber }: InquiryFormProps) {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const subject = vehicle ? `Inquiry: ${vehicle.year} ${vehicle.make} ${vehicle.model}` : 'General Inquiry';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email) {
      toast({ type: 'error', title: 'Validation Error', message: 'Please fill in all required fields.' });
      return;
    }

    setSubmitting(true);
    try {
      await createInquiry({
        ...form,
        subject,
        vehicleId: vehicle?._id,
        vehicleName: vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : undefined,
        inquiryType: 'Vehicle Inquiry',
      });
      setSubmitted(true);
      toast({ type: 'success', title: 'Inquiry Submitted!', message: 'Our team will respond to you shortly.' });
    } catch (err) {
      toast({ type: 'error', title: 'Submission Failed', message: err instanceof Error ? err.message : 'Please try again or contact us directly via WhatsApp.' });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    const whatsappUrl = getWhatsAppUrl(whatsappNumber, vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : undefined);
    return (
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-8 text-center">
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-emerald-50 flex items-center justify-center">
          <CheckCircle className="w-7 h-7 text-emerald-600" />
        </div>
        <h3 className="text-lg font-bold text-stone-900">Inquiry Received!</h3>
        <p className="text-sm text-stone-500 mt-2 max-w-sm mx-auto leading-relaxed">
          Our procurement desk has received your inquiry. You will get a response within one business hour.
        </p>
        {vehicle && (
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-500 transition-colors">
            <MessageCircle className="w-4 h-4" /> Fast-Track on WhatsApp
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8">
      <h3 className="text-xl font-bold text-stone-900 mb-1">Inquire About This Vehicle</h3>
      {vehicle && (
        <p className="text-sm text-stone-500 mb-6">{vehicle.year} {vehicle.make} {vehicle.model} — {vehicle.trim}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wide">Full Name *</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input name="name" value={form.name} onChange={handleChange} type="text" className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500" placeholder="Your full name" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wide">Phone *</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input name="phone" value={form.phone} onChange={handleChange} type="tel" className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500" placeholder="+234 800 000 0000" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wide">Email *</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input name="email" value={form.email} onChange={handleChange} type="email" className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500" placeholder="your@email.com" />
            </div>
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wide">Message</label>
          <textarea name="message" value={form.message} onChange={handleChange} rows={3} className="w-full px-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 resize-none" placeholder="Any specific questions about this vehicle?" />
        </div>
        <button type="submit" disabled={submitting} className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-stone-900 text-white text-sm font-bold hover:bg-stone-800 transition-colors disabled:opacity-50">
          {submitting ? 'Submitting...' : <><Send className="w-4 h-4" /> Submit Inquiry</>}
        </button>
      </form>
    </div>
  );
}
