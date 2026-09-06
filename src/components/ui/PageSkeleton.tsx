export function PageSkeleton({ label = 'Loading page' }: { label?: string }) {
  return <div role="status" aria-label={label} className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
    <span className="sr-only">{label}. Please wait.</span>
    <div aria-hidden="true" className="space-y-8">
      <div className="space-y-3"><div className="skeleton h-3 w-28" /><div className="skeleton h-10 w-2/3 max-w-lg" /><div className="skeleton h-4 w-1/2" /></div>
      <div className="skeleton h-14 w-full" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }, (_, i) => <div key={i} className="overflow-hidden rounded-2xl border border-stone-200 bg-white"><div className="skeleton aspect-video rounded-none" /><div className="space-y-4 p-5"><div className="skeleton h-5 w-2/3" /><div className="skeleton h-4 w-1/2" /><div className="skeleton h-10 w-full" /></div></div>)}</div>
    </div>
  </div>;
}
