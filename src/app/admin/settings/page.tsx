import { getSettings } from '@/src/lib/data';
import { AdminSettingsClient } from './AdminSettingsClient';

export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage() {
  const settings = await getSettings();
  return <AdminSettingsClient settings={settings} />;
}