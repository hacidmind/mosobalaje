import { getVehicles } from '@/src/lib/data';
import { AdminVehiclesClient } from './AdminVehiclesClient';

export const dynamic = 'force-dynamic';

export default async function AdminVehiclesPage() {
  const vehicles = await getVehicles();
  return <AdminVehiclesClient vehicles={vehicles} />;
}