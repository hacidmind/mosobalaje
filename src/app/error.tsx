'use client';
import Link from 'next/link';
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-6 py-16 text-center">
    <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Let&apos;s try that again</p>
    <h1 className="text-3xl font-bold text-stone-900">We couldn&apos;t load this page</h1>
    <p className="mt-4 text-stone-600">There may be a temporary connection problem. Try again in a moment.</p>
    <div className="mt-8 flex gap-3"><button onClick={reset} className="rounded-xl bg-stone-900 px-6 py-3 font-semibold text-white">Try again</button><Link href="/" className="rounded-xl border border-stone-300 px-6 py-3 font-semibold">Back to home</Link></div>
  </div>;
}
