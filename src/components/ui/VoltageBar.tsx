'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface VoltageBarProps {
  name: string;
  level: number;
  index?: number;
  category?: string;
  tag?: string;
}

export function VoltageBar({
  name,
  level,
  index = 0,
  tag = 'CALIBRATED',
}: VoltageBarProps) {
  const fillRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!fillRef.current) return;

    gsap.fromTo(
      fillRef.current,
      { width: '0%' },
      {
        width: `${level}%`,
        duration: 0.8,
        delay: index * 0.05,
        ease: 'steps(8)',
      }
    );
  }, [level, index]);

  return (
    <div
      className="mb-3 font-mono group cursor-default select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center text-xs tracking-wider mb-1">
        <div className="flex items-center gap-2">
          <span className="text-[#FFB84D] font-bold group-hover:text-[#FF8C24]">
            {name}
          </span>
          <span className="text-[9px] px-1 py-0.2 bg-[#FF8C24]/10 border border-[#7A4210] text-[#7A4210] group-hover:text-[#FF8C24] group-hover:border-[#FF8C24]">
            {tag}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px]">
          <span className="text-[#7A4210]">VLT:</span>
          <span className="text-[#FF8C24] font-bold min-w-[36px] text-right">
            {(level * 2.4).toFixed(1)}V
          </span>
          <span className="text-[#FFB84D] font-bold min-w-[30px] text-right">
            {level}%
          </span>
        </div>
      </div>

      {/* Meter track with segmented ticks */}
      <div className="relative h-3 w-full bg-[#120B05] border border-[#7A4210] group-hover:border-[#FF8C24] overflow-hidden">
        {/* Fill bar */}
        <div
          ref={fillRef}
          className="h-full bg-[#FF8C24] transition-colors duration-75 relative"
          style={{
            boxShadow: isHovered
              ? '0 0 10px #FF8C24, 0 0 20px rgba(255,140,36,0.5)'
              : '0 0 4px rgba(255,140,36,0.3)',
          }}
        >
          {/* Subtle horizontal phosphor scan */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFB84D]/40 to-transparent" />
        </div>

        {/* Segmented Tick Overlay (10-segment voltmeter grid) */}
        <div className="absolute inset-0 grid grid-cols-10 pointer-events-none">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="border-r border-[#120B05]/60 h-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

VoltageBar.displayName = 'VoltageBar';
