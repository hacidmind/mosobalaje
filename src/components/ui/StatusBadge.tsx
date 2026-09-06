'use client';

import React from 'react';
import { VehicleStatus, ImportStatus } from '@/src/lib/types';

interface StatusBadgeProps {
  status: VehicleStatus;
  size?: 'sm' | 'md' | 'lg';
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 font-medium tracking-wide',
    md: 'text-xs px-2.5 py-1 font-semibold tracking-wide',
    lg: 'text-sm px-3.5 py-1.5 font-semibold',
  }[size];

  switch (status) {
    case 'Available':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Available
        </span>
      );
    case 'In Transit':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/80 ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          In Transit
        </span>
      );
    case 'Coming Soon':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200/80 ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          Coming Soon
        </span>
      );
    case 'Reserved':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-purple-50 text-purple-800 border border-purple-200/80 ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
          Reserved
        </span>
      );
    case 'Sold':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200 ${sizeClasses}`}>
          Sold
        </span>
      );
    default:
      return <span className={sizeClasses}>{status}</span>;
  }
}

interface ImportStatusBadgeProps {
  status: ImportStatus;
}

export function ImportStatusBadge({ status }: ImportStatusBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded bg-stone-900 text-stone-200 border border-stone-800 tracking-wide">
      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
      {status}
    </span>
  );
}