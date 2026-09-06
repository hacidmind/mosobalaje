import { NextResponse } from 'next/server';
import { getVehicles } from '@/src/lib/data';

export async function GET() {
  try {
    const vehicles = await getVehicles();
    return NextResponse.json(vehicles);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch vehicles' }, { status: 500 });
  }
}