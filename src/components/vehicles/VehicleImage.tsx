'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';
import { Car } from 'lucide-react';

type VehicleImageProps = Omit<ImageProps, 'src'> & { src: string };

function ImageWithFallback({ alt, ...props }: VehicleImageProps) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return <div role="img" aria-label={`${alt || 'Vehicle'}: image unavailable`} className={`flex flex-col items-center justify-center gap-2 bg-stone-200 text-stone-500 ${props.fill ? 'absolute inset-0' : 'h-10 w-10 rounded'}`}>
      <Car aria-hidden="true" className="h-8 w-8" />
      {props.fill && <span className="text-xs font-medium">Image unavailable</span>}
    </div>;
  }
  return <Image {...props} alt={alt} onError={() => setFailed(true)} />;
}

// Reset failed state when a gallery selects a different image.
export function VehicleImage(props: VehicleImageProps) {
  return <ImageWithFallback key={props.src} {...props} />;
}
