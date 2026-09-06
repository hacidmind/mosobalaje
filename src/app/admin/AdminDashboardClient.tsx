'use client';

import React from 'react';
import { Car, Users, MessageSquare, FileText, TrendingUp } from 'lucide-react';

interface Metrics {
  totalVehicles: number;
  availableVehicles: number;
  inTransitVehicles: number;
  soldVehicles: number;
  totalLeads: number;
  newLeads: number;
  totalInquiries: number;
  pendingRequests: number;
}

interface Lead {
  _id: string;
  name: string;
  status: string;
  vehicleName?: string;
  createdAt: string;
}

interface Vehicle {
  _id: string;
  make: string;
  model: string;
  year: number;
  status: string;
  price: number;
}

interface Props {
  metrics: Metrics;
  recentLeads: Lead[];
  recentVehicles: Vehicle[];
}

export function AdminDashboardClient({ metrics, recentLeads, recentVehicles }: Props) {
  const cards = [
    { label: 'Total Vehicles', value: metrics.totalVehicles, sub: `${metrics.availableVehicles} available`, icon: Car, color: 'text-blue-600 bg-blue-50' },
    { label: 'Active Leads', value: metrics.totalLeads, sub: `${metrics.newLeads} new`, icon: Users, color: 'text-purple-600 bg-purple-50' },
    { label: 'Inquiries', value: metrics.totalInquiries, sub: 'All time', icon: MessageSquare, color: 'text-amber-600 bg-amber-50' },
    { label: 'Pending Requests', value: metrics.pendingRequests, sub: 'Needs review', icon: FileText, color: 'text-red-600 bg-red-50' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-stone-900">Dashboard</h1>
        <p className="text-sm text-stone-500 mt-1">Welcome back. Here&apos;s your business at a glance.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="bg-white rounded-2xl border border-stone-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">{card.label}</p>
                <p className="text-2xl font-extrabold text-stone-900 mt-1">{card.value}</p>
                <p className="text-xs text-stone-400 mt-0.5">{card.sub}</p>
              </div>
              <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center`}>
                <card.icon className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-stone-200 p-6">
          <h2 className="text-sm font-bold text-stone-900 mb-4">Recent Leads</h2>
          {recentLeads.length === 0 ? (
            <p className="text-sm text-stone-400">No leads yet.</p>
          ) : (
            <div className="space-y-3">
              {recentLeads.map((lead) => (
                <div key={lead._id} className="flex items-center justify-between py-2 border-b border-stone-100 last:border-0">
                  <div>
                    <p className="text-sm font-semibold text-stone-900">{lead.name}</p>
                    <p className="text-xs text-stone-500">{lead.vehicleName || 'N/A'}</p>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium">{lead.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-6">
          <h2 className="text-sm font-bold text-stone-900 mb-4">Latest Vehicles</h2>
          {recentVehicles.length === 0 ? (
            <p className="text-sm text-stone-400">No vehicles added yet.</p>
          ) : (
            <div className="space-y-3">
              {recentVehicles.map((v) => (
                <div key={v._id} className="flex items-center justify-between py-2 border-b border-stone-100 last:border-0">
                  <div>
                    <p className="text-sm font-semibold text-stone-900">{v.make} {v.model}</p>
                    <p className="text-xs text-stone-500">{v.year} — ₦{v.price.toLocaleString()}</p>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium">{v.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}