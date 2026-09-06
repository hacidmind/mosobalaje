'use client';

import React, { useState } from 'react';
import { Search, Mail, Phone } from 'lucide-react';
import { Lead } from '@/src/lib/types';

interface Props {
  leads: Lead[];
}

export function AdminLeadsClient({ leads: initialLeads }: Props) {
  const [search, setSearch] = useState('');

  const filtered = initialLeads.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.email.toLowerCase().includes(search.toLowerCase()) ||
    (l.vehicleName && l.vehicleName.toLowerCase().includes(search.toLowerCase()))
  );

  const statusColor = (s: string) => {
    const map: Record<string, string> = {
      New: 'bg-blue-50 text-blue-700', Contacted: 'bg-amber-50 text-amber-700',
      Qualified: 'bg-purple-50 text-purple-700', Negotiating: 'bg-indigo-50 text-indigo-700',
      Won: 'bg-emerald-50 text-emerald-700', Lost: 'bg-stone-100 text-stone-600',
    };
    return map[s] || 'bg-stone-100 text-stone-600';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-stone-900">Leads</h1>
        <p className="text-sm text-stone-500 mt-1">{initialLeads.length} leads in CRM</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
        <input type="text" placeholder="Search leads..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full max-w-md pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500" />
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50">
                <th className="text-left px-4 py-3 font-semibold text-stone-700">Name</th>
                <th className="text-left px-4 py-3 font-semibold text-stone-700">Contact</th>
                <th className="text-left px-4 py-3 font-semibold text-stone-700">Vehicle</th>
                <th className="text-left px-4 py-3 font-semibold text-stone-700">Source</th>
                <th className="text-left px-4 py-3 font-semibold text-stone-700">Status</th>
                <th className="text-left px-4 py-3 font-semibold text-stone-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((l) => (
                <tr key={l._id} className="border-b border-stone-100 hover:bg-stone-50">
                  <td className="px-4 py-3 font-semibold text-stone-900">{l.name}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-0.5 text-xs text-stone-500">
                      <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {l.phone}</span>
                      <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {l.email}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-stone-600">{l.vehicleName || '—'}</td>
                  <td className="px-4 py-3 text-xs text-stone-500">{l.source}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColor(l.status)}`}>{l.status}</span></td>
                  <td className="px-4 py-3 text-xs text-stone-400">{new Date(l.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-stone-400 text-sm">No leads found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}