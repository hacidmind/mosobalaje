'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { AdminSidebar } from './AdminSidebar';
import { ToastProvider } from '../ui/Toast';
import { signOutAction } from '@/src/lib/auth/actions';
import type { AuthSession } from '@/src/lib/auth/session';

export function AdminShell({ children, session }: { children: React.ReactNode; session: AuthSession }) {
  const router = useRouter();
  const [signingOut, startTransition] = useTransition();
  const handleLogout = () => startTransition(async () => { await signOutAction(); router.refresh(); });

  return (
    <ToastProvider>
      <div className="flex min-h-screen flex-col bg-stone-100 md:flex-row">
        <AdminSidebar onLogout={handleLogout} />
        <main className="min-w-0 flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <div className="mb-4 flex items-center justify-end gap-2 text-xs text-stone-500" aria-label="Signed-in account">
            <span>{session.email}</span>
            <span className="rounded-full bg-stone-900 px-2.5 py-1 font-bold text-white">{session.role}</span>
            {signingOut && <span role="status">Signing out…</span>}
          </div>
          {children}
        </main>
      </div>
    </ToastProvider>
  );
}
