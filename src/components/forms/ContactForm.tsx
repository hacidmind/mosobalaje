import React, { useState } from 'react';
import { Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { store } from '../../lib/store';
import { useToast } from '../ui/Toast';

interface ContactFormProps {
  onSuccess?: () => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onSuccess }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    vehicleReference: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        type: 'error',
        title: 'Incomplete Details',
        message: 'Please complete all required fields including your message.',
      });
      return;
    }

    setLoading(true);

    try {
      store.createInquiry({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim() || 'General Website Contact',
        message: `${formData.vehicleReference ? `[Vehicle Ref: ${formData.vehicleReference}] ` : ''}${formData.message.trim()}`,
        inquiryType: 'General Question',
      });

      setSubmitted(true);
      toast({
        type: 'success',
        title: 'Message Dispatched',
        message: 'Your message has been delivered to Mosobalaje customer relations.',
      });

      if (onSuccess) onSuccess();
    } catch {
      toast({
        type: 'error',
        title: 'Transmission Failed',
        message: 'Unable to send message at this time.',
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-8 bg-stone-50 border border-stone-200 rounded-2xl text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h4 className="text-xl font-bold text-stone-900">Message Received</h4>
        <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
          Thank you, <strong className="text-stone-900">{formData.name}</strong>. Your message has been logged. Our client relations team will contact you at{' '}
          <span className="font-semibold text-stone-900">{formData.phone}</span> shortly.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: '',
              phone: '',
              email: '',
              subject: '',
              vehicleReference: '',
              message: '',
            });
          }}
          className="mt-2 text-xs font-bold text-amber-700 hover:text-amber-800 underline cursor-pointer"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">
            Your Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Barrister Emeka Nwosu"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 outline-hidden transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">
            Phone / WhatsApp <span className="text-rose-500">*</span>
          </label>
          <input
            type="tel"
            required
            placeholder="0802 000 0000"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 outline-hidden transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            required
            placeholder="emeka@lawchamber.ng"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 outline-hidden transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">
            Vehicle Reference / URL (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g. 2023 Lexus RX 350 or Ref ID"
            value={formData.vehicleReference}
            onChange={(e) => setFormData({ ...formData, vehicleReference: e.target.value })}
            className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 outline-hidden transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-stone-700 mb-1">
          Subject
        </label>
        <input
          type="text"
          placeholder="e.g. Showroom inspection appointment / Port clearing question"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 outline-hidden transition-all"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-stone-700 mb-1">
          Message <span className="text-rose-500">*</span>
        </label>
        <textarea
          rows={4}
          required
          placeholder="Tell us what you need help with..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 outline-hidden transition-all resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm transition-all shadow-sm cursor-pointer disabled:opacity-50"
      >
        <MessageSquare className="w-4 h-4 text-amber-400" />
        <span>{loading ? 'Submitting...' : 'Send Message to Customer Relations'}</span>
      </button>
    </form>
  );
};
