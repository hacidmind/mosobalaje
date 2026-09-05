import { 
  Vehicle, 
  Lead, 
  Inquiry, 
  VehicleRequest, 
  WebsiteContentSettings,
  VehicleStatus
} from '../types';
import { 
  INITIAL_VEHICLES, 
  INITIAL_LEADS, 
  INITIAL_INQUIRIES, 
  INITIAL_VEHICLE_REQUESTS, 
  INITIAL_CONTENT_SETTINGS 
} from './initialData';

const VEHICLES_KEY = 'mosobalaje_vehicles_v1';
const LEADS_KEY = 'mosobalaje_leads_v1';
const INQUIRIES_KEY = 'mosobalaje_inquiries_v1';
const REQUESTS_KEY = 'mosobalaje_requests_v1';
const SETTINGS_KEY = 'mosobalaje_settings_v1';
const ADMIN_AUTH_KEY = 'mosobalaje_admin_auth_v1';

class Store {
  private vehicles: Vehicle[] = [];
  private leads: Lead[] = [];
  private inquiries: Inquiry[] = [];
  private requests: VehicleRequest[] = [];
  private settings: WebsiteContentSettings = INITIAL_CONTENT_SETTINGS;
  private listeners: Set<() => void> = new Set();
  private initialized = false;

  constructor() {
    this.init();
  }

  private init() {
    if (typeof window === 'undefined') {
      this.vehicles = [...INITIAL_VEHICLES];
      this.leads = [...INITIAL_LEADS];
      this.inquiries = [...INITIAL_INQUIRIES];
      this.requests = [...INITIAL_VEHICLE_REQUESTS];
      this.settings = { ...INITIAL_CONTENT_SETTINGS };
      return;
    }

    try {
      const storedVehicles = localStorage.getItem(VEHICLES_KEY);
      this.vehicles = storedVehicles ? JSON.parse(storedVehicles) : [...INITIAL_VEHICLES];

      const storedLeads = localStorage.getItem(LEADS_KEY);
      this.leads = storedLeads ? JSON.parse(storedLeads) : [...INITIAL_LEADS];

      const storedInquiries = localStorage.getItem(INQUIRIES_KEY);
      this.inquiries = storedInquiries ? JSON.parse(storedInquiries) : [...INITIAL_INQUIRIES];

      const storedRequests = localStorage.getItem(REQUESTS_KEY);
      this.requests = storedRequests ? JSON.parse(storedRequests) : [...INITIAL_VEHICLE_REQUESTS];

      const storedSettings = localStorage.getItem(SETTINGS_KEY);
      if (storedSettings) {
        try {
          const parsed = JSON.parse(storedSettings);
          this.settings = {
            ...INITIAL_CONTENT_SETTINGS,
            ...(parsed && typeof parsed === 'object' ? parsed : {}),
          };
        } catch {
          this.settings = { ...INITIAL_CONTENT_SETTINGS };
        }
      } else {
        this.settings = { ...INITIAL_CONTENT_SETTINGS };
      }
    } catch {
      this.vehicles = [...INITIAL_VEHICLES];
      this.leads = [...INITIAL_LEADS];
      this.inquiries = [...INITIAL_INQUIRIES];
      this.requests = [...INITIAL_VEHICLE_REQUESTS];
      this.settings = { ...INITIAL_CONTENT_SETTINGS };
    }

    if (!this.settings || typeof this.settings !== 'object') {
      this.settings = { ...INITIAL_CONTENT_SETTINGS };
    }
    // Update if using previous default numbers
    if (
      !this.settings.whatsappNumber ||
      this.settings.whatsappNumber.includes('8086883005') ||
      this.settings.whatsappNumber.includes('8032948812')
    ) {
      this.settings.whatsappNumber = INITIAL_CONTENT_SETTINGS.whatsappNumber;
    }
    if (
      !this.settings.phone ||
      this.settings.phone.includes('8086883005') ||
      this.settings.phone.includes('8032948812')
    ) {
      this.settings.phone = INITIAL_CONTENT_SETTINGS.phone;
    }

    this.initialized = true;
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(VEHICLES_KEY, JSON.stringify(this.vehicles));
        localStorage.setItem(LEADS_KEY, JSON.stringify(this.leads));
        localStorage.setItem(INQUIRIES_KEY, JSON.stringify(this.inquiries));
        localStorage.setItem(REQUESTS_KEY, JSON.stringify(this.requests));
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(this.settings));
      } catch (err) {
        console.warn('Storage quota notice', err);
      }
    }
    this.listeners.forEach((listener) => listener());
  }

  // Vehicles
  public getVehicles(): Vehicle[] {
    return [...this.vehicles];
  }

  public getVehicleBySlug(slug: string): Vehicle | undefined {
    return this.vehicles.find((v) => v.slug.toLowerCase() === slug.toLowerCase());
  }

  public getVehicleById(id: string): Vehicle | undefined {
    return this.vehicles.find((v) => v._id === id);
  }

  public createVehicle(data: Omit<Vehicle, '_id' | 'createdAt' | 'updatedAt'>): Vehicle {
    const newVehicle: Vehicle = {
      ...data,
      _id: `veh-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.vehicles = [newVehicle, ...this.vehicles];
    this.notify();
    return newVehicle;
  }

  public updateVehicle(id: string, updates: Partial<Vehicle>): Vehicle | null {
    const index = this.vehicles.findIndex((v) => v._id === id);
    if (index === -1) return null;

    const updated = {
      ...this.vehicles[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.vehicles[index] = updated;
    this.notify();
    return updated;
  }

  public deleteVehicle(id: string): boolean {
    const prevLen = this.vehicles.length;
    this.vehicles = this.vehicles.filter((v) => v._id !== id);
    const changed = this.vehicles.length !== prevLen;
    if (changed) this.notify();
    return changed;
  }

  public setVehicleStatus(id: string, status: VehicleStatus): Vehicle | null {
    return this.updateVehicle(id, { status });
  }

  public toggleFeatured(id: string): Vehicle | null {
    const v = this.getVehicleById(id);
    if (!v) return null;
    return this.updateVehicle(id, { featured: !v.featured });
  }

  // Inquiries
  public getInquiries(): Inquiry[] {
    return [...this.inquiries];
  }

  public createInquiry(data: Omit<Inquiry, '_id' | 'createdAt' | 'updatedAt' | 'status'>): Inquiry {
    const newInq: Inquiry = {
      ...data,
      _id: `inq-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      status: 'New',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.inquiries = [newInq, ...this.inquiries];

    // Automatically create a matching Lead in the CRM so staff can follow up!
    this.createLead({
      name: data.name,
      phone: data.phone,
      email: data.email,
      vehicleId: data.vehicleId,
      vehicleName: data.vehicleName,
      source: 'Website Inquiry',
      notes: `Inquiry: ${data.subject} — "${data.message.slice(0, 120)}..."`,
      status: 'New',
    });

    this.notify();
    return newInq;
  }

  public updateInquiry(id: string, updates: Partial<Inquiry>): Inquiry | null {
    const idx = this.inquiries.findIndex((i) => i._id === id);
    if (idx === -1) return null;
    const updated = {
      ...this.inquiries[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.inquiries[idx] = updated;
    this.notify();
    return updated;
  }

  // Leads
  public getLeads(): Lead[] {
    return [...this.leads];
  }

  public createLead(data: Omit<Lead, '_id' | 'createdAt' | 'updatedAt'>): Lead {
    const newLead: Lead = {
      ...data,
      _id: `lead-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.leads = [newLead, ...this.leads];
    this.notify();
    return newLead;
  }

  public updateLead(id: string, updates: Partial<Lead>): Lead | null {
    const idx = this.leads.findIndex((l) => l._id === id);
    if (idx === -1) return null;
    const updated = {
      ...this.leads[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.leads[idx] = updated;
    this.notify();
    return updated;
  }

  public deleteLead(id: string): boolean {
    const prevLen = this.leads.length;
    this.leads = this.leads.filter((l) => l._id !== id);
    const changed = this.leads.length !== prevLen;
    if (changed) this.notify();
    return changed;
  }

  // Vehicle Requests
  public getVehicleRequests(): VehicleRequest[] {
    return [...this.requests];
  }

  public createVehicleRequest(data: Omit<VehicleRequest, '_id' | 'createdAt' | 'status'>): VehicleRequest {
    const newReq: VehicleRequest = {
      ...data,
      _id: `req-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      status: 'Pending Review',
      createdAt: new Date().toISOString(),
    };
    this.requests = [newReq, ...this.requests];

    // Auto-create lead in CRM
    this.createLead({
      name: data.name,
      phone: data.phone,
      email: data.email,
      vehicleName: `${data.preferredMake} ${data.preferredModel} (${data.minYear}-${data.maxYear})`,
      budget: data.budget,
      source: 'Vehicle Request',
      status: 'New',
      notes: `Custom Vehicle Sourcing Request: ${data.requirements || 'No special requirements noted'}`,
    });

    this.notify();
    return newReq;
  }

  public updateVehicleRequest(id: string, updates: Partial<VehicleRequest>): VehicleRequest | null {
    const idx = this.requests.findIndex((r) => r._id === id);
    if (idx === -1) return null;
    const updated = { ...this.requests[idx], ...updates };
    this.requests[idx] = updated;
    this.notify();
    return updated;
  }

  // Content Settings
  public getContentSettings(): WebsiteContentSettings {
    const current: Partial<WebsiteContentSettings> = this.settings && typeof this.settings === 'object' ? this.settings : {};
    return {
      ...INITIAL_CONTENT_SETTINGS,
      ...current,
      whatsappNumber: current.whatsappNumber || INITIAL_CONTENT_SETTINGS.whatsappNumber,
      phone: current.phone || INITIAL_CONTENT_SETTINGS.phone,
    };
  }

  public updateContentSettings(updates: Partial<WebsiteContentSettings>): WebsiteContentSettings {
    this.settings = { ...this.getContentSettings(), ...updates };
    this.notify();
    return this.settings;
  }

  // Admin Auth
  public isAdminLoggedIn(): boolean {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
  }

  public loginAdmin(passcode: string): boolean {
    // Allows password 'admin' or 'mosobalaje2026' or 'admin123'
    const valid = passcode.trim() === 'admin' || passcode.trim() === 'mosobalaje2026' || passcode.trim() === 'admin123';
    if (valid && typeof window !== 'undefined') {
      localStorage.setItem(ADMIN_AUTH_KEY, 'true');
    }
    return valid;
  }

  public logoutAdmin(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(ADMIN_AUTH_KEY);
    }
    this.notify();
  }

  // Reset to initial demo data
  public resetToSampleData(): void {
    this.vehicles = [...INITIAL_VEHICLES];
    this.leads = [...INITIAL_LEADS];
    this.inquiries = [...INITIAL_INQUIRIES];
    this.requests = [...INITIAL_VEHICLE_REQUESTS];
    this.settings = { ...INITIAL_CONTENT_SETTINGS };
    this.notify();
  }
}

export const store = new Store();

/**
 * Format Nigerian Naira currency
 */
export function formatNaira(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(amount).replace('NGN', '₦');
}

/**
 * Generates official contextual WhatsApp Click-to-Chat URL
 */
export function getWhatsAppUrl(
  whatsappNumber?: string,
  vehicleName?: string,
  vehicleRef?: string
): string {
  // Clean phone number (default 2349064153303)
  const numStr = String(whatsappNumber || '2349064153303');
  let cleanNumber = numStr.replace(/[^0-9]/g, '');
  if (cleanNumber.startsWith('0')) {
    cleanNumber = '234' + cleanNumber.slice(1);
  }
  if (!cleanNumber) cleanNumber = '2349064153303';
  
  let message = 'Hello Mosobalaje Vehicle Imports, I would like to inquire about your vehicle importation services.';
  if (vehicleName) {
    message = `Hello Mosobalaje Vehicle Imports, I am interested in the ${vehicleName}${vehicleRef ? ` (Ref: ${vehicleRef})` : ''} listed on your website. Kindly provide inspection availability, clearing paperwork verification, and purchase details.`;
  }

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

export function generateSlug(make: string, model: string, year: number, trim?: string): string {
  const base = `${year}-${make}-${model}${trim ? `-${trim}` : ''}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return base;
}
