'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { signIn, signOut } from './session';

export type SignInState = { error?: string };
const schema = z.object({
  portal: z.enum(['admin', 'ceo']),
  identifier: z.string().trim().min(1).max(254),
  password: z.string().min(1).max(128),
  otp: z.string().trim().max(6).optional(),
  accessKey: z.string().max(200).optional(),
});

export async function signInAction(_previous: SignInState, formData: FormData): Promise<SignInState> {
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: 'Invalid email, password, or verification code.' };

  try {
    const valid = await signIn(parsed.data.portal, parsed.data.identifier, parsed.data.password, parsed.data.otp, parsed.data.accessKey);
    if (!valid) return { error: 'Invalid email, password, or verification code.' };
  } catch (error) {
    console.error('Sign-in failed because authentication is unavailable.', error);
    return { error: 'Sign-in is temporarily unavailable. Please contact the system owner.' };
  }

  redirect('/admin');
}

export async function signOutAction() {
  await signOut();
  redirect('/admin/sign-in');
}
