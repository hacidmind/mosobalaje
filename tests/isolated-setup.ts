import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

export default async function setup() {
  dotenv.config({ path: '.env.local', quiet: true });
  const name = process.env.E2E_ISOLATED_DB;
  if (!name || !/^mosobalaje_e2e_[a-f0-9]{32}$/.test(name) || process.env.MONGODB_DB !== name) {
    throw new Error('Persistence tests require a uniquely named isolated database.');
  }
  const client = new MongoClient(process.env.MONGODB_URI!, { serverSelectionTimeoutMS: 10_000 });
  await client.connect();
  const db = client.db(name);
  if ((await db.listCollections().toArray()).length) throw new Error('Refusing to use a nonempty test database.');
  await db.collection('_e2e').insertOne({ ownedByTest: true });
  await client.close();
  return async () => {
    const cleanup = new MongoClient(process.env.MONGODB_URI!);
    await cleanup.connect();
    try { await cleanup.db(name).dropDatabase(); }
    finally { await cleanup.close(); }
  };
}
