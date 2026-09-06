'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheck, Menu, X, Phone, ArrowRight, Lock, MessageCircle, Award } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { getWhatsAppUrl } from '@/src/lib/formatting';

interface NavbarProps {
  settings?: {
    phone?: string;
    whatsappNumber?: string;
  };
  isAdmin?: boolean;
}

export function Navbar({ settings, isAdmin = false }: NavbarProps) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navPhone = settings?.phone || '0906 415 3303';
  const navWhatsapp = settings?.whatsappNumber || '2349064153303';
  const whatsappUrl = getWhatsAppUrl(navWhatsapp);

  const navLinks = [
    { label: 'Inventory', href: '/vehicles' },
    { label: 'Import Process', href: '/import-process' },
    { label: 'Request a Vehicle', href: '/request-vehicle' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-stone-200/80 transition-all shadow-xs">
      <div className="hidden sm:flex bg-stone-950 text-stone-300 text-xs py-1.5 px-4 sm:px-8 border-b border-stone-800 flex justify-between items-center tracking-wide">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-stone-200 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shrink-0" />
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            Verified Customs Clearance & Direct Port Sourcing
          </span>
          <span className="hidden md:inline text-stone-600">|</span>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-stone-200 font-semibold bg-stone-900 px-2 py-0.5 rounded border border-red-950/70">
            <Award className="w-3 h-3 text-red-500" />
            Registered Member of IAA & Copart
          </span>
        </div>

        <div className="flex items-center gap-5">
          <a href={`tel:${navPhone.replace(/[^0-9+]/g, '')}`} className="flex items-center gap-1.5 text-stone-300 hover:text-white transition-colors">
            <Phone className="w-3 h-3 text-stone-400" />
            <span className="font-semibold">{navPhone}</span>
          </a>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp Desk</span>
          </a>
          <Link href="/admin" className="flex items-center gap-1 text-stone-400 hover:text-amber-400 transition-colors text-[11px] font-medium" title="Internal Staff Administration">
            <Lock className="w-3 h-3" />
            <span>{isAdmin ? 'Admin Console' : 'Staff Portal'}</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center cursor-pointer group select-none transition-transform active:scale-95">
          <Logo size="md" />
        </Link>

        <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-5">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} aria-current={isActive(link.href) ? 'page' : undefined} className={`text-sm font-semibold transition-colors py-1 ${isActive(link.href) ? 'text-amber-700 border-b-2 border-amber-600' : 'text-stone-600 hover:text-stone-950'}`}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden xl:flex items-center gap-3">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-emerald-600/30 bg-emerald-50 text-emerald-800 text-xs font-bold hover:bg-emerald-100 transition-all cursor-pointer shadow-2xs">
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>Chat On WhatsApp</span>
          </a>
          <Link href="/request-vehicle" className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition-all shadow-sm hover:shadow cursor-pointer">
            <span>Request Vehicle</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
          </Link>
        </div>

        <div className="lg:hidden flex items-center gap-2">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="sm:hidden p-2 rounded-lg bg-emerald-50 text-emerald-700" aria-label="WhatsApp">
            <MessageCircle className="w-5 h-5" />
          </a>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2.5 rounded-xl bg-stone-100 text-stone-800 hover:bg-stone-200 transition-colors" aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileMenuOpen} aria-controls="mobile-navigation">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div id="mobile-navigation" onKeyDown={(event) => { if (event.key === 'Escape') setMobileMenuOpen(false); }} className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="pb-2 border-b border-stone-100 flex items-center justify-between">
            <Logo size="sm" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">IAA & Copart Member</span>
          </div>
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className="w-full text-left px-4 py-3 rounded-xl text-base font-semibold text-stone-700 hover:bg-stone-50 transition-colors flex items-center justify-between block">
                <span>{link.label}</span>
                <ArrowRight className="w-4 h-4 text-stone-400" />
              </Link>
            ))}
          </div>
          <div className="pt-4 border-t border-stone-200 space-y-2.5">
            <Link href="/request-vehicle" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-stone-900 text-white font-bold text-sm shadow-sm">
              <span>Request a Vehicle</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </Link>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-sm">
              <MessageCircle className="w-4 h-4" />
              <span>Message Us on WhatsApp</span>
            </a>
            <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-center gap-1.5 py-2 px-4 text-xs font-semibold text-stone-500 hover:text-stone-900">
              <Lock className="w-3.5 h-3.5" />
              <span>{isAdmin ? 'Go to Admin Console' : 'Staff Login'}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}