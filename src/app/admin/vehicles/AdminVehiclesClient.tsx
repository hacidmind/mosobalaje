'use client';

import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { useToast } from '@/src/components/ui/Toast';
import { Vehicle } from '@/src/lib/types';
import { formatNaira } from '@/src/lib/formatting';

interface Props {
  vehicles: Vehicle[];
}

export function AdminVehiclesClient({ vehicles: initialVehicles }: Props) {
  const { toast } = useToast();
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [search, setSearch] = useState('');

  const filtered = vehicles.filter(v =>
    v.make.toLowerCase().includes(search.toLowerCase()) ||
    v.model.toLowerCase().includes(search.toLowerCase()) ||
    v.year.toString().includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-stone-900">Vehicles</h1>
          <p className="text-sm text-stone-500 mt-1">{vehicles.length} vehicles in inventory</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 text-white text-sm font-bold hover:bg-stone-800 transition-colors">
          <Plus className="w-4 h-4" /> Add Vehicle
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
        <input
          type="text"
          placeholder="Search vehicles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
        />
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50">
                <th className="text-left px-4 py-3 font-semibold text-stone-700">Vehicle</th>
                <th className="text-left px-4 py-3 font-semibold text-stone-700">Year</th>
                <th className="text-left px-4 py-3 font-semibold text-stone-700">Price</th>
                <th className="text-left px-4 py-3 font-semibold text-stone-700">Status</th>
                <th className="text-left px-4 py-3 font-semibold text-stone-700">Featured</th>
                <th className="text-right px-4 py-3 font-semibold text-stone-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((v) => (
                <tr key={v._id} className="border-b border-stone-100 hover:bg-stone-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={v.images?.[0]} alt="" className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <p className="font-semibold text-stone-900">{v.make} {v.model}</p>
                        <p className="text-xs text-stone-500">{v.trim}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-stone-700">{v.year}</td>
                  <td className="px-4 py-3 font-semibold text-stone-900">{formatNaira(v.price)}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      v.status === 'Available' ? 'bg-emerald-50 text-emerald-700' :
                      v.status === 'In Transit' ? 'bg-amber-50 text-amber-700' :
                      v.status === 'Sold' ? 'bg-stone-100 text-stone-600' :
                      'bg-blue-50 text-blue-700'
                    }`}>{v.status}</span>
                  </td>
                  <td className="px-4 py-3">{v.featured ? '⭐' : '—'}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-500"><Pencil className="w-4 h-4" /></button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-stone-500 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-stone-400 text-sm">No vehicles found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}