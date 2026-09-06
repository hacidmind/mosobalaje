import { getVehicles, getLeads, getInquiries, getVehicleRequests } from '@/src/lib/data';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const [vehicles, leads, inquiries, requests] = await Promise.all([
    getVehicles(),
    getLeads(),
    getInquiries(),
    getVehicleRequests(),
  ]);

  const metrics = {
    totalVehicles: vehicles.length,
    availableVehicles: vehicles.filter(v => v.status === 'Available').length,
    inTransitVehicles: vehicles.filter(v => v.status === 'In Transit').length,
    soldVehicles: vehicles.filter(v => v.status === 'Sold').length,
    totalLeads: leads.length,
    newLeads: leads.filter(l => l.status === 'New').length,
    totalInquiries: inquiries.length,
    pendingRequests: requests.filter(r => r.status === 'Pending Review').length,
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-stone-900">Dashboard</h1>
        <p className="text-sm text-stone-500 mt-1">Welcome back. Here&apos;s your business at a glance.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Vehicles', value: metrics.totalVehicles, sub: `${metrics.availableVehicles} available`, color: 'text-blue-600 bg-blue-50', Icon: '🚗' },
          { label: 'Active Leads', value: metrics.totalLeads, sub: `${metrics.newLeads} new`, color: 'text-purple-600 bg-purple-50', Icon: '👥' },
          { label: 'Inquiries', value: metrics.totalInquiries, sub: 'All time', color: 'text-amber-600 bg-amber-50', Icon: '💬' },
          { label: 'Pending Requests', value: metrics.pendingRequests, sub: 'Needs review', color: 'text-red-600 bg-red-50', Icon: '📋' },
        ].map((card) => (
          <div key={card.label} className="bg-white rounded-2xl border border-stone-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">{card.label}</p>
                <p className="text-2xl font-extrabold text-stone-900 mt-1">{card.value}</p>
                <p className="text-xs text-stone-400 mt-0.5">{card.sub}</p>
              </div>
              <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center text-lg`}>{card.Icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-stone-200 p-6">
          <h2 className="text-sm font-bold text-stone-900 mb-4">Recent Leads</h2>
          {leads.length === 0 ? (
            <p className="text-sm text-stone-400">No leads yet.</p>
          ) : (
            <div className="space-y-3">
              {leads.slice(0, 5).map((lead) => (
                <div key={lead._id} className="flex items-center justify-between py-2 border-b border-stone-100 last:border-0">
                  <div>
                    <p className="text-sm font-semibold text-stone-900">{lead.name}</p>
                    <p className="text-xs text-stone-500">{lead.vehicleName || 'N/A'}</p>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium">{lead.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-6">
          <h2 className="text-sm font-bold text-stone-900 mb-4">Latest Vehicles</h2>
          {vehicles.length === 0 ? (
            <p className="text-sm text-stone-400">No vehicles added yet.</p>
          ) : (
            <div className="space-y-3">
              {vehicles.slice(0, 5).map((v) => (
                <div key={v._id} className="flex items-center justify-between py-2 border-b border-stone-100 last:border-0">
                  <div>
                    <p className="text-sm font-semibold text-stone-900">{v.make} {v.model}</p>
                    <p className="text-xs text-stone-500">{v.year} — ₦{v.price.toLocaleString()}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    v.status === 'Available' ? 'bg-emerald-50 text-emerald-700' : 
                    v.status === 'In Transit' ? 'bg-amber-50 text-amber-700' : 
                    'bg-blue-50 text-blue-700'
                  }`}>{v.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}