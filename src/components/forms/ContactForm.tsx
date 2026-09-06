'use client';

import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, Send, User } from 'lucide-react';
import { useToast } from '../ui/Toast';
import { createContactInquiry } from '@/src/lib/data';
import { getWhatsAppUrl } from '@/src/lib/formatting';

interface ContactFormProps {
  whatsappNumber?: string;
}

export function ContactForm({ whatsappNumber }: ContactFormProps) {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
    vehicleReference: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email || !form.subject || !form.message) {
      toast({ type: 'error', title: 'Validation Error', message: 'Please fill in all required fields.' });
      return;
    }

    setSubmitting(true);
    try {
      await createContactInquiry(form);
      toast({ type: 'success', title: 'Message Sent!', message: 'Our team will get back to you within 1 business hour.' });
      setForm({ name: '', phone: '', email: '', subject: '', message: '', vehicleReference: '' });
    } catch (err) {
      toast({ type: 'error', title: 'Submission Failed', message: err instanceof Error ? err.message : 'Please try again or contact us directly via WhatsApp.' });
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappUrl = getWhatsAppUrl(whatsappNumber);

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8">
      <h3 className="text-xl font-bold text-stone-900 mb-1">Send Us a Message</h3>
      <p className="text-sm text-stone-500 mb-6">Our procurement desk responds within 1 business hour.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wide">Full Name *</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input name="name" value={form.name} onChange={handleChange} type="text" className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500" placeholder="Your full name" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wide">Phone Number *</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input name="phone" value={form.phone} onChange={handleChange} type="tel" className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500" placeholder="+234 800 000 0000" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wide">Email Address *</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input name="email" value={form.email} onChange={handleChange} type="email" className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500" placeholder="your@email.com" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wide">Subject *</label>
          <input name="subject" value={form.subject} onChange={handleChange} type="text" className="w-full px-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500" placeholder="What is this regarding?" />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wide">Vehicle Reference (if applicable)</label>
          <input name="vehicleReference" value={form.vehicleReference} onChange={handleChange} type="text" className="w-full px-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500" placeholder="e.g. 2023 Lexus RX 350" />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wide">Message *</label>
          <textarea name="message" value={form.message} onChange={handleChange} rows={4} className="w-full px-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 resize-none" placeholder="How can we help you?" />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button type="submit" disabled={submitting} className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-stone-900 text-white text-sm font-bold hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {submitting ? 'Sending...' : <><Send className="w-4 h-4" /> Send Message</>}
          </button>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-500 transition-colors">
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
        </div>
      </form>
    </div>
  );
}