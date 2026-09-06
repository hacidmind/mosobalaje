'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ToastProvider } from '@/src/components/ui/Toast';
import { AdminSidebar } from '@/src/components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('mosobalaje_admin_auth_v1');
    setAuthenticated(stored === 'true');
  }, []);

  const handleLogin = (password: string) => {
    if (password === 'admin' || password === 'mosobalaje2026' || password === 'admin123') {
      localStorage.setItem('mosobalaje_admin_auth_v1', 'true');
      setAuthenticated(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    localStorage.removeItem('mosobalaje_admin_auth_v1');
    setAuthenticated(false);
    router.push('/');
  };

  if (authenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-100">
        <div className="w-8 h-8 border-2 border-stone-300 border-t-stone-900 rounded-full animate-spin" />
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-950 px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-red-950/80 border border-red-800/60 flex items-center justify-center">
              <ShieldIcon className="w-7 h-7 text-red-500" />
            </div>
            <h1 className="text-xl font-bold text-white">Admin Access</h1>
            <p className="text-xs text-stone-400 mt-1">Enter your staff passcode to continue</p>
          </div>
          <form onSubmit={(e) => {
            e.preventDefault();
            const input = (e.target as HTMLFormElement).querySelector('input');
            if (input && !handleLogin(input.value)) {
              alert('Invalid passcode');
            }
          }} className="space-y-4">
            <input type="password" placeholder="Enter admin passcode" className="w-full px-4 py-3 rounded-xl bg-stone-900 border border-stone-700 text-white placeholder-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500" />
            <button type="submit" className="w-full py-3 rounded-xl bg-amber-500 text-stone-950 font-bold text-sm hover:bg-amber-400 transition-colors">Sign In</button>
          </form>
          <p className="text-center mt-4 text-xs text-stone-600">
            Default passcodes: <code className="text-stone-400">admin</code>, <code className="text-stone-400">mosobalaje2026</code>
          </p>
        </div>
      </div>
    );
  }

  return (
    <ToastProvider>
      <div className="flex min-h-screen bg-stone-100">
        <AdminSidebar onLogout={handleLogout} />
        <main className="flex-1 p-8 overflow-auto">{children}</main>
      </div>
    </ToastProvider>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 01-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 011-1c2 0 4.5-1.2 6.24-2.72a1.06 1.06 0 011.52 0C14.51 3.81 17 5 19 5a1 1 0 011 1z" />
    </svg>
  );
}