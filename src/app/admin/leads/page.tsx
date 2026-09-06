import { getLeads } from '@/src/lib/data';
import { AdminLeadsClient } from './AdminLeadsClient';

export const dynamic = 'force-dynamic';

export default async function AdminLeadsPage() {
  const leads = await getLeads();
  return <AdminLeadsClient leads={leads} />;
}