import { z } from 'zod';

export const vehicleSchema = z.object({
  make: z.string().min(1, 'Make is required').max(50),
  model: z.string().min(1, 'Model is required').max(50),
  year: z.number().int().min(1990).max(2027),
  trim: z.string().max(100).default(''),
  bodyType: z.enum(['SUV', 'Sedan', 'Pickup Truck', 'Coupe', 'Convertible', 'Van', 'Hatchback']),
  price: z.number().positive('Price must be positive'),
  currency: z.enum(['NGN', 'USD']).default('NGN'),
  mileage: z.number().min(0),
  mileageUnit: z.enum(['miles', 'km']).default('miles'),
  transmission: z.enum(['Automatic', 'Manual']),
  fuelType: z.enum(['Petrol', 'Diesel', 'Hybrid', 'Electric']),
  engine: z.string().max(100).default(''),
  exteriorColor: z.string().max(50).default(''),
  interiorColor: z.string().max(50).default(''),
  vinPlaceholder: z.string().max(20).optional(),
  description: z.string().max(20000, 'Description is too long. Please shorten it.').default(''),
  features: z.array(z.string()).default([]),
  images: z.array(z.string()).default([]),
  status: z.enum(['Available', 'Reserved', 'Sold', 'In Transit', 'Coming Soon']).default('Available'),
  importStatus: z.enum([
    'Sourced in USA/Europe',
    'Port of Export',
    'On High Seas',
    'Tin Can Island Port Clearing',
    'Customs Cleared',
    'At Lagos Holding Facility',
    'Ready for Nationwide Delivery',
  ]).default('At Lagos Holding Facility'),
  location: z.string().max(200).default(''),
  featured: z.boolean().default(false),
  estimatedArrival: z.string().max(200).optional(),
  purchasePrice: z.number().min(0).optional(),
  sellingPrice: z.number().min(0).optional(),
});

export const inquirySchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  phone: z.string().min(1, 'Phone is required').max(20),
  email: z.string().email('Valid email is required').max(100),
  subject: z.string().min(1, 'Subject is required').max(200),
  message: z.string().min(1, 'Message is required').max(2000),
  vehicleId: z.string().optional(),
  vehicleName: z.string().optional(),
  inquiryType: z.enum(['Vehicle Inquiry', 'Custom Import Quote', 'Inspection Report Request', 'General Question']).default('Vehicle Inquiry'),
});

export const inquiryStatusSchema = z.enum(['New', 'Reviewing', 'Contacted', 'Resolved', 'Archived']);

const maximumRequestYear = new Date().getFullYear() + 1;

export const vehicleRequestSchema = z.object({
  name: z.string().trim().min(2, 'Enter your full name').max(100),
  phone: z.string().trim().min(7, 'Enter a valid phone number').max(25).regex(/^\+?[\d\s().-]+$/, 'Enter a valid phone number'),
  email: z.string().trim().toLowerCase().email('Enter a valid email address').max(100),
  preferredMake: z.string().trim().min(1, 'Preferred make is required').max(50),
  preferredModel: z.string().trim().min(1, 'Preferred model is required').max(50),
  minYear: z.number().int().min(1990, 'Minimum year must be 1990 or newer').max(maximumRequestYear),
  maxYear: z.number().int().min(1990).max(maximumRequestYear, `Maximum year cannot be later than ${maximumRequestYear}`),
  budget: z.string().max(100).default(''),
  transmission: z.enum(['Automatic', 'Manual', 'Any']).default('Any'),
  fuelType: z.enum(['Petrol', 'Diesel', 'Hybrid', 'Electric', 'Any']).default('Any'),
  bodyType: z.enum(['SUV', 'Sedan', 'Pickup Truck', 'Coupe', 'Convertible', 'Van', 'Hatchback', 'Any']).default('Any'),
  requirements: z.string().trim().max(2000).default(''),
}).refine((data) => data.minYear <= data.maxYear, {
  path: ['maxYear'],
  message: 'Maximum year must be the same as or later than minimum year',
});

export const vehicleRequestStatusSchema = z.enum(['Pending Review', 'Sourcing Active', 'Vehicle Found', 'Closed']);

export const leadSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  phone: z.string().min(1, 'Phone is required').max(20),
  email: z.string().email('Valid email is required').max(100),
  vehicleId: z.string().optional(),
  vehicleName: z.string().optional(),
  budget: z.string().max(100).optional(),
  source: z.enum(['Website Inquiry', 'Vehicle Request', 'WhatsApp', 'Walk-in', 'Referral']).default('Website Inquiry'),
  status: z.enum(['New', 'Contacted', 'Qualified', 'Negotiating', 'Won', 'Lost']).default('New'),
  notes: z.string().max(2000).optional(),
  assignedTo: z.string().optional(),
});

export const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  phone: z.string().min(1, 'Phone is required').max(20),
  email: z.string().email('Valid email is required').max(100),
  subject: z.string().min(1, 'Subject is required').max(200),
  message: z.string().min(1, 'Message is required').max(2000),
  vehicleReference: z.string().optional(),
});

export const settingsSchema = z.object({
  heroHeadline: z.string().max(200).default(''),
  heroSubheadline: z.string().max(500).default(''),
  companyDescription: z.string().max(2000).default(''),
  phone: z.string().max(20).default(''),
  email: z.string().email().max(100).default(''),
  whatsappNumber: z.string().max(20).default(''),
  officeAddress: z.string().max(500).default(''),
  businessHours: z.string().max(200).default(''),
  instagramUrl: z.string().url().or(z.literal('')).default(''),
  facebookUrl: z.string().url().or(z.literal('')).default(''),
  linkedinUrl: z.string().url().or(z.literal('')).default(''),
});

export const adminLoginSchema = z.object({
  email: z.string().email('Valid email is required'),
  password: z.string().min(1, 'Password is required'),
});

export type VehicleInput = z.infer<typeof vehicleSchema>;
export type InquiryInput = z.infer<typeof inquirySchema>;
export type VehicleRequestInput = z.infer<typeof vehicleRequestSchema>;
export type LeadInput = z.infer<typeof leadSchema>;
export type ContactFormInput = z.infer<typeof contactFormSchema>;
export type SettingsInput = z.infer<typeof settingsSchema>;
export type AdminLoginInput = z.infer<typeof adminLoginSchema>;
