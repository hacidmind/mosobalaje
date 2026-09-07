import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { SignInForm } from '@/src/components/admin/SignInForm';
import { getSession } from '@/src/lib/auth/session';

export const metadata: Metadata = { title: 'Admin Sign In', robots: { index: false, follow: false } };

export default async function AdminSignInPage() {
  if (await getSession()) redirect('/admin');
  return <SignInForm portal="admin" />;
}
