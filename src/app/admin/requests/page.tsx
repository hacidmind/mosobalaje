import { getVehicleRequests } from '@/src/lib/data';
import { AdminRequestsClient } from './AdminRequestsClient';

export const dynamic = 'force-dynamic';

export default async function AdminRequestsPage() {
  const requests = await getVehicleRequests();
  return <AdminRequestsClient requests={requests} />;
}