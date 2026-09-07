'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { KeyRound, LoaderCircle, LockKeyhole, ShieldCheck } from 'lucide-react';
import { signInAction, type SignInState } from '@/src/lib/auth/actions';

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return <button type="submit" disabled={pending} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-bold text-stone-950 transition hover:bg-amber-400 disabled:cursor-wait disabled:opacity-70">{pending ? <><LoaderCircle className="h-4 w-4 animate-spin" /> Verifying…</> : <><KeyRound className="h-4 w-4" /> {label}</>}</button>;
}

export function SignInForm({ portal, accessKey }: { portal: 'admin' | 'ceo'; accessKey?: string }) {
  const [state, action] = useActionState<SignInState, FormData>(signInAction, {});
  const ceo = portal === 'ceo';
  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-950 px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-stone-800 bg-stone-900 p-6 shadow-2xl sm:p-8">
        <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10"><LockKeyhole className="h-7 w-7 text-amber-400" aria-hidden="true" /></div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">Secure access</p>
        <h1 className="mt-2 text-2xl font-bold text-white">{ceo ? 'Executive sign in' : 'Admin sign in'}</h1>
        <p className="mt-2 text-sm leading-relaxed text-stone-400">Use your authorized account credentials to continue.</p>
        <form action={action} className="mt-7 space-y-4">
          <input type="hidden" name="portal" value={portal} />
          {accessKey && <input type="hidden" name="accessKey" value={accessKey} />}
          {state.error && <p role="alert" className="rounded-xl border border-red-900 bg-red-950/60 p-3 text-sm text-red-200">{state.error}</p>}
          <div><label htmlFor="identifier" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-stone-300">Email address</label><input id="identifier" name="identifier" type="email" required autoComplete="username" maxLength={254} className="w-full rounded-xl border border-stone-700 bg-stone-950 px-4 py-3 text-sm text-white outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10" /></div>
          <div><label htmlFor="password" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-stone-300">Password</label><input id="password" name="password" type="password" required autoComplete="current-password" maxLength={128} className="w-full rounded-xl border border-stone-700 bg-stone-950 px-4 py-3 text-sm text-white outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10" /></div>
          <div><label htmlFor="otp" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-stone-300">Authenticator code</label><input id="otp" name="otp" required autoComplete="one-time-code" inputMode="numeric" pattern="[0-9]{6}" minLength={6} maxLength={6} className="w-full rounded-xl border border-stone-700 bg-stone-950 px-4 py-3 text-center font-mono text-lg tracking-[0.4em] text-white outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10" placeholder="000000" /></div>
          <SubmitButton label={ceo ? 'Enter executive portal' : 'Sign in'} />
        </form>
        <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-stone-500"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" /> Access attempts are rate limited and sessions automatically expire.</p>
      </div>
    </main>
  );
}
