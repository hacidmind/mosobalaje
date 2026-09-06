import { getInquiries } from '@/src/lib/data';
import { AdminInquiriesClient } from './AdminInquiriesClient';

export const dynamic = 'force-dynamic';

export default async function AdminInquiriesPage() {
  const inquiries = await getInquiries();
  return <AdminInquiriesClient inquiries={inquiries} />;
}