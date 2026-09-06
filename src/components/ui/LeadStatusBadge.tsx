'use client';

import React from 'react';
import { LeadStatus, InquiryStatus } from '@/src/lib/types';

interface LeadStatusBadgeProps {
  status: LeadStatus;
}

export function LeadStatusBadge({ status }: LeadStatusBadgeProps) {
  const styles: Record<LeadStatus, string> = {
    New: 'bg-blue-50 text-blue-700 border-blue-200',
    Contacted: 'bg-amber-50 text-amber-700 border-amber-200',
    Qualified: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    Negotiating: 'bg-purple-50 text-purple-700 border-purple-200',
    Won: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    Lost: 'bg-stone-100 text-stone-600 border-stone-200',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[status] || 'bg-stone-100 text-stone-600'}`}>
      {status}
    </span>
  );
}

interface InquiryStatusBadgeProps {
  status: InquiryStatus;
}

export function InquiryStatusBadge({ status }: InquiryStatusBadgeProps) {
  const styles: Record<InquiryStatus, string> = {
    New: 'bg-blue-50 text-blue-700 border-blue-200',
    Reviewing: 'bg-amber-50 text-amber-700 border-amber-200',
    Contacted: 'bg-purple-50 text-purple-700 border-purple-200',
    Resolved: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    Archived: 'bg-stone-100 text-stone-600 border-stone-200',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[status] || 'bg-stone-100 text-stone-600'}`}>
      {status}
    </span>
  );
}