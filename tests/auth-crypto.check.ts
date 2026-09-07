import { strict as assert } from 'node:assert';
import { createHmac } from 'node:crypto';
import { readFileSync } from 'node:fs';
import nextEnv from '@next/env';
import { verifyPassword } from '../src/lib/auth/password';
import { verifyTotp } from '../src/lib/auth/totp';

// Match the application's environment loading, including dollar expansion.
nextEnv.loadEnvConfig(process.cwd());
const handoff = readFileSync('.auth-credentials.txt', 'utf8');
const credential = (label: string) => {
  const value = handoff.match(new RegExp(`^${label}: (.+)$`, 'm'))?.[1];
  assert(value, `Missing ${label}`);
  return value;
};

function decodeBase32(value: string) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let bits = '';
  for (const character of value.replace(/[^A-Z2-7]/g, '')) bits += alphabet.indexOf(character).toString(2).padStart(5, '0');
  const bytes: number[] = [];
  for (let index = 0; index + 8 <= bits.length; index += 8) bytes.push(Number.parseInt(bits.slice(index, index + 8), 2));
  return Buffer.from(bytes);
}

function currentCode(secret: string) {
  const message = Buffer.alloc(8);
  message.writeBigUInt64BE(BigInt(Math.floor(Date.now() / 30_000)));
  const digest = createHmac('sha1', decodeBase32(secret)).update(message).digest();
  const offset = digest[digest.length - 1] & 15;
  const binary = ((digest[offset] & 127) << 24) | (digest[offset + 1] << 16) | (digest[offset + 2] << 8) | digest[offset + 3];
  return String(binary % 1_000_000).padStart(6, '0');
}

for (const role of ['ADMIN', 'CEO'] as const) {
  const displayRole = role === 'ADMIN' ? 'Admin' : 'CEO';
  const password = credential(`${displayRole} password`);
  const hash = process.env[`AUTH_${role}_PASSWORD_HASH`];
  const secret = process.env[`AUTH_${role}_TOTP_SECRET`];
  assert(hash && secret, `Missing ${role} configuration`);
  assert.equal(await verifyPassword(password, hash), true);
  assert.equal(await verifyPassword(`${password}x`, hash), false);
  assert.equal(verifyTotp(currentCode(secret), secret), true);
  assert.equal(verifyTotp('00000x', secret), false);
}

assert((process.env.AUTH_SECRET?.length || 0) >= 32);
assert((process.env.CEO_PORTAL_SLUG?.length || 0) >= 24);
console.log('Authentication hashes, wrong-password rejection, TOTP verification, and secret lengths passed.');
