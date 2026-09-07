import { createHmac } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import dotenv from 'dotenv';
import type { Page } from '@playwright/test';

dotenv.config({ path: '.env.local', quiet: true });

function bootstrapValue(label: string) {
  if (!existsSync('.auth-credentials.txt')) return undefined;
  return readFileSync('.auth-credentials.txt', 'utf8').match(new RegExp(`^${label}: (.+)$`, 'm'))?.[1];
}

function decodeBase32(value: string) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let bits = '';
  for (const character of value.toUpperCase().replace(/[^A-Z2-7]/g, '')) bits += alphabet.indexOf(character).toString(2).padStart(5, '0');
  const bytes: number[] = [];
  for (let index = 0; index + 8 <= bits.length; index += 8) bytes.push(Number.parseInt(bits.slice(index, index + 8), 2));
  return Buffer.from(bytes);
}

function totp(secret: string) {
  const message = Buffer.alloc(8);
  message.writeBigUInt64BE(BigInt(Math.floor(Date.now() / 30_000)));
  const digest = createHmac('sha1', decodeBase32(secret)).update(message).digest();
  const offset = digest[digest.length - 1] & 15;
  const value = ((digest[offset] & 127) << 24) | (digest[offset + 1] << 16) | (digest[offset + 2] << 8) | digest[offset + 3];
  return String(value % 1_000_000).padStart(6, '0');
}

export function hasBootstrapCredentials(role: 'Admin' | 'CEO' = 'Admin') {
  return Boolean(process.env[`AUTH_${role === 'CEO' ? 'CEO' : 'ADMIN'}_TOTP_SECRET`] && (process.env[`E2E_${role.toUpperCase()}_PASSWORD`] || bootstrapValue(`${role} password`)));
}

export async function loginAs(page: Page, role: 'Admin' | 'CEO' = 'Admin') {
  const prefix = role === 'CEO' ? 'CEO' : 'ADMIN';
  const password = process.env[`E2E_${prefix}_PASSWORD`] || bootstrapValue(`${role} password`);
  const email = process.env[`AUTH_${prefix}_EMAIL`];
  const secret = process.env[`AUTH_${prefix}_TOTP_SECRET`];
  if (!password || !email || !secret) throw new Error(`Missing ${role} E2E credentials.`);
  const path = role === 'CEO' ? `/${process.env.CEO_PORTAL_SLUG}` : '/admin/sign-in';
  await page.goto(path);
  await page.getByLabel('Email address').fill(email);
  await page.getByLabel('Password').fill(password);
  await page.getByLabel('Authenticator code').fill(totp(secret));
  await page.getByRole('button', { name: role === 'CEO' ? 'Enter executive portal' : 'Sign in', exact: true }).click();
  await page.waitForURL(/\/admin$/);
}
