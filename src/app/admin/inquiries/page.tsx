import { getInquiries } from '@/src/lib/data';

export const dynamic = 'force-dynamic';

export default async function AdminInquiriesPage() {
  const inquiries = await getInquiries();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-stone-900">Inquiries</h1>
        <p className="text-sm text-stone-500 mt-1">{inquiries.length} inquiries received</p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50">
                <th className="text-left px-4 py-3 font-semibold text-stone-700">Subject</th>
                <th className="text-left px-4 py-3 font-semibold text-stone-700">From</th>
                <th className="text-left px-4 py-3 font-semibold text-stone-700">Type</th>
                <th className="text-left px-4 py-3 font-semibold text-stone-700">Status</th>
                <th className="text-left px-4 py-3 font-semibold text-stone-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((i) => (
                <tr key={i._id} className="border-b border-stone-100 hover:bg-stone-50">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-stone-900 text-sm">{i.subject}</p>
                    <p className="text-xs text-stone-400 mt-0.5 line-clamp-1">{i.message}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-stone-700 text-xs">{i.name}</p>
                    <p className="text-xs text-stone-400">{i.email}</p>
                  </td>
                  <td className="px-4 py-3 text-xs text-stone-500">{i.inquiryType}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      i.status === 'New' ? 'bg-blue-50 text-blue-700' :
                      i.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700' :
                      'bg-amber-50 text-amber-700'
                    }`}>{i.status}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-stone-400">{new Date(i.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {inquiries.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-stone-400 text-sm">No inquiries found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}