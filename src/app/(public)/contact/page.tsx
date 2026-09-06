'use client';

import React from 'react';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import { ContactForm } from '@/src/components/forms/ContactForm';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#fcfbf9]">
      <section className="bg-stone-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge="Get In Touch" title="Contact Our Procurement Desk" subtitle="Our team responds within 1 business hour. We're available to discuss any vehicle inquiry, import request, or inspection appointment." dark />
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ContactForm whatsappNumber="2349064153303" />
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-4">
                <h3 className="text-lg font-bold text-stone-900">Our Office</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div><strong className="text-stone-800 block">Lagos Hub</strong><span className="text-stone-500">Victoria Island, Lagos</span></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-stone-400 shrink-0" />
                    <span className="text-stone-700 font-semibold">0906 415 3303</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-stone-400 shrink-0" />
                    <span className="text-stone-700">inquiries@mosobalajeimports.ng</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                    <span className="text-stone-500">Mon-Fri: 8AM-6PM | Sat: 9AM-4PM</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden aspect-4/3 bg-stone-200">
                <div className="w-full h-full flex items-center justify-center text-stone-400 text-sm">Map Location</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}