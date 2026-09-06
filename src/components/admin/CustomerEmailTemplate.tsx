'use client';

import { Check, Copy, Mail } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/src/components/ui/Toast';

interface Props {
  customerName: string;
  customerEmail: string;
  context: string;
  kind: 'inquiry' | 'vehicle request';
}

export function CustomerEmailTemplate({ customerName, customerEmail, context, kind }: Props) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const firstName = customerName.trim().split(/\s+/)[0] || 'there';
  const [subject, setSubject] = useState(`Welcome to Mosobalaje Vehicle Imports — We received your ${kind}`);
  const [body, setBody] = useState(() => `Hello ${firstName},

Welcome to Mosobalaje Vehicle Imports, and thank you for contacting us about ${context}.

Our team has received your details and will review them carefully. A sourcing specialist will contact you to confirm your preferences, answer your questions, and explain the next steps.

What you can expect from us:
• Verified vehicle options from trusted international sources
• Clear inspection, pricing, shipping, and customs information
• Progress updates throughout the sourcing and import process
• Support through clearance and delivery in Nigeria

If you would like to add any information, simply reply to this email with your preferred model, budget, year range, colour, or timeline.

We look forward to helping you find the right vehicle.

Warm regards,
Mosobalaje Vehicle Imports
0906 415 3303
inquiries@mosobalajeimports.ng`);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(`Subject: ${subject}\n\n${body}`);
      setCopied(true);
      toast({ type: 'success', title: 'Email copied', message: 'The subject and message are ready to paste.' });
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ type: 'error', title: 'Could not copy', message: 'Select the template and copy it manually.' });
    }
  };

  return (
    <section className="rounded-2xl border border-stone-200 bg-stone-50 p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div><h4 className="font-bold text-stone-900">Customer welcome email</h4><p className="mt-1 text-xs text-stone-500">Edit the template here, then copy it or open your email app.</p></div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={copyEmail} className="inline-flex items-center gap-2 rounded-lg border border-stone-300 bg-white px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-100">
            {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}{copied ? 'Copied' : 'Copy email'}
          </button>
          <a href={`mailto:${customerEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`} className="inline-flex items-center gap-2 rounded-lg bg-stone-900 px-3 py-2 text-xs font-semibold text-white hover:bg-stone-800">
            <Mail className="h-4 w-4" /> Open in email app
          </a>
        </div>
      </div>
      <label className="mt-4 block text-xs font-semibold uppercase tracking-wide text-stone-500">Subject</label>
      <input aria-label="Email subject" value={subject} onChange={event => setSubject(event.target.value)} className="mt-1 w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-700" />
      <label className="mt-3 block text-xs font-semibold uppercase tracking-wide text-stone-500">Message</label>
      <textarea aria-label="Email message" value={body} onChange={event => setBody(event.target.value)} rows={14} className="mt-1 w-full resize-y rounded-lg border border-stone-200 bg-white px-3 py-3 text-sm leading-relaxed text-stone-700" />
    </section>
  );
}
