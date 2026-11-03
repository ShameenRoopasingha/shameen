'use client';

import { useState } from 'react';
import { tvaSound } from '@/lib/tvaSound';

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
    tvaSound.playConfirm();
    setInternalRevealed(!internalRevealed);
  };

  const handleMouseEnter = () => {
    tvaSound.playHover();
    if (forceReveal === undefined) setInternalRevealed(true);
  };

  const handleMouseLeave = () => {
    if (forceReveal === undefined) setInternalRevealed(false);
  };

  return (
    <div
      className={`relative p-4 sm:p-5 bg-[#120B05] border transition-all duration-80 font-mono select-none ${
        isRevealed
          ? 'border-[#FF8C24] shadow-[0_0_15px_rgba(255,140,36,0.25)]'
          : 'border-[#7A4210] hover:border-[#FF8C24]/70'
      }`}
      style={{ transitionTimingFunction: 'steps(2)' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
          <span className="text-[10px] uppercase tracking-wider md:tracking-widest text-[#7A4210] block mb-0.5">
            AUTHORIZING REFEREE
          </span>
          <div className="relative inline-block overflow-hidden">
            <span
              className={`tva-h3 block transition-colors duration-80 ${
                isRevealed ? 'text-[#FFB84D] tva-glow-subtle' : 'text-[#7A4210] select-none font-mono'
              }`}
            >
              {isRevealed ? name : '███████████████'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-[10px] uppercase tracking-wider md:tracking-widest text-[#7A4210] block mb-0.5">
              ORGANIZATION
            </span>
            <span className={`block font-medium ${isRevealed ? 'text-[#FFE2B8]' : 'text-[#7A4210]'}`}>
              {isRevealed ? company : '██████████'}
            </span>
          </div>
          {role && (
            <div>
              <span className="text-[10px] uppercase tracking-wider md:tracking-widest text-[#7A4210] block mb-0.5">
                DESIGNATION
              </span>
              {isRevealed ? (
                <span className="tva-stamp text-[9px] mt-0.5">
                  {role}
                </span>
              ) : (
                <span className="text-[#7A4210]">████████</span>
              )}
            </div>
          )}
        </div>

        {phone && (
          <div className="pt-1">
            <span className="text-[10px] uppercase tracking-wider md:tracking-widest text-[#7A4210] block mb-0.5">
              OFFICIAL CONTACT FREQUENCY
            </span>
            {isRevealed ? (
              <a
                href={`tel:${phone}`}
                onClick={(e) => {
                  e.stopPropagation();
                  tvaSound.playConfirm();
                }}
                className="font-mono text-xs text-[#00FF66] font-bold hover:underline inline-flex items-center gap-1.5 py-1 tva-nums"
              >
                <span>☎</span> {phone} ↗
              </a>
            ) : (
              <span className="font-mono text-xs text-[#7A4210] tva-nums">+██ ██████████</span>
            )}
          </div>
        )}

        {endorsement && isRevealed && (
          <p className="tva-body text-xs sm:text-sm text-[#FFE2B8] leading-relaxed border-t border-[#7A4210]/40 pt-2 mt-2 max-w-[65ch]">
            &ldquo;{endorsement}&rdquo;
          </p>
        )}
      </div>

      {/* Action Footer (min-h-[44px] on mobile) */}
      <div className="mt-4 pt-2 border-t border-[#7A4210]/40 flex items-center justify-between">
        <span className="text-[9px] uppercase tracking-widest text-[#7A4210]">
          {isRevealed ? '[RECORD DECLASSIFIED]' : '[TAP / HOVER TO DECLASSIFY]'}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleToggle();
          }}
          className="min-h-[44px] px-3 border border-[#FF8C24] text-[#FF8C24] hover:bg-[#FF8C24] hover:text-[#120B05] transition-all font-bold text-[10px] uppercase tracking-widest inline-flex items-center justify-center"
        >
          {isRevealed ? 'VERIFIED ✓' : 'DECLASSIFY'}
        </button>
      </div>
    </div>
  );
}

ClassifiedCard.displayName = 'ClassifiedCard';
