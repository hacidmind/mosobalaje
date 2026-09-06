'use client';

import React from 'react';
import { SectionHeader, CTASection } from '@/src/components/ui/SectionHeader';
import { Ship, Anchor, FileCheck, Truck, ClipboardCheck, ShieldCheck, Search, Building2, Home } from 'lucide-react';

export default function ImportProcessPage() {
  const steps = [
    { icon: Search, title: '1. Vehicle Sourcing', desc: 'We search IAA, Copart, and dealer networks across North America, Europe, and Asia for your exact specification.' },
    { icon: ClipboardCheck, title: '2. Auction Bidding & Purchase', desc: 'Competitive bidding on your behalf with full transparency on auction fees and purchase price.' },
    { icon: FileCheck, title: '3. Documentation & Export', desc: 'Clean title verification, VIN check, and export documentation prepared for Nigerian customs.' },
    { icon: Ship, title: '4. Ocean Freight', desc: 'Secure containerized or Ro-Ro shipping from origin port to Tin Can Island Port, Lagos.' },
    { icon: Anchor, title: '5. Port Arrival & Discharge', desc: 'Vessel arrival monitored in real-time. Vehicle discharged and moved to customs bonded terminal.' },
    { icon: Building2, title: '6. Customs Clearing', desc: 'Single Goods Declaration (SGD) processed. Duties assessed per Nigeria Customs Service regulations.' },
    { icon: ShieldCheck, title: '7. Inspection & Verification', desc: 'Physical inspection at our Lagos facility. Odometer verification and condition report.' },
    { icon: Truck, title: '8. Nationwide Delivery', desc: 'Flatbed truck or covered carrier delivery to your location anywhere in Nigeria.' },
    { icon: Home, title: '9. Handover & Aftercare', desc: 'Vehicle handover with full documentation packet, including customs receipt and ownership transfer guidance.' },
  ];

  return (
    <div className="min-h-screen bg-[#fcfbf9]">
      <section className="bg-stone-950 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge="Transparent Process" title="Our 9-Step Import Process" subtitle="From auction to your driveway — every step verified, every cost transparent. No hidden fees." dark />
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-4">
                  <step.icon className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="text-sm font-bold text-stone-900">{step.title}</h3>
                <p className="text-xs text-stone-500 mt-2 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection whatsappNumber="2349064153303" />
    </div>
  );
}