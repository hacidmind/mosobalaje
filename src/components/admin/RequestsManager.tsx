'use client';

import { CheckCircle2, ExternalLink, Loader2, Mail, Phone, SearchCheck } from 'lucide-react';
import { useState } from 'react';
import { updateVehicleRequestStatus } from '@/src/lib/actions';
import type { VehicleRequest } from '@/src/lib/types';
import { Modal } from '@/src/components/ui/Modal';
import { useToast } from '@/src/components/ui/Toast';
import { CustomerEmailTemplate } from './CustomerEmailTemplate';

type RequestStatus = VehicleRequest['status'];

const statusClasses: Record<RequestStatus, string> = {
  'Pending Review': 'bg-blue-50 text-blue-700 border-blue-200',
  'Sourcing Active': 'bg-amber-50 text-amber-800 border-amber-200',
  'Vehicle Found': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Closed: 'bg-stone-100 text-stone-600 border-stone-200',
};

function RequestStatusBadge({ status }: { status: RequestStatus }) {
  return <span className={`inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-semibold ${statusClasses[status]}`}>{status}</span>;
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><dt className="text-xs font-bold uppercase tracking-wide text-stone-400">{label}</dt><dd className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-stone-800">{children || '—'}</dd></div>;
}

export function RequestsManager({ initialRequests }: { initialRequests: VehicleRequest[] }) {
  const { toast } = useToast();
  const [requests, setRequests] = useState(initialRequests);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [updating, setUpdating] = useState<RequestStatus | null>(null);
  const selected = requests.find(item => item._id === selectedId) || null;

  const changeStatus = async (status: RequestStatus) => {
    if (!selected) return;
    setUpdating(status);
    try {
      const updated = await updateVehicleRequestStatus(selected._id, status);
      if (!updated) throw new Error('Vehicle request was not found.');
      setRequests(items => items.map(item => item._id === updated._id ? updated : item));
      toast({ type: 'success', title: status === 'Closed' ? 'Request completed' : 'Sourcing started', message: `${updated.name}'s request is now ${status.toLowerCase()}.` });
    } catch (error) {
      toast({ type: 'error', title: 'Status not updated', message: error instanceof Error ? error.message : 'Please try again.' });
    } finally { setUpdating(null); }
  };

  return <>
    <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
      <div className="overflow-x-auto"><table className="w-full text-sm">
        <thead><tr className="border-b border-stone-200 bg-stone-50">
          {['Vehicle', 'Client', 'Year range', 'Budget', 'Status', 'Date', ''].map(label => <th key={label || 'actions'} className="whitespace-nowrap px-4 py-3 text-left font-semibold text-stone-700">{label}</th>)}
        </tr></thead>
        <tbody>{requests.map(item => <tr key={item._id} className="border-b border-stone-100 hover:bg-stone-50">
          <td className="px-4 py-3"><button type="button" onClick={() => setSelectedId(item._id)} className="text-left font-semibold text-stone-900 hover:text-amber-700">{item.preferredMake} {item.preferredModel}</button></td>
          <td className="px-4 py-3"><p className="text-xs font-semibold text-stone-700">{item.name}</p><p className="text-xs text-stone-400">{item.email}</p></td>
          <td className="whitespace-nowrap px-4 py-3 text-xs text-stone-600">{item.minYear}–{item.maxYear}</td>
          <td className="whitespace-nowrap px-4 py-3 text-xs text-stone-600">{item.budget || '—'}</td>
          <td className="px-4 py-3"><RequestStatusBadge status={item.status} /></td>
          <td className="whitespace-nowrap px-4 py-3 text-xs text-stone-400">{new Date(item.createdAt).toLocaleDateString('en-NG')}</td>
          <td className="px-4 py-3 text-right"><button type="button" onClick={() => setSelectedId(item._id)} className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 hover:text-stone-950">View <ExternalLink className="h-3.5 w-3.5" /></button></td>
        </tr>)}
        {requests.length === 0 && <tr><td colSpan={7} className="px-4 py-10 text-center text-stone-400">No vehicle requests found.</td></tr>}
        </tbody>
      </table></div>
    </div>

    <Modal isOpen={!!selected} onClose={() => setSelectedId(null)} title={selected ? `${selected.preferredMake} ${selected.preferredModel}` : 'Request details'} subtitle={selected ? `Requested by ${selected.name} on ${new Date(selected.createdAt).toLocaleDateString('en-NG')}` : undefined} maxWidth="3xl">
      {selected && <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-stone-200 p-4">
          <RequestStatusBadge status={selected.status} />
          <div className="flex flex-wrap gap-2">
            <button type="button" disabled={!!updating || selected.status === 'Sourcing Active'} onClick={() => changeStatus('Sourcing Active')} className="inline-flex items-center gap-2 rounded-lg bg-amber-100 px-4 py-2.5 text-sm font-bold text-amber-900 hover:bg-amber-200"><SearchCheck className="h-4 w-4" />{updating === 'Sourcing Active' && <Loader2 className="h-4 w-4 animate-spin" />}Mark as working</button>
            <button type="button" disabled={!!updating || selected.status === 'Closed'} onClick={() => changeStatus('Closed')} className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-500"><CheckCircle2 className="h-4 w-4" />{updating === 'Closed' && <Loader2 className="h-4 w-4 animate-spin" />}Mark as done</button>
          </div>
        </div>
        <dl className="grid gap-5 rounded-2xl bg-stone-50 p-5 sm:grid-cols-2 lg:grid-cols-3">
          <Detail label="Customer">{selected.name}</Detail>
          <Detail label="Email"><a href={`mailto:${selected.email}`} className="inline-flex items-center gap-1.5 text-amber-800 hover:underline"><Mail className="h-4 w-4" />{selected.email}</a></Detail>
          <Detail label="Phone"><a href={`tel:${selected.phone.replace(/[^0-9+]/g, '')}`} className="inline-flex items-center gap-1.5 text-amber-800 hover:underline"><Phone className="h-4 w-4" />{selected.phone}</a></Detail>
          <Detail label="Vehicle">{selected.preferredMake} {selected.preferredModel}</Detail><Detail label="Year range">{selected.minYear}–{selected.maxYear}</Detail><Detail label="Budget">{selected.budget}</Detail>
          <Detail label="Body type">{selected.bodyType}</Detail><Detail label="Transmission">{selected.transmission}</Detail><Detail label="Fuel type">{selected.fuelType}</Detail>
          <div className="sm:col-span-2 lg:col-span-3"><Detail label="Additional requirements">{selected.requirements}</Detail></div>
        </dl>
        <CustomerEmailTemplate key={selected._id} customerName={selected.name} customerEmail={selected.email} context={`your ${selected.minYear}–${selected.maxYear} ${selected.preferredMake} ${selected.preferredModel} request`} kind="vehicle request" />
      </div>}
    </Modal>
  </>;
}
