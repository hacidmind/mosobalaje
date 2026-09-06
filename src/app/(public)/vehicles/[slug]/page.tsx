import { Metadata } from 'next';
import { VehicleDescription } from '@/src/components/vehicles/VehicleDescription';
import { descriptionToText } from '@/src/lib/description-format';
import { sanitizeDescription } from '@/src/lib/sanitize-description';
import { notFound } from 'next/navigation';
import { getVehicleBySlug, getVehicles } from '@/src/lib/data';
import { VehicleDetailPageClient } from './VehicleDetailPageClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);
  if (!vehicle) return { title: 'Vehicle Not Found' };

  return {
    title: `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim}`,
    description: descriptionToText(sanitizeDescription(vehicle.description)).slice(0, 160),
    openGraph: {
      title: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
      description: descriptionToText(sanitizeDescription(vehicle.description)).slice(0, 160),
      images: vehicle.images.slice(0, 1),
    },
  };
}

export default async function VehicleDetailPage({ params }: Props) {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);
  if (!vehicle) notFound();

  const allVehicles = await getVehicles({ limit: 6 });

  return <VehicleDetailPageClient vehicle={vehicle} allVehicles={allVehicles} description={<VehicleDescription description={vehicle.description} />} />;
}