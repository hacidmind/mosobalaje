'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, MapPin, Phone, Mail, MessageCircle, ArrowUpRight, Clock, Car, Award } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { getWhatsAppUrl } from '@/src/lib/formatting';

interface FooterProps {
  settings?: {
    phone?: string;
    email?: string;
    whatsappNumber?: string;
    officeAddress?: string;
    businessHours?: string;
  };
}

export function Footer({ settings }: FooterProps) {
  const s = {
    phone: settings?.phone || '0906 415 3303',
    email: settings?.email || 'inquiries@mosobalajeimports.ng',
    whatsappNumber: settings?.whatsappNumber || '2349064153303',
    officeAddress: settings?.officeAddress || 'Lagos Operations & Logistics Hub, Victoria Island, Lagos, Nigeria',
    businessHours: settings?.businessHours || 'Monday – Friday: 8:00 AM – 6:00 PM | Saturday: 9:00 AM – 4:00 PM',
  };
  const whatsappUrl = getWhatsAppUrl(s.whatsappNumber);

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800 relative before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-red-600/60 before:to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-stone-800/80">
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="cursor-pointer select-none inline-block transition-transform active:scale-95">
              <Logo size="lg" />
            </Link>
            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              Nigeria&apos;s premier vehicle procurement and direct importation agency. We eliminate intermediaries, guaranteeing verified auction provenance, authentic mileage, and complete customs transparency.
            </p>
            <div className="p-3.5 rounded-2xl bg-stone-900/90 border border-stone-800 ring-1 ring-red-900/40 shadow-inner">
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="w-7 h-7 rounded-lg bg-red-950/80 border border-red-800/60 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4 text-red-500" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-400">Official Institutional Accreditation</span>
                  </div>
                  <h5 className="text-xs font-bold text-white tracking-tight">Registered Member: IAA & Copart</h5>
                </div>
              </div>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                Direct member bidding access across North American wholesale salvage & clean auctions. Authentic condition reports, zero third-party markups, and verified Single Goods Declaration (SGD) clearance.
              </p>
            </div>
            <div className="pt-1 flex flex-col gap-2">
              <span className="inline-flex items-center gap-2 text-xs text-stone-300 font-medium">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                Single Goods Declaration (SGD) & Clean Customs Paperwork
              </span>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">Inventory & Sourcing</h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li><Link href="/vehicles" className="hover:text-amber-400 transition-colors">All Vehicles</Link></li>
              <li><Link href="/vehicles" className="hover:text-amber-400 transition-colors">SUVs & 4x4s</Link></li>
              <li><Link href="/vehicles" className="hover:text-amber-400 transition-colors">Luxury Sedans</Link></li>
              <li><Link href="/request-vehicle" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors flex items-center gap-1">Request Custom Import <ArrowUpRight className="w-3.5 h-3.5" /></Link></li>
              <li><Link href="/import-process" className="hover:text-amber-400 transition-colors">9-Step Import Process</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">Company</h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li><Link href="/about" className="hover:text-amber-400 transition-colors">About Mosobalaje</Link></li>
              <li><Link href="/about" className="hover:text-amber-400 transition-colors">Our Philosophy & QA</Link></li>
              <li><Link href="/contact" className="hover:text-amber-400 transition-colors">Contact & Locations</Link></li>
              <li><Link href="/admin" className="text-stone-500 hover:text-stone-300 transition-colors">Staff Management Portal</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">Contact & Operations</h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div><strong className="text-stone-200 block text-xs">Lagos Operations & Logistics Hub:</strong>{s.officeAddress}</div>
              </div>
              <div className="flex items-center gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-stone-500 shrink-0" />
                <span>{s.businessHours}</span>
              </div>
              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="w-4 h-4 text-stone-500 shrink-0" />
                <a href={`tel:${s.phone.replace(/[^0-9+]/g, '')}`} className="text-stone-200 hover:text-white font-semibold">{s.phone}</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-stone-500 shrink-0" />
                <a href={`mailto:${s.email}`} className="text-stone-300 hover:text-white">{s.email}</a>
              </div>
            </div>
            <div className="pt-2">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-700/80 hover:bg-emerald-600 text-white text-xs font-bold transition-colors">
                <MessageCircle className="w-4 h-4" />
                <span>Chat Direct With Director on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-500">
          <div>
            <p>&copy; {new Date().getFullYear()} Mosobalaje Vehicle Imports Ltd. All rights reserved. RC Registered in Nigeria.</p>
            <p className="text-[11px] text-stone-600 mt-1 max-w-2xl leading-relaxed">
              *Disclaimer: Vehicle duties and clearing assessments are conducted in strict accordance with the Nigeria Customs Service regulations.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-stone-900 border border-red-950/80 text-stone-200 text-xs font-semibold shadow-xs">
              <Award className="w-3.5 h-3.5 text-red-500" />
              <span>Registered Member: IAA & Copart</span>
            </span>
            <span className="flex items-center gap-1.5 text-stone-400">
              <Car className="w-3.5 h-3.5 text-amber-500" />
              Direct North American & European Imports
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}