'use server';

import { ObjectId } from 'mongodb';
import { getCollection, COLLECTIONS } from './mongodb';
import {
  Vehicle,
  Lead,
  Inquiry,
  VehicleRequest,
  WebsiteContentSettings,
} from './types';
import {
  vehicleSchema,
  inquirySchema,
  vehicleRequestSchema,
  leadSchema,
  contactFormSchema,
  settingsSchema,
} from './validations';

function serializeDoc<T extends { _id: unknown }>(doc: T): T {
  return {
    ...doc,
    _id: doc._id?.toString() ?? '',
  };
}

function toObjectId(id: string): ObjectId {
  return new ObjectId(id);
}

// ─── Vehicles ───────────────────────────────────────────────

export async function getVehicles(filter?: {
  status?: string;
  make?: string;
  search?: string;
  featured?: boolean;
  limit?: number;
}) {
  const collection = await getCollection(COLLECTIONS.VEHICLES);
  const query: Record<string, unknown> = {};

  if (filter?.status) query.status = filter.status;
  if (filter?.make) query.make = { $regex: filter.make, $options: 'i' };
  if (filter?.featured !== undefined) query.featured = filter.featured;
  if (filter?.search) {
    query.$or = [
      { make: { $regex: filter.search, $options: 'i' } },
      { model: { $regex: filter.search, $options: 'i' } },
      { description: { $regex: filter.search, $options: 'i' } },
    ];
  }

  let cursor = collection.find(query).sort({ createdAt: -1 });
  if (filter?.limit) cursor = cursor.limit(filter.limit);

  const docs = await cursor.toArray();
  return docs.map(serializeDoc) as unknown as Vehicle[];
}

export async function getVehicleBySlug(slug: string) {
  const collection = await getCollection(COLLECTIONS.VEHICLES);
  const doc = await collection.findOne({ slug });
  if (!doc) return null;
  return serializeDoc(doc) as unknown as Vehicle;
}

export async function getVehicleById(id: string) {
  const collection = await getCollection(COLLECTIONS.VEHICLES);
  const doc = await collection.findOne({ _id: toObjectId(id) });
  if (!doc) return null;
  return serializeDoc(doc) as unknown as Vehicle;
}

export async function createVehicle(data: unknown) {
  const parsed = vehicleSchema.parse(data);
  const slug = generateSlug(parsed.make, parsed.model, parsed.year, parsed.trim);
  const now = new Date().toISOString();

  const doc = {
    ...parsed,
    slug,
    features: parsed.features ?? [],
    images: parsed.images ?? [],
    createdAt: now,
    updatedAt: now,
  };

  const collection = await getCollection(COLLECTIONS.VEHICLES);
  const result = await collection.insertOne(doc);
  return serializeDoc({ ...doc, _id: result.insertedId }) as unknown as Vehicle;
}

export async function updateVehicle(id: string, data: unknown) {
  const parsed = vehicleSchema.partial().parse(data);
  const now = new Date().toISOString();

  const updates: Record<string, unknown> = { ...parsed, updatedAt: now };
  if (parsed.make || parsed.model || parsed.year || parsed.trim) {
    const existing = await getVehicleById(id);
    if (existing) {
      updates.slug = generateSlug(
        parsed.make ?? existing.make,
        parsed.model ?? existing.model,
        parsed.year ?? existing.year,
        parsed.trim ?? existing.trim,
      );
    }
  }

  const collection = await getCollection(COLLECTIONS.VEHICLES);
  const result = await collection.findOneAndUpdate(
    { _id: toObjectId(id) },
    { $set: updates },
    { returnDocument: 'after' },
  );

  if (!result) return null;
  return serializeDoc(result) as unknown as Vehicle;
}

export async function deleteVehicle(id: string) {
  const collection = await getCollection(COLLECTIONS.VEHICLES);
  const result = await collection.deleteOne({ _id: toObjectId(id) });
  return result.deletedCount > 0;
}

// ─── Inquiries ──────────────────────────────────────────────

export async function getInquiries() {
  const collection = await getCollection(COLLECTIONS.INQUIRIES);
  const docs = await collection.find().sort({ createdAt: -1 }).toArray();
  return docs.map(serializeDoc) as unknown as Inquiry[];
}

export async function createInquiry(data: unknown) {
  const parsed = inquirySchema.parse(data);
  const now = new Date().toISOString();

  const doc = {
    ...parsed,
    status: 'New' as const,
    createdAt: now,
    updatedAt: now,
  };

  const collection = await getCollection(COLLECTIONS.INQUIRIES);
  const result = await collection.insertOne(doc);

  const inquiry = serializeDoc({ ...doc, _id: result.insertedId }) as unknown as Inquiry;

  await createLead({
    name: parsed.name,
    phone: parsed.phone,
    email: parsed.email,
    vehicleId: parsed.vehicleId,
    vehicleName: parsed.vehicleName,
    source: 'Website Inquiry' as const,
    notes: `Inquiry: ${parsed.subject} — "${parsed.message.slice(0, 120)}..."`,
    status: 'New' as const,
  });

  return inquiry;
}

export async function createContactInquiry(data: unknown) {
  const parsed = contactFormSchema.parse(data);
  return createInquiry({
    ...parsed,
    vehicleId: parsed.vehicleReference,
    inquiryType: 'General Question',
  });
}

// ─── Vehicle Requests ───────────────────────────────────────

export async function getVehicleRequests() {
  const collection = await getCollection(COLLECTIONS.VEHICLE_REQUESTS);
  const docs = await collection.find().sort({ createdAt: -1 }).toArray();
  return docs.map(serializeDoc) as unknown as VehicleRequest[];
}

export async function createVehicleRequest(data: unknown) {
  const parsed = vehicleRequestSchema.parse(data);
  const now = new Date().toISOString();

  const doc = {
    ...parsed,
    status: 'Pending Review' as const,
    createdAt: now,
  };

  const collection = await getCollection(COLLECTIONS.VEHICLE_REQUESTS);
  const result = await collection.insertOne(doc);

  const req = serializeDoc({ ...doc, _id: result.insertedId }) as unknown as VehicleRequest;

  await createLead({
    name: parsed.name,
    phone: parsed.phone,
    email: parsed.email,
    vehicleName: `${parsed.preferredMake} ${parsed.preferredModel} (${parsed.minYear}-${parsed.maxYear})`,
    budget: parsed.budget,
    source: 'Vehicle Request' as const,
    status: 'New' as const,
    notes: `Custom Vehicle Sourcing Request: ${parsed.requirements || 'No special requirements noted'}`,
  });

  return req;
}

// ─── Leads ──────────────────────────────────────────────────

export async function getLeads() {
  const collection = await getCollection(COLLECTIONS.LEADS);
  const docs = await collection.find().sort({ createdAt: -1 }).toArray();
  return docs.map(serializeDoc) as unknown as Lead[];
}

export async function createLead(data: unknown) {
  const parsed = leadSchema.parse(data);
  const now = new Date().toISOString();

  const doc = { ...parsed, createdAt: now, updatedAt: now };
  const collection = await getCollection(COLLECTIONS.LEADS);
  const result = await collection.insertOne(doc);
  return serializeDoc({ ...doc, _id: result.insertedId }) as unknown as Lead;
}

export async function updateLead(id: string, data: unknown) {
  const parsed = leadSchema.partial().parse(data);
  const now = new Date().toISOString();

  const collection = await getCollection(COLLECTIONS.LEADS);
  const result = await collection.findOneAndUpdate(
    { _id: toObjectId(id) },
    { $set: { ...parsed, updatedAt: now } },
    { returnDocument: 'after' },
  );

  if (!result) return null;
  return serializeDoc(result) as unknown as Lead;
}

export async function deleteLead(id: string) {
  const collection = await getCollection(COLLECTIONS.LEADS);
  const result = await collection.deleteOne({ _id: toObjectId(id) });
  return result.deletedCount > 0;
}

// ─── Settings ───────────────────────────────────────────────

export async function getSettings() {
  const collection = await getCollection(COLLECTIONS.SETTINGS);
  const doc = await collection.findOne({ _key: 'site_settings' });
  if (!doc) {
    const defaults = getDefaultSettings();
    await collection.insertOne({ _key: 'site_settings', ...defaults });
    return defaults;
  }
  const { _id, _key, ...settings } = doc;
  return settings as unknown as WebsiteContentSettings;
}

export async function updateSettings(data: unknown) {
  const parsed = settingsSchema.partial().parse(data);
  const collection = await getCollection(COLLECTIONS.SETTINGS);
  await collection.updateOne(
    { _key: 'site_settings' },
    { $set: parsed },
    { upsert: true },
  );
  return getSettings();
}

// ─── Dashboard Metrics ──────────────────────────────────────

export async function getDashboardMetrics() {
  const vehicles = await getCollection(COLLECTIONS.VEHICLES);
  const leads = await getCollection(COLLECTIONS.LEADS);
  const inquiries = await getCollection(COLLECTIONS.INQUIRIES);
  const requests = await getCollection(COLLECTIONS.VEHICLE_REQUESTS);

  const [totalVehicles, available, inTransit, sold, totalLeads, newLeads, totalInquiries, pendingRequests] =
    await Promise.all([
      vehicles.countDocuments(),
      vehicles.countDocuments({ status: 'Available' }),
      vehicles.countDocuments({ status: 'In Transit' }),
      vehicles.countDocuments({ status: 'Sold' }),
      leads.countDocuments(),
      leads.countDocuments({ status: 'New' }),
      inquiries.countDocuments(),
      requests.countDocuments({ status: 'Pending Review' }),
    ]);

  return {
    totalVehicles,
    availableVehicles: available,
    inTransitVehicles: inTransit,
    soldVehicles: sold,
    totalLeads,
    newLeads,
    totalInquiries,
    pendingRequests,
  };
}

// ─── Helpers ────────────────────────────────────────────────

function generateSlug(make: string, model: string, year: number, trim?: string): string {
  const base = `${year}-${make}-${model}${trim ? `-${trim}` : ''}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return base;
}

function getDefaultSettings(): WebsiteContentSettings {
  return {
    heroHeadline: 'Find Your Next Vehicle. Imported With Confidence.',
    heroSubheadline: 'Mosobalaje Vehicle Imports connects Nigerian automotive buyers with verified, premium international vehicles sourced from top auctions including IAA and Copart.',
    companyDescription: 'Mosobalaje Vehicle Imports is a premier automotive import and procurement agency based in Lagos, Nigeria.',
    phone: '0906 415 3303',
    email: 'inquiries@mosobalajeimports.ng',
    whatsappNumber: '2349064153303',
    officeAddress: 'Lagos Operations & Logistics Hub, Victoria Island, Lagos, Nigeria',
    businessHours: 'Monday – Friday: 8:00 AM – 6:00 PM | Saturday: 9:00 AM – 4:00 PM',
    instagramUrl: 'https://instagram.com/mosobalajeimports',
    facebookUrl: 'https://facebook.com/mosobalajeimports',
    linkedinUrl: 'https://linkedin.com/company/mosobalaje-vehicle-imports',
  };
}
