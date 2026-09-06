'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Award, Search, Star } from 'lucide-react';
import { VehicleImage } from '@/src/components/vehicles/VehicleImage';
import { MotionReveal } from '@/src/components/ui/MotionReveal';
import { formatNaira } from '@/src/lib/formatting';
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
    const element = heroRef.current;
    if (!element) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    void import('gsap').then(({ gsap }) => {
      if (disposed) return;
      const media = gsap.matchMedia();
      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.hero-animate', { y: 24, duration: 0.75, stagger: 0.08, ease: 'power3.out', clearProps: 'transform' });
      }, element);
      cleanup = () => media.revert();
    }).catch(() => { /* Motion is optional; content remains visible. */ });
    return () => { disposed = true; cleanup?.(); };
  }, []);

  const spotlight = featuredVehicles[0] || vehicles[0];

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="relative bg-stone-950 text-white overflow-hidden min-h-[72vh] flex items-center">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:32px_32px]" />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 bg-gradient-to-l from-amber-600 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10 w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <div className="max-w-3xl">
            <div className="hero-animate flex items-center gap-2 mb-6">
              <span className="px-3 py-1 rounded-full bg-stone-900 border border-red-900/50 text-red-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                <Award className="w-3.5 h-3.5" />
                Registered Member — IAA & Copart
              </span>
            </div>

            <h1 className="hero-animate text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
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
          {spotlight ? (
            <Link href={`/vehicles/${spotlight.slug}`} className="hero-animate group relative block overflow-hidden rounded-3xl border border-white/15 bg-stone-900 shadow-2xl">
              <div className="relative aspect-[4/3] overflow-hidden">
                <VehicleImage src={spotlight.images?.[0] || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341'} alt={`${spotlight.year} ${spotlight.make} ${spotlight.model}`} fill preload sizes="(max-width: 1023px) 100vw, 45vw" unoptimized={!!spotlight.images?.[0] && !spotlight.images[0].startsWith('https://images.unsplash.com/')} className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-stone-900">{spotlight.status}</span>
                <p className="absolute bottom-5 left-5 text-xs uppercase tracking-[0.2em] text-amber-300">In the spotlight</p>
              </div>
              <div className="flex items-center justify-between gap-4 p-6">
                <div><p className="text-xs text-stone-400">{spotlight.year} / {spotlight.make}</p><h2 className="mt-1 text-2xl font-bold">{spotlight.model}</h2><p className="mt-2 text-amber-300">{formatNaira(spotlight.price)}</p></div>
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 transition-colors group-hover:bg-amber-500 group-hover:text-stone-950"><ArrowRight className="h-5 w-5" /></span>
              </div>
            </Link>
          ) : <div className="rounded-3xl border border-white/10 bg-white/5 p-8"><p className="text-xs uppercase tracking-widest text-amber-400">Your next chapter</p><h2 className="mt-4 text-3xl font-bold">A vehicle chosen around you.</h2><p className="mt-4 leading-relaxed text-stone-300">Tell us your preferred make, budget, and timeline. We will help you explore sourcing options.</p><Link href="/request-vehicle" className="mt-6 inline-flex items-center gap-2 font-semibold text-amber-300">Start your request <ArrowRight className="h-4 w-4" /></Link></div>}
        </div>
      </section>
      <MotionReveal className="mx-auto grid max-w-7xl gap-6 border-b border-stone-200 px-6 py-10 md:grid-cols-3">
        {[['01', 'Find your fit', 'Browse inventory or tell us exactly what you want.'], ['02', 'Know the details', 'Review specifications, availability, and import status.'], ['03', 'Talk to a specialist', 'Ask questions and plan your next step on WhatsApp.']].map(([step, title, description]) => <div key={step} className="flex gap-4"><span className="font-mono-tech text-sm text-amber-700">{step}</span><div><h2 className="font-bold text-stone-900">{title}</h2><p className="mt-1 text-sm leading-relaxed text-stone-500">{description}</p></div></div>)}
      </MotionReveal>

      {/* Featured Vehicles */}
      {featuredVehicles.length > 0 && (
        <section className="py-20 bg-[#fcfbf9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader badge="Featured Inventory" title="Premium Imported Vehicles" subtitle="Each vehicle undergoes rigorous inspection, VIN verification, and full customs clearance before listing." />
            <MotionReveal className={`grid gap-6 ${featuredVehicles.length === 1 ? 'max-w-md mx-auto' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
              {featuredVehicles.map((v) => (
                <VehicleCard key={v._id} vehicle={v} whatsappNumber={settings?.whatsappNumber} featured />
              ))}
            </MotionReveal>
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
            <MotionReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.filter(v => !v.featured).slice(0, 6).map((v) => (
                <VehicleCard key={v._id} vehicle={v} whatsappNumber={settings?.whatsappNumber} />
              ))}
            </MotionReveal>
          </div>
        </section>
      )}

      <CTASection whatsappNumber={settings?.whatsappNumber} />
    </>
  );
}