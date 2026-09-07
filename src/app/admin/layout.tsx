import { AdminShell } from '@/src/components/admin/AdminShell';
import { requireStaff } from '@/src/lib/auth/session';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireStaff();
  return <AdminShell session={session}>{children}</AdminShell>;
}
