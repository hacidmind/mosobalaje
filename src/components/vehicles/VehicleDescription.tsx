import { sanitizeDescription } from '@/src/lib/sanitize-description';

export function VehicleDescription({ description }: { description: string }) {
  return <div className="vehicle-description text-sm text-stone-600" dangerouslySetInnerHTML={{ __html: sanitizeDescription(description) }} />;
}
