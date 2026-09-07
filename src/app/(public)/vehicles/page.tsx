import { Metadata } from 'next';
import { getPublicVehicles } from '@/src/lib/data';
import { VehiclesPageClient } from './VehiclesPageClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Vehicle Inventory',
  description: 'Browse our current inventory of premium imported vehicles available for immediate inspection and purchase in Lagos, Nigeria.',
};

export default async function VehiclesPage() {
  const vehicles = await getPublicVehicles();
  return <VehiclesPageClient vehicles={vehicles} />;
}
