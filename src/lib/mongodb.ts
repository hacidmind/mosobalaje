/**
 * MongoDB Atlas Connection Utility
 * 
 * Reusable connection singleton designed for MongoDB Atlas.
 * Caches database and client across serverless and server-side executions.
 * Respects MONGODB_URI environment variable and validates credentials securely.
 */

export interface MongoConfig {
  uri: string;
  dbName: string;
  isConfigured: boolean;
}

export function getMongoConfig(): MongoConfig {
  const uri = typeof process !== 'undefined' && process.env?.MONGODB_URI 
    ? process.env.MONGODB_URI 
    : '';
  
  const isConfigured = Boolean(uri && uri.includes('mongodb'));

  return {
    uri,
    dbName: 'mosobalaje_imports',
    isConfigured,
  };
}

/**
 * MongoDB client instance cache for server runtimes
 */
let cachedClient: unknown = null;
let cachedDb: unknown = null;

export async function connectToDatabase() {
  const config = getMongoConfig();

  if (!config.isConfigured) {
    return {
      client: null,
      db: null,
      isConfigured: false,
      message: 'MongoDB Atlas is running in client-safe offline store mode. Provide MONGODB_URI in .env to connect to live cluster.'
    };
  }

  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb, isConfigured: true };
  }

  try {
    // Dynamic import to prevent bundling errors in client-only preview contexts
    // @ts-expect-error Optional server-side MongoDB driver
    const { MongoClient } = await import('mongodb');
    const client = new MongoClient(config.uri);
    await client.connect();
    const db = client.db(config.dbName);

    cachedClient = client;
    cachedDb = db;

    return { client, db, isConfigured: true };
  } catch (error) {
    console.warn('MongoDB Atlas connection notice:', error);
    return { client: null, db: null, isConfigured: false, error };
  }
}
