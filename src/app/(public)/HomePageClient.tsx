'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Award, Search, Star } from 'lucide-react';
import gsap from 'gsap';
import { VehicleCard } from '@/src/components/vehicles/VehicleCard';
import { SectionHeader, CTASection } from '@/src/components/ui/SectionHeader';
import { Vehicle, WebsiteContentSettings } from '@/src/lib/types';

interface HomePageProps {
  vehicles: Vehicle[];
  featuredVehicles: Vehicle[];
  settings?: WebsiteContentSettings;
}

export function HomePage({ vehicles, featuredVehicles, settings }: HomePageProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.hero-animate', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="relative bg-stone-950 text-white overflow-hidden min-h-[85vh] flex items-center">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:32px_32px]" />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 bg-gradient-to-l from-amber-600 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 w-full">
          <div className="max-w-3xl">
            <div className="hero-animate flex items-center gap-2 mb-6">
              <span className="px-3 py-1 rounded-full bg-stone-900 border border-red-900/50 text-red-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                <Award className="w-3.5 h-3.5" />
                Registered Member — IAA & Copart
              </span>
            </div>

            <h1 className="hero-animate text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight">
              {settings?.heroHeadline || 'Find Your Next Vehicle. Imported With Confidence.'}
            </h1>

            <p className="hero-animate mt-6 text-lg sm:text-xl text-stone-300 leading-relaxed max-w-2xl">
              {settings?.heroSubheadline || 'Mosobalaje Vehicle Imports connects Nigerian automotive buyers with verified, premium international vehicles.'}
            </p>

            <div className="hero-animate mt-10 flex flex-wrap gap-4">
              <Link href="/vehicles" className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-amber-500 text-stone-950 font-bold text-base hover:bg-amber-400 transition-all shadow-xl hover:shadow-amber-500/30">
                Browse Vehicle Inventory <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/request-vehicle" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-stone-800 text-white border border-stone-700 font-semibold text-base hover:bg-stone-700 transition-colors shadow-lg">
                Request Custom Import
              </Link>
            </div>

            <div className="hero-animate mt-12 flex flex-wrap gap-8 text-xs sm:text-sm text-stone-400">
              <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-amber-400" /> Customs Cleared & Verified Paperwork</span>
              <span className="flex items-center gap-2"><Star className="w-4 h-4 text-amber-400" /> Direct Auction Sourcing</span>
              <span className="flex items-center gap-2"><Search className="w-4 h-4 text-amber-400" /> Full Inspection Reports</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      {featuredVehicles.length > 0 && (
        <section className="py-20 bg-[#fcfbf9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader badge="Featured Inventory" title="Premium Imported Vehicles" subtitle="Each vehicle undergoes rigorous inspection, VIN verification, and full customs clearance before listing." />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredVehicles.map((v) => (
                <VehicleCard key={v._id} vehicle={v} onSelect={() => { }} featured />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/vehicles" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-stone-900 text-white text-sm font-bold hover:bg-stone-800 transition-colors shadow-sm">
                View All Vehicles <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* All Vehicles */}
      {vehicles.length > featuredVehicles.length && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader title="More Inventory" subtitle="Explore our full range of premium imported vehicles." />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.filter(v => !v.featured).slice(0, 6).map((v) => (
                <VehicleCard key={v._id} vehicle={v} onSelect={() => { }} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection onNavigate={(route: string) => { }} whatsappNumber={settings?.whatsappNumber} />
    </>
  );
}