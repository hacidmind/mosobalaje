import { getVehicleRequests } from '@/src/lib/data';

export const dynamic = 'force-dynamic';

export default async function AdminRequestsPage() {
  const requests = await getVehicleRequests();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-stone-900">Vehicle Requests</h1>
        <p className="text-sm text-stone-500 mt-1">{requests.length} custom sourcing requests</p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50">
                <th className="text-left px-4 py-3 font-semibold text-stone-700">Vehicle</th>
                <th className="text-left px-4 py-3 font-semibold text-stone-700">Client</th>
                <th className="text-left px-4 py-3 font-semibold text-stone-700">Year Range</th>
                <th className="text-left px-4 py-3 font-semibold text-stone-700">Budget</th>
                <th className="text-left px-4 py-3 font-semibold text-stone-700">Status</th>
                <th className="text-left px-4 py-3 font-semibold text-stone-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r._id} className="border-b border-stone-100 hover:bg-stone-50">
                  <td className="px-4 py-3 font-semibold text-stone-900">{r.preferredMake} {r.preferredModel}</td>
                  <td className="px-4 py-3">
                    <p className="text-xs font-semibold text-stone-700">{r.name}</p>
                    <p className="text-xs text-stone-400">{r.email}</p>
                  </td>
                  <td className="px-4 py-3 text-xs text-stone-600">{r.minYear} - {r.maxYear}</td>
                  <td className="px-4 py-3 text-xs text-stone-600">{r.budget || '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      r.status === 'Pending Review' ? 'bg-blue-50 text-blue-700' :
                      r.status === 'Sourcing Active' ? 'bg-amber-50 text-amber-700' :
                      r.status === 'Vehicle Found' ? 'bg-emerald-50 text-emerald-700' :
                      'bg-stone-100 text-stone-600'
                    }`}>{r.status}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-stone-400">{new Date(r.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-stone-400 text-sm">No requests found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}