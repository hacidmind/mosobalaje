'use client';

import React from 'react';
import { Metadata } from 'next';
import { ShieldCheck, Award, Users, Globe, CheckCircle2, ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import { CTASection } from '@/src/components/ui/SectionHeader';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#fcfbf9]">
      <section className="bg-stone-950 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Our Story"
            title="About Mosobalaje Vehicle Imports"
            subtitle="Nigeria's premier vehicle procurement and direct importation agency — founded on transparency, verified provenance, and exceptional client service."
            dark
          />
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600">Since 2020</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-2">Importing Trust, Delivering Quality</h2>
              <p className="mt-6 text-stone-600 leading-relaxed">
                Mosobalaje Vehicle Imports was established to bridge the gap between Nigerian automotive buyers and the world&apos;s best vehicles. We are a registered member of IAA and Copart auction networks, providing direct access to wholesale markets in North America, Europe, and Asia.
              </p>
              <p className="mt-4 text-stone-600 leading-relaxed">
                Our mission is simple: eliminate intermediaries, guarantee authentic mileage, provide complete customs transparency, and deliver every vehicle with full documentation — no stories, just verified paperwork.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div><h4 className="font-bold text-stone-900 text-sm">100% Verified</h4><p className="text-xs text-stone-500">Every vehicle undergoes VIN verification and customs clearing</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div><h4 className="font-bold text-stone-900 text-sm">Auction Licensed</h4><p className="text-xs text-stone-500">Registered IAA & Copart member with direct bidding access</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div><h4 className="font-bold text-stone-900 text-sm">Global Sourcing</h4><p className="text-xs text-stone-500">USA, Canada, Germany, Japan, UAE, and South Korea</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                  <div><h4 className="font-bold text-stone-900 text-sm">Client-First</h4><p className="text-xs text-stone-500">Dedicated specialists for every procurement journey</p></div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden bg-stone-100 aspect-4/3">
              <img src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=800" alt="Mosobalaje Vehicle Imports Office" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Our Core Values" align="center" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {[
              { title: 'Transparency', desc: 'Every vehicle comes with complete auction documentation, VIN history, and customs paperwork — nothing hidden.' },
              { title: 'Integrity', desc: 'We never tamper with odometers or vehicle histories. What you see is exactly what was procured.' },
              { title: 'Excellence', desc: 'From procurement to delivery, we maintain the highest standards in vehicle sourcing and client communication.' },
            ].map((v, i) => (
              <div key={i} className="text-center p-8 rounded-2xl bg-stone-50 border border-stone-200">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-stone-900 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-lg font-bold text-stone-900">{v.title}</h3>
                <p className="text-sm text-stone-500 mt-2 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection onNavigate={(route) => {}} whatsappNumber="2349064153303" />
    </div>
  );
}