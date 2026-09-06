import { InquiriesManager } from '@/src/components/admin/InquiriesManager';
import { getInquiries } from '@/src/lib/data';

export const dynamic = 'force-dynamic';

export default async function AdminInquiriesPage() {
  const inquiries = await getInquiries();
  return <div className="space-y-6">
    <div><h1 className="text-2xl font-extrabold text-stone-900">Inquiries</h1><p className="mt-1 text-sm text-stone-500">{inquiries.length} inquiries received</p></div>
    <InquiriesManager initialInquiries={inquiries} />
  </div>;
}
