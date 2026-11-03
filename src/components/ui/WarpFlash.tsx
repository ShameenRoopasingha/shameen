'use client';

import { forwardRef } from 'react';

export const WarpFlash = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[999] opacity-0 flex items-center justify-center"
    >
      {/* 150ms Stepped CRT Scan-Wipe Overlay */}
      <div className="relative w-full h-full border-2 border-[#FF8C24] bg-[#FF8C24]/15 shadow-[0_0_30px_rgba(255,140,36,0.5)]">
        {/* Subtle Horizontal CRT Reticle Lines */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFB84D]/30 to-transparent pointer-events-none" />
        <span className="absolute top-2 left-2 text-[9px] font-mono text-[#FF8C24] tracking-widest">
          PROGRAM_SYNC // TRANSIT
        </span>
        <span className="absolute bottom-2 right-2 text-[9px] font-mono text-[#FFB84D] tracking-widest">
          TEMPORAL_BUFFER: 100%
        </span>
      </div>
    </div>
  );
});

WarpFlash.displayName = 'WarpFlash';
