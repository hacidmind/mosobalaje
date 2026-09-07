'use client';

import { CheckCircle2, ExternalLink, Loader2, Mail, Phone, SearchCheck } from 'lucide-react';
import { useState } from 'react';
import { updateInquiryStatus } from '@/src/lib/actions';
import type { Inquiry, InquiryStatus } from '@/src/lib/types';
import { Modal } from '@/src/components/ui/Modal';
import { InquiryStatusBadge } from '@/src/components/ui/LeadStatusBadge';
import { useToast } from '@/src/components/ui/Toast';
import { CustomerEmailTemplate } from './CustomerEmailTemplate';

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><dt className="text-xs font-bold uppercase tracking-wide text-stone-400">{label}</dt><dd className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-stone-800">{children || '—'}</dd></div>;
}

export function InquiriesManager({ initialInquiries }: { initialInquiries: Inquiry[] }) {
  const { toast } = useToast();
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [updating, setUpdating] = useState<InquiryStatus | null>(null);
  const selected = inquiries.find(item => item._id === selectedId) || null;

  const changeStatus = async (status: InquiryStatus) => {
    if (!selected) return;
    setUpdating(status);
    try {
      const updated = await updateInquiryStatus(selected._id, status);
      if (!updated) throw new Error('Inquiry was not found.');
      setInquiries(items => items.map(item => item._id === updated._id ? updated : item));
      toast({ type: 'success', title: status === 'Resolved' ? 'Inquiry completed' : 'Inquiry in progress', message: `${updated.name}'s inquiry is now ${status.toLowerCase()}.` });
    } catch (error) {
      toast({ type: 'error', title: 'Status not updated', message: error instanceof Error ? error.message : 'Please try again.' });
    } finally { setUpdating(null); }
  };

  return <>
    <div className="rounded-2xl border border-stone-200 bg-white overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-stone-200 bg-stone-50">
            {['Subject', 'From', 'Type', 'Status', 'Date', ''].map(label => <th key={label || 'actions'} className="whitespace-nowrap px-4 py-3 text-left font-semibold text-stone-700">{label}</th>)}
          </tr></thead>
          <tbody>{inquiries.map(item => <tr key={item._id} className="border-b border-stone-100 hover:bg-stone-50">
            <td className="px-4 py-3"><button type="button" onClick={() => setSelectedId(item._id)} className="text-left"><span className="block font-semibold text-stone-900 hover:text-amber-700">{item.subject}</span><span className="mt-0.5 block max-w-sm truncate text-xs text-stone-400">{item.message}</span></button></td>
            <td className="px-4 py-3"><p className="text-xs font-semibold text-stone-700">{item.name}</p><p className="text-xs text-stone-400">{item.email}</p></td>
            <td className="whitespace-nowrap px-4 py-3 text-xs text-stone-500">{item.inquiryType}</td>
            <td className="px-4 py-3"><InquiryStatusBadge status={item.status} /></td>
            <td className="whitespace-nowrap px-4 py-3 text-xs text-stone-400">{new Date(item.createdAt).toLocaleDateString('en-NG')}</td>
            <td className="px-4 py-3 text-right"><button type="button" onClick={() => setSelectedId(item._id)} className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 hover:text-stone-950">View <ExternalLink className="h-3.5 w-3.5" /></button></td>
          </tr>)}
          {inquiries.length === 0 && <tr><td colSpan={6} className="px-4 py-10 text-center text-stone-400">No inquiries found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>

    <Modal isOpen={!!selected} onClose={() => setSelectedId(null)} title={selected?.subject || 'Inquiry details'} subtitle={selected ? `Received ${new Date(selected.createdAt).toLocaleString('en-NG')}` : undefined} maxWidth="3xl">
      {selected && <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-stone-200 p-4">
          <InquiryStatusBadge status={selected.status} />
          <div className="flex flex-wrap gap-2">
            <button type="button" disabled={!!updating || selected.status === 'Reviewing'} onClick={() => changeStatus('Reviewing')} className="inline-flex items-center gap-2 rounded-lg bg-amber-100 px-4 py-2.5 text-sm font-bold text-amber-900 hover:bg-amber-200"><SearchCheck className="h-4 w-4" />{updating === 'Reviewing' && <Loader2 className="h-4 w-4 animate-spin" />}Mark as working</button>
            <button type="button" disabled={!!updating || selected.status === 'Resolved'} onClick={() => changeStatus('Resolved')} className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-500"><CheckCircle2 className="h-4 w-4" />{updating === 'Resolved' && <Loader2 className="h-4 w-4 animate-spin" />}Mark as done</button>
          </div>
        </div>
        <dl className="grid gap-5 rounded-2xl bg-stone-50 p-5 sm:grid-cols-2">
          <Detail label="Customer">{selected.name}</Detail><Detail label="Inquiry type">{selected.inquiryType}</Detail>
          <Detail label="Email"><a href={`mailto:${selected.email}`} className="inline-flex items-center gap-1.5 text-amber-800 hover:underline"><Mail className="h-4 w-4" />{selected.email}</a></Detail>
          <Detail label="Phone"><a href={`tel:${selected.phone.replace(/[^0-9+]/g, '')}`} className="inline-flex items-center gap-1.5 text-amber-800 hover:underline"><Phone className="h-4 w-4" />{selected.phone}</a></Detail>
          {selected.vehicleName && <Detail label="Vehicle">{selected.vehicleName}</Detail>}
          {selected.vehicleId && <Detail label="Vehicle reference">{selected.vehicleId}</Detail>}
          <div className="sm:col-span-2"><Detail label="Customer message">{selected.message}</Detail></div>
          {selected.internalNotes && <div className="sm:col-span-2"><Detail label="Internal notes">{selected.internalNotes}</Detail></div>}
        </dl>
        <CustomerEmailTemplate key={selected._id} customerName={selected.name} customerEmail={selected.email} context={selected.vehicleName || selected.subject} kind="inquiry" />
      </div>}
    </Modal>
  </>;
}
