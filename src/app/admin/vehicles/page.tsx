'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { VehicleImage } from '@/src/components/vehicles/VehicleImage';
import { Trash2, Plus, Pencil, X } from 'lucide-react';
import { useToast } from '@/src/components/ui/Toast';
import { createVehicle, updateVehicle, deleteVehicle } from '@/src/lib/data';
import { formatNaira } from '@/src/lib/formatting';
import { PageSkeleton } from '@/src/components/ui/PageSkeleton';
import { Vehicle } from '@/src/lib/types';

const EMPTY = {
  make: '', model: '', year: new Date().getFullYear(), trim: '',
  bodyType: 'SUV', price: '', currency: 'NGN', mileage: '', mileageUnit: 'miles',
  transmission: 'Automatic', fuelType: 'Petrol', engine: '',
  exteriorColor: '', interiorColor: '', description: '',
  features: '', images: '', status: 'Available', importStatus: 'At Lagos Holding Facility',
  location: '', featured: false,
};

function buildPayload(f: typeof EMPTY) {
  return {
    make: f.make.trim(), model: f.model.trim(), year: Number(f.year), trim: f.trim.trim(),
    bodyType: f.bodyType, price: Number(f.price), currency: f.currency,
    mileage: Number(f.mileage) || 0, mileageUnit: f.mileageUnit,
    transmission: f.transmission, fuelType: f.fuelType, engine: f.engine.trim(),
    exteriorColor: f.exteriorColor.trim(), interiorColor: f.interiorColor.trim(),
    description: f.description.trim(),
    features: f.features ? f.features.split(',').map((s: string) => s.trim()).filter(Boolean) : [],
    images: f.images ? f.images.split(',').map((s: string) => s.trim()).filter(Boolean) : [],
    status: f.status, importStatus: f.importStatus,
    location: f.location.trim(), featured: f.featured,
  };
}

export default function AdminVehiclesPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...EMPTY });
  const [saving, setSaving] = useState(false);

  const fetchVehicles = useCallback((signal?: AbortSignal) => {
    return fetch('/api/vehicles', { signal })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => { if (!signal?.aborted) setVehicles(Array.isArray(data) ? data : []); })
      .catch((err: unknown) => { if (!signal?.aborted) setError(err instanceof Error ? err.message : 'Failed to load'); })
      .finally(() => { if (!signal?.aborted) setLoading(false); });
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void fetchVehicles(controller.signal);
    return () => controller.abort();
  }, [fetchVehicles]);

  const retry = () => { setLoading(true); setError(''); void fetchVehicles(); };

  const openAdd = () => { setEditingId(null); setForm({ ...EMPTY, year: new Date().getFullYear() }); setShowModal(true); };

  const openEdit = (v: Vehicle) => {
    setEditingId(v._id);
    setForm({
      make: v.make, model: v.model, year: v.year, trim: v.trim,
      bodyType: v.bodyType, price: String(v.price), currency: v.currency,
      mileage: String(v.mileage), mileageUnit: v.mileageUnit,
      transmission: v.transmission, fuelType: v.fuelType, engine: v.engine,
      exteriorColor: v.exteriorColor, interiorColor: v.interiorColor,
      description: v.description,
      features: (v.features || []).join(', '), images: (v.images || []).join(', '),
      status: v.status, importStatus: v.importStatus,
      location: v.location, featured: v.featured,
    });
    setShowModal(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setForm(prev => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.make || !form.model || !form.price) {
      toast({ type: 'error', title: 'Validation', message: 'Make, model, and price are required.' });
      return;
    }
    setSaving(true);
    try {
      const payload = buildPayload(form);
      if (editingId) {
        const updated = await updateVehicle(editingId, payload);
        if (updated) setVehicles(prev => prev.map(v => v._id === editingId ? updated : v));
        toast({ type: 'success', title: 'Updated', message: `${payload.make} ${payload.model} updated.` });
      } else {
        const created = await createVehicle(payload);
        setVehicles(prev => [created, ...prev]);
        toast({ type: 'success', title: 'Added', message: `${payload.make} ${payload.model} added.` });
      }
      setShowModal(false);
    } catch (err: unknown) {
      toast({ type: 'error', title: 'Failed', message: err instanceof Error ? err.message : String(err) });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this vehicle?')) return;
    try {
      await deleteVehicle(id);
      setVehicles(prev => prev.filter(v => v._id !== id));
      toast({ type: 'success', title: 'Deleted', message: 'Vehicle removed.' });
      router.refresh();
    } catch (err: unknown) {
      toast({ type: 'error', title: 'Failed', message: err instanceof Error ? err.message : String(err) });
    }
  };

  const sc = (s: string) => ({ Available: 'bg-emerald-50 text-emerald-700', 'In Transit': 'bg-amber-50 text-amber-700', Sold: 'bg-stone-100 text-stone-600', Reserved: 'bg-purple-50 text-purple-700', 'Coming Soon': 'bg-blue-50 text-blue-700' } as Record<string, string>)[s] || 'bg-stone-100 text-stone-600';

  if (loading) return <PageSkeleton label="Loading vehicle inventory" />;

  if (error) return <div className="text-center py-20"><p className="text-red-500 text-sm font-medium">Error: {error}</p><button onClick={retry} className="mt-4 px-4 py-2 rounded-lg bg-stone-900 text-white text-sm">Retry</button></div>;

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div><h1 className="text-2xl font-extrabold text-stone-900">Vehicles</h1><p className="text-sm text-stone-500 mt-1">{vehicles.length} in inventory</p></div>
          <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 text-white text-sm font-bold hover:bg-stone-800"><Plus className="w-4 h-4" /> Add Vehicle</button>
        </div>
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-stone-200 bg-stone-50"><th className="text-left px-4 py-3 font-semibold text-stone-700">Vehicle</th><th className="text-left px-4 py-3 font-semibold text-stone-700">Year</th><th className="text-left px-4 py-3 font-semibold text-stone-700">Price</th><th className="text-left px-4 py-3 font-semibold text-stone-700">Status</th><th className="text-left px-4 py-3 font-semibold text-stone-700">Img</th><th className="text-right px-4 py-3 font-semibold text-stone-700">Actions</th></tr></thead>
              <tbody>
                {vehicles.map((v) => (
                  <tr key={v._id} className="border-b border-stone-100 hover:bg-stone-50">
                    <td className="px-4 py-3"><p className="font-semibold text-stone-900">{v.make} {v.model}</p><p className="text-xs text-stone-500">{v.trim}</p></td>
                    <td className="px-4 py-3 text-stone-700">{v.year}</td>
                    <td className="px-4 py-3 font-semibold text-stone-900">{formatNaira(v.price)}</td>
                    <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${sc(v.status)}`}>{v.status}</span></td>
                    <td className="px-4 py-3">{v.images?.[0] ? <VehicleImage src={v.images[0]} alt="" width={40} height={40} unoptimized={!v.images[0].startsWith('https://images.unsplash.com/')} className="w-10 h-10 rounded object-cover" /> : '—'}</td>
                    <td className="px-4 py-3 text-right"><div className="flex items-center justify-end gap-1"><button aria-label={`Edit ${v.make} ${v.model}`} onClick={() => openEdit(v)} className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-700"><Pencil className="w-4 h-4" /></button><button aria-label={`Delete ${v.make} ${v.model}`} onClick={() => handleDelete(v._id)} className="p-1.5 rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button></div></td>
                  </tr>
                ))}
                {vehicles.length === 0 && <tr><td colSpan={6} className="px-4 py-8 text-center text-stone-400 text-sm">No vehicles. Click Add Vehicle.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto" onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}>
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 my-8">
            <div className="flex items-start justify-between p-6 border-b border-stone-100 bg-stone-50/70"><div><h3 className="text-xl font-bold text-stone-900">{editingId ? 'Edit' : 'Add New'} Vehicle</h3></div><button onClick={() => setShowModal(false)} className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full"><X className="w-5 h-5" /></button></div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs font-semibold text-stone-700 mb-1 uppercase">Make *</label><input name="make" value={form.make} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm" required /></div>
                <div><label className="block text-xs font-semibold text-stone-700 mb-1 uppercase">Model *</label><input name="model" value={form.model} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm" required /></div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div><label className="block text-xs font-semibold text-stone-700 mb-1 uppercase">Year</label><input name="year" type="number" value={form.year} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm" min={1990} max={2027} /></div>
                <div><label className="block text-xs font-semibold text-stone-700 mb-1 uppercase">Price (₦) *</label><input name="price" type="number" value={form.price} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm" required /></div>
                <div><label className="block text-xs font-semibold text-stone-700 mb-1 uppercase">Currency</label><select name="currency" value={form.currency} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm"><option value="NGN">NGN</option><option value="USD">USD</option></select></div>
              </div>
              <div><label className="block text-xs font-semibold text-stone-700 mb-1 uppercase">Trim</label><input name="trim" value={form.trim} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm" /></div>
              <div className="grid grid-cols-3 gap-4">
                <div><label className="block text-xs font-semibold text-stone-700 mb-1 uppercase">Body</label><select name="bodyType" value={form.bodyType} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm"><option>SUV</option><option>Sedan</option><option>Pickup Truck</option><option>Coupe</option><option>Convertible</option><option>Van</option><option>Hatchback</option></select></div>
                <div><label className="block text-xs font-semibold text-stone-700 mb-1 uppercase">Transmission</label><select name="transmission" value={form.transmission} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm"><option>Automatic</option><option>Manual</option></select></div>
                <div><label className="block text-xs font-semibold text-stone-700 mb-1 uppercase">Fuel</label><select name="fuelType" value={form.fuelType} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm"><option>Petrol</option><option>Diesel</option><option>Hybrid</option><option>Electric</option></select></div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div><label className="block text-xs font-semibold text-stone-700 mb-1 uppercase">Engine</label><input name="engine" value={form.engine} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm" /></div>
                <div><label className="block text-xs font-semibold text-stone-700 mb-1 uppercase">Mileage</label><input name="mileage" type="number" value={form.mileage} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm" /></div>
                <div><label className="block text-xs font-semibold text-stone-700 mb-1 uppercase">Unit</label><select name="mileageUnit" value={form.mileageUnit} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm"><option value="miles">Miles</option><option value="km">km</option></select></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs font-semibold text-stone-700 mb-1 uppercase">Exterior</label><input name="exteriorColor" value={form.exteriorColor} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm" /></div>
                <div><label className="block text-xs font-semibold text-stone-700 mb-1 uppercase">Interior</label><input name="interiorColor" value={form.interiorColor} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs font-semibold text-stone-700 mb-1 uppercase">Status</label><select name="status" value={form.status} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm"><option>Available</option><option>In Transit</option><option>Reserved</option><option>Sold</option><option>Coming Soon</option></select></div>
                <div><label className="block text-xs font-semibold text-stone-700 mb-1 uppercase">Import Status</label><select name="importStatus" value={form.importStatus} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm"><option>At Lagos Holding Facility</option><option>Customs Cleared</option><option>Tin Can Island Port Clearing</option><option>On High Seas</option><option>Sourced in USA/Europe</option><option>Port of Export</option><option>Ready for Nationwide Delivery</option></select></div>
              </div>
              <div><label className="block text-xs font-semibold text-stone-700 mb-1 uppercase">Location</label><input name="location" value={form.location} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm" /></div>
              <div><label className="block text-xs font-semibold text-stone-700 mb-1 uppercase">Description</label><textarea name="description" value={form.description} onChange={handleChange} rows={3} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm resize-none" /></div>
              <div><label className="block text-xs font-semibold text-stone-700 mb-1 uppercase">Features</label><input name="features" value={form.features} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm" placeholder="Feature 1, Feature 2" /></div>
              <div><label className="block text-xs font-semibold text-stone-700 mb-1 uppercase">Image URLs</label><input name="images" value={form.images} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm" placeholder="https://..., https://..." /><p className="text-[10px] text-stone-400 mt-1">Comma-separated URLs</p></div>
              <div className="flex items-center gap-2"><input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="rounded border-stone-300" /><label className="text-sm text-stone-700">Featured on homepage</label></div>
              <div className="flex justify-end gap-3 pt-4 border-t border-stone-100"><button type="button" onClick={() => setShowModal(false)} className="px-4 py-2.5 rounded-xl bg-stone-100 text-sm font-semibold hover:bg-stone-200">Cancel</button><button type="submit" disabled={saving} className="px-6 py-2.5 rounded-xl bg-stone-900 text-white text-sm font-bold hover:bg-stone-800 disabled:opacity-50">{saving ? 'Saving...' : editingId ? 'Update' : 'Add Vehicle'}</button></div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}