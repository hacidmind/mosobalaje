'use client';

import React from 'react';
import { Car, Search, RefreshCw, ArrowRight } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export function EmptyState({
  title = 'No vehicles match your current filters',
  description = 'Try adjusting your search criteria, clearing brand or price selections, or submit a custom vehicle sourcing request.',
  actionText = 'Reset Filters',
  onAction,
  icon,
}: EmptyStateProps) {
  return (
    <div className="text-center py-16 px-4 max-w-md mx-auto">
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-400 border border-stone-200">
        {icon || <Search className="w-8 h-8" />}
      </div>
      <h3 className="text-lg font-bold text-stone-900">{title}</h3>
      <p className="text-sm text-stone-500 mt-2 leading-relaxed">{description}</p>
      {onAction && actionText && (
        <button
          onClick={onAction}
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-stone-900 text-white text-sm font-semibold hover:bg-stone-800 transition-colors shadow-sm cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          {actionText}
        </button>
      )}
    </div>
  );
}

export function LoadingState({ message = 'Loading inventory...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative w-12 h-12">
        <div className="w-12 h-12 rounded-full border-2 border-stone-200 border-t-amber-600 animate-spin" />
        <Car className="w-5 h-5 text-stone-700 absolute inset-0 m-auto" />
      </div>
      <p className="text-sm font-medium text-stone-500 mt-4 tracking-wide">{message}</p>
    </div>
  );
}

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  dark?: boolean;
}

export function SectionHeader({ badge, title, subtitle, align = 'center', dark = false }: SectionHeaderProps) {
  const alignClasses = align === 'center' ? 'text-center mx-auto' : 'text-left';
  return (
    <div className={`max-w-3xl mb-12 sm:mb-16 ${alignClasses}`}>
      {badge && (
        <span className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3 ${
          dark ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-stone-100 text-stone-700 border border-stone-200'
        }`}>
          {badge}
        </span>
      )}
      <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight ${dark ? 'text-white' : 'text-stone-900'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base sm:text-lg leading-relaxed ${dark ? 'text-stone-400' : 'text-stone-600'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

interface CTASectionProps {
  onNavigate: (route: string) => void;
  whatsappNumber?: string;
}

export function CTASection({ onNavigate, whatsappNumber }: CTASectionProps) {
  const cleanNumber = (whatsappNumber || '2349064153303').replace(/[^0-9]/g, '') || '2349064153303';
  return (
    <section className="py-20 bg-stone-950 text-white relative overflow-hidden border-t border-stone-900">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 border border-red-900/50 text-red-400 text-xs font-semibold tracking-wider uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              Direct International Procurement
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Can&apos;t find your desired vehicle in stock?
            </h2>
            <p className="mt-4 text-lg text-stone-300 max-w-2xl leading-relaxed">
              We source bespoke vehicles on demand as a registered member of IAA &amp; Copart wholesale auctions, alongside certified suppliers in the USA, Canada, Germany, and Japan. Complete customs clearing and delivery to your doorstep.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <button onClick={() => onNavigate('/request-vehicle')} className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-amber-500 text-stone-950 font-bold text-sm hover:bg-amber-400 transition-all shadow-lg hover:shadow-amber-500/20 cursor-pointer">
                Request a Custom Import <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => onNavigate('/import-process')} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-stone-900 text-stone-200 border border-stone-800 font-semibold text-sm hover:bg-stone-800 hover:text-white transition-colors cursor-pointer">
                Understand Our 9-Step Process
              </button>
            </div>
          </div>
          <div className="lg:col-span-4 bg-stone-900/90 border border-stone-800 p-7 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-2">Speak to a Sourcing Specialist</h3>
            <p className="text-xs text-stone-400 mb-6 leading-relaxed">
              Our direct lines and WhatsApp desk are active for real-time auction quotes and clearing cost estimates.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-stone-800">
                <span className="text-stone-400">Response Time:</span>
                <span className="text-amber-400 font-medium">Under 15 minutes</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-stone-800">
                <span className="text-stone-400">Duty Transparency:</span>
                <span className="text-white font-medium">100% Verified Paperwork</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-stone-800">
                <span className="text-stone-400">Auction Memberships:</span>
                <span className="text-amber-400 font-medium">IAA &amp; Copart Registered</span>
              </div>
            </div>
            <a href={`https://wa.me/${cleanNumber}?text=${encodeURIComponent('Hello Mosobalaje Vehicle Imports, I would like to consult with a vehicle sourcing specialist.')}`} target="_blank" rel="noopener noreferrer" className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-colors shadow-md">
              Chat on WhatsApp Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}