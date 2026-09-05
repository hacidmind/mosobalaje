import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  ArrowUpRight, 
  CheckCircle,
  Clock,
  Car,
  Award
} from 'lucide-react';
import { Logo } from '../ui/Logo';
import { WebsiteContentSettings } from '../../types';
import { getWhatsAppUrl } from '../../lib/store';
import { INITIAL_CONTENT_SETTINGS } from '../../lib/initialData';

interface FooterProps {
  onNavigate: (route: string) => void;
  settings?: WebsiteContentSettings;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, settings }) => {
  const s = { ...INITIAL_CONTENT_SETTINGS, ...(settings || {}) };
  const whatsappUrl = getWhatsAppUrl(s.whatsappNumber);

  return (
    <footer id="main-footer" className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800 relative before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-red-600/60 before:to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-stone-800/80">
          {/* Col 1: Brand & Nigerian Presence */}
          <div className="lg:col-span-4 space-y-4">
            <div 
              onClick={() => onNavigate('/')}
              className="cursor-pointer select-none inline-block transition-transform active:scale-95"
            >
              <Logo size="lg" />
            </div>

            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              Nigeria’s premier vehicle procurement and direct importation agency. We eliminate intermediaries, guaranteeing verified auction provenance, authentic mileage, and complete customs transparency.
            </p>

            {/* Dedicated IAA & Copart Registered Member Visual Badge */}
            <div className="p-3.5 rounded-2xl bg-stone-900/90 border border-stone-800 ring-1 ring-red-900/40 shadow-inner">
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="w-7 h-7 rounded-lg bg-red-950/80 border border-red-800/60 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4 text-red-500" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-400">
                      Official Institutional Accreditation
                    </span>
                  </div>
                  <h5 className="text-xs font-bold text-white tracking-tight">
                    Registered Member: IAA & Copart
                  </h5>
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

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">Inventory & Sourcing</h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <button 
                  onClick={() => onNavigate('/vehicles')} 
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  All Vehicles
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/vehicles')} 
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  SUVs & 4x4s
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/vehicles')} 
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Luxury Sedans
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/request-vehicle')} 
                  className="text-amber-400 hover:text-amber-300 font-semibold transition-colors cursor-pointer text-left flex items-center gap-1"
                >
                  Request Custom Import
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/import-process')} 
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  9-Step Import Process
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">Company</h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <button 
                  onClick={() => onNavigate('/about')} 
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  About Mosobalaje
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/about')} 
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Our Philosophy & QA
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/contact')} 
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Contact & Locations
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/admin')} 
                  className="text-stone-500 hover:text-stone-300 transition-colors cursor-pointer text-left"
                >
                  Staff Management Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Nigerian Offices & Contact */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">Contact & Operations</h4>
            
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-200 block text-xs">Lagos Operations & Logistics Hub:</strong>
                  {s.officeAddress}
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-200 block text-xs">Nationwide Executive Delivery:</strong>
                  Fully insured doorstep delivery and flatbed transit to all states across Nigeria.
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-stone-500 shrink-0" />
                <span>{s.businessHours}</span>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="w-4 h-4 text-stone-500 shrink-0" />
                <a href={`tel:${s.phone.replace(/[^0-9+]/g, '')}`} className="text-stone-200 hover:text-white font-semibold">
                  {s.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-stone-500 shrink-0" />
                <a href={`mailto:${s.email}`} className="text-stone-300 hover:text-white">
                  {s.email}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-700/80 hover:bg-emerald-600 text-white text-xs font-bold transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Direct With Director on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar & legal disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-500">
          <div>
            <p>© {new Date().getFullYear()} Mosobalaje Vehicle Imports Ltd. All rights reserved. RC Registered in Nigeria.</p>
            <p className="text-[11px] text-stone-600 mt-1 max-w-2xl leading-relaxed">
              *Disclaimer: Vehicle duties and clearing assessments are conducted in strict accordance with the Nigeria Customs Service regulations. Estimated delivery timelines for in-transit vessels depend on maritime sailing schedules and port decongestion protocols.
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
};
