import { NextResponse } from 'next/server';
import { getVehicles } from '@/src/lib/data';
import { getSession } from '@/src/lib/auth/session';

export async function GET() {
  try {
    if (!await getSession()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const vehicles = await getVehicles();
    return NextResponse.json(vehicles);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch vehicles' }, { status: 500 });
  }
}
