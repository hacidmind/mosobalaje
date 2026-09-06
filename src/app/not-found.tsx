import Link from 'next/link';
export default function NotFound() {
  return <div className="mx-auto max-w-xl px-6 py-24 text-center"><p className="text-sm font-bold tracking-widest text-amber-700">404 / PAGE NOT FOUND</p><h1 className="mt-4 text-4xl font-bold">Take a different route</h1><p className="mt-4 text-stone-600">This page may have moved, or the vehicle is no longer listed.</p><Link href="/vehicles" className="mt-8 inline-flex rounded-xl bg-stone-900 px-6 py-3 font-semibold text-white">Explore inventory</Link></div>;
}
