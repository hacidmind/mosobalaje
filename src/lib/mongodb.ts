import { MongoClient, Db } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.MONGODB_DB || 'mosobalaje_imports';

interface CachedConnection {
  client: MongoClient | null;
  db: Db | null;
}

const globalCache = globalThis as unknown as { _mongoCache?: CachedConnection };

if (!globalCache._mongoCache) {
  globalCache._mongoCache = { client: null, db: null };
}

function getCache(): CachedConnection {
  return globalCache._mongoCache!;
}

export async function connectToDatabase(): Promise<{
  client: MongoClient;
  db: Db;
}> {
  const cache = getCache();

  if (cache.client && cache.db) {
    return { client: cache.client, db: cache.db };
  }

  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not set');
  }

  const client = new MongoClient(MONGODB_URI, {
    maxPoolSize: 10,
    minPoolSize: 2,
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 10000,
  });

  await client.connect();
  const db = client.db(DB_NAME);

  cache.client = client;
  cache.db = db;

  return { client, db };
}

export async function getCollection(name: string) {
  const { db } = await connectToDatabase();
  return db.collection(name);
}

export const COLLECTIONS = {
  VEHICLES: 'vehicles',
  LEADS: 'leads',
  INQUIRIES: 'inquiries',
  VEHICLE_REQUESTS: 'vehicleRequests',
  ADMIN_USERS: 'adminUsers',
  SETTINGS: 'settings',
} as const;