import { createHmac, timingSafeEqual } from 'node:crypto';

function decodeBase32(value: string) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  const normalized = value.toUpperCase().replace(/[^A-Z2-7]/g, '');
  let bits = '';
  for (const character of normalized) {
    const index = alphabet.indexOf(character);
    if (index < 0) throw new Error('Invalid TOTP secret');
    bits += index.toString(2).padStart(5, '0');
  }
  const bytes: number[] = [];
  for (let index = 0; index + 8 <= bits.length; index += 8) bytes.push(Number.parseInt(bits.slice(index, index + 8), 2));
  return Buffer.from(bytes);
}

function codeAt(secret: Buffer, counter: number) {
  const message = Buffer.alloc(8);
  message.writeBigUInt64BE(BigInt(counter));
  const digest = createHmac('sha1', secret).update(message).digest();
  const offset = digest[digest.length - 1] & 0x0f;
  const binary = ((digest[offset] & 0x7f) << 24) | (digest[offset + 1] << 16) | (digest[offset + 2] << 8) | digest[offset + 3];
  return String(binary % 1_000_000).padStart(6, '0');
}

export function verifyTotp(code: string, encodedSecret: string, now = Date.now()) {
  if (!/^\d{6}$/.test(code)) return false;
  try {
    const secret = decodeBase32(encodedSecret);
    const supplied = Buffer.from(code);
    const window = Math.floor(now / 30_000);
    return [-1, 0, 1].some((offset) => timingSafeEqual(supplied, Buffer.from(codeAt(secret, window + offset))));
  } catch {
    return false;
  }
}
