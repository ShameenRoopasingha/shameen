'use client';

import { forwardRef } from 'react';

export const WarpFlash = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[999] opacity-0"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Timedoor Wireframe Aperture */}
      <div className="timedoor-aperture relative w-full h-full border-2 border-[#FF8C24] bg-[#FF8C24]/10 shadow-[0_0_30px_rgba(255,140,36,0.5)]">
        {/* Reticles */}
        <span className="absolute top-2 left-2 text-[10px] font-mono text-[#FF8C24] tracking-widest">
          TIMEDOOR_PORTAL // TRANSIT ACTIVE
        </span>
        <span className="absolute bottom-2 right-2 text-[10px] font-mono text-[#FFB84D] tracking-widest">
          TEMPORAL SYNC: 100%
        </span>
        {/* Center crosshair */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-px bg-[#FF8C24]" />
          <div className="h-16 w-px bg-[#FF8C24]" />
        </div>
      </div>
    </div>
  );
});

WarpFlash.displayName = 'WarpFlash';
