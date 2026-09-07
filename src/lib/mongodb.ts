import { MongoClient, Db } from 'mongodb';

const DB_NAME = process.env.MONGODB_DB || 'mosobalaje_imports';
type Connection = { client: MongoClient; db: Db };
const globalCache = globalThis as unknown as { _mongoConnection?: Promise<Connection> };

// Cache the pending connection too: parallel server components share one pool.
export function connectToDatabase(): Promise<Connection> {
  if (globalCache._mongoConnection) return globalCache._mongoConnection;
  const uri = process.env.MONGODB_URI;
  if (!uri) return Promise.reject(new Error('MONGODB_URI environment variable is not set'));
  const client = new MongoClient(uri, {
    maxPoolSize: 10,
    minPoolSize: 0,
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 10000,
    waitQueueTimeoutMS: 5000,
  });
  globalCache._mongoConnection = client.connect()
    .then(() => ({ client, db: client.db(DB_NAME) }))
    .catch(async (error: unknown) => {
      globalCache._mongoConnection = undefined;
      await client.close().catch(() => undefined);
      throw error;
    });
  return globalCache._mongoConnection;
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
  AUTH_SESSIONS: 'authSessions',
  AUTH_ATTEMPTS: 'authAttempts',
  SETTINGS: 'settings',
} as const;
