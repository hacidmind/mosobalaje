'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Inquiry } from '@/src/lib/types';

interface Props {
  inquiries: Inquiry[];
}

export function AdminInquiriesClient({ inquiries: initialInquiries }: Props) {
  const [search, setSearch] = useState('');
  const filtered = initialInquiries.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.subject.toLowerCase().includes(search.toLowerCase())
  );

  const statusColor = (s: string) => {
    const map: Record<string, string> = {
      New: 'bg-blue-50 text-blue-700', Reviewing: 'bg-amber-50 text-amber-700',
      Contacted: 'bg-purple-50 text-purple-700', Resolved: 'bg-emerald-50 text-emerald-700',
      Archived: 'bg-stone-100 text-stone-600',
    };
    return map[s] || 'bg-stone-100 text-stone-600';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-stone-900">Inquiries</h1>
        <p className="text-sm text-stone-500 mt-1">{initialInquiries.length} inquiries received</p>
      </div>
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
        <input type="text" placeholder="Search inquiries..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full max-w-md pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500" />
      </div>
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50">
                <th className="text-left px-4 py-3 font-semibold text-stone-700">Subject</th>
                <th className="text-left px-4 py-3 font-semibold text-stone-700">From</th>
                <th className="text-left px-4 py-3 font-semibold text-stone-700">Type</th>
                <th className="text-left px-4 py-3 font-semibold text-stone-700">Status</th>
                <th className="text-left px-4 py-3 font-semibold text-stone-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((i) => (
                <tr key={i._id} className="border-b border-stone-100 hover:bg-stone-50">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-stone-900 text-sm">{i.subject}</p>
                    <p className="text-xs text-stone-400 mt-0.5 line-clamp-1">{i.message}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-stone-700 text-xs">{i.name}</p>
                    <p className="text-xs text-stone-400">{i.email}</p>
                  </td>
                  <td className="px-4 py-3 text-xs text-stone-500">{i.inquiryType}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColor(i.status)}`}>{i.status}</span></td>
                  <td className="px-4 py-3 text-xs text-stone-400">{new Date(i.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-stone-400 text-sm">No inquiries found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}