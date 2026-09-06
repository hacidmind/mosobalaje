import { getLeads } from '@/src/lib/data';

export const dynamic = 'force-dynamic';

export default async function AdminLeadsPage() {
  const leads = await getLeads();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-stone-900">Leads</h1>
        <p className="text-sm text-stone-500 mt-1">{leads.length} leads in CRM</p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50">
                <th className="text-left px-4 py-3 font-semibold text-stone-700">Name</th>
                <th className="text-left px-4 py-3 font-semibold text-stone-700">Contact</th>
                <th className="text-left px-4 py-3 font-semibold text-stone-700">Vehicle</th>
                <th className="text-left px-4 py-3 font-semibold text-stone-700">Source</th>
                <th className="text-left px-4 py-3 font-semibold text-stone-700">Status</th>
                <th className="text-left px-4 py-3 font-semibold text-stone-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l._id} className="border-b border-stone-100 hover:bg-stone-50">
                  <td className="px-4 py-3 font-semibold text-stone-900">{l.name}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-0.5 text-xs text-stone-500">
                      <span>{l.phone}</span>
                      <span>{l.email}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-stone-600">{l.vehicleName || '—'}</td>
                  <td className="px-4 py-3 text-xs text-stone-500">{l.source}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      l.status === 'New' ? 'bg-blue-50 text-blue-700' :
                      l.status === 'Contacted' ? 'bg-amber-50 text-amber-700' :
                      l.status === 'Qualified' ? 'bg-purple-50 text-purple-700' :
                      l.status === 'Won' ? 'bg-emerald-50 text-emerald-700' :
                      'bg-stone-100 text-stone-600'
                    }`}>{l.status}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-stone-400">{new Date(l.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-stone-400 text-sm">No leads found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}