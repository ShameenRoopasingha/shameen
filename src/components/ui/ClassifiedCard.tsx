'use client';

import { useState } from 'react';
import { soundFx } from '@/lib/sound';

interface ClassifiedCardProps {
  name: string;
  company: string;
  role?: string;
  phone?: string;
  fileNumber?: string;
  endorsement?: string;
  status?: string;
  index?: number;
  forceReveal?: boolean;
}

export function ClassifiedCard({
  name,
  company,
  role,
  phone,
  fileNumber,
  endorsement,
  status = 'AUTHENTICATED',
  index = 0,
  forceReveal,
}: ClassifiedCardProps) {
  const [internalRevealed, setInternalRevealed] = useState(false);
  const isRevealed = forceReveal !== undefined ? forceReveal : internalRevealed;
  const fileId = fileNumber || `REF-${(index + 1).toString().padStart(3, '0')}`;

  const handleToggle = () => {
    soundFx.playMechanicalClick();
    setInternalRevealed(!internalRevealed);
  };

  return (
    <div
      className={`relative p-4 sm:p-5 bg-[#120B05] border transition-all duration-100 font-mono ${
        isRevealed
          ? 'border-[#FF8C24] shadow-[0_0_15px_rgba(255,140,36,0.25)]'
          : 'border-[#7A4210]'
      }`}
      onMouseEnter={() => {
        if (forceReveal === undefined) setInternalRevealed(true);
      }}
      onMouseLeave={() => {
        if (forceReveal === undefined) setInternalRevealed(false);
      }}
      onClick={handleToggle}
    >
      {/* Corner Reticle Ticks (+) */}
      <span className="absolute -top-1.5 -left-1.5 text-[11px] text-[#FF8C24] leading-none select-none">+</span>
      <span className="absolute -top-1.5 -right-1.5 text-[11px] text-[#FF8C24] leading-none select-none">+</span>
      <span className="absolute -bottom-1.5 -left-1.5 text-[11px] text-[#FF8C24] leading-none select-none">+</span>
      <span className="absolute -bottom-1.5 -right-1.5 text-[11px] text-[#FF8C24] leading-none select-none">+</span>

      {/* Technical Header Metadata */}
      <div className="flex items-center justify-between border-b border-[#7A4210]/60 pb-2 mb-3 text-[10px] tracking-widest text-[#FF8C24]">
        <div className="flex items-center gap-2">
          <span className="px-1.5 py-0.5 bg-[#FF8C24]/10 border border-[#FF8C24]/30 text-[#FFB84D]">
            FILE_ID // {fileId}
          </span>
          <span className="opacity-60 hidden sm:inline">TIMEDOOR_REF // ARCHIVE-SEC.4</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 ${isRevealed ? 'bg-[#00FF66]' : 'bg-[#FF3B1F]'}`} />
          <span className={isRevealed ? 'text-[#00FF66]' : 'text-[#FF3B1F]'}>
            {isRevealed ? status : 'REDACTED'}
          </span>
        </div>
      </div>

      {/* Personnel Details */}
      <div className="space-y-2">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#7A4210] block">
            AUTHORIZING REFEREE
          </span>
          <div className="relative inline-block overflow-hidden">
            <span
              className={`text-base sm:text-lg font-bold uppercase tracking-wider block transition-colors duration-100 ${
                isRevealed ? 'text-[#FFB84D] crt-glow' : 'text-[#7A4210] select-none'
              }`}
            >
              {isRevealed ? name : '███████████████'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs tracking-wider">
          <div>
            <span className="text-[10px] uppercase text-[#7A4210] block">ORGANIZATION</span>
            <span className={isRevealed ? 'text-[#FF8C24]' : 'text-[#7A4210]'}>
              {isRevealed ? company : '██████████'}
            </span>
          </div>
          {role && (
            <div>
              <span className="text-[10px] uppercase text-[#7A4210] block">DESIGNATION</span>
              <span className={isRevealed ? 'text-[#FF8C24]/80' : 'text-[#7A4210]'}>
                {isRevealed ? role : '████████'}
              </span>
            </div>
          )}
        </div>

        {phone && (
          <div className="pt-1">
            <span className="text-[10px] uppercase text-[#7A4210] block">OFFICIAL CONTACT FREQUENCY</span>
            {isRevealed ? (
              <a
                href={`tel:${phone}`}
                onClick={(e) => e.stopPropagation()}
                className="font-mono text-xs text-[#00FF66] font-bold hover:underline inline-flex items-center gap-1.5"
              >
                <span>☎</span> {phone} ↗
              </a>
            ) : (
              <span className="font-mono text-xs text-[#7A4210]">+██ ██████████</span>
            )}
          </div>
        )}

        {endorsement && isRevealed && (
          <p className="text-xs text-[#FF8C24]/80 leading-relaxed border-t border-[#7A4210]/40 pt-2 mt-2">
            &quot;{endorsement}&quot;
          </p>
        )}
      </div>

      {/* Action Footer */}
      <div className="mt-4 pt-2 border-t border-[#7A4210]/40 flex items-center justify-between">
        <span className="text-[9px] uppercase tracking-widest text-[#7A4210]">
          {isRevealed ? '[RECORD DECLASSIFIED]' : '[HOVER / TAP TO DECLASSIFY]'}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleToggle();
          }}
          className="text-[10px] uppercase tracking-widest px-2.5 py-1 border border-[#FF8C24] text-[#FF8C24] hover:bg-[#FF8C24] hover:text-[#120B05] transition-all font-bold"
        >
          {isRevealed ? 'VERIFIED ✓' : 'DECLASSIFY'}
        </button>
      </div>
    </div>
  );
}

ClassifiedCard.displayName = 'ClassifiedCard';
