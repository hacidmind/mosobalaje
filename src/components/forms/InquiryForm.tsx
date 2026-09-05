import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldCheck, MessageCircle } from 'lucide-react';
import { Vehicle } from '../../types';
import { store, getWhatsAppUrl } from '../../lib/store';
import { useToast } from '../ui/Toast';

interface InquiryFormProps {
  vehicle?: Vehicle;
  onSuccess?: () => void;
  whatsappNumber?: string;
}

export const InquiryForm: React.FC<InquiryFormProps> = ({
  vehicle,
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
    subject: vehicle ? `Inquiry regarding ${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim}` : 'General Vehicle Import Inquiry',
    message: vehicle
      ? `Hello Mosobalaje Team, I am interested in inspecting this ${vehicle.year} ${vehicle.make} ${vehicle.model}. Kindly provide inspection availability, clearing paperwork confirmation, and payment terms.`
      : '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      toast({
        type: 'error',
        title: 'Missing Fields',
        message: 'Please provide your full name, valid phone number, and email address.',
      });
      return;
    }

    setLoading(true);

    try {
      store.createInquiry({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        vehicleId: vehicle?._id,
        vehicleName: vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim}` : undefined,
        inquiryType: vehicle ? 'Vehicle Inquiry' : 'General Question',
      });

      setSubmitted(true);
      toast({
        type: 'success',
        title: 'Inquiry Received',
        message: 'Your inquiry has been logged. A Mosobalaje automotive consultant will reach out via phone/WhatsApp within 30 minutes.',
      });

      if (onSuccess) onSuccess();
    } catch {
      toast({
        type: 'error',
        title: 'Submission Error',
        message: 'Could not send inquiry. Please retry or message us on WhatsApp directly.',
      });
    } finally {
      setLoading(false);
    }
  };

  const whatsappUrl = getWhatsAppUrl(
    whatsappNumber,
    vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : undefined,
    vehicle ? vehicle._id.slice(-6).toUpperCase() : undefined
  );

  if (submitted) {
    return (
      <div id="inquiry-submitted-card" className="p-6 bg-emerald-50/70 border border-emerald-200 rounded-2xl text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-stone-900">Inquiry Received Successfully</h3>
        <p className="text-xs text-stone-600 leading-relaxed max-w-sm mx-auto">
          Thank you, <strong className="text-stone-800">{formData.name}</strong>. Mosobalaje Vehicle Imports has received your inquiry for{' '}
          {vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : 'our automotive desk'}. We will contact you at{' '}
          <span className="font-semibold text-stone-800">{formData.phone}</span>.
        </p>
        <div className="pt-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Fast-track on WhatsApp Now</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-bold text-stone-700 mb-1">
          Full Name <span className="text-rose-500">*</span>
        </label>
        <input
          type="text"
          required
          placeholder="e.g. Chief Babatunde Adeleke"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 outline-hidden transition-all"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">
            Phone Number (WhatsApp preferred) <span className="text-rose-500">*</span>
          </label>
          <input
            type="tel"
            required
            placeholder="0803 000 0000"
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
            placeholder="name@domain.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 outline-hidden transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-stone-700 mb-1">
          Inquiry Subject
        </label>
        <input
          type="text"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 outline-hidden transition-all"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-stone-700 mb-1">
          Message / Specific Questions
        </label>
        <textarea
          rows={3}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 outline-hidden transition-all resize-none"
        />
      </div>

      <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl flex items-center gap-2 text-[11px] text-stone-600">
        <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
        <span>Your contact details are strictly confidential and will never be shared with third-party telemarketers.</span>
      </div>

      <div className="flex flex-col gap-2 pt-1">
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-stone-950 hover:bg-stone-800 text-white font-bold text-sm transition-all shadow-sm cursor-pointer disabled:opacity-50"
        >
          {loading ? (
            <span>Sending Inquiry...</span>
          ) : (
            <>
              <span>Submit Formal Inquiry</span>
              <Send className="w-4 h-4 text-amber-400" />
            </>
          )}
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-emerald-600/30 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs transition-colors"
        >
          <MessageCircle className="w-4 h-4 text-emerald-600" />
          <span>Or Speak Immediately on WhatsApp</span>
        </a>
      </div>
    </form>
  );
};
