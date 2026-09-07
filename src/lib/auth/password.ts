import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto';

const COST = 131072;
const BLOCK_SIZE = 8;
const PARALLELIZATION = 1;
const KEY_LENGTH = 64;
const MAX_MEMORY = 256 * 1024 * 1024;

function derive(password: string, salt: Buffer, cost = COST, blockSize = BLOCK_SIZE, parallelization = PARALLELIZATION) {
  return new Promise<Buffer>((resolve, reject) => {
    scrypt(password, salt, KEY_LENGTH, { cost, blockSize, parallelization, maxmem: MAX_MEMORY }, (error, key) => {
      if (error) reject(error);
      else resolve(key);
    });
  });
}

export async function hashPassword(password: string) {
  if (password.length < 14 || password.length > 128) throw new Error('Password must contain between 14 and 128 characters.');
  const salt = randomBytes(16);
  const key = await derive(password.normalize('NFKC'), salt);
  return `scrypt$${COST}$${BLOCK_SIZE}$${PARALLELIZATION}$${salt.toString('base64url')}$${key.toString('base64url')}`;
}

export async function verifyPassword(password: string, encodedHash: string) {
  const [algorithm, costText, blockText, parallelText, saltText, hashText] = encodedHash.split('$');
  if (algorithm !== 'scrypt' || !saltText || !hashText || password.length > 128) return false;
  const cost = Number(costText);
  const blockSize = Number(blockText);
  const parallelization = Number(parallelText);
  if (cost !== COST || blockSize !== BLOCK_SIZE || parallelization !== PARALLELIZATION) return false;

  try {
    const expected = Buffer.from(hashText, 'base64url');
    const actual = await derive(password.normalize('NFKC'), Buffer.from(saltText, 'base64url'), cost, blockSize, parallelization);
    return expected.length === actual.length && timingSafeEqual(expected, actual);
  } catch {
    return false;
  }
}
