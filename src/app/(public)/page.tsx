import { getSettings, getVehicles } from '@/src/lib/data';
import { HomePage } from './HomePageClient';

export const dynamic = 'force-dynamic';

export default async function PublicHomePage() {
  const [vehicles, settings] = await Promise.all([getVehicles(), getSettings()]);
  return <HomePage vehicles={vehicles} featuredVehicles={vehicles.filter(vehicle => vehicle.featured)} settings={settings} />;
}
