import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { SignInForm } from '@/src/components/admin/SignInForm';
import { getSession, isCeoPortalSlug } from '@/src/lib/auth/session';

export const metadata: Metadata = { title: 'Secure Access', robots: { index: false, follow: false, nocache: true } };
export const dynamic = 'force-dynamic';

export default async function PrivatePortalPage({ params }: { params: Promise<{ privatePortal: string }> }) {
  const { privatePortal } = await params;
  if (!isCeoPortalSlug(privatePortal)) notFound();
  if (await getSession()) redirect('/admin');
  return <SignInForm portal="ceo" accessKey={privatePortal} />;
}
