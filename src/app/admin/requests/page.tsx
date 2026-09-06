import { RequestsManager } from '@/src/components/admin/RequestsManager';
import { getVehicleRequests } from '@/src/lib/data';

export const dynamic = 'force-dynamic';

export default async function AdminRequestsPage() {
  const requests = await getVehicleRequests();
  return <div className="space-y-6">
    <div><h1 className="text-2xl font-extrabold text-stone-900">Vehicle Requests</h1><p className="mt-1 text-sm text-stone-500">{requests.length} custom sourcing requests</p></div>
    <RequestsManager initialRequests={requests} />
  </div>;
}
