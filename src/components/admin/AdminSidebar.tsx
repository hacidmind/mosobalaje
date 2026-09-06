'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Car, Users, MessageSquare, FileText, Settings, LogOut, ShieldCheck } from 'lucide-react';

interface AdminSidebarProps {
  onLogout: () => void;
}

export function AdminSidebar({ onLogout }: AdminSidebarProps) {
  const pathname = usePathname();

  const links = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/vehicles', label: 'Vehicles', icon: Car },
    { href: '/admin/leads', label: 'Leads', icon: Users },
    { href: '/admin/inquiries', label: 'Inquiries', icon: MessageSquare },
    { href: '/admin/requests', label: 'Requests', icon: FileText },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  const isActive = (href: string) => pathname === href || (href !== '/admin' && pathname.startsWith(href));

  return (
    <aside className="w-full md:sticky md:top-0 md:h-screen md:w-60 md:shrink-0 bg-stone-950 text-stone-300 border-r border-stone-800 flex flex-col">
      <div className="p-4 md:p-6 border-b border-stone-800">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-red-950/80 border border-red-800/60 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-tight">Mosobalaje</h1>
            <p className="text-[10px] text-stone-500 uppercase tracking-wider">Admin Console</p>
          </div>
        </Link>
      </div>

      <nav aria-label="Admin navigation" className="flex overflow-x-auto gap-1 p-3 md:block md:flex-1 md:space-y-1 md:p-4">
        {links.map((link) => (
          <Link key={link.href} href={link.href} aria-current={isActive(link.href) ? 'page' : undefined} className={`shrink-0 flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive(link.href) ? 'bg-stone-800 text-white' : 'text-stone-400 hover:text-white hover:bg-stone-900'}`}>
            <link.icon className="w-4 h-4" />
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-stone-800">
        <button onClick={onLogout} className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-stone-400 hover:text-white hover:bg-stone-900 transition-colors">
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}