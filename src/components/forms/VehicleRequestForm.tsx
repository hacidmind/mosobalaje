'use client';

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Banknote, Calendar, Car, CheckCircle, LoaderCircle, MessageCircle, Send, ShieldCheck, User } from 'lucide-react';
import { createVehicleRequest } from '@/src/lib/data';
import { getWhatsAppUrl } from '@/src/lib/formatting';
import { vehicleRequestSchema } from '@/src/lib/validations';
import { useToast } from '../ui/Toast';

interface VehicleRequestFormProps { whatsappNumber?: string }
type RequestForm = {
  name: string; phone: string; email: string; preferredMake: string; preferredModel: string;
  minYear: string; maxYear: string; transmission: 'Automatic' | 'Manual' | 'Any';
  fuelType: 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric' | 'Any';
  bodyType: 'SUV' | 'Sedan' | 'Pickup Truck' | 'Coupe' | 'Convertible' | 'Van' | 'Hatchback' | 'Any';
  budget: string; requirements: string;
};
type FieldName = keyof RequestForm;
type FieldErrors = Partial<Record<FieldName, string>>;

const currentYear = new Date().getFullYear();
const maximumYear = currentYear + 1;
const stepFields: Record<number, FieldName[]> = {
  1: ['name', 'phone', 'email'],
  2: ['preferredMake', 'preferredModel', 'minYear', 'maxYear', 'transmission', 'fuelType', 'bodyType'],
  3: ['budget', 'requirements'],
};
const initialForm: RequestForm = {
  name: '', phone: '', email: '', preferredMake: '', preferredModel: '',
  minYear: String(currentYear - 3), maxYear: String(currentYear), budget: '',
  transmission: 'Any', fuelType: 'Any', bodyType: 'Any', requirements: '',
};
const inputClass = 'w-full rounded-xl border border-stone-300 bg-white px-3.5 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:ring-red-500/10';
const labelClass = 'mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone-700';

export function VehicleRequestForm({ whatsappNumber }: VehicleRequestFormProps) {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<RequestForm>(initialForm);
  const [errors, setErrors] = useState<FieldErrors>({});

  const payload = () => ({ ...form, minYear: Number(form.minYear), maxYear: Number(form.maxYear) });

  const validate = (fields?: FieldName[]) => {
    const result = vehicleRequestSchema.safeParse(payload());
    const nextErrors: FieldErrors = {};
    if (!result.success) {
      for (const issue of result.error.issues) {
        const field = issue.path[0] as FieldName | undefined;
        if (field && (!fields || fields.includes(field)) && !nextErrors[field]) nextErrors[field] = issue.message;
      }
    }
    setErrors((previous) => fields
      ? { ...previous, ...Object.fromEntries(fields.map((field) => [field, undefined])), ...nextErrors }
      : nextErrors);
    return { valid: Object.keys(nextErrors).length === 0, errors: nextErrors };
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const field = event.target.name as FieldName;
    setForm((previous) => ({ ...previous, [field]: event.target.value }));
    if (errors[field]) setErrors((previous) => ({ ...previous, [field]: undefined }));
  };

  const continueToNextStep = () => {
    if (validate(stepFields[step]).valid) setStep((current) => Math.min(current + 1, 3));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (step < 3) { continueToNextStep(); return; }

    const validation = validate();
    if (!validation.valid) {
      const invalidStep = [1, 2, 3].find((candidate) => stepFields[candidate].some((field) => validation.errors[field]));
      if (invalidStep) setStep(invalidStep);
      toast({ type: 'error', title: 'Check your details', message: 'Please correct the highlighted fields and try again.' });
      return;
    }

    setSubmitting(true);
    try {
      await createVehicleRequest(payload());
      setSubmitted(true);
      toast({ type: 'success', title: 'Request submitted', message: 'Our sourcing team will contact you shortly.' });
    } catch {
      toast({ type: 'error', title: 'We could not submit your request', message: 'Please try again. If the issue continues, contact our sourcing desk on WhatsApp.' });
    } finally { setSubmitting(false); }
  };

  const errorFor = (field: FieldName) => errors[field]
    ? <p id={`${field}-error`} role="alert" className="mt-1.5 text-xs font-medium text-red-600">{errors[field]}</p>
    : null;
  const fieldProps = (field: FieldName) => ({
    id: field, name: field, 'aria-invalid': Boolean(errors[field]),
    'aria-describedby': errors[field] ? `${field}-error` : undefined,
  });

  if (submitted) {
    const vehicleName = `${form.minYear}-${form.maxYear} ${form.preferredMake} ${form.preferredModel}`;
    return (
      <div className="rounded-3xl border border-emerald-200 bg-white p-6 text-center shadow-sm sm:p-9" role="status">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50"><CheckCircle className="h-8 w-8 text-emerald-600" aria-hidden="true" /></div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">Request received</p>
        <h2 className="mt-2 text-xl font-bold text-stone-900">We’ll start reviewing your specification</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-stone-600">Thank you, {form.name}. Our procurement team will review available auctions and dealer networks, then contact you using the details provided.</p>
        <div className="mx-auto mt-6 max-w-md rounded-2xl border border-stone-200 bg-stone-50 p-4 text-left text-sm">
          <p className="font-bold text-stone-900">{form.preferredMake} {form.preferredModel}</p>
          <p className="mt-1 text-stone-600">{form.minYear}–{form.maxYear} · {form.transmission} transmission · {form.fuelType}</p>
          {form.budget && <p className="mt-1 text-stone-600">Budget: {form.budget}</p>}
        </div>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={getWhatsAppUrl(whatsappNumber, vehicleName)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-500"><MessageCircle className="h-4 w-4" aria-hidden="true" /> Chat with sourcing</a>
          <button type="button" onClick={() => { setForm(initialForm); setErrors({}); setStep(1); setSubmitted(false); }} className="rounded-xl border border-stone-300 px-6 py-3 text-sm font-bold text-stone-700 transition-colors hover:bg-stone-50">Submit another request</button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm sm:p-8">
      <div className="mb-8">
        <div className="mb-3 flex items-center gap-2" aria-label={`Step ${step} of 3`}>
          {[1, 2, 3].map((number) => <React.Fragment key={number}>{number > 1 && <div className={`h-0.5 flex-1 transition-colors ${step >= number ? 'bg-amber-500' : 'bg-stone-200'}`} />}<div aria-current={step === number ? 'step' : undefined} className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${step >= number ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-400'}`}>{number}</div></React.Fragment>)}
        </div>
        <div className="grid grid-cols-3 text-center text-[11px] font-semibold uppercase tracking-wide text-stone-500"><span>Contact</span><span>Vehicle</span><span>Details</span></div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {step === 1 && <div className="space-y-5">
          <div><h2 className="flex items-center gap-2 text-lg font-bold text-stone-900"><User className="h-5 w-5 text-amber-500" aria-hidden="true" /> Your contact details</h2><p className="mt-1 text-sm text-stone-500">Tell us where to send sourcing updates.</p></div>
          <div><label htmlFor="name" className={labelClass}>Full name *</label><input {...fieldProps('name')} value={form.name} onChange={handleChange} autoComplete="name" maxLength={100} className={inputClass} placeholder="Your full name" />{errorFor('name')}</div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div><label htmlFor="phone" className={labelClass}>Phone *</label><input {...fieldProps('phone')} value={form.phone} onChange={handleChange} type="tel" inputMode="tel" autoComplete="tel" maxLength={25} className={inputClass} placeholder="+234 800 000 0000" />{errorFor('phone')}</div>
            <div><label htmlFor="email" className={labelClass}>Email *</label><input {...fieldProps('email')} value={form.email} onChange={handleChange} type="email" inputMode="email" autoComplete="email" maxLength={100} className={inputClass} placeholder="you@example.com" />{errorFor('email')}</div>
          </div>
        </div>}

        {step === 2 && <div className="space-y-5">
          <div><h2 className="flex items-center gap-2 text-lg font-bold text-stone-900"><Car className="h-5 w-5 text-amber-500" aria-hidden="true" /> Vehicle specification</h2><p className="mt-1 text-sm text-stone-500">Share your ideal vehicle. “Any” keeps the search flexible.</p></div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div><label htmlFor="preferredMake" className={labelClass}>Preferred make *</label><input {...fieldProps('preferredMake')} value={form.preferredMake} onChange={handleChange} maxLength={50} className={inputClass} placeholder="e.g. Toyota" />{errorFor('preferredMake')}</div>
            <div><label htmlFor="preferredModel" className={labelClass}>Preferred model *</label><input {...fieldProps('preferredModel')} value={form.preferredModel} onChange={handleChange} maxLength={50} className={inputClass} placeholder="e.g. Land Cruiser" />{errorFor('preferredModel')}</div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div><label htmlFor="minYear" className={labelClass}>Earliest year</label><input {...fieldProps('minYear')} type="number" value={form.minYear} onChange={handleChange} min={1990} max={maximumYear} inputMode="numeric" className={inputClass} />{errorFor('minYear')}</div>
            <div><label htmlFor="maxYear" className={labelClass}>Latest year</label><input {...fieldProps('maxYear')} type="number" value={form.maxYear} onChange={handleChange} min={1990} max={maximumYear} inputMode="numeric" className={inputClass} />{errorFor('maxYear')}</div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div><label htmlFor="transmission" className={labelClass}>Transmission</label><select {...fieldProps('transmission')} value={form.transmission} onChange={handleChange} className={inputClass}><option>Any</option><option>Automatic</option><option>Manual</option></select></div>
            <div><label htmlFor="fuelType" className={labelClass}>Fuel type</label><select {...fieldProps('fuelType')} value={form.fuelType} onChange={handleChange} className={inputClass}><option>Any</option><option>Petrol</option><option>Diesel</option><option>Hybrid</option><option>Electric</option></select></div>
            <div><label htmlFor="bodyType" className={labelClass}>Body type</label><select {...fieldProps('bodyType')} value={form.bodyType} onChange={handleChange} className={inputClass}><option>Any</option><option>SUV</option><option>Sedan</option><option>Pickup Truck</option><option>Coupe</option><option>Convertible</option><option>Van</option><option>Hatchback</option></select></div>
          </div>
        </div>}

        {step === 3 && <div className="space-y-5">
          <div><h2 className="flex items-center gap-2 text-lg font-bold text-stone-900"><Banknote className="h-5 w-5 text-amber-500" aria-hidden="true" /> Budget and requirements</h2><p className="mt-1 text-sm text-stone-500">These details help us return realistic options faster.</p></div>
          <div><label htmlFor="budget" className={labelClass}>Budget range <span className="normal-case tracking-normal text-stone-400">(optional)</span></label><input {...fieldProps('budget')} value={form.budget} onChange={handleChange} maxLength={100} className={inputClass} placeholder="e.g. ₦40,000,000 – ₦55,000,000" />{errorFor('budget')}</div>
          <div><div className="flex items-end justify-between"><label htmlFor="requirements" className={labelClass}>Additional requirements <span className="normal-case tracking-normal text-stone-400">(optional)</span></label><span className="mb-1.5 text-xs text-stone-400">{form.requirements.length}/2000</span></div><textarea {...fieldProps('requirements')} value={form.requirements} onChange={handleChange} rows={5} maxLength={2000} className={`${inputClass} resize-y`} placeholder="Colour, features, inspection needs, delivery timeline, or anything else we should know." />{errorFor('requirements')}</div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4"><h3 className="flex items-center gap-2 text-sm font-bold text-stone-900"><Calendar className="h-4 w-4 text-amber-600" aria-hidden="true" /> Request summary</h3><p className="mt-2 text-sm text-stone-700"><strong>{form.preferredMake} {form.preferredModel}</strong> · {form.minYear}–{form.maxYear}</p><p className="mt-1 text-xs text-stone-600">{form.transmission} transmission · {form.fuelType} · {form.bodyType}</p><p className="mt-1 text-xs text-stone-600">Budget: {form.budget || 'Open to discussion'}</p></div>
          <p className="flex items-start gap-2 text-xs leading-relaxed text-stone-500"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" /> Your details are used only to respond to this sourcing request.</p>
        </div>}

        <div className="mt-8 flex items-center justify-between border-t border-stone-100 pt-6">
          {step > 1 ? <button type="button" onClick={() => setStep((current) => current - 1)} disabled={submitting} className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-stone-600 hover:bg-stone-100 hover:text-stone-900 disabled:opacity-50"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back</button> : <span />}
          {step < 3
            ? <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-stone-900 px-6 py-3 text-sm font-bold text-white hover:bg-stone-800">Continue <ArrowRight className="h-4 w-4" aria-hidden="true" /></button>
            : <button type="submit" disabled={submitting} className="inline-flex min-w-40 items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-stone-950 shadow-sm hover:bg-amber-400 disabled:cursor-wait disabled:opacity-70">{submitting ? <><LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> Submitting…</> : <><Send className="h-4 w-4" aria-hidden="true" /> Submit request</>}</button>}
        </div>
      </form>
    </div>
  );
}
