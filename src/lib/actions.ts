'use server';

import {
  createContactInquiry as createContactInquiryRecord,
  createInquiry as createInquiryRecord,
  createVehicleRequest as createVehicleRequestRecord,
  createVehicle as createVehicleRecord,
  deleteLead as deleteLeadRecord,
  deleteVehicle as deleteVehicleRecord,
  updateInquiryStatus as updateInquiryStatusRecord,
  updateLead as updateLeadRecord,
  updateSettings as updateSettingsRecord,
  updateVehicleRequestStatus as updateVehicleRequestStatusRecord,
  updateVehicle as updateVehicleRecord,
} from './data';
import { requireStaff } from './auth/session';

export async function createInquiry(data: unknown) { return createInquiryRecord(data); }
export async function createContactInquiry(data: unknown) { return createContactInquiryRecord(data); }
export async function createVehicleRequest(data: unknown) { return createVehicleRequestRecord(data); }

export async function createVehicle(data: unknown) { await requireStaff(); return createVehicleRecord(data); }
export async function updateVehicle(id: string, data: unknown) { await requireStaff(); return updateVehicleRecord(id, data); }
export async function deleteVehicle(id: string) { await requireStaff(); return deleteVehicleRecord(id); }
export async function updateInquiryStatus(id: string, status: unknown) { await requireStaff(); return updateInquiryStatusRecord(id, status); }
export async function updateVehicleRequestStatus(id: string, status: unknown) { await requireStaff(); return updateVehicleRequestStatusRecord(id, status); }
export async function updateLead(id: string, data: unknown) { await requireStaff(); return updateLeadRecord(id, data); }
export async function deleteLead(id: string) { await requireStaff(); return deleteLeadRecord(id); }
export async function updateSettings(data: unknown) { await requireStaff(); return updateSettingsRecord(data); }
