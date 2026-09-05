import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'auto';
  className?: string;
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'auto',
  className = '',
  showSubtitle = true,
}) => {
  // Height presets
  const heightClasses = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-11',
    lg: 'h-12 sm:h-14',
    xl: 'h-16 sm:h-20',
  };

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Official Uploaded Brand Logo */}
      <div className="relative flex items-center justify-center overflow-hidden rounded-xl bg-stone-950 p-1 border border-stone-800/90 shadow-md ring-1 ring-red-950/40 hover:ring-red-600/40 transition-all">
        <img
          src="/logo.jpg"
          alt="Mosobalaje Vehicle Imports — IAA & Copart Registered Member"
          className={`${heightClasses[size]} w-auto object-contain brightness-105 contrast-105`}
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Graceful fallback to static SVG emblem if image fails
            const target = e.currentTarget;
            target.style.display = 'none';
            if (target.nextElementSibling) {
              (target.nextElementSibling as HTMLElement).style.display = 'flex';
            }
          }}
        />
        {/* Fallback emblem in case image is loading or blocked */}
        <div
          style={{ display: 'none' }}
          className="flex flex-col items-center justify-center px-3 py-1 bg-stone-950 text-white"
        >
          <div className="flex items-center font-bold tracking-tight text-sm">
            <span className="text-stone-200">MOSO</span>
            <span className="text-red-500">BALAJE</span>
          </div>
          <span className="text-[8px] tracking-widest text-stone-400 uppercase">
            Vehicle Imports
          </span>
        </div>
      </div>
    </div>
  );
};
