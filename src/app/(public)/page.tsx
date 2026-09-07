import { getSettings, getPublicVehicles } from '@/src/lib/data';
import { HomePage } from './HomePageClient';

export const dynamic = 'force-dynamic';

export default async function PublicHomePage() {
  const [vehicles, featuredVehicles, settings] = await Promise.all([getPublicVehicles({ featured: false, limit: 6 }), getPublicVehicles({ featured: true, limit: 6 }), getSettings()]);
  return <HomePage vehicles={[...featuredVehicles, ...vehicles]} featuredVehicles={featuredVehicles} settings={settings} />;
}
