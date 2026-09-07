import 'server-only';

import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { COLLECTIONS, getCollection } from '@/src/lib/mongodb';
import { verifyPassword } from './password';
import { verifyTotp } from './totp';

export type AuthRole = 'Admin' | 'CEO';
export type AuthSession = { id: string; name: string; email: string; role: AuthRole; expiresAt: string };
type Portal = 'admin' | 'ceo';

const SESSION_HOURS = 12;
const MAX_FAILURES = 5;
const ATTEMPT_WINDOW_MS = 15 * 60 * 1000;
const production = process.env.NODE_ENV === 'production';
export const SESSION_COOKIE = production ? '__Host-mosobalaje_session' : 'mosobalaje_session';
const dummyHash = 'scrypt$131072$8$1$MDEyMzQ1Njc4OWFiY2RlZg$AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
let indexesReady: Promise<unknown> | undefined;

function ensureAuthIndexes() {
  if (!indexesReady) indexesReady = Promise.all([
    getCollection(COLLECTIONS.AUTH_SESSIONS).then((collection) => collection.createIndexes([
      { key: { tokenHash: 1 }, unique: true },
      { key: { expiresAt: 1 }, expireAfterSeconds: 0 },
    ])),
    getCollection(COLLECTIONS.AUTH_ATTEMPTS).then((collection) => collection.createIndexes([
      { key: { _key: 1 }, unique: true },
      { key: { expiresAt: 1 }, expireAfterSeconds: 0 },
    ])),
  ]).catch((error) => { indexesReady = undefined; throw error; });
  return indexesReady;
}

function secret() {
  const value = process.env.AUTH_SECRET;
  if (!value || value.length < 32) throw new Error('AUTH_SECRET must be configured with at least 32 random characters.');
  return value;
}

function accountFor(portal: Portal) {
  const prefix = portal === 'ceo' ? 'AUTH_CEO' : 'AUTH_ADMIN';
  const email = process.env[`${prefix}_EMAIL`]?.trim().toLowerCase();
  const passwordHash = process.env[`${prefix}_PASSWORD_HASH`]?.trim();
  const totpSecret = process.env[`${prefix}_TOTP_SECRET`]?.trim();
  if (!email || !passwordHash || !totpSecret) return null;
  return { email, passwordHash, totpSecret, role: (portal === 'ceo' ? 'CEO' : 'Admin') as AuthRole, name: portal === 'ceo' ? 'Chief Executive Officer' : 'Administrator' };
}

function safeEqual(left: string, right: string) {
  const leftDigest = createHmac('sha256', secret()).update(left).digest();
  const rightDigest = createHmac('sha256', secret()).update(right).digest();
  return timingSafeEqual(leftDigest, rightDigest);
}

function tokenHash(token: string) { return createHash('sha256').update(token).digest('base64url'); }
function attemptKey(portal: Portal, identifier: string, ip: string) {
  return createHmac('sha256', secret()).update(`${portal}|${identifier}|${ip}`).digest('base64url');
}

async function requestIp() {
  const requestHeaders = await headers();
  return requestHeaders.get('x-forwarded-for')?.split(',')[0]?.trim() || requestHeaders.get('x-real-ip') || 'unknown';
}

async function isRateLimited(key: string) {
  await ensureAuthIndexes();
  const attempts = await getCollection(COLLECTIONS.AUTH_ATTEMPTS);
  const record = await attempts.findOne({ _key: key });
  return Boolean(record?.blockedUntil && new Date(record.blockedUntil).getTime() > Date.now());
}

async function recordFailure(key: string) {
  const attempts = await getCollection(COLLECTIONS.AUTH_ATTEMPTS);
  const now = new Date();
  const windowStartedAt = new Date(now.getTime() - ATTEMPT_WINDOW_MS);
  const existing = await attempts.findOne({ _key: key });
  const count = !existing?.firstAttemptAt || new Date(existing.firstAttemptAt) < windowStartedAt ? 1 : Number(existing.count || 0) + 1;
  await attempts.updateOne({ _key: key }, { $set: {
    count,
    firstAttemptAt: count === 1 ? now : existing?.firstAttemptAt,
    lastAttemptAt: now,
    blockedUntil: count >= MAX_FAILURES ? new Date(now.getTime() + ATTEMPT_WINDOW_MS) : null,
    expiresAt: new Date(now.getTime() + ATTEMPT_WINDOW_MS * 2),
  } }, { upsert: true });
}

async function clearFailures(key: string) {
  const attempts = await getCollection(COLLECTIONS.AUTH_ATTEMPTS);
  await attempts.deleteOne({ _key: key });
}

export function isCeoPortalSlug(value: string) {
  try {
    const expected = process.env.CEO_PORTAL_SLUG;
    return Boolean(expected && expected.length >= 24 && safeEqual(value, expected));
  } catch {
    return false;
  }
}

export async function signIn(portal: Portal, identifier: string, password: string, otp?: string, accessKey?: string) {
  if (portal === 'ceo' && (!accessKey || !isCeoPortalSlug(accessKey))) return false;
  const normalizedIdentifier = identifier.trim().toLowerCase();
  const key = attemptKey(portal, normalizedIdentifier, await requestIp());
  if (await isRateLimited(key)) return false;

  const account = accountFor(portal);
  const passwordValid = await verifyPassword(password, account?.passwordHash || dummyHash);
  const identityValid = Boolean(account && safeEqual(normalizedIdentifier, account.email));
  const otpValid = Boolean(account?.totpSecret && otp && verifyTotp(otp, account.totpSecret));
  if (!account || !passwordValid || !identityValid || !otpValid) {
    await recordFailure(key);
    return false;
  }

  await clearFailures(key);
  const token = randomBytes(32).toString('base64url');
  const expiresAt = new Date(Date.now() + SESSION_HOURS * 60 * 60 * 1000);
  const sessions = await getCollection(COLLECTIONS.AUTH_SESSIONS);
  await sessions.insertOne({ tokenHash: tokenHash(token), email: account.email, name: account.name, role: account.role, createdAt: new Date(), expiresAt });
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, { httpOnly: true, secure: production, sameSite: 'strict', path: '/', expires: expiresAt, priority: 'high' });
  return true;
}

export async function getSession(): Promise<AuthSession | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token || token.length < 32) return null;
  try {
    await ensureAuthIndexes();
    const sessions = await getCollection(COLLECTIONS.AUTH_SESSIONS);
    const session = await sessions.findOne({ tokenHash: tokenHash(token), expiresAt: { $gt: new Date() } });
    if (!session || (session.role !== 'Admin' && session.role !== 'CEO')) return null;
    const configured = accountFor(session.role === 'CEO' ? 'ceo' : 'admin');
    if (!configured || !safeEqual(session.email, configured.email)) return null;
    return { id: session._id.toString(), name: String(session.name), email: String(session.email), role: session.role, expiresAt: new Date(session.expiresAt).toISOString() };
  } catch (error) {
    console.error('Session verification is unavailable.', error);
    return null;
  }
}

export async function requireStaff() {
  const session = await getSession();
  if (!session) redirect('/admin/sign-in');
  return session;
}

export async function signOut() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) {
    const sessions = await getCollection(COLLECTIONS.AUTH_SESSIONS);
    await sessions.deleteOne({ tokenHash: tokenHash(token) });
  }
  cookieStore.delete(SESSION_COOKIE);
}
