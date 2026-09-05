import React, { useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Search, 
  Ship, 
  Globe2, 
  BadgePercent, 
  FileText,
  PhoneCall,
  Sparkles,
  MapPin,
  Clock,
  Car,
  Award
} from 'lucide-react';
import { Vehicle, WebsiteContentSettings } from '../types';
import { VehicleCard } from '../components/vehicles/VehicleCard';
import { SectionHeader, CTASection } from '../components/ui/SectionHeader';
import { getWhatsAppUrl } from '../lib/store';
import { INITIAL_CONTENT_SETTINGS } from '../lib/initialData';
import gsap from 'gsap';

interface HomePageProps {
  vehicles: Vehicle[];
  onNavigate: (route: string) => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
  settings?: WebsiteContentSettings;
}

export const HomePage: React.FC<HomePageProps> = ({
  vehicles,
  onNavigate,
  onSelectVehicle,
  settings,
}) => {
  const s = { ...INITIAL_CONTENT_SETTINGS, ...(settings || {}) };
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Subtle GSAP entrance animation for the hero section
    if (heroRef.current && headlineRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(headlineRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
        if (subtitleRef.current) {
          gsap.from(subtitleRef.current, {
            y: 20,
            opacity: 0,
            duration: 0.8,
            delay: 0.2,
            ease: 'power3.out',
          });
        }
        if (ctaRef.current) {
          gsap.from(ctaRef.current, {
            y: 20,
            opacity: 0,
            duration: 0.8,
            delay: 0.35,
            ease: 'power3.out',
          });
        }
      }, heroRef);

      return () => ctx.revert();
    }
  }, []);

  const featuredVehicles = vehicles.filter((v) => v.featured).slice(0, 6);
  const recentVehicles = vehicles.slice(0, 4);

  const quickMakes = ['Toyota', 'Lexus', 'Mercedes-Benz', 'Honda'];

  return (
    <div id="homepage-container" className="space-y-0">
      {/* 1. PREMIUM HERO SECTION */}
      <section 
        ref={heroRef}
        className="relative min-h-[640px] lg:min-h-[720px] bg-stone-950 text-white flex items-center overflow-hidden"
      >
        {/* Cinematic Backdrop Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2000&auto=format&fit=crop"
            alt="Luxury Automobile Port Import"
            className="w-full h-full object-cover object-center opacity-30 filter brightness-75 scale-105 transition-transform duration-1000"
          />
          {/* Subtle directional gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/40"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900/90 border border-stone-800 text-stone-200 text-xs font-bold tracking-wider uppercase mb-6 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shrink-0" />
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Premier Nigerian Automotive Sourcing</span>
              <span className="text-stone-600">·</span>
              <span className="text-red-400 font-semibold">IAA & Copart Member</span>
            </div>

            <h1
              ref={headlineRef}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]"
            >
              {settings.heroHeadline}
            </h1>

            <p
              ref={subtitleRef}
              className="mt-6 text-base sm:text-lg text-stone-300 leading-relaxed font-normal max-w-2xl"
            >
              {settings.heroSubheadline}
            </p>

            <div
              ref={ctaRef}
              className="mt-9 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center"
            >
              <button
                id="hero-explore-vehicles-btn"
                onClick={() => onNavigate('/vehicles')}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm transition-all shadow-xl hover:shadow-amber-500/20 cursor-pointer"
              >
                <span>Explore Vehicles</span>
                <ArrowRight className="w-4 h-4 text-stone-950" />
              </button>

              <button
                id="hero-request-vehicle-btn"
                onClick={() => onNavigate('/request-vehicle')}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-stone-900/90 hover:bg-stone-800 text-white border border-stone-700 font-bold text-sm transition-all backdrop-blur-sm cursor-pointer"
              >
                <span>Request a Vehicle</span>
              </button>
            </div>

            {/* Micro proof points */}
            <div className="mt-12 pt-8 border-t border-stone-800/80 grid grid-cols-2 sm:grid-cols-3 gap-6 text-stone-400 text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Zero Odometer Rollback Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Single Goods Declaration (SGD) Duty Cleared</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <Award className="w-4 h-4 text-red-500 shrink-0" />
                <span className="font-semibold text-stone-200">Registered Member: IAA & Copart</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SEARCH & QUICK DISCOVERY BAR */}
      <section className="bg-stone-900 py-8 border-y border-stone-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="w-full lg:w-1/2 flex items-center gap-3">
              <div className="relative w-full">
                <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Quick search (e.g. Lexus RX 350, Prado TX-L, Camry XSE, Mercedes GLE)..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      onNavigate(`/vehicles?q=${encodeURIComponent((e.target as HTMLInputElement).value)}`);
                    }
                  }}
                  className="w-full pl-12 pr-4 py-3.5 bg-stone-950 border border-stone-800 rounded-xl text-sm text-white placeholder:text-stone-500 focus:outline-hidden focus:border-amber-500"
                />
              </div>
            </div>

            <div className="w-full lg:w-auto flex flex-wrap items-center gap-2">
              <span className="text-xs text-stone-400 uppercase tracking-wider font-semibold mr-1">
                Popular In Nigeria:
              </span>
              {quickMakes.map((make) => (
                <button
                  key={make}
                  onClick={() => onNavigate(`/vehicles?make=${make}`)}
                  className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-amber-600 hover:text-white text-stone-300 text-xs font-semibold transition-colors cursor-pointer"
                >
                  {make}
                </button>
              ))}
              <button
                onClick={() => onNavigate('/vehicles')}
                className="px-3 py-1.5 rounded-lg bg-amber-500 text-stone-950 text-xs font-bold hover:bg-amber-400 transition-colors cursor-pointer"
              >
                View All ({vehicles.length})
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED VEHICLES */}
      <section className="py-20 bg-[#fcfbf9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                Direct Imports & Port Clearances
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-950 tracking-tight mt-2">
                Featured Verified Vehicles
              </h2>
              <p className="text-stone-600 text-sm mt-1 max-w-xl">
                Carefully selected vehicles inspected with pristine title histories, full customs duty paperwork, and immediate Lagos delivery.
              </p>
            </div>

            <button
              onClick={() => onNavigate('/vehicles')}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-stone-900 hover:text-amber-700 transition-colors cursor-pointer shrink-0"
            >
              <span>Explore All Inventory</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {featuredVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle._id}
                vehicle={vehicle}
                onSelect={onSelectVehicle}
                whatsappNumber={s.whatsappNumber}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY MOSOBALAJE (TRUST & ADVANTAGE) */}
      <section className="py-20 bg-stone-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="The Mosobalaje Standard"
            title="Why Nigerian Buyers Trust Mosobalaje Vehicle Imports"
            subtitle="The Nigerian automotive import market is fraught with hidden accident histories, salvage rebuilds, and fraudulent customs duty stamps. We operate on complete provenance transparency."
            dark={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-stone-950/80 border border-stone-800 p-6 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-5 border border-amber-500/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Verified Clean History</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Full North American Carfax or European DEKRA condition reports provided with every vehicle before purchase. We reject flood-damaged and structural salvage vehicles.
              </p>
            </div>

            <div className="bg-stone-950/80 border border-stone-800 p-6 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-5 border border-amber-500/20">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">100% Genuine Customs Clearing</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Legitimate Nigeria Customs Service documentation, including the official Single Goods Declaration (SGD) and verifiable assessment payment receipts.
              </p>
            </div>

            <div className="bg-stone-950/80 border border-stone-800 p-6 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-5 border border-amber-500/20">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Direct Auction Access</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Licensed procurement from top wholesale dealer networks across North America, Germany, and Japan, cutting out middlemen markups.
              </p>
            </div>

            <div className="bg-stone-950/80 border border-stone-800 hover:border-red-950 p-6 rounded-2xl transition-colors">
              <div className="w-12 h-12 rounded-xl bg-red-950/40 text-red-400 flex items-center justify-center mb-5 border border-red-900/40">
                <Award className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Registered Member: IAA & Copart</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Official institutional bidding memberships in premier North American auction houses IAA and Copart, unlocking direct wholesale sourcing with verified run & drive certifications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW VEHICLE IMPORT WORKS (SUMMARY) */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-100/70 px-3 py-1 rounded-full border border-amber-200">
                Streamlined Logistics
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-950 tracking-tight">
                How Importing With Mosobalaje Works
              </h2>
              <p className="text-stone-600 text-sm leading-relaxed">
                We handle the end-to-end journey: from auction bidding in North America/Europe, containerized maritime transport to Tin Can Island Port, customs duty settlement, to direct registration and delivery.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('/import-process')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-stone-950 hover:bg-stone-800 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
                >
                  <span>Explore Complete 9-Step Process</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-stone-950 text-amber-400 font-bold text-xs flex items-center justify-center mb-3">
                  01
                </div>
                <h4 className="text-base font-bold text-stone-900 mb-1">Select or Request</h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Choose an available showroom vehicle or state your preferred model, year, and budget for bespoke international sourcing.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-stone-950 text-amber-400 font-bold text-xs flex items-center justify-center mb-3">
                  02
                </div>
                <h4 className="text-base font-bold text-stone-900 mb-1">Audit & Carfax Check</h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  We inspect physical condition, verify title authenticity, scan engine diagnostics, and provide a full provenance report before purchase.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-stone-950 text-amber-400 font-bold text-xs flex items-center justify-center mb-3">
                  03
                </div>
                <h4 className="text-base font-bold text-stone-900 mb-1">Shipping & Port Clear</h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Vessel shipping tracking provided en route to Lagos. Our licensed clearing agents manage Tin Can Port customs duty settlement.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-stone-950 text-amber-400 font-bold text-xs flex items-center justify-center mb-3">
                  04
                </div>
                <h4 className="text-base font-bold text-stone-900 mb-1">Nationwide Delivery</h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Thorough pre-delivery detailing and inspection at our Lagos bonded facility, followed by executive handover in Lagos or insured flatbed delivery nationwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. RECENTLY ADDED VEHICLES */}
      <section className="py-20 bg-white border-t border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                Recently Added To Inventory
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Updated weekly with cleared vehicles and upcoming port arrivals.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/vehicles')}
              className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
            >
              Browse All ({vehicles.length})
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentVehicles.map((veh) => (
              <VehicleCard
                key={veh._id}
                vehicle={veh}
                onSelect={onSelectVehicle}
                whatsappNumber={s.whatsappNumber}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 7. CUSTOMER TRUST & INSPECTION SECTION */}
      <section className="py-16 bg-stone-900 text-stone-200 border-y border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="border-l-2 border-amber-500 pl-6">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
                Auction Credentials
              </span>
              <h4 className="text-xl font-bold text-white">Registered Member of IAA & Copart</h4>
              <p className="text-xs text-stone-400 mt-1">
                Direct wholesale dealer bidding privileges in the USA & Canada with verified condition reports and authentic mileage.
              </p>
            </div>

            <div className="border-l-2 border-amber-500 pl-6">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
                Verification Guarantee
              </span>
              <h4 className="text-xl font-bold text-white">Full Paperwork Authentication</h4>
              <p className="text-xs text-stone-400 mt-1">
                Nigeria Customs Service SGD documentation, assessment receipts, and authentic Bill of Lading provided.
              </p>
            </div>

            <div className="border-l-2 border-amber-500 pl-6">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
                Direct Line
              </span>
              <h4 className="text-xl font-bold text-white">{s.phone}</h4>
              <p className="text-xs text-stone-400 mt-1">
                Consult directly with our dedicated vehicle procurement desk Monday to Saturday.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CUSTOM SOURCING CTA SECTION */}
      <CTASection onNavigate={onNavigate} whatsappNumber={s.whatsappNumber} />
    </div>
  );
};
