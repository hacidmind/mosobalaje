export type VehicleStatus = 'Available' | 'Reserved' | 'Sold' | 'In Transit' | 'Coming Soon';

export type ImportStatus = 
  | 'Sourced in USA/Europe'
  | 'Port of Export'
  | 'On High Seas'
  | 'Tin Can Island Port Clearing'
  | 'Customs Cleared'
  | 'At Lagos Holding Facility'
  | 'Ready for Nationwide Delivery';

export type BodyType = 
  | 'SUV'
  | 'Sedan'
  | 'Pickup Truck'
  | 'Coupe'
  | 'Convertible'
  | 'Van'
  | 'Hatchback';

export type FuelType = 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
export type Transmission = 'Automatic' | 'Manual';

export interface Vehicle {
  _id: string;
  slug: string;
  make: string;
  model: string;
  year: number;
  trim: string;
  bodyType: BodyType;
  price: number;
  currency: 'NGN' | 'USD';
  mileage: number; // in miles or km
  mileageUnit: 'miles' | 'km';
  transmission: Transmission;
  fuelType: FuelType;
  engine: string;
  exteriorColor: string;
  interiorColor: string;
  vinPlaceholder?: string; // Partial masked VIN e.g. "JTJBARBZ*P2****91"
  description: string;
  features: string[];
  images: string[];
  status: VehicleStatus;
  importStatus: ImportStatus;
  location: string; // e.g. "Victoria Island, Lagos" or "In Transit to Tin Can Island"
  featured: boolean;
  estimatedArrival?: string;
  purchasePrice?: number;
  sellingPrice?: number;
  createdBy?: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Negotiating' | 'Won' | 'Lost';

export interface Lead {
  _id: string;
  name: string;
  phone: string;
  email: string;
  vehicleId?: string;
  vehicleName?: string;
  budget?: string;
  source: 'Website Inquiry' | 'Vehicle Request' | 'WhatsApp' | 'Walk-in' | 'Referral';
  status: LeadStatus;
  notes?: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}

export type InquiryStatus = 'New' | 'Reviewing' | 'Contacted' | 'Resolved' | 'Archived';
export type InquiryType = 'Vehicle Inquiry' | 'Custom Import Quote' | 'Inspection Report Request' | 'General Question';

export interface Inquiry {
  _id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  vehicleId?: string;
  vehicleName?: string;
  inquiryType: InquiryType;
  status: InquiryStatus;
  internalNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface VehicleRequest {
  _id: string;
  name: string;
  phone: string;
  email: string;
  preferredMake: string;
  preferredModel: string;
  minYear: number;
  maxYear: number;
  budget: string;
  transmission: Transmission | 'Any';
  fuelType: FuelType | 'Any';
  bodyType: BodyType | 'Any';
  requirements: string;
  status: 'Pending Review' | 'Sourcing Active' | 'Vehicle Found' | 'Closed';
  createdAt: string;
}

export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Inventory Manager' | 'Sales Executive';
  createdAt: string;
  updatedAt: string;
}

export interface WebsiteContentSettings {
  heroHeadline: string;
  heroSubheadline: string;
  companyDescription: string;
  phone: string;
  email: string;
  whatsappNumber: string;
  officeAddress: string;
  businessHours: string;
  instagramUrl: string;
  facebookUrl: string;
  linkedinUrl: string;
}
